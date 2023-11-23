<template>
	<page bgColor="#fff" topColor="#00AEEF" :topHeight="88" :refresherEnabled="true" :triggered="triggered"
		:refresherrefresh="refresherrefresh" :scrolltolower="scrolltolower">
		<template v-slot:navBar>
			<view class="text-center flex align-center justify-center" style="height: 88rpx;">
				<text class="font-36 text-white">模版选择</text>
				<view @click="utils.goBack()" class="position-absolute rounded-circle flex align-center justify-center"
					style="width: 40rpx; height: 32rpx; left: 32rpx;">
					<image style="width: 40rpx; height: 32rpx;" src="/static/images/common/back_bai.png" mode="">
					</image>
				</view>
			</view>
		</template>
		<template v-slot:content>
			<view class="">
				<view class="bg-primary p-2" style="height: 200rpx;">
					<scroll-view class="bg-white rounded-20 px-2" scroll-x="true" style="width: 100%; height: 100%;">
						<view class="flex align-center p-2">
							<view @click="setQyeryInfo(item)" v-for="item, index in stylesAllList" :key="index"
								class="mr-2" style="width: 90rpx;">
								<view class="rounded-10" style="width: 90rpx; height: 90rpx;">
									<image style="width: 90rpx;" :src="utils.showImageUrl(item.styles_cover)"
										mode="widthFix"></image>
								</view>
								<view class="text-ellipsis text-center" style="width: 90rpx;">
									<text class="font-24"
										:class="queryInfo.product_styles_id == item.value ? 'text-primary' : 'text-color-999 '">{{item.text}}</text>
								</view>
							</view>
						</view>
					</scroll-view>
				</view>
				<view class="bg-primary">
					<view class="p-2 rounded-top-20 bg-white">
						<view class="rounded-circle flex align-center px-2"
							style="background-color: #F5F5F5; height: 64rpx;">
							<input v-model="queryInfo.product_name" class="font-26 flex-1" type="text"
								placeholder="输入模版名称搜索" placeholder-style="color: #ccc">
							<image @click="search" style="width: 40rpx; height: 40rpx;" src="/static/images/common/ss.png"
								mode=""></image>
						</view>
						<view class="py-2 flex align-center">
							<image style="width: 26rpx; height: 16rpx;" src="/static/images/home/zs.png" mode=""></image>
							<text class="ml-2 font-32">{{activeStyle.text}}</text>
						</view>
					</view>
					<view class="p-2 flex flex-wrap bg-white">
						<view @click="selectProduct(item)" v-for="item, index in list" :key="index"
							class="m-2">
							<!--  -->
							<view class="rounded-20 overflow-hidden flex align-center justify-center border "
							:class="activeProduct.product_id == item.product_id ? 'border-primary' : ''"
								style="width: 310rpx; height: 310rpx;">
								<image style="width: 310rpx;" :src="utils.showImageUrl(item.product_cover)"
									mode="widthFix"></image>
							</view>
							<view class="text-ellipsis text-center mt-1" style="width: 310rpx;">
								<text 
									:class="activeProduct.product_id == item.product_id ? 'text-primary' : ''"
									class="font-32">{{item.product_name}}</text>
							</view>
						</view>
					</view>
					<view class="bg-white py-2">
						<no-data v-if="list.length == 0"></no-data>
					</view>
				</view>
			</view>
			
		</template>
	</page>
</template>

<script setup>
	import store from "@/store/index.js";
	import utils from "@/utils/utils.js";
	import api from "@/request/api.js";
	import {
		ref,
		computed,
		reactive,
		toRefs,
		onMounted
	} from "vue";

	import {
		onShow,
		onLoad
	} from "@dcloudio/uni-app";

	const data = reactive({
		triggered: false,
		stylesAllList: [],
		activeStyle: {},
		queryInfo: {
			ids: [],
			product_styles_id: "",
			product_type: 1,
			product_name: "",
		},
		list: [],
		activeProduct: {}
	});
	const {
		triggered,
		stylesAllList,
		activeStyle,
		queryInfo,
		list,
		activeProduct
	} = toRefs(data);

	const userInfo = computed(() => {
		return store.state.userInfo
	})
	
	const orderFrom = computed(() => {
		return store.state.orderFrom
	})
	
	const selectProduct = (item) => {
		data.activeProduct = item;
		// 存入表单
		// console.log('data.activeProduct', data.activeProduct);
		const productObj = {
			product_id: data.activeProduct.product_id,
			product_name: data.activeProduct.product_name,
			product_print:data.activeProduct.product_print,
			product_type:data.activeProduct.product_type,
			product_width:data.activeProduct.product_width,
			product_height:data.activeProduct.product_height,
		};
		const productInfo = {
			order_product_id: productObj.product_id,
			order_product_name: productObj.product_name,
			order_product_info: JSON.stringify(productObj),
			order_product_info_obj: productObj,
		}
		// 设置表单
		store.commit('SET_ORDER_FORM', productInfo)
		// 跳转预览
		utils.goToPage('product-preview', `product_id=${productObj.product_id}`)
	}

	const setQyeryInfo = (item) => {
		data.activeStyle = item;
		data.queryInfo.product_styles_id = item.value;
		search()
	}

	const search = () => {
		data.list = [];
		getProductByIds()
	}

	// 下拉刷新
	const refresherrefresh = () => {
		data.triggered = true;
		data.list = [];
		getProductByIds()
	}

	// 上滑加载
	const scrolltolower = () => {}

	const getProductByIds = () => {
		api.getProductByIds(data.queryInfo).then(res => {
			data.list = res.data;
			data.triggered = false;
		}, () => {
			data.triggered = false;
		})
	}

	const getStylesAllList = () => {
		api.getStylesAllList().then(res => {
			data.stylesAllList = res.data;
			if(data.stylesAllList.length > 0) {
				data.activeStyle = data.stylesAllList[0];
				data.queryInfo.product_styles_id = data.activeStyle.value;
				getProductByIds()
			} else {
				getProductByIds()
			}
			
			
		}, () => {
			data.triggered = false;
		})
	}

	onShow(() => {})

	onLoad(() => {
		if(orderFrom.value?.order_spec_info_obj?.spec_template_ids) {
			data.queryInfo.ids = orderFrom.value?.order_spec_info_obj?.spec_template_ids.split(',').filter(e => e) 
		} else {
			data.queryInfo.ids = [];
		}
		getStylesAllList()
	})
</script>

<style>
	.order-linear-gradient {
		background-image: linear-gradient(to right, rgba(0, 165, 234, 0.18), #fff);
	}
</style>
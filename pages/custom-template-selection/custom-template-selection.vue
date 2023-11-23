<template>
	<page bgColor="#fff" topColor="#00AEEF" :topHeight="88" :refresherEnabled="true" :triggered="triggered" :refresherrefresh="refresherrefresh" :scrolltolower="scrolltolower">
		<template v-slot:navBar>
			<view class="text-center flex align-center justify-center" style="height: 88rpx">
				<text class="font-36 text-white">模版选择</text>
				<view @click="utils.goBack()" class="position-absolute rounded-circle flex align-center justify-center" style="width: 40rpx; height: 32rpx; left: 32rpx">
					<image style="width: 40rpx; height: 32rpx" src="/static/images/common/back_bai.png" mode=""></image>
				</view>
			</view>
		</template>
		<template v-slot:content>
			<view class="">
				<view class="bg-primary p-2" style="height: 200rpx">
					<scroll-view class="bg-white rounded-20 px-2" scroll-x="true" style="width: 100%; height: 100%">
						<view class="flex align-center p-2">
							<view @click="setQyeryInfo(item)" v-for="(item, index) in stylesAllList" :key="index" class="mr-2" style="width: 90rpx">
								<view class="rounded-10" style="width: 90rpx; height: 90rpx">
									<image style="width: 90rpx" :src="utils.showImageUrl(item.styles_cover)" mode="widthFix"></image>
								</view>
								<view class="text-ellipsis text-center" style="width: 90rpx">
									<text class="font-24" :class="queryInfo.product_styles_id == item.value ? 'text-primary' : 'text-color-999 '">{{ item.text }}</text>
								</view>
							</view>
						</view>
					</scroll-view>
				</view>
				<view class="bg-primary">
					<view class="p-2 rounded-top-20 bg-white">
						<view class="rounded-circle flex align-center px-2" style="background-color: #f5f5f5; height: 64rpx">
							<input v-model="queryInfo.product_name" class="font-26 flex-1" type="text" placeholder="输入模版名称搜索" placeholder-style="color: #ccc" />
							<image @click="search" style="width: 40rpx; height: 40rpx" src="/static/images/common/ss.png" mode=""></image>
						</view>
						<view class="py-2 flex align-center">
							<image style="width: 26rpx; height: 16rpx" src="/static/images/home/zs.png" mode=""></image>
							<text class="ml-2 font-32">{{ activeStyle.text }}</text>
						</view>
					</view>
					<view class="p-2 flex flex-wrap bg-white">
						<view @click="selectProduct(item)" v-for="(item, index) in list" :key="index" class="m-2">
							<!--  -->
							<view class="rounded-20 overflow-hidden flex align-center justify-center border" :class="activeProduct.product_id == item.product_id ? 'border-primary' : ''" style="width: 310rpx; height: 310rpx">
								<image style="width: 310rpx" :src="utils.showImageUrl(item.product_cover)" mode="widthFix"></image>
							</view>
							<view class="text-ellipsis text-center mt-1" style="width: 310rpx">
								<text :class="activeProduct.product_id == item.product_id ? 'text-primary' : ''" class="font-32">{{ item.product_name }}</text>
							</view>
						</view>
					</view>
					<view class="bg-white py-2">
						<no-data v-if="list.length == 0"></no-data>
					</view>
				</view>
			</view>
			<!-- 选择纸张 -->
			<tui-bottom-popup isFixed :zIndex="1002" :maskZIndex="1001" :show="popupShow == 1">
				<view class="py-3 px-3 flex align-center justify-between">
					<text class="font-32">选择纸张</text>
					<image @click="popupShow = 0" style="width: 40rpx; height: 40rpx" src="/static/images/icon/close.png" mode=""></image>
				</view>
				<view class="px-2 bg-white flex align-center" style="height: 80rpx">
					<view class="rounded-circle flex align-center px-2 flex-1" style="background-color: #f5f5f5; height: 64rpx">
						<input v-model="materialQueryInfo.material_name" class="font-26 flex-1" type="text" placeholder="输入纸张名称搜索" placeholder-style="color: #ccc" />
						<image @click="searchMaterial" style="width: 40rpx; height: 40rpx" src="/static/images/common/ss.png" mode=""></image>
					</view>
				</view>
				<view class="flex flex-wrap">
					<view @click="selectActiveMaterial(item)" v-for="(item, index) in materialList" :key="index" class="m-2">
						<view class="rounded-20 overflow-hidden flex align-center justify-center border" :class="activeMaterial.material_id == item.material_id ? 'border-primary' : ''" style="width: 208rpx; height: 208rpx">
							<image style="width: 248rpx" :src="utils.showImageUrl(item.material_cover)" mode="widthFix"></image>
						</view>
						<view class="text-ellipsis text-center mt-1" style="width: 208rpx">
							<text :class="activeMaterial.material_id == item.material_id ? 'text-primary' : ''" class="font-32">{{ item.material_name }}</text>
						</view>
					</view>
				</view>
				<!-- 按钮 -->
				<view class="pt-2 pb-4 flex align-center justify-center px-2">
					<view @click="setFormInfo" class="flex-1 flex align-center justify-center linear-gradient rounded-circle" style="height: 100rpx">
						<text class="text-white">确认，下一步</text>
					</view>
				</view>
			</tui-bottom-popup>
		</template>
	</page>
</template>

<script setup>
import store from '@/store/index.js';
import utils from '@/utils/utils.js';
import api from '@/request/api.js';
import { ref, computed, reactive, toRefs, onMounted } from 'vue';

import { onShow, onLoad } from '@dcloudio/uni-app';

const data = reactive({
	triggered: false,
	stylesAllList: [],
	activeStyle: {},
	queryInfo: {
		product_styles_id: '',
		product_type: 1,
		product_width: '',
		product_height: '',
		product_name: ''
	},
	list: [],
	activeProduct: {},
	popupShow: 0,
	materialQueryInfo: {
		material_name: '',
		ids: []
	},
	materialList: [],
	activeMaterial: {}
});
const { triggered, stylesAllList, activeStyle, queryInfo, list, activeProduct, popupShow, materialQueryInfo, materialList, activeMaterial } = toRefs(data);

const orderFrom = computed(() => {
	return store.state.orderFrom;
});

const userInfo = computed(() => {
	return store.state.userInfo;
});

const selectProduct = (item) => {
	data.activeProduct = item;
	// 存入表单
	const productObj = {
		product_id: data.activeProduct.product_id,
		product_name: data.activeProduct.product_name,
		product_print: data.activeProduct.product_print,
		product_type: data.activeProduct.product_type,
		product_width: data.activeProduct.product_width,
		product_height: data.activeProduct.product_height
	};
	const productInfo = {
		order_product_id: productObj.product_id,
		order_product_name: productObj.product_name,
		order_product_info: JSON.stringify(productObj),
		order_product_info_obj: productObj
	};
	// 设置表单
	store.commit('SET_ORDER_FORM', productInfo);
	// 弹窗选择纸张
	getMaterialByIds();
};

const searchMaterial = () => {
	getMaterialByIds();
};

// 查询材质列表
const getMaterialByIds = () => {
	api.getMaterialByIds(data.materialQueryInfo).then((res) => {
		console.log('res', res);
		data.materialList = res.data;
		data.popupShow = 1;
	});
};

// 设置选中材质
const selectActiveMaterial = (item) => {
	data.activeMaterial = {
		material_cover: item.material_cover,
		material_id: item.material_id,
		material_name: item.material_name
	};
};

const setFormInfo = () => {
	// 设置材质信息
	let meterialInfo = {};
	if (data.activeMaterial?.material_id > 0) {
		console.log('选择了材质');
		meterialInfo = {
			order_material_id: data.activeMaterial.material_id,
			order_material_name: data.activeMaterial.material_name,
			order_material_info: JSON.stringify(data.activeMaterial),
			order_material_info_obj: data.activeMaterial
		};
	} else {
		// 有材质列表但是没选 则默认 选择第一个
		if (data.materialList.length > 0) {
			data.activeMaterial = data.materialList[0];
			meterialInfo = {
				order_material_id: data.activeMaterial.material_id,
				order_material_name: data.activeMaterial.material_name,
				order_material_info: JSON.stringify(data.activeMaterial),
				order_material_info_obj: data.activeMaterial
			};
		}
	}
	const form = {
		...meterialInfo
	};
	data.popupShow = 0;
	// 设置表单
	store.commit('SET_ORDER_FORM', form);
	// 跳转到模版选择页面
	utils.goToPage('product-preview', `product_id=${data.activeProduct.product_id}`);
};

const setQyeryInfo = (item) => {
	data.activeStyle = item;
	data.queryInfo.product_styles_id = item.value;
	search();
};

const search = () => {
	data.list = [];
	getProductByIds();
};

// 下拉刷新
const refresherrefresh = () => {
	data.triggered = true;
	data.list = [];
	getProductByIds();
};

// 上滑加载
const scrolltolower = () => {};

// const goToPage = (item) => {
// 	utils.goToPage('problem-info', `configs_id=${item.configs_id}`)
// }

const getProductByIds = () => {
	console.log('data.queryInfo: ', data.queryInfo);
	api.getProductByIds(data.queryInfo).then(
		(res) => {
			console.log('res', res);
			data.list = res.data;
			data.triggered = false;
		},
		() => {
			data.triggered = false;
		}
	);
};

const getStylesAllList = () => {
	api.getStylesAllList().then(
		(res) => {
			data.stylesAllList = res.data;
			if (data.stylesAllList.length > 0) {
				data.activeStyle = data.stylesAllList[0];
				console.log('data.activeStyle', data.activeStyle);
				data.queryInfo.product_styles_id = data.activeStyle.value;
				console.log('data.queryInfo', data.queryInfo);
				getProductByIds();
			} else {
				getProductByIds();
			}
		},
		() => {
			data.triggered = false;
		}
	);
};

onShow(() => {});

onLoad(() => {
	console.log('orderFrom', orderFrom.value);
	if (orderFrom.value?.order_spec_info_obj?.spec_width) {
		data.queryInfo.product_width = orderFrom.value?.order_spec_info_obj?.spec_width;
		data.queryInfo.product_height = orderFrom.value?.order_spec_info_obj?.spec_height;
	}
	console.log('data.queryInfo', data.queryInfo);
	getStylesAllList();
});
</script>

<style>
.order-linear-gradient {
	background-image: linear-gradient(to right, rgba(0, 165, 234, 0.18), #fff);
}
</style>

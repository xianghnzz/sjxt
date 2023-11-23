<template>
	<page bgColor="#F7F7F9" :topHeight="0" :bottomHeight="100" :refresherEnabled="true" :triggered="triggered"
		:refresherrefresh="refresherrefresh" :scrolltolower="scrolltolower">
		<template v-slot:content>
			<view class="home-bg" style="width: 750rpx;">
				<view class="flex align-center justify-center px-3 pt-10">
					<uni-swiper-dot :info="bannerList" :current="current" :dotsStyles="dotsStyles" :mode="mode">
						<swiper class="rounded-6 overflow-hidden" style="width: 688rpx; height: 358rpx;"
							@change="change">
							<swiper-item v-for="(item ,index) in bannerList" :key="index">
								<image style="width: 688rpx; height: 358rpx;" :src="utils.showImageUrl(item.url)"
									mode="widthFix"></image>
							</swiper-item>
						</swiper>
					</uni-swiper-dot>
				</view>

			</view>
			<view class="flex flex-column align-center">
				<view class="flex align-center justify-center">
					<image style="width: 750rpx;" src="/static/images/home/selectBg.png" mode="widthFix"></image>
				</view>
				<view class="px-1 bg-white"
					style="width: 624rpx; margin-top: -8rpx; box-shadow: 0px 4rpx 24rpx rgba(0, 169, 239, 0.24);">
					<view class="px-2" style="width: 100%;">
						<view v-for="(item,index) in entryList" :key="index" class="mb-1">
							<view class="flex align-center">
								<image style="width: 28rpx; height: 16rpx;" src="/static/images/home/zs.png" mode="">
								</image>
								<text class="ml-1 font-32">{{item.configs_name}}</text>
							</view>
							<view class="rounded-6 mt-1 flex align-center justify-between" style=" height: 88rpx;">
								<input v-if="item.configs_use == 1" class="rounded-10 text-left px-2 flex-1 font-28"
									style="height: 88rpx; background-color: #F3F7FF;" type="text"
									v-model="entryList[index].configs_use_input"
									:placeholder="item.configs_value">
								<uni-data-select v-else-if="item.configs_use == 2" :clear="false" style="width: 100%;"
									:localdata="JSON.parse(item.configs_use_select)"
									v-model="entryList[index].configs_use_input"
									:placeholder="item.configs_value"></uni-data-select>
								<uni-datetime-picker v-else type="date" start="2023-10-11" end="2099-12-31"
									:placeholder="item.configs_value" />
								<view @click="setCItemValue(item)" v-if="item.configs_illustrate"
									v-model="entryList[index].configs_use_input"
									class="ml-2 flex align-center justify-center">
									<image style="width: 32rpx; height: 32rpx;" src="/static/images/home/tisp.png"
										mode=""></image>
								</view>
							</view>
						</view>
					</view>
					<view class="pt-2 pb-4 flex align-center justify-center px-2">
						<view @click="startCustomized" class="flex-1 flex align-center justify-center linear-gradient rounded-circle"
							style="height: 100rpx;">
							<text class="text-white">开始定制</text>
						</view>
					</view>
				</view>
			</view>
			<view class="" style="height: 50px;">

			</view>
			<tui-modal :show="showModal == 1" custom>
				<view class="rounded-20 bg-white border-box font pb-3" style="width: 600rpx;">
					<view class="py-2 text-center">
						<text class="font-40 font-weight-bold">提示</text>
					</view>
					<scroll-view class="p-2" scroll-y="true" style="height: 600rpx;">
						<mp-html :content="cItem.configs_illustrate"></mp-html>
					</scroll-view>
					<view class="px-5 flex align-center justify-center px-2">
						<view @click="showModal = 0" class="flex-1 flex align-center justify-center linear-gradient rounded-circle"
							style="height: 80rpx;">
							<text class="text-white">知道了</text>
						</view>
					</view>
				</view>
			</tui-modal>
		</template>
		<template v-slot:bottomBar>
			<menu-bar activeMenu="home"></menu-bar>
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
		onLoad
	} from "@dcloudio/uni-app";

	import menuBar from "@/components/menu-bar/menu-bar.vue";

	const data = reactive({
		triggered: false,
		queryInfo: {
			configs_type: "home",
		},
		bannerList: [],
		current: 0,
		mode: 'round',
		dotsStyles: {
			border: 'none',
			selectedBackgroundColor: "#00A3E8",
			selectedBorder: 'none'
		},
		entryList: [],
		showModal: 0,
		cItem: {}
	});
	const {
		triggered,
		queryInfo,
		bannerList,
		current,
		mode,
		dotsStyles,
		entryList,
		showModal,
		cItem
	} = toRefs(data);

	const change = (e) => {
		data.current = e.detail.current;
	}
	
	const setCItemValue = (item) => {
		data.cItem = item;
		data.showModal = 1;
	}
	
	const startCustomized = () => {
		const orderInfo = [];
		data.entryList.forEach(item => {
			orderInfo.push({
				configs_id: item.configs_id,
				configs_name: item.configs_name,
				configs_use_input: item.configs_use_input,
			})
		})
		// 设置表单
		store.commit('SET_ORDER_FORM', {
			order_info: JSON.stringify(orderInfo),
			order_info_list: orderInfo,
		})
		// 跳转到产品选择页面
		utils.goToPage('product-selection')
	}

	// 下拉刷新
	const refresherrefresh = () => {
		getConfigsList()
	}

	// 滑动更多
	const scrolltolower = () => {}

	const getConfigsList = () => {
		api.getConfigsList(data.queryInfo).then(res => {
			data.list = res.data;
			// 解构bannerList
			const bannerConfigItem = res.data.find(e => e.configs_key == 'banner');
			if (bannerConfigItem?.configs_content) {
				data.bannerList = JSON.parse(bannerConfigItem.configs_content)
			} else {
				data.bannerList = []
			}
			data.entryList = res.data.filter(e => e.configs_key != 'banner')
		})
	}

	onMounted(() => {
		getConfigsList()
	})
	
	onLoad(() => {
		console.log('linkInfo', linkInfo);
		if(linkInfo?.links_id) {
			// 获取链接信息
			api.getLinksInfo({links_id: linkInfo.links_id}).then(res => {
				if(window.linkInfo) {
					window.linkInfo = null;
				}
				const info = res.data;
				// 设置表单数据
				const form = {
					order_id: 0,
					order_custom_id: 0,
					order_info: info.links_info,
					order_info_list: JSON.parse(info.links_info),
					order_material_id: info.links_material_id,
					order_material_name: info.links_material_name,
					order_material_info: info.links_material_info,
					order_material_info_obj: JSON.parse(info.links_material_info),
					order_cover: info.links_cover,
					order_commodity_id: info.links_commodity_id,
					order_commodity_name: info.links_commodity_name,
					order_commodity_info: info.links_commodity_info,
					order_commodity_info_obj: JSON.parse(info.links_commodity_info),
					order_spec_id: info.links_spec_id,
					order_spec_name: info.links_spec_name,
					order_spec_info: info.links_spec_info,
					order_spec_info_obj: JSON.parse(info.links_spec_info),
					order_product_id: info.links_product_id,
					order_product_name: info.links_product_name,
					order_product_info: info.links_product_info,
					order_product_info_obj: JSON.parse(info.links_product_info),
					order_status: 0,
					order_remarks: "",
					order_del: 0,
					order_frequency: 0,
				}
				store.commit('SET_ORDER_FORM', form)
				// 跳转页面
				if(form?.order_commodity_info?.commodity_book == 1) {
					if(form?.order_commodity_info_obj?.commodity_mode == 1) {
						utils.goToPage('product-book-free-edit')
					} else {
						utils.goToPage('product-book-edit')
					}
				} else {
					if(form?.order_commodity_info_obj?.commodity_mode == 1) {
						utils.goToPage('product-free-edit')
					} else {
						utils.goToPage('product-edit')
					}
				}
				
			})
		}
	})
</script>

<style>
	.home-bg {
		background-color: #FCFCFD;
		background-image: url("~@/static/images/home/topBg.png");
		background-size: 750rpx 388rpx;
		background-repeat: no-repeat;
	}
</style>
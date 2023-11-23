<template>
	<page bgColor="#E9F3F9" topColor="#00AEEF" :topHeight="88" :refresherEnabled="true" :triggered="triggered"
		:refresherrefresh="refresherrefresh" :scrolltolower="scrolltolower">
		<template v-slot:navBar>
			<view class="text-center flex align-center justify-center" style="height: 88rpx;">
				<text class="font-36 text-white">企业定制</text>
				<view @click="utils.goBack()" class="position-absolute rounded-circle flex align-center justify-center"
					style="width: 40rpx; height: 32rpx; left: 32rpx;">
					<image style="width: 40rpx; height: 32rpx;" src="/static/images/common/back_bai.png" mode="">
					</image>
				</view>
			</view>
		</template>
		<template v-slot:content>
			<view class="p-2">
				<view class="" style="height: 130rpx;"></view>
				<view class="flex align-center justify-center">
					<view class="content-bg">
						<view class="flex align-center justify-center" style="height: 80rpx; background-color: #00A5EA;">
							<text class="text-white">扫一扫二维码</text>
						</view>
						<view class="mx-3 text-center pt-1" style="height: 110rpx; border-bottom: 2rpx dashed #CECECE;">
							<text class="font-14">您可扫码添加下方微信沟通定制合作事宜</text>
						</view>
						<view class="flex align-center justify-center" style="height: 520rpx;">
							<view class="p-1 rounded-10 border flex align-center justify-center">
								<image style="width: 400rpx; height: 400rpx;" :src="utils.showImageUrl(info.configs_value || '')" mode=""></image>
							</view>
						</view>
						<view class="text-center">
							<text class="font-12" style="color: #F58220;">注明需求来意</text>
						</view>
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
		queryInfo: {
			configs_type: "customer",
		},
		info: {},
	});
	const {
		triggered,
		queryInfo,
		info,
	} = toRefs(data);

	const userInfo = computed(() => {
		return store.state.userInfo
	})

	// 下拉刷新
	const refresherrefresh = () => {
		data.triggered = true;
		getConfigsInfoById()
	}

	// 上滑加载
	const scrolltolower = () => {}
	
	const getConfigsList = () => {
		api.getConfigsList(data.queryInfo).then(res => {
			if(res.data.length > 0) {
				data.info = res.data[0]
			}
		})
	}
	onShow(() => {})

	onLoad((info) => {
		getConfigsList()
	})
</script>

<style>
	
	.content-bg {
		width: 686rpx;
		height: 824rpx;
		background-image: url("~@/static/images/enterprise-customization/contentBg.png");
		background-size: 686rpx 824rpx;
		background-repeat: no-repeat;
	}
	
	.order-linear-gradient {
		background-image: linear-gradient(to right, rgba(0, 165, 234, 0.18), #fff);
	}
</style>
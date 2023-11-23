<template>
	<page bgColor="#fff" topColor="#00AEEF" :topHeight="88" :refresherEnabled="true" :triggered="triggered"
		:refresherrefresh="refresherrefresh" :scrolltolower="scrolltolower">
		<template v-slot:navBar>
			<view class="text-center flex align-center justify-center" style="height: 88rpx;">
				<text class="font-36 text-white">问题详情</text>
				<view @click="utils.goBack()" class="position-absolute rounded-circle flex align-center justify-center"
					style="width: 40rpx; height: 32rpx; left: 32rpx;">
					<image style="width: 40rpx; height: 32rpx;" src="/static/images/common/back_bai.png" mode="">
					</image>
				</view>
			</view>
		</template>
		<template v-slot:content>
			<view class="p-2">
				<view class="">
					<text class="font-32 font-weight-bold">{{info.configs_name}}</text>
				</view>
				<view class="mt-2">
					<mp-html :content="info.configs_illustrate"></mp-html>
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
			configs_id: "",

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


	const getConfigsInfoById = () => {
		api.getConfigsInfoById(data.queryInfo).then(res => {
			console.log('res', res);
			if (res.data) {
				data.info = res.data
			}
			data.triggered = false;
		}, () => {
			data.triggered = false;
		})
	}

	onShow(() => {})

	onLoad((info) => {
		data.queryInfo.configs_id = info.configs_id;
		getConfigsInfoById()
	})
</script>

<style>
	.order-linear-gradient {
		background-image: linear-gradient(to right, rgba(0, 165, 234, 0.18), #fff);
	}
</style>
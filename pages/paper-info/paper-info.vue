<template>
	<page bgColor="#fff" topColor="#00AEEF" :topHeight="88" :refresherEnabled="true" :triggered="triggered"
		:refresherrefresh="refresherrefresh" :scrolltolower="scrolltolower">
		<template v-slot:navBar>
			<view class="text-center flex align-center justify-center" style="height: 88rpx;">
				<text class="font-36 text-white">纸张详情</text>
				<view @click="utils.goBack()" class="position-absolute rounded-circle flex align-center justify-center"
					style="width: 40rpx; height: 32rpx; left: 32rpx;">
					<image style="width: 40rpx; height: 32rpx;" src="/static/images/common/back_bai.png" mode="">
					</image>
				</view>
			</view>
		</template>
		<template v-slot:content>
			<view class="p-2">
				<view class="text-center">
					<text class="font-32 font-weight-bold">{{info.configs_name}}</text>
				</view>
				<template v-if="info.configs_key == 'video'">
					<view v-if="info.configs_content_list.length > 0" class="mt-2">
						<video style="width: 100%; height: 500rpx;" :src="utils.showImageUrl(info.configs_content_list[0].url)" :controls="true"></video>
					</view>
				</template>
				<view v-else class="mt-2">
					<image @click="previewImage(utils.showImageUrl(item.url), 0)" v-for="item, index in info.configs_content_list" style="width: 100%;" :src="utils.showImageUrl(item.url)" mode="widthFix"></image>
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
	
	const previewImage = (url, index) => {
		uni.previewImage({
			urls: [url]
		})
	}


	const getConfigsInfoById = () => {
		api.getConfigsInfoById(data.queryInfo).then(res => {
			if (res.data) {
				if (res.data.configs_content) {
					res.data.configs_content_list = JSON.parse(res.data.configs_content)
				} else {
					res.data.configs_content_list = [];
				}
				console.log('res', res);
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
<template>
	<page bgColor="#fff" topColor="#00AEEF" :topHeight="88" :refresherEnabled="true" :triggered="triggered"
		:refresherrefresh="refresherrefresh" :scrolltolower="scrolltolower">
		<template v-slot:navBar>
			<view class="text-center flex align-center justify-center" style="height: 88rpx;">
				<text class="font-36 text-white">常见问题</text>
				<view @click="utils.goBack()" class="position-absolute rounded-circle flex align-center justify-center"
					style="width: 40rpx; height: 32rpx; left: 32rpx;">
					<image style="width: 40rpx; height: 32rpx;" src="/static/images/common/back_bai.png" mode="">
					</image>
				</view>
			</view>
		</template>
		<template v-slot:content>
			<view class="p-2">
				<view class="rounded-circle flex align-center px-2" style="background-color: #F5F5F5; height: 64rpx;">
					<input v-model="queryInfo.configs_name" class="font-26 flex-1" type="text" placeholder="输入问题名称搜索" placeholder-style="color: #ccc">
					<image @click="search" style="width: 40rpx; height: 40rpx;" src="/static/images/common/ss.png" mode=""></image>
				</view>
				<view class="py-2">
					<view @click="goToPage(item)" v-for="item, index in list" :key="index" class="flex align-center mb-2" style="height: 120rpx;">
						<image style="width: 94rpx; height: 94rpx;" src="/static/images/common-problem/icon.png" mode=""></image>
						<view class="ml-2 flex-1 border-bottom" style="height: 120rpx;">
							<view class="flex align-center justify-between">
								<view class="text-ellipsis" style="width: 320rpx;">
									<text class="font-32 font-weight-bold">{{item.configs_name}}</text>
								</view>
								<view class="">
									<text class="font-26 text-color-999">{{item.configs_create_time}}</text>
								</view>
							</view>
							<view class="mt-1 overflow-hidden position-relative" style="height: 60rpx;">
								<mp-html :content="item.configs_illustrate"></mp-html>
								<view @click.stop="goToPage(item)" class="position-absolute top-0 bottom-0 right-0 left-0"></view>
							</view>
						</view>
					</view>
				</view>
			</view>
			<no-data v-if="list.length == 0"></no-data>
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
			configs_name: "",
			pageNum: 1,
			pageSize: 10,
		},
		list: [],
		current_page: 1,
		last_page: 1,
	});
	const {
		triggered,
		queryInfo,
		list,
	} = toRefs(data);

	const userInfo = computed(() => {
		return store.state.userInfo
	})
	
	const search = () => {
		data.list = [];
		data.current_page = 1;
		data.last_page = 1;
		data.queryInfo.pageNum = 1;
		getProblemList()
	}

	// 下拉刷新
	const refresherrefresh = () => {
		data.triggered = true;
		data.list = [];
		data.current_page = 1;
		data.last_page = 1;
		data.queryInfo.pageNum = 1;
		getProblemList()
	}

	// 上滑加载
	const scrolltolower = () => {
		if (data.current_page >= data.last_page) {
			utils.showToast('没有更多数据了')
			return false
		}
		getProblemList()
	}

	const goToPage = (item) => {
		utils.goToPage('problem-info', `configs_id=${item.configs_id}`)
	}

	const getProblemList = () => {
		api.getProblemList(data.queryInfo).then(res => {
			data.queryInfo.pageNum = data.queryInfo.pageNum + 1;
			data.list = [...data.list, ...res.data.data];
			data.current_page = res.data.current_page;
			data.last_page = res.data.last_page;
			data.triggered = false;
		}, () => {
			data.triggered = false;
		})
	}

	onShow(() => {})

	onLoad(() => {
		getProblemList()
	})
</script>

<style>
	.order-linear-gradient {
		background-image: linear-gradient(to right, rgba(0, 165, 234, 0.18), #fff);
	}
</style>
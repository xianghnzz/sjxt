<template>
	<page bgColor="#F7F7F9" :topHeight="0" :bottomHeight="100" :refresherEnabled="false" >
		<template v-slot:content>
			<view class="home-bg" style="width: 750rpx;">
				<view class="" style="height: 88rpx;">
					
				</view>
				<view class="px-2">
					<view class="">
						<text class="font-48 font-weight-bold text-white">{{userInfo.custom_name || '注册用户'}}</text>
					</view>
					<view class="mt-2">
						<text class="font-32 text-white">{{userInfo.custom_phone || '未填写手机号'}}</text>
					</view>
				</view>
				<view class="mt-6 mx-2 bg-white rounded-20 flex align-center justify-center py-4">
					<view @click="utils.goToPage('order')" class="flex flex-column align-center mx-5">
						<image style="width: 46rpx; height: 50rpx;" src="/static/images/me/wddd.png" mode=""></image>
						<view class="">
							<text class="font-22">我的订单</text>
						</view>
					</view>
					<view @click="utils.goToPage('common-problem')" class="flex flex-column align-center mx-5">
						<image style="width: 46rpx; height: 50rpx;" src="/static/images/me/cjwt.png" mode=""></image>
						<view class="">
							<text class="font-22">常见问题</text>
						</view>
					</view>
					<view @click="utils.goToPage('paper-introduction')" class="flex flex-column align-center mx-5">
						<image style="width: 46rpx; height: 50rpx;" src="/static/images/me/zzjx.png" mode=""></image>
						<view class="">
							<text class="font-22">纸张介绍</text>
						</view>
					</view>
				</view>
			</view>
			<view class="m-2 bg-white rounded-20 py-2">
				<view @click="utils.goToPage('message')" class="flex align-center px-4" style="height: 120rpx;">
					<image style="width: 30rpx; height: 32rpx;" src="/static/images/me/xqly.png" mode=""></image>
					<text class="ml-1 font-28 flex-1">需求留言</text>
					<image style="width: 36rpx; height: 36rpx;" src="/static/images/me/more.png" mode=""></image>
				</view>
				<view @click="utils.goToPage('complaint')" class="flex align-center px-4" style="height: 120rpx;">
					<image style="width: 30rpx; height: 32rpx;" src="/static/images/me/tsjy.png" mode=""></image>
					<text class="ml-1 font-28 flex-1">投诉建议</text>
					<image style="width: 36rpx; height: 36rpx;" src="/static/images/me/more.png" mode=""></image>
				</view>
				<view @click="utils.goToPage('enterprise-customization')" class="flex align-center px-4" style="height: 120rpx;">
					<image style="width: 30rpx; height: 32rpx;" src="/static/images/me/qydz.png" mode=""></image>
					<text class="ml-1 font-28 flex-1">企业定制</text>
					<image style="width: 36rpx; height: 36rpx;" src="/static/images/me/more.png" mode=""></image>
				</view>
			</view>
		</template>
		<template v-slot:bottomBar>
			<menu-bar activeMenu="me"></menu-bar>
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

	const data = reactive({});
	
	const {
		
	} = toRefs(data);

	const userInfo = computed(() => {
		return store.state.userInfo
	})

	console.log('userInfo', userInfo.value);

	onMounted(() => {})
</script>

<style>
	.home-bg {
		background-image: url("~@/static/images/home/topBg.png");
		background-size: 750rpx 388rpx;
		background-repeat: no-repeat;
	}
</style>
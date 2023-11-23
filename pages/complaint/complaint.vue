<template>
	<page bgColor="#F7F8FA" topColor="#00AEEF" :topHeight="88" :refresherEnabled="false">
		<template v-slot:navBar>
			<view class="text-center flex align-center justify-center" style="height: 88rpx;">
				<text class="font-36 text-white">投诉建议</text>
				<view @click="utils.goBack()" class="position-absolute rounded-circle flex align-center justify-center"
					style="width: 40rpx; height: 32rpx; left: 32rpx;">
					<image style="width: 40rpx; height: 32rpx;" src="/static/images/common/back_bai.png" mode="">
					</image>
				</view>
			</view>
		</template>
		<template v-slot:content>
			<view class="p-3">
				<view class="p-3 bg-white rounded-20">
					<view class="">
						<text class="font-32 font-weight-bold">您所遇到的问题</text>
					</view>
					<view class="flex align-center border rounded-10 mt-2 px-2" style="height: 60rpx;">
						<input class="font-28" type="text" placeholder="请输入内容" v-model="form.complaint_problem" placeholder-style="color:#ccc">
					</view>
					<view class="mt-2">
						<text class="font-32 font-weight-bold">期望改进的地方</text>
					</view>
					<view class="flex align-center border rounded-10 mt-2 px-2" style="height: 60rpx;">
						<input class="font-28" type="text" placeholder="请输入内容" v-model="form.complaint_improve" placeholder-style="color:#ccc">
					</view>
					<view class="mt-2">
						<text class="font-32 font-weight-bold">建议反馈</text>
					</view>
					<view class="flex align-center border rounded-10 mt-2 p-1" style="height: 130rpx;">
						<textarea style="width: 100%; height: 100%;" :maxlength="-1" v-model="form.complaint_recommendation" placeholder="请输入内容" placeholder-style="color:#ccc"></textarea>
					</view>
					<view class="mt-2">
						<text class="font-32 font-weight-bold">联系方式</text>
					</view>
					<view class="flex align-center border rounded-10 mt-2 px-2" style="height: 60rpx;">
						<input class="font-28" type="text" v-model="form.complaint_custom_name" placeholder="请输入姓名" placeholder-style="color:#ccc">
					</view>
					<view class="flex align-center border rounded-10 mt-2 px-2" style="height: 60rpx;">
						<input class="font-28" type="text" v-model="form.complaint_custom_phone" placeholder="请输入电话" placeholder-style="color:#ccc">
					</view>
				</view>
				<view class="p-4 flex align-center justify-center">
					<view @click="addComplaint" class="flex-1 flex align-center justify-center linear-gradient rounded-circle"
						style="height: 100rpx;">
						<text class="text-white">确定提交</text>
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
		form: {
			complaint_id: "",
			complaint_problem: "",
			complaint_improve: "",
			complaint_recommendation: "",
			complaint_custom_id: "",
			complaint_custom_name: "",
			complaint_custom_phone: "",
		}
	});
	const {
		triggered,
		form
	} = toRefs(data);

	const userInfo = computed(() => {
		return store.state.userInfo
	})

	// 下拉刷新
	const refresherrefresh = () => {}

	// 上滑加载
	const scrolltolower = () => {}
	
	// 添加留言
	const addComplaint = () => {
		api.addComplaint(data.form).then(res => {
			utils.showToast('提交成功')
			data.form = {
				complaint_id: "",
				complaint_problem: "",
				complaint_improve: "",
				complaint_recommendation: "",
				complaint_custom_id: userInfo.value.custom_id,
				complaint_custom_name: "",
				complaint_custom_phone: "",
			}
		})
	}


	onShow(() => {})

	onLoad((info) => {
		data.form.complaint_custom_id = userInfo.value.custom_id
	})
</script>

<style>
</style>
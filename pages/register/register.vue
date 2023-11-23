<template>
	<page bgColor="#fff" :refresherEnabled="false" topFixed topColor="transparent">
		<template v-slot:navBar>
			<view class="text-center flex align-center justify-center position-relative"
				style="width: 750rpx;height: 88rpx;">
				<text class="font-36"></text>
				<view @click="utils.goBack()" class="position-absolute rounded-circle flex align-center justify-center"
					style="width: 40rpx; height: 32rpx; left: 32rpx;">
					<image style="width: 40rpx; height: 32rpx;" src="/static/images/common/back.png" mode="">
					</image>
				</view>
			</view>
		</template>
		<template v-slot:content>
			<view class="p-6 login-bg" style="min-height: 100%;">
				<view class="pt-12 flex align-center justify-center">
					<text class="font-48 font-weight-bold">快速注册</text>
				</view>
				<view class="py-6">
					<view class="py-3 border-bottom flex align-center" style="height: 100rpx;">
						<input class="font-32 flex-1" type="text" v-model="form.custom_number" placeholder="请输入账号"
							placeholder-style="color: #ccc">
					</view>
					<view class="py-3 border-bottom flex align-center" style="height: 100rpx;">
						<input class="font-32 flex-1" type="text" v-model="form.custom_password" placeholder="请输入手机号码"
							placeholder-style="color: #ccc">
					</view>
					<view class="py-3 border-bottom flex align-center justify-center">
						<input class="font-32 flex-1" type="text" v-model="form.custom_phone" placeholder="请输入密码"
							placeholder-style="color: #ccc">
					</view>
					<view class="py-3 border-bottom flex align-center justify-center">
						<input class="font-32 flex-1" type="text" v-model="form.custom_name" placeholder="请输入姓名"
							placeholder-style="color: #ccc">
					</view>
					<view class="py-3 border-bottom flex align-center justify-center">
						<input class="font-32 flex-1" type="text" v-model="form.custom_id_card" placeholder="请输入身份证号"
							placeholder-style="color: #ccc">
					</view>
				</view>
				<view class="pt-6 px-2">
					 <view @click="register" class="rounded-circle flex align-center justify-center linear-gradient" style="height: 100rpx;">
					 	<text class="text-white font-32">立即注册</text>
					 </view>
				</view>
				<view  @click="utils.goBack()" class="p-6 flex align-center justify-center font-26">
					<text class="text-color-666">已有账号，立即</text>
					<text class="text-primary">登录</text>
				</view>
			</view>
		</template>
	</page>
</template>

<script setup>
	import store from "@/store/index.js";
	import formValidation from "@/components/thorui/tui-validation/tui-validation.js";
	import utils from "@/utils/utils.js";
	import api from "@/request/api.js";

	import {
		ref,
		computed,
		reactive,
		toRefs,
	} from "vue";

	import {
		onLoad
	} from "@dcloudio/uni-app";
	const data = reactive({
		form: {
			custom_number: "",
			custom_password: "",
			custom_phone: "",
			custom_name: "",
			custom_id_card: "",
		},
		rules: [{
				name: "custom_number",
				rule: ["required"],
				msg: ["请输入账号"]
			},
			{
				name: "custom_phone",
				rule: ["required"],
				msg: ["请输入手机号"]
			},
			{
				name: "custom_password",
				rule: ["required"],
				msg: ["请输入密码"]
			},
			{
				name: "custom_name",
				rule: ["required"],
				msg: ["请输入姓名"]
			},
			{
				name: "custom_id_card",
				rule: ["required"],
				msg: ["请输入身份证号"]
			},
		],
	});
	const {
		form,
	} = toRefs(data);

	const register = () => {
		// 进行表单检查
		const checkRes = formValidation.validation(data.form, data.rules);
		if (checkRes) {
			utils.showToast(checkRes)
			return
		}
		api.register(data.form).then(res => {
			utils.showToast(res.message);
			// 存token
			uni.setStorageSync('token', "Bearer " + res.data.token);
			uni.setStorageSync('userInfo', JSON.stringify(res.data.userInfo));
			utils.reToPage('home')
		})
	}

	onLoad((info) => {})
</script>

<style>
	.login-bg {
		background-image: url("~@/static/images/login/bgimg.png");
		background-size: 100% auto;
		background-repeat: no-repeat;
		background-position: top center;
	}
</style>
<template>
	<page bgColor="#fff" :refresherEnabled="false" topFixed>
		<template v-slot:content>
			<view class="p-6 login-bg" style="min-height: 100%;">
				<view class="pt-6">
					<image style="width: 384rpx; height: 150rpx;" src="/static/images/login/title.png" mode=""></image>
				</view>
				<view class="pt-6">
					<view class="py-3 border-bottom flex align-center" style="height: 100rpx;">
						<input class="font-36 flex-1" type="text" v-model="form.custom_number" placeholder="请输入账号"
							placeholder-style="color: #ccc">
					</view>
					<view class="py-3 border-bottom flex align-center justify-center">
						<input class="font-36 flex-1" type="password" v-model="form.custom_password" placeholder="请输入密码"
							placeholder-style="color: #ccc">
					</view>
				</view>
				<view class="pt-6 px-2">
					 <view @click="login" class="rounded-circle flex align-center justify-center linear-gradient" style="height: 100rpx;">
					 	<text class="text-white font-32">立即登录</text>
					 </view>
				</view>
				<view class="p-6 flex align-center justify-center font-26">
					<text class="mr-3 text-color-666" @click="utils.goToPage('register')">立即注册</text>
					<text class="text-warning ml-3" @click="utils.goToPage('reset')">忘记密码?</text>
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
	
	const data = reactive({
		form: {
			custom_number: "13618215584",
			custom_password: "123456",
		},
		rules: [{
				name: "custom_number",
				rule: ["required"],
				msg: ["请输入账号"]
			},
			{
				name: "custom_password",
				rule: ["required"],
				msg: ["请输入密码"]
			},
		],
	});
	const {
		form,
	} = toRefs(data);
	
	const login = () => {
		// 进行表单检查
		const checkRes = formValidation.validation(data.form, data.rules);
		if (checkRes) {
			utils.showToast(checkRes)
			return
		}
		// 验证通过！
		api.login(data.form).then(res => {
			store.commit("SET_VALUE", {
				key: "userInfo",
				value: res.data.userInfo
			});
			uni.setStorageSync('token', "Bearer " + res.data.token);
			uni.setStorageSync('userInfo', JSON.stringify(res.data.userInfo));
			utils.reToPage('home')
		})
	}
	
</script>

<style>
	.login-bg {
		background-image: url("~@/static/images/login/bgimg.png");
		background-size: 100% auto;
		background-repeat: no-repeat;
		background-position: top center;
	}
</style>
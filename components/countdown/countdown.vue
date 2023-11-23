<template>
	<view class="flex align-center" style="height: 80rpx;">
		<view v-if="btnShow" @click="getCode" class="flex justify-center align-center"
			style="width: 180rpx; height: 80rpx;">
			<text class="font-sm font-28">获取验证码</text>
		</view>
		<view v-if="!btnShow" class="flex justify-center align-center" style="width: 180rpx; height: 80rpx;">
			<text class="font-28">{{ count }} s</text>
		</view>
	</view>
</template>

<script setup>
	import formValidation from "@/components/thorui/tui-validation/tui-validation.js";
	import utils from "@/utils/utils.js";
	import api from "@/request/api.js";
	
	import {
		reactive,
		toRefs,
		defineProps
	} from "vue";

	const props = defineProps({
		// 验证的手机号
		validityPhone: {
			type: String,
			default: ""
		},
		// 验证类型
		validityType: {
			type: String,
			default: "h5_login"
		},
		// 需要验证
		needValidity: {
			type: Boolean,
			default: true
		},
		showTisp: {
			type: Boolean,
			default: false
		},
	})
	const emits = defineEmits(["showToken", "end"]);
	const data = reactive({
		btnShow: true,
		count: 0,
		codeTimer: null,
		rules: [{
			name: "mobile",
			rule: ["required", "isMobile"],
			msg: ["请输入手机号", "请输入正确的手机号"]
		}],
	})

	const {
		btnShow,
		count,
		codeTimer
	} = toRefs(data)

	// const getToken = () => {
	// 	const form = {
	// 		mobile: props.validityPhone,
	// 		codetype: props.validityType
	// 	}
	// 	const checkRes = formValidation.validation(form, data.rules);
	// 	if (checkRes) {
	// 		// 验证不通过，checkRes为返回提示信息
	// 		utils.showToast(checkRes)
	// 		return false;
	// 	}
	// 	emits("showToken");
	// }

	const getCode = (token) => {
		const form = {
			mobile: props.validityPhone,
			codetype: props.validityType,
		}
		if (props.needValidity == true) {
			const checkRes = formValidation.validation(form, data.rules);
			if (checkRes) {
				// 验证不通过，checkRes为返回提示信息
				utils.showToast(checkRes)
				return false;
			}
			api.getCode(form).then((res) => {
				countdown()
				if (props.showTisp == true) {
					console.log(111);
					utils.showToast('验证码已发送至您的手机，请注意查收！')
				}
			})
		} else {
			api.getCode(form).then((res) => {
				countdown()
				if (props.showTisp == true) {
					console.log(222);
					utils.showToast('验证码已发送至您的手机，请注意查收！')
				}
			})
		}
	}
	// 倒计时
	const countdown = () => {
		const TIME_COUNT = 60;
		data.btnShow = false;
		if (!data.timer) {
			data.count = TIME_COUNT;
			data.timer = setInterval(() => {
				if (data.count > 0 && data.count <= TIME_COUNT) {
					data.count--;
				} else {
					data.btnShow = true;
					clearInterval(data.timer);
					data.timer = null;
					emits("end");
				}
			}, 1000);
		}
	}

	defineExpose({
		getCode
	})
</script>

<style>
</style>
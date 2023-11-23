// 下载的插件
import luchRequest from '@/js_sdk/luch-request/luch-request/index.js';

import utils from "@/utils/utils.js";
import md5 from "@/utils/md5.js";
import config from "@/static/js/config.js";
const request = new luchRequest();

// 请求基础地址
const baseUrl = config.baseHttp + config.baseDirectory + "/index.php/api";
/**
 * @description 修改全局默认配置
 * @param {Function}
 */
request.setConfig((config) => {
	/* config 为默认全局配置*/
	/* 根域名 */
	config.baseURL = baseUrl;
	config.header = {};
	// #ifdef H5 || APP-PLUS || MP-ALIPAY || MP-WEIXIN
	// H5(HBuilderX 2.9.9+)、APP(HBuilderX 2.9.9+)、微信小程序（2.10.0）、支付宝小程序
	config.timeout = 60000
	// #endif
	return config
})



// 在请求之前拦截
request.interceptors.request.use((config) => {
	// 可使用async await 做异步操作
	const token = uni.getStorageSync('token');
	if (token) {
		config.header.Authorization = token;
	}
	uni.showLoading({
		title: "请稍后"
	})
	return config
}, config => {
	// 可使用async await 做异步操作
	return Promise.reject(config)
})


// 在请求之后拦截
request.interceptors.response.use((response) => {
	uni.hideLoading()
	/* 对响应成功做点什么 可使用async await 做异步操作*/
	return new Promise((resolve, reject) => {
		const res = response.data;
		if (res.code == 200) {
			return resolve(res)
		} else if (res.code == 205) {
			return resolve(res)
		} else if ([1001, 1005, 1004, 407].includes(res.code)) {
			utils.showToast(res.msg || res.message)
			setTimeout(() => {
				uni.clearStorageSync();
				utils.reToPage("login");
			}, 1800);
			return reject(res)
		} else {
			utils.showToast(res.msg || res.message)
			return reject(res)
		}
	})
}, (response) => {
	uni.hideLoading()
	/*  对响应错误做点什么 （statusCode !== 200）*/
	console.log(response)
	utils.showToast('服务器错误，联系管理员核实')
	return Promise.reject(response)
})


export default request;
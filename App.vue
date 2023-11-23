<script>
	import store from "@/store/index.js";
	import utils from "@/utils/utils.js";
	import api from "@/request/api.js";
	export default {
		onLaunch: function() {
			console.log('App Launch')
			this.getCacheUserInfo()
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		},
		methods: {
			getCacheUserInfo() {
				let userInfo = uni.getStorageSync("userInfo") ? JSON.parse(uni.getStorageSync("userInfo")) : null;
				if (userInfo) {
					store.commit("SET_VALUE", {
						key: "userInfo",
						value: userInfo
					})
					// 获取当前打开过的页面路由数组
					// let routes = getCurrentPages();
					utils.reToPage('home');
				} else {
					utils.reToPage('login');
				}
			}
		}
	}
</script>

<style>
	/*每个页面公共css */
	@import "./common/css/common.css";
	@import "./common/css/theme.css";
</style>
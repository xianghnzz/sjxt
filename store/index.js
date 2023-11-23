import api from "@/request/api.js";
import {
	createStore
} from "vuex";

const store = createStore({
	state() {
		return {
			// 设备信息
			deviceInfo: {
				statusBarHeight: 0,
				windowWidth: 0,
				windowHeight: 0,
				safeAreaInsets: {
					bottom: 0
				}
			},
			userInfo: uni.getStorageSync("userInfo") ? JSON.parse(uni.getStorageSync("userInfo")) : {},
			// 隐私政策
			yszc: "",
			// 服务协议
			fwxy: "",
			orderFrom: {
				order_id: 0,
				order_custom_id: 0,
				order_info: "",
				order_info_list: [],
				order_material_id: 0,
				order_material_name: "",
				order_material_info: "",
				order_material_info_obj: {},
				order_cover: "",
				order_commodity_id: 0,
				order_commodity_name: "",
				order_commodity_info: "",
				order_commodity_info_obj: {},
				order_spec_id: 0,
				order_spec_name: "",
				order_spec_info: "",
				order_spec_info_obj: {},
				order_product_id: 0,
				order_product_name: "",
				order_product_info: "",
				order_product_info_obj: {},
				order_status: 0,
				order_remarks: "",
				order_del: 0,
				order_frequency: 0,
			}
		}
	},
	getters: {
		// 状态栏
		statusBarHeight({
			deviceInfo
		}) {
			return deviceInfo.statusBarHeight
		},
		// 屏幕宽度
		windowWidth({
			deviceInfo
		}) {
			return deviceInfo.windowWidth
		},
		// 屏幕高度
		windowHeight({
			deviceInfo
		}) {
			return deviceInfo.windowHeight
		},
		// 底部栏
		buttomBarHeight({
			deviceInfo
		}) {
			return deviceInfo.safeAreaInsets.bottom
		},
	},
	mutations: {
		// 赋值state
		SET_VALUE(state, data) {
			let {
				key,
				value
			} = data;
			state[key] = value;
		},
		SET_ORDER_FORM(state, data) {
			state.orderFrom = Object.assign(state.orderFrom, data);
		},
	},
	actions: {
		getUserInfo(store) {
			api.getInfo().then(res => {
				console.log('res', res);
				store.commit("SET_VALUE", {
					key: "userInfo",
					value: res.result
				})
				uni.setStorageSync('userInfo', JSON.stringify(res.result));
			})
		}
	},
	modules: {},
});
export default store;
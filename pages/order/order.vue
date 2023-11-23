<template>
	<page bgColor="#F7F8F9" topColor="#00AEEF" :topHeight="88" :refresherEnabled="true" :triggered="triggered" :refresherrefresh="refresherrefresh" :scrolltolower="scrolltolower">
		<template v-slot:navBar>
			<view class="text-center flex align-center justify-center" style="height: 88rpx">
				<text class="font-36 text-white">我的订单</text>
				<view @click="utils.goBack()" class="position-absolute rounded-circle flex align-center justify-center" style="width: 40rpx; height: 32rpx; left: 32rpx">
					<image style="width: 40rpx; height: 32rpx" src="/static/images/common/back_bai.png" mode=""></image>
				</view>
			</view>
		</template>
		<template v-slot:content>
			<view class="p-3">
				<view v-for="(item, index) in list" :key="index" class="rounded-10 overflow-hidden bg-white mb-2">
					<view class="order-linear-gradient flex align-center px-2 font-32 text-primary font-weight-bold" style="height: 80rpx">
						<text>ID:</text>
						<text>{{ item.order_id }}</text>
					</view>
					<view class="py-2 px-2">
						<view class="rounded-10 px-2 py-2" style="background-color: #eefafe">
							<view v-for="(item, index) in item.order_info_list" :key="index" class="font-28 py-1">
								<text style="color: #777">{{ item.configs_name }}:</text>
								<text class="ml-1">{{ item.configs_use_input }}</text>
							</view>
						</view>
						<view class="rounded-10 px-2 py-2 mt-2" style="background-color: #fef0f7">
							<view class="font-28 py-1">
								<text style="color: #777">模版名称：</text>
								<text class="ml-1">{{ item.order_product_name }}</text>
							</view>
							<view class="font-28 py-1">
								<text style="color: #777">规格：</text>
								<text class="ml-1">{{ item.order_spec_name }}</text>
							</view>
							<view class="font-28 py-1">
								<text style="color: #777">商品：</text>
								<text class="ml-1">{{ item.order_commodity_name }}</text>
							</view>
							<view class="font-28 py-1">
								<text style="color: #777">材质：</text>
								<text class="ml-1">{{ item.order_material_name }}</text>
							</view>
						</view>
						<view class="mt-2 flex align-center justify-between px-2">
							<view @click="setClipboardData(item.order_id)" class="rounded-circle flex align-center justify-center" style="width: 192rpx; height: 64rpx; background-color: #00a9b6">
								<text class="text-white font-28">复制ID</text>
							</view>
							<view @click="goToPage(item)" class="rounded-circle flex align-center justify-center" style="width: 192rpx; height: 64rpx; background-color: #edb75c">
								<text class="text-white font-28">查看详情</text>
							</view>
							<view @click="delOrder(item)" class="rounded-circle flex align-center justify-center" style="width: 192rpx; height: 64rpx; background-color: #00aeef">
								<text class="text-white font-28">删除</text>
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
import store from '@/store/index.js';
import utils from '@/utils/utils.js';
import api from '@/request/api.js';
import { ref, computed, reactive, toRefs, onMounted } from 'vue';

import { onShow, onLoad } from '@dcloudio/uni-app';

const data = reactive({
	triggered: false,
	queryInfo: {
		order_custom_id: '',
		pageNum: 1,
		pageSize: 10
	},
	list: [],
	current_page: 1,
	last_page: 1
});
const { triggered, queryInfo, list } = toRefs(data);

const userInfo = computed(() => {
	return store.state.userInfo;
});

// 下拉刷新
const refresherrefresh = () => {
	data.triggered = true;
	data.list = [];
	data.current_page = 1;
	data.last_page = 1;
	data.queryInfo.pageNum = 1;
	getMyOrder();
};

// 上滑加载
const scrolltolower = () => {
	if (data.current_page >= data.last_page) {
		utils.showToast('没有更多数据了');
		return false;
	}
	getMyOrder();
};

const setClipboardData = (data) => {
	uni.setClipboardData({
		data: data,
		success: (res) => {
			uni.showToast({
				title: '复制成功',
				icon: 'none',
				duration: 2000
			});
		}
	});
};

// 删除订单
const delOrder = (item) => {
	uni.showModal({
		title: '提示',
		content: '订单信息删除后，将不能恢复，确认删除吗？',
		success: function (res) {
			if (res.confirm) {
				api.updateOrderList({ ids: [item.order_id] }).then((res) => {
					utils.showToast('删除成功');
					data.list = [];
					data.current_page = 1;
					data.last_page = 1;
					data.queryInfo.pageNum = 1;
					getMyOrder();
				});
			} else if (res.cancel) {
				console.log('用户点击取消');
			}
		}
	});
};

const goToPage = (item) => {
	console.log('item', item);
	// 设置订单表单
	store.commit('SET_ORDER_FORM', item);
	// 如果商品是无限制模式 则跳转到无限制编辑去
	if (item?.order_commodity_info_obj?.commodity_book == 1) {
		if (item?.order_commodity_info_obj?.commodity_mode == 1) {
			utils.goToPage('product-book-free-edit');
		} else {
			utils.goToPage('product-book-edit');
		}
	} else {
		if (item?.order_commodity_info_obj?.commodity_mode == 1) {
			utils.goToPage('product-free-edit');
		} else {
			utils.goToPage('compile');
		}
	}
};

const getMyOrder = () => {
	api.getMyOrderList(data.queryInfo).then(
		(res) => {
			console.log('res', res);
			res.data.data.forEach((item) => {
				item.order_info_list = JSON.parse(item.order_info || '[]');
				item.order_material_info_obj = JSON.parse(item.order_material_info || '{}');
				item.order_commodity_info_obj = JSON.parse(item.order_commodity_info || '{}');
				item.order_spec_info_obj = JSON.parse(item.order_spec_info || '{}');
				item.order_product_info_obj = JSON.parse(item.order_product_info || '{}');
			});
			data.queryInfo.pageNum = data.queryInfo.pageNum + 1;
			data.list = [...data.list, ...res.data.data];
			data.current_page = res.data.current_page;
			data.last_page = res.data.last_page;
			console.log('data.list', data.list);
			data.triggered = false;
		},
		() => {
			data.triggered = false;
		}
	);
};

onShow(() => {});

onLoad(() => {
	data.queryInfo.order_custom_id = userInfo.value.custom_id;
	getMyOrder();
});
</script>

<style>
.order-linear-gradient {
	background-image: linear-gradient(to right, rgba(0, 165, 234, 0.18), #fff);
}
</style>

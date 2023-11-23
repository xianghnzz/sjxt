<template>
	<page bgColor="#fff" topColor="#00AEEF" :topHeight="88" :bottomHeight="120" :refresherEnabled="true" :triggered="triggered" :refresherrefresh="refresherrefresh" :scrolltolower="scrolltolower">
		<template v-slot:navBar>
			<view class="text-center flex align-center justify-center" style="height: 88rpx">
				<text class="font-36 text-white">模版预览</text>
				<view @click="utils.goBack()" class="position-absolute rounded-circle flex align-center justify-center" style="width: 40rpx; height: 32rpx; left: 32rpx">
					<image style="width: 40rpx; height: 32rpx" src="/static/images/common/back_bai.png" mode=""></image>
				</view>
			</view>
		</template>
		<template v-slot:content>
			<!-- 书籍模式 增加封面 和尾页 一行放2个 -->
			<view v-if="commodity_book == 1" class="px-1 py-2">
				<view v-if="coverPage.pages_id" class="">
					<view class="flex flex-column align-center justify-center">
						<view class="border overflow-hidden" style="width: 344rpx">
							<image style="width: 344rpx" :src="utils.showImageUrl(coverPage.pages_cover)" mode="widthFix"></image>
						</view>
						<view class="flex align-center justify-center py-2 font-30 font-weight-bold">
							<text class="mx-1">封面</text>
						</view>
					</view>
				</view>
				<view class="flex flex-wrap">
					<view v-for="(item, index) in info.product_print_list" :key="index" class="m-1" style="width: 344rpx">
						<view class="border position-relative" style="width: 100%">
							<image style="width: 100%" :src="utils.showImageUrl(item.pages_cover)" mode="widthFix"></image>
							<view v-if="commodity_print == 1 && (index + 1) % 2 == 0" class="bg-opacity p-1 position-absolute right-0 top-0 flex align-center justify-center rounded-circle" style="width: 60rpx; height: 30rpx">
								<text class="font-20 text-white">反面</text>
							</view>
						</view>
						<view class="flex align-center justify-center py-2 font-30 font-weight-bold">
							<text>{{ orderFrom?.order_spec_info_obj?.spec_page_prefix }}</text>
							<text class="mx-1">{{ index + 1 }}</text>
							<text>{{ orderFrom?.order_spec_info_obj?.spec_page_suffix }}</text>
						</view>
					</view>
				</view>
				<view v-if="endPage.pages_id" class="">
					<view class="flex flex-column align-center justify-center">
						<view class="border overflow-hidden" style="width: 344rpx">
							<image style="width: 344rpx" :src="utils.showImageUrl(endPage.pages_cover)" mode="widthFix"></image>
						</view>
						<view class="flex align-center justify-center py-2 font-30 font-weight-bold">
							<text class="mx-1">尾页</text>
						</view>
					</view>
				</view>
				<no-data v-if="info.product_print_list.length == 0"></no-data>
			</view>
			<!-- 无限模式 一行放2个 -->
			<view v-else-if="orderFrom?.order_commodity_info_obj?.commodity_mode == 1" class="px-1 py-2 flex flex-wrap">
				<view v-for="(item, index) in info.product_print_list" :key="index" class="m-1" style="width: 344rpx">
					<view class="border position-relative" style="width: 100%">
						<image style="width: 100%" :src="utils.showImageUrl(item.pages_cover)" mode="widthFix"></image>
						<view v-if="commodity_print == 1 && (index + 1) % 2 == 0" class="bg-opacity p-1 position-absolute right-0 top-0 flex align-center justify-center rounded-circle" style="width: 60rpx; height: 30rpx">
							<text class="font-20 text-white">反面</text>
						</view>
					</view>
					<view class="flex align-center justify-center py-2 font-30 font-weight-bold">
						<text>{{ orderFrom?.order_spec_info_obj?.spec_page_prefix }}</text>
						<text class="mx-1">{{ index + 1 }}</text>
						<text>{{ orderFrom?.order_spec_info_obj?.spec_page_suffix }}</text>
					</view>
				</view>
				<no-data v-if="info.product_print_list.length == 0"></no-data>
			</view>
			<view v-else class="p-2">
				<view v-for="(item, index) in info.product_print_list" :key="index" class="" style="width: 100%">
					<view class="border position-relative" style="width: 100%">
						<image style="width: 100%" :src="utils.showImageUrl(item.pages_cover)" mode="widthFix"></image>
						<view v-if="commodity_print == 1 && (index + 1) % 2 == 0" class="bg-opacity p-1 position-absolute right-0 top-0 flex align-center justify-center rounded-circle" style="width: 60rpx; height: 30rpx">
							<text class="font-20 text-white">反面</text>
						</view>
					</view>
					<view class="flex align-center justify-center py-2 font-30 font-weight-bold">
						<text>{{ orderFrom?.order_spec_info_obj?.spec_page_prefix }}</text>
						<text class="mx-1">{{ index + 1 }}</text>
						<text>{{ orderFrom?.order_spec_info_obj?.spec_page_suffix }}</text>
					</view>
				</view>
				<no-data v-if="info.product_print_list.length == 0"></no-data>
			</view>
			<tui-modal :show="showModal == 1" custom>
				<view class="rounded-20 bg-white border-box font pb-3" style="width: 600rpx">
					<view class="py-2 text-center">
						<text class="font-40 font-weight-bold">定制须知</text>
					</view>
					<view class="p-2">
						<image style="width: 100%" src="/static/images/product-preview/prompt.png" mode="widthFix"></image>
					</view>
					<view class="px-5 flex align-center justify-center px-2">
						<view @click="goToPage" class="flex-1 flex align-center justify-center linear-gradient rounded-circle" style="height: 80rpx">
							<text class="text-white">知道了</text>
						</view>
					</view>
				</view>
			</tui-modal>
		</template>
		<template v-slot:bottomBar>
			<view class="bg-white flex align-center justify-center px-4" style="height: 120rpx">
				<view @click="showModal = 1" class="flex-1 flex align-center justify-center linear-gradient rounded-circle" style="height: 90rpx">
					<text class="text-white">上传照片</text>
				</view>
			</view>
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
		product_id: ''
	},
	info: {
		product_print_list: []
	},
	coverPage: {
		pages_id: '',
		pages_cover: ''
	},
	endPage: {
		pages_id: '',
		pages_cover: ''
	},
	showModal: 0
});
const { triggered, queryInfo, info, coverPage, endPage, showModal } = toRefs(data);

const userInfo = computed(() => {
	return store.state.userInfo;
});

const orderFrom = computed(() => {
	return store.state.orderFrom;
});

const commodity_book = computed(() => {
	if (orderFrom.value?.order_commodity_info_obj?.commodity_book == 1) {
		return 1;
	} else {
		return 0;
	}
});

// 是否双面打印
const commodity_print = computed(() => {
	if (orderFrom.value?.order_commodity_info_obj?.commodity_print == 1) {
		return 1;
	} else {
		return 0;
	}
});

const goToPage = () => {
	data.showModal = 0;
	// 如果商品是无限制模式 则跳转到无限制编辑去
	if (commodity_book.value == 1) {
		if (orderFrom.value?.order_commodity_info_obj?.commodity_mode == 1) {
			utils.goToPage('product-book-free-edit');
		} else {
			utils.goToPage('product-book-edit');
		}
	} else {
		if (orderFrom.value?.order_commodity_info_obj?.commodity_mode == 1) {
			utils.goToPage('product-free-edit');
		} else {
			utils.goToPage('product-edit');
		}
	}
};

// 下拉刷新
const refresherrefresh = () => {
	data.triggered = true;
	getProductById();
};

// 上滑加载
const scrolltolower = () => {};

const getProductById = () => {
	api.getProductById(data.queryInfo).then(
		(res) => {
			if (res.data) {
				if (res.data.product_print) {
					res.data.product_print_list = JSON.parse(res.data.product_print);
					// 如果是数据模式 则取出封面页和尾页
					if (commodity_book.value) {
						data.coverPage = res.data.product_print_list[0];
						data.endPage = res.data.product_print_list[res.data.product_print_list.length - 1];
						res.data.product_print_list.shift();
						res.data.product_print_list.pop();
					}
				} else {
					res.data.product_print_list = [];
				}
				data.info = res.data;

				// console.log('data.info', data.info);
			}
			data.triggered = false;
		},
		() => {
			data.triggered = false;
		}
	);
};

onShow(() => {});

onLoad((info) => {
	data.queryInfo.product_id = info.product_id;
	getProductById();
	console.log('orderForm', orderFrom.value);
});
</script>

<style>
.order-linear-gradient {
	background-image: linear-gradient(to right, rgba(0, 165, 234, 0.18), #fff);
}
</style>

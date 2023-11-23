<template>
	<page bgColor="#fff" topColor="#00AEEF" :topHeight="88" :bottomHeight="180" :refresherEnabled="false">
		<template v-slot:navBar>
			<view class="text-center flex align-center justify-center" style="height: 88rpx">
				<text class="font-36 text-white">模版编辑</text>
				<view @click="utils.goBack()" class="position-absolute rounded-circle flex align-center justify-center" style="width: 40rpx; height: 32rpx; left: 32rpx">
					<image style="width: 40rpx; height: 32rpx" src="/static/images/common/back_bai.png" mode=""></image>
				</view>
			</view>
		</template>
		<template v-slot:content>
			<view class="p-2">
				<view v-for="(item, index) in product_print_list" :key="index" style="width: 710rpx">
					<!-- 页面区域 -->
					<view @click="setPageInfo(item, index)" class="position-relative flex align-center justify-center" style="width: 710rpx">
						<image class="border" v-if="item?.pages_content?.bgImg" style="width: 710rpx" :src="utils.showImageUrl(item.pages_content.bgImg)" mode="widthFix"></image>

						<!-- 覆盖区域 -->
						<view class="position-absolute top-0 left-0 right-0 bottom-0">
							<!-- 循环覆盖物    -->
							<view v-for="(item2, index2) in item.pages_content.imgList" :key="index2" class="">
								<view @click.stop="chooseImage(index, index2)" v-if="item2.type == 'photo'" class="position-absolute border border-primary flex align-center justify-center overflow-hidden" style="background-color: rgba(51, 102, 255, 0.2)" :style="`transform:scale(${item2.scale}) rotate(${item2.r || 0}deg);border-radius: ${item2.radius}px;top:${item2.y / item.bili}px;left:${item2.x / item.bili}px;width: ${item2.width / item.bili}px; height:${item2.height / item.bili}px;`">
									<image v-if="item2.url" :style="`width: ${item2.width / item.bili}px; height:${item2.height / item.bili}px;`" :src="utils.showImageUrl(item2.url)" mode="widthFix"></image>
									<text v-else class="text-primary font-40 font-weight-bold">+</text>
								</view>
								<view v-else class="position-absolute">
									<image class="position-absolute" :style="`transform:scale(${item2.scale}) rotate(${item2.r || 0}deg);border-radius: ${item2.radius}px;top:${item2.y / item.bili}px;left:${item2.x / item.bili}px;width: ${item2.width / item.bili}px; height:${item2.height / item.bili}px;`" :src="utils.showImageUrl(item2.url)" mode=""></image>
								</view>
							</view>
						</view>
						<view v-if="commodity_print == 1 && (index + 1) % 2 == 0" class="bg-opacity p-1 position-absolute right-0 top-0 flex align-center justify-center rounded-circle" style="width: 60rpx; height: 30rpx">
							<text class="font-20 text-white">反面</text>
						</view>
					</view>
					<!-- 页码区域 -->
					<view class="flex align-center justify-center py-2 font-30 font-weight-bold">
						<text>{{ orderFrom?.order_spec_info_obj?.spec_page_prefix }}</text>
						<text class="mx-1">{{ index + 1 }}</text>
						<text>{{ orderFrom?.order_spec_info_obj?.spec_page_suffix }}</text>
					</view>
				</view>
			</view>
			<!-- 确认定制弹窗 -->
			<tui-modal :show="showModal == 1" custom>
				<view class="rounded-20 bg-white border-box font pb-3" style="width: 600rpx">
					<view class="py-2 text-center">
						<text class="font-40 font-weight-bold">产品信息确认</text>
					</view>
					<view class="py-2 px-4 font-32">
						<view class="flex align-center py-1">
							<view class="">
								<text class="text-color-999">产品：</text>
							</view>
							<view class="flex text-ellipsis">
								<text class="font-weight-bold">{{ orderFrom?.order_commodity_name }}</text>
							</view>
						</view>
						<view class="flex align-center py-1">
							<view class="">
								<text class="text-color-999">规格：</text>
							</view>
							<view class="flex text-ellipsis">
								<text class="font-weight-bold">{{ orderFrom?.order_spec_name }}</text>
							</view>
						</view>
						<view class="flex align-center py-1">
							<view class="">
								<text class="text-color-999">纸张：</text>
							</view>
							<view class="flex text-ellipsis">
								<text class="font-weight-bold">{{ orderFrom?.order_material_name }}</text>
							</view>
						</view>
						<view class="flex align-center py-2">
							<image style="width: 24rpx; height: 24rpx" src="/static/images/common/gg.png" mode="widthFix"></image>
							<view class="ml-1 flex-1">
								<text class="text-warning font-24">核对产品信息，如有问题点击取消返回，核对无误点击确认</text>
							</view>
						</view>
					</view>
					<view class="px-5 flex align-center justify-center px-2">
						<view @click="showModal = 0" class="flex-1 flex align-center justify-center bg-info rounded-circle mr-2" style="height: 80rpx">
							<text class="text-white">取消</text>
						</view>
						<view @click="complete" class="flex-1 flex align-center justify-center linear-gradient rounded-circle ml-2" style="height: 80rpx">
							<text class="text-white">确定</text>
						</view>
					</view>
				</view>
			</tui-modal>
		</template>
		<template v-slot:bottomBar>
			<view class="flex align-center justify-center text-ellipsis px-1" :style="`background-color:${configsInfo.configs_content}; color:${configsInfo.configs_illustrate};font-size: ${configsInfo.configs_use || 28}rpx;`" style="width: 750rpx; height: 60rpx">
				<text class="text-ellipsis text-center">{{ orderFrom?.order_spec_info_obj?.spec_prompt }}</text>
			</view>
			<view class="bg-white flex align-center justify-center px-2" style="height: 120rpx">
				<view @click="chooseImageList" class="flex-1 flex align-center justify-center bg-warning rounded-circle mr-1" style="height: 90rpx">
					<text class="text-white">上传图片({{ havePicture }}/{{ pictureNumber }})</text>
				</view>
				<view @click="showModal = 1" class="flex-1 flex align-center justify-center linear-gradient rounded-circle ml-1" style="height: 90rpx">
					<text class="text-white">制作完成</text>
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

import { onShow, onLoad, onUnload } from '@dcloudio/uni-app';

const data = reactive({
	triggered: false,
	product_print_list: [],
	bili: 1,
	showModal: 0,
	pictureNumber: 1,
	configsInfo: {},
	cItem: {},
	cIndex: 0
});
const { triggered, product_print_list, bili, showModal, pictureNumber, configsInfo, cItem, cIndex } = toRefs(data);

const userInfo = computed(() => {
	return store.state.userInfo;
});

const orderFrom = computed(() => {
	return store.state.orderFrom;
});

// 是否双面打印
const commodity_print = computed(() => {
	if (orderFrom.value?.order_commodity_info_obj?.commodity_print == 1) {
		return 1;
	} else {
		return 0;
	}
});

const havePicture = computed(() => {
	let number = 0; //初始值
	data.product_print_list.forEach((item) => {
		number += item.pages_content.imgList.reduce((total, item) => {
			if (item.type == 'photo' && item.url) {
				return total + 1;
			} else {
				return total;
			}
		}, 0);
	});
	return number;
});

// 设置页面信息
const setPageInfo = (item, index) => {
	data.cItem = item;
	data.cIndex = index;
	const spec_edit = orderFrom.value?.order_spec_info_obj?.spec_edit || 0;
	if (spec_edit == 1) {
		// 判断是简易编辑还是专业编辑
		const spec_template_edit_mode = orderFrom.value?.order_spec_info_obj?.spec_template_edit_mode || 0;
		if (spec_template_edit_mode == 1) {
			// 简易编辑
			// console.log('简易编辑');
			utils.goToPage('easy-edit', `pageInfo=${JSON.stringify(data.cItem)}`);
		} else if (spec_template_edit_mode == 2) {
			// 专业编辑
			// console.log('专业编辑');
			utils.goToPage('professional-edit', `pageInfo=${JSON.stringify(data.cItem)}`);
		} else {
			utils.showToast('所选页面只允许换图片');
		}
	} else {
		utils.showToast('该模版只允许换图片');
	}
};

// 更新编辑后的数据
const updatePageInfo = (item) => {
	const width = uni.upx2px(344);
	item.bili = item.pages_area_width / width;
	data.product_print_list[data.cIndex] = Object.assign({}, item);
};

const complete = () => {
	if (orderFrom.value.order_id > 0) {
		// 如果是 已经定稿 则不能修改
		if (orderFrom.value.order_status > 0) {
			utils.showToast('该订单已经定稿，不能修改');
			return;
		}
		// 更新订单数据
		updateOrder();
	} else {
		addOrder();
	}
};

const updateOrder = () => {
	// 设置新的产品数据
	const newOrderInfo = JSON.parse(JSON.stringify(orderFrom.value));
	const product_print_list = [data.coverPage, ...data.product_print_list, data.endPage];
	newOrderInfo.order_product_info_obj.product_print = JSON.stringify(product_print_list);
	newOrderInfo.order_product_info = JSON.stringify(newOrderInfo.order_product_info_obj);
	// 效果图为规格图片
	newOrderInfo.order_cover = newOrderInfo.order_spec_info_obj?.spec_cover || '';
	newOrderInfo.order_custom_id = userInfo.value.custom_id;
	newOrderInfo.order_frequency = Number(newOrderInfo.order_frequency) + 1;
	api.updateOrder(newOrderInfo).then((res) => {
		data.showModal = 0;
		utils.showToast('提交成功');
		setTimeout(() => {
			utils.reToPage('home');
		}, 1800);
	});
	console.log('newOrderInfo', newOrderInfo);
};

// 添加订单
const addOrder = () => {
	// 设置新的产品数据
	const newOrderInfo = JSON.parse(JSON.stringify(orderFrom.value));
	newOrderInfo.order_product_info_obj.product_print = JSON.stringify(data.product_print_list);
	newOrderInfo.order_product_info = JSON.stringify(newOrderInfo.order_product_info_obj);
	// 效果图为规格图片
	newOrderInfo.order_cover = newOrderInfo.order_spec_info_obj?.spec_cover || '';
	newOrderInfo.order_custom_id = userInfo.value.custom_id;
	api.addOrder(newOrderInfo).then((res) => {
		data.showModal = 0;
		utils.showToast('提交成功');
		setTimeout(() => {
			utils.reToPage('home');
		}, 1800);
	});
	console.log('newOrderInfo', newOrderInfo);
};

// 上传图
const chooseImage = (key1, key2) => {
	uni.chooseImage({
		count: 1, //默认9
		sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
		sourceType: ['album'], //从相册选择
		success: (res) => {
			const filePath = res.tempFilePaths[0];
			api.uploadFile({
				filePath: filePath,
				name: 'file'
			}).then((res2) => {
				data.product_print_list[key1].pages_content.imgList[key2].url = res2.data.url;
			});
		}
	});
};

// 批量上传
const chooseImageList = () => {
	if (havePicture.value >= data.pictureNumber) {
		utils.showToast('图片位置已占满，请点击图片更换图片');
		return;
	}
	const number = data.pictureNumber - havePicture.value;
	const count = number > 9 ? 9 : number;
	uni.chooseImage({
		count: count, //默认9
		sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
		sourceType: ['album'], //从相册选择
		success: async (res) => {
			for (let i = 0; i < res.tempFilePaths.length; i++) {
				const res2 = await api.uploadFile({
					filePath: res.tempFilePaths[i],
					name: 'file'
				});
				console.log('res.tempFilePaths[i]', res.tempFilePaths[i]);

				setUrl(res2.data.url);
			}
		}
	});
};

const setUrl = (url) => {
	for (let item of data.product_print_list) {
		let number = 0;
		for (let item2 of item.pages_content.imgList) {
			if (item2.type == 'photo' && item2.url == '') {
				item2.url = url;
				number = 1;
				console.log('item2.url', item2.url);
				break;
			}
		}
		if (number == 1) {
			break;
		}
	}
};

// 设置需要图片数量
const setPictureNumber = () => {
	let number = 0; //初始值
	data.product_print_list.forEach((item) => {
		number += item.pages_content.imgList.reduce((total, item) => {
			if (item.type == 'photo') {
				return total + 1;
			} else {
				return total;
			}
		}, 0);
	});
	data.pictureNumber = number;
};

const getConfigsById = () => {
	api.getConfigsById({
		configs_id: 102
	}).then((res) => {
		// console.log('res', res);
		data.configsInfo = res.data;
	});
};

// 下拉刷新
const refresherrefresh = () => {};

// 上滑加载
const scrolltolower = () => {};

onShow(() => {});

onLoad((info) => {
	// 获取配置
	getConfigsById();
	// 解构数据
	if (orderFrom.value?.order_product_info_obj?.product_print) {
		data.product_print_list = JSON.parse(orderFrom.value.order_product_info_obj.product_print);
		if (data.product_print_list.length > 0) {
			const width = uni.upx2px(710);
			data.product_print_list.forEach((item) => {
				item.bili = item.pages_area_width / width;
			});
			setPictureNumber();
		}
	} else {
		data.product_print_list = [];
	}
	console.log('data.product_print_list', data.product_print_list);

	uni.$on('updatePageInfo', (item) => {
		updatePageInfo(item);
	});
});

// 页面销毁
onUnload(() => {
	// 移除监听事件
	uni.$off('updatePageInfo');
});
</script>

<style>
.order-linear-gradient {
	background-image: linear-gradient(to right, rgba(0, 165, 234, 0.18), #fff);
}
</style>

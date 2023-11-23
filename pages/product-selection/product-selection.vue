<template>
	<page bgColor="#F7F8F9" topColor="#00AEEF" :topHeight="248" :refresherEnabled="true" :triggered="triggered" :refresherrefresh="refresherrefresh">
		<template v-slot:navBar>
			<view class="text-center flex align-center justify-center" style="height: 88rpx">
				<text class="font-36 text-white">产品选择</text>
				<view @click="utils.goBack()" class="position-absolute rounded-circle flex align-center justify-center" style="width: 40rpx; height: 32rpx; left: 32rpx">
					<image style="width: 40rpx; height: 32rpx" src="/static/images/common/back_bai.png" mode=""></image>
				</view>
			</view>
			<scroll-view class="px-2 bg-white" scroll-x="true" style="width: 750rpx; height: 80rpx">
				<view class="px-2 flex align-center" style="height: 80rpx">
					<view @click="setQueryInfo(item)" v-for="(item, index) in categoryAllList" :key="index" class="flex-shrink mx-2" style="">
						<text class="font-32" :class="queryInfo.commodity_category_id == item.value ? 'text-primary' : ''">{{ item.text }}</text>
					</view>
				</view>
			</scroll-view>
			<view class="px-2 bg-white flex align-center" style="height: 80rpx">
				<view class="rounded-circle flex align-center px-2 flex-1" style="background-color: #f5f5f5; height: 64rpx">
					<input v-model="queryInfo.commodity_name" class="font-26 flex-1" type="text" placeholder="输入商品名称搜索" placeholder-style="color: #ccc" />
					<image @click="search" style="width: 40rpx; height: 40rpx" src="/static/images/common/ss.png" mode=""></image>
				</view>
			</view>
		</template>
		<template v-slot:content>
			<view class="flex align-center" style="width: 750rpx; height: 100%">
				<scroll-view @scrolltolower="scrolltolower" class="text-color-999" scroll-y="true" style="width: 220rpx; height: 100%">
					<view @click="setSpecQueryInfo(item)" v-for="(item, index) in list" :key="index" :class="specQueryInfo.spec_commodity_id == item.commodity_id ? 'text-primary bg-white' : ''" class="flex align-center justify-center text-ellipsis" style="width: 220rpx; height: 80rpx">
						<text class="font-28">{{ item.commodity_name }}</text>
					</view>
					<no-data v-if="list.length == 0"></no-data>
				</scroll-view>
				<scroll-view @scrolltolower="specScrolltolower" class="bg-white" scroll-y="true" style="width: calc(750rpx - 220rpx); height: 100%">
					<view class="p-1 flex flex-wrap">
						<view @click="selectSpec(item)" v-for="(item, index) in spec_list" :key="index" class="m-1">
							<view class="rounded-20 overflow-hidden flex align-center justify-center border" :class="activeSpec.spec_id == item.spec_id ? 'border-primary' : ''" style="width: 228rpx; height: 300rpx">
								<image style="width: 248rpx" :src="utils.showImageUrl(item.spec_cover)" mode="widthFix"></image>
							</view>
							<view class="text-ellipsis text-center mt-1" style="width: 228rpx">
								<text :class="activeSpec.spec_id == item.spec_id ? 'text-primary' : ''" class="font-32">{{ item.spec_name }}</text>
							</view>
						</view>
						<!-- 选择的商品为自定义商品 则多这个按钮 -->
						<view @click="goToPage" v-if="activeCommodity.commodity_type == 2" class="m-1">
							<view class="rounded-20 overflow-hidden flex align-center justify-center border" style="width: 228rpx; height: 300rpx">
								<image style="width: 100rpx; height: 100rpx" src="/static/images/common/tjsp.png" mode=""></image>
							</view>
							<view class="text-ellipsis text-center mt-1" style="width: 228rpx">
								<text class="font-32">自定义尺寸</text>
							</view>
						</view>
					</view>
					<no-data v-if="spec_list.length == 0 && activeCommodity.commodity_type == 0"></no-data>
				</scroll-view>
			</view>
			<!-- 选择纸张 -->
			<tui-modal :show="popupShow == 1" custom width="80%" background-color="#fff">
				<view class="py-3 px-3 flex align-center justify-between">
					<text class="font-32">选择纸张</text>
					<image @click="popupShow = 0" style="width: 40rpx; height: 40rpx" src="/static/images/icon/close.png" mode=""></image>
				</view>
				<view class="px-2 bg-white flex align-center" style="height: 80rpx">
					<view class="rounded-circle flex align-center px-2 flex-1" style="background-color: #f5f5f5; height: 64rpx">
						<input v-model="materialQueryInfo.material_name" class="font-26 flex-1" type="text" placeholder="输入纸张名称搜索" placeholder-style="color: #ccc" />
						<image @click="searchMaterial" style="width: 40rpx; height: 40rpx" src="/static/images/common/ss.png" mode=""></image>
					</view>
				</view>
				<scroll-view scroll-y="true" style="height: 500rpx">
					<view>
						<view @click="selectActiveMaterial(item)" v-for="(item, index) in materialList" :key="index" class="m-2">
							<view class="text-ellipsis text-center mt-1" style="text-align: center; display: flex; justify-self: center; align-items: center; width: 100%">
								<text :class="activeMaterial.material_id == item.material_id ? 'blue' : ''" class="font-32" style="width: 100%; border: 2px solid #18d0f7; border-radius: 10px; margin: 10px 15px 10px 10px; padding: 10px">{{ item.material_name }}</text>
								<text @click="showImageclick(item.material_cover)" style="background-color: #18d0f7; padding: 5px; border-radius: 10px; font-size: 12px">示例</text>
							</view>
						</view>
					</view>
					<tui-modal :show="showImage == 1" custom>
						<view class="tui-modal-custom" style="background-color: #fff; border-radius: 15px">
							<view class="py-3 px-3 flex align-center justify-between">
								<text class="font-32">查看图片</text>
								<image @click="handleClick" style="width: 40rpx; height: 40rpx" src="/static/images/icon/close.png" mode=""></image>
							</view>
							<image :src="utils.showImageUrl(imageurl)" class="tui-tips-img"></image>
						</view>
					</tui-modal>
				</scroll-view>
				<!-- 按钮 -->
				<view class="pt-2 pb-4 flex align-center justify-center px-2">
					<view @click="setFormInfo" class="flex-1 flex align-center justify-center linear-gradient rounded-circle" style="height: 100rpx">
						<text class="text-white">确认，下一步</text>
					</view>
				</view>
			</tui-modal>
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
	commodity_type: '',

	commodity_mode: '',
	imageurl: '',
	showImage: 0,
	triggered: false,
	categoryAllList: [],
	queryInfo: {
		commodity_category_id: 0,
		commodity_type: '',
		commodity_name: '',
		pageNum: 1,
		pageSize: 20
	},
	list: [],
	current_page: 1,
	last_page: 1,
	activeCommodity: {
		commodity_type: 1
	},
	specQueryInfo: {
		spec_commodity_id: 0,
		pageNum: 1,
		pageSize: 10
	},
	spec_list: [],
	spec_current_page: 1,
	spec_last_page: 1,
	activeSpec: {},
	popupShow: 0,
	materialQueryInfo: {
		material_name: '',
		ids: []
	},
	materialList: [],
	activeMaterial: {}
});
const { commodity_type, commodity_mode, imageurl, triggered, categoryAllList, queryInfo, list, activeCommodity, specQueryInfo, spec_list, activeSpec, popupShow, materialQueryInfo, materialList, activeMaterial, showImage } = toRefs(data);

const userInfo = computed(() => {
	return store.state.userInfo;
});

const orderFrom = computed(() => {
	return store.state.orderFrom;
});
// 选择规格
const selectSpec = (item) => {
	data.activeSpec = item;
	// 如果有多个纸张可以选择 则弹出纸张选择弹窗
	const spec_material_ids = item.spec_material_ids;
	if (spec_material_ids.length > 1) {
		// 查询纸张列表
		data.materialQueryInfo.ids = spec_material_ids.split(',').filter((e) => e);
		getMaterialByIds();
	} else {
		setFormInfo();
	}
};
const showImageclick = (e) => {
	data.showImage = 1;
	data.imageurl = e;
};
const handleClick = () => {
	data.showImage = 0;
};
// 设置表单信息
const setFormInfo = () => {
	// 设置材质信息
	let meterialInfo = {};
	if (data.activeMaterial?.material_id > 0) {
		console.log('选择了材质');
		meterialInfo = {
			order_material_id: data.activeMaterial.material_id,
			order_material_name: data.activeMaterial.material_name,
			order_material_info: JSON.stringify(data.activeMaterial),
			order_material_info_obj: data.activeMaterial
		};
	} else {
		// 有材质列表但是没选 则默认 选择第一个
		if (data.materialList.length > 0) {
			data.activeMaterial = data.materialList[0];
			meterialInfo = {
				order_material_id: data.activeMaterial.material_id,
				order_material_name: data.activeMaterial.material_name,
				order_material_info: JSON.stringify(data.activeMaterial),
				order_material_info_obj: data.activeMaterial
			};
		}
	}
	// 设置商品信息
	const commodity = data.list.find((e) => e.commodity_id == data.specQueryInfo.spec_commodity_id);
	const commodityObj = {
		commodity_category_id: commodity.commodity_category_id,
		category_name: commodity.category_name,
		commodity_id: commodity.commodity_id,
		commodity_name: commodity.commodity_name,
		// 商品类型：1是普通商品，2是自定义商品
		commodity_mode: commodity.commodity_mode,
		// 商品类型：0是无限制模式，1是有限制模式
		commodity_type: commodity.commodity_mode,
		// 是否是书籍类商品
		commodity_book: commodity.commodity_book,
		// 是否双面打印
		commodity_print: commodity.commodity_print
	};
	const commodityInfo = {
		order_commodity_id: commodityObj.commodity_id,
		order_commodity_name: commodityObj.commodity_name,
		order_commodity_info: JSON.stringify(commodityObj),
		order_commodity_info_obj: commodityObj
	};
	const specObj = {
		spec_id: data.activeSpec.spec_id,
		spec_name: data.activeSpec.spec_name,
		spec_cover: data.activeSpec.spec_cover,
		// dpi
		spec_dpi: data.activeSpec.spec_dpi,
		// 出血
		spec_bleed: data.activeSpec.spec_bleed,
		// 倍数
		spec_multiple: data.activeSpec.spec_multiple,
		// 数量
		spec_number: data.activeSpec.spec_number,
		// 宽
		spec_width: data.activeSpec.spec_width,
		// 高
		spec_height: data.activeSpec.spec_height,
		// 可以选材质
		spec_select_material: data.activeSpec.spec_select_material,
		// 可以选模版
		spec_select_template: data.activeSpec.spec_select_template,
		// 可以选反面
		spec_select_face: data.activeSpec.spec_select_face,
		// 规格装饰ids
		spec_decoration_ids: data.activeSpec.spec_decoration_ids,
		// 规格可用文本素材ids
		spec_text_ids: data.activeSpec.spec_text_ids,
		// 规格可用背景素材ids
		spec_bg_ids: data.activeSpec.spec_text_ids,
		// 规格可用模版ids
		spec_template_ids: data.activeSpec.spec_template_ids,
		// 规格可用反面模版ids
		spec_opposite_ids: data.activeSpec.spec_opposite_ids,
		// 规格页面前缀
		spec_page_prefix: data.activeSpec.spec_page_prefix,
		// 规格页面后缀
		spec_page_suffix: data.activeSpec.spec_page_suffix,
		// 规格提示说明
		spec_prompt: data.activeSpec.spec_prompt,
		// 规格是否允许编辑 1是允许 0 是不允许
		spec_edit: data.activeSpec.spec_edit,
		// 规格正面编辑模式0是不允许1是简易模式2是专业模式
		spec_template_edit_mode: data.activeSpec.spec_template_edit_mode,
		// 规格反面编辑模式0是不允许1是简易模式2是专业模式
		spec_opposite_edit_mode: data.activeSpec.spec_opposite_edit_mode
	};
	// 设置规格信息
	const specInfo = {
		order_spec_id: data.activeSpec.spec_id,
		order_spec_name: data.activeSpec.spec_name,
		order_spec_info: JSON.stringify(specObj),
		order_spec_info_obj: specObj
	};

	const form = {
		...meterialInfo,
		...commodityInfo,
		...specInfo
	};
	data.popupShow = 0;
	// 设置表单
	store.commit('SET_ORDER_FORM', form);
	// 跳转到模版选择页面
	console.log('data.list.commodity_mode: ', data.commodity_mode);
	if (data.commodity_mode == 0) {
		utils.goToPage('template-selection');
	} else if (data.commodity_mode == 1) {
		utils.goToPage('product-preview');
	} else if (data.commodity_mode == 3) {
		utils.goToPage('custom-size');
	}
};

// 设置选中材质
const selectActiveMaterial = (item) => {
	data.activeMaterial = {
		material_cover: item.material_cover,
		material_id: item.material_id,
		material_name: item.material_name
	};
};

const setQueryInfo = (item) => {
	data.queryInfo.commodity_category_id = item.value;
	data.specQueryInfo.spec_commodity_id = 0;
	search();
};

const setSpecQueryInfo = (item) => {
	if (item.commodity_type == 1) {
		data.commodity_mode = item.commodity_mode;
	} else {
		data.commodity_mode = 3;
	}

	console.log('data.commodity_mode: ', data.commodity_mode);
	data.activeCommodity = item;
	// console.log('data.activeCommodity', data.activeCommodity);
	data.specQueryInfo.spec_commodity_id = item.commodity_id;
	searchSpec();
};

const search = () => {
	data.list = [];
	data.current_page = 1;
	data.last_page = 1;
	data.queryInfo.pageNum = 1;

	data.spec_list = [];
	data.spec_current_page = 1;
	data.spec_last_page = 1;
	data.specQueryInfo.pageNum = 1;
	getCommodityList();
};

const searchSpec = () => {
	data.spec_list = [];
	data.spec_current_page = 1;
	data.spec_last_page = 1;
	data.specQueryInfo.pageNum = 1;
	getSpecList();
};
const getMaterialByIds = () => {
	api.getMaterialByIds(data.materialQueryInfo).then((res) => {
		data.materialList = res.data;
		console.log(data.materialList);

		// 保存到本地存储
		localStorage.setItem('materialList', JSON.stringify(data.materialList));

		data.popupShow = 1;
	});
};

// 下拉刷新
const refresherrefresh = () => {
	data.triggered = true;
	data.list = [];
	data.current_page = 1;
	data.last_page = 1;
	data.queryInfo.pageNum = 1;
	getCommodityList();
};

// 上滑加载
const scrolltolower = () => {
	if (data.current_page >= data.last_page) {
		utils.showToast('没有更多数据了');
		return false;
	}
	getCommodityList();
};

// 上滑加载
const specScrolltolower = () => {
	if (data.spec_current_page >= data.spec_last_page) {
		utils.showToast('没有更多数据了');
		return false;
	}
	getSpecList();
};

// 自定义尺寸页面
const goToPage = (item) => {
	// 存商品信息
	// 设置商品信息
	const commodity = data.list.find((e) => e.commodity_id == data.specQueryInfo.spec_commodity_id);
	const commodityObj = {
		commodity_category_id: commodity.commodity_category_id,
		category_name: commodity.category_name,
		commodity_id: commodity.commodity_id,
		commodity_name: commodity.commodity_name,
		// 商品类型：1是普通商品，2是自定义商品
		commodity_mode: commodity.commodity_mode,
		// 商品类型：0是无限制模式，1是有限制模式
		commodity_type: commodity.commodity_mode,
		// 是否是书籍类商品
		commodity_book: commodity.commodity_book
	};
	const commodityInfo = {
		order_commodity_id: commodityObj.commodity_id,
		order_commodity_name: commodityObj.commodity_name,
		order_commodity_info: JSON.stringify(commodityObj),
		order_commodity_info_obj: commodityObj
	};
	const form = {
		...commodityInfo
	};
	// 设置表单
	store.commit('SET_ORDER_FORM', form);
	utils.goToPage('custom-size');
};

const searchMaterial = () => {
	getMaterialByIds();
};

// 查询规格列表
const getSpecList = () => {
	api.getSpecList(data.specQueryInfo).then(
		(res) => {
			data.specQueryInfo.pageNum = data.specQueryInfo.pageNum + 1;
			data.spec_list = [...data.spec_list, ...res.data.data];
			data.spec_current_page = res.data.current_page;
			data.spec_last_page = res.data.last_page;
			data.triggered = false;
		},
		() => {
			data.triggered = false;
		}
	);
};

// 查询商品列表
const getCommodityList = () => {
	api.getCommodityList(data.queryInfo).then(
		(res) => {
			data.queryInfo.pageNum = data.queryInfo.pageNum + 1;
			data.list = [...data.list, ...res.data.data];
			console.log('data.list: ', data.list);

			data.current_page = res.data.current_page;
			data.last_page = res.data.last_page;
			if (data.list.length > 0 && data.specQueryInfo.spec_commodity_id == 0) {
				// 获取规格
				data.specQueryInfo.spec_commodity_id = data.list[0].commodity_id;
				getSpecList();
			} else {
				data.triggered = false;
			}
		},
		() => {
			data.triggered = false;
		}
	);
};

const getCategoryAllList = () => {
	api.getCategoryAllList().then(
		(res) => {
			data.categoryAllList = res.data;
			if (res.data.length > 0) {
				data.queryInfo.commodity_category_id = res.data[0].value;
				getCommodityList();
			}
			console.log('data.categoryAllList: ', data.categoryAllList);
		},
		() => {}
	);
};

onShow(() => {});

onLoad(() => {
	// 获取品类列表
	getCategoryAllList();
});
</script>

<style>
.blue {
	color: #fff;
	background-color: skyblue;
}
</style>

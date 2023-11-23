<template>
	<page bgColor="#fff" topColor="#00AEEF" :topHeight="88" :refresherEnabled="true" :triggered="triggered" :refresherrefresh="refresherrefresh" :scrolltolower="scrolltolower">
		<template v-slot:navBar>
			<view class="text-center flex align-center justify-center" style="height: 88rpx">
				<text class="font-36 text-white">自定义尺寸</text>
				<view @click="utils.goBack()" class="position-absolute rounded-circle flex align-center justify-center" style="width: 40rpx; height: 32rpx; left: 32rpx">
					<image style="width: 40rpx; height: 32rpx" src="/static/images/common/back_bai.png" mode=""></image>
				</view>
			</view>
		</template>
		<template v-slot:content>
			<view class="flex flex-column align-center py-2" style="width: 750rpx">
				<view class="content-bg pt-12 px-5">
					<view class="flex align-center px-5">
						<view class="">
							<text>宽：</text>
						</view>
						<input class="flex-1 rounded-6 px-2" style="height: 44px; background-color: #f3f7ff" type="number" v-model="form.width" placeholder="可输入30-440mm" />
					</view>
					<view class="flex align-center mt-4 px-5">
						<view class="">
							<text>高：</text>
						</view>
						<input class="flex-1 rounded-6 px-2" style="height: 44px; background-color: #f3f7ff" type="number" v-model="form.height" placeholder="可输入30-310mm" />
					</view>
					<view class="pt-4 pb-2 px-5 flex align-center justify-center">
						<view @click="startCustomized" class="flex-1 flex align-center justify-center linear-gradient rounded-circle" style="height: 50px">
							<text class="text-white">开始定制</text>
						</view>
					</view>
				</view>
				<view class="border rounded-6 overflow-hidden p-1" style="width: 325px">
					<mp-html :content="configsInfo.configs_illustrate"></mp-html>
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
	configsInfo: {},
	form: {
		width: '',
		height: ''
	},
	widthMin: 30,
	heightMin: 30,
	widthMax: 440,
	heightMax: 310
});
const { triggered, configsInfo, form } = toRefs(data);

const userInfo = computed(() => {
	return store.state.userInfo;
});

const startCustomized = () => {
	if (data.form.width > data.widthMax || data.form.width < data.widthMin) {
		utils.showToast('宽度超出可用范围，请重新输入');
		return;
	}
	if (data.form.height > data.heightMax || data.form.height < data.heightMin) {
		utils.showToast('高度超出可用范围，请重新输入');
		return;
	}
	// 存规格信息
	const specObj = {
		spec_id: 'zdy',
		spec_name: '自定义尺寸商品',
		// dpi
		spec_dpi: 300,
		// 出血
		spec_bleed: 5,
		// 倍数
		spec_multiple: 0,
		// 数量
		spec_number: 0,
		spec_cover: '',
		// 宽
		spec_width: data.form.width,
		// 高
		spec_height: data.form.height,
		// 可以选材质
		spec_select_material: '',
		// 可以选模版
		spec_select_template: '0',
		// 可以选反面
		spec_select_face: '0',
		// 规格装饰ids
		spec_decoration_ids: '',
		// 规格可用文本素材ids
		spec_text_ids: '',
		// 规格可用背景素材ids
		spec_bg_ids: '',
		// 规格可用模版ids
		spec_template_ids: '',
		// 规格可用反面模版ids
		spec_opposite_ids: '',
		// 规格页面前缀
		spec_page_prefix: '',
		// 规格页面后缀
		spec_page_suffix: '',
		// 规格提示说明
		spec_prompt: '自定义尺寸商品',
		// 规格是否允许编辑 1是允许 0 是不允许
		spec_edit: 1,
		// 规格正面编辑模式0是不允许1是简易模式2是专业模式
		spec_template_edit_mode: 2,
		// 规格反面编辑模式0是不允许1是简易模式2是专业模式
		spec_opposite_edit_mode: 2
	};
	// 设置规格信息
	const specInfo = {
		order_spec_id: 0,
		order_spec_name: '自定义尺寸商品',
		order_spec_info: JSON.stringify(specObj),
		order_spec_info_obj: specObj
	};

	const form = {
		...specInfo
	};
	// 设置表单
	store.commit('SET_ORDER_FORM', form);
	// 跳转到自定义模版选择页面
	utils.goToPage('custom-template-selection');
};

// 下拉刷新
const refresherrefresh = () => {
	data.triggered = true;
	getConfigsById();
};

// 上滑加载
const scrolltolower = () => {};

const getConfigsById = () => {
	api.getConfigsById({
		configs_id: 105
	}).then(
		(res) => {
			console.log('res', res);
			data.configsInfo = res.data;
			data.triggered = false;
		},
		() => {
			data.triggered = false;
		}
	);
};

onShow(() => {});

onLoad(() => {
	// 获取配置
	getConfigsById();
});
</script>

<style>
.content-bg {
	width: 370px;
	height: 286px;
	background-image: url('~@/static/images/custom/contentBg.png');
	background-size: 370px 286px;
	background-repeat: no-repeat;
}
</style>

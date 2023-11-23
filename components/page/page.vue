<template>
	<view :style="pageStyle">
		<view :style="topStyle">
			<slot name="navBar"></slot>
		</view>
		<scroll-view :style="contentStyle" :scroll-y="needScroll" :refresher-enabled="refresherEnabled" :refresher-triggered="triggered" :refresher-background="refresherBackground"    
			@refresherrefresh="refresherrefresh" @scrolltolower="scrolltolower" @scroll="scroll">
			<slot name="content"></slot>
		</scroll-view>
		<view class="" :style="bottomStyle">
			<slot name="bottomBar"></slot>
		</view>
	</view>
</template>

<script setup>
	import store from '@/store/index.js';
	import {
		ref,
		reactive,
		toRefs,
		computed,
		defineProps,
		nextTick
	} from "vue";
	// 定义发射给父组件的方法
	const props = defineProps({
		// 背景颜色
		bgColor: {
			type: String,
			default: "#F7F8F9"
		},
		// 顶部背景颜色
		topColor: {
			type: String,
			default: "#fff"
		},
		// 顶部背景颜色
		topFixed: {
			type: Boolean,
			default: false
		},
		// 底部背景颜色
		bottomColor: {
			type: String,
			default: "#fff"
		},
		// 是否需要滑动
		needScroll: {
			type: Boolean,
			default: true
		},
		// 是否允许下拉刷新
		refresherEnabled: {
			type: Boolean,
			default: true
		},
		// 是否下拉刷新完成
		triggered: {
			type: Boolean,
			default:  true
		},
		// 下拉刷新背景颜色
		refresherBackground: {
			type: String,
			default: "transparent"
		},
		// 下拉刷新方法
		refresherrefresh: {
			type: Function,
			default: () => {}
		},
		// 上滑加载更多方法
		scrolltolower: {
			type: Function,
			default: () => {}
		},
		// 滑动方法
		scroll: {
			type: Function,
			default: () => {}
		},
		// 顶部高度
		topHeight: {
			type: Number,
			default:  88
		},
		// 底部高度
		bottomHeight: {
			type: Number,
			default:  0
		}
	})
	
	if (store.state.deviceInfo.windowHeight == 0) {
		store.commit("SET_VALUE", {
			key: "deviceInfo",
			value: uni.getSystemInfoSync()
		})
	}

	// 状态栏
	const statusBarHeight = computed(() => {
		return store.getters.statusBarHeight;
	});

	// 屏幕高度
	const windowHeight = computed(() => {
		return store.getters.windowHeight;
	});

	// 底部栏
	const buttomBarHeight = computed(() => {
		return store.getters.buttomBarHeight;
	});

	// 页面样式
	const pageStyle = computed(() => {
		// 页面高度
		let styleText = `height: ${windowHeight.value}px; background-color: ${props.bgColor}; box-sizing: content-box;`;
		// 如果不是 浮动顶部则需要加内边距
		if (!props.topFixed) {
			// styleText += `padding-top: ${statusBarHeight.value}px;`;
		}
		// styleText += `padding-bottom: ${buttomBarHeight.value}px;`;
		// console.log('页面样式：', styleText);
		return styleText;
	});

	// 顶部样式
	const topStyle = computed(() => {
		let styleText = `height: ${uni.upx2px(props.topHeight)}px; background-color: ${props.topColor}; z-index: 1;box-sizing: content-box;`;
		// 是否浮动
		if (props.topFixed) {
			styleText += `position: fixed; top: 0; left: 0`;
		}
		styleText += `padding-top: ${statusBarHeight.value}px;`;
		// console.log('顶部样式：', styleText);
		return styleText;
	});
	
	// 内容样式
	const contentStyle = computed(() => {
		const statusHeight = props.topFixed ? 0 : statusBarHeight.value;
		let styleText = `height: ${windowHeight.value - statusHeight - uni.upx2px(props.topHeight) - uni.upx2px(props.bottomHeight)}px; box-sizing: content-box;`;
		
		// console.log('内容样式：', styleText);
		return styleText;
	});

	// 底部样式
	const bottomStyle = computed(() => {
		let styleText = `height: ${uni.upx2px(props.bottomHeight)}px; padding-bottom: ${buttomBarHeight.value}px; background-color: ${props.bottomColor};`;
		// console.log('底部样式：', styleText);
		return styleText;
	});

	// 初始化更多弹窗
	nextTick(() => {})
</script>

<template>
	<view class="w-100 overflow-hidden border-box flex bg-white py-1" style="height: 100rpx">
		<view v-for="menuItem in menuList" :key="menuItem.id" class="flex-1 flex align-start justify-center">
			<view @click="changeMenu(menuItem.id)" class="flex flex-column align-center justify-center">
				<image :src="activeMenu == menuItem.id ? menuItem.activeIconPath : menuItem.iconPath"
					style="width:48rpx; height: 48rpx" mode=""></image>
				<text class="font-20 transition-color " style="margin-top: 4rpx;"
					:class="activeMenu == menuItem.id ? 'text-primary' : 'text-color-ccc'">{{menuItem.title}}</text>
			</view>
		</view>
	</view>
</template>

<script setup>
	import utils from "@/utils/utils.js";
	
	import {
		defineProps
	} from "vue";
	
	const props = defineProps({
		// 当前选中
		activeMenu: {
			type: [Number, String],
			default: "home"
		}
	});
	const menuList = [
		{
			id: "home",
			iconPath: "/static/images/common/menu/home.png",
			activeIconPath: "/static/images/common/menu/home_active.png",
			title: "首页"
		},
		{
			id: "me",
			iconPath: "/static/images/common/menu/wd.png",
			activeIconPath: "/static/images/common/menu/wd_active.png",
			title: "我的"
		}
	];


	const changeMenu = (id) => {
		if (id == props.activeMenu) return
		utils.reToPage(id)
	}
</script>

<style>
</style>
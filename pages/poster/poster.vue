<template>
	<page bgColor="#fff" :refresherEnabled="false">
		<template v-slot:navBar>
			<view class="text-center flex align-center justify-center position-relative" style="height: 88rpx;">
				<text class="font-36">邀请好友</text>
				<view @click="utils.goBack()" class="position-absolute rounded-circle flex align-center justify-center"
					style="width: 40rpx; height: 32rpx; left: 32rpx;">
					<image style="width: 40rpx; height: 32rpx;" src="/static/images/common/back.png" mode="">
					</image>
				</view>
			</view>
		</template>
		<template v-slot:content>
			<view class="overflow-y bg-white px-2 position-relative"
				style="height: 100%;">
				<!-- 二维码 -->
				<view class="flex align-center justify-center p-3">
					<image style="width: 576rpx;" :src="posterInfo.poster1" mode="widthFix"></image>
				</view>
				<view class="mt-5 flex align-center justify-center">
					<view @click="saveImage" class="bg-primary rounded-20 flex align-center justify-center"
						style="width: 560rpx; height: 88rpx;">
						<image style="width: 44rpx;" src="/static/images/poster/xz.png" mode="widthFix"></image>
						<text class="font-32 text-white ml-2">保存图片</text>
					</view>
				</view>
			</view>
			<canvas-poster width="576" height="940" ref="canvasPosters" @ready="ready"></canvas-poster>
			<canvas class="position-fixed" style="top: 0rpx; left:750rpx; width: 200rpx; height: 200rpx;"
				canvas-id="qrcode" />
		</template>
	</page>
</template>

<script setup>
	import store from "@/store/index.js";
	import utils from "@/utils/utils.js";
	import api from "@/request/api.js";
	import uQRCode from '@/utils/uqrcode.js';
	import {
		ref,
		computed,
		reactive,
		toRefs,
		onMounted
	} from "vue";

	import {
		onLoad
	} from "@dcloudio/uni-app";

	import canvasPoster from "@/components/canvas-poster/canvas-poster.vue"
	const canvasPosters = ref();
	const data = reactive({
		triggered: false,
		current: 0,
		swiperCurrent: 0,
		qrcode: "",
		posterInfo: {
			poster1: "",
			poster2: "",
			poster3: "",
		},
		posterData: [{
				type: 'image',
				src: '/static/images/poster/img1.png',
				// //图片类型：1-本地图片（需要平台支持）；2-网络图片（必须可下载，小程序端图片对应的域名需要在小程序后台配置）； 3- base64 图片（仅App，微信小程序，H5支持）
				imgType: 1,
				style: {
					left: 0,
					top: 0,
					width: 576,
					height: 920,
					// 矩形圆角值，单位rpx
					borderRadius: 0,
				}
			},
			{
				type: 'image',
				src: '',
				// //图片类型：1-本地图片（需要平台支持）；2-网络图片（必须可下载，小程序端图片对应的域名需要在小程序后台配置）； 3- base64 图片（仅App，微信小程序，H5支持）
				imgType: 3,
				style: {
					left: 426,
					top: 766,
					width: 116,
					height: 116,
					// 矩形圆角值，单位rpx
					borderRadius: 10,
				}
			},
			// {
			// 	type: 'text',
			// 	text: '',
			// 	style: {
			// 		left: 38,
			// 		top: 842,
			// 		fontSize: 28,
			// 		color: '#fff',
			// 		ellipsis: false
			// 	}
			// },
		]
	});
	const {
		triggered,
		current,
		swiperCurrent,
		qrcode,
		posterInfo
	} = toRefs(data);

	const userInfo = computed(() => {
		return store.state.userInfo
	})

	const ready = () => {
		getExtend()
	}

	// 下拉刷新
	const setRefresherrefresh = () => {
		data.triggered = true;
		setTimeout(() => {
			data.triggered = false;
		}, 800)
	}

	// 上滑加载
	const setScrolltolower = () => {}

	const setSwiperCurrent = (e) => {
		data.swiperCurrent = e.detail.current
	}

	const saveImage = () => {
		const url = data.posterInfo[`poster${data.swiperCurrent+1}`];
		utils.saveImage(url);
	}

	const drawPoster = (index = 1, bgImg = "/static/images/poster/img1.png") => {
		uni.showLoading({
			title: '绘制中...'
		})
		data.posterData[0].src = bgImg;
		canvasPosters.value.draw(data.posterData, (filePath = '') => {
			const nextIndex = index + 1;
			if (filePath == '') {
				utils.showToast('生成海报失败，请稍后再试！')
			} else {
				// 绘制图片路径
				data.posterInfo.poster1 = filePath;
			}
			uni.hideLoading()
		})
	}


	const generateQR = (text) => {
		uQRCode.make({
			canvasId: 'qrcode',
			componentInstance: this,
			text: text,
			size: uni.upx2px(188),
			margin: 4,
			backgroundColor: '#ffffff',
			foregroundColor: '#000000',
			fileType: 'jpg',
			errorCorrectLevel: uQRCode.errorCorrectLevel.H,
			success: (res) => {
				data.qrcode = res;
				data.posterData[1].src = res;
				drawPoster()
			}
		})
	}


	// 获取数据
	const getExtend = () => {
		api.getExtend().then(res => {
			console.log('res', res);
			// data.posterData[2].text = "邀请码：" + res.result.user_id;
			// 生成二维码
			generateQR(res.result.url)
			data.url = res.result.url
		}, () => {
			setTimeout(() => {
				getExtend()
			}, 3000)
		})
	}

	onMounted(() => {})
</script>
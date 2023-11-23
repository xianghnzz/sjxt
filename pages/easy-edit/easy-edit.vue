<template>
	<page bgColor="#fff" topColor="#00AEEF" :topHeight="88" :bottomHeight="120" :refresherEnabled="false">
		<template v-slot:navBar>
			<view class="text-center flex align-center justify-center" style="height: 88rpx;">
				<text class="font-36 text-white">简易编辑</text>
				<view @click="utils.goBack()" class="position-absolute rounded-circle flex align-center justify-center"
					style="width: 40rpx; height: 32rpx; left: 32rpx;">
					<image style="width: 40rpx; height: 32rpx;" src="/static/images/common/back_bai.png" mode="">
					</image>
				</view>
			</view>
		</template>
		<template v-slot:content>
			<view class="" style="height: 100%;">
				<view class="flex align-center justify-center text-ellipsis px-1"
					:style="`background-color:${configsInfo.configs_content}; color:${configsInfo.configs_illustrate};font-size: ${configsInfo.configs_use || 28}rpx;`"
					style="width: 750rpx; height: 60rpx;">
					<text class="text-ellipsis text-center">{{configsInfo.configs_value}}</text>
				</view>
				<view class="flex align-center justify-center" style="height: calc(100% - 60rpx);">
					<view class="position-relative flex align-center justify-center" style="width: 710rpx;">
						<image class="border" v-if="pageInfo?.pages_content?.bgImg" style="width: 710rpx;"
							:src="utils.showImageUrl(pageInfo.pages_content.bgImg)" mode="widthFix"></image>
						<!-- 覆盖区域 -->
						<view class="position-absolute top-0 left-0 right-0 bottom-0">
							<!-- 循环覆盖物  -->
							<view v-for="item2, index2 in pageInfo?.pages_content?.imgList" :key="index2" class="">
								<view @click.stop="chooseImage(index2)" v-if="item2.type == 'photo'"
									class="position-absolute border border-primary flex align-center justify-center overflow-hidden"
									style="background-color: rgba(51, 102, 255, 0.2);"
									:style="`transform:scale(${item2.scale}) rotate(${item2.r || 0}deg);border-radius: ${item2.radius}px;top:${item2.y / bili}px;left:${item2.x / bili}px;width: ${item2.width / bili}px; height:${item2.height / bili}px;`">
									<image v-if="item2.url"
										:style="`width: ${item2.width / bili}px; height:${item2.height / bili}px;`"
										:src="utils.showImageUrl(item2.url)" mode="widthFix"></image>
									<text v-else class="text-primary font-40 font-weight-bold">+</text>
								</view>
								<view v-else class="position-absolute">
									<image class="position-absolute"
										:style="`transform:scale(${item2.scale}) rotate(${item2.r || 0}deg);border-radius: ${item2.radius}px;top:${item2.y / bili}px;left:${item2.x / bili}px;width: ${item2.width / bili}px; height:${item2.height / bili}px;`"
										:src="utils.showImageUrl(item2.url)" mode=""></image>
								</view>
							</view>
						</view>
					</view>
				</view>
				<tui-modal :show="showModal == 1" custom>
					<view class="position-relative" style="width: 100vw; height: 100vh;">
						<qf-image-cropper :src="cropperInfo.src" :width="cropperInfo.width" :height="cropperInfo.height"
							:radius="cropperInfo.radius" @crop="handleCrop"></qf-image-cropper>
					</view>
				</tui-modal>
				<!-- 选择图片 -->
				<tui-bottom-popup isFixed :zIndex="1002" :maskZIndex="1001" :show="showModal == 2">
					<view class="py-3 px-3 flex align-center justify-between">
						<text class="font-32">选择要裁剪的图片</text>
						<image @click="showModal = 0" style="width: 40rpx; height: 40rpx;"
							src="/static/images/icon/close.png" mode=""></image>
					</view>
					<view class="flex flex-wrap">
						<template v-for="item, index in pageInfo.pages_content.imgList">
							<view v-if="item.url" @click="selectActiveItem(item)" :key="index" class="m-2">
								<view class="rounded-20 overflow-hidden flex align-center justify-center border"
									:class="cropperInfo.id == item.id ? 'border-primary' : ''"
									style="width: 208rpx; height: 208rpx;">
									<image style="width: 248rpx;" :src="utils.showImageUrl(item.url)" mode="widthFix">
									</image>
								</view>
							</view>
						</template>
					</view>
					<!-- 按钮 -->
					<view class="pt-2 pb-4 flex align-center justify-center px-2">
						<view @click="cropNext"
							class="flex-1 flex align-center justify-center linear-gradient rounded-circle"
							style="height: 100rpx;">
							<text class="text-white">确认，下一步</text>
						</view>
					</view>
				</tui-bottom-popup>
			</view>
		</template>
		<template v-slot:bottomBar>
			<view class="bg-white flex align-center justify-center px-2" style="height: 120rpx;">
				<view @click="crop" class="mr-2 flex align-center">
					<image style="width: 64rpx; height: 64rpx;" src="/static/images/common/cj.png" mode=""></image>
				</view>
				<view class="" style="width: 100rpx;">

				</view>
				<view class="flex-1 flex rounded-20 overflow-hidden" style="height: 90rpx;">
					<view @click="chooseImageList" class="flex-1 flex align-center justify-center"
						style="height: 90rpx; background-color: #ED1F8C;">
						<text class="text-white">上传图片</text>
					</view>
					<view @click="complete" class="flex align-center justify-center bg-primary" style="width: 200rpx; height: 90rpx;">
						<text class="text-white">完成</text>
					</view>
				</view>
			</view>
		</template>
	</page>
</template>

<script setup>
	import {
		pathToBase64,
		base64ToPath
	} from "@/js_sdk/image-tools/index.js"
	import store from "@/store/index.js";
	import utils from "@/utils/utils.js";
	import api from "@/request/api.js";
	import {
		ref,
		computed,
		reactive,
		toRefs,
		onMounted
	} from "vue";

	import {
		onShow,
		onLoad
	} from "@dcloudio/uni-app";

	const data = reactive({
		configsInfo: {
			configs_value: ""
		},
		bili: 1,
		pageInfo: {
			pages_content: {
				imgList: []
			}

		},
		activeItem: {},
		cropperInfo: {
			id: "",
			src: "",
			width: 500,
			height: 500,
			radius: 30
		},
		showModal: 0,
	});
	const {
		activeItem,
		cropperInfo,
		bili,
		pageInfo,
		showModal,
		configsInfo
	} = toRefs(data);

	const userInfo = computed(() => {
		return store.state.userInfo
	})

	const pictureNumber = computed(() => {
		let number = 0; //初始值
		if (data.pageInfo.pages_content.imgList.length == 0) {
			return 0;
		}
		number = data.pageInfo.pages_content.imgList.reduce((total, item) => {
			if (item.type == 'photo') {
				return total + 1
			} else {
				return total
			}
		}, 0)
		return number;
	})

	const havePicture = computed(() => {
		let number = 0; //初始值
		if (data.pageInfo.pages_content.imgList.length == 0) {
			return 0;
		}
		number = data.pageInfo.pages_content.imgList.reduce((total, item) => {
			if (item.type == 'photo' && item.url) {
				return total + 1
			} else {
				return total
			}
		}, 0)
		return number;
	})

	// 裁剪图片
	const crop = () => {
		if (havePicture.value == 0) {
			utils.showToast('请先上传图片')
			return;
		}
		// 只有一张图片 则不用弹出图片选择弹窗
		if (havePicture.value == 1) {
			getActivePageImg()
			
			return
		}
		data.showModal = 2;
	}

	// 获取一张图片
	const getActivePageImg = () => {
		const item = data.pageInfo.pages_content.imgList.find(e => e.url != '');
		if(item) {
			selectActiveItem(item);
			data.showModal = 1;
		} else {
			data.showModal = 2;
		}
	}

	// 选择裁剪的图片
	const selectActiveItem = (item) => {
		data.activeItem = item;
		// console.log('item', item);
		data.cropperInfo.id = item.id;
		data.cropperInfo.src = utils.showImageUrl(item.url);
		// 设置裁剪的宽高
		data.cropperInfo.width = Math.ceil(utils.mm2px(item.width * item.scale));
		data.cropperInfo.height = Math.ceil(utils.mm2px(item.height * item.scale));
		if (item.radius > 0) {
			data.cropperInfo.radius = Math.ceil(utils.mm2px(item.radius * item.scale));
		} else {
			data.cropperInfo.radius = 0;
		}
	}

	const cropNext = () => {
		// 如果没有选图片 则默认选第一张
		if(data.activeItem.id == '') {
			getActivePageImg()
		} else {
			data.showModal = 1;
		}
	}
	
	const complete = () => {
		uni.$emit('updatePageInfo', data.pageInfo);
		utils.goBack()
	}

	// 上传图
	const chooseImage = (key) => {
		uni.chooseImage({
			count: 1, //默认9
			sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
			sourceType: ['album'], //从相册选择
			success: (res) => {
				console.log('res', res);
				const filePath = res.tempFilePaths[0];
				api.uploadFile({
					filePath: filePath,
					name: 'file',
				}).then(res2 => {
					data.pageInfo.pages_content.imgList[key].url = res2.data.url
				})
			}
		});
	}

	// 批量上传
	const chooseImageList = () => {
		if (havePicture.value >= pictureNumber.value) {
			utils.showToast('图片位置已占满，请点击图片更换图片')
			return
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
						name: 'file',
					})
					setUrl(res2.data.url)
				}
			}
		});
	}

	const setUrl = (url) => {
		for (let item2 of data.pageInfo.pages_content.imgList) {
			if (item2.type == 'photo' && item2.url == '') {
				item2.url = url;
				break;
			}
		}
	}

	const handleCrop = (e) => {
		api.addBase64({
			file: e.tempFilePath,
		}).then(res2 => {
			data.activeItem.url = res2.data;
		})
		data.showModal = 0;
	}

	// 下拉刷新
	const refresherrefresh = () => {}

	// 上滑加载
	const scrolltolower = () => {}


	const getConfigsById = () => {
		api.getConfigsById({
			configs_id: 104
		}).then(res => {
			data.configsInfo = res.data;
		})
	}


	onShow(() => {})

	onLoad((info) => {
		// 获取配置
		getConfigsById()
		console.log('info', info);
		if (info.pageInfo) {
			data.pageInfo = JSON.parse(info.pageInfo);
			// console.log('data.pageInfo', data.pageInfo);
			const pages_area_width = data.pageInfo.pages_area_width;
			const width = uni.upx2px(710);
			data.bili = pages_area_width / width;
		}
		// 
	})
</script>

<style>
	.order-linear-gradient {
		background-image: linear-gradient(to right, rgba(0, 165, 234, 0.18), #fff);
	}
</style>
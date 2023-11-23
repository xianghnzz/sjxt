<template>
	<page bgColor="#fff" topColor="#00AEEF" :topHeight="88" :bottomHeight="120" :refresherEnabled="false">
		<template v-slot:navBar>
			<view class="text-center flex align-center justify-center" style="height: 88rpx;">
				<text class="font-36 text-white">专业编辑</text>
				<view @click="utils.goBack()" class="position-absolute rounded-circle flex align-center justify-center"
					style="width: 40rpx; height: 32rpx; left: 32rpx;">
					<image style="width: 40rpx; height: 32rpx;" src="/static/images/common/back_bai.png" mode="">
					</image>
				</view>
				<view @click="complete" class="position-absolute rounded-circle flex align-center justify-center border"
					style="width: 120rpx; height: 50rpx; right: 32rpx;">
					<text class="text-white font-28">完成</text>
				</view>
			</view>
		</template>
		<template v-slot:content>
			<view class="" style="height: 100%;">
				<!-- <view class="flex align-center justify-between px-2" style="height: 100rpx;">
					<view class="flex align-center">
						<image style="width: 58rpx; height: 58rpx;" src="/static/images/professional-edit/back.png"
							mode=""></image>
						<image class="ml-2" style="width: 58rpx; height: 58rpx;"
							src="/static/images/professional-edit/next.png" mode=""></image>
					</view>
					<view @click="complete" style="width: 184rpx; height: 60rpx;"
						class="linear-gradient rounded-circle flex align-center justify-center">
					</view>
				</view> -->
				<view class="flex align-center justify-center"
					style="height: calc(100% - 100rpx); background-color: #f5f5f5;">
					<!-- <canvas-drag ref="canvasRef" id="canvas-drag" :graph="graph" :width="dragWidth" :height="dragHeight"
						:enableUndo="true"></canvas-drag> -->
					<view @click.stop="claerActive(null)"
						class="position-relative border border-danger p-4 overflow-hidden"
						:style="`width: ${areainfo.width}px; height: ${areainfo.height}px`">
						<!-- 绘制背景 -->
						<view class="position-absolute top-0 left-0 right-0 bottom-0">
							<image style="width: 100%; height: 100%;"
								:src="utils.showImageUrl(pageInfo.pages_content.bgImg)" mode=""></image>
						</view>
						<df-moveable @click.stop="setItemActive(index)"
							v-for="item, index in pageInfo.pages_content.imgList" :key="index" :keys="index"
							:type="item.type" :id="item.id" :active="item.active" :x="item.x" :y="item.y"
							:w="item.width" :h="item.height" :scale="item.scale" :rotate="item.r"
							@updateItem="updateItem" @removeItem="removeItem" @moveableEnd="moveableEnd">
							<template v-if="item.type == 'photo'">
								<image v-if="item.url" :style="`border-radius: ${item.radius}px;`"
									style="width: 100%; height: 100%;" :src="utils.showImageUrl(item.url || '')"
									mode="">
								</image>
								<view v-else class="" :style="`border-radius: ${item.radius}px;`"
									style="width: 100%; height: 100%; background-color: rgba(51, 102, 255, 0.2);">
								</view>
							</template>
							<image v-else :style="`border-radius: ${item.radius}px;`" style="width: 100%; height: 100%;"
								:src="utils.showImageUrl(item.url || '')" mode="">
							</image>
						</df-moveable>
					</view>
				</view>
				<view class="flex align-center justify-between px-2"
					:style="`background-color:${configsInfo.configs_content || '#fff'}; color:${configsInfo.configs_illustrate || '#F58220'};font-size: ${configsInfo.configs_use || 28}rpx;`"
					style="height: 100rpx;">
					<view @click="crop" class="" style="width: 64rpx; height: 64rpx;">
						<image style="width: 64rpx; height: 64rpx;" src="/static/images/common/cj.png" mode=""></image>
					</view>
					<view class="mx-1 flex align-center justify-center" style="width: 550rpx; height: 100rpx;">
						<text class="ml-1 text-container">{{configsInfo.configs_value}}</text>
					</view>
					<view class="" style="width: 64rpx; height: 64rpx;">
						<image style="width: 64rpx; height: 64rpx;" src="/static/images/professional-edit/tc.png"
							mode=""></image>
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
				<!-- 选择模板 -->
				<tui-bottom-popup isFixed :zIndex="102" :maskZIndex="101" :show="showModal == 3">
					<view class="py-3 px-3 flex align-center justify-between">
						<text class="font-32">选择模板</text>
						<image @click="showModal = 0" style="width: 40rpx; height: 40rpx;"
							src="/static/images/icon/close.png" mode=""></image>
					</view>
					<view class="px-2 bg-white flex align-center" style="height: 80rpx;">
						<view class="rounded-circle flex align-center px-2 flex-1"
							style="background-color: #F5F5F5; height: 64rpx;">
							<input v-model="productQueryInfo.product_name" class="font-26 flex-1" type="text"
								placeholder="输入模板名称搜索" placeholder-style="color: #ccc">
							<image @click="getProductByIds" style="width: 40rpx; height: 40rpx;"
								src="/static/images/common/ss.png" mode=""></image>
						</view>
					</view>
					<scroll-view scroll-y="true" style="height: 500rpx;">
						<view class="flex flex-wrap">
							<view @click="selectActiveProduct(item)" v-for="item, index in productList" :key="index"
								class="m-2">
								<view class="rounded-20 overflow-hidden flex align-center justify-center border "
									:class="activeProduct.product_id == item.product_id ? 'border-primary' : ''"
									style="width: 208rpx; height: 208rpx;">
									<image style="width: 248rpx;" :src="utils.showImageUrl(item.product_cover)"
										mode="widthFix"></image>
								</view>
								<view class="text-ellipsis text-center mt-1" style="width: 208rpx;">
									<text :class="activeProduct.product_id == item.product_id ? 'text-primary' : ''"
										class="font-32">{{item.product_name}}</text>
								</view>
							</view>
						</view>
					</scroll-view>
					<!-- 按钮 -->
					<view class="pt-2 pb-4 flex align-center justify-center px-2">
						<view @click="selectActiveProductNext"
							class="flex-1 flex align-center justify-center linear-gradient rounded-circle"
							style="height: 100rpx;">
							<text class="text-white">确认，下一步</text>
						</view>
					</view>
				</tui-bottom-popup>
				<!-- 选择画面 -->
				<tui-bottom-popup isFixed :zIndex="1002" :maskZIndex="1001" :show="showModal == 4">
					<view class="py-3 px-3 flex align-center justify-between">
						<text class="font-32">选择画面</text>
						<image @click="showModal = 0" style="width: 40rpx; height: 40rpx;"
							src="/static/images/icon/close.png" mode=""></image>
					</view>
					<scroll-view scroll-y="true" style="height: 500rpx;">
						<view class="flex flex-wrap">
							<view @click="selectActivePage(item)" v-for="item, index in pageList" :key="index"
								class="m-2">
								<view class="rounded-20 overflow-hidden flex align-center justify-center border "
									:class="activePage.pages_id == item.pages_id ? 'border-primary' : ''"
									style="width: 208rpx; height: 208rpx;">
									<image style="width: 248rpx;" :src="utils.showImageUrl(item.pages_cover)"
										mode="widthFix"></image>
								</view>
							</view>
						</view>
					</scroll-view>
					<!-- 按钮 -->
					<view class="pt-2 pb-4 flex align-center justify-center px-2">
						<view @click="selectActivePageOk"
							class="flex-1 flex align-center justify-center linear-gradient rounded-circle"
							style="height: 100rpx;">
							<text class="text-white">选择完成</text>
						</view>
					</view>
				</tui-bottom-popup>
				<!-- 选择模板 -->
				<tui-bottom-popup isFixed :zIndex="102" :maskZIndex="101" :show="showModal == 5">
					<view class="py-3 px-3 flex align-center justify-between">
						<text class="font-32">选择{{sourceQueryInfo.title}}</text>
						<image @click="showModal = 0" style="width: 40rpx; height: 40rpx;"
							src="/static/images/icon/close.png" mode=""></image>
					</view>
					<view class="px-2 bg-white flex align-center" style="height: 80rpx;">
						<view class="rounded-circle flex align-center px-2 flex-1"
							style="background-color: #F5F5F5; height: 64rpx;">
							<input v-model="sourceQueryInfo.source_name" class="font-26 flex-1" type="text"
								placeholder="输入模板名称搜索" placeholder-style="color: #ccc">
							<image @click="getSourceByIds" style="width: 40rpx; height: 40rpx;"
								src="/static/images/common/ss.png" mode=""></image>
						</view>
					</view>
					<scroll-view scroll-y="true" style="height: 500rpx;">
						<view class="flex flex-wrap">
							<view @click="selectActiveSource(item)" v-for="item, index in sourceList" :key="index"
								class="m-2">
								<view class="rounded-20 overflow-hidden flex align-center justify-center border "
									:class="activeSource.source_id == item.source_id ? 'border-primary' : ''"
									style="width: 208rpx; height: 208rpx;">
									<image style="width: 248rpx;" :src="utils.showImageUrl(item.source_cover)"
										mode="widthFix"></image>
								</view>
								<view class="text-ellipsis text-center mt-1" style="width: 208rpx;">
									<text :class="activeSource.source_id == item.source_id ? 'text-primary' : ''"
										class="font-32">{{item.source_name}}</text>
								</view>
							</view>
						</view>
					</scroll-view>
					<!-- 按钮 -->
					<view class="pt-2 pb-4 flex align-center justify-center px-2">
						<view @click="selectActiveSourceOk"
							class="flex-1 flex align-center justify-center linear-gradient rounded-circle"
							style="height: 100rpx;">
							<text class="text-white">确认</text>
						</view>
					</view>
				</tui-bottom-popup>
			</view>
		</template>
		<template v-slot:bottomBar>
			<view class="bg-white flex align-center justify-between" style="height: 120rpx;">
				<view @click="chooseImageList" class="flex-1 flex flex-column align-center">
					<image style="width: 40rpx; height: 36rpx;" src="/static/images/professional-edit/img.png" mode="">
					</image>
					<text class="mt-1 text-color-999 font-24">传图</text>
				</view>
				<view @click="getProductByIds" class="flex-1 flex flex-column align-center">
					<image style="width: 36rpx; height: 36rpx;" src="/static/images/professional-edit/muban.png"
						mode=""></image>
					<text class="mt-1 text-color-999 font-24">模版</text>
				</view>
				<view @click="getSourceByIds(1, '素材')" class="flex-1 flex flex-column align-center">
					<image style="width: 40rpx; height: 36rpx;" src="/static/images/professional-edit/suchai.png"
						mode=""></image>
					<text class="mt-1 text-color-999 font-24">素材</text>
				</view>
				<view @click="getSourceByIds(2, '文字')" class="flex-1 flex flex-column align-center">
					<image style="width: 50rpx; height: 36rpx;" src="/static/images/professional-edit/wenzi.png"
						mode=""></image>
					<text class="mt-1 text-color-999 font-24">文字</text>
				</view>
				<view @click="getSourceByIds(3, '背景')" class="flex-1 flex flex-column align-center">
					<image style="width: 36rpx; height: 36rpx;" src="/static/images/professional-edit/beijing.png"
						mode=""></image>
					<text class="mt-1 text-color-999 font-24">背景</text>
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
	import canvasDrag from "@/components/canvas-drag/index";
	import dfMoveable from "@/components/df-movable/df-movable";
	import {
		onShow,
		onLoad
	} from "@dcloudio/uni-app";
	const canvasRef = ref();
	const data = reactive({
		configsInfo: {
			configs_value: ""
		},
		productQueryInfo: {
			ids: [],
			product_type: "",
			product_name: "",
			product_width: "",
			product_height: "",
		},
		// 模板列表
		productList: [],
		// 选中模板
		activeProduct: {},
		// 画面列表
		pageList: [],
		// 选中的画面
		activePage: {},
		sourceQueryInfo: {
			ids: [],
			title: "",
			source_name: "",
			source_type: "",
		},
		// 素材列表
		sourceList: [],
		// 选中的素材
		activeSource: {},
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
		maxWidth: 710,
		maxHeight: 710,
		cItem: {}
	});
	const {
		productQueryInfo,
		productList,
		activeProduct,
		pageList,
		activePage,
		sourceQueryInfo,
		sourceList,
		activeSource,
		activeItem,
		cropperInfo,
		bili,
		pageInfo,
		showModal,
		configsInfo,
		dragWidth,
		dragHeight,
		cItem
	} = toRefs(data);

	const userInfo = computed(() => {
		return store.state.userInfo
	})

	const orderFrom = computed(() => {
		return store.state.orderFrom
	})

	const pagesScale = computed(() => {
		// 原宽高比例
		let scale = 0;
		if (data.pageInfo?.pages_area_width > 0 && data.pageInfo?.pages_area_height > 0) {
			scale = data.pageInfo?.pages_area_width / data.pageInfo?.pages_area_height;
		}
		return scale;

	})

	const areainfo = computed(() => {
		let width = data.pageInfo?.pages_area_width;
		let height = data.pageInfo?.pages_area_height;

		//如果原宽大于最大宽度
		if (width > data.maxWidth) {
			width = data.maxWidth;
			height = width / pagesScale.value;
		}
		// 缩放后高度仍然大于最大高度继续按比例缩小
		if (height > data.maxHeight) {
			height = data.maxHeight;
			width = height * pagesScale.value;
		}
		return {
			width,
			height
		};
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

	const updateItem = (item) => {
		const index = item.keys;
		chooseImage(index);
	}

	const removeItem = (item) => {
		const index = item.keys;
		data.pageInfo.pages_content.imgList.splice(index, 1);
	}

	const moveableEnd = (item) => {
		console.log('(item', item);
		const index = item.keys;
		data.pageInfo.pages_content.imgList[index] = Object.assign(data.pageInfo.pages_content.imgList[index], item);
	}

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
		if (item) {
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
		if (data.activeItem.id == '') {
			getActivePageImg()
		} else {
			data.showModal = 1;
		}
	}

	const complete = () => {
		claerActive(null);
		data.pageInfo.pages_area_width = data.dragWidth;
		data.pageInfo.pages_area_height = data.dragHeight;
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

	// 设置选中
	const setItemActive = (index) => {
		data.pageInfo.pages_content.imgList[index].active = true;
		claerActive(data.pageInfo.pages_content.imgList[index].id);
	}

	// 清除选中
	const claerActive = (id = null) => {
		data.pageInfo.pages_content.imgList.forEach(item => {
			if (id && item.id == id) {
				item.active = true;
				data.cItem = item;
			} else {
				item.active = false;
			}
		})
		if (id == null) {
			data.cItem = {
				id: null,
				x: 30,
				y: 30,
				scale: 1,
				r: 0,
				radius: 0,
			};
		}
	}

	// 选择素材完成
	const selectActiveSourceOk = () => {
		// 判断是素材还是背景
		if (data.sourceQueryInfo.source_type == 3) {
			// 背景 则添加背景
			data.pageInfo.pages_content.bgImg = data.activeSource.source_print;
			data.showModal = 0;
		} else {
			uni.getImageInfo({
				src: utils.showImageUrl(data.activeSource.source_print),
				success: (res) => {
					console.log('res', res);
					// // 页面push 元素
					data.pageInfo.pages_content.imgList.push({
						active: true,
						width: 80,
						height: res.height / (res.width / 80),
						id: Math.random().toString(16).slice(2),
						r: 0,
						radius: 0,
						rotate: 0,
						scale: 1,
						type: "source",
						url: data.activeSource.source_print,
						x: 30,
						y: 30
					})
					data.showModal = 0;
				},
				fail: () => {
					utils.showToast('获取图片信息失败，请稍后再试')
					data.showModal = 0;
				}
			})
		}
	}

	// 选择素材
	const selectActiveSource = (item) => {
		data.activeSource = item
	}

	// 获取素材列表
	const getSourceByIds = (type, title) => {
		data.sourceQueryInfo.source_type = type;
		data.sourceQueryInfo.title = title;
		console.log('orderFrom.value', orderFrom.value);
		if (type == 1) {
			data.sourceQueryInfo.ids = orderFrom.value?.order_spec_info_obj?.spec_decoration_ids.split(',').filter(e =>
				e) || [];
		} else if (type == 2) {
			data.sourceQueryInfo.ids = orderFrom.value?.order_spec_info_obj?.spec_text_ids.split(',').filter(e =>
				e) || [];
		} else if (type == 3) {
			data.sourceQueryInfo.ids = orderFrom.value?.order_spec_info_obj?.spec_bg_ids.split(',').filter(e =>
				e) || [];
		}

		api.getSourceByIds(data.sourceQueryInfo).then(res => {
			console.log('res', res);
			data.sourceList = res.data;
			data.showModal = 5;
		})
	}

	// 选择画面完成
	const selectActivePageOk = () => {
		// 提取出来所有已经上传的图片
		const imgList = [];
		for (let item2 of data.pageInfo.pages_content.imgList) {
			if (item2.type == 'photo' && item2.url != '') {
				imgList.push(item2.url);
			}
		}
		// 循环放入新的模板文件中
		for (let imgItem of imgList) {
			for (let item2 of data.activePage.pages_content.imgList) {
				if (item2.type == 'photo' && item2.url == '') {
					item2.url = imgItem;
					break;
				}
			}
		}

		data.pageInfo = JSON.parse(JSON.stringify(data.activePage));
		// 把选中的页面 缩放大小
		initPage()
		data.showModal = 0;
	}

	const selectActivePage = (item) => {
		data.activePage = item;
	}

	// 选择模板完成 下一步
	const selectActiveProductNext = () => {
		if (!data.activeProduct.product_id) {
			utils.showToast('请选择模板，再进行下一步')
			return
		}
		// 设置画面列表 选择画面
		console.log('data.activeProduct', data.activeProduct);
		data.showModal = 4;
	}

	// 选择模板完成
	const selectActiveProduct = (item) => {
		data.activeProduct = item;
		if (data.activeProduct.product_print) {
			data.pageList = JSON.parse(data.activeProduct.product_print);
			// console.log('data.pageList', data.pageList);
		} else {
			utils.showToast('所选模板没有配置画面信息，请重新选择');
			data.pageList = [];
		}
	}

	const getProductByIds = () => {
		// 查询是自定义画布 还是 规格
		// 设置 画布大小 或者规格中得模板id;
		if (orderFrom.value?.order_spec_info_obj?.spec_id == 'zdy') {
			data.productQueryInfo.product_width = orderFrom.value?.order_spec_info_obj?.spec_width;
			data.productQueryInfo.product_height = orderFrom.value?.order_spec_info_obj?.spec_height;
		} else {
			data.productQueryInfo.ids = orderFrom.value?.order_spec_info_obj?.spec_template_ids.split(',').filter(e =>
				e) || [];
		}
		api.getProductByIds(data.productQueryInfo).then(res => {
			data.productList = res.data;
			data.showModal = 3;
		})
	}


	const getConfigsById = () => {
		api.getConfigsById({
			configs_id: 103
		}).then(res => {
			data.configsInfo = res.data;
		})
	}


	const initPage = () => {
		// 设置宽高
		const pages_area_width = data.pageInfo.pages_area_width;
		data.dragWidth = uni.upx2px(710);
		data.bili = pages_area_width / data.dragWidth;
		data.dragHeight = data.pageInfo.pages_area_height / data.bili;
		data.pageInfo.pages_content.imgList.forEach(item => {
			item.x = item.x / data.bili;
			item.y = item.y / data.bili;
			// 宽高直接把缩放设置进去
			item.width = item.width / data.bili;
			item.height = item.height / data.bili;
			// item.scale = item.scale / data.bili;
		})
	}

	onMounted(() => {
		initPage()

	})

	onShow(() => {})

	onLoad((info) => {
		data.maxWidth = uni.upx2px(710);
		data.maxHeight = uni.upx2px(710);
		// 获取配置
		getConfigsById()
		if (info.pageInfo) {
			data.pageInfo = JSON.parse(info.pageInfo);
			data.productQueryInfo.product_type = 1;
		}
	})
</script>

<style>
	.text-container {
		overflow: hidden;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		/* 设置最大显示行数 */
		-webkit-box-orient: vertical;
		text-overflow: ellipsis;
	}
</style>
import config from "@/static/js/config.js";
const utils = {
	// 返回上一页
	goBack: () => {

		uni.navigateBack({
			delta: 1
		})
	}, // 关闭所有页面，打开到应用内的某个页面
	reLaunch(pageUrl, options = '', group = '') {
		if (!pageUrl) {
			this.showToast('正在筹备，敬请期待');
			return false
		}
		const url = `/pages${group?  "/" + group: ""}/${pageUrl}/${pageUrl}${options ? '?'+options : ''}`;
		uni.reLaunch({
			url
		});
	},
	// 切换指定页面
	goToPage(pageUrl, options = '', group = '') {
		if (!pageUrl) {
			this.showToast('正在筹备，敬请期待');
			return false
		}
		const url = `/pages${group?  "/" + group: ""}/${pageUrl}/${pageUrl}${options ? '?'+options : ''}`;
		uni.navigateTo({
			url
		});
	},
	// 重置指定页面
	reToPage(pageUrl, options = '', group = '') {
		if (!pageUrl) {
			this.showToast('正在筹备，敬请期待');
			return false
		}
		const url = `/pages${group?  "/" + group: ""}/${pageUrl}/${pageUrl}${options ? '?'+options : ''}`;
		uni.redirectTo({
			url
		});
	},
	// 显示提示
	showToast(text) {
		uni.showToast({
			icon: "none",
			title: text
		})
	},
	// 使用默认浏览器打开网页连接
	openUrl(url, title = "") {
		if (!url) {
			this.showToast('请输入链接访问地址')
			return false;
		}
		// #ifdef APP-PLUS
		plus.runtime.openURL(
			url,
			// 打开url失败，执行，如打开的是tabao://但是手机没安装，就会执行报错
			() => {
				this.showToast('打开链接失败，请输入正确的链接地址访问')
			}
		);
		// #endif
		// #ifdef H5
		window.open(url)
		// #endif 
		// #ifdef MP
		utils.goToPage('web-view', `url=${url}&title=${title}`)
		// #endif 
	},
	//强制保留两位小数，不足补零
	returnFloat(value, zNum = 2) {
		var value = Math.round(parseFloat(value) * 100) / 100;
		var strList = value.toString().split(".");
		let integer = strList[0];
		let decimal = strList[1] ? strList[1] : "";
		integer += '.';
		for (let i = 0; i < zNum; i++) {
			if (decimal[i]) {
				integer += decimal[i]
			} else {
				integer += '0'
			}

		}
		console.log('integer', integer);
		return integer;
	},
	// 浏览器入口
	getEntrance() {
		/* 判断入口 */
		let typeApp = "";
		const browser = navigator.userAgent;
		if (
			browser.toLowerCase().match(/Alipay/i) == "alipay" &&
			!browser.toLowerCase().match(/koubei/i)
		) {
			typeApp = "alipay";
		} else if (browser.toLowerCase().match(/eleme/i) == "eleme") {
			typeApp = "eleme";
		} else if (browser.toLowerCase().match(/koubei/i) == "koubei") {
			typeApp = "koubei";
			//@ts-ignore
		} else if (browser.toLowerCase().match(/DingTalk/i) == "dingtalk") {
			typeApp = "dingding";
		} else if (browser.toLowerCase().match(/weibo/i) == "weibo") {
			typeApp = "weibo";
		} else if (browser.toLowerCase().match(/MicroMessenger/i) == "micromessenger") {
			typeApp = "weixin";
		} else if (browser.toLowerCase().match(/QQ/i) == 'qq') {
			typeApp = "qq";
		}
		return typeApp;
	},
	// 节流
	throttle(fn, delay = 500) {
		var lastTime;
		var timer;
		var delay = delay || 400;
		return function() {
			var args = arguments;
			// 记录当前函数触发的时间
			var nowTime = Date.now();
			if (lastTime && nowTime - lastTime < delay) {
				clearTimeout(timer);
				timer = setTimeout(function() {
					// 记录上一次函数触发的时间
					lastTime = nowTime;
					// 修正this指向问题
					fn.apply(this, args);
				}, delay);
			} else {
				lastTime = nowTime;
				fn.apply(this, args);
			}
		}
	},
	// 防抖
	debounce(fn, delay = 500) {
		// 记录上一次的延时器
		var timer = null;
		var delay = delay || 200;
		return function() {
			var args = arguments;
			var that = this;
			// 清除上一次延时器
			clearTimeout(timer)
			timer = setTimeout(function() {
				fn.apply(that, args)
			}, delay);
		}
	},
	showImage(url) {
		console.log(url)
	},
	showImageUrl(url, key = 'filePath') {
		if (!url) {
			return url;
		}
		if (url.indexOf("data:image") > -1) {
			return url;
		} else if (url.indexOf("http://") == -1 || url.indexOf("http://") == -1) {
			return config[key] + url;
		}
		return url;
	},
	saveImage(url = "") {
		// #ifdef H5
		uni.downloadFile({
			url: url,
			success: (res) => {
				//创建一个a标签
				var link = document.createElement('a');
				//把a标签的href属性赋值到生成好了的url
				link.href = url;
				//通过a标签的download属性修改下载图片的名字
				link.download = '分享海报.png';
				//让a标签的click函数，直接下载图片
				link.click();
			},
			fail: function(err) {}
		})
		// #endif
		// #ifdef APP
		// 存成图片至手机
		uni.saveImageToPhotosAlbum({
			filePath: url,
			success: (res) => {
				uni.showToast({
					title: '图片保存成功',
					duration: 2000
				})
			},
			fail: (err) => {
				if (err.errMsg === 'saveImageToPhotosAlbum:fail auth deny') {
					uni.showToast({
						title: '保存失败，稍后再试',
						duration: 2000,
						icon: 'none'
					})
				} else {
					uni.showToast({
						title: '保存失败，稍后再试',
						duration: 2000,
						icon: 'none'
					})
				}
			}
		})
		// #endif
	},
	getRatio() {
		var ratio = 0;
		var div = document.createElement('div');
		div.style.width = '1cm';
		div.id = 'puc';
		document.body.appendChild(div);
		var w = getComputedStyle(div, null).width;
		ratio = w.substr(0, w.length - 2);
		div.parentNode.removeChild(div);
		return ratio;
	},
	px2cm(px) {
		return Math.round(px * 10 / this.getRatio()) / 10;
	},
	px2mm(px) {
		var r = this.getRatio() / 10;
		return Math.round(px / r);
	},
	cm2px(cm) {
		return Math.round(cm * this.getRatio());
	},
	mm2px(mm) {
		var r = this.getRatio() / 10;
		return Math.round(mm * r);
	},
	base64ToFile(base64) {
		const arr = base64.split(',');
		const defaultMimeType = arr[0].match(/:(.*?);/)[1];
		const suffix = defaultMimeType.split('/')[1];
		const binary = atob(arr[1]);
		const array = [];
		for (let i = 0; i < binary.length; i += 1) {
			array.push(binary.charCodeAt(i));
		}

		const file = new File(
			[new Uint8Array(array)],
			`${new Date().getTime()}.${suffix}`, {
				type: defaultMimeType
			},
		);

		return (window.URL || window.webkitURL).createObjectURL(file);
	},
	base64ToBlob(base64, mimeType = 'png') {
		const arr = base64.split(',');
		const defaultMimeType = arr[0].match(/:(.*?);/)[1];
		const binary = atob(arr[1]);
		const array = [];
		for (let i = 0; i < binary.length; i += 1) {
			array.push(binary.charCodeAt(i));
		}
		return (window.URL || window.webkitURL).createObjectURL(new Blob([new Uint8Array(array)], {
			type: mimeType || defaultMimeType
		}));
	}
}

export default utils;
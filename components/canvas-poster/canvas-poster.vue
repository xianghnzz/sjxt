<template>
	<view style="position: fixed; top: 0; left: 750rpx;">
		<canvas :style="`width: ${width}rpx; height: ${height}rpx;`" canvas-id="canvasImage" />
	</view>
</template>

<script setup>
	import {
		defineProps,
		defineExpose,
		reactive,
		toRefs,
		onMounted,
	} from "vue";
	const emits = defineEmits(["ready"]);
	const props = defineProps({
		// 宽
		width: {
			type: [String, Number],
			default: 750
		},
		height: {
			type: [String, Number],
			default: 1350
		},
		pixel: {
			type: [String, Number],
			default: 3
		},
	});

	const data = reactive({
		index: 0,
		canvasData: [],
	})

	const {} = toRefs(data);

	const draw = async (canvasData = [], callback) => {
		data.canvasData = canvasData;
		for (let i = 0; i < data.canvasData.length; i++) {
			if (data.canvasData[i].type == 'image') {
				// || data.canvasData[i].imgType == 1
				if (data.canvasData[i].imgType == 2) {
					const imageInfo = await uni.getImageInfo({
						src: data.canvasData[i].src,
						// success: (res) => {
						// 	console.log('res', res);
						// },
						// fail(e) {
						// 	console.log('e', e);
						// 	data.canvasData[i].bdsrc = data.canvasData[i].src
						// }
					})
					console.log('imageInfo', imageInfo);
					if (imageInfo && imageInfo.path) {
						data.canvasData[i].bdsrc = imageInfo.path;
					} else {
						data.canvasData[i].bdsrc = data.canvasData[i].src
					}
				} else {
					data.canvasData[i].bdsrc = data.canvasData[i].src
				}

			}
		}
		const ctx = uni.createCanvasContext('canvasImage', this);
		data.canvasData.forEach(item => {
			// 绘制图片
			if (item.type == 'image') {
				const x = uni.upx2px(item.style.left) || 0;
				const y = uni.upx2px(item.style.top) || 0;
				const width = uni.upx2px(item.style.width) || 0;
				const height = uni.upx2px(item.style.height) || 0;
				if (item.style.borderRadius && item.style.borderRadius > 0) {
					const radius = uni.upx2px(item.style.borderRadius) || 0;
					// 绘制海报背景图片圆角
					ctx.save()
					ctx.beginPath()
					ctx.arc(x + radius, y + radius, radius, Math.PI, Math.PI * 1.5)
					ctx.arc(x + width - radius, y + radius, radius, Math.PI * 1.5, Math.PI * 2)
					ctx.arc(x + width - radius, y + height - radius, radius, 0, Math.PI * 0.5)
					ctx.arc(x + radius, y + height - radius, radius, Math.PI * 0.5, Math.PI)
					ctx.clip()
					// 重新绘制图片并且只能在圆角矩形内显示
					ctx.drawImage(item.bdsrc, x, y, width, height);
					// 恢复之前保存的绘图上下文
					ctx.restore()
				} else {
					ctx.drawImage(item.bdsrc, x, y, width, height);
				}
			} else if (item.type == 'text') {
				drawText(ctx, item.text, item.style)
			} else if (item.type == 'rect') {
				drawRoundRect(ctx, item.style)
			}
		})
		ctx.draw(true, () => {
			setTimeout(() => {
				uni.canvasToTempFilePath({
					canvasId: 'canvasImage',
					width: Number(props.width),
					height: Number(props.height),
					destWidth: Number(props.width),
					destHeight: Number(props.height),
					success: res => {
						console.log('res', res);
						callback(res.tempFilePath)
					},
					fail() {
						callback('')
					},
					complete() {
					}
				}, this)
			}, 200)
		})
	}

	// 绘制圆角矩形
	const drawRoundRect = (ctx3, style) => {
		const {
			borderColor,
			backgroundColor,
		} = style;
		const x = uni.upx2px(style.left) || 0;
		const y = uni.upx2px(style.top) || 0;
		const width = uni.upx2px(style.width) || 0;
		const height = uni.upx2px(style.height) || 0;
		const borderRadius = uni.upx2px(style.borderRadius) || 0;
		const borderWidth = uni.upx2px(style.borderWidth) || 0;
		ctx3.beginPath(); // 开始绘制路径
		ctx3.lineWidth = borderWidth; // 边框大小
		// 起始点:moveTo(x,y) 二次贝塞尔曲线:quadraticCurveTo('控制点x','控制点y','结束点x','结束点y') 结束点:lineTo(x,y) ;
		ctx3.moveTo(x + borderRadius, y);
		ctx3.lineTo(x + width - borderRadius, y);
		ctx3.quadraticCurveTo(x + width, y, x + width, y + borderRadius);
		ctx3.lineTo(x + width, y + height - borderRadius);
		ctx3.quadraticCurveTo(x + width, y + height, x + width - borderRadius, y + height);
		ctx3.lineTo(x + borderRadius, y + height);
		ctx3.quadraticCurveTo(x, y + height, x, y + height - borderRadius);
		ctx3.lineTo(x, y + borderRadius);
		ctx3.quadraticCurveTo(x, y, x + borderRadius, y);
		ctx3.fillStyle = backgroundColor; //为圆角矩形填充颜色
		ctx3.strokeStyle = borderColor; //矩形边框颜色
		ctx3.closePath(); //闭合绘制的路径
		ctx3.fill(); //填充当前的路径,默认颜色是黑色
		ctx3.stroke(); //绘制确切的路径
	}




	/**
	 * text         文本
	 * x,y          轴
	 * width        行宽
	 * fontSize     字体大小
	 * rouHeight    行高，如果字体16px，1.5倍行距应该是24px
	 * ctx          画板内容对象
	 */
	const drawText = (ctx, text, style) => {
		const fontStyle = style.fontStyle || 'normal';
		const fontWeight = style.fontWeight || 400;
		const fontSize = uni.upx2px(style.fontSize) || 14;
		console.log('fontSize', fontSize);
		const fontFamily = style.fontFamily || '微软雅黑';
		const font = `${fontStyle} ${fontWeight} ${fontSize}px ${fontFamily}`;
		ctx.font = font;
		ctx.textAlign = style.textAlign || 'left';
		ctx.fillStyle = style.color || "#000";
		const lineHeight = style.lineHeight ? uni.upx2px(style.lineHeight) : fontSize * 1.5;
		const x = uni.upx2px(style.left) || 0;
		const y = uni.upx2px(style.top) || 0;
		const width = style.width ? uni.upx2px(style.width) : uni.upx2px(props.width -
			40);
		// 是否自动换行
		if (style.wrap) {
			// 1 将字符串转换成数组
			let test = text.split("")
			let temp = ""
			let row = []
			// 1.2 计算文字宽度，若文字宽度大于设定的宽度，则push到数组下一个元素，否则将字符串++
			for (let i = 0; i < test.length; i++) {
				if (ctx.measureText(temp).width > width) {
					row.push(temp)
					temp = ""
				}
				temp += test[i]
			}
			// 1.3 循环结束将temp最后一段字符push
			row.push(temp)
			console.log('row', row);
			// 1.4 遍历数组,输出文字
			for (let j = 0; j < row.length; j++) {
				// ctx.fillText(row[j], x, y + (j + 1) * fontSize * lineHeight)
				ctx.fillText(row[j], x, y + j * lineHeight)
			}
		} else {
			// 是否需要省略号
			if (style.ellipsis) {
				text = fittingString(ctx, text, width);
			}
			ctx.fillText(text, x, y, width);
		}
		// 是否划线
		if (style.lineThrough) {
			const lineThroughColor = style.lineThroughColor || "#000";
			ctx.beginPath()
			const textWidth = ctx.measureText(text).width;
			ctx.setFillStyle(lineThroughColor);
			ctx.rect(x, y - fontSize / 2 + 2, textWidth, 1);
			ctx.fill()
			ctx.closePath()
		}



	}

	// canvas单行文本自动省略
	const fittingString = (ctx, str, maxWidth) => {
		let strWidth = ctx.measureText(str).width;
		const ellipsis = "…";
		const ellipsisWidth = ctx.measureText(ellipsis).width;
		if (strWidth <= maxWidth || maxWidth <= ellipsisWidth) {
			return str;
		} else {
			var len = str.length;
			while (strWidth >= maxWidth - ellipsisWidth && len-- > 0) {
				str = str.slice(0, len);
				strWidth = ctx.measureText(str).width;
			}
			return str + ellipsis;
		}
	}

	defineExpose({
		draw
	});

	onMounted(() => {
		emits('ready')
	})
</script>
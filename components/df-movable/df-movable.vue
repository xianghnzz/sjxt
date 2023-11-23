<template>
	<!--  @mouseup="WraptouchEnd" -->
	<view class="content" :id="'dfMoveable'+keys" :key="'dfMoveable'+keys"
		:style="{
			transform:`rotate(${imginfo.rotate}deg)  scale(${imginfo.scale})`,
			top: `${imginfo.y*parentScale}px`,
			left: `${imginfo.x*parentScale}px`,
			width: `${imginfo.w}px`,
			height: `${imginfo.h}px`,
			}">
		<view class="logo" @touchstart='WraptouchStart' @touchmove='WraptouchMove' @touchend="WraptouchEnd">
			<slot></slot>
		</view>
		<view v-if="active" class="fangda" :style="{transform:`scale(${parentScale*1 / imginfo.scale})`}" @touchstart='touchStart'
			@touchmove='touchMove' @touchend='touchEnd'>
			<image class="image" src="/static/images/sf.png"></image>
		</view>
		<view @click.stop="removeItem" v-if="active" class="close" :style="{transform:`scale(${parentScale * 1 / imginfo.scale})`}">
			<image class="image" src="/static/images/close.png"></image>
		</view>
		<view @click.stop="updateItem" v-if="active && type == 'photo'" class="shtp" :style="{transform:`scale(${parentScale * 1 / imginfo.scale})`}">
			<image class="image" src="/static/images/sctp.png"></image>
		</view>
	</view>
</template>

<script>
	export default {
		name: 'duMoveable',
		props: {
			type: {
				type: [String],
				default: 'photo'
			},
			id: {
				type: [Number, String],
				default: 'mv'
			},
			keys: {
				type: [Number, String],
				default: 'mv'
			},
			active: {
				type: [Number, Boolean],
				default: 0
			},
			rotate: {
				type: [Number],
				default: 0
			},
			scale: {
				type: [Number],
				default: 1
			},
			x: {
				type: [Number],
				default: 0
			},
			y: {
				type: [Number],
				default: 0
			},
			w: {
				type: [Number],
				default: 0
			},
			h: {
				type: [Number],
				default: 0
			},
			parentScale: {
				type: [Number],
				default: 1
			},
			load: {
				type: [Boolean],
				default: true
			}
		},
		data() {
			return {
				isDown: false,
				isXzDown: false,
				title: '开心"v"每一天!',
				zoom: 1,
				imginfo: {
					numberLock: false,
					tDistance: 0,
					lx: 0,
					ly: 0,
					x: 0,
					y: 0,
					w: 0,
					h: 0,
					tx: 0,
					ty: 0,
					_tx: 0,
					_ty: 0,
					scale: 1, //缩放比例
					_scale: 1,
					rotate: 0, //倾斜角度
					angleNext: 0,
				},
				mv_o: [0, 0]
			}
		},
		watch: {
			x: function(newVal, oldVal) {
				this.imginfo.x = newVal
			},
			y: function(newVal, oldVal) {
				this.imginfo.y = newVal
			},
			w: function(newVal, oldVal) {
				this.imginfo.w = newVal
			},
			h: function(newVal, oldVal) {
				this.imginfo.h = newVal
			},
			scale: function(newVal, oldVal) {
				this.imginfo.scale = newVal
				this.imginfo._scale = newVal
			},
			rotate: function(newVal, oldVal) {
				this.imginfo.rotate = newVal
			}
		},
		created() {
			this.imginfo.scale = this.scale
			this.imginfo._scale = this.scale
			this.imginfo.rotate = this.rotate
			this.imginfo.x = this.x
			this.imginfo.y = this.y
			this.imginfo.w = this.w
			this.imginfo.h = this.h
			this.$nextTick(() => {
				this.updateCoord();
			})
		},
		methods: {
			updateItem() {
				this.$emit('updateItem', {
					id: this.id,
					keys: this.keys,
					x: this.imginfo.x,
					y: this.imginfo.y,
					width:this.imginfo.w,
					height:this.imginfo.h,
					scale: this.imginfo.scale,
					rotate: this.imginfo.rotate
				});
			},
			removeItem() {
				this.$emit('removeItem', {
					id: this.id,
					keys: this.keys,
					x: this.imginfo.x,
					y: this.imginfo.y,
					width:this.imginfo.w,
					height:this.imginfo.h,
					scale: this.imginfo.scale,
					rotate: this.imginfo.rotate
				});
			},
			updateCoord() {
				const query = uni.createSelectorQuery().in(this);
				query.select('#dfMoveable' + this.keys).boundingClientRect(data => {
					let {
						left,
						top,
						width,
						height
					} = data
					this.mv_o[0] = left + width / 2
					this.mv_o[1] = top + height / 2
				}).exec();
			},
			WraptouchStart(e) {
				this.isDown = true;
				if (e.touches.length === 1) {
					if (this.numberLock) return;
					this.imginfo.lx = e.touches[0].clientX;
					this.imginfo.ly = e.touches[0].clientY;
				} else if (e.touches.length === 2) {
					this.numberLock = true
					this.tDistance = this.getDistancs(e.touches[0].pageX, e.touches[0].pageY, e.touches[1].pageX, e
						.touches[1].pageY)
				}
			},
			WraptouchMove(e) {
				if (!this.isDown) {
					return
				}
				if (e.touches.length === 1) {
					if (this.numberLock) return;
					this.imginfo.x += (e.touches[0].clientX - this.imginfo.lx) / this.zoom
					this.imginfo.y += (e.touches[0].clientY - this.imginfo.ly) / this.zoom
					this.imginfo.lx = e.touches[0].clientX;
					this.imginfo.ly = e.touches[0].clientY;
				} else if (e.touches.length === 2) {
					let NewDistance = this.getDistancs(e.touches[0].pageX, e.touches[0].pageY, e.touches[1].pageX, e
						.touches[1].pageY)
					this.imginfo.scale = (NewDistance / this.tDistance) * this.imginfo._scale;
					this.astrictScale()
				}

			},
			WraptouchEnd(e) {
				this.isDown = false;
				if (e.touches.length === 0) {
					this.numberLock = false
				}
				this.updateCoord();
				this.back();
			},
			//缩放控件事件
			touchStart(e) {
				this.isXzDown = true;
				this.imginfo.tx = e.touches[0].clientX;
				this.imginfo.ty = e.touches[0].clientY;
				this.updateCoord();
				this.imginfo.dist = this.getDistancs(this.mv_o[0], this.mv_o[1], this.imginfo.tx, this.imginfo.ty)
				this.imginfo.anglePre = this.countDeg(this.mv_o[0], this.mv_o[1], this.imginfo.tx, this.imginfo.ty) - this
					.imginfo.rotate
			},
			touchMove(e) {
				if (!this.isXzDown) {
					return
				}
				this.imginfo._tx = e.touches[0].clientX;
				this.imginfo._ty = e.touches[0].clientY;
				let newdist = this.getDistancs(this.mv_o[0], this.mv_o[1], this.imginfo._tx, this.imginfo._ty)
				this.imginfo.scale = (newdist / this.imginfo.dist) * this.imginfo._scale;
				this.astrictScale();
				this.imginfo.angleNext = this.countDeg(this.mv_o[0], this.mv_o[1], this.imginfo._tx, this.imginfo._ty)
				this.imginfo.rotate = this.imginfo.angleNext - this.imginfo.anglePre;
			},
			touchEnd() {
				this.isXzDown = false;
				this.back();
			},
			mouseup() {
				this.isDown = false;
				this.isXzDown = false;
			},
			astrictScale() {
				if (Math.abs(this.imginfo.scale) > 5) { //设置最大缩放为2倍
					this.imginfo.scale = 5;
				}
				if (Math.abs(this.imginfo.scale) < 0.5) { //设置最小缩放为0.5倍
					this.imginfo.scale = 0.5;
				}
			},
			back() {
				this.imginfo._scale = this.imginfo.scale;
				this.$emit('moveableEnd', {
					id: this.id,
					keys: this.keys,
					x: this.imginfo.x,
					y: this.imginfo.y,
					width:this.imginfo.w,
					height:this.imginfo.h,
					scale: this.imginfo.scale,
					r: this.imginfo.rotate
				});
			},
			//勾股定理
			getDistancs(cx, cy, pointer_x, pointer_y) {
				var ox = pointer_x - cx;
				var oy = pointer_y - cy;
				return Math.sqrt(
					ox * ox + oy * oy
				);
			},
			countDeg(cx, cy, pointer_x, pointer_y) {
				var ox = pointer_x - cx;
				var oy = pointer_y - cy;
				var to = Math.abs(ox / oy);
				var angle = Math.atan(to) / (2 * Math.PI) * 360; //鼠标相对于旋转中心的角度  
				if (ox < 0 && oy < 0) {
					angle = -angle;
				} else if (ox <= 0 && oy >= 0) //左下角
				{
					angle = -(180 - angle)
				} else if (ox > 0 && oy < 0) //右上角
				{
					angle = angle;
				} else if (ox > 0 && oy > 0) //右下角  
				{
					angle = 180 - angle;
				}
				return angle;
			},
		}
	}
</script>

<style>
	page {
		overflow: hidden;
		height: 100%;
	}

	.content {
		margin: 0;
		position: absolute;
	}

	.logo {
		height: 100%;
		width: 100%;
		display: block;
		/* background-color: #FFFFFF; */
	}
	
	.close {
		position: absolute;
		width: 30px;
		height: 30px;
		z-index: 99;
		left: -15px;
		top: -15px;
		/* background-color: rgba(229, 24, 96, 0.6); */
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	
	.shtp {
		position: absolute;
		width: 30px;
		height: 30px;
		z-index: 99;
		right: -15px;
		top: -15px;
		background-color: #fff;
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.fangda {
		position: absolute;
		width: 30px;
		height: 30px;
		z-index: 99;
		right: -15px;
		bottom: -15px;
		/* background-color: rgba(229, 24, 96, 0.6); */
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	
	

	.fangda .image,
	.close .image,
	.shtp .image{
		width: 100%;
		height: 100%;
		display: inline-block;
		transform: rotate(0deg)
	}
</style>
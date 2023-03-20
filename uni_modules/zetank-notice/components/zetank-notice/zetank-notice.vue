<template>
	<view v-if="type===0">
		<view class="notice">
			<view class="left_icon">
				<!-- <u-icon name="volume-fill" :color="colors" size="36"></u-icon> -->
				<image src="../../../../static/notice_icon.png" mode=""></image>
			</view>
			<view class="right_notice">
				<swiper class="notice_swiper" vertical easing-function="easeInOutCubic" autoplay :interval="interval">
					<swiper-item v-for="(item,index) in noticeList" :key="index" class="sw_item"
						@click="clickNotice(item)">
						<text class="sw_text">{{item.title}}</text>
						<image class="sw_image" src="../../../../static/notice_more.png" mode=""></image>
					</swiper-item>
				</swiper>
			</view>
		</view>
	</view>

</template>

<script>
	export default {
		data() {
			return {};
		},
		props: {
			colors: {
				type: String,
				default: '#55aaff'
			},
			noticeList: {
				type: Array,
				default () {
					return [{
						id: 0,
						title: "暂无"
					}]
				}
			},
			interval: {
				type: Number,
				default: 5000
			},
			type: {
				type: Number,
				default: 0
			}
		},
		methods: {
			clickNotice(e) {
				this.$emit('clickNotice', e)
			}
		}
	};
</script>
<style lang="scss" scoped>
	.notice {
		display: flex;
		height: 80upx;
		line-height: 80upx;
		margin-top: 15upx;
		padding: 0 10upx;
		border-radius: 8upx;
	}

	.left_icon {
		@include flexCenter;
		height: 100%;
		width: 10%;
		padding-top: 3upx;
		image {
			width: 50rpx;
			height: 50rpx;
		}
	}

	.left_icon .iconfont {
		display: inline-block;
		font-size: 44upx;
	}

	.right_notice {
		width: 90%;
	}

	.right_notice .notice_swiper {
		height: 80upx;
	}

	.notice_swiper .sw_item {
		height: 80upx;
	}

	.notice_swiper .sw_item .sw_text {
		font-size: 24upx;
		color: #ffffff;
		display: inline-block;
	}

	.notice_swiper .sw_image {
		width: 40upx;
		height: 40upx;
		float: right;
		margin-top: 20upx;
	}
</style>

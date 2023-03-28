<template>
	<view class="container">
		<!-- <view class="initHeader initHeader--line initHeader--black">
			<view class="initHeader-wrapper">
				<view class="initHeader-back" @click="$tools.back(1)"></view>
				<view class="initHeader-title">{{i18n.otc_xiangq}}</view>
			</view>
		</view>
		<view class="main">
			<view class="newsBox">
				<view class="newsBox-wrapper">
					<view class="newsBox-title">{{ noticeContent.title }}</view>
					<view class="newsBox-date">{{ noticeContent.createTime }}</view>
					<rich-text :nodes="noticeContent.content" class="textImage" style="color:#626266;line-height: 1.8;font-size: 28upx;"></rich-text>
				</view>
			</view>
		</view> -->
		<!-- <view class="initHeader">
			<view class="initHeader-box">
				<view class="initHeader-box-left" @click="$tools.back(1)">
					<image src="../../static/operate/return.png" mode=""></image>
				</view>
				<view class="initHeader-box-center">
					公告詳情
				</view>
				<view class="initHeader-box-right">
					<view class="" style="width: 40upx;"></view>
				</view>
			</view>
		</view> -->
		<view class="content">
			<view class="content-title">
				{{ noticeContent.title }}
			</view>
			<view class="content-time">
				{{ noticeContent.createTime }}
			</view>
			<view class="content-detail">

				<rich-text :nodes="noticeContent.content" class="textImage"></rich-text>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		getnoticeDetail
	} from '@/api/api.js';
	export default {
		data() {
			return {
				pageId: null,
				userId: null,
				noticeContent: [],
			};
		},
		onLoad(option) {
			this.pageId = option.value1;
		},
		onShow() {
			this.init();
		},
		methods: {
			init() {
				this.getDetailsContent();
			},
			getDetailsContent() {
				getnoticeDetail({
					id: this.pageId
				}).then(res => {
					this.noticeContent = res.obj.content;
				})
			},
		}
	}
</script>

<style lang="scss" scoped>
	.content {
		width: 100%;
		padding: 0 42upx;
		color: #ffffff;

		&-title {
			font-size: 30upx;
			font-family: PingFang SC;
			font-weight: bold;
			color: #ffffff;
			margin-bottom: 20upx;
		}

		&-time {
			font-size: 26upx;
			font-family: PingFang SC;
			font-weight: 500;
			color: #C0BDC3;
			margin-bottom: 40upx;
		}

		&-detail {
			font-size: 24upx;
			font-family: PingFang SC;
			font-weight: 500;
			color: #ffffff;
		}
	}
</style>
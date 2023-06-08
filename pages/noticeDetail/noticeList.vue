<template>
	<view class="pages">
		<!-- <view class="initHeader">
			<view class="initHeader-box">
				<view class="initHeader-box-left" @click="$tools.back(1)">
					<image src="../../static/operate/return.png" mode=""></image>
				</view>
				<view class="initHeader-box-center">
					公告列表
				</view>
				<view class="initHeader-box-right">
					<view class="" style="width: 40upx;"></view>
				</view>
			</view>
		</view> -->

		<view class="content">
			<view class="initNoData" v-if="flag"></view>
			<view class="content-box" v-for="(item, index) in noticeList" :key="index"
				@click="$tools.jump('/pages/noticeDetail/noticeDetail', item.id, userId)">
				<view class="content-box-top">
					<view class="content-box-top-left">
						{{ item.title }}
					</view>
				</view>
				<view class="content-box-bom">
					<rich-text :nodes="item.content" class="textImage"></rich-text>
				</view>
				<view class="content-box-top-right">
					{{ item.createTime }}
				</view>
			</view>
			<view class="content-no">
				~没有更多~
			</view>
		</view>
	</view>
</template>

<script>
	import {
		getnoticeList
	} from '@/api/api.js';
	export default {
		data() {
			return {
				noticeList: [],
				newsPagesTotal: 1, //总页数
				newsPageNum: 1, //当前页数
				newsPageSize: 20, //请求记录
				isBottom: false,

				userId: '',
				flag: false
			};
		},
		computed: {
			i18n() {
				return this.$t('message')
			}
		},
		onLoad() {
			this.noticeList = [];
			this.init();
		},
		onReachBottom() {
			if (this.newsPageNum >= this.newsPagesTotal) {
				return this.$tools.toast(this.i18n.gold_ddl);
			} else {
				this.newsPageNum++;
				this.getNoticeList();
			}
		},
		methods: {
			init() {
				this.getNoticeList();
			},
			getNoticeList() {
				let that = this;
				getnoticeList({
					pageNum: this.newsPageNum,
					pageSize: this.newsPageSize
				}).then(res => {
					that.newsPagesTotal += 1;
					let data = res.obj.list;
					that.noticeList = that.noticeList.concat(data);

					if (this.noticeList.length == 0 || this.noticeList == null) {
						this.flag = true
					} else {
						this.flag = false
					}
				})
				setTimeout(function() {
					uni.hideLoading();
				}, 100);
			}
		}
	};
</script>

<style lang="scss" scoped>
	.pages {
		width: 100%;
		min-height: 100vh;

		.initHeader {
			display: flex;
			align-items: center;
			justify-content: center;
			margin-bottom: 30upx;

			.initHeader-box {
				width: 100%;
				@include flexBetween;
				padding: 0 20upx;

				.initHeader-box-left {
					width: 40upx;
					height: 37upx;
					@include flexCenter;

					image {
						width: 100%;
						height: 100%;
					}
				}

				.initHeader-box-center {
					font-size: 40upx;
					font-family: PingFang SC;
					font-weight: bold;
					color: #282828;
				}

				.initHeader-box-right {}
			}
		}

		.content {
			width: 100%;
			padding: 0 20upx;

			&-box {
				width: 100%;
				background: #333333;
				border-radius: 5upx;
				padding: 28upx 22upx;
				margin-bottom: 20upx;
				display: flex;
				flex-direction: column;
				justify-content: space-between;
				align-items: center;

				&-top {
					width: 100%;
					@include flexBetween;
						overflow: hidden;
					&-left {
						font-size: 28upx;
						font-family: PingFang SC;
						font-weight: 500;
						color: #FFFFFF;
					}

					&-right {
						width: 100%;
						text-align: right;
						margin-top: 10rpx;
						font-size: 28upx;
						font-family: PingFang SC;
						font-weight: 500;
						color: #AEAEAE;
					}
				}

				&-bom {
					margin-top: 10rpx;
					width: 100%;
					font-size: 24upx;
					font-family: PingFang SC;
					font-weight: 500;
					color: #d3d3d3;
					word-break: break-all;
					text-overflow: ellipsis;
					display: -webkit-box;
					-webkit-box-orient: vertical;
					-webkit-line-clamp: 2;
					/* 这里是超出几行省略 */
					overflow: hidden;
					text-indent: 2em;
				}
			}

			&-no {
				font-size: 24upx;
				font-family: PingFang SC;
				font-weight: 500;
				color: #3E3C44;
				text-align: center;
				margin-top: 33upx;
				padding-bottom: 40rpx;
			}
		}
	}
	.announcement {
		// padding: 0 30upx;
		
		background: #202229;
		&-title {
	
			font-size: 32upx;
			margin-bottom: 15upx;
			
		}
		&-item {
			width: 100%;
			height: 168upx;
			padding: 0 30upx;
			display: flex;
			align-items: center;
			justify-content: space-between;
			overflow: hidden;
			border-bottom: 1upx solid #1A1C22;
	
			&--done {
				color: #78849a;
	
				// .announcement-item__icon {
				// 	background-image: url('@/static/notice/icon-sign-done.png');
				// }
				// .announcement-item__date {
				// 	background-image: url('@/static/notice/icon-date-done.png');
				// }
				// .announcement-item__arrow {
				// 	background-image: url('@/static/notice/icon-arrow-done.png');
				// }
			}
	
			&__icon {
				flex-basis: 80upx;
				margin-right: 30upx;
				background-color: rgba(59, 61, 78, 0.5);
				border-radius: 50%;
				width: 80upx;
				height: 80upx;
				background-size: 40upx;
				background-position: center;
				background-repeat: no-repeat;
				// background-image: url('@/static/notice/icon-sign.png');
			}
	
			&__content {
				flex: 1;
				width: 80%;
				@include flexLeftColumn;
			}
	
			&__title {
				width: 95%;
				font-size: 32upx;
				margin-bottom: 30upx;
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
				
				font-size: 31upx;
				font-family: 'PingFangSC-Medium, PingFang SC';
				font-weight: 500;
				color: #9EA6B9;
			}
			&__date {
				// padding-left: 30upx;
				// background-image: url('@/static/notice/icon-date.png');
				// background-position: left;
				// background-size: 20upx;
				// background-repeat: no-repeat;
				
				font-size: 25upx;
				font-family: 'PingFangSC-Regular, PingFang SC';
				font-weight: 400;
				color: #4B505E;
			}
	
			&__arrow {
				// background-image: url('@/static/notice/icon-arrow.png');
				// background-size: 17upx 24upx;
				// background-position: center;
				width: 11upx;
				height: 20upx;
				image{
					width: 100%;
					height: 100%;
				}
				// background-repeat: no-repeat;
			}
		}
	}
</style>
<template>
	<view class="container">
		<view class="flex-col justify-start items-start flex-auto group_3">
			<view class="flex-col pos_2">
				<view class="flex-row justify-between items-center list-item" style="background-color: #272727;">
					<view class="flex-row items-center space-x-12">
						<view class="rankboxi" v-if="userrank.index<3">
							<image :src="'../../static/rankicon' + (userrank.index+1) + '.png'" mode=""></image>
						</view>
						<view class="rankboxi" v-else>
							{{userrank.index + 1}}
						</view>
						<image class="image_5"
							:src="userrank.img" />
						<view class="flex-col items-start space-y-10">
							<text class="font_2">{{userrank.name | hideaddress(userrank.name)}}</text>
							<text class="font_5">{{userrank.ran}}</text>
						</view>
					</view>
					<view class="flex-row space-x-6">
						<text class="font_3">今日業績</text>
						<text class="font_4 text_3">${{userrank.sum}}</text>
					</view>
				</view>
				<block :key="i" v-for="(item, i) in rankList">
					<view class="flex-row justify-between items-center list-item" v-if="i<10">
						<view class="flex-row items-center space-x-12">
							<view class="rankboxi" v-if="i<3">
								<image :src="'../../static/rankicon' + (i+1) + '.png'" mode=""></image>
							</view>
							<view class="rankboxi" v-else>
								{{i+1}}
							</view>
							<image class="image_5"
								:src="item.img" />
							<view class="flex-col items-start space-y-10">
								<text class="font_2">{{item.name | hideaddress(item.name)}}</text>
								<text class="font_5">{{item.ran}}</text>
							</view>
						</view>
						<view class="flex-row space-x-6">
							<text class="font_3">今日業績</text>
							<text class="font_4 text_3">${{item.sum}}</text>
						</view>
					</view>
				</block>
				<view class="nomore" v-if="rankList.length === 0">
					暫無數據~
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		getrankList
	} from '@/api/api.js';
	export default {
		data() {
			return {
				rankList: [],
				address: uni.getStorageSync('address'),
				userrank: {}
			};
		},
		onLoad() {
			this.getrankList()
		},
		methods: {
			getrankList() {
				this.$tools.loading('數據加載中~')
				getrankList().then(res => {
					let list = res.obj
					list.forEach((item,i) => {
						if(item.name == this.address){
							console.log(i)
							this.userrank = item
							this.userrank.index = i
						}
					})
					uni.hideLoading()
					console.log(this.userrank)
					this.rankList = list
				})
			}
		}
	}
</script>

<style lang="scss">
	.group_3 {
		.nomore{
				  @include flexCenter;
				  color: #ffffff;
		}
		.rankboxi {
			@include flexCenter;
			width: 52rpx;
			font-size: 32rpx;
			font-weight: bold;
			color: #ffffff;
			image{
				width: 48rpx;
				height: 48rpx;
			}
		}

		.group_5 {
			margin-left: 42.31rpx;

			.font_1 {
				font-size: 32.69rpx;
				font-family: MiSans;
				line-height: 26.92rpx;
				color: #dedede;
			}

			.text_5 {
				line-height: 25.96rpx;
			}

			.text_7 {
				line-height: 25.96rpx;
			}

			.text_8 {
				line-height: 25.96rpx;
			}

			.text_10 {
				line-height: 15.38rpx;
			}
		}

		.space-y-74 {

			&>view:not(:first-child),
			&>text:not(:first-child),
			&>image:not(:first-child) {
				margin-top: 142.31rpx;
			}
		}

		.pos_2 {
			position: absolute;
			left: 0;
			right: 0;
			top: 0;

			.list-item {
				padding: 38.46rpx 30.77rpx;
				background-color: #1F1F1F;

				.space-x-12 {

					&>view:not(:first-child),
					&>text:not(:first-child),
					&>image:not(:first-child) {
						margin-left: 23.08rpx;
					}

					.image_4 {
						width: 46.15rpx;
						height: 46.15rpx;
					}

					.image_5 {
						border-radius: 50%;
						width: 92.31rpx;
						height: 92.31rpx;
					}

					.space-y-10 {

						&>view:not(:first-child),
						&>text:not(:first-child),
						&>image:not(:first-child) {
							margin-top: 19.23rpx;
						}

						.font_2 {
							font-size: 28.85rpx;
							font-family: MiSans;
							line-height: 26.92rpx;
							color: #dedede;
						}

						.font_5 {
							font-size: 25rpx;
							font-family: MiSans;
							line-height: 23.08rpx;
							color: #808080;
						}
					}
				}

				.space-x-6 {

					&>view:not(:first-child),
					&>text:not(:first-child),
					&>image:not(:first-child) {
						margin-left: 11.54rpx;
					}

					.font_3 {
						font-size: 28.85rpx;
						font-family: MiSans;
						line-height: 26.92rpx;
						color: #808080;
					}

					.font_4 {
						font-size: 28.85rpx;
						font-family: MiSans;
						line-height: 26.92rpx;
						color: #ffffff;
					}

					.text_3 {
						line-height: 27.88rpx;
					}
				}
			}
		}
	}
</style>
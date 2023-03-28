<template>
	<view class="container">
		<view class="flex-col page">
			<view class="flex-col flex-auto group_3">
				<view class="flex-row self-center section">
					<view
						:class="['flex-col','justify-start','items-center',tabbarnow == 1 ? 'text-wrapper' : 'text-wrapper_2'] "
						@click="tabbarnow = 1"><text class="font_2 text_3">零撸錢包</text></view>
					<view
						:class="['flex-col','justify-start','items-center',tabbarnow == 2 ? 'text-wrapper' : 'text-wrapper_2'] "
						@click="tabbarnow = 2">
						<text class="font_2 text_3">質押錢包</text>
					</view>
				</view>
				<view class="flex-row justify-between items-center section_2">
					<view class="flex-row items-baseline space-x-2">
						<text class="font_2 text_5">可用餘額</text>
						<text class="font_1 text_6">{{assetList[tabbarnow].using || 0}} LTC</text>
					</view>
					<view class="flex-row items-center section_3 space-x-30">
						<ld-select :list="options" label-key="label" value-key="value" placeholder="請選擇" v-model="value"
							@change="selectChange" bgColor="#272727" selectColor="#00D383" selectBgColor="272727"
							color="#ffffff"></ld-select>
					</view>
				</view>
				<view class="flex-col list">
					<view class="flex-col list-item space-y-12" :key="item.id" v-for="(item, i) in zichanList">
						<view class="flex-row justify-between">
							<text class="font_2">{{item.typeStr}}</text>
							<text class="font_4">{{item.money}}</text>
						</view>
						<text class="self-start font_5">{{item.createTime}}</text>
					</view>
					<view class="nomore" v-if="zichanList.length === 0">
						暫無數據~
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		getzichanInfo,
		getassetsTotal
	} from '@/api/api.js';
	export default {
		data() {
			return {
				tabbarnow: 1,
				zichanList: [],
				value: '1',
				options: [{
					value: '1',
					label: '全部'
				}],
				assetList: [{
					using: 0
				}]
			};
		},
		onLoad(option) {
			if (option.value1) this.tabbarnow = option.value1;
			this.getzcList()
			this.getassetsTotal()
		},
		watch: {
			tabbarnow(newval, oldval) {
				this.getzcList()
				this.getassetsTotal()
			}
		},
		methods: {
			getassetsTotal() {
				getassetsTotal({
					assetType: this.tabbarnow
				}).then(res => {
					let list = res.obj
					list.forEach(item => {
						this.assetList.push({
							using: item.list[0].using
						})
					})
				})
			},
			getzcList() {
				getzichanInfo({
					assetType: this.tabbarnow
				}).then(res => {
					this.zichanList = res.obj.list
				})
			},
		}
	}
</script>

<style lang="scss">
	.page {
		background-color: #1f1f1f;
		width: 100%;
		overflow-y: auto;
		overflow-x: hidden;
		height: 100%;

		.nomore {
			@include flexCenter;
			color: #c8c8c8;
			margin-top: 100rpx;
		}

		.group_3 {
			padding: 0 30.77rpx 386.54rpx;
			overflow-y: auto;

			.section {
				padding: 7.69rpx;
				background-color: #272727;
				border-radius: 11.54rpx;

				.text-wrapper {
					padding: 15.38rpx 0;
					flex: 1 1 153.85rpx;
					background-color: #00d383;
					border-radius: 7.69rpx;
					width: 153.85rpx;
					height: 61.54rpx;

					.text_3 {
						line-height: 26.92rpx;
					}
				}

				.text-wrapper_2 {
					padding: 15.38rpx 0;
					flex: 1 1 153.85rpx;
					border-radius: 7.69rpx;
					width: 153.85rpx;
					height: 61.54rpx;

					.text_4 {
						line-height: 26.92rpx;
					}
				}
			}

			.section_2 {
				margin-top: 30.77rpx;
				padding: 23.08rpx;
				background-color: #272727;
				border-radius: 7.69rpx;

				.space-x-2 {

					&>view:not(:first-child),
					&>text:not(:first-child),
					&>image:not(:first-child) {
						margin-left: 3.85rpx;
					}

					.text_5 {
						color: #808080;
						line-height: 26.92rpx;
					}

					.font_1 {
						font-size: 32.69rpx;
						font-family: MiSans;
					}

					.text_6 {
						color: #ee2f2f;
						line-height: 26.92rpx;
					}
				}

				.section_3 {
					padding: 7.69rpx 11.54rpx 7.69rpx 15.38rpx;
					background-color: #1f1f1f;
					border-radius: 7.69rpx;
					height: 61.54rpx;
					border: solid 1.92rpx #353535;
					width: 40%;
					overflow: hidden;

					.text_7 {
						line-height: 26.92rpx;
						width: 30%;
					}

					.image_4 {
						width: 46.15rpx;
						height: 46.15rpx;
					}
				}

				.space-x-30 {

					&>view:not(:first-child),
					&>text:not(:first-child),
					&>image:not(:first-child) {
						margin-left: 57.69rpx;
					}
				}
			}

			.font_2 {
				font-size: 28.85rpx;
				font-family: MiSans;
				line-height: 25.96rpx;
				color: #ffffff;
			}

			.font_3 {
				font-size: 28.85rpx;
				font-family: MiSans;
				line-height: 25.96rpx;
				color: #dedede;
			}

			.list {
				padding-top: 23.08rpx;
			}

			.list-item {
				padding: 30.77rpx 0;
				border-bottom: solid 1.92rpx #353535;

				.font_4 {
					font-size: 28.85rpx;
					font-family: MiSans;
					line-height: 23.08rpx;
					color: #ee2f2f;
				}

				.font_5 {
					font-size: 25rpx;
					font-family: MiSans;
					line-height: 19.23rpx;
					color: #808080;
				}
			}

			.space-y-12 {

				&>view:not(:first-child),
				&>text:not(:first-child),
				&>image:not(:first-child) {
					margin-top: 23.08rpx;
				}
			}
		}
	}
</style>
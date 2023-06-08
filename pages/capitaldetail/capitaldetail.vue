<template>
	<view class="container">
		<view class="flex-col page">
			<view class="flex-col flex-auto group_3">
				<view class="flex-row self-center section">
					<view
						:class="['flex-col','justify-start','items-center',tabbarnow == 1 ? 'text-wrapper' : 'text-wrapper_2'] "
						@click="tabbarnow = 1"><text class="font_2 text_3">{{$t('capital.llqb')}}</text></view>
					<view
						:class="['flex-col','justify-start','items-center',tabbarnow == 2 ? 'text-wrapper' : 'text-wrapper_2'] "
						@click="tabbarnow = 2">
						<text class="font_2 text_3">{{$t('capital.pledgeqb')}}</text>
					</view>
				</view>
				<view class="flex-row justify-between items-center section_2">
					<view class="flex-row items-baseline space-x-2">
						<text class="font_2 text_5">{{$t('capital.kyye')}}</text>
						<text class="font_1 text_6">{{(assetList[tabbarnow].using).toFixed(4) || 0}} LTC</text>
					</view>
					<view class="flex-row items-center section_3 space-x-30" style="overflow: hidden;">
						<ld-select :list="seletList" label-key="name" value-key="key" :placeholder="$t('capital.qxz')" v-model="value"
							@change="selectChange" bgColor="#272727" selectColor="#00D383" selectBgColor="272727"
							color="#ffffff"></ld-select>
					</view>
				</view>
				<view class="flex-col list">
					<view class="flex-col list-item space-y-12" :key="i" v-for="(item, i) in zichanList">
						<view class="flex-row justify-between">
							<text class="font_2">{{item.typeStr}}</text>
							<text class="font_4">{{item.money}}</text>
						</view>
						<text class="self-start font_5">{{item.updateTime}}</text>
					</view>
					<view class="nomore" v-if="zichanList.length === 0">
						{{$t('index.nomoredata')}}~
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		getzichanInfo,
		getassetsTotal,
		getzichanSelet
	} from '@/api/api.js';
	export default {
		data() {
			return {
				tabbarnow: 1,
				zichanList: [],
				value: '0',
				assetList: [{
					using: 0
				}],
				seletList: [],
				queryObj: {
					pagenum: 1,
					pagesize: 10
				},
				isloading: false,
				total: 0
			};
		},
		onLoad(option) {
			if (option.value1){
				this.tabbarnow = option.value1
			}else{
				this.getzcList()
			}
			this.getzcSelet()
			this.getassetsTotal()
		},
		watch: {
			tabbarnow(newval, oldval) {
				// 1. 重置关键数据
				this.queryObj.pagenum = 1
				this.total = 0
				this.isloading = false
				this.zichanList = []
				this.getzcList()
				this.getassetsTotal()
			}
		},
		// 触底的事件
		onReachBottom() {
			if (this.queryObj.pagenum * this.queryObj.pagesize >= this.total){
				this.isloading = true
				return this.$tools.toast(this.$t('capital.dataend'))
			} 
		
			if (this.isloading) return
		
			// 让页码值自增+1
			this.queryObj.pagenum++
			this.getzcList()
		},
		// 下拉刷新的事件
		onPullDownRefresh() {
		  // 1. 重置关键数据
		  this.queryObj.pagenum = 1
		  this.total = 0
		  this.isloading = false
		  this.zichanList = []
		 
		  // 2. 重新发起请求
		  this.getzcList(() => uni.stopPullDownRefresh())
		},
		methods: {
			getzcSelet(){
				getzichanSelet({
					assetType: this.tabbarnow
				}).then(res => {
					let list = res.obj
					list.unshift({
						name: this.$t('with.qb'),
						key: '0'
					})
					this.seletList = list
					// this.getzcList()
				})
			},
			getassetsTotal() {
				this.$tools.loading(this.$t('index.dataloading'))
				getassetsTotal({
					assetType: this.tabbarnow
				}).then(res => {
					let list = res.obj
					list.forEach(item => {
						this.assetList.push({
							using: item.list[0].using
						})
					})
					uni.hideLoading()
				})
			},
			getzcList(cb) {
				getzichanInfo({
					assetType: this.tabbarnow,
					pageNum: this.queryObj.pagenum,
					pageSize: this.queryObj.pagesize,
					type: this.value == 0 ? '' : this.value
				}).then(res => {
					this.isloading = false
					let list = res.obj.list
					cb && cb()
					this.zichanList = [...this.zichanList, ...list]
					this.total = res.obj.total
				})
			},
			selectChange(e){
				console.log(e)
				this.value = e
				// 1. 重置关键数据
				this.queryObj.pagenum = 1
				this.total = 0
				this.isloading = false
				this.zichanList = []
				
				this.getzcList()
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
					width: 228rpx;
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
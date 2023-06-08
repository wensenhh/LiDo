<template>
	<view class="container">
		<view class="flex-col flex-auto group_3">
			<view class="flex-col justify-start group_4">
				<view class="flex-col section space-y-12">
					<view class="flex-row justify-between items-center group_5 space-x-26">
						<text class="font_1 text_3">LTT/USDT</text>
						<!-- <view class="flex-row items-center">
		          <text class="text_4">1000.00</text>
		          <text class="font_2 text_5">10%</text>
		          <image
		            class="shrink-0 image_4 image_5"
		            src="https://codefun-proj-user-res-1256085488.cos.ap-guangzhou.myqcloud.com/641bf7ba5a7e3f031045ebb8/642140ff99e5b100119c4d77/16799010419365184245.png"
		          />
		        </view> -->
					</view>
					<view class="flex-row" style="flex-flow: wrap">
						<view class="flex-row items-center grid-item space-x-8">
							<text class="font_3">{{$t('datashow.my')}}LTT</text>
							<text class="font_2">{{coininfo.ltt}}</text>
						</view>
						<view class="flex-row items-center grid-item space-x-8">
							<text class="font_3">{{$t('datashow.personpower')}}</text>
							<text class="font_2">{{coininfo.hashrate}}</text>
						</view>
						<view class="flex-row items-center grid-item space-x-8">
							<text class="font_3">{{$t('datashow.allgross')}}</text>
							<text class="font_2">{{coininfo.gross}}</text>
						</view>
						<view class="flex-row items-center grid-item space-x-8">
							<text class="font_3">{{$t('datashow.turnover')}}</text>
							<text class="font_2">{{coininfo.sent}}</text>
						</view>
						<view class="flex-row items-center grid-item space-x-8">
							<text class="font_3">{{$t('datashow.Outputtoday')}}</text>
							<text class="font_2">{{coininfo.newSent}}</text>
						</view>
						<view class="flex-row items-center grid-item space-x-8">
							<text class="font_3">{{$t('datashow.totalnet')}}</text>
							<text class="font_2">{{coininfo.allHashrate}}</text>
						</view>
					</view>
				</view>
			</view>
			<!-- 交易K綫 -->
			<canvas id="myEcharts" style="width: 100%;height: 500rpx;"></canvas>
			<view class="flex-col justify-start">
				<view class="flex-col list">
					<view class="flex-row justify-between items-center list-item">
						<text class="font_4">{{$t('datashow.allnet')}} LTC {{$t('datashow.rental')}}</text>
						<text class="font_2">{{coininfo.tatolLtc}}</text>
					</view>
					<view class="flex-row justify-between items-center list-item">
						<text class="font_4">{{$t('datashow.safedeposit')}} LTC {{$t('datashow.rental')}}</text>
						<text class="font_2">{{coininfo.tatolBxcLtc}}</text>
					</view>
					<view class="flex-row justify-between items-center list-item">
						<text class="font_4">{{$t('datashow.Permanentcell')}} LTC {{$t('datashow.rental')}}</text>
						<text class="font_2">{{coininfo.fomoPool}}</text>
					</view>
					<view class="flex-row justify-between items-center list-item">
						<text class="font_4">TOP {{$t('datashow.ranklist')}} LTC {{$t('datashow.rental')}}</text>
						<text class="font_2">{{coininfo.topLtc}}</text>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	// 将npm方式下载的echarts插件引入进来
	import * as echarts from 'echarts';
	import {
		coininfo,
		klinedata
	} from '@/api/api.js';
	export default {
		data() {
			return {
				coininfo: {},
				linedata: {}
			};
		},
		onLoad() {
			let that = this
			// 通过nextTick异步画图
			this.$nextTick(() => {
				that.draw();
			});
			this.getkLinedata()
			this.coindetail()
		},
		methods: {
			getkLinedata() {
				klinedata().then(res => {
					let obj = res.obj
					let open = []
					let date = []
					obj.forEach(item => {
						open.push(item.open)
						date.push(item.timeStmp)
					})
					this.linedata = {
						open: open,
						date: date
					}
					this.getKlinedata()
				})
			},
			coindetail() {
				this.$tools.loading(this.$t('index.dataloading'))
				coininfo().then(res => {
					let obj = res.obj
					this.coininfo = obj
					this.coininfo.ltt = (obj.ltt).toFixed(4)
					this.coininfo.hashrate = (obj.hashrate).toFixed(4)
					this.coininfo.allHashrate = (obj.allHashrate).toFixed(4)
					uni.hideLoading()
				})
			},
			// 获取k线数据,生成k线
			async getKlinedata() {
				let option = {
					xAxis: {
						data: this.linedata.date.slice(-30),
					},
					series: [{
						data: this.linedata.open.slice(-30)
					}]
				}
				// 这里不要忘记把option设置给echarts实例
				this.myChart.setOption(option);
			},
			// 绘制(配置项)
			draw() {
				let that = this;
				this.myChart = echarts.init(document.getElementById('myEcharts'));
				var option = {
					grid: [{
							top: '8%',
							left: 30,
							right: 20,
							height: '82%',
						}
					],
					xAxis: {
						type: 'category',
						data: [],
						splitLine: {
							show: true,
							lineStyle: {
								color: 'rgba(255,255,255, 0.1)'
							}
						},
					},
					yAxis: {
						type: 'value',
						splitLine: {
							show: true,
							lineStyle: {
								color: 'rgba(255, 255, 255, 0.1)'
							}
						}, 
					},
					animation: true, //是否开启动画。
					series: [{
						data: [],
						type: 'line',
						smooth: true,
						itemStyle: {
							color: '#00D383'
						}
					}]
				};
				that.myChart.setOption(option);
				// 加载上一页数据
				that.myChart.on('datazoom', function(params) {
					let num = params.batch[0]['start'];
					if (num == 0) {
						console.log('到最左边了')
					}
				})
				window.addEventListener('resize', () => {
					that.myChart.resize()
				})
			}
		}
	}
</script>

<style lang="scss">
	.image_4 {
		width: 46.15rpx;
		height: 46.15rpx;
	}

	.font_1 {
		font-size: 32.69rpx;
		font-family: MiSans;
		color: #ffffff;
	}

	.group_3 {
		overflow-y: auto;
	}

	.group_4 {
		padding-top: 26.92rpx;
	}

	.section {
		margin: 0 30.77rpx;
		padding: 34.62rpx 0 42.31rpx;
		background-color: #272727;
		border-radius: 15.38rpx;
	}

	.space-y-12>view:not(:first-child),
	.space-y-12>text:not(:first-child),
	.space-y-12>image:not(:first-child) {
		margin-top: 23.08rpx;
	}

	.group_5 {
		padding: 0 26.92rpx;
	}

	.space-x-26>view:not(:first-child),
	.space-x-26>text:not(:first-child),
	.space-x-26>image:not(:first-child) {
		margin-left: 50rpx;
	}

	.text_3 {
		line-height: 26.92rpx;
	}

	.text_4 {
		color: #00ab58;
		font-size: 32.69rpx;
		font-family: MiSans;
		line-height: 26.92rpx;
	}

	.font_2 {
		font-size: 28.85rpx;
		font-family: MiSans;
		line-height: 23.08rpx;
		color: #dedede;
	}

	.text_5 {
		color: #00ab58;
	}

	.image_5 {
		margin-left: 11.54rpx;
	}

	.grid {
		display: grid;
		padding: 0 20rpx;
		grid-template-columns: repeat(2, 1fr);
		column-gap: 131.73rpx;
	}

	.grid-item {
		padding: 19.23rpx 19.23rpx 19.23rpx 23.08rpx;
	}

	.space-x-8>view:not(:first-child),
	.space-x-8>text:not(:first-child),
	.space-x-8>image:not(:first-child) {
		margin-left: 15.38rpx;
	}

	.font_3 {
		font-size: 28.85rpx;
		font-family: MiSans;
		color: #808080;
		width: 48%;
		height: 36rpx;
		overflow: hidden;
		text-overflow:ellipsis;    
		white-space:nowrap;
	}

	.group_6 {
		padding: 0 23.08rpx;
	}

	.space-x-6>view:not(:first-child),
	.space-x-6>text:not(:first-child),
	.space-x-6>image:not(:first-child) {
		margin-left: 11.54rpx;
	}

	.font_4 {
		font-size: 28.85rpx;
		font-family: MiSans;
		line-height: 26.92rpx;
		color: #dedede;
	}

	.list {
		padding: 23.08rpx 30.77rpx 0;
	}

	.list-item {
		padding: 53.85rpx 0;
		border-bottom: solid 1.92rpx #353535;
	}

	.flex-row {
		>view {
			width: 49%;
			overflow: hidden;
			height: 60rpx;
			text-overflow:ellipsis;    
			white-space:nowrap;
		}
	}
</style>
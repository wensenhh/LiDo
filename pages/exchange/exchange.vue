<template>
	<view class="container">
		<view class="flex-col flex-auto group space-y-28">
			<view class="flex-col group_2">
				<view class="flex-row justify-between items-center section">
					<input class="text_3 ipttext" type="number" v-model="lttnum"
						:placeholder="$t('exchange.qsrnydhdsl')" />
					<text class="font_2">LTT</text>
				</view>
				<image class="self-center image_4 image_5"
					src="https://codefun-proj-user-res-1256085488.cos.ap-guangzhou.myqcloud.com/641bf7ba5a7e3f031045ebb8/642140ff99e5b100119c4d77/16799010432466643989.png" />
				<view class="flex-row justify-between section view">
					<input class="text_3 ipttext" type="number" v-model="ltcnum" disabled="true"
						:placeholder="$t('exchange.sdhdsl')">
					<text class="font_2">LTC</text>
				</view>
				<view class="flex-row justify-between equal-division">
					<view class="flex-col items-center space-y-18">
						<text class="font_3">{{lttinfo.lttUsing.toFixed(4)}}</text>
						<text class="font_4">LTT{{$t('exchange.yue')}}</text>
					</view>
					<view class="horiz-divider"></view>
					<view class="flex-col items-center space-y-18">
						<!-- {{lttinfo.ltt.toFixed(4)}} -->
						<text class="font_3">{{lttinfo.ltt.toFixed(4)}}</text>
						<text class="font_4">LTT/USDT</text>
					</view>
					<view class="horiz-divider"></view>
					<view class="flex-col items-center space-y-18">
						<text class="font_3">{{lttinfo.ltc.toFixed(4)}}</text>
						<text class="font_4">LTC/USDT</text>
					</view>
				</view>
			</view>
			<!-- $tools.throttle(exchangefuc,1000) -->
			<view class="flex-col justify-start items-center button" style="background-color: #999999;" @click=""><text
					class="font_1">{{$t('exchange.dh')}}</text></view>
		</view>
	</view>
</template>

<script>
	import {
		ltcexchangenum,
		exchangefun,
		lttbalance
	} from '@/api/api.js';
	export default {
		data() {
			return {
				lttnum: null,
				ltcnum: null,
				lttinfo: {}
			};
		},
		watch: {
			lttnum(newval, oldval) {
				let that = this
				if (newval > that.lttinfo.lttUsing) {
					this.lttnum = that.lttinfo.lttUsing
					return this.$tools.toast(this.$t('exchange.bncgzjdye'))
				}
				if (!Number.isInteger(Number(newval))) {
					return this.$tools.toast(this.$t('exchange.qsrzzs'))
				} else {
					that.$tools.debounce(that.getltcnum(), 1000)
				}
			},
		},
		onLoad() {
			this.getlttinfo()
		},
		methods: {
			getlttinfo() {
				lttbalance().then(res => {
					this.lttinfo = res.obj

				})
			},
			exchangefuc() {
				if (!this.lttnum || !this.ltcnum) {
					return this.$tools.toast(this.$t('exchange.qsrdhsl'))
				}
				if (!Number.isInteger(Number(this.lttnum))) {
					return this.$tools.toast(this.$t('exchange.qsrzzs'))
				}
				if (!(/(^[1-9]\d*$)/.test(this.lttnum))) {
					return this.$tools.toast(this.$t('exchange.qsrzzs'));
				}
				exchangefun({
					ltcPrice: Number(this.ltcnum),
					quantity: Number(this.lttnum)
				}).then(res => {
					this.$tools.toast(this.$t('exchange.dhcg'))
					this.lttnum = null
				})
			},
			getltcnum() {
				ltcexchangenum({
					quantity: Number(this.lttnum)
				}).then(res => {
					this.ltcnum = res.obj
				})
			},
		}
	}
</script>

<style lang="scss">
	.group {
		padding: 0 30.77rpx 844.23rpx;
		overflow-y: auto;

		.group_2 {
			padding-top: 23.08rpx;

			.section {
				padding: 30.77rpx 23.08rpx;
				background-color: #272727;
				border-radius: 7.69rpx;

				.text_3 {
					color: #ffffff;
					font-size: 28.85rpx;
					font-family: MiSans;
					line-height: 26.92rpx;

					input {
						height: 50rpx;
					}
				}

				.font_2 {
					font-size: 28.85rpx;
					font-family: MiSans;
					line-height: 23.08rpx;
					color: #00d383;
				}

				.text_4 {
					color: #808080;
				}
			}

			.image_4 {
				width: 46.15rpx;
				height: 46.15rpx;
			}

			.image_5 {
				margin-top: 23.08rpx;
			}

			.view {
				margin-top: 23.08rpx;
			}

			.equal-division {
				margin: 34.62rpx 11.54rpx 0 19.23rpx;
				padding: 23.08rpx 0;

				.space-y-18 {

					&>view:not(:first-child),
					&>text:not(:first-child),
					&>image:not(:first-child) {
						margin-top: 34.62rpx;
					}

					.font_4 {
						font-size: 25rpx;
						font-family: MiSans;
						line-height: 19.23rpx;
						color: #dedede;
					}
				}

				.horiz-divider {
					margin: 19.23rpx 0;
					background-color: #353535;
					width: 1.92rpx;
					height: 38.46rpx;
				}
			}

			.font_3 {
				font-size: 28.85rpx;
				font-family: MiSans;
				line-height: 23.08rpx;
				color: #ffffff;
			}
		}

		.button {
			padding: 30.77rpx 0;
			background-color: #00d383;
			border-radius: 7.69rpx;

			.font_1 {
				font-size: 32.69rpx;
				font-family: MiSans;
				line-height: 30.77rpx;
				color: #ffffff;
			}
		}
	}

	.space-y-28 {

		&>view:not(:first-child),
		&>text:not(:first-child),
		&>image:not(:first-child) {
			margin-top: 53.85rpx;
		}
	}
</style>
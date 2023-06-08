<template>
	<view class="container">
		<view class="flex-col flex-auto group_2 space-y-17">
			<view class="flex-row justify-between items-center">
				<text class="font_1 text_3">卡牌购买记录</text>
				<image class="image_6"
					src="https://codefun-proj-user-res-1256085488.cos.ap-guangzhou.myqcloud.com/641bf7ba5a7e3f031045ebb8/642140ff99e5b100119c4d77/16844009329200438180.png" />
			</view>
			<view class="flex-col space-y-16">
				<view class="flex-row justify-between items-end list-item" v-for="(item,i) in nftList" :key="item.id">
					<view class="flex-row items-center space-x-10">
						<image class="image_7" :src="item.img" />
						<view class="flex-col">
							<text class="self-start font_2">{{item.name}}</text>
							<text class="self-start font_3 text_4">5LTC+50LTT</text>
							<view class="flex-row items-center group_3 space-x-8">
								<view class="flex-row items-center shrink-0 group_4 space-x-14">
									<image class="shrink-0 image_8" @click="item.num > 1 ? item.num-- : item.num = 1"
										src="https://codefun-proj-user-res-1256085488.cos.ap-guangzhou.myqcloud.com/641bf7ba5a7e3f031045ebb8/642140ff99e5b100119c4d77/16844011663293724160.png" />
									<text class="font_1">{{item.num}}</text>
									<image class="shrink-0 image_8" @click="item.num++"
										src="https://codefun-proj-user-res-1256085488.cos.ap-guangzhou.myqcloud.com/641bf7ba5a7e3f031045ebb8/642140ff99e5b100119c4d77/16844011663311568484.png" />
								</view>
							</view>
						</view>
					</view>
					<view class="flex-col justify-start items-center text-wrapper" @click="buynft(item.id,item.num)">
						<text class="font_5">购买</text></view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		nftbuy,
		getUserassets,
	} from '@/api/api.js';
	export default {
		data() {
			return {
				nftList: [{
					name: '001',
					img: 'https://codefun-proj-user-res-1256085488.cos.ap-guangzhou.myqcloud.com/641bf7ba5a7e3f031045ebb8/642140ff99e5b100119c4d77/16844011662654067458.png',
					id: 1,
					num: 1
				}, {
					name: '002',
					img: 'https://codefun-proj-user-res-1256085488.cos.ap-guangzhou.myqcloud.com/641bf7ba5a7e3f031045ebb8/642140ff99e5b100119c4d77/16844011663120251163.png',
					id: 2,
					num: 1
				}, {
					name: '003',
					img: 'https://codefun-proj-user-res-1256085488.cos.ap-guangzhou.myqcloud.com/641bf7ba5a7e3f031045ebb8/642140ff99e5b100119c4d77/16844011663187814123.png',
					id: 3,
					num: 1
				}],
				address: uni.getStorageSync('address')
			};
		},
		methods: {
			async buynft(id, num) {
				const signkey = await that.$tools.signMessage('receive award')
				try {
					const signres = await this.$tools.verifyMessage({
						message: 'receive award',
						address: that.address,
						signature: signkey
					})
					console.log(signres)
					if (!signres) {
						return false
					}
				} catch (e) {
					//TODO handle the exception
					console.log("用户拒绝签名")
					return false
				}
				nftbuy({
					
				})
			},
		}
	}
</script>

<style lang="scss">
	.group_2 {

		.font_1 {
			font-size: 28.85rpx;
			font-family: MiSans;
			line-height: 23.08rpx;
			color: #ffffff;
		}

		.text_3 {
			color: #b0b0b0;
			line-height: 26.92rpx;
		}

		.image_6 {
			width: 34.62rpx;
			height: 34.62rpx;
		}

		.space-y-16 {

			&>view:not(:first-child),
			&>text:not(:first-child),
			&>image:not(:first-child) {
				margin-top: 30.77rpx;
			}

			.list-item {
				padding: 23.08rpx;
				background-color: #272727;
				border-radius: 15.38rpx;

				.space-x-10 {

					&>view:not(:first-child),
					&>text:not(:first-child),
					&>image:not(:first-child) {
						margin-left: 19.23rpx;
					}

					.image_7 {
						border-radius: 15.38rpx;
						filter: drop-shadow(0px 15.38rpx 15.38rpx #a5a5a51a);
						width: 144.23rpx;
						height: 192.31rpx;
					}

					.font_2 {
						font-size: 32.69rpx;
						font-family: MiSans;
						line-height: 30.77rpx;
						color: #ffffff;
					}

					.font_3 {
						font-size: 28.85rpx;
						font-family: MiSans;
						line-height: 23.08rpx;
						color: #ee2f2f;
					}

					.text_4 {
						margin-top: 26.92rpx;
					}

					.group_3 {
						margin-top: 46.15rpx;

						.group_4 {
							border-radius: 25rpx;
							overflow: hidden;
							width: 153.85rpx;
							height: 46.15rpx;

							.image_8 {
								border-radius: 25rpx;
								width: 46.15rpx;
								height: 46.15rpx;
							}
						}

						.space-x-14 {

							&>view:not(:first-child),
							&>text:not(:first-child),
							&>image:not(:first-child) {
								margin-left: 26.92rpx;
							}
						}

						.font_4 {
							font-size: 25rpx;
							font-family: MiSans;
							line-height: 19.23rpx;
							color: #b0b0b0;
						}
					}

					.space-x-8 {

						&>view:not(:first-child),
						&>text:not(:first-child),
						&>image:not(:first-child) {
							margin-left: 15.38rpx;
						}
					}
				}

				.text-wrapper {
					padding: 15.38rpx 0;
					background-color: #00d383;
					border-radius: 7.69rpx;
					width: 123.08rpx;
					height: 53.85rpx;

					.font_5 {
						font-size: 25rpx;
						font-family: MiSans;
						line-height: 23.08rpx;
						color: #ffffff;
					}
				}
			}
		}
	}

	.space-y-17 {

		&>view:not(:first-child),
		&>text:not(:first-child),
		&>image:not(:first-child) {
			margin-top: 32.69rpx;
		}
	}
</style>
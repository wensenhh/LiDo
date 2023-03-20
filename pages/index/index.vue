<template>
	<view class="container">
		<HeaderCom></HeaderCom>
		<!-- 轮播组件 -->
		<Xsuu-swiper :swiperItems="swiperItems" :margin="0" :DotPosition="1"></Xsuu-swiper>
		<!-- 公告组件 -->
		<zetank-notice :noticeList='noticeList' :interval="3000" @clickNotice="clicktest"></zetank-notice>
		<!-- 钱包账户 -->
		<view class="walletbox">
			<view class="walletbox-main">
				<view class="walletbox-main-databox">
					<view>
						<view>1000.00 <span>≈$100.00</span></view>
						<view>{{$t('index.Zerostroke') + $t('index.wallet')}}(LTC)</view>
					</view>
					<view class="walletbox-main-databox-centerbox"></view>
					<view>
						<view>1000.00 <span>≈$100.00</span></view>
						<view>{{$t('index.pledge') + $t('index.wallet')}} (LTC) </view>
					</view>
				</view>
				<view class="walletbox-main-tiqubox">
					{{$t('index.extract')}}
				</view>
			</view>
		</view>
		<!-- 钱包地址 -->
		<view class="addressbox">
			<view>
				{{$t('index.wallet') + $t('index.address')}} <span> {{address | hideaddress(address)}}</span>
			</view>
			<image src="../../static/copy_icon.png" mode="" @tap="$tools.copy(address)"></image>
		</view>
		<!-- 领取LTC -->
		<view class="getbox">
			<view>{{$t('index.Freeofcharge')}}LTC</view>
			<view>{{$t('index.click') + " " + $t('index.Freeofcharge')}} 0.001LTC</view>
		</view>
		<!-- 质押 -->
		<view class="pledgebox">
			<view class="pledgebox-onebox">
				<view>{{$t('index.pledge')}} <span>PLEDGE</span></view>
				<view>{{$t('index.mypledgerecord')}} <span> > </span> </view>
			</view>
			<view class="pledgebox-iptbox">
				<input type="number" :placeholder="$t('index.pledgeusdtnum')">
			</view>
			<view class="pledgebox-balance">
				USDT{{$t('index.balance')}}：100.00
			</view>
			<view class="pledgebox-Daybox">
				<view :class="item.actived ? 'active' : ''" v-for="(item,i) in pledgeDay" @tap="changeTime(i)">
					{{item.name}} {{$t('index.day')}}</view>
			</view>
			<view class="pledgebox-btnbox">
				{{$t('index.confirm') + $t('index.pledge')}}
			</view>
		</view>
		<!-- 分类 -->
		<view class="gridbox">
			<view>
				<image src="../../static/myteam.png" mode=""></image>
				<view class="">
					{{$t('index.myteam')}}
				</view>
			</view>
			<view>
				<image src="../../static/datazhanshi.png" mode=""></image>
				<view class="">
					{{$t('index.datapresentation')}}
				</view>
			</view>
			<view>
				<image src="../../static/phb_icon.png" mode=""></image>
				<view class="">
					{{$t('index.rankinglist')}}
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import HeaderCom from '@/components/HeaderCom/HeaderCom.vue'
	import XsuuSwiper from "@/components/Xss-swiper/Xsuu-swiper.vue"
	export default {
		data() {
			return {
				systemLocale: '',
				applicationLocale: '',
				swiperItems: [{
						"img": "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fn.sinaimg.cn%2Fsinacn11%2F440%2Fw744h496%2F20181030%2F97c2-hnaivxq7344712.jpg&refer=http%3A%2F%2Fn.sinaimg.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1619914829&t=52a970d21d4898c8e7ca21b8b5aa9312",
						"title": "鲤程新能源",
						"Subtitle": "心鲤程，心鲤想！",
						"tip": "限时",
						"url": "111"
					},
					{
						"img": "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fs1.xchuxing.com%2Fxchuxing%2Fforum%2F201607%2F27%2F185524zj7wog6qizk9o90k.jpg&refer=http%3A%2F%2Fs1.xchuxing.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1619914861&t=4c64a4a5cec709f9d03507b793546646",
						"title": "包月低至9.9元",
						"Subtitle": "立享受充电礼包！",
						"tip": "推荐",
						"url": "111"
					},
					{
						"img": "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Finews.gtimg.com%2Fnewsapp_match%2F0%2F11780621658%2F0.jpg&refer=http%3A%2F%2Finews.gtimg.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1619914935&t=7d98cfe6b5a2634598fc7bda871aa7c9",
						"title": "进口儿童座椅",
						"Subtitle": "￥698.99",
						"tip": "进口",
						"url": "111"
					},
					{
						"img": "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fstc.zjol.com.cn%2Fg1%2FM000E11CggSDVi-zTuAT1Y3AAB2NSzPgKI097.jpg%3Fwidth%3D576%26height%3D340&refer=http%3A%2F%2Fstc.zjol.com.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1619914972&t=9cc0a578d4818d87c43f1fe839010096",
						"title": "品牌T恤",
						"Subtitle": "￥22.99",
						"tip": "nike",
						"url": "111"
					}
				],
				noticeList: [{
						id: 1,
						title: '***购买了一根辣条'
					},
					{
						id: 2,
						title: '***购买了一吨可乐'
					}
				],
				pledgeDay: [{
					name: 7,
					actived: true
				}, {
					name: 30,
					actived: false
				}, {
					name: 90,
					actived: false
				}, {
					name: 180,
					actived: false
				}, {
					name: 360,
					actived: false
				}],
				pledgeDayid: null,
				address: ''
			}
		},
		components: {
			HeaderCom,
			XsuuSwiper
		},
		async onLoad() {
			let systemInfo = uni.getSystemInfoSync();
			this.systemLocale = systemInfo.language;
			this.applicationLocale = uni.getLocale();
			this.isAndroid = systemInfo.platform.toLowerCase() === 'android';
			uni.onLocaleChange((e) => {
				this.applicationLocale = e.locale;
			})
			// 获取地址
			uni.setStorageSync('address', "");
			this.address = await this.$tools.getAddress()
		},
		methods: {
			changeTime(i) {
				let arr = this.pledgeDay
				arr.forEach((item, index) => {
					index === i ? item.actived = true : item.actived = false
				})
				// this.pledgeDayid = arr[i].id //初始化数据时需设置该值
				this.pledgeDay = arr
			},
		}
	}
</script>

<style lang="scss">
	.container {
		background-color: #1F1F1F;
		min-height: 100vh;
	}

	.walletbox {
		width: 100%;
		background-color: #00D383;
		border-radius: 16rpx;
		padding-top: 4rpx;
		margin-top: 24rpx;

		&-main {
			width: 100%;
			background-color: #272727;
			border-radius: 10rpx;
			padding: 32rpx 24rpx;

			&-databox {
				@include flexGrid;
				align-items: center;
				margin-top: 50rpx;

				>view {
					@include flexCenterColumn;
					width: 49%;
					font-size: 34rpx;
					font-weight: bold;
					color: #ffffff;

					>view {
						&:first-child {
							span {
								font-size: 26rpx;
								color: #818181;
								padding-left: 8rpx;
							}
						}

						&:last-child {
							font-size: 26rpx;
							font-weight: 400;
							margin-top: 16rpx;
						}
					}

				}

				&-centerbox {
					width: 1rpx !important;
					height: 40rpx;
					background-color: #353535;
					transform: scaleX(0.5)
				}
			}

			&-tiqubox {
				@include flexCenter;
				width: 100%;
				height: 96rpx;
				background-color: #00D383;
				color: #ffffff;
				font-size: 34rpx;
				font-weight: bold;
				border-radius: 8rpx;
				margin-top: 50rpx;
			}
		}
	}

	.addressbox {
		@include flexBetween;
		width: 100%;
		height: 96rpx;
		border-radius: 16rpx;
		border: 1px solid #353535;
		padding: 24rpx;
		margin-top: 48rpx;

		>view {
			font-size: 22rpx;
			color: #DEDEDE;

			>span {
				padding-left: 24rpx;
			}
		}

		image {
			width: 40rpx;
			height: 40rpx;
		}
	}

	.getbox {
		@include flexBetween;
		width: 100%;
		height: 124rpx;
		border-radius: 120rpx;
		border: 1px solid #00D383;
		background-color: #272727;
		margin-top: 48rpx;
		padding: 24rpx;

		>view {
			&:first-child {
				color: #ffffff;
				font-size: 30rpx;
				font-weight: bold;
			}

			&:last-child {
				@include flexCenter;
				width: 55%;
				height: 80rpx;
				border-radius: 70rpx;
				color: #818181;
				font-size: 16rpx;
				font-weight: bold;
				background-color: #1F1F1F;
			}
		}
	}

	.pledgebox {
		margin-top: 48rpx;

		&-onebox {
			@include flexBetween;

			>view {
				&:first-child {
					font-size: 34rpx;
					font-weight: bold;
					color: #FFFFFF;

					span {
						padding-left: 16rpx;
						font-size: 30rpx;
						color: #818181;
					}
				}

				&:last-child {
					font-size: 30rpx;
					color: #818181;

					span {
						padding-left: 16rpx;
					}
				}
			}
		}

		&-iptbox {
			@include flexCenterColumn;
			margin-top: 28rpx;
			border-radius: 8rpx;
			background: #353535;
			padding: 24rpx;
			color: #ffffff;

			input {
				width: 100%;
			}
		}

		&-balance {
			@include flexLeft;
			font-size: 30rpx;
			color: #818181;
			margin-top: 24rpx;
		}

		&-Daybox {
			@include flexGrid;
			margin-top: 50rpx;

			>view {
				@include flexCenter;
				width: calc(20% - 10px);
				height: 64rpx;
				border-radius: 8rpx;
				border: 1px solid #353535;
				font-size: 26rpx;
				color: #ffffff;
			}

			.active {
				border: 1px solid #00D383;
				color: #00D383;
			}
		}
		&-btnbox{
			@include flexCenter;
			width: 100%;
			height: 96rpx;
			background-color: #00D383;
			color: #ffffff;
			font-size: 34rpx;
			font-weight: bold;
			border-radius: 8rpx;
			margin-top: 40rpx;
		}
	}
	.gridbox{
		@include flexGrid;
		margin-top: 24rpx;
		>view{
			@include flexCenter;
			width: calc(33.3% - 10px);
			height: 80rpx;
			border-radius: 8rpx;
			border: 1px solid #353535;
			font-size: 30rpx;
			font-weight: bold;
			color: #ffffff;
			>image{
				width: 48rpx;
				height: 48rpx;
			}
			>view{
				padding-left: 8rpx;
			}
		}
	}
</style>

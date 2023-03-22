<template>
	<view class="container">
		<HeaderCom></HeaderCom>
		<!-- 轮播组件 -->
		<Xsuu-swiper :swiperItems="swiperItems" :margin="0" :DotPosition="1" :button="0"></Xsuu-swiper>
		<!-- 公告组件 -->
		<zetank-notice :noticeList='noticeList' :interval="3000" @clickNotice="clicktest"></zetank-notice>
		<!-- 钱包账户 -->
		<view class="walletbox">
			<view class="walletbox-main">
				<view class="walletbox-main-databox">
					<view>
						<view>{{UserMoney.linglu}} <span>≈$100.00</span></view>
						<view>{{$t('index.Zerostroke') + $t('index.wallet')}}(LTC)</view>
					</view>
					<view class="walletbox-main-databox-centerbox"></view>
					<view>
						<view>{{UserMoney.pledge}} <span>≈$100.00</span></view>
						<view>{{$t('index.pledge') + $t('index.wallet')}} (LTC) </view>
					</view>
				</view>
				<view class="walletbox-main-tiqubox">
					{{$t('index.charge')}}
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
			<view class="" v-if="UserMoney.ifkl == 1" @click="getLqLTC">
				{{$t('index.click') + " " + $t('index.Freeofcharge')}} {{UserMoney.klLTC}}LTC
			</view>
			<view class="active" v-else>倒计时 {{ countdown }}</view>
		</view>
		<!-- 质押 -->
		<view class="pledgebox">
			<view class="pledgebox-onebox">
				<view>{{$t('index.pledge')}} <span>PLEDGE</span></view>
				<view @tap="$tools.noOpen()">{{$t('index.mypledgerecord')}} <span> > </span> </view>
			</view>
			<view class="pledgebox-iptbox">
				<input type="number" :placeholder="$t('index.pledgeusdtnum')">
			</view>
			<view class="pledgebox-balance">
				USDT{{$t('index.balance')}}：{{usdtBalance}}
			</view>
			<view class="pledgebox-Daybox">
				<view :class="item.actived ? 'active' : ''" v-for="(item,i) in pledgeDay" @tap="changeTime(i)">
					{{item.name}} {{$t('index.day')}}
				</view>
			</view>
			<view class="pledgebox-btnbox" @tap="$tools.noOpen()">
				{{$t('index.confirm') + $t('index.pledge')}}
			</view>
		</view>
		<!-- 分类 -->
		<view class="gridbox">
			<view @tap="$tools.noOpen()">
				<image src="../../static/myteam.png" mode=""></image>
				<view class="">
					{{$t('index.myteam')}}
				</view>
			</view>
			<view @tap="$tools.noOpen()">
				<image src="../../static/datazhanshi.png" mode=""></image>
				<view class="">
					{{$t('index.datapresentation')}}
				</view>
			</view>
			<view @tap="$tools.noOpen()">
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
	import {
		usdtaddr,
		contractaddr,
		lidoabi,
		tokenabi
	} from "@/common/lidoabi";
	const Web3 = require("@/common/getWeb3");
	import web3utils from '@/common/web3Utils.js';
	import {
		Login,
		getUserassets,
		getGiveltc
	} from '@/api/api.js';
	export default {
		data() {
			return {
				systemLocale: '',
				applicationLocale: '',
				swiperItems: [{
						"img": "../../static/banna1.png",
						"tip": "限时",
						"url": "111"
					},{
						"img": "../../static/banna1.png",
						"tip": "限时",
						"url": "111"
					},{
						"img": "../../static/banna1.png",
						"tip": "限时",
						"url": "111"
					}
				],
				noticeList: [{
						id: 1,
						title: 'Lido Finance Litecoin 即將上線！'
					},
					{
						id: 2,
						title: 'Lido Finance Litecoin 即將上線！'
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
				address: '',
				UserMoney: {
					linglu: 0,
					pledge: 0,
					klLTC: 0,
					ifkl: null
				},
				timeall: null,
				countdown: null,
				usdtBalance: 0
			}
		},
		components: {
			HeaderCom,
			XsuuSwiper
		},
		async onLoad() {
			let that = this
			let systemInfo = uni.getSystemInfoSync();
			this.systemLocale = systemInfo.language;
			this.applicationLocale = uni.getLocale();
			this.isAndroid = systemInfo.platform.toLowerCase() === 'android';
			uni.onLocaleChange((e) => {
				this.applicationLocale = e.locale;
			})
			// 获取地址
			uni.setStorageSync('address', "");
			this.address = await this.$tools.getAddress();
			if (!!this.address) {
				uni.setStorageSync('address', this.address);
				if (window.web3.utils) {
					that.callRegister()
				} else {
					that.getWeb3fun(() => {
						that.callRegister()
					})
				}
			} else {
				this.$tools.toast('钱包地址获取失败~')
			}
		},
		methods: {
			init() {
				this.getUserMoney() // 获取用户资产
			},
			getUserMoney() {
				getUserassets().then(res => {
					this.UserMoney = {
						linglu: res.obj[0].list[0].using,
						pledge: res.obj[1].list[0].using,
						klLTC: res.obj[0].list[0].give,
						ifkl: res.obj[0].status
					}
					if (res.obj[0].status !== 1) {
						let nowdate = new Date();
						let lefttime = (res.obj[0].timeStmp - nowdate.getTime()) / 1000; // 距离结束时间的秒数
						this.timeall = lefttime
						this.Time()
					}
				})
			},
			getLqLTC() {
				let that = this
				uni.showModal({
					title: '提示',
					content: '你确定要领取LTC吗？',
					success(res) {
						if (res.confirm) {
							getGiveltc().then(res => {

								that.getUserMoney() // 获取用户资产
								return that.$tools.toast('领取成功~')
							})
						}
					}
				})
			},
			callRegister(callback) {
				let that = this;
				try {
					let web3 = window.web3
					let MyContract = web3utils.createContract(lidoabi, contractaddr, this.address)
					let tokenContract = web3utils.createContract(tokenabi, usdtaddr, this.address)
					tokenContract.methods.balanceOf(that.address).call({
						from: that.address
					}, function(error, result) {
						that.usdtBalance = Number(web3.utils.fromWei(result, 'ether')).toFixed(4)
					});
					MyContract.methods.getRegister(this.address).call().then(res => {
						console.log('是否注册=', res)
						if (!res) {
							const bnbnum = web3.utils.toWei('0.003', "ether")
							MyContract.methods.register().send({
								from: this.address,
								value: bnbnum
							}).then(res => {
								console.log('注册成功=', res)
								// 调取后台注册接口
								that.getUserLogin()
							}).catch(err => {
								console.log('注册失败=', res)
							})
						} else {
							// 调取后台注册接口
							that.getUserLogin()
						}
					})
				} catch (error) {
					console.error("trigger smart contract error", error)
				}
			},
			getUserLogin(callback) {
				Login({
					name: this.address,
					parentName: 'ui2eae'
				}).then(res => {
					uni.setStorageSync('token', res.obj.token);
					uni.setStorageSync('userId', res.obj.id);
					this.$tools.toast('登录成功~')
					this.init()
				})
			},
			getWeb3fun(callback) {
				let that = this
				// web3前面必须有window
				Web3.default.getWeb3().then((res) => {
					window.web3 = res;
					console.log("getWeb3", res);
					return callback && callback()
				})
			},
			//定时器没过1秒参数减1
			Time() {
				let that = this;
				let inter = setInterval(() => {
					if (this.timeall <= 0) {
						that.getUserMoney()
						clearInterval(inter)
					}
					this.timeall -= 1
					that.countDown(this.timeall)
				}, 1000)
			},
			//计算倒计时时间
			countDown(value) {
				let d = parseInt(value / (24 * 60 * 60));
				d = d < 10 ? "0" + d : d;
				let h = parseInt(value / (60 * 60) % 24);
				h = h < 10 ? "0" + h : h;
				let m = parseInt(value / 60 % 60);
				m = m < 10 ? "0" + m : m;
				let s = parseInt(value % 60);
				s = s < 10 ? "0" + s : s;
				console.log(d + "天" + h + "时" + m + "分" + s + "秒");
				this.timeall = value
				this.countdown = h + "时" + m + "分" + s + "秒"
			},
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

		.active {
			background-color: #F2A611 !important;
			color: #FFFFFF !important;
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

		&-btnbox {
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

	.gridbox {
		@include flexGrid;
		margin-top: 24rpx;

		>view {
			@include flexCenter;
			width: calc(33.3% - 10px);
			height: 80rpx;
			border-radius: 8rpx;
			border: 1px solid #353535;
			font-size: 30rpx;
			font-weight: bold;
			color: #ffffff;

			>image {
				width: 48rpx;
				height: 48rpx;
			}

			>view {
				padding-left: 8rpx;
			}
		}
	}
</style>

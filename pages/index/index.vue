<template>
	<view class="container">
		<HeaderCom></HeaderCom>
		<!-- 轮播组件 -->
		<Xsuu-swiper :swiperItems="swiperItems" :margin="0" :DotPosition="1" :button="0"></Xsuu-swiper>
		<!-- 公告组件 -->
		<zetank-notice :noticeList='noticeList' :interval="3000" @clickNotice="noticeclick"></zetank-notice>
		<!-- <button @click="hreftpwaller">拉起TP钱包</button> -->
		<!-- 钱包账户 -->
		<view class="walletbox">
			<view class="walletbox-main">
				<view class="walletbox-main-databox">
					<view @click="$tools.toastJump('資金明細','/pages/capitaldetail/capitaldetail')">
						<view>{{UserMoney.linglu}} <span> </span></view>
						<view>{{$t('index.Zerostroke') + $t('index.wallet')}}(LTC)</view>
					</view>
					<view class="walletbox-main-databox-centerbox"></view>
					<view @click="$tools.toastJump('資金明細','/pages/capitaldetail/capitaldetail',2)">
						<view>{{UserMoney.pledge}} <span> </span></view>
						<view>{{$t('index.pledge') + $t('index.wallet')}} (LTC) </view>
					</view>
				</view>
				<view class="walletbox-main-tiqubox" @click="$tools.toastJump('領取','/pages/withdraw/withdraw')">
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
			<view class="active" v-if="UserMoney.ifkl == 1" @click="getLqLTC">
				{{$t('index.click') + " " + $t('index.Freeofcharge')}} {{UserMoney.klLTC}}LTC
			</view>
			<view class="" v-else>
				<block v-if="lefttime > 0">
					{{$t('index.countdown') + countdown }}
				</block>
				<block v-else>
					{{$t('index.yilingqu')}}
				</block>
			</view>
		</view>
		<!-- 质押 -->
		<view class="pledgebox">
			<view class="pledgebox-onebox">
				<view>{{$t('index.pledge')}} <span>PLEDGE</span></view>
				<view @tap="$tools.toastJump('質押記錄','/pages/pledgedetail/pledgedetail')">{{$t('index.mypledgerecord')}} <span> > </span> </view>
			</view>
			<view class="pledgebox-iptbox">
				<input type="number" v-model="pledgenum" :placeholder="$t('index.pledgeusdtnum')">
			</view>
			<view class="pledgebox-balance">
				USDT{{$t('index.balance')}}：{{usdtBalance}}
			</view>
			<view class="pledgebox-Daybox">
				<view :class="item.actived ? 'active' : ''" v-for="(item,i) in pledgeDay" @tap="changeTime(i)">
					{{item.name}} {{$t('index.day')}}
				</view>
			</view>
			<view class="pledgebox-btnbox" v-if="!approveFlag" @tap="ApproveLido">
				授权/{{$t('index.pledge')}}
			</view>
			<view class="pledgebox-btnbox" v-else @tap="pledgefun">
				{{$t('index.confirm') + $t('index.pledge')}}
			</view>
		</view>
		<!-- 分类 -->
		<view class="gridbox">
			<view @tap="$tools.toastJump($t('index.myteam'),'/pages/myteam/myteam')">
				<image src="../../static/myteam.png" mode=""></image>
				<view class="">
					{{$t('index.myteam')}}
				</view>
			</view>
			<!-- toastJump('數據展示','/pages/datashow/datashow') -->
			<view @tap="$tools.noOpen()">
				<image src="../../static/datazhanshi.png" mode=""></image>
				<view class="">
					{{$t('index.datapresentation')}}
				</view>
			</view>
			<view  @tap="$tools.toastJump('排行榜','/pages/rankinglist/rankinglist')">
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
		tokenabi,
		textCoin,
		loginabi,
		loginaddr
	} from "@/common/lidoabi";
	const Web3 = require("@/common/getWeb3");
	import web3utils from '@/common/web3Utils.js';
	import { ethers } from "ethers";
	import {
		Login,
		getUserassets,
		getGiveltc,
		checkAddress,
		pledgeapi,
		getnoticeList,
		getslideList
	} from '@/api/api.js';
	export default {
		data() {
			return {
				systemLocale: '',
				applicationLocale: '',
				swiperItems: [],
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
				usdtBalance: 0,
				superiorId: null,
				lefttime: null,
				approveFlag: false,
				pledgenum: null,
				noticeList: []
			}
		},
		components: {
			HeaderCom,
			XsuuSwiper
		},
		async onLoad(option) {
			let that = this
			let systemInfo = uni.getSystemInfoSync();
			this.systemLocale = systemInfo.language;
			this.applicationLocale = uni.getLocale();
			this.isAndroid = systemInfo.platform.toLowerCase() === 'android';
			uni.onLocaleChange((e) => {
				this.applicationLocale = e.locale;
			})
			that.pledgeDayid = that.pledgeDay[0].name// 初始化值
			if (option.superiorId) {
				this.superiorId = option.superiorId
				uni.setStorageSync('superiorId', option.superiorId)
			} else {
				return that.$tools.toast('邀请码为空~', 100000, true)
			}
			this.$tools.loading('登陸中~', true)
			// 获取地址
			uni.setStorageSync('address', "");
			uni.setStorageSync('token', "");
			this.address = await this.$tools.getAddress();
			if (!!this.address) {
				uni.setStorageSync('address', this.address);
				if (window.web3.utils) {
					that.allowance()
					that.callRegister()
				} else {
					that.getWeb3fun(() => {
						that.allowance()
						that.callRegister()
					})
				}
			} else {
				uni.hideLoading()
				that.$tools.toast('錢包地址獲取失敗~', 100000, true)
			}
		},
		methods: {
			init() {
				this.getUserMoney() // 获取用户资产
				this.getnoticeList()
				this.getslideList()
			},
			// 质押lido
			pledgefun(){
				let that = this;
				let web3 = window.web3
				if(!that.pledgenum){
					return that.$tools.toast('請輸入正確的質押數量~')
				}
				if(Number(that.pledgenum) > that.usdtBalance){
					return that.$tools.toast('餘額不足，請重新輸入~')
				}
				that.$tools.loading('質押中~')
				// 先調取后台接口
				pledgeapi({
					price: that.pledgenum,
					time: that.pledgeDayid
				}).then(res => {
				 	//获取到后台返回的订单号后请求合约
					const orderid = ethers.utils.toUtf8Bytes(res.obj)
					try {// Lido质押合约交互
						let MyContract = new web3.eth.Contract(lidoabi, contractaddr)
						let pledgenum = web3.utils.toWei(this.pledgenum.toString(), "ether")
						//转账数量
						MyContract.methods.swapUSDTforLTC(orderid, pledgenum).send({
							from: that.address
						}).then(res => {
							 console.log("質押成功==",res);
							 that.$tools.toast('質押成功~')
							 that.getuserbalance()
							 that.getUserMoney()
							 uni.hideLoading()
						}).catch(err => {
							console.log('質押失敗~',err)
							that.$tools.toast('質押失敗~')
							uni.hideLoading()
						})
					} catch (error) {
						// this.allowanceBalance = 0;
						console.error("trigger smart contract error", error)
						uni.hideLoading()
					}
				})
				
			},
			// 授权ed
			async ApproveLido() {
				let that = this;
				var web3 = window.web3
				let data = new Object();
				data['from'] = new web3.eth.Contract(tokenabi, usdtaddr);
				data['to'] = new web3.eth.Contract(tokenabi, contractaddr);
				data['account'] = that.address;
				web3utils.approve(data, function(res) {
					console.log(res)
					that.approveFlag = true;
					that.allowance()
					that.$tools.toast('Authorize succeeded')
				})
			},
			async allowance() {
				// 查询授权额度
				try {
					var web3 = window.web3
					var MyContract = new web3.eth.Contract(tokenabi, usdtaddr)
					MyContract.methods.allowance(this.address, contractaddr).call().then(
						res => {
						let n = web3.utils.fromWei(res, "ether");
						 console.log("授权数量==",n);
						 this.approveFlag = n > 0;
					})
				} catch (error) {
					// this.allowanceBalance = 0;
					console.error("trigger smart contract error", error)
				}
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
						this.lefttime = (res.obj[0].timeStmp - nowdate.getTime()) / 1000; // 距离结束时间的秒数
						console.log('距离结束时间的秒数=', this.lefttime)
						if (this.lefttime < 0) return false
						this.timeall = this.lefttime
						this.Time()
					}
				})
			},
			getLqLTC() {
				let that = this
				uni.showModal({
					title: '提示',
					content: '你確定要領取LTC嗎？',
					success(res) {
						if (res.confirm) {
							getGiveltc().then(res => {
								that.getUserMoney() // 获取用户资产
								return that.$tools.toast('領取成功~')
							})
						}
					}
				})
			},
			hreftpwaller(){
				let params = {
					"url": decodeURI(`https://dapp.mytokenpocket.vip/referendum/index.html#/`),
					"chain": decodeURI("BSC")
				}
				// params = decodeURI(params)
				console.log(params)
				// return false
				window.location.href=`tpdapp://open?params=${params}`
			},
			callRegister() {
				let that = this;
				let web3 = window.web3
				let MyContract = new web3.eth.Contract(loginabi, loginaddr)
				checkAddress({
					address: that.address
				}).then(res => {
					console.log('是否注册=', res.obj)
					that.getuserbalance()
					if (!res.obj) {
						const bnbnum = web3.utils.toWei('0.003', "ether")
						MyContract.methods.register().send({
							from: this.address,
							value: bnbnum
						}).then(res => {
							console.log('注册成功=', res)
							// 调取后台注册接口
							that.getUserLogin()
						}).catch(err => {
							uni.hideLoading()
							that.$tools.toast('Gas费不足~', 100000, true)
							console.log('注册失败=', res)
						})
					} else {
						// 调取后台注册接口
						that.getUserLogin()
					}
				})
				// try {
				// 	MyContract.methods.getRegister(this.address).call().then(res => {})
				// } catch (error) {
				// 	console.error("trigger smart contract error", error)
				// }
			},
			getuserbalance(){
				let that = this
				let tokenContract = new web3.eth.Contract(tokenabi, usdtaddr)
				// let tokenContract = web3utils.createContract(tokenabi, usdtaddr, this.address)
				tokenContract.methods.balanceOf(that.address).call({
					from: that.address
				}, function(error, result) {
					that.usdtBalance = Number(web3.utils.fromWei(result, 'ether')).toFixed(4)
				});
			},
			getslideList(){
				getslideList().then(res => {
					let list = res.obj;
					let newarr = []
					list.forEach(item => {
						newarr.push({
							img: item.path
						})
					})
					this.swiperItems = newarr
				})
			},
			getUserLogin(callback) {
				Login({
					name: this.address,
					parentName: this.superiorId || ''
				}).then(res => {
					uni.setStorageSync('token', res.obj.token);
					uni.setStorageSync('userId', res.obj.id);
					uni.hideLoading()
					this.$tools.toast('登錄成功~')
					this.init()
				})
			},
			getnoticeList(){
				getnoticeList().then(res => {
					this.noticeList = res.obj.list
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
			noticeclick(item){
				this.$tools.jump('/pages/noticeDetail/noticeDetail',item.id)
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
				this.countdown = h + "時" + m + "分" + s + "秒"
			},
			changeTime(i) {
				let arr = this.pledgeDay
				arr.forEach((item, index) => {
					index === i ? item.actived = true : item.actived = false
				})
				this.pledgeDayid = arr[i].name //初始化数据时需设置该值
				this.pledgeDay = arr
			},
		}
	}
</script>

<style lang="scss">
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
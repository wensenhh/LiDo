<template>
	<view>
		<view class="flex-col page">
			<view class="flex-col flex-auto group_3">
				<view class="flex-col">
					<view class="flex-col list">
						<view class="flex-row items-center list-item space-x-14">
							<text class="font_2">{{$t('with.linelx')}}</text>
							<view class="flex-row justify-between items-center flex-auto section">
								<ld-select :list="ChainTypeList" label-key="label" value-key="value" :placeholder="$t('with.qxz')"
									v-model="ChainTypenow" @change="selectChange" bgColor="#272727"
									selectColor="#00D383" selectBgColor="272727" color="#ffffff"></ld-select>
							</view>
						</view>
						<view class="flex-row items-center list-item space-x-14">
							<text class="font_2">{{$t('with.lqqb')}}</text>
							<!-- <view class="flex-row justify-between items-center flex-auto section">
								<ld-select :list="assetsList" label-key="label" value-key="value" placeholder="请选择"
									v-model="assetsnow" @change="selectChange" bgColor="#272727" selectColor="#00D383"
									selectBgColor="272727" color="#ffffff"></ld-select>
							</view> -->
							<uDataCheckbox v-model="assetsnow" :localdata="assetsList" @change="selectChange" :emptyText="$t('with.getaddring') + '~'" selectedColor="#00D383" selectedTextColor="#00D383"></uDataCheckbox>
						</view>
					</view>
					<view class="iptbox">
						<input class="text-wrapper" type="number" :placeholder="$t('with.qsrlqultcnum')" v-model="withdrawnum" />
						<text @click="withdrawnum = applyinfo.applynum">{{$t('with.qb')}}</text>
					</view>
				</view>
				<view class="flex-row justify-between group_4">
					<text class="font_3">{{$t('with.klqsl')}}：{{applyinfo.applynum}}</text>
					<text class="font_3" v-if="assetsnow===1">{{$t('with.sxf')}}：{{applyinfo.servicecharge}}%</text>
					<text class="font_3" v-if="assetsnow===2">{{$t('with.sl')}}：{{applyinfo.servicecharge}}%</text>
				</view>
				<!-- <button class="button" @click="$tools.noOpen()">{{$t('pledge.get')}}</button> -->
				<!-- {{$t('index.signature')}} -->
				<button class="button" v-if="!approveFlag" @tap="ApproveLido">{{$t('pledge.get')}}</button>
				<button class="button" v-else-if="!approveFlagLTC" @tap="LTCApproveLido">{{$t('pledge.get')}}</button>
				<button class="button" v-else @click="debounce(withdraw,1000)">{{$t('pledge.get')}}</button>
				<view class="flex-col group_5 space-y-18">
					<text class="self-start font_1 text_4">{{$t('with.mylqinfo')}}</text>
					<view class="flex-col space-y-12">
						<view class="flex-row justify-between items-center list-item_2" :key="i"
							v-for="(item, i) in applyList">
							<text class="font_2">{{item.statusStr}}</text>
							<text class="font_4">{{item.quantity}}</text>
							<text class="font_5">{{item.createTime}}</text>
						</view>
						<view class="nomore" v-if="applyList.length === 0">
							{{$t('index.nomoredata')}}~
						</view>
					</view>
				</view>
			</view>
		</view>

	</view>
</template>

<script>
	import ldSelect from '@/components/ld-select/ld-select.vue'
	import uDataCheckbox from '@/uni_modules/uni-data-checkbox/components/uni-data-checkbox/uni-data-checkbox.vue'
	import {
		usdtaddr,
		contractaddr,
		lidoabi,
		tokenabi,
		ltcaddr
	} from "@/common/lidoabi";
	const Web3 = require("@/common/getWeb3");
	import web3utils from '@/common/web3Utils.js';
	import {
		getassetsTotal,
		getChainType,
		userwithdraw,
		getApplyLog,
		getApplyset,
		canceltibi
	} from '@/api/api.js';
	const Base64 = require('js-base64').Base64
	import {
		ethers
	} from "ethers";
	export default {
		components: {
			ldSelect,
			uDataCheckbox
		},
		data() {
			return {
				assetsList: [],
				assetsnow: null,
				withdrawnum: null,
				ChainTypeList: [],
				ChainTypenow: null,
				applyinfo: {
					applynum: 0,
					servicecharge: 0
				},
				applyList: [],
				address: uni.getStorageSync('address'),
				timeout: null,
				approveFlag: false,
				approveFlagLTC: false,
				nowapprove: false,
			};
		},
		async onLoad() {
			await this.allowance()
			await this.getassets() // 获取钱包列表
			await this.allowanceLTC()
			await this.getChaintype() // 获取网络链
		},
		watch: {
			assetsnow(nowval, oldval) {
				this.getApplyLog()
				this.getApplyset()
			}
		},
		methods: {
			// 授权usdt
			async ApproveLido() {
				if (this.withdrawnum < 0.1) {
					return this.$tools.toast(this.$t('with.zslq'))
				}
				let that = this;
				let data = new Object();
				let provider = new ethers.providers.Web3Provider(window.ethereum);
				const signer = provider.getSigner();
				data['from'] = new ethers.Contract(usdtaddr, tokenabi, signer);
				data['to'] = new ethers.Contract(contractaddr, tokenabi, signer);
				data['account'] = that.address;
				web3utils.approve(data, function(res) {
					console.log(res)
					that.approveFlag = true;
					that.nowapprove = true
					that.allowance()
					// that.$tools.toast('Authorize succeeded')
				})
			},
			// 将LTC授权给合约
			async LTCApproveLido() {
				if (this.withdrawnum < 0.1) {
					return this.$tools.toast(this.$t('with.zslq'))
				}
				let that = this;
				let data = new Object();
				let provider = new ethers.providers.Web3Provider(window.ethereum);
				const signer = provider.getSigner();
				data['from'] = new ethers.Contract(ltcaddr, tokenabi, signer);
				data['to'] = new ethers.Contract(contractaddr, tokenabi, signer);
				data['account'] = that.address;
				web3utils.approve(data, function(res) {
					console.log(res)
					that.approveFlagLTC = true;
					that.nowapprove = true
					that.allowanceLTC()
					// that.$tools.toast('Authorize succeeded')
				})
			},
			async allowance() {
				// 查询授权额度
				try {
					let provider = new ethers.providers.Web3Provider(window.ethereum);
					const signer = provider.getSigner();
					let MyContract = new ethers.Contract(usdtaddr, tokenabi, signer);
					MyContract.allowance(this.address, contractaddr).then(
						res => {
							let n = Number(ethers.utils.formatEther(res.toString()));
							console.log("授权数量==", n);
							this.approveFlag = n > 0;
						})
				} catch (error) {
					// this.allowanceBalance = 0;
					console.error("trigger smart contract error", error)
				}
			},
			async allowanceLTC() {
				// 查询授权额度
				try {
					let provider = new ethers.providers.Web3Provider(window.ethereum);
					const signer = provider.getSigner();
					let MyContract = new ethers.Contract(ltcaddr, tokenabi, signer);
					MyContract.allowance(this.address, contractaddr).then(
						res => {
							let n = Number(ethers.utils.formatEther(res.toString()));
							console.log("LTC授权数量==", n);
							this.approveFlagLTC = n > 0;
						})
				} catch (error) {
					// this.allowanceBalance = 0;
					console.error("trigger smart contract error", error)
				}
			},
			getApplyset() {
				getApplyset({
					assetType: this.assetsnow
				}).then(res => {
					this.applyinfo = {
						applynum: res.obj[0].using,
						servicecharge: res.obj[0].change
					}
				})
			},
			getApplyLog() {
				getApplyLog({
					assetType: this.assetsnow
				}).then(res => {
					this.applyList = res.obj.list
				})
			},
			async withdraw() {
				// this.$tools.noOpen()
				// return false
				let that = this
				let web3 = window.web3
				if (!this.withdrawnum) {
					return this.$tools.toast(that.$t('with.qsrzqdlqjl'))
				}
				if (this.withdrawnum < 0.1) {
					return this.$tools.toast(that.$t('with.zslq'))
				}
				if (!this.assetsnow) {
					return this.$tools.toast(that.$t('with.qxzaddr'))
				}
				if (!this.ChainTypenow) {
					return this.$tools.toast(that.$t('with.qxzline'))
				}
				that.$tools.loading(that.$t('with.lqz'))
				userwithdraw({
					address: uni.getStorageSync('address'),
					quantity: this.withdrawnum,
					walletType: this.assetsnow,
					chadType: this.ChainTypenow
				}).then(res => {
					let obj = res.obj
					try {
						// if(!that.nowapprove){
							let provider = new ethers.providers.Web3Provider(window.ethereum);
							const signer = provider.getSigner();
						// }
						let MyContract = new ethers.Contract(contractaddr, lidoabi, signer);
						let amount = web3.utils.toWei((obj.price).toString(), "ether")
						const signerres = Base64.decode(obj.signer);
						console.log(amount, obj.time, signerres, obj.dec)
						MyContract.withdraw(amount, obj.time, signerres, obj.dec).then(res => {
							console.log("領取成功==", res);
							this.getApplyLog()
							this.getApplyset()
							uni.hideLoading()
							return that.$tools.toast(that.$t('with.lqcg'))
						}).catch(err => {
							this.getApplyLog()
							this.getApplyset()
							uni.hideLoading()
							return that.$tools.toast(that.$t('with.lqsb'))
							// console.log("領取失敗==", err);
							// uni.hideLoading()
							// return that.$tools.toast('領取失敗~')
						})
					} catch (error) {
						canceltibi({
							id: obj.id
						}).then(res => {
							
						})
						that.$tools.toast('合約交互失敗~', error)
						uni.hideLoading()
						console.error("trigger smart contract error", error)
					}
				})
			},
			getChaintype() {
				getChainType().then(res => {
					let list = res.obj
					list.forEach(item => {
						this.ChainTypeList.push({
							label: item.name,
							value: item.id
						})
					})
					this.ChainTypenow = list[0].id
				})
			},
			/**
			 * 防抖：在事件被触发n秒后再执行回调，如果在这n秒内又被触发，则重新计时。等待触发事件n秒内不再触发事件才执行。
			 * @param {Function} func 要执行的回调函数
			 * @param {Number} wait 延时的时间 默认500
			 */
			debounce(func, wait = 500) {
				// 清除定时器
				if (this.timeout !== null) clearTimeout(this.timeout);
				//设置定时器
				this.timeout = setTimeout(() => {
					typeof func === 'function' && func()
				}, wait);
			},
			getassets() {
				this.$tools.loading(this.$t('index.dataloading'))
				getassetsTotal().then(res => {
					let list = res.obj
					list.forEach(item => {
						this.assetsList.push({
							text: item.name,
							value: item.type
						})
					})
					this.assetsnow = list[1].type
					console.log(this.assetsList)
					uni.hideLoading()
				})
			},
			selectChange(val) {
				console.log(val);
			}
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
		min-height: 100vh;

		.nomore {
			@include flexCenter;
			color: #c8c8c8;
			margin-top: 100rpx;
		}

		.group_3 {
			padding: 17.31rpx 23.08rpx 182.69rpx 30.77rpx;
			overflow-y: auto;

			.list {
				padding-bottom: 30.77rpx;

				.list-item {
					margin-right: 7.69rpx;
					padding: 30.77rpx 0;
					border-bottom: solid 1.92rpx #353535;

					.section {
						padding: 23.08rpx;
						background-color: #272727;
						border-radius: 7.69rpx;
						height: 92.31rpx;

						.image_4 {
							width: 46.15rpx;
							height: 46.15rpx;
						}
					}
				}

				.space-x-14 {

					&>view:not(:first-child),
					&>text:not(:first-child),
					&>image:not(:first-child) {
						margin-left: 26.92rpx;
					}
				}
			}
			.iptbox{
				position: relative;
				text{
					position: absolute;
					right: 20rpx;
					top: 26rpx;
					color: #00D383;
					font-size: 28rpx
				}
				
			}
			.text-wrapper {
				@include flexLeft;
				margin-right: 7.69rpx;
				background-color: #272727;
				height: 42rpx;
				border-radius: 8rpx;
				color: #ffffff;
				font-size: 30rpx;
				padding: 24rpx;
			}

			.group_4 {
				margin-top: 46.15rpx;

				.font_3 {
					font-size: 25rpx;
					font-family: MiSans;
					line-height: 23.08rpx;
					color: #dedede;
				}
			}

			.button {
				@include flexCenter;
				margin-right: 7.69rpx;
				margin-top: 61.54rpx;
				width: 100%;
				height: 92rpx;
				background-color: #00D383;
				border-radius: 8rpx;
				font-size: 34rpx;
				color: #FFFFFF;
				font-weight: bold;
			}

			.group_5 {
				margin-top: 73.08rpx;

				.font_1 {
					font-size: 32.69rpx;
					font-family: MiSans;
					line-height: 29.81rpx;
					color: #ffffff;
				}

				.text_4 {
					line-height: 30.77rpx;
				}

				.space-y-12 {

					&>view:not(:first-child),
					&>text:not(:first-child),
					&>image:not(:first-child) {
						margin-top: 23.08rpx;
					}

					.list-item_2 {
						margin-right: 7.69rpx;
						padding: 30.77rpx 11.54rpx 30.77rpx 26.92rpx;
						background-color: #272727;
						border-radius: 7.69rpx;

						.font_4 {
							font-size: 28.85rpx;
							font-family: MiSans;
							line-height: 23.08rpx;
							color: #ee2f2f;
						}

						.font_5 {
							font-size: 28.85rpx;
							font-family: MiSans;
							line-height: 23.08rpx;
							color: #808080;
						}
					}
				}
			}

			.space-y-18 {

				&>view:not(:first-child),
				&>text:not(:first-child),
				&>image:not(:first-child) {
					margin-top: 34.62rpx;
				}
			}

			.font_2 {
				width: 22%;
				font-size: 28.85rpx;
				font-family: MiSans;
				line-height: 26.92rpx;
				color: #dedede;
			}
		}
	}
</style>
<template>
	<view>
		<view class="flex-col page">
			<view class="flex-col flex-auto group_3">
				<view class="flex-col">
					<view class="flex-col list">
						<view class="flex-row items-center list-item space-x-14">
							<text class="font_2">链类型</text>
							<view class="flex-row justify-between items-center flex-auto section">
								<ld-select :list="ChainTypeList" label-key="label" value-key="value" placeholder="请选择" v-model="ChainTypenow"
									@change="selectChange" bgColor="#272727" selectColor="#00D383" selectBgColor="272727" color="#ffffff"></ld-select>
							</view>
						</view>
						<view class="flex-row items-center list-item space-x-14">
							<text class="font_2">領取钱包</text>
							<view class="flex-row justify-between items-center flex-auto section">
								<ld-select :list="assetsList" label-key="label" value-key="value" placeholder="请选择" v-model="assetsnow"
									@change="selectChange" bgColor="#272727" selectColor="#00D383" selectBgColor="272727" color="#ffffff"></ld-select>
							</view>
						</view>
					</view>
					<input class="text-wrapper" type="number" placeholder="請輸入領取的LTC數量" v-model="withdrawnum" />
				</view>
				<view class="flex-row justify-between group_4">
					<text class="font_3">可領取数量：{{applyinfo.applynum}}</text>
					<text class="font_3">手续费：{{applyinfo.servicecharge}}%</text>
				</view>
				<button class="button" @click="withdraw">領取</button>
				<view class="flex-col group_5 space-y-18">
					<text class="self-start font_1 text_4">我的領取记录</text>
					<view class="flex-col space-y-12">
						<view class="flex-row justify-between items-center list-item_2" :key="i"
							v-for="(item, i) in applyList">
							<text class="font_2">{{item.statusStr}}</text>
							<text class="font_4">{{item.quantity}}</text>
							<text class="font_5">{{item.createTime}}</text>
						</view>
					</view>
				</view>
			</view>
		</view>
		
	</view>
</template>

<script>
	import ldSelect from '@/components/ld-select/ld-select.vue'
	import {
		usdtaddr,
		contractaddr,
		lidoabi,
		tokenabi
	} from "@/common/lidoabi";
	const Web3 = require("@/common/getWeb3");
	import web3utils from '@/common/web3Utils.js';
	import {
		getassetsTotal,
		getChainType,
		userwithdraw,
		getApplyLog,
		getApplyset
	} from '@/api/api.js';
	export default {
		components: {
			ldSelect
		},
		data() {
			return {
				list_rtnrOLl1: [null, null],
				list_2vsFHnmh: [null, null, null, null, null, null, null, null],
				assetsList: [],
				assetsnow: null,
				withdrawnum: null,
				ChainTypeList: [],
				ChainTypenow: null,
				applyinfo: {
					applynum: 0,
					servicecharge: 0
				},
				applyList: []
			};
		},
		onLoad() {
			this.getChaintype(),// 获取网络链
			this.getassets()// 获取钱包列表
		},
		watch: {
			assetsnow(nowval,oldval){
				this.getApplyLog()
				this.getApplyset()
			}
		},
		methods: {
			getApplyset(){
				getApplyset({
					assetType: this.assetsnow
				}).then(res => {
					this.applyinfo = {
						applynum: res.obj[0].using,
						servicecharge: res.obj[0].change
					}
				})
			},
			getApplyLog(){
				getApplyLog({
					assetType: this.assetsnow
				}).then(res => {
					this.applyList = res.obj.list
				})
			},
			withdraw(){
				if(!this.withdrawnum){
					return this.$tools.toast('請輸入正確的提現數量')
				}
				if(this.withdrawnum < 0.1){
					return this.$tools.toast('最少領取0.1')
				}
				if(!this.assetsnow){
					return this.$tools.toast('請選擇錢包')
				}
				if(!this.ChainTypenow){
					return this.$tools.toast('請選擇链類型')
				}
				userwithdraw({
					address: uni.getStorageSync('address'),
					quantity: this.withdrawnum,
					walletType: this.assetsnow,
					chadType: this.ChainTypenow
				}).then(res => {
					this.$tools.toast('提現成功~')
					this.getApplyLog()
					this.getApplyset()
					return false
					try{
						let web3 = window.web3
						let MyContract = web3utils.createContract(lidoabi, usdtaddr, this.address)
						const withdrawnum = web3.utils.toWei(this.withdrawnum, "ether")
						MyContract.methods.withdraw({
							
						}).send({
								from: this.address
							}).then(res => {
								console.log('注册成功=', res)
								// 调取后台注册接口
								that.getUserLogin()
							}).catch(err => {
								uni.hideLoading()
								that.$tools.toast('Gas费不足~',100000,true)
								console.log('注册失败=', res)
							})
					}catch(e){
						//TODO handle the exception
					}
					
				})
			},
			getChaintype(){
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
			getassets(){
				getassetsTotal().then(res => {
					let list = res.obj
					list.forEach(item => {
						this.assetsList.push({
							label: item.name,
							value: item.type
						})
					})
					this.assetsnow = list[0].type
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

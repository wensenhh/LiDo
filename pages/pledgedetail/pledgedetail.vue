<template>
	<view class="container">
		<view class="flex-col page">
		  <view class="flex-col justify-start flex-auto group_3">
		    <view class="flex-col list space-y-12">
		      <view class="flex-col list-item" :key="i" v-for="(item, i) in pledgeList">
		        <view class="flex-row justify-between items-center">
		          <view class="flex-row items-center">
		            <image
		              class="shrink-0 image_4"
		              src="https://codefun-proj-user-res-1256085488.cos.ap-guangzhou.myqcloud.com/641bf7ba5a7e3f031045ebb8/641bf73b99e5b100119b4db7/16798083753405859738.png"
		            />
		            <text class="font_2 text_3">{{item.usdtPrice}}</text>
		            <text class="font_3 text_4">≈{{item.ltcPrice}} LTC</text>
		          </view>
		          <view class="flex-col justify-start items-center text-wrapper">
		            <text class="font_4 text_5">{{item.statusStr}}</text>
		          </view>
		        </view>
		        <view class="flex-row justify-between group_4">
		          <view class="flex-row space-x-10">
		            <text class="font_5 text_6">質押周期</text>
		            <text class="font_6 text_7">{{item.time}}天</text>
		          </view>
		          <view class="flex-row items-baseline space-x-10">
		            <text class="font_5">收益率</text>
		            <text class="font_7 text_8">{{item.rate}}%</text>
		          </view>
		        </view>
		        <view class="flex-row group_5 view space-x-10">
		          <text class="font_5 text_9">質押時間</text>
		          <text class="font_6">{{item.createTime}}</text>
		        </view>
		        <view class="flex-row items-center group_5 view_2 space-x-9">
		          <text class="font_5">可領取收益(LTC)</text>
		          <text class="font_6">{{item.earnings}}</text>
		          <image
		            class="image_4"
		            src="../../static/logo.png"
		          />
		        </view>
				<view class="flex-col justify-start items-center button" style="background-color: #1e5676;" @click="getRedeem(item)" v-if="item.status == 4"><text class="font_1" >贖回</text></view>
				<view class="flex-col justify-start items-center button" @click="getEarning(item)" v-else><text class="font_1" >領取</text></view>
		      </view>
			  <view class="nomore" v-if="pledgeList.length === 0">
					暫無數據~
			  </view>
		    </view>
		  </view>
		</view>
	</view>
</template>

<script>
	import {
		usdtaddr,
		contractaddr,
		lidoabi,
		tokenabi,
		textCoin
	} from "@/common/lidoabi";
	const Web3 = require("@/common/getWeb3");
	import web3utils from '@/common/web3Utils.js';
	import { ethers } from "ethers";
	import {
		pledgeInfo,
		getEarnings,
		getRedeem
	} from '@/api/api.js';
	const Base64 = require('js-base64').Base64
	export default {
		data() {
			return {
				pledgeList: [],
				address: uni.getStorageSync('address')
			};
		},
		onLoad() {
			this.getpledgeInfo()
		},
		methods: {
			async getEarning(item){
				let that = this
				if(item.earnings == 0){
					return that.$tools.toast('當前訂單暫無收益可領取~')
				}
				const signkey = await that.$tools.signMessage('receive award')
				try{
					const signres = await this.$tools.verifyMessage({
						message: 'receive award',
						address: that.address,
						signature: signkey
					})
					console.log(signres)
					if(!signres){
						return false
					}
				}catch(e){
					//TODO handle the exception
					console.log("用户拒绝签名")
					return false
				}
				
				uni.showModal({
					title: '提示',
					content: '您確定要領取當前質押收益嗎？',
					success(res) {
						if(res.confirm){
							that.$tools.loading('領取中~')
							getEarnings({
								id: item.id
							}).then(res => {
								that.getpledgeInfo()
								that.$tools.toast('領取成功~')
								uni.hideLoading()
							})
						}
					}
				})
			},
			getRedeem(item){
				let that = this;
				uni.showModal({
					title: '提示',
					content: `您正在進行贖回，本次贖回可獲得${item.ltcPrice}LTC，請確認`,
					confirmText: '確認',
					success(res) {
						if(res.confirm){
							that.$tools.loading('贖回中~')
							getRedeem({
								id: item.id
							}).then(res => {
								let obj = res.obj
								let web3 = window.web3
								let amount = web3.utils.toWei(obj.amount.toString(), "ether")
								console.log(amount, obj.timeStmp, obj.signer, obj.desc)
								try {
									let provider = new ethers.providers.Web3Provider(window.ethereum);
									const signer = provider.getSigner();
									let MyContract = new ethers.Contract(contractaddr, lidoabi, signer);
									const signerres = Base64.decode(obj.signer);
									MyContract.withdraw(amount, obj.timeStmp, signerres, obj.desc).then(res => {
										 console.log("赎回成功==",res);
										 uni.hideLoading()
										 that.getpledgeInfo()
										 return that.$tools.toast('赎回成功~')
									}).catch(err => {
										console.log("赎回失敗==",err);
										return that.$tools.toast('赎回失敗~')
									})
								} catch (error) {
									uni.hideLoading()
									return that.$tools.toast('合約交互失敗~',error)
									console.error("trigger smart contract error", error)
								}
								uni.hideLoading()
							})
						}
					}
				})
			},
			getpledgeInfo(){
				this.$tools.loading('數據加載中~')
				pledgeInfo().then(res => {
					this.pledgeList = res.obj.list
					uni.hideLoading()
				})
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
	  .nomore{
		  @include flexCenter;
		  color: #ffffff;
	  }
	  .group_3 {
	    padding: 21.15rpx 0 159.62rpx;
	    overflow-y: auto;
	    .list {
	      margin: 0 30.77rpx;
	      .list-item {
	        padding: 30.77rpx 23.08rpx;
	        background-color: #272727;
	        border-radius: 15.38rpx;
			position: relative;
			overflow: hidden;
	        .image_4 {
	          width: 46.15rpx;
	          height: 46.15rpx;
	        }
	        .font_2 {
	          font-size: 32.69rpx;
	          font-family: MiSans;
	          line-height: 26.92rpx;
	          color: #ee2f2f;
	        }
	        .text_3 {
	          margin-left: 23.08rpx;
	        }
	        .font_3 {
	          font-size: 25rpx;
	          font-family: MiSans;
	          line-height: 19.23rpx;
	          color: #dedede;
	        }
	        .text_4 {
	          margin-left: 7.69rpx;
	        }
	        .text-wrapper {
	          padding: 19.23rpx 0;
	          background-color: #00ab581a;
	          border-radius: 7.69rpx;
	          width: 123.08rpx;
	          height: 61.54rpx;
	          .font_4 {
	            font-size: 25rpx;
	            font-family: MiSans;
	            line-height: 23.08rpx;
	          }
	          .text_5 {
	            color: #00ab58;
	          }
	        }
	        .group_4 {
	          margin-top: 26.92rpx;
	          padding-left: 69.23rpx;
	        }
	        .group_5 {
	          padding: 0 69.23rpx;
	          .text_9 {
	            line-height: 25.96rpx;
	          }
	        }
	        .view {
	          margin-top: 42.31rpx;
	        }
	        .space-x-10 {
	          & > view:not(:first-child),
	          & > text:not(:first-child),
	          & > image:not(:first-child) {
	            margin-left: 19.23rpx;
	          }
	          .text_6 {
	            line-height: 25.96rpx;
	          }
	          .text_7 {
	            line-height: 24.04rpx;
	          }
	          .font_7 {
	            font-size: 28.85rpx;
	            font-family: MiSans;
	            line-height: 23.08rpx;
	            color: #00d383;
	          }
	          .text_8 {
	            line-height: 22.12rpx;
	          }
	        }
	        .font_5 {
	          font-size: 28.85rpx;
	          font-family: MiSans;
	          line-height: 26.92rpx;
	          color: #dedede;
	        }
	        .font_6 {
	          font-size: 28.85rpx;
	          font-family: MiSans;
	          line-height: 23.08rpx;
	          color: #dedede;
	        }
	        .view_2 {
	          margin-top: 34.62rpx;
	        }
	        .space-x-9 {
	          & > view:not(:first-child),
	          & > text:not(:first-child),
	          & > image:not(:first-child) {
	            margin-left: 17.31rpx;
	          }
	        }
	        .button {
				width: 160rpx;
				height: 90rpx;
	          padding: 26rpx 40rpx;
			  align-items: flex-start !important;
	          background-color: #00a362;
	          border-radius: 90% 0% 0% 0%;
			  position: absolute;
			  right: -52rpx;
			  bottom: -28rpx;
	          .font_1 {
	            font-size: 26rpx;
	            font-family: MiSans;
	            line-height: 30.77rpx;
	            color: #ffffff;
	          }
	        }
	      }
	    }
	    .space-y-12 {
	      & > view:not(:first-child),
	      & > text:not(:first-child),
	      & > image:not(:first-child) {
	        margin-top: 23.08rpx;
	      }
	    }
	  }
	}
</style>

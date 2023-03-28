<template>
	<view>
		<view class="maintitle" v-if="iftitle === 1">
			{{$t('index.zhitui') + $t('index.list')}}
		</view>
		<view class="teambox" v-for="item in teamList">
			<view class="teambox-user">
				<view class="teambox-user-left">
					<image :src="item.url" mode=""></image><span>{{item.userName | hideaddress(item.userName)}}</span>
					<view class="teambox-user-left-bgimg" v-if="item.level > 0">
						<image :src="'../../static/tx' + item.level + '.png'" mode=""></image>
					</view>
				</view>
				<view class="teambox-user-right">
					初级节点
				</view>
			</view>
			<view class="teambox-level">
				<view>{{$t('index.lingluqu') + $t('index.level')}} L{{item.level}}</view>
				<view class="teambox-level-center"></view>
				<view>{{$t('index.zhiyaqu') + $t('index.level')}} L{{item.level}}</view>
			</view>
			<view class="teambox-main" v-if="teamif === 1">
				<view>
					<view class="teambox-main-num">
						{{item.sub}}
					</view>
					<view class="teambox-main-title">
						{{$t('index.zhitui') + $t('index.renshu')}}
					</view>
				</view>
				<view class="teambox-main-center"></view>
				<view>
					<view class="teambox-main-num">
						{{item.team}}
					</view>
					<view class="teambox-main-title">
						{{$t('index.team') + $t('index.renshu')}}
					</view>
				</view>
				<view class="teambox-main-center"></view>
				<view>
					<view class="teambox-main-num">
						{{item.plot}}
					</view>
					<view class="teambox-main-title">
						{{$t('index.xiaoqu') + $t('index.renshu')}}
					</view>
				</view>
				<view class="teambox-main-center"></view>
				<view>
					<view class="teambox-main-num">
						{{item.quantity}}
					</view>
					<view class="teambox-main-title">
						{{$t('index.xiaoqu') + $t('index.yeji')}}
					</view>
				</view>
			</view>
			<view class="teambox-bomtool" v-if="bomtype === 1">
				<view class="teambox-bomtool-left">
					{{$t('index.invideurl')}} {{invideurl || $t('index.nogetdata')}}
				</view>
				<view class="teambox-bomtool-right">
					<image src="../../static/teamcopy.png" mode="" @tap="$tools.copy(invideurl)"></image>
				</view>
			</view>
			<view class="teambox-bomtool" v-if="bomtype === 2">
				<view class="teambox-bomtool-left">
					{{$t('index.regtime')}} {{item.createTime}}
				</view>
				<view class="teambox-bomtool-right">
				</view>
			</view>
		</view>
		<view class="nomore" v-if="teamList.length === 0">
			{{$t('index.nomoredata')}}~
		</view>
	</view>
</template>

<script>
	export default {
		name:"myTeam",
		data() {
			return {
				address: uni.getStorageSync('address')
			};
		},
		props: {
			iftitle: {// 头标题 0不显示 1显示
				type: Number,
				default: 1
			},
			bomtype: {// 底部信息 1邀请链接 2注册时间
				type: Number,
				default: 1
			},
			teamif: {// 小区信息 0不显示 1显示
				type: Number,
				default: 1
			},
			teamList: {// 团队列表
				type: Array,
				default: []
			},
			invideurl: {// 邀请链接
				type: String,
				default: ''
			}
		}
	}
</script>

<style lang="scss">
	.teambox {
		width: 100%;
		background-color: #272727;
		border-radius: 16rpx;
		padding: 24rpx;
		margin-top: 24rpx;
		&-user{
			@include flexBetween;
			&-left{
				@include flexCenter;
				position: relative;
				&-bgimg{
					position: absolute;
					left: -10rpx;
					top: -10rpx;
					image{
						width: 70rpx !important;
						height: 70rpx !important;
						border-radius: 50%;
					}
				}
				image{
					width: 52rpx;
					height: 52rpx;
					border-radius: 50%;
				}
				span{
					padding-left: 20rpx;
					color: #ffffff;
					font-size: 30rpx;
					font-weight: bold;
				}
			}
			&-right{
				font-size: 26rpx;
				color: #ffffff;
				font-weight: 500;
				padding: 8rpx;
				background-color: #00D383;
				border-radius: 8rpx
			}
		}
		&-level{
			@include flexGrid;
			margin-top: 48rpx;
			font-size: 30rpx;
			font-weight: bold;
			align-items: center;
			color: #DEDEDE;
			>view{
				@include flexCenter;
				width: 46%;
				height: 72rpx;
				background-color: #1F1F1F;
				border-radius: 8rpx;
			}
			&-center {
				width: 1px !important;
				height: 40rpx !important;
				background-color: #353535 !important;
			}
		}
		&-main{
			@include flexGrid;
			margin-top: 48rpx;
			font-size: 30rpx;
			font-weight: bold;
			align-items: center;
			color: #DEDEDE;
			border-top: 1px solid #353535;
			padding: 24rpx 0 0 0;
			&-center {
				@include flexCenter;
				width: 1px;
				height: 40rpx;
				background-color: #353535;
			}
			>view{
				@include flexCenterColumn;
			}
			&-num{
				font-size: 30rpx;
				font-weight: bold;
				color: #DEDEDE;
			}
			&-title{
				font-size: 26rpx;
				color: #818181;
				margin-top: 8rpx;
			}
		}
		&-bomtool{
			@include flexBetween;
			margin-top: 24rpx;
			padding-top: 16rpx;
			border-top: 1px solid #353535;
			&-left{
				font-size: 26rpx;
				color: #818181;
			}
			&-right{
				image{
					width: 32rpx;
					height: 32rpx;
				}
			}
		}
	}
	.maintitle{
		@include flexLeft;
		margin-top: 44rpx;
		color: #ffffff;
		font-size: 34rpx;
		font-weight: bold;
	}
	.nomore{
		@include flexCenter;
		font-size: 26rpx;
		color: #ffffff;
		margin-top: 56rpx;
	}
</style>
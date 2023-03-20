<template>
	<view>
		<view class="headerbox">
			<view class="headerbox-left">
				<image src="../../static/logo.png" mode=""></image>
				<view class="headerbox-left-title">
					{{$t('index.title')}}
				</view>
			</view>
			<view class="headerbox-right" @click="openlangpop">
				<image src="../../static/langicon.png" mode=""></image>
			</view>
		</view>
		<uni-popup ref="langpopup" type="bottom">
			<view class="langbox">
				<view :class="nowlangcode == item.code ? 'active' : ''" v-for="item in locales"
					@click="onLocaleChange(item)">{{item.text}}</view>
				<view @click="$refs.langpopup.close()">
					{{$t('index.cancel')}}
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	import uniPopup from '@/components/uni-popup/uni-popup.vue';
	export default {
		name: "HeaderCom",
		components: {
			uniPopup
		},
		data() {
			return {
				nowlangcode: '',
			};
		},
		props: {
			
		},
		computed: {
			locales() {
				return [{
						text: this.$t('locale.en'),
						code: 'en'
					}, {
						text: this.$t('locale.zh-hant'),
						code: 'zh-Hant'
					}
				]
			}
		},
		methods: {
			openlangpop() {
				this.$refs.langpopup.open()
			},
			onLocaleChange(e) {
				if (this.isAndroid) {
					uni.showModal({
						content: this.$t('index.language-change-confirm'),
						success: (res) => {
							if (res.confirm) {
								uni.setLocale(e.code);
								this.nowlangcode = e.code;
								this.$i18n.locale = e.code;
								this.$refs.langpopup.close()
							}
						}
					})
				} else {
					uni.setLocale(e.code);
					this.nowlangcode = e.code;
					this.$i18n.locale = e.code;
					this.$refs.langpopup.close()
				}
			}
		}
	}
</script>

<style lang="scss">
	.headerbox {
		@include flexBetween;
		padding: 16rpx 0;

		&-left {
			@include flexCenter;

			image {
				width: 64rpx;
				height: 64rpx;
				border-radius: 50%;
			}

			&-title {
				font-size: 34rpx;
				font-weight: bolder;
				color: #ffffff;
				margin-left: 16rpx;
			}
		}

		&-right {
			@include flexCenter;

			image {
				width: 48rpx;
				height: 48rpx;
				border-radius: 50%;
			}

		}
	}

	.langbox {
		width: 100%;
		background-color: #FFFFFF;

		>view {
			@include flexCenter;
			height: 80rpx;
			border-bottom: 1px solid #f8f8f8;

			&:last-child {
				border: none;
				background-color: #f8f8f8;
			}
		}

		.active {
			color: red;
		}
	}

	::-webkit-scrollbar {
		width: 0px;
	}
</style>

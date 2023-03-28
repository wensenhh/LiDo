<template>
	<view class="container">
		<view class="flex-col flex-auto group_3">
		  <view class="flex-col justify-start group_4">
		    <view class="flex-col section space-y-12">
		      <view class="flex-row items-center group_5 space-x-26">
		        <text class="font_1 text_3">LTT/USDT</text>
		        <view class="flex-row items-center">
		          <text class="text_4">1000.00</text>
		          <text class="font_2 text_5">10%</text>
		          <image
		            class="shrink-0 image_4 image_5"
		            src="https://codefun-proj-user-res-1256085488.cos.ap-guangzhou.myqcloud.com/641bf7ba5a7e3f031045ebb8/642140ff99e5b100119c4d77/16799010419365184245.png"
		          />
		        </view>
		      </view>
		      <view class="grid">
		        <view class="flex-row justify-center items-center grid-item space-x-8">
		          <text class="font_3">我的LTT</text>
		          <text class="font_2">1000.00</text>
		        </view>
		        <view class="flex-row justify-center items-center grid-item space-x-8">
		          <text class="font_3">挖礦算力</text>
		          <text class="font_2">1000.00</text>
		        </view>
		        <view class="flex-row justify-center items-center grid-item space-x-8">
		          <text class="font_3">縂發行</text>
		          <text class="font_2">8400万枚</text>
		        </view>
		        <view class="flex-row justify-center items-center grid-item space-x-8">
		          <text class="font_3">已產出</text>
		          <text class="font_2">8400万枚</text>
		        </view>
		      </view>
		      <view class="flex-row group_6 space-x-6">
		        <text class="font_3">今日預計產出</text>
		        <text class="font_4">10000枚</text>
		      </view>
		    </view>
		  </view>
		  <view class="flex-col justify-start">
		    <view class="flex-col list">
		      <view class="flex-row justify-between items-center list-item" :key="i" v-for="(item, i) in 6">
		        <text class="font_4">全網LTC總額</text>
		        <text class="font_2">1000000.00</text>
		      </view>
		    </view>
		  </view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		}
	}
</script>

<style lang="scss">
.image_4 {
  width: 46.15rpx;
  height: 46.15rpx;
}
.font_1 {
  font-size: 32.69rpx;
  font-family: MiSans;
  color: #ffffff;
}
.group_3 {
  overflow-y: auto;
}
.group_4 {
  padding-top: 26.92rpx;
}
.section {
  margin: 0 30.77rpx;
  padding: 34.62rpx 0 42.31rpx;
  background-color: #272727;
  border-radius: 15.38rpx;
}
.space-y-12 > view:not(:first-child),
.space-y-12 > text:not(:first-child),
.space-y-12 > image:not(:first-child) {
  margin-top: 23.08rpx;
}
.group_5 {
  padding: 0 26.92rpx;
}
.space-x-26 > view:not(:first-child),
.space-x-26 > text:not(:first-child),
.space-x-26 > image:not(:first-child) {
  margin-left: 50rpx;
}
.text_3 {
  line-height: 26.92rpx;
}
.text_4 {
  color: #00ab58;
  font-size: 32.69rpx;
  font-family: MiSans;
  line-height: 26.92rpx;
}
.font_2 {
  font-size: 28.85rpx;
  font-family: MiSans;
  line-height: 23.08rpx;
  color: #dedede;
}
.text_5 {
  color: #00ab58;
}
.image_5 {
  margin-left: 11.54rpx;
}
.grid {
  height: 130.77rpx;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  column-gap: 131.73rpx;
}
.grid-item {
  padding: 19.23rpx 19.23rpx 19.23rpx 23.08rpx;
}
.space-x-8 > view:not(:first-child),
.space-x-8 > text:not(:first-child),
.space-x-8 > image:not(:first-child) {
  margin-left: 15.38rpx;
}
.font_3 {
  font-size: 28.85rpx;
  font-family: MiSans;
  line-height: 26.92rpx;
  color: #808080;
}
.group_6 {
  padding: 0 23.08rpx;
}
.space-x-6 > view:not(:first-child),
.space-x-6 > text:not(:first-child),
.space-x-6 > image:not(:first-child) {
  margin-left: 11.54rpx;
}
.font_4 {
  font-size: 28.85rpx;
  font-family: MiSans;
  line-height: 26.92rpx;
  color: #dedede;
}
.list {
  padding: 23.08rpx 30.77rpx 0;
}
.list-item {
  padding: 53.85rpx 0;
  border-bottom: solid 1.92rpx #353535;
}
</style>

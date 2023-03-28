<template>
	<view class="container">
		<myTeam :iftitle="0" :teamList="headteamList" :invideurl="invideurl"></myTeam>
		<myTeam :bomtype="2" :teamif="0" :teamList="teamList"></myTeam>
	</view>
</template>

<script>
	import myTeam from '@/components/myTeam/myTeam.vue'
	import {
		getMyTeam,
		getMyPush,
		getInvideUrl
	} from '@/api/api.js';
	export default {
		components: {
			myTeam
		},
		data() {
			return {
				address: uni.getStorageSync('address'),
				headteamList: [],
				teamList: [],
				invideurl: '',
			};
		},
		onLoad() {
			this.$tools.loading(this.$t('index.dataloading'),true)
			this.getmyTeam()
			this.getInvide()
		},
		methods: {
			getmyTeam(){
				getMyTeam().then(res => {
					this.headteamList = [res.obj]
					this.getmyPush()
				})
			},
			getmyPush(){
				getMyPush().then(res => {
					this.teamList = res.obj.list
					uni.hideLoading()
				})
			},
			getInvide(){
				getInvideUrl().then(res => {
					this.invideurl = res.obj
				})
			}
		}
	}
</script>

<style lang="scss">

</style>

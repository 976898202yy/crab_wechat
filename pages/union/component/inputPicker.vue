<template>
	<view>
		<view class="input-picker">
			<view @click="siteShow = true" style="margin-right: 10px;">
				<u-input :value="siteName" placeholder="基地名称" disabled disabledColor="#ffffff" border="surround" suffixIcon="arrow-down-fill" suffixIconStyle="color:#1A7CF9"></u-input>
			</view>
			<view @click="pondShow = true">
				<u-input :value="pondName" placeholder="塘口名称" disabled disabledColor="#ffffff" border="surround" suffixIcon="arrow-down-fill" suffixIconStyle="color:#1A7CF9"></u-input>
			</view>
		</view>
		<u-picker :show="siteShow" title="基地名称" :columns="siteList" keyName="siteName" closeOnClickOverlay @cancel="siteShow = false" @confirm="siteConfirm" @close="close"></u-picker>
		<u-picker :show="pondShow" title="塘口名称" :columns="pondList" keyName="name" closeOnClickOverlay @cancel="pondShow = false" @confirm="pondConfirm" @close="close"></u-picker>
	</view>
	
</template>

<script>
	import { findSite, findPond } from '@/api/admin/index'
	export default {
		data(){
			return{
				site: '',   //基地id
				siteName: "",  //基地名称
				pond: "",   //塘口id
				pondName: "",  //塘口名称
				siteShow: false,
				pondShow: false,
				siteList: [],
				pondList:[]
			}
		},
		options: { styleIsolation: 'shared' },
		methods:{
			loadData(){
				let that = this
				that.siteList = []
				findSite().then(res => {
					that.siteList.push(res.data);
					if(uni.getStorageSync('site')){
						that.site = uni.getStorageSync('site')
						that.siteName = uni.getStorageSync('siteName')
					}else{
						that.site = that.siteList[0][0].site
						that.siteName = that.siteList[0][0].siteName
					}
					let data = {
						site: that.site,
						siteName: that.siteName
					}
					that.$emit('site',data);
					that.pondList = []
					findPond(res.data[0].site).then(res => {
						that.pondList.push(res.data)
						if(that.pondList[0].length > 0){
							if(uni.getStorageSync('pond')){
								that.pond = uni.getStorageSync('pond')
								that.pondName = uni.getStorageSync('pondName')
							}else{
								that.pond = that.pondList[0][0].pondId;
								that.pondName = that.pondList[0][0].name;
							}
							let data = {
								pond: that.pond,
								pondName: that.pondName,
							}
							that.$emit('pond',data);
						}
						that.$parent.loadData();
					})
				})
			},
			// 基地选择器
			siteConfirm(e){
				let that = this
				this.site = e.value[0].site
				this.siteName = e.value[0].siteName
				uni.setStorageSync('site',this.site)
				uni.setStorageSync('siteName',this.siteName)
				let data = {
					site: this.site,
					siteName: this.siteName,
					needRefresh: true
				}
				this.$emit('site',data);
				that.pondList = []
				that.pondName = ''
				findPond(this.site).then(res => {
					that.pondList.push(res.data)
					if(that.pondList[0].length > 0){
						that.pond = that.pondList[0][0].pondId;
						that.pondName = that.pondList[0][0].name;
						let data = {
							pond: that.pond,
							pondName: that.pondName,
						}
						that.$emit('pond',data);
					}else{
						let data = {
							pond: '',
							pondName: '',
						}
						that.$emit('pond',data);
					}
				})
				this.siteShow = false
			},
			close(){
				this.siteShow = false
				this.pondShow = false
			},
			// 塘口选择器
			pondConfirm(e){
				let that = this
				this.pond = e.value[0].pondId;
				this.pondName = e.value[0].name;
				uni.setStorageSync('pond',this.pond)
				uni.setStorageSync('pondName',this.pondName)
				let data = {
					pond: this.pond,
					pondName: this.pondName,
					needRefresh: true
				}
				this.$emit('pond',data);
				this.pondShow = false
			},
		}
	}
</script>

<style lang="less">
.input-picker{
	font-family: 'PingFangSC-Medium' !important;
	display: flex;
	align-items: center;
	justify-content: space-between;
	/deep/.u-input--radius{
		box-shadow:0 2px 7px #C3D6EF;
		border-radius: 8px;
		height: 38px;
	}
}
</style>

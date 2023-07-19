<template>
	<view class="my">
		<view class="user">
			<view class="user-info">
				<image :src="portrait" mode=""></image>
				<view style="line-height: 2.2;">
					<view class="user-name">{{info.userName}}</view>
					<view class="user-item">
						<text style="margin-right: 14px;">{{info.enterpriseName}}</text>
						<!-- <text style="margin-right: 14px;">{{info.siteName}}</text> -->
						<text>{{info.roleName}}</text>
					</view>
				</view>
			</view>
		</view>
		<view v-if="info.miniOpenId == 0" class="list-item">
			<view class="list" @click="bind">
				<view class="list-name">
					<image src="../../static/wx-logo.png" mode="aspectFit"></image>
					<text>微信绑定</text>
				</view>
				<view class="iconfont icon-youjiantou1 grey-1"></view>
			</view>
		</view>
		<view class="list-item">
			<navigator class="list" :url="'../../pagesMy/information/information?id='+info.userId">
				<view class="list-name">
					<image src="../../static/information.png" mode="aspectFit"></image>
					<text>个人资料</text>
				</view>
				<view class="iconfont icon-youjiantou1 grey-1"></view>
			</navigator>
			<navigator class="list" url="../../pagesMy/message/message">
				<view class="list-name">
					<image src="../../static/my-message.png" mode="aspectFit"></image>
					<text>我的消息</text>
				</view>
				<view style="display: flex;align-items: center;">
					<uni-badge v-if="value > 0" type="error" :text="value"></uni-badge>
					<view class="iconfont icon-youjiantou1 grey-1"></view>
				</view>
			</navigator>
			<navigator class="list" :url="'../../pagesMy/editPassword/editPassword?id='+info.userId+'&name='+info.userName">
				<view class="list-name">
					<image src="../../static/modify.png" mode="aspectFit"></image>
					<text>修改密码</text>
				</view>
				<view class="iconfont icon-youjiantou1 grey-1"></view>
			</navigator>
			<!-- <navigator class="list">
				<view class="list-name">
					<image src="../../static/about-us.png" mode="aspectFit"></image>
					<text>关于我们</text>
				</view>
				<view class="iconfont icon-youjiantou1 grey-1"></view>
			</navigator> -->
		</view>
		<view class="list-item m-t-12">
			<view class="list" @click="logout">
				<view class="list-name">
					<image src="../../static/exit.png" mode="aspectFit"></image>
					<text>退出登录</text>
				</view>
				<view class="iconfont icon-youjiantou1 grey-1"></view>
			</view>
		</view>
	</view>
</template>

<script>
	let that
	import { mapState } from 'vuex'
	import { bind, myInfo, getCountMsg } from '@/api/admin/my'
	import { logout } from '@/api/auth/logout'
	export default {
		data() {
			return {
				info:{},
				value:0,
				portrait:require("../../pagesMy/static/default.png")
			}
		},
		computed:{
			// ...mapState({
			// 	portrait: state => state.portrait
			// }),
		},
		onLoad(){
			that = this
		},
		onShow(){
			this.loadData()
			getCountMsg().then(res => {
				this.value = res.data
			})
		},
		methods: {
			loadData(){
				myInfo().then(res => {
					this.info = res.data
				})
			},
			bind(){
				uni.showModal({
					title: '是否绑定微信？',
					success:(res) => {
						if (res.confirm){
							uni.getUserProfile({
								desc: 'weixin',
								success: function(res) {
									uni.login({
										provider: "weixin",
										success: function(result) {
											let code = result.code
											bind(code).then(res => {
												if(res.code == 0){
													uni.$u.toast('绑定成功')
													that.loadData()
												}else{
													uni.$u.toast(res.msg)
												}	
											})
										}
									})
								},
								fail: err => {
									console.log(err, '失败授权')
								}
							})
						}else if (res.cancel){
							
						}
					}
				})
			},
			logout(){
				uni.showModal({
					title: '是否退出登录',
					success:(res) => {
						if (res.confirm){
							logout().then(res => {
								if(res.code == 0){
									uni.removeStorageSync('auth');
									uni.removeStorageSync('site');
									uni.removeStorageSync('siteName');
									uni.removeStorageSync('pond');
									uni.removeStorageSync('pondName');
									setTimeout(() => {
										uni.reLaunch({
											url: '/pages/login/login'
										})
									},0)
								}else{
									uni.$u.toast(res.data.msg)
								}
							})
						}else if (res.cancel){
							
						}
					}
				})
				
			}
		}
	}
</script>
<style>
	page{
		background-color: #F3F4F5;
	}
</style>
<style lang="less">
	@import url("my.less");
</style>

<template>
	<view>
		<image src="../../static/login.png" class="bg-img" mode="aspectFill"></image>
		<view class="login-bg">
			<view class="login-top">
				<view class="fz-30">您好,</view>
				<view style="color:#FBF5FF">欢迎使用大闸蟹平台</view>
			</view>
			<view class="user-info">
				<u-input v-model="userName" type="text" placeholder="请输入用户名" clearable></u-input>
				<view class="line"></view>
				<u-input v-model="password" :password="true" placeholder="请输入密码" clearable></u-input>
				<view class="line"></view>
			</view>
			<button class="login-btn login-btn-auth" style="margin-bottom: 25px;" @tap="login()">
				<image style="width: 16px;height: 22px;margin-right: 8px;" mode="aspectFill"
					src="../../static/phone.png" />账号登录
			</button>
			<!-- #ifdef MP-WEIXIN -->
			<button class="login-btn login-btn-auth" open-type="getUserInfo" @tap="wxLogin()">
				<image style="width: 24px;height: 20px;margin-right: 8px;" mode="aspectFill"
					src="../../static/wx-logo.png" />微信登录
			</button>
			<!-- #endif -->
			<!-- <view class="footer" @click="checked">
				<u-icon name="checkmark-circle" color="#ffffff" size="18"></u-icon>
				<u-icon v-if="isChecked" name="checkmark-circle-fill" color="#ffffff" size="18"></u-icon>
				<text class="white">登录即同意</text>
				<text class="orange">用户协议</text>
				<text class="white">和</text>
				<text class="orange">隐私政策</text>
			</view> -->
		</view>
	</view>

</template>

<script>
import {mapMutations} from 'vuex'
let that
	export default {
		data() {
			return {
				userName: '',
				password: '',
				isChecked: false
			}
		},
		onLoad() {
			that = this
		},
		methods: {
			...mapMutations(['SET_Auth']),
			checked() {
				that.isChecked = !that.isChecked;
			},
			login() {    // 账号登录
				const user = this.$util.encryption({
					data:{
						username: that.userName,
						password: that.password,
						scope: 'server'
					},
					key:'pigxpigxpigxpigx',
					param: ['password']
				})
				let headers = {
					'Authorization': 'Basic d3g6d3hzYw==',
					'content-type': 'application/x-www-form-urlencoded'
				}
				uni.request({
					url: `${this.$url}/auth/oauth/token?grant_type=password`,
					method:'POST',
					data:{
						username: user.username,
						password: user.password,
						scope: user.scope
					},
					header:headers,
					success:(res)=>{
						if(res.data.code == 1){
							uni.$u.toast(res.data.msg)
						}else{
							let auth = {
								'access_token': res.data.access_token,
								'refresh_token': res.data.refresh_token,
								'bindType': '1',
								'code': that.userName
							}
							this.SET_Auth(auth)
							uni.switchTab({
								url: '../index/index',
								success: function(e) {
									let page = getCurrentPages().pop(); //跳转页面成功之后
									if (!page) return; 
									page.onLoad(); //如果页面存在，则重新刷新页面
								}
							})
						}
					},
					fail: (err) => {console.log(err)}
				})
			},
			wxLogin() {   // 微信授权
				uni.getUserProfile({
					desc: 'weixin',
					success: function(res) {
						uni.login({
							provider: "weixin",
							success: function(res) {
								let code = res.code
								let headers = {
									'Authorization': 'Basic d3g6d3hzYw==',
									'content-type': 'application/x-www-form-urlencoded'
								}
								uni.request({
									url: `${that.$url}/auth/mobile/token/social?grant_type=mobile&mobile=MINI@${code}`,
									method:'POST',
									header:headers,
									success:(res)=>{
										if(res.data.code == 1){
											uni.$u.toast(res.data.msg)
										}else{
											let auth = {
												'access_token': res.data.access_token,
												'bindType': 'MINI',
												'code': code
											}
											that.SET_Auth(auth)
											uni.switchTab({
												url: '../index/index'
											})
										}	
									},
									fail: (err) => {console.log(err)}
								})
							}
						})
					},
					fail: err => {
						console.log(err, '失败授权')
					}
				})
			}
		}
	}
</script>

<style lang="less">
	@import url("login.less");
</style>

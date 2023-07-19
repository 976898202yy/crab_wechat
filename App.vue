<script>
	import {mapMutations} from 'vuex'
	export default {
		onLaunch: function() {
			try{
				const value = uni.getStorageSync('auth');
				let auth = JSON.parse(value)
				let headers = {
					'Authorization': 'Basic d3g6d3hzYw==',
					'content-type': 'application/x-www-form-urlencoded'
				}
				uni.request({
					url: `${this.$url}/auth/oauth/check_token?token=` + auth.access_token,
					method:'GET',
					header:headers,
					success:(res)=>{
						if(res.statusCode == 200){
							this.SET_Auth(auth)
						}
						if(res.statusCode == 424){
							uni.reLaunch({
								url: 'pages/login/login'
							})		
							setTimeout(() => {
								uni.showToast({
									icon: 'none',
									duration: 3000,
									title: '令牌状态已过期，请重新登录'
								});
							},0)
						}
					},
					fail: (err) => {}
				})
			}catch(e){
				setTimeout(() => {
					uni.reLaunch({
						url: 'pages/login/login'
					})
				},0)									
				uni.showToast({
					icon: 'none',
					duration: 3000,
					title: '令牌状态已过期，请重新登录'
				})
			}
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		},
		methods:{
			...mapMutations(['SET_Auth'])
		}
	}
</script>

<style lang="less">
	/* 注意要写在第一行，同时给style标签加入lang="scss"属性 */
	@import url("./style.less");
</style>

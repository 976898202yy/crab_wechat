
import url from '../config.js'

function service(options = {}) {
	let auth
	options.url = `${url}${options.url}`;
	if(uni.getStorageSync('auth')){
		auth = JSON.parse(uni.getStorageSync('auth'))
	}else{
		uni.reLaunch({
			url: '/pages/login/login'
		})
	}
	//配置请求头
	options.header = {
		'Authorization': `Bearer ${auth.access_token}`,
		// 'content-type': 'application/x-www-form-urlencoded'
		'content-type': 'application/json'
	};
	return new Promise((resolved, rejected) => {
		//成功
		options.success = (res) => {
			if (Number(res.statusCode) === 200) { //请求成功
				resolved(res.data);
			} 
			if(Number(res.statusCode) === 424){  //令牌过期的特殊响应码
				uni.reLaunch({
					url: '/pages/login/login'
				})
				uni.showToast({
					icon: 'none',
					duration: 8000,
					title: '令牌状态已过期，请重新登录'
				});
			}
			if(res.data.code == 1) {
				uni.showToast({
					icon: 'none',
					duration: 3000,
					title: `${res.data.msg}`
				});
				rejected(res.data.msg); //错误
			}
		}
		//错误
		options.fail = (err) => {
			if(err.response.status !== 200){
				uni.showToast({
					icon: 'none',
					duration: 3000,
					title: '接口错误'
				});
			}
			rejected(err); //错误
		}
		uni.request(options);
	});
}
export default service;

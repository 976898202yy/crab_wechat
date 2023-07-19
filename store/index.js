import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const store = new Vuex.Store({
	state:{
		access_token: '',
		refresh_token: '',
	},
	mutations:{
		SET_Auth(state,auth_info){
			state.access_token = auth_info.access_token;
			state.refresh_token = auth_info.refresh_token;
			let auth = JSON.stringify(auth_info)
			uni.setStorageSync('auth', auth)
		}
	},
	actions:{}
})

export default store
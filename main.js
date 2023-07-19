
// #ifndef VUE3
import Vue from 'vue'
import App from './App'
//引入vuex
import store from './store'
//把vuex定义成全局组件
Vue.prototype.$store = store
import './font/iconfont.css'
import uView from '@/uni_modules/uview-ui'
Vue.use(uView)

import url from './config.js'
Vue.prototype.$url = url;
import util from './utils/index.js'
Vue.prototype.$util=util;

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
    ...App,
	store
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
import App from './App.vue'
export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
}
// #endif
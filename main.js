import App from './App'
import messages from './locale/index'
import tools from './common/tools.js'
import Web3 from 'web3'
import axios from 'axios'
import webUrl from './common/url.js'
 
let i18nConfig = {
  locale: uni.getLocale(),
  messages
}

Vue.prototype.$tools=tools
Vue.prototype.Web3 = Web3
Vue.prototype.$axios = axios

// 隐藏地址
Vue.filter('hideaddress',(addr) => {
	return addr.slice(0,10) + '***' + addr.slice(-6)
})

// #ifndef VUE3
import Vue from 'vue'
import VueI18n from 'vue-i18n'
Vue.use(VueI18n)
const i18n = new VueI18n(i18nConfig)
Vue.config.productionTip = false
App.mpType = 'app'
const app = new Vue({
  i18n,
  ...App
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
import { createI18n } from 'vue-i18n'
const i18n = createI18n(i18nConfig)
export function createApp() {
  const app = createSSRApp(App)
  app.use(i18n)
  return {
    app
  }
}
// #endif

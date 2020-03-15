import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import axios from 'axios'

// 引入重置css样式
import '@/assets/less/common.less'
// 设置axios的全局默认地址
// axios.defaults.baseURL = 'http://localhost:8888/api/private/v1/'
// 将axios挂载到vue的原型上
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
Vue.prototype.$axios = axios

Vue.use(ElementUI)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import axios from 'axios'
import RestaurantHeader from './components/RestaurantHeader.vue'

// 引入重置css样式
import '@/assets/less/common.less'
import '@/assets/less/element-trans.less'

const config = {
  baseURL: process.env.NODE_ENV === 'production' ? 'http://www.kaico.site:1819/orderingmeals' : '',
  timeout: 13 * 1000, // Timeout
  withCredentials: true // Check cross-site Access-Control
}
const _axios = axios.create(config)
console.log('asdfasdf', _axios.defaults.baseURL)
Vue.prototype.configApi = _axios.defaults.baseURL

// 添加请求拦截器
_axios.interceptors.request.use(config => {
  config.headers.Authorization = sessionStorage.getItem('sessionId')
  return config
}, error => {
  return Promise.reject(error)
})
// 添加响应拦截器
_axios.interceptors.response.use(response => {
  response = response.data
  if (response.code === 201) {
    sessionStorage.removeItem('token')
    router.push('/login')
    this.$message.error('请重新登录')
  }
  return response
}, error => {
  return Promise.reject(error)
})
// 将axios挂载到vue的原型上
_axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
Vue.prototype.$axios = _axios

Vue.use(ElementUI)
Vue.component(RestaurantHeader.name, RestaurantHeader)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

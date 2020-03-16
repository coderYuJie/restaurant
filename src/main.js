import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import axios from 'axios'
import RestaurantHeader from './components/RestaurantHeader.vue'

// 引入重置css样式
import '@/assets/less/common.less'
// 添加请求拦截器
axios.interceptors.request.use(config => {
  // 在发送请求之前做些什么
  config.headers.Authorization = sessionStorage.getItem('sessionId')
  return config
}, error => {
  // 对请求错误做些什么
  return Promise.reject(error)
})
// 添加响应拦截器
axios.interceptors.response.use(response => {
  // 对响应数据做点什么
  response = response.data
  if (response.code === 201) {
    sessionStorage.removeItem('token')
    router.push('/login')
    this.$message.error('请重新登录')
  }
  return response
}, error => {
  // 对响应错误做点什么
  return Promise.reject(error)
})
// 将axios挂载到vue的原型上
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
Vue.prototype.$axios = axios

Vue.use(ElementUI)
Vue.component(RestaurantHeader.name, RestaurantHeader)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

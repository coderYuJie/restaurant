import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from '@/views/Index.vue'
import Login from '@/views/Login.vue'
import diningDetail from '@/views/dining-detail.vue'
import merchantDetail from '@/views/merchant-detail.vue'
import Personal from '@/views/Personal.vue'
import Order from '@/views/order.vue'
import UserManagement from '@/views/UserManagement.vue'
import Statistics from '../views/Statistics.vue'

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push (location) {
  return originalPush.call(this, location).catch(err => err)
}

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/index'
  },
  {
    path: '/index',
    name: 'Index',
    component: Index
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  // 餐厅详情
  {
    path: '/dining-detail',
    name: 'diningDetail',
    component: diningDetail
  },
  // 商户-查看自己的餐厅详情 merchantDetail
  {
    path: '/merchant-detail',
    name: 'merchantDetail',
    component: merchantDetail
  },
  {
    path: '/personal',
    name: 'Personal',
    component: Personal
  },
  // 用户-个人订单
  {
    path: '/Order',
    name: 'Order',
    component: Order
  },
  {
    path: '/userManagement',
    name: 'UserManagement',
    component: UserManagement
  },
  {
    path: '/statistics',
    name: 'Statistics',
    component: Statistics
  }

  // {
  //   path: '/about',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
]

const router = new VueRouter({
  routes
  // mode: 'history'
})

export default router

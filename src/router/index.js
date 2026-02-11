import Vue from 'vue'
import VueRouter from 'vue-router'

import Login from '@/views/login'
import Layout from '@/views/layout'
import Search from '@/views/search'
import SearchList from '@/views/search/list'
import ProDetail from '@/views/prodetail'
import Pay from '@/views/pay'
import MyOrder from '@/views/myorder'

import store from '@/store'

// 二級路由
import Category from '@/views/layout/category.vue'
import Cart from '@/views/layout/cart.vue'
import User from '@/views/layout/user.vue'
import Home from '@/views/layout/home.vue'

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    {
      path: '/login',
      component: Login
    },
    {
      path: '/',
      component: Layout,
      redirect: '/home',
      children: [
        {
          path: '/home', component: Home
        },
        {
          path: '/category', component: Category
        },
        {
          path: '/cart', component: Cart
        },
        {
          path: '/user', component: User
        }
      ]
    },
    {
      path: '/search',
      component: Search
    },
    {
      path: '/searchlist',
      component: SearchList
    },
    // 動態路由傳參
    {
      path: '/prodetail/:id',
      component: ProDetail
    },
    {
      path: '/pay',
      component: Pay
    },
    {
      path: '/myorder',
      component: MyOrder
    }
  ]
})

// 路由守衛(全局前置)
// 核心邏輯：1.游客需登錄才能訪問 pay / myorder 2.游客和用戶的區別：登錄權證 token
// 第一步：定義一個數組 專門儲存需要權限才能訪問的頁面
const authUrls = ['/pay', '/myorder']
router.beforeEach((to, from, next) => {
  // 第二步：非權限頁面直接放行
  if (!authUrls.includes(to.path)) {
    next()
  }

  // 第三步：權限頁面通過token判斷是否放行
  const token = store.getters.token
  if (token) {
    next()
  } else {
    next('login')
  }
})

export default router

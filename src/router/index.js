import Vue from 'vue'
import Router from 'vue-router'

import Login from '@/views/login'

import Index from '@/layouts/index'

import User from '@/views/UserManage/index'
import New from '@/views/NewsManage/index'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/',
      name: 'Index',
      component: Index,
      redirect: { path: 'user' },
      children: [
        { path: 'user', name: 'User', component: User },
        { path: 'new', name: 'New', component: New }
      ]
    }
  ]
})

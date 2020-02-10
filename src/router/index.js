import Vue from 'vue'
import Router from 'vue-router'
import Head from '@/components/Head-t'
import Index from '@/components/Index'
import Cart from '@/components/Cart.vue'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect:'/index'
    },
    {
      path: '/head',
      name: 'head',
      component: Head
    },
    {
      path: '/index',
      name: 'index',
      component: Index
    },
    {
      path: '/cart',
      name: 'cart',
      component: Cart
    }
  ]
})

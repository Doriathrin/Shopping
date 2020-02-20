import Vue from 'vue'
import Router from 'vue-router'
import Head from '@/components/Head-t'
import Index from '@/components/Index'
import Cart from '@/components/Cart'
import Address from '@/components/Address-d'
import orderConfirm from '@/components/orderConfirm'
import orderSuccess from '@/components/orderSuccess'
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
    },
    {
      path: '/address',
      name: 'address',
      component: Address
    },
    {
      path: '/orderConfirm',
      name: 'orderConfirm',
      component: orderConfirm
    },
    {
      path: '/orderSuccess',
      name: 'orderSuccess',
      component: orderSuccess
    }
  ]
})

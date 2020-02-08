// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import vueResource from 'vue-resource'
import store from '../store/store'
import VueLazyLoad from 'vue-lazyload'
import infiniteScroll from 'vue-infinite-scroll'
import ElementUI from 'element-ui'

import 'element-ui/lib/theme-chalk/index.css'

Vue.use(ElementUI)
Vue.use(infiniteScroll)
Vue.use(vueResource)
Vue.use(VueLazyLoad, {
  loading: '../static/lazy/loading-bars.svg'
});
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: {
    App
  },
  template: '<App/>'
})

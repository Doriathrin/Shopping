import Vue from 'vue'
import vuex from 'vuex'
Vue.use(vuex)
var store = new vuex.Store({
  state: {
    nickName:'',
    cartCount: 0
  },
  mutations: {
    updateUserInfo(state, nickName) {
      state.nickName = nickName;
    }, 
    updateCartCount(state, cartCount) {
      state.cartCount += cartCount;
    },
    initCartCount (state, cartCount) {
      state.cartCount = cartCount
    }
  }
})
export default store

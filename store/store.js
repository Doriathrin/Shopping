import Vue from 'vue'
import vuex from 'vuex'
Vue.use(vuex)
var store = new vuex.Store({
  state: {
    list: JSON.parse(localStorage.getItem('list')) || []
  },
  mutations: {
    jia(state, k) {
      if (state.list.length == 0) {
        k.num = 1;
        state.list.unshift(k);
      } else {
        for (var i of state.list) {
          if (i.productId == k.productId) {
            i.num++;
            localStorage.setItem('list', JSON.stringify(state.list))
            return;
          }
        }
        k.num = 1;
        state.list.unshift(k);
      }
      localStorage.setItem('list', JSON.stringify(state.list))
    },
    shan(state, key) {
      state.list.splice(key, 1)
      localStorage.setItem('list', JSON.stringify(state.list))
    },
    tian(state, key) {
      state.list[key].num++;
      localStorage.setItem('list', JSON.stringify(state.list))
    },
    shao(state, key) {
      if (state.list[key].num > 1) {
        state.list[key].num--; 
      } else {
        return false;
      }
      localStorage.setItem('list', JSON.stringify(state.list))
    },
    quan (state, e) {
      Array.from(document.getElementsByClassName('a')).forEach(add => {
        add.checked=e.target.checked
      })
    },
    qs (state, key) {
      state.list.splice(key);
      localStorage.setItem('list', JSON.stringify(state.list))
    }
  },
  getters: {
    count(state, key) {
      let zong = 0;
      state.list.forEach((v) => {
        zong += v.salePrice * v.num
      })
      return zong
    }
  }
})
export default store

import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: JSON.parse(window.localStorage.getItem('user') || 'null'),
    routes: []
  },
  mutations: {
    setUser (state, payload) {
      // 接口返回的content是字符串
      state.user = JSON.parse(payload)
      window.localStorage.setItem('user', payload)
    },
    setRoutes (state, payload) {
      // 接口返回的content是字符串
      state.routes = payload
      // window.localStorage.setItem('user', payload)
    }
  },
  actions: {
  },
  modules: {
  }
})

import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'

import './style.css'

Vue.config.productionTip = false

import http from './http'
Vue.prototype.$http = http

// 代码块，可以让每一个 vue的实例都可以使用
Vue.mixin({
  computed: {
    uploadUrl() {
      return this.$http.defaults.baseURL + '/upload'
    }
  },
  methods: {
    getAuthHeaders() {
      return localStorage.token
    }
  }
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

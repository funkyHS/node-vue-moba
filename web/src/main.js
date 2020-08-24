import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false

// 样式
import './assets/scss/style.scss'
// iconfont
import './assets/iconfont/iconfont.css'

// swiper
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/css/swiper.css'
Vue.use(VueAwesomeSwiper, /* { default options with global component } */)

// 全局组件-卡片
import Card from './components/Card.vue'
Vue.component('m-card',Card)
import ListCard from './components/ListCard.vue'
Vue.component('m-list-card',ListCard)


// axios
import axios from 'axios'
Vue.prototype.$http = axios.create({
  baseURL: 'http://localhost:3000/web/api'
})


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

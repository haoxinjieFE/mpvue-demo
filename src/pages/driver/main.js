import Vue from 'vue'
import App from './index'
import store from '@/stores'
const app = new Vue({
  store,
  ...App
})
app.$mount()

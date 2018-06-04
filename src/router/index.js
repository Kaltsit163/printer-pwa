import Vue from 'vue'
import Router from 'vue-router'
import Dingding from '@/view/dingding/index'

Vue.use(Router)

export default new Router({
  routes: [{
    path: '/',
    name: 'Dingding',
    component: Dingding
  }]
})

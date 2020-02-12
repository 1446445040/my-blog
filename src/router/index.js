import Vue from 'vue'
import VueRouter from 'vue-router'
import admin from './admin'

Vue.use(VueRouter)

const routes = [
  admin,
  {
    path: '/',
    name: 'home',
    component: () => import(/* webpackChunkName: "home" */'../views/Home.vue')
  },
  {
    path: '/articles/:date',
    name: 'articles',
    component: () => import(/* webpackChunkName: "articles" */'../views/Articles.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router

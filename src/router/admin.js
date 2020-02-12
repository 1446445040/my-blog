import Vue from 'vue'
import { admin } from '../api'

export default {
  path: '/admin',
  name: 'admin',
  component: () => import(/* webpackChunkName: "admin" */'../views/admin/index'),
  beforeEnter: validate,
  children: [
    {
      path: 'add',
      name: 'add',
      component: () => import(/* webpackChunkName: "addArticle" */'../views/admin/AddArticle.vue')
    },
    {
      path: 'list',
      name: 'list',
      component: () => import(/* webpackChunkName: "articleList" */'../components/ArticleList.vue')
    },
    {
      path: 'user',
      name: 'user',
      component: () => import(/* webpackChunkName: "UserInfo" */'../views/admin/UserInfo.vue')
    }
  ]
}
// eslint-disable-next-line no-unused-vars
function validate (to, from, next) {
  const vm = new Vue()
  admin({
    password: prompt('请输入密码')
  }).then(() => {
    vm.$Message.success('验证成功')
    next()
  }).catch(e => {
    vm.$Message.error({
      background: true,
      content: '密码错误'
    })
    next({ name: 'home' })
  })
}

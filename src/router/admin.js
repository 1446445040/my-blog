import Vue from 'vue'
import { admin } from '../api'

export default {
  path: '/admin',
  name: 'admin',
  component: () => import(/* webpackChunkName: "admin" */'../views/admin/index'),
  // beforeEnter: validate,
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
  let loading = null
  vm.$prompt('请输入密码：', '提示', {
    confirmButtonText: '确认',
    cancelButtonText: '取消'
  }).then(({ value }) => {
    loading = vm.$loading({
      lock: true,
      text: '请稍后...',
      spinner: 'el-icon-loading',
      background: 'rgba(255, 255, 255, 0.7)'
    })
    return admin({
      password: value
    })
  }).then(() => {
    vm.$message({
      type: 'success',
      message: '验证成功'
    })
    next()
  }).catch(e => {
    vm.$message({
      type: 'error',
      message: '密码错误'
    })
    next(false)
  }).finally(() => {
    loading.close()
  })
}

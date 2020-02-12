/**
 * 通过mutations间接更新state，这里的方法可以是异步的
 */
import {
  getArticleList, getUserInfo
} from '../api'
import type from './mutation-types'

export default {
  // 读取待提交清单信息
  [type.GET_ARTICLES_LIST] ({ commit }) {
    getArticleList().then(({ data }) => {
      commit(type.GET_ARTICLES_LIST, data)
    }).catch(e => e)
  },
  [type.GET_USER_INFO] ({ commit }) {
    getUserInfo().then(({ data }) => {
      commit(type.GET_USER_INFO, data)
    }).catch(e => e)
  }
}

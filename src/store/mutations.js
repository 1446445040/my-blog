/**
 * mutations直接修改数据对象state，注意这里的方法必须是同步方法
 */
import type from './mutation-types'

export default {
  // 设置文章信息
  [type.GET_ARTICLES_LIST] (state, data) {
    state.articles = data
  },
  [type.GET_USER_INFO] (state, data) {
    state.userInfo = data
  }
}

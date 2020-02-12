<template>
  <div class="list-container">
    <List item-layout="vertical">
      <ListItem
        class="list-item"
        v-for="(item, index) in articles"
        :key="index"
        :header="item.title"
      >
        <div class="header" @click="onClick(item, index)">
          {{item.title}}
        </div>
        <p>{{item.summary}}</p>
        <div class="footer">
          <time>{{format(item.date)}}</time>
          <Tag
            class="tags"
            type="dot"
            v-for="(tag, index) in item.tags"
            :key="index"
            :color="getType()"
          >
            {{tag}}
          </Tag>
        </div>
      </ListItem>
      <ListItem>
        <ListItemMeta avatar="https://dev-file.iviewui.com/userinfoPDvn9gKWYihR24SpgC319vXY8qniCqj4/avatar" title="This is title" description="This is description, this is description." />
      </ListItem>
    </List>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import _ from 'lodash'
import moment from 'moment'

export default {
  name: 'ArticleList',
  computed: mapState({
    articles: 'articles'
  }),
  methods: {
    format (time) {
      return moment(time).format('YYYY-MM-DD')
    },
    getType () {
      const types = ['success', 'primary', 'warning', 'error']
      return _.sample(types)
    },
    onClick (article, index) {
      this.$emit('myClick', article, index)
    }
  }
}
</script>

<style scoped lang="stylus">
  text()
    white-space nowrap
    overflow hidden
    text-overflow ellipsis
  .list-container
    width max-content
    padding 10px
    margin 0 auto
  .list-item
    max-width 720px
    margin 10px 0
    .header
      font-size 20px
      font-weight bold
      cursor pointer
      &:hover
        text-decoration underline
    >>> .el-card__header
      padding 10px 5px
    >>> .el-card__body
      padding 10px
    .tags
      margin 0 10px
  .item
    display flex
    justify-content space-around
    width 500px
    height 100px
    margin 10px auto
    padding 10px
    border 1px solid lightgrey
    box-shadow 0 0 5px lightgrey
    border-radius 5px
    cursor pointer
  .left
    width 25%
    img
      width 80px
      border-radius 80px
  .right
    display flex
    flex-direction column
    justify-content space-around
    width 75%
    .title
      font-size 20px
      font-weight bold
      text()
    .summary
      max-height 50%
      margin 0
      color grey
      font-size 15px
      line-height 1em
      overflow hidden
</style>

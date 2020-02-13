<template>
  <div class="list-container">
    <List item-layout="vertical">
      <ListItem
        class="list-item"
        v-for="(item, index) in articles"
        :key="index"
        :header="item.title"
      >
        <header class="header" @click="onClick(item, index)">
          {{item.title}}
        </header>
        <main class="body">{{item.summary}}</main>
        <footer class="footer">
          <Time :time="item.date" type="date"/>
          <Tag
            class="tags"
            type="dot"
            v-for="(tag, index) in item.tags"
            :key="index"
            :color="color()"
          >
            {{tag}}
          </Tag>
        </footer>
      </ListItem>
    </List>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import _ from 'lodash'

export default {
  name: 'ArticleList',
  computed: mapState({
    articles: 'articles'
  }),
  methods: {
    color () {
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
    padding 10px
    max-width 720px
    min-height 100vh
    margin 0 auto
  .list-item
    margin 10px 0
    .header
      font-size 20px
      font-weight bold
      cursor pointer
      &:hover
        text-decoration underline
    .body
      margin 10px 0
    .tags
      margin 0 10px
</style>

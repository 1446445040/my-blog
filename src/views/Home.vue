<template>
  <div class="page">
    <article-list  @myClick="preview"/>
  </div>
</template>

<script>
import type from '../store/mutation-types'
import { mapState } from 'vuex'
import ArticleList from '../components/ArticleList'

export default {
  name: 'Home',
  components: { ArticleList },
  data () {
    return {
      mode: 'horizontal'
    }
  },
  computed: mapState({
    articles: 'articles'
  }),
  methods: {
    preview (article, index) {
      this.$router.push({
        path: '/articles/' + article.date,
        params: {
          date: article.date
        }
      })
    }
  },
  mounted () {
    this.$store.dispatch(type.GET_ARTICLES_LIST)
  }
}
</script>

<style scoped lang="stylus">
  .page
    width max-content
    margin 0 auto
    background-color white
  @media only screen and (max-width: 720px)
    .page
      width 100%
</style>

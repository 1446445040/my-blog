<template>
  <div class="page" v-show="showArticle">
    <!--文章区域-->
    <article
      class="content"
      v-html="content"
      ref="content"
    />

    <!--目录区域-->
    <nav class="catalogue">
      <p style="margin: 0 0 0 5px">目录</p>
      <ul v-html="catalogue" ref="catalogue"/>
    </nav>

  </div>
</template>

<script>
import $ from 'jquery'
import _ from 'lodash'
import { getArticle } from '../api'

export default {
  name: 'Article',
  data () {
    return {
      showArticle: false,
      content: '',
      catalogue: '',
      cataItems: [],
      curHeader: 0,
      list: []
    }
  },
  watch: {
    curHeader (newVal, oldVal) {
      try {
        $(this.cataItems[oldVal]).removeClass('active')
      } catch (e) {}
      $(this.cataItems[newVal]).addClass('active')
    }
  },
  methods: {
    highlight () {
      this.$Loading.start()
      this.$once('finish', () => {
        this.$Loading.finish()
      })
      this.$on('hook:destroyed', () => {
        this.$Loading.destroy()
      })
      const blocks = this.$refs.content.querySelectorAll('pre code')
      const codes = blocks.map(node => node.textContent)
      const worker = new Worker('/workers/hl.worker.js')
      worker.postMessage(codes)
      worker.onmessage = event => {
        const lightedHTML = event.data
        lightedHTML.forEach((html, index) => {
          blocks[index].innerHTML = html
        })
        worker.terminate() // 关闭worker
        this.$emit('finish')
      }
    },
    reset () {
      // 重置dom元素属性
      this.$refs.content.querySelectorAll('h1, h2, h3').forEach((h, index) => {
        h.id = `header-${index + 1}`
      })
      this.$refs.content.querySelectorAll('a').forEach(a => {
        a.setAttribute('target', 'blank')
      })
    },
    bindScroll () {
      const list = this.$refs.content.querySelectorAll('h1, h2, h3')
      const handler = event => {
        const scrollTop = $(document).scrollTop()
        list.forEach((item, index) => {
          if (scrollTop > item.offsetTop) {
            this.curHeader = index
          }
        })
      }
      window.onscroll = _.throttle(handler, 100)
      this.$on('hook:destroyed', () => {
        window.onscroll = null
      })
    },
    analyze () {
      const div = document.createElement('div')
      div.innerHTML = this.content
      const list = []
      div.querySelectorAll('h1, h2, h3').forEach((h, index) => {
        const id = `header-${index + 1}`
        if (h.nodeName.endsWith('1')) {
          list.push({
            id: id,
            level: 1,
            className: 'title-1',
            content: h.textContent
          })
        } else if (h.nodeName.endsWith('2')) {
          list.push({
            id: id,
            level: 2,
            className: 'title-2',
            content: h.textContent
          })
        } else if (h.nodeName.endsWith('3')) {
          list.push({
            id: id,
            level: 3,
            className: 'title-3',
            content: h.textContent
          })
        }
      })
      return list
    },
    createCatalogue () {
      const temp1 = []
      const temp2 = []
      const temp3 = []
      this.analyze().forEach((item, index, arr) => {
        const li = `
          <li class="${item.className} ${item.id}"}">
              <a href="#${item.id}">${item.content}</a>
          </li>
        `
        if (item.level === 1) {
          // 往1里面放东西的时候先判断二三级标题是否不为空
          if (temp2.length !== 0 && temp3.length !== 0) {
            temp2.push(`<ul>${temp3.join('')}</ul>`) // 打包3放进2
            temp3.splice(0)
            temp1.push(`<ul>${temp2.join('')}</ul>`) // 打包2放进1
            temp2.splice(0)
          } else if (temp2.length === 0 && temp3.length !== 0) {
            temp1.push(`<ul>${temp3.join('')}</ul>`) // 打包3放进1
            temp3.splice(0)
          } else if (temp2.length !== 0 && temp3.length === 0) {
            temp1.push(`<ul>${temp2.join('')}</ul>`) // 打包2放进1
            temp2.splice(0)
          }
          temp1.push(li)
        } else if (item.level === 2) {
          // 先判断三级标题有没有，有的话就嵌套进来
          if (temp3.length !== 0) {
            temp2.push(`<ul>${temp3.join('')}</ul>`)
            temp3.splice(0)
          }
          temp2.push(li)
        } else if (item.level === 3) {
          temp3.push(li)
        }
        if (arr.length - 1 === index) {
          if (temp3.length !== 0) {
            temp2.push(`<ul>${temp3.join('')}</ul>`)
            temp3.splice(0)
          }
          temp1.push(`<ul>${temp2.join('')}</ul>`)
          temp2.splice(0)
        }
      })
      this.catalogue = temp1.join('') // 触发dom更新
      this.$nextTick(() => {
        this.cataItems = this.$refs.catalogue.querySelectorAll('li')
      })
    }
  },
  created () {
    this.$Message.loading('正在加载')
    const { date } = this.$route.params
    getArticle(date).then(({ data }) => {
      this.content = data
      this.$nextTick(() => {
        this.showArticle = true // 合适的时机显示，防止页面显示不全影响体验
        this.highlight() // 高亮代码块
        this.createCatalogue() // 创建目录
        this.bindScroll() // 滚动监听
        this.reset() // 设置部分dom元素的属性
      })
    })
  }
}
</script>

<style scoped lang="stylus">
  @import "../../node_modules/highlight.js/styles/default.css"
  @import "../../node_modules/highlight.js/styles/tomorrow.css"
  $bgColor = #F5F2F0
  /**
   * 滚动条通用样式
   */
  scroll()
    &::-webkit-scrollbar
      /*滚动条整体样式*/
      width : 5px;  /*高宽分别对应横竖滚动条的尺寸*/
      height: 5px;
    &::-webkit-scrollbar-thumb
      /*滚动条里面小方块*/
      border-radius 10px
      background #C1C1C1
      &:hover
        background-color #D6D6D6
    &::-webkit-scrollbar-track
      /*滚动条里面轨道*/
      border-radius 10px
      background #F1F1F1
  /**
   * 文章通用样式
   */
  .content >>> &
    max-width 720px
    margin 0 auto
    padding 20px
    font-size 16px
    line-height 1.7em
    background-color white
    box-sizing border-box
    h1, h2
      margin 20px 0
    ol
      padding-left 30px
      margin 10px 0
    img
      width 100%
      max-height 250px
      object-fit contain
    a, a:visited {
      color: #4183C4;
      background-color: inherit;
      text-decoration: none;
    }
    a:hover
      text-decoration underline
    p
      margin 15px 0
    blockquote
      padding 15px
      margin 10px 0
      border-left 5px solid #42B983
      background-color $bgColor
    pre
      overflow auto
      padding 10px
      background-color $bgColor
      border-radius 5px
      scroll()
    code
      line-height 1.5em
      background-color $bgColor
      font-family Consolas,Monaco,Andale,Mono,Ubuntu,Mono,monospace
  /**
   * 目录样式
   */
  $grey = #EBEDEF
  .catalogue >>> &
    position sticky
    top 0
    padding 10px
    width 200px
    font-size 0.9em
    a, a:visited {
      color: black;
      background-color: inherit;
      text-decoration: none;
    }
    a
      display block
      position relative
      padding 8px 20px
      white-space nowrap
      overflow hidden
      text-overflow ellipsis
    // 激活样式
    .active
      background-color $grey
      &>a
        color #34A0EF
    ul
      position relative
      width 100%
      padding 0
      li
        margin 0
        list-style none
      li:hover
        background-color $grey
        &>a
          color #34A0EF
      &::before
        content ""
        position absolute
        left 7px
        width 2px
        height 100%
        background-color $grey
    /**
     * 分别对应三级标题的样式
     */
    point($scale)
      content ""
      position absolute
      left 5px
      top 12px
      background-color black
      width $scale
      height $scale
      border-radius $scale
    .title-1
      font-weight bold
      &>a::before
        point(6px)
    .title-2
      padding-left 20px
      &>a::before
        point(5px)
    .title-3
      padding-left 40px
      &>a::before
        point(4px)
  /**
   * 控制目录的显示和隐藏
   */
  .page
    display flex
    align-items flex-start
    width min-content
    margin 0 auto
  @media only screen and (max-width: 900px)
    .catalogue
      display none
    .page, .content >>> &
      width 100%
</style>

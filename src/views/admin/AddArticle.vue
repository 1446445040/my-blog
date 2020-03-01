<template>
  <div class="page">
    <Form class="form" :model="form">
      <form-item label="标题">
        <Input v-model="form.title" />
      </form-item>
      <form-item label="标签">
        <Tag
          v-for="(tag, index) in form.tags"
          :key="index"
          closable
          type="dot"
          @on-close="handleClose(index, tag)"
        >
          {{tag}}
        </Tag>
        <Input
          class="input-new-tag"
          v-if="inputVisible"
          v-model="inputValue"
          ref="saveTagInput"
          @on-enter="handleInputConfirm"
          @on-blur="handleInputConfirm"
        />
        <Button
          v-else
          class="button-new-tag"
          size="small"
          @click="showInput"
        >+ New Tag</Button>
      </form-item>
      <form-item label="内容">
        <Input
          class="content-input"
          type="textarea"
          v-model="form.content"
          :rows="12"
        />
      </form-item>
      <form-item>
        <Button
          type="primary"
          @click="onSubmit"
        >立即创建</Button>
      </form-item>
    </Form>
  </div>
</template>

<script>
import { addArticle } from '../../api'
import marked from 'marked'

export default {
  name: 'AddArticle',
  data () {
    return {
      inputVisible: false,
      inputValue: '',
      form: {
        title: '',
        tags: [],
        content: ''
      }
    }
  },
  methods: {
    onSubmit () {
      addArticle({
        ...this.form,
        summary: this.createSummary(),
        date: Date.now(),
        password: prompt('请输入密码')
      }).then(() => {
        this.$Message.success('添加成功')
      }).catch(e => {
        this.$Message.error({
          content: '添加失败',
          background: true
        })
      })
    },
    handleClose (index) {
      this.form.tags.splice(index, 1)
    },
    showInput () {
      this.inputVisible = true
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus()
      })
    },
    handleInputConfirm () {
      const inputValue = this.inputValue
      if (inputValue && this.form.tags.length < 3) {
        this.form.tags.push(inputValue)
      }
      debugger
      this.inputVisible = false
      this.inputValue = ''
    },
    createSummary () {
      const div = document.createElement('div')
      div.innerHTML = marked(this.form.content)
      let summary = ''
      for (const node of Array.from(div.children)) {
        summary += node.innerText
        if (summary.length >= 100) {
          break
        }
      }
      return summary
    }
  }
}
</script>

<style scoped lang="stylus">
  .page
    max-width 90%
    margin 0 auto
    padding 20px
  .button-new-tag {
    height: 32px;
    line-height: 30px;
    padding-top: 0;
    padding-bottom: 0;
  }
  .input-new-tag {
    width: 90px;
    vertical-align: bottom;
  }
</style>

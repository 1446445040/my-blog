<template>
  <div class="page">=
    <el-form
      class="form"
      ref="form"
      label-width="80px"
      :model="form"
    >
      <el-form-item label="标题">
        <el-input v-model="form.title"></el-input>
      </el-form-item>
      <el-form-item label="标签">
        <el-tag
          v-for="(tag, index) in form.tags"
          :key="index"
          closable
          :disable-transitions="false"
          @close="handleClose(index, tag)">
          {{tag}}
        </el-tag>
        <el-input
          class="input-new-tag"
          v-if="inputVisible"
          v-model="inputValue"
          ref="saveTagInput"
          size="small"
          @keyup.enter.native="handleInputConfirm"
          @blur="handleInputConfirm"
        />
        <el-button
          v-else
          class="button-new-tag"
          size="small"
          @click="showInput"
        >+ New Tag</el-button>
      </el-form-item>
      <el-form-item label="内容">
        <el-input
          class="content-input"
          type="textarea"
          rows="12"
          resize="none"
          v-model="form.content"
        />
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          @click="onSubmit"
        >立即创建</el-button>
      </el-form-item>
    </el-form>
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
      this.$prompt('请输入密码', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(({ value }) => {
        return addArticle({
          ...this.form,
          summary: this.createSummary(),
          date: Date.now(),
          password: value
        })
      }).then(() => {
        this.$message({
          type: 'success',
          message: '添加成功'
        })
      }).catch(e => {
        this.$message({
          type: 'error',
          message: '添加失败'
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
    border-radius 5px
  .page-header
    padding 20px 0
  >>> .el-tag {
    margin-right: 10px;
  }
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

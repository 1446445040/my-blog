<template>
  <el-form
    class="form"
    ref="form"
    label-width="80px"
    :model="form"
  >
    <el-form-item label="头像地址">
      <el-input v-model="form.title"/>
    </el-form-item>
    <el-form-item label="姓名">
      <el-input v-model="form.name"/>
    </el-form-item>
    <el-form-item label="年龄">
      <el-input v-model="form.age"/>
    </el-form-item>
    <el-form-item label="位置">
      <el-input v-model="form.location"/>
    </el-form-item>
    <el-form-item label="简介">
      <el-input v-model="form.description"/>
    </el-form-item>
    <el-form-item>
      <el-button
        type="primary"
        @click="onSubmit"
      >保存</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import { mapState } from 'vuex'
import type from '../../store/mutation-types'
import { setUserInfo } from '../../api'

export default {
  name: 'UserInfo',
  data () {
    return {
      form: {
        name: '',
        age: '',
        location: '',
        description: '',
        avatar: ''
      }
    }
  },
  computed: mapState({
    userInfo: 'userInfo'
  }),
  watch: {
    userInfo (newVal) {
      Object.assign(this.form, {
        name: newVal.name,
        age: newVal.age,
        location: newVal.location,
        description: newVal.description,
        avatar: newVal.avatar,
        date: newVal.date
      })
    }
  },
  methods: {
    onSubmit () {
      setUserInfo({
        ...this.form,
        date: this.userInfo.date || Date.now()
      }).then(({ data }) => {
        if (data.upserted) {
          this.$message({
            type: 'warning',
            message: '重复数据',
            showClose: true
          })
        } else {
          this.$message({
            type: 'success',
            message: '修改成功',
            showClose: true
          })
        }
      }).catch(e => {
        this.$message({
          type: 'error',
          message: '保存失败',
          showClose: true
        })
      })
    }
  },
  mounted () {
    this.$store.dispatch(type.GET_USER_INFO)
  }
}
</script>

<style scoped lang="stylus">

</style>

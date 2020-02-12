<template>
  <div class="info-page">
    <Form class="form" :model="form">
      <form-item label="头像地址">
        <Input v-model="form.avatar"/>
      </form-item>
      <form-item label="姓名">
        <Input v-model="form.name"/>
      </form-item>
      <form-item label="年龄">
        <Input v-model="form.age"/>
      </form-item>
      <form-item label="位置">
        <Input v-model="form.location"/>
      </form-item>
      <form-item label="简介">
        <Input v-model="form.description"/>
      </form-item>
      <form-item>
        <Button
          type="primary"
          @click="onSubmit"
        >保存</Button>
      </form-item>
    </Form>
  </div>
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
          this.$Message.warning('重复数据')
        } else {
          this.$Message.success('修改成功')
        }
      }).catch(e => {
        this.$Message.error({
          content: '保存失败',
          background: true
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
 .info-page
   max-width 90%
   margin 0 auto
   padding 20px
</style>

<template>
 <div>
 </div>
</template>

<script>
import type from '../store/mutation-types'
import { mapState } from 'vuex'

export default {
  name: 'User',
  data () {
    return {}
  },
  computed: mapState({
    userInfo: 'userInfo'
  }),
  mounted () {
    this.$store.dispatch(type.GET_USER_INFO)
  }
}
</script>

<style scoped lang="stylus">

</style>

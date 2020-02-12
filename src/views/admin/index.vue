<template>
  <div class="page">
    <header>
      <h1>信息管理</h1>
    </header>
    <aside>
      <router-link to="/admin/list">文章列表</router-link>
      <router-link to="/admin/add">添加文章</router-link>
      <router-link to="/admin/user">个人信息</router-link>
    </aside>
    <main>
      <keep-alive>
        <router-view />
      </keep-alive>
    </main>
  </div>
</template>

<script>
export default {
  name: 'index'
}
</script>

<style scoped lang="stylus">
  .page
    max-width 90%
    margin 0 auto
  .main
    padding-top 0
    &>section
      background-color white
</style>

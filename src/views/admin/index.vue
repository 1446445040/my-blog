<template>
  <Layout>
    <Header>
      <Menu active-name="1-2" theme="dark" width="auto" mode="horizontal">
        <menu-item name="1-1" to="/admin/list" :replace="true">
          <Icon type="ios-navigate"/>
          <span>文章列表</span>
        </menu-item>
        <menu-item name="1-2" to="/admin/add" :replace="true">
          <Icon type="ios-search"/>
          <span>添加文章</span>
        </menu-item>
        <menu-item name="1-3" to="/admin/user" :replace="true">
          <Icon type="ios-settings"/>
          <span>个人信息</span>
        </menu-item>
      </Menu>
    </Header>
    <Content>
      <Card dis-hover>
        <keep-alive>
          <router-view />
        </keep-alive>
      </Card>
    </Content>
  </Layout>
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

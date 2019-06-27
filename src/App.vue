<template>
  <div id="app">
    <el-container>
      <router-view></router-view>
    </el-container>
  </div>
</template>
<style lang="less">
#app {
  height: 100%;
  width: 100%;
  .el-container {
    height: 100%;
    width: 100%;
  }
}
</style>

<script>
export default {
  name: 'App',
  components: {}
}
</script>

<template>
  <el-row>
    <el-col>
      <div id="app">
        <router-view></router-view>
      </div>
    </el-col>
  </el-row>
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
.el-row {
  width: 100%;
  height: 100%;
  .el-col {
    height: 100%;
  }
}
</style>

<script>
export default {
  name: "App",
  components: {}
};
</script>

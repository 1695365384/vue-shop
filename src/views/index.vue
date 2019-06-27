<template>
  <div>
    <!-- Header content -->
    <navbar/>
    <el-main>
      <router-view></router-view>
    </el-main>
    <el-aside width="200px">
      <!-- Aside content -->
      sldhfjkkj
    </el-aside>
  </div>
</template>

<style lang="less" scoped>
.el-aside {
  height: 100%;
  padding-top: 56px;
  background-color: red;
}
.el-main {
  position: absolute;
  top: 56px;
  left: 200px;
  height: 100%;
  width: 100%;
  background-color: yellow;
}
</style>


<script>
import navbar from '../components/navbar'
export default {
  name: 'Index',
  data() {
    return {}
  },
  components: {
    navbar
  }
}
</script>

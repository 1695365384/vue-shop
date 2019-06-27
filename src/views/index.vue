<template>
  <div class="indexPages">
    <navbar/>
    <el-main>
      <router-view></router-view>
    </el-main>
    <el-aside width="200px">
      <!-- Aside content -->

      <el-menu
        default-active="2"
        class="el-menu-vertical-demo"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b"
      >
        <el-submenu index="1">
          <template slot="title">
            <i class="el-icon-setting"></i>
            <span>管理系统</span>
          </template>
          <el-menu-item index="2" default-active>
            <i class="el-icon-user-solid"></i>
            <span>用户管理</span>
          </el-menu-item>
          <el-menu-item index="3">
            <i class="el-icon-copy-document"></i>
            <span slot="title">商品管理</span>
          </el-menu-item>
          <el-menu-item index="4">
            <i class="el-icon-key"></i>
            <span slot="title">权限管理</span>
          </el-menu-item>
          <el-menu-item index="5">
            <i class="el-icon-s-claim"></i>
            <span slot="title">订单管理</span>
          </el-menu-item>
        </el-submenu>
      </el-menu>
    </el-aside>
  </div>
</template>

<style lang="less" scoped>
.el-aside {
  height: 100%;
  padding-top: 56px;
  position: relative;
}
.el-main {
  position: absolute;
  top: 56px;
  left: 200px;
  right: 15px;
  height: 100%;
}
.indexPages {
  height: 100%;
}
.el-menu-vertical-demo {
  height: 100%;
}
</style>

<script>
import navbar from '../components/navbar'
export default {
  name: 'index',
  components: {
    navbar
  },
  data() {
    return {
      breadcrumbList: []
    }
  },

  created() {}
}
</script>

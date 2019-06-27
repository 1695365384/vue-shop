<template>
  <div>
    <navbar/>
    <el-main>
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item v-for="(v, i) in breadcrumbList" :key="i">
          <a href="/">{{ v }}</a>
        </el-breadcrumb-item>
      </el-breadcrumb>
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
            <i class="el-icon-user-solid"></i>
            <span>用户管理</span>
          </template>
          <el-menu-item-group>
            <template slot="title">商品</template>
            <el-menu-item index="1-1">选项1</el-menu-item>
            <el-menu-item index="1-2">选项2</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group title="分组2">
            <el-menu-item index="1-3">选项3</el-menu-item>
          </el-menu-item-group>
          <el-submenu index="1-4">
            <template slot="title">选项4</template>
            <el-menu-item index="1-4-1">选项1</el-menu-item>
          </el-submenu>
        </el-submenu>
        <el-menu-item index="2">
          <i class="el-icon-copy-document"></i>
          <span slot="title">商品管理</span>
        </el-menu-item>
        <el-menu-item index="3">
          <i class="el-icon-key"></i>
          <span slot="title">权限管理</span>
        </el-menu-item>
        <el-menu-item index="4">
          <i class="el-icon-s-claim"></i>
          <span slot="title">订单管理</span>
        </el-menu-item>
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
  height: 100%;
  width: 100%;
  background-color: yellow;
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

<template>
  <div class="indexPages">
    <navbar/>
    <el-main>
      <router-view></router-view>
    </el-main>
    <el-aside width="200px">
      <!-- Aside content -->

      <el-menu
        default-active="users"
        class="el-menu-vertical-demo"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b"
      >
        <el-submenu index="1">
          <template slot="title">
            <i class></i>
            <span>管理系统</span>
          </template>
          <el-menu-item v-for="(v,i) in authList" :key="v.id" :index="v.path">
            <i :class="v.id==iconClassList[i].id?iconClassList[i].name:''"></i>
            <span>{{v.authName}}</span>
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
  name: 'Index',
  components: {
    navbar
  },
  data() {
    return {
      authList: [],
      iconClassList: [
        { id: 125, name: 'el-icon-user-solid' },
        { id: 103, name: 'el-icon-key' },
        { id: 101, name: 'el-icon-copy-document' },
        { id: 102, name: 'el-icon-s-claim' },
        { id: 145, name: 'el-icon-s-order' }
      ]
    }
  },

  created() {
    this.$http.get('/menus').then(res => {
      this.authList = res.data.data
    })
  },

  computed: {},

  methods: {},

  mounted() {}
}
</script>

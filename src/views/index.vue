<template>
  <el-row>
    <el-col>
      <el-header height="56px">
        <!-- Header content -->
        <navbar />
      </el-header>

      <el-container>
        <el-aside width="200px">
          <!-- Aside content -->
          <el-menu
            class="el-menu-vertical-demo"
            background-color="#545c64"
            text-color="#fff"
            active-text-color="#ffd04b"
            :router="true"
          >
            <el-submenu v-for="(v, i) in authList" :key="v.id" :index="v.path">
              <template slot="title">
                <i
                  :class="
                    v.id == iconClassList[i].id ? iconClassList[i].name : ''
                  "
                ></i>
                <span>{{ v.authName }}</span>
              </template>

              <el-menu-item
                v-for="val in v.children"
                :key="val.id"
                :index="val.path"
                :route="val.path"
              >
                <template slot="title">
                  <span>{{ val.authName }}</span>
                </template>
              </el-menu-item>
            </el-submenu>
          </el-menu>
        </el-aside>

        <el-main>
          <!-- Main content -->
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-col>
  </el-row>
</template>

<style lang="less" scoped>
.el-main {
  margin-top: 62px;
}
.el-header {
  position: absolute;
  left: 0;
  right: 0;
  padding: 0;
}
.el-aside {
  margin-top: 62px;
}
.el-menu-vertical-demo {
  height: 100%;
}
</style>

<script>
import navbar from "../components/navbar";
export default {
  name: "Index",
  components: {
    navbar
  },
  data() {
    return {
      authList: [],
      iconClassList: [
        { id: 125, name: "el-icon-user-solid" },
        { id: 103, name: "el-icon-key" },
        { id: 101, name: "el-icon-copy-document" },
        { id: 102, name: "el-icon-s-claim" },
        { id: 145, name: "el-icon-s-order" }
      ],
      authChild: []
    };
  },

  created() {
    this.$http.get("/menus").then(res => {
      this.authList = res.data.data;
      this.authChild = res.data.data.children;
    });
  }
};
</script>

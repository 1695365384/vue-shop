<template>
  <el-row>
    <el-col>
      <!-- 面包屑导航 -->
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>
          <a href="/">权限管理</a>
        </el-breadcrumb-item>
        <el-breadcrumb-item>权限列表</el-breadcrumb-item>
      </el-breadcrumb>
      <!-- 面包屑导航 -->

      <!-- 面板组件 -->
      <el-col style="margin-top:25px;">
        <el-card class="box-card">
          <el-table
            :data="rightsData"
            highlight-current-row
            style="width: 100%;"
          >
            <el-table-column type="index"></el-table-column>
            <el-table-column
              property="authName"
              label="权限名称"
            ></el-table-column>
            <el-table-column property="path" label="路径"></el-table-column>
            <el-table-column property="level" label="层级"></el-table-column>
          </el-table>
        </el-card>
      </el-col>

      <!-- 面板组件 -->
    </el-col>
  </el-row>
</template>

<script>
export default {
  name: "Rights",

  filters: {},
  data() {
    return {
      rightsData: []
    };
  },

  created() {
    this.$http.get("rights/list").then(res => {
      console.log(res);
      let list = res.data.data.map(v => {
        switch (v.level) {
          case "0":
            v.level = "一级";
            break;
          case "1":
            v.level = "二级";
            break;
          case "2":
            v.level = "三级";
            break;
        }
        return v;
      });
      this.rightsData = list;
    });
  }
};
</script>

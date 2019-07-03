<template>
  <el-row>
    <el-col>
      <!-- 面包屑导航 -->

      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>
          <a href="/">商品管理</a>
        </el-breadcrumb-item>
        <el-breadcrumb-item>分类列表</el-breadcrumb-item>
      </el-breadcrumb>

      <!-- 面包屑导航 -->

      <!-- 选择分类的多选框 -->
      <el-cascader :options="selectOptions">
        <template slot-scope="{ node, data }">
          <span>{{ data.cat_name }}</span>
        </template>
      </el-cascader>
      <!-- 选择分类的多选框 -->
    </el-col>
    <el-col></el-col>
  </el-row>
</template>

<script>
export default {
  name: 'params',
  data() {
    return {
      // 多选菜单的数据
      selectValues: '',
      selectOptions: []
    }
  },

  methods: {
    // selectChange(val) {
    //   //   this.selectValues = val
    //   console.log(val)
    // },

    async render() {
      let res = await this.$http.get('/categories')
      this.selectOptions = res.data.data
      console.log(res, this.selectValues)
    }
  },

  created() {
    this.render()
  }
}
</script>
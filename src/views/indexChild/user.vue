<template>
  <div>
    <el-row>
      <el-col>
        <!-- 面包屑导航 -->
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>
            <a href="/">用户管理</a>
          </el-breadcrumb-item>
          <el-breadcrumb-item>用户列表</el-breadcrumb-item>
        </el-breadcrumb>
      </el-col>

      <el-col>
        <div style="margin-top: 15px;">
          <el-input placeholder="请输入内容" v-model="input" class="input-with-select">
            <el-button slot="append" icon="el-icon-search"></el-button>
          </el-input>

          <el-button type="success" size="medium" plain>添加用户</el-button>
        </div>
      </el-col>

      <el-col>
        <el-card class="box-card" style="margin-top:25px;">
          <el-table :data="tableData" type="flex">
            <el-table-column prop="date" label="姓名"></el-table-column>
            <el-table-column prop="name" label="邮箱"></el-table-column>
            <el-table-column prop="address" label="电话"></el-table-column>
            <el-table-column prop="name" label="用户状态">
              <el-switch v-model="value" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
            </el-table-column>
            <el-table-column prop="name" label="操作">
              <el-button type="primary" icon="el-icon-edit" circle></el-button>
              <el-button type="success" icon="el-icon-check" circle></el-button>
              <el-button type="danger" icon="el-icon-delete" circle></el-button>
            </el-table-column>
          </el-table>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>
<style lang="less" scoped>
.el-input-group--append {
  width: 250px;
}
.el-card__body {
  margin-top: 25px;
}
.el-table__row {
  text-align: center;
}
</style>

<script>
export default {
  name: 'User',
  data() {
    return {
      input: '',
      tableData: [
        {
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }
      ],
      value: true
    }
  }
}
</script>

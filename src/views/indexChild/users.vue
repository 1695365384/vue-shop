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
          <el-input v-model="input" placeholder="请输入内容" class="input-with-select">
            <el-button slot="append" icon="el-icon-search"></el-button>
          </el-input>

          <el-button type="success" size="medium" plain>添加用户</el-button>
        </div>
      </el-col>

      <el-col>
        <el-card class="box-card" style="margin-top:25px;">
          <el-table :data="tableData" type="flex">
            <el-table-column prop="name" label="姓名"></el-table-column>
            <el-table-column prop="email" label="邮箱"></el-table-column>
            <el-table-column prop="mobile" label="电话"></el-table-column>
            <el-table-column label="用户状态">
              <template #default="status">
                <el-switch
                  v-model="status.row.status"
                  active-color="#13ce66"
                  inactive-color="#ff4949"
                  @change="changeSwich(status.row)"
                ></el-switch>
              </template>
            </el-table-column>
            <el-table-column prop="name" label="操作">
              <el-button type="primary" icon="el-icon-edit" circle @click="editUser($event)"></el-button>
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
import moment from 'vue-moment'
import { constants } from 'crypto'
export default {
  name: 'users',
  data() {
    return {
      input: '',
      tableData: [
        {
          name: '',
          mobile: '',
          email: '',
          status: '',
          id: ''
        }
      ],

      value: true
    }
  },

  created() {
    this.$http
      .get('/users', { params: { pagenum: 1, pagesize: 100 } })
      .then(res => {
        let list = res.data.data.users
        let obj = {}
        let tabList = []
        list.forEach((v, i) => {
          tabList[i] = {
            name: v.username,
            email: v.email,
            status: v.mg_state,
            mobile: v.mobile,
            id: v.id
          }
        })
        this.tableData = tabList
        console.log(tableData)
      })
      .catch(err => {})
  },

  methods: {
    editUser() {},
    async changeSwich(val) {
      let { id, status } = val
      let res = await this.$http.put(`users/${id}/state/${status}`)
      if (res.data.meta.status === 200) {
        let now = status ? '启用' : '禁用'
        let types = status ? 'success' : 'warning'
        this.$message({
          message: `设置${now}状态成功`,
          type: `${types}`
        })
      }
      console.log()
    }
  }
}
</script>

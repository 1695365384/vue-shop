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

      <!-- main里面的内容 -->
      <el-col>
        <div style="margin-top: 15px;">
          <el-input v-model="input" placeholder="请输入内容" class="input-with-select">
            <el-button slot="append" icon="el-icon-search" @click="searchInput"></el-button>
          </el-input>
          <el-button type="success" size="medium" plain @click="addUserMode = true">添加用户</el-button>
        </div>
      </el-col>

      <!-- 用户列表 -->
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
              <template #default="edit">
                <el-button type="primary" icon="el-icon-edit" circle @click="editUser(edit.row) "></el-button>
                <el-button type="success" icon="el-icon-check" circle @click="Permission"></el-button>
                <el-button type="danger" icon="el-icon-delete" @click="delUser(edit)" circle></el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-card>
      </el-col>
    </el-row>

    <!-- 编辑用户的模态框 -->
    <el-dialog title="编辑用户" :visible.sync="dialogFormVisible">
      <el-form :model="editUserFrom">
        <el-form-item label="用户名">
          <el-input v-model="editUserFrom.name" autocomplete="off" disabled></el-input>
        </el-form-item>

        <el-form-item label="邮箱">
          <el-input v-model="editUserFrom.email" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="电话">
          <el-input v-model="editUserFrom.mobile" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="subEditFrom">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 添加用户的模态框 -->
    <el-dialog title="添加新的用户" :visible="addUserMode" :before-close="iconClose">
      <el-form :model="addUserFrom" :rules="addUserRules" ref="addUserFroms" status-icon>
        <el-form-item label="用户名" prop="username" required label-width="120px">
          <el-input v-model="addUserFrom.username" autocomplete="off" placeholder="请输入用户名"></el-input>
        </el-form-item>

        <el-form-item label="密码" prop="password" required label-width="120px">
          <el-input
            v-model="addUserFrom.password"
            type="password"
            autocomplete="off"
            placeholder="请输入密码"
          ></el-input>
        </el-form-item>

        <el-form-item label="手机号" prop="mobile" required label-width="120px">
          <el-input
            v-model="addUserFrom.mobile"
            type="phone"
            autocomplete="off"
            placeholder="请输入手机号"
          ></el-input>
        </el-form-item>

        <el-form-item label="邮箱" prop="email" required label-width="120px">
          <el-input v-model="addUserFrom.email" type="email" autocomplete="off" placeholder="请输入邮箱"></el-input>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="addUserMode = false">取 消</el-button>
        <el-button type="primary" @click="addUser('addUserFroms')">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 分配角色的模态框 -->

    <el-dialog title="分配用户的角色" :visible.sync="outerVisible">
      <el-input v-model="input1" :disabled="true"></el-input>
      <el-dropdown size="medium" split-button type="primary">
        角色列表
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item v-for=" v in PerUserList" :key="v">黄金糕</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <div slot="footer" class="dialog-footer">
        <el-button @click="outerVisible = false">取 消</el-button>
        <el-button type="primary" @click="innerVisible = true">打开内层 Dialog</el-button>
      </div>
    </el-dialog>
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
  name: 'users',
  data() {
    return {
      input: '',
      PerUsername: '',
      PerUserList: [],
      tableData: [
        {
          name: '',
          mobile: '',
          email: '',
          status: '',
          id: ''
        }
      ],

      dialogFormVisible: false,

      editUserFrom: {
        name: '',
        email: '',
        mobile: '',
        id: ''
      },

      addUserFrom: {
        username: '',
        password: '',
        mobile: '',
        email: ''
      },
      addUserRules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 6, max: 12, message: '长度在6到12个字符左右', trigger: 'blur' }
        ],

        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, message: '密码不能少于6位', trigger: 'blur' }
        ],

        email: [{ required: true, message: '请输入邮箱', trigger: 'blur' }],

        mobile: [
          { required: true, message: '手机号不能为空', trigger: 'blur' },
          { min: 11, message: '请输入正确的手机号', trigger: 'blur' }
        ]
      },

      addUserMode: false
    }
  },

  created() {
    this.render()
  },

  methods: {
    editUser(val) {
      this.dialogFormVisible = true
      let { id, name, mobile, email } = val
      this.editUserFrom = {
        name,
        mobile,
        email,
        id
      }
    },

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
    },

    async subEditFrom() {
      this.dialogFormVisible = false
      let { id } = this.editUserFrom
      let res = await this.$http.put(`/users/${id}`, this.editUserFrom)

      if (res.data.meta.status === 200) {
        this.$message({
          message: `更新用户信息成功`,
          type: `success`
        })
      } else {
        this.$message({
          message: `更新用户信息失败,`,
          type: `warning`
        })
      }

      this.render()
    },

    delUser(val) {
      let { id } = val.row
      this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.$http.delete(`/users/${id}`).then(res => {
            if (res.data.meta.status === 200) {
              this.$message({
                type: 'success',
                message: '删除成功!'
              })
            }
          })
          this.render()
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },

    addUser(add) {
      this.addUserMode = true
      this.$refs[add].validate(valid => {
        if (valid) {
          this.$http.post('/users', this.addUserFrom).then(res => {
            if (res.data.meta.status === 201) {
              this.$refs['addUserFroms'].resetFields()
              this.addUserMode = false
              this.$message({
                type: 'success',
                message: '创建成功了,不要告诉别人呦'
              })
              this.render()
            }
          })
        } else {
          return
        }
      })
    },

    render() {
      this.$http
        .get('/users', {
          params: { query: this.input, pagenum: 1, pagesize: 100 }
        })
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
        })
    },

    iconClose(del) {
      this.addUserMode = false
      this.$refs['addUserFroms'].resetFields()
    },

    searchInput() {
      this.render()
    },

    Permission() {}
  },

  watch: {}
}
</script>

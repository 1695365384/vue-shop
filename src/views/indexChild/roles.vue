<template>
  <el-row>
    <el-col>
      <!-- 面包屑导航 -->
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>
          <a href="/">权限管理</a>
        </el-breadcrumb-item>
        <el-breadcrumb-item>{{ brandText }}</el-breadcrumb-item>
      </el-breadcrumb>
      <!-- 面包屑导航 -->

      <!-- 一个按钮 -->
      <el-button
        type="success"
        size="medium"
        plain
        style="margin:25px 0;"
        @click="addPart"
        >添加角色</el-button
      >
      <!-- 一个按钮 -->

      <!-- 面板组件 -->
      <el-col>
        <el-card class="box-card">
          <el-table :data="tableData" highlight-current-row style="width: 100%">
            <el-table-column type="index"></el-table-column>
            <el-table-column property="roleName" label="角色"></el-table-column>
            <el-table-column property="roleDesc" label="描述"></el-table-column>
            <el-table-column label="操作">
              <template v-slot="tabData">
                <el-button
                  size="mini"
                  type="primary"
                  @click="editPart(tabData.row)"
                  >编辑</el-button
                >
                <el-button size="mini" type="warning">授权</el-button>
                <el-button
                  size="mini"
                  type="danger"
                  @click="delPart(tabData.row.id)"
                  >删除</el-button
                >
              </template>
            </el-table-column>
          </el-table>
        </el-card>
      </el-col>

      <!-- 面板组件 -->

      <!-- 编辑角色的弹出框 -->
      <el-dialog title="编辑角色" :visible.sync="editPartVIsible" width="30%">
        <el-form :model="editPartFrom" label-width="80px">
          <el-form-item label="角色名称">
            <el-input v-model="editPartFrom.roleName"></el-input>
          </el-form-item>
          <el-form-item label="描述">
            <el-input v-model="editPartFrom.roleDesc"></el-input>
          </el-form-item>
        </el-form>

        <span slot="footer">
          <el-button @click="editPartVIsible = false">取 消</el-button>
          <el-button type="primary" @click="editSubmit">确定</el-button>
        </span>
      </el-dialog>

      <!-- 编辑角色的弹出框 -->

      <!-- 角色授权的树状结构 -->

      <!-- 角色授权的树状结构 -->

      <!-- 添加角色的模态框 -->
      <el-dialog title="添加角色" :visible.sync="addPartVisible" width="30%">
        <el-form :model="addPartFrom" label-width="80px">
          <el-form-item label="角色名称">
            <el-input v-model="addPartFrom.roleName"></el-input>
          </el-form-item>
          <el-form-item label="描述">
            <el-input v-model="addPartFrom.roleDesc"></el-input>
          </el-form-item>
        </el-form>

        <span slot="footer">
          <el-button @click="addPartVisible = false">取 消</el-button>
          <el-button type="primary" @click="addPartSubmit">确定</el-button>
        </span>
      </el-dialog>
      <!-- 添加角色的模态框 -->
    </el-col>
  </el-row>
</template>

<script>
export default {
  name: "Roles",
  data() {
    return {
      brandText: "",

      // 渲染列表的数据
      tableData: [
        {
          roleName: "",
          roleDesc: "",
          id: "",
          children: []
        }
      ],

      // 编辑角色的数据
      editPartVIsible: false,
      editPartFrom: {},

      // 添加角色的数据
      addPartVisible: false,
      addPartFrom: {
        roleDesc: "",
        roleName: ""
      }
    };
  },

  created() {
    this.brandText = document.title;
    this.render();
  },

  methods: {
    // 渲染的函数
    async render() {
      let arr = [];
      let res = await this.$http.get("/roles");
      this.tableData = res.data.data;
    },

    // 编辑角色
    editPart(val) {
      this.editPartVIsible = true;
      this.editPartFrom = val;
    },
    async editSubmit() {
      this.editPartVIsible = false;
      let { id } = this.editPartFrom;
      let res = await this.$http.put(`/roles/${id}`, this.editPartFrom);
      console.log(res);
      let { msg, status } = res.data.meta;

      if (status === 200) {
        this.$message({
          type: "success",
          message: "角色更新成功"
        });
        this.render();
      }
    },

    // 删除角色
    delPart(val) {
      this.$confirm("此操作将永久删除该角色, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$http.delete(`/roles/${val}`).then(res => {
            this.$message({
              type: "success",
              message: "删除成功!"
            });
            this.render();
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },

    // 添加用户的事件
    addPart() {
      this.addPartVisible = true;
    },
    async addPartSubmit() {
      let res = await this.$http.post(`/roles`, this.addPartFrom);
      console.log(res);
      let { msg, status } = res.data.meta;
      if (status === 201) {
        this.addPartVisible = false;
        this.$message({
          type: "success",
          message: msg
        });
        this.addPartFrom = {
          roleDesc: "",
          roleName: ""
        };
        this.render();
      }
    }
  }
};
</script>

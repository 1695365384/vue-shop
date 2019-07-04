<template>
  <el-row>
    <el-col>
      <!-- 面包屑导航 -->

      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>
          <a href="/">商品管理</a>
        </el-breadcrumb-item>
        <el-breadcrumb-item>商品分类</el-breadcrumb-item>
      </el-breadcrumb>

      <!-- 面包屑导航 -->

      <!-- 添加商品的按钮 -->

      <div style="margin-top: 15px;">
        <el-button type="success" size="medium" plain @click="requestAddCategoryList">添加分类</el-button>
      </div>

      <!-- 添加商品的按钮 -->

      <!-- 面板组件 -->
      <el-col style="margin-top:25px;">
        <el-card class="box-card">
          <el-table :data="categoriesData" highlight-current-row border>
            <el-table-tree-column
              file-icon="el-icon-s-grid"
              folder-icon="el-icon-s-opportunity"
              prop="cat_name"
              tree-key="cat_id"
              label="分类名称"
              width="220"
              parent-key="cat_pid"
              level-key="cat_level"
            ></el-table-tree-column>
            <el-table-column align="center" prop="cat_deleted" label="是否有效">
              <template v-slot="{row}">{{row.cat_deleted?'是':'否'}}</template>
            </el-table-column>
            <el-table-column align="center" prop="cat_level" label="层级">
              <template v-slot="{row}">{{row.cat_level | levelFilter}}</template>
            </el-table-column>
            <el-table-column align="center" label="操作">
              <template v-slot="Categories">
                <el-button type="success" size="mini" @click="editCategories(Categories.row)">编辑</el-button>
                <el-button type="danger" size="mini" @click="delCategories(Categories.row)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>

          <!-- 分页组件 -->

          <el-pagination
            :current-page.sync="pages.pagenum"
            layout="prev, pager, next"
            :total="pages.total"
            @current-change="pagesChangesCurrent"
          ></el-pagination>
          <!-- 分页组件 -->
        </el-card>
      </el-col>

      <!-- 面板组件 -->

      <!-- 编辑分类的模态框 -->

      <el-dialog title="编辑分类" :visible.sync="categoryVisible" width="30%">
        <el-input v-model="editCategoriesName"></el-input>

        <span slot="footer">
          <el-button @click="categoryVisible = false">取 消</el-button>
          <el-button type="primary" @click="editCategoryNameSubmit">确 定</el-button>
        </span>
      </el-dialog>

      <!-- 编辑分类的模态框 -->

      <!-- 添加分类的模态框 -->

      <el-dialog title="添加分类" :visible.sync="addCategoryVisible" width="30%">
        <el-form :model="addCategoryFrom" ref="addFrom" label-width="80px">
          <el-form-item label="分类名称">
            <el-input v-model="addCategoryFrom.cat_name"></el-input>
          </el-form-item>
          <el-form-item label="选择分类">
            <el-cascader
              v-model="addCategoryFrom.cat_pid"
              :options="addCategoryList"
              :props="addCategoryProps"
              clearable
              style="margin:10px 0"
            ></el-cascader>
          </el-form-item>
        </el-form>

        <span slot="footer">
          <el-button @click="addCategoryVisible = false">取 消</el-button>
          <el-button type="primary" @click="addCategorySubmit">确 定</el-button>
        </span>
      </el-dialog>

      <!-- 添加分类的模态框 -->
    </el-col>
  </el-row>
</template>

<script>
import tree from 'element-tree-grid'

export default {
  name: 'Categories',
  data() {
    return {
      //表格列表
      categoriesData: [],

      //添加分类的模态框
      addCategoryVisible: false,
      addCategoryProps: {
        checkStrictly: true,
        label: 'cat_name',
        value: 'cat_id'
      },
      addCategoryList: [],
      addCategoryFrom: {
        cat_name: '',
        cat_pid: [],
        cat_level: 0
      },

      //分页的数据
      pages: {
        pagenum: 1,
        total: 0
      },

      //编辑分类的模态框
      categoryVisible: false,
      category_id: -1,
      editCategoriesName: ''
    }
  },
  created() {
    this.render()
  },

  methods: {
    //编辑分类列表
    editCategories(val) {
      this.categoryVisible = true
      this.editCategoriesName = val.cat_name
      this.category_id = val.cat_id
    },
    async editCategoryNameSubmit() {
      this.categoryVisible = false
      let res = await this.$http.put(`/categories/${this.category_id}`, {
        cat_name: this.editCategoriesName
      })
    },
    //删除分类
    delCategories(val) {},

    //渲染函数
    async render() {
      let res = await this.$http.get('/categories', {
        params: {
          pagenum: this.pages.pagenum,
          pagesize: 10,
          type: 3
        }
      })
      let { status } = res.data.meta

      if (status === 200) {
        this.categoriesData = res.data.data.result
        this.pages.total = res.data.data.total
      }
    },

    // 分页点击事件
    pagesChangesCurrent(val) {
      this.pages.pagenum = val
      this.render()
    },

    //添加分类
    async addCategorySubmit() {
      this.addCategoryFrom.cat_level = this.addCategoryFrom.cat_pid.length - 1

      this.addCategoryFrom.cat_pid = this.addCategoryFrom.cat_pid[
        this.addCategoryFrom.cat_level
      ]

      let res = await this.$http.post('/categories', this.addCategoryFrom)
      let { status, msg } = res.data.meta
      if (status === 201) {
        this.$message({
          type: 'success',
          message: msg
        })
        this.$refs.addFrom.resetFields()
        this.addCategoryVisible = false
        this.render()
      }
    },

    //打开添加分类的模态框.请求数据
    async requestAddCategoryList() {
      this.addCategoryVisible = true
      let res = await this.$http.get('/categories', { params: { type: 3 } })
      let { status } = res.data.meta
      if (status === 200) {
        this.addCategoryList = res.data.data
      }
    }
  },

  components: {
    [tree.name]: tree
  },

  filters: {
    levelFilter(val) {
      switch (val) {
        case 0:
          return '一级'
        case 1:
          return '二级'
        case 2:
          return '三级'
      }
    }
  }
}
</script>

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
        <el-button
          type="success"
          size="medium"
          plain
          @click="addCategoriesVisible = true"
          >添加分类</el-button
        >
      </div>

      <!-- 添加商品的按钮 -->

      <!-- 面板组件 -->
      <el-col style="margin-top:25px;">
        <el-card class="box-card">
          <el-table :data="categoriesData" highlight-current-row border>
            <el-table-column
              align="center"
              prop="cat_name"
              label="分类名称"
            ></el-table-column>
            <el-table-column
              align="center"
              prop="cat_deleted"
              label="是否有效"
            ></el-table-column>
            <el-table-column
              align="center"
              prop="cat_level"
              label="层级"
            ></el-table-column>
            <el-table-column align="center" label="操作">
              <template v-slot="Categories">
                <el-button
                  type="success"
                  size="mini"
                  @click="editCategories(Categories.row)"
                  >编辑</el-button
                >
                <el-button
                  type="danger"
                  size="mini"
                  @click="delCategories(Categories.row)"
                  >删除</el-button
                >
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
          <el-button type="primary" @click="editCategoryNameSubmit"
            >确 定</el-button
          >
        </span>
      </el-dialog>

      <!-- 编辑分类的模态框 -->
    </el-col>
  </el-row>
</template>

<script>
export default {
  name: "Categories",
  data() {
    return {
      //表格列表
      categoriesData: [],

      //添加分类的模态框
      addCategoriesVisible: false,

      //分页的数据
      pages: {
        pagenum: 1,
        total: 0
      },

      //编辑分类的模态框
      categoryVisible: false,
      category_id: -1,
      editCategoriesName: ""
    };
  },
  created() {
    this.render();
  },

  methods: {
    //编辑分类列表
    editCategories(val) {
      this.categoryVisible = true;
      this.editCategoriesName = val.cat_name;
      this.category_id = val.cat_id;
    },
    async editCategoryNameSubmit() {
      this.categoryVisible = false;
      let res = await this.$http.put(`/categories/${this.category_id}`, {
        cat_name: this.editCategoriesName
      });
    },
    //删除分类
    delCategories(val) {},

    //渲染函数

    async render() {
      let res = await this.$http.get("/categories", {
        params: {
          pagenum: this.pages.pagenum,
          pagesize: 10,
          type: 3
        }
      });
      let { status, meta } = res.data.meta;

      let list = res.data.data.result.map(v => {
        v.cat_deleted = !v.cat_deleted ? "否" : "是";
        switch (v.cat_level) {
          case 0:
            v.cat_level = "一级";
            break;
          case 1:
            v.cat_level = "二级";
            break;
          case 2:
            v.cat_level = "三级";
            break;
        }
        return v;
      });
      if (status === 200) {
        this.categoriesData = list;
        this.pages.total = res.data.data.total;
      }
    },

    // 分页点击事件
    pagesChangesCurrent(val) {
      this.pages.pagenum = val;
      this.render();
    }
  }
};
</script>

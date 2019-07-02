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
          @click="categoriesVisible = true"
          >添加分类</el-button
        >
      </div>

      <!-- 添加商品的按钮 -->

      <!-- 面板组件 -->
      <el-col style="margin-top:25px;">
        <el-card class="box-card">
          <el-table
            :data="categoriesData"
            highlight-current-row
            style="width: 100%;"
          >
            <el-table-column
              property="goods_name"
              label="分类名称"
            ></el-table-column>
            <el-table-column
              property="goods_price"
              label="是否有效"
            ></el-table-column>
            <el-table-column
              property="goods_state"
              label="层级"
            ></el-table-column>
            <el-table-column label="操作">
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
            background
            :current-page.sync="pages.pagenum"
            :page-size="10"
            layout="prev, pager, next"
            :total="pages.total"
            style="margin-top:25px;"
            @current-change="CategoriesCurrent"
          ></el-pagination>

          <!-- 分页组件 -->
        </el-card>
      </el-col>

      <!-- 面板组件 -->
    </el-col>
  </el-row>
</template>

<script>
export default {
  name: "Categories",
  data() {
    return {
      categoriesData: {},

      categoriesVisible: false,

      pages: {
        pagenum: 0,
        total: 0
      }
    };
  },
  methods: {
    //编辑分类列表
    editCategories(val) {},

    //删除分类
    delCategories(val) {}
  }
};
</script>

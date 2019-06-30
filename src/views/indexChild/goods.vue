<template>
  <el-row>
    <el-col>
      <!-- 面包屑导航 -->

      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>
          <a href="/">商品管理</a>
        </el-breadcrumb-item>
        <el-breadcrumb-item>商品列表</el-breadcrumb-item>
      </el-breadcrumb>

      <!-- 面包屑导航 -->

      <!-- 添加商品的按钮 -->

      <div style="margin-top: 15px;">
        <el-input v-model="pages.query" placeholder="请输入内容" class="input-with-select">
          <el-button slot="append" icon="el-icon-search" @click="queryGoods"></el-button>
        </el-input>
        <el-button type="success" size="medium" plain @click="addGoods">添加商品</el-button>
      </div>

      <!-- 添加商品的按钮 -->

      <!-- 面板组件 -->
      <el-col style="margin-top:25px;">
        <el-card class="box-card">
          <el-table :data="goodsData" highlight-current-row style="width: 100%;">
            <el-table-column type="index"></el-table-column>
            <el-table-column property="goods_name" label="商品名称"></el-table-column>
            <el-table-column property="goods_price" label="商品价格"></el-table-column>
            <el-table-column property="goods_state" label="商品状态"></el-table-column>
            <el-table-column property="goods_weight" label="商品重量"></el-table-column>
            <el-table-column property="add_time" label="创建时间"></el-table-column>
            <el-table-column label="操作">
              <template>
                <el-button type="success" size="mini">编辑</el-button>
                <el-button type="danger" size="mini">删除</el-button>
                <el-button type="wring" size="mini">审核</el-button>
              </template>
            </el-table-column>
          </el-table>

          <!-- 分页组件 -->

          <el-pagination
            background
            @current-change="goodsCurrent"
            :current-page.sync="pages.pagenum"
            :page-size="10"
            layout="prev, pager, next"
            :total="pages.total"
            style="margin-top:25px;"
          ></el-pagination>

          <!-- 分页组件 -->
        </el-card>
      </el-col>

      <!-- 面板组件 -->

      <!-- 添加商品的模态框 -->

      <el-dialog title="添加商品" :visible.sync="addGoodsVisible" width="30%">
        <el-form
          :model="addGoodsFrom"
          status-icon
          :rules="addGoodsrules"
          ref="ruleForm"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-form-item label="商品名称" prop="goods_name">
            <el-input type="text" v-model="addGoodsFrom.goods_name" autocomplete="off"></el-input>
          </el-form-item>

          <el-form-item label="分类列表" prop="goods_cat">
            <el-input type="text" v-model="addGoodsFrom.goods_cat" autocomplete="off"></el-input>
          </el-form-item>

          <el-form-item label="价格" prop="goods_price">
            <el-input type="text" v-model="addGoodsFrom.goods_price" autocomplete="off"></el-input>
          </el-form-item>

          <el-form-item label="数量" prop="goods_number">
            <el-input type="text" v-model="addGoodsFrom.goods_number" autocomplete="off"></el-input>
          </el-form-item>

          <el-form-item label="重量" prop="goods_weight">
            <el-input type="text" v-model="addGoodsFrom.goods_weight" autocomplete="off"></el-input>
          </el-form-item>

          <el-form-item label="介绍" prop="goods_introduce">
            <el-input type="text" v-model="addGoodsFrom.goods_introduce" autocomplete="off"></el-input>
          </el-form-item>

          <el-form-item label="图片临时路径" prop="pics">
            <el-input type="text" v-model="addGoodsFrom.pics" autocomplete="off"></el-input>
          </el-form-item>

          <el-form-item label="商品的参数" prop="attrs">
            <el-input type="text" v-model="addGoodsFrom.attrs" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="addGoodsVisible = false">取 消</el-button>
          <el-button type="primary" @click="addGoodsVisible = false">确 定</el-button>
        </span>
      </el-dialog>

      <!-- 添加商品的模态框 -->
    </el-col>
  </el-row>
</template>

<style lang="less" scoped>
.input-with-select {
  width: 200px;
}
</style>


<script>
export default {
  name: 'Goods',
  data() {
    return {
      goodsData: [],
      pages: {
        pagenum: 1,
        total: 0,
        query: ''
      },
      // 添加商品的数据
      addGoodsVisible: false,
      addGoodsFrom: [],
      addGoodsrules: {
        goods_name: [
          { required: true, message: '请输入商品名', trigger: 'blur' }
        ],

        goods_cat: [
          { required: true, message: '请输入商品名', trigger: 'blur' }
        ]
      }
    }
  },

  created() {
    this.render()
  },

  methods: {
    // 渲染函数
    async render() {
      let res = await this.$http.get('/goods', {
        params: {
          query: this.pages.query,
          pagenum: this.pages.pagenum,
          pagesize: 10
        }
      })
      this.pages.total = res.data.data.total
      let { status, msg } = res.data.meta

      if (status === 200) {
        let list = res.data.data.goods.map(v => {
          v.add_time = this.$moment(+(v.add_time + '000')).format('YYYY-MM-DD ')
          v.upd_time = this.$moment(+(v.upd_time + '000')).format('YYYY-MM-DD ')
          return v
        })
        this.goodsData = list
      }
    },
    //分页的点击
    goodsCurrent(val) {
      this.pages.pagenum = val
      this.render()
    },
    //查询商品
    queryGoods() {
      this.render()
    },

    // 添加商品
    addGoods() {
      this.addGoodsVisible = true
    }
  }
}
</script>

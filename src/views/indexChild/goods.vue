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
        <el-button type="success" size="medium" plain @click="$router.push('/goods-add')">添加商品</el-button>
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
              <template v-slot="goods">
                <el-button type="success" size="mini" @click="editGoods(goods.row)">编辑</el-button>
                <el-button type="danger" size="mini" @click="delGoods(goods.row)">删除</el-button>
                <el-button type="warning" size="mini">审核</el-button>
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
            @current-change="goodsCurrent"
          ></el-pagination>

          <!-- 分页组件 -->
        </el-card>
      </el-col>

      <!-- 面板组件 -->

      <!-- 编辑商品的模态框 -->

      <el-dialog title="编辑商品信息" :visible.sync="editGoodsVisible" width="30%">
        <el-form :model="editGoodsFrom" status-icon :rules="addGoodsrules" label-width="100px">
          <el-form-item label="商品名称" prop="goods_name">
            <el-input v-model="editGoodsFrom.goods_name" type="text" autocomplete="off"></el-input>
          </el-form-item>

          <el-form-item label="价格" prop="goods_price">
            <el-input v-model="editGoodsFrom.goods_price" type="text" autocomplete="off"></el-input>
          </el-form-item>

          <el-form-item label="数量" prop="goods_number">
            <el-input v-model="editGoodsFrom.goods_number" type="text" autocomplete="off"></el-input>
          </el-form-item>

          <el-form-item label="重量" prop="goods_weight">
            <el-input v-model="editGoodsFrom.goods_weight" type="text" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer">
          <el-button @click="editGoodsVisible = false">取 消</el-button>
          <el-button type="primary" @click="editGoodsSubmit">确 定</el-button>
        </span>
      </el-dialog>

      <!-- 编辑商品的模态框 -->
    </el-col>
  </el-row>
</template>

<style lang="less" scoped>
.input-with-select {
  width: 200px;
}
</style>

<script>
import { async } from 'q'
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
      addGoodsrules: {
        goods_name: [
          { required: true, message: '请输入商品名', trigger: 'blur' }
        ],

        goods_cat: [{ required: true, message: '请输入分类', trigger: 'blur' }],

        goods_price: [
          { required: true, message: '请输入价格', trigger: 'blur' }
        ],

        goods_number: [
          { required: true, message: '请输入数量', trigger: 'blur' }
        ],

        goods_weight: [
          { required: true, message: '请输入重量', trigger: 'blur' }
        ],

        goods_introduce: [{ required: true, message: '介绍', trigger: 'blur' }]
      },

      // 编辑商品的数据
      editGoodsVisible: false,
      editGoodsFrom: {}
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
          switch (v.goods_state) {
            case null:
              v.goods_state = '未通过'
              break
            case 0:
              v.goods_state = '未通过'
              break
            case 1:
              v.goods_state = '审核中'
              break
            case 2:
              v.goods_state = '已通过'
              break
          }
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

    // 编辑商品
    async editGoods(val) {
      this.editGoodsVisible = true
      let res = await this.$http.get(`/goods/${val.goods_id}`)
      let { status } = res.data.meta
      if (status === 200) {
        this.editGoodsFrom = res.data.data
      }
    },

    // 编辑商品提交功能
    async editGoodsSubmit() {
      let res = await this.$http.put(
        `/goods/${this.editGoodsFrom.goods_id}`,
        this.editGoodsFrom
      )
      let { status, msg } = res.data.meta
      if (status === 200) {
        this.editGoodsFrom = {}
        this.editGoodsVisible = false
        this.$message({
          type: 'success',
          message: '更新商品成功'
        })
      }
    },

    // 删除商品功能
    delGoods(val) {
      this.$confirm('此操作将永久删除该商品, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let { goods_id } = val
        let res = this.$http.delete(`/goods/${goods_id}`).then(res => {
          let { status, msg } = res.data.meta
          if (status === 200) {
            this.$message({
              type: 'success',
              message: msg
            })
            this.render()
          } else {
            this.$message({
              type: 'danger',
              message: '删除失败'
            })
          }
        })
      })
    }
  }
}
</script>

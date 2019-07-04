<template>
  <div>
    <!-- 面包屑导航 -->

    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>
        <a href="/">商品管理</a>
      </el-breadcrumb-item>
      <el-breadcrumb-item>添加商品</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 面包屑导航 -->

    <!-- 步骤导航 -->
    <el-steps :active="currentIndex" finish-status="success" style="margin:25px 0">
      <el-step title="步骤 1"></el-step>
      <el-step title="步骤 2"></el-step>
      <el-step title="步骤 3"></el-step>
    </el-steps>
    <!-- 步骤导航 -->

    <!-- 提交内容的from表单tabs栏 -->
    <el-tabs :tab-position="'left'" @tab-click="tabsEvent" v-model="step">
      <el-tab-pane label="基本信息" name="info">
        <el-form :model="addGoodsFrom" ref="addGoodsRef" label-width="80px">
          <el-form-item label="商品名称">
            <el-input v-model="addGoodsFrom.goods_name"></el-input>
          </el-form-item>

          <el-form-item label="商品价格">
            <el-input v-model="addGoodsFrom.goods_price"></el-input>
          </el-form-item>

          <el-form-item label="商品数量">
            <el-input v-model="addGoodsFrom.goods_number"></el-input>
          </el-form-item>

          <el-form-item label="商品重量">
            <el-input v-model="addGoodsFrom.goods_weight"></el-input>
          </el-form-item>

          <el-form-item label="商品分类">
            <el-cascader
              v-model="addGoodsFrom.goods_cat"
              :options="addGoodsOptions"
              :props="addGoodsProp"
            ></el-cascader>
          </el-form-item>

          <el-form-item label="是否促销">
            <el-radio v-model="addGoodsFrom.is_promote" label="true">是</el-radio>
            <el-radio v-model="addGoodsFrom.is_promote" label="false">否</el-radio>
          </el-form-item>
        </el-form>
        <el-button type="primary" @click="next(1,'pic')">下一步</el-button>
      </el-tab-pane>
      <el-tab-pane label="图片内容" name="pic">
        <el-upload
          class="upload-demo"
          action="http://localhost:8888/api/private/v1/upload"
          :headers="headers"
          :on-success="onFileUploadSuccess"
        >
          <el-button size="small" type="primary">点击上传</el-button>
          <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
        </el-upload>
        <el-button type="primary" @click="next(2,'content')">下一步</el-button>
      </el-tab-pane>
      <el-tab-pane label="商品内容" name="content">
        <quill-editor v-model="addGoodsFrom.goods_introduce"></quill-editor>
        <el-button type="primary" @click="addGoodsSubmit">确定提交</el-button>
      </el-tab-pane>
    </el-tabs>

    <!-- 提交内容的from表单tabs栏 -->
  </div>
</template>
<script>
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

import { quillEditor } from 'vue-quill-editor'
import { getToKen } from '../../assets/js/userInfo'
export default {
  name: 'goodsAdd',
  data() {
    return {
      currentIndex: 0,

      addGoodsFrom: {
        is_promote: '',
        pics: {}
      },

      addGoodsOptions: [],

      step: 'info',

      addGoodsProp: {
        label: 'cat_name',
        value: 'cat_id'
      },

      headers: {
        Authorization: ''
      }
    }
  },
  async created() {
    let res = await this.$http.get('/categories')
    let { status } = res
    if (status === 200) {
      this.addGoodsOptions = res.data.data
    }
    this.headers.Authorization = getToKen()
  },
  methods: {
    //   下一步
    next(index, name) {
      this.currentIndex = +index
      this.step = name
    },

    //tab栏的切换效果
    tabsEvent(val) {
      console.log(val.index)
      this.currentIndex = +val.index
    },

    //提交按钮
    async addGoodsSubmit() {
      if (this.addGoodsFrom.goods_cat) {
        this.addGoodsFrom.goods_cat = this.addGoodsFrom.goods_cat.join(',')
      }
      let res = await this.$http.post('/goods', this.addGoodsFrom)
      let { status, msg } = res.data.meta

      if (status === 201) {
        this.$message({
          type: 'success',
          message: msg
        })
        this.addGoodsFrom = {}
        this.$router.push('/goods')
      }
    },

    //上传图片的事件
    onFileUploadSuccess(path) {
      console.log(path)
      this.addGoodsFrom.pics.pic = path.data.tmp_path
    }
  },

  components: {
    quillEditor
  }
}
</script>



<template>
  <div>
    <div class="navbar">
      <div class="clearfix">
        <el-button type="info" class="fr" @click="open">退出</el-button>
        <a href="/" class="fl">
          <img src="../assets/logo.png">
        </a>
      </div>
    </div>
  </div>
</template>
<style lang="less" scoped>
.navbar {
  background-color: rgba(0, 0, 0, 0.5);
  width: 100%;
  position: absolute;
  height: 56px;
  .clearfix {
    padding: 0 15px 0 0px;
  }
}
.fr {
  margin-top: 8px;
}
</style>

<script>
import { removUserInfo } from '@/assets/js/userInfo'
export default {
  name: 'Navbar',
  data() {
    return {}
  },
  methods: {
    open() {
      this.$confirm('确定要退出登陆吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        removUserInfo()
        this.$router.push('/')
      })
    }
  }
}
</script>

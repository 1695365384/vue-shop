<template>
  <div>
    <div class="navbar">
      <div class="w clearfix">
        <el-button type="info" class="fr">退出</el-button>
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
}
.fr {
  margin-top: 8px;
}
</style>

<script>
export default {
  name: 'login',
  data() {
    return {}
  },
  methods: {
    handleSelect() {}
  }
}
</script>

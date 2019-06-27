<template>
  <div>
    <div class="login">
      <el-form
        ref="ruleForm2"
        :model="ruleForm2"
        status-icon
        :rules="rules2"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="账号" prop="username">
          <el-input
            v-model="ruleForm2.username"
            type="text"
            placeholder="请输入用户名"
            auto-complete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input
            v-model="ruleForm2.password"
            type="password"
            placeholder="请输入密码"
            auto-complete="off"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="login">提交</el-button>
          <el-button @click="resetForm('ruleForm2')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<style lang="less" scoped>
.login {
  width: 500px;
  height: 500px;
  background-color: #000;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  box-shadow: 0 5px 25px #000;
  border-radius: 25px;
  .el-form {
    width: 350px;
    height: 250px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
}
</style>

<script>
import { saveInfo } from '@/assets/js/userInfo'
export default {
  data() {
    var validateName = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('用户名不能为空'))
      }
      callback()
    }
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        callback()
      }
    }

    return {
      ruleForm2: {
        username: '',
        password: ''
      },
      rules2: {
        username: [{ validator: validateName, trigger: 'blur' }],
        password: [{ validator: validatePass, trigger: 'blur' }]
      }
    }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.login()
        } else {
          this.resetForm('ruleForm2')
          return this.$message({
            type: 'info',
            message: `账号或者密码输入格式不正确`
          })
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },

    async login() {
      const res = await this.$http.post('/login', this.ruleForm2)
      let { status, msg } = res.data.meta
      if (status === 200) {
        saveInfo(res.data.data.token)

        this.$router.push('/user')
      } else {
        return this.$message(msg)
      }
    }
  }
}
</script>

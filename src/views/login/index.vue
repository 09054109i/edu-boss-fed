<template>
 <div class="login">
  <el-form
    class="login-form"
    label-position="top"
    ref="form"
    :model="form"
    :rules="rules"
    label-width="80px"
  >
    <el-form-item label="手机号" prop="phone">
      <el-input v-model="form.phone"></el-input>
    </el-form-item>
    <el-form-item label="密码" prop="password">
      <el-input type="password" v-model="form.password"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button :loading="isLoginLoading" class="login-btn" type="primary" @click="onSubmit">登录</el-button>
    </el-form-item>
  </el-form>
 </div>
</template>
<script lang="ts">
import Vue from 'vue'
import { Form } from 'element-ui'
import { login } from '@/services/user'

export default Vue.extend({
  name: 'LoginIndex',
  data () {
    return {
      form: {
        phone: '18201288771',
        password: '111111'
      },
      rules: {
        phone: [
          { required: true, message: '请输入手机号码', trigger: 'blur' },
          { pattern: /^1\d{10}$/, message: '请输入11个数字', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 11, message: '长度在 6 到 11 个字符', trigger: 'blur' }
        ]
      },
      isLoginLoading: false
    }
  },
  methods: {
    async onSubmit () {
      try {
        // 1、表单验证，
        await (this.$refs.form as Form).validate()
        this.isLoginLoading = true
        // 2、验证通过，提交表单
        const { data } = await login(this.form)
        // 3、处理请求结果
        // 失败：给出提示
        if (data.state !== 1) {
          this.$message.error(data.message)
        } else {
          // 成功：跳转到首页
          this.$store.commit('setUser', data.content)
          this.$router.push(this.$route.query.redirect as string || '/')
          this.$message.success('登录成功')
        }
      } catch (err) {
        console.log('登录失败', err)
      }
      this.isLoginLoading = false
    }
  }
})
</script>
<style scoped lang = "scss">
  .login {
     min-height: 100vh;
     display: flex;
     align-items: center;
     justify-content: center;
    .login-form {
      width: 300px;
      background: #fff;
      padding: 20px;
      border-radius: 5px;
    }
    .login-btn {
      width: 100%;
    }
  }
</style>

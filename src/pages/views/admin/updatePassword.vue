<template lang="html">
  <el-card>
    <div slot="header">
      <span>修改密码</span>
    </div>

    <el-row :gutter="10">
      <el-col :sm="{ span: 12, offset: 6 }">
        <el-form :model="form" :rules="rules" ref="form" label-position="top">
          <el-form-item>
            <el-input :value="username" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item prop="passwordOld">
            <el-input type="password" v-model="form.passwordOld" placeholder="原密码"></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input type="password" v-model="form.password" placeholder="新密码"></el-input>
          </el-form-item>
          <el-form-item prop="passwordOk">
            <el-input type="password" v-model="form.passwordOk" placeholder="确认新密码" @keyup.native.enter="handleClick"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" :loading="form.loading" @click="handleClick">修改</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </el-card>
</template>

<script>
import * as API from '@/api/admin'

export default {
  data () {
    return {
      form: {
        loading: false,
        passwordOld: '',
        password: '',
        passwordOk: ''
      }
    }
  },

  computed: {
    username () {
      return JSON.parse(localStorage.user).username
    },
    rules () {
      const checkPasswordOk = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'))
        } else if (value !== this.form.password) {
          callback(new Error('两次输入密码不一致!'))
        } else {
          callback()
        }
      }
      return {
        passwordOld: [
          { required: true, message: '密码不能为空', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '密码不能为空', trigger: 'blur' }
        ],
        passwordOk: [
          { validator: checkPasswordOk, trigger: 'blur' }
        ]
      }
    }
  },

  methods: {
    handleClick () {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          this.form.loading = true
          const params = {
            password: this.form.passwordOld,
            newPassword: this.form.password
          }
          API.PostAdminUpdatePassword(params)
            .then(data => {
              this.form.loading = false
              this.form.passwordOld = ''
              this.form.password = ''
              this.form.passwordOk = ''
              this.$message.success('密码修改成功！')
            })
            .catch(error => {
              this.form.loading = false
              this.$message.error(error.message)
            })
        }
      })
    }
  }
}
</script>

<style lang="css">
</style>

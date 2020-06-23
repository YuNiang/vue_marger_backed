<template lang="html">
  <el-card>
    <div slot="header">
      <span>系统设置</span>
    </div>

    <el-row :gutter="10">
      <el-col :sm="24">
        <el-form :model="form" :rules="rules" ref="form" label-width="200px" v-loading="loading">
          <el-form-item label="是否开启登录极验验证">
            <el-switch
              v-model="form.loginWithManMachine"
              active-text="开启"
              inactive-text="关闭"
              active-value="1"
              inactive-value="0"
              @change="setSystemParams('loginWithManMachine')"
              v-loading="form.loginWithManMachineLoading">
            </el-switch>
          </el-form-item>
          <el-form-item label="注册赠送刮刮卡次数" prop="">
            <el-input v-model="form.lotteryChanceAmountOfRegister" style="width: 200px;">
              <el-button slot="append" :loading="form.lotteryChanceAmountOfRegisterLoading" @click="setSystemParams('lotteryChanceAmountOfRegister')">保存</el-button>
            </el-input>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>

  </el-card>
</template>

<script>
import { GetSystemParams, PostSystemParams } from '@/api/system'

export default {
  name: 'systemsetting',

  data () {
    return {
      loading: false,
      form: {
        loginWithManMachineLoading: false,
        loginWithManMachine: '0',
        lotteryChanceAmountOfRegisterLoading: false,
        lotteryChanceAmountOfRegister: 5
      }
    }
  },

  created () {
    this.getSystemParams()
  },

  computed: {
    rules () {
      return {
        lotteryChanceAmountOfRegister: [
          { required: true, type: Number, min: 1, message: '请输入正确的数字', trigger: 'blur' }
        ]
      }
    }
  },

  methods: {
    getSystemParams () {
      this.loading = true
      GetSystemParams()
        .then(data => {
          if (data) {
            for (const key in data) {
              if (this.form.hasOwnProperty(key)) {
                this.form[key] = data[key]
              }
            }
          }
          this.loading = false
        })
        .catch(err => {
          this.loading = false
        })
    },

    setSystemParams (type) {
      this.form[`${type}Loading`] = true
      const _params = {
        type: type,
        value: this.form[type].toString()
      }
      PostSystemParams(_params)
        .then(data => {
          this.form[`${type}Loading`] = false
        })
        .catch(err => {
          this.getSystemParams()
          this.form[`${type}Loading`] = false
          this.$message.error(err.message)
        })
    }
  }
}
</script>

<style lang="css">
</style>

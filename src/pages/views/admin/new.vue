<template lang="html">
  <el-card>
    <div slot="header">
      <span>创建用户</span>
    </div>
    <el-row :gutter="10">
      <el-col :sm="{ span: 12, offset: 6 }">
        <el-form :model="form" :rules="rules" ref="form" label-position="top">
          <el-form-item label="用户ID" prop="username">
            <el-input v-model="form.username"></el-input>
          </el-form-item>
          <el-form-item label="姓名" prop="idname">
            <el-input v-model="form.idname"></el-input>
          </el-form-item>
          <el-form-item label="电话号码" prop="phone">
            <el-input v-model="form.phone"></el-input>
          </el-form-item>
          <el-form-item label="所属战队" prop="iTeamId">
            <el-select v-model="form.iTeamId" placeholder="请选择" filterable=true>
              <el-option v-for="(item, key) in teams" :key="key" :label="item.TeamDes" :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" :loading="form.loading" @click="handdleClick">创建</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </el-card>
</template>

<script>
import * as API from '@/api/admin'
import * as APIFIRST from '@/api/first'
export default {
  data() {
    return {
      form: {
        loading: false,
        username: '',
        idname:'',
        phone:'',
        iTeamId:0,
      },
      teams:{}
    }
  },
  async created () {
    await this.syncInfo();
  },
  computed: {
    rules() {
      return {
        username: [{
          required: true,
          message: '用户名不能为空',
          trigger: 'blur'
        }],
        idname: [{
          required: true,
          message: '真实姓名不能为空',
          trigger: 'blur'
        }],
        phone: [{
          required: true,
          message: '手机号码不能为空',
          trigger: 'blur'
        }]
      }
    }
  },

  methods: {
    handdleClick() {
      this.$refs['form'].validate((valid) => {
        if(valid) {
          this.form.loading = true
          const params = {
            username: this.form.username,
            phone:this.form.phone,
            idname:this.form.idname,
            iTeamId: this.form.iTeamId
          }
          API.PostAdmin(params).then(data => {
            this.form.loading = false
            this.form.username = ''
            this.form.idname = ''
            this.form.phone = ''
            this.form.iTeamId = 0
            this.$message.success('管理员创建成功！')
          }).catch(error => {
            this.form.loading = false
            this.$message.error(error.message)
          })
        }
      })
    },
    async syncInfo () {
      const teams = await APIFIRST.GetAllTeamBySeason();
      let tmp = {
        0:{"TeamDes":"非战队管理","id":0}
      };
      for(var i = teams.length - 1; i >= 0; i--){
        let detail = teams[i];
        tmp[detail.id] = detail;
      }
      this.teams = tmp;
    },
  }
}
</script>

<style lang="css">
  .app {
    background-color: #fff;
  }
</style>

<template lang="html">
  <el-card class="inside-warp">
    <div slot="header">
      <el-button @click="$router.go(-1)" size="mini" type="primary">返回</el-button>
      <span style="margin-left: 10px;">{{form.id ? `修改` : `新增`}}生态人员</span>
    </div>
    <el-row :gutter="12">
      <el-col :sm="16">
        <el-form :model="form" ref="form" label-width="120px">
          <el-form-item label="用户ID" prop="weChatUnionID"
            :rules="[{ required: true, message: '请输入用户ID', trigger: 'blur' }]">
            <el-input v-model="form.weChatUnionID" @change="handleChatUnionID" />
          </el-form-item>
          <el-form-item label="用户姓名" prop="IDName"
            :rules="[{ required: true, message: '请输入用户姓名', trigger: 'blur' }]">
            <el-input v-model="form.IDName" />
          </el-form-item>
          <el-form-item label="用户昵称" prop="nickname">
            <el-input v-model="form.nickname" />
          </el-form-item>
          <el-form-item label="用户电话" prop="phone"
            :rules="[{ required: true, message: '请输入用户电话', trigger: 'blur' }]">
            <el-input v-model="form.phone" :maxlength=11 @change="handleChatUnionID" />
          </el-form-item>
          <el-form-item prop="email" label="用户邮箱" :rules="[
              { required: true, message: '请输入邮箱地址', trigger: 'blur' },
              { type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur,change' }
            ]">
            <el-input v-model="form.email"></el-input>
          </el-form-item>
          <el-form-item label="角色设置" prop="roles" :rules="[{ required: true, message: '请选择所属队伍', trigger: 'blur' }]">
            <el-select v-model="form.roles" multiple placeholder="请选择" style="widht: 100%">
              <el-option
                v-for="item in roleList"
                :key="item.id"
                :label="item.label"
                :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button v-if="!form.id && !existence" type="primary" :loading="loading" @click="handleClick">提交</el-button>
            <el-button v-if="form.id || existence" type="primary" :loading="loading" @click="handleUpdataClick">{{existence ? '提交111' : '修改'}}</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </el-card>
</template>
<script>
import { getUrlParam } from '../../../utils/index'
import { saveUser, updateUser, queryUserByID, queryEcoRole, queryUser } from './service';
export default {
  data () {
    return {
      teamList: [],
      roleList: [],
      loading: false,
      id: getUrlParam('id'),
      existence: false,
      form: {
        roles: [],
      }
    }
  },
  created() {
    this.getEcoRole();
    this.getInsideByIdList();
  },
  methods: {
    handleChatUnionID(value) {
      const params = {
        search: value
      }
      return queryUser(params).then(res => {
        if (res.success && res.data.rows && res.data.rows.length) {
          this.existence = true;
          const data = res.data.rows[0] || {};
          this.form = data;
          let roles = [];
          data.roles && 
          data.roles.length && 
          data.roles.forEach(item => {
            roles.push(item.id)
          });
          this.$set(this.form, 'roles', roles);
        }
      })
    },
    getEcoRole() {
      const params = {
        type: 'eco'
      }
      return queryEcoRole(params).then(res => {
        if (res.success && res.data) {
          let data = res.data || [];
          let roleList = [];
          data.forEach(item => {
            roleList.push({
              label: item.name,
              id: item.id
            })
          })
          this.roleList = roleList;
        }
      })
    },
    getInsideByIdList() {
      const id = this.id;
      let params = { id };
      if (id) {
        return queryUserByID(params).then(res => {
          if (res.success) {
            this.form = res.data.data || {}
            let roles = [];
            res && res.data && 
            res.data.data && 
            res.data.data.roles &&
            res.data.data.roles.length && 
            res.data.data.roles.forEach(item => {
              roles.push(item.id)
            });
            this.form.roles = roles;
          } else {
            this.$message.error(res && res.message || '系统异常， 稍后再试！');
          }
        })
      }
    },
    handleUpdataClick() {
      const id = getUrlParam('id');
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.loading = true
          const params = this.form;
          params.id = getUrlParam('id');
          return updateUser(params).then(res => {
            if (res.success) {
              this.loading = false;
              this.$router.push({ path: `/staffing/ecoList` })
            } else {
              this.loading = false;
              this.$message.error(res && res.message || '系统异常， 稍后再试！');
            }
          })
        }
      })
    },
    handleClick () {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.loading = true
          const params = this.form;
          return saveUser(params).then(res => {
            if (res.success) {
              this.loading = false;
              this.$router.push({ path: `/staffing/ecoList` })
            } else {
              this.loading = false;
              this.$message.error(res && res.message || '系统异常， 稍后再试！');
            }
          })
        }
      })
    },
  }
}
</script>
<style scope>
  .inside-warp .el-select {
    width: 100%;
  }
</style>

<template lang="html">
  <el-card class="inside-warp">
    <div slot="header">
      <el-button @click="$router.go(-1)" size="mini" type="primary">返回</el-button>
      <span style="margin-left: 10px;">{{id ? `修改` : `新增`}}俱乐部人员</span>
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
            :rules="[
              { required: true, message: '请输入用户电话', trigger: 'blur' },
              { pattern: /^1\d{10}$/, trigger: 'blur', message: '请输入正确的手机号码' }
            ]">
            <el-input v-model="form.phone" :maxlength=11 @change="handleChatUnionID" />
          </el-form-item>
          <el-form-item label="用户邮箱" prop="email" :rules="[
              { required: true, message: '请输入邮箱地址', trigger: 'blur' },
              { type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur,change' }
            ]">
            <el-input v-model="form.email" />
          </el-form-item>
          <el-form-item label="俱乐部" prop="ClubID"
            :rules="[{ required: true, message: '请选择俱乐部', trigger: 'blur' }]">
            <el-select v-model="form.ClubID" placeholder="请选择" @change="handleChange" style="widht: 100%">
              <el-option
                v-for="item in teamList"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="所属战队" prop="TeamID" :rules="[{ required: true, message: '请选择所属队伍', trigger: 'blur' }]">
            <el-select v-model="form.TeamID" placeholder="请选择" style="widht: 100%">
              <el-option
                v-for="item in clubChildData"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="角色设置" prop="roles" :rules="[{ required: true, message: '请选择所属队伍', trigger: 'blur' }]">
            <el-select v-model="form.roles" multiple placeholder="请选择" style="widht: 100%">
              <el-option
                v-for="item in rolesList"
                :key="item.id"
                :label="item.label"
                :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button v-if="!id && !existence" type="primary" :loading="loading" @click="handleClick">提交</el-button>
            <el-button v-if="id || existence" type="primary" :loading="loading" @click="handleUpdate">{{existence ? '提交' : '修改'}}</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </el-card>
</template>

<script>
import { getUrlParam } from '../../../utils/index'
import { queryTeamList, saveUser, updateUser, queryUserByID, queryEcoRole, queryUser } from './service';
export default {
  data () {
    return {
      teamList: [],
      origData: [],
      clubChildData: [],
      rolesList: [],
      loading: false,
      existence: false,
      id: Number(getUrlParam('id')),
      teamMap:{},
      form: {
        roles: [],
      }
    }
  },
  async created() {
    await this.getTeamList();
    await this.getEcoRole();
    await this.getByIdList();
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
    async getEcoRole() {
      const params = {
        type: 'club'
      }
      const res = await queryEcoRole(params);
      if (res.success && res.data) {
        let data = res.data || [];
        let rolesList = [];
        data.forEach(item => {
          rolesList.push({
            label: item.name,
            id: item.id
          })
        })
        this.rolesList = rolesList;
      }
    },
    async getTeamList() {
      const res = await queryTeamList();
      if (res.success) {
        let teamList = [];
        if (res.data && res.data.length) {
          res.data.forEach(item => {
            if(item.LPL == 0){
              teamList.push({
                label: item.TeamDes,
                value: item.id,
              })
            }
            this.teamMap[item.id] = item;
          })
        }
        this.origData = res.data;
        this.teamList = teamList;
      }
    },
    async getByIdList() {
      const id = this.id;
      let params = { id, type: 'club' };
      if (id) {
        const res = await queryUserByID(params);
        if (res.success) {
          let roles = [];
          this.form = res.data.data || {}
          if (res.data.data && res.data.data.TeamID) {
            if(this.teamMap[res.data.data.TeamID]){
              const item  = this.teamMap[res.data.data.TeamID];
              if(item.LPL){
                this.$set(this.form, 'ClubID', item.LPL);
              }else{
                this.$set(this.form, 'ClubID', item.id);
              }
              this.handleChange(item.id);
              this.$set(this.form, 'TeamID', item.id);
            }
          }

          res.data &&
          res.data.data &&
          res.data.data.roles &&
          res.data.data.roles.length && 
          res.data.data.roles.forEach(item => {
            roles.push(item.id)
          });
          this.$set(this.form, 'roles', roles);
        } else {
          this.$message.error(res && res.message || '系统异常， 稍后再试！');
        }
      }
    },
    handleChange(value) {
      let clubChildData = [];
      this.$set(this.form, 'TeamID', "");
      this.origData.forEach(item => {
        if (value === item.id || value == item.LPL || value == item.LDL) {
          if(item.LPL == 0){
            clubChildData.push({
              label: '1队: ' + item.TeamDes,
              value: item.id
            })
          }else{
            clubChildData.push({
              label: '2队: ' + item.TeamDes,
              value: item.id
            })
          }
        }
      })
      this.clubChildData = clubChildData;
    },
    handleClick () {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.loading = true
          let params = this.form;
          params.type = 'club';

          return saveUser(params).then(res => {
            if (res.success) {
              this.form.loading = false;
              this.$router.push({ path: `/staffing/clubList` });
            } else {
              this.form.loading = false;
              this.$message.error(res && res.message || '系统异常， 稍后再试！');
            }
          })
        }
      })
    },
    handleUpdate () {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.loading = true
          let params = this.form;
          let roles = [];
          params.roles && params.roles.length &&
          params.roles.forEach(id => {
            roles.push(id)
          })
          params.roles = roles;
          params.id = this.id;
          params.type = 'club';
          return updateUser(params).then(res => {
            if (res.success) {
              this.form.loading = false;
              this.$router.push({ path: `/staffing/clubList` });
            } else {
              this.form.loading = false;
              this.$message.error(res && res.message || '系统异常， 稍后再试！');
            }
          })
        }
      })
    }
  }
}
</script>
<style lang="css">
  .inside-warp .el-select {
    width: 100%;
  }
</style>

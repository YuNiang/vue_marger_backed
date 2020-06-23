<template lang="html">
  <el-card>
    <div slot="header">
      <el-button @click="$router.go(-1)" size="mini" type="primary">返回</el-button>
      <span>{{pageName}}</span>
    </div>

    <div v-loading="loading">
      <el-row :gutter="10">
        <el-col :sm="24">
          <el-form :model="form" :rules="rules" ref="form" label-width="120px">
            <el-form-item label="微信UnionID" prop="weChatUnionID">
              <el-input v-model="form.weChatUnionID"></el-input>
            </el-form-item>
            <el-form-item label="电话号码" prop="phone">
              <el-input type="number" :rows="3" v-model="form.phone"></el-input>
            </el-form-item>
            <el-form-item label="身份证号" prop="IDNumber" v-show="this.type === 'edit'">
              <el-input type="number" :rows="3" v-model="form.IDNumber"></el-input>
            </el-form-item>
            <el-form-item label="真实姓名" prop="IDName">
              <el-input v-model="form.IDName"></el-input>
            </el-form-item>
            <el-form-item label="昵称" prop="nickname">
              <el-input v-model="form.nickname"></el-input>
            </el-form-item>
            <el-form-item label="邮箱" prop="email" v-show="this.type === 'edit'">
              <el-input type="email" :rows="3" v-model="form.email"></el-input>
            </el-form-item>

            <el-form-item>
              <el-button type="primary" :loading="form.loading" @click="handleClick">提交</el-button>
            </el-form-item>

          </el-form>
        </el-col>
      </el-row>
    </div>
  </el-card>
</template>

<script>
  import * as API from '@/api/admin';

  export default {
    name: 'useraddedit',

    data () {
      return {
        type: null,
        pageName: '',
        modal: {},
        form: {
          loading: false,
          id: null,
          weChatUnionID: '',
          nickname: '',
          IDName: '',
          IDNumber: '',
          phone: '',
          email: ''
        }
      }
    },

    computed: {
      rules () {
        const checkPhoneUnionId = (rule, value, callback) => {
          if ((!this.form.phone || !this.form.phone.trim()) && (!this.form.weChatUnionID || !this.form.weChatUnionID.trim())) {
            callback(new Error('请输入电话号码 或者 微信UnionID!'));
          } else {
            callback();
          }
        };
        return {
          weChatUnionID: [
            { min: 0, max: 64, message: '长度在 0 到 64 个字符', trigger: 'blur' },
            { validator: checkPhoneUnionId, trigger: 'blur' }
          ],
          phone: [
            { min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur' },
            { validator: checkPhoneUnionId, trigger: 'blur' }
          ],
          nickname: [
            { min: 0, max: 30, message: '长度在 0 到 30 个字符', trigger: 'blur' }
          ],
          IDName: [
            { required: true, message: '请输入真实姓名', trigger: 'blur' },
            { min: 0, max: 50, message: '长度在 0 到 50 个字符', trigger: 'blur' }
          ],
          IDNumber: [
            { min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur' }
          ],
          email: [
            { type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur' },
            { min: 0, max: 100, message: '长度在 0 到 100 个字符', trigger: 'blur' }
          ]
        }
      }
    },

    watch: {
      modal (val) {
        this.form = {...this.modal};
        sessionStorage.user = JSON.stringify(val)
      }
    },

    created() {
      this.form.id = this.$route.query.id || null;
      this.type = this.form.id ? 'edit' : 'add';
      if (this.type === 'edit') {
        this.pageName = '用户编辑';
        this.form.loading = true;
        API.GetAuthUserById({id: this.form.id})
          .then(result => {
            this.form.loading = false;
            let {success, errMsg, data} = result;
            if (!success || !data) {
              this.$message.error(errMsg || '获取用户错误！');
              return;
            }
            this.modal = data;
          })
          .catch(error => {
            this.$message.error(error.message);
            this.form.loading = false;
          });

      } else {
        this.pageName = '用户添加';
      }
    },

    methods: {
      handleClick () {
        this.$refs.form.validate((valid) => {
          if (valid) {
            this.form.loading = true;
            if (this.type === 'add') {
              const data = {
                weChatUnionID: this.form.weChatUnionID,
                phone: this.form.phone,
                nickname: this.form.nickname,
                IDName: this.form.IDName
              };
              API.PostAuthUser(data)
                .then(result => {
                  let {success, errMsg, data} = result;
                  this.form.loading = false;
                  if (!success) {
                    this.$message.error(errMsg || '添加用户错误！');
                    return;
                  }
                  if (data) {
                    this.modal = data;
                    this.$message.success('添加用户成功！');
                    setTimeout(() => {
                      this.$router.go(-1)
                    }, 1500)
                  }
                })
                .catch(error => {
                  this.$message.error(error.message);
                  this.form.loading = false
                })
            } else if (this.type === 'edit') {
              const data = {
                id: this.modal.id,
                weChatUnionID: this.form.weChatUnionID,
                nickname: this.form.nickname,
                IDName: this.form.IDName,
                IDNumber: this.form.IDNumber,
                phone: this.form.phone,
                email: this.form.email
              };
              API.PostAuthUserId(data)
                .then(result => {
                  let {success, errMsg, data} = result;
                  this.form.loading = false;
                  if (!success) {
                    this.$message.error(errMsg || '修改用户错误！');
                    return;
                  }
                  if (data) {
                    this.modal = data;
                    this.$message.success('修改用户成功！');
                    setTimeout(() => {
                      this.$router.go(-1)
                    }, 1500)
                  }
                })
                .catch(error => {
                  this.$message.error(error.message);
                  this.form.loading = false
                })
            }

          }
        })
      }
    }
  }
</script>

<style lang="css">

</style>

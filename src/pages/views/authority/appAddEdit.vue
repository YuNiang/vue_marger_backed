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
            <el-form-item label="应用名称" prop="name">
              <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="邮箱" prop="email">
              <el-input v-model="form.email"></el-input>
            </el-form-item>
            <el-form-item label="过期时间" prop="expiredAt">
              <el-date-picker
                v-model="form.expiredAt"
                format="yyyy-MM-dd"
                value-format="yyyy-MM-dd"
                type="date">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="备注" prop="remark">
              <el-input type="textarea" :rows="3" v-model="form.remark"></el-input>
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
  import * as API from '@/api/admin'

  export default {
    name: 'appaddedit',

    data () {
      return {
        type: null,
        pageName: '',
        modal: {},
        form: {
          loading: false,
          id: null,
          name: '',
          email: '',
          remark: '',
          expiredAt: ''
        }
      }
    },

    computed: {
      rules () {
        return {
          name: [
            { required: true, message: '请输入应用名称', trigger: 'blur' },
            { min: 0, max: 30, message: '长度在 0 到 30 个字符', trigger: 'blur' }
          ],
          email: [
            { required: true, message: '请输入邮箱', trigger: 'blur' },
            { type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur' },
            { min: 0, max: 100, message: '长度在 0 到 100 个字符', trigger: 'blur' }
          ],
          expiredAt: [
            { required: true, message: '请输入过期时间', trigger: 'blur' },
          ],
          remark: [
            { min: 0, max: 200, message: '长度在 1 到 200 个字符', trigger: 'blur' }
          ]
        }
      }
    },

    watch: {
      modal (val) {
        this.form.id = val.id;
        this.form.name = val.name;
        this.form.email = val.email;
        this.form.remark = val.remark;
        let expiredAt = new Date(val.expiredAt);
        let year = expiredAt.getFullYear();
        let month = expiredAt.getMonth() + 1;
        let date = expiredAt.getDate();
        this.form.expiredAt = year + '-' + (month < 10 ? ('0' + month) : month) + '-' + (date < 10 ? ('0' + date) : date);
        sessionStorage.app = JSON.stringify(val)
      }
    },

    created() {
      this.form.id = this.$route.query.id || null;
      this.type = this.form.id ? 'edit' : 'add';
      if (this.type === 'edit') {
        this.pageName = '应用编辑';
        this.form.loading = true;
        API.GetAuthAppById({id: this.form.id})
          .then(result => {
            this.form.loading = false;
            let {success, errMsg, data} = result;
            if (!success || !data) {
              this.$message.error(errMsg || '获取应用错误！');
              return;
            }
            this.modal = data;
          })
        .catch(error => {
          this.$message.error(error.message);
          this.form.loading = false;
        });

      } else {
        this.pageName = '应用添加';
      }
    },

    methods: {
      handleClick () {
        this.$refs.form.validate((valid) => {
          if (valid) {
            this.form.loading = true;
            let data = {
              name: this.form.name,
              email: this.form.email,
              remark: this.form.remark,
              expiredAt: this.form.expiredAt
            };
            if (this.type === 'add') {
              API.PostAuthApp(data)
                .then(result => {
                  let {success, errMsg, data} = result;
                  this.form.loading = false;
                  if (!success) {
                    this.$message.error(errMsg || '添加应用错误！');
                    return;
                  }
                  if (data) {
                    this.modal = data;
                    this.$message.success('添加应用成功！');
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
              data.id = this.form.id;
              API.PostAuthAppId(data)
                .then(result => {
                  let {success, errMsg, data} = result;
                  this.form.loading = false;
                  if (!success) {
                    this.$message.error(errMsg || '修改应用错误！');
                    return;
                  }
                  if (data) {
                    this.modal = data;
                    this.$message.success('修改应用成功！');
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

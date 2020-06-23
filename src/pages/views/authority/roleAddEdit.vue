<template lang="html">
  <el-card>
    <div slot="header">
      <el-button @click="$router.go(-1)" size="mini" type="primary">返回</el-button>
      <span>{{pageName}}</span>
    </div>

    <el-row :gutter="10">
      <el-col :sm="24">
        <el-form :model="form" :rules="rules" ref="form" label-width="120px">
          <el-form-item label="角色名称" prop="name">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="角色代号" prop="code">
            <el-input v-model="form.code"></el-input>
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

  </el-card>
</template>

<script>
import * as API from '@/api/admin'

export default {
  name: 'roleaddedit',

  data () {
    return {
      type: null,
      pageName: '',
      modal: {},
      form: {
        loading: false,
        id: null,
        name: '',
        code: '',
        remark: ''
      }
    }
  },

  computed: {
    rules () {
      return {
        name: [
          { required: true, message: '请输入角色名称', trigger: 'blur' },
          { min: 2, max: 20, message: '长度在 2 到 20 个字符', trigger: 'blur' }
        ],
        code: [
          { required: true, message: '请输入角色代号', trigger: 'blur' },
          { min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur' }
        ],
        remark: [
          { required: true, message: '请输入角色备注', trigger: 'blur' },
          { min: 6, max: 200, message: '长度在 6 到 200 个字符', trigger: 'blur' }
        ]
      }
    }
  },

  watch: {
    modal (val) {
      this.form = {...this.modal};
      sessionStorage.role = JSON.stringify(val)
    }
  },

  created() {
    this.form.id = this.$route.query.id || null;
    this.type = this.form.id ? 'edit' : 'add';
    if (this.type === 'edit') {
      this.pageName = '角色编辑';
      this.form.loading = true;
      API.GetAuthRoleById({id: this.form.id})
        .then(result => {
          this.form.loading = false;
          let {success, errMsg, data} = result;
          if (!success || !data) {
            this.$message.error(errMsg || '获取角色错误！');
            return;
          }
          this.modal = data;
        })
        .catch(error => {
          this.$message.error(error.message);
          this.form.loading = false;
        });

    } else {
      this.pageName = '角色添加';
    }
  },

  methods: {
    handleClick () {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.form.loading = true;
          let data = {
            name: this.form.name,
            code: this.form.code,
            remark: this.form.remark
          };
          if (this.type === 'add') {
            API.PostAuthRole(data)
              .then(result => {
                let {success, errMsg, data} = result;
                this.form.loading = false;
                if (!success) {
                  this.$message.error(errMsg || '添加角色错误！');
                  return;
                }
                if (data) {
                  this.modal = data;
                  this.$message.success('添加角色成功！');
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
            data.id = this.modal.id;
            API.PostAuthRoleId(data)
              .then(result => {
                let {success, errMsg, data} = result;
                this.form.loading = false;
                if (!success) {
                  this.$message.error(errMsg || '修改角色错误！');
                  return;
                }
                if (data) {
                  this.modal = data;
                  this.$message.success('修改角色成功！');
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

<style lang="css" scoped>


</style>

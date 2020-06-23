<template lang="html">
  <el-card>
    <div slot="header">
      <el-button @click="$router.go(-1)" size="mini" type="primary">返回</el-button>
      <span>{{pageName}}</span>
    </div>

    <el-row :gutter="10">
      <el-col :sm="24">
        <el-form :model="form" :rules="rules" ref="form" label-width="120px">
          <el-form-item label="服务名称" prop="service">
            <el-select v-model="form.service" filterable clearable allow-create placeholder="请输入服务名称" size="small">
              <el-option
                v-for="item in serviceOptions"
                :key="item.name"
                :label="item.name"
                :value="item.name">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="方法" prop="method">
            <el-radio-group v-model="form.method">
              <el-radio v-for="item of methodOptions" @click.native.prevent="setMethod(item.value)" :label="item.value" :key="item.value">{{item.label}}</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="路径" prop="path">
            <el-input type="textarea" :rows="3" v-model="form.path"></el-input>
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
// todo

export default {
  name: 'routeaddedit',

  data () {
    return {
      tyoe: null,
      pageName: '',
      modal: {},
      currIndex: '',
      form: {
        loading: false,
        id: null,
        service: '',
        method: '',
        path: '',
        remark: ''
      },
      methodOptions: [
        {
          label: 'Get',
          value: 'GET'
        },
        {
          label: 'Post',
          value: 'POST'
        },
        {
          label: 'Func',
          value: 'FUNC'
        }
      ],
      serviceOptions: [],
    }
  },

  computed: {
    rules () {
      return {
        service: [
          { required: true, message: '请输入服务名称', trigger: 'blur' },
          { min: 1, max: 50, message: '长度在 1 到 50 个字符', trigger: 'blur' }
        ],
        method: [
          { min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur' }
        ],
        path: [
          { min: 1, max: 200, message: '长度在 1 到 200 个字符', trigger: 'blur' }
        ],
        remark: [
          { required: true, message: '请输入备注', trigger: 'blur' },
          { min: 6, max: 200, message: '长度在 6 到 200 个字符', trigger: 'blur' }
        ]
      }
    }
  },

  created () {
    this.setDefaultRoute();
    this.getAuthDistinctOptions();
  },

  watch: {
    modal (val) {
      this.form = {...this.modal};
      sessionStorage.route = JSON.stringify(val)
    }
  },

  methods: {
    setMethod (value) {
      this.form.method = this.form.method === value ? '' : value;
    },
    setDefaultRoute () {
      this.form.id = this.$route.query.id || null;
      this.type = this.form.id ? 'edit' : 'add';
      if (this.type === 'edit') {
        this.pageName = '接口编辑';
        this.form.loading = true;
        API.GetAuthRouteById({id: this.form.id})
          .then(result => {
            this.form.loading = false;
            let {success, errMsg, data} = result;
            if (!success || !data) {
              this.$message.error(errMsg || '获取接口错误！');
              return;
            }
            this.modal = data;
          })
          .catch(error => {
            this.$message.error(error.message);
            this.form.loading = false;
          });

      } else {
        this.pageName = '接口添加';
      }
    },
    getAuthDistinctOptions () {
      API.GetAuthDistinctOptions()
        .then(result => {
          let {success, errMsg, data} = result;
          if (!success) {
            this.$message.error(errMsg || '错误！');
            return;
          }
          if (data) {
            this.serviceOptions = data;
          }
        })
    },
    handleClick () {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.form.loading = true;
          let data = {
            service: this.form.service,
            method: this.form.method,
            path: this.form.path,
            remark: this.form.remark
          };
          if (this.type === 'add') {
            API.PostAuthRoute(data)
              .then(result => {
                let {success, errMsg, data} = result;
                this.form.loading = false;
                if (!success) {
                  this.$message.error(errMsg || '添加接口错误！');
                  return;
                }
                if (data) {
                  this.modal = data;
                  this.$message.success('添加接口成功！');
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
            API.PostAuthRouteId(data)
              .then(result => {
                let {success, errMsg, data} = result;
                this.form.loading = false;
                if (!success) {
                  this.$message.error(errMsg || '修改接口错误！');
                  return;
                }
                if (data) {
                  this.modal = data;
                  this.$message.success('修改接口成功！');
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

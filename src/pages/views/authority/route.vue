<template lang="html">
  <el-card>
    <div slot="header">
      <span>接口管理</span>

      <router-link :to="{ name: 'authrouteaddedit', query: { type: 'add' } }" v-if="hasAuth('auth-route-add')">
        <el-button style="float: right; padding: 3px 0" type="text">添加</el-button>
      </router-link>
    </div>

    <div>
      <el-row class="filter-row">
        <el-select v-model="filter.value.service" filterable="filterable" clearable placeholder="请选择服务名称" size="small" @change="getAuthRouteByService">
          <el-option
            v-for="item in filter.options.service"
            :key="item.name"
            :label="item.name"
            :value="item.name">
          </el-option>
        </el-select>

        <el-select v-model="filter.value.pathSortLevel" filterable="filterable" clearable placeholder="请选择路径前缀层级" size="small" @change="buildPathType">
          <el-option
            v-for="item in filter.options.pathSortLevel"
            :key="item"
            :label="item"
            :value="item">
          </el-option>
        </el-select>

        <el-select v-model="filter.value.pathType" filterable="filterable" clearable placeholder="请选择路径前缀" size="small" @change="displayData=''">
          <el-option
            v-for="item in filter.options.pathType"
            :key="item"
            :label="item"
            :value="item">
          </el-option>
        </el-select>
      </el-row>

      <el-table class="width-full" :stripe="true" size="mini" :data="displayData" v-loading="list.loading">
        <el-table-column
          prop="id"
          label="ID"
          min-width="70">
        </el-table-column>
        <el-table-column
          prop="service"
          label="服务名称"
          min-width="120">
        </el-table-column>
        <el-table-column
          prop="method"
          label="方法"
          min-width="100">
        </el-table-column>
        <el-table-column
          prop="path"
          label="路径"
          min-width="200">
        </el-table-column>
        <el-table-column
          prop="remark"
          label="Remark"
          min-width="120">
        </el-table-column>
        <el-table-column
          prop="action"
          label="操作"
          align="right"
          min-width="120"
          v-if="hasAuth('auth-route-edit') || hasAuth('auth-route-delete')">
          <template slot-scope="scope">
            <el-button type="primary" size="mini" @click="edit(scope.row)" v-if="hasAuth('auth-route-edit')">编辑</el-button>
            <el-button type="danger" size="mini" @click="postDelete(scope.row.id)" v-if="hasAuth('auth-route-delete')">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        :current-page.sync="list.page"
        :page-size="list.size"
        layout="total, prev, pager, next"
        :total="list.count">
      </el-pagination>
    </div>
  </el-card>
</template>

<script>
  import * as API from '@/api/admin'

  export default {
    data () {
      return {
        list: {
          loading: false,
          page: 1,
          size: 30,
          count: 0,
          rows: []
        },

        filter: {
          value: {
            service: '',
            pathSortLevel: 2,
            pathType: ''
          },
          options: {
            service: [],
            pathType: [],
            pathSortLevel: [1, 2, 3, 4, 5]
          }
        }
      }
    },

    computed: {
      routeCodeArr () {
        return JSON.parse(localStorage.routeCodeArr)
      },
      displayData: {
        get () {
          const page = this.list.page;
          const size = this.list.size;
          let data = JSON.parse(JSON.stringify(this.list.rows));
          if (this.filter.value.pathSortLevel && this.filter.value.pathType && this.filter.value.pathType) { // 根据pathType过滤一下
            data = this.list.rows.filter(row => row.path.split("/").splice(0, Number(this.filter.value.pathSortLevel) + 1).join('/') === this.filter.value.pathType);
          }
          return data.slice((page - 1) * size, page * size);
        },
        set () {
          if (this.filter.value.pathSortLevel && this.filter.value.pathType) {
            this.list.count = this.list.rows.filter(row => row.path.split("/").splice(0, Number(this.filter.value.pathSortLevel) + 1).join('/') === this.filter.value.pathType).length
          } else {
            this.list.count = this.list.rows.length;
          }
        }
      }
    },

    created () {
      this.getAuthDistinctOptions().then(() => {
        this.getAuthRouteByService();
      })
    },

    methods: {
      getAuthDistinctOptions () {
        return API.GetAuthDistinctOptions()
          .then(result => {
            let {success, errMsg, data} = result;
            if (!success) {
              this.$message.error(errMsg || '错误！');
              return;
            }
            if (data) {
              this.filter.options.service = data;
            }
          })
      },
      getAuthRouteByService () {
        if (this.filter.options.service.length) {
          this.list.loading = true;
          this.filter.value.pathType = '';
          this.filter.value.service = this.filter.value.service ? this.filter.value.service : this.filter.options.service[0].name;
          const params = {
            service: this.filter.value.service
          };
          API.GetAuthRouteByService(params)
            .then(result => {
              let {success, errMsg, data} = result;
              this.list.loading = false;
              if (!success) {
                this.$message.error(errMsg || '错误！');
                return;
              }
              if (data) {
                this.list.rows = data;
                this.list.count = data.length;
                this.buildPathType();
              }
            })
            .catch(() => {
              this.list.loading = false
            })
        }
      },
      buildPathType() {
        this.displayData = '';
        this.filter.value.pathType = '';
        if (this.filter.value.pathSortLevel) {
          let pathTypeOptionSet = new Set();
          this.list.rows.forEach(item => {
            let arr = item.path.split("/");
            arr[Number(this.filter.value.pathSortLevel)] ? pathTypeOptionSet.add(arr.splice(0, Number(this.filter.value.pathSortLevel) + 1).join('/')) : '';
          });
          this.filter.options.pathType = [...pathTypeOptionSet].sort((a, b) => {return a.localeCompare(b)});
        } else {
          this.filter.options.pathType = []
        }
      },
      edit (data) {
        this.$router.push({
          name: 'authrouteaddedit',
          query: { id: data.id }
        })
      },
      postDelete (id) {
        this.$confirm('此操作将永久删除该接口, 是否继续?', '提示', {
          type: 'warning',
          beforeClose: (action, instance, done) => {
            if (action === 'confirm') {
              instance.confirmButtonLoading = true;
              API.PostAuthRouteDelete({id})
                .then(result => {
                  let {success, errMsg, data} = result;
                  instance.confirmButtonLoading = false;
                  done();
                  if (!success) {
                    this.$message.error(errMsg || '错误！');
                    return;
                  }
                  if (data) {
                    this.$message.success('删除成功');
                    this.removeItem(this.list.rows, id);
                  }
                })
                .catch(error => {
                  this.$message.error(error.message);
                  instance.confirmButtonLoading = false;
                  done()
                })
            } else {
              done()
            }
          }
        }).catch(() => {})
      },
      removeItem (obj, id) {
        let _i = {}
        for (var item in obj) {
          if (obj.hasOwnProperty(item)) {
            _i = obj[item]
            if (_i.id === id) {
              obj.splice(item, 1)
            }
          }
        }
      }
    }
  }
</script>

<style lang="css" scoped>
  .filter-row {
    margin-bottom: 5px;
  }
</style>

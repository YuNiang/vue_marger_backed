<template lang="html">
  <el-card>
    <div slot="header">
      <span>应用列表</span>

      <router-link :to="{ name: 'authappaddedit' }" v-if="hasAuth('auth-app-add')">
        <el-button style="float: right; padding: 3px 0" type="text">添加</el-button>
      </router-link>
    </div>

    <div>
      <el-table class="width-full" :stripe="true" size="mini" :data="list.rows" v-loading="list.loading">
        <el-table-column prop="id" label="ID" min-width="70"></el-table-column>
        <el-table-column prop="name" label="应用名称" min-width="120"></el-table-column>
        <el-table-column prop="appID" label="应用ID" min-width="230">
          <template slot-scope="scope">
            <div class="display-flex">
              <i class="el-icon-copy-document" v-clipboard="scope.row.appID" @success="copySuccess" @error="copyError"></i>
              {{scope.row.appID}}
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="secret" label="密钥">
          <template slot-scope="scope">
            <div class="display-flex">
              <i class="el-icon-copy-document" v-clipboard="scope.row.secret" @success="copySuccess" @error="copyError"></i>
              <el-tooltip class="item" effect="dark" :content="scope.row.secret" placement="top">
                <i class="el-icon-view" @click="scope.row.secretShow=!scope.row.secretShow"></i>
              </el-tooltip>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="email" label="邮箱" min-width="160"></el-table-column>
        <el-table-column prop="expiredAt" label="过期时间" min-width="120">
          <template slot-scope="scope">
            {{ scope.row.expiredAt | date }}
          </template>
        </el-table-column>
        <el-table-column prop="roleNameArr" label="角色名称" min-width="220">
          <template slot-scope="scope">
            <el-tag v-for="item of scope.row.roleNameArr" :key="item" size="small">{{item}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="createdAt" label="创建时间" min-width="120">
          <template slot-scope="scope">
            {{ scope.row.createdAt | datetime }}
          </template>
        </el-table-column>
        <el-table-column prop="action" label="操作" align="right" min-width="200"
                         v-if="hasAuth('auth-app-role-bulk') || hasAuth('auth-app-edit') || hasAuth('auth-app-delete')">>
          <template slot-scope="scope">
            <el-button type="success" size="mini" @click="setRole(scope.row)" v-if="hasAuth('auth-app-role')">设置角色</el-button>
            <el-button type="primary" size="mini" @click="edit(scope.row)" v-if="hasAuth('auth-app-edit')">编辑</el-button>
            <el-button type="danger" size="mini" @click="postDelete(scope.row.id)" v-if="hasAuth('auth-app-delete')">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        @current-change="getApp"
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
      }
    }
  },

  created () {
    this.getApp()
  },

  computed: {
    routeCodeArr () {
      return JSON.parse(localStorage.routeCodeArr)
    }
  },

  methods: {
    copySuccess() {
      this.$message.success('复制成功！');
    },
    copyError() {
      this.$message.error('复制失败！');
    },
    getApp () {
      this.list.loading = true;
      const params = {
        page: this.list.page,
        size: this.list.size
      };
      API.GetAuthApp(params)
        .then(result => {
          let {success, errMsg, data} = result;
          this.list.loading = false;
          if (!success) {
            this.$message.error(errMsg || '错误！');
            return;
          }
          if (data) {
            this.list.count = Number(data.count ? data.count : 0);
            this.list.rows = data.rows.map(app => {
              app.roleNameArr = [];
              app.roles.forEach(role => {
                app.roleNameArr.push(role.name);
              });
              app.secretShow = false;
              return app;
            })
          }
        })
        .catch(() => {
          this.list.loading = false
        })
    },

    postDelete (id) {
      this.$confirm('此操作将永久删除该应用, 是否继续?', '提示', {
        type: 'warning',
        beforeClose: (action, instance, done) => {
          if (action === 'confirm') {
            instance.confirmButtonLoading = true;
            API.PostAuthAppDelete({id})
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
      }).catch(() => {
      })
    },
    removeItem (obj, id) {
      let _i = {};
      for (var item in obj) {
        if (obj.hasOwnProperty(item)) {
          _i = obj[item];
          if (_i.id === id) {
            obj.splice(item, 1)
          }
        }
      }
      obj.count--
    },

    setRole (data) {
      this.$router.push({
        name: 'authappsetrole',
        query: { id: data.id, name: data.name }
      })
    },
    edit (data) {
      this.$router.push({
        name: 'authappaddedit',
        query: { id: data.id }
      })
    }
  }
}
</script>

<style lang="less">
  i {
    color: #409EFF;
    font-size: 20px;

    &:hover,
    &:active{
      cursor: pointer;
      opacity: 0.6;
    }

    &.el-icon-copy-document {
      margin-right: 8px;
    }
  }

  .display-flex {
    display: flex;
  }

  .el-tag:not(:last-child) {
    margin-right: 5px;
  }
</style>

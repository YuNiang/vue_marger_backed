<template lang="html">
  <el-card>
    <div slot="header">
      <span>角色管理</span>

      <router-link :to="{ name: 'authroleaddedit' }" v-if="hasAuth('auth-role-add')">
        <el-button style="float: right; padding: 3px 0" type="text">添加</el-button>
      </router-link>
    </div>

    <div>
      <el-table class="width-full" :stripe="true" size="mini" :data="list.rows" v-loading="list.loading">
        <el-table-column
          prop="id"
          label="ID"
          min-width="70">
        </el-table-column>
        <el-table-column
          prop="name"
          label="角色名称"
          min-width="130">
        </el-table-column>
        <el-table-column
          prop="code"
          label="角色代号"
          min-width="130">
        </el-table-column>
        <el-table-column
          prop="remark"
          label="Remark"
          min-width="150">
        </el-table-column>
        <el-table-column
          prop="action"
          label="操作"
          align="right"
          min-width="230"
          v-if="hasAuth('auth-role-route-bulk') || hasAuth('auth-role-edit') || hasAuth('auth-role-delete')">
          <template slot-scope="scope">
            <el-button type="success" size="mini" @click="setRoute(scope.row)" v-if="hasAuth('auth-role-route')">设置接口</el-button>
            <el-button type="primary" size="mini" @click="edit(scope.row)" v-if="hasAuth('auth-role-edit')">编辑</el-button>
            <el-button type="danger" size="mini" @click="postDelete(scope.row.id)" v-if="hasAuth('auth-role-delete')">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        @current-change="getAuthRole"
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

  computed: {
    routeCodeArr () {
      return JSON.parse(localStorage.routeCodeArr)
    }
  },

  created () {
    this.getAuthRole()
  },

  methods: {
    getAuthRole () {
      this.list.loading = true;
      const params = {
        page: this.list.page,
        size: this.list.size
      };
      API.GetAuthRole(params)
        .then(result => {
          let {success, errMsg, data} = result;
          this.list.loading = false;
          if (!success) {
            this.$message.error(errMsg || '错误！');
            return;
          }
          if (data) {
            this.list.count = Number(data.count ? data.count : 0);
            this.list.rows = data.rows;
          }
        })
        .catch(() => {
          this.list.loading = false
        })
    },

    setRoute (data) {
      this.$router.push({
        name: 'authrolesetroute',
        query: { id: data.id, name: data.name }
      })
    },

    edit (data) {
      this.$router.push({
        name: 'authroleaddedit',
        query: { id: data.id }
      })
    },

    postDelete (id) {
      this.$confirm('此操作将永久删除该角色, 是否继续?', '提示', {
          type: 'warning'
        }).then(() => {
          API.PostAuthRoleDelete({id})
            .then(result => {
              let {success, errMsg, data} = result;
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
              this.$message.error(error.message)
            })
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
    }
  }
}
</script>

<style lang="css">
</style>

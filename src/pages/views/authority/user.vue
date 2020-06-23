<template lang="html">
  <el-card>
    <div slot="header">
      <span>用户列表</span>

      <router-link :to="{ name: 'authuseraddedit' }" v-if="hasAuth('auth-user-add')">
        <el-button style="float: right; padding: 3px 0" type="text">添加</el-button>
      </router-link>
    </div>

    <div>
      <el-table class="width-full" :stripe="true" size="mini" :data="list.rows" v-loading="list.loading">
        <el-table-column prop="id" label="ID" min-width="40">
        </el-table-column>
        <el-table-column prop="weChatUnionID" label="微信UnionID" min-width="160">
        </el-table-column>
        <el-table-column prop="phone" label="电话号码">
        </el-table-column>
        <el-table-column prop="IDName" label="真实姓名">
        </el-table-column>
        <el-table-column prop="nickname" label="昵称">
        </el-table-column>
        <el-table-column prop="IDNumber" label="身份证号" min-width="100">
        </el-table-column>
        <el-table-column prop="email" label="邮箱" min-width="100">
        </el-table-column>
        <el-table-column prop="roleNameArr" label="角色名称" min-width="200">
          <template slot-scope="scope">
            <el-tag v-for="item of scope.row.roleNameArr" :key="item" size="small">{{item}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="createdAt" label="创建时间" min-width="90">
          <template slot-scope="scope">
            {{ scope.row.createdAt | datetime }}
          </template>
        </el-table-column>
        <el-table-column
          prop="action"
          label="操作"
          align="right"
          min-width="200"
          v-if="hasAuth('auth-user-role-bulk') || hasAuth('auth-user-edit') || hasAuth('auth-user-delete')">
          <template slot-scope="scope">
            <el-button type="success" size="mini" @click="setRole(scope.row)" v-if="hasAuth('auth-user-role')">设置角色</el-button>
            <el-button type="primary" size="mini" @click="edit(scope.row)" v-if="hasAuth('auth-user-edit')">编辑</el-button>
            <el-button type="danger" size="mini" @click="postDelete(scope.row.id)" v-if="hasAuth('auth-user-delete')">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        @current-change="getUser"
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
    this.getUser()
  },

  computed: {
    routeCodeArr () {
      return JSON.parse(localStorage.routeCodeArr)
    }
  },

  methods: {
    getUser () {
      this.list.loading = true;
      const params = {
        page: this.list.page,
        size: this.list.size
      };
      API.GetAuthUser(params)
        .then(result => {
          let {success, errMsg, data} = result;
          this.list.loading = false;
          if (!success) {
            this.$message.error(errMsg || '错误！');
            return;
          }
          if (data) {
            this.list.count = Number(data.count ? data.count : 0);
            this.list.rows = data.rows.map(user => {
              user.roleNameArr = [];
              user.roles.forEach(role => {
                user.roleNameArr.push(role.name);
              });
              return user;
            })
          }
        })
        .catch(() => {
          this.list.loading = false
        })
    },

    postDelete (id) {
      this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
        type: 'warning',
        beforeClose: (action, instance, done) => {
          if (action === 'confirm') {
            instance.confirmButtonLoading = true;
            API.PostAuthUserDelete({id})
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
      let _i = {}
      for (var item in obj) {
        if (obj.hasOwnProperty(item)) {
          _i = obj[item]
          if (_i.id === id) {
            obj.splice(item, 1)
          }
        }
      }
      obj.count--
    },

    setRole (data) {
      this.$router.push({
        name: 'authusersetrole',
        query: { id: data.id, IDName: data.IDName }
      })
    },
    edit (data) {
      this.$router.push({
        name: 'authuseraddedit',
        query: { id: data.id }
      })
    }
  }
}
</script>

<style lang="css">
  .el-tag:not(:last-child) {
    margin-right: 5px;
  }
</style>

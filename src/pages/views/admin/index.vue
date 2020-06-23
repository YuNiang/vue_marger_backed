<template lang="html">
  <el-card>
    <div slot="header">
      <span>管理员列表</span>
    </div>

    <div>
      <el-table class="width-full" :stripe="true" size="mini" :data="list.rows" v-loading="list.loading">
        <el-table-column
          prop="id"
          label="ID"
          min-width="120">
        </el-table-column>
        <el-table-column
          prop="adminname"
          label="昵称"
          min-width="180">
        </el-table-column>
        <el-table-column
          prop="idname"
          label="姓名"
          min-width="180">
        </el-table-column>
        <el-table-column
          prop="phone"
          label="电话号码"
          min-width="180">
        </el-table-column>
        <el-table-column
          prop="username"
          label="用户名"
          min-width="180">
        </el-table-column>
        <el-table-column
          prop="createdAt"
          label="创建时间"
          min-width="150">
          <template slot-scope="scope">
            {{ scope.row.createdAt | datetime }}
          </template>
        </el-table-column>
        <el-table-column
          prop="action"
          label="操作"
          align="right"
          min-width="150">
          <template slot-scope="scope">
            <el-button type="primary" size="mini" @click="setRole(scope.row.id)">设置角色</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        @current-change="getAdmin"
        :current-page.sync="list.page"
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
        count: 0,
        rows: []
      }
    }
  },

  created () {
    this.getAdmin()
  },

  methods: {
    getAdmin () {
      this.list.loading = true
      const params = {
        page: this.list.page
      }
      API.GetAdmin(params)
        .then(data => {
          this.list.loading = false
          this.list.count = data.count
          this.list.rows = data.rows
        })
        .catch(() => {
          this.list.loading = false
        })
    },

    setRole (id) {
      this.$router.push({
        path: '/auth/user/setRole',
        query: {
          id: id
        }
      })
    }
  }
}
</script>

<style lang="css">
</style>

<template lang="html">
  <div class="box">
    <el-card style="margin-bottom: 10px">
      <div slot="header">生态工作人员管理</div>
      <div class="button-warp">
        <el-button type="primary" size="small" @click="handleAdd">新增</el-button>
      </div>
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column prop="nickname" label="昵称" />
        <el-table-column prop="IDName" label="姓名" />
        <el-table-column prop="phone" label="电话" />
        <el-table-column prop="createdAt" label="创建时间" width="160" :formatter="createdAtRender" />
        <el-table-column prop="email" label="邮箱" width="160" />
        <el-table-column prop="Roles" label="角色" :formatter="RolesAtRender"  />
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="text" @click="handleUpdate(scope.row)">修改</el-button>
            <el-button type="text" @click="handleDel(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination v-if="count > 0"
        layout="prev, pager, next"
        @current-change="pagination"
        :total="count" />
    </el-card>
  </div>
</template>
<script>
  import moment from 'moment';
  import { queryUser, queryUserByRoleID, deleteUser,queryEcoRole  } from './service';
  import { ECO_ROLE_LIST } from './utils/contants';
  export default {
    data() {
      return {
        count: 0,
        from: { page: 1, pageSize: 10 },
        tableData: [],
        roleList: []
      };
    },
    created() {
      this.getEcoRole();
      this.getUserByRoleID(this.from);
    },
    methods: {
      getEcoRole() {
        const params = {
          type: 'eco'
        }
        return queryEcoRole(params).then(res => {
          if (res.success && res.data) {
            let data = res.data || [];
            let roleList = [];
            data.forEach(item => {
              roleList.push({
                label: item.name,
                id: item.id
              })
            })
            this.roleList = roleList;
          }
        })
      },
      getUserByRoleID(prams) {
        return queryUserByRoleID(prams).then(res => {
          if (res.success) {
            let data = res.data && res.data.data ? res.data.data : {}
             this.tableData = data.rows || []
            this.count = Number(data.count) || 0;
          }
        })
      },
      createdAtRender(row) {
        return row.createdAt ? moment(row.createdAt).format('YYYY-MM-DD HH:mm:ss') : ''
      },
      RolesAtRender(row) {
        if (row.roles && row.roles.length) {
          let RolesName = [];
          this.roleList.forEach(item => {
            row.roles.forEach(roleId => {
              if (item.id == roleId.id) {
                RolesName.push(item.label)
              }
            })
          })
          return RolesName.length ? RolesName.join(',') : ''
        }
      },
      getTableData(params) {
        return queryUser(params).then(res => {
          if (res.success) {
            let data = res.data && res.data.data ? res.data.data : {}
             this.tableData = data.rows || []
            this.count = Number(data.count) || 0;
          }
        })
      },
      handleAdd() {
        this.$router.push({ path: `/insideStaff/add` })
      },
      handleUpdate(row) {
        this.$router.push({ path: `/insideStaff/add?id=${row.id}` });
      },
      pagination(page) {
        this.from.page = page;
        this.getTableData(this.from);
      },
      handleDel(row) {
        this.$confirm('确定要删除吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          const params = {
            id: Number(row.id)
          };
          return deleteUser(params).then(res => {
            if (res.success) {
              this.getTableData(this.from);
            } else {
              this.$message.error(res && res.message || '系统异常， 稍后再试！');
            }
          })
        });
      }
    }
  }
</script>
<style scoped>
  .button-warp {
    float: right;
    margin-bottom: 18px;
  }
  .el-pagination {
    float: right;
    margin-top: 10px;
    margin-bottom: 10px;
  }
</style>



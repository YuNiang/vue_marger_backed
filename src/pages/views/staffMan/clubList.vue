<template lang="html">
  <div class="box">
    <el-card style="margin-bottom: 10px">
      <div slot="header">俱乐部人员管理</div>
      <el-form :model="form" ref="form" :inline="true">
        <el-form-item label="俱乐部">
          <el-select v-model="pag.TeamID" placeholder="请选择">
            <el-option
              v-for="item in teamList"
              :key="item.value"
              :label="item.label"
              :value="item.value" />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleSearch">搜索</el-button>
        </el-form-item>
      </el-form>
      <div class="button-warp">
        <el-button type="primary" size="small" @click="handleAdd">新增</el-button>
      </div>
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column prop="nickname" label="昵称" />
        <el-table-column prop="IDName" label="姓名" />
        <el-table-column prop="phone" label="电话" />
         <el-table-column prop="createdAt" label="创建时间" width="140" :formatter="createdAtRender" />
        <el-table-column prop="email" label="邮箱" width="160" />
        <el-table-column prop="TeamID" label="俱乐部" :formatter="TeamDesRender"  />
        <el-table-column prop="TeamID" label="战队" :formatter="TeamGroupNameDesRender" />
        <el-table-column label="角色" :formatter="RolesAtRender" />
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="text" @click="handleModify(scope.row)">修改</el-button>
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
  import { queryTeamList, deleteUser, queryEcoUser, queryEcoRole } from './service';
  export default {
    data() {
      return {
        count: 0,
        pag: { page: 1, pageSize: 10, TeamID: null },
        teamList: [],
        origData: [],
        tableData: [],
        rolesList: [],
        teamMap:{},
        clubMap:{},
      };
    },
    created() {
      this.getEcoRole();
      this.getTeamData();
      this.getCulbList();
    },
    methods: {
      getEcoRole() {
      const params = {
        type: 'club'
      }
      return queryEcoRole(params).then(res => {
        if (res.success && res.data) {
          let data = res.data || [];
          let rolesList = [];
          data.forEach(item => {
            rolesList.push({
              label: item.name,
              id: item.id
            })
          })
          this.rolesList = rolesList;
        }
      })
    },
      handleModify(row) {
        this.$router.push({ path: `/clubStaff/add?id=${row.id}` });
      },
      pagination(page) {
        this.pag.page = page;
        this.getCulbList();
      },
      createdAtRender(row) {
        return row.createdAt ? moment(row.createdAt).format('YYYY-MM-DD HH:mm:ss') : ''
      },
      TeamDesRender(row) {
        return this.clubMap[row.TeamID]? this.teamMap[this.clubMap[row.TeamID]].TeamDes : "";
      },
      TeamGroupNameDesRender(row) {
        return this.teamMap[row.TeamID] ? this.teamMap[row.TeamID].TeamDes : "";
      },
      RolesAtRender(row) {
        if (row.roles && row.roles.length) {
          let RolesName = [];
          this.rolesList.forEach(roleName => {
            row.roles.forEach(roleId => {
              if (roleName.id == roleId.id) {
                RolesName.push(roleName.label)
              }
            })
          })
          return RolesName.length ? RolesName.join(',') : ''
        }
      },
      getCulbList() {
        let params = this.pag;
        return queryEcoUser(params).then(res => {
          this.count = Number(res.data.count) || 0;
          this.tableData = res.data.rows;
        })
      },
      getTeamData () {
        return queryTeamList().then(res => {
          if (res.success) {
            let teamList = [];
            if (res.data && res.data.length) {
              res.data.forEach(item => {
                teamList.push({
                  label: item.TeamDes,
                  value: item.id,
                })
                this.teamMap[item.id] = item;
                if(item.LPL){
                  this.clubMap[item.id] = item.LPL;
                }else{
                  this.clubMap[item.id] = item.id;
                }
              })
            }
            this.origData = res.data;
            this.teamList = teamList;
          }
        })
      },
      handleSearch() {
        this.getCulbList()
      },
      handleAdd() {
        this.$router.push({ path: `/clubStaff/add` });
      },
      handleDel(row) {
        this.$confirm('确定要删除吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          const params = {
            id: row.id,
            type: 'club'
          };
          return deleteUser(params).then(res => {
            if (res.success) {
              this.getCulbList();
            } else {
              this.$message.error(res && res.message || '系统异常， 稍后再试！');
            }
          })
        });
      },
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



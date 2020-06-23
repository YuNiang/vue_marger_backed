<template>
  <el-card>

    <div slot="header">
      <span>管理员审核列表</span>
      <!--<el-button style="float: right; padding: 3px 0" type="text" @click="handleAdd">添加</el-button>-->
    </div>

    <el-form :inline="true" :model="form">
      <el-form-item label="申请日期" prop="startedAt">
        <el-date-picker
          v-model="form.startedAt"
          type="date"
          @change="startedAtChange"
          placeholder="选择申请日期">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="状态：">
        <el-select v-model="form.status" placeholder="状态">
          <el-option
            v-for="item in status"
            :key="item.value"
            :label="item.text"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-input v-model="form.search" placeholder="输入姓名、手机号"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleSearch">搜索</el-button>
      </el-form-item>
    </el-form>

    <el-table
      :data="rows"
      style="width: 100%">
      <el-table-column
        prop="sName"
        label="姓名"
        width="80">
        <template slot-scope="scope">
          <span>{{ scope.row.sName }}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="sPhone"
        label="手机号"
        width="120">
        <template slot-scope="scope">
          <span>{{ scope.row.sPhone }}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="sUnionid"
        label="用户ID"
        width="240">
        <template slot-scope="scope">
          <span>{{ scope.row.sUnionid }}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="sUserName"
        label="昵称"
        width="120">
        <template slot-scope="scope">
          <span>{{ scope.row.sUserName }}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="iTeamId"
        label="战队"
        width="80">
        <template slot-scope="scope">
        <span>{{ scope.row.team ? scope.row.team.TeamDes : scope.iTeamId}}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="iRoleId"
        label="角色"
        width="80">
        <template slot-scope="scope">
          <span>{{ roleMap[scope.row.iRoleId] }}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="iStatus"
        label="状态"
        width="80">
        <template slot-scope="scope">
          <el-tag :type="statusTag[scope.row.iStatus]">{{ statusMap[scope.row.iStatus] }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column
        prop="updatedAt"
        label="修改时间"
        width="180">
        <template slot-scope="scope">
          <span>{{ scope.row.updatedAt | datetime }}</span>
        </template>
      </el-table-column>
      <!--<el-table-column-->
        <!--prop="createdAt"-->
        <!--label="创建时间"-->
        <!--width="180">-->
        <!--<template slot-scope="scope">-->
          <!--<span>{{ scope.row.createdAt | datetime }}</span>-->
        <!--</template>-->
      <!--</el-table-column>-->
      <el-table-column
        label="操作"
        align="right">
        <template slot-scope="scope">
          <el-button
            :disabled="![0].includes(scope.row.iStatus)"
            size="mini"
            type="success"
            @click="handleCheckPass(scope.row)">审核通过
          </el-button>
          <el-button
            :disabled="![0].includes(scope.row.iStatus)"
            size="mini"
            type="danger"
            @click="handleCheckNotPass(scope.row)">审核不通过
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      layout="prev, pager, next"
      @current-change="pagination"
      :total="count">
    </el-pagination>
  </el-card>
</template>

<script>

  import moment from 'moment';
  import * as admin_info from '../../../api/admin_info';
  import * as team_info from '../../../api/team_info';

  export default {
    data() {
      return {
        params: {page: 1, size: 10},
        form: {startedAt: '', status: [], search: ''},
        startedAt: '',
        rows: [],
        count: 0,
        status: [
          {text: '未提交', value: -1},
          {text: '待审核', value: 0},
          {text: '已通过', value: 1},
          {text: '未通过', value: 2},
        ],
        statusMap: {
          '-1': '未提交',
          0: '待审核',
          1: '已通过',
          2: '未通过',
        },
        statusTag: {
          '-1': 'info',
          0: '',
          1: 'success',
          2: 'danger',
        },
        roleMap: {
          '-1': '游客',
          0: '游客',
          1: '查看员',
          3: '教练',
        }
      }
    },
    created() {
      this.query(this.params);
    },
    methods: {
      query(params) {
        return admin_info.query(params).then(this.handleList);
      },
      checkPass(id) {
        return admin_info.checkPass(id).then(data => {
          this.rows.forEach(item => {
            if (item.id == id) Object.assign(item, data);
          })
        }).catch(this.handleError);
      },
      checkNotPass(id) {
        return admin_info.checkNotPass(id).then(data => {
          this.rows.forEach(item => {
            if (item.id == id) Object.assign(item, data);
          })
        }).catch(this.handleError);
      },
      attach(request, rows, key, attr) {
        if (!rows.length) return;
        return request.queryBulk({ids: [...new Set(rows.map(item => item[key]))].join(',')}).then((data) => {
          const hash = {};
          data.forEach(item => (hash[item.id] = item));
          rows.forEach((item, index) => rows.splice(index, 1, Object.assign(item, {[attr]: hash[item[key]]})));
        })
      },
      handleError(err) {
        this.$notify.error({
          title: 'Error',
          message: err.message
        });
      },
      handleList({count, rows}) {
        this.count = count;
        this.rows = rows;
        this.attach(team_info, rows, 'iTeamId', 'team')
      },
      pagination(page) {
        this.params.page = page;
        this.query(this.params);
      },
      handleSearch() {
        const {status, search} = this.form;
        this.params.status = status;
        this.params.page = 1;
        this.params.search = search;
        if (!this.params.status && this.params.status !== 0) delete this.params.status;
        if (!search) delete this.params.search;
        this.query(this.params);
      },
      handleCheckPass(item) {
        this.$confirm('确认审核通过?', '提示', {type: 'warning'}).then(() => this.checkPass(item.id));
      },
      handleCheckNotPass(item) {
        this.$confirm('确认审核不通过?', '提示', {type: 'warning'}).then(() => this.checkNotPass(item.id));
      },
      startedAtChange() {
        const {startedAt} = this.form;
        this.params.startedAt = startedAt;
        this.params.page = 1;
        this.query(this.params);
      }
    },
    filters: {
      datetime(val) {
        return val ? moment(val).format('YYYY-MM-DD HH:mm:ss') : val;
      }
    }
  }
</script>

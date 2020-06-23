<template lang="html">
  <div class="list">
    <el-card style="margin-bottom: 10px">
      <el-form :inline="true" :model="form" label-width="80px">
        <el-form-item label="申请类型">
          <el-select v-model="form.iType" placeholder="请选择">
            <el-option v-for="item in typeList"
              :key="item.value"
              :label="item.label"
              :value="item.value" />
        </el-select>
        </el-form-item>
        <el-form-item label="状态">
          <el-select v-model="form.AuditStatus" multiple placeholder="请选择">
            <el-option v-for="item in AuditStatusList"
              :key="item.value"
              :label="item.label"
              :value="item.value" />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleSearch">搜 索</el-button>
        </el-form-item>
      </el-form>
    </el-card>

    <el-card>
      <el-tabs v-model="curName" type="card" @tab-click="handleTabs" class="tabs-warp">
        <el-tab-pane label="选手申请中" name="playering">
          <el-table :data="tableData" border style="width: 100%">
            <el-table-column label="序号" fixed prop="id" />
            <el-table-column prop="TeamGroupName" label="俱乐部" />
            <el-table-column prop="TeamName" label="战队" />
            <el-table-column label="姓名" prop="NameCn" />
            <el-table-column label="申请类型" prop="iType" :formatter="iTypeRender" />
            <el-table-column label="最后提交人" prop="CreateOperID" align="center" :formatter="CreateOperIDRender"  />
            <el-table-column label="最后更新时间" prop="CreatedAt" align="center" :formatter="CreatedAtRender" />
            <!-- <el-table-column label="最后审批人" prop="AuditOperID" :formatter="AuditOperIDRender" /> -->
            <el-table-column label="状态" prop="AuditStatus" :formatter="AuditStatusRender" />
            <el-table-column label="操作记录">
              <template slot-scope="scope"><div class="log-row" @click="handleLog(scope.row)">查看</div></template>
            </el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button v-if="scope.row.isActive === 0 && scope.row.AuditStatus === 0" @click="handlePlayEdit(scope.row, 'player')" type="text">继续申请</el-button>
                <el-button v-if="scope.row.isActive == 0 && scope.row.AuditStatus === -1" @click="handleErrEdit(scope.row, 'player')" type="text">继续申请</el-button>
                <el-button v-if="scope.row.isActive == 0 && scope.row.AuditStatus === 1" @click="handleErrEdit(scope.row, 'player')" type="text">继续申请</el-button>
                <el-button v-if="scope.row.isActive == 1 && scope.row.AuditStatus === -1" @click="handleErrEdit(scope.row, 'player')" type="text">修改错误信息</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="教练申请中" name="coaching">
          <el-table :data="tableData" border style="width: 100%">
            <el-table-column label="序号" fixed prop="id" />
            <el-table-column prop="TeamGroupName" label="俱乐部" />
            <el-table-column prop="TeamName" label="战队" />
            <el-table-column label="姓名" prop="NameCn" />
            <el-table-column label="申请类型" prop="iType" :formatter="iTypeRender" />
            <el-table-column label="最后提交人" prop="CreateOperID" align="center" :formatter="CreateOperIDRender" />
            <el-table-column label="最后更新时间" prop="CreatedAt" align="center" :formatter="CreatedAtRender" />
            <!-- <el-table-column label="最后审批人" prop="AuditOperID" :formatter="AuditOperIDRender" /> -->
            <el-table-column label="状态" prop="AuditStatus" :formatter="AuditStatusRender" />
            <el-table-column label="操作记录">
              <template slot-scope="scope"><div class="log-row" @click="handleLog(scope.row)">查看</div></template>
            </el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button v-if="scope.row.isActive === 0 && scope.row.AuditStatus === 0" @click="handlePlayEdit(scope.row, 'coach')" type="text">继续申请</el-button>
                <el-button v-if="scope.row.isActive == 0 && scope.row.AuditStatus === -1" @click="handleErrEdit(scope.row, 'coach')" type="text">继续申请</el-button>
                <el-button v-if="scope.row.isActive == 0 && scope.row.AuditStatus === 1" @click="handleErrEdit(scope.row, 'coach')" type="text">继续申请</el-button>
                <el-button v-if="scope.row.isActive == 1 && scope.row.AuditStatus === -1" @click="handleErrEdit(scope.row, 'coach')" type="text">修改错误信息</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="选手已完成" name="playerFinish">
          <el-table :data="tableData" border style="width: 100%">
            <el-table-column label="序号" prop="id" fixed />
            <el-table-column prop="TeamGroupName" label="俱乐部" />
            <el-table-column prop="TeamName" label="战队" />
            <el-table-column label="姓名" prop="NameCn" />
            <el-table-column label="申请类型" prop="iType" :formatter="iTypeRender" />
            <el-table-column label="最后提交人" prop="CreateOperID" align="center" :formatter="CreateOperIDRender" />
            <el-table-column label="最后更新时间" prop="CreatedAt" align="center" :formatter="CreatedAtRender" />
            <el-table-column label="最后审批人" prop="AuditOperID" :formatter="AuditOperIDRender" />
            <el-table-column label="状态" prop="AuditStatus" :formatter="AuditStatusRender" />
            <el-table-column label="操作记录">
              <template slot-scope="scope"><div class="log-row" @click="handleLog(scope.row)">查看</div></template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="教练已完成" name="coachFinish">
          <el-table :data="tableData" border style="width: 100%">
            <el-table-column label="序号" prop="id" />
            <el-table-column prop="TeamGroupName" label="俱乐部" />
            <el-table-column prop="TeamName" label="战队" />
            <el-table-column label="姓名" prop="NameCn" />
            <el-table-column label="申请类型" prop="iType" :formatter="iTypeRender" />
            <el-table-column label="最后提交人" prop="CreateOperID" align="center" :formatter="CreateOperIDRender" />
            <el-table-column label="最后更新时间" prop="CreatedAt" align="center" :formatter="CreatedAtRender" />
            <el-table-column label="最后审批人" prop="AuditOperID" :formatter="AuditOperIDRender" />
            <el-table-column label="状态" prop="AuditStatus" :formatter="AuditStatusRender" />
            <el-table-column label="操作记录">
              <template slot-scope="scope"><div class="log-row" @click="handleLog(scope.row)">查看</div></template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="选手已终止" name="playerEnd">
          <el-table :data="tableData" border style="width: 100%">
            <el-table-column label="序号" prop="id" />
            <el-table-column prop="TeamGroupName" label="俱乐部" />
            <el-table-column prop="TeamName" label="战队" />
            <el-table-column label="姓名" prop="NameCn" />
            <el-table-column label="申请类型" prop="iType" :formatter="iTypeRender" />
            <el-table-column label="最后提交人" prop="CreateOperID" align="center" :formatter="CreateOperIDRender" />
            <el-table-column label="最后更新时间" prop="CreatedAt" align="center" :formatter="CreatedAtRender" />
            <el-table-column label="状态" prop="AuditStatus" :formatter="AuditStatusRender" />
            <el-table-column label="操作记录">
              <template slot-scope="scope"><div class="log-row" @click="handleLog(scope.row)">查看</div></template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="教练已终止" name="coachEnd">
          <el-table :data="tableData" border style="width: 100%">
            <el-table-column label="序号" prop="id" />
            <el-table-column prop="TeamGroupName" label="俱乐部" />
            <el-table-column prop="TeamName" label="战队" />
            <el-table-column label="姓名" prop="NameCn" />
            <el-table-column label="申请类型" prop="iType" :formatter="iTypeRender" />
            <el-table-column label="最后提交人" prop="CreateOperID" align="center" :formatter="CreateOperIDRender" />
            <el-table-column label="最后更新时间" prop="CreatedAt" align="center" :formatter="CreatedAtRender" />
            <el-table-column label="状态" prop="AuditStatus" :formatter="AuditStatusRender" />
            <el-table-column label="操作记录">
              <template slot-scope="scope"><div class="log-row" @click="handleLog(scope.row)">查看</div></template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
      </el-tabs>
      <el-pagination v-if="count > 0"
        layout="prev, pager, next"
        @current-change="pagination"
        :total="count" />
      <el-dialog title="操作记录" :visible.sync="histVisible">
        <el-table :data="log.logData || []">
          <el-table-column property="OperID" label="提交人" align="center" :formatter="OperIDRender" />
          <el-table-column property="CreatedAt" label="提交时间" align="center" :formatter="formatCreatedAt" />
          <el-table-column property="AuditOperID" label="审核人" :formatter="AuditOperIDRender" />
          <el-table-column property="AuditedAt" label="审核时间" :formatter="formatAuditedAt" />
          <el-table-column property="Desc" label="状态" />
          <el-table-column property="Reason" label="审核结果" :formatter="reasonRender" />
        </el-table>
        <el-pagination v-if="log.count > 0"
          layout="prev, pager, next"
          @current-change="dialogPagination"
          :total="log.count" />
      </el-dialog>
    </el-card>
  </div>
</template>
<script>
  String.prototype.replaceAll = function(s1,s2) {     
    return this.replace(new RegExp(s1,"gm"),s2);     
  }   
  import moment from 'moment';
  import { getUrlParam } from '../../../../utils/index';
  import { queryList, queryLog} from './service';
  import {STATUS_LIST,ITYPE_LIST} from '../utils/contants';
  import {render} from "../utils/render";

  export default {
    data() {
      return {
        histVisible: false,
        curName: getUrlParam('activeName') || 'playering',
        count: 0,
        form: {
          iType: '', 
          page: 1, 
          pageSize: 10, 
          AuditStatus: ['0', '-1'],
          isActive: [0, 1],
          activeName: getUrlParam('activeName') || 'player',
        },
        log: { 
          page: 1, 
          pageSize: 10, 
          orderID: null,
          logData: [],
          count: 0,
        },
        tableData: [],
        typeList: ITYPE_LIST,
        AuditStatusList: STATUS_LIST,
      }
    },
    async created() {
      await render.initTeams();
      this.handleTabs();
    },
    methods: {
      CreateOperIDRender(row) {
        if (row.CreateOperID) {
          const operName = row.CreateOperID.split('/');
          return operName[1];
        }
        return '';
      },
      OperIDRender(row) {
        if (row.OperID) {
          const operName = row.OperID.split('/');
          return operName[1];
        }
        return '';
      },
      AuditOperIDRender(row) {
        if (row.AuditOperID) {
          const operName = row.AuditOperID.split('/');
          return operName[1] == 'undefined' ? '' : operName[1];
        }
        return '';
      },
      reasonRender(row) {
        if (row.Reason) {
          return row.Reason.replaceAll('{', '').replaceAll('}', '');
        }
        return '';
      },
      formatCreatedAt(row) {
        return row.CreatedAt ? moment(row.CreatedAt).format('YYYY-MM-DD HH:mm:ss') : '';
      },
      formatAuditedAt(row) {
        return row.AuditedAt ? moment(row.AuditedAt).format('YYYY-MM-DD HH:mm:ss') : '';
      },
      formatAuditStatus(row) {
        let text = '';
        switch (row.AuditStatus) {
          case 0: text = '待审核'; break;
          case 1: text = '已通过'; break;
          case -1: text = '已拒绝'; break;
          default: text = '-';
        }
        return text;
      },
      handleLog(row) {
        this.histVisible = true;
        this.log.orderID = row.id;
        const params = {
          orderID: row.id,
          page: this.log.page,
          pageSize: this.log.pageSize,
        };
        return queryLog(params).then(res => {
          if (res.success) {
            this.log.logData = res.data.rows || [];
            this.log.count = res.data.count;
          }
        })
      },
      dialogPagination(page) {
        this.log.page = page;
        const params = {
          orderID: this.log.orderID,
          page,
          pageSize: 10,
          AuditStatus: this.log.AuditStatus
        };
        return queryLog(params).then(res => {
          if (res.success) {
            this.log.logData = res.data.rows || [];
            this.log.count = res.data.count;
          }
        })
      },
      fiflerProps(data) {
        const pdata = {};
        Object.keys(data).forEach(p => {
          if (data[p]) {
            pdata[p] = data[p];
          }
        })
        return pdata;
      },
      iTypeRender (row) {
        return render.RenderType(row.iType);
      },
      AuditStatusRender(row) {
        if (Number(row.isActive) === 0) {
          if (Number(row.AuditStatus) === 0 || Number(row.AuditStatus) === -1) {
            return '未提交'
          }
        }
        if (Number(row.isActive) == '-1') {
          return '终止'
        }
        if (Number(row.AuditStatus) === 0 && Number(row.isActive) === 1) {
          return '审核中'
        }
        if (Number(row.AuditStatus) === 1 && Number(row.isActive) === 1) {
           return '审核通过'
        };
        if (Number(row.AuditStatus) === 1 && Number(row.isActive) === 0) {
           return '未提交'
        };
        if (Number(row.AuditStatus) === -1) {
           return '已拒绝'
        };
      },
      CreatedAtRender(row) {
        return row.CreatedAt ? moment(row.CreatedAt).format('YYYY-MM-DD HH:mm:ss') : ''
      },
      CreatedAt(row) {
        return row.CreatedAt ? moment(row.CreatedAt).format('YYYY-MM-DD HH:mm:ss') : ''
      },
      handleTabs(tab, event) {
        this.form.page = 1;
        this.tableData = [];
        if (this.curName === 'coaching') {
          this.form.curName = 'coaching';
          this.form.activeName = 'coach';
          this.form.AuditStatus = ['0', '-1'];
          this.form.isActive = ['0', '1'];
        } else if (this.curName === 'playering') {
          this.form.curName = 'playering';
          this.form.activeName = 'player';
          this.form.isActive = ['0', '1'];
          this.form.AuditStatus = ['0', '-1'];
        } else if (this.curName === 'playerFinish') {
          this.form.activeName = 'player';
          this.form.curName = 'playerFinish';
          this.form.AuditStatus = ['1'];
          this.form.isActive = ['1'];
        } else if (this.curName === 'coachFinish'){
          this.form.activeName = 'coach';
          this.form.curName = 'coachFinish';
          this.form.AuditStatus = ['1'];
          this.form.isActive = ['1'];
        } else if (this.curName === 'coachEnd') {
          this.form.activeName = 'coach';
          this.form.curName = 'coachEnd';
          delete this.form.AuditStatus;
          this.form.isActive = ['-1'];
        } else if (this.curName === 'playerEnd') {
          this.form.activeName = 'player';
          this.form.curName = 'playerEnd';
          delete this.form.AuditStatus;
          this.form.isActive = ['-1'];
        }
        this.getTableList(this.fiflerProps(this.form))
      },
      getTableList(params) {
        if (params.AuditStatus) {
          params.AuditStatus = params.AuditStatus.join(',')
        }
        if (params.isActive) {
          params.isActive = params.isActive.join(',')
        }
        return queryList(params).then(res => {
          if (res.success) {
            let dataSouce = [];
            this.tableData = [];
            const data = res.data && res.data.rows || [];
            data.length && data.forEach(item => {
              dataSouce.push({
                TeamName: render.TeamNameRender(item.TeamID),
                TeamGroupName: render.TeamGourpRender(item.TeamID),
                role: params.activeName === 'player' ? '选手' : '教练',
                ...item.newInfo,
                NameCn: this.form.activeName === 'coach' ? (item.newInfo && item.newInfo.sName || '') : (item.newInfo && item.newInfo.NameCn || ''),
                ...item
              })
            })
            this.tableData = dataSouce;
            this.count = Number(res.data.count);
          } else {
            this.tableData = [];
            this.$message.error('系统异常，请稍后再试！')
          }
        });
      },
      pagination(page) {
        this.form.page = page;
        this.getTableList(this.fiflerProps(this.form));
      },
      handleSearch() {
        this.getTableList(this.fiflerProps(this.form));
      },
      handlePlayEdit(row, type) {
        let AuditStatus = 0;
        if (row.iType == '170' || row.iType == '200') {
          AuditStatus = -1
        }
        // '150','200' 教练, 教练解约 160  选手解约 110, 选手上调 120, 选手转会 130, 选手下放 140, 选手借调 180
        if (row.iType === '110' || row.iType === '120' || row.iType === '140' || row.iType === '180' || row.iType === '160') {
          this.$router.push({ path: `/actionProblem?id=${row.id}&OuterID=${row.OuterID}&iType=${row.iType}&Role=${type}` });
        }
        if (row.iType === '150' || row.iType === '200') {
          // 这里的id 是工单id
          this.$router.push({ path: `/coach/add?orderID=${row.id}&OuterID=${row.OuterID}&AuditStatus=${row.AuditStatus}&iType=${row.iType}` });
        }
        if (row.iType === '100' || row.iType === '170') {
          this.$router.push({ path: `/player/add?orderID=${row.id}&OuterID=${row.OuterID}&AuditStatus=${row.AuditStatus}&iType=${row.iType}` });
        }
        if (row.iType === '130') {
          this.$router.push({ path: `/player/transfer?id=${row.id}&OuterID=${row.OuterID}&AuditStatus=${row.AuditStatus}&iType=${row.iType}` });
        }
      },
      handleErrEdit(row, type) {
        // '150','200' 教练, 教练解约 160  选手解约 110, 选手上调 120, 选手转会 130, 选手下放 140, 选手借调 180
        if (row.iType === '110' || row.iType === '120' || row.iType === '140' || row.iType === '180' || row.iType === '160' || row.iType === '130') {
          // let url = `/player/actioning?id=${row.id}&iType=${row.iType}&AuditStatus=${row.AuditStatus}&activeName=${type}`;
          // window.open(url, '_blank');
          this.$router.push({ path: `/player/actioning?id=${row.id}&iType=${row.iType}&AuditStatus=${row.AuditStatus}&activeName=${type}` });
        }
        if (row.iType === '150' || row.iType === '200') {
          this.$router.push({ path: `/coach/add?orderID=${row.id}&OuterID=${row.OuterID}&AuditStatus=${row.AuditStatus}&iType=${row.iType}` });
        }
        if (row.iType === '100' || row.iType === '170' || row.iType === '190') {
          this.$router.push({ path: `/player/add?orderID=${row.id}&OuterID=${row.OuterID}&AuditStatus=${row.AuditStatus}&iType=${row.iType}` });
        }
      },
    }
  }
</script>

<style scope>
  .list .el-pagination {
    text-align: right;
  }
  .list .button-warp {
    float: right;
  }
  .name-details {
    cursor: pointer;
    color: #23a3ff;
  }
  .el-tabs, .tabs-warp {
    margin-top: 20px;
  }
  .log-row {
    color: #23a3ff;
    cursor: pointer;
  }
</style>

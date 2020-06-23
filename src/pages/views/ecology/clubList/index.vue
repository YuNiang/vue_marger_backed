<template lang="html">
  <div class="list">
    <el-card style="margin-bottom: 10px">
      <el-form :inline="true" :model="form">
        <el-form-item label="俱乐部" prop="TeamID">
          <el-select v-model="params.TeamID" placeholder="请选择">
            <el-option v-for="item in teamData"
              :key="item.value"
              :label="item.label"
              :value="item.value" />
          </el-select>
        </el-form-item>
        <el-form-item label="姓名(中文)" prop="NameCn">
          <el-input v-model="params.NameCn" placeholder="请输入内容"></el-input>
        </el-form-item>
        <el-form-item label="选手/教练">
          <el-select v-model="params.activeName" @change="onChangeActiveName" placeholder="请选择">
            <el-option v-for="item in roleList"
              :key="item.value"
              :label="item.label"
              :value="item.value" />
          </el-select>
        </el-form-item>
        <el-form-item label="提交时间" prop="CreatedAt">
          <el-date-picker
            v-model="params.CreatedAt"
            type="date"
            placeholder="请选择" style="width: 194px" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleSearch">搜 索</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card>
      <div class="button-warp">
        <el-button type="primary" @click="handleExportPlayer('player')">导出选手</el-button>
        <el-button type="primary" plain @click="handleExportPlayer('coach')">导出教练</el-button>
      </div>
      <br/>
      <el-tabs v-model="params.activeName" type="card" @tab-click="handleTabs" class="el-tabs-warp">
        <el-tab-pane label="选手" name="player">
          <el-table :data="tableData" style="width: 100%">
            <el-table-column label="序号" fixed prop="id" />
            <el-table-column label="俱乐部" fixed prop="TeamGroupName" />
            <el-table-column label="战队" fixed prop="TeamName" />
            <el-table-column label="姓名(中文)" fixed prop="NameCn" width="160">
              <template slot-scope="scope"> 
                <span>{{scope.row.NameCn}} </span>
                <span class="crrAction" v-if="scope.row.ActionType == '180'">返还</span>
              </template> 
            </el-table-column>
            <el-table-column label="姓名(英文)" fixed prop="NameEn" width="100" />
            <el-table-column label="游戏ID" fixed prop="PlayerDes" />
            <el-table-column label="游戏内位置" prop="PlayerPos" width="100" />
            <el-table-column label="国家" prop="Country" :formatter="CountryRender"  />
            <el-table-column prop="ContractStartedAt" label="合同生效时间" width="120">
              <template slot-scope="scope">
                <div>{{ scope.row.ContractStartedAt | datetime }}</div>
              </template>
            </el-table-column>
            <el-table-column prop="ContractEndedAt" label="合同结束时间" width="120">
              <template slot-scope="scope">
                <div>{{ scope.row.ContractEndedAt | datetime }}</div>
              </template>
            </el-table-column>
            <el-table-column prop="PlayingAt" label="可上场时间" width="120">
              <template slot-scope="scope">
                <div>{{ scope.row.PlayingAt | datetime }}</div>
              </template>
            </el-table-column>
            <el-table-column prop="UpdatedAt" label="最后更新时间" width="120">
              <template slot-scope="scope">
                <div>{{ scope.row.UpdatedAt | fulldatetime }}</div>
              </template>
            </el-table-column>
            <el-table-column prop="UpdateOperID" label="更新人" :formatter="UpdateOperIDRender" />
            <el-table-column label="操作记录" align="center">
              <template slot-scope="scope">
                <el-button type="text" size="small" @click="handleHisClick(scope.row, '1')">查看</el-button>
              </template>
            </el-table-column>
            <el-table-column prop="id" label="操作" fixed="right" width="160">
              <template slot-scope="scope">
                 <el-button v-if="scope.row.ActionType == 180" @click="handleRepatriate(scope.row, '190')" type="text" size="small">返还</el-button>
                <el-button @click="handleDetail(scope.row, '1')" type="text" size="small">详情</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="教练" name="coach">
          <el-table :data="tableData" border style="width: 100%">
            <el-table-column label="序号" fixed prop="id" />
            <el-table-column label="俱乐部" fixed prop="TeamGroupName" />
            <el-table-column label="战队" fixed prop="TeamName" />
            <el-table-column label="姓名(中文)" fixed prop="sName" width="100" />
            <el-table-column label="姓名(英文)" fixed prop="NameEn" width="100" />
            <el-table-column label="国家" prop="Country" :formatter="CountryRender" />
            <el-table-column prop="ContractStartedAt" label="合同生效时间" width="120">
              <template slot-scope="scope">
                <div>{{ scope.row.ContractStartedAt | datetime }}</div>
              </template>
            </el-table-column>
            <el-table-column prop="ContractEndedAt" label="合同结束时间" width="120">
              <template slot-scope="scope">
                <div>{{ scope.row.ContractEndedAt | datetime }}</div>
              </template>
            </el-table-column>
            <el-table-column prop="UpdatedAt" label="最后更新时间" width="120">
              <template slot-scope="scope">
                <div>{{ scope.row.UpdatedAt | fulldatetime }}</div>
              </template>
            </el-table-column>
            <el-table-column prop="UpdateOperID" label="更新人" :formatter="UpdateOperIDRender" />
            <el-table-column label="操作记录" width="100" align="center">
              <template slot-scope="scope">
                <el-button type="text" size="small" @click="handleHisClick(scope.row, '2')">查看</el-button>
              </template>
            </el-table-column>
            <el-table-column fixed="right" width="160" prop="id" label="操作">
              <template slot-scope="scope">
                <el-button  @click="handleDetail(scope.row, '2')" type="text" size="small">详情</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>

        <el-dialog title="操作记录" :visible.sync="histVisible">
          <el-table :data="histData">
            <el-table-column property="iType" label="申请类型" :formatter="formatItype" />
            <el-table-column property="CreateOperID" label="提交人" :formatter="formatCreateOperID" />
            <el-table-column property="CreatedAt" label="提交时间">
              <template slot-scope="scope">
                <div>{{ scope.row.CreatedAt | fulldatetime }}</div>
              </template>
            </el-table-column>
            <el-table-column property="AuditedAt" label="审核时间">
              <template slot-scope="scope">
                <div>{{ scope.row.AuditedAt | fulldatetime }}</div>
              </template>
            </el-table-column>
            <el-table-column property="AuditStatus" label="状态" :formatter="formatAuditStatus" />
            <!-- <el-table-column property="AuditReason" label="审核结果" /> -->
          </el-table>
        </el-dialog>
      </el-tabs>
      <el-pagination v-if="count > 0"
        layout="prev, pager, next" @current-change="pagination" :total="count" />
    </el-card>
  </div>
</template>
<script>
  import moment from 'moment';
  import { getUrlParam } from '../../../../utils/index';
  import { render } from "../utils/render";
  import { api } from "../utils/api";
  export default {
    data() {
      return {
        histVisible: false,
        histData: [],
        teamData: render.GetTeams(),
        count: 0,
        params: {
          page: 1, 
          pageSize: 10,
          activeName: getUrlParam('activeName') || 'player',
        },
        tableData: [],
        roleList: render.GetRoleList(),
      }
    },
    async created() {
      await render.initTeams();
      this.handleTabs();
    },
    filters: {
      datetime(val) {
        return val ? moment(val).format('YYYY-MM-DD') : val;
      }
    },
    methods: {
      fulldatetime(val) {
        return render.FullDateTime(val);
      },
      handleExportPlayer(type) {
        const params = {
          pageSize: 20,
          page: 1,
          activeName: type,
        };
        return api.queryExcel(params).then(res => {
          const filename = `${type}.xlsx`;
          let blob = new Blob([res]);
          if (window.navigator.msSaveOrOpenBlob) {
            navigator.msSaveBlob(blob, filename);
          } else {
            let link = document.createElement("a");
            let evt = document.createEvent("HTMLEvents");
            evt.initEvent("click", false, false);
            link.href = URL.createObjectURL(blob);
            link.download = filename;
            link.style.display = "none";
            document.body.appendChild(link);
            link.click();
            link.remove();
            window.URL.revokeObjectURL(link.href);
          }
        })
      },
      UpdateOperIDRender(row) {
        if (row.UpdateOperID) {
          let operName = row.UpdateOperID.split('/');
          return operName[1];
        }
        return ''
      },
      formatCreateOperID(row) {
        if (row.CreateOperID) {
          let operName = row.CreateOperID.split('/')
          return operName[1]
        }
        return '';
      },
      onChangeActiveName(value) {
        if (value == 'coach') {
          this.params.activeName = 'coach';
        }
        if (value == 'player') {
          this.params.activeName = 'player';
        }
        this.getTableList(this.params)
      },
      formatItype(row) {
        return render.RenderType(row.iType);
      },
      handleTabs(tab, event) {
        this.params.page = 1;
        this.tableData = [];
        if (this.params.activeName === 'player' || tab && tab.name === 'player') {
          this.params.activeName = 'player';
        } else {
          this.params.activeName = 'coach';
        }
        this.getTableList(this.params)
      },
      handleHisClick(row, type) {
        const params = {
          OuterID: row.id,
          pageSize: 20,
          page: 1
        };
        this.histVisible = true;
        if (type === '1') {
          params.activeName = 'player';
          
        } else if (type === '2') {
          params.activeName = 'coach';
        }
        return api.queryHist(params).then(res => {
          if (res.success) {
            this.histData = res.data || [];
          } else {
            this.$message.error(res.data.message || '系统异常，稍后再试！');
          }
        })
      },
      getTableList(params) {
        this.tableData = [];
        return api.queryList(params).then(res => {
          if (res.success) {
            res.data && res.data.rows && res.data.rows.length && res.data.rows.forEach(item => {
              item.PlayerPos = render.PlayerPosRender(item.PlayerPos);
              item.Country = render.CountryRender(item.Country);
              if(params.activeName == "player"){
                item["TeamGroupName"] = render.TeamGourpRender(item.TeamID);
                item["TeamName"] = render.TeamNameRender(item.TeamID);
              }else{
                item["TeamGroupName"] = render.TeamGourpRender(item.iTeamId);
                item["TeamName"] = render.TeamNameRender(item.iTeamId);
              }
              this.tableData.push({
                ...item
              })
            })
            this.count = Number(res.data.count);
          } else {
            this.$message.error('系统异常，请稍后再试！')
          }
        });
      },
      pagination(page) {
        this.params.page = page;
        this.getTableList(this.params);
      },
      handleSearch() {
        this.handleTabs()
      },
      handleDetail (row, type) {
        if (type === '1') {
          this.$router.push({ path: `/player/playerDetail?id=${row.id}&activeName=player` });
        } else if (type === '2') {
          this.$router.push({ path: `/coach/coachdetail?id=${row.id}&activeName=coach` });
        }
      },
      formatAuditStatus(row) {
        if (row.AuditStatus == 0) {
          if (row.isActive == -1) {
            return '已终止';
          } else {
            return '待审核';
          }
        }
        if (row.AuditStatus == 1) {
          return '已通过';
        }
        if (row.AuditStatus == -1) {
          return '已拒绝';
        }
        return '';
      },
      handleRepatriate(row, type) {
        this.$confirm(`确定要返还吗?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          const params = {
          PlayerID: row.id
        };
          return api.saveBackByAdmin(params).then(res => {
            if (res.success) {
              this.getTableList(this.params);
            } else {
              this.$message.error(res.message || '系统异常，稍后再试！');
            }
          })
        });
      },
    }
  }
</script>
<style>
  .list .el-pagination {
    float: right;
  }
  .list .button-warp {
    float: right;
  }
  .list .crrAction {
    border: 1px solid red;
    padding: 2px 5px;
    border-radius: 5px;
    color: red;
    text-align: center;
    font-size: 12px;
  }
  .list .el-tabs-warp {
    margin-top: 20px;
  }
  .list .name-details {
    cursor: pointer;
    color: #23a3ff;
  }
   .list .button-warp {
    float: right;
  }
</style>

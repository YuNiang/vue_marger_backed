<template lang="html">
  <div class="list">
    <el-card style="margin-bottom: 10px">
      <el-form :inline="true" :model="form" label-width="80px">
        <el-form-item label="姓名(中文)" prop="NameCn">
          <el-input v-model="params.NameCn" placeholder="请输入内容"></el-input>
        </el-form-item>
        <el-form-item label="选手/教练">
          <el-select v-model="params.activeName" @change="onChangeActiveName" placeholder="请选择" >
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
        <el-button type="primary" @click="playerAdd('100')">选手注册</el-button>
        <el-button type="primary" plain @click="coachAdd('150')">教练注册</el-button>
      </div>
      <br/>
      <el-tabs v-model="params.activeName" type="card" @tab-click="handleTabs" class="el-tabs-warp">
        <el-tab-pane label="选手" name="player">
          <el-table :data="tableData" style="width: 100%">
            <el-table-column label="序号" fixed prop="id" />
            <el-table-column label="俱乐部" fixed prop="TeamGroupName"/>
            <el-table-column label="战队" fixed prop="TeamName" />
            <el-table-column label="姓名(中文)" fixed prop="NameCn" width="160">
              <template slot-scope="scope"> 
                <span>{{scope.row.NameCn}} </span>
                <span class="crrAction" v-if="scope.row.ActionType == '180'">返还</span>
              </template> 
            </el-table-column>
            <el-table-column label="姓名(英文)" fixed prop="NameEn" width="100" />
            <el-table-column label="游戏ID" fixed prop="PlayerDes" />
            <el-table-column label="游戏内位置" prop="PlayerPosName" width="100" />
            <el-table-column label="国家" prop="CountryName"  />
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
            <el-table-column prop="id" label="操作" width="280" fixed="right">
              <template slot-scope="scope">
                <el-button v-if="scope.row.ActionType != 180 && scope.row.ActionType != 130 && scope.row.TeamGroup == '2'" @click="handlePlayerAction(scope.row, '120')" type="text" size="small">上调</el-button>
                <el-button v-if="scope.row.ActionType != 180 && scope.row.ActionType != 130 && scope.row.TeamGroup == '1'" @click="handlePlayerAction(scope.row, '140')" type="text" size="small">下放</el-button>
                <el-button v-if="scope.row.ActionType != 180 && scope.row.ActionType != 130 && scope.row.TeamGroup == '2'" @click="handlePlayerAction(scope.row, '180')" type="text" size="small">借调</el-button>
                <el-button v-if="scope.row.ActionType == 180 && scope.row.ActionType != 130 && scope.row.TeamGroup == '1'" @click="handleRepatriate(scope.row, '190')" type="text" size="small">返还</el-button>
                <el-button v-if="scope.row.ActionType != 180 && scope.row.ActionType != 130" @click="handleTransferAction(scope.row, '130') && isTransferDis === true" type="text" size="small">转会</el-button>
                <el-button v-if="scope.row.ActionType != 180" @click="handlePlayerAction(scope.row, '110')" type="text" size="small">解约</el-button>
                <el-button v-if="scope.row.ActionType != 180" @click="handlePlayerEditAction(scope.row, '170')" type="text" size="small">修改</el-button>
                <el-button @click="handleDetail(scope.row, '1')" type="text" size="small">详情</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="教练" name="coach">
          <el-table :data="tableData" border style="width: 100%">
            <el-table-column label="序号" fixed prop="id" />
            <el-table-column label="俱乐部" fixed prop="TeamGroupName" />
            <el-table-column label="战队" fixed prop="TeamName"  />
            <el-table-column label="姓名(中文)" fixed prop="sName" width="100" />
            <el-table-column label="姓名(英文)" fixed prop="NameEn" width="100" />
            <el-table-column label="国家" prop="CountryName" />
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
                <el-button @click="handleCoachAction(scope.row, '160')" type="text" size="small">解约</el-button>
                <el-button @click="handleCoachEditAction(scope.row, '200')" type="text" size="small">修改</el-button>
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
  import { getUrlParam } from '../../../../../utils/index';
  import {render} from "../../utils/render";
  import {api} from "../../utils/api";
import { isTransfer } from '../add/service';

  export default {
    data() {
      return {
        isTransferDis: false,
        histVisible: false,
        histData: [],
        count: 0,
        params: {
          page: 1, 
          pageSize: 10,
          NameCn: '',
          TeamID: '',
          activeName: getUrlParam('activeName') || 'player',
          CreatedAt: '',
        },
        tableData: [],
        roleList: render.GetRoleList(),
      }
    },
    async created() {
      await render.initTeams();
      this.handleTabs();
      this.getTransferTime();
    },
    filters: {
      datetime(val) {
        return val ? moment(val).format('YYYY-MM-DD') : val;
      }
    },
    methods: {
      async getTransferTime() {
        const { data: transfer } = await api.queryTransferTime({});
        // 不在转会期间
        if (
          (transfer.dtTransferStart && new Date(transfer.dtTransferStart).getTime() > Date.now()) ||
          (transfer.dtTransferEnd && new Date(transfer.dtTransferEnd).getTime() < Date.now())
        ) {
          this.isTransferDis = false;
        } else {
          this.isTransferDis = true;
        }
      },
      fulldatetime(val) {
        return render.FullDateTime(val);
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
        this.getTableList(this.fiflerProps(this.params))
      },
      check170(row, type) {
        const url = `/player/add?OuterID=${row.id}&activeName=player&iType=${type}&edit=edit`;
        // window.open(url, '_blank');
        window.location.href = url;
      },



      // 1. check目标（LDL）战队的人数，只做提醒：
      // “返还该选手后，xx战队人数为xx人，大于规则‘最多10人’的要求”
      // 2. 返还技能点。
      async check190(row, type) {
          this.$confirm(`确定返还该选手吗？`, '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            delete row.iType;
            const params = {
              PlayerID: row.id,
              iType: type,
              ...row
            };
            return api.saveBack(params).then(res => {
              if (res.success) {
                this.getTableList(this.fiflerProps(this.params));
              } else {
                this.$message.error(res.data.message || '系统异常，稍后再试！');
              }
            })
          });
      },

      // Check战队人数 只做提醒 “解约该选手后，战队人数
      async chck110(row, type) {
        this.$confirm("您确定解约该选手吗？", '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          const url = `/player/actioning?id=${row.id}&iType=${type}&activeName=player`;
          // window.open(url, '_blank');
          window.location.href = url;
        });
      },

      async checkSkillPoint(row, type) {
        let msg = '';
        let title = '';
        let mum = 0;
        const tmp = {
          PlayerID: row.id,
          teamID: row.TeamID,
          iType: type
        }
        if (type == '180') {
          title = '【借调】会占用一条上调通道'
        }
        if (type == '140') {
          title = '【下放】会占用一条下放通道'
        }
        if (type == '120') {
          title = '【上调】会占用一条上调通道'
        }

        const ret = await api.querySkillPoint(tmp);
        // 不在转会期间
        if (this.isTransferDis == false) {
          if (ret.success && ret.data && ret.data.length < 3) {
            mum = 3 - ret.data.length;
            msg = `该操作${title}，本赛季还剩余${mum}通道`;
          } else {
            msg = `本赛季已经没有可用通道`;
          }
        } else { // 转会期间
          if (type == '180') {
            msg = `转会期间不能借调选手`;
          } else {
            msg = `该操作${title}，转会期间通道不受限制，但身份变更只能进行一次`;
          }
        }
        return msg;
      },

      // 1. check借调的技能点（通道），作为是否能够开始流程的依据
      // 文案1：如果没有通道：“本赛季已经没有可用通道”
      // 文案2：如果还有通道：“该操作会占用一条上调通道，本赛季还剩余xx通道”
      // 2.check本战队（LDL）人数，只做提醒。
      // “借调该选手后，xx战队人数为xx人，小于规则‘最少6人’的要求”
      async check180(row, type) {
        const msg = await this.checkSkillPoint(row, type);
        if (['本赛季已经没有可用通道', '转会期间不能借调选手'].includes(msg)) {
          this.$message.warning(msg);
        } else {
          if (msg != '') {
            this.$confirm(`${msg}`, '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              dangerouslyUseHTMLString:true,
              type: 'warning'
            }).then(() => {
              let url = `/player/actioning?id=${row.id}&iType=${type}&activeName=player`;
              // window.open(url, '_blank');
              window.location.href = url;
            });
          }
        }
      },

      // 1. check 技能点（通道）作为是否能够开始流程的依据。
      // 文案1：如果没有通道：“本赛季已经没有可用通道”
      // 文案2：如果还有通道：“该操作会占用一条上调/下放通道，本赛季还剩余xx通道”
      // 2. check双方战队人数，只做提醒。
      // “下放该选手后，xx战队人数为xx人，小于规则‘最少6人’的要求”
      // “下放该选手后，xx战队人数为xx人，大于规则‘最多10人’的要求”
      async chckout140(row, type) {
        const msg = await this.checkSkillPoint(row, type);
        if (msg == '本赛季已经没有可用通道') {
          this.$message.warning(`本赛季已经没有可用通道`);
        } else {
          if (msg != '') {
            this.$confirm(`${msg}`, '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              let url = `/player/actioning?id=${row.id}&iType=${type}&activeName=player`;
              // window.open(url, '_blank');
              window.location.href = url;
            });
          }
        }
      },

      // 1. check 技能点（通道）作为是否能够开始流程的依据。
      // 文案1：如果没有通道：“本赛季已经没有可用通道”
      // 文案2：如果还有通道：“该操作会占用一条上调/下放通道，本赛季还剩余xx通道”
      // 2. check双方战队人数，只做提醒。
      // “下放该选手后，xx战队人数为xx人，小于规则‘最少6人’的要求”
      // “下放该选手后，xx战队人数为xx人，大于规则‘最多10人’的要求”
      async chckout120(row, type) {
        const msg = await this.checkSkillPoint(row, type);
        if (msg == '本赛季已经没有可用通道') {
          this.$message.warning(`本赛季已经没有可用通道`);
        } else {
          if (msg != '') {
            this.$confirm(`${msg}`, '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              let url = `/player/actioning?id=${row.id}&iType=${type}&activeName=player`;
              window.location.href = url;
            });
          }
        }
      },

      getAuditingByOuterId(row, type) {
        const params = {
          OuterID: row.id,
          iType: '100,110,120,130,140,170,180,190',
          activeName: 'player'
        }
        api.queryAuditingByOuterId(params).then(res => {
          if (res.success) {
            if (res.data && res.data.length === 0) {
              if (type == '170') {
                this.check170(row, type);
              }
              if (type == '190') {
                this.check190(row, type);
              }
              if ( type == '110') {
                this.chck110(row, type);
              }
              if (type == '180') {
                this.check180(row, type);
              }
              if (type == '140') {
                this.chckout140(row, type);
              }
              if (type == '120') {
                this.chckout120(row, type);
              }
              if (type == '130') {
                let url = `/player/actioning?id=${row.id}&iType=${type}&activeName=player`;
                window.location.href = url;
              }
            }
            if (res.data && res.data.length) {
              const data = res.data[0];
              let title = render.RenderType(data.iType);
              this.$message.warning(`当前选手已存在【${title}】工单，请在我的申请中查看详情!`)
            }
          } else{
            this.$message.warning(res.data);
          }
        })
      },

      handlePlayerEditAction(row, type) {
        this.getAuditingByOuterId(row, type);
      },
      handlePlayerAction(row, type) {
        this.getAuditingByOuterId(row, type);
      },
      handleTransferAction(row, type) {
        this.getAuditingByOuterId(row, type);
      },
      handleRepatriate(row, type) {
        this.getAuditingByOuterId(row, type);
      },
      async check160(row, type) {
        this.$confirm("您确定要解约该教练吗？", '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let url = `/player/actioning?id=${row.id}&iType=${type}&activeName=coach`;
          // window.open(url, '_blank');
          window.location.href = url;
        });
      },

      getCoachAuditingByOuterId(row, type) {
        const params = {
          OuterID: row.id,
          iType: '150,160,200'
        }
        return api.queryAuditingByOuterId(params).then(res => {
          if (res.success) {
            if (res.data && res.data.length === 0) {
              if (type == '160') {
                this.check160(row, type);
              }
              if (type == '200') {
                const url = `/coach/add?OuterID=${row.id}&activeName=coach&iType=${type}&edit=edit`;
                // window.open(url, '_blank');
                window.location.href = url;
              }
            } 
            if (res.data && res.data.length) {
              const data = res.data[0];
              if (data.iType === '160') {
                this.$message.warning('当前用户已存在解约工单，请联系管理员!')
              }
              if (data.iType === '200') {
                this.$message.error('当前用户存在修改工单，请联系管理员!');
              }
            } 
          }
        })
      },
      handleCoachEditAction(row, type) {
        this.getCoachAuditingByOuterId(row, type)
      },
      handleCoachAction(row, type) {
        this.getCoachAuditingByOuterId(row, type)
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
        this.getTableList(this.fiflerProps(this.params))
      },
      handleHisClick(row, type) {
        const params = {
          OuterID: row.id,
          page: 1,
          pageSize: 20
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
              item.PlayerPosName = render.PlayerPosRender(item.PlayerPos);
              item.CountryName = render.CountryRender(item.Country);
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
            this.$message.error(res && res.message || '系统异常， 稍后再试！');
          }
        });
      },
      playerAdd(type) { this.$router.push({ path: `/player/add?iType=${type}` })},
      coachAdd(type) {this.$router.push({ path: `/coach/add?iType=${type}` })},
      pagination(page) {
        this.params.page = page;
        let params = this.fiflerProps(this.params);
        params.page = page;
        this.getTableList(params);
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
</style>

<template lang="html">
  <el-card>
    <el-form :inline="true" :model="form">
      <el-form-item label="俱乐部" prop="TeamID">
        <el-select v-model="form.TeamID" placeholder="请选择">
          <el-option v-for="item in teamData"
            :key="item.value"
            :label="item.label"
            :value="item.value" />
        </el-select>
      </el-form-item>
      <el-form-item label="申请类型" prop="iType">
        <el-select v-model="form.iType" placeholder="请选择">
          <el-option v-for="item in applyTypeList"
            :key="item.value"
            :label="item.label"
            :value="item.value" />
        </el-select>
      </el-form-item>
      <el-form-item label="提交时间" prop="CreatedAt">
        <el-date-picker
          v-model="form.CreatedAt"
          type="date"
          placeholder="请选择" style="width: 194px" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleSearch">搜 索</el-button>
      </el-form-item>
    </el-form>
      <el-tabs v-model="activeTypeName" type="card" @tab-click="handleTabs">
        <el-tab-pane label="待审核" name="audited">
          <el-table :data="tableData" border style="width: 100%">
            <el-table-column prop="id" label="序号" fixed />
            <el-table-column prop="TeamGroupName" label="俱乐部" fixed  />
            <el-table-column prop="TeamName" label="战队" fixed  />
            <el-table-column prop="role" label="身份" fixed />
            <el-table-column label="姓名 (中文)" prop="NameCn" fixed width="120" />
            <el-table-column prop="GameName" label="游戏ID" />
            <el-table-column prop="ActionName" label="申请类型" /> 
            <el-table-column prop="CreateOperID" label="提交人" :formatter="CreateOperIDRender" />
            <el-table-column prop="CreatedAt" label="最后提交时间" width="160">
              <template slot-scope="scope">
                <span>{{ scope.row.CreatedAt | datetime }}</span>
              </template>
            </el-table-column>
            <el-table-column prop="AuditStatus" label="状态" :formatter="AuditStatusRender"  />
            <el-table-column label="审批记录" align="center">
              <template slot-scope="scope">
                <el-button @click="handleHistLog(scope.row)" type="text" size="small">查看</el-button>
              </template>
            </el-table-column>
            <el-table-column label="操作" align="center" fixed="right" width="100">
              <template slot-scope="scope">
                <el-button  @click="handleDetail(scope.row.OuterID)" type="text" size="small">详情</el-button>
                <el-button @click="handleIsAudit(scope.row)" type="text" size="small">审核</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>

        <el-tab-pane label="已通过" name="passed">
          <el-table :data="tableData" border style="width: 100%">
            <el-table-column prop="id" label="序号" fixed />
            <el-table-column prop="TeamGroupName" label="俱乐部" fixed  />
            <el-table-column prop="TeamName" label="战队" fixed  />
            <el-table-column prop="role" label="身份" fixed />
            <el-table-column label="姓名 (中文)" prop="NameCn" fixed width="120"  />
            <el-table-column prop="GameName" label="游戏ID" />
            <el-table-column prop="ActionName" label="申请类型" />
            <el-table-column prop="AuditOperID" label="提交人" :formatter="CreateOperIDRender" />
            <el-table-column prop="CreatedAt" label="最后提交时间" width="160">
              <template slot-scope="scope">
                <span>{{ scope.row.CreatedAt | datetime }}</span>
              </template>
            </el-table-column>
            <el-table-column prop="AuditStatus" label="状态" :formatter="AuditStatusRender"  />
            <el-table-column label="审批记录" align="center">
              <template slot-scope="scope">
                <el-button @click="handleHistLog(scope.row)" type="text" size="small">查看</el-button>
              </template>
            </el-table-column>
            <el-table-column prop="AuditReason" label="具备原因" width="260" />
            <el-table-column label="操作" fixed="right" width="100">
              <template slot-scope="scope">
                <el-button type="text" @click="handlePassReson(scope.row)" size="small">原因</el-button>
                <el-button  @click="handleDetail(scope.row.OuterID)" type="text" size="small">详情</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="已拒绝" name="failed">
          <el-table :data="tableData" border style="width: 100%">
            <el-table-column prop="id" label="序号" fixed />
            <el-table-column prop="TeamGroupName" label="俱乐部" fixed  />
            <el-table-column prop="TeamName" label="战队" fixed  />
            <el-table-column prop="role" label="身份" fixed />
            <el-table-column label="姓名 (中文)" prop="NameCn" fixed width="120"  />
            <el-table-column prop="GameName" label="游戏ID" />
            <el-table-column prop="ActionName" label="申请类型" />
            <el-table-column prop="AuditOperID" label="提交人" :formatter="CreateOperIDRender" />
            <el-table-column prop="CreatedAt" label="最后提交时间">
              <template slot-scope="scope">
                <span>{{ scope.row.CreatedAt | datetime }}</span>
              </template>
            </el-table-column>
            <el-table-column prop="AuditStatus" label="状态" :formatter="AuditStatusRender"  />
            <el-table-column prop="AuditStatus" label="审批记录" align="center">
              <template slot-scope="scope">
                <el-button @click="handleHistLog(scope.row)" type="text" size="small">查看</el-button>
              </template>
            </el-table-column>
            <el-table-column label="操作" align="center" fixed="right" width="100">
              <template slot-scope="scope">
                <el-button  @click="handleDetail(scope.row.OuterID)" type="text" size="small">详情</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="已终止" name="end">
          <el-table :data="tableData" border style="width: 100%">
            <el-table-column prop="id" label="序号" fixed />
            <el-table-column prop="TeamGroupName" label="俱乐部" fixed  />
            <el-table-column prop="TeamName" label="战队" fixed  />
            <el-table-column prop="role" label="身份" fixed />
            <el-table-column label="姓名 (中文)" prop="NameCn" fixed width="120"  />
            <el-table-column prop="GameName" label="游戏ID" />
            <el-table-column prop="ActionName" label="申请类型" />
            <el-table-column prop="AuditOperID" label="提交人" :formatter="CreateOperIDRender" />
            <el-table-column prop="CreatedAt" label="最后提交时间">
              <template slot-scope="scope">
                <span>{{ scope.row.CreatedAt | datetime }}</span>
              </template>
            </el-table-column>
            <el-table-column prop="AuditStatus" label="状态" :formatter="EndStatusRender"  />
            <el-table-column prop="AuditStatus" label="审批记录" align="center">
              <template slot-scope="scope">
                <el-button @click="handleHistLog(scope.row)" type="text" size="small">查看</el-button>
              </template>
            </el-table-column>
            <el-table-column label="操作" align="center" fixed="right" width="100">
              <template slot-scope="scope">
                <el-button  @click="handleDetail(scope.row.OuterID)" type="text" size="small">详情</el-button>
              </template>
            </el-table-column>
        </el-table>
      </el-tab-pane>
    </el-tabs>
    <el-pagination v-if="count > 0"
      layout="prev, pager, next"
      @current-change="pagination"
      :total="count" />
    <el-dialog :title="title" :visible.sync="auditDialogVisible">
      <el-form :model="form">
        <el-form-item label="原因" 
          :rules="[{ required: true, message: '必填', trigger: 'blur' }]" 
          :label-width="formLabelWidth">
          <el-input 
            type="textarea" 
            :rows="4" 
            v-model="params.AuditReason" 
            placeholder="请输入内容,限制100字"
            :maxlength=100
            style="width: 90%" />
        </el-form-item>
        <el-form-item label="上传附件" :label-width="formLabelWidth">
          <el-upload
            class="upload-demo"
            :http-request="UploadFilePath"
            :before-upload="onBeforeUpload"
            :before-remove="beforeRemove"
            :limit="1"
            :on-exceed="handleExceed"
            :accept="ACCEPT"
            :file-list="fileList">
            <el-button size="small" type="primary">点击上传</el-button>
          </el-upload>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="auditDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="passSave">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog title="操作记录" :visible.sync="histVisible">
      <el-table :data="log.logData || []">
        <el-table-column property="OperID" label="提交人" align="center" :formatter="OperIDRender" />
        <el-table-column property="CreatedAt" label="提交时间" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.CreatedAt | datetime }}</span>
          </template>
        </el-table-column>
        <el-table-column property="AuditOperID" label="审核人" :formatter="AuditOperIDRender" />
        <el-table-column property="AuditedAt" label="审核时间">
          <template slot-scope="scope">
            <span>{{ scope.row.AuditedAt | datetime }}</span>
          </template>
        </el-table-column>
        <el-table-column property="Desc" label="状态" />
        <el-table-column property="Reason" label="审核结果" :formatter="reasonRender" />
      </el-table>
      <el-pagination v-if="log.count > 0"
        layout="prev, pager, next"
        @current-change="dialogPagination"
        :total="log.count" />
      </el-dialog>

    <el-dialog title="审核通过具备原因" :visible.sync="resaonVisible">
      <el-input
        type="textarea"
        :rows="4"
        placeholder="请输入内容,限字200"
        v-model="obj.AuditPassReason" />
        <div slot="footer" class="dialog-footer">
          <el-button @click="resaonVisible = false">取 消</el-button>
          <el-button type="primary" @click="handleApproveSave">确 定</el-button>
        </div>
    </el-dialog>
  </el-card>
</template>
<script>
  String.prototype.replaceAll = function(s1,s2) {     
    return this.replace(new RegExp(s1,"gm"),s2);     
  }
  import moment from 'moment';
  import { getUrlParam } from '../../../../utils/index';
  import {isAudit, adoptAfterSave, fileUpload, queryLog, queryTeamIn } from './service';
  import { ITYPE_LIST, ROLE_LIST, ACCEPT_TYPE  } from '../utils/contants'
  import {api} from "../utils/api";
  import {render} from "../utils/render";

  export default {
    data() {
      return {
        fileList: [],
        tableData: [],
        ACCEPT: ACCEPT_TYPE,
        flag: true,
        params: { id: null, AuditReason: '', AuditFilePath: '' },
        form: { 
          page: 1, 
          pageSize: 10, 
          TeamID: '', 
          NameCn: '', 
          NameEn: '',
          GameName: '',
          activeName: 'player', 
          Type: '', 
          CreatedAt: '', 
          AuditStatus: '0',
          isActive: '1'
        },
        roleName: 'player',
        activeTypeName: getUrlParam('activeName') || 'audited',
        teamData: [],
        applyTypeList: ITYPE_LIST,
        roleList: ROLE_LIST,
        title: '',
        obj: {
          AuditPassReason: '',
          id: null
        },
        histVisible: false,
        auditDialogVisible: false,
        resaonVisible: false,
        formLabelWidth: '100px',
        count: 0,
        histData: [],
        log: { 
          page: 1, 
          pageSize: 10, 
          orderID: null,
          logData: [],
          count: 0,
        },
      };
    },
    created() {
      render.initTeams();
      this.handleTabs();
    },
    filters: {
      datetime(val) {
        return val ? moment(val).format('YYYY-MM-DD HH:mm:ss') : val;
      }
    },
    methods: {
      AuditOperIDRender(row) {
        if (row.AuditOperID) {
          const OperName = row.AuditOperID.split('/');
          return OperName[1];
        }
        return '';
      },
      OperIDRender(row) {
        if (row.OperID) {
          const OperName = row.OperID.split('/');
          return OperName[1];
        }
        return '';
      },
      CreateOperIDRender(row) {
        if (row.CreateOperID) {
          const OperName = row.CreateOperID.split('/');
          return OperName[1];
        }
        return '';
      },
      reasonRender(row) {
        if (row.Reason) {
          return row.Reason.replaceAll('{', '').replaceAll('}', '');
        }
        return '';
      },
      handleExceed(files, fileList) {
        this.$message.warning(`当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
      },
      onBeforeUpload(file) {
        if (!['application/pdf', 'image/jpeg', 'image/png', 'image/jpg'].includes(file.type)) {
          this.$message.error('只能上传PDF,JPG,PNG');
          this.flag = false;
          return false;
        }
        return true;
      },
      beforeRemove(file, fileList) {
        if (this.flag) {
          return this.$confirm(`确定移除 ${ file.name }？`);
        }
        this.flag = true;
      },
      UploadFilePath(params) {
        let formData = new FormData();
        formData.append('file', params.file);
        formData.append('dir','admin');
        formData.append('protect',1);
        return fileUpload(formData).then(res => {
          if (res.success) {
            this.params.AuditFilePath = res.data;
          }
        })
      },
      pagination(page) {
        const { AuditStatus } = this.params;
        this.form.page = page;
        this.form.AuditStatus = AuditStatus;
        this.getTableList(this.filterProp(this.form));
      },
      filterProp (data) {
        const pdata = {};
        Object.keys(data).forEach(p => {
          if (data[p]) {
            pdata[p] = data[p];
          }
        })
        return pdata;
      },
      EndStatusRender() {
        return '已终止'
      },
      AuditStatusRender(row) {
        return render.RenderStatus(row.AuditStatus);
      },
      handleSearch() {
        this.handleTabs();
      },
      handleDetail (id) {
        if (id) {
          this.$router.push({ path: `/player/playerDetail?id=${id}&activeName=player` });
        } else {
          return this.$message.warning(`缺少 id`);
        }
      },
      getTableList(params) {
        return api.queryDetail(params).then(res => {
          if (res.success) {
            const data = res.data && res.data.rows || [];
            this.tableData = [];
            data.forEach(item => {
              this.tableData.push({
                ...item.newInfo,
                role: '选手',
                ...item,
                TeamName:render.TeamNameRender(item.TeamID),
                TeamGroupName:render.TeamGourpRender(item.TeamID),
                ActionName:render.RenderType(item.iType),
              })
            })
            this.count = Number(res.data.count) || 0;
          } else {
            this.$message.error(res && res.message || '系统异常， 稍后再试！');
          }
        })
      },
      handleTabs(tab) {
        this.form.page = 1;
        this.tableData = [];
        let params = this.filterProp(this.form);
        if (tab && tab.name === "audited" || this.activeTypeName === 'audited') {
          this.activeTypeName = "audited";
          params.AuditStatus = '0';
          params.isActive = '1';
        }
        if (tab && tab.name === "passed" || this.activeTypeName === 'passed') {
          this.activeTypeName = "passed";
          params.AuditStatus = '1';
          delete params.isActive;
        }
        if (tab && tab.name === 'failed' || this.activeTypeName === 'failed') {
          this.activeTypeName = "failed";
          params.AuditStatus = '-1';
          delete params.isActive;
        }
        if (tab && tab.name === 'end' || this.activeTypeName === 'end') {
          this.activeTypeName = "end";
          params.AuditStatus = '0, -1';
          params.isActive = '-1';
        }
        this.getTableList(params);
      },
      // 选手借调 180 逻辑 1.check本战队人数，只做提醒。2.“借调该选手后，xx战队人数为xx人，小于规则‘最少6人’的要求”
      checkBorrow(row) {
        this.check170OR100(row);
      },
      // 选手返还 190 逻辑 1.check双方战队人数，只做提醒。2.“返还该选手后，xx战队人数为xx人，大于规则‘最多10人’的要求”
      getCheckBack(row) {
        this.check170OR100(row);
      },
      // 1. Check双方战队人数，只做提醒。
      // “上调/下放该选手后，xx战队人数为xx人，小于规则‘最少6人’的要求”
      // “上调/下放该选手后，xx战队人数为xx人，大于规则‘最多10人’的要求”
      check120OR140(row) {
        this.check170OR100(row);
      },
      // 选手修改和新增 1.check该战队的人数。提醒文案：“通过审核，该战队人数为xx人；该俱乐部人数为xx人，通过吗？“
      // 2. check 身份证，如果没用，check 护照。该申请 和系统中已有的人。只做提醒。文案：“身份证/护照号xxx已经注册为xx俱乐部ID选手；”（在列表里，只有合同未到期+3天的才在俱乐部的人员列表里）
      async check170OR100(row) {
        const IDNumberMsg = await this.checkoutIDNumber(row);
        const ClubMsg = await this.checkSameClub(row,IDNumberMsg);
        this.$confirm(ClubMsg, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          dangerouslyUseHTMLString:true,
          type: 'warning'
        }).then(() => {
          this.goIsAudit(row)
        });
      },
      // check身份证
      async checkoutIDNumber(row) {
        const { IDNumber, Passport } = row;
        let msg = '';
        let tmp = {
          activeName: 'player'
        };
        if (IDNumber) {
          tmp.IDNumber = IDNumber;
        } else {
          tmp.Passport = Passport;
        }
        const r = await queryTeamIn(tmp);
        if (r.success && r.data && Number(r.data.count) > 1) {
          const teamInData = r.data.rows;
          teamInData.forEach(team => {
            if (team.TeamID != tmp.TeamID) {
              let TeamName = render.TeamNameRender(team.TeamID);
              msg = `身份证[ ${IDNumber ? IDNumber : Passport} ]已在[ ${TeamName} ]中;`;
            }
          })
        }
        return msg;
      },
      // checkout 同一个俱乐部
      async checkSameClub(row,msg) {
        let msgs = [];
        if(msg != ""){
          msgs.push(msg);
        }
        const { TeamID, TeamGroup, IDNumber, Passport, TeamDes, iType } = row;
        let TeamCount = 0;
        const obj = { 
          TeamID,
          TeamGroup,
          activeName: 'player'
        }
        const ret = await api.queryTeamCount(obj);
        if (ret.success) {
          TeamCount = parseInt(ret.data.LDLCount) +  parseInt(ret.data.LPLCount);
          let TeamGroupName = render.TeamGourpRender(TeamID);
          if (Number(TeamCount) > 18) {
            let msg = '';
            msg = `该俱乐部[${TeamGroupName}]总计${TeamCount}人，<font style="color: red">超过18人;</font>`;
            if(ret.data.LPLID != 0){
              msg = msg + "LPL战队人数："+ret.data.LPLCount+"人；";
            }
            if(ret.data.LDLID != 0){
              msg = msg + "LDL战队人数："+ret.data.LDLCount+"人；";
            }
            msgs.push(msg);
          }

          if (iType == '100' || iType == '170') {
            let msg = '';
            msg = `该俱乐部[${TeamGroupName}]总计${TeamCount}人，`;
            if(ret.data.LPLID != 0){
              msg = msg + "LPL战队人数："+ret.data.LPLCount+"人；";
            }
            if(ret.data.LDLID != 0){
              msg = msg + "LDL战队人数："+ret.data.LDLCount+"人；";
            }
            msg = msg + `${iType == '100' ? '新增' : '修改'}该选手,通过审核后共 ${iType == '100' ? parseInt(TeamCount,10) + 1 : TeamCount} 人`;
            msgs.push(msg);
          } else if (iType == '120') {
            let msg = '';
            msg = `该俱乐部[${TeamGroupName}] LDL战队 有${ret.data.LDLCount} 人，上调该选手后，
            LDL战队人数为${ret.data.LDLCount - 1} 人, ${(ret.data.LDLCount - 1) < 6 ? '<font style="color: red">小于规则最少6人,</font>' : ''} LPL战队人数为${(  parseInt(ret.data.LPLCount) + 1)}人 ${(parseInt(ret.data.LPLCount) + 1) > 10 ? '<font style="color: red">大于规则最多10人,</font>' : ''} `;
            msgs.push(msg);
          } else if (iType == '140') {
            let msg = '';
            msg = `该俱乐部[${TeamGroupName}]  LPL战队 有${ret.data.LPLCount} 人，下放该选手后，
            LPL战队人数为${ret.data.LPLCount - 1} 人, ${(ret.data.LPLCount - 1) < 6 ? '<font style="color: red">小于规则最少6人,</font>' : ''} LDL战队人数为${(parseInt(ret.data.LDLCount) + 1)}人 ${(parseInt(ret.data.LDLCount) + 1) > 10 ? '<font style="color: red">大于规则最多10人,</font>' : ''}`;
            msgs.push(msg);
          } else if (iType == '190') {
            let msg = '';
            msg = `该俱乐部[${TeamGroupName}] LDL战队 有${ret.data.LDLCount} 人，返还该选手后，LDL战队人数为${ret.data.LDLCount} 人`;
            msgs.push(msg);
          } else if (iType == '180') {
            let msg = '';
            msg = `该俱乐部[${TeamGroupName}]  LDL战队 有${ret.data.LDLCount} 人， 借调该选手后，LDL战队人数为${ret.data.LDLCount} 人`;
            msgs.push(msg);
          } else if (iType == '110') {
            let msg = `该俱乐部[${TeamGroupName}]总计${TeamCount}人；`;
            if(ret.data.LPLID == TeamID){
              msg = msg + "通过审核,LPL战队人数："+(parseInt(ret.data.LPLCount)-1)+"人；"+`, ${(ret.data.LDLCount - 1) < 6 ? '<font style="color: red">小于规则最少6人</font>' : ''}`;
            }
            if(ret.data.LDLID == TeamID){
              msg = msg + "通过审核,LDL战队人数："+(parseInt(ret.data.LDLCount)-1)+"人；"+`, ${(ret.data.LDLCount - 1) < 6 ? '<font style="color: red">小于规则最少6人</font>' : ''}`;
            }
            msgs.push(msg);
          }
        }
        msgs.push("确定要审核吗？");
        return msgs.join("<br/>");
      },
      handleIsAudit (row) {
        // 选手注册 100, 选手解约 110, 选手上调 120, 选手转会 130, 选手下放 140, 选手修改 170
        // 1. check该战队的人数,同一个俱乐部，2. LPL+LDL总数不可以超过18人
        if (row.iType == '120' || row.iType == '140') {
          this.check120OR140(row);
        }
        if (row.iType == '180') {
          this.checkBorrow(row)
        }
        if (row.iType == '190') {
          this.getCheckBack(row);
        }
        if (row.iType == '130') {
          this.goIsAudit(row);
        }
        if (row.iType == '170' || row.iType == '100') {
          this.check170OR100(row);
        }
        if (row.iType == '110') {
          this.getCheckLeave(row)
        }
      },
      async getCheckLeave(row) {
        const ClubMsg = await this.checkSameClub(row,"");
        if (ClubMsg != '') {
          this.$confirm(ClubMsg, '提示', {
            confirmButtonText: '确定',
            dangerouslyUseHTMLString:true,
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.goIsAudit(row)
          });
        }
      },
      goIsAudit (row) {
        let activeName = 'player';
        if (row.iType === '100' || row.iType === '170' || row.iType === '190') {
          this.$router.push({ path: `/player/markingProblem?id=${row.id}&OuterID=${row.OuterID}&iType=${row.iType}&activeName=${activeName}` });
        } 
        if (row.iType === '110' || row.iType === '120' || row.iType === '130' || row.iType === '140' || row.iType === '180') {
          this.$router.push({ path: `/actionProblem?id=${row.id}&OuterID=${row.OuterID}&iType=${row.iType}&activeName=${activeName}` });
        };
      },
      passSave() {
        let params = {};
        params.AuditReason = this.params.AuditReason;
        params.id = this.params.id;
        params.AuditFilePath = this.params.AuditFilePath
        return isAudit(this.params).then(res => {
          if (res.success) {
            this.auditDialogVisible = false;
            this.getTableList(this.filterProp(this.form));
          } else {
            this.$message.error(res && res.message || '系统异常， 稍后再试！');
          }
        })
      },
      dialogPagination(page) {
        this.log.page = page;
        const params = {
          orderID: this.log.orderID,
          page,
          pageSize: 10,
        };
        return queryLog(params).then(res => {
          if (res.success) {
            this.log.logData = res.data.rows || [];
            this.log.count = res.data.count;
          }
        })
      },
      handleHistLog(row) {
        this.log.orderID = row.id;
        const params = {
          orderID: row.id,
          page: this.log.page,
          pageSize: this.log.pageSize,
        };
        return queryLog(params).then(res => {
          if (res.success) {
            this.histVisible = true;
            this.log.logData = res.data.rows || [];
            this.log.count = res.data.count;
          }
        })
      },
      handlePassReson(row) {
        this.resaonVisible = true;
        this.obj.id = row.id;
      },
      handleApproveSave() {
        let params = this.obj;
        let tmp = this.filterProp(this.form);
        return adoptAfterSave(params).then(res => {
          if (res.success) {
            this.resaonVisible = false;
            this.obj.AuditPassReason = '';
            tmp.AuditStatus = '1';
            this.getTableList(this.filterProp(tmp))
          } else {
            this.$message.error(res && res.message || '系统异常， 稍后再试！');
          }
        })
      },
      handleGoDetail(row) {
        let activeName = 'player'
        this.$router.push({ path: `/eco/auditInformation/detail?id=${row.id}&outerID=${row.OuterID}&AuditStatus=${row.AuditStatus}&Role=${activeName}&iType=${row.iType}` });
      }
    }
  };
</script>
<style scoped>
  .el-pagination {
    text-align: right;
  }
</style>

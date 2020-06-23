<template lang="html">
  <div class="box">
    <el-card style="margin-bottom: 10px">
      <div slot="header">{{title}}申请</div>
      <el-steps :space="200" :active="1" finish-status="success">
        <el-step :title="stepTitle"></el-step>
        <el-step title="等待管理员审核"></el-step>
      </el-steps>
    </el-card>
    <el-card>
      <el-form :model="form" ref="form">
        <el-form-item label="选手姓名">
          <div>{{ruleForm.NameCn}} <span v-show="iType == '130'" class="ruleForm-ml">由 {{teamInfo.TeamDes}} 俱乐部 {{ruleForm.oldTeamGroup == 1 ? 'LPL' : 'LDL'}} 战队 申请转会 到 {{newTeamDes}} 俱乐部 {{ruleForm.newTeamGroup == 1 ? 'LPL' : 'LDL'}} </span></div>
        </el-form-item>
      </el-form>
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column prop="sName" label="文件名称" width="160" />
        <el-table-column prop="sDesc" label="文件要求" width="160" />
        <el-table-column prop="downloadTmp" label="下载模板" align="center">
          <template slot-scope="scope">
            <el-upload class="upload-demo" disabled :file-list="scope.row.sFilePathList">
              <el-button size="small" v-show="scope.row.sFilePathList && scope.row.sFilePathList.length" @click="handleFilePath(scope.row)" type="text">下载模板</el-button>
            </el-upload>
          </template>
        </el-table-column>
        <el-table-column prop="downloadTmp" label="查看范例" align="center">
          <template slot-scope="scope">
            <el-upload class="upload-demo" disabled :file-list="scope.row.sDemoFilePathList">
              <el-button size="small" v-show="scope.row.sDemoFilePathList && scope.row.sDemoFilePathList.length" @click="handeleModel(scope.row)" type="text">查看范例</el-button>
            </el-upload>
          </template>
        </el-table-column>
        <el-table-column label="上传文件" align="center">
          <template slot-scope="scope">
            <el-upload disabled :file-list="scope.row.ExtValueList">
              <el-button style="margin-right: 20px" type="text" v-show="scope.row.ExtValueList && scope.row.ExtValueList.length" @click="handleExtValueDown(scope.row)">下载附件</el-button>
              <el-tooltip effect="light" :content="scope.row.errorInfo" placement="top-start">
                <el-button v-show="scope.row.errorInfo" type="text" class="err_msg">标记错误</el-button>
              </el-tooltip>
            </el-upload>
          </template>
        </el-table-column>
        <el-table-column prop="id" label="操作" width="180" align="center">
          <template slot-scope="scope">
            <el-button style="margin-right: 20px" type="text" @click="handleCheckouted(scope.row)">标记问题</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="tips-warp">系统能接受的每个文件大小不超过20M,只能上传PDF,JPG,PNG文件三种格式</div>
      <el-dialog title="标记问题" :visible.sync="auditDialogVisible">
        <el-form :model="checkoutForm" ref="checkoutForm" class="checkout-warp">
          <el-form-item label="是否有问题" :label-width="formLabelWidth">
            <el-checkbox v-model="checkoutForm.ExtValue_Check" />
          </el-form-item>
          <el-form-item label="备具原因" :label-width="formLabelWidth">
            <el-input auto-complete="off" :maxlength=100 v-model="checkoutForm.ExtValue_msg" type="textarea" :rows="2" placeholder="请输入标记问题内容，限字100" />
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="auditDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="handleCheckoutSaave()">确 定</el-button>
        </div>
      </el-dialog>
      <div class="button-warp">
        <el-button type="primary" @click="handleAuditPass(1)">通过</el-button>
        <el-button @click="handleAuditFailed(-1)">不通过</el-button>
        <!-- <el-button @click="handleUpdateOrder">暂存并返回</el-button> -->
        <el-button @click="onSaveEnd">终止流程</el-button>
      </div>
    </el-card>
  </div>
</template>
<script>
  import moment from 'moment';
  import { getUrlParam } from '../../../../utils/index';
  import {  queryById, isAudit, preview, queryTempList, saveEnd } from './service';
  import { render } from '../utils/render';
  export default {
    data() {
      return {
        newTeamDes: '',
        title: '',
        stepTitle: '',
        teamInfo: {},
        ruleForm: {},
        checkoutForm: {},
        orginData: {},
        fileData: [],
        auditDialogVisible: false,
        activeName: getUrlParam('Role'),
        iType: getUrlParam('iType'), // 选手解约 110, 选手上调 120, 选手转会 130, 选手下放 140, 选手借调 180
        id: Number(getUrlParam('id')), // 工单id
        OuterID: Number(getUrlParam('OuterID')), // 选手 OuterID
        playerList: [],
        active: 1,
        tableData: []
      };
    },
    async created() {
      await render.initTeams();
      this.getTitle();
      this.getActionList();
    },
    methods: {
      handleCheckouted(row) {
        if (row.errorInfo) {
          this.$set(this.checkoutForm, 'ExtValue_msg', row.errorInfo);
          this.$set(this.checkoutForm, 'ExtValue_Check', true);
        } else {
          this.$set(this.checkoutForm, 'ExtValue_msg', '');
          this.$set(this.checkoutForm, 'ExtValue_Check', false);
        }
        this.rowId = row.TemplateID;
        this.auditDialogVisible = true;
      },
      handleCheckoutSaave() {
        const dataSouce = JSON.parse(JSON.stringify(this.tableData))
        this.tableData = [];
        if (this.checkoutForm.ExtValue_Check) {
          if (!this.checkoutForm.ExtValue_msg) {
            this.checkoutForm.ExtValue_msg = '';
          }
          dataSouce.forEach(item => {
            if (item.TemplateID == this.rowId) {
              item.errorInfo = this.checkoutForm.ExtValue_msg;
              item.ExtValue_Check = this.checkoutForm.ExtValue_Check;
            }
          })
          this.tableData = dataSouce;
          this.auditDialogVisible = false;
        } else {
          dataSouce.forEach(item => {
            if (item.TemplateID == this.rowId) {
              item.errorInfo = '';
              item.ExtValue_Check = false;
            }
          })
          this.tableData = dataSouce;
          this.auditDialogVisible = false;
        }
      },
      getTitle() {
        const iType = this.iType;
        const activeName = this.activeName;
        let name = '';
        if (activeName == 'coach') {
          name = '教练';
        } else {
          name = '选手';
        }
        if (iType === '110' || iType === '160') {
          this.title = `解约${name}`;
        }
        if (iType === '120') {
          this.title = `上调${name}`;
        }
        if (iType === '130') {
          this.title = `转会${name}`;
        }
        if (iType === '140') {
          this.title = `下放${name}`;
        }
        if (iType === '180') {
          this.title = `借调${name}`;
        }
        this.stepTitle = `${this.title}`
      },
      async getActionList() {
        let tableData = [];
        let tableFiles = [];
        const params = {
          id: this.id,
          activeName: this.activeName
        };
        const obj = { iType: this.iType };
        const restFile = await queryTempList(obj);
        if (restFile.success && restFile.data && restFile.data.rows && restFile.data.rows.length) {
          tableFiles = restFile.data.rows;
          tableFiles.forEach(file => {
            tableData.push({
              TemplateID: file.id,
              sDesc: file.sDesc,
              isNeed: file.isNeed,
              sName: file.sName,
              sFilePath: file.sFilePath,
              sDemoFilePath: file.sDemoFilePath,
              sDemoFilePathList: file.sDemoFilePath ? [{ name: file.sDemoFilePath.substring(6), url: file.sDemoFilePath }] : [],
              sFilePathList: file.sFilePath ? [{ name: file.sFilePath.substring(6), url: file.sFilePath }] : [],
            })
          })
          this.tableData = tableData;
          this.orginData = JSON.parse(JSON.stringify(tableData));
        }
        if (params.id) {
          const ret = await queryById(params);
          if (ret.success && ret.data &&  ret.data.rows && ret.data.rows[0]) {
            let tableData = [];
            const data = ret.data.rows[0];
            let oldData = data.oldInfo ? data.oldInfo : {};
            let newData = data.newInfo ? data.newInfo : {};
            if (tableFiles && tableFiles.length) {
              tableFiles.forEach(file => {
                if (newData.fileData && newData.fileData.length) {
                  newData.fileData.forEach(item => {
                    if (file.id == item.TemplateID) {
                      tableData.push({
                        isNeed: file.isNeed,
                        TemplateID: item.TemplateID,
                        sDesc: file.sDesc,
                        sName: file.sName,
                        sFilePath: file.sFilePath,
                        sDemoFilePath: file.sDemoFilePath,
                        ExtValue: item.ExtValue || '',
                        ExtValueList: item.ExtValue ? [{ name: item.ExtValue.substring(6), url: item.ExtValue }] : [],
                        sDemoFilePathList: file.sDemoFilePath ? [{ name: file.sDemoFilePath.substring(6), url: file.sDemoFilePath || '' }] : [],
                        sFilePathList: file.sFilePath ? [{ name: file.sFilePath.substring(6), url: file.sFilePath }] : [],
                        ExtValue_Check: item.errorInfo ? true : false,
                        errorInfo: item.errorInfo || '',
                      })
                    }
                  })
                }
              })
            }
            this.ruleForm = newData;
            this.teamInfo = data.teamInfo;
            this.newTeamDes = render.TeamNameRender(newData.newTeamID);

            this.endForm = data;
            this.tableData = tableData;
            this.orginData = JSON.parse(JSON.stringify(tableData));
          }
        } else {
          this.$message.error('ID 不能为空！')
        }
      },
      async checkoutAuditStatus() {
        const params = { id: this.id, activeName: this.activeName };
        const res = await queryById(params);
        let msg = '';
        if (res.success) {
          if (res.data && res.data.rows[0]) {
            const data = res.data.rows[0] || {};
            let AuditStatus = data.AuditStatus;
            const AuditedAt = data.AuditedAt && moment(data.AuditedAt).format('YYYY-MM-DD HH:mm:ss');
            let AuditOperID = data.AuditOperID && data.AuditOperID.split('/') || [];
            if (AuditStatus == 1) {
              msg = `该工单在${AuditedAt}时间，被${AuditOperID.length ? AuditOperID[1] : ''}审核通过！`;
            }
            if (AuditStatus == -1) {
              msg = `该工单在${AuditedAt}时间，被${AuditOperID.length ? AuditOperID[1] : ''}审核拒绝！`;
            }
          }
        }
        return msg;
      },
      async handleAuditFailed(AuditStatus) {
        let flag = true;
        const msg = await this.checkoutAuditStatus();
        if (msg != '') {
          this.$message.warning(msg);
          return;
        }
        let params = { 
          id: this.id, 
          AuditStatus,
          newInfo: {},
        };
        params.newInfo.fileData = this.tableData;
        if (this.tableData.length) {
          flag = this.tableData.some(item => {
            return item.ExtValue_Check
          })
        }
        if (!flag) {
          return this.$message.warning(`请为不通过标记问题！`)
        }
        if (flag) {
          this.$confirm('确认要驳回吗?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            isAudit(params).then(res => {
              if (res.success) {
                if (this.iType == '160') {
                  this.$router.push({ path: `/eco/coachInformationAudit?activeName=failed` });
                } else {
                  this.$router.push({ path: `/eco/playerAuditInformation?activeName=failed` });
                }
              } else {
                this.$message.error(res.data.message || '系统异常，稍后再试！');
              }
            })
          });
        }
      },
      async handleAuditPass (AuditStatus) {
        let flag = true;
        const msg = await this.checkoutAuditStatus();
        if (msg != '') {
          this.$message.warning(msg);
          return;
        }
        const id = this.id
        const iType = this.iType;
        let params = { id, AuditStatus, newInfo: {} };
        
        this.tableData.forEach(item => {
          if (item.ExtValue_Check) {
            flag = false;
            return this.$message.warning(`该选手标记有问题，不能被审核通过`)
          }
        })
        params.newInfo.fileData = this.tableData;
        if (flag) {
          this.setAuditPass(params, iType);
        }
      },
      async onSaveEnd() {
        const msg = await this.checkoutAuditStatus();
        if (msg != '') {
          this.$message.warning(msg);
          return;
        }
        let params = { 
          id: this.endForm.OuterID,
          orderID: this.endForm.id,
          iType: this.iType,
          isActive: -1
        };
        return saveEnd(params).then(res => {
          if (res.success) {
            if (params.iType == '160') {
              this.$router.push({ path: `/eco/coachInformationAudit?activeName=end` });
            } else {
              this.$router.push({ path: `/eco/playerAuditInformation?activeName=end` });
            }
          }
        })
      },
      async setAuditPass (params, iType) {
        const msg = await this.checkoutAuditStatus();
        if (msg != '') {
          this.$message.warning(msg);
          return;
        }
        return isAudit(params).then(res => {
          if (res.success) {
            if (iType == '160') {
              this.$router.push({ path: `/eco/coachInformationAudit?activeName=passed` });
            } else {
              this.$router.push({ path: `/eco/playerAuditInformation?activeName=passed` });
            }
          } else {
            this.$message.error(res.data.message || '系统异常，稍后再试！');
          }
        })
      },
      handleUpdateOrder() {
        this.$router.push({ path: `/eco/playerAuditInformation?activeName=end` });
      },
      handleFilePath(row) {
        const params = {
          file: row.sFilePath
        };
        if (params.file) {
          return preview(params).then(res => {
            if (res.success) {
              window.open(res.data)
            }
          })
        }
      },
      handleExtValueDown(row) {
        const params = {
          file: row.ExtValue
        };
        if (params.file) {
          return preview(params).then(res => {
            if (res.success) {
              window.open(res.data)
            }
          })
        }
      },
      handeleModel(row) {
        const params = {
          file: row.sDemoFilePath
        };
        if (params.file) {
          return preview(params).then(res => {
            if (res.success) {
              window.open(res.data)
            }
          })
        }
      }
    }
  }
</script>
<style scoped>
  .transfer-warp {
    margin-top: 50px;
    padding: 18px 20px;
    border-top: 1px solid #EBEEF5;
    box-sizing: border-box;
  }
  .el-upload_tip {
    text-align: right;
    overflow: hidden;
    color: #666;
    font-size: 14px;
    margin-top: 10px;
  }
  .button-warp {
    text-align: center;
    margin-top: 20px;
    margin-bottom: 20px;
  }
  .item-ExtValue_Check {
    margin-left: 20px;
  }
  .checkout-warp .el-textarea {
    width: 80%;
    display: inline-block;
    margin-left: 0;
  }
  
  .el-textarea {
    vertical-align: top;
    display: inline-block;
  }
  .tips-warp {
    text-align: right;
    color: #666;
    font-size: 13px;
    margin-top: 20px;
    margin-bottom: 20px;
  }
  .err_msg {
    font-size: 14px;
    font-weight: bold;
    color: red;
  }
  .ruleForm-ml {
    margin-left: 60px;
  }
</style>

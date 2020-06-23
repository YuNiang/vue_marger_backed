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
      <el-form :model="form" ref="form" :inline="true" label-width="100px">
        <el-form-item label="申请人" v-if="iType">
          <div>{{ruleForm.NameCn}}</div>
        </el-form-item>
        <el-form-item label="目标俱乐部" v-show="iType == '130'">
          <el-select v-model="ruleForm.TeamID" placeholder="请选择" @change="handleChange">
            <el-option v-for="item in clubData" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
        </el-form-item>
        <el-form-item label="目标战队" v-show="ruleForm.TeamID && iType == '130'">
          <el-select v-model="ruleForm.TeamGroup" placeholder="请选择">
            <el-option v-for="item in clubChildData" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
        </el-form-item>
      </el-form>
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column prop="sName" label="文件名称" align="center" />
        <el-table-column prop="isNeed" label="附件是否必须上传" :formatter="isNeedRender" />
        <el-table-column prop="sDesc" label="文件要求" />
        <el-table-column label="下载模板" align="center">
          <template slot-scope="scope">
            <el-upload
              class="upload-demo"
              :limit="1"
              disabled
              :file-list="scope.row.sFilePathList">
              <el-button type="text" size="small" v-show="scope.row.sFilePathList && scope.row.sFilePathList.length" @click="handleFilePathDown(scope.row)">下载模板</el-button>
            </el-upload>
          </template>
        </el-table-column>
        <el-table-column label="下载范例" align="center">
          <template slot-scope="scope">
            <el-upload
              class="upload-demo"
              :limit="1"
              disabled
              :file-list="scope.row.sDemoFilePathList">
              <el-button type="text" size="small" v-show="scope.row.sDemoFilePathList && scope.row.sDemoFilePathList.length" @click="handleDown(scope.row)">下载范例</el-button>
            </el-upload>
          </template>
        </el-table-column>
        <el-table-column label="上传文件" width="180" align="center">
          <template slot-scope="scope">
            <el-upload class="upload-demo"
              :http-request="UploadextValue"
              :limit="1"
              :on-exceed="handleExceed"
              :on-remove="handleRemove"
              :before-upload="onBeforeUpload"
              :before-remove="beforeRemove"
              :accept="ACCEPT"
              :file-list="scope.row.ExtValueList">
              <el-button size="small" @click="curRowIndex=scope.$index" type="primary">点击上传</el-button>
              <el-tooltip effect="light" :content="scope.row.errorInfo" placement="top-start">
                <el-button v-show="scope.row.errorInfo" type="text" class="err_msg">标记错误</el-button>
              </el-tooltip>
            </el-upload>
          </template>
        </el-table-column>
      </el-table>
      <div class="tips-warp">系统能接受的每个文件大小不超过20M,只能上传PDF,JPG,PNG文件三种格式</div>
      <div class="button-warp">
        <el-button type="primary" @click="submitForm('1')">保存并下一步</el-button>
        <el-button @click="onSaveEnd('-1')">终止流程</el-button>
      </div>
    </el-card>
  </div>
</template>
<script>
  import moment from 'moment';
  import { getUrlParam } from '../../../../../utils/index';
  import { ACCEPT_TYPE } from '../../utils/contants';
  import { queryById, queryTempList, saveRescission, fileUpload, saveUp, saveDown, saveTransfer, saveBorrow, preview, queryClubList, queryOrderWithAllData, playerSaveEnd, coachSaveEnd } from './service';
  import { render } from "../../utils/render";
  export default {
    data() {
      return {
        title: '',
        stepTitle: '',
        iType: getUrlParam('iType'), // 上调 120 下放 140 借调 180 转会 130 解约 110
        PlayerID: Number(getUrlParam('id')),
        activeName: getUrlParam('activeName'),
        AuditStatus: getUrlParam('AuditStatus'),
        active: 1,
        tableData: [],
        origData: [],
        clubChildData: [],
        clubData: [],
        curRowIndex: null,
        ACCEPT: ACCEPT_TYPE,
        ruleForm: {},
        flag: true,
      };
    },
    async created() {
      this.getTitle();
      this.getDetailList(); // 用户信息
      this.getDetail();
    },
    methods: {
      handlePreview(row) {
        if (row.url) {
          const params = {
            file: row.url
          };
          return preview(params).then(res => {
            if (res.success) {
              window.open(res.data)
            }
          })
        }
      },
      isNeedRender(row) {
        return row.isNeed === 1 ? '是' : '否';
      },
      getClubList(TeamID) {
        if (this.iType == '130') {
          return queryClubList().then(res => {
            if (res.success) {
              let clubData = [];
              if (res.data && res.data.length) {
                res.data.forEach(item => {
                  if (item.id !== TeamID) {
                    if(item.LPL == 0){
                      clubData.push({
                        label: item.TeamDes,
                        value: item.id,
                      })
                    }
                  }
                })
              }
              this.origData = res.data;
              this.clubData = clubData;
            }
          })
        }
      },
      handleChange(value) {
        let clubChildData = [];
        this.origData.forEach(item => {
          if (value === item.id || value == item.LPL || value == item.LDL) {
            if(item.LPL == 0){
              clubChildData.push({
                label: 'LPL: ' + item.TeamDes,
                value: item.id
              })
            }else{
              clubChildData.push({
                label: 'LDL: ' + item.TeamDes,
                value: item.id
              })
            }
          }
        })
        this.clubChildData = clubChildData;
      },
      getTitle() {
        this.title = render.RenderType(this.iType);
        this.stepTitle = `${this.title}上传文件申请`
      },
      async getDetail() {
        const obj = {
          iType: this.iType,
          page: 1,
          pageSize: 10
        };
        const ret = await queryTempList(obj);
        let tableFiles = ret.success && ret.data && ret.data.rows || [];
        const params = {
          id: this.PlayerID,
          activeName: this.activeName
        };
        if (params.id && !this.AuditStatus) {
          const res = await queryById(params);
          const data = res.success && res.data || {};
          this.ruleForm = res.data;
          this.ruleForm.NameCn = this.activeName == 'player' ? res.data.NameCn : res.data.sName;
          if (res.data) {
            this.ruleForm.OuterID = res.data.id;
          }
          if (this.iType == '130') {
            this.getClubList(res.data.TeamID);
            this.ruleForm.TeamID = '';
            this.ruleForm.TeamGroup = '';
          }
          if (data.fileData && data.fileData.length) {
            tableFiles.length && tableFiles.forEach(file => {
              file.TemplateID = file.id;
              file.sFilePathList = file.sFilePath ? [{name: file.sFilePath.substring(6),url: file.sFilePath}] : [];
              file.sDemoFilePathList = file.sDemoFilePath ? [{name: file.sDemoFilePath.substring(6),url: file.sDemoFilePath}] : [];
              data.fileData.forEach(it => {
                if (file.id == it.TemplateID) {
                  file.ExtValue = it.ExtValue;
                  file.ExtValueList = it.ExtValue ? [{ name: it.ExtValue.substring(6), url: it.ExtValue }] : [];
                }
              })
            })
            this.tableData = tableFiles;
          } else {
            this.tableData = [];
          }
        }
        
        if (this.tableData.length === 0) {
          tableFiles.length && tableFiles.forEach(file => {
            file.TemplateID = file.id;
            file.sFilePathList = file.sFilePath ? [{name: file.sFilePath.substring(6),url: file.sFilePath}] : [];
            file.sDemoFilePathList = file.sDemoFilePath ? [{name: file.sDemoFilePath.substring(6),url: file.sDemoFilePath}] : [];
          })
          this.tableData = tableFiles;
        }
      },
      submitForm() {
        let flag = true;
        const iType = this.iType;
        this.tableData.forEach(item => {
          if (!item.ExtValue && item.isNeed == 1) {
            flag = false;
            return this.$message.warning(`请上传${item.sName}文件`);
          }
        });
        this.ruleForm.iType = this.iType;
        this.ruleForm.newInfo = {
          fileData: this.tableData
        }
        const params = {
          ...this.ruleForm
        };
        if (flag) {
          // 上调 120 下放 140 借调 180 转会 130 选手解约 110 教练解约 160
          let title = '';
          if (iType === '120') {
            this.$confirm(`确定要上调吗?`, '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              this.handleSaveUp(params);
            });
          }
          if (iType === '140') {
            this.$confirm(`确定要放吗?`, '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              this.handleSaveDown(params);
            });
          }
          if (iType === '180') {
            this.$confirm(`确定要借调吗?`, '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              this.handleSaveBorrow(params);
            });
          }
          if (iType === '130') {
            let flag = true;
            if (!params.TeamGroup) {
              flag = false;
              return this.$message.warning('目标战队必填！');
            }
            if (!params.TeamID) {
              flag = false;
              return this.$message.warning('目标俱乐部必填！');
            }
            if (flag) {
              this.$confirm(`确定要转会吗?`, '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
              }).then(() => {
                this.handleSaveTransfer(params);
              });
            }
          }
          if (iType === '110' || iType === '160') {
            this.$confirm(`确定要解约吗?`, '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              this.handleSaveRescission(params);
            });
          }
        }
      },
      async onSaveEnd(type) {
        this.$confirm('提交后不能再修改，确定要终止?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let params = this.ruleForm;
          params.isActive = -1;
          params.iType = this.iType;
          if (this.activeName === 'player') {
            return playerSaveEnd(params).then(ret => {
              if (ret.success) {
                const url = `/club/application?activeName=playerEnd`
                // this.$router.push({ path: url })
                window.location.href = url;
              }
            })
          } else {
            return coachSaveEnd(params).then(ret => {
              if (ret.success) {
                const url = `/club/application?activeName=coachEnd`
                // this.$router.push({ path: url })
                window.location.href = url;
              }
            })
          }
        });
      },
      handleSaveDown(params) {
        return saveDown(params).then(res => {
          if (res.success) {
            this.$router.push({ path: `/club/list?activeName=${this.activeName}`});
          } else {
            this.$message.error(res && res.message ? res.message : '提交失败！');
          }
        })
      },
      handleSaveBorrow(params) {
        return saveBorrow(params).then(res => {
          if (res.success) {
            this.$router.push({ path: `/club/list?activeName=${this.activeName}`});
          } else {
            this.$message.error(res && res.message ? res.message : '提交失败！');
          }
        })
      },
      handleSaveTransfer(params) {
        return saveTransfer(params).then(res => {
          if (res.success) {
            this.$router.push({ path: `/club/list?activeName=${this.activeName}`});
          } else {
            this.$message.error(res && res.message ? res.message : '提交失败！');
          }
        })
      },
      handleSaveRescission(params) {
        return saveRescission(params).then(res => {
          if (res.success) {
            this.$router.push({ path: `/club/list?activeName=${this.activeName}`});
          } else {
            this.$message.error(res && res.message ? res.message : '提交失败！');
          }
        })
      },
      handleSaveUp(params) {
        return saveUp(params).then(res => {
          if (res.success) {
            this.$router.push({ path: `/club/list?activeName=${this.activeName}`});
          } else {
            this.$message.error(res && res.message ? res.message : '提交失败！');
          }
        })
      },
      handleFilePathDown(row) {
        if (row.sFilePath) {
          const params = {
            file: row.sFilePath
          };
          return preview(params).then(res => {
            if (res.success) {
              window.open(res.data)
            }
          })
        }
      },
      async getDetailList() {
        const obj = { iType: this.iType };
        const files = await queryTempList(obj);
        let tableFiles = files.success && files.data && files.data.rows || []
        const params = { id: this.PlayerID, activeName: this.activeName };
        if (params.id && this.AuditStatus == '-1') {
          const res = await queryOrderWithAllData(params);
          if (res.success && res.data &&  res.data.rows) {
            const data = res.data.rows[0] || {};
            let newData = data.newInfo ? data.newInfo : {};
            const errorInfo = data.errorInfo || {};
            this.ruleForm = newData;
            if (data.OuterID) {
              this.ruleForm.OuterID = data.OuterID;
            }
            if (data.id) {
              this.ruleForm.orderID = data.id;
            }
            if (this.iType == '130') {
              this.ruleForm.TeamID = data.TeamID;
              this.getClubList(data.TeamID);
              if (data && data.TeamID) {
                let clubChildData = [];
                this.origData.forEach(item => {
                  if (data.TeamID == item.ID) {
                    if (data.TeamGroup == '1') {
                      clubChildData.push({
                        label: '1队: ' + item['1'],
                        value: '1'
                      })
                    }
                    if (data.TeamGroup == '2') {
                      clubChildData.push({
                        label: '2队: ' + item['2'],
                        value: '2'
                      })
                    }
                  }
                })
                this.clubChildData = clubChildData;
              }
            }
            if (newData.fileData && newData.fileData.length) {
              newData.fileData.forEach(item => {
                tableFiles.length && tableFiles.forEach(file => {
                  file.TemplateID = file.id;
                  file.sFilePathList = file.sFilePath ? [{ name: file.sFilePath.substring(6), url: file.sFilePath }] : [];
                  file.sDemoFilePathList = file.sDemoFilePath ? [{ name: file.sDemoFilePath.substring(6), url: file.sDemoFilePath }] : [];
                  if (item.TemplateID == file.id) {
                    file.ExtValue = item.ExtValue;
                    file.ExtValueList = item.ExtValue ? [{ name: item.ExtValue.substring(6), url: item.ExtValue }] : [];
                    file.errorInfo = item.errorInfo ? item.errorInfo : '';
                  }
                })
              })
              this.tableData = tableFiles;
            } else {
              this.tableData = [];
            }
          }
        }
        if (this.tableData.length === 0) {
          tableFiles.length && tableFiles.forEach(file => {
            file.TemplateID = file.id;
            file.sFilePathList = file.sFilePath ? [{ name: file.sFilePath.substring(6), url: file.sFilePath }] : [];
            file.sDemoFilePathList = file.sDemoFilePath ? [{ name: file.sDemoFilePath.substring(6), url: file.sDemoFilePath }] : [];
          })
          this.tableData = tableFiles;
        }
      },
      handleDown(row) {
        if (row.sDemoFilePath) {
          const params = {
            file: row.sDemoFilePath
          };
          return preview(params).then(res => {
            if (res.success) {
              window.open(res.data)
            }
          })
        }
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
      UploadextValue(params) {
        let formData = new FormData();
        formData.append('file', params.file);
        formData.append('dir','admin');
        formData.append('protect', 1);
        if (formData) {
          return fileUpload(formData).then((res) => {
            if (res.success) {
              this.tableData.forEach((item, idx) => {
                if (Number(this.curRowIndex) === Number(idx)) {
                  item.ExtValue = res.data;
                  item.ExtValueList = [{
                    name: res.data.substring(6), 
                    url: res.data,
                    uid: params.file.uid
                  }];
                }
              })
              const dataSouce = JSON.parse(JSON.stringify(this.tableData));
              this.tableData = dataSouce;
            } else {
              this.tableData.forEach((item, idx) => {
                if (Number(this.curRowIndex) === Number(idx)) {
                  item.ExtValue = '';
                  item.ExtValueList = [];
                }
              })
              const dataSouce = JSON.parse(JSON.stringify(this.tableData));
              this.tableData = dataSouce;
              this.$message.error('系统只接受指定的格式文档!')
            }
          })
        }
      },
      handleExceed(files, fileList) {
        this.$message.warning(`当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
      },
      handleRemove(file, fileList) {
        if (file.status === 'success') {
          this.tableData.forEach((item, idx) => {
            if (item.ExtValueList && item.ExtValueList.length) {
              item.ExtValueList.forEach(items => {
                if (items.uid == file.uid) {
                  item.ExtValueList = [];
                  item.ExtValue = '';
                }
              })
            }
          })
          let dataSouce = JSON.parse(JSON.stringify(this.tableData));
          this.tableData = dataSouce;
        }
      },
    }
  }
</script>
<style scoped>
  .err_msg {
    font-size: 14px;
    font-weight: bold;
    color: red;
  }
  .el-upload_tip {
    text-align: right;
    overflow: hidden;
    color: #666;
    font-size: 14px;
    margin-top: 10px;
  }
  .transfer-warp {
    margin-top: 50px;
    padding: 18px 20px;
    border-top: 1px solid #EBEEF5;
    box-sizing: border-box;
  }
  .button-warp {
    text-align: center;
    margin-top: 20px;
    margin-bottom: 20px;
  }
  .tips-warp {
    text-align: right;
    color: #666;
    font-size: 14px;
    margin-top: 20px;
    margin-bottom: 20px;
  }
</style>



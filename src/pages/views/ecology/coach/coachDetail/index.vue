<template lang="html">
  <el-card>
    <div slot="header">{{iType ? `检查教练基础信息` : `教练基础信息详情`}}</div>
      <el-form :model="ruleForm" ref="ruleForm" label-width="260px" class="rule-Form">
        <el-form-item label="俱乐部：" prop="TeamID">{{TeamDes || '-'}}</el-form-item>
        <el-form-item label="姓名(中文)：" prop="NameCn">{{ruleForm.sName || '-'}}</el-form-item>
        <el-form-item label="姓名(英文)：" prop="NameEn">{{ruleForm.NameEn || '-'}}</el-form-item>
        <el-form-item label="手机：" prop="NameEn">{{ruleForm.Phone || '-'}}</el-form-item>
        <el-form-item label="生日：" prop="Birthday">{{ruleForm.Birthday || '-'}}</el-form-item>
        <el-form-item label="国家地区：" prop="Country">{{ruleForm.Country || '-'}}</el-form-item>
        <el-form-item label="合同开始时间：" prop="ContractStartedAt">{{ruleForm.ContractStartedAt || '-'}}</el-form-item>
        <el-form-item label="合同结束时间：" prop="ContractEndedAt">{{ruleForm.ContractEndedAt || '-'}}</el-form-item>
        <div slot="header">证件信息</div>
        <el-form-item label="身份证号码/来往大陆通行证号码：" prop="IDNumber">{{ruleForm.IDNumber || '-'}}</el-form-item>
        <el-form-item label="护照号码：" prop="Passport">{{ruleForm.Passport || '-'}}</el-form-item>
        <el-form-item v-show="ruleForm.Country !== '中国'" label="签证到期日(外籍选手填写)：" prop="VisaExpiredAt">{{ruleForm.VisaExpiredAt || '-'}}</el-form-item>
        <div slot="header">比赛账号与设备信息</div>
        <el-form-item label="峡谷之巅账号：" prop="AcctXiagu">{{ruleForm.AcctXiagu || '-'}}</el-form-item>
        <el-form-item label="比赛服账号：" prop="AcctMatch">{{ruleForm.AcctMatch || '-'}}</el-form-item>
        <div slot="header">衣服尺寸</div>
        <el-form-item label="裤子尺寸：" prop="TrousersSize">{{ruleForm.TrousersSize || '-'}}</el-form-item>
        <el-form-item label="外套尺寸：" prop="CoatSize">{{ruleForm.CoatSize || '-'}}</el-form-item>
        <el-form-item label="T恤尺寸：" prop="TshirtSize">{{ruleForm.TshirtSize || '-'}}</el-form-item>
        <el-form-item label="鞋码：" prop="ShoesSize">{{ruleForm.ShoesSize || '-'}}</el-form-item>
        <el-form-item label="体重(公斤)：" prop="Weight">{{ruleForm.Weight || '-'}}</el-form-item>
        <el-form-item label="定装照：" prop="Weight">{{ruleForm.AppearancePhoto || '-'}}</el-form-item>
      </el-form>
    <div>
      <div class="el-card__header mb">
        <div slot="header">附件详情</div>
      </div>
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column prop="sName" label="文件名称" align="center" />
        <el-table-column prop="downloadTmp" label="下载模板" align="center">
          <template slot-scope="scope">
            <el-upload class="upload-demo" disabled :file-list="scope.row.sFilePathList">
              <el-button size="small" v-show="scope.row.sFilePathList && scope.row.sFilePathList.length" @click="handleFilePathDown(scope.row)" type="text">下载模板</el-button>
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
        <el-table-column prop="sFilePath" label="上传文件" align="center">
          <template slot-scope="scope">
            <el-upload disabled :file-list="scope.row.ExtValueList">
              <el-button style="text-align: center; margin-top: 20px;" v-show="scope.row.ExtValueList && scope.row.ExtValueList.length" type="text" @click="handleDown(scope.row)">下载附件</el-button>
            </el-upload>
          </template>
        </el-table-column>
      </el-table>
      <div style="text-align: center; margin-top: 20px;" v-show="iType">
        <el-button @click="onPrev">上一步</el-button>
        <el-button @click="submitFile(0)">保存到草稿</el-button>
        <el-button type="primary" @click="submitFile(1)">提交审核</el-button>
        <el-button @click="onSaveEnd(-1)">终止申请</el-button>
      </div>
      <div style="text-align: center; margin-top: 20px;" v-show="!iType">
        <el-button @click="$router.go(-1)" size="mini">返回</el-button>
      </div>
    </div>
  </el-card>
</template>

<script>
  import {preview, modify, save, saveEnd } from './service';
  import {api} from "../../utils/api";
  import { getUrlParam } from '../../../../../utils/index';
  import { render } from '../../utils/render';
  export default {
    data() {
      return {
        id: Number(getUrlParam('id')),
        orderID: Number(getUrlParam('orderID')),
        AuditStatus: Number(getUrlParam('AuditStatus')),
        iType: getUrlParam('iType'),
        TeamDes: '',
        tableData: [],
        ruleForm: {},
        origData: {},
        teamList: [],
      };
    },
    created: function () {
      render.initTeams();
      this.getAllDetail();
    },
    methods: {
      handleFilePathDown(row) {
        const params = {
          file: row.sFilePath
        };
        return preview(params).then(res => {
          if (res.success) {
            window.open(res.data)
          }
        })
      },
      onPrev() {
        this.$router.push({ path: `/coach/add?orderID=${this.orderID}&OuterID=${this.id}&iType=${this.iType}` });
      },
      submitFile(type) {
        const data = this.origData;
        if (data.teamInfo) {
          delete data.teamInfo;
        }
        if (data.newInfo) {
          delete data.newInfo;
        }
        if (data.oldInfo) {
          delete data.oldInfo;
        }
        let params = {
          ...data
        };
        params.isActive = type;
        params.AuditStatus = 0;
        params.orderID = this.orderID;
        if (this.iType == '200') {
          this.$confirm('提交后不能再修改，确定要修改提交进入审核?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            modify(params).then(res => {
              if (res.success) {
                this.$router.push({ path: `/club/application?activeName=coaching` });
              } else {
                this.$message.error(res && res.message || '系统异常， 稍后再试！');
              }
            });
          });
        } else {
          if (type === 1) {
            this.$confirm('提交后不能再修改，确定要提交进入审核?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              this.handleSave(params);
            });
          } else {
            this.handleSave(params);
          }
        }
      },
      onSaveEnd(type) {
        const data = this.origData;
        if (data.teamInfo) {
          delete data.teamInfo;
        }
        if (data.newInfo) {
          delete data.newInfo;
        }
        if (data.oldInfo) {
          delete data.oldInfo;
        }
        let params = {
          ...data
        };
        params.isActive = -1;
        params.orderID = this.orderID;
        this.$confirm('提交后不能再修改，确定要终止?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          return saveEnd(params).then(res => {
            if (res.success) {
              this.$router.push({ path: `/club/application?activeName=coachEnd` });
            }
          })
        });
      },
      handleSave(params) {
        return save(params).then(res => {
          if (res.success) {
            this.$router.push({ path: `/club/application?activeName=coaching` });
          } else {
            this.$message.error(res && res.message || '系统异常， 稍后再试！');
          }
        })
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
      },
      handleDown(row) {
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
      getTempList(resolve, reject) {
        const params = {
          iType: this.iType,
          pageSize: 500
        };
        return api.queryFileTemplate(params).then(res => {
          if (res.success) {
            if (res && res.data && res.data.rows) {
              resolve(res.data.rows);
            }
          } else {
            resolve(res)
          }
        })
      },

      getDetail(resolve, reject) {
        if (this.orderID) {
          const params = { id: this.orderID, activeName: getUrlParam('activeName') };
          if (params.id) {
            api.queryDetail(params).then(res => {
              if (res.success) {
                if (res.data && res.data.rows && res.data.rows.length) {
                  let data = res.data.rows[0];
                  let newData = data.newInfo ? data.newInfo : {};
                  resolve(newData);
                } else {
                  reject(res);
                }
              }
            });
          }
        } else {
          const params = { id: this.id, activeName: getUrlParam('activeName') }
          if (params.id) {
            api.queryById(params).then(res => {
              if (res.success) {
                if (res.data) {
                  resolve(res.data);
                } else {
                  reject(res);
                }
              }
            })
          }
        }
      },

      getAllDetail () {
        let getFileList = new Promise((resolve, reject) => { this.getTempList(resolve, reject) });
        let getDetailList = new Promise((resolve, reject) => { this.getDetail(resolve, reject) });
        Promise.all([getFileList, getDetailList]).then((results) => {
          let fileData = results[0];
          let detailData = results[1];
          this.ruleForm = JSON.parse(JSON.stringify(detailData));
          this.ruleForm.ShoesSize = render.ShoesSizeRender(detailData.ShoesSize);
          this.ruleForm.Country = render.CountryRender(detailData.Country);
          this.TeamDes = render.TeamNameRender(detailData.iTeamId);
          this.ruleForm.Birthday = render.FullDate(detailData.Birthday);
          this.ruleForm.ContractEndedAt = render.FullDate(detailData.ContractEndedAt);
          this.ruleForm.ContractStartedAt = render.FullDate(detailData.ContractStartedAt);

          detailData.fileData && 
          detailData.fileData.length &&
          detailData.fileData.forEach(item => {
            fileData.forEach(file => {
              if (item.TemplateID == file.id) {
                item.sName = file.sName;
                item.sDemoFilePath = file.sDemoFilePath;
                item.sFilePath = file.sFilePath;
                item.ExtValue = item.ExtValue;
                if (file.sFilePath) {
                  let str = file.sFilePath;
                  item.sFilePathList = [{ name: str.substring(6), url: file.sFilePath }];
                }
                if (file.sDemoFilePath) {
                  let str = item.sDemoFilePath;
                  item.sDemoFilePathList = [{ name: str.substring(6), url: file.sDemoFilePath }];
                }
                if (item.ExtValue) {
                  let str = item.ExtValue;
                  item.ExtValueList = [{ name: str.substring(6), url: item.ExtValue }];
                }
              }
            })
          })
          this.tableData = detailData.fileData || [];
          this.origData = JSON.parse(JSON.stringify(detailData));
        }).catch((err) => {
          this.$message.error(err.data && err.data.message || '系统错误，请重试')
        })
      }
    }
  }
</script>
<style scoped>
  .rule-Form .el-input {
    width: 60%;
  }

  .mb {
    margin-bottom: 20px;
  }
</style>

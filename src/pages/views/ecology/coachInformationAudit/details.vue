<template lang="html">
  <el-card>
    <div slot="header">{{RoleTile}}基础信息详情</div>
    <el-form :model="ruleForm" ref="ruleForm" label-width="260px" class="rule-Form">
      <!-- <el-form-item label="俱乐部：" prop="TeamID">
        <span class="ruleForm-item">{{TeamDes || '-'}}</span>
        <el-checkbox class="ml40" disabled v-show="ruleForm.TeamID_check" v-model="ruleForm.TeamID_check">标记问题</el-checkbox>
        <el-input disabled v-show="ruleForm.TeamID_msg" v-model="ruleForm.TeamID_msg" type="textarea" :maxlength=100 :rows="2" placeholder="请输入标记问题内容，限字100" />
      </el-form-item> -->
      
      <el-form-item v-show="Role=== 'coach'" label="姓名(中文)：" prop="sName">
        <span class="ruleForm-item">{{ruleForm.sName || '-'}}</span>
        <el-checkbox class="ml40" disabled v-show="ruleForm.sName_check" v-model="ruleForm.sName_check">标记问题</el-checkbox>
        <el-input disabled v-show="ruleForm.sName_msg" v-model="ruleForm.sName_msg" type="textarea" :maxlength=100 :rows="2" placeholder="请输入标记问题内容，限字100" />
      </el-form-item>
      <el-form-item v-show="Role=== 'player'" label="姓名(中文)：" prop="NameCn">
        <span class="ruleForm-item">{{ruleForm.NameCn || '-'}}</span>
        <el-checkbox class="ml40" disabled v-show="ruleForm.NameCn_check" v-model="ruleForm.NameCn_check">标记问题</el-checkbox>
        <el-input disabled v-show="ruleForm.NameCn_msg" v-model="ruleForm.NameCn_msg" type="textarea" :maxlength=100 :rows="2" placeholder="请输入标记问题内容，限字100" />
      </el-form-item>
      <el-form-item label="姓名(英文)：" prop="NameEn">
        <span class="ruleForm-item">{{ruleForm.NameEn || '-'}}</span>
        <el-checkbox disabled class="ml40" v-show="ruleForm.NameEn_check" v-model="ruleForm.NameEn_check">标记问题</el-checkbox>
        <el-input disabled v-model="ruleForm.NameEn_msg" v-show="ruleForm.NameEn_msg" type="textarea" :maxlength=100 :rows="2" placeholder="请输入标记问题内容，限字100" />
      </el-form-item>
      <el-form-item label="手机：" prop="NameEn">
        <span class="ruleForm-item">{{ruleForm.Phone || '-'}}</span>
        <el-checkbox disabled v-show="ruleForm.Phone_check" class="ml40" v-model="ruleForm.Phone_check">标记问题</el-checkbox>
        <el-input disabled v-model="ruleForm.Phone_msg" v-show="ruleForm.Phone_msg" type="textarea" :maxlength=100 :rows="2" placeholder="请输入标记问题内容，限字100" />
      </el-form-item>
      <el-form-item label="游戏ID：" prop="GameName">
        <span class="ruleForm-item">{{ruleForm.GameName || '-'}}</span>
        <el-checkbox disabled v-show="ruleForm.GameName_check" class="ml40" v-model="ruleForm.GameName_check">标记问题</el-checkbox>
        <el-input disabled v-show="ruleForm.GameName_msg" v-model="ruleForm.GameName_msg" type="textarea" :maxlength=100 :rows="2" placeholder="请输入标记问题内容，限字100" />
      </el-form-item>
      <el-form-item v-if="Role === 'player'" label="游戏位置：" prop="PlayerPos">
        <span class="ruleForm-item">{{ruleForm.PlayerPos || '-'}}</span>
        <el-checkbox disabled v-show="ruleForm.PlayerPos_check" class="ml40" v-model="ruleForm.PlayerPos_check">标记问题</el-checkbox>
        <el-input disabled v-show="ruleForm.PlayerPos_msg" v-model="ruleForm.PlayerPos_msg" type="textarea" :maxlength=100 :rows="2" placeholder="请输入标记问题内容，限字100" />
      </el-form-item>
      <el-form-item label="生日：" prop="Birthday">
        <span class="ruleForm-item">{{ruleForm.Birthday || '-'}}</span>
        <el-checkbox disabled v-show="ruleForm.Birthday_check" class="ml40" v-model="ruleForm.Birthday_check">标记问题</el-checkbox>
        <el-input disabled v-show="ruleForm.Birthday_msg" v-model="ruleForm.Birthday_msg" type="textarea" :maxlength=100 :rows="2" placeholder="请输入标记问题内容，限字100" />
      </el-form-item>
      <el-form-item label="国家地区：" prop="Country">
        <span class="ruleForm-item">{{ruleForm.Country || '-'}}</span>
        <el-checkbox disabled v-show="ruleForm.Country_check" class="ml40" v-model="ruleForm.Country_check">标记问题</el-checkbox>
        <el-input disabled v-show="ruleForm.Country_msg" v-model="ruleForm.Country_msg" type="textarea" :maxlength=100 :rows="2" placeholder="请输入标记问题内容，限字100" />
      </el-form-item>
      <el-form-item label="合同开始时间：" prop="ContractStartedAt">
        <span class="ruleForm-item">{{ruleForm.ContractStartedAt || '-'}}</span>
        <el-checkbox disabled v-show="ruleForm.ContractStartedAt_check" class="ml40" v-model="ruleForm.ContractStartedAt_check">标记问题</el-checkbox>
        <el-input disabled v-show="ruleForm.ContractStartedAt_msg" v-model="ruleForm.ContractStartedAt_msg" type="textarea" :rows="2" :maxlength=100 placeholder="请输入标记问题内容，限字100" />
      </el-form-item>
      <el-form-item label="合同结束时间：" prop="ContractEndedAt">
        <span class="ruleForm-item">{{ruleForm.ContractEndedAt || '-'}}</span>
        <el-checkbox disabled v-show="ruleForm.ContractEndedAt_check" class="ml40" v-model="ruleForm.ContractEndedAt_check">标记问题</el-checkbox>
        <el-input disabled v-show="ruleForm.ContractEndedAt_msg" v-model="ruleForm.ContractEndedAt_msg" type="textarea" :rows="2" :maxlength=100 placeholder="请输入标记问题内容，限字100" />
      </el-form-item>
      <div slot="header">证件信息</div>
      <el-form-item label="身份证号码/来往大陆通行证号码：" prop="IDNumber">
        <span class="ruleForm-item">{{ruleForm.IDNumber || '-'}}</span>
        <el-checkbox disabled v-show="ruleForm.IDNumber_check" class="ml40" v-model="ruleForm.IDNumber_check">标记问题</el-checkbox>
        <el-input disabled v-show="ruleForm.IDNumber_msg" v-model="ruleForm.IDNumber_msg" type="textarea" :rows="2" :maxlength=100 placeholder="请输入标记问题内容，限字100" />
      </el-form-item>
      <el-form-item label="护照号码：" prop="Passport">
        <span class="ruleForm-item">{{ruleForm.Passport || '-'}}</span>
        <el-checkbox disabled v-show="ruleForm.Passport_check" class="ml40" v-model="ruleForm.Passport_check">标记问题</el-checkbox>
        <el-input disabled v-show="ruleForm.Passport_msg" v-model="ruleForm.Passport_msg" type="textarea" :rows="2" :maxlength=100 placeholder="请输入标记问题内容，限字100" />
      </el-form-item>
      <el-form-item label="签证到期日(外籍选手填写)：" prop="VisaExpiredAt">
        <span class="ruleForm-item">{{ruleForm.VisaExpiredAt || '-'}}</span>
        <el-checkbox disabled v-show="ruleForm.VisaExpiredAt_check" class="ml40" v-model="ruleForm.VisaExpiredAt_check">标记问题</el-checkbox>
        <el-input disabled v-show="ruleForm.VisaExpiredAt_msg" v-model="ruleForm.VisaExpiredAt_msg" type="textarea" :rows="2" :maxlength=100 placeholder="请输入标记问题内容，限字100" />
      </el-form-item>
      <div slot="header">比赛账号与设备信息</div>
      <el-form-item label="峡谷之巅账号：" prop="AcctXiagu">
        <span class="ruleForm-item">{{ruleForm.AcctXiagu || '-'}}</span>
        <el-checkbox disabled v-show="ruleForm.AcctXiagu_check" class="ml40" v-model="ruleForm.AcctXiagu_check">标记问题</el-checkbox>
        <el-input disabled v-show="ruleForm.AcctXiagu_msg" v-model="ruleForm.AcctXiagu_msg" type="textarea" :rows="2" :maxlength=100 placeholder="请输入标记问题内容，限字100" />
      </el-form-item>
      <el-form-item v-if="Role === 'player'" label="比赛服账号：" prop="AcctMatch">
        <span class="ruleForm-item">{{ruleForm.AcctMatch || '-'}}</span>
        <el-checkbox disabled v-show="ruleForm.AcctMatch_check" class="ml40" v-model="ruleForm.AcctMatch_check">标记问题</el-checkbox>
        <el-input disabled v-show="ruleForm.AcctMatch_msg" v-model="ruleForm.AcctMatch_msg" type="textarea" :rows="2" :maxlength=100 placeholder="请输入标记问题内容，限字100" />
      </el-form-item>
      <el-form-item v-if="Role === 'player'" label="键盘型号：" prop="KbType">
        <span class="ruleForm-item">{{ruleForm.KbType || '-'}}</span>
        <el-checkbox disabled v-show="ruleForm.KbType_check" class="ml40" v-model="ruleForm.KbType_check">标记问题</el-checkbox>
        <el-input disabled v-show="ruleForm.KbType_msg" v-model="ruleForm.KbType_msg" type="textarea" :rows="2" :maxlength=100 placeholder="请输入标记问题内容，限字100" />
      </el-form-item>
      <el-form-item v-if="Role === 'player'" label="键盘是否需要驱动：" prop="KbDriver">
        <span class="ruleForm-item">{{ruleForm.KbDriver === 1 ? '是' : '否'}}</span>
        <el-checkbox class="ml40" disabled v-show="ruleForm.KbDriver_check" v-model="ruleForm.KbDriver_check">标记问题</el-checkbox>
        <el-input disabled v-show="ruleForm.KbDriver_msg" v-model="ruleForm.KbDriver_msg" type="textarea" :rows="2" :maxlength=100 placeholder="请输入标记问题内容，限字100" />
      </el-form-item>
      <el-form-item v-if="Role === 'player'" label="鼠标型号：" prop="MouseType">
        <span class="ruleForm-item">{{ruleForm.MouseType || '-'}}</span>
        <el-checkbox v-show="ruleForm.MouseType_check" class="ml40" v-model="ruleForm.MouseType_check">标记问题</el-checkbox>
        <el-input v-show="ruleForm.MouseType_msg" v-model="ruleForm.MouseType_msg" type="textarea" :rows="2" :maxlength=100 placeholder="请输入标记问题内容，限字100" />
      </el-form-item>
      <el-form-item v-if="Role === 'player'" label="鼠标是否需要驱动：" prop="IsMouseDriven">
        <span class="ruleForm-item">{{ruleForm.IsMouseDriven === 1 ? '是' : '否'}}</span>
        <el-checkbox class="ml40" disabled v-show="ruleForm.IsMouseDriven_check" v-model="ruleForm.IsMouseDriven_check">标记问题</el-checkbox>
        <el-input disabled v-show="ruleForm.IsMouseDriven_msg" v-model="ruleForm.IsMouseDriven_msg" type="textarea" :rows="2" :maxlength=100 placeholder="请输入标记问题内容，限字100" />
      </el-form-item>
      <div slot="header">衣服尺寸</div>
      <el-form-item label="裤子尺寸：" prop="TrousersSize">
        <span class="ruleForm-item">{{ruleForm.TrousersSize || '-'}}</span>
        <el-checkbox class="ml40" disabled v-show="ruleForm.TrousersSize_check" v-model="ruleForm.TrousersSize_check">标记问题</el-checkbox>
        <el-input v-model="ruleForm.IsMouseDriven_check" disabled v-show="ruleForm.IsMouseDriven_check" type="textarea" :rows="2" :maxlength=100 placeholder="请输入标记问题内容，限字100" />
      </el-form-item>
      <el-form-item label="外套尺寸：" prop="CoatSize">
        <span class="ruleForm-item">{{ruleForm.CoatSize || '-'}}</span>
        <el-checkbox class="ml40" disabled v-show="ruleForm.CoatSize_check" v-model="ruleForm.CoatSize_check">标记问题</el-checkbox>
        <el-input v-model="ruleForm.CoatSize_msg" disabled v-show="ruleForm.CoatSize_msg" type="textarea" :rows="2" :maxlength=100 placeholder="请输入标记问题内容，限字100" />
      </el-form-item>
      <el-form-item label="T恤尺寸：" prop="TshirtSize">
        <span class="ruleForm-item">{{ruleForm.TshirtSize || '-'}}</span>
        <el-checkbox class="ml40" v-model="ruleForm.TshirtSize_check" disabled v-show="ruleForm.TshirtSize_check">标记问题</el-checkbox>
        <el-input v-model="ruleForm.TshirtSize_msg" disabled v-show="ruleForm.TshirtSize_msg" type="textarea" :rows="2" :maxlength=100 placeholder="请输入标记问题内容，限字100" />
      </el-form-item>
      <el-form-item label="鞋码：" prop="ShoesSize">
        <span class="ruleForm-item">{{ruleForm.ShoesSize || '-'}}</span>
        <el-checkbox class="ml40" v-model="ruleForm.ShoesSize_check" disabled v-show="ruleForm.ShoesSize_check">标记问题</el-checkbox>
        <el-input v-model="ruleForm.ShoesSize_msg" type="textarea" disabled v-show="ruleForm.ShoesSize_msg" :rows="2" :maxlength=100 placeholder="请输入标记问题内容，限字100" />
      </el-form-item>
      <el-form-item label="体重(公斤)：" prop="Weight">
        <span class="ruleForm-item">{{ruleForm.Weight || '-'}}</span>
        <el-checkbox class="ml40" disabled v-show="ruleForm.Weight_check" v-model="ruleForm.Weight_check">标记问题</el-checkbox>
        <el-input v-model="ruleForm.Weight_msg" disabled v-show="ruleForm.Weight_msg" type="textarea" :rows="2" :maxlength=100 placeholder="请输入标记问题内容，限字100" />
      </el-form-item>



      <div v-if="Role === 'player'" slot="header">其他</div>
      <el-form-item v-if="Role === 'player'" label="选手身份：" prop="PlayerRole">
        <span class="ruleForm-item">{{ruleForm.PlayerRole || '-'}}</span>
        <el-checkbox class="ml40" disabled v-show="ruleForm.PlayerRole_check" v-model="ruleForm.PlayerRole_check">标记问题</el-checkbox>
        <el-input v-model="ruleForm.PlayerRole_msg" disabled v-show="ruleForm.PlayerRole_msg" type="textarea" :rows="2" :maxlength=100 placeholder="请输入标记问题内容，限字100" />
      </el-form-item>
    </el-form>
    <div>
      <div class="el-card__header mb">
        <div slot="header">附件详情</div>
      </div>
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column prop="sName" label="文件名称" align="center" />
        <el-table-column prop="id" label="下载模板" align="center">
          <template slot-scope="scope">
            <el-upload
              disabled
              :file-list="scope.row.modeList" />
            <el-button type="text" v-show="scope.row.modeList && scope.row.modeList.length" @click="handeleModel(scope.row)">预览模板</el-button>
          </template>
        </el-table-column>
        <el-table-column prop="sFilePath" label="上传文件" align="center">
          <template slot-scope="scope">
            <el-upload
              disabled
              :file-list="scope.row.fileList" />
            <el-button style="margin-right: 20px" type="text" v-show="scope.row.fileList && scope.row.fileList.length" @click="handleDown(scope.row)">下载附件</el-button>
            <el-checkbox v-if="scope.row.sFilePath_Check" v-model="scope.row.sFilePath_Check" disabled />
            <el-input v-if="scope.row.errorInfo" v-model="scope.row.errorInfo" type="textarea" :rows="2" disabled />
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="mt">
      <el-button @click="$router.go(-1)">返回</el-button>
    </div>
  </el-card>
</template>

<script>
  import moment from 'moment';
  import { queryList, preview, queryTempList } from './service';
  import { getUrlParam } from '../../../../utils/index';
  import { render } from '../utils/render';
  export default {
    data() {
      return {
        formLabelWidth: '100px',
        checkoutForm: {},
        TeamDes: '',
        iType: getUrlParam('iType') || '100',
        Role: getUrlParam('Role'),
        id: Number(getUrlParam('id')),
        RoleTile: getUrlParam('Role') === 'player' ? '选手' : '教练',
        tableData: [],
        orginData: [],
        ruleForm: {},
        rules: {}
      };
    },
    created: function () {
      render.initTeams();
      this.getTempList();
      this.getDetail();
    },
    methods: {
      getTempList() {
        const params = {
          iType: this.iType,
          pageSize: 500
        };
        if (params.iType) {
          return queryTempList(params).then(res => {
            if (res.success) {
              this.tableFiles =  res.data.rows;
            }
          })
        }
      },
      handleCheckouted() {
        this.auditDialogVisible = true;
      },
      handleFilePath_msg(value) {
        this.checkoutForm.sFilePath_msg = value;
      },
      handleFilePath_Check(value) {
        this.checkoutForm.sFilePath_Check = value;
      },
      handeleModel(row) {
        const params = {
          file: row.sDemoFilePath
        };
        return preview(params).then(res => {
          if (res.success) {
            window.open(res.data)
          }
        })
      },
      handleDown(row) {
        if (row.ExtValue) {
          const params = {
            file: row.ExtValue
          };
          return preview(params).then(res => {
            if (res.success) {
              window.open(res.data)
            }
          })
        }
      },
      getDetail () {
        const params = {
          id: this.id,
          activeName: this.Role
        };
        if (params.id) {
          return queryList(params).then(res => {
            if (res.success) {
              const data = res && res.data &&  res.data.rows && res.data.rows[0] || {};
              const s = data.oldInfo || {};
              const errObj = data.errorInfo || {}
              this.ruleForm = s;
              this.ruleForm.NameCn = this.Role === 'coach' ? s.sName : s.NameCn;
              this.ruleForm.Birthday = s.Birthday ? moment(s.Birthday).format('YYYY-DD-MM') : '';
              this.ruleForm.ContractStartedAt = s.ContractStartedAt ? moment(s.ContractStartedAt).format('YYYY-DD-MM') : '';
              this.ruleForm.ContractEndedAt = s.ContractEndedAt ? moment(s.ContractEndedAt).format('YYYY-DD-MM') : '';
              this.ruleForm.VisaExpiredAt = s.VisaExpiredAt ? moment(s.VisaExpiredAt).format('YYYY-DD-MM') : '';
              Object.entries(s).forEach(([key, value]) => {
                Object.entries(errObj).forEach(([errKey, errVal]) => {
                  if (key === errKey) {
                    this.ruleForm[`${errKey}_check`] = true;
                    this.ruleForm[`${errKey}_msg`] = errVal;
                  }
                })
              });
              this.ruleForm.ShoesSize = render.ShoesSizeRender(s.ShoesSize);
              if (this.Role === 'coach') {
                this.TeamDes= render.TeamNameRender(s.iTeamId);
              } else {
                this.ruleForm.PlayerRole = render.PlayerRoleRender(s.PlayerRole);
                this.ruleForm.PlayerPos = render.PlayerPosRender(s.PlayerPos);
                this.TeamDes = render.TeamNameRender(s.TeamID);
              }
              this.ruleForm.Country = render.CountryRender(s.Country);
              s.fileData && s.fileData.length && s.fileData.forEach(item => {
                item.fileList = [
                  {
                    name: item.sName,
                    url: item.ExtValue
                  }
                ];
                if (item.errorInfo) {
                  item.sFilePath_Check = true;
                }
              })
              if (this.tableFiles && this.tableFiles.length) {
                s.fileData && s.fileData.length && s.fileData.forEach(it => {
                  this.tableFiles.forEach(file => {
                    it.sName = file.sName;
                    it.sDemoFilePath = file.sDemoFilePath;
                    it.modeList = [
                      {
                        name: file.sDesc,
                        url: file.sDemoFilePath
                      }
                    ]
                  })
                })
              }
              this.tableData = s.fileData;
            }
          });
        } else {
          this.$message.error('ID 不能为空！')
        }
      },
    }
  }
</script>
<style scoped>
  .checkout-warp .el-textarea {
    width: 80%;
    display: inline-block;
    margin-left: 0;
  }
  
  .el-textarea {
    vertical-align: top;
    width: 230px;
    display: inline-block;
    margin-left: 40px;
  }
  .ruleForm-item {
    width: 196px;
    display: inline-block;
  }
  .ml40 {
    margin-left: 20px;
    width: 120px;
  }
  .el-upload .el-upload--text {
    display: none;
  }
  .rule-Form .el-input {
    width: 60%;
  }
 .rule-Form .el-textarea {
   width: 30%;
 }

  .mb {
    margin-bottom: 20px;
  }
  .mt {
    margin-top: 20px;
    text-align: center;
  }
</style>

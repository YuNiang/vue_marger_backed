<template lang="html">
  <el-card>
    <div slot="header">选手基础信息详情</div>
    <el-form :model="ruleForm" ref="ruleForm" label-width="260px" class="rule-Form">
      <el-form-item label="俱乐部：" prop="TeamID">
        <span :class="[ruleForm.TeamID_check || (ruleForm.TeamDes != oldInfo.TeamDes) ? 'ruleForm-item err_msg' : 'ruleForm-item']">{{TeamDes || '-'}}</span>
        <el-checkbox @input="change($event)" class="ml40" :checked="ruleForm.TeamID_check" v-model="ruleForm.TeamID_check">标记问题</el-checkbox>
        <el-input @input="change($event)" v-model="ruleForm.TeamID_msg" type="textarea" :maxlength=100 :rows="2" placeholder="请输入标记问题内容，限字100" />
      </el-form-item>
      <el-form-item label="选手身份：" prop="PlayerRole">
        <span :class="[ruleForm.PlayerRole_check || (ruleForm.PlayerRole != oldInfo.PlayerRole) ? 'ruleForm-item err_msg' : 'ruleForm-item']">{{ruleForm.PlayerRole || '-'}}</span>
        <el-checkbox @input="change($event)" class="ml40" :checked="ruleForm.PlayerRole_check"  v-model="ruleForm.PlayerRole_check">标记问题</el-checkbox>
        <el-input @input="change($event)" v-model="ruleForm.PlayerRole_msg" type="textarea" :rows="2" :maxlength=100 placeholder="请输入标记问题内容，限字100" />
      </el-form-item>
      <el-form-item label="姓名(中文)：" prop="NameCn">
        <span :class="[ruleForm.NameCn_check || (ruleForm.NameCn != oldInfo.NameCn) ? 'ruleForm-item err_msg' : 'ruleForm-item']">{{ruleForm.NameCn || '-'}}</span>
        <el-checkbox @input="change($event)" class="ml40" :checked="ruleForm.NameCn_check" v-model="ruleForm.NameCn_check">标记问题</el-checkbox>
        <el-input @input="change($event)" v-model="ruleForm.NameCn_msg" type="textarea" :maxlength=100 :rows="2" placeholder="请输入标记问题内容，限字100" />
      </el-form-item>
      <el-form-item label="姓名(英文)：" prop="NameEn">
        <span :class="[ruleForm.NameEn_check || (ruleForm.NameEn != oldInfo.NameEn) ? 'ruleForm-item err_msg' : 'ruleForm-item']">{{ruleForm.NameEn || '-'}}</span>
        <el-checkbox @input="change($event)" class="ml40" :checked="ruleForm.NameEn_check" v-model="ruleForm.NameEn_check">标记问题</el-checkbox>
        <el-input @input="change($event)" v-model="ruleForm.NameEn_msg" type="textarea" :maxlength=100 :rows="2" placeholder="请输入标记问题内容，限字100" />
      </el-form-item>
      <el-form-item label="手机：" prop="NameEn">
        <span :class="[ruleForm.Phone_check || (ruleForm.Phone != oldInfo.Phone) ? 'ruleForm-item err_msg' : 'ruleForm-item']">{{ruleForm.Phone || '-'}}</span>
        <el-checkbox @input="change($event)" class="ml40" :checked="ruleForm.Phone_check" v-model="ruleForm.Phone_check">标记问题</el-checkbox>
        <el-input @input="change($event)" v-model="ruleForm.Phone_msg" type="textarea" :maxlength=100 :rows="2" placeholder="请输入标记问题内容，限字100" />
      </el-form-item>
      <el-form-item label="游戏ID：" prop="GameName">
        <span :class="[ruleForm.GameName_check || (ruleForm.GameName != oldInfo.GameName) ? 'ruleForm-item err_msg' : 'ruleForm-item']">{{ruleForm.GameName || '-'}}</span>
        <el-checkbox @input="change($event)" class="ml40" :checked="ruleForm.GameName_check" v-model="ruleForm.GameName_check">标记问题</el-checkbox>
        <el-input @input="change($event)" v-model="ruleForm.GameName_msg" type="textarea" :maxlength=100 :rows="2" placeholder="请输入标记问题内容，限字100" />
      </el-form-item>
      <el-form-item label="游戏位置：" prop="PlayerPos">
        <span :class="[ruleForm.PlayerPos_check || (ruleForm.PlayerPos != oldInfo.PlayerPos) ? 'ruleForm-item err_msg' : 'ruleForm-item']">{{ruleForm.PlayerPos || '-'}}</span>
        <el-checkbox @input="change($event)" class="ml40" :checked="ruleForm.PlayerPos_check" v-model="ruleForm.PlayerPos_check">标记问题</el-checkbox>
        <el-input @input="change($event)" v-model="ruleForm.PlayerPos_msg" type="textarea" :maxlength=100 :rows="2" placeholder="请输入标记问题内容，限字100" />
      </el-form-item>
      <el-form-item label="生日：" prop="Birthday">
        <span :class="[ruleForm.Birthday_check || (ruleForm.Birthday !== oldInfo.Birthday) ? 'ruleForm-item err_msg' : 'ruleForm-item']">{{ruleForm.Birthday || '-'}}</span>
        <el-checkbox @input="change($event)" class="ml40" :checked="ruleForm.Birthday_check" v-model="ruleForm.Birthday_check">标记问题</el-checkbox>
        <el-input @input="change($event)" v-model="ruleForm.Birthday_msg" type="textarea" :maxlength=100 :rows="2" placeholder="请输入标记问题内容，限字100" />
      </el-form-item>
      <el-form-item label="国家地区：" prop="Country">
        <span :class="[ruleForm.Country_check || (ruleForm.Country != oldInfo.Country) ? 'ruleForm-item err_msg' : 'ruleForm-item']">{{ruleForm.Country || '-'}}</span>
        <el-checkbox @input="change($event)" class="ml40" :checked="ruleForm.Country_check" v-model="ruleForm.Country_check">标记问题</el-checkbox>
        <el-input @input="change($event)" v-model="ruleForm.Country_msg" type="textarea" :maxlength=100 :rows="2" placeholder="请输入标记问题内容，限字100" />
      </el-form-item>
      <el-form-item label="合同开始时间：" prop="ContractStartedAt">
        <span :class="[ruleForm.ContractStartedAt_check || (ruleForm.ContractStartedAt != oldInfo.ContractStartedAt) ? 'ruleForm-item err_msg' : 'ruleForm-item']">{{ruleForm.ContractStartedAt || '-'}}</span>
        <el-checkbox @input="change($event)" class="ml40" :checked="ruleForm.ContractStartedAt_check" v-model="ruleForm.ContractStartedAt_check">标记问题</el-checkbox>
        <el-input @input="change($event)" v-model="ruleForm.ContractStartedAt_msg" type="textarea" :rows="2" :maxlength=100 placeholder="请输入标记问题内容，限字100" />
      </el-form-item>
      <el-form-item label="合同结束时间：" prop="ContractEndedAt">
        <span :class="[ruleForm.ContractEndedAt_check || (ruleForm.ContractEndedAt != oldInfo.ContractEndedAt) ? 'ruleForm-item err_msg' : 'ruleForm-item']">{{ruleForm.ContractEndedAt || '-'}}</span>
        <el-checkbox @input="change($event)" class="ml40" :checked="ruleForm.ContractEndedAt_check" v-model="ruleForm.ContractEndedAt_check">标记问题</el-checkbox>
        <el-input @input="change($event)" v-model="ruleForm.ContractEndedAt_msg" type="textarea" :rows="2" :maxlength=100 placeholder="请输入标记问题内容，限字100" />
      </el-form-item>
      <div slot="header">证件信息</div>
      <el-form-item label="身份证号码/来往大陆通行证号码：" prop="IDNumber">
        <span :class="[ruleForm.IDNumber_check || (ruleForm.IDNumber != oldInfo.IDNumber) ? 'ruleForm-item err_msg' : 'ruleForm-item']">{{ruleForm.IDNumber || '-'}}</span>
        <el-checkbox @input="change($event)" class="ml40" :checked="ruleForm.IDNumber_check" v-model="ruleForm.IDNumber_check">标记问题</el-checkbox>
        <el-input @input="change($event)" v-model="ruleForm.IDNumber_msg" type="textarea" :rows="2" :maxlength=100 placeholder="请输入标记问题内容，限字100" />
      </el-form-item>
      <el-form-item label="护照号码：" prop="Passport">
        <span :class="[ruleForm.Passport_check || (ruleForm.Passport != oldInfo.Passport) ? 'ruleForm-item err_msg' : 'ruleForm-item']">{{ruleForm.Passport || '-'}}</span>
        <el-checkbox @input="change($event)" class="ml40" :checked="ruleForm.Passport_check" v-model="ruleForm.Passport_check">标记问题</el-checkbox>
        <el-input @input="change($event)" v-model="ruleForm.Passport_msg" type="textarea" :rows="2" :maxlength=100 placeholder="请输入标记问题内容，限字100" />
      </el-form-item>
      <el-form-item v-show="ruleForm.Country !== '中国'" label="签证到期日(外籍选手填写)：" prop="VisaExpiredAt">
        <span :class="[ruleForm.VisaExpiredAt_check || (ruleForm.VisaExpiredAt != oldInfo.VisaExpiredAt) ? 'ruleForm-item err_msg' : 'ruleForm-item']">{{ruleForm.VisaExpiredAt || '-'}}</span>
        <el-checkbox @input="change($event)" class="ml40" :checked="ruleForm.VisaExpiredAt_check" v-model="ruleForm.VisaExpiredAt_check">标记问题</el-checkbox>
        <el-input @input="change($event)" v-model="ruleForm.VisaExpiredAt_msg" type="textarea" :rows="2" :maxlength=100 placeholder="请输入标记问题内容，限字100" />
      </el-form-item>
      <div slot="header">比赛账号与设备信息</div>
      <el-form-item label="峡谷之巅账号：" prop="AcctXiagu">
        <span :class="[ruleForm.AcctXiagu_check || (ruleForm.AcctXiagu != oldInfo.AcctXiagu) ? 'ruleForm-item err_msg' : 'ruleForm-item']">{{ruleForm.AcctXiagu || '-'}}</span>
        <el-checkbox @input="change($event)" class="ml40" :checked="ruleForm.AcctXiagu_check" v-model="ruleForm.AcctXiagu_check">标记问题</el-checkbox>
        <el-input @input="change($event)" v-model="ruleForm.AcctXiagu_msg" type="textarea" :rows="2" :maxlength=100 placeholder="请输入标记问题内容，限字100" />
      </el-form-item>
      <el-form-item label="比赛服账号：" prop="AcctMatch">
        <span :class="[ruleForm.AcctMatch_check || (ruleForm.AcctMatch != oldInfo.AcctMatch) ? 'ruleForm-item err_msg' : 'ruleForm-item']">{{ruleForm.AcctMatch || '-'}}</span>
        <el-checkbox @input="change($event)" class="ml40" :checked="ruleForm.AcctMatch_check" v-model="ruleForm.AcctMatch_check">标记问题</el-checkbox>
        <el-input @input="change($event)" v-model="ruleForm.AcctMatch_msg" type="textarea" :rows="2" :maxlength=100 placeholder="请输入标记问题内容，限字100" />
      </el-form-item>
      <el-form-item label="键盘型号：" prop="KbType">
        <span :class="[ruleForm.KbType_check || (ruleForm.KbType != oldInfo.KbType) ? 'ruleForm-item err_msg' : 'ruleForm-item']">{{ruleForm.KbType || '-'}}</span>
        <el-checkbox @input="change($event)" class="ml40" :checked="ruleForm.KbType_check" v-model="ruleForm.KbType_check">标记问题</el-checkbox>
        <el-input @input="change($event)" v-model="ruleForm.KbType_msg" type="textarea" :rows="2" :maxlength=100 placeholder="请输入标记问题内容，限字100" />
      </el-form-item>
      <el-form-item label="键盘是否需要驱动：" prop="KbDriver">
        <span :class="[ruleForm.KbDriver_check || (ruleForm.KbDriver != oldInfo.KbDriver) ? 'ruleForm-item err_msg' : 'ruleForm-item']">{{ruleForm.KbDriver === 1 ? '是' : '否'}}</span>
        <el-checkbox @input="change($event)" class="ml40" :checked="ruleForm.KbDriver_check" v-model="ruleForm.KbDriver_check">标记问题</el-checkbox>
        <el-input @input="change($event)" v-model="ruleForm.KbDriver_msg" type="textarea" :rows="2" :maxlength=100 placeholder="请输入标记问题内容，限字100" />
      </el-form-item>
      <el-form-item label="鼠标型号：" prop="MouseType">
        <span :class="[ruleForm.MouseType_check || (ruleForm.MouseType != oldInfo.MouseType) ? 'ruleForm-item err_msg' : 'ruleForm-item']">{{ruleForm.MouseType || '-'}}</span>
        <el-checkbox @input="change($event)" class="ml40" :checked="ruleForm.MouseType_check" v-model="ruleForm.MouseType_check">标记问题</el-checkbox>
        <el-input @input="change($event)" v-model="ruleForm.MouseType_msg" type="textarea" :rows="2" :maxlength=100 placeholder="请输入标记问题内容，限字100" />
      </el-form-item>
      <el-form-item label="鼠标是否需要驱动：" prop="IsMouseDriven">
        <span :class="[ruleForm.IsMouseDriven_check || (ruleForm.IsMouseDriven != oldInfo.IsMouseDriven) ? 'ruleForm-item err_msg' : 'ruleForm-item']">{{ruleForm.IsMouseDriven === 1 ? '是' : '否'}}</span>
        <el-checkbox @input="change($event)" class="ml40" :checked="ruleForm.IsMouseDriven_check" v-model="ruleForm.IsMouseDriven_check">标记问题</el-checkbox>
        <el-input @input="change($event)" v-model="ruleForm.IsMouseDriven_msg" type="textarea" :rows="2" :maxlength=100 placeholder="请输入标记问题内容，限字100" />
      </el-form-item>
      <div slot="header">衣服尺寸</div>
      <el-form-item label="裤子尺寸：" prop="TrousersSize">
        <span :class="[ruleForm.TrousersSize_check || (ruleForm.TrousersSize != oldInfo.TrousersSize) ? 'ruleForm-item err_msg' : 'ruleForm-item']">{{ruleForm.TrousersSize || '-'}}</span>
        <el-checkbox @input="change($event)" class="ml40" :checked="ruleForm.TrousersSize_check" v-model="ruleForm.TrousersSize_check">标记问题</el-checkbox>
        <el-input @input="change($event)" v-model="ruleForm.TrousersSize_msg" type="textarea" :rows="2" :maxlength=100 placeholder="请输入标记问题内容，限字100" />
      </el-form-item>
      <el-form-item label="外套尺寸：" prop="CoatSize">
        <span :class="[ruleForm.CoatSize_check || (ruleForm.CoatSize != oldInfo.CoatSize) ? 'ruleForm-item err_msg' : 'ruleForm-item']">{{ruleForm.CoatSize || '-'}}</span>
        <el-checkbox @input="change($event)" class="ml40" :checked="ruleForm.CoatSize_check" v-model="ruleForm.CoatSize_check">标记问题</el-checkbox>
        <el-input @input="change($event)" v-model="ruleForm.CoatSize_msg" type="textarea" :rows="2" :maxlength=100 placeholder="请输入标记问题内容，限字100" />
      </el-form-item>
      <el-form-item label="T恤尺寸：" prop="TshirtSize">
        <span :class="[ruleForm.TshirtSize_check || (ruleForm.TshirtSize != oldInfo.TshirtSize) ? 'ruleForm-item err_msg' : 'ruleForm-item']">{{ruleForm.TshirtSize || '-'}}</span>
        <el-checkbox @input="change($event)" class="ml40" :checked="ruleForm.TshirtSize_check" v-model="ruleForm.TshirtSize_check">标记问题</el-checkbox>
        <el-input @input="change($event)" v-model="ruleForm.TshirtSize_msg" type="textarea" :rows="2" :maxlength=100 placeholder="请输入标记问题内容，限字100" />
      </el-form-item>
      <el-form-item label="鞋码：" prop="ShoesSize">
        <span :class="[ruleForm.ShoesSize_check || (ruleForm.ShoesSize != oldInfo.ShoesSize) ? 'ruleForm-item err_msg' : 'ruleForm-item']">{{ruleForm.ShoesSize || '-'}}</span>
        <el-checkbox @input="change($event)" class="ml40" :checked="ruleForm.ShoesSize_check" v-model="ruleForm.ShoesSize_check">标记问题</el-checkbox>
        <el-input @input="change($event)" v-model="ruleForm.ShoesSize_msg" type="textarea" :rows="2" :maxlength=100 placeholder="请输入标记问题内容，限字100" />
      </el-form-item>
      <el-form-item label="体重(公斤)：" prop="Weight">
        <span :class="[ruleForm.Weight_check || (Number(ruleForm.Weight) != Number(oldInfo.Weight)) ? 'ruleForm-item err_msg' : 'ruleForm-item']">{{ruleForm.Weight || '-'}}</span>
        <el-checkbox @input="change($event)" class="ml40" :checked="ruleForm.Weight_check" v-model="ruleForm.Weight_check">标记问题</el-checkbox>
        <el-input @input="change($event)"  v-model="ruleForm.Weight_msg" type="textarea" :rows="2" :maxlength=100 placeholder="请输入标记问题内容，限字100" />
      </el-form-item>
      <el-form-item label="定装照：" prop="AppearancePhoto">
        <span :class="[ruleForm.AppearancePhoto_check || (ruleForm.AppearancePhoto != oldInfo.AppearancePhoto) ? 'ruleForm-item err_msg' : 'ruleForm-item']">{{ruleForm.AppearancePhoto || '-'}}</span>
        <el-checkbox @input="change($event)" class="ml40" :checked="ruleForm.AppearancePhoto_check" v-model="ruleForm.AppearancePhoto_check">标记问题</el-checkbox>
        <el-input @input="change($event)"  v-model="ruleForm.AppearancePhoto_msg" type="textarea" :rows="2" :maxlength=100 placeholder="请输入标记问题内容，限字100" />
      </el-form-item>
    </el-form>
    <div>
      <div class="el-card__header mb">
        <div slot="header" v-if="tableData.length">附件详情</div>
      </div>
      <el-table :data="tableData" v-if="tableData.length" border style="width: 100%">
        <el-table-column prop="sName" label="文件名称" />
        <el-table-column prop="sDesc" label="文件要求" />
        <el-table-column label="下载模板" align="center">
          <template slot-scope="scope">
            <el-upload disabled :file-list="scope.row.sFilePathList">
              <el-button type="text" v-show="scope.row.sFilePathList && scope.row.sFilePathList.length" @click="handeleModel(scope.row)">下载模板</el-button>
            </el-upload>
          </template>
        </el-table-column>
         <el-table-column label="下载范例" align="center">
          <template slot-scope="scope">
            <el-upload disabled :file-list="scope.row.sDemoFilePathList">
              <el-button type="text" v-show="scope.row.sDemoFilePathList && scope.row.sDemoFilePathList.length" @click="handeleDemoFilePath(scope.row)">下载范例</el-button>
            </el-upload>
          </template>
        </el-table-column>
        <el-table-column label="上传文件" align="center" width="300">
          <template slot-scope="scope">
            <el-upload disabled :file-list="scope.row.ExtValueList">
              <el-button style="margin-right: 20px" type="text" v-show="scope.row.ExtValueList && scope.row.ExtValueList.length" @click="handleActionDown(scope.row)">下载附件</el-button>
              <el-tooltip effect="light" :content="scope.row.errorInfo" placement="top-start">
                <el-button v-show="scope.row.errorInfo" type="text" class="err_msg">标记错误</el-button>
              </el-tooltip>
            </el-upload>
          </template>
        </el-table-column>
        <el-table-column prop="id" label="操作" width="100" align="center">
          <template slot-scope="scope">
            <el-button style="margin-right: 20px" type="text" @click="handleCheckouted(scope.row)">标记问题</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
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
    <div class="mt">
      <el-button type="primary" @click="handleAuditPass(1)">通过</el-button>
      <el-button v-if="iType !== '190'" @click="handleAuditFailed(-1)">不通过</el-button>
      <el-button @click="handleUpdateOrder">暂存并返回</el-button>
      <el-button @click="onSaveEnd('-1')">终止流程</el-button>
    </div>
  </el-card>
</template>

<script>
  import moment from 'moment';
  import { queryById, preview, isAudit, queryTempList, updateOrder, saveEnd } from './service';
  import { getUrlParam } from '../../../../../utils/index';
  import {render } from '../../utils/render';
  export default {
    data() {
      return {
        formLabelWidth: '100px',
        auditDialogVisible: false,
        checkoutForm: {},
        TeamDes: '',
        rowId: null,
        iType: getUrlParam('iType'),
        id: Number(getUrlParam('id')),
        OuterID: Number(getUrlParam('OuterID')),
        activeName: getUrlParam('activeName'),
        tableData: [],
        tableFiles: [],
        orginData: [],
        ruleForm: {},
        oldInfo: {}
      };
    },
    created: function () {
      render.initTeams();
      this.getDetail();
    },
    methods: {
      change(e) {
        this.$forceUpdate();
      },
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
      handeleModel(row) {
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
      handeleDemoFilePath(row) {
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
      handleActionDown(row) {
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
      getDetail () {
        const params = { id: this.id, activeName: 'player' };
        const obj = { iType: this.iType };
        queryTempList(obj).then(files => {
          if (files.success) {
            let tableFiles = files && files.data && files.data.rows || [];
            queryById(params).then(res => {
              if (res.success) {
                let tableData = [];
                const data = res && res.data &&  res.data.rows && res.data.rows[0] || {};
                this.orginData = JSON.parse(JSON.stringify(res.data.rows));
                let newData = data.newInfo ? data.newInfo : {};
                const errorInfo = data.errorInfo || {};
                this.ruleForm = newData;

                this.ruleForm.ShoesSize = render.ShoesSizeRender(newData.ShoesSize);
                this.ruleForm.PlayerRole = render.PlayerRoleRender(newData.PlayerRole);
                this.ruleForm.PlayerPos = render.PlayerPosRender(newData.PlayerPos);
                this.ruleForm.Country = render.CountryRender(newData.Country);
                this.TeamDes = render.TeamNameRender(newData.TeamID);

                if (JSON.stringify(errorInfo) == "{}") {
                  Object.entries(newData).forEach(([key, value]) => {
                    if (newData[`${key}_check`] === '1') {
                      this.ruleForm[`${key}_check`] = true;
                      this.ruleForm[`${key}_msg`] = newData[`${key}_msg`];
                    }
                  });
                }
                Object.entries(errorInfo).forEach(([key, value]) => {
                  if (key) {
                    this.ruleForm[`${key}_check`] = true;
                    this.ruleForm[`${key}_msg`] = value;
                  }
                });
                this.ruleForm.VisaExpiredAt = newData.VisaExpiredAt ? newData.VisaExpiredAt : null;
                this.ruleForm.AcctXiagu = newData.AcctXiagu ? newData.AcctXiagu : null;
                this.ruleForm.KbType = newData.KbType ? newData.KbType : null;
                this.ruleForm.KbDriver = newData.KbDriver ? newData.KbDriver : null;
                this.ruleForm.MouseType = newData.MouseType ? newData.MouseType : null;
                this.ruleForm.IsMouseDriven = newData.IsMouseDriven ? newData.IsMouseDriven : null;
                this.ruleForm.IDNumber = newData.IDNumber || null;
                this.ruleForm.Passport = newData.Passport || null;
                this.ruleForm.Birthday = moment(newData.Birthday).format('YYYY-MM-DD HH:mm:ss');
                this.ruleForm.ContractStartedAt = moment(newData.ContractStartedAt).format('YYYY-MM-DD HH:mm:ss');
                this.ruleForm.ContractEndedAt = moment(newData.ContractEndedAt).format('YYYY-MM-DD HH:mm:ss');


                this.oldInfo = data.oldInfo ? data.oldInfo : {};

                this.oldInfo.ShoesSize = render.ShoesSizeRender(this.oldInfo.ShoesSize);
                this.oldInfo.PlayerRole = render.PlayerRoleRender(this.oldInfo.PlayerRole);
                this.oldInfo.PlayerPos = render.PlayerPosRender(this.oldInfo.PlayerPos);
                this.oldInfo.Country = render.CountryRender(this.oldInfo.Country);
                this.oldInfo.VisaExpiredAt = this.oldInfo.VisaExpiredAt ? this.oldInfo.VisaExpiredAt : null;
                this.oldInfo.AcctXiagu = this.oldInfo.AcctXiagu ? this.oldInfo.AcctXiagu : null;
                this.oldInfo.KbType = this.oldInfo.KbType ? this.oldInfo.KbType : null;
                this.oldInfo.KbDriver = this.oldInfo.KbDriver ? this.oldInfo.KbDriver : null;
                this.oldInfo.MouseType = this.oldInfo.MouseType ? this.oldInfo.MouseType : null;
                this.oldInfo.IDNumber = data.oldInfo.IDNumber || null;
                this.oldInfo.Passport = data.oldInfo.Passport || null;
                this.oldInfo.IsMouseDriven = this.oldInfo.IsMouseDriven ? this.oldInfo.IsMouseDriven : null;
                this.oldInfo.Birthday = moment(data.oldInfo.Birthday).format('YYYY-MM-DD HH:mm:ss');
                this.oldInfo.ContractStartedAt = moment(data.oldInfo.ContractStartedAt).format('YYYY-MM-DD HH:mm:ss');
                this.oldInfo.ContractEndedAt = moment(data.oldInfo.ContractEndedAt).format('YYYY-MM-DD HH:mm:ss');
                if (newData.fileData && newData.fileData.length && this.iType != '190') {
                  newData.fileData.forEach(item => {
                    tableFiles.length && tableFiles.forEach(file => {
                      if (item.TemplateID == file.id) {
                        tableData.push({
                          TemplateID: item.TemplateID,
                          sName: file.sName,
                          sDesc: file.sDesc,
                          isNeed: file.isNeed,
                          ExtValue: item.ExtValue,
                          sDemoFilePath: file.sDemoFilePath,
                          sFilePath: file.sFilePath,
                          ExtValueList: item.ExtValue ? [{ name: item.ExtValue.substring(6), url: item.ExtValue }] : [],
                          sFilePathList: file.sFilePath ? [{ name: file.sFilePath.substring(6), url: file.sFilePath }] : [],
                          sDemoFilePathList: file.sDemoFilePath ? [{ name: file.sDemoFilePath.substring(6), url: file.sDemoFilePath }] : [],
                          errorInfo: item.errorInfo || ''
                        })
                      }
                    })
                  })
                  this.tableData = tableData;
                }
              }
            });
          }
        })
      },
      async handleAuditFailed(AuditStatus) {
        let flag = true;
        const msg = await this.checkoutAuditStatus();
        if (msg != '') {
          this.$message.warning(msg);
          return;
        }
        const tmpObj = this.ruleForm;
        let obj = this.orginData[0];
        let errorInfo = {};
        Object.entries(tmpObj).forEach(([key, value]) => {
          if (value === true) {
            let errMsg = key.split('_');
            errorInfo[errMsg[0]] = tmpObj[`${errMsg[0]}_msg`] || '';
          }
        });
        const newObject = Object.keys(errorInfo);
        if (newObject.length === 0) {
          flag = this.tableData.some(item => {
            return item.ExtValue_Check
          })
        }
        if (newObject.length === 0) {
          if (!flag) {
            flag = false;
            return this.$message.error(`请标记有不通过的问题的，并且备具原因必填！`)
          }
        }
        obj.AuditStatus = -1;
        obj.errorInfo = errorInfo;
        obj.newInfo.fileData = this.tableData;
        if (flag) {
          this.$confirm('确认要驳回吗?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            return isAudit(obj).then(res => {
              if (res.success) {
                this.$router.push({ path: `/eco/playerAuditInformation?activeName=failed` });
              } else {
                this.$message.error(res && res.message || '系统异常， 稍后再试！');
              }
            })
          });
        }
      },
      async checkoutAuditStatus() {
        const params = { id: this.id, activeName: 'player' };
        const res = await queryById(params);
        let msg = '';
        if (res.success) {
          if (res.data && res.data.rows[0]) {
            const data = res.data.rows[0] || {};
            let AuditStatus = data.AuditStatus;
            const AuditedAt = data.AuditedAt && moment(data.AuditedAt).format('YYYY-MM-DD HH:mm:ss');
            const AuditOperID = data.AuditOperID || '';
            if (AuditStatus == 1) {
              msg = `该工单在${AuditedAt}时间，被${AuditOperID}审核通过！`;
            }
            if (AuditStatus == -1) {
              msg = `该工单在${AuditedAt}时间，被${AuditOperID}审核拒绝！`;
            }
          }
        }
        return msg;
      },
      async handleAuditPass (AuditStatus) {
        let flag = true;
        const msg = await this.checkoutAuditStatus();
        if (msg != '') {
          this.$message.warning(msg);
          return;
        }
        const tmpObj = this.ruleForm;
        for (let key in tmpObj) {
          if (tmpObj[key] === true) {
            flag = false;
            return this.$message.warning(`该选手标记有问题，不能被审核通过`);
          }
        }
        this.tableData && this.tableData.length && this.tableData.forEach(item => {
          if (item.ExtValue_Check) {
            flag = false;
            return this.$message.error(`该选手标记有问题，不能被审核通过`)
          }
        })
        const id = this.id;
        const OuterID = this.OuterID;
        const iType = getUrlParam('iType');
        const TeamID = getUrlParam('TeamID');
        const params = { id, AuditStatus, OuterID };
        if (flag) {
          this.setAuditPass(params);
        }
      },
      setAuditPass (params) {
        return isAudit(params).then(res => {
          if (res.success) {
            this.$router.push({ path: `/eco/playerAuditInformation?activeName=passed` });
          } else {
            this.$message.error(res && res.message || '系统异常， 稍后再试！');
          }
        })
      },
      async handleUpdateOrder() {
        const tmpObj = this.ruleForm;
        let obj = this.orginData[0];
        let errorInfo = {};
        let flag = true;
        const msg = await this.checkoutAuditStatus();
        if (msg != '') {
          this.$message.warning(msg);
          return;
        }
        Object.entries(tmpObj).forEach(([key, value]) => {
          if (tmpObj[`${key}_check`] === true) {
            errorInfo[`${key}_check`] = true;
            errorInfo[key] = tmpObj[`${key}_msg`] ? tmpObj[`${key}_msg`] : '';
          }
        });
        obj.errorInfo = errorInfo;
        obj.newInfo.fileData = this.tableData;
        delete obj.teamInfo;
        updateOrder(obj).then(res => {
          if (res.success) {
            this.$router.push({ path: `/eco/playerAuditInformation?activeName=audited` });
          }
        })
      },
      async onSaveEnd(type) {
        const msg = await this.checkoutAuditStatus();
        if (msg != '') {
          this.$message.warning(msg);
          return;
        }
        const tmpObj = this.ruleForm;
        let obj = this.orginData[0];
        obj.isActive = -1;
        obj.orderID = obj.id;
        obj.id = obj.OuterID;
        delete obj.oldInfo;
        delete obj.newInfo;
        delete obj.teamInfo;
        delete obj.errorInfo;
        return saveEnd(obj).then(res => {
          if (res.success) {
            this.$router.push({ path: `/eco/playerAuditInformation?activeName=end` });
          }
        })
      }
    }
  }
</script>
<style scoped>
  .err_msg {
    font-size: 14px;
    font-weight: bold;
    color: red;
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
  .ruleForm-item {
    width: 196px;
    display: inline-block;
    overflow: hidden;
    word-wrap: break-word;
  }
  .ml40 {
    margin-left: 20px;
    width: 120px;
  }
  .el-upload .el-upload--text {
    display: none;
  }
  .rule-Form .el-input, 
  .rule-Form .el-select, .rule-Form .el-textarea {
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

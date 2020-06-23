<template lang="html">
  <div class="coachAdd-warp">
    <el-card style="margin-bottom: 10px">
      <el-steps :space="200" :active="active" finish-status="success">
        <el-step title="填写基本信息" ></el-step>
        <el-step title="上传文件"></el-step>
        <el-step title="提交管理员审核"></el-step>
      </el-steps>
    </el-card>
    <div v-if="showType === '1'">
      <el-card>
        <div slot="header">教练基础信息</div>
        <el-form :model="ruleForm" ref="ruleForm" label-width="260px" class="rule-Form">
          <el-form-item label="姓名(中文)" prop="sName"
            :rules="[
              { required: true, message: '必填', trigger: 'blur' },
              { min: 2, max: 16, message: '姓名(中文)长度在 2 到 16 个字符', trigger: 'blur' }
            ]">
            <el-input v-model="ruleForm.sName" placeholder="请输入" :disabled="!ruleForm.sName_check && AuditStatus === -1" />
            <el-tooltip  effect="light" :content="ruleForm.sName_msg" placement="top-start">
              <el-button v-show="ruleForm.sName_check === true" type="text" class="err_msg">标记错误</el-button>
            </el-tooltip>
          </el-form-item>
          <el-form-item label="姓名（英文）" prop="NameEn"
            :rules="[
              { required: true, message: '姓名(英文)长度在 2 到 128 个字符', trigger: 'blur' },
              { min: 2, max: 128, message: '姓名(英文)长度在 2 到 128 个字符', trigger: 'blur' }
            ]">
            <el-input v-model="ruleForm.NameEn" placeholder="请输入" :disabled="!ruleForm.NameEn_check && AuditStatus === -1" />
            <el-tooltip  effect="light" :content="ruleForm.NameEn_msg" placement="top-start">
              <el-button v-show="ruleForm.NameEn_check === true" type="text" class="err_msg">标记错误</el-button>
            </el-tooltip>
            <div class="bg666 mtbg666">与护照一致</div>
          </el-form-item>
          <el-form-item label="手机" prop="Phone"
            :rules="[
              { required: true, message: '必填', trigger: 'blur' },
              { pattern: /^1\d{10}$/, trigger: 'blur', message: '请输入正确的手机号码' }
            ]">
            <el-input v-model="ruleForm.Phone" :disabled="!ruleForm.Phone_check && AuditStatus === -1" placeholder="请输入" :maxlength=11 />
            <el-tooltip  effect="light" :content="ruleForm.Phone_msg" placement="top-start">
              <el-button v-show="ruleForm.Phone_check === true" type="text" class="err_msg">标记错误</el-button>
            </el-tooltip>
          </el-form-item>
          <el-form-item label="游戏ID" prop="GameName"
            :rules="[{ required: true, message: '必填', trigger: 'blur' }]">
            <el-input v-model="ruleForm.GameName" :disabled="!ruleForm.GameName_check && AuditStatus === -1" placeholder="请输入" :maxlength=128 />
            <el-tooltip effect="light" :content="ruleForm.GameName_msg" placement="top-start">
              <el-button v-show="ruleForm.GameName_check === true" type="text" class="err_msg">标记错误</el-button>
            </el-tooltip>
          </el-form-item>
          <el-form-item label="生日" prop="Birthday"
            :rules="[{ required: true, message: '必填', trigger: 'blur' }]">
            <!-- @input="changeBirthday" -->
            <el-date-picker
              :disabled="!ruleForm.Birthday_check && AuditStatus === -1"
              v-model="ruleForm.Birthday"
              type="date"
              format="yyyy-MM-dd"
              placeholder="请选择" style="width: 60%" />
            <el-tooltip  effect="light" :content="ruleForm.Birthday_msg" placement="top-start">
              <el-button v-show="ruleForm.Birthday_check === true" type="text" class="err_msg">标记错误</el-button>
            </el-tooltip>
          </el-form-item>
          <el-form-item label="国家地区" prop="Country"
            :rules="[{ required: true, message: '必填', trigger: 'blur' }]">
            <el-select v-model="ruleForm.Country" @input="changeCountry" :disabled="!ruleForm.Country_check && AuditStatus === -1" placeholder="请选择" style="width: 60%">
              <el-option v-for="item in countryList"
                :key="item.value"
                :label="item.name"
                :value="item.value" />
            </el-select>
            <el-tooltip  effect="light" :content="ruleForm.Country_msg" placement="top-start">
              <el-button v-show="ruleForm.Country_check === true" type="text" class="err_msg">标记错误</el-button>
            </el-tooltip>
          </el-form-item>
          <el-form-item v-if="ruleForm.Country && ruleForm.Country !== '+86' && ruleForm.Country !== '中国'" label="签证到期日(外籍选手填写）" prop="VisaExpiredAt"
            :rules="[{ required: true, message: '必填', trigger: 'blur' }]">
            <el-date-picker
              :disabled="!ruleForm.VisaExpiredAt_check && AuditStatus === -1 && isDisVisaExpiredAt"
              v-model="ruleForm.VisaExpiredAt"
              type="date"
              placeholder="请选择" style="width: 60%" />
            <el-tooltip effect="light" :content="ruleForm.VisaExpiredAt_msg" placement="top-start">
              <el-button v-show="ruleForm.VisaExpiredAt_check === true" type="text" class="err_msg">标记错误</el-button>
            </el-tooltip>
          </el-form-item>
          <el-form-item label="合同开始时间" prop="ContractStartedAt"
            :rules="[{ required: true, message: '必填', trigger: 'blur' }]">
            <el-date-picker
              :disabled="!ruleForm.ContractStartedAt_check && AuditStatus === -1"
              v-model="ruleForm.ContractStartedAt"
              type="date"
              placeholder="请选择" style="width: 60%" />
            <el-tooltip  effect="light" :content="ruleForm.ContractStartedAt_msg" placement="top-start">
              <el-button v-show="ruleForm.ContractStartedAt_check === true" type="text" class="err_msg">标记错误</el-button>
            </el-tooltip>
          </el-form-item>
          <el-form-item label="合同结束时间" prop="ContractEndedAt"
            :rules="[{ required: true, message: '必填', trigger: 'blur' }]">
            <el-date-picker
              :disabled="!ruleForm.ContractEndedAt_check && AuditStatus === -1"
              v-model="ruleForm.ContractEndedAt"
              type="date"
              placeholder="请选择" style="width: 60%"
              :picker-options="pickerOptions" />
            <el-tooltip  effect="light" :content="ruleForm.ContractEndedAt_msg" placement="top-start">
              <el-button v-show="ruleForm.ContractEndedAt_check === true" type="text" class="err_msg">标记错误</el-button>
            </el-tooltip>
            <div class="bg666">需要满足自由无约日条款</div>
          </el-form-item>

          <div slot="header">证件信息</div>
          <el-form-item label="身份证号码/来往大陆通行证号码" v-show="ruleForm.Country === '+86'" prop="IDNumber" :rules="[{ required: true, message: '必填', trigger: 'blur' }]">
            <el-input v-model="ruleForm.IDNumber" :disabled="!ruleForm.IDNumber_check && AuditStatus === -1 && isDisIDNumber" placeholder="请选择" :maxlength="20"  />
            <el-tooltip effect="light" :content="ruleForm.IDNumber_msg" placement="top-start">
              <el-button v-show="ruleForm.IDNumber_check === true" type="text" class="err_msg">标记错误</el-button>
            </el-tooltip>
          </el-form-item>
          <el-form-item label="身份证号码/来往大陆通行证号码" v-show="ruleForm.Country !== '+86'" prop="IDNumber">
            <el-input v-model="ruleForm.IDNumber" :disabled="!ruleForm.IDNumber_check && AuditStatus === -1 && isDisIDNumber" placeholder="请选择" :maxlength="20"  />
            <el-tooltip effect="light" :content="ruleForm.IDNumber_msg" placement="top-start">
              <el-button v-show="ruleForm.IDNumber_check === true" type="text" class="err_msg">标记错误</el-button>
            </el-tooltip>
          </el-form-item>

          <el-form-item label="护照号码" prop="Passport" v-show="ruleForm.Country !== '+86'"
            :rules="[{ required: true, message: '必填', trigger: 'blur' }]">
            <el-input v-model="ruleForm.Passport" :disabled="!ruleForm.Passport_check && AuditStatus === -1 && isDisPassport" placeholder="请选择" :maxlength="30" />
            <el-tooltip effect="light" :content="ruleForm.Passport_msg" placement="top-start">
              <el-button v-show="ruleForm.Passport_check === true" type="text" class="err_msg">标记错误</el-button>
            </el-tooltip>
          </el-form-item>
          <el-form-item label="护照号码" prop="Passport" v-show="ruleForm.Country === '+86'">
            <el-input v-model="ruleForm.Passport" :disabled="!ruleForm.Passport_check && AuditStatus === -1 && isDisPassport" placeholder="请选择" :maxlength="30" />
            <el-tooltip  effect="light" :content="ruleForm.Passport_msg" placement="top-start">
              <el-button v-show="ruleForm.Passport_check === true" type="text" class="err_msg">标记错误</el-button>
            </el-tooltip>
            <div class="bg666">如暂无护照，请填写“护照申请中“</div>
          </el-form-item>
          <div slot="header">比赛账号与设备信息</div>
          <el-form-item label="峡谷之巅账号" v-show="ruleForm.Country === '+86'" prop="AcctXiagu" :rules="[{ required: true, message: '必填', trigger: 'blur' }]">
            <el-input v-model="ruleForm.AcctXiagu" :disabled="(!ruleForm.AcctXiagu_check && AuditStatus === -1 && isDisAcctXiagu)" placeholder="请选择" :maxlength="20"  />
            <el-tooltip effect="light" :content="ruleForm.AcctXiagu_msg" placement="top-start">
              <el-button v-show="ruleForm.AcctXiagu_check === true" type="text" class="err_msg">标记错误</el-button>
            </el-tooltip>
          </el-form-item>
          <el-form-item label="峡谷之巅账号" v-show="ruleForm.Country !== '+86'" prop="AcctXiagu">
            <el-input v-model="ruleForm.AcctXiagu" :disabled="!ruleForm.AcctXiagu_check && AuditStatus === -1 && isDisAcctXiagu" placeholder="请选择" :maxlength="20"  />
            <el-tooltip effect="light" :content="ruleForm.AcctXiagu_msg" placement="top-start">
              <el-button v-show="ruleForm.AcctXiagu_check === true" type="text" class="err_msg">标记错误</el-button>
            </el-tooltip>
          </el-form-item>
          <el-form-item label="比赛服账号" prop="AcctMatch">
            <el-input v-model="ruleForm.AcctMatch" :disabled="!ruleForm.AcctMatch_check && AuditStatus === -1" placeholder="请选择" />
            <el-tooltip  effect="light" :content="ruleForm.AcctMatch_msg" placement="top-start">
              <el-button v-show="ruleForm.AcctMatch_check === true" type="text" class="err_msg">标记错误</el-button>
            </el-tooltip>
          </el-form-item>
          <div slot="header">衣服尺寸</div>
          <el-form-item label="裤子尺寸" prop="TrousersSize">
            <el-select :disabled="!ruleForm.TrousersSize_check && AuditStatus === -1" v-model="ruleForm.TrousersSize" placeholder="请选择" style="width: 60%">
              <el-option v-for="item in clothesSizeList"
                :key="item.value"
                :label="item.label"
                :value="item.value" />
            </el-select>
            <el-tooltip  effect="light" :content="ruleForm.TrousersSize_msg" placement="top-start">
              <el-button v-show="ruleForm.TrousersSize_check === true" type="text" class="err_msg">标记错误</el-button>
            </el-tooltip>
          </el-form-item>
          <el-form-item label="外套尺寸" prop="CoatSize">
            <el-select v-model="ruleForm.CoatSize" :disabled="!ruleForm.CoatSize_check && AuditStatus === -1" placeholder="请选择" style="width: 60%">
              <el-option v-for="item in clothesSizeList"
                :key="item.value"
                :label="item.label"
                :value="item.value" />
            </el-select>
            <el-tooltip  effect="light" :content="ruleForm.CoatSize_msg" placement="top-start">
              <el-button v-show="ruleForm.CoatSize_check === true" type="text" class="err_msg">标记错误</el-button>
            </el-tooltip>
          </el-form-item>
          <el-form-item label="T恤尺寸" prop="TshirtSize">
            <el-select v-model="ruleForm.TshirtSize" :disabled="!ruleForm.TshirtSize_check && AuditStatus === -1" placeholder="请选择" style="width: 60%">
              <el-option v-for="item in clothesSizeList"
                :key="item.value"
                :label="item.label"
                :value="item.value" />
            </el-select>
            <el-tooltip  effect="light" :content="ruleForm.TshirtSize_msg" placement="top-start">
              <el-button v-show="ruleForm.TshirtSize_check === true" type="text" class="err_msg">标记错误</el-button>
            </el-tooltip>
          </el-form-item>
          <el-form-item label="鞋码" prop="ShoesSize">
            <el-select v-model="ruleForm.ShoesSize" :disabled="!ruleForm.ShoesSize_check && AuditStatus === -1" placeholder="请选择" style="width: 60%">
              <el-option v-for="item in shoesSizeList"
                :key="item.value"
                :label="item.label"
                :value="item.value" />
            </el-select>
            <el-tooltip effect="light" :content="ruleForm.ShoesSize_msg" placement="top-start">
              <el-button v-show="ruleForm.ShoesSize_check === true" type="text" class="err_msg">标记错误</el-button>
            </el-tooltip>
          </el-form-item>
          <el-form-item label="体重（公斤）" prop="Weight">
            <el-input oninput="value=value.replace(/[^\d]/g,'')" :disabled="!ruleForm.Weight_check && AuditStatus === -1" v-model="ruleForm.Weight" style="width: 60%" placeholder="请输入 （公斤）"  />
            <el-tooltip effect="light" :content="ruleForm.Weight_msg" placement="top-start">
              <el-button v-show="ruleForm.Weight_check === true" type="text" class="err_msg">标记错误</el-button>
            </el-tooltip>
          </el-form-item>

          <el-form-item label="定装照" prop="AppearancePhoto">
            <el-input placeholder="请提供定装照网盘共享地址" :disabled="!ruleForm.AppearancePhoto_check && AuditStatus === -1" v-model="ruleForm.AppearancePhoto" style="width: 60%" />
            <el-tooltip effect="light" :content="ruleForm.AppearancePhoto_msg" placement="top-start">
              <el-button v-show="ruleForm.AppearancePhoto_check === true" type="text" class="err_msg">标记错误</el-button>
            </el-tooltip>
          </el-form-item>

          <el-form-item>
            <el-button @click="onDraft(0)">保存草稿箱</el-button>
            <el-button type="primary" @click="onNext(0)">保存并下一步</el-button>
            <el-button @click="onNextEnd('-1')">终止申请</el-button>
          </el-form-item>
        </el-form>
      </el-card>
    </div>
    <div v-if="showType === '2'">
      <el-card>
        <el-table :data="tableData" border style="width: 100%">
          <el-table-column prop="sName" label="文件名称" />
          <el-table-column prop="isNeed" label="附件是否必须上传" :formatter="isNeedRender" />
          <el-table-column prop="sDesc" label="文件要求" />
          <el-table-column prop="downloadTmp" label="下载模板" align="center">
            <template slot-scope="scope">
              <el-upload class="upload-demo" disabled :file-list="scope.row.sFilePathList">
                <el-button size="small" v-show="scope.row.sFilePathList && scope.row.sFilePathList.length" type="text" @click="handleDown(scope.row)">下载模板</el-button>
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
              <el-upload class="upload-demo" 
                :disabled="!scope.row.errorInfo && AuditStatus === -1"
                :accept="ACCEPT"
                :http-request="UploadFilePath"
                :before-remove="beforeRemove"
                :limit="1"
                :before-upload="onBeforeUpload"
                :on-exceed="handleExceed"
                :on-remove="handleRemove"
                :file-list="scope.row.ExtValueList">
                <el-button @click="curRowIndex=scope.$index" size="small" type="primary">点击上传</el-button>
                <el-tooltip effect="light" :content="scope.row.errorInfo" placement="top-start">
                  <el-button v-show="scope.row.errorInfo" type="text" class="err_msg">标记错误</el-button>
                </el-tooltip>
              </el-upload>
            </template>
          </el-table-column>
          <!-- <el-table-column label="到期时间" width="180">
            <template slot-scope="scope">
              <el-date-picker
                style="width: 148px" 
                v-model="scope.row.ExpireAt"
                type="date"
                placeholder="选择日期"
                format="yyyy-MM-dd" />
            </template>
          </el-table-column> -->
        </el-table>
        <div class="tips-warp">系统能接受的每个文件大小不超过20M,只能上传PDF,JPG,PNG文件三种格式</div>
        <div class="button-warp">
          <el-button @click="onPrev">上一步</el-button>
          <el-button @click="submitFile('draft')">保存草稿箱</el-button>
          <el-button type="primary" @click="submitFile('next')">保存并下一步</el-button>
          <el-button @click="onSaveEnd('-1')">终止申请</el-button>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>
  import moment from 'moment';
  import { getUrlParam } from '../../../../../utils/index';
  import { CLOTHES_SIZE, SHOES_SIZE, TEAM_TYPE, ACCEPT_TYPE } from '../../utils/contants';
  import { api } from "../../utils/api";
  import { save, modify, fileUpload, preview, saveEnd } from './service';
  export default {
    data() {
      return {
        flag: true,
        isDisAcctXiagu: true,
        isDisIDNumber: true,
        isDisVisaExpiredAt: true,
        isDisPassport: true,
        age: '',
        curRowIndex: null,
        params: { page: 1, pageSize: 10, iType: getUrlParam('iType') },
        ACCEPT: ACCEPT_TYPE,
        tableData: [],
        userTeam: {},
        active: 1,
        showType: '1',
        iType: getUrlParam('iType'),
        AuditStatus: Number(getUrlParam('AuditStatus')),
        orderID: Number(getUrlParam('orderID')),
        OuterID: Number(getUrlParam('OuterID')),
        edit: getUrlParam('edit'),
        ruleForm: {
          Weight: ''
        },
        TeamGroupList: TEAM_TYPE,
        teamList: [],
        clothesSizeList: CLOTHES_SIZE,
        shoesSizeList: SHOES_SIZE,
        countryList: [],
        pickerOptions: {
          disabledDate: (time) => {
            return this.dealDisabledDate(time)
          }
        },
      };
    },
    created: function () {
      this.getContent();
      this.getCoachDetail();
      this.getById();
      this.getLoginUserTeam(); // 获取当前战队
    },
    methods: {
      isNeedRender(row) {
        return row.isNeed === 1 ? '是' : '否';
      },
      changeCountry(val) {
        if (val != '+86' && this.AuditStatus === -1) {
          this.isDisVisaExpiredAt = false;
          this.isDisPassport = false;
          this.isDisIDNumber = true;
          this.isDisAcctXiagu = true;
        }
        if (val == '+86' && this.AuditStatus === -1) {
          this.isDisIDNumber = false;
          this.isDisAcctXiagu = false;
          this.isDisVisaExpiredAt = true;
          this.isDisPassport = true;
        }
      },
      // LPL 年龄大于16岁 ， LDL 大于14岁
      getLoginUserTeam() {
        api.queryLoginUserTeam().then(res => {
          if (res.success) {
            if (!res.data.ID) {
              this.$message.error('该用户没有对应战队！请退出重新登陆！！')
            }
            this.userTeam = res.data || {}
          }
        })
      },
      dealDisabledDate(time) {
        return time.getTime() < this.ruleForm.ContractStartedAt;
      },
      filterProps (data) {
        const pdata = {};
        Object.keys(data).forEach(p => {
          if (data[p]) {
            pdata[p] = data[p];
          }
        })
        return pdata;
      },
      async getById(OuterID) {
        if (this.edit === 'edit') {
          const params = { id: getUrlParam('OuterID') || OuterID, activeName: 'coach' };
          let obj = { page: 1, pageSize: 50, iType: this.iType };
          const flie = await api.queryFileTemplate(obj);
          let fileData = flie.success && flie.data && flie.data.rows || [];
          const res = await api.queryById(params);
          const data = res.success && res.data && res.data || {};
          this.ruleForm = data;
          // if (data.Birthday) {
          //   this.changeBirthday(data.Birthday)
          // }
          if (data.fileData && data.fileData.length) {
            data.fileData.forEach(it => {
              fileData.length && fileData.forEach(file => {
                file.TemplateID = file.id;
                file.sFilePathList = file.sFilePath ? [{name: file.sFilePath.substring(6),url: file.sFilePath}] : [];
                file.sDemoFilePathList = file.sDemoFilePath ? [{name: file.sDemoFilePath.substring(6),url: file.sDemoFilePath}] : [];
                if (it.TemplateID == file.id) {
                  file.ExtValue = it.ExtValue;
                  file.ExtValueList = it.ExtValue ? [{name: it.ExtValue.substring(6),url: it.ExtValue}] : [];
                }
              })
            })
            this.tableData = fileData;
          } else {
            this.tableData = [];
          }
          if (this.tableData.length === 0) {
            fileData.length && fileData.forEach((file) => {
              file.TemplateID = file.id;
              file.sFilePathList = file.sFilePath ? [{name: file.sFilePath.substring(6),url: file.sFilePath}] : [];
              file.sDemoFilePathList = file.sDemoFilePath ? [{name: file.sDemoFilePath.substring(6),url: file.sDemoFilePath}] : [];
            })
            this.tableData = fileData;
          }
        }
      },
      changeBirthday(val) {
        let timeFor = moment(val).format('YYYY-MM-DD');
        let age = '';
        let d = new Date();
        let year = d.getFullYear();
        let month = d.getMonth() + 1;
        let day = d.getDate();
        if (month < 10) {
          month = `0${month}`;
        }
        if (day < 10) {
          day = `0${day}`;
        }
        var now = `${year}-${month}-${day}`;
        if (now.substring(0,4) >= timeFor.substring(0,4) 
          && now.substring(5,7) >= timeFor.substring(5,7) 
          && now.substring(8,10)>=timeFor.substring(8,10)) {
          age = year - parseInt(timeFor.substring(0,4));
        } else {
          age = year - parseInt(timeFor.substring(0,4)) - 1;
        }
        this.age = age;
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
              this.$message.error('系统只接受指定的格式文档!');
            }
          })
        }
      },
      handleDown(row) {
        const params = {
          file: row.sDemoFilePath
        };
        return preview(params).then(res => {
          if (res.success) {
            window.open(res.data)
          }
        })
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
      handleExceed(files, fileList) {
        this.$message.warning(`当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
      },
      getContent () {
        this.countryList = this.$store.getters.countryCode
      },
      async getCoachDetail () {
        let obj = { page: 1, pageSize: 10, iType: this.iType };
        const ret = await api.queryFileTemplate(obj);
        let fileData = ret.success && ret.data && ret.data.rows || [];
        const params = {
          id: this.orderID,
          iType: this.iType,
          activeName: this.activeName
        };
        if (params.id && params.iType) {
          const res = await api.queryDetail(params);
          const data = res.success && res.data && res.data.rows[0] || {};
          let newData = data.newInfo ? data.newInfo : {};
          const errObj = data.errorInfo || {};
          this.ruleForm = newData;
          // if (JSON.stringify(data.errorInfo) == "{}") {
          //   Object.entries(sObj).forEach(([key, value]) => {
          //     if (sObj[`${key}_check`] != null || sOjb[`${key}_msg`] != null) {
          //       this.ruleForm[`${key}_check`] = true;
          //       this.ruleForm[`${key}_msg`] = sOjb[`${key}_msg`];
          //     }
          //   })
          // }
          Object.entries(errObj).forEach(([errKey, errVal]) => {
            this.ruleForm[`${errKey}_check`] = true;
            this.ruleForm[`${errKey}_msg`] = errVal;
          })
          // if (newData.Birthday) {
          //   this.changeBirthday(newData.Birthday)
          // }
          if (newData.fileData && newData.fileData.length) {
            newData.fileData.forEach(it => {
              fileData.forEach(file => {
                file.TemplateID = file.id;
                file.sFilePathList = file.sFilePath ? [{name: file.sFilePath.substring(6),url: file.sFilePath}] : [];
                file.sDemoFilePathList = file.sDemoFilePath ? [{name: file.sDemoFilePath.substring(6),url: file.sDemoFilePath}] : [];
                if (file.id == it.TemplateID) {
                  file.ExtValue = it.ExtValue || '';
                  file.ExtValueList = it.ExtValue ? [{ name: it.ExtValue.substring(6), url: it.ExtValue }] : [];
                  file.errorInfo = it.errorInfo || '';
                }
              })
            })
            this.tableData = fileData;
          } else {
            this.tableData = [];
          }
        }
        if (this.tableData.length === 0) {
          fileData.length && fileData.forEach((file) => {
            file.TemplateID = file.id;
            file.sFilePathList = file.sFilePath ? [{name: file.sFilePath.substring(6),url: file.sFilePath}] : [];
            file.sDemoFilePathList = file.sDemoFilePath ? [{name: file.sDemoFilePath.substring(6),url: file.sDemoFilePath}] : [];
          })
          this.tableData = fileData;
        }
      },
      onPrev() {
        this.showType = '1';
        this.active = 1;
      },
      verificationCheck(type) {
        let checkFlag = true;
        let params = this.ruleForm;
        if (type === 'draft') {
          if (JSON.stringify(this.filterProps(params)) === '{}') {
            return checkFlag = false;
          }
        }
        if (type === 'onNext') {
          try {
            Object.entries(params).forEach(([key, value]) => {
              if (key === 'NameCn' && !value) {
                checkFlag = false;
                throw new Error('NameCn');
              }
              if (key === 'NameEn' && !value) {
                checkFlag = false;
                throw new Error('NameEn');
              }
              if (key === 'Phone' && !value) {
                checkFlag = false;
                throw new Error('Phone');
              }
              if (key === 'GameName' && !value) {
                checkFlag = false;
                throw new Error('GameName');
              }
              if (key === 'Birthday' && !value) {
                checkFlag = false;
                throw new Error('Birthday');
              }
              if (key === 'Country' && !value) {
                checkFlag = false;
                throw new Error('Country');
              }
              if (key === 'ContractStartedAt' && !value) {
                checkFlag = false;
                throw new Error('ContractStartedAt');
              }
              if (key === 'ContractEndedAt' && !value) {
                checkFlag = false;
                throw new Error('ContractEndedAt');
              }
            });
          } catch (error) {
            if (error.message === 'NameCn') {
              return this.$message.error('请填写中文姓名！');
            }
            if (error.message === 'NameEn') {
              return this.$message.error('请填写英文姓名！');
            }
            if (error.message === 'Phone') {
              return this.$message.error('请填写手机号！');
            }
            if (error.message === 'GameName') {
              return this.$message.error('请填写游戏ID！');
            }
            if (error.message === 'Birthday') {
              return this.$message.error('请填写生日！');
            }
            if (error.message === 'Country') {
              return this.$message.error('请选择国家地区！');
            }
            if (error.message === 'ContractEndedAt') {
              return this.$message.error('请选择合同结束时间！');
            }
            if (error.message === 'ContractStartedAt') {
              return this.$message.error('请选择合同开始时间！');
            }
          }
          // if (this.userTeam['1']) {
          //   if (this.age < 16) {
          //     checkFlag = false;
          //     return this.$message.error('年龄必须要大于16岁！')
          //   }
          // }
          // if (this.userTeam['2']) {
          //   if (this.age < 14) {
          //     checkFlag = false;
          //     return this.$message.error('年龄必须要大于14岁！')
          //   }
          // }
        }
        return checkFlag;
      },
      onDraft(type) {
        if (JSON.stringify(this.userTeam) === '{}') {
          this.$message.error('该用户没有对应战队！请退出重新登陆！！');
          return false
        }
        if (!this.verificationCheck('draft')) {
          this.$message.error('请填写选手身份 和 姓名')
          return false
        } else {
          let params = this.ruleForm;
          params.Weight = Number(params.Weight);
          params.Birthday = params.Birthday ? moment(params.Birthday).format('YYYY-MM-DD HH:mm:ss') : '';
          params.ContractStartedAt = params.ContractStartedAt ? moment(params.ContractStartedAt).format('YYYY-MM-DD HH:mm:ss') : '';
          params.ContractEndedAt = params.ContractEndedAt ? moment(params.ContractEndedAt).format('YYYY-MM-DD HH:mm:ss') : '';
          params.VisaExpiredAt = params.VisaExpiredAt ? moment(params.VisaExpiredAt).format('YYYY-MM-DD HH:mm:ss') : '';
          if (this.orderID) {
            params.orderID = this.orderID;
          }
          if (this.OuterID) {
            params.id = this.OuterID;
          }
          if (this.AuditStatus == -1) {
            params.AuditStatus = -1;
            params.isActive = 1
          } else {
            params.AuditStatus = 0;
            params.isActive = type;
          }
          if (this.params.iType === '200') {
            return modify(params).then(res => {
              if (res.success) {
                this.orderID = res.data.orderID;
                this.OuterID = res.data.id;
                const url = `/club/application?activeName=coaching`
                this.$router.push({ path: url })
              } else {
                this.$message.error(res && res.message || '系统异常， 稍后再试！');
              }
            })
          } else {
            return save(params).then(res => {
              if (res.success) {
                this.orderID = res.data.orderID;
                this.OuterID = res.data.id;
                const url = `/club/application?activeName=coaching`;
                this.$router.push({ path: url })
              } else {
                this.$message.error(res && res.message || '系统异常， 稍后再试！');
              }
            })
          }
        }
      },
      onNext(type) {
        this.onNextData(type);
      },
      onNextEnd(type) {
        this.$confirm('提交后不能再修改，确定要终止?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          // this.onNextData(type);
          let params = this.ruleForm;
          return saveEnd(params).then(end => {
            if (end.success) {
              const url = `/club/application?activeName=coachEnd`
              this.$router.push({ path: url })
            }
          })
        });
      },
      onNextData(type) {
        if (JSON.stringify(this.userTeam) === '{}') {
          this.$message.error('该用户没有对应战队！请退出重新登陆！！');
          return false
        }
        if (this.verificationCheck('onNext') === true) {
          let checkFlag = true;
          let params = this.ruleForm;
          params.Weight = Number(this.ruleForm.Weight);
          params.Birthday = params.Birthday ? moment(params.Birthday).format('YYYY-MM-DD HH:mm:ss') : '';
          params.ContractStartedAt = params.ContractStartedAt ? moment(params.ContractStartedAt).format('YYYY-MM-DD HH:mm:ss') : '';
          params.ContractEndedAt = params.ContractEndedAt ? moment(params.ContractEndedAt).format('YYYY-MM-DD HH:mm:ss') : '';
          params.VisaExpiredAt = params.VisaExpiredAt ? moment(params.VisaExpiredAt).format('YYYY-MM-DD HH:mm:ss') : '';
          if (type == '-1') {
            params.isActive = -1;
          } else {
            params.isActive = 0;
          }
          delete params.AuditStatus;
          if (this.orderID) {
            params.orderID = this.orderID;
          }
          if (this.OuterID) {
            params.id = this.OuterID;
          }
          if (params.Country !== '+86' && params.Country !== '中国') {
            if (!params.VisaExpiredAt) {
              checkFlag = false;
              return this.$message.error('请选择签证到期日时间！');
            }
            if (!params.Passport) {
              checkFlag = false;
              return this.$message.error('请填写护照号码！');
            }
          }
          if (params.Country === '+86') {
            if (!params.IDNumber) {
              checkFlag = false;
              return this.$message.error('请填写身份证号码！');
            }
            if (!params.AcctXiagu) {
              checkFlag = false;
              return this.$message.error('请填写峡谷之巅账号！');
            }
          }
          if (checkFlag) {
            if (type == '-1') {
              return saveEnd(params).then(end => {
                if (end.success) {
                  const url = `/club/application?activeName=coachEnd`
                  this.$router.push({ path: url })
                }
              })
            }
            if (this.params.iType === '200' && type != '-1') {
              return modify(params).then(res => {
                if (res.success) {
                  this.showType = '2';
                  this.active = 2;
                  this.orderID = res.data.orderID;
                  this.OuterID = res.data.id;
                } else {
                  this.$message.error(res && res.message || '系统异常， 稍后再试！');
                }
              })
            } else if (type != '-1') {
              return save(params).then(res => {
                if (res.success) {
                  this.OuterID = res.data.id;
                  this.orderID = res.data.orderID;
                  this.showType = '2';
                  this.active = 2;
                } else {
                  this.$message.error(res && res.message || '系统异常， 稍后再试！');
                }
              })
            }
          }
        }
      },
      submitFile(type) {
        this.saveData(type);
      },
      onSaveEnd(type) {
        this.$confirm('提交后不能再修改，确定要终止?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.saveData(type);
        });
      },
      saveData(type) {
        let flag = true;
        let params = this.ruleForm;
        if (this.ruleForm.Weight) {
          params.Weight = Number(this.ruleForm.Weight);
        }
        params.Birthday = params.Birthday ? moment(params.Birthday).format('YYYY-MM-DD HH:mm:ss') : '';
        params.ContractStartedAt = params.ContractStartedAt ? moment(params.ContractStartedAt).format('YYYY-MM-DD HH:mm:ss') : '';
        params.ContractEndedAt = params.ContractEndedAt ? moment(params.ContractEndedAt).format('YYYY-MM-DD HH:mm:ss') : '';
        params.VisaExpiredAt = params.VisaExpiredAt ? moment(params.VisaExpiredAt).format('YYYY-MM-DD HH:mm:ss') : '';
        if (this.OuterID) {
          params.id = this.OuterID;
        }
        if (this.orderID) {
          params.orderID = this.orderID;
        }
        // delete params.AuditStatus;
        params.AuditStatus = 0;
        if (type == '-1') {
          params.isActive = -1;
        } else if (type == 'draft') {
          // 保存草稿的时候 状态 维持之前的状态
          if (this.AuditStatus == -1) {
            params.AuditStatus = -1;
            params.isActive = 1
          } else {
            params.isActive = 0;
          }
        } else {
          params.isActive = 0;
        }
        if (type === 'next') {
          this.tableData.length
          && this.tableData.forEach(item => {
            if (item.isNeed === 1 && !item.ExtValue) {
              this.$message.warning(`请上传${item.sName}附件！`);
              flag = false;
            }
          })
        }
        params.fileData = this.tableData;
        if (flag) {
          if (type == '-1') {
            return saveEnd(params).then(end => {
              if (end.success) {
                const url = `/club/application?activeName=coachEnd`
                this.$router.push({ path: url })
              }
            })
          }
          if (this.params.iType === '200' && type != '-1') {
            return modify(params).then(res => {
              if (res.success) {
                if (type === 'next') {
                  const url = `/coach/coachDetail?orderID=${res.data.orderID}&id=${res.data.id}&iType=${this.params.iType}&AuditStatus=${this.AuditStatus}&activeName=coaching`
                  this.$router.push({ path: url })
                } else {
                  const url = `/club/application?activeName=coaching`
                  this.$router.push({ path: url })
                }
              } else {
                this.$message.error(res && res.message || '系统异常， 稍后再试！');
              }
            })
          } else if (type != '-1') {
            return save(params).then(res => {
              if (res.success) {
                if (type === 'next') {
                  const url = `/coach/coachDetail?orderID=${res.data.orderID}&id=${res.data.id}&iType=${this.params.iType}&AuditStatus=${this.AuditStatus}&activeName=coaching`
                  this.$router.push({ path: url })
                } else {
                  const url = `/club/application?activeName=coaching`
                  this.$router.push({ path: url })
                }
              } else {
                this.$message.error(res && res.message || '系统异常， 稍后再试！');
              }
            })
          }
        }
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
  .rule-Form .el-input, .rule-Form .el-select {
    width: 60%;
  }
  .tips-warp {
    text-align: right;
    margin-top: 10px;
    margin-bottom: 10px;
    font-size: 14px;
    color: #666;
  }
  .button-warp {
    text-align: center;
    margin-top: 20px;
    margin-bottom: 20px;
  }
  .err_msg {
    font-size: 14px;
    font-weight: bold;
    color: red;
  }
  .rule-Form .el-textarea {
    width: 100% !important;
  }
  .bg666 {
    color: #666;
    font-size: 13px;
  }
  .mtbg666 {
    margin-top: 0px;
  }
  .mt {
    margin-top: 10px;
  }
</style>


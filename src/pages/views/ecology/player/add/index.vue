<template lang="html">
  <div>
    <el-card style="margin-bottom: 10px">
      <el-steps :space="200" :active="active" finish-status="success">
        <el-step title="填写基本信息" ></el-step>
        <el-step title="上传文件"></el-step>
        <el-step title="提交管理员审核"></el-step>
      </el-steps>
    </el-card>
    <div v-show="showType === '1'">
      <el-card>
        <div slot="header">选手基础信息</div>
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="260px" class="rule-Form">
          <el-form-item label="选手身份" prop="PlayerRole" :rules="[{ required: true, message: '必填', trigger: 'blur' }]">
            <el-select :disabled="!ruleForm.PlayerRole_check && AuditStatus === -1" v-model="ruleForm.PlayerRole" placeholder="请选择" style="width: 60%">
              <el-option v-for="item in PlayerRole"
                :key="item.value"
                :label="item.label"
                :value="item.value" />
            </el-select>
            <el-tooltip effect="light" :content="ruleForm.PlayerRole_msg" placement="top-start">
              <el-button v-show="ruleForm.PlayerRole_check === true" type="text" class="err_msg">标记错误</el-button>
            </el-tooltip>
          </el-form-item>
          
          <el-form-item label="姓名(中文)" v-show="ruleForm.PlayerRole == '4'" prop="NameCn"
            :rules="[
              { required: true, message: '必填', trigger: 'blur' },
              { min: 2, max: 16, message: '姓名(中文)长度在 2 到 16 个字符', trigger: 'blur' }
            ]">
            <el-select v-model="ruleForm.NameCn" :disabled="!ruleForm.NameCn_check && AuditStatus === -1" placeholder="请选择" @change="changeName" style="width: 60%">
              <el-option v-for="item in isTransferNameCn"
                :key="item.value"
                :label="item.label"
                :value="item.value" />
            </el-select>
            <el-tooltip  effect="light" :content="ruleForm.NameCn_msg" placement="top-start">
              <el-button v-show="ruleForm.NameCn_check === true" type="text" class="err_msg">标记错误</el-button>
            </el-tooltip>
          </el-form-item>

          <el-form-item label="姓名（英文）" v-show="ruleForm.PlayerRole == '4'" prop="NameCn">
            <el-select v-model="ruleForm.NameEn" :disabled="!ruleForm.NameEn_check && AuditStatus === -1" placeholder="请选择" style="width: 60%">
              <el-option v-for="item in isTransferNameEn"
                :key="item.value"
                :label="item.label"
                :value="item.value" />
            </el-select>
            <el-tooltip  effect="light" :content="ruleForm.NameEn_msg" placement="top-start">
              <el-button v-show="ruleForm.NameEn_check === true" type="text" class="err_msg">标记错误</el-button>
            </el-tooltip>
          </el-form-item>

          <el-form-item label="姓名（中文）" v-show="ruleForm.PlayerRole != '4'" prop="NameCn"
            :rules="[
              { required: true, message: '必填', trigger: 'blur' },
              { min: 2, max: 16, message: '姓名(中文)长度在 2 到 16 个字符', trigger: 'blur' }
            ]">
            <el-input v-model="ruleForm.NameCn" placeholder="请输入" :disabled="!ruleForm.NameCn_check && AuditStatus === -1" />
            <el-tooltip  effect="light" :content="ruleForm.NameCn_msg" placement="top-start">
              <el-button v-show="ruleForm.NameCn_check === true" type="text" class="err_msg">标记错误</el-button>
            </el-tooltip>
          </el-form-item>
          <el-form-item label="姓名（英文）" v-show="ruleForm.PlayerRole != '4'" prop="NameEn"
            :rules="[
              { required: true, message: '必填', trigger: 'blur' },
              { min: 2, max: 128, message: '姓名(中文)长度在 2 到 128 个字符', trigger: 'blur' }
            ]">
            <el-input v-model="ruleForm.NameEn" :disabled="!ruleForm.NameEn_check && AuditStatus === -1" placeholder="请输入" :maxlength=128 :minlength=2 />
            <el-tooltip effect="light" :content="ruleForm.NameEn_msg" placement="top-start">
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
            <el-tooltip effect="light" :content="ruleForm.Phone_msg" placement="top-start">
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
          <el-form-item label="游戏位置" prop="PlayerPos" 
            :rules="[{ required: true, message: '必填', trigger: 'blur' }]">
            <el-select v-model="ruleForm.PlayerPos" :disabled="!ruleForm.PlayerPos_check && AuditStatus === -1" placeholder="位置" style="width: 60%">
              <el-option v-for="item in gamePositionList"
                :key="item.value"
                :label="item.label"
                :value="item.value" />
            </el-select>
            <el-tooltip effect="light" :content="ruleForm.PlayerPos_msg" placement="top-start">
              <el-button v-show="ruleForm.PlayerPos_check === true" type="text" class="err_msg">标记错误</el-button>
            </el-tooltip>
          </el-form-item>
          <el-form-item label="生日" prop="Birthday"
            :rules="[{ required: true, message: '必填', trigger: 'blur' }]">
            <el-date-picker 
              :disabled="!ruleForm.Birthday_check && AuditStatus === -1"
              @input="changeBirthday"
              v-model="ruleForm.Birthday"
              type="date"
              format="yyyy-MM-dd"
              placeholder="请选择" style="width: 60%" />
            <el-tooltip effect="light" :content="ruleForm.Birthday_msg" placement="top-start">
              <el-button v-show="ruleForm.Birthday_check === true" type="text" class="err_msg">标记错误</el-button>
            </el-tooltip>
          </el-form-item>
          <el-form-item label="国家地区" prop="Country"
            :rules="[{ required: true, message: '必填', trigger: 'blur' }]">
            <el-select v-model="ruleForm.Country" @input="changeCountry"  :disabled="!ruleForm.Country_check && AuditStatus === -1" placeholder="请选择" style="width: 60%">
              <el-option v-for="item in countryList"
                :key="item.value"
                :label="item.name"
                :value="item.value" />
            </el-select>
            <el-tooltip effect="light" :content="ruleForm.Country_msg" placement="top-start">
              <el-button v-show="ruleForm.Country_check === true" type="text" class="err_msg">标记错误</el-button>
            </el-tooltip>
          </el-form-item>
          <el-form-item v-if="ruleForm.Country && ruleForm.Country !== '+86' && ruleForm.Country !== '中国'" label="签证到期日(外籍选手填写）" prop="VisaExpiredAt"
            :rules="[{ required: true, message: '必填', trigger: 'blur' }]">
            <el-date-picker
              :disabled="(!ruleForm.VisaExpiredAt_check && AuditStatus === -1) && isDisVisaExpiredAt"
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
            <el-tooltip effect="light" :content="ruleForm.ContractStartedAt_msg" placement="top-start">
              <el-button v-show="ruleForm.ContractStartedAt_check === true" type="text" class="err_msg">标记错误</el-button>
            </el-tooltip>
          </el-form-item>
          <el-form-item label="合同结束时间" prop="ContractEndedAt" :rules="[{ required: true, message: '必填', trigger: 'blur' }]">
            <el-date-picker
              :disabled="!ruleForm.ContractEndedAt_check && AuditStatus === -1"
              v-model="ruleForm.ContractEndedAt"
              type="date"
              placeholder="请选择" style="width: 60%"
              :picker-options="pickerOptions" />
              <el-tooltip  effect="light" :content="ruleForm.ContractEndedAt_msg" placement="top-start">
                <el-button v-show="ruleForm.ContractEndedAt_check === true" type="text" class="err_msg">标记错误</el-button>
              </el-tooltip>
          </el-form-item>
          <div slot="header">证件信息</div>
          <el-form-item label="身份证号码/来往大陆通行证号码" v-show="ruleForm.Country === '+86'" prop="IDNumber" :rules="[{ required: true, message: '必填', trigger: 'blur' }]">
            <el-input v-model="ruleForm.IDNumber" :disabled="(!ruleForm.IDNumber_check && AuditStatus === -1 && isDisIDNumber)" placeholder="请选择" :maxlength="20"  />
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
            <el-input v-model="ruleForm.Passport" :disabled="(!ruleForm.Passport_check && AuditStatus === -1) && isDisPassport" placeholder="请选择" :maxlength="30" />
            <el-tooltip effect="light" :content="ruleForm.Passport_msg" placement="top-start">
              <el-button v-show="ruleForm.Passport_check === true" type="text" class="err_msg">标记错误</el-button>
            </el-tooltip>
          </el-form-item>
          <el-form-item label="护照号码" prop="Passport" v-show="ruleForm.Country === '+86'">
            <el-input v-model="ruleForm.Passport" :disabled="!ruleForm.Passport_check && AuditStatus === -1 && isDisPassport" placeholder="请选择" :maxlength="30" />
            <el-tooltip effect="light" :content="ruleForm.Passport_msg" placement="top-start">
              <el-button v-show="ruleForm.Passport_check === true" type="text" class="err_msg">标记错误</el-button>
            </el-tooltip>
          </el-form-item>
          
          <div slot="header">比赛账号与设备信息</div>
          <!-- <el-form-item label="峡谷之巅账号" prop="AcctXiagu">
            <el-input v-model="ruleForm.AcctXiagu" :disabled="!ruleForm.AcctXiagu_check && AuditStatus === -1" placeholder="请选择" />
            <el-tooltip  effect="light" :content="ruleForm.AcctXiagu_msg" placement="top-start">
              <el-button v-show="ruleForm.AcctXiagu_check" type="text" class="err_msg">标记错误</el-button>
            </el-tooltip>
            <div class="bg666">根据规则，需要注册选手的峡谷之巅账号在钻一段位及以上</div>
          </el-form-item> -->

           <el-form-item label="峡谷之巅账号" v-show="ruleForm.Country === '+86'" prop="AcctXiagu" :rules="[{ required: true, message: '必填', trigger: 'blur' }]">
            <el-input v-model="ruleForm.AcctXiagu" :disabled="(!ruleForm.AcctXiagu_check && AuditStatus === -1 && isDisAcctXiagu)" placeholder="请选择" :maxlength="20"  />
            <el-tooltip effect="light" :content="ruleForm.AcctXiagu_msg" placement="top-start">
              <el-button v-show="ruleForm.AcctXiagu_check === true" type="text" class="err_msg">标记错误</el-button>
            </el-tooltip>
            <div class="bg666">根据规则，需要注册选手的峡谷之巅账号在钻一段位及以上</div>
          </el-form-item>
          <el-form-item label="峡谷之巅账号" v-show="ruleForm.Country !== '+86'" prop="AcctXiagu">
            <el-input v-model="ruleForm.AcctXiagu" :disabled="!ruleForm.AcctXiagu_check && AuditStatus === -1 && isDisAcctXiagu" placeholder="请选择" :maxlength="20"  />
            <el-tooltip effect="light" :content="ruleForm.AcctXiagu_msg" placement="top-start">
              <el-button v-show="ruleForm.AcctXiagu_check === true" type="text" class="err_msg">标记错误</el-button>
            </el-tooltip>
            <div class="bg666">根据规则，需要注册选手的峡谷之巅账号在钻一段位及以上</div>
          </el-form-item>

          <el-form-item label="比赛服账号" prop="AcctMatch"
            :rules="[{ required: true, message: '必填', trigger: 'blur' }]">
            <el-input :disabled="!ruleForm.AcctMatch_check && AuditStatus === -1" v-model="ruleForm.AcctMatch" placeholder="请选择" />
            <el-tooltip  effect="light" :content="ruleForm.AcctMatch_msg" placement="top-start">
              <el-button v-show="ruleForm.AcctMatch_check === true" type="text" class="err_msg">标记错误</el-button>
            </el-tooltip>
          </el-form-item>
          <el-form-item label="键盘型号" prop="KbType"
            :rules="[{ required: true, message: '必填', trigger: 'blur' }]">
            <el-input :disabled="!ruleForm.KbType_check && AuditStatus === -1" v-model="ruleForm.KbType" placeholder="请选择" />
            <el-tooltip  effect="light" :content="ruleForm.KbType_msg" placement="top-start">
              <el-button v-show="ruleForm.KbType_check === true" type="text" class="err_msg">标记错误</el-button>
            </el-tooltip>
          </el-form-item>
          <el-form-item label="键盘是否需要驱动" prop="KbDriver"
            :rules="[{ required: true, message: '必填', trigger: 'blur' }]">
            <el-select v-model="ruleForm.KbDriver" :disabled="!ruleForm.KbDriver_check && AuditStatus === -1" placeholder="请选择" style="width: 60%">
              <el-option v-for="item in keyboardList"
                :key="item.value"
                :label="item.label"
                :value="item.value" />
            </el-select>
            <el-tooltip  effect="light" :content="ruleForm.KbDriver_msg" placement="top-start">
              <el-button v-show="ruleForm.KbDriver_check === true" type="text" class="err_msg">标记错误</el-button>
            </el-tooltip>
          </el-form-item>
          <el-form-item label="鼠标型号" prop="MouseType"
            :rules="[{ required: true, message: '必填', trigger: 'blur' }]">
            <el-input v-model="ruleForm.MouseType" :disabled="!ruleForm.MouseType_check && AuditStatus === -1" placeholder="请选择" />
            <el-tooltip effect="light" :content="ruleForm.MouseType_msg || ''" placement="top-start">
              <el-button v-show="ruleForm.MouseType_check === true" type="text" class="err_msg">标记错误</el-button>
            </el-tooltip>
          </el-form-item>
          <el-form-item label="鼠标是否需要驱动" prop="IsMouseDriven"
            :rules="[{ required: true, message: '必填', trigger: 'blur' }]">
            <el-select v-model="ruleForm.IsMouseDriven" :disabled="!ruleForm.IsMouseDriven_check && AuditStatus === -1" placeholder="请选择" style="width: 60%">
              <el-option v-for="item in mouseList"
                :key="item.value"
                :label="item.label"
                :value="item.value" />
            </el-select>
            <el-tooltip  effect="light" :content="ruleForm.IsMouseDriven_msg" placement="top-start">
              <el-button v-show="ruleForm.IsMouseDriven_check === true" type="text" class="err_msg">标记错误</el-button>
            </el-tooltip>
          </el-form-item>
          <div slot="header">衣服尺寸</div>
          <el-form-item label="裤子尺寸" prop="TrousersSize"
            :rules="[{ required: true, message: '必填', trigger: 'blur' }]">
            <el-select v-model="ruleForm.TrousersSize" :disabled="!ruleForm.TrousersSize_check && AuditStatus === -1" placeholder="请选择" style="width: 60%">
              <el-option v-for="item in clothesSizeList"
                :key="item.value"
                :label="item.label"
                :value="item.value" />
            </el-select>
            <el-tooltip  effect="light" :content="ruleForm.TrousersSize_msg" placement="top-start">
              <el-button v-show="ruleForm.TrousersSize_check === true" type="text" class="err_msg">标记错误</el-button>
            </el-tooltip>
          </el-form-item>
          <el-form-item label="外套尺寸" prop="CoatSize"
            :rules="[{ required: true, message: '必填', trigger: 'blur' }]">
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
          <el-form-item label="T恤尺寸" prop="TshirtSize"
            :rules="[{ required: true, message: '必填', trigger: 'blur' }]">
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
          <el-form-item label="鞋码" prop="ShoesSize"
            :rules="[{ required: true, message: '必填', trigger: 'blur' }]">
            <el-select v-model="ruleForm.ShoesSize" :disabled="!ruleForm.ShoesSize_check && AuditStatus === -1" placeholder="请选择" style="width: 60%">
              <el-option v-for="item in shoesSizeList"
                :key="item.value"
                :label="item.label"
                :value="item.value" />
            </el-select>
            <el-tooltip  effect="light" :content="ruleForm.ShoesSize_msg" placement="top-start">
              <el-button v-show="ruleForm.ShoesSize_check === true" type="text" class="err_msg">标记错误</el-button>
            </el-tooltip>
          </el-form-item>
          <el-form-item label="体重（公斤）" prop="Weight"
            :rules="[{ required: true, message: '必填', trigger: 'blur' }]">
            <el-input placeholder="体重（公斤）" :disabled="!ruleForm.Weight_check && AuditStatus === -1" oninput="value=value.replace(/[^\d]/g,'')" v-model="ruleForm.Weight" style="width: 60%" />
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
            <el-button type="primary" @click="onNext('onNext')">保存并下一步</el-button>
            <el-button @click="onNextEnd('-1')">终止申请</el-button>
          </el-form-item>
        </el-form>
      </el-card>
    </div>
    <div v-show="showType === '2'">
      <el-card>
        <el-table :data="tableData" border style="width: 100%">
          <el-table-column prop="sName" label="文件名称" />
          <el-table-column prop="isNeed" label="附件是否必须上传" :formatter="isNeedRender" />
          <el-table-column prop="sDesc" label="文件要求" />
          <el-table-column prop="downloadTmp" label="下载模板">
            <template slot-scope="scope">
              <el-upload class="upload-demo" disabled :file-list="scope.row.sFilePathList">
                <el-button size="small" @click="handleDown(scope.row)" type="text">下载模板</el-button>
              </el-upload>
            </template>
          </el-table-column>
          <el-table-column prop="downloadTmp" label="查看范例">
            <template slot-scope="scope">
              <el-upload class="upload-demo" disabled :file-list="scope.row.sDemoFilePathList">
                <el-button size="small" @click="handeleModel(scope.row)" type="text">查看范例</el-button>
              </el-upload>
            </template>
          </el-table-column>
          <el-table-column prop="sFilePath" label="上传文件" width="300" align="center">
            <template slot-scope="scope">
              <el-upload class="upload-demo" :disabled="!scope.row.errorInfo && AuditStatus === -1"
                :http-request="UploadFilePath"
                :before-remove="beforeRemove"
                :before-upload="onBeforeUpload"
                :limit="1"
                :on-remove="handleRemove"
                :on-exceed="handleExceed"
                :accept="ACCEPT"
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
  import { GAME_POSITION, SHOES_SIZE, CLOTHES_SIZE, MOUSE_DRIVER, ACCEPT_TYPE } from '../../utils/contants';
  import {api} from '../../utils/api';
  import {save, modify, fileUpload, preview, isTransfer, saveEnd } from './service';
  export default {
    data() {
      return {
        isDisAcctXiagu: true,
        isDisIDNumber: true,
        isDisVisaExpiredAt: true,
        isDisPassport: true,
        transferData: [], // 转会用户数据
        NameList: [],
        NameEnList: [],
        ACCEPT: ACCEPT_TYPE,
        flag: true,
        age: '',
        oldPlayerID: null,
        curRowIndex: null,
        params: { page: 1, pageSize: 10, iType: getUrlParam('iType') },
        tableData: [],
        isTransferNameCn: [],
        isTransferNameEn: [],
        active: 1,
        showType: '1',
        orderID: Number(getUrlParam('orderID')),
        OuterID: Number(getUrlParam('OuterID')),
        AuditStatus: Number(getUrlParam('AuditStatus')),
        activeName: getUrlParam('activeName'),
        iType: getUrlParam('iType'),
        edit: getUrlParam('edit'),
        ruleForm: {
          AcctXiagu: '',
          KbType: '',
          KbDriver: '',
          IsMouseDriven: '',
          PlayerRole: '',
          NameCn: '',
          NameEn: '',
          Phone: '',
          GameName: '',
          PlayerPos: '',
          Birthday: '',
          Country: '',
          ContractStartedAt: '',
          ContractEndedAt: '',
          IDNumber: '',
          AcctMatch: '',
          TrousersSize: '',
          CoatSize: '',
          TshirtSize: '',
          ShoesSize: '',
          Weight: '',
          Passport: '',
          PlayerDes: '',
          VisaExpiredAt: '',
          MouseType: '',
          CreateOperID: '',
        },
        teamList: [],
        userTeam: {},
        clothesSizeList: CLOTHES_SIZE,
        mouseList: MOUSE_DRIVER,
        shoesSizeList: SHOES_SIZE,
        keyboardList: MOUSE_DRIVER,
        PlayerRole: [
          { label: '自由选手', value: '1' },
          { label: '青训营选手', value:'2' },
          { label: '新人选手', value: '3' },
          { label: '转会选手', value: '4' }
        ],
        gamePositionList: GAME_POSITION,
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
      this.getPlayerDetail();
      this.getisTransfer();
      this.getById(); // 修改页面过来的信息
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
      // LPL 年龄大于16岁 ， LDL 大于15岁
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
      changeName(value) {
        let iType = '130';
        this.transferData.length && 
        this.transferData.forEach(item => {
          if (item.NameCn === value) {
            this.getById(item.id, iType)
          }
        })
      },

      async getById(OuterID, iType) {
        if (this.edit == 'edit' || iType == '130') {
          const params = {
            id: getUrlParam('OuterID') || OuterID,
            activeName: this.activeName || 'player'
          };
          let obj = { page: 1, pageSize: 10, iType: this.iType };
          const ret = await api.queryFileTemplate(obj);
          let fileData = ret.success && ret.data && ret.data.rows || [];
          const res = await api.queryById(params);
          const data = res.success && res.data && res.data || {};
          this.ruleForm = data;
          if (data.Birthday) { this.changeBirthday(data.Birthday)}
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
          }  else {
            this.tableData = [];
          }
          
          if (iType == '130') {
            this.ruleForm.PlayerRole = '4';
            delete this.ruleForm.fileData;
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
      // 转会选手
      getisTransfer(){
        isTransfer().then(res => {
          let iType = '130';
          let isTransferNameCn = [];
          let isTransferNameEn = [];
          if (res.success) {
            res.data.rows 
            && res.data.rows.length
            && res.data.rows.forEach(item => {
              this.oldPlayerID = item.id;
              isTransferNameCn.push({
                label: item.NameCn,
                value: item.NameCn
              })
              isTransferNameEn.push({
                label: item.NameEn,
                value: item.NameEn
              })
            })
            this.isTransferNameCn = isTransferNameCn;
            this.isTransferNameEn = isTransferNameEn;
            this.transferData = res.data.rows;
          }
        })
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
          this.flag = false;
          this.$message.error('只能上传PDF,JPG,PNG');
          return false;
        }
        return true;
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
      handleExceed(files, fileList) {
        this.$message.warning(`当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
      },
      beforeRemove(file, fileList) {
        if (this.flag) {
          return this.$confirm(`确定移除 ${ file.name }？`);
        }
        this.flag = true;
      },
      getContent () {
        this.countryList = this.$store.getters.countryCode
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
      async getPlayerDetail () {
        let obj = { page: 1, pageSize: 10, iType: this.iType };
        const ret = await api.queryFileTemplate(obj);
        let fileData = ret.success && ret.data && ret.data.rows || [];
        const params = {
          id: this.orderID,
          iType: this.iType,
          activeName: this.activeName
        };
        if (params.id && params.iType) {
          const res = await api.queryPlayerDetail(params);
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
          if (newData.Birthday) {
            this.changeBirthday(newData.Birthday)
          }
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
              if (key === 'PlayerRole' && !value) {
                checkFlag = false;
                throw new Error('PlayerRole');
              }
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
              if (key === 'PlayerPos' && !value) {
                checkFlag = false;
                throw new Error('PlayerPos');
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
              if (key === 'AcctMatch' && !value) {
                checkFlag = false;
                throw new Error('AcctMatch');
              }
              if (key === 'KbType' && !value) {
                checkFlag = false;
                throw new Error('KbType');
              }
              if (key === 'KbDriver' && !value) {
                checkFlag = false;
                throw new Error('KbDriver');
              }
              if (key === 'MouseType' && !value) {
                checkFlag = false;
                throw new Error('MouseType');
              }
              if (key === 'IsMouseDriven' && !value) {
                checkFlag = false;
                throw new Error('IsMouseDriven');
              }
              if (key === 'TrousersSize' && !value) {
                checkFlag = false;
                throw new Error('TrousersSize');
              }
              if (key === 'CoatSize' && !value) {
                checkFlag = false;
                throw new Error('CoatSize');
              }
              if (key === 'TshirtSize' && !value) {
                checkFlag = false;
                throw new Error('TshirtSize');
              }
              if (key === 'ShoesSize' && !value) {
                checkFlag = false;
                throw new Error('ShoesSize');
              }
              if (key === 'Weight' && !value) {
                checkFlag = false;
                throw new Error('Weight');
              }
            });
          } catch (error) {
            if (error.message === 'PlayerRole') {
              return this.$message.error('请填写选手身份！');
            }
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
            if (error.message === 'PlayerPos') {
              return this.$message.error('请填写游戏位置！');
            }
            if (error.message === 'Birthday') {
              return this.$message.error('请填写生日！');
            }
            if (error.message === 'Country') {
              return this.$message.error('请选择国家地区！');
            }
            if (error.message === 'Weight') {
              return this.$message.error('请填写体重，单位是（公斤）')
            }
            if (error.message === 'ShoesSize') {
              return this.$message.error('请填写鞋码！')
            }
            if (error.message === 'TshirtSize') {
              this.$message.error('请填写T恤尺寸！');
            }
            if (error.message === 'CoatSize') {
              return this.$message.error('请填写外套尺寸！');
            }
            if (error.message === 'TrousersSize') {
              return this.$message.error('请选择裤子尺寸！');
            }
            if (error.message === 'AcctMatch') {
              return this.$message.error('请填写比赛服账号！');
            }
            if (error.message === 'KbDriver') {
              return this.$message.error('请填写键盘是否需要驱动！');
            }
            if (error.message === 'KbType') {
              return this.$message.error('请填写键盘型号！');
            }
            if (error.message === 'MouseType') {
              return this.$message.error('请填写鼠标型号！');
            }
            if (error.message === 'IsMouseDriven') {
              return this.$message.error('请填写鼠标是否需要驱动！');
            }
            if (error.message === 'ContractEndedAt') {
              return this.$message.error('请选择合同结束时间！');
            }
            if (error.message === 'ContractStartedAt') {
              return this.$message.error('请选择合同开始时间！');
            }
          }
          if (this.userTeam['1']) {
            if (this.age < 16) {
              checkFlag = false;
              return this.$message.error('年龄必须要大于16岁！')
            }
          }
          if (this.userTeam['2']) {
            if (this.age < 15) {
              checkFlag = false;
              return this.$message.error('年龄必须要大于15岁！')
            }
          }
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
          if (params.PlayerRole == '4') {
            params.oldPlayerID = this.oldPlayerID
          }
          if (this.iType === '170') {
            return modify(params).then(res => {
              if (res.success) {
                this.orderID = res.data.orderID;
                this.OuterID = res.data.id;
                const url = `/club/application?activeName=playering`
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
                const url = `/club/application?activeName=playering`
                this.$router.push({ path: url })
              } else {
                this.$message.error(res && es.message || '系统异常， 稍后再试！');
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
          let params = this.ruleForm;
          return saveEnd(params).then(end => {
            if (end.success) {
              const url = `/club/application?activeName=playerEnd`
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
          let params = this.ruleForm;
          params.Birthday = params.Birthday ? moment(params.Birthday).format('YYYY-MM-DD HH:mm:ss') : '';
          params.ContractStartedAt = params.ContractStartedAt ? moment(params.ContractStartedAt).format('YYYY-MM-DD HH:mm:ss') : '';
          params.ContractEndedAt = params.ContractEndedAt ? moment(params.ContractEndedAt).format('YYYY-MM-DD HH:mm:ss') : '';
          params.VisaExpiredAt = params.VisaExpiredAt ? moment(params.VisaExpiredAt).format('YYYY-MM-DD HH:mm:ss') : '';
          let checkFlag = true;
          params.Weight = Number(params.Weight);
          if (type == '-1') {
            params.isActive = -1;
          } else {
            params.isActive = 0;
          }
          if (this.orderID) {
            params.orderID = this.orderID;
          }
          if (this.OuterID) {
            params.id = this.OuterID;
          }
          if (params.PlayerRole == '4') {
            params.oldPlayerID = this.oldPlayerID
          }
          params.AuditStatus = 0;
          if (params.Country != '+86' && params.Country != '中国') {
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
                  const url = `/club/application?activeName=playerEnd`
                  this.$router.push({ path: url })
                }
              })
            }
            if (this.iType === '170' && type != '-1') {
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
                  this.showType = '2';
                  this.active = 2;
                  this.orderID = res.data.orderID;
                  this.OuterID = res.data.id;
                } else {
                  this.$message.error(res && res.message || '系统异常， 稍后再试！');
                }
              })
            }
          }
        }
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
      submitFile(type) {
        this.saveData(type);
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
      saveData(type) {
        let flag = true;
        let params = this.ruleForm;
        params.Weight = Number(params.Weight);
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
        if (params.PlayerRole == '4') {
          params.oldPlayerID = this.oldPlayerID
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
                const url = `/club/application?activeName=playerEnd`
                this.$router.push({ path: url })
              }
            })
          }
          if (this.iType === '170' && type != '-1') {
            return modify(params).then(res => {
              if (res.success) {
                if (type === 'next') {
                  const url = `/player/playerDetail?orderID=${res.data.orderID}&id=${res.data.id}&iType=${this.iType}&activeName=playering`
                  this.$router.push({ path: url })
                } else {
                  const url = `/club/application?activeName=playering`
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
                  const url = `/player/playerDetail?orderID=${res.data.orderID}&id=${res.data.id}&iType=${this.iType}&activeName=playering`
                  this.$router.push({ path: url })
                } else {
                  const url = `/club/application?activeName=playering`
                  this.$router.push({ path: url })
                }
              } else {
                this.$message.error(res && res.message || '系统异常， 稍后再试！');
              }
            })
          }
        }
      }
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
    margin-top: -10px;
  }
</style>



  


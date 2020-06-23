<template lang="html">
  <el-card>
    <div slot="header">新增模板</div>
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="260px" class="rule-Form">
      <el-form-item label="文件名称" prop="sName"
        :rules="[{ required: true, message: '必填', trigger: 'blur' }]">
        <el-input v-model="ruleForm.sName" placeholder="请选择" />
      </el-form-item>
      <el-form-item label="所属流程" prop="iType" 
        :rules="[{ required: true, message: '必填', trigger: 'blur' }]">
        <el-select multiple v-model="ruleForm.iType" placeholder="请选择">
          <el-option v-for="item in type_List"
            :key="item.value"
            :label="item.label"
            :value="item.value" />
        </el-select>
      </el-form-item>
      <el-form-item label="是否必选" prop="isNeed">
        <el-checkbox v-model="ruleForm.isNeed" />
      </el-form-item>
      <el-form-item label="文件要求" prop="sDesc">
        <el-input type="textarea" :rows="6" v-model="ruleForm.sDesc" placeholder="请选择" />
      </el-form-item>
      <el-form-item label="上传模板" prop="sFilePath">
        <el-upload
          class="upload-demo"
          :http-request="UploadFilePath"
          :before-remove="beforeRemove"
          :before-upload="onBeforeUpload"
          :limit="1"
          :on-remove="handleRemoveFilePath"
          :on-exceed="handleExceed"
          :accept="ACCEPT"
          :file-list="sFileList">
          <el-button size="small" type="primary">点击上传</el-button>
        </el-upload>
      </el-form-item>
      <el-form-item label="上传范例" prop="sDemoFilePath">
        <el-upload
          class="upload-demo"
          :http-request="UploadDemoFilePath"
          :before-remove="beforeRemove"
          :before-upload="onBeforeUpload"
          :limit="1"
          :on-remove="handleRemoveDemoFilePath"
          :on-exceed="handleExceed"
          :accept="ACCEPT"
          :file-list="sDemoFileList">
          <el-button size="small" type="primary">点击上传</el-button>
        </el-upload>
      </el-form-item>
      <div class="upload-tip">系统能接受的每个文件大小不超过20M,只能上传PDF,JPG,PNG文件三种格式</div>
      <el-form-item>
        <el-button type="primary" @click="handleSave">保 存</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
  import moment from 'moment';
  import { ACCEPT_TYPE, ITYPE_LIST } from '../utils/contants';
  import { save, queryById, update, fileUpload } from './service';
  import { getUrlParam } from '../../../../utils/index';
  export default {
    data() {
      return {
        flag: true,
        sFileList: [],
        sDemoFileList: [],
        ACCEPT: ACCEPT_TYPE,
        ruleForm: { 
          iType: [],
          isNeed: false
        },
        type_List: ITYPE_LIST,
      };
    },
    created() {
      this.getDetails();
    },
    methods: {
      getDetails () {
        const id = getUrlParam('id');
        if (id) {
          const params = { id };
          return queryById(params).then(res => {
            if (res.success) {
              const data = res.data || {};
              this.ruleForm = data;
              const sFilePath = data.sFilePath ? data.sFilePath : '';
              const sDemoFilePath = data.sDemoFilePath ? data.sDemoFilePath : '';
              this.ruleForm.iType = data.iType ? (data.iType).split(',') : '';
              this.ruleForm.isNeed = data.isNeed === 1 ? true : false;
              this.ruleForm.sFilePath = sFilePath;
              this.ruleForm.sDemoFilePath = sDemoFilePath;
              if (sFilePath) {
                this.sFileList = [
                  {
                    name: sFilePath,
                    url: sFilePath
                  }
                ]
              }
              if (sDemoFilePath) {
                this.sDemoFileList = [
                  {
                    name: sDemoFilePath,
                    url: sDemoFilePath
                  }
                ]
              }
            } else {
              this.ruleForm = {};
              this.$message.error(res && res.message || '系统异常， 稍后再试！');
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
      UploadFilePath(params) {
        let formData = new FormData();
        formData.append('file', params.file);
        formData.append('dir','admin');
        formData.append('protect',1);
        return fileUpload(formData).then(res => {
          if (res.success) {
            this.ruleForm.sFilePath = res.data;
          } else {
            this.$message.error('系统只接受指定的格式文档!');
          }
        })
      },
      UploadDemoFilePath(params) {
        let formData = new FormData();
        formData.append('file', params.file);
        formData.append('dir','admin');
        formData.append('protect',1);
        return fileUpload(formData).then(res => {
          if (res.success) {
            this.ruleForm.sDemoFilePath = res.data;
          } else {
            this.$message.error('系统只接受指定的格式文档!');
          }
        })
      },
      handleExceed(files, fileList) {
        this.$message.warning(`当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
      },
      handleRemoveFilePath(file, fileList) {
        if (file.status === 'success') {
          if (this.ruleForm.sFilePath === file.url) {
            this.ruleForm.sFilePath = ''
          }
        }
      },
      handleRemoveDemoFilePath(file, fileList) {
        if (file.status === 'success') {
          if (this.ruleForm.sDemoFilePath === file.url) {
            this.ruleForm.sDemoFilePath = ''
          }
        }
      },
      handleSave() {
        let flag = true;
        let params = this.ruleForm;
        if (!params.sName) {
          flag = false;
          return this.$message.error('文件名称必填！')
        }
        if (!params.iType) {
          flag = false;
          return this.$message.error('所属流程必填！')
        }
        if (this.ruleForm.isNeed === true) {
          params.isNeed = 1
        } else {
          params.isNeed = 0
        }
        if (params.isNeed === 1) {
          this.ruleForm.isNeed = true;
        }
        params.iType = this.ruleForm.iType.length ? (this.ruleForm.iType).join(',') : '';
        const id = getUrlParam('id');
        if (flag) {
          if (id) {
            params.id = Number(id);
            return update(params).then((res) => {
              if (res.success) {
                this.$router.push({ path: '/eco/templateConfig' });
              } else {
                this.$message.console.error('修改失败！');
              }
            })
          } else {
            return save(params).then((res) => {
              if (res.success) {
                this.$router.push({ path: '/eco/templateConfig' });
              } else {
                this.$message.console.error('新增失败！');
              }
            });
          }
        }
      }
    }
  }
</script>
<style scope>
  .rule-Form .el-input {
    width: 60%;
  }
  .rule-Form .el-select {
    width: 60%;
  }
  .rule-Form .el-textarea {
    width: 60%;
  }
  .rule-Form .el-select .el-input {
    width: 100%;
  }
  .rule-Form .upload-demo {
    width: 60%;
  }
  .upload-tip {
    text-align: right;
    color: #666;
    font-size: 14px;
    margin-top: 20px;
    margin-bottom: 20px;
  }
</style>

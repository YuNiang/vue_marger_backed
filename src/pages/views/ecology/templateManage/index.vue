<template lang="html">
  <el-card>
    <div slot="header">模板列表</div>
    <el-form :inline="true" :model="form">
      <el-form-item label="所属流程" prop="iType">
        <el-select v-model="params.iType" placeholder="请选择">
          <el-option v-for="item in type_List" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleSearch">搜 索</el-button>
      </el-form-item>
      <el-form-item style="float: right">
        <el-button type="primary" @click="handleAdd">新 增</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column prop="sName" label="文件名称" width="120" />
      <el-table-column prop="iType" label="所属流程" :formatter="itypeRender" />
      <el-table-column prop="sDesc" label="文件要求" />
      <el-table-column prop="isNeed" label="是否必选" :formatter="isNeedRender" width="100" />
      <el-table-column prop="sFilePath" label="模板">
        <template slot-scope="scope">
          <el-upload disabled :file-list="scope.row.sFilePathList">
            <el-button type="text" @click="handeleModel(scope.row)">下载模板</el-button>
          </el-upload>
        </template>
      </el-table-column>
      <el-table-column prop="sDemoFilePath" label="范例" align="center">
        <template slot-scope="scope">
          <el-upload disabled :file-list="scope.row.sDemoFilePathList">
            <el-button type="text" @click="handleExample(scope.row)">下载范例</el-button>
          </el-upload>
        </template>
      </el-table-column>
      <el-table-column prop="expireDate" label="操作" width="100" align="center">
        <template slot-scope="scope">
          <el-button @click="handleUpdate(scope.row)" type="text" size="small">修改</el-button>
          <el-button @click="handleDel(scope.row)" type="text" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination v-if="count > 0"
      layout="prev, pager, next"
      @current-change="pagination"
      :total="count" />
  </el-card>
</template>

<script>
import { queryList, isStatus, del, preview } from './service'
import { ITYPE_LIST } from '../utils/contants';

export default {
  data() {
    return {
      count: 0,
      params: { page: 1, pageSize: 10, iType: '' },
      tableData: [],
      type_List: ITYPE_LIST
    }
  },
  created() {
    this.getFileList(this.clearProps(this.params));
  },
  methods: {
    pagination(page) {
      this.params.page = page;
      this.getFileList(this.params);
    },
    clearProps (data) {
      const pdata = {};
      Object.keys(data).forEach(p => {
        if (data[p]) {
          pdata[p] = data[p];
        }
      })
      return pdata;
    },
    handleUpdate(row) {
      this.$router.push(`/auditing/tempAdd?id=${row.id}`)
    },
    handleDel(row) {
      this.$confirm('确定要删除?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const params = { id: row.id };
        return del(params).then(res => {
          if (res.success) {
            this.getFileList(this.clearProps(this.params));
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
          }
        })
      }).catch(() => {});
    },
    handleExample (row) {
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
        file: row.sFilePath
      };
      return preview(params).then(res => {
        if (res.success) {
          window.open(res.data)
        }
      })
    },
    itypeRender(row) {
      const arr = (row && row.iType) ? row.iType.split(',') : '';
      let text = [];
      arr.forEach(i => {
        switch (i) {
          case '100': text.push('选手注册'); break;
          case '110': text.push('选手解约'); break;
          case '120': text.push('选手上调'); break;
          case '130': text.push('选手转会'); break;
          case '140': text.push('选手下放'); break;
          case '150': text.push('教练注册'); break;
          case '160': text.push('教练解约'); break;
          case '170': text.push('选手修改'); break;
          case '180': text.push('选手借调'); break;
          case '190': text.push('选手返还'); break;
          case '200': text.push('教练修改'); break;
          default: text = '-';
        }
      })
      return text.join(',');
    },
    isNeedRender(row) { return row.isNeed === 1 ? `是` : `否` },
    handleChecked(row) {
      if (!row.checked) {
        this.$confirm('确认要删除启用模板吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          const params = { id: row.id };
          return isStatus(params).then(res => {
            if (res.success) {
              this.$message.success('启用模板成功!')
              this.getFileList(this.clearProps(this.params));
            }
          })
        }).catch(() => {
          this.tableData.forEach(item => {
            if (item.id === row.id) {
              item.checked = true;
            }
          })
        });
      }
    },
    handleSearch() {
      this.getFileList(this.clearProps(this.params));
    },
    getFileList(params) {
      return queryList(params).then(res => {
        this.tableData = [];
        if (res.success) {
          res.data
          && res.data.rows.length
          && res.data.rows.forEach(item => {
            if (item.sFilePath) {
              let str = item.sFilePath;
              item.sFilePathList = [
                {
                  name: str.substring(6),
                  url: item.sFilePath
                }
              ]
            }
            if (item.sDemoFilePath) {
              let str = item.sDemoFilePath;
              item.sDemoFilePathList = [
                {
                  name: str.substring(6),
                  url: item.sDemoFilePath
                }
              ]
            }
          })
          this.tableData = res.data.rows || []
          this.count = Number(res.data.count);
        } else {
          this.$message.error(res && res.message || '系统异常， 稍后再试！');
        }
      });
    },
    handleAdd() {
      this.$router.push({ path: `/auditing/tempAdd` })
    },
  }
}
</script>
<style>
  .el-checkbox__input.is-checked+.el-checkbox__label {
    font-size: 12px;
  }
  .el-button--text {
    font-size: 12px;
  }
  .button-warp {
    margin-top: 10px;
    margin-bottom: 10px;
  }
  .upload-demo {
    display: inline;
  }
  .preview-demo {
    display: inline;
    margin-right: 20px;
  }
  .el-pagination {
    text-align: right;
  }
</style>

<template lang="html">
  <el-card>
    <div slot="header">赛事时间配置模板</div>
    <el-tabs v-model="activeName" type="card" @tab-click="handleTab">
      <!-- <el-tab-pane label="LPL常规赛" name="1">
        <el-form :inline="true" :model="regularLPL" ref="regularLPL">
          <el-form-item label="开始时间">
            <el-date-picker
              @input="handleRegularLPLStartAt"
              v-model="regularLPLStartAt"
              type="datetime"
              placeholder="选择开始时间" />
          </el-form-item>
          <el-form-item label="结束时间">
            <el-date-picker
              v-model="regularLPLEndAt"
              type="datetime"
              @input="handleRegularLPLEndAt"
              placeholder="选择结束时间" />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="handleRegularLPLSave('regularLPL')">提交</el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane> -->

      <!-- <el-tab-pane label="LPL季后赛" name="2">
        <el-form :model="playoffLPL" :inline="true" ref="playoffLPL">
          <el-form-item label="开始时间">
            <el-date-picker
              @input="handlePlayoffLPLStartAt"
              v-model="playoffLPLStartAt"
              type="datetime"
              placeholder="选择开始时间" />
          </el-form-item>
          <el-form-item label="结束时间">
            <el-date-picker
              @input="handlePlayoffLPLEndAt"
              v-model="playoffLPLEndAt"
              type="datetime"
              placeholder="选择结束时间" />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="handlePlayoffLPLSave('playoffLPL')">提交</el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane> -->

      <!-- <el-tab-pane label="LDL常规赛" name="3">
        <el-form :model="regularLDL" :inline="true" ref="regularLDL">
          <el-form-item label="开始时间">
            <el-date-picker
              @input="handleRegularLDLStartA"
              v-model="regularLDLStartAt"
              type="datetime"
              placeholder="选择开始时间" />
          </el-form-item>
          <el-form-item label="结束时间">
            <el-date-picker
              @input="handleRegularLDLEndAt"
              v-model="regularLDLEndAt"
              type="datetime"
              placeholder="选择结束时间" />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="handleRegularLDLSave('regularLDL')">提交</el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane> -->

      <!-- <el-tab-pane label="LDL季后赛" name="4">
        <el-form :model="playoffLDL" :inline="true" ref="playoffLDL">
          <el-form-item label="开始时间">
            <el-date-picker
              @input="handlePlayoffLDLStartAt"
              v-model="playoffLDLStartAt"
              type="datetime"
              placeholder="选择开始日期" />
          </el-form-item>
          <el-form-item label="结束时间">
            <el-date-picker
              @input="handlePlayoffLDLEndAt"
              v-model="playoffLDLEndAt"
              type="datetime"
              placeholder="选择结束时间" />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="handlePlayoffLDLSave('playoffLDL')">提交</el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane> -->

      <el-tab-pane label="转会时间" name="5">
        <el-form :model="transfer" :inline="true" ref="transfer">
          <el-form-item label="开始时间">
            <el-date-picker
              @input="handleTrStartAt"
              v-model="transferStartAt"
              type="datetime"
              placeholder="选择开始日期" />
          </el-form-item>
          <el-form-item label="结束时间">
            <el-date-picker
              @input="handleTrEndAt"
              v-model="transferEndAt"
              type="datetime"
              placeholder="选择结束时间" />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="handleTransferSave('transfer')">提交</el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane>
    </el-tabs>
  </el-card>
</template>

<script>
  import { queryList, saveMathConfigTime } from './service'
  export default {
    data() {
      return {
        activeName: '5',
        playoffLPLEndAt: '',
        regularLPLStartAt: '',
        regularLPLEndAt: '',
        regularLDLStartAt: '',
        regularLDLEndAt: '',
        playoffLPLStartAt: '',
        playoffLPLEnd: '',
        playoffLDLStartAt: '',
        transferStartAt: '',
        transferEndAt: '',
        playoffLDLEndAt: '',
      }
    },
    created() {
      this.getTabsList();
    },
    methods: {
      handleRegularLPLSave(formName) {
        const params = {
          dtLplRegularStart: this.regularLPLStartAt,
          dtLplRegularEnd: this.regularLPLEndAt
        };
        return saveMathConfigTime(params).then(res => {
          if (res.success) {
            this.$message.success('LPL季后赛时间配置成功！');
          }
        })
      },
      handlePlayoffLPLSave(formName) {
        const params = {
          dtLplPlayoffStart: this.playoffLPLStartAt,
          dtLplPlayoffEnd: this.playoffLPLEndAt
        };
        return saveMathConfigTime(params).then(res => {
          if (res.success) {
            this.$message.success('LPL季后赛时间配置成功！');
          }
        })
      },
      handleTransferSave(formName) {
        const params = {
          dtTransferStart: this.transferStartAt,
          dtTransferEnd: this.transferEndAt
        };
        return saveMathConfigTime(params).then(res => {
          if (res.success) {
            this.$message.success('转会时间配置成功！');
          }
        })
      },
      handlePlayoffLDLSave(formName) {
        const params = {
          dtLdlPlayoffStart: this.playoffLDLStartAt,
          dtLdlPlayoffEnd: this.playoffLDLEndAt
        };
        return saveMathConfigTime(params).then(res => {
          if (res.success) {
            this.$message.success('LDL季后赛时间配置成功！');
          }
        })
      },
      handleRegularLDLSave(formName) {
        const params = {
          dtLdlRegularStart: this.regularLDLStartAt,
          dtLdlRegularEnd: this.regularLDLEndAt
        };
        return saveMathConfigTime(params).then(res => {
          if (res.success) {
            this.$message.success('LDL常规赛时间配置成功！');
          }
        })
      },
      handlePlayoffLPLStartAt(val) {
        this.$set(this, 'playoffLPLStartAt', val);
      },
      handlePlayoffLPLEndAt(val) {
        this.$set(this, 'playoffLPLEndAt', val);
      },
      handleRegularLDLStartAt(val) {
        this.$set(this, 'regularLDLStartAt', val);
      },
      handleRegularLDLEndAt(val) {
        this.$set(this, 'regularLDLEndAt', val);
      },
      handleTrStartAt(val) {
        this.$set(this, 'transferStartAt', val);
      },
      handlePlayoffLDLStartAt(val) {
         this.$set(this, 'playoffLDLStartAt', val);
      },
      handlePlayoffLDLEndAt(val) {
        this.$set(this, 'playoffLDLEndAt', val);
      },
      handleTrEndAt(val) {
        this.$set(this, 'transferEndAt', val);
      },
      handleRegularLPLStartAt(val) {
        this.$set(this, 'regularLPLStartAt', val)
      },
      handleRegularLPLEndAt(val) {
        this.$set(this, 'regularLPLEndAt', val)
      },
      handleTab(tab, event) {
        if (tab.name === "1") {
          this.activeName = '1'
        };
        if (tab.name === "2") {
          this.activeName = '2'
        }
        if (tab.name === "3") {
          this.activeName = '3'
        }
        if (tab.name === "4") {
          this.activeName = '4'
        }
        if (tab.name === "5") {
          this.activeName = '5'
        }
      },
      getTabsList(params) {
        return queryList(params).then(res => {
          if (res.success) {
            let regularLPL = {}; // LPL常规赛
            let regularLDL = {}; // LDL常规赛
            let playoffLPL = {}; // LPL季后赛
            let playoffLDL = {}; // LDL季后赛
            let transfer = {}; // 转会
            res.data.forEach(item => {
              if (item.Desc === 'LPL常规赛开始时间') {
                regularLPL.StartAt = item.extValue;
              }
              if (item.Desc === 'LPL常规赛结束时间') {
                regularLPL.EndAt = item.extValue;
              }
              if (item.Desc === 'LPL季后赛开始时间') {
                playoffLPL.StartAt = item.extValue;
              }
              if (item.Desc === 'LPL季后赛结束时间') {
                playoffLPL.EndAt = item.extValue;
              }
              if (item.Desc === '转会开始时间') {
                transfer.StartAt = item.extValue;
              }
              if (item.Desc === '转会结束时间') {
                transfer.EndAt = item.extValue;
              }
              if (item.Desc === 'LDL季后赛开始时间') {
                playoffLDL.StartAt = item.extValue;
              }
              if (item.Desc === 'LDL季后赛结束时间') {
                playoffLDL.EndAt = item.extValue;
              }
              if (item.Desc === 'LDL常规赛开始时间') {
                regularLDL.StartAt = item.extValue;
              }
              if (item.Desc === 'LDL常规赛结束时间') {
                regularLDL.EndAt = item.extValue;
              }
              this.transferStartAt = transfer.StartAt;
              this.transferEndAt = transfer.EndAt;
              this.regularLPLStartAt = regularLPL.StartAt;
              this.regularLPLEndAt = regularLPL.EndAt;
              this.regularLDLStartAt = regularLDL.StartAt;
              this.regularLDLEndAt = regularLDL.EndAt;
              this.playoffLPLStartAt = playoffLPL.StartAt;
              this.playoffLPLEndAt = playoffLPL.EndAt;
              this.playoffLDLStartAt = playoffLDL.StartAt;
              this.playoffLDLEndAt = playoffLDL.EndAt;
            });
          } else {
            this.$message.error(res.error.message || '系统异常，请稍后再试！')
          }
        });
      }
    }
  }
</script>

<style>
.el-tab-pane {
  margin-top: 40px;
}
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
</style>

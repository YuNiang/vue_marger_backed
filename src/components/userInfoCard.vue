<template>
  <div class="popinfo">
    <div class="popinfo-item">姓名：{{ realname || '--' }} <i class="el-icon-tickets" v-clipboard="realname" @success="handleSuccess" @error="handleError"></i></div>
    <div class="popinfo-item">手机号：{{ contact || '--' }} <i class="el-icon-tickets" v-clipboard="contact" @success="handleSuccess" @error="handleError"></i></div>
    <div class="popinfo-item">银行：{{ bank.bankName || '--' }} <i class="el-icon-tickets" v-clipboard="bank.bankName" @success="handleSuccess" @error="handleError"></i></div>
    <div class="popinfo-item">卡号：{{ bank.accountNumber || '--' }} <i class="el-icon-tickets" v-clipboard="bank.accountNumber" @success="handleSuccess" @error="handleError"></i></div>
    <div class="popinfo-item">支行：{{ bank.branchName || '--' }} <i class="el-icon-tickets" v-clipboard="bank.branchName" @success="handleSuccess" @error="handleError"></i></div>
  </div>
</template>

<script>
export default {
  name: 'UserInfoCard',

  props: {
    realname: String,
    contact: String,
    bank: Object
  },

  methods: {
    handleSuccess () {
      this.$message.success('复制成功')
    },
    handleError () {
      this.$message.error('复制失败')
    }
  }
}
</script>

<style lang="less" scoped>
.popinfo {
  &-item {
    font-size: 12px;
    line-height: 30px;
  }
  .el-icon-tickets {
    cursor: pointer;

    &:active {
      color: #67C23A;
    }
  }
}
</style>

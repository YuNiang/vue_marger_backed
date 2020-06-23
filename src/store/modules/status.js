import * as _ from 'lodash'

const state = {
  orderDirection: {
    descending: 'DESC',
    ascending: 'ASC'
  },
  fundStatus: {
    deposit: '充值',
    withdraw: '提现',
    tokenDistribute: '分发代币',
    tokenDistributeUsable: '分发代币(可用)',
    tokenDistributeFrozen: '分发代币(冻结)',
    tokenReward: '代币奖励',
    tokenPunish: '代币惩罚',
    unlockToken: '代币解锁',
    unlockTokenByLogin: '代币解锁(签到)',
    buy: '买入',
    sell: '卖出',
    buyLuck: '参与幸运购',
    buyFast: '快速买入',
    sellFast: '快速卖出',
    fee: '手续费',
    rollback: '回滚',
    otcBuy: 'OTC买入',
    otcSell: 'OTC出售',
    proxyDeposit: '代理充值',
    proxyDeduct: '代理扣除',
    buyVip: '购买会员'
  },
  icoStatus: {
    0: '认购中',
    1: '认购成功',
    2: '认购失败',
    3: '认购取消'
  },
  rollbackStatus: {
    0: '未开始',
    1: '成功',
    2: '取消',
    3: '失败'
  },
  activityStatus: {
    0: '未开始',
    1: '成功',
    2: '失败'
  },
  merchantApplyStatus: {
    0: '待审核',
    1: '通过',
    2: '不通过'
  },

  periodType: {
    day: '天',
    week: '周',
    month: '月'
  },
  fundGoodsType: {
    1: '普通仓',
    2: '体验仓'
  },
  fundGoodsStatus: {
    0: '未上架',
    1: '已上架',
    2: '已下架'
  },
  fundGoodsStatusColor: {
    0: '',
    1: 'success',
    2: 'danger'
  },

  fundGoodsScheduleStatus: {
    0: '在售',
    1: '停售',
    2: '售罄',
    3: '未售罄'
  },
  fundGoodsScheduleStatusColor: {
    0: 'success',
    1: 'danger',
    2: 'info',
    3: ''
  },

  fundGoodsOrder: {
    status: ['排队中', '已生效', '到期结束', '中途退出'],
    color: ['', 'success', 'info', 'danger']
  },
  fundGoodsSchedule: {
    status: ['在售', '停售', '售罄', '未售罄'],
    color: ['success', 'danger', 'info', 'info']
  },
  userType: {
    0: '白银节点',
    1: '黄金节点',
    2: '铂金节点',
    3: '钻石节点'
  },

  scratch: {
    status: ['未上架', '上架', '下架'],
    color: ['', 'success', 'danger']
  },
  scratchOrder: {
    status: ['未中奖', '中奖'],
    color: ['', 'success']
  },
  scratchMode: {
    1: '12宫格(4*3)',
    2: '幸运数字(4*2)',
    3: '幸运数字(1*2*3*4)',
    4: '幸运数字(4*4)'
  },
  kyc: {
    status: ['待审核', '审核通过', '审核未通过'],
    color: ['', 'success', 'danger']
  },
  recharge: {
    status: ['待完成', '已完成', '已领取', '过期失效'],
    color: ['info', '', 'success', 'danger']
  },
  topic: {
    status: ['未发布', '已上架', '已下架'],
    color: ['', 'success', 'danger']
  },

  otcStatus: {
    0: '委托中',
    1: '已完成',
    2: '已取消',
    3: '部分成交已取消'
  },
  otcStatusColor: {
    0: '',
    1: 'success',
    2: 'info',
    3: 'warning'
  },
  otcOrderStatus: {
    0: '待支付',
    1: '已支付',
    2: '确认收款',
    3: '已完成',
    4: '已取消',
    5: '申诉'
  },
  otcOrderStatusColor: {
    0: '',
    1: 'success',
    2: 'success',
    3: 'success',
    4: 'info',
    5: 'danger'
  },
  payWaysStatus: {
    unionPay: '银行卡',
    aliPay: '支付宝',
    weChat: '微信'
  },
  payWaysColor: {
    unionPay: 'info',
    aliPay: 'primary',
    weChat: 'success'
  },
  loanGoodsStatus: {
    0: '未上架',
    1: '已上架',
    2: '已下架'
  },
  loanGoodsStatusColor: {
    0: '',
    1: 'success',
    2: 'danger'
  },
  loanOrderStatus: {
    0: '未生效',
    1: '生效中',
    2: '待结算',
    3: '已结束'
  },
  loanOrderStatusColor: {
    0: '',
    1: '',
    2: '',
    3: 'success'
  },
  loanLogStatus: {
    0: '未借出',
    1: '已借出',
    2: '已赎回'
  },
  loanLogStatusColor: {
    0: '',
    1: 'success',
    2: ''
  },
  mineLogStatus: {
    0: '未借出',
    1: '已借出',
    2: '已赎回'
  },
  mineLogStatusColor: {
    0: '',
    1: 'success',
    2: ''
  },
  mineOrderStatus: {
    0: '未生效',
    1: '生效中',
    2: '待结算',
    3: '已结束'
  },
  mineOrderStatusColor: {
    0: 'info',
    1: '',
    2: '',
    3: 'success'
  },
  mineProfitLogStatus: {
    0: '未发放',
    1: '已发放',
  },
  mineProfitLogStatusColor: {
    0: '',
    1: 'success'
  },
}

let getters = {}

_.map(state, (val, key) => {
  getters[key] = state => state[key]
})

export default {
  state,
  getters
}

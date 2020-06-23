import { fetch, API, MAINAPI } from '@/utils/fetch'

// 后台快速登录
export function PostLoginUsername (params) {
  return fetch({
    url: API + '/account/' + params + '/login',
    method: 'POST'
  })
}

// 查询所有用户列表
export function GetUserList (params) {
  return fetch({
    url: API + '/account',
    method: 'GET',
    params: params
  })
}

// 设置用户是否为VIP
export function PostUserVipLevel (params) {
  return fetch({
    url: API + '/account/' + params.username + '/setVipLevel',
    method: 'POST',
    data: params.data
  })
}

// 按条件搜索用户
export function GetUserSearch (params) {
  return fetch({
    url: API + '/account/search',
    method: 'GET',
    params: params
  })
}

// 根据ID查询用户
export function GetUserById (params) {
  return fetch({
    url: API + '/account/' + params,
    method: 'GET'
  })
}

// 根据ID查询用户邀请列表
export function GetUserInviteeById (params) {
  return fetch({
    url: API + '/account/' + params.userId + '/invitee',
    method: 'GET',
    params: params.data
  })
}

// 创建用户
export function PostCreateUser (params) {
  return fetch({
    url: API + '/account',
    method: 'POST',
    data: params
  })
}

// 系统发放奖励
export function PostSystemBonus (params) {
  return fetch({
    url: API + '/systemBonus',
    method: 'POST',
    data: params
  })
}
const st_api = MAINAPI
// 获取所有交易对
export function GetMarkets () {
  return fetch({
    url: st_api + '/exchange/market/pair/all',
    method: 'GET'
  }, false)
}

// 获取所有币种
export function GetCoins () {
  return fetch({
    url: st_api + '/exchange/market/coin/all',
    method: 'GET'
  }, false)
}

// 获取商户申请列表
export function GetMerchant (params) {
  return fetch({
    url: API + '/merchantApply',
    method: 'GET',
    params: params
  })
}
// 商户申请审核成功
export function PostMerchantSuccess (params) {
  return fetch({
    url: API + '/merchantApply/' + params + '/success',
    method: 'POST'
  })
}
// 商户申请审核失败
export function PostMerchantFailed (params) {
  return fetch({
    url: API + '/merchantApply/' + params.id + '/failed',
    method: 'POST',
    data: params.data
  })
}

export function PostFreezeAccount (params) {
  return fetch({
    url: API + '/account/' + params + '/freeze',
    method: 'POST'
  })
}

export function PostUnfreezeAccount (params) {
  return fetch({
    url: API + '/account/' + params + '/unfreeze',
    method: 'POST'
  })
}

// 设置用户等级
export function PostSetMarketingMasterLevel (params) {
  return fetch({
    url: API + '/account/' + params.username + '/setMarketingMasterLevel',
    method: 'POST',
    data: params.data
  })
}
// 获取超级节点用户列表
export function GetRootAccount (params) {
  return fetch({
    url: API + '/account/root',
    method: 'GET',
    params: params
  })
}
// 设置超级节点
export function PostSetIsRoot (params) {
  return fetch({
    url: API + '/account/' + params.username + '/setIsRoot',
    method: 'POST',
    data: params.data
  })
}
// 统计超级节点
export function GetSRootAccount (params) {
  return fetch({
    url: API + '/statistics/root/' + params + '/account',
    method: 'GET'
  })
}
// 统计超级节点
export function GetSRootAccountPeriod (params) {
  return fetch({
    url: API + '/statistics/root/' + params.rootId + '/account/' + params.period,
    method: 'GET',
    params: params.data
  })
}
// 统计超级节点
export function GetSRootFundAccount (params) {
  return fetch({
    url: API + '/statistics/rootFund/' + params,
    method: 'GET'
  })
}
// 统计超级节点
export function GetSRootFundAccountPeriod (params) {
  return fetch({
    url: API + '/statistics/rootFund/' + params.rootId + '/' + params.period,
    method: 'GET',
    params: params.data
  })
}
// 分红仓金额
export function GetFundGoodsOrderUserStatistics (params) {
  return fetch({
    url: API + '/fundGoodsOrder/user/' + params + '/statistics',
    method: 'GET'
  })
}

// 查询用户注册日志
export function GetUserRegisterLog (params) {
  return fetch({
    url: API + '/userRegisterLog',
    method: 'GET',
    params: params
  })
}

import { fetch, API } from '@/utils/fetch';

export let api = {
  queryPlayerDetail:function(params) {
    return fetch({
      url: `${API}/tb_player_info/queryOrderWithAllData`,
      method: 'GET',
      params
    })
  },
  // 查询 id
  queryById:function (params) {
    return fetch({
      url: `${API}/tb_player_info/queryById`,
      method: 'GET',
      params
    })
  },
  // 查询当前战队
  queryLoginUserTeam:function (params) {
    return fetch({
      url: `${API}/admin_user/queryLoginUserTeam`,
      method: 'GET',
      params
    })
  },
  // 查询模版数据
  queryFileTemplate:function (params) {
    return fetch({
      url: API + `/file_template`,
      method: 'GET',
      params
    })
  },
  // 查询详情数据
  queryDetail:function (params) {
    return fetch({
      url: `${API}/tb_player_info/queryOrderWithAllData`,
      method: 'GET',
      params
    })
  },
  queryTeamCount:function(params) {
    return fetch({
      url: `${API}/tb_player_info/queryTeamCount`,
      method: 'GET',
      params
    })
  },
  querySkillPoint:function(params) {
    return fetch({
      url: `${API}/tb_player_info/querySkillPoint`,
      method: 'GET',
      params
    })
  },
  queryList:function (params) {
    return fetch({
      url:  `${API}/tb_player_info/query`,
      method: 'GET',
      params
    })
  },
  saveBackByAdmin:function (params) {
    return fetch({
      url:  `${API}/tb_player_info/saveBackByAdmin`,
      method: 'POST',
      data: params
    })
  },
  // 历史操作记录
  queryHist:function (params) {
    return fetch({
      url: `${API}/audit_order/uesrOrderList`,
      method: 'GET',
      params
    })
  },
  // 导出
  queryExcel:function(params) {
    return fetch({
      url: `${API}/tb_player_info/queryExcel`,
      method: 'GET',
      responseType: 'blob',
      params
    })
  },
  // 返还
  saveBack:function (params) {
    return fetch({
      url: `${API}/tb_player_info/saveBack`,
      method: 'POST',
      data: params
    })
  },
  // 判断是否已经有工单的存在
  queryAuditingByOuterId:function (params) {
    return fetch({
      url: `${API}/audit_order/queryAuditingByOuterId`,
      method: 'GET',
      params
    })
  },
  // 转会时间
  queryTransferTime:function (params) {
    return fetch({
      url: `${API}/tb_player_info/queryTransferTime`,
      method: 'GET',
      params
    })
  },

}

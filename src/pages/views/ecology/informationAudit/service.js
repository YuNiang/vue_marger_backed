import { fetch, API } from '@/utils/fetch';

// 查询
// export function queryTableList (params) {
//   return fetch({
//     url: `${API}/audit_order/query`,
//     method: 'GET',
//     params
//   })
// };

// 审核 （通过）/（不通过）
export function isAudit (params) {
  return fetch({
    url: `${API}/audit_order/audit`,
    method: 'POST',
    data: params
  })
};

export function queryTempList (params) {
  return fetch({
    url: API + `/file_template`,
    method: 'GET',
    params
  })
};

export function queryOrderById (params) {
  return fetch({
    url: `${API}/audit_order/queryById`,
    method: 'GET',
    params
  })
};

export function fileUpload (params) {
  return fetch({
    url: `${API}/file/upload`,
    method: 'POST',
    data: params
  })
};

export function queryHist (params) {
  return fetch({
    url: `${API}/audit_order/uesrOrderList`,
    method: 'GET',
    params
  })
};


export function adoptAfterSave (params) {
  return fetch({
    url: `${API}/audit_order/adoptAfterSave`,
    method: 'POST',
    data: params
  })
};

export function queryCoachDetail (params) {
  return fetch({
    url: API + `/tb_coach_info/queryById`,
    method: 'GET',
    params
  })
};


export function preview (params) {
  return fetch({
    url: `${API}/file/generationURL`,
    method: 'POST',
    data: params
  })
};

// 查询
export function queryList (params) {
  return fetch({
    url:  `${API}/tb_player_info/queryOrderWithAllData`,
    method: 'GET',
    params
  })
};

// check该战队的人数。
// check 身份证，如果没用，check 护照。
export function queryTeamIn (params) {
  return fetch({
    url:  `${API}/tb_player_info/query`,
    method: 'GET',
    params
  })
};


// 上调下放不可以违反的数量规则：每个战队最少6人，最多10人
export function queryTeamCount (params) {
  return fetch({
    url:  `${API}/tb_player_info/queryTeamCount`,
    method: 'GET',
    params
  })
};

// 俱乐部数据
export function queryClubList (params) {
  return fetch({
    url: `${API}/ec_team_info/query`,
    method: 'GET',
    params
  })
};

export function queryLog (params) {
  return fetch({
    url:  `${API}/oper_log/query`,
    method: 'GET',
    params
  })
};





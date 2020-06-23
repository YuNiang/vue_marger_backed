import { fetch, API } from '@/utils/fetch';

export function queryDetail (params) {
  return fetch({
    url: API + `/tb_coach_info/queryById`,
    method: 'GET',
    params
  })
};


export function queryTempList (params) {
  return fetch({
    url: API + `/file_template`,
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

export function preview (params) {
  return fetch({
    url: `${API}/file/generationURL`,
    method: 'POST',
    data: params
  })
};
export function queryTeamCount(params) {
  return fetch({
    url: `${API}/tb_player_info/queryTeamCount`,
    method: 'GET',
    params
  })
};

// 审核 （通过）/（不通过）
export function isAudit (params) {
  return fetch({
    url: `${API}/audit_order/audit`,
    method: 'POST',
    data: params
  })
};

// 查询
export function queryById (params) {
  return fetch({
    url:  `${API}/tb_player_info/queryOrderWithAllData`,
    method: 'GET',
    params
  })
};

export function updateOrder (params) {
  return fetch({
    url:  `${API}/audit_order/updateOrder`,
    method: 'POST',
    data: params
  })
};

export function saveEnd (params) {
  return fetch({
    url: `${API}/tb_coach_info/saveEnd`,
    method: 'POST',
    data: params
  })
};



import { fetch, API } from '@/utils/fetch';
// 保存基本信息
export function save (params) {
  return fetch({
    url: API + `/tb_player_info/save`,
    method: 'POST',
    data: params
  })
};

// 修改基本信息
export function modify (params) {
  return fetch({
    url: API + `/tb_player_info/update`,
    method: 'POST',
    data: params
  })
};

export function saveUpdateFile (params) {
  return fetch({
    url: `${API}/tb_player_info/updateFile`,
    method: 'POST',
    data: params
  })
};



export function saveFile(params) {
  return fetch({
    url: API + `/tb_player_info/saveFile`,
    method: 'POST',
    data: params
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

// 查询是否有转会的人
export function isTransfer (params) {
  return fetch({
    url: `${API}/tb_player_info_action/query`,
    method: 'GET',
    params
  })
};


export function saveEnd (params) {
  return fetch({
    url: `${API}/tb_player_info/saveEnd`,
    method: 'POST',
    data: params
  })
};






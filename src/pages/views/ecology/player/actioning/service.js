import { fetch, API } from '@/utils/fetch';

// 查询
export function queryTempList (params) {
  return fetch({
    url: API + `/file_template`,
    method: 'GET',
    params
  })
};

export function queryOrderWithAllData (params) {
  return fetch({
    url:  `${API}/tb_player_info/queryOrderWithAllData`,
    method: 'GET',
    params
  })
};

export function queryById (params) {
  return fetch({
    url: `${API}/tb_player_info/queryById`,
    method: 'GET',
    params
  })
};

// 教练解约 和 选手解约
export function saveRescission (params) {
  return fetch({
    url: `${API}/tb_player_info/saveRescission`,
    method: 'POST',
    data: params
  })
};

// 上调
export function saveUp (params) {
  return fetch({
    url: `${API}/tb_player_info/saveUp`,
    method: 'POST',
    data: params
  })
};

// 下放
export function saveDown (params) {
  return fetch({
    url: `${API}/tb_player_info/saveDown`,
    method: 'POST',
    data: params
  })
};

// 转会
export function saveTransfer (params) {
  return fetch({
    url:  `${API}/tb_player_info/saveTransfer`,
    method: 'POST',
    data: params
  })
};

// 借调
export function saveBorrow (params) {
  return fetch({
    url: `${API}/tb_player_info/saveBorrow`,
    method: 'POST',
    data: params
  })
};

// 过滤选手姓名
export function filterPlayer (params) {
  return fetch({
    url: `${API}/tb_player_info/filterPlayer`,
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

export function saveReturn (params) {
  return fetch({
    url: `${API}/tb_player_info/saveBack`,
    method: 'POST',
    data: params
  })
};

export function queryClubList (params) {
  return fetch({
    url: `${API}/ec_team_info/query`,
    method: 'GET',
    params
  })
};

export function playerSaveEnd (params) {
  return fetch({
    url: `${API}/tb_player_info/saveEnd`,
    method: 'POST',
    data: params
  })
};

export function coachSaveEnd (params) {
  return fetch({
    url: `${API}/tb_coach_info/saveEnd`,
    method: 'POST',
    data: params
  })
};


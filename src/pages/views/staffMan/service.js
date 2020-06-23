import { fetch, API } from '@/utils/fetch';

// 生态人员查询
export function queryInsideList (params) {
  return fetch({
    url: `${API}/admin_user/queryInsideList`,
    method: 'GET',
    params 
  })
};

// 生态人员根据ID查询
export function queryInsideById (params) {
  return fetch({
    url: `${API}/admin_user/queryInsideById`,
    method: 'GET',
    params 
  })
};

// 生态人员新增
export function insideAdd (params) {
  return fetch({
    url: `${API}/admin_user/insideStaffSave`,
    method: 'POST',
    data: params
  })
};

// 生态人员删除
export function insideDel (params) {
  return fetch({
    url: `${API}/admin_user/insideStaffDel`,
    method: 'POST',
    data: params
  })
};

// 生态人员修改
export function insideUpdate (params) {
  return fetch({
    url: `${API}/admin_user/insideStaffUpdate`,
    method: 'POST',
    data: params
  })
};

// 俱乐部人员查询
export function queryCulbList (params) {
  return fetch({
    url: `${API}/admin_user/queryCulbList`,
    method: 'GET',
    params 
  })
};

// 俱乐部根据ID查询
export function queryCulbById (params) {
  return fetch({
    url: `${API}/admin_user/queryCulbById`,
    method: 'GET',
    params 
  })
};

// 俱乐部人员新增
export function culbAdd (params) {
  return fetch({
    url: `${API}/admin_user/culbStaffSave`,
    method: 'POST',
    data: params
  })
};

// 俱乐部人员修改
export function culbUpdate (params) {
  return fetch({
    url: `${API}/admin_user/culbStaffUpdate`,
    method: 'POST',
    data: params
  })
};

// 俱乐部人员删除
export function culbDel (params) {
  return fetch({
    url: `${API}/admin_user/culbStaffDel`,
    method: 'POST',
    data: params
  })
};

// 查询生态俱乐部人员
export function queryClubList(params) {
  return fetch({
    url: `${API}/ec_team_info/query`,
    method: 'GET',
    params 
  })
};

// ====================================================================================================================================
export function queryTeamList (params) {
  return fetch({
    url: `${API}/ec_team_info/query`,
    method: 'GET',
    params
  })
};

export function queryUserByRoleID (params) {
  return fetch({
    url: `${API}/queryUserByRoleID`,
    method: 'GET',
    params 
  })
};

export function queryUserByID (params) {
  return fetch({
    url: `${API}/queryUserByID`,
    method: 'GET',
    params
  })
};

export function queryUser (params) {
  return fetch({
    url: `${API}/queryUser`,
    method: 'GET',
    params
  })
};

export function saveUser (params) {
  return fetch({
    url: `${API}/saveUser`,
    method: 'POST',
    data: params
  })
};

export function updateUser (params) {
  return fetch({
    url: `${API}/updateUser`,
    method: 'POST',
    data: params
  })
};

export function deleteUser (params) {
  return fetch({
    url: `${API}/deleteUser`,
    method: 'POST',
    data: params
  })
};

export function queryEcoUser (params) {
  return fetch({
    url: `${API}/queryEcoUser`,
    method: 'GET',
    params
  })
};

export function queryEcoRole (params) {
  return fetch({
    url: `${API}/queryEcoRole`,
    method: 'GET',
    params
  })
};








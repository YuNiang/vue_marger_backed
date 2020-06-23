import { fetch, API } from '@/utils/fetch';
// 查询模版数据
export function queryList (params) {
  return fetch({
    url: `${API}/file_template`,
    method: 'GET',
    params
  })
};

export function save (params) {
  return fetch({
    url: `${API}/file_template/save`,
    method: 'POST',
    data: params
  })
};

// 启用 不启用
export function isStatus (params) {
  return fetch({
    url: `${API}/file_template/isStatus`,
    method: 'POST',
    data: params
  })
};

// 修改
export function update (params) {
  return fetch({
    url: `${API}/file_template/update`,
    method: 'POST',
    data: params
  })
};

// 根据ID查询一个
export function queryById (params) {
  return fetch({
    url: `${API}/file_template/queryById`,
    method: 'GET',
    params
  })
};

export function del(params) {
  return fetch({
    url: `${API}/file_template/delete`,
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

import { fetch, API } from '@/utils/fetch';

export function save (params) {
  return fetch({
    url: `${API}/tb_player_info/save`,
    method: 'POST',
    data: params
  })
};

// 修改基本信息
export function modify (params) {
  return fetch({
    url: `${API}/tb_player_info/update`,
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

export function saveEnd (params) {
  return fetch({
    url: `${API}/tb_player_info/saveEnd`,
    method: 'POST',
    data: params
  })
};

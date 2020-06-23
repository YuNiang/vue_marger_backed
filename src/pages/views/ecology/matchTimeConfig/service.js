import { fetch, API } from '@/utils/fetch';
// 查询
export function queryList (params) {
  return fetch({
    url: `${API}/tb_season_info_ext/query`,
    method: 'GET',
    params
  })
};

export function saveMathConfigTime (params) {
  return fetch({
    url: `${API}/tb_season_info_ext/saveMathConfigTime`,
    method: 'POST',
    data: params
  })
};

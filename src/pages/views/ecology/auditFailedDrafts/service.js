import { fetch, API } from '@/utils/fetch';

// 查询
export function queryList (params) {
  return fetch({
    url:  `${API}/tb_player_info/queryOrderWithAllData`,
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


// 俱乐部数据
export function queryClubList (params) {
  return fetch({
    url: `${API}/ec_team_info/query`,
    method: 'GET',
    params
  })
};


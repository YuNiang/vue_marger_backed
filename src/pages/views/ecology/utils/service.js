import { fetch, API } from '@/utils/fetch';
// 俱乐部数据
export function queryClubList (params) {
  return fetch({
    url: `${API}/ec_team_info/query`,
    method: 'GET',
    params
  })
};

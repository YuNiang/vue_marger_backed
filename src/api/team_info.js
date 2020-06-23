import { fetch, API } from '@/utils/fetch'

// 查询
export function query (params) {
  return fetch({
    url: API + '/tb_team_info',
    method: 'GET',
    params: params
  })
}

// 批量查询
export function queryBulk (params) {
  return fetch({
    url: API + '/tb_team_info/bulk',
    method: 'GET',
    params: params
  })
}

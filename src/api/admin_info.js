import { fetch, API } from '@/utils/fetch'

// 查询
export function query (params) {
  return fetch({
    url: API + '/tb_admin_info',
    method: 'GET',
    params: params
  })
}

// 审核通过
export function checkPass (id) {
  return fetch({
    url: API + `/tb_admin_info/${id}/checkPass`,
    method: 'POST'
  })
}

// 审核不通过
export function checkNotPass (id) {
  return fetch({
    url: API + `/tb_admin_info/${id}/checkNotPass`,
    method: 'POST'
  })
}

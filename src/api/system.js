import { fetch, API } from '@/utils/fetch'

// 获取系统参数
export function GetSystemParams () {
  return fetch({
    url: API + '/systemParams',
    method: 'GET'
  })
}

// 设置系统参数
export function PostSystemParams (params) {
  return fetch({
    url: API + '/systemParams',
    method: 'POST',
    data: params
  })
}

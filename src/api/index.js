import { fetch, API } from '@/utils/fetch'

// 登录
export function PostLogin (params) {
  return fetch({
    url: API + '/auth_user/login',
    method: 'POST',
    data: params
  }, false)
}

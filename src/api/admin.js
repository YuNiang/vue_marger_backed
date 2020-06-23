import { fetch, API } from '@/utils/fetch'

// 查询所有管理员列表
export function GetAdmin (params) {
  return fetch({
    url: API + '/admin_user',
    method: 'GET',
    params: params
  })
}
//查询教练列表
export function GetCoach (params) {
  return fetch({
    url: API + '/admin_user/queryCoach',
    method: 'GET',
    params: params
  })
}

// 添加管理员
export function PostAdmin (params) {
  return fetch({
    url: API + '/admin_user/register',
    method: 'POST',
    data: params
  })
}

// 修改密码
export function PostAdminUpdatePassword (params) {
  return fetch({
    url: API + '/admin_user/updatePassword',
    method: 'POST',
    data: params
  })
}

//  ==============================权限管理  新的===============================
// 接口查询--根据id查
export function GetAuthRouteById (params) {
  return fetch({
    url: API + '/auth_route/id',
    method: 'GET',
    params: params
  })
}
// 根据service接口查询
export function GetAuthRouteByService (params) {
  return fetch({
    url: API + '/auth_route/service',
    method: 'GET',
    params: params
  })
}
// 接口列表：获取所有过滤项 下拉选选项
export function GetAuthDistinctOptions () {
  return fetch({
    url: API + '/auth_route/distinct',
    method: 'GET'
  })
}
// 接口删除
export function PostAuthRouteDelete (params) {
  return fetch({
    url: API + '/auth_route/delete',
    method: 'POST',
    data: params
  })
}
// 接口添加
export function PostAuthRoute (params) {
  return fetch({
    url: API + '/auth_route',
    method: 'POST',
    data: params
  })
}
// 接口修改
export function PostAuthRouteId (params) {
  return fetch({
    url: API + '/auth_route/edit',
    method: 'POST',
    data: params
  })
}

// 角色查询
export function GetAuthRole (params) {
  return fetch({
    url: API + '/auth_role',
    method: 'GET',
    params: params
  })
}
// 角色查询--根据id查
export function GetAuthRoleById (params) {
  return fetch({
    url: API + '/auth_role/id',
    method: 'GET',
    params: params
  })
}
// 角色删除
export function PostAuthRoleDelete (params) {
  return fetch({
    url: API + '/auth_role/delete',
    method: 'POST',
    data: params
  })
}
// 角色查询
export function GetAuthRoleAll (params) {
  return fetch({
    url: API + '/auth_role/all',
    method: 'GET',
    params: params
  })
}
// 角色添加
export function PostAuthRole (params) {
  return fetch({
    url: API + '/auth_role',
    method: 'POST',
    data: params
  })
}
// 角色修改
export function PostAuthRoleId (params) {
  return fetch({
    url: API + '/auth_role/edit',
    method: 'POST',
    data: params
  })
}

// 角色-接口查询
export function GetAuthRoleRoute (params) {
  return fetch({
    url: API + '/auth_role_route',
    method: 'GET',
    params: params
  })
}
// 角色-接口add edit
export function POSTAuthRoleRouteBulk (params) {
  return fetch({
    url: API + '/auth_role_route/bulk',
    method: 'POST',
    data: params
  })
}

// 用户查询
export function GetAuthUser (params) {
  return fetch({
    url: API + '/auth_user',
    method: 'GET',
    params: params
  })
}
// 用户查询--根据id查
export function GetAuthUserById (params) {
  return fetch({
    url: API + '/auth_user/id',
    method: 'GET',
    params: params
  })
}
// 用户添加
export function PostAuthUser (params) {
  return fetch({
    url: API + '/auth_user',
    method: 'POST',
    data: params
  })
}
// 用户修改
export function PostAuthUserId (params) {
  return fetch({
    url: API + '/auth_user/edit',
    method: 'POST',
    data: params
  })
}
// 用户删除
export function PostAuthUserDelete (params) {
  return fetch({
    url: API + '/auth_user/delete',
    method: 'POST',
    data: params
  })
}

// user-角色查询
export function GetAuthUserRole (params) {
  return fetch({
    url: API + '/auth_user_role',
    method: 'GET',
    params: params
  })
}
// user-角色add edit
export function POSTAuthUserRoleBulk (params) {
  return fetch({
    url: API + '/auth_user_role/bulk',
    method: 'POST',
    data: params
  })
}


// App查询
export function GetAuthApp (params) {
  return fetch({
    url: API + '/auth_app',
    method: 'GET',
    params: params
  })
}
// App查询--根据id查
export function GetAuthAppById (params) {
  return fetch({
    url: API + '/auth_app/id',
    method: 'GET',
    params: params
  })
}
// App添加
export function PostAuthApp (params) {
  return fetch({
    url: API + '/auth_app',
    method: 'POST',
    data: params
  })
}
// App修改
export function PostAuthAppId (params) {
  return fetch({
    url: API + '/auth_app/edit',
    method: 'POST',
    data: params
  })
}
// App删除
export function PostAuthAppDelete (params) {
  return fetch({
    url: API + '/auth_app/delete',
    method: 'POST',
    data: params
  })
}

// App-角色查询
export function GetAuthAppRole (params) {
  return fetch({
    url: API + '/auth_app_role',
    method: 'GET',
    params: params
  })
}
// App-角色add edit
export function POSTAuthAppRoleBulk (params) {
  return fetch({
    url: API + '/auth_app_role/bulk',
    method: 'POST',
    data: params
  })
}

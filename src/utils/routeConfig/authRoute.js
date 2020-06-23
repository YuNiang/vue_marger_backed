const service = 'DM';

export const AuthRoute = [
  {
    service: service,
    method: 'GET',
    path: '/admin/auth_route/id',
    routeCode: 'auth-route-id',
    label: '根据id查询接口'
  },
  {
    service: service,
    method: 'GET',
    path: '/admin/auth_route/service',
    routeCode: 'auth-route-service',
    label: '根据service查询接口'
  },
  {
    service: service,
    method: 'GET',
    path: '/admin/auth_route/distinct',
    routeCode: 'auth-route-distinct',
    label: '接口过滤项选项'
  },
  {
    service: service,
    method: 'POST',
    path: '/admin/auth_route/delete',
    routeCode: 'auth-route-delete',
    label: '接口删除'
  },
  {
    service: service,
    method: 'POST',
    path: '/admin/auth_route',
    routeCode: 'auth-route-add',
    label: '接口创建'
  },
  {
    service: service,
    method: 'POST',
    path: '/admin/auth_route/edit',
    routeCode: 'auth-route-edit',
    label: '接口编辑'
  },
  {
    service: service,
    method: 'GET',
    path: '/admin/auth_role',
    routeCode: 'auth-role',
    label: '角色列表'
  },
  {
    service: service,
    method: 'GET',
    path: '/admin/auth_role/all',
    routeCode: 'auth-role-all',
    label: '查询所有角色'
  },
  {
    service: service,
    method: 'GET',
    path: '/admin/auth_role/id',
    routeCode: 'auth-role-id',
    label: '根据id查询角色'
  },
  {
    service: service,
    method: 'POST',
    path: '/admin/auth_role/delete',
    routeCode: 'auth-role-delete',
    label: '角色删除'
  },
  {
    service: service,
    method: 'POST',
    path: '/admin/auth_role',
    routeCode: 'auth-role-add',
    label: '角色创建'
  },
  {
    service: service,
    method: 'POST',
    path: '/admin/auth_role/edit',
    routeCode: 'auth-role-edit',
    label: '角色编辑'
  },
  {
    service: service,
    method: 'GET',
    path: '/admin/auth_role_route',
    routeCode: 'auth-role-route',
    label: '角色接口查询'
  },
  {
    service: service,
    method: 'POST',
    path: '/admin/auth_role_route/bulk',
    routeCode: 'auth-role-route-bulk',
    label: '角色接口增删改'
  },
  {
    service: service,
    method: 'GET',
    path: '/admin/auth_user',
    routeCode: 'auth-user',
    label: '用户列表'
  },
  {
    service: service,
    method: 'GET',
    path: '/admin/auth_user/id',
    routeCode: 'auth-user-id',
    label: '根据id查询用户'
  },
  {
    service: service,
    method: 'POST',
    path: '/admin/auth_user/delete',
    routeCode: 'auth-user-delete',
    label: '用户删除'
  },
  {
    service: service,
    method: 'POST',
    path: '/admin/auth_user',
    routeCode: 'auth-user-add',
    label: '用户添加'
  },
  {
    service: service,
    method: 'POST',
    path: '/admin/auth_user/edit',
    routeCode: 'auth-user-edit',
    label: '用户编辑'
  },
  {
    service: service,
    method: 'GET',
    path: '/admin/auth_user_role',
    routeCode: 'auth-user-role',
    label: '用户角色查询'
  },
  {
    service: service,
    method: 'POST',
    path: '/admin/auth_user_role/bulk',
    routeCode: 'auth-user-role-bulk',
    label: '用户角色增删改'
  },
  {
    service: service,
    method: 'GET',
    path: '/admin/auth_app',
    routeCode: 'auth-app',
    label: '应用查询'
  },
  {
    service: service,
    method: 'GET',
    path: '/admin/auth_app/id',
    routeCode: 'auth-app-id',
    label: '根据id查询应用'
  },
  {
    service: service,
    method: 'POST',
    path: '/admin/auth_app/delete',
    routeCode: 'auth-app-delete',
    label: '应用删除'
  },
  {
    service: service,
    method: 'POST',
    path: '/admin/auth_app',
    routeCode: 'auth-app-add',
    label: '应用添加'
  },
  {
    service: service,
    method: 'POST',
    path: '/admin/auth_app/edit',
    routeCode: 'auth-app-edit',
    label: '应用编辑'
  },
  {
    service: service,
    method: 'GET',
    path: '/admin/auth_app_role',
    routeCode: 'auth-app-role',
    label: '应用角色查询'
  },
  {
    service: service,
    method: 'POST',
    path: '/admin/auth_app_role/bulk',
    routeCode: 'auth-app-role-bulk',
    label: '应用角色增删改'
  }
];

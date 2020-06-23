// 对象的key是elementCode
// routeCodeArr: 第一级判断是or, 第二级判断是and --详见main.js中的方法
export const AuthElement = {
  'auth-route-list': { // 菜单项
    label: '接口列表',
    routeCodeArr: [
      ['auth-route-service'], 
      ['auth-route-distinct']
    ]
  },
  'auth-route-add': { // 功能按钮
    label: '添加接口',
    routeCodeArr: [
      ['auth-route-distinct', 'auth-route-add']
    ]
  },
  'auth-route-edit': {
    label: '编辑接口',
    routeCodeArr: [
      ['auth-route-id', 'auth-route-distinct', 'auth-route-edit']
    ]
  },
  'auth-route-delete': {
    label: '删除接口',
    routeCodeArr: [
      ['auth-route-delete']
    ]
  },
  'auth-role-list': {
    label: '角色列表',
    routeCodeArr: [
      ['auth-role-add'],
      ['auth-role-edit'],
      ['auth-role-delete'],
    ]
  },
  'auth-role-add': {
    label: '添加角色',
    routeCodeArr: [
      ['auth-role-add']
    ]
  },
  'auth-role-edit': {
    label: '编辑角色',
    routeCodeArr: [
      ['auth-role-id', 'auth-role-edit']
    ]
  },
  'auth-role-delete': {
    label: '删除角色',
    routeCodeArr: [
      ['auth-role-delete']
    ]
  },
  'auth-role-route': {
    label: '设置权限',
    routeCodeArr: [
      ['auth-route-distinct', 'auth-role-route', 'auth-route-service', 'auth-role-route-bulk']
    ]
  },
  'auth-user-list': {
    label: '用户列表',
    routeCodeArr: [
      ['auth-user']
    ]
  },
  'auth-user-add': {
    label: '添加用户',
    routeCodeArr: [
      ['auth-user-add']
    ]
  },
  'auth-user-edit': {
    label: '编辑用户',
    routeCodeArr: [
      ['auth-user-id', 'auth-user-edit']
    ]
  },
  'auth-user-delete': {
    label: '删除用户',
    routeCodeArr: [
      ['auth-user-delete']
    ]
  },
  'auth-user-role': {
    label: '设置角色',
    routeCodeArr: [
      ['auth-role-all', 'auth-role-route', 'auth-user-role', 'auth-user-role-bulk']
    ]
  },
  'auth-app-list': {
    label: '应用列表',
    routeCodeArr: [
      ['auth-app']
    ]
  },
  'auth-app-add': {
    label: '添加应用',
    routeCodeArr: [
      ['auth-app-add']
    ]
  },
  'auth-app-edit': {
    label: '编辑应用',
    routeCodeArr: [
      ['auth-app-id', 'auth-app-edit']
    ]
  },
  'auth-app-delete': {
    label: '删除应用',
    routeCodeArr: [
      ['auth-app-delete']
    ]
  },
  'auth-app-role': {
    label: '设置角色',
    routeCodeArr: [
      ['auth-role-all', 'auth-role-route', 'auth-app-role', 'auth-app-role-bulk']
    ]
  }
};

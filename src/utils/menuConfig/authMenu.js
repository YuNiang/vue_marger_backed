export const AuthMenu = [
  {
    label: "权限管理",
    index: "auth",
    icon: "icon-role",
    children: [
      {label: "接口列表", icon: "icon-role", index: "/auth/route", elementCode: 'auth-route-list'},
      {label: "角色列表", icon: "icon-role", index: "/auth/role", elementCode: 'auth-role-list'},
      {label: "用户列表", icon: "icon-role", index: "/auth/user", elementCode: 'auth-user-list'},
      {label: "App列表", icon: "icon-role", index: "/auth/app", elementCode: 'auth-app-list'},
    ]
  }
];

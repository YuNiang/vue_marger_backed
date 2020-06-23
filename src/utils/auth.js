import {MATCH_LIVE_MAN} from "./viewsConfig/matchLive";

export const roles = [{
  "order": "10",
  "label": "权限管理",
  "index": "role",
  "icon": "icon-role",
  "children": [{
    "label": "权限列表",
    "index": "/auth/route",
    "icon": "icon-role",
    "interfaces": [{
      "method": "GET",
      "path": "/admin/admin_route"
    }, {
      "method": "POST",
      "path": "/admin/admin_route/{id}/delete"
    }]
  }, {
    "label": "权限编辑",
    "index": "/auth/route/edit",
    "notMenu": "true",
    "interfaces": [{
      "method": "POST",
      "path": "/admin/admin_route"
    }, {
      "method": "POST",
      "path": "/admin/admin_route/{id}"
    }]
  }, {
    "label": "角色列表",
    "icon": "icon-role",
    "index": "/auth/role",
    "interfaces": [{
      "method": "GET",
      "path": "/admin/admin_role"
    }, {
      "method": "POST",
      "path": "/admin/admin_role/{id}/delete"
    }]
  }, {
    "label": "角色添加",
    "index": "/auth/role/add",
    "notMenu": "true",
    "interfaces": [{
      "method": "POST",
      "path": "/admin/admin_role"
    }]
  }, {
    "label": "角色权限设置",
    "index": "/auth/role/setRoute",
    "notMenu": "true",
    "interfaces": [{
      "method": "POST",
      "path": "/admin/admin_role/{id}"
    }, {
      "method": "GET",
      "path": "/admin/admin_route/all"
    }, {
      "method": "GET",
      "path": "/admin/admin_roleRoute/all"
    }, {
      "method": "POST",
      "path": "/admin/admin_roleRoute/bulk"
    }, {
      "method": "POST",
      "path": "/admin/admin_roleRoute/{idStr}/bulkDelete"
    }]
  }, {
    "label": "用户角色列表",
    "icon": "icon-role",
    "index": "/auth/user",
    "interfaces": [{
      "method": "GET",
      "path": "/admin/admin_user"
    }]
  }, {
    "label": "用户角色设置",
    "index": "/auth/user/setRole",
    "notMenu": "true",
    "interfaces": [{
      "method": "GET",
      "path": "/admin/admin_user"
    }, {
      "method": "GET",
      "path": "/admin/admin_role"
    }, {
      "method": "GET",
      "path": "/admin/admin_userRole"
    }, {
      "method": "GET",
      "path": "/admin/admin_route/all"
    }, {
      "method": "GET",
      "path": "/admin/admin_roleRoute/all"
    }, {
      "method": "POST",
      "path": "/admin/admin_userRole"
    }, {
      "method": "POST",
      "path": "/admin/admin_userRole/{id}/delete"
    }]
  }, {
    "label": "系统设置",
    "index": "/auth/system/setting",
    "icon": "icon-role",
    "interfaces": [{
      "method": "GET",
      "path": "/admin/systemParams"
    }, {
      "method": "POST",
      "path": "/admin/systemParams"
    }]
  }]
}, {
  "order": "30",
  "label": "管理员",
  "index": "administrator",
  "icon": "icon-admin",
  "children": [{
    "label": "管理员列表",
    "index": "/administrator",
    "icon": "icon-admin",
    "interfaces": [{
      "method": "GET",
      "path": "/admin/admin_user"
    }]
  }, {
    "label": "管理员创建",
    "index": "/administrator/new",
    "icon": "icon-admin",
    "interfaces": [{
      "method": "POST",
      "path": "/admin/admin_user/register"
    }]
  }, {
    "label": "修改密码",
    "index": "/administrator/updatePassword",
    "notMenu": "true",
    "interfaces": [{
      "method": "POST",
      "path": "/admin/admin_user/updatePassword"
    }]
  }, {
    "label": "管理员申请",
    "index": "/administrator/apply",
    "icon": "icon-admin",
    "interfaces": [{
      "method": "GET",
      "path": "/admin/tb_admin_info"
    }, {
      "method": "POST",
      "path": "/admin/tb_admin_info/{id}/checkPass"
    }, {
      "method": "POST",
      "path": "/admin/tb_admin_info/{id}/checkNotPass"
    }, {
      "method": "GET",
      "path": "/admin/tb_team_info/bulk"
    }]
  }]
}, {
  "order": "40",
  "label": "首发管理",
  "index": "first",
  "icon": "icon-admin",
  "children": [{
    "label": "教练管理",
    "index": "/coach",
    "icon": "icon-admin",
    "interfaces": [{
      "method": "GET",
      "path": "/admin/admin_user/queryCoach"
    }, {
      "method": "GET",
      "path": "/admin/getAllTeamBySeason"
    }, {
      "method": "POST",
      "path": "/admin/updateCoach"
    }, {
      "method": "POST",
      "path": "/admin/admin_user/register"
    }]
  }, {
    "label": "首发列表",
    "index": "/first",
    "icon": "icon-admin",
    "interfaces": [{
      "method": "GET",
      "path": "/admin/getAllTeamBySeason"
    }, {
      "method": "GET",
      "path": "/admin/getTeamDetail"
    }, {
      "method": "GET",
      "path": "/admin/getAllSeason"
    }, {
      "method": "GET",
      "path": "/admin/getAllCity"
    }, {
      "method": "POST",
      "path": "/admin/searchMatch"
    }, {
      "method": "POST",
      "path": "/admin/searchMatchDetail"
    }, {
      "method": "POST",
      "path": "/admin/updateFirst"
    }, {
      "method": "GET",
      "path": "/admin/getMatchDetail"
    }, {
      "method": "GET",
      "path": "/admin/getPlayers"
    }, {
      "method": "GET",
      "path": "/admin/getCoachs"
    }]
  }]
},{
  order: "80",
  label: "赛事直播",
  index: "matchLive",
  icon: "icon-admin",
  children: MATCH_LIVE_MAN
}]

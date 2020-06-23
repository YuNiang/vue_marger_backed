const service = 'DM';

export const EcoRoute = [
  {
    service: service,
    method: 'GET',
    path: '/admin/tb_player_info/query',
    routeCode: 'eco:player:query',
    label: '俱乐部查询'
  },
  {
    service: service,
    method: 'GET',
    path: '/admin/tb_player_info/queryById',
    routeCode: 'eco:player:queryById',
    label: '俱乐部列表根据id查询'
  },
  {
    service: service,
    method: 'POST',
    path: '/admin/tb_player_info/save',
    routeCode: 'eco:player:saveAdd',
    label: '选手新增'
  },
  {
    service: service,
    method: 'POST',
    path: '/admin/tb_player_info/update',
    routeCode: 'eco:player:update',
    label: '选手修改'
  },
  {
    service: service,
    method: 'POST',
    path: '/admin/tb_player_info/filterPlayer',
    routeCode: 'eco:player:filterPlayer',
    label: '选手过滤'
  },
  {
    service: service,
    method: 'POST',
    path: '/admin/tb_player_info/saveBack',
    routeCode: 'eco:player:saveBack',
    label: '选手返还'
  },
  {
    service: service,
    method: 'POST',
    path: '/admin/tb_player_info/saveUp',
    routeCode: 'eco:player:saveUp',
    label: '选手上调'
  },
  {
    service: service,
    method: 'POST',
    path: '/admin/tb_player_info/saveDown',
    routeCode: 'eco:player:saveDown',
    label: '选手下放'
  },
  {
    service: service,
    method: 'POST',
    path: '/admin/tb_player_info/saveBorrow',
    routeCode: 'eco:player:saveBorrow',
    label: '选手借调'
  },
  {
    service: service,
    method: 'POST',
    path: '/admin/tb_player_info/saveTransfer',
    routeCode: 'eco:player:saveTransfer',
    label: '选手转会'
  },
  {
    service: service,
    method: 'POST',
    path: '/admin/tb_player_info/saveRescission',
    routeCode: 'eco:player:saveRescission',
    label: '选手解约'
  },
  {
    service: service,
    method: 'GET',
    path: '/admin/tb_player_info/queryTeamCount',
    routeCode: 'eco:player:queryTeamCount',
    label: '俱乐部查询'
  },
  {
    service: service,
    method: 'GET',
    path: '/admin/tb_player_info/queryOrderWithAllData',
    routeCode: 'eco:player:queryOrderWithAllData',
    label: '我的申请查询'
  },
  {
    service: service,
    method: 'GET',
    path: '/admin/tb_player_info/queryTransferTime',
    routeCode: 'eco:player:queryTransferTime',
    label: '查询转会期'
  },
  {
    service: service,
    method: 'GET',
    path: '/admin/tb_player_info/querySkillPoint',
    routeCode: 'eco:player:querySkillPoint',
    label: '查询技能通道'
  },
  {
    service: service,
    method: 'POST',
    path: '/admin/tb_player_info/saveEnd',
    routeCode: 'eco:player:saveEnd',
    label: '终止流程'
  },
  {
    service: service,
    method: 'GET',
    path: '/admin/tb_coach_info/query',
    routeCode: 'eco:coach:query',
    label: '教练列表查询'
  },
  {
    service: service,
    method: 'GET',
    path: '/admin/tb_coach_info/queryById',
    routeCode: 'eco:coach:queryById',
    label: '根据id查询教练'
  },
  {
    service: service,
    method: 'POST',
    path: '/admin/tb_coach_info/save',
    routeCode: 'eco:coach:saveAdd',
    label: '教练新增'
  },
  {
    service: service,
    method: 'POST',
    path: '/admin/tb_coach_info/update',
    routeCode: 'eco:coach:update',
    label: '教练修改'
  },
  {
    service: service,
    method: 'POST',
    path: '/admin/tb_coach_info/saveEnd',
    routeCode: 'eco:coach:saveEnd',
    label: '流程终止'
  },
  {
    service: service,
    method: 'GET',
    path: '/admin/tb_player_info/queryExcel',
    routeCode: 'eco:player:queryExcel',
    label: '生态列表导出'
  },
  {
    service: service,
    method: 'GET',
    path: '/admin/file_template',
    routeCode: 'eco:fileTemplate:query',
    label: '生态模版查询'
  },
  {
    service: service,
    method: 'GET',
    path: '/admin/file_template/queryById',
    routeCode: 'eco:fileTemplate:queryById',
    label: '根据id查询模板'
  },
  {
    service: service,
    method: 'POST',
    path: '/admin/file_template/save',
    routeCode: 'eco:fileTemplate:save',
    label: '生态保存模板'
  },
  {
    service: service,
    method: 'POST',
    path: '/admin/file_template/update',
    routeCode: 'eco:fileTemplate:update',
    label: '生态修改模板'
  },
  {
    service: service,
    method: 'POST',
    path: '/admin/file_template/delete',
    routeCode: 'eco:fileTemplate:delete',
    label: '生态删除模板'
  },
  {
    service: service,
    method: 'POST',
    path: '/admin/audit_order/audit',
    routeCode: 'eco:audit:order',
    label: '生态选手信息审核'
  },
  {
    service: service,
    method: 'POST',
    path: '/admin/audit_order/updateOrder',
    routeCode: 'eco:audit:updateOrder',
    label: '生态审核暂存'
  },
  {
    service: service,
    method: 'GET',
    path: '/admin/audit_order/queryAuditingByOuterId',
    routeCode: 'eco:audit:queryAuditingByOuterId',
    label: '生态判断工单是否已经存在'
  },
  {
    service: service,
    method: 'POST',
    path: '/admin/audit_order/adoptAfterSave',
    routeCode: 'eco:audit:adoptAfterSave',
    label: '生态审核通过再次具备原因'
  },
  {
    service: service,
    method: 'GET',
    path: '/admin/audit_order/uesrOrderList',
    routeCode: 'eco:audit:uesrOrderList',
    label: '查询工单操作记录历史'
  },
  {
    service: service,
    method: 'GET',
    path: '/admin/tb_season_info_ext/query',
    routeCode: 'eco:matchTime:query',
    label: '生态赛事时间查询'
  },
  {
    service: service,
    method: 'POST',
    path: '/admin/tb_season_info_ext/saveMathConfigTime',
    routeCode: 'eco:matchTime:saveConfig',
    label: '生态赛事时间配置'
  },
  {
    service: service,
    method: 'GET',
    path: '/admin/tb_player_info_action/query',
    routeCode: 'eco:playerAction:query',
    label: '查询转会动作'
  },
  {
    service: service,
    method: 'GET',
    path: '/admin/oper_log/query',
    routeCode: 'eco:operlog:query',
    label: '查询操作日志'
  },
  {
    service: service,
    method: 'POST',
    path: '/admin/file/upload',
    routeCode: 'eco:file:upload',
    label: '俱乐部附件上传'
  },
  {
    service: service,
    method: 'GET',
    path: '/admin/admin_user/queryLoginUserTeam',
    routeCode: 'eco:loginUser:query',
    label: '俱乐部查询用户战队'
  },
  {
    service: service,
    method: 'GET',
    path: '/admin/queryUserByRoleID',
    routeCode: 'eco:userByRoleID:query',
    label: '生态根据角色ID查询用户列表'
  },
  {
    service: service,
    method: 'GET',
    path: '/admin/queryUserByID',
    routeCode: 'eco:userByID:query',
    label: '生态根据ID查询用户'
  },
  {
    service: service,
    method: 'GET',
    path: '/admin/queryUser',
    routeCode: 'eco:user:query',
    label: '生态查询用户'
  },
  {
    service: service,
    method: 'POST',
    path: '/admin/saveUser',
    routeCode: 'eco:user:save',
    label: '生态新增用户'
  },
  {
    service: service,
    method: 'POST',
    path: '/admin/updateUser',
    routeCode: 'eco:user:update',
    label: '生态修改用户'
  },
  {
    service: service,
    method: 'POST',
    path: '/admin/deleteUser',
    routeCode: 'eco:user:delete',
    label: '生态删除用户'
  },
  {
    service: service,
    method: 'GET',
    path: '/admin/queryEcoUser',
    routeCode: 'eco:ecoUser:query',
    label: '生态查询俱乐部权限'
  },
  {
    service: service,
    method: 'POST',
    path: '/admin/file/generationURL',
    routeCode: 'eco:file:generationURL',
    label: '下载附件'
  },
  {
    service: service,
    method: 'GET',
    path: '/admin/ec_team_info/query',
    routeCode: 'eco:team:query',
    label: 'team查询'
  },
  {
    service: service,
    method: 'GET',
    path: '/admin/queryEcoRole',
    routeCode: 'eco:role:query',
    label: '生态角色查询'
  }
];

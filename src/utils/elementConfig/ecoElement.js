export const clubListElement = {
  'eco:player:listCub': {
    label: '人员列表',
    routeCodeArr: [
      ['eco:player:saveTransfer']
      // ['eco:loginUser:query'],
      // ['eco:player:queryTransferTime'],
      // ['eco:player:querySkillPoint'],
      // ['eco:player:saveAdd'],
      // ['eco:coach:query'],
      // ['eco:coach:queryById'],
      // ['eco:coach:saveAdd'],
      // ['eco:coach:update'],
      // ['eco:operlog:query'],
      // ['eco:playerAction:query']
    ]
  },
  'eco:player:queryOrderWithAllDataClub': {
      label: '我的申请',
      routeCodeArr: [
      ['eco:loginUser:query']
    ]
  },
  // 'eco:player:update': {
  //   label: '修改选手接口',
  //   routeCodeArr: [
  //     [
  //       'eco:loginUser:query', 'eco:file:generationURL', 'eco:fileTemplate:query', 
  //       'eco:file:upload', 'eco:team:query', 'eco:player:update', 'eco:player:queryById',
  //       'eco:player:query', 'eco:player:filterPlayer', 'eco:player:queryTeamCount'
  //     ]
  //   ]
  // },
  // 'eco:player:saveRescission': {
  //   label: '选手解约接口',
  //   routeCodeArr: [
  //     [
  //       'eco:loginUser:query', 'eco:file:generationURL', 'eco:fileTemplate:query', 
  //       'eco:file:upload', 'eco:team:query', 'eco:player:saveRescission', 'eco:player:queryById',
  //       'eco:player:query', 'eco:player:filterPlayer', 'eco:player:queryTeamCount'
  //     ]
  //   ]
  // },
  // 'eco:player:saveTransfer': {
  //   label: '选手转会接口',
  //   routeCodeArr: [
  //     [
  //       'eco:loginUser:query', 'eco:file:generationURL', 'eco:fileTemplate:query', 
  //       'eco:file:upload', 'eco:team:query', 'eco:player:saveTransfer', 'eco:player:queryById',
  //       'eco:player:query', 'eco:player:filterPlayer', 'eco:player:queryTeamCount'
  //     ]
  //   ]
  // },
  // 'eco:player:saveBorrow': {
  //   label: '选手借用接口',
  //   routeCodeArr: [
  //     [
  //       'eco:loginUser:query', 'eco:file:generationURL', 'eco:fileTemplate:query', 
  //       'eco:file:upload', 'eco:team:query', 'eco:player:saveBorrow', 'eco:player:queryById',
  //       'eco:player:query', 'eco:player:filterPlayer', 'eco:player:queryTeamCount'
  //     ]
  //   ]
  // },
  // 'eco:player:saveBack': {
  //     label: '选手返还接口',
  //     routeCodeArr: [
  //       [
  //         'eco:loginUser:query', 'eco:file:generationURL', 'eco:fileTemplate:query', 
  //         'eco:file:upload', 'eco:team:query', 'eco:player:saveBack', 'eco:player:queryById',
  //         'eco:player:query', 'eco:player:filterPlayer', 'eco:player:queryTeamCount'
  //       ]
  //     ]
  // },
  // 'eco:player:saveUp': {
  //   label: '选手上调接口',
  //   routeCodeArr: [
  //     [
  //       'eco:loginUser:query', 'eco:file:generationURL', 'eco:fileTemplate:query', 
  //       'eco:file:upload', 'eco:team:query', 'eco:player:saveUp', 'eco:player:queryById',
  //       'eco:player:query', 'eco:player:filterPlayer', 'eco:player:queryTeamCount'
  //     ]
  //   ]
  // },
  // 'eco:player:saveDown': {
  //   label: '选手下放接口',
  //   routeCodeArr: [
  //     [
  //       'eco:loginUser:query', 'eco:file:generationURL', 'eco:fileTemplate:query', 
  //       'eco:file:upload', 'eco:team:query', 'eco:player:saveDown', 'eco:player:queryById',
  //       'eco:player:query', 'eco:player:filterPlayer', 'eco:player:queryTeamCount'
  //     ]
  //   ]
  // },
  // 'eco:player:saveEnd': {
  //     label: '选手终止流程接口',
  //     routeCodeArr: [
  //       [
  //         'eco:loginUser:query', 'eco:file:generationURL', 'eco:fileTemplate:query', 
  //         'eco:file:upload', 'eco:team:query', 'eco:player:saveEnd', 'eco:player:queryById',
  //         'eco:player:query', 'eco:player:filterPlayer', 'eco:player:queryTeamCount'
  //       ]
  //     ]
  // },
  // 'eco:coach:saveAdd': {
  //   label: '教练新增',
  //   routeCodeArr: [
  //     ['eco:loginUser:query', 'eco:coach:saveAdd', 'eco:file:generationURL',
  //     'eco:fileTemplate:query', 'eco:file:upload', 'eco:team:query', 'eco:player:queryById',
  //     'eco:player:query', 'eco:player:filterPlayer', 'eco:player:queryTeamCount']
  //   ]
  // },
  // 'eco:coach:update': {
  //   label: '教练修改',
  //   routeCodeArr: [
  //     ['eco:loginUser:query', 'eco:coach:update', 'eco:file:generationURL',
  //       'eco:fileTemplate:query', 'eco:file:upload', 'eco:team:query', 'eco:player:queryById',
  //       'eco:player:query', 'eco:player:filterPlayer', 'eco:player:queryTeamCount']
  //     ]
  // },
  // 'eco:coach:saveEnd': {
  //   label: '教练终止流程',
  //   routeCodeArr: [
  //     ['eco:loginUser:query', 'eco:coach:saveEnd', 'eco:file:generationURL',
  //       'eco:fileTemplate:query', 'eco:file:upload', 'eco:team:query', 'eco:player:queryById',
  //       'eco:player:query', 'eco:player:filterPlayer', 'eco:player:queryTeamCount']
  //     ]
  // }
};

// export const clubApplicationElement = {
//   'eco:player:queryOrderWithAllDataClub': {
//     label: '俱乐部我的申请',
//     routeCodeArr: [
//       ['eco:player:queryOrderWithAllData']
//     ]
//   },
//   'eco:operlog:query': {
//     label: '日志查询',
//     routeCodeArr: [
//       ['eco:player:queryOrderWithAllData', 'eco:operlog:query']
//     ]
//   },
//   'eco:team:query': {
//     label: '战队查询',
//     routeCodeArr: [
//       ['eco:player:queryOrderWithAllData', 'eco:team:query']
//     ]
//   },
// };

export const ecoListElement = {
  'eco:player:listEco': {
    label: '人员列表',
    routeCodeArr: [
      ['eco:player:queryExcel']
    ]
  },
  // 'eco:audit:uesrOrderList': {
  //   label: '操作日志',
  //   routeCodeArr: [
  //     ['eco:audit:uesrOrderList', 'eco:player:query']
  //   ]
  // },
  // 'eco:team:query': {
  //   label: '战队查询',
  //   routeCodeArr: [
  //     ['eco:team:query', 'eco:player:query']
  //   ]
  // },
  // 'eco:player:queryById': {
  //   label: '根据id查询人员',
  //   routeCodeArr: [
  //     ['eco:player:queryById', 'eco:player:query']
  //   ]
  // },
  // 'eco:player:queryExcel': {
  //   label: '导出',
  //   routeCodeArr: [
  //     ['eco:player:queryById', 'eco:player:query']
  //   ]
  // }
};

export const ecoPlayerElement = {
  'eco:audit:orderPlayer': {
    label: '选手审核',
    routeCodeArr: [
      ['eco:audit:order']
    ]
  },
  // 'eco:operlog:query': {
  //   label: '选手审核列表',
  //   routeCodeArr: [
  //     ['eco:operlog:query', 'eco:playerAction:query', 'eco:team:query', 'eco:player:queryOrderWithAllData', 'eco:audit:adoptAfterSave']
  //   ]
  // },
  // 'eco:audit:adoptAfterSave': {
  //   label: '生态审核通过再次具备原因',
  //   routeCodeArr: [
  //     ['eco:player:queryOrderWithAllData', 'eco:audit:adoptAfterSave']
  //   ]
  // },
  // 'eco:player:queryById': {
  //   label: '俱乐部列表根据id查询',
  //   routeCodeArr: [
  //     ['eco:player:queryOrderWithAllData', 'eco:player:queryById']
  //   ]
  // },
};

export const ecoCoachElement = {
  'eco:audit:orderCoach': {
    label: '教练审核',
    routeCodeArr: [
      ['eco:audit:order'],
    ]
  },
  // 'eco:operlog:query': {
  //   label: '教练审核列表',
  //   routeCodeArr: [
  //     ['eco:operlog:query', 'eco:playerAction:query', 'eco:team:query', 'eco:player:queryOrderWithAllData', 'eco:audit:adoptAfterSave']
  //   ]
  // },
  // 'eco:audit:adoptAfterSave': {
  //   label: '生态审核通过再次具备原因',
  //   routeCodeArr: [
  //     ['eco:player:queryOrderWithAllData', 'eco:audit:adoptAfterSave']
  //   ]
  // },
  // 'eco:player:queryById': {
  //   label: '俱乐部列表根据id查询',
  //   routeCodeArr: [
  //     ['eco:player:queryOrderWithAllData', 'eco:player:queryById']
  //   ]
  // },
};

export const ecoTempElement = {
  'eco:fileTemplate:query': {
    label: '模版配置',
    routeCodeArr: [
      ['eco:fileTemplate:save']
    ]
  },
  // 'eco:fileTemplate:queryById': {
  //   label: '根据id模版查询',
  //   routeCodeArr: [
  //     ['eco:fileTemplate:query', 'eco:fileTemplate:queryById']
  //   ]
  // },
  // 'eco:fileTemplate:save': {
  //   label: '模版保存',
  //   routeCodeArr: [
  //     ['eco:fileTemplate:query', 'eco:fileTemplate:save']
  //   ]
  // },
  // 'eco:fileTemplate:update': {
  //   label: '模版修改',
  //   routeCodeArr: [
  //     ['eco:fileTemplate:query', 'eco:fileTemplate:update']
  //   ]
  // },
  // 'eco:fileTemplate:delete': {
  //   label: '模版删除',
  //   routeCodeArr: [
  //     ['eco:fileTemplate:query', 'eco:fileTemplate:delete']
  //   ]
  // }
};

export const ecoTimeConfigElement = {
  'eco:matchTime:saveConfig': {
    label: '赛事时间配置',
    routeCodeArr: [
      ['eco:matchTime:query']
    ]
  },
  'eco:fileTemplate:queryById': {
    label: '根据id模版查询',
    routeCodeArr: [
      ['eco:matchTime:query', 'eco:matchTime:saveConfig']
    ]
  }
};

export const ecoUserElement = {
  'eco:user:query': {
    label: '生态人员管理',
    routeCodeArr: [
      ['eco:userByID:query']
    ]
  },
  // 'eco:userByRoleID:query': {
  //   label: '角色id查询',
  //   routeCodeArr: [
  //     ['eco:role:query', 'eco:userByRoleID:query']
  //   ]
  // },
  // 'eco:userByID:query': {
  //   label: '查询用户是否已经存在',
  //   routeCodeArr: [
  //     ['eco:role:query', 'eco:userByID:query']
  //   ]
  // },
  // 'eco:user:save': {
  //   label: '保存生态用户',
  //   routeCodeArr: [
  //     ['eco:role:query', 'eco:user:save']
  //   ]
  // },
  // 'eco:user:update': {
  //   label: '修改生态用户',
  //   routeCodeArr: [
  //     ['eco:role:query', 'eco:user:update']
  //   ]
  // },
  // 'eco:user:delete': {
  //   label: '修改生态用户',
  //   routeCodeArr: [
  //     ['eco:role:query', 'eco:user:delete']
  //   ]
  // },
};

export const ecoUserClubElement = {
  'eco:ecoUser:query': {
    label: '生态人员管理俱乐部人员权限',
    routeCodeArr: [
      ['eco:userByRoleID:query']
    ]
  },
  // 'eco:userByRoleID:query': {
  //   label: '角色id查询',
  //   routeCodeArr: [
  //     ['eco:role:query', 'eco:userByRoleID:query']
  //   ]
  // },
  // 'eco:team:query': {
  //   label: '俱乐部',
  //   routeCodeArr: [
  //     ['eco:role:query', 'eco:team:query']
  //   ]
  // },
  // 'eco:userByID:query': {
  //   label: '查询用户是否已经存在',
  //   routeCodeArr: [
  //     ['eco:role:query', 'eco:userByID:query']
  //   ]
  // },
  // 'eco:user:save': {
  //   label: '保存俱乐部用户',
  //   routeCodeArr: [
  //     ['eco:role:query', 'eco:user:save']
  //   ]
  // },
  // 'eco:user:update': {
  //   label: '修改生态用户',
  //   routeCodeArr: [
  //     ['eco:role:query', 'eco:user:update']
  //   ]
  // },
  // 'eco:user:delete': {
  //   label: '删除俱乐部用户',
  //   routeCodeArr: [
  //     ['eco:role:query', 'eco:user:delete']
  //   ]
  // }
};





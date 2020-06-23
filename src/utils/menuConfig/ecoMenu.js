export const EcoMenu = [
  {
    label: "俱乐部",
    index: "club",
    icon: "icon-role",
    children: [
      { label: "人员列表", icon: "icon-role", index: "/club/list", elementCode: 'eco:player:listCub' },
      { label: "我的申请", icon: "icon-role", index: "/club/application", elementCode: 'eco:player:queryOrderWithAllDataClub' },
    ]
  },
  {
    label: "生态",
    index: "eco",
    icon: "icon-admin",
    children: [
      { label: "人员列表", icon: "icon-admin", index: "/eco/list", elementCode: 'eco:player:listEco' },
      { label: "选手信息审核", icon: "icon-admin", index: "/eco/playerAuditInformation", elementCode: 'eco:audit:orderPlayer' },
      { label: "教练信息审核", icon: "icon-admin", index: "/eco/coachInformationAudit", elementCode: 'eco:audit:orderCoach' },
      { label: "模板配置", icon: "icon-admin", index: "/eco/templateConfig", elementCode: 'eco:fileTemplate:query' },
      { label: "赛事时间配置", icon: "icon-admin", index: "/eco/matchTimeConfig", elementCode: 'eco:matchTime:saveConfig' },
    ]
  },
  {
    label: "生态人员配置",
    index: "staffing",
    icon: "icon-admin",
    children: [
      { label: "生态人员管理", icon: "icon-admin", index: "/staffing/ecoList",  elementCode: 'eco:user:query' },
      { label: "俱乐部人员管理", icon: "icon-admin", index: "/staffing/clubList",  elementCode: 'eco:ecoUser:query' }
    ]
  }
]

const service = 'DM';

export const WonderfulMatchRoute = [
  {
    service: service,
    method: 'GET',
    path: '/admin/wonderful_match/query',
    routeCode: 'wonderful:match:query',
    label: '精彩比赛查询'
  },
  {
    service: service,
    method: 'GET',
    path: '/admin/wonderful_match/querySeason',
    routeCode: 'wonderful:match:querySeason',
    label: '赛季查询'
  },
  {
    service: service,
    method: 'GET',
    path: '/admin/wonderful_match/queryMatchs',
    routeCode: 'wonderful:match:queryMatchs',
    label: '赛程查询'
  },
  {
    service: service,
    method: 'POST',
    path: '/admin/wonderful_match/saveCloudService',
    routeCode: 'wonderful:match:save',
    label: '保存到公网路径'
  },
  {
    service: service,
    method: 'GET',
    path: '/admin/wonderful_match/queryAll',
    routeCode: 'wonderful:match:queryAll',
    label: '查询所有'
  }
];

import { AuthRoute } from './authRoute';
import { EcoRoute } from './ecoRoute';
import { WonderfulMatchRoute } from './wonderfulMatchRoute';

// 与elementConfig关联----通过routecode关联
// routeCodeArr---两级数组，第一级数组or判断，第二级数据and判断
export const RouteConfig = [
  ...AuthRoute,
  ...EcoRoute,
  ...WonderfulMatchRoute
];

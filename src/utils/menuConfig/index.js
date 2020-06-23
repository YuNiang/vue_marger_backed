import { AuthMenu } from './authMenu';
import { EcoMenu } from './ecoMenu';
import { WonderfulMatchMenu } from './wonderfulMatchMenu';

// 与elementConfig关联---通过elementCode关联
export const Menu = [
  {
    label: "Dashboard",
    index: "/dashboard",
    icon: "icon-dashboard"
  },
  ...AuthMenu,
  ...EcoMenu,
  ...WonderfulMatchMenu
];

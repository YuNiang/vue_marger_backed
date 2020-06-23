import { AuthElement } from './authElement';
import { clubListElement, ecoListElement, 
  ecoPlayerElement, ecoCoachElement, ecoTempElement, ecoTimeConfigElement,
  ecoUserElement, ecoUserClubElement } from './ecoElement';
import { wonderfulMatchElement } from './wonderfulMatchElement';


// 与routeConfig关联---通过routeCode关联 
// &&  与menuConfig关联---通过elementCode关联
// &&  与页面功能按钮关联---通过elementCode关联
export const ElementConfig = {
  ...AuthElement,
  ...clubListElement,
  ...ecoListElement,
  ...ecoPlayerElement,
  ...ecoCoachElement,
  ...ecoTempElement,
  ...ecoTimeConfigElement,
  ...ecoUserElement,
  ...ecoUserClubElement,
  ...wonderfulMatchElement
};

import Vue from 'vue'
import VueLazyload from 'vue-lazyload';
import App from './app'
import router from './router'
import store from './store'
import './assets/less/reset.less'
import './plugins/element'
import './utils/filters'
import VueClipboards from 'vue-clipboards'
import { ElementConfig } from './utils/elementConfig'

Vue.use(VueLazyload);
Vue.use(VueClipboards)
Vue.config.productionTip = false
// Vue.use(VueLazyload, {
//   preLoad: 1.3,
//   error: "https://static.tjstats.com/img/loading.svg",
//   loading: "https://static.tjstats.com/img/loading.svg",
//   attempt: 1,
//   lazyComponent: true,
//   adapter: {}
// });
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
});

Vue.prototype.hasAuth = (elementCode) => {
  let hasAuth = false;
  if (localStorage.routeCodeObj){
    let authRouteCodeObj = JSON.parse(localStorage.routeCodeObj);
    if (ElementConfig[elementCode]) { // 是两级数组
      for (let codeArr of ElementConfig[elementCode].routeCodeArr) {
        hasAuth = true;
        for (let code of codeArr) {
          if (!authRouteCodeObj[code]) {
            hasAuth = false;
            break;
          }
        }
        if (hasAuth) {
          break;
        }
      }
    }
  }
  return hasAuth;
};

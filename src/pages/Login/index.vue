<template>
  <div class="login">
    <div class="login-cont">
      <el-card style="height: 500px;width: 356px;" class="box-card">
        <div slot="header" class="clearfix">
          <span>欢迎来到腾竞体育</span>
        </div>
        <iframe id="login_iframe" style="height: 500px;width: 356px;border: 0px;" src="https://vip.tjstats.com/dm_login/"></iframe>
      </el-card>
    </div>
  </div>
</template>

<script>
import { PostLogin } from '@/api'
import { RouteConfig } from '@/utils/routeConfig'
import { Menu } from '@/utils/menuConfig'

export default {

  data () {
    return {
      loading: false,
    }
  },
  created(){
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');
    if(code){
      this.handleSubmit(code);
    }
  },
  methods: {
    handleSubmit (code) {
      this.loading = true
      const _params = {
        code: code
      };
      PostLogin(_params)
        .then(result => {
          this.loading = false;
          let {success, errMsg, data} = result;
          if (!success) {
            this.$message.error(errMsg || '错误！');
            return ;
          }
          if (data) {
            if (data.authRoutes.length <= 0) {
              this.$message.error('您没有任何权限！');
              return false
            }
            let routeCodeObj = this.buildRouteCodeArr(data.authRoutes);
            let menu = this.buildMenu();
            let index = menu[0].children ? menu[0].children[0].index : menu[0].index;
            localStorage.user = JSON.stringify(data.user);
            localStorage.token = data.authorization;
            localStorage.menu = JSON.stringify(menu);
            localStorage.teamInfo = data.teamInfo ? JSON.stringify(data.teamInfo) : '';
            this.$message.success('登录成功！');
            this.$router.push({
              path: index
            })
          }
        })
        .catch(error => {
          this.loading = false;
          this.$message.error(error.message || '错误！')
        })
    },
    buildRouteCodeArr (authRoutes) { // 将所有接口的对应的code存起来，以便菜单或按钮渲染
      const routeCodeObj = {};
      const routeCodeMap = RouteConfig.reduce((result, item) => {
        result[`${item.service}:${item.method}:${item.path}`] = item.routeCode;
        return result;
      }, {});
      authRoutes.forEach(route => {
        const routeCode = routeCodeMap[`${route.service}:${route.method}:${route.path}`];
        if (routeCode) routeCodeObj[routeCode] = routeCode;
      });
      localStorage.routeCodeObj = JSON.stringify(routeCodeObj);
      return routeCodeObj;
    },
    buildMenu () { // 根据权限组织菜单
      let finalMenu = [];
      Menu.forEach(menuItem => {
        if (menuItem.children) {
          let children = [];
          menuItem.children.forEach(menuChildItem => {
            if (this.hasAuth(menuChildItem.elementCode)) {
              children.push(menuChildItem);
            }
          });
          if (children.length > 0) {
            menuItem.children = children;
            finalMenu.push(menuItem)
          }
        } else {
          finalMenu.push(menuItem)
        }
      });
      return finalMenu;
    }
  }
}
</script>

<style lang="less">
  .login {
    height: 100%;
    background-color: #f8f8f8;
    background-image: url(../../assets/img/bg.jpg);
    background-repeat: no-repeat;
    background-size: cover;
    position: relative;
    background-position: center;

    &-cont {
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -60%);
      width: 300px;
      padding: 15px;
    }
  }
</style>

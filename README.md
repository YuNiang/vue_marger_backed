## BHDOTC 后台管理系统

> A Vue.js spa project. vue-cli2.x 架构的单页应用

> vue2.x + vuex + vue-router + element-ui + axios

## 目录结构
``` bash
├── build/                          * webpack 配置文件
├── config/                         * 全局配置（webpack）
├── dist/                           * 打包生成的静态文件
├── node_modules/                   * Node 模块
├── src/                            * 源代码存放路径
|   └── api/                        * API 接口配置
|   └── assets/                     * 资源文件
|   └── components/                 * 自定义组件
|   └── pages/                      * 页面级别路由
|       └── Login/                  * 登录页面
|       └── Main/                   * 登录后的 layout
|       └── views/                  * 登录后的功能模块页面
|           └── admin/              * 活动模块
|           └── authority/          * 权限模块
|           └── dashboard/          * Dashboard
|           └── user/               * 用户模块
|           └── kyc/                * KYC模块
|           └── gateway/            * 网关模块
|           └── fund/               * 流水模块
|           └── order/              * 订单模块
|           └── deposit/            * 充值模块
|           └── withdraw/           * 提现模块
|           └── trade/              * 交易模块
|           └── robot/              * 做市商模块
|           └── luck/               * 幸运购模块
|           └── luckTemplate/       * 幸运购模板模块
|           └── scratch/            * 刮刮卡模块
|           └── recharge/           * 充值大礼包模块
|           └── goods/              * 分红仓模块
|           └── dividendBudget/     * 分红仓预算统计模块
|           └── dividendOrder/      * 分红仓订单模块
|           └── dividendSetting/    * 平台分红设置模块
|           └── dividendSummarize/  * 分红汇总模块
|           └── inviter/            * 邀请收益模块
|           └── forum/              * 社区模块
|           └── ...
|   └── router/                     * 路由配置
|   └── store/                      * Vuex 配置
|       └── modules/                * Vuex 子模块配置
|       └── index.js                * Vuex 入口配置
|       └── mutation-types.js       * Vuex Mutation 全局配置
|   └── util/                       * 工具类
|       └── auth.js                 * 权限管理配置
|       └── errorMsg.js             * 错误提示信息配置
|       └── fetch.js                * 请求封装配置
|       └── filters.js              * Vue 过滤器配置
|       └── util.js                 * 工具配置
|       └── validator.js            * 表单校验
|   └── app.vue
|   └── main.js                     * 入口文件
├── statics/                        * 不参与打包静态资源
|       └── lib/                    * 不参与打包的第三方库
|       └── favicon.ico             
├── .babelrc                        * babel 配置
├── .eslintrc.js                    * eslint 配置
├── .gitignore                      * git 忽略文件
├── index.html                      * 入口 html
├── package.json
```

## Build Setup

``` bash
# 全局安装 yarn 命令
npm install -g yarn

# install dependencies
yarn install

# serve with hot reload at localhost:8080
yarn dev

# build for production with minification
yarn build
```

## 说明

- 所有修改完成后，需要执行 build 命令后上传 git。服务器将自动部署。

<template lang="html">
  <el-card>
    <div slot="header">
      <el-button @click="$router.go(-1)" size="mini" type="primary">返回</el-button>
      <span>角色接口设置</span>
    </div>

    <el-row :gutter="10">
      <el-col :sm="24">
        <el-form :model="form" :rules="rules" ref="form" label-width="120px">
          <el-form-item label="角色名称" prop="name">
            <el-input v-model="form.name" disabled></el-input>
          </el-form-item>

          <el-form-item label="接口">
            <el-tabs v-model="activeTabs" type="border-card" @tab-click="queryRoutesByService">
              <el-tab-pane v-for="(arr, key) in displayRoutes" :label="key" :key="key" :name="key">

                <el-card v-for="card of (serviceRouteCard[key] ? serviceRouteCard[key] : [])" :key="card">
                  <div slot="header">
                    <span>{{card}}</span>
                  </div>
                  <div v-for="(displayRoute, routeIndex) of arr" :key="displayRoute.method + ': ' + displayRoute.path" class="route-item"
                       v-if="displayRoute.path.split('/')[sortLevel] === card">
                    <el-checkbox :label="displayRoute.remark + ' (' + displayRoute.method + ': ' + displayRoute.path + ' )'"
                                 v-model="displayRoute.checked"></el-checkbox>
                    <i class="el-icon-edit" @click="showRouteFilter(key, routeIndex)" v-show="displayRoute.checked"></i>
                    <div class="route-filter" v-show="!!displayRoute.hasRouteFilter && !!displayRoute.checked">
                      <div v-for="(routerFilterValue, routeFilterKey) in displayRoute.routeFilterObj" :key="routeFilterKey" class="route-filter-item">
                        <el-form class="el-form--inline" label-width="25px">
                          <el-form-item :label="routeFilterKey" v-show="routeFilterKey === 'JWT'">
                            <el-input size="mini" placeholder="请以逗号分隔"
                                      v-model="displayRoute.routeFilterObj[routeFilterKey]">
                            </el-input>
                          </el-form-item>
                        </el-form>
                      </div>
                    </div>
                  </div>
                </el-card>

              </el-tab-pane>
            </el-tabs>
            <div v-show="!routesValidator">
              <small>请选择接口</small>
            </div>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" :loading="form.loading" @click="handleClick" :disabled="form.noClick">提交</el-button>
            <el-button @click="reset">重置</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>

  </el-card>
</template>

<script>
  import * as API from '@/api/admin'

  export default {
    name: 'rolesetroute',

    data () {
      return {
        form: {
          loading: false,

          roleID: null,
          name: '',
          roleRoutes: []
        },
        routesValidator: true,
        displayRoutes: {},
        serviceRouteCard: {},
        sortLevel: 2,
        serviceLoading: {}, // 点击service进行加载 loading...
        activeTabs: null
      }
    },

    created () {
      this.form.roleID = this.$route.query.id;
      this.form.name = this.$route.query.name;

      // 查询service
      API.GetAuthDistinctOptions()
        .then(result => { // 获取所有服务名称
          let {success, errMsg, data} = result;
          if (!success) {
            this.$message.error(errMsg || '错误！');
            return;
          }
          if (data) {
            let serviceArr = [];
            data.forEach(service => {
              serviceArr.push(service.name)
            });
            serviceArr = serviceArr.sort((a, b) => { return a.localeCompare(b) });
            serviceArr.forEach(item => {
              this.displayRoutes[item] ? '' : this.$set(this.displayRoutes, item, []);
              this.serviceLoading[item] = false;
            });

            // 编辑时 获取当前角色拥有的接口 +  对应service下的接口
            API.GetAuthRoleRoute({ roleID: this.form.roleID, authPage: true })
              .then(result => {
                let {success, errMsg, data} = result;
                if (!success) {
                  this.$message.error(errMsg || '错误！');
                  return;
                }
                if (data) {
                  let {roleRouteArr, serviceRoute} = data;
                  // 当前角色对应接口信息---组织form.routes -- 编辑时有值
                  if (roleRouteArr.length) {
                    this.buildFormRoleRoute(roleRouteArr);
                    // 根据角色接口信息 默认展开和显示 接口 -- 编辑时
                    for (let service in serviceRoute) {
                      this.activeTabs && Number(this.activeTabs) ? '' : this.activeTabs = service;
                      this.buildDisplayRoute(serviceRoute[service], service)
                    }
                  }
                }
                // 如果没有任何权限，则设置默认值
                if (!(this.activeTabs && Number(this.activeTabs))) {
                  this.activeTabs = serviceArr[0];
                  this.queryRoutesByService({name: serviceArr[0]});
                }
              });
          }
        });
    },

    methods: {
      showRouteFilter(key, routeIndex) {
        let displayRoute = this.displayRoutes[key][routeIndex];
        displayRoute.hasRouteFilter = !displayRoute.hasRouteFilter;
      },
      queryRoutesByService (tab, event) {
        const service = tab.name;
        this.serviceLoading[service] = true;
        if (this.displayRoutes[service] && !this.displayRoutes[service].length) {
          API.GetAuthRouteByService({service}) // 获取接口  + 并标记当前角色已有接口
            .then(result => {
              let {success, errMsg, data} = result;
              this.serviceLoading[service] = false;
              if (!success) {
                this.$message.error(errMsg || '错误！');
                return;
              }
              if (data) {
                this.buildDisplayRoute(data, service)
              }
            })
        }
      },
      buildFormRoleRoute (roleRouteArr) {
        this.form.roleRoutes = [];
        roleRouteArr.forEach(item => {
          let routeFilterObj, routeFilter = item.routeFilter;
          if (!routeFilter || !JSON.parse(routeFilter).Required || !Object.keys(JSON.parse(routeFilter).Required).length) {
            routeFilterObj = {JWT: [], Path: [], Query: [], Body: []};
          } else {
            routeFilterObj = JSON.parse(routeFilter).Required;
            routeFilterObj.Path = routeFilterObj.Path ? routeFilterObj.Path : [];
            routeFilterObj.Query = routeFilterObj.Query ? routeFilterObj.Query : [];
            routeFilterObj.Body = routeFilterObj.Body ? routeFilterObj.Body : [];
          }
          for (let k in routeFilterObj) {
            routeFilterObj[k] = routeFilterObj[k] ? [...routeFilterObj[k]].join(",") : '';
          }
          this.form.roleRoutes.push({
            id: item.id,
            roleID: item.roleID,
            routeID: item.routeID,
            routeFilter: routeFilter,
            routeFilterObj: routeFilterObj
          })
        });
      },
      buildDisplayRoute (routes, service) { // 单个 service下的 每个route进行数据组织
        this.displayRoutes[service] = [];
        this.serviceRouteCard[service] = new Set();
        routes.forEach(item => {
          let pathStringArr = item.path.split("/");
          pathStringArr[this.sortLevel] ? this.serviceRouteCard[service].add(pathStringArr[this.sortLevel]) : '';
          item.hasRouteFilter = false;
          item.checked = false;
          item.routeFilterObj = {
            JWT: '',
            Path: '',
            Query: '',
            Body: ''
          };
          this.form.roleRoutes.forEach(formRoute => {
            if (item.id === formRoute.routeID) {
              item.checked = true;
              item.routeFilterObj = {...formRoute.routeFilterObj};
              if (item.routeFilterObj.JWT) {
                item.hasRouteFilter = true;
              }
            }
          }); // 标记当前角色已有接口
          this.displayRoutes[service].push(item);
        });
        // 排序
        this.serviceRouteCard[service] = [...this.serviceRouteCard[service]].sort((a, b) => {
          return a.localeCompare(b);
        });
        this.displayRoutes[service] = this.displayRoutes[service].sort((a, b) => {
          return a.path.localeCompare(b.path);
        })
      },
      checkAndBuildRoutes () {
        let oldRoleRoutes = this.form.roleRoutes, newRoleRoutes = [], oldRouteIds = [], newRouteIds = [];
        let deleteIds = [], updateNoChangeRoleRoutes = [], updateRoleRoutes = [], addRoleRoutes = [], noChangeRoleRoutes = [];

        // newRoleRoutes
        for (let key in this.displayRoutes) {
          this.displayRoutes[key].forEach(displayRoute => {
            if (displayRoute.checked) {
              let routeFilterObj = {};
              let displayRouteFilterObj = {...displayRoute.routeFilterObj};
              for (let k in displayRouteFilterObj) {
                if (displayRouteFilterObj[k] && displayRouteFilterObj[k].trim()) { // 处理routerfilter
                  let arr = displayRouteFilterObj[k].split(",").filter(item => {
                    return item && item.trim();
                  }).map(item => {
                    return item.trim();
                  });
                  arr.length ? routeFilterObj[k] = [...new Set(arr)] : '';
                }
              }
              newRoleRoutes.push({
                roleID: this.form.roleID,
                routeID: displayRoute.id,
                routeFilter: JSON.stringify({Required: routeFilterObj})
              });
              // newRouteIds
              newRouteIds.push(displayRoute.id)
            }
          });
        }

        // 开始组织返回结果集
        oldRoleRoutes.forEach(oldRoleRoute => {
          oldRouteIds.push(oldRoleRoute.routeID);
          if (!newRouteIds.includes(oldRoleRoute.routeID)) { // deleteIds
            deleteIds.push(oldRoleRoute.id)
          } else {
            updateNoChangeRoleRoutes.push(oldRoleRoute); // updateRoleRoutes
          }
        });

        newRoleRoutes.forEach(newRoleRoute => {
          if (!oldRouteIds.includes(newRoleRoute.routeID)) { // addRoleRoutes
            addRoleRoutes.push(newRoleRoute);
          } else { // updateRoleRoutes
            updateNoChangeRoleRoutes.forEach(oldRoleRoute => {
              if (oldRoleRoute.routeID === newRoleRoute.routeID) {
                delete oldRoleRoute.routeFilterObj;
                if(oldRoleRoute.routeFilter === newRoleRoute.routeFilter){
                  noChangeRoleRoutes.push(oldRoleRoute)
                } else {
                  oldRoleRoute.routeFilter = newRoleRoute.routeFilter;
                  updateRoleRoutes.push(oldRoleRoute)
                }
              }
            });
          }
        });

        // 返回
        this.routesValidator = newRoleRoutes.length > 0;
        return {updateRoleRoutes, addRoleRoutes, deleteIds, noChangeRoleRoutes};
      },
      handleClick () {
        let {deleteIds, updateRoleRoutes, addRoleRoutes, noChangeRoleRoutes} = this.checkAndBuildRoutes();
        if (this.routesValidator) {
          this.$refs.form.validate((valid) => {
            if (valid) {
              this.form.loading = true;
              this.form.noClick = true;
              const params = {
                deleteIds: deleteIds,
                updateRoleRoutes: updateRoleRoutes,
                addRoleRoutes: addRoleRoutes
              };
              API.POSTAuthRoleRouteBulk(params)
                .then(result => {
                  this.form.loading = false;
                  this.form.noClick = null;
                  let {success, errMsg, data} = result;
                  if (!success) {
                    this.$message.error(errMsg || '错误！');
                  } else {
                    this.buildFormRoleRoute(data.concat(noChangeRoleRoutes));
                    this.$message.success('设置接口成功！');
                    setTimeout(() => {
                      this.$router.go(-1)
                    }, 1500)
                  }
                })
                .catch(error => {
                  this.form.loading = false;
                  this.$message.error(error.message)
                })
            }
          })
        }
      },
      reset () {
        for (let key in this.displayRoutes) {
          this.buildDisplayRoute(this.displayRoutes[key], key)
        }
      }
    }
  }
</script>

<style lang="css">
  .el-checkbox__label {
    position: relative;
    top: 4px;
    width: 390px;
    text-overflow: ellipsis;
    overflow: hidden;
  }
</style>

<style lang="less" scoped>
  small {
    color: #f56c6c;
  }

  .el-tab-pane {
    -webkit-column-width: 480px; /* Chrome, Safari, Opera */
    -moz-column-width: 480px; /* Firefox */
    column-width: 480px;

    .el-card {
      height: 100%;
      overflow: auto;
      margin-bottom: 10px;

      .route-item {
        width: 440px;
        vertical-align: top;

        i {
          float: right;
          font-size: 20px;
          font-weight: 800;
          line-height: 40px;
          color: #409EFF;

          &:hover,
          &:active {
            cursor: pointer;
            opacity: 0.6;
          }
        }

        .route-filter {
          box-sizing: border-box;
          margin: 3px 0;
          padding: 10px 5px;
          border-radius: 5px;
          background-color: rgba(208, 208, 208, 0.15);

          &:not(:last-child) .el-button:not(:last-child) {
            display: none;
          }

          .route-filter-item {
            margin: 4px 0;

            * {
              margin: 0 2px;
            }

            .el-input {
              width: 370px;
            }
          }
        }
      }
    }
  }

</style>

<template lang="html">
  <el-card>
    <div slot="header">
      <el-button @click="$router.go(-1)" size="mini" type="primary">返回</el-button>
      <span>{{pageName}}</span>
    </div>

    <div>
      <el-row :gutter="10">
        <el-col :sm="12">
          <el-form :model="form" :rules="rules" ref="form" label-width="120px">
            <el-form-item label="账户" prop="IDName">
              <el-input v-model="form.IDName" disabled></el-input>
            </el-form-item>

            <el-form-item label="角色" prop="roleIds">
              <el-checkbox-group v-model="form.roleIds">
                <el-checkbox v-for="item of allRoles" :label="item.id" :key="item.id" @xhange="setRoute(item.id)">{{item.name}}</el-checkbox>
              </el-checkbox-group>
            </el-form-item>

            <el-form-item class="center">
              <el-button type="primary" :loading="form.loading" @click="handleClick" :disabled="noClick">提交</el-button>
              <el-button type="default" @click="reset">重置</el-button>
            </el-form-item>
          </el-form>
        </el-col>

        <el-col :sm="12">
          <label>接口</label>
          <div>
            <el-tree v-loading="routeLoading"
              ref="tree"
              :props="treeProps"
              :data="routes.data"
              node-key="id"
              :default-expand-all="true">
            </el-tree>
          </div>
        </el-col>
      </el-row>
    </div>
  </el-card>
</template>

<script>
  import * as API from '@/api/admin'

  export default {
    name: 'usersetrole',

    data () {
      return {
        pageName: '',
        routeLoading: false,
        loading: false,
        noClick: null,
        form: {
          userID: '',
          IDName: '',
          roleIds: []
        },
        allRoles: [],
        treeProps: {
          label: 'label',
          children: 'children'
        },

        routes: {
          data: [],
          roleRouteArr: []
        },
        default: {
          roleIds: [],
          treeData: [],
          userRoleArr: [],
          roleRouteArr: [],
        }
      }
    },

    computed: {
      rules () {
        return {
          roleIds: [
            { required: true, message: '请选择角色', trigger: 'blur' },
          ]
        }
      }
    },

    watch: {
      'form.roleIds' (newVal, oldVal) {
        if (newVal.length -oldVal.length === 1 || oldVal.length -newVal.length === 1) {
          let arr = [];
          if (newVal.length > oldVal.length) { // 添加了角色
            this.routeLoading = true;
            arr = newVal.filter(roleID => {
              return !oldVal.includes(roleID);
            });
            API.GetAuthRoleRoute({ roleID: arr[0], authPage: false }) // 编辑
              .then(result => {
                let {success, errMsg, data} = result;
                this.routeLoading = false;
                if (!success) {
                  this.$message.error(errMsg || '错误！');
                  return;
                }
                if (data) {
                  this.routes.roleRouteArr = this.routes.roleRouteArr.concat(data);
                  this.buildTreeData();
                }
              });
          } else { // 取消了角色
            arr = oldVal.filter(roleID => {
              return !newVal.includes(roleID);
            });
            this.routes.roleRouteArr = this.routes.roleRouteArr.filter(roleRoute => {
              return roleRoute.roleID !== arr[0]
            });
            this.buildTreeData();
          }
        }
      }
    },

    mounted () {
      this.form.userID = this.$route.query.id;
      this.form.IDName = this.$route.query.IDName;
      // 获取所有角色
      API.GetAuthRoleAll()
        .then(result => {
          let {success, errMsg, data} = result;
          if (!success) {
            this.$message.error(errMsg || '错误！');
            return;
          }
          if (data) {
            this.allRoles = data.sort((a, b) => {
              return a.name.localeCompare(b.name);
            });
          }
        });
      // 当前用户对应角色信息----- 编辑时有值
      API.GetAuthUserRole({ userID: this.form.userID })
        .then(result => {
          let {success, errMsg, data} = result;
          if (!success) {
            this.$message.error(errMsg || '错误！');
            return;
          }
          if (data) {
            let {userRoleArr, roleRouteArr} = data;
            this.form.roleIds = [];
            userRoleArr.forEach(appRole => {
              this.form.roleIds.push(appRole.roleID)
            });
            this.setData(userRoleArr, roleRouteArr);
          }
        });
    },

    methods: {
      buildTreeData () {
        let roleRouteArr = this.routes.roleRouteArr.sort((a, b) => { return a.route.path.localeCompare(b.route.path) });
        let serviceSet = new Set();
        roleRouteArr.forEach(roleRoute => {
          serviceSet.add(roleRoute.route.service)
        });
        let serviceArr = [...serviceSet].sort((a, b) => {return a.localeCompare(b)});
        this.routes.data = [];
        for (let service of serviceArr) {
          let obj = {
            label: service,
            children: []
          };
          let childrenRouteIDSet = new Set();
          roleRouteArr.forEach(roleRoute => {
            if (roleRoute.route.service === service && ![...childrenRouteIDSet].includes(roleRoute.routeID)) {
              childrenRouteIDSet.add(roleRoute.routeID);
              obj.children.push({
                label: roleRoute.route.remark + ' ( ' + roleRoute.route.method + ': ' + roleRoute.route.path + ')',
                id: roleRoute.routeID
              })
            }
          });
          this.routes.data.push(obj)
        }
      },
      handleClick () {
        this.$refs.form.validate((valid) => {
          if (valid) {
            this.form.loading = true;
            this.noClick = true;
            let {deleteIds, addUserRoles, noChangeUserRoles} = this.getParams();
            API.POSTAuthUserRoleBulk({deleteIds, addUserRoles})
              .then(result => {
                let {success, errMsg, data} = result;
                this.form.loading = false;
                this.noClick = null;
                if (!success) {
                  this.$message.error(errMsg || '错误！');
                } else {
                  this.setData(data.concat(noChangeUserRoles), this.routes.roleRouteArr);
                  this.$message.success('设置角色成功！');
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
      },
      getParams () {
        let noChangeUserRoles = [], deleteIds = [], addUserRoles = [],
          newRoleIds = this.form.roleIds, oldRoleIds = this.default.roleIds, oldUserRole = this.default.userRoleArr;
        oldUserRole.forEach(userRole => {
          if (!newRoleIds.includes(userRole.roleID)) {
            deleteIds.push(userRole.id)
          } else {
            noChangeUserRoles.push(userRole)
          }
        });
        newRoleIds.forEach(roleID => {
          if (!oldRoleIds.includes(roleID)) {
            addUserRoles.push({
              userID: this.form.userID,
              roleID: roleID
            })
          }
        });
        return {deleteIds, addUserRoles, noChangeUserRoles}
      },
      setData (userRoleArr, roleRouteArr) {
        this.routes.roleRouteArr = roleRouteArr;
        this.default.roleIds = [...this.form.roleIds];
        this.default.roleRouteArr = roleRouteArr;
        this.default.userRoleArr = userRoleArr;
        this.buildTreeData();
        this.default.treeData = this.routes.data;
      },
      reset () {
        this.form.roleIds = [...this.default.roleIds];
        this.routes.data = [...this.default.treeData];
        this.routes.roleRouteArr = [...this.default.roleRouteArr];
      }
    }
  }
</script>

<style lang="less">
  .center {
    text-align: center;
  }

  .el-col:last-child{
    padding-left: 40px!important;
  }

  .el-form .el-checkbox,
  .el-form .el-checkbox+.el-checkbox{
    width: 190px;
    margin-left: 0;
    margin-right: 30px;
  }
</style>

<template lang="html">
  <el-container>
    <el-aside :width="asideWidth" style="background-color: #545c64;">
      <el-menu
        :default-active="activeName"
        class="el-menu-vertical-demo"
        :collapse="isCollapse"
        :unique-opened="true"
        :router="true"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b">
        <template v-for="item in menu">
          <el-menu-item :index="item.index" v-if="!item.children" :key="item.index">
            <i class="iconfont" :class="item.icon"></i>
            <span slot="title">{{ item.label }}</span>
          </el-menu-item>
          <el-submenu :index="item.index" v-if="item.children" :key="item.index">
            <template slot="title">
              <i class="iconfont" :class="item.icon"></i>
              <span slot="title">{{ item.label }}</span>
            </template>
            <el-menu-item :index="child.index" v-for="child in item.children" :key="child.index">
              <i class="iconfont" :class="child.icon"></i>
              <span slot="title">{{ child.label }}</span>
            </el-menu-item>
          </el-submenu>
        </template>
      </el-menu>
    </el-aside>

    <el-container>
      <el-header>
        <div class="pull-left">
          <span class="el-icon-sort pointer" style="transform: rotate(90deg);font-size: 20px;" @click="isCollapse = !isCollapse"></span>
        </div>
        <div class="pull-right">
          <el-dropdown trigger="click" @command="handleCommand" style="line-height: 1.465;">
            <el-button type="primary">
              {{ username }} {{ teamInfo ? `${teamInfo.TeamDes} ${teamInfo.TeamGroup}队` : '' }}<i class="el-icon-arrow-down el-icon&#45;&#45;right"></i>
            </el-button>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="setPass">设置密码</el-dropdown-item>
              <el-dropdown-item command="logout">退出</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </el-header>

      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
  import { mapActions } from 'vuex'

  export default {
    data() {
      return {
        isCollapse: null,
        asideWidth: '',
        activeName: ''
      }
    },
    watch: {
      isCollapse (val) {
        localStorage.isCollapse = val
        if (val) {
          setTimeout(() => {
            this.asideWidth = '64px'
          }, 500)
        } else {
          this.asideWidth = '200px'
        }
      },
      '$router' (val) {
        this.activeName = val.path
      }
    },
    beforeCreate() {
      if (!localStorage.token) {
        localStorage.clear()
        this.$router.push({ name: 'login' })
      }
    },
    created () {
      this.isCollapse = localStorage.isCollapse === 'true';
      if (this.isCollapse) {
        setTimeout(() => {
          this.asideWidth = '64px'
        }, 500)
      } else {
        this.asideWidth = '200px'
      }
      this.GetCoins();
      this.activeName = this.$route.path
    },
    computed: {
      username () {
        return localStorage.user ? JSON.parse(localStorage.user).nickname : '';
      },
      menu () {
        return localStorage.menu ? JSON.parse(localStorage.menu) : [];
      },
      teamInfo () {
        return localStorage.teamInfo ? JSON.parse(localStorage.teamInfo) : null;
      }
    },
    methods: {
      ...mapActions([
        'GetCoins'
      ]),

      logout () {
        localStorage.clear();
        this.$router.push({ name: 'login' })
      },

      handleCommand (command) {
        if (command === 'setPass') {
          this.$router.push({
            name: 'adminupdatepassword'
          })
        } else if (command === 'logout') {
          this.logout()
        }
      }
    }
  }
</script>

<style lang="less">
  .el-aside {
    position: relative;
    overflow-y: auto;
  }
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
    position: absolute;
  }
  .el-header {
    background-color: rgb(94, 102, 110);
    color: #fff;
    line-height: 60px;
  }
  .el-container {
    min-height: 100%;
    position: relative;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  }
  .el-menu {
    // border-right-color: transparent;
  }
</style>


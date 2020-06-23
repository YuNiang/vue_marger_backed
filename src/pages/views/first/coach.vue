<template lang="html">
  <el-card>
    <div slot="header">
      <span>教练管理</span>
      <router-link :to="{ name: 'adminnew' }">
        <el-button style="float: right; padding: 3px 0" type="text">添加</el-button>
      </router-link>
    </div>
    <div>
      <label>赛事筛选：</label>
      <el-select v-model="list.seasonId" filterable=true placeholder="筛选" @change="reloadSeasonSearch">
        <el-option v-for="(item, key) in seasons" :key="key" :value="item.id" :label="item.SeasonDesc">
        </el-option>
      </el-select>
      <label>队伍筛选：</label>
      <el-select v-model="list.teamIds" multiple=true multiple-limit=2 filterable=true placeholder="筛选" @change="reloadSearch">
        <el-option v-for="(item, key) in teams" :key="key" :value="item.id" :label="item.TeamDes">
        </el-option>
      </el-select>
      <hr>
      <el-table class="width-full" :stripe="true" size="mini" :data="list.rows" v-loading="list.loading">
        <el-table-column
          prop="adminname"
          label="昵称"
          min-width="100">
        </el-table-column>
        <el-table-column
          prop="idname"
          label="姓名"
          min-width="180">
        </el-table-column>
        <el-table-column
          prop="phone"
          label="电话号码"
          min-width="180">
        </el-table-column>
        <el-table-column
          prop="username"
          label="用户id"
          min-width="100">
        </el-table-column>
        <el-table-column
          prop="TeamDes"
          label="所属队伍"
          min-width="150">
          <template slot-scope="scope">
            <label v-if="!scope.row.editCoach" class="indisable"  @click="edit(scope.row,'editCoach')">{{scope.row.TeamDes}}</label>
            <div v-if="scope.row.editCoach">
              <el-select v-model="scope.row.iTeamId" placeholder="请选择"  @change="editCoach(scope.row.rowIndex)">
                <el-option v-for="item in teamsOwn" :key="item.id" :label="item.TeamDes" :value="item.id">
                </el-option>
              </el-select>
            </div>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        @current-change="searchCoach"
        :page-size="10"
        :page-sizes="10"
        :current-page.sync="list.page"
        layout="prev, pager, next"
        :total="list.count">
      </el-pagination>
    </div>
  </el-card>
</template>

<script>
  import * as API from '@/api/first'
  import * as ADMINAPI from '@/api/admin'

  export default {
    data () {
      return {
        teams:{
        },
        teamsOwn:{
          "-1":{id:-1,TeamDes:"解除教练"}
        },
        seasons:{},
        list: {
          loading: false,
          page: 1,
          seasonId: "",
          teamIds:"",
          date:"",
          count: 0,
          rows: []
        }
      }
    },
    async created () {
      await this.syncInfo();
      this.searchCoach();
    },
    methods: {
      edit (val,column){
        val[column] = true;
      },
      async reloadSeasonSearch(){
        const teams = await API.GetAllTeamBySeason({"iSeasonId":this.list.seasonId});
        this.teamsOwn = {"-1":{id:-1,TeamDes:"解除教练"}};
        this.teams = {};
        for(var i = teams.length - 1; i >= 0; i--){
          let detail = teams[i];
          this.teams[detail.id] = detail;
          this.teamsOwn[detail.id] = detail;
        }
        this.list.page = 1;
        this.searchCoach();
      },
      reloadSearch(){
        this.list.page = 1;
        this.searchCoach();
      },
      async editCoach (rowIndex){
        const detail = this.list.rows[rowIndex];
        var data = {
          sUnionid:detail.username,
          iTeamId:detail.iTeamId,
        };
        this.list.loading = true;
        API.UpdateCoach(data).then(data => {
          this.list.loading = false;
          this.list.rows[rowIndex].TeamDes = this.getTeamDes(detail.iTeamId);
          this.list.rows[rowIndex].editCoach = false;
        }).catch(error => {
          this.list.loading = false;
          this.$message.error(error.message || '错误！')
        })
      },
      searchCoach () {
        this.list.loading = true
        const params = {
          page: this.list.page,
          size: 10
        }
        if(this.list.teamIds != ""){
          params.teamIds = this.list.teamIds.join(",");
        }

        ADMINAPI.GetCoach(params)
          .then(data => {
            this.list.loading = false
            this.list.count = parseInt(data.count);
            let coachList = [];
            for(var i = 0; i < data.rows.length; i++){
              let detail = data.rows[i];
              detail.rowIndex = i;
              if(detail.iTeamId){
                detail.TeamDes = this.getTeamDes(detail.iTeamId);
              }else{
                detail.iTeamId = "";
                detail.TeamDes = "请选择";
              }
              detail.editCoach = false;
              coachList.push(detail);
            }
            this.list.rows = coachList;
          })
          .catch(() => {
            this.list.loading = false
          })
      },
      async syncInfo () {
        const seasons = await API.GetAllSeason();
        let condition = {};
        for(var i = seasons.length - 1; i >= 0; i--){
          let detail = seasons[i];
          this.seasons[detail.id] = detail;
          if(i == 0){
            this.list.seasonId = detail.id;
            condition["iSeasonId"] = detail.id;
          }
        }

        const teams = await API.GetAllTeamBySeason(condition);
        for(var i = teams.length - 1; i >= 0; i--){
          let detail = teams[i];
          this.teams[detail.id] = detail;
          this.teamsOwn[detail.id] = detail;
        }
      },
      getTeamDes (teamId) {
        if(this.teams[teamId]){
          return this.teams[teamId].TeamDes;
        }else{
          return "";
        }
      }
    }
  }
</script>

<style lang="css">
  .el-table--enable-row-transition .el-table__body td{height: 53px;}
  /*    .el-input__inner{font-size: 12px;line-height: 24px;height: 24px;padding: 0px 10px;}
      .el-select__caret{line-height: 24px!important;}
      .el-select-dropdown__item{font-size: 12px;height: 24px;line-height: 24px;}*/
</style>

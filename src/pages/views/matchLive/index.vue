<template lang="html">
  <el-card>
    <div slot="header">
      <span>首发列表</span>
    </div>
    <div>
      <label>赛季筛选：</label>
      <el-select v-model="list.seasonId" placeholder="筛选" @change="reloadSeasonSearch" size="mini">
        <el-option v-for="(item, key) in seasons" :key="key" :value="item.id" :label="item.SeasonDesc">
        </el-option>
      </el-select>
      <label>城市筛选：</label>
      <el-select v-model="list.cityId" filterable=true placeholder="筛选" @change="reloadSearch" size="mini">
        <el-option v-for="(item, key) in citys" :key="key" :value="item.id" :label="item.Name">
        </el-option>
      </el-select>
      <label>队伍筛选：</label>
      <el-select v-model="list.teamId"  filterable=true placeholder="筛选" @change="reloadSearch"  size="mini">
        <el-option v-for="(item, key) in teams" :key="key" :value="item.id" :label="item.TeamDes">
        </el-option>
      </el-select>
      <label>日期筛选：</label>
      <el-date-picker
        v-model="list.date"
        type="date"
        size="mini"
        placeholder="选择日期" @change="reloadSearch" value-format="yyyy-MM-dd">
      </el-date-picker>
      <hr>
      <el-table class="width-full" :stripe="true" size="mini" :data="list.rows" v-loading="list.loading" :span-method="objectSpanMethod">
        <el-table-column
          prop="id"
          label="ID"
          min-width="50">
        </el-table-column>
        <el-table-column
          prop="vsInfo"
          label="对阵"
          min-width="50">
        </el-table-column>
        <el-table-column
          prop="location"
          label="地点"
          min-width="40">
        </el-table-column>
        <el-table-column
          prop="start"
          label="比赛时间"
          min-width="100">
          <template slot-scope="scope">
            {{ scope.row.start | MMDDHHmm }}
          </template>
        </el-table-column>

        <el-table-column
          prop="currBo"
          label="小场"
          min-width="40">
        </el-table-column>
        <el-table-column
          label="对局信息"
          min-width="150">
          <template slot-scope="scope">
            <div v-if="scope.row.editplatformGameId">
            <el-select v-model="scope.row.platformGameId" filterable=true value-key="platformGameID"  size="mini" placeholder="编辑" @change="modifyColumn(scope.row.rowIndex,'platformGameId')">
              <el-option v-for="item in games" :key="item.platformGameID" :value="item.platformGameID">
                {{item.startTime | MMDDHHmm}} : {{ item.name }}
              </el-option>
            </el-select>
            </div>
            <div v-if="!scope.row.editplatformGameId" @click="edit(scope.row,'platformGameId')">
            <span v-if="scope.row.platformGameId">
            {{scope.row.startTime | MMDDHHmm}} : {{scope.row.gameName}}
            </span>
            <span v-else>
              --
            </span>
            </div>

          </template>
        </el-table-column>
        <el-table-column
          prop="winTeam"
          label="胜利方"
          min-width="40">
        </el-table-column>

        <el-table-column
          label="MVP"
          prop="sMvp"
          min-width="50">
          <template slot-scope="scope">
            <div v-if="scope.row.editmvp">
              <el-select v-model="scope.row.mvp" filterable=true  size="mini" placeholder="编辑" @change="modifyColumn(scope.row.rowIndex,'mvp')">
                <el-option v-for="item in scope.row.players" :key="item.id" :value="item.id">
                  {{ item.GameName }}
                </el-option>
              </el-select>
            </div>
            <div v-if="!scope.row.editmvp" @click="edit(scope.row,'mvp')">
            <span v-if="scope.row.mvp">
            {{scope.row.sMvp}}
            </span>
              <span v-else>
              请选择
            </span>
            </div>
          </template>
        </el-table-column>

        <el-table-column
          label="直播流"
          prop="stream"
          min-width="70">
        </el-table-column>

        <el-table-column
          prop="sModifyName"
          label="审核人"
          min-width="80">
          <template slot-scope="scope">
            <span v-if="scope.row.sModifyName">
            {{scope.row.sModifyName}}（{{scope.row.dtLastModifyTime}}）
            </span>
            <span v-else>
              --
            </span>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        @current-change="searchMatch"
        :current-page.sync="list.page"
        layout="prev, pager, next"
        :total="list.count">
      </el-pagination>
    </div>
  </el-card>
</template>

<script>
  import * as API from '@/api/matchLive'

  export default {
    data () {
      return {
        players:{},
        teams:{

        },
        seasons:{

        },
        games :{

        },
        citys:{

        },
        list: {
          loading: false,
          page: 1,
          seasonId: "",
          teamId:"",
          date:"",
          count: 0,
          cityId: "",
          rows: []
        }
      }
    },

    async created () {
      await this.syncInfo();
      await this.syncGames();
      this.searchMatch();
    },
    methods: {
      edit (val,column){
        val["edit"+column] = true;
      },
      reloadSearch(){
        this.list.page = 1;
        this.searchMatch(false);
      },
      async reloadSeasonSearch(){
        this.list.page = 1;
        this.searchMatch();
      },
      async modifyColumn(rowIndex,column){
        var data = {
          iMatchId:this.list.rows[rowIndex].id,
          iBo:this.list.rows[rowIndex].currBo,
        };
        data[column] = this.list.rows[rowIndex][column];
        if (column == "platformGameId"){
          data["gameName"] = this.games[data[column]]["name"];
        }
        this.list.loading = true;
        API.ModifyGameRel(data).then(data => {
          this.list.loading = false;
          var ec = "edit" + column;
          this.list.rows[rowIndex][ec] = false;
          this.searchMatch();
        }).catch(error => {
          this.list.loading = false;
          this.$message.error(error.message || '错误！')
        });
      },
      searchMatch () {
        this.list.loading = true;
        const params = {
          page: this.list.page,
        }
        if(this.list.teamId){
          params.teamID = this.list.teamId;
        }
        if(this.list.cityId){
          params.cityCode = this.list.cityId;
        }
        if(this.list.seasonId){
          params.seasonID = this.list.seasonId;
        }
        if(this.list.date){
          params.matchStart = this.list.date;
        }
        API.SearchMatchDetail(params)
          .then(data => {
            this.list.loading = false;
            this.list.count = parseInt(data.count);
            let rows = [];
            for(var i in data.rows){
              let tmp = data.rows[i];
              tmp["editplatformGameId"] = false;
              tmp["editmvp"] = false;
              tmp["rowIndex"] = i;
              rows.push(tmp);
            }
            this.list.rows = rows;
          })
          .catch(() => {
            this.list.loading = false
          })
      },

      async syncInfo () {
        const [seasons,citys] = await Promise.all([API.GetAllSeason(),API.GetAllCitys()]);
        for(var i = seasons.length - 1; i >= 0; i--){
          let detail = seasons[i];
          this.seasons[detail.id] = detail;
          if(i == 0){
            this.list.seasonId = detail.id;
          }
        }
        for(var i = citys.length - 1; i >= 0; i--){
          let detail = citys[i];
          this.citys[detail.id] = detail;
        }
        //开始根据赛事id获取战队信息与队员信息
        const teams = await API.GetAllTeamBySeason({iSeasonId:this.list.seasonId});
        for(var i = teams.length - 1; i >= 0; i--){
          let detail = teams[i];
          this.teams[detail.id] = detail;
        }
      },
      async syncGames(){
       let games = await API.GetOnlineGames({region:"lpl"});
       for(var i in games){
         this.games[games[i].platformGameID] = games[i];
       }
      },
      objectSpanMethod({ row, column, rowIndex, columnIndex }) {
        if(!window.lastMatch){
          window.lastMatch = 0;
        }
        if (columnIndex < 4) {
          if (window.lastMatch != row.id) {
            return {
              rowspan: row.bo,
              colspan: 1
            };
          } else {
            return {
              rowspan: 0,
              colspan: 0
            };
          }
        }else{
          window.lastMatch = row.id;
        }
        //
        // if(columnIndex == 4 || columnIndex == 5 || columnIndex == 8){
        //   if (rowIndex % 2 === 0) {
        //     return {
        //       rowspan: 2,
        //       colspan: 1
        //     };
        //   } else {
        //     return {
        //       rowspan: 0,
        //       colspan: 0
        //     };
        //   }
        // }
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

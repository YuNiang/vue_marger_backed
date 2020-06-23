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
      <el-select v-model="list.cityId" multiple=true multiple-limit=2 filterable=true placeholder="筛选" @change="reloadSearch" size="mini">
        <el-option v-for="(item, key) in citys" :key="key" :value="item.id" :label="item.Name">
        </el-option>
      </el-select>
      <label>队伍筛选：</label>
      <el-select v-model="list.teamId" multiple=true multiple-limit=2 filterable=true placeholder="筛选" @change="reloadSearch"  size="mini">
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
          prop="iMatchId"
          label="ID"
          min-width="50">
        </el-table-column>
        <el-table-column
          prop="avsb"
          label="对阵双方"
          min-width="100">
        </el-table-column>
        <el-table-column
          prop="MatchLocation"
          label="比赛地点"
          min-width="80">
        </el-table-column>
        <el-table-column
          prop="MatchStart"
          label="比赛时间"
          min-width="100">
          <template slot-scope="scope">
            {{ scope.row.MatchStart | MMDDHHmm }}
          </template>
        </el-table-column>

        <el-table-column
          prop="iBo"
          label="小场"
          min-width="40">
        </el-table-column>

        <el-table-column
          label="优先选边"
          min-width="60">
          <template slot-scope="scope">
            <label v-if="!scope.row.editFirstChoose" class="indisable" @click="edit(scope.row,'editFirstChoose')">{{scope.row.f_iFirstChoose}}</label>
            <div v-if="scope.row.editFirstChoose">
              <el-select v-model="scope.row.iFirstChoose"  size="mini"  @blur="hideSelect(scope.row.rowIndex,'editFirstChoose')" @change="changeFirst(scope.row.rowIndex)" placeholder="编辑">
                <el-option v-for="item in scope.row.f_teamChooses" :key="item.id" :label="item.TeamDes" :value="item.id">
                  {{ item.TeamDes }}
                </el-option>
              </el-select>
            </div>
           </template>
        </el-table-column>

        <el-table-column
          prop="f_sTeamDes"
          label="队伍"
          min-width="50">
        </el-table-column>
        <el-table-column
          prop="dtAbortTime"
          label="截止时间"
          min-width="90">
          <template slot-scope="scope" >
            <label v-if="!scope.row.editdtAbortTime" @click="edit(scope.row,'editdtAbortTime')">
            <span v-if="scope.row.dtAbortTime" >
            {{scope.row.dtAbortTime | MMDDHHmm}}
            </span>
              <span v-else>
              --
            </span>
            </label>
            <div v-if="scope.row.editdtAbortTime">
              <el-date-picker
                v-model="scope.row.dtAbortTime"
                type="datetime"
                size="mini"
                format="MM-dd HH:mm"
                @change="changeTime(scope.row.rowIndex,'dtAbortTime')"
                @blur="hideTime(scope.row.rowIndex,'dtAbortTime')"
                value-format="yyyy-MM-dd HH:mm:ss">
              </el-date-picker>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          prop="dtPublishTime"
          label="公布时间"
          min-width="90">
          <template slot-scope="scope" >
            <label v-if="!scope.row.editdtPublishTime" @click="edit(scope.row,'editdtPublishTime')">
              <span v-if="scope.row.dtPublishTime" >
              {{scope.row.dtPublishTime | MMDDHHmm}}
              </span>
              <span v-else>
              --
              </span>
            </label>
            <div v-if="scope.row.editdtPublishTime">
              <el-date-picker
                v-model="scope.row.dtPublishTime"
                type="datetime"
                size="mini"
                format="MM-dd HH:mm"
                @change="changeTime(scope.row.rowIndex,'dtPublishTime')"
                @blur="hideTime(scope.row.rowIndex,'dtPublishTime')"
                value-format="yyyy-MM-dd HH:mm:ss">
              </el-date-picker>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          label="选边"
          min-width="60">
          <template slot-scope="scope">
            <label v-if="!scope.row.editChangeSide" class="indisable" @click="edit(scope.row,'editChangeSide')">{{scope.row.sSide}}</label>
            <div v-if="scope.row.editChangeSide">
              <el-select v-model="scope.row.sSide"  size="mini" placeholder="编辑" @blur="hideSelect(scope.row.rowIndex,'editChangeSide')" @change="changeSide(scope.row.rowIndex)">
                <el-option v-for="item in allSide" :key="item.value" :label="item.value" :value="item.value">
                    {{ item.value }}
                </el-option>
              </el-select>
            </div>
           </template>
        </el-table-column>

        <el-table-column
          label="上单"
          min-width="70">
          <template slot-scope="scope">
            <label v-if="!scope.row.editTOP" class="indisable" @click="edit(scope.row,'editTOP')">{{scope.row.f_iTop}}</label>
            <div v-if="scope.row.editTOP">
              <el-select v-model="scope.row.iTop"  size="mini" placeholder="编辑" @blur="hideSelect(scope.row.rowIndex,'editTOP')" @change="changePlayer(scope.row.rowIndex,'TOP')">
                <el-option v-for="item in scope.row.allPlayers" :key="item.id" :label="item.PlayerDes" :value="item.id" :disabled="item.disabled">
                    {{ item.PlayerDes }}
                </el-option>
              </el-select>
            </div>
           </template>
        </el-table-column>
        <el-table-column
          label="打野"
          min-width="70">
          <template slot-scope="scope">
            <label v-if="!scope.row.editJUG" class="indisable" @click="edit(scope.row,'editJUG')">{{scope.row.f_iJug}}</label>
            <div v-if="scope.row.editJUG">
              <el-select v-model="scope.row.iJug"  size="mini" placeholder="编辑" @blur="hideSelect(scope.row.rowIndex,'editJUG')"  @change="changePlayer(scope.row.rowIndex,'JUG')">
                <el-option v-for="item in scope.row.allPlayers" :key="item.id" :label="item.PlayerDes" :value="item.id" :disabled="item.disabled">
                    {{ item.PlayerDes }}
                </el-option>
              </el-select>
            </div>
           </template>
        </el-table-column>
        <el-table-column
          label="中单"
          min-width="70">
          <template slot-scope="scope">
            <label v-if="!scope.row.editMID" class="indisable" @click="edit(scope.row,'editMID')">{{scope.row.f_iMid}}</label>
            <div v-if="scope.row.editMID">
              <el-select v-model="scope.row.iMid"  size="mini" placeholder="编辑" @blur="hideSelect(scope.row.rowIndex,'editMID')" @change="changePlayer(scope.row.rowIndex,'MID')">
                <el-option v-for="item in scope.row.allPlayers" :key="item.id" :label="item.PlayerDes" :value="item.id" :disabled="item.disabled">
                    {{ item.PlayerDes }}
                </el-option>
              </el-select>
            </div>
           </template>
        </el-table-column>
        <el-table-column
          label="下路"
          min-width="70">
          <template slot-scope="scope">
            <label v-if="!scope.row.editAD" class="indisable" @click="edit(scope.row,'editAD')">{{scope.row.f_iAdc}}</label>
            <div v-if="scope.row.editAD">
              <el-select v-model="scope.row.iAdc"  size="mini" placeholder="编辑" @blur="hideSelect(scope.row.rowIndex,'editAD')" @change="changePlayer(scope.row.rowIndex,'AD')">
                <el-option v-for="item in scope.row.allPlayers" :key="item.id" :label="item.PlayerDes" :value="item.id" :disabled="item.disabled">
                    {{ item.PlayerDes }}
                </el-option>
              </el-select>
            </div>
           </template>
        </el-table-column>
        <el-table-column
          label="辅助"
          min-width="70">
          <template slot-scope="scope">
            <label v-if="!scope.row.editSUP" class="indisable" @click="edit(scope.row,'editSUP')">{{scope.row.f_iSup}}</label>
            <div v-if="scope.row.editSUP">
              <el-select v-model="scope.row.iSup"  size="mini" placeholder="编辑" @blur="hideSelect(scope.row.rowIndex,'editSUP')" @change="changePlayer(scope.row.rowIndex,'SUP')">
                <el-option v-for="item in scope.row.allPlayers" :key="item.id" :label="item.PlayerDes" :value="item.id" :disabled="item.disabled">
                    {{ item.PlayerDes }}
                </el-option>
              </el-select>
            </div>
           </template>
        </el-table-column>
        <el-table-column
          label="教练"
          min-width="70">
          <template slot-scope="scope">
            <label v-if="!scope.row.editCOACH" class="indisable" @click="edit(scope.row,'editCOACH')">{{scope.row.f_iCoach}}</label>
            <div v-if="scope.row.editCOACH">
              <el-select v-model="scope.row.iCoach"  size="mini" placeholder="编辑" @blur="hideSelect(scope.row.rowIndex,'editCOACH')" @change="changePlayer(scope.row.rowIndex,'COACH')">
                <el-option v-for="item in scope.row.allCoachs" :key="item.id" :label="item.sNickName" :value="item.id" :disabled="item.disabled">
                  {{ item.sNickName }}
                </el-option>
              </el-select>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          label="辅助教练"
          min-width="70">
          <template slot-scope="scope">
            <label v-if="!scope.row.editSUBCOACH" class="indisable" @click="edit(scope.row,'editSUBCOACH')">{{scope.row.f_iSubCoach}}</label>
            <div v-if="scope.row.editSUBCOACH">
              <el-select v-model="scope.row.iSubCoach"  size="mini" placeholder="编辑" @blur="hideSelect(scope.row.rowIndex,'editSUBCOACH')" @change="changePlayer(scope.row.rowIndex,'SUBCOACH')">
                <el-option v-for="item in scope.row.allCoachs" :key="item.id" :label="item.sNickName" :value="item.id" :disabled="item.disabled">
                  {{ item.sNickName }}
                </el-option>
              </el-select>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          prop="dtUpdateTime"
          label="最后修改时间"
          min-width="80">
          <template slot-scope="scope">
            {{ scope.row.dtUpdateTime | MMDDHHmm }}
          </template>
        </el-table-column>
        <el-table-column
          prop="sModifyBy"
          label="最后修改人"
          min-width="80">
          <template slot-scope="scope">
            <span v-if="scope.row.sModifyBy">
            {{scope.row.sModifyName}}（{{scope.row.sModifyBy}}）
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
import * as API from '@/api/first'

export default {
  data () {
    return {
      allSide:[{"value":"blue"},{"value":"red"}],
      players:{},
      teamPlayers:{},
      teamCoachs:{},
      teamPos:{

      },
      teams:{

      },
      coachs:{
        "-1":{"id":-1,"sName":"临时教练", "sNickName": "临时教练"},
        "-2":{"id":-2,"sName":"无", "sNickName": "无"},
      },
      seasons:{

      },
      citys:{

      },
      lastMatch:0,
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
    this.searchMatch();
  },
  methods: {
    edit (val,column){
      val[column] = true;
    },
    reloadSearch(){
      this.list.page = 1;
      this.searchMatch(false);
    },
    async reloadSeasonSearch(){
      this.list.page = 1;
      const teams = await API.GetAllTeamBySeason({iSeasonId:this.list.seasonId});
      this.teams = {};
      for(var i = teams.length - 1; i >= 0; i--){
        let detail = teams[i];
        this.teams[detail.id] = detail;
        if(!this.teamCoachs[detail.id]){
          this.teamCoachs[detail.id] = [{"id":-1,"sName":"临时教练", "sNickName": "临时教练"},{"id":-2,"sName":"无", "sNickName": "无"}];
        }
      }
      this.searchMatch();
    },
    hideSelect(rowIndex,column){
      // this.list.rows[rowIndex][column] = false;
    },
    async changeFirst (rowIndex){
      const detail = this.list.rows[rowIndex];
      var data = {
        iMatchId:this.list.rows[rowIndex].iMatchId,
        iBo:this.list.rows[rowIndex].iBo,
        iTeamId:this.list.rows[rowIndex].iTeamId,
        iFirstChoose:detail.iFirstChoose,
        id:this.list.rows[rowIndex].id
      };
      for(var ii in this.list.rows[rowIndex].f_teamChooses){
        if(this.list.rows[rowIndex].f_teamChooses[ii].id == detail.iFirstChoose){
          var chooseTeam = this.list.rows[rowIndex].f_teamChooses[ii];
        }else{
          var otherTeam = this.list.rows[rowIndex].f_teamChooses[ii];
        }
      }
      if (detail.iBo == 1){
        //detail.iFirstChoose
        for(var i = 0; i < detail.BO;i++){
          var row1 = rowIndex + i*2;
          var row2 = rowIndex + (i*2) + 1;
          if(i%2 == 0){
            this.list.rows[row1].iFirstChoose = chooseTeam.id;
            this.list.rows[row1].f_iFirstChoose = chooseTeam.TeamDes;
            this.list.rows[row2].iFirstChoose = chooseTeam.id;
            this.list.rows[row2].f_iFirstChoose = chooseTeam.TeamDes;
          }else{
            this.list.rows[row1].iFirstChoose = otherTeam.id;
            this.list.rows[row1].f_iFirstChoose = otherTeam.TeamDes;
            this.list.rows[row2].iFirstChoose = otherTeam.id;
            this.list.rows[row2].f_iFirstChoose = otherTeam.TeamDes;
          }
        }
      }else{
        this.list.rows[rowIndex].f_iFirstChoose = chooseTeam.TeamDes;
      }
      this.list.loading = true;
      API.UpdateFirst(data).then(data => {
        this.list.loading = false;
        this.list.rows[rowIndex].editFirstChoose = false;
      }).catch(error => {
        this.list.loading = false;
        this.$message.error(error.message || '错误！')
      })
    },
    async changeSide (rowIndex){
      const detail = this.list.rows[rowIndex];
      const side = detail.sSide;
      let modifyIndex = 0;
      var data = {
        iMatchId:this.list.rows[rowIndex].iMatchId,
        iBo:this.list.rows[rowIndex].iBo,
        iTeamId:this.list.rows[rowIndex].iTeamId,
        sSide:side,
        id:this.list.rows[rowIndex].id
      };
      if(rowIndex%2 == 0){
        modifyIndex = rowIndex + 1;
      }else{
        modifyIndex = rowIndex - 1;
      }
      if(side == "red"){
        this.list.rows[modifyIndex].sSide = "blue";
      }else{
        this.list.rows[modifyIndex].sSide = "red";
      }

      this.list.loading = true;
      API.UpdateFirst(data).then(data => {
        this.list.loading = false;
        this.list.rows[rowIndex].editChangeSide = false;
      }).catch(error => {
        this.list.loading = false;
        this.$message.error(error.message || '错误！')
      });
    },
    async changePlayer (rowIndex,pos){
      var data = {
        iMatchId:this.list.rows[rowIndex].iMatchId,
        iBo:this.list.rows[rowIndex].iBo,
        iTeamId:this.list.rows[rowIndex].iTeamId,
        id:this.list.rows[rowIndex].id
      };
      if(pos == "TOP"){
        data["iTop"] = this.list.rows[rowIndex].iTop;
        this.list.rows[rowIndex].f_iTop = this.getPlayerDes(this.list.rows[rowIndex].iTop);
      }
      if(pos == "MID"){
        data["iMid"] = this.list.rows[rowIndex].iMid;
        this.list.rows[rowIndex].f_iMid = this.getPlayerDes(this.list.rows[rowIndex].iMid);
      }
      if(pos == "JUG"){
        data["iJug"] = this.list.rows[rowIndex].iJug;
        this.list.rows[rowIndex].f_iJug = this.getPlayerDes(this.list.rows[rowIndex].iJug);
      }
      if(pos == "AD"){
        data["iAdc"] = this.list.rows[rowIndex].iAdc;
        this.list.rows[rowIndex].f_iAdc = this.getPlayerDes(this.list.rows[rowIndex].iAdc);
      }
      if(pos == "SUP"){
        data["iSup"] = this.list.rows[rowIndex].iSup;
        this.list.rows[rowIndex].f_iSup = this.getPlayerDes(this.list.rows[rowIndex].iSup);
      }
      if(pos == "COACH"){
        data["iCoach"] = this.list.rows[rowIndex].iCoach;
        this.list.rows[rowIndex].f_iCoach = this.getCoachName(this.list.rows[rowIndex].iCoach);
      }
      if(pos == "SUBCOACH"){
        data["iSubCoach"] = this.list.rows[rowIndex].iSubCoach;
        this.list.rows[rowIndex].f_iSubCoach = this.getCoachName(this.list.rows[rowIndex].iSubCoach);
      }
      this.refreshAllPlayers(rowIndex);
      this.list.loading = true;
      API.UpdateFirst(data).then(data => {
        this.list.loading = false;
        var column = "edit" + pos;
        this.list.rows[rowIndex][column] = false;
      }).catch(error => {
        this.list.loading = false;
        this.$message.error(error.message || '错误！')
      });
    },
    refreshAllPlayers(rowIndex){
      let detail = this.list.rows[rowIndex];
      let allPlayers = JSON.parse(JSON.stringify(this.teamPlayers[detail.iTeamId]));
      let allCoachs = {};
      if(typeof(this.teamCoachs[detail.iTeamId]) != "undefined"){
        allCoachs = JSON.parse(JSON.stringify(this.teamCoachs[detail.iTeamId]));
      }
      allPlayers = this.disableMember(allPlayers,detail.iTop);
      allPlayers = this.disableMember(allPlayers,detail.iMid);
      allPlayers = this.disableMember(allPlayers,detail.iJug);
      allPlayers = this.disableMember(allPlayers,detail.iAdc);
      allPlayers = this.disableMember(allPlayers,detail.iSup);
      allCoachs = this.disableMember(allCoachs,detail.iCoach);
      allCoachs = this.disableMember(allCoachs,detail.iSubCoach);
      this.list.rows[rowIndex]["allCoachs"] = allCoachs;
      this.list.rows[rowIndex]["allPlayers"] = allPlayers;
    },
    changeTime(rowIndex,timeType){
      var data = {
        iMatchId:this.list.rows[rowIndex].iMatchId,
        iBo:this.list.rows[rowIndex].iBo,
        iTeamId:this.list.rows[rowIndex].iTeamId,
        id:this.list.rows[rowIndex].id
      };
      if(timeType == "dtAbortTime"){
        data["dtAbortTime"] = this.list.rows[rowIndex].dtAbortTime;
      }else{
        data["dtPublishTime"] = this.list.rows[rowIndex].dtPublishTime;
      }
      this.list.loading = true;
      API.UpdateFirst(data).then(data => {
        this.list.loading = false;
        var column = "edit" + timeType;
        this.list.rows[rowIndex][column] = false;
      }).catch(error => {
        this.list.loading = false;
        this.$message.error(error.message || '错误！')
      });
    },
    hideTime(rowIndex,timeType){
      var column = "edit" + timeType;
      this.list.rows[rowIndex][column] = false;
    },
    searchMatch () {
      this.list.loading = true
      const params = {
        page: this.list.page,
      }
      if(this.list.teamId){
        params.teamId = this.list.teamId;
      }
      if(this.list.cityId){
        params.cityId = this.list.cityId;
      }
      if(this.list.seasonId){
        params.seasonId = this.list.seasonId;
      }
      if(this.list.date){
        params.date = this.list.date;
      }
      API.SearchMatchDetail(params)
        .then(data => {
          window.lastMatch = 0;
          this.list.loading = false
          this.list.count = parseInt(data.count);
          let matchdetails = [];
          let rowIndex = 0;
          for(var i = 0; i < data.rows.length; i++){
            let detail = data.rows[i];
            let teams = detail.TeamInfo.split(",");
            if (teams.length != 2){
              continue
            }
            if(!this.teams[teams[0]] || !this.teams[teams[1]]){
              continue
            }
            let avsb = this.teams[teams[0]].TeamDes + " VS " + this.teams[teams[1]].TeamDes;
            let firsts = {};
            for(var m = 0; m < detail.firsts.length; m++){
              if(firsts[detail.firsts[m].iBo]){
                firsts[detail.firsts[m].iBo][detail.firsts[m].iTeamId] = detail.firsts[m];
              }else{
                firsts[detail.firsts[m].iBo] = {};
                firsts[detail.firsts[m].iBo][detail.firsts[m].iTeamId] = detail.firsts[m];
              }
            }
            let chooseTeams = [this.teams[teams[0]],this.teams[teams[1]]];
            for(var bo in firsts){
              var boTeams = firsts[bo];
              for (var teamid in boTeams){
                var boDetail = boTeams[teamid];
                firsts[bo][teamid]["BO"] = detail.BO;
                firsts[bo][teamid]["MatchLocation"] = detail.MatchLocation;
                firsts[bo][teamid]["MatchStart"] = detail.MatchStart;
                firsts[bo][teamid]["avsb"] = avsb;
                firsts[bo][teamid]["dtPublishTime"] = new Date(boDetail.dtPublishTime);
                firsts[bo][teamid]["dtAbortTime"] = new Date(boDetail.dtAbortTime);
                firsts[bo][teamid]["editdtPublishTime"] = false;
                firsts[bo][teamid]["editdtAbortTime"] = false;
                firsts[bo][teamid]["rowIndex"] = rowIndex;
                firsts[bo][teamid]["editFirstChoose"] = false;
                firsts[bo][teamid]["editChangeSide"] = false;
                firsts[bo][teamid]["editTOP"] = false;
                firsts[bo][teamid]["editJUG"] = false;
                firsts[bo][teamid]["editMID"] = false;
                firsts[bo][teamid]["editAD"] = false;
                firsts[bo][teamid]["editSUP"] = false;
                firsts[bo][teamid]["editCOACH"] = false;
                firsts[bo][teamid]["editSUBCOACH"] = false;
                firsts[bo][teamid]["f_sTeamDes"] = this.getTeamDes(teamid);
                firsts[bo][teamid]["f_teamChooses"] = chooseTeams;
                let allPlayers = JSON.parse(JSON.stringify(this.teamPlayers[teamid]));
                let allCoachs = {};
                if(typeof(this.teamCoachs[teamid]) != "undefined"){
                  allCoachs = JSON.parse(JSON.stringify(this.teamCoachs[teamid]));
                }
                if(!firsts[bo][teamid]["iFirstChoose"]){
                  firsts[bo][teamid]["f_iFirstChoose"] = "编辑";
                }else{
                  firsts[bo][teamid]["f_iFirstChoose"] = this.getTeamDes(firsts[bo][teamid]["iFirstChoose"]);
                }
                if(!firsts[bo][teamid]["sSide"]){
                  firsts[bo][teamid]["sSide"] = "编辑";
                }

                firsts[bo][teamid]["f_iCoach"] = this.getCoachName(firsts[bo][teamid].iCoach);
                if(!firsts[bo][teamid]["iCoach"]) {
                  firsts[bo][teamid]["iCoach"] = "";
                }else{
                  allCoachs = this.disableMember(allCoachs,firsts[bo][teamid]["iCoach"]);
                }

                firsts[bo][teamid]["f_iSubCoach"] = this.getCoachName(firsts[bo][teamid].iSubCoach);
                if(!firsts[bo][teamid]["iSubCoach"]) {
                  firsts[bo][teamid]["iSubCoach"] = "";
                }else{
                  allCoachs = this.disableMember(allCoachs,firsts[bo][teamid]["iSubCoach"]);
                }

                firsts[bo][teamid]["f_iSup"] = this.getPlayerDes(firsts[bo][teamid].iSup);
                if(!firsts[bo][teamid]["iSup"]) {
                  firsts[bo][teamid]["iSup"] = "";
                }else{
                  allPlayers = this.disableMember(allPlayers,firsts[bo][teamid]["iSup"]);
                }

                firsts[bo][teamid]["f_iJug"] = this.getPlayerDes(firsts[bo][teamid].iJug);
                if(!firsts[bo][teamid]["iJug"]) {
                  firsts[bo][teamid]["iJug"] = "";
                }else{
                  allPlayers = this.disableMember(allPlayers,firsts[bo][teamid]["iJug"]);
                }

                firsts[bo][teamid]["f_iMid"] = this.getPlayerDes(firsts[bo][teamid].iMid);
                if(!firsts[bo][teamid]["iMid"]) {
                  firsts[bo][teamid]["iMid"] = "";
                }else{
                  allPlayers = this.disableMember(allPlayers,firsts[bo][teamid]["iMid"]);
                }

                firsts[bo][teamid]["f_iTop"] = this.getPlayerDes(firsts[bo][teamid].iTop);
                if(!firsts[bo][teamid]["iTop"]) {
                  firsts[bo][teamid]["iTop"] = "";
                }else{
                  allPlayers = this.disableMember(allPlayers,firsts[bo][teamid]["iTop"]);
                }

                firsts[bo][teamid]["f_iAdc"] = this.getPlayerDes(firsts[bo][teamid].iAdc);
                if(!firsts[bo][teamid]["iAdc"]) {
                  firsts[bo][teamid]["iAdc"] = "";
                }else{
                  allPlayers = this.disableMember(allPlayers,firsts[bo][teamid]["iAdc"]);
                }
                //处理选项问题
                firsts[bo][teamid]["allPlayers"] = allPlayers;
                firsts[bo][teamid]["allCoachs"] = allCoachs;
                rowIndex ++ ;
                matchdetails.push(firsts[bo][teamid]);
              }
            }
          }
          this.list.rows = matchdetails;
        })
        .catch(() => {
          this.list.loading = false
        })
    },

    async syncInfo () {
      const [coachs,players,seasons,citys] = await Promise.all([API.GetCoachs(),API.GetPlayers(),API.GetAllSeason(),API.GetAllCitys()]);

      for(var i = coachs.length - 1;i >=0;i--){
        let detail = coachs[i];
        this.coachs[detail.id] = detail;
        if(!this.teamCoachs[detail.iTeamId]){
          this.teamCoachs[detail.iTeamId] = [{"id":-1,"sName":"临时教练", "sNickName": "临时教练"},{"id":-2,"sName":"无", "sNickName": "无"}];
        }
        this.teamCoachs[detail.iTeamId].push(detail);
      }
      for(var i = players.length - 1; i >= 0; i--){
        let detail = players[i];
        this.players[detail.id] = detail;
        if(!this.teamPlayers[detail.TeamID]){
          this.teamPlayers[detail.TeamID] = [];
        }
        this.teamPlayers[detail.TeamID].push(detail);
      }
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
      for(var i = players.length - 1; i >= 0; i--){
        let detail = players[i];
        this.players[detail.id] = detail;
        if(!this.teamPlayers[detail.TeamID]){
          this.teamPlayers[detail.TeamID] = [];
        }
        this.teamPlayers[detail.TeamID].push(detail);
      }
      //开始根据赛事id获取战队信息与队员信息
      const teams = await API.GetAllTeamBySeason({iSeasonId:this.list.seasonId});
      for(var i = teams.length - 1; i >= 0; i--){
        let detail = teams[i];
        this.teams[detail.id] = detail;
        if(!this.teamCoachs[detail.id]){
          this.teamCoachs[detail.id] = [{"id":-1,"sName":"临时教练", "sNickName": "临时教练"},{"id":-2,"sName":"无", "sNickName": "无"}];
        }
      }

    },
    disableMember(allPlayers,playerId){
      for (var i = 0; i < allPlayers.length;i++){
        if (allPlayers[i].id == playerId){
          allPlayers[i]["disabled"] = true;
          break;
        }
      }
      return allPlayers;
    },
    getPlayerDes (playerId) {
      if(this.players[playerId]){
        return this.players[playerId].PlayerDes;
      }else{
        return "编辑";
      }
    },
    getCoachName(coachId){
      if(this.coachs[coachId]){
        return this.coachs[coachId].sNickName;
      }else{
        return "编辑";
      }
    },
    getTeamDes (teamId) {
      if(this.teams[teamId]){
        return this.teams[teamId].TeamDes;
      }else{
        return "";
      }
    },
    objectSpanMethod({ row, column, rowIndex, columnIndex }) {
        if(!window.lastMatch){
          window.lastMatch = 0;
        }
        if (columnIndex < 4) {
          if (window.lastMatch != row.iMatchId) {
            return {
              rowspan: row.BO*2,
              colspan: 1
            };
          } else {
            return {
              rowspan: 0,
              colspan: 0
            };
          }
        }else{
          window.lastMatch = row.iMatchId
        }

        if(columnIndex == 4 || columnIndex == 5 || columnIndex == 8){
          if (rowIndex % 2 === 0) {
            return {
              rowspan: 2,
              colspan: 1
            };
          } else {
            return {
              rowspan: 0,
              colspan: 0
            };
          }
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

<template lang="html">
  <div>
    <el-card class="item-el-card">
      <div slot="header">
        <span style="margin-left: 10px;">赛老师集锦管理</span>
      </div>
      <el-row>
        <el-col>
          <el-form :inline="true" :model="form" ref="form">
            <el-form-item label="赛季" prop="seasonID">
              <el-select v-model="form.seasonID" @change="handleSeason" placeholder="请选择" style="widht: 100%">
                <el-option
                  v-for="(item, idx) in seasonData"
                  :key="item.id || idx"
                  :label="item.SeasonDesc"
                  :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="时间" prop="matchStart">
              <el-date-picker @input="handleMatchStart"
                v-model="form.matchStart"
                type="date"
                placeholder="请选择" style="width: 194px" />
            </el-form-item>
            <el-form-item label="赛程" prop="matchID">
              <el-select v-model="form.matchID" @change="handleMatch" placeholder="请选择" style="widht: 100%">
                <el-option
                  v-for="item in matchData"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="handleSearch">搜 索</el-button>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
    </el-card>
    <el-card>
      <div class="match-wonderfulManage_warp">
        <div class="match-wonderfulManage_content">
          <el-tabs v-model="activeName" @tab-click="handleTabs">
            <el-tab-pane
              v-for="(it, idx) in activeTab"
              :key="it.name || idx"
              :label="it.title"
              :name="it.name"
            >
            <el-row class="container">
              <el-col :span="12" class="item-container" v-for="(item, idx) in dataSouce" :key="item.id || idx">
                <div class='item-img-box' v-show="item.showJpg" v-on:click="handleClickPng(item)">
                  <!-- <lazy-component>
                    <img :src="item.jpg" class="item-img" />
                  </lazy-component> -->
                  <img v-lazy='item.jpg' lazy="loading" class="item-img loading" />
                </div>
                <div class='item-img-box' v-show="item.showGif" v-on:click="handleClickGif(item)">
                  <img v-lazy='item.gif' lazy="loadinggif"  class="item-img loading" />
                  <!-- <lazy-component>
                    <img :src="item.gif" class="item-img" />
                  </lazy-component> -->
                </div>
                <div class="grid-content bg-purple">
                  <div class="item-time-warp">
                    <span class="item-time-wondef">{{item.wonderful}}</span>
                    <span class="item-time-second">{{item.second}}</span>
                  </div>
                  <div class="item-time-warp item-blue-warp">
                    <span class="item-blue-bg">{{item.buleName}}</span>
                    <span v-for="fight in item.bluePlayer" :key="fight.playerMysqlID">
                      <span v-for="live in item.isFightBlue" :key="live.playerMysqlID">
                        <span class="item-time-second" v-if="live.isFight && live.participantID == fight.participantID" :style="!live.isAlive ? death_style : ''">
                          {{fight.summonerName || ''}} {{!live.isAlive ? `死亡` : ''}}
                        </span>
                      </span>
                    </span>
                  </div>
                  <div class="item-time-warp item-red-warp">
                    <span class="item-red-bg">{{item.redName}}</span>
                    <span v-for="fight in item.redPlayer" :key="fight.playerMysqlID">
                      <span v-for="live in item.isFightRed" :key="live.playerMysqlID">
                        <span class="item-time-second" v-if="live.isFight && live.participantID == fight.participantID" :style="live.isAlive == false ? death_style : ''">
                          {{fight.summonerName || ''}} {{live.isAlive == false ? `死亡` : ''}}
                        </span>
                      </span>
                    </span>
                  </div>
                  <div class="item-title-warp">
                    <span class="item-title-des">
                      <span :class="[item.status == 0 ? 'isStatus' : '']" v-show="item.status == 0">未编辑</span>
                      {{item.title}}
                    </span>
                    <i class="el-icon-edit" v-on:click="onRandomTitle(item.id, item.title)"></i>
                  </div>
                  <div class="item-title-warp item-show-warp">
                    <el-button type="primary" v-if="item.status == 0" v-on:click="onHandleStatus(item.pickey, item.id, item.status, item.title, item.platformGameID, item.matchID, item.BO, item.startTime, item.endTime)">设为展示</el-button>
                    <el-button v-if="item.status == 1" v-on:click="onHandleStatus(item.pickey, item.id, item.status, item.title, item.platformGameID, item.matchID, item.BO, item.startTime, item.endTime)">设为隐藏</el-button>
                  </div>
                </div>
              </el-col>
            </el-row>
            </el-tab-pane>
          </el-tabs>
        </div>
        <div v-if="dataSouce.length == 0" class="no-data">
          <el-col :span="24"><div class="grid-content bg-purple-dark">暂无数据</div></el-col>
        </div>
      </div>
      <el-dialog title="编辑" :visible.sync="dialogVisible">
        <el-form :model="form">
          <el-input v-model="dialog.title" :minlength=4 :maxlength=40 placeholder="请输入内容"></el-input>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="onRandomTitleSave">确 定</el-button>
        </div>
      </el-dialog>
      <el-pagination v-if="count > 0"
        layout="prev, pager, next" @current-change="pagination" :total="count" />
    </el-card>
  </div>
</template>
<script>
import { getUrlParam } from '../../../utils/index'
import { numToChian, mockData } from './utils/contants';
import { queryWonderfulMatch, querySeason, queryMatch, saveCloudService, queryAll } from './service';
import moment from 'moment';
export default {
  data () {
    return {
      death_style: {
        color: '#fff',
        fontSize: '13px',
        backgroundColor: '#333',
      },
      matchIng: '',
      originalData: [],
      dataSouce: [],
      seasonData: [],
      matchData: [],
      activeName: '',
      matchName: '',
      activeTab: [],
      count: 0,
      form: {
        matchStart: moment().add(-1, 'days').format('YYYY-MM-DD'),
        page: 1,
        pageSize: 10,
        seasonID: '',
        matchID: ''
      },
      dialogVisible: false,
      dialog: {
        title: '',
        gifkey: ''
      }
    }
  },
  created() {
    this.getSeason();
    this.handleTabs();
  },
  methods: {
    handleTabs(tab) {
      if (tab && tab.name) {
        const { matchID } = this.form;
        const id = matchID.split('/');
        this.activeName = tab.name;
        this.matchName = tab.label;
        let BO = tab.name.split('/')
        const params = {
          key: `matchGif/${BO[0]}`,
          matchID: Number(id[0]),
          BO: Number(BO[1]),
        }
        this.getList(params)
      }
    },
    handleSearch() {
      const { matchID } = this.form;
      if (matchID) {
        const id = matchID.split('/');
        let tmpArr = id[3].split(',');
        const params = {
          key: `matchGif/${tmpArr[0]}`,
          matchID: Number(id[0]),
          BO: 1,
        }
        this.getList(params)
      }
    },
    handleMatchStart(value) {
      this.$set(this, 'form.matchStart', value);
      const { seasonID } = this.form;
      this.handleSeason(seasonID);
    },
    getSeason() {
      querySeason().then(res => {
        if (res.success && res.data) {
          this.seasonData = res.data.data || [];
          this.form.seasonID = res.data.data[0].id;
          this.handleSeason(res.data.data[0].id);
        }
      })
    },
    handleSeason(value) {
      if (value) {
        const params = {
          pageSize: 50,
          seasonID: value,
          matchStart: moment(this.form.matchStart).format('YYYY-MM-DD')
        };
        this.form.seasonID = value;
        return queryMatch(params).then(res => {
          if (res.success && res.data) {
            let data = res.data.rows || [];
            let scores = '';
            let matchData = [];
            data && data.length &&
            data.forEach(item => {
              const GameIDCount = item.PlatformGameIDs && item.PlatformGameIDs.length || 0;
              matchData.push({
                label: `${item.TeamInfos[0].TeamDes} VS ${item.TeamInfos[1].TeamDes}`,
                value: `${item.id}/${GameIDCount}/${item.TeamInfos[0].TeamDes} VS ${item.TeamInfos[1].TeamDes}/${item.PlatformGameIDs}`
              })
            })
            if (matchData.length) {
              this.form.matchID = matchData[0].value;
              this.handleMatch(matchData[0].value);
            }
            this.matchData = matchData;
            if (matchData.length === 0) {
              this.form.matchID = '';
              this.dataSouce = [];
              this.activeTab = [];
            }
          }
        })
      }
    },
    handleMatch(value) {
      const { matchIng } = this.matchIng;
      if (value) {
        let activeTab = [];
        const arr = value.split("/");
        const matchID = arr[0];
        const matchName = arr[2];
        let tabName = arr[3];
        let newMatchIDArr = tabName.split(",")
        newMatchIDArr && newMatchIDArr.length &&
        newMatchIDArr.forEach((item, idx) => {
          activeTab.push({
            name: `${item}/${idx + 1}`,
            title: `${matchName} 第${numToChian[idx]}局 ${matchIng ? matchIng : ''}`
          }) 
        })
        this.activeName = activeTab[0].name;
        this.activeTab = activeTab;
        this.matchName = matchName;
        const params = { 
          key: `matchGif/${newMatchIDArr[0]}`,
          matchID: Number(matchID),
          BO: 1
        };
        this.getList(params)
      }
    },
    async getList(params) {
      let dataSouce = [];
      // const result = await queryWonderfulMatch(params);
      const result = mockData;
      console.log(result, 'resultresultresultresult')
      if (result.success && result.data) {
        let data = result.data;
        if (data.matchTime && data.matchTime.startTime && !data.matchTime.endTime) {
          this.matchIng = '进行中...'
        }
        data.matchJIF && data.matchJIF.length && data.matchJIF.forEach((j) => {
          let id = j.id.substring(j.id.lastIndexOf('/')+1, j.id.lastIndexOf('.'));
          data.basic.battlesBasic.forEach((battle) => {
            let tmpData = {};
            if (parseInt(battle.startTime / 1000, 0) == parseInt(id,0)) {
              // if (battle.t100.teamID == data.playersBasic.t100.teamID && data.playersBasic.t100.teamHome == 'Blue') {
              //   tmpData.isFightBlue = Object.values(battle.t100.battlePlayers);
              //   tmpData.buleTotalDeaths = battle.t100.totalDeaths;
              // }
              // if (battle.t200.teamID == data.playersBasic.t200.teamID && data.playersBasic.t200.teamHome == 'Red') {
              //   tmpData.isFightRed = Object.values(battle.t200.battlePlayers);
              //   tmpData.redTotalDeaths = battle.t200.totalDeaths;
              // }
              
              tmpData.isFightRed = data.playersBasic.t100.teamHome == 'Red' && (battle.t100.teamID == data.playersBasic.t100.teamID) ? Object.values(battle.t100.battlePlayers) : Object.values(battle.t200.battlePlayers);
              tmpData.isFightBlue = data.playersBasic.t200.teamHome == 'Blue' && (battle.t200.teamID == data.playersBasic.t200.teamID) ? Object.values(battle.t200.battlePlayers) : Object.values(battle.t100.battlePlayers);
              tmpData.jpg = j.urljpg;
              tmpData.gif = j.urlgif;
              tmpData.id = j.id;
              tmpData.pickey = id;
              tmpData.gifkey = j.id;
              tmpData.showJpg = true;
              tmpData.showGif = false;
              tmpData.platformGameID = j.platformGameID;
              tmpData.matchID = j.matchID;
              tmpData.BO = j.BO;
              tmpData.second = parseInt((battle.endTime - battle.startTime)/1000,0) + '秒';
              tmpData.wonderful = parseInt((battle.startTime/1000/60),0) + ':' + parseInt((battle.startTime/1000%60),0) + '爆发';
              tmpData.startTime = battle.startTime;
              tmpData.endTime = battle.endTime;
              tmpData.buleTotalDeaths = data.playersBasic.t100.teamHome == 'Blue' ? battle.t100.totalDeaths : battle.t200.totalDeaths ;
              tmpData.buleName = data.playersBasic.t100.teamHome == 'Blue' ? data.playersBasic.t100.teamName : data.playersBasic.t200.teamName;
              tmpData.blueDes = data.playersBasic.t100.teamHome == 'Blue' ? data.playersBasic.t100.teamEnName : data.playersBasic.t200.teamEnName;
              tmpData.blueTitle = data.playersBasic.t100.teamHome == 'Blue' ? data.playersBasic.t100.teamName : data.playersBasic.t200.teamName;
              
              // if (battle.t100.teamID == data.playersBasic.t100.teamID && data.playersBasic.t100.teamHome == 'Blue') {
              //   tmpData.bluePlayer = Object.values(data.playersBasic.t100.playersBasic);
              // }
              // if (battle.t200.teamID == data.playersBasic.t200.teamID && data.playersBasic.t200.teamHome == 'Red') {
              //   tmpData.redPlayer = Object.values(data.playersBasic.t200.playersBasic);
              // }

              tmpData.bluePlayer = data.playersBasic.t100.teamHome == 'Blue' ? Object.values(data.playersBasic.t100.playersBasic) : Object.values(data.playersBasic.t200.playersBasic);
              tmpData.redName = data.playersBasic.t100.teamHome == 'Red' ? data.playersBasic.t100.teamName : data.playersBasic.t200.teamName;
              tmpData.redDes = data.playersBasic.t100.teamHome == 'Red' ? data.playersBasic.t100.teamEnName : data.playersBasic.t200.teamEnName;
              tmpData.redTitle = data.playersBasic.t100.teamHome == 'Red' ? data.playersBasic.t100.teamName : data.playersBasic.t200.teamName;
              tmpData.redPlayer = data.playersBasic.t100.teamHome == 'Red' ? Object.values(data.playersBasic.t100.playersBasic) : Object.values(data.playersBasic.t200.playersBasic);
              tmpData.redTotalDeaths = data.playersBasic.t100.teamHome == 'Red' ? battle.t100.totalDeaths : battle.t200.totalDeaths ;
              tmpData.status = 0;
              if (Number(tmpData.buleTotalDeaths) == Number(tmpData.redTotalDeaths)) {
                if (Number(tmpData.buleTotalDeaths) == Number(tmpData.redTotalDeaths) && Number(tmpData.buleTotalDeaths) == 0  && Number(tmpData.redTotalDeaths) == 0) {
                  tmpData.title = `双方且战且退，一波技能交换后无人阵亡`
                } else {
                  tmpData.title = `团队不相上下，双方完成${tmpData.redTotalDeaths}换${tmpData.buleTotalDeaths}`
                }
              }
              if (Number(tmpData.buleTotalDeaths) > Number(tmpData.redTotalDeaths)) {
                tmpData.title = `${tmpData.redName} 死亡 ${tmpData.redTotalDeaths} 换 ${tmpData.buleName} 死亡 ${tmpData.buleTotalDeaths} ${tmpData.redName} 获胜`
              }
              if (Number(tmpData.buleTotalDeaths) < Number(tmpData.redTotalDeaths)) {
                tmpData.title = `${tmpData.buleName} 死亡 ${tmpData.buleTotalDeaths} 换 ${tmpData.redName} 死亡 ${tmpData.redTotalDeaths} ${tmpData.buleName} 获胜`
              }
              if (battle.battleType == 'riftHerald') {
                tmpData.title = `${tmpData.title} 击杀 峡谷先锋`
              } else if (battle.battleType == 'baron') {
                tmpData.title = `${tmpData.title} 击杀 男爵`
              } else if (battle.battleType == 'earth') {
                tmpData.title = `${tmpData.title} 击杀 土龙`
              } else if (battle.battleType == 'fire') {
                tmpData.title = `${tmpData.title} 击杀 火龙`
              } else if (battle.battleType == 'water') {
                tmpData.title = `${tmpData.title} 击杀 水龙`
              } else if (battle.battleType == 'air') {
                tmpData.title = `${tmpData.title} 击杀 风龙`
              } else if (battle.battleType == 'elder') {
                tmpData.title = `${tmpData.title} 击杀 远古龙`
              }
              dataSouce.push(tmpData);
            }
          })
        })
      }
      const ret = await queryAll();
      if (ret.success && ret.data) {
        let list = ret.data || [];
        dataSouce.forEach(item => {
          let itemKey = `matchGif/${item.matchID}/${item.BO}/${item.pickey}`
          list && list.length && 
          list.forEach(items => {
            if (itemKey == items.keyPic) {
              item.title = items.title;
              item.status = items.status;
            }
          })
        })
      }

      dataSouce.sort(this.compare("startTime"));
      this.originalData = JSON.parse(JSON.stringify(dataSouce))
      this.dataSouce = dataSouce;
    },

    compare(p) {
      return function(m,n) {
        let a = m[p];
        let b = n[p];
        return b - a; // 降序
      }
    },

    onRandomTitle(id, title) {
      this.dialogVisible = true;
      this.dialog.title = title;
      this.dialog.gifkey = id;
    },
    onRandomTitleSave() {
      const { gifkey, title } = this.dialog;
      this.originalData.forEach(item => {
        if (gifkey == item.gifkey) {
          item.title = title
        }
      })
      this.dataSouce = this.originalData;
      this.dialogVisible = false;
    },
    handleClickPng(item) {
      const originalData = this.originalData;
      originalData.forEach(d => {
        if (item.id === d.id) {
          d.showJpg = !d.showJpg;
          d.showGif = !d.showGif;
        }
      })
      this.dataSouce = originalData;
    },
    handleClickGif(item) {
      const originalData = this.originalData;
      originalData.forEach(d => {
        if (item.id === d.id) {
          d.showJpg = !d.showJpg;
          d.showGif = !d.showGif;
        }
      })
      this.dataSouce = originalData;
    },
    onHandleStatus(picKey, key, status, title, platformGameID, itemMatchID, BO, startTime, endTime) {
      let itemKey = key.split('.');
      const params = {
        key: itemKey[0],
        size: picKey,
        pngkey: `${itemKey[0]}.jpg`,
        gifkey: `${itemKey[0]}.gif`,
        status: 1,
        title,
        platformGameID,
        matchID: Number(itemMatchID),
        BO: Number(BO),
        startTime: Number(startTime),
        endTime: Number(endTime),
        matchName: this.matchName
      }
      saveCloudService(params).then(res => {
        const { matchID } = this.form;
        let tmpMatchID;
        if (this.activeName) {
          tmpMatchID = this.activeName.split('/');
        }
        const id = matchID.split('/');
        let tmpArr = id[3].split(',');
        if (res.success) {
          const obj = {
            key: `matchGif/${tmpMatchID[0] ? tmpMatchID[0] : tmpArr[0]}`,
            matchID: Number(itemMatchID),
            BO: Number(BO),
          }
          this.getList(obj);
        }
      })
    }
  }
}
</script>
<style scope>
  .container {
    display: flex;
    width: 100%;
    -ms-flex-wrap: wrap-reverse;
    flex-wrap: wrap;
    -ms-flex-line-pack: justify;
    align-content: space-between;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -ms-flex-direction: wrap;
    flex-direction: wrap;
    flex-flow: rows;
    -webkit-box-pack: justify;
    -ms-flex-pack: justify;
    margin-right: 20px;
  }
  .item-container {
    border: 1px solid #ccc;
    width: 49% !important;
    margin-bottom: 16px;
    flex-direction: column;
    display: flex;
    margin-right: 10px;
    overflow: hidden;
  }
  .grid-content.bg-purple {
    padding-left: 8px;
    padding-right: 8px;
    color: #333;
    text-align: left;
  }
  .item-time-warp {
    padding-top: 10px;
    padding-bottom: 10px;
  }
  .item-blue-warp, .item-red-warp {
    padding-top: 0px;
  }
  .item-show-warp {
    padding-top: 0px;
    padding-bottom: 10px;
    text-align: right;
    overflow: hidden;
  }
  .item-show {
    cursor: pointer;
    padding: 4px;
    width: 100px;
    text-align: center;
    float: right;
    background-color: #ccc;
    border-radius: 6px;
    color: #fff;
    font-size: 14px;
    font-weight: bold;
  }
  .item-hide {
    cursor: pointer;
    padding: 4px;
    width: 100px;
    text-align: center;
    float: right;
    background-color: #ccc;
    border-radius: 6px;
    color: #fff;
    font-size: 14px;
    font-weight: bold;
  }
  .item-blue-bg {
    color: #23a3ff;
  }
  .item-red-bg {
    color: red;
  }
  .item-title-des {
    font-weight: 500;
  }
  .item-time-wondef, .item-time-second {
    font-size: 13px;
    font-weight: 400;
    border: 1px solid #666;
    border-radius: 8px;
    padding: 3px;
    margin-right: 5px;
  }
  .death_style {
    background-color: #333;
    color: #fff;
  }
  .item-img-box {
    width: 100%;
    height: 349px;
    overflow: hidden;
    cursor: pointer;
  }
  .item-container .el-col .el-col-12 {
    width: 49.2% !important;
    overflow: hidden;
  }
  .match-wonderfulManage_warp .container .el-col:last-child {
    padding-left: 0!important;
    overflow: hidden;
  }
  .item-img {
    width: 100%;
  }
  .item-el-card {
    margin-bottom: 2px;
  }
  .item-title {
    margin-top: 12px;
    margin-bottom: 12px;
  }
  .isStatus {
    border: 1px solid red;
    border-radius: 8px;
    padding: 2px 6px;
    margin-right: 5px;
    color: #fff;
    font-size: 13px;
    background-color: red;
  }
  .el-icon-edit {
    cursor: pointer;
    color: #23a3ff;
    font-size: 24px;
    margin-left: 8px;
  }
  .no-data {
    text-align: center;
    padding: 12px;
    margin: 20px;
  }
  /* .loading[lazy=loading] {
    width: 50%;
    height: 50%;
    margin: 0 auto;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -30%);
  }
  .loading[lazy=loaded] {
    animation: fadeLazyImg 0.5s;
    width: 100%;
  }
  @keyframes fadeLazyImg {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  } */
  .item-img-box {
    position: relative;
  }
  img[lazy=loading] {
    width: 60px;
    height: 60px;
    border: 4px solid #333333;
    border-bottom: #cccccc 4px solid;
    border-radius: 50%;
    position: absolute;          
    top: 16%;         
    left: 50%;            
    margin-left: -50px;   
    margin-top: -10px;           
    text-align: center;
    -webkit-animation: load 1.1s infinite linear;
  }
  img[lazy=loadinggif] {
    width: 60px;
    height: 60px;
    border: 4px solid #333333;
    border-bottom: #cccccc 4px solid;
    border-radius: 50%;
    position: absolute;          
    margin-left: -50px;            
    margin-top: -10px;           
    text-align: center;
    -webkit-animation:load 1.1s infinite linear;
  }
   @-webkit-keyframes load {
    from{
      transform: rotate(0deg);
    }
    to{
      transform: rotate(360deg);
    }
  }
</style>

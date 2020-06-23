import moment from 'moment';
import { SHOES_SIZE_MAP,COUNTRY_MAP,PLAYER_IDENTITY_MAP,GAME_POSITION_MAP,ROLE_LIST,ITYPE_LIST_MAP,STATUS_LIST_MAP } from "./contants"
import { queryClubList } from './service';

export let render = {
  Teams:[],
  TeamMap:{},
  ClubMap:{},
  initTeams:function(){
    queryClubList().then(res => {
      if (res.success) {
        res.data.forEach(item => {
          this.Teams.push({
            label: item.TeamDes,
            value: item.id
          });
          this.TeamMap[item.id] = item;
          if(item.LPL){
            this.ClubMap[item.id] = item.LPL;
          }else{
            this.ClubMap[item.id] = item.id;
          }
        })
      }
    })
  },
  CountryRender:function (value) {
    if(typeof(COUNTRY_MAP[value]) != "undefined"){
      return COUNTRY_MAP[value].name;
    }else{
      return "";
    }
  },
  ShoesSizeRender:function (value) {
    if(typeof(SHOES_SIZE_MAP[value]) != "undefined"){
      return SHOES_SIZE_MAP[value];
    }else{
      return "";
    }
  },
  PlayerRoleRender:function (value) {
    if(typeof(PLAYER_IDENTITY_MAP[value]) != "undefined"){
      return PLAYER_IDENTITY_MAP[value];
    }else{
      return "";
    }
  },
  PlayerPosRender:function (value) {
    if(typeof(GAME_POSITION_MAP[value]) != "undefined"){
      return GAME_POSITION_MAP[value];
    }else{
      return "";
    }
  },
  TeamNameRender:function (value) {
    if(this.Teams.length == 0){
      this.initTeams();
    }
    if(typeof(this.TeamMap[value]) != "undefined"){
      return this.TeamMap[value].TeamDes;
    }else{
      return "";
    }
  },
  TeamGourpRender:function (value) {
    if(this.Teams.length == 0){
      this.initTeams();
    }
    if(typeof(this.ClubMap[value]) != "undefined"){
      return this.TeamMap[this.ClubMap[value]].TeamDes;
    }else{
      return "";
    }
  },
  RenderType:function(value){
    if(typeof(ITYPE_LIST_MAP[value]) != "undefined"){
      return ITYPE_LIST_MAP[value];
    }else{
      return "";
    }
  },
  RenderStatus:function(value){
    if(typeof(STATUS_LIST_MAP[value]) != "undefined"){
      return STATUS_LIST_MAP[value];
    }else{
      return "";
    }
  },
  GetTeams:function () {
    if(this.Teams.length == 0){
      this.initTeams();
    }
    return this.Teams;
  },
  GetRoleList:function () {
    return ROLE_LIST;
  },
  FullDateTime(val) {
    return val ? moment(val).format('YYYY-MM-DD HH:mm:ss') : '';
  },
  FullDate(val) {
    return val ? moment(val).format('YYYY-MM-DD') : '';
  },
}

export const MATCH_LIVE_MAN = [{
  label: '赛事审核',
  index: '/match_valid',
  icon: 'icon-admin',
  interfaces: [{
    method: "POST",
    path: "/admin/match_live/get_all_online_games",
  },{
    method: "POST",
    path: "/admin/match_live/get_matchs_by_season_and_date",
  },{
    method: "POST",
    path: "/admin/match_live/modify_game_rel",
  }, {
    "method": "GET",
    "path": "/admin/getAllSeason"
  },{
    "method": "GET",
    "path": "/admin/getAllTeamBySeason"
  },{
    "method": "GET",
    "path": "/admin/getAllCity"
  },{
    method: "POST",
    path: "/admin/match_live/valid_game_rel",
  }]
}];

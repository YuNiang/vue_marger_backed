import { fetch, API } from '@/utils/fetch'

export function GetAllTeamBySeason (params) {
  return fetch({
    url: API + '/getAllTeamBySeason',
    method: 'GET',
    params: params
  })
}

export function GetAllSeason (params) {
  return fetch({
    url: API + '/getAllSeason',
    method: 'GET',
    params: params
  })
}

export function GetAllCitys(params) {
  return fetch({
    url: API + '/getAllCity',
    method: 'GET',
    params: params
  })
}

export function SearchMatchDetail (params) {
  return fetch({
    url: API + '/match_live/get_matchs_by_season_and_date',
    method: 'POST',
    data: params
  })
}

export function GetOnlineGames (params) {
  return fetch({
    url: API + '/match_live/get_all_online_games',
    method: 'POST',
    data: params
  })
}

export function ModifyGameRel(params) {
  return fetch({
    url: API + '/match_live/modify_game_rel',
    method: 'POST',
    data: params
  })
}



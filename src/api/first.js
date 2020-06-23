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

export function GetMatchDetail (params) {
  return fetch({
    url: API + '/getMatchDetail',
    method: 'GET',
    params: params
  })
}

export function GetPlayers (params) {
  return fetch({
    url: API + '/getPlayers',
    method: 'GET',
    params: params
  })
}

export function GetCoachs(params) {
  return fetch({
    url: API + '/getCoachs',
    method: 'GET',
    params: params
  })
}

export function SearchMatch (params) {
  return fetch({
    url: API + '/searchMatch',
    method: 'POST',
    params: params
  })
}

export function SearchMatchDetail (params) {
  return fetch({
    url: API + '/searchMatchDetail',
    method: 'POST',
    data: params
  })
}

export function UpdateFirst (params) {
  return fetch({
    url: API + '/updateFirst',
    method: 'POST',
    data: params
  })
}

//更新教练
export function UpdateCoach(params) {
  return fetch({
    url: API + '/updateCoach',
    method: 'POST',
    data: params
  })
}


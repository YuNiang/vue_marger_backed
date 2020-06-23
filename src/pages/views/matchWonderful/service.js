import { fetch, API } from '@/utils/fetch';

export function queryWonderfulMatch (params) {
  return fetch({
    url: `${API}/wonderful_match/query`,
    method: 'GET',
    params
  })
};

export function querySeason (params) {
  return fetch({
    url: `${API}/wonderful_match/querySeason`,
    method: 'GET',
    params
  })
};

export function queryMatch (params) {
  return fetch({
    url: `${API}/wonderful_match/queryMatchs`,
    method: 'GET',
    params
  })
};

export function saveCloudService (params) {
  return fetch({
    url: `${API}/wonderful_match/saveCloudService`,
    method: 'POST',
    data: params
  })
};

export function queryAll (params) {
  return fetch({
    url: `${API}/wonderful_match/queryAll`,
    method: 'GET',
    params
  })
};

import axios from 'axios'

// node 接口封装
export function fetch (options, needJWT = true) {
  return new Promise((resolve, reject) => {
    // 默认配置
    let _default = {
      validateStatus (status) {
        return true
      },
      timeout: 15000,
      headers: {
        Version: 'v1'
      }
    }
    // 如果需要jwt，则发送jwt
    if (needJWT) {
      _default.headers.Authorization = localStorage.getItem('token');
    }
    // 创建请求
    const instance = axios.create(_default)

    instance(options)
      .then(response => {
        const res = response.data
        if (response.status === 200) {
          resolve(res)
        } else if (response.status === 401) {
          localStorage.clear()
          location.href = '/login'
        } else {
          reject(res)
        }
      })
      .catch(error => {
        reject(error)
      })
  })
}

// export const API = location.host.includes('dev') ? 'https://tj2020-dm-dev.tjstats.com/admin' : 'https://dm-v2.tjstats.com/admin'
export const API = 'http://localhost:9800/admin';
// export const API = 'https://tj2020-dm-dev.tjstats.com/admin';
// export const MAINAPI = location.host.includes('dm.tjstats.com') ? 'https://dm.tjstats.com/api' : 'http://localhost:9800/api'

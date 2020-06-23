import * as types from '../mutation-types'
import * as _ from 'lodash'
// import { PostLogin } from '@/api'

const state = {
  user: 'aaa'
}

let getters = {}

_.map(state, (val, key) => {
  getters[key] = state => state[key]
})

const actions = {
  /**
   * 登录
   * @param {[type]} commit [description]
   */
  // PostLogin ({ commit }, params) {
  //   return new Promise((resolve, reject) => {
  //     UserApi.PostLogin(params)
  //       .then(data => {
  //         localStorage.setItem('AUTH_TOKEN', data.authorization)
  //         commit('WALLET', data.model)
  //         resolve(data)
  //       })
  //       .catch(error => {
  //         reject(error)
  //       })
  //   })
  // }
}

const mutations = {
  [types.WALLET] (state, data) {
    state.wallet = data
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}

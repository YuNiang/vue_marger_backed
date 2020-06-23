import Vue from 'vue'
import Vuex from 'vuex'

// 子模块
import status from './modules/status'
import country from './modules/country'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    status,
    country,
  }
})

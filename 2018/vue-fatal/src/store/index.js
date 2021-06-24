import Vuex from 'vuex'
import Vue from 'vue'

import state from './state'
import mutations from './mutations'
import getters from './getters'
import actions from './actions'

Vue.use(Vuex)

const isDev = process.env.NODE_ENV === 'development'

const plugins = []
const cartPlugin = store => store.subscribe((mutations, {cartData, searchHistory}) => {
  window.localStorage.setItem('fatal-cart', JSON.stringify(cartData))
  window.localStorage.setItem('fatal-search-history', JSON.stringify(searchHistory))
})
plugins.push(cartPlugin)

export default new Vuex.Store({
  strict: isDev,
  state,
  getters,
  mutations,
  actions,
  plugins
})

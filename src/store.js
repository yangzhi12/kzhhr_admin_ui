import Vue from 'vue'
import Vuex from 'vuex'
import config from './config'
Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    pageTitle: 'Home',
    user: {},
    token: null,
    industry: null,
    message: {
      type: null,
      body: null
    },
    config: config
  },
  mutations: {
    setAuth(state, { user, token }) {
      state.user = user
      state.token = token
    },
    setMenu(state, data) {
      state.menu = data
    },
    setPageTitle(state, data) {
      state.pageTitle = data
    },
    showMessage(state, type, body) {
      state.message = { type, body }
    },
    setIndustry(state, data) {
      state.industry = data
    },
    setTransformer(state, data) {
      state.transformer = data
    }
  },
  actions: {
    userAuthed({ commit }, data) {
      let { user, token } = data
      global.helper.ls.set('user', user)
      global.helper.ls.set('x-kzhhr-token', token)
      commit('setAuth', data)
    },
    dictsList({ commit }, data) {
      let { industry, transformer } = data
      industry ? commit('setIndustry', industry) : null
      transformer ? commit('setTransformer', transformer) : null
    },
    checkPageTitle({ commit, state }, path) {
      for (let k in state.menu) {
        if (state.menu[k].href === path) {
          commit('setPageTitle', state.menu[k].title)
          break
        }
      }
    }
  }
})

export default store

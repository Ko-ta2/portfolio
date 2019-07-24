import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  userId: '',
  message: ''
}

const getters = {
  
}

const mutations = {
  setUserId(state, userId) {
    state.userId = userId
  },
  clearUserId(state) {
    state.userId = ''
  },
  setMessage(state, message) {
    state.message = message
  },
  clearMessage(state) {
    state.message = ''
  }
}

const actions = {
  setUserId({commit}, userId) {
    commit('setUserId', userId)
  },
  clearUserId({commit}) {
    commit('clearUserId')
  },
  setMessage({commit}, message) {
    commit('setMessage', message)
  },
  clearMessage({commit}) {
    commit('clearMessage')
  },
  onMessage({dispatch}, message) {
    dispatch('setMessage', message)
    setTimeout(() => {
      dispatch('clearMessage')
    }, 5000)
  }
}

export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions
})
import * as THEME from '../types/theme'
const state = {
  theme: 'cyan'
}

const actions = {}

const getters = {
  [THEME.GET_THEME] (state) {
    return state.theme
  }
}

const mutations = {
  [THEME.UPDATE_THEME] (state, theme) {
    state.theme = theme
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}

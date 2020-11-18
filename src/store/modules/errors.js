/* eslint no-shadow: ["error", { "allow": ["state"] }] */

const state = {
  errors: [],
  activeError: {
    status: '',
    statusText: '',
    message: '',
  },
};

const getters = {
  allErrors: (state) => state.errors,
  activeError: (state) => state.activeError,
};

const actions = {
  addError({ commit }, error) {
    commit('ADD_ERROR', error);
  },
  setActiveError({ commit }, error) {
    commit('SET_ACTIVE_ERROR', error);
  },
  removeActiveError({ commit }) {
    commit('REMOVE_ACTIVE_ERROR');
  },
};

const mutations = {
  ADD_ERROR: (state, error) => [error, ...state.errors],
  SET_ACTIVE_ERROR: (state, activeError) => {
    state.activeError = activeError;
  },
  REMOVE_ACTIVE_ERROR: (state) => {
    state.activeError = undefined;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};

import axios from 'axios';

/* eslint no-shadow: ["error", { "allow": ["state"] }] */

const apiBaseUrl = 'http://localhost:3000/api/bons';

const state = {
  bons: [],
  activeBon: '',
};

const getters = {
  allBons: (state) => state.bons,
  activeBon: (state) => state.activeBon,
};

const actions = {
  async fetchBons({ commit }) {
    const response = await axios.get(apiBaseUrl);
    commit('setBons', response.data.data.items);
  },
  async fetchBon({ commit }, id) {
    const response = await axios.get(`${apiBaseUrl}/${id}`);
    commit('setActiveBon', response.data.data.resource);
  },
  async addBon({ commit }, params) {
    const response = await axios.post(apiBaseUrl, params);
    commit('createBon', response.data.data.item);
  },
  async updateBon({ commit }, params) {
    const response = await axios.put(`${apiBaseUrl}/${params.id}`, params);
    console.log(`ac updateBon: ${response.data.data}`);
    commit('updateBon', response.data.data);
  },
  async removeBon({ commit }, id) {
    const response = await axios.delete(`${apiBaseUrl}/${id}`);
    commit('deleteBon', response.data.data.resource);
  },
};

const mutations = {
  setBons: (state, bons) => { state.bons = bons; },
  setActiveBon: (state, activeBon) => {
    state.activeBon = activeBon;
  },
  createBon: (state, bon) => state.bons.unshift(bon),
  deleteBon: (state, id) => (state.bons.filter((bon) => bon.id !== id)),
  updateBon: (state, updBon) => {
    const index = state.bons.findIndex((bon) => bon.id === updBon.id);
    if (index !== -1) {
      state.bons.splice(index, 1, updBon);
    }
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};

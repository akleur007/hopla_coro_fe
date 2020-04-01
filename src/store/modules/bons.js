import axios from 'axios';

/* eslint no-shadow: ["error", { "allow": ["state"] }] */

const apiBaseUrl = 'http://localhost:3000/api/bons';

const state = {
  bons: [],
  activeBon: '',
};

const getters = {
  allBons: (state) => state.bons,
};

const actions = {
  async fetchBons({ commit }) {
    const response = await axios.get(apiBaseUrl);
    commit('setBons', response.data.data.items);
  },
  // Hier ----------------------------
  /* async fetchBon({ commit }, id) {
    const response = await axios.get(`${apiBaseUrl}/${id}`);
    commit('setBon', response.data.data.resource);
    // console.log(response.data.data.resource);
  }, */
  async addBon({ commit }, params) {
    const response = await axios.post(apiBaseUrl, params);
    commit('createBon', response.data.data.item);
  },
  async changeBon({ commit }, params) {
    const response = await axios.put(`${apiBaseUrl}/${params.id}`, params);
    commit('updateBon', response.data.data.item);
  },
  async removeBon({ commit }, id) {
    const response = await axios.delete(`${apiBaseUrl}/${id}`);
    commit('deleteBon', response.data.data.item);
  },
};

const mutations = {
  setBons: (state, bons) => { state.bons = bons; },
  // Hier ------------------
  /* setBon: (state, id) => {
    const index = state.bons.findIndex((bon) => bon.id === id);
    if (index !== -1) {
      state.activeBon = activeBon;
    }
  }, */
  // { state.activeBon = activeBon; },
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

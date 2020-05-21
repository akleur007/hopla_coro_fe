import BonService from '../../services/bonService';

/* eslint no-shadow: ["error", { "allow": ["state"] }] */

const state = {
  bons: [],
  activeBon: '',
};

const getters = {
  allBons: (state) => state.bons,
  activeBon: (state) => state.activeBon,
  getBonById: (state) => (id) => {
    const item = state.bons.filter((bon) => bon.id === id);
    return item;
  },
};

const actions = {
  async fetchBons({ commit }) {
    const response = await BonService.getBonList();
    commit('setBons', response.data.data.items);
  },
  async fetchBon({ commit }, id) {
    const idInt = parseInt(id, 10);
    const response = await BonService.getBon(idInt);
    commit('setActiveBon', response.data.data.resource);
  },
  async addBon({ commit }, params) {
    const response = await BonService.addBon(params);
    commit('createBon', response.data.data.item);
  },
  async updateBon({ commit }, params) {
    const response = await BonService.updateBon(params);
    commit('updateBon', response.data.data);
  },
  async subtractBon({ commit }, params) {
    const response = await BonService.subtractBon(params);
    commit('SUBSTRACT_BON', response);
  },
  async removeBon({ commit }, id) {
    const response = await BonService.deleteBon(id);
    commit('deleteBon', response.data.data.resource);
  },
};

const mutations = {
  setBons: (state, bons) => {
    state.bons = bons;
  },
  setActiveBon: (state, activeBon) => {
    state.activeBon = activeBon;
  },
  createBon: (state, bon) => [bon, ...state.bons],
  deleteBon: (state, id) => state.bons.filter((bon) => bon.id !== id),
  updateBon: (state, updBon) => {
    const index = state.bons.findIndex((bon) => bon.id === updBon.id);
    if (index !== -1) {
      state.bons.splice(index, 1, updBon);
    }
  },
  SUBSTRACT_BON: (state, updBon) => {
    console.log('updBon: ', updBon);
    const index = state.bons.findIndex((bon) => bon.id === updBon.insertId);
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

import BonService from '../../services/bonService';

/* eslint no-shadow: ["error", { "allow": ["state"] }] */

const state = {
  bons: [],
  selectedBons: [],
};

const getters = {
  allBons: (state) => state.bons,
  selectedBons: (state) => state.selectedBons,
  getBonById: (state) => (id) => {
    const item = state.bons.filter((bon) => bon.id === id);
    return item;
  },
  creditSum: (state) => state.bons.reduce((total, bon) => total + parseFloat(bon.credit), 0),
};

const actions = {
  async fetchBons({ commit }) {
    const response = await BonService.getBonList();
    commit('SET_BONS', response.data.data.items);
  },
  async addBon({ commit }, params) {
    const response = await BonService.addBon(params);
    commit('CREATE_BON', response.data.data.item);
  },
  async updateBon({ commit }, params) {
    const response = await BonService.updateBon(params);
    commit('UPDATE_BON', response.data.data);
  },
  async subtractBon({ commit }, params) {
    const response = await BonService.subtractBon(params);
    commit('SUBSTRACT_BON', response);
  },
  async removeBon({ commit }, id) {
    const response = await BonService.deleteBon(id);
    commit('DELETE_BON', response.data.data.resource);
  },
  bonToggleSelection({ commit }, bon) {
    commit('BON_TOGGLE_SELECTION', bon);
  },
  deselectAllBons({ commit }) {
    commit('DESELECT_ALL_BONS');
  },
};

const mutations = {
  SET_BONS: (state, bons) => {
    state.bons = bons;
  },
  CREATE_BON: (state, bon) => [bon, ...state.bons],
  DELETE_BON: (state, id) => state.bons.filter((bon) => bon.id !== id),
  UPDATE_BON: (state, updBon) => {
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
  BON_TOGGLE_SELECTION: (state, bon) => {
    const isSelected = state.selectedBons.find((item) => item.id === bon.id);
    const index = state.selectedBons.findIndex((item) => item.id === bon.id);
    if (!isSelected) {
      state.selectedBons.push(bon);
    } else {
      state.selectedBons.splice(index, 1);
    }
  },
  DESELECT_ALL_BONS: (state) => {
    console.log('deselect');
    state.selectedBons = [];
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};

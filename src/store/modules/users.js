import UserService from '../../services/userService';

/* eslint no-shadow: ["error", { "allow": ["state"] }] */

const state = {
  users: [],
  activeUser: '',
};

const getters = {
  allUsers: (state) => state.users,
  activeUser: (state) => state.activeUser,
};

const actions = {
  async fetchUsers({ commit }) {
    const response = await UserService.getUserList();
    commit('setUsers', response.data.data.items);
  },
  async fetchUser({ commit }, id) {
    const response = await UserService.getUser(id);
    commit('setActiveUser', response.data.data.resource);
  },
  async addUser({ commit }, params) {
    const response = await UserService.addUser(params);
    commit('createUser', response.data.data.item);
  },
  async updateUser({ commit }, params) {
    const response = await UserService.updateUser(params);
    commit('updateUser', response.data.data.resource);
  },
  async removeUser({ commit }, id) {
    const response = await UserService.deleteUser(id);
    commit('deleteUser', response.data.data.resource);
  },
};

const mutations = {
  setUsers: (state, users) => { state.users = users; },
  setActiveUser: (state, activeUser) => {
    state.activeUser = activeUser;
    state.activeUser.password = '';
  },
  createUser: (state, user) => [user, ...state.users],
  deleteUser: (state, id) => (state.users.filter((user) => user.id !== id)),
  updateUser: (state, updUser) => {
    const index = state.users.findIndex((user) => user.id === updUser.id);
    if (index !== -1) {
      state.users.splice(index, 1, updUser);
    }
    // state.activeUser = {};
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};

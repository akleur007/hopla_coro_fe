import UserService, { AuthenticationError } from '../../services/userService';
import TokenService from '../../services/tokenService';

/* eslint no-shadow: ["error", { "allow": ["state"] }] */

const state = {
  users: [],
  activeUser: '',
  authenticating: false,
  accessToken: TokenService.getToken(),
  authenticationErrorCode: 0,
  authenticationError: '',
};

const getters = {
  allUsers: (state) => state.users,
  activeUser: (state) => state.activeUser,

  loggedIn: (state) => !!state.accessToken,

  authenticationErrorCode: (state) => state.authenticationErrorCode,
  authenticationError: (state) => state.authenticationError,
  authenticating: (state) => state.authenticating,
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
  async authUser({ commit }, params) {
    const response = await UserService.authUser(params);
    commit('AUTH_USER', response.data.data.resource);
  },
  async login({ commit }, { username, password }) {
    commit('loginRequest');

    try {
      const token = await UserService.login(username, password);
      commit('loginSuccess', token);

      this.$router.push(this.$router.history.current.query.redirect || '/');

      return true;
    } catch (e) {
      if (e instanceof AuthenticationError) {
        commit('loginError', {
          errorCode: e.errorCode,
          errorMessage: e.message,
        });
      }

      return false;
    }
  },

  logout({ commit }) {
    UserService.logout();
    commit('logoutSuccess');
    this.$router.push('/login');
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
  setUsers: (state, users) => {
    state.users = users;
  },
  setActiveUser: (state, activeUser) => {
    state.activeUser = activeUser;
    state.activeUser.password = '';
  },
  AUTH_USER: (state, user) => () => {
    console.log(state, user);
  },
  createUser: (state, user) => [user, ...state.users],
  deleteUser: (state, id) => state.users.filter((user) => user.id !== id),
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

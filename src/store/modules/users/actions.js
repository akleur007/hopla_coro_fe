import UserService, { AuthenticationError } from '../../../services/userService';

export const fetchUsers = async ({ commit }) => {
  const response = await UserService.getUserList();
  commit('SET_USERS', response.data.data.items);
};

export const fetchUser = async ({ commit }, id) => {
  const response = await UserService.getUser(id);
  commit('SET_ACTIVE_USER', response.data.data.resource);
};

export const authUser = async ({ commit }, params) => {
  const response = await UserService.authUser(params);
  commit('AUTH_USER', response.data.data.resource);
};

export const login = async ({ commit }, { username, password }) => {
  commit('LOGIN_REQUEST');

  try {
    const token = await UserService.login(username, password);
    commit('LOGIN_SUCCESS', token);

    this.$router.push(this.$router.history.current.query.redirect || '/');

    return true;
  } catch (e) {
    if (e instanceof AuthenticationError) {
      commit('LOGIN_ERROR', {
        errorCode: e.errorCode,
        errorMessage: e.message,
      });
    }

    return false;
  }
};

export const logout = ({ commit }) => {
  UserService.logout();
  commit('LOGOUT_SUCCESS');
  this.$router.push('/login');
};

export const addUser = async ({ commit }, params) => {
  const response = await UserService.addUser(params);
  commit('CREATE_USER', response.data.data.item);
};

export const updateUser = async ({ commit }, params) => {
  const response = await UserService.updateUser(params);
  commit('UPDATE_USER', response.data.data.resource);
};

export const removeUser = async ({ commit }, id) => {
  const response = await UserService.deleteUser(id);
  commit('DELETE_USER', response.data.data.resource);
};

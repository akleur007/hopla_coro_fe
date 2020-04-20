import UserService, { AuthenticationError } from '../../../services/userService';
import router from '../../../router';

export const fetchUsers = async ({ commit }) => {
  const response = await UserService.getUserList();
  commit('SET_USERS', response.data.data.items);
};

export const fetchUser = async ({ commit }, id) => {
  const response = await UserService.getUser(id);
  commit('SET_ACTIVE_USER', response.data.data.resource);
};

export const loginUser = async ({ commit }, params) => {
  commit('LOGIN_REQUEST');

  try {
    const res = await UserService.login(params);
    commit('LOGIN_SUCCESS', res);
    router.push(router.history.current.query.redirect || '/');

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

export const logoutUser = ({ commit }) => {
  UserService.logout();
  commit('LOGOUT_SUCCESS');
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

export const getUserRoles = async ({ commit }) => {
  const response = await UserService.getUserRoles();
  commit('SET_USER_ROLES', response.data.data.userRoles);
};

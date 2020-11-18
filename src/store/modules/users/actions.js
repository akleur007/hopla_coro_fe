import UserService, { AuthenticationError } from '../../../services/userService';
import router from '../../../router';

export const fetchUsers = async ({ commit }) => {
  const response = await UserService.getUserList();
  commit('SET_USERS', response.data.data.items);
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

export const logoutUser = async ({ commit }) => {
  await UserService.logout();
  commit('LOGOUT_SUCCESS');
};

export const addUser = async ({ commit }, params) => {
  const response = await UserService.addUser(params);
  commit('CREATE_USER', response.data.data.resource);
};

export const updateUser = async ({ commit }, params) => {
  const response = await UserService.updateUser(params);
  commit('UPDATE_USER', response.data.data.resource);
};

export const removeUser = async ({ commit }, id) => {
  const response = await UserService.deleteUser(id);
  commit('DELETE_USER', response.data.data.resource);
};

export const uploadFiles = async ({ commit }, params) => {
  const response = await UserService.uploadFiles(params);
  commit('UPLOAD_FILES', response.data.data);
};

export const fetchFiles = async ({ commit }, id) => {
  const response = await UserService.getFiles(id);
  const params = {
    files: response.data.data.resource,
    userId: id,
  };
  commit('GET_FILES', params);
};

export const deleteFile = async ({ commit }, id) => {
  const response = await UserService.deleteFile({ id });
  commit('DELETE_FILE', response);
};

export const changeShowname = ({ commit }, params) => {
  commit('CHANGE_SHOWNAME', params);
};

export const setMainMenu = async ({ commit, state }) => {
  const { routes } = router.options;
  const r = await UserService.getUserRole();
  const userRole = r.data;
  const menuItems = routes.filter((item) => item.meta && item.meta.isMenuItem);
  const userRoleIndex = state.userRoles.findIndex((element) => element.value === userRole); // user role index

  const menuReady = menuItems.filter((item) => {
    const i = state.userRoles.findIndex((element) => element.value === item.meta.requiredRole);
    return userRoleIndex >= i;
  });
  commit('SET_MAIN_MENU', menuReady);
  return true;
};

export const getUserRoles = async ({ commit }) => {
  const response = await UserService.getUserRoles();
  commit('SET_USER_ROLES', response.data.data.userRoles);
};

export const userToggleSelection = ({ commit }, user) => {
  commit('USER_TOGGLE_SELECTION', user);
};

export const deselectAllUsers = ({ commit }) => {
  commit('DESELECT_ALL_USERS');
};

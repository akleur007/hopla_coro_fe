import UserService from '../../../services/userService';

const validateUserRole = async (role) => {
  try {
    const hasRole = await UserService.validateUserRole(role);
    console.log('hasRole: ', hasRole.data);
    return hasRole.data;
  } catch (err) {
    console.log(err);
    return false;
  }
};

export const allUsers = (state) => state.users;
export const activeUser = (state) => state.activeUser;

export const loggedIn = (state) => !!state.accessToken;
export const getUser = (state) => state.user;
export const userRoles = (state) => state.userRoles;
export const checkUserRole = (role) => validateUserRole(role);

export const authenticationErrorCode = (state) => state.authenticationErrorCode;
export const authenticationError = (state) => state.authenticationError;
export const authenticating = (state) => state.authenticating;

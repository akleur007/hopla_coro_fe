export const SET_USERS = (state, users) => {
  state.users = users;
};

export const AUTH_USER = (state, user) => () => {
  console.log(state, user);
};

export const LOGIN_REQUEST = (state) => {
  state.authenticating = true;
  state.authenticationError = '';
  state.authenticationErrorCode = 0;
};

export const LOGIN_SUCCESS = (state, params) => {
  state.accessToken = params.accessToken;
  state.authenticating = false;
  state.user = params.user;
  state.user.loggedIn = true;
};

export const LOGIN_ERROR = (state, { errorCode, errorMessage }) => {
  state.authenticating = false;
  state.authenticationErrorCode = errorCode;
  state.authenticationError = errorMessage;
};

export const LOGOUT_SUCCESS = (state) => {
  state.accessToken = '';
  state.user.loggedIn = false;
  state.user = {};
};

export const CREATE_USER = (state, user) => [user, ...state.users];

export const DELETE_USER = (state, id) => state.users.filter((user) => user.id !== id);

export const UPDATE_USER = (state, updUser) => {
  const index = state.users.findIndex((user) => user.id === updUser.id);
  if (index !== -1) {
    state.users.splice(index, 1, updUser);
  }
};

export const SET_USER_ROLES = (state, userRoles) => {
  state.userRoles = userRoles;
};

export const SET_MAIN_MENU = (state, menu) => {
  state.mainMenu = menu;
};

export const USER_TOGGLE_SELECTION = (state, user) => {
  const isSelected = state.selectedUsers.find((item) => item.id === user.id);
  const index = state.selectedUsers.findIndex((item) => item.id === user.id);
  if (!isSelected) {
    state.selectedUsers.push(user);
  } else {
    state.selectedUsers.splice(index, 1);
  }
};

export const DESELECT_ALL_USERS = (state) => {
  state.selectedUsers = [];
};

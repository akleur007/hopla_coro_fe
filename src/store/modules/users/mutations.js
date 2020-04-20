export const SET_USERS = (state, users) => { state.users = users; };

export const SET_ACTIVE_USER = (state, activeUser) => {
  state.activeUser = activeUser;
  state.activeUser.password = '';
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

export const DELETE_USER = (state, id) => (state.users.filter((user) => user.id !== id));

export const UPDATE_USER = (state, updUser) => {
  const index = state.users.findIndex((user) => user.id === updUser.id);
  if (index !== -1) {
    state.users.splice(index, 1, updUser);
  }
  // state.activeUser = {};
};

export const SET_USER_ROLES = (state, userRoles) => {
  state.userRoles = userRoles;
};

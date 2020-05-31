export const allUsers = (state) => state.users;
export const selectedUsers = (state) => state.selectedUsers;

export const loggedIn = (state) => !!state.accessToken;
export const getUser = (state) => state.user;
export const userRoles = (state) => state.userRoles;
export const mainMenu = (state) => state.mainMenu;

export const authenticationErrorCode = (state) => state.authenticationErrorCode;
export const authenticationError = (state) => state.authenticationError;
export const authenticating = (state) => state.authenticating;

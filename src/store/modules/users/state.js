import TokenService from '../../../services/tokenService';

export default {
  users: [],
  user: {},
  selectedUsers: [],
  userRoles: [],
  authenticating: false,
  accessToken: TokenService.getToken(),
  authenticationErrorCode: 0,
  authenticationError: '',
};

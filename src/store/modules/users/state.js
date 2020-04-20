import TokenService from '../../../services/tokenService';

export default {
  users: [],
  user: {},
  activeUser: '',
  userRoles: [],
  authenticating: false,
  accessToken: TokenService.getToken(),
  authenticationErrorCode: 0,
  authenticationError: '',
};

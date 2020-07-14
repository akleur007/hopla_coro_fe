import TokenService from '../../../services/tokenService';

export default {
  users: [],
  user: {},
  userRoles: [],
  authenticating: false,
  accessToken: TokenService.getToken(),
  authenticationErrorCode: 0,
  authenticationError: '',
};

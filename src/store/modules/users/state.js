import TokenService from '../../../services/tokenService';

export default {
  users: [],
  user: {},
  activeUser: '',
  authenticating: false,
  accessToken: TokenService.getToken(),
  authenticationErrorCode: 0,
  authenticationError: '',
};

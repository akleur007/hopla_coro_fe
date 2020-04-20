import TokenService from './tokenService';
import ApiService from './apiService';

export class AuthenticationError extends Error {
  constructor(errorCode, message) {
    super(message);
    this.name = this.constructor.name;
    this.message = message;
    this.errorCode = errorCode;
  }
}

const UserService = {
  async getUserList() {
    return ApiService.get('users');
  },
  async createUser(params) {
    return ApiService.post('users', params);
  },
  async getUser(id) {
    return ApiService.get(`users/${id}`);
  },
  async login(params) {
    const requestData = {
      method: 'post',
      url: 'users/authenticate',
      data: {
        grant_type: 'password',
        username: params.username,
        password: params.password,
      },
      auth: {
        username: process.env.VUE_APP_CLIENT_ID,
        password: process.env.VUE_APP_CLIENT_SECRET,
      },
    };
    try {
      const response = await ApiService.customRequest(requestData);
      TokenService.saveToken(response.data.data.accessToken);
      // TokenService.saveRefreshToken(response.data.data.refresh_token);
      ApiService.setHeader();
      // ApiService.mount401Interceptor();

      return response.data.data;
    } catch (error) {
      throw new AuthenticationError(error.response.status, error.response.data.data.message);
    }
  },
  async refreshToken() {
    const refreshToken = TokenService.getRefreshToken();

    const requestData = {
      method: 'post',
      url: 'users/refreshtoken',
      data: {
        grant_type: 'refresh_token',
        refresh_token: refreshToken,
      },
      auth: {
        username: process.env.VUE_APP_CLIENT_ID,
        password: process.env.VUE_APP_CLIENT_SECRET,
      },
    };
    try {
      const response = await ApiService.customRequest(requestData);

      TokenService.saveToken(response.data.access_token);
      TokenService.saveRefreshToken(response.data.refresh_token);
      ApiService.setHeader();

      return response.data.access_token;
    } catch (error) {
      throw new AuthenticationError(error.response.status, error.response.data.detail);
    }
  },
  logout() {
    TokenService.removeToken();
    // TokenService.removeRefreshToken();
    ApiService.removeHeader();
    // ApiService.unmount401Interceptor();
  },
  async updateUser(params) {
    return ApiService.put(`users/${params.id}`, params);
  },
  async deleteUser(id) {
    return ApiService.delete(`users/${id}`);
  },
  async getUserRoles() {
    return ApiService.get('users/auth-roles');
  },
  async sendUserEmail(id) {
    return ApiService.get(`users/${id}/sendmail`);
  },
};

export default UserService;

import axios from 'axios';
import TokenService from './tokenService';
import ApiService from './apiService';

const apiBaseUrl = 'http://localhost:3000/api/users';

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
    // return axios.get(apiBaseUrl);
  },
  async createUser(params) {
    return axios.post(apiBaseUrl, params);
  },
  async getUser(id) {
    return axios.get(`${apiBaseUrl}/${id}`);
  },
  async authUser(params) {
    return axios.post(`${apiBaseUrl}/authenticate`, params);
  },
  async login(username, password) {
    const requestData = {
      method: 'post',
      url: '/o/token/',
      data: {
        grant_type: 'password',
        username,
        password,
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
      ApiService.mount401Interceptor();

      return response.data.access_token;
    } catch (error) {
      throw new AuthenticationError(error.response.status, error.response.data.detail);
    }
  },
  async refreshToken() {
    const refreshToken = TokenService.getRefreshToken();

    const requestData = {
      method: 'post',
      url: '/o/token/',
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
    TokenService.removeRefreshToken();
    ApiService.removeHeader();
    ApiService.unmount401Interceptor();
  },
  async updateUser(params) {
    return axios.put(`${apiBaseUrl}/${params.id}`, params);
  },
  async deleteUser(id) {
    return axios.delete(`${apiBaseUrl}/${id}`);
  },
  async sendUserEmail(id) {
    return axios.get(`${apiBaseUrl}/${id}/sendmail`);
  },
};

export default UserService;

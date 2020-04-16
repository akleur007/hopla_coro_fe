const TOKEN_KEY = 'user-token';
const REFRESH_TOKEN_KEY = 'refresh-token';

const TokenService = {
  async getToken() {
    return localStorage.getItem(TOKEN_KEY);
  },

  async saveToken(accessToken) {
    localStorage.setItem(TOKEN_KEY, accessToken);
  },

  removeToken() {
    localStorage.removeItem(TOKEN_KEY);
  },

  async getRefreshToken() {
    return localStorage.getItem(REFRESH_TOKEN_KEY);
  },

  async saveRefreshToken(refreshToken) {
    localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
  },

  async removeRefreshToken() {
    localStorage.removeItem(REFRESH_TOKEN_KEY);
  },

};

export default TokenService;

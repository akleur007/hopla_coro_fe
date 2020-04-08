import axios from 'axios';

const apiBaseUrl = 'http://localhost:3000/api/users';

const UserService = {
  async getUserList() {
    return axios.get(apiBaseUrl);
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

import axios from 'axios';

const apiBaseUrl = 'http://localhost:3000/api/bons';

const BonService = {
  async getBonList() {
    return axios.get(apiBaseUrl);
  },
  async getBon(id) {
    return axios.get(`${apiBaseUrl}/${id}`);
  },
  async createBon(params) {
    return axios.post(apiBaseUrl, params);
  },
  async updateBon(params) {
    return axios.put(`${apiBaseUrl}/${params.id}`, params);
  },
  async deleteBon(id) {
    return axios.delete(`${apiBaseUrl}/${id}`);
  },
  async sendBonMail(id) {
    return axios.get(`${apiBaseUrl}/${id}/sendmail`);
  },
};
export default BonService;

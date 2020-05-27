import ApiService from './apiService';

const BonService = {
  async getBonList() {
    return ApiService.get('bons');
  },
  async getBon(id) {
    return ApiService.get(`bons/${id}`);
  },
  async addBon(params) {
    return ApiService.post('bons', params);
  },
  async updateBon(params) {
    return ApiService.put(`bons/${params.id}`, params);
  },
  async subtractBon(params) {
    return ApiService.post(`bons/${params.bon.id}/subtract-credit/`, params);
  },
  async updateBons(params) {
    return ApiService.put('bons/update-multiple', params);
  },
  async deleteBon(id) {
    return ApiService.delete(`bons/${id}`);
  },
  async sendBonMail(id) {
    return ApiService.get(`bons/${id}/sendmail`);
  },
  async sendMailBatch(params) {
    return ApiService.post('bons/sendmail-batch', params);
  },
};
export default BonService;

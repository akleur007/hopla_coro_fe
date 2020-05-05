import ApiService from './apiService';

const BonService = {
  async getBonList() {
    return ApiService.get('bons');
  },
  async getBon(id) {
    return ApiService.get(`bons/${id}`);
  },
  async createBon(params) {
    return ApiService.post('bons', params);
  },
  async updateBon(params) {
    return ApiService.put(`bons/${params.id}`, params);
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
};
export default BonService;

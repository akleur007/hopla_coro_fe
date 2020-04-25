import axios from 'axios';
import TokenService from './tokenService';

axios.interceptors.response.use((response) => response, (error) => Promise.reject(error));

const ApiService = {

  init(baseURL) {
    axios.defaults.baseURL = baseURL;
  },

  async setHeader() {
    const token = await TokenService.getToken();
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  },

  removeHeader() {
    axios.defaults.headers.common.Authorization = {};
  },

  get(resource) {
    return axios.get(resource);
  },

  post(resource, data) {
    return axios.post(resource, data);
  },

  put(resource, data) {
    return axios.put(resource, data);
  },

  delete(resource) {
    return axios.delete(resource);
  },

  /**
   * Perform a custom Axios request.
   *
   * data is an object containing the following properties:
   *  - method
   *  - url
   *  - data ... request payload
   *  - auth (optional)
   *    - username
   *    - password
  * */
  customRequest(data) {
    return axios(data);
  },
};

export default ApiService;

import { mapActions } from 'vuex';
import TokenService from '../services/tokenService';

const errorHandler = {
  methods: {
    ...mapActions('errors', ['setActiveError', 'removeActiveError']),
    handleApiError(error) {
      if (!error || error === '') {
        this.removeActiveError();
      } else {
        const params = {
          status: '',
          statusText: '',
          message: '',
          reason: '',
        };
        // console.log(error.response);
        params.status = error.response.status;
        params.statusText = error.response.statusText;
        params.message = error.response.data.message;
        params.reason = error.response.data.reason;

        if (error.response.data.reason === 'expired token') {
          TokenService.removeToken();
          this.$router.push({ path: '/login' });
        } else {
          this.setActiveError(params);
          this.$router.push({ path: '/error' });
        }
      }
    },
  },
};

export default errorHandler;

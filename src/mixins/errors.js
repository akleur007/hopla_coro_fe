import { mapActions } from 'vuex';

const errorHandler = {
  methods: {
    ...mapActions('errors', ['setActiveError']),
    handleApiError(error) {
      if (!error || error === '') {
        this.removeActiveError();
      } else {
        const params = {
          status: '',
          statusText: '',
          message: '',
        };
        console.log(error.response);
        params.status = error.response.status;
        params.statusText = error.response.statusText;
        params.message = error.response.data.message;

        this.setActiveError(params);
        this.$router.push({ path: '/error' });
      }
    },
  },
};

export default errorHandler;

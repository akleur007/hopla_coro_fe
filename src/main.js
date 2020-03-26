import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import FlashMessage from '@smartweb/vue-flash-message';
import Vue from 'vue';
import App from './App.vue';
import router from './router';

Vue.config.productionTip = false;
const flashMsgConfig = {
  time: 3000,
  strategy: 'multiple',
};

new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app');

Vue.use(FlashMessage, flashMsgConfig);

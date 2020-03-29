import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Vue from 'vue';
import FlashMessage from '@smartweb/vue-flash-message';
import App from './App.vue';
import router from './router';

Vue.config.productionTip = false;
const flashMsgConfig = {
  time: 3000,
  strategy: 'multiple',
};

Vue.use(FlashMessage, flashMsgConfig);

new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app');

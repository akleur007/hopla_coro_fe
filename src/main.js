import Vue from 'vue';
import BootstrapVue from 'bootstrap-vue';
import 'bootstrap/dist/css/bootstrap.min.css';
// import 'bootstrap-vue/dist/bootstrap-vue.css';
import './assets/style.css';
import dotenv from 'dotenv';

import FlashMessage from '@smartweb/vue-flash-message';
import TokenService from './services/tokenService';
import ApiService from './services/apiService';
import App from './App.vue';
import router from './router';
import store from './store';
import wb from './registerServiceWorker';

dotenv.config();

// const apiBaseUrl = './api';
const apiBaseUrl = process.env.IS_ONLINE
  ? 'https://localhost:3000/api'
  : 'https://192.168.178.20:3000/api';
// const apiBaseUrl = 'https://192.168.178.20:3000/api';

console.log('WA --> : apiBaseUrl', apiBaseUrl);

ApiService.init(apiBaseUrl);

if (TokenService.getToken()) {
  ApiService.setHeader();
}

Vue.prototype.$workbox = wb;

Vue.config.productionTip = false;
const flashMsgConfig = {
  time: 3000,
  strategy: 'multiple',
};

Vue.use(FlashMessage, flashMsgConfig);
Vue.use(BootstrapVue);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');

// Clear console on hot load

window.addEventListener('message', (e) => {
  if (e.data && typeof e.data === 'string' && e.data.match(/webpackHotUpdate/)) {
    console.log('hot reload happened');
    console.clear();
  }
});

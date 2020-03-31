import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Vuex from 'vuex';
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
Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    token: localStorage.getItem('user-token') || '',
  },
});

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

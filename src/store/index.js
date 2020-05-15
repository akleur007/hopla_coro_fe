import Vuex from 'vuex';
import Vue from 'vue';
import createPersistedState from 'vuex-persistedstate';
import bons from './modules/bons';
import users from './modules/users/index';
import errors from './modules/errors';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    bons,
    users,
    errors,
  },
  plugins: [
    createPersistedState({
      storage: window.sessionStorage,
    }),
  ],
});

import Vuex from 'vuex';
import Vue from 'vue';
import bons from './modules/bons';
import users from './modules/users';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    bons,
    users,
  },
});

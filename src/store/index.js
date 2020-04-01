import Vuex from 'vuex';
import Vue from 'vue';
import bons from './modules/bons';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    bons,
  },
});

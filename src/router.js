import Vue from 'vue';
import Router from 'vue-router';
import ViewLogin from './views/ViewLogin.vue';
import ViewBons from './views/ViewBons.vue';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: ViewLogin,
    },
    {
      path: '/bonlist',
      name: 'make Bons',
      component: ViewBons,
    },
  ],
});

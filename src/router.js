import Vue from 'vue';
import Router from 'vue-router';
import ViewLogin from './views/ViewLogin.vue';
import ViewBons from './views/ViewBons.vue';
import ViewBonEdit from './views/ViewBonEdit.vue';

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
    {
      path: '/bon/:id',
      name: 'bon-edit',
      component: ViewBonEdit,
    },
  ],
});

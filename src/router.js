import Vue from 'vue';
import Router from 'vue-router';
import ViewLogin from './views/ViewLogin.vue';
import ViewBons from './views/ViewBons.vue';
import ViewBonEdit from './views/ViewBonEdit.vue';
import ViewUsers from './views/ViewUsers.vue';
import ViewUserEdit from './views/ViewUserEdit.vue';

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
    {
      path: '/userlist',
      name: 'make-users',
      component: ViewUsers,
    },
    {
      path: '/user/:id',
      name: 'user-edit',
      component: ViewUserEdit,
    },
  ],
});

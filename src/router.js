import Vue from 'vue';
import Router from 'vue-router';
import ViewHome from './views/ViewHome.vue';
import ViewLogin from './views/ViewLogin.vue';
import ViewBons from './views/ViewBons.vue';
import ViewBonEdit from './views/ViewBonEdit.vue';
import ViewUsers from './views/ViewUsers.vue';
import ViewUserEdit from './views/ViewUserEdit.vue';
import TokenService from './services/tokenService';

Vue.use(Router);

const router = new Router({
  linkActiveClass: 'active',
  routes: [
    {
      path: '/',
      name: 'home',
      component: ViewHome,
    },
    {
      path: '/login',
      name: 'login',
      component: ViewLogin,
      meta: {
        public: true, // Allow access to even if not logged in
        onlyWhenLoggedOut: true,
      },
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

router.beforeEach((to, from, next) => {
  const isPublic = to.matched.some((record) => record.meta.public);
  const onlyWhenLoggedOut = to.matched.some((record) => record.meta.onlyWhenLoggedOut);
  const loggedIn = !!TokenService.getToken();

  if (!isPublic && !loggedIn) {
    return next({
      path: '/login',
      query: { redirect: to.fullPath }, // Store the full path to redirect the user to after login
    });
  }

  // Do not allow user to visit login page or register page if they are logged in
  if (loggedIn && onlyWhenLoggedOut) {
    return next('/');
  }

  return next();
});

export default router;

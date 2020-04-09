import Vue from 'vue';
import Router from 'vue-router';
import ViewHome from './views/ViewHome.vue';
import ViewLogin from './views/ViewLogin.vue';
import ViewBons from './views/ViewBons.vue';
import ViewBonEdit from './views/ViewBonEdit.vue';
import ViewUsers from './views/ViewUsers.vue';
import ViewUserEdit from './views/ViewUserEdit.vue';
// import TokenService from './services/tokenService';

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
        public: true,
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
      meta: {
        public: true,
        onlyWhenLoggedOut: true,
      },
    },
  ],
});

/* router.beforeEach(async (to, from, next) => {
  const isPublic = to.matched.some((record) => record.meta.public);
  const onlyWhenLoggedOut = to.matched.some((record) => record.meta.onlyWhenLoggedOut);
  let loggedIn = false;
  try {
    const token = await TokenService.getToken();
    if (token != null) loggedIn = true;
  } catch (e) {
    loggedIn = false;
  }

  console.log(loggedIn);

  if (!isPublic && !loggedIn) {
    return next({
      path: '/login',
      query: { redirect: to.fullPath }, // Store the full path to redirect the user to after login
    });
  }

  if (loggedIn && onlyWhenLoggedOut) {
    return next('/');
  }

  return next();
}); */

export default router;

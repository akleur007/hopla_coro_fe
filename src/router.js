import Vue from 'vue';
import Router from 'vue-router';
import ViewHome from './views/ViewHome.vue';
import ViewLogin from './views/ViewLogin.vue';
import ViewBons from './views/ViewBons.vue';
import ViewBonEdit from './views/ViewBonEdit.vue';
import ViewUsers from './views/ViewUsers.vue';
import ViewUserEdit from './views/ViewUserEdit.vue';
import ViewError from './views/ViewError.vue';
import TokenService from './services/tokenService';

Vue.use(Router);

const router = new Router({
  linkActiveClass: 'active',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: ViewHome,
      meta: {
        isMenu: true,
        menuName: 'Home',
        requiredRole: 'guest',
      },
    },
    {
      path: '/login',
      name: 'Login',
      component: ViewLogin,
      meta: {
        public: true,
        // onlyWhenLoggedOut: true,
      },
    },
    {
      path: '/bonlist',
      name: 'Bons',
      component: ViewBons,
      meta: {
        isMenu: true,
        menuName: 'Bons',
        requiredRole: 'manager',
      },
    },
    {
      path: '/bon/:id',
      name: 'bon-edit',
      component: ViewBonEdit,
    },
    {
      path: '/userlist',
      name: 'Users',
      component: ViewUsers,
      meta: {
        isMenu: true,
        menuName: 'Users',
        requiredRole: 'manager',
      },
    },
    {
      path: '/user/:id',
      name: 'user-edit',
      component: ViewUserEdit,
    },
    {
      path: '/error',
      name: 'Error',
      component: ViewError,
      meta: {
        isMenu: true,
        menuName: 'Error',
        requiredRole: 'admin',
      },
    },
  ],
});

router.beforeEach(async (to, from, next) => {
  const isPublic = to.matched.some((record) => record.meta.public);
  const onlyWhenLoggedOut = to.matched.some((record) => record.meta.onlyWhenLoggedOut);
  let loggedIn = false;
  try {
    const token = await TokenService.getToken();
    if (token != null) loggedIn = true;
  } catch (e) {
    loggedIn = false;
  }

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
});

export default router;

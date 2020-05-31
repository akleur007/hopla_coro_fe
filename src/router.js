import Vue from 'vue';
import Router from 'vue-router';
import ViewHome from './views/ViewHome.vue';
import ViewLogin from './views/ViewLogin.vue';
import ViewBons from './views/ViewBons.vue';
import ViewUsers from './views/ViewUsers.vue';
import ViewError from './views/ViewError.vue';
import ViewLoadCsv from './views/ViewLoadCsv.vue';
import TokenService from './services/tokenService';
import ViewQRScanner from './views/ViewQRScanner.vue';

Vue.use(Router);

const router = new Router({
  linkActiveClass: 'active',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: ViewHome,
      meta: {
        // isMenuItem: true,
        requiredRole: 'guest',
      },
    },
    {
      path: '/scan',
      name: 'Scan',
      component: ViewQRScanner,
      meta: {
        isMenuItem: true,
        requiredRole: 'user',
      },
    },
    {
      path: '/login',
      name: 'Login',
      component: ViewLogin,
      meta: {
        requiredRole: 'guest',
      },
    },
    {
      path: '/bonlist',
      name: 'Bons',
      component: ViewBons,
      meta: {
        isMenuItem: true,
        requiredRole: 'manager',
      },
    },
    {
      path: '/userlist',
      name: 'Users',
      component: ViewUsers,
      meta: {
        isMenuItem: true,
        requiredRole: 'manager',
      },
    },
    {
      path: '/error',
      name: 'Error',
      component: ViewError,
      meta: {
        isMenuItem: true,
        requiredRole: 'admin',
      },
    },
    {
      path: '/load-csv',
      name: 'Import Csv',
      component: ViewLoadCsv,
      meta: {
        isMenuItem: true,
        requiredRole: 'manager',
      },
    },
  ],
});

router.beforeEach(async (to, from, next) => {
  const isPublic = to.matched.some((record) => record.meta.requiredRole === 'guest');
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

  return next();
});

export default router;

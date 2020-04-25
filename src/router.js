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
        isMenuItem: true,
        requiredRole: 'guest',
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
      path: '/bon/:id',
      name: 'bon-edit',
      component: ViewBonEdit,
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
      path: '/user/:id',
      name: 'user-edit',
      component: ViewUserEdit,
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

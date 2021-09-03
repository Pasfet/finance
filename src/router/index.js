import Vue from 'vue';
import Router from 'vue-router';
import firebase from 'firebase/app';

Vue.use(Router);

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: () => import('../pages/Auth'),
      name: 'Auth',
    },
    {
      path: '/login',
      component: () => import('../pages/Auth'),
      name: 'Login',
    },
    {
      path: '/register',
      component: () => import('../pages/Register'),
      name: 'Register',
    },
    {
      path: '/dashboard',
      component: () => import('../pages/MainPage'),
      name: 'PageMain',
      meta: { auth: true },
      children: [
        {
          path: '/dashboard/add/:category',
          component: () => import('../pages/MainPage'),
          name: 'AddPaymentFromUrl',
          meta: { auth: true },
        },
        {
          path: '/dashboard/edit/:id/',
          component: () => import('../pages/MainPage'),
          name: 'EditPaymentFromUrl',
          meta: { auth: true },
        },
        {
          path: '/dashboard/page/:page',
          component: () => import('../pages/MainPage'),
          name: 'PageFromUrl',
          meta: { auth: true },
        },
      ],
    },
    {
      path: '/about',
      component: () => import('../pages/About'),
      meta: { auth: true },
      name: 'About',
    },
    {
      path: '/*',
      component: () => import('../pages/Page404'),
      name: 'Page404',
      meta: { auth: true },
    },
  ],
});

router.beforeEach((to, from, next) => {
  const currentUser = firebase.auth().currentUser;
  const requireAuth = to.matched.some(record => record.meta.auth);

  if (requireAuth && !currentUser) {
    next('/login');
  } else {
    next();
  }
});

export default router;

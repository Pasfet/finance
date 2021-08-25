import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: () => import('../pages/MainPage'),
      name: 'PageMain',
      children: [
        {
          path: '/add/:category',
          component: () => import('../pages/MainPage'),
          name: 'AddPaymentFromUrl',
        },
        {
          path: '/edit/:id/:category',
          component: () => import('../pages/MainPage'),
          name: 'EditPaymentFromUrl',
        },
      ],
    },
    {
      path: '/:page',
      component: () => import('../pages/MainPage'),
      name: 'PageFromUrl',
    },
    {
      path: '*',
      component: () => import('../pages/Page404'),
      name: 'Page404',
    },
  ],
});

export default router;

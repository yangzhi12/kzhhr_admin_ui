import Vue from 'vue'
import Router from 'vue-router'
import Login from './views/Login.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'member',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('./views/Member.vue'),
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/user',
      name: 'user',
      component: () => import('./views/User.vue'),
      meta: {
        requireAuth: true
      }
    },
    // {
    //   path: '/member',
    //   name: 'member',
    //   component: () => import('./views/Member.vue'),
    //   meta: {
    //     requireAuth: true
    //   }
    // },
    {
      path: '/contract',
      name: 'contract',
      component: () => import('./views/Contract.vue'),
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/dataaccess',
      name: 'dataaccess',
      component: () => import('./views/DataAccess.vue'),
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/accounts',
      name: 'accounts',
      component: () => import('./views/Accounts.vue'),
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/report',
      name: 'report',
      component: () => import('./views/Report.vue'),
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/personal',
      name: 'personal',
      component: () => import('./views/Personal.vue')
    }
  ]
})

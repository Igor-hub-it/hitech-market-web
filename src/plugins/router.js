import { createRouter, createWebHistory } from 'vue-router'

function lazyView(viewName) {
  return () => import(/* webpackChunkName: "[request]" */ `@/views/${viewName}.vue`)
}
function lazyLayout(layoutName) {
  return () => import(/* webpackChunkName: "[request]" */ `@/layouts/${layoutName}.vue`)
}

const routes = [
  {
    path: '/',
    name: 'home',
    component: lazyView('Home'),
  },
  {
    path: '/basket',
    name: 'basket',
    component: lazyView('Basket'),
  },
  {
    path: '/catalog/:componentName',
    component: lazyLayout('Empty'),
    redirect: { name: 'components-list' },
    children: [
      {
        path: '',
        name: 'components-list',
        component: lazyView('ComponentsList'),
      },
      {
        path: ':componentId',
        name: 'component-details',
        component: lazyView('ComponentDetails'),
      },
    ]
  },

  {
    path: '/dashboard',
    name: 'dashboard',
    component: lazyView('Dashboard'),
  },
  {
    path: '/profile',
    component: lazyLayout('Profile'),
    redirect: { name: 'profile' },
    children: [
      {
        path: '',
        name: 'profile',
        component: lazyView('Profile'),
      },
      {
        path: 'edit',
        name: 'profile-edit',
        component: lazyView('ProfileEdit'),
      }
    ]
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router

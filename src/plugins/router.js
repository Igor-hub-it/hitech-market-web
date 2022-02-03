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
    path: '/catalog/:component',
    name: 'catalog',
    component: lazyView('ShopSample'),
  },
  {
    path: '/component',
    name: 'component',
    component: lazyView('Component'),
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

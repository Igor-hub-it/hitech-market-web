import { createRouter, createWebHistory } from 'vue-router'

function lazyView(view) {
  return () => import(/* webpackChunkName: "[request]" */ `@/views/${view}.vue`)
}

const routes = [
  {
    path: '/',
    name: 'home',
    component: lazyView('Home'),
    meta: { layout: 'main' }
  },
  {
    path: '/basket',
    name: 'basket',
    component: lazyView('Basket'),
    meta: { layout: 'main' }
  },
  {
    path: '/catalog/:component',
    name: 'catalog',
    component: lazyView('ShopSample'),
    meta: { layout: 'main' }
  },
  {
    path: '/api/:route',
    name: 'api',
    component: lazyView('vApi'),
    meta: { layout: 'empty' }
  },
  {
    path: '/component',
    name: 'component',
    component: lazyView('Component'),
    meta: {layout: 'main'}
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: lazyView('Dashboard'),
    meta: {layout: 'empty'}
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router

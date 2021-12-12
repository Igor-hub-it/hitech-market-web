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
    path: '/busket',
    name: 'busket',
    component: lazyView('Busket'),
    meta: { layout: 'main' }
  },
  {
    path: '/shop',
    name: 'shop',
    component: lazyView('ShopSample'),
    meta: { layout: 'main' }
  },
  {
    path: '/login',
    name: 'login',
    component: lazyView('vAuth'),
    meta: { layout: 'empty' }
  },
  {
    path: '/api/:route',
    name: 'api',
    component: lazyView('vApi'),
    meta: { layout: 'empty' }
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router

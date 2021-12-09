import { createRouter, createWebHistory } from 'vue-router'

function lazyView(view) {
  return () => import(/* webpackChunkName: "[request]" */ `@/views/${view}.vue`)
}

const routes = [
  {
    path: '/',
    name: 'index',
    component: lazyView('Home'),
    meta: {layout: 'main'}
  },
  {
    path: '/register',
    name: 'register',
    component: lazyView('Register'),
    meta: {layout: 'empty'}
  },
  {
    path: '/login',
    name: 'login',
    component: lazyView('Login'),
    meta: {layout: 'empty'}
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router

import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'

import middleware from './middleware'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/Login.vue'),
    beforeEnter: middleware.guest,
  },
  {
    path: '/pensamientos',
    name: 'Pensamientos',
    component: () => import('@/views/UserPensamientos.vue'),
    beforeEnter: middleware.user
  }

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router

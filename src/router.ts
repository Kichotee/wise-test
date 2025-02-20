import {  createRouter, createWebHistory } from 'vue-router'

import HomeView from './pages/Home.vue'
import ErrorPageView from './pages/Error-page.vue'
// import AboutView from './AboutView.vue'

const routes = [
  { path: '/', component: HomeView },
  { path: '/about', component:HomeView },
  { path: '/:pathMatch(.*)*', component:ErrorPageView },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})
export default router
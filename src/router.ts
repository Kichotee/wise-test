import {  createRouter, createWebHistory } from 'vue-router'

import HomeView from './pages/Home.vue'
// import AboutView from './AboutView.vue'

const routes = [
  { path: '/', component: HomeView },
  { path: '/about', component:HomeView },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})
export default router
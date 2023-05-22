import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('../views/AboutView.vue')
  },
  {
    path: '/contact',
    name: 'contact',
    component: () => import('../views/ContactView.vue')
  },
  {
    path: '/panel',
    name: 'panel',
    component: () => import('../views/purchaseSaleView.vue')
  },
  {
    path: '/historical',
    name: 'historical',
    component: () => import('../views/HistoricalView.vue')
  },
  {
    path: '/analysis',
    name: 'analysis',
    component: () => import('../views/AnalysisView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router

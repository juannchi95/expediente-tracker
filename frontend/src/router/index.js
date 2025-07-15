import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '@/views/LoginView.vue'
import ExpedienteTracker from '@/views/ExpedienteTracker.vue'
import HistoryView from '@/views/HistoryView.vue'
import { auth } from '@/services/auth'
import { isTokenExpired } from '@/services/tokenUtils'

const routes = [
  { path: '/login', component: LoginView },
  {
    path: '/',
    component: ExpedienteTracker,
    meta: { requiresAuth: true }
  },
  {
    path: '/historial/:ci',
    component: HistoryView,
    meta: { requiresAuth: true }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth) {
    const token = auth.getToken()
    if (!token || isTokenExpired(token)) {
      auth.removeToken()
      return next('/login')
    }
  }
  next()
})

export default router
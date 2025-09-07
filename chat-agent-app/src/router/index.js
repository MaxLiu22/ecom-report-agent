import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'agent',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AgentView.vue'),
    },
    {
      path: '/business-logic-test',
      name: 'business-logic-test',
      component: () => import('../components/business-logic-test.vue'),
    },
    {
      path: '/yesterday',
      name: 'yesterday',
      component: () => import('../views/Yesterday.vue'),
    },
    // 重复的 '/business-logic-test' 路由已移除，避免重复 name/path 导致的运行期错误
  ],
})

export default router

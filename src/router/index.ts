import { createRouter, createWebHashHistory } from 'vue-router'
import Panel from '@/views/Panel/index.vue'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Panel',
      component: Panel,
      children: [
        {
          path: '/saleorder',
          name: 'SaleOrder',
          component: () => import('@/views/Panel/SaleOrder.vue'),
        },
      ],
    },
  ],
})

export default router

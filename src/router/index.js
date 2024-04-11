import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ShowView from '@/views/ShowView.vue'
import EditView from '@/views/EditView.vue'
import CreateView from '@/views/CreateView.vue'
import NotFound from '@/views/NotFound.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/purchase-order/:id',
      name: 'show',
      component: ShowView
    },
    {
      path: '/purchase-order/create',
      name: 'create',
      component: CreateView
    },
    {
      path: '/purchase-order/:id/edit',
      name: 'edit',
      component: EditView
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: NotFound
    }
  ]
})

export default router

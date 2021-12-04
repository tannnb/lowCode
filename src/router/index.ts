import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

import Index from '../views/Index.vue'
import Home from '../views/Home.vue'
import Editor from '../views/Editor.vue'
import TemplateDetail from '../views/TemplateDetail.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'index',
    component: Index,
    children: [
      { path: '', name: 'home', component: Home },
      { path: 'template/:id', name: 'template', component: TemplateDetail }
    ]
  },
  {
    path: '/editor',
    name: 'editor',
    component: Editor
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router

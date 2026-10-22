import { createRouter, createWebHistory } from 'vue-router'

import ListeContacts from '../views/ListeContacts.vue'
import DetailContact from '../views/DetailContact.vue'

const routes = [
  {
    path: '/',
    name: 'ListeContacts',
    component: ListeContacts
  },
  {
    path: '/contact/:id',
    name: 'DetailContact',
    component: DetailContact
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router

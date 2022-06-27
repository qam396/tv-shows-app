import { createRouter, createWebHashHistory } from 'vue-router'

import DashboardPage from '../dashboard/DashboardPage.vue'
import DetailsPage from '../details/DetailsPage.vue'
import ErrorPage from '../error/ErrorPage.vue'

export default createRouter({
  history: createWebHashHistory(),
  routes: [{
    path: '/',
    name: 'Dashboard',
    component: DashboardPage
  }, {
    path: '/show/:id',
    name: 'Details',
    component: DetailsPage
  }, {
    path: '/:pathMatch(.*)*',
    component: ErrorPage
  }]
})

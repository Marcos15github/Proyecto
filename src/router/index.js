import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import ERforS from '../views/ERforS.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/Hom',
    name: 'Home',
    component: Home
  },
  {
    path: '/',
    name: 'ERforS',
    component: ERforS

  },
  
  {
    path: '/about',
    name: 'About',
    component: () => import('../views/dashboard')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router

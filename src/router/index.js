import Vue from 'vue'
import VueRouter from 'vue-router'
const Home = () => import('../views/Home.vue')
const Demo = () => import('../views/Demo.vue')

Vue.use(VueRouter)

const routes = [
  // {
  //   path: '/',
  //   name: 'Home',
  //   component: Home
  // },
  {
    path: '/',
    name: 'Demo',
    component: Demo
  },
]

const router = new VueRouter({
  routes
})

export default router

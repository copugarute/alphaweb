import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Administrador from '../views/Administrador.vue'
import Editar from '../views/Editar.vue'
import Login from '../views/Login.vue'
import Registro from '../views/Registro.vue'


Vue.use(VueRouter)

const routes = [
  {
    path: '/editar/:key',
    name: 'Editar',
    component: Editar,
    meta: {
      requiresAuth: true
    },
  },
  {
    path: '/home',
    name: 'Home',
    component: Home,
    meta: {
      requiresAuth: true
    },
  },
  {
    path: '/administrador',
    name: 'Administrador',
    component: Administrador,
    meta: {
      requiresAuth: true
    },
  },

  {
    path: '/',
    name: 'Login',
    component: Login
  },
  {
    path: '/registro',
    name: 'Registro',
    component: Registro
  },

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {

  let user = JSON.parse(sessionStorage.getItem('user'))
  let authRequired = to.matched.some(record => record.meta.requiresAuth)
  if (!user && authRequired) {
    next({
      path: '/',
      query: { redirect: to.fullPath }
    })
  } else if (user && !authRequired) {
    next({
      path: '/home',
      query: { redirect: to.fullPath }
    })
  }
  else {
    next()
  }
})

export default router

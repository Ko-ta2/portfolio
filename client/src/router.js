import Vue from 'vue'
import VueRouter from 'vue-router'

import Base from './components/Base.vue'
import UserList from './components/UserList.vue'
import User from './components/User.vue'
import LogIn from './components/LogIn.vue'
import NotFound from './components/NotFound.vue'

import store from './store'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: Base,
    meta: {
      requiresAuth: true
    },
    children: [
      {
        path: '',
        component: UserList
      }, {
        path: 'user/:id',
        component: User,
        props: true
      }
    ]
  },
  {
    path: '/login',
    component: LogIn
  },
  {
    path: '*',
    component: NotFound
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

// router.beforeEach((to, from, next) => {
//   if(to.matched.some(record => record.meta.requiresAuth)) {
//     if(!store.state.userId) {
//       next({
//         path: '/login',
//         query: { redirect: to.fullPath}
//       })
//     }
//     next()
//   }
//   next()
// })

export default router
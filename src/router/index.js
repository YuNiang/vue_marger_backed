import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './routes'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

Vue.use(VueRouter)

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push (location) {
  return originalPush.call(this, location).catch(err => err)
}

const router = new VueRouter({
  mode: 'history',
  routes
})

router.beforeEach((to, from, next) => {
  NProgress.start()
  next()
  // if (to.path === '/login') {
  //   next()
  // } else {
  //   const routers = JSON.parse(localStorage.route || '[]')
  //   let isRight = false
  //   routers.forEach(item => {
  //     if (item.children) {
  //       item.children.forEach(ele => {
  //         if (ele.index === to.path) {
  //           isRight = true
  //         }
  //       })
  //     } else {
  //       if (item.index === to.path) {
  //         isRight = true
  //       }
  //     }
  //   })
  //   if (isRight) {
  //     next()
  //   } else {
  //     if (to.path !== '/login') {
  //       localStorage.clear()
  //       next({
  //         path: '/login'
  //       })
  //     }
  //   }
  // }
  NProgress.done()
})

export default router

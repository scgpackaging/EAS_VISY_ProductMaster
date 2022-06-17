import Vue from 'vue'
import Router from 'vue-router'

// Containers

const CustomTheContainer = () => import('@/containers/CustomTheContainer')

//productCode
const Product_Code = () => import('@/views/ProductCode/ProductCodeHome')

Vue.use(Router)

// const UserToken = sessionStorage.getItem("UserToken")
// if (UserToken == null || UserToken == "null") {
//   window.location.href = '#/login'
// } 
// else {
//   const prevAccepted = JSON.parse(UserToken)
//   const currentTime = new Date().getTime()
//   // const expirationDuration = (1000 * 60 * 60 * 24) // 24 hours
//   const expirationDuration = (1000 * 60 * 60) // 1 hours
//   if ((currentTime - prevAccepted.timestamp) > expirationDuration) {
//     window.location.href = '#/login'
//   }
// }

export default new Router({
  mode: 'hash', // https://router.vuejs.org/api/#mode
  linkActiveClass: 'active',
  scrollBehavior: () => ({ y: 0 }),
  routes: configRoutes()
})

function configRoutes() {
  return [
    {
      path: '/',
      redirect: '/ProductCode',
      name: 'Home',
      component: {
        render (c) { return c('router-view') }
      }
    },
    {
      path: '/',
      redirect: '/dashboard',
      name: 'Home page',
      component: CustomTheContainer,
      children: [
        {
          path: '/ProductCode',
          redirect: 'ProductCode/Home',
          name: 'Product Code',
          component: {
            render(c) { return c('router-view') }
          },
          children: [
            {
              path: 'Home',
              name: 'Home product',
              component: Product_Code,
            },
          ]
        }, 
      ]
    },
  ]
}


import Vue from 'vue'
import HelloWorld from '@/components/HelloWorld'
import Register from '@/components/Register'
import Mainpage from '@/components/Mainpage'
import Router from 'vue-router'

Vue.use(Router)


export default new Router({
  routes: [{
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },

    {
      path: '/register',
      name: 'Register',
      component: Register
    },

    {
      path: '/mainpage',
      name: 'Mainpage',
      component: Mainpage
    },

  ]
})

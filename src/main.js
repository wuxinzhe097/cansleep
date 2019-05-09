// 这是入口JS
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuex from 'vuex'
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
import App from './App'
import router from './router'
import {setCookie, getCookie, delCookie} from './assets/js/cookie'
Vue.prototype.$cookieStore = {
  setCookie,
  getCookie,
  delCookie
}
Vue.config.productionTip = false
Vue.use(MintUI);
Vue.use(Vuex)

// vuex
const store=new Vuex.Store({
  state:{
    cartCount:0
  },
  mutations:{
    updateCartCount(state,cartCount){
      state.cartCount+=cartCount
    },
    initCartCount(state,cartCount){
      state.cartCount=cartCount
    }
  }
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    if (!getCookie('userId')) {
      next({
        path: '/login',
        query: { redirect: to.fullPath }
      })
    } else {
      next()
    }
  } else {
    next() // 确保一定要调用 next()
  }
})

  
/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  components: { App },
  template: '<App/>'
})

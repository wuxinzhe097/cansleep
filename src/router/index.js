// 此文件为路由器模块

import Vue from 'vue'
import Router from 'vue-router'
import login from '../pages/login'
import home from '../pages/home'
import dreamtalk from '../pages/dreamtalk'
import shop from '../pages/shop'
import me from '../pages/me'
import personSet from '../pages/personSet'
import search from '../pages/search'
import goodDetail from '../pages/goodDetail'
import talkDetail from '../pages/talkDetail'
import createTalk from '../pages/createTalk'
import cart from '../pages/cart'
import checkOut from '../pages/checkOut'
import addressList from '../pages/addressList'
import addressAdd from '../pages/addressAdd'
import addressEdit from '../pages/addressEdit'
import orderPage from '../pages/orderPage'
import orderSuccess from '../pages/orderSuccess'
import orderList from '../pages/orderList'
import payPage from '../pages/payPage'
import personInfo from '../pages/personInfo'
import myTalk from '../pages/myTalk'
import editUserName from '../pages/editUserName'
import editUserSign from '../pages/editUserSign'
import editUserPassword from '../pages/editUserPassword'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: {
          name: 'login'
      }
   },
    {
      path: '/login',
      name: 'login',
      component:login
    },
    {
      path: '/home',
      name: 'home',
      component: home,
      meta:{
        showFooter:true,
        requiresAuth:true
      }
    },
    {
      path: '/dreamtalk',
      name: 'dreamtalk',
      component: dreamtalk,
      meta:{
        showFooter:true,
        showHeader:true,
        requiresAuth:true
      }
    },
    {
      path: '/shop',
      name: 'shop',
      component: shop,
      meta:{
        showFooter:true,
        showHeader:true,
        requiresAuth:true
      }
    },
    {
      path: '/me',
      name: 'me',
      component: me,
      meta:{
        showFooter:true,
        showHeader:true,
      }
    },
    {
      path: '/personSet',
      name: 'personSet',
      component: personSet,
      meta:{
        showHeader:true,
        requiresAuth:true
      }
    },
    {
      path: '/search',
      name: 'search',
      component: search,
      meta:{
        showHeader:true,
         requiresAuth:true
      }
    },
    {
      path: '/goodDetail',
      name: 'goodDetail',
      component: goodDetail,
      meta:{
        showHeader:true,
         requiresAuth:true
      }
    },
    {
      path: '/createTalk',
      name: 'createTalk',
      component: createTalk,
      meta:{
        showHeader:true,
         requiresAuth:true
      }
    },
    {
      path: '/talkDetail',
      name: 'talkDetail',
      component: talkDetail,
      meta:{
        showHeader:true,
         requiresAuth:true
      }
    },
    {
      path: '/cart',
      name: 'cart',
      component: cart,
      meta:{
        showHeader:true,
         requiresAuth:true
      }
    },
    {
      path: '/addressList',
      name: 'addressList',
      component: addressList,
      meta:{
        showHeader:true,
         requiresAuth:true
      }
    },
    {
      path: '/addressAdd',
      name: 'addressAdd',
      component: addressAdd,
      meta:{
        showHeader:true,
         requiresAuth:true
      }
    },
    {
      path: '/addressEdit',
      name: 'addressEdit',
      component: addressEdit,
      meta:{
        showHeader:true,
         requiresAuth:true
      }
    },
    {
      path: '/checkOut',
      name: 'checkOut',
      component: checkOut,
      meta:{
        showHeader:true,
         requiresAuth:true
      }
    },
    {
      path: '/orderPage',
      name: 'orderPage',
      component: orderPage,
      meta:{
        showHeader:true,
         requiresAuth:true
      }
    },
    {
      path: '/orderSuccess',
      name: 'orderSuccess',
      component: orderSuccess,
      meta:{
        showHeader:true,
         requiresAuth:true
      }
    },
    {
      path: '/orderList',
      name: 'orderList',
      component: orderList,
      meta:{
        showHeader:true,
         requiresAuth:true
      }
    },
    {
      path: '/payPage',
      name: 'payPage',
      component: payPage,
      meta:{
        showHeader:true,
         requiresAuth:true
      }
    },
    {
      path: '/myTalk',
      name: 'myTalk',
      component: myTalk,
      meta:{
        showHeader:true,
         requiresAuth:true
      }
    },
    {
      path: '/personInfo',
      name: 'personInfo',
      component: personInfo,
      meta:{
        showHeader:true,
         requiresAuth:true
      }
    },
    {
      path: '/editUserName',
      name: 'editUserName',
      component: editUserName,
      meta:{
        showHeader:true,
         requiresAuth:true
      }
    },
    {
      path: '/editUserSign',
      name: 'editUserSign',
      component: editUserSign,
      meta:{
        showHeader:true,
         requiresAuth:true
      }
    },
    {
      path: '/editUserPassword',
      name: 'editUserPassword',
      component: editUserPassword,
      meta:{
        showHeader:true,
         requiresAuth:true
      }
    },
  ]
})

<template>
<div class="footer">
  <div class="contain-space"></div>
  <div class="footbar">
    <ul class="footer-list">
      <router-link :to="{name:'home'}" tag="li" class="footer-item" active-class="active">
        <span>
          <i v-show="$route.path!='/home'" class="iconfont icon-zhuye2"></i>
          <i v-show="$route.path==='/home'" class="iconfont icon-zhuye"></i>
          </span>
        <span>首页</span>
      </router-link>
      <router-link :to="{name:'dreamtalk'}" tag="li" class="footer-item" active-class="active">
        <span>
          <i v-show="$route.path!='/dreamtalk'" class="iconfont icon-banjiquan-pinglun-weixuan"></i>
          <i v-show="$route.path==='/dreamtalk'" class="iconfont icon-banjiquan-pinglun-xuanzhong"></i>
          </span>
        <span>梦话</span>
      </router-link>
      <router-link :to="{name:'shop'}" tag="li" class="footer-item" active-class="active">
        <span>
          <i  v-show="$route.path!='/shop'" class="iconfont icon-shangcheng1"></i>
          <i  v-show="$route.path==='/shop'" class="iconfont icon-shangcheng2"></i>
          </span>
        <span>商城</span>
      </router-link>
      <router-link :to="{name:'me'}" tag="li" class="footer-item" active-class="active">
        <span>
          <i v-show="$route.path!='/me'" class="iconfont icon-04"></i>
          <i v-show="$route.path==='/me'" class="iconfont icon-04f"></i>
          </span>
        <span>我的</span>
      </router-link>
      <div class="plus-button iconfont icon-wuuiconxiangjifangda" @click=" popupVisible=! popupVisible"></div>
      <mt-popup v-model="popupVisible" position="bottom">
        <div class="pop-wrap">
          <div class="pop-info">
           <i class="iconfont icon-luyin"></i>
          </div>
        </div>
</mt-popup>
    </ul>
  </div>
  </div>
</template>
<script>
import Vue from 'vue'
import { Popup } from 'mint-ui';
export default {
  data(){
    return {
      popupVisible:false
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.contain-space {
  margin: 40px 0 0 0;
  color:#888;
  text-align: center;
  font-size: 30px;
  height: 130px;
}
.footbar {
  background-color: #fff;
  z-index: 999;
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  font-size: 20px;
  height: 110px;
  box-shadow: 0px 0px 40px #888888;
  .footer-list {
    display: flex;
    justify-content: space-around;
    align-items: center;
    .footer-item {
      height: 110px;
      width: 60px;
      text-align: center;
      i:before {
        font-size: 52px;
      }
    }
    .plus-button {
      position: absolute;
      margin-top: -50px;
      &::before {
        background-color: #fff;
        border-radius: 50%;
        color: royalblue;
        font-size: 90px;
      }
    }
  }
}
.pop-wrap {
  position: relative;
  width:750px;
  height:350px;
   text-align: center;
  background-color: #fff; 
  .pop-info {
    position: absolute;
    margin:-85px 0 0 -85px;
    left:50%;
    top:50%;
    width: 150px;
    height: 150px;
     border-radius: 150px;
    border:10px solid royalblue;
    border-top:10px solid #fff;
    border-bottom:10px solid #fff;
    color:royalblue;
    animation: video 1000ms ease-out infinite alternate; 
    i::before{
      animation: video 800ms ease-out infinite alternate; 
      border-radius:50%;
      border:10px solid royalblue;
      border-top:10px solid #fff;
      border-bottom:10px solid #fff;
      font-size: 100px;
    }
  }
}
// 路由选中时的样式
.active {
  color:royalblue;
}
@keyframes video {
    0% {
      border-color: #fff;
      //   border-color: royalblue;
      //  border-top-color: #fff;
      //  border-bottom-color: #fff;
    }
    100% {
      //  border-color: rgb(102, 237, 255);
      //  border-top-color: #fff;
      //  border-bottom-color: #fff;
    }
}
</style>

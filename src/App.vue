<template>
  <div id="app">
    <!-- 顶部header区域 -->

    <!-- 中部的路由router-view区域 -->
    <router-view></router-view>

    <!-- 底部的Tabbar区域 -->
    <FooterBar v-if="$route.meta.showFooter"></FooterBar>
  </div>
</template>

<script>

import FooterBar from "./components/FooterBar";
export default {
  data() {
    return {

    };
  },
  components: {
    FooterBar,
  },
  methods: {},
 
};

</script>

<style lang="postcss">
@import "//at.alicdn.com/t/font_1079451_w0e6t0fglar.css";
@import "./assets/css/reset.css";

.h-back-icon {
 position: absolute;
 left:5%;
 &::before {
   font-size: 50px;
 }
}

/* mint自定义样式 */
.mint-msgbox-message {
  height: 100px ;
  line-height: 100px;
  color:#333;
  font-size: 40px;
}
.mint-msgbox-btns {
  height:80px ;
}
.mint-msgbox-btn{
     font-size: 30px;
  }
.mint-toast-icon {
  font-size: 60px;
}
.mint-switch-core {
    width:120px;
    height:60px;
    border-radius: 90px;
    &::before{
     
    width:120px;
    height:60px;
    }
    &::after{
    transform:translate(-40px,0);
    width:60px;
    height:60px;
    left:40px;
    border-radius: 60px;
    }
    }
</style>

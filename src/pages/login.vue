<template>
  <div class="login-div" :style="contentStyleObj">
    <!-- 头部区域 -->
    <transition name="fade" mode="out-in">
      <div class="login-title" v-if="flag" key="1">
        <i class="iconfont icon-fanhui" @click="$router.push({ path: '/me' })"></i>
        <p>欢迎你来到</p>
        <p class="title-info">能睡</p>
      </div>
      <div class="login-title register" v-else key="2">
        <i class="iconfont icon-fanhui" @click="$router.push({ path: '/me' })"></i>
        <p>欢迎你加入</p>
        <p class="title-info">能睡</p>
      </div>
    </transition>

    <!-- 登录/注册选项卡 -->
    <div class="login-select">
      <ul class="l-select-list">
        <li :class="{on:flag}" class="lSelectItem" @click="flag=true">登录</li>
        <li :class="{on:!flag}" class="lSelectItem" @click="flag=false">注册</li>
      </ul>
    </div>

    <!-- 登录/注册界面 -->
    <transition name="fade" mode="out-in">
      <div class="login-wrap" v-if="flag" key="1">
        <input class="login-info" v-model="userId" type="text" placeholder="请输入手机号">
        <input class="login-info" v-model="userPwd" type="password" placeholder="请输入密码">
        <input type="button" class="login-button" @click="login()" value="登录">
      </div>
      <div class="register-wrap" v-else key="2">
        <input class="register-info" v-model="registerId" type="text" placeholder="请输入手机号">
        <!-- <input type="button" class="check-button" value="发送验证码"> -->
        <input class="register-info" v-model="registerPwd" type="password" placeholder="请输入密码">
        <input type="button" class="register-button" @click="register()" value="注册">
      </div>
    </transition>
  </div>
</template>

<script>
import axios from 'axios'
import { Toast } from "mint-ui";
export default {
  data() {
    return {
      userId:'',
      userPwd:'',
      registerId:'',
      registerPwd:'',
      registerTip:false,
      contentStyleObj:{
　　　　　　height:''
　　　　},
      flag: true
    };
  },
   methods:{
    login(){
      if(this.userId==""){
        Toast({
              message: "手机号不可为空！",
              iconClass: "iconfont icon-jinggao",
              duration:1000
            });
        return
      }else if(!(/^1[34578]\d{9}$/.test(this.userId))){
       Toast({
              message: "手机号格式错误！",
              iconClass: "iconfont icon-jinggao",
              duration:1000
            });
        return;
      };
      if(this.userPwd==""){
        Toast({
              message: "密码不可为空！",
              iconClass: "iconfont icon-jinggao",
              duration:1000
            });
        return
      }
      axios.post("/users/login",{
        userId:this.userId,
        userPwd:this.userPwd
      }).then((response)=>{
         let res=response.data;
         if(res.status=="0"){
           this.$router.push({ path: '/home' }) 
         }else{
           Toast({
              message: "手机号或密码输入错误！",
              iconClass: "iconfont icon-jinggao",
              duration:1000
            });
         }
      })
     },
    register(){
      if (this.registerId==""||this.registerPwd=="") {
          this.tipInfo="请输入完整的注册信息！"
          this.registerTip=true
        return
      }
       if (!(/^1[34578]\d{9}$/.test(this.registerId))) {
           this.tipInfo="请输入正确的手机号！"
           this.registerTip=true;
       }else{
         axios.post("/users/register",{
            registerId:this.registerId,
            registerPwd:this.registerPwd,
         }).then((response)=>{
           let res=response.data;
           if(res.status=="0"){
           this.registerTip=false;
           this.$router.push({ path: '/home' }) 
         }else if(res.status=="2"){
           this.tipInfo="该手机号已经被注册！";
           this.registerTip=true; 
         }
         })
       }
     },
    getHeight(){
      this.contentStyleObj.height=document.documentElement.clientHeight+'px';
    }
  },
   created(){
    window.addEventListener('resize', this.getHeight);
    this.getHeight()
  },

  destroyed(){
    window.removeEventListener('resize', this.getHeight)
  }

};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.login-div {
background-color: #fff;
height:100%;

  // 登录部分头部
  .login-title {
    box-sizing: border-box;
    background-color: royalblue;
    width: 100%;
    height: 400px;
    padding: 15% 0;
    i {
      position: absolute;
      top: 20px;
      left: 20px;
      font-size: 40px;
      font-weight: 700;
      color: #fff;
    }
    p {
      color: #fff;
      text-align: center;
      font-size: 60px;
    }
    .title-info {
      font-size: 80px;
      font-weight: 700;
    }
  }
  // 注册部分头部
  .register {
    background-color: #fff;
    i {
      color: royalblue;
    }
    p {
      color: royalblue;
    }
  }
  //登录/注册选项卡
  .login-select {
    z-index: 999;
    width: 500px;
    height: 110px;
    margin: 0 auto;
    .l-select-list {
      display: flex;
      justify-content: space-around;
      font-size: 45px;
      line-height: 110px;
      .lSelectItem {
        width: 150px;
        text-align: center;
      }
      .on {
        border-bottom: 10px solid royalblue;
        color: royalblue;
        font-weight: 700;
      }
    }
  }
}
// 登录信息区域
.login-wrap {
  display: flex;
  flex-direction: column;
  align-content: space-between;
  .login-info {
    font-size: 30px;
    box-sizing: border-box;
    padding-left: 40px;
    margin: 40px auto 10px;
    border: 3px solid rgb(99, 137, 250);
    border-radius: 50px;
    display: block;
    width: 500px;
    height: 100px;
  }
  .login-button {
    font-size: 40px;
    color: #fff;
    margin: 40px auto 10px;
    border-radius: 50px;
    width: 350px;
    height: 100px;
    background-color: royalblue;
  }
}
// 注册信息区域
.register-wrap {
  position: relative;
  display: flex;
  flex-direction: column;
  align-content: space-between;
  .register-info {
    font-size: 30px;
    box-sizing: border-box;
    padding-left: 40px;
    margin: 40px auto 10px;
    border: 3px solid rgb(99, 137, 250);
    border-radius: 50px;
    display: block;
    width: 500px;
    height: 100px;
  }
  .register-button {
    font-size: 40px;
    color: royalblue;
    margin: 40px auto 10px;
    border-radius: 50px;
    width: 350px;
    height: 100px;
    background-color: #fff;
    border: 3px solid rgb(99, 137, 250);
  }
  // .check-button {
  //   box-sizing: border-box;
  //   border: 3px solid rgb(99, 137, 250);
  //   color: #fff;
  //   font-size: 18px;
  //   // border-left: 0;
  //   position: absolute;
  //   right: 125px;
  //   top: 40px;
  //   border-radius: 0 50px 50px 0;
  //   width: 150px;
  //   height: 100px;
  //   background-color: royalblue;
  // }
}
// 登录注册错误提示
.errorTip {
    margin: 40px 0 0 0;
    height: 30px;
    line-height: 30px;
    font-size: 30px;
    text-align: center;
    color:red;
  }
// 登录页动画样式
.fade-enter-active,
.fade-leave-active {
  transition: all 0.2s ease;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>

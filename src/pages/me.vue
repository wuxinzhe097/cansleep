<template>
  <div class="me">
    <HeaderBar title="我的"></HeaderBar>
    <!-- 个人页头部区域 -->
    <div class="person-title" v-if="login">
      <img class="headimg" :src="'/static/img/'+userImg" alt="头像">
      <div class="title-right">
        <p class="person-name">{{userName}}</p>
        <p class="person-sign">{{userSign}}</p>
        <hr>
      </div>
    </div>
    <div class="person-title" v-else @click="toLogin()">
      <div class="login-wrap">
        <p class="login-title">你还没有登录哦~</p>
        <div class="to-login">
          <span class="login-button">登录</span>
          <span class="space-wrap">|</span>
          <span class="login-button">注册</span>
        </div>
      </div>
    </div>
    <!-- 个人页导航区域 -->
    <ul class="person-list" v-if="login">
      <router-link :to="{name:'personInfo'}" tag="li" class="person-item">
        <div class="p-item-left">
          <i class="iconfont icon-unie601"></i>
          <span>个人信息中心</span>
        </div>
        <i class="iconfont icon-you"></i>
      </router-link>
      <li class="person-item">
        <div class="p-item-left">
          <i class="iconfont icon-jilu"></i>
          <span>我的睡眠记录</span>
        </div>
        <i class="iconfont icon-you"></i>
      </li>
      <router-link :to="{name:'orderList'}" tag="li" class="person-item">
        <div class="p-item-left">
          <i class="iconfont icon-shangpin"></i>
          <span>我的睡品订单</span>
        </div>
        <i class="iconfont icon-you"></i>
      </router-link>
      <router-link :to="{name:'myTalk'}" tag="li" class="person-item">
        <div class="p-item-left">
          <i class="iconfont icon-luntan"></i>
          <span>我发布的梦话</span>
        </div>
        <i class="iconfont icon-you"></i>
      </router-link>
      <router-link :to="{name:'personSet'}" tag="li" class="person-item">
        <div class="p-item-left">
          <i class="iconfont icon-shezhi"></i>
          <span>设置</span>
        </div>
        <i class="iconfont icon-you"></i>
      </router-link>
    </ul>
  </div>
</template>

<script>
import HeaderBar from "../components/HeaderBar";
import axios from "axios";
export default {
  data() {
    return {
      userImg: "",
      userName: "",
      userSign: "",
      login:true
    };
  },
  components: {
    HeaderBar
  },
  methods: {
    toLogin() {
      this.$router.push({ path: "/login" });
    },
    init() {
      if(this.$cookieStore.getCookie("userId")){
         axios.get("/users/userInfo").then(response => {
        let status = response.data.status;
        if (status == "0") {
          let res = response.data.result;
          this.userImg = res.userImg;
          this.userName = res.userName;
          this.userSign = res.userSign;
        } else {
          console.log("erro!")
        }
      });
      }else{
        this.login=false;
      }
     
    }
  },
  mounted() {
    this.init();
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.me {
  width: 100%;
  // 个人页头部区域
  .person-title {
    box-sizing: border-box;
    padding: 5% 10%;
    display: flex;
    width: 100%;
    height: 300px;
    background-color: royalblue;
    .headimg {
      border-radius: 50%;
      border: 5px solid #fff;
      width: 170px;
      height: 170px;
    }
    .title-right {
      color: #fff;
      padding-left: 10%;
      flex: 1;
       font-size: 30px;
      .person-name {
        margin-bottom: 35px;
        font-weight: 600;
        font-size: 35px;
      }
    }
  }
  // 个人页导航区域
  .person-list {
    width: 100%;
    font-size: 35px;
    .person-item {
      background-color: #fff;
      display: flex;
      justify-content: space-between;
      padding: 0 5%;
      height: 100px;
      line-height: 100px;
      border-bottom: 2px solid #ddd;
      i {
        font-size: 35px;
      }
    }
  }
  // 未登录时显示的数据
  .login-wrap {
    width: 100%;
    .login-title {
      width: 100%;
      height: 50px;
      text-align: center;
      font-size: 40px;
      color: #fff;
    }
    .to-login {
      margin: 40px 0;
      width: 100%;
      display: flex;
      justify-content: center;
      font-size: 40px;
      color: #fff;
      .login-button {
        height: 50px;
        line-height: 50px;
        display: inline-block;
        padding: 10px;
        border: 4px solid #fff;
        border-radius: 20px;
      }
      .space-wrap {
        display: inline-block;
        height: 50px;
        line-height: 50px;
        padding: 10px;
      }
    }
  }
}
</style>

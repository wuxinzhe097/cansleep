<template>
  <div>
     <HeaderBar title="设置">
         <i slot="back" class="h-back-icon iconfont icon-fanhui" @click="$router.back()"></i>
     </HeaderBar>
      <ul class="personSet-list">
        <router-link :to="{name:'editUserPassword'}" class="personSet-item">
          <span>账号安全</span>
          <i class="iconfont icon-you"></i>
        </router-link>
        <li class="personSet-item" @click="help()">
          <span>帮助与反馈</span>
          <i class="iconfont icon-you"></i>
        </li>
        <li class="personSet-item" @click="about()">
          <span>关于</span>
          <i class="iconfont icon-you"></i>
        </li>
      </ul>
      <input type="button" class='login-out' @click="logout()" value="退出登录">
  </div>
</template>

<script>
import HeaderBar from "../components/HeaderBar";
import { Toast } from "mint-ui";
import axios from 'axios'
export default {
  data() {
    return {

    };
  },
  components: {
    HeaderBar
  },
  methods: {
    logout(){
      axios.post("/users/logout").then((response)=>{
          let res=response.data;
          if(res.status=="0"){
            this.$router.push({ path: '/' }) 
          }
      })
    },
    help(){
       Toast({
              message: "暂无此功能",
              iconClass: "iconfont icon-jinggao",
              duration:2000
            });
    },
    about(){
      Toast({
              message: "能睡测试版",
              iconClass: "iconfont icon-banben",
              duration:2000
            });
    },
    }
 
 
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.personSet-list {
  .personSet-item{
    color:#666;
    display: flex;
    justify-content: space-between;
    padding:0 5%;
    background-color: #fff;
    margin:30px 0;
    height: 80px;
    line-height: 80px;
    font-size: 30px;
  }
}
.login-out {
  margin: 40px 0;
  width:100%;
  height: 80px;
  color:white;
  font-size: 30px;
  background-color: red;
}
</style>

<template>
  <div>
     <HeaderBar title="修改密码">
           <i slot="back" class="h-back-icon iconfont icon-fanhui" @click="$router.back()"></i>
            <span slot="headerRight" class="save-button" @click="saveInfo()">保存</span>
     </HeaderBar>
     <input type="password" class="userName-input" placeholder="请输入你的旧密码" maxlength="15" v-model="oldPW">
     <input type="password" class="userName-input" placeholder="请输入你的新密码" maxlength="15" v-model="newPW">
     <p class="tips">*密码长度需为6~15位</p>
  </div>
</template>

<script>
import HeaderBar from "../components/HeaderBar";
import axios from "axios";
import { Toast } from "mint-ui";
export default {
  data() {
    return {
      oldPW:"",
      newPW:""
    };
  },
  components: {
    HeaderBar
  },
  methods: {
      init(){
          this.userName=this.$route.query.userName
      },
      saveInfo(){
          if(this.oldPW==""|| this.newPW==""){
               Toast({
              message: "密码不可为空！",
              iconClass: "iconfont icon-jinggao",
              duration:1000
            });
            return;
          }
          if(this.oldPW.length<=5|| this.newPW.length<=5){
               Toast({
              message: "密码不得低于6位！",
              iconClass: "iconfont icon-jinggao",
              duration:1000
            });
            return;
          }
          if(this.oldPW==this.newPW){
               Toast({
              message: "两次密码不可相同！",
              iconClass: "iconfont icon-jinggao",
              duration:1000
            });
            return;
          }
          axios.post("/users/userPWEdit",{
              oldPW:this.oldPW,
              newPW:this.newPW
          }).then(response=>{
              let res=response.data;
              if(res.status=="0"){
                 Toast({
                message: "修改成功",
                iconClass: "iconfont icon-duigou",
                duration: 1000
              });
              this.$router.back()
             
              }else if(res.status=="2"){
                 Toast({
              message: "旧密码输入错误！",
              iconClass: "iconfont icon-jinggao",
              duration:1000
            });
              }
              
          })
      }
  },
  mounted(){
      this.init();
  }
 
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.userName-input {
    margin-bottom: 20px;
    box-sizing: border-box;
    color: #666;
    font-size: 36px;
    width: 100%;
    height: 80px;
    padding: 20px;
}
.save-button{
    position: absolute;
    top:50%;
    right:5%;
    margin-top: -30px;
    line-height: 60px;
    width: 100px;
    height: 60px;
    font-size: 35px;
    border-radius: 10px;
    text-align: center;
    color:royalblue;
    background-color:#fff;
}
.tips {
  text-align: center;
  padding: 10px 0;
  font-size: 26px;
  color:#999;
}
</style>



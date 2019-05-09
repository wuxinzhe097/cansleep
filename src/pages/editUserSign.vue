<template>
  <div>
     <HeaderBar title="修改个性签名">
           <i slot="back" class="h-back-icon iconfont icon-fanhui" @click="$router.back()"></i>
            <span slot="headerRight" class="save-button" @click="saveInfo()">保存</span>
     </HeaderBar>
      <textarea class="sign-info" style="resize:none" placeholder="请填写你的个性签名" maxlength="30" v-model="userSign"></textarea> 
  </div>
</template>

<script>
import HeaderBar from "../components/HeaderBar";
import axios from "axios";
import { Toast } from "mint-ui";
export default {
  data() {
    return {
      userSign:""
    };
  },
  components: {
    HeaderBar
  },
  methods: {
      init(){
          this.userSign=this.$route.query.userSign
      },
      saveInfo(){
          axios.post("/users/userSignEdit",{
              userSign:this.userSign
          }).then(response=>{
              let res=response.data;
              if(res.status=="0"){
                 Toast({
                message: "修改成功",
                iconClass: "iconfont icon-duigou",
                duration: 1000
              });
              this.$router.back()
              }else{
                  console.log("erro")
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
.sign-info{
    box-sizing: border-box;
    padding:40px 25px;
    font-size: 38px;
    border:0;
    width:100%;
    height: 160px;
}
.save-button{
    border-radius: 10px;
    margin:80px auto;
    width: 300px;
    height: 80px;
    text-align: center;
    line-height: 80px;
    font-size: 40px;
    color:#fff;
    background-color: royalblue;
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
</style>



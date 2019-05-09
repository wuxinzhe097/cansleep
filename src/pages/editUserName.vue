<template>
  <div>
     <HeaderBar title="修改用户名">
           <i slot="back" class="h-back-icon iconfont icon-fanhui" @click="$router.back()"></i>
            <span slot="headerRight" class="save-button" @click="saveInfo()">保存</span>
     </HeaderBar>
     <input type="text" class="userName-input" placeholder="请输入你的昵称" maxlength="15" v-model="userName">
     
  </div>
</template>

<script>
import HeaderBar from "../components/HeaderBar";
import axios from "axios";
import { Toast } from "mint-ui";
export default {
  data() {
    return {
      userName:""
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
          if(this.userName==""){
               Toast({
              message: "昵称不可为空！",
              iconClass: "iconfont icon-jinggao",
              duration:1000
            });
            return;
          }
          axios.post("/users/userNameEdit",{
              userName:this.userName
          }).then(response=>{
               Toast({
                message: "修改成功",
                iconClass: "iconfont icon-duigou",
                duration: 1000
              });
              this.$router.back()
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
</style>



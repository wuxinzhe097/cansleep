<template>
  <div>
    <HeaderBar title="添加收货地址">
      <i slot="back" class="h-back-icon iconfont icon-fanhui" @click="$router.push({ path: '/addressList' })"></i>
    </HeaderBar>
    <div class="address-info">
      <input type="text" class="user-name" placeholder="收件人" v-model="userName">
      <input type="text" class="user-name" placeholder="手机号码" v-model="tel">
      <textarea name id style="resize:none" placeholder="详细地址：如道路、门牌号、小区等 " v-model="addressInfo"></textarea>
    </div>
    <div class="default-choose">
      <span>设为默认地址</span>
      <mt-switch  v-model="defaultCheck"></mt-switch>
    </div>
    <div class="save-address" @click="add()">保存</div>
  </div>
</template>

<script>
import Vue from "vue";
import HeaderBar from "../components/HeaderBar";
import { Switch } from "mint-ui";
import { Toast } from "mint-ui";
import axios from 'axios'
export default {
  data() {
    return {
      userName:"",
      tel:"",
      addressInfo:"",
      defaultCheck: false
    };
  },
  components: {
    HeaderBar
  },
  methods: {
    add(){
       if (this.userName==""|| this.addressInfo=="" ||this.tel=="") {
          Toast({
              message: "请输入完整信息",
              iconClass: "iconfont icon-jinggao",
              duration:800
            });
            return;
       }
       // 验证手机号
        if (!(/^1[34578]\d{9}$/.test(this.tel))) {
          Toast({
              message: "请输入正确的手机号",
              iconClass: "iconfont icon-jinggao",
              duration:800
            });
            return;
       }
      
      axios.post("/users/addressAdd",{
            userName:this.userName,
            addressInfo:this.addressInfo,
            tel:this.tel,
            defaultCheck:this.defaultCheck
      }).then(response=>{
        let res=response.data;
         Toast({
              message: "保存成功",
              iconClass: "iconfont icon-duigou",
              duration:800
            });
            setTimeout(()=>{
              this.$router.push({ path: '/addressList' })
            },1000)
      })
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.address-info {
  input {
    box-sizing: border-box;
    font-size: 30px;
    width: 100%;
    height: 100px;
    padding-left: 30px;
    border-bottom: 2px solid #ccc;
  }
  textarea {
    font-family: "Microsoft YaHei";
    box-sizing: border-box;
    padding-top: 30px;
    padding-left: 30px;
    font-size: 30px;
    border: 0;
    border-bottom: 2px solid #ccc;
    width: 100%;
    height: 400px;
  }
}
.default-choose{
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #fff;
    padding:0 30px;
    width:100%;
    height: 100px;
    font-size: 28px;
}
.save-address {
  margin: 40px 0;
  font-size: 30px;
  color:#fff;
  text-align: center;
  background-color:royalblue;
   width:100%;
   height: 100px;
   line-height:100px;
}
</style>


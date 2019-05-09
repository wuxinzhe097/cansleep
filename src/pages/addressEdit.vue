<template>
  <div>
    <HeaderBar title="编辑收货地址">
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
    <div class="delete-address" @click="delet()">删除收货地址</div>
    <div class="save-address" @click="edit()">保存</div>
  </div>
</template>

<script>
import Vue from "vue";
import HeaderBar from "../components/HeaderBar";
import { Switch } from "mint-ui";
import { MessageBox } from "mint-ui";
import { Toast } from "mint-ui";
import axios from 'axios'

export default {
  data() {
    return {
      addressId:"",
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
    init(){
      this.addressId=this.$route.query.addressId
      axios.post("/users/addressFind",{
        addressId:this.addressId
      }).then(response=>{
        let res=response.data.result;
        this.userName=res.userName;
        this.tel=res.tel;
        this.addressInfo=res.addressInfo;
        this.defaultCheck=res.isDefault;
      })
    },
    delet(){
       MessageBox.confirm("", {
        message: "确认删除该地址吗？",
        confirmButtonText: "确定",
        cancelButtonText: "暂不",
        cancelButtonClass:"Messagecancel",
        confirmButtonClass:"Messageconfirm"
      }).then(action => {
         axios.post("/users/addressDel", {
               addressId:this.addressId
            })
            .then(response => {
              let res = response.data;
              if (res.status == "0") {
                 Toast({
              message: "删除成功",
              iconClass: "iconfont icon-duigou",
              duration:800
            });
            setTimeout(()=>{
              this.$router.push({ path: '/addressList' })
            },1000)
              }
            });
        })
        .catch(() => {});
    },
    edit(){
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
      axios.post("/users/addressEdit",{
        addressId:this.addressId,
        userName:this.userName,
        tel:this.tel,
        addressInfo:this.addressInfo,
        defaultCheck:this.defaultCheck,
      }).then(response=>{
        let res=response.data;
         Toast({
              message: "修改成功",
              iconClass: "iconfont icon-duigou",
              duration:800
            });
            setTimeout(()=>{
              this.$router.push({ path: '/addressList' })
            },1000)
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
.delete-address {
  margin: 40px 0;
  font-size: 30px;
  color:red;
  text-align: center;
  background-color: #fff;
   width:100%;
   height: 100px;
   line-height:100px;
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


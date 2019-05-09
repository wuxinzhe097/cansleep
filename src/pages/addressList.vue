<template>
  <div>
    <HeaderBar title="选择收货地址">
      <i slot="back" class="h-back-icon iconfont icon-fanhui" @click="$router.push({ path: '/cart' })"></i>
    </HeaderBar>
    <!-- <ul class="address-list">
      <router-link :to="{name:'checkOut'}" tag="li" class="address-item">
        <i class="iconfont icon-dizhi"></i>
        <div class="address-info">
          <div class="person-info">
            <span>吴鑫喆</span>
            <span class="person-tel">18061434267</span>
          </div>
          <p class="address-message">江苏省南京市玄武区江苏省南京市玄武区</p>
        </div>
        <router-link :to="{name:'addressEdit'}" tag="div" class="address-edit">编辑</router-link>
      </router-link>
    </ul> -->
    <ul class="address-list">
      <router-link :to="{name:'checkOut',query:{'addressId':item.addressId}}" tag="li" class="address-item" v-for="(item,index) in  addressList" :key="index">
        <i class="iconfont icon-dizhi"></i>
        <div class="address-info">
          <div class="person-info">
            <span>{{item.userName}}</span>
            <span class="person-tel">{{item.tel}}</span>
          </div>
          <p class="address-message">{{item.addressInfo}}</p>
        </div>
        <router-link :to="{name:'addressEdit',query:{'addressId':item.addressId}}" tag="div" class="address-edit">编辑</router-link>
      </router-link>
    </ul>
    <router-link :to="{name:'addressAdd'}" tag="div" class="add-address" v-if="addressList.length<5">
      <i class=" iconfont icon-wuuiconxiangjifangda"></i>
    </router-link>
  </div>
</template>

<script>
import HeaderBar from "../components/HeaderBar";
import axios from "axios";
export default {
  data() {
    return {
      addressList:[]
    };
  },
  components: {
    HeaderBar
  },
  methods: {
    init(){
       axios.get("/users/addressList").then(response=>{
         let res=response.data;
          this.addressList=res.result;
       })
    }
  },
 mounted(){
   this.init()
 }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.address-list {
  .address-item {
    background-color: #fff;
    border: 3px solid #ccc;
    border-radius: 50px;
    height: 200px;
    margin: 20px 20px;
    display: flex;
    align-items: center;
    text-align: center;
    i {
      flex: 1;
      &::before {
        font-size: 50px;
      }
    }
    .address-info {
      flex: 3;
      text-align: left;
      color: #333;
      font-size: 28px;
      .person-info {
        .person-tel {
          margin-left: 5px;
          font-size: 20px;
          color: #999;
        }
      }
    }
    .address-edit {
      flex: 1;
      height:50px;
      line-height: 50px;
      font-size: 20px;
      color: #999;
    }
  }
}
.add-address{
   background-color: #eee;
    border: 3px solid #ccc;
    border-radius: 50px;
    height: 200px;
    margin: 20px 20px;
    display: flex;
    align-items: center;
    i {
      margin: 0 auto;
      &::before{
        font-size: 100px;
        color:#999;
      }
    }
}
</style>


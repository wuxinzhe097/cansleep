<template>
  <div>
     <HeaderBar title="个人信息中心">
         <i slot="back" class="h-back-icon iconfont icon-fanhui" @click="$router.back()"></i>
     </HeaderBar>
      <ul class="personInfo-list">
          <li class="personInfo-item" @click="popupVisible=!popupVisible">
             <div class="info-title">头像</div>
             <div class="info-message">
                 <img :src="'../../static/img/'+userImg" alt="">
                 <i class="iconfont icon-you"></i>
            </div>
          </li>
          <router-link :to="{name:'editUserName',query:{'userName':userName}}" tag="li" class="personInfo-item">
             <div class="info-title">昵称</div>
             <div class="info-message">
                 <span>{{userName}}</span> 
                 <i class="iconfont icon-you"></i>
            </div>
          </router-link>
          <router-link :to="{name:'editUserSign',query:{'userSign':userSign}}" class="personInfo-item">
             <div class="info-title">个性签名</div>
             <div class="info-message">
                 <span>{{userSign}}</span> 
                 <i class="iconfont icon-you"></i>
            </div>
          </router-link>
      </ul>
      <mt-popup v-model="popupVisible" position="bottom">
        <ul class="headpop-wrap">
           <li class="headpop-item" :class="item.src==userImg?'choose-item':''" v-for="(item,index) in imgList" :key="index" @click="chooseImg(item.src)">
             <img :src="'../../static/img/'+item.src" alt="">
           </li>
        </ul>
      </mt-popup>
  </div>
</template>

<script>
import HeaderBar from "../components/HeaderBar";
import Vue from 'vue'
import {Popup,Toast} from 'mint-ui';
import axios from 'axios'
export default {
  data() {
    return {
      popupVisible:false,
      userName:"",
      userSign:"",
      userImg:"",
      imgList:[{
        src:"head.jpg"      
        },{
        src:"head2.jpg"
      },{
        src:"head3.jpg"
      },{
        src:"head4.jpg"
      },{
        src:"head5.jpg"
      },{
        src:"head6.jpg"
      }
      ]
    };
  },
  components: {
    HeaderBar
  },
  methods: {
   init() {
      axios.get("/users/userInfo").then(response => {
        let res = response.data;
        if (res.status == "0") {
          let res = response.data.result;
          this.userImg = res.userImg;
          this.userName = res.userName;
          this.userSign = res.userSign;
        } else {
          console.log("Erro!")
        }
      });
    },
    chooseImg(imgSrc){
       axios.post("/users/userHeadImgEdit",{
           userImg:imgSrc
       }).then(response => {
        let res = response.data;
        if(res.status=="0"){
            Toast({
                message: "修改成功",
                iconClass: "iconfont icon-duigou",
                duration: 1000
              });
              this.popupVisible=false;
              this.init();
        }
      });
    }
    },
    mounted(){
        this.init()
    }
 
 
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.personInfo-list {
    .personInfo-item {
        box-sizing: border-box;
        background-color: #fff;
        padding:15px 35px;
        min-height: 120px;
        font-size: 32px;
        border-bottom: 2px solid #ddd;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .info-title{
            min-width: 150px;
            color:#333;
        }
        .info-message {
            display: flex;
            align-items: center;
            color:#999;
            i {
                &::before{
                    font-size: 38px;
                }
            }
            img{
                border-radius: 20px;
                height: 150px;
                width: 150px;
            }
        }
    }
}
.headpop-wrap {
  padding-top: 30px;
  width:750px;
  background-color: #fff;
  display:flex;
  flex-wrap: wrap;
   .headpop-item{
     padding:0 0 30px 30px;
     width: 150px;
     height: 150px;
     img{
       border-radius: 20px;
     }
   }
   .choose-item{
       &::before {
       content: "已选择";
       border-radius: 10px;
       text-align: center;
       position: absolute;
       font-size: 15px;
       width: 90px;
       height: 40px;
       background-color: royalblue;
       color:#fff;
     }
   }
}
</style>

<template>
  <div>
    <HeaderBar title="商城"></HeaderBar>
    <swiper :options="swiperOption" ref="mySwiper" v-if="goodsList.length>0">
      <!-- slides -->
      <swiper-slide v-for="(item,index) in goodsList.slice(0, 4)" :key="index" >
        <img class="swiperimg" v-lazy="'/static/img/'+item.productImage" alt="swiper">
      </swiper-slide>
      <!-- Optional controls -->
      <div class="swiper-pagination" slot="pagination"></div>
    </swiper>
    <div class="good-list-wrap">
      <p class="good-list-title">能睡商城</p>
      <ul class="good-list">
        <router-link :to="{name:'goodDetail',query:{'productId':item.productId}}" tag="li"  class="good-item" v-for="(item,index) in goodsList" :key="index">
          <img class="good-img" :src="'/static/img/'+item.productImage" alt="商品图片">
          <p class="good-name">{{item.productName}}</p>
          <p class="good-description">{{item.productDescription}}</p>
          <p class="good-price">￥{{item.salePrice}}</p>
        </router-link>
      </ul>
    </div>
    <div class="cart-num" v-if="cartCount>0">{{cartCount}}</div>
    <router-link :to="{name:'cart'}" tag="div"  class="cart-btn iconfont icon-gouwucheman"></router-link>
  </div>
</template>

<script>
import HeaderBar from "../components/HeaderBar";
import axios from "axios";
import "swiper/dist/css/swiper.css";
import { swiper, swiperSlide } from "vue-awesome-swiper";
import { Lazyload } from "mint-ui";

export default {
  data() {
    return {
      swiperOption: {
        autoplay: {
          delay: 2000,
          disableOnInteraction: false
        },
        autoplayDisableOnInteraction: false,
        // loop: true,
        pagination: {
          el: ".swiper-pagination"
        },
        effect: "coverflow",
        slidesPerView: 1.4,
        centeredSlides: true,
        coverflowEffect: {
          rotate: 0,
          stretch: 10,
          depth: 160,
          modifier: 2,
          slideShadows: true
        }
      },
      goodsList: []
    };
  },
  components: {
    HeaderBar,
    swiper,
    swiperSlide
  },
  methods: {
    getGoodList() {
      axios.get("/goods").then(result => {
        let res = result.data.result.list;
        this.goodsList = res;
      });
    },
    getCartCount(){
      axios.get("/users/cartCount").then(response=>{
         let res=response.data;
         this.$store.commit("initCartCount",res.result)
      })
    }
      
  },
  computed:{
    cartCount(){
      return this.$store.state.cartCount;
    }
  },
  mounted: function() {
    this. getCartCount()
    this.getGoodList();
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
image[lazy="loading"] {
  width: 300px;
  height: 300px;
  margin: auto;
}
.swiper-container {
  z-index: 0;
  .swiper-slide {
    img{
         width:540px;
          height: 350px;
    }
  
  }
 
}
.good-list-wrap {
  margin-top: 30px;
  background-color: #fff;
  padding: 30px 30px;
  .good-list-title {
    position: relative;
    color: #333;
    font-size: 40px;
    &::before {
      content: "";
      position: absolute;
      top: 50%;
      left: -30px;
      margin-top: -10px;
      width: 25px;
      height: 20px;
      background-color: royalblue;
    }
  }
  .good-list {
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
    .good-item {
      margin: 15px 0;
      .good-img {
        width: 300px;
        height: 300px;
      }
      .good-name {
        color: #333;
        font-size: 28px;
      }
      .good-description {
        color: #666;
        font-size: 24px;
      }
      .good-price {
        font-size: 30px;
        font-weight: bold;
        color: red;
      }
    }
  }
}
.cart-btn {
  text-align: center;
  line-height: 80px;
  position: fixed;
  border-radius: 50%;
  width: 80px;
  height: 80px;
  color: #fff;
  background-color: royalblue;
  bottom: 170px;
  right: 20px;
  box-shadow:0 0 15px #666;
  &::before {
    font-size: 45px;
  }
}
.cart-num {
   position: fixed;
   bottom: 220px;
  right: 15px;
  z-index: 10;
  background-color: red;
  width: 45px;
  height: 45px;
  border-radius: 22.5px;
  text-align: center;
  line-height: 45px;
  color:#fff;
}
</style>


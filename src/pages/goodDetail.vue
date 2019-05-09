<template>
  <div style="backgroundColor:#fff" :style="contentStyleObj">
    <HeaderBar title="商品详情">
      <i slot="back" class="h-back-icon iconfont icon-fanhui" @click="$router.back()"></i>
    </HeaderBar>
    <div class="detail-wrap">
      <div class="img-wrap">
        <img class="product-img" :src="'/static/img/'+productImage" alt="商品图片">
      </div>
      <div class="product-info">
        <p class="product-name">{{productName}}</p>
        <p class="product-description">{{productDescription}}</p>
      </div>
    </div>
     <div class="cart-num" v-if="cartCount>0">{{cartCount}}</div>
    <router-link :to="{name:'cart'}" tag="div"  class="cart-btn iconfont icon-gouwucheman"></router-link>
    <footer class="detail-footer">
      <div class="product-price">￥{{salePrice}}</div>
      <div class="add-cart" @click="addCart()">加入购物车</div>
    </footer>
  </div>
</template>

<script>
import HeaderBar from "../components/HeaderBar";
import { Toast } from "mint-ui";
import axios from "axios";
export default {
  data() {
    return {
      productId: "",
      productName: "",
      productDescription: "",
      salePrice: "",
      productImage: "",
      contentStyleObj:{
　　　　　　height:''
　　　　},
    };
  },
  components: {
    HeaderBar
  },
  methods: {
    init() {
      this.productId = this.$route.query.productId;
      axios
        .post("/goods/findGoods", {
          productId: this.productId
        })
        .then(response => {
          let res = response.data.result;

          this.productName = res.productName;
          this.productDescription = res.productDescription;
          this.salePrice = res.salePrice;
          this.productImage = res.productImage;
        });
    },
    addCart() {
      axios
        .post("/goods/addCart", {
          productId: this.productId
        })
        .then(res => {
          if (res.data.status == 0) {
            Toast({
              message: "加入成功",
              iconClass: "iconfont icon-duigou",
              duration:1000
            });
            this.$store.commit("updateCartCount",1)
          } else {
            alert("数据出错");
          }
        });
    },
     getHeight(){
      this.contentStyleObj.height=document.documentElement.clientHeight +'px';
    }
  },
  computed:{
      cartCount(){
      return this.$store.state.cartCount;
    }
  },
  mounted() {
    window.addEventListener('resize', this.getHeight);
    this.init();
    this.getHeight()
  },
    destroyed(){
    window.removeEventListener('resize', this.getHeight)
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.detail-wrap {
  .img-wrap {
    margin: 50px 0;
    img {
      width: 100%;
      height: 800px;
    }
  }
  .product-info {
    margin: 20px 30px;
    .product-name {
      text-align: center;
      font-size: 40px;
      color: #333;
    }
    .product-description {
      margin: 50px 0;
      text-align: center;
      font-size: 30px;
      color: #666;
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
.detail-footer {
  border-top:1px solid #ccc;
  background-color: #fff;
  box-sizing: border-box;
  width: 100%;
  position: fixed;
  left: 0;
  bottom: 0;
  padding: 0 0 0 50px;
  height: 140px;
  line-height: 140px;
  display: flex;
  justify-content: space-between;
  .product-price {
    text-align: center;
    color: red;
    font-size: 45px;
  }
  .add-cart {
    background-color: red;
    color: #fff;
    width: 240px;
    text-align: center;
    font-size: 35px;
  }
}

</style>


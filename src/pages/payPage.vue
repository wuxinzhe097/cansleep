<template>
  <div class="pay-div" :style="contentStyleObj">
    <HeaderBar title="订单支付"></HeaderBar>
    <div class="pay-title">
      <p class="total-price">此订单的金额为 <span style="color:red;">￥{{orderTotal}}</span></p>
      <p class="pay-title">您可以扫描下方支付码进行付款</p>
      <p class="pay-tip">（暂仅支持微信和支付宝）</p>
    </div>

    <div class="pay-wrap">
         <img src="/static/img/wxpay.png" alt="微信支付">
         <img src="/static/img/alipay.jpg" alt="支付宝支付">
    </div>
    <div class="back-shop" @click="backShop()">返回商城页</div>
  </div>
</template>

<script>
import HeaderBar from "../components/HeaderBar";
import axios from "axios";
export default {
  data() {
    return {
      orderTotal: "",
      contentStyleObj: {
        height: ""
      }
    };
  },
  components: {
    HeaderBar
  },
  methods: {
     init() {
      this.orderId = this.$route.query.orderId;
      axios
        .post("/users/orderFind", {
          orderId: this.orderId
        })
        .then(response => {
          let res = response.data.result;
          this. orderTotal = res.orderTotal;
        });
    },
    getHeight() {
      this.contentStyleObj.height =
        document.documentElement.clientHeight + "px";
    },
    backShop() {
      this.$router.push({ path: "/shop" });
    }
  },
  mounted() {
    this.init();
  },
  created() {
    window.addEventListener("resize", this.getHeight);
    this.getHeight();
  },
  destroyed() {
    window.removeEventListener("resize", this.getHeight);
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.pay-div {
  background-color: #fff;
  text-align: center;
  .pay-title {
    .total-price {
      line-height: 200px;
      height: 150px;
      font-size: 50px;
    }
    .pay-title{
      line-height: 100px;
      height: 100px;
      font-size: 40px;
    }
    .pay-tip{
      font-size: 30px;
      color:#999;
    }
  }
  .pay-wrap {
      display: flex;
      justify-content: space-around;
      img{
        border-radius: 50px;
        border:5px solid royalblue;
        margin: 40px 0;
        width:300px;
        height: 400px;
      }
  }
  .back-shop {
    margin: 40px auto;
    width: 200px;
    height: 60px;
    line-height: 60px;
    border: 2px solid royalblue;
    border-radius: 50px;
    font-size: 26px;
    color: royalblue;
  }
}
</style>



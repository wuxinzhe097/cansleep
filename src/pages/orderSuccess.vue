<template>
  <div class="success-div" :style="contentStyleObj">
    <HeaderBar title="下单成功"></HeaderBar>
    <div class="success-font">
      <i class="iconfont icon-chenggong"></i>
    </div>
    <div class="success-info">
      <p class="success-message">订单生成成功</p>
      <p class="order-id">订单号：{{orderId}}</p>
      <p class="tip-message">请前往我的睡品订单查看订单</p>
    </div>

    <div class="back-shop" @click="backShop()">返回商城页</div>
  </div>
</template>

<script>
import HeaderBar from "../components/HeaderBar";
export default {
  data() {
    return {
      orderId: "",
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
    },
    getHeight() {
      this.contentStyleObj.height =
        document.documentElement.clientHeight + "px";
    },
    backShop() {
        this.$router.push({ path: '/shop' })
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
.success-div {
  background-color: #fff;
   text-align: center;
  .success-font {
    width: 200px;
    margin: 0 auto;
    i {
      color: rgb(21, 202, 30);
      font-size: 200px;
    }
  }
  .success-info{
      p {
          margin:20px 0;
      }
     .success-message{
         font-size: 65px;
     }
     .order-id{
         font-size: 25px;
     }
     .tip-message {
         font-size: 28px;
         color:royalblue;
     } 
  }
  .back-shop{
      margin: 40px auto;
      width: 200px;
      height: 60px;
      line-height: 60px;
      border: 2px solid royalblue;
      border-radius: 50px;
      font-size: 26px;
      color:royalblue;
  }
}
</style>



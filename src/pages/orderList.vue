<template>
  <div>
    <HeaderBar title="我的睡品订单">
      <i slot="back" class="h-back-icon iconfont icon-fanhui" @click="$router.push({ path: '/me' })"></i>
    </HeaderBar>
    <ul class="order-list">
      <router-link
        :to="{name:'orderPage',query:{'orderId':item.orderId}}"
        tag="li"
        class="order-item"
        v-for="(item,index) in orderList2"
        :key="index"
      >
        <p class="order-status">{{item.orderStatus=="1"?"等待支付":"支付出错"}}</p>
        <div class="order-info">
          <p class="order-id">{{item.orderId}}</p>
          <p class="create-time">{{item.createDate}}</p>
        </div>
        <div class="order-btns">
          <div class="order-cancel" @click.stop="orderCancel(item.orderId)">取消订单</div>
          <div class="order-pay" @click.stop="$router.push({ path: '/payPage', query: {orderId:item.orderId}})">支付</div>
        </div>
      </router-link>
    </ul>
  </div>
</template>

<script>
import HeaderBar from "../components/HeaderBar";
import { Toast } from "mint-ui";
import { MessageBox } from "mint-ui";
import axios from "axios";
export default {
  data() {
    return {
      orderList: []
    };
  },
  components: {
    HeaderBar
  },
  computed:{
    orderList2(){
      return this.orderList.reverse();
    }
  },
  methods: {
    about() {
      Toast({
        message: "能睡测试版",
        iconClass: "iconfont icon-banben",
        duration: 2000
      });
    },
    init() {
      axios.get("/users/orderList").then(response => {
        let res = response.data.result;
        this.orderList = res;
      });
    },
    orderCancel(orderId) {
      MessageBox.confirm("", {
        message: "确认取消订单吗？",
        confirmButtonText: "确定",
        cancelButtonText: "暂不",
        cancelButtonClass: "Messagecancel",
        confirmButtonClass: "Messageconfirm"
      }).then(action => {
        axios
          .post("/users/orderDel", {
            orderId: orderId
          })
          .then(response => {
            let res = response.data;
            if (res.status == "0") {
              Toast({
                message: "取消成功",
                iconClass: "iconfont icon-duigou",
                duration: 1000
              });
                this.init();
            }
          });
      }).catch(() => {});;
    }
  },
  mounted() {
    this.init();
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.order-list {
  padding: 20px 30px;
  .order-item {
    margin: 20px 0;
    box-sizing: border-box;
    border-radius: 40px;
    box-shadow: 0 0 10px royalblue;
    border: 3px solid royalblue;
    background-color: #fff;
    height: 180px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    text-align: center;
    .order-status {
      color: orangered;
      font-size: 45px;
    }
    .order-info {
      text-align: left;
      p {
        font-size: 25px;
        color: #999;
      }
    }
    .order-btns {
      div {
        box-sizing: border-box;
        border-radius: 50px;
        border: 2px solid #666;
        font-size: 28px;
        width: 150px;
        height: 50px;
        line-height: 50px;
        margin-bottom: 10px;
      }
      .order-pay {
        border: 2px solid royalblue;
        color: royalblue;
      }
    }
  }
}
</style>

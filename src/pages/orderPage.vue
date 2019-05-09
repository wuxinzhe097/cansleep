<template>
  <div class="all-wrap">
    <HeaderBar title="订单详情">
      <i slot="back" class="h-back-icon iconfont icon-fanhui" @click="$router.push({ path: '/orderList' })"></i>
    </HeaderBar>
    <div class="order-title">
      <p>等待买家付款</p>
      <i class="iconfont icon-dengdaifukuan"></i>
    </div>
    <div class="address-wrap">
      <i class="iconfont icon-dizhi"></i>
      <div class="address-info">
        <div class="person-info">
          <span>{{userName}}</span>
          <span class="person-tel">{{tel}}</span>
        </div>
        <p class="address-message">{{addressInfo}}</p>
      </div>
    </div>
    <div class="goods-wrap">
      <ul class="goods-list">
        <li class="goods-item" v-for="(item,index) in goodsList" :key="index">
          <img :src="'/static/img/'+item.productImage" alt class="goods-img">
          <div class="goods-message">
            <p class="goods-name">{{item.productName}}</p>
            <div class="goods-info">
              <span class="goods-price">￥{{item.salePrice}}</span>
              <span class="goods-num">x{{item.productNum}}</span>
            </div>
          </div>
        </li>
      </ul>
    </div>
    <div class="order-message">
      <p class="message-title">订单详情</p>
      <div class="message-info">
        <p>
          <span class="l-info">订单总价：</span>
          <span class="r-info" style="color:red;">￥{{totalPrice}}</span>（含快递费）
        </p>
        <p>
          <span class="l-info">订单编号：</span>
          <span class="r-info">{{orderId}}</span>
        </p>
        <p>
          <span class="l-info">创建时间：</span>
          <span class="r-info">{{createDate}}</span>
        </p>
      </div>
    </div>
    <footer class="order-footer">
      <div class="order-cancel" @click="orderCancel()">取消订单</div>
      <div class="order-pay" @click="$router.push({ path: '/payPage', query: {orderId:orderId}})">付款</div>
    </footer>
  </div>
</template>

<script>
import HeaderBar from "../components/HeaderBar";
import axios from "axios";
import { Toast } from "mint-ui";
import { MessageBox } from "mint-ui";
export default {
  data() {
    return {
      orderId: "",
      userName: "",
      tel: "",
      addressInfo: "",
      totalPrice: "",
      goodsList: [],
      createDate: ""
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
          this.userName = res.address.userName;
          this.tel = res.address.tel;
          this.addressInfo = res.address.addressInfo;
          this.totalPrice = res.orderTotal;
          this.goodsList = res.goodsList;
          this.createDate = res.createDate;
        });
    },
    orderCancel() {
      MessageBox.confirm("", {
        message: "确认取消订单吗？",
        confirmButtonText: "确定",
        cancelButtonText: "暂不",
        cancelButtonClass: "Messagecancel",
        confirmButtonClass: "Messageconfirm"
      }).then(action => {
        axios
          .post("/users/orderDel", {
            orderId:this.orderId
          })
          .then(response => {
            let res = response.data;
            console.log(res)
            if (res.status == "0") {
              Toast({
                message: "取消成功",
                iconClass: "iconfont icon-duigou",
                duration: 1000
              });
               setTimeout(()=>{
                this.$router.push({ path: '/orderList' })
               },1000)
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
.all-wrap {
  padding-bottom: 130px;
}
.order-title {
  height: 250px;
  background-color: royalblue;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 50px;
  p {
    color: #fff;
  }
  i {
    margin-left: 20px;
    color: #fff;
    font-size: 100px;
  }
}
.address-wrap {
  border-bottom: 2px dashed royalblue;
  padding: 20px 30px;
  background-color: #fff;
  height: 150px;
  display: flex;
  align-items: center;
  i {
    margin: 0 20px 0 30px;
    color: royalblue;
    font-size: 60px;
  }
  .address-info {
    .person-info {
      font-weight: bold;
      font-size: 30px;
      .person-tel {
        margin-left: 10px;
      }
    }
    p {
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
      overflow: hidden;
      font-size: 20px;
    }
  }
}
.goods-list {
  padding: 20px;
  .goods-item {
    margin: 20px 0;
    border-radius: 30px;
    border: 3px solid #ccc;
    box-sizing: border-box;
    padding: 20px;
    height: 220px;
    display: flex;
    align-items: center;
    background-color: #fff;
    .goods-img {
      border-radius: 30px;
      width: 250px;
      height: 180px;
    }
    .goods-message {
      width: 500px;
      padding: 0 20px;
      .goods-name {
        font-size: 32px;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        overflow: hidden;
      }
      .goods-info {
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 100px;
        line-height: 100px;
        .goods-price {
          font-size: 35px;
          color: red;
        }
        .goods-num {
          font-size: 30px;
        }
      }
    }
  }
}
.order-message {
  background-color: #fff;
  height: 250px;
  .message-title {
    height: 50px;
    line-height: 50px;
    position: relative;
    font-size: 30px;
    padding: 10px 30px;
    border-bottom: 2px dashed #ccc;
    &::before {
      content: "";
      position: absolute;
      left: 10px;
      top: 50%;
      margin-top: -25px;
      width: 10px;
      height: 50px;
      background-color: royalblue;
    }
  }
  .message-info {
    padding: 20px 30px;
    p {
      margin-bottom: 10px;
      font-size: 25px;
      .r-info {
        margin-left: 20px;
      }
    }
  }
}
.order-footer {
  position: fixed;
  left: 0;
  bottom: 0;
  background-color: #fff;
  border-top: 2px solid #ccc;
  box-sizing: border-box;
  width: 100%;
  height: 120px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding-right: 30px;
  text-align: center;
  div {
    margin: 30px 0 30px 50px;
    font-size: 28px;
    width: 160px;
    height: 60px;
    line-height: 60px;
    border-radius: 30px;
  }
  .order-cancel {
    color: #333;
    border: 2px solid #bbb;
  }
  .order-pay {
    color:#fff;
    background-color: royalblue;
    // color: royalblue;
    // border: 2px solid royalblue;
  }
}
</style>



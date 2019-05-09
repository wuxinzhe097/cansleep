<template>
  <div class="all-wrap">
    <HeaderBar title="订单结算">
      <i
        slot="back"
        class="h-back-icon iconfont icon-fanhui"
        @click="$router.push({ path: '/addressList' })"
      ></i>
    </HeaderBar>
    <div class="address-wrap">
      <i class="iconfont icon-dizhi"></i>
      <div class="address-info">
        <div class="person-info">
          <span>收件人：{{userName}}</span>
          <span class="person-tel">{{tel}}</span>
        </div>
        <p class="address-message">{{addressInfo}}</p>
      </div>
    </div>
    <ul class="goods-list">
      <li class="goods-item" v-for="(item,index) in activegoodsList" :key="index">
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
    <div class="total-wrap">
    <p>快递费:￥{{postPay}}</p>
    <p>商品数量：共{{totalNum}}件</p>
    <p>总价：<span style="color:red;">￥{{totalPrice}}</span></p>
    </div>
    <footer class="check-footer">
      <p>总价：<span style="color:red;">￥{{totalPrice}}</span></p>
      <div class="submit-check" @click="submitOrder()">提交订单</div>
    </footer>
  </div>
</template>

<script>
import HeaderBar from "../components/HeaderBar";
import axios from "axios";
export default {
  data() {
    return {
      postPay:12,
      userName: "",
      tel: "",
      addressInfo: "",
      goodsList: []
    };
  },
  components: {
    HeaderBar
  },
  methods: {
    init() {
      this.addressId = this.$route.query.addressId;
      axios
        .post("/users/addressFind", {
          addressId: this.addressId
        })
        .then(response => {
          let res = response.data.result;
          this.userName = res.userName;
          this.tel = res.tel;
          this.addressInfo = res.addressInfo;
        });
      axios.get("/users/cartList").then(response => {
        let res = response.data;
        this.goodsList = res.result;
      });
    },
    submitOrder(){
    axios.post('/users/payMent',{
      addressId:this.addressId,
      orderTotal:this.totalPrice
    }).then((response)=>{
      let res = response.data;
      if(res.status == '0'){
         axios.post("/users/cartDelCheck").then(response => {
          let res = response.data.result;
        });
        this.$router.push({ path: '/orderSuccess?orderId='+res.result.orderId })
      }
    })
    }
  },
  computed: {
    activegoodsList: function() {
      let newList=[];
      this.goodsList.forEach(item=>{
        if(item.checked=="1"){
          newList.push(item)
        }
      })
     return newList;
    },
     totalPrice() {
      let money = 0;
      this.activegoodsList.forEach(item => {
          money += parseFloat(item.salePrice) * parseInt(item.productNum);
      });
      money+=this.postPay;
      return money;
    },
    totalNum(){
      let num = 0;
      this.activegoodsList.forEach(item => {
         num += parseInt(item.productNum);
      });
      return num;
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
  padding-bottom: 150px;
}
.address-wrap {
  border: 3px solid royalblue;
  border-radius: 50px;
  box-sizing: border-box;
  padding: 0 25px;
  margin: 20px 20px;
  background-color: #fff;
  display: flex;
  height: 250px;
  text-align: center;
  align-items: center;
  i {
    color: royalblue;
    width: 150px;
    &::before {
      font-size: 50px;
    }
  }
  .address-info {
    font-size: 28px;
    text-align: left;
    .person-info {
      box-sizing: border-box;
      padding: 0 50px 0 0;
      font-size: 30px;
      font-weight: bold;
      display: flex;
      width: 550px;
      justify-content: space-between;
    }
    .address-message {
      display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp:2;
        overflow: hidden;
      width: 550px;
    }
  }
}
.goods-list {
  border-top: 2px dashed royalblue;
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
.total-wrap{
  background-color: #fff;
  font-size: 30px;
  text-align: right;
  p {
    padding:30px;
    border-bottom: 2px dashed #ccc;
  }
}
.check-footer{
  border-top: 2px solid #ccc;
  position: fixed;
  left:0;
  bottom:0;
  box-sizing: border-box;
  background-color: #fff;
  width: 100%;
  height: 120px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding:0 0 0 30px;
  p{
    font-size:40px;
  }
  .submit-check {
    background-color: red;
    width: 220px;
    height: 120px;
    line-height: 120px;
    text-align: center;
    color:#fff;
    font-size: 35px;
  }
}
</style>

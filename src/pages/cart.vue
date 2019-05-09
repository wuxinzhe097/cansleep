<template>
  <div>
    <HeaderBar title="购物车">
      <i slot="back" class="h-back-icon iconfont icon-fanhui" @click="$router.push({ path: '/shop' })"></i>
    </HeaderBar>
    <div class="cart-wrap">
      <ul class="cart-list">
        <li v-for="(item,index) in cartList2" :key="index" >
          <mt-cell-swipe
            class="cart-item"
            :class="{'cart-checked':item.checked=='1'}"
            :right="[{
              content: '删除',
              style: { background: 'red', color: '#fff',textAlign:'center',fontSize:'15px' ,lineHeight:'115px',width:'35px',height:'100%'},
              handler:()=> delet(item.productId,item.productNum)}]"
          >
            <div class="itemLeft">
              <input
                type="checkbox"
                class="item-checkbox"
                :checked="item.checked=='1'"
                @click="editCart('checked',item)"
              >
              <img :src="'/static/img/'+item.productImage" alt="商品图片">
            </div>
            <div class="itemRight">
              <p class="cart-item-name">{{item.productName}}</p>
              <div class="right-info">
                <div class="item-num">
                  <span @click="editCart('minu',item)">-</span>
                  <strong>{{item.productNum}}</strong>
                  <span @click="editCart('add',item)">+</span>
                </div>
                <div class="item-price">￥{{item.salePrice*item.productNum}}</div>
              </div>
            </div>
          </mt-cell-swipe>
        </li>
      </ul>
    </div>
    <footer class="cart-footer">
      <div class="footer-left">
        <label for class="check-all">
          <input
            type="checkbox"
            class="item-checkbox"
            :checked="checkedAllFlag"
            @click="checkedAll()"
          >
          <span>全选</span>
        </label>
        <div class="footer-info">
          <p class="all-price">总计：￥{{totalPrice}}</p>
          <p class="goods-num">
            共{{totalNum}}件
            <span>(不含运费)</span>
          </p>
        </div>
      </div>
      <div :class="{'checkout-normal':checkCount!=0}" class="footer-right" @click="checkOut()">结算</div>
    </footer>
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
      cartList: []
    };
  },
  components: {
    HeaderBar
  },
  computed: {
    cartList2(){
      return this.cartList.reverse();
    },
    checkCount() {
      let i = 0;
      this.cartList.forEach(item => {
        if (item.checked == "1") i++;
      });
      if (i == 0) {
        return false;
      } else {
        return i;
      }
    },
    checkedAllFlag() {
      if (this.checkCount == false) {
        return false;
      } else {
        return this.checkCount == this.cartList.length;
      }
    },
    totalPrice() {
      let money = 0;
      this.cartList.forEach(item => {
        if (item.checked == "1") {
          money += parseFloat(item.salePrice) * parseInt(item.productNum);
        }
      });
      return money;
    },
    totalNum() {
      let num = 0;
      this.cartList.forEach(item => {
        if (item.checked == "1") {
          num += parseInt(item.productNum);
        }
      });
      return num;
    }
  },
  methods: {
    // 初始化购物车
    init() {
      axios.get("/users/cartList").then(response => {
        let res = response.data;
        this.cartList = res.result;
      });
    },
    // 删除商品
    delet(productId,num) {
      MessageBox.confirm("", {
        message: "确认删除商品吗？",
        confirmButtonText: "确定",
        cancelButtonText: "暂不",
        cancelButtonClass:"Messagecancel",
        confirmButtonClass:"Messageconfirm"
      }).then(action => {
          axios.post("/users/cartDel", {
              productId: productId
            })
            .then(response => {
              let res = response.data;
              if (res.status == "0") {
                Toast({
                message: "删除成功",
                iconClass: "iconfont icon-duigou",
                duration: 1000
              });
                this.init();
                this.$store.commit("updateCartCount",-num)
              }
            });
        })
        .catch(() => {});
    },
    //修改购物车内容
    editCart(flag, item) {
      if (flag == "minu") {
        if (item.productNum <= 1) {
          return;
        }
        item.productNum--;
         this.$store.commit("updateCartCount",-1)
      } else if (flag == "add") {
        item.productNum++;
        this.$store.commit("updateCartCount",1)
      } else {
        item.checked = item.checked == "1" ? "0" : "1";
      }
      axios.post("/users/cartEdit", {
          productId: item.productId,
          productNum: item.productNum,
          checked: item.checked
        }).then(response => {
          let res = response.data;
        });
    },
    // 购物车全选/不选
    checkedAll() {
      let checkFlag = !this.checkedAllFlag;
      this.cartList.forEach(item => {
        item.checked = checkFlag;
      });
      axios
        .post("/users/cartAllChecked", {
          checkAll: checkFlag
        })
        .then(response => {
          let res = response.data;
        });
    },
    // 购物车结算
    checkOut() {
      if (this.checkCount != 0) {
        this.$router.push({ path: "/addressList" });
      }
    }
  },
  mounted() {
    this.init();
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
// 复选框样式
.item-checkbox {
  width: 40px;
  height: 40px;
  background-color: #fff;
  border: solid 1px #aaa;
  -webkit-border-radius: 50%;
  border-radius: 50%;
  font-size: 64px;
  margin: 0;
  padding: 0;
  position: relative;
  display: inline-block;
  vertical-align: top;
  -webkit-appearance: none;
  -webkit-user-select: none;
  user-select: none;
  -webkit-transition: background-color ease 0.6s;
  transition: background-color ease 0.6s;
  &:checked {
    background: #1673ff;
    border: solid 1px #1673ff;
    &::after {
      content: "";
      top: 8px;
      left: 5px;
      position: absolute;
      background: transparent;
      border: 4px solid #fff;
      border-top: none;
      border-right: none;
      height: 10px;
      width: 20px;
      -moz-transform: rotate(-45deg);
      -ms-transform: rotate(-45deg);
      -webkit-transform: rotate(-45deg);
      transform: rotate(-45deg);
    }
  }
}
.cart-wrap {
  padding-bottom: 130px;
  .cart-list {
    .cart-item {
      height: 220px;
      background-color: #fff;
      margin: 20px 25px;
      padding: 30px 0px 30px 30px;
      border: 2px solid #ccc;
      box-shadow: 0 0 20px #ccc;
      box-sizing: border-box;
      border-radius: 30px;
      display: flex;
      .itemLeft {
        width: 250px;
        display: flex;
        justify-content: space-between;
        align-items: center;

        img {
          width: 200px;
          height: 150px;
        }
      }
      .itemRight {
        width: 400px;
        color: #666;
        .cart-item-name {
          padding: 0 15px;
          height: 34px;
          font-size: 35px;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 1;
          overflow: hidden;
        }
        .right-info {
          text-align: center;
          margin: 25px 15px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          .item-num {
            font-size: 40px;
            border: 2px solid royalblue;
            line-height: 50px;
            strong {
              height: 100%;
            }
            span {
              height: 100%;
              color: #fff;
              font-weight: bold;
              width: 45px;
              display: inline-block;
              background-color: rgb(92, 128, 236);
            }
          }
          .item-price {
            padding: 0 20px;
            color: red;
            font-size: 45px;
          }
        }
      }
    }
    // 购物车被选中
    .cart-checked {
      border: 2px solid royalblue;
      box-shadow: 0 0 20px royalblue;
    }
  }
}
// 购物车底部
.cart-footer {
  position: fixed;
  bottom: 0;
  left: 0;
  background-color: #fff;
  box-sizing: border-box;
  width: 100%;
  height: 120px;
  display: flex;
  border-top: 2px solid #ccc;
  .footer-left {
    padding: 10px 40px 10px 60px;
    width: 450px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .check-all {
      font-size: 30px;
      color: #666;
      span {
        margin-left: 15px;
      }
    }
    .footer-info {
      .all-price {
        font-size: 30px;
        color: red;
      }
    }
  }
  .footer-right {
    width: 200px;
    line-height: 120px;
    font-size: 40px;
    text-align: center;
    color: #fff;
    background-color: #ccc;
  }
  // 购物车为空时的结算按钮
  .checkout-normal {
    background-color: red;
  }
}

</style>


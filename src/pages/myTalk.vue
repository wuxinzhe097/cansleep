<template>
  <div>
    <HeaderBar title="我发布的梦话">
         <i slot="back" class="h-back-icon iconfont icon-fanhui" @click="$router.back()"></i>
    </HeaderBar>
    <div class="talk-wrap">
      <ul class="talk-list">
        <router-link
          :to="{path:'talkDetail',query:{talkId:item.talkId}}"
          tag="li"
          class="talk-item"
          v-for="(item,index) in talkList"
          :key="index"
        >
          <p class="talk-title">{{item.talkTitle}}</p>
          <div class="talk-message">
            <pre class="talk-info">{{item.talkInfo}}</pre>
            <div class="user-info">
              <img :src="'/static/img/'+item.userImg" alt>
              <span>{{item.userName}}</span>
            </div>
          </div>
        </router-link>
      </ul>
    </div>
  </div>
</template>

<script>
import HeaderBar from "../components/HeaderBar";
import axios from "axios";
export default {
  data() {
    return {
      talkList: []
    };
  },
  components: {
    HeaderBar
  },
  methods: {
    init() {
      axios.post("/talks/myTalk").then(response => {
        let res = response.data.result;
         this.talkList = res;
      });
    }
  },
  mounted() {
  this.init()
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.talk-wrap {
  .talk-list {
    .talk-item {
      height: 220px;
      background-color: #fff;
      box-sizing: border-box;
      box-shadow: 0 0 20px #666;
      border-radius: 30px;
      margin: 35px;
      padding: 30px;
      .talk-title {
        padding-bottom: 10px;
        border-bottom: 3px solid #ccc;
        color: #333;
        font-size: 40px;
        font-weight: 700;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 1;
        overflow: hidden;
      }
      .talk-message {
        display: flex;
        justify-content: space-around;
        align-items: center;
        height: 100px;
        .talk-info {
          flex: 2;
          padding-top: 10px;
          font-size: 20px;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
          overflow: hidden;
        }
        .user-info {
          display: flex;
          img {
            border-radius: 60px;
            margin-right: 10px;
            width: 60px;
            height: 60px;
          }
          span {
            display: inline-block;
            width: 150px;
            height: 60px;
            line-height: 60px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
        }
      }
    }
  }
}
.create-btn {
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
  box-shadow: 0 0 15px #666;
  &::before {
    font-size: 45px;
  }
}
</style>

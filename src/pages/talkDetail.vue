<template>
  <div>
    <HeaderBar title="梦话详情">
      <i slot="back" class="h-back-icon iconfont icon-fanhui" @click="$router.back()"></i>
      <span slot="headerRight" class="del-button" @click="del()" v-if="userId==myId">删除</span>
    </HeaderBar>
    <div class="talk-wrap">
      <p class="talk-title">{{talkTitle}}</p>
      <div class="talk-tips">
        <div class="talk-author">
          <img :src="'/static/img/'+userImg" alt>
          <p class="author-name">{{userName}}</p>
        </div>
        <div class="talk-time">
          <p>{{createTime}}</p>
        </div>
      </div>
      <div class="talk-info">
        <pre>{{talkInfo}}</pre>
      </div>
      <div class="comment-wrap">
        <p class="comment-wrap-title">评论</p>
        <ul class="comment-list">
          <li class="comment-item" v-for="(item,index) in comment" :key="index">
            <div class="comment-title">
              <img :src="'/static/img/'+item.userImg" alt>
              <p class="comment-name">{{item.userName}}</p>
              <p class="comment-time">{{item.createTime}}</p>
            </div>
            <p class="comment-info">{{item.commentInfo}}</p>
          </li>
        </ul>
      </div>
    </div>
    <div class="talk-footer">
      <input type="text" class="create-comment" placeholder="请发表你的评论~" v-model="commentInfo">
      <input type="button" value="发布" class="submit-comment" @click="commentSubmit()">
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import HeaderBar from "../components/HeaderBar";
import { Toast, MessageBox } from "mint-ui";
import axios from "axios";
export default {
  data() {
    return {
      myId: "",
      userId: "",
      talkId: "",
      userName: "",
      userImg: "",
      talkTitle: "",
      talkInfo: "",
      comment: [],
      createTime: "",
      commentInfo: ""
    };
  },
  components: {
    HeaderBar
  },
  methods: {
    commentSubmit() {
      if (!this.commentInfo) {
        Toast({
          message: "请输入评论内容",
          iconClass: "iconfont icon-jinggao",
          duration: 800
        });
        return;
      }
      axios
        .post("/talks/commentCreate", {
          talkId: this.talkId,
          commentInfo: this.commentInfo
        })
        .then(response => {
          let res = response.data;
          if (res.status == "0") {
            Toast({
              message: "评论成功",
              iconClass: "iconfont icon-duigou",
              duration: 800
            });
            this.commentInfo = "";
            setTimeout(() => {
              this.init();
            }, 1000);
          } else {
            console.log("评论出错");
          }
        });
    },
    init() {
      this.myId = this.$cookieStore.getCookie("userId");
      this.talkId = this.$route.query.talkId;
      axios
        .post("/talks/talkFind", {
          talkId: this.talkId
        })
        .then(response => {
          let res = response.data.result;
          this.userId = res.userId;
          this.userName = res.userName;
          this.talkTitle = res.talkTitle;
          this.talkInfo = res.talkInfo;
          this.comment = res.comment;
          this.userImg = res.userImg;
          this.createTime = res.createTime;
        });
    },
    del() {
      MessageBox({
        title: "",
        message: "确定执行此操作?",
        showCancelButton: true
      }).then(action => {
        axios.post("/talks/talkDel",{
          talkId:this.talkId
        }).then(response=>{
          let res=response.data;
          if(res.status=="0"){
             Toast({
              message: "删除成功！",
              iconClass: "iconfont icon-duigou",
              duration: 800
            });
            this.$router.back()
          }else{
            console.log("erro")
          }
        })
      });
    }
  },
  mounted() {
    this.init();
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.del-button {
  position: absolute;
  top: 50%;
  right: 5%;
  margin-top: -30px;
  line-height: 60px;
  width: 100px;
  height: 60px;
  font-size: 35px;
  border-radius: 10px;
  text-align: center;
  color: red;
  background-color: #fff;
}
.talk-wrap {
  margin-bottom: 150px;
  background-color: #fff;
  .talk-title {
    padding: 20px 20px;
    font-size: 38px;
    color: #333;
  }
  .talk-tips {
    border-bottom: 2px dashed #ccc;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 60px;
    .talk-author {
      display: flex;
      align-items: center;
      img {
        border-radius: 50px;
        width: 100px;
        height: 100px;
      }
      .author-name {
        margin: 0 20px;
        font-size: 30px;
      }
    }
    .talk-time {
      font-size: 16px;
      color: #666;
    }
  }
  .talk-info {
    pre {
      font-size: 38px;
      margin: 0;
      padding: 20px 20px;
    }
  }
  .comment-wrap {
    border-top: 10px solid royalblue;
    .comment-wrap-title { 
      padding: 25px 20px 0;
      font-size: 40px;
    }
    .comment-list {
      padding: 20px 20px;
      .comment-item {
        border-top: 2px solid #eee;
        .comment-title {
          padding: 15px;
          display: flex;
          align-items: center;
          img {
            border-radius: 50px;
            width: 100px;
            height: 100px;
          }
          .comment-name {
            margin: 0 20px;
            font-weight: bold;
            font-size: 28xpx;
          }
          .comment-time {
            font-size: 16px;
          }
        }
        .comment-info {
          font-size: 20px;
          padding: 20px 40px;
        }
      }
    }
  }
}
.talk-footer {
  position: fixed;
  left: 0;
  bottom: 0;
  border-top: 2px solid #ccc;
  padding: 0 20px;
  box-sizing: border-box;
  background-color: #fff;
  width: 100%;
  height: 130px;
  display: flex;
  align-items: center;
  .create-comment {
    box-sizing: border-box;
    font-size: 20px;
    padding: 0 30px;
    width: 500px;
    height: 60px;
    margin: 0 15px;
    border-radius: 30px;
    border: 2px solid #ccc;
  }
  .submit-comment {
    background-color: royalblue;
    width: 110px;
    height: 60px;
    color: #fff;
    border-radius: 30px;
  }
}
</style>


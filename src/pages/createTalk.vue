<template>
  <div>
    <HeaderBar title="写梦话">
      <i slot="back" class="h-back-icon iconfont icon-fanhui" @click="$router.back()"></i>
    </HeaderBar>
    <div class="create-title">
      <div class="title-info" contenteditable="true" placeholder="请输入你的梦话标题" ref="title" @keyup="preventInput()"></div>
    </div>
    <div class="create-wrap">
      <textarea style="resize:none" placeholder="请分享你睡前的点滴" v-model="talkInfo"></textarea>
      <!-- <button @click="getTalkInfo()">123</button> -->
    </div>
     <footer class="create-footer">
       <div class="post-talk" @click="createTalk() ">发布</div>
     </footer>
  </div>
 
</template>

<script>
import Vue from "vue";
import HeaderBar from "../components/HeaderBar";
import { Toast } from "mint-ui";
import axios from 'axios'
export default {
  data() {
    return {
      talkTitle:"",
      talkInfo:"",
      maxL:""
    };
  },
  components: {
    HeaderBar
  },
  methods: {
    createTalk() {
      this.talkTitle=this.$refs.title.innerText;
      if(this.talkTitle==""||this.talkInfo==""){
         Toast({
              message: "请输入完整信息",
              iconClass: "iconfont icon-jinggao",
              duration:800
            });
            return;
      }
         axios.post("/talks/talkCreate",{
        talkTitle:this.talkTitle,
        talkInfo:this.talkInfo
      }).then(response=>{
        let res=response.data;
        Toast({
              message: "发布成功",
              iconClass: "iconfont  icon-duigou",
              duration:800
            });
          setTimeout(()=>{
            this.$router.push({path:'/dreamTalk'})
          },800)
      })
      
    },
    preventInput() {
      let length = this.$refs.title.innerText.length;
     
      if (length <= 50) {
       this.maxL=this.$refs.title.innerText;
      }
      if(length>50){
        this.$refs.title.innerText=this.maxL;
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.create-title {
  background-color: #fff;
  .title-info {
    outline: none;
    font-size: 40px;
    font-weight: bold;
    box-sizing: border-box;
    padding: 25px 0;
    margin: 0 25px;
    border-bottom: 1px solid #ccc;
    &:empty::before {
      font-weight: normal;
      color: #666;
      content: attr(placeholder);
    }
  }
}
.create-wrap {
  textarea{
    box-sizing: border-box; 
    font-family: 'Microsoft YaHei';
    color: #666;
    font-size: 38px;
    padding:25px;
    width: 100%;
    border:0;
    height:980px;
  }
}
.create-footer {
  position: fixed;
  width: 100%;
  height: 130px;
  background-color: #fff;
  bottom: 0;
  left:0;
  .post-talk {
    font-size: 35px;
    color:#fff;
    width:250px;
    height: 65px;
    line-height: 65px;
    border-radius: 20px;
    text-align: center;
    margin: 32.5px auto;
    background-color: royalblue;
  }
}
</style>

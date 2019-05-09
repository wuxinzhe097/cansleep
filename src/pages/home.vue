<template>
  <div>
    <div class="home-header">
      <router-link :to="{name:'search'}" tag="input" type="text" class="h-search" placeholder="嗨~你想听什么入睡呢？"></router-link>
      <i class="iconfont icon-sousuo-m"></i>
      <transition name="fade" mode="out-in">
        <div v-if="!fixedflag" class="headertitle" key="1">{{title}}</div>
        <div v-else class="scrolltitle" key="2">
          <router-link :to="{name:'search'}" tag="span" class="s-search">
            <i class="iconfont icon-sousuo-m"></i>
            搜索
          </router-link>
          {{title}}
        </div>
      </transition>
    </div>
    <div v-show="fixedflag" class="h-container"></div>
    <!-- 时钟区域 -->
    <div class="h-clock-wrap wrap-reset">
      <div class="h-clock">
        <p class="clock-title">{{timeSpace}}</p>
        <p class="clock-time">
          现在是
          <span>{{nowHour}}</span>:
          <span>{{nowMin}}</span>
        </p>
        <p class="clock-info">{{tipMessage}}</p>
      </div>
    </div>
    <!-- 选择区域 -->
    <div class="h-select-wrap wrap-reset">
      <ul class="h-select-list">
        <li class="h-select-item">
          <i class="iconfont icon-shandian"></i>
          <span>挑战</span>
        </li>
        <li class="h-select-item" @click="popupVisible=!popupVisible">
          <i class="iconfont icon-yinyue"></i>
          <span>助眠</span>
        </li>
        <li class="h-select-item">
          <i class="iconfont icon-qiandao" @click="dailyAttendance()"></i>
          <span>签到</span>
        </li>
      </ul>
    </div>
    <!-- 睡眠区域 -->
    <div class="h-sleep-wrap wrap-reset">
      <audio :src="'../../static/music/'+audioSrc" class="sleep-audio"></audio>
      <div class="h-sleep-clickwrap" @click="musicPlay">
        <div v-show="!sleepflag" class="h-beforesleep"></div>
        <div v-show="sleepflag" class="h-sleep"></div>
      </div>
    </div>
    <!-- 推荐区域 -->
    <div class="h-recommend-wrap wrap-reset">
      <div class="h-recommend-title">小睡推荐</div>
      <ul class="h-recommend-info">
        <!-- 推荐区域快 -->
        <router-link :to="{path:'talkDetail',query:{talkId:item.talkId}}" tag="li" class="recommend-part" v-for="(item,index) in tuijian" :key="index">
          <div class="part-left">
            <p class="part-title">{{item.talkTitle}}</p>
            <p class="part-description">{{item.talkInfo}}</p>
          </div>
          <div class="part-right">
            <img :src="'../../static/img/'+item.userImg" alt="">
          </div>
        </router-link>

      </ul>
    </div>
    <mt-popup v-model="popupVisible" position="bottom">
        <ul class="musicpop-wrap">
          <li class="music-item" :class="item.src==audioSrc?'choose-item':''" v-for="(item,index) in musicList" :key="index" @click="chooseMusic(item.src)">{{item.name}}</li>
        </ul>
</mt-popup>
  </div>
</template>

<script>
import axios from "axios";
import Vue from 'vue'
import { Popup } from 'mint-ui';
import { Toast } from "mint-ui";
export default {
  data() {
    return {
      popupVisible:false,
      audioSrc:"sleep1.mp3",
      title: "能睡就睡",
      fixedflag: false,
      sleepflag: false,
      date:"",
      nowHour:"",
      nowMin:"",
      timeSpace:"",
      tipMessage:"",
      talkList:[],
      musicList:[{
        name:"助眠音乐1",
        src:"sleep1.mp3",
      },{
        name:"助眠音乐2",
        src:"sleep2.mp3",
      },{
        name:"助眠音乐3",
        src:"sleep3.mp3",
      },]
    };
  },
  computed:{
    tuijian(){
      return this.talkList.slice(0,5)
    }
  },
  methods: {
    init() {
      axios.get("/talks").then(response => {
        let res = response.data.result.list;
        this.talkList = res;
      });
    },
    chooseMusic(music){
       this.audioSrc=music;
       this.popupVisible=false;
    },
    musicPlay(){
      let audio =document.querySelector('.sleep-audio');
      if(!this.sleepflag){
         this.sleepflag=!this.sleepflag;
         audio.play()
      }else{
         this.sleepflag=!this.sleepflag;
          audio.pause();
          audio.currentTime = 0;
      }
    },
    handleScroll() {
      var scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop;
      if (scrollTop >= 50) {
        this.fixedflag = true;
      } else {
        this.fixedflag = false;
      }
    },
    clock() {
      this.nowHour =new Date().getHours() < 10? "0" + new Date().getHours(): new Date().getHours();
      this.nowMin=new Date().getMinutes() < 10? "0" + new Date().getMinutes(): new Date().getMinutes();
      if(this.nowHour>=0 && this.nowHour<=5){
         this.timeSpace="凌晨好"
         this.tipMessage="都凌晨啦，赶紧多休息一会吧~"
      }else if(this.nowHour>=6 && this.nowHour<=11){
        this.timeSpace="上午好"
         this.tipMessage="新的一天好好开始啊~"
      }else if(this.nowHour>=12 && this.nowHour<=14){
        this.timeSpace="中午好"
         this.tipMessage="午休时间要好好休息呀~~"
      }else if(this.nowHour>=15 && this.nowHour<=17){
        this.timeSpace="下午好"
         this.tipMessage="下午也要精力充足呀~"
      }else if(this.nowHour>=18 && this.nowHour<=24){
        this.timeSpace="晚上好"
         this.tipMessage="结束了一天要注意休息呀~"
      }
    },
    clockStart(){
      this.clock();
       setInterval(this.clock,1000);
       this.date=new Date().getFullYear()+"-"+(new Date().getMonth()+1)+"-"+new Date().getDate()
    },
    clockClear(){
      clearInterval(this.clock)
      this.nowTimes = null;
    },
     dailyAttendance(){
      axios.post("/users/dailyAttendance",{
           date:this.date
      }).then(response => {
          let res = response.data;
           if (res.status == 0) {
            Toast({
              message: res.result,
              iconClass: "iconfont icon-duigou",
              duration:2000
            });
          }else{
            Toast({
              message: res.result,
              iconClass: "iconfont icon-jinggao",
              duration:1000
            });
          } 
        });
    }
  },

  mounted() {
    window.addEventListener("scroll", this.handleScroll);
    this.clockStart()
    this.init()
  },
  destroyed() {
    window.removeEventListener("scroll", this.handleScroll);
    this.clockClear()
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.home-header {
  position: relative;
  height: 170px;
  width: 100%;
  background-color: royalblue;
  .h-search {
    box-sizing: border-box;
    padding: 0 0 0 12%;
    position: relative;
    display: block;
    top: 15px;
    margin: 0 auto;
    height: 80px;
    width: 80%;
    background-color: #fff;
    border-radius: 40px;
    &::-webkit-input-placeholder {
      font-size: 25px;
    }
  }
  i {
    position: absolute;
    top: 26px;
    left: 100px;
    &::before {
      font-size: 40px;
    }
  }
  .headertitle {
    height: 65px;
    margin-top: 15px;
    color: #fff;
    font-size: 40px;
    text-align: center;
  }
}
// 滑动样式
.scrolltitle {
  z-index: 999;
  width: 100%;
  height: 100px;
  line-height: 100px;
  font-size: 40px;
  text-align: center;
  background-color: #fff;
  color: royalblue;
  position: fixed;
  top: 0;
  margin-bottom: 10px;
  .s-search {
    box-sizing: border-box;
    position: absolute;
    left: 10%;
    top: 50%;
    padding-left:2%;
    margin-top: -25px;
    border-radius: 25px;
    display: inline-block;
    font-size: 30px;
    width: 150px;
    height: 50px;
    line-height:50px;
    background-color: #eee;
    i {
      position: absolute;
      top: 0;
      left: 15px;
      &::before {
        font-size: 30px;
      }
    }
  }
}
// 头部动画特效
.fade-enter-active,
.fade-leave-active {
  transition: all 0.2s ease;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
.h-container {
  width: 100%;
  height: 25px;
}

// 主页区域块重置
.wrap-reset {
  background-color: #fff;
  box-sizing: border-box;
  box-shadow: 0 0 20px #666;
  border-radius: 30px;
  margin: 35px;
  padding: 30px;
}
// 时钟区域
.h-clock-wrap {
  .h-clock {
    height: 300px;
    .clock-title {
      font-size: 70px;
      font-weight: 700;
    }
    .clock-time {
      margin:10px 0;
      font-size: 50px;
      span {
        margin: 0 20px;
        display: inline-block;
        width: 80px;
        text-align: center;
        background-color: rgb(99, 137, 250);
        color: #fff;
      }
    }
    .clock-info {
      margin:10px 0;
      font-size: 40px;
    }
  }
}
// 选项区域
.h-select-wrap {
  height: 170px;
  color: royalblue;
  .h-select-list {
    display: flex;
    justify-content: space-around;
    .h-select-item {
      font-size:25px;
      text-align: center;
      width: 60px;
      i {
        font-size: 50px;
      }
    }
  }
}
// 睡眠区域
.h-sleep-wrap {
  height: 350px;
  // 睡眠点击区域
  .h-sleep-clickwrap {
    width:250px;
    border-radius: 50%;
    margin: 0 auto;
    // 准备睡眠
    .h-beforesleep {
      box-sizing: border-box;
      position: relative;
      margin: 20px auto;
      width: 250px;
      height: 250px;
      box-shadow: 0 0 10px #888 inset;
      border-radius: 50%;
      font-size: 35px;
       font-weight: 700;
      text-align: center;
      &::after {
        content: "开始睡眠";
        line-height: 200px;
        position: absolute;
        top: 50%;
        margin: -100px -100px 0 0;
        right: 50%;
        width: 200px;
        height: 200px;
        box-shadow: 0 0 50px #000;
        border-radius: 50%;
      }
    }
  }
  // 正在睡眠
  .h-sleep {
    box-sizing: border-box;
    position: relative;
    margin: 20px auto;
    width: 250px;
    height: 250px;
    box-shadow: 0 0 30px rgb(139, 211, 235);
    border-radius: 50%;
    text-align: center;
    font-size: 35px;
    font-weight: 700;
    color: royalblue;
    
    &::after {
      content: "正在睡眠";
      position: absolute;
      line-height: 200px;
      top: 50%;
      margin: -100px -100px 0 0;
      right: 50%;
      width: 200px;
      height: 200px;
      border-radius: 50%;
      /* IE10、Firefox and Opera，IE9以及更早的版本不支持 */
    animation-name: breath;                         /* 动画名称 */
    animation-duration: 3s;                         /* 动画时长3秒 */
    animation-timing-function: ease-in-out;         /* 动画速度曲线：以低速开始和结束 */
    animation-iteration-count: infinite;            /* 播放次数：无限 */
 
    /* Safari and Chrome */
    -webkit-animation-name: breath;                 /* 动画名称 */
    -webkit-animation-duration: 3s;                 /* 动画时长3秒 */
    -webkit-animation-timing-function: ease-in-out; /* 动画速度曲线：以低速开始和结束 */
    -webkit-animation-iteration-count: infinite;    /* 播放次数：无限 */
    }
    p {
      text-align: center;
      margin: 0 auto;
      line-height: 250px;
    }
  }
}
@keyframes breath {
    from { 
      box-shadow: 0 0 10px blue;
     }                          /* 动画开始时的不透明度 */
    50%  { 
      box-shadow: 0 0 50px rgb(88, 88, 240);
     }                          /* 动画50% 时的不透明度 */
    to   { 
       box-shadow: 0 0 10px blue;
     }                          /* 动画结束时的不透明度 */    
}
 
@-webkit-keyframes breath {
    from { opacity: 0.1; }                          /* 动画开始时的不透明度 */
    50%  { opacity:   1; }                          /* 动画50% 时的不透明度 */
    to   { opacity: 0.1; }                          /* 动画结束时的不透明度 */
}

// 推荐区域
.h-recommend-wrap {
  .h-recommend-title {
    position: relative;
    padding-left: 50px;
    font-size: 55px;
    font-weight: 700;
    color: royalblue;
    &::before {
      content: "";
      position: absolute;
      left: -30px;
      top: 50%;
      margin: -10px 0 0 0;
      background-color: royalblue;
      width: 70px;
      height: 20px;
    }
  }
  .h-recommend-info {
    width: 95%;
    margin: 0 auto;
    border-left: 3px solid royalblue;
    .recommend-part {
      height: 150px;
      border-bottom: 2px dashed #ccc;
      position: relative;
      padding: 25px;
      display: flex;
      justify-content: space-around;
      align-items: center;
      &:last-child
        { 
           border: 0;
         }
      &::before {
        content: "";
        position: absolute;
        left: -13px;
        top: 50%;
        margin-top: -13px;
        width: 20px;
        height: 20px;
        border-radius: 50%;
        border:3px solid royalblue;
        background-color: #fff;
      }
      .part-left {
        flex:1;
        .part-title {
           display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 1;
        overflow: hidden;
          font-size: 30px;
          font-weight: 700;
        }
        .part-description {
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 3;
          overflow: hidden;
          font-size: 25px;
        }
      }
      .part-right{
        img{
          margin-left: 20px;
        width:80px;
        height:80px;
        border-radius: 50%;
        }
      }
    }
  }
}
// 音乐列表popup
.musicpop-wrap {
  box-sizing: border-box;
  padding: 35px;
  width: 750px;
  .music-item {
    margin-top:25px;
    font-size: 35px;
    text-align: center;
    height: 100px;
    line-height: 100px;
    border:2px solid #ccc;
    border-radius: 20px;
  }
  .choose-item{
    border:2px solid #666;
    box-shadow: 0 0 10px #666;
    background-color: royalblue;
    color: #fff;
  }
}
</style>

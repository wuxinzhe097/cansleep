<template>
  <div>
     <HeaderBar title="搜索">
           <i slot="back" class="h-back-icon iconfont icon-fanhui" @click="$router.back()"></i>
     </HeaderBar>
      <div class="search-wrap">
           <i class="iconfont icon-sousuo-m"></i>
          <input type="text" class="search-info" placeholder="想搜索什么呢？">
      </div>
  </div>
</template>

<script>
import HeaderBar from "../components/HeaderBar";
export default {
  data() {
    return {

    };
  },
  components: {
    HeaderBar
  },
  methods: {},
 
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.search-wrap {
   position: relative;
    box-sizing: border-box;
    background-color: royalblue;
    height: 120px;
    padding:20px 0;
    display: flex;
    justify-content: space-around;
    .search-info {
        box-sizing: border-box;
        border-radius: 40px;
        width:90%;
        height:80px;
        padding:0 13%;
        font-size: 30px;
        color:#666;
    }
    i {
      position: absolute;
      top:50%;
      left:10%;
      margin-top:-28px;
      &::before {
        font-size: 40px;
      }
    }
}
</style>



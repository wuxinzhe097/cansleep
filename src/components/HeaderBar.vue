<template>
  <div class="header">
      <div class="headercontain"></div>
     
     <div class="headerBar">
        <slot name="back"></slot>
        {{title}}
        <slot name="headerRight"></slot></div>
  </div>
</template>

<script>
export default {
  props:['title']
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.header {
    .headercontain {
        height:100px;
    }

    .headerBar {
      z-index: 999;
        width:100%;
        height:100px;
        background-color: royalblue;
        position: fixed;
        top:0;
        left:0;
        text-align: center;
        line-height: 100px;
        font-size: 40px;
        color:white;
    }

}
</style>


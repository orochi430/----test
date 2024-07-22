<template>
  <div  class="ds-construction">
    <img src="../../assets/imgs/constructor/wait.png" alt="">   
    <p>建设中...</p>
  </div>
</template>

<script>
export default {
  name: "inConstruction",
  data() {
    return {
    };
  },
  methods: {
  }
};
</script>

<style lang="scss" scoped>
@import "../../assets/styles/themes.scss";
@import "../../assets/styles/mixin.scss";
.ds-construction {
    width: 100%;
    height:100%;
    overflow: hidden;
    img{
        width:170px;
        height: 205px;
        margin: 87px auto 0;
    }  
    p{
        text-align: center;
        @include font_4;
        color: #999999;
        padding-top: 29px;
    } 
}
</style>
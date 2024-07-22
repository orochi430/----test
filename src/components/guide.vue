<template>
  <div>
    <div class="pass button" @click="toLogin">跳过</div>
    <van-swipe class="my-swipe" indicator-color="white" :loop="false" @change="onChange">
      <van-swipe-item v-for="item in guidePage.data" :key="item.ordernum">
        <img :src="item.imgsrc" :alt="item.imgname" style="object-fit: fill;width: 100vw;height: auto;">
      </van-swipe-item>
    </van-swipe>
    <transition name="fade">
      <div v-show="isShow" class="now button" @click="toLogin">立即体验</div>
    </transition>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isShow: dsf.config.guidePage.data.length > 1 ? false : true
    }
  },
  computed: {
    guidePage() {
      dsf.config.guidePage.data.forEach(element => {
        element.imgsrc=dsf.url.getWebPath(element.imgsrc);
      });
      return dsf.config.guidePage
    }
  },
  methods:{
    toLogin(){
      this.$router.replace({path:'/testLogin'})
    },
    onChange(index){
      if(index == this.guidePage.data.length-1){
        this.isShow = true
      }else {
        this.isShow = false
      }
    }
  }
}
</script>
<style lang='scss' scoped>
@import '../assets/styles/themes.scss';
@import '../assets/styles/mixin.scss';
  .my-swipe .van-swipe-item {
    height: 100vh;
    width: 100vw;
    background-color: #fff;
  }
  .van-swipe{
    ::v-deep .van-swipe__indicators{
      bottom: 60px;
    }
  }
  
  .pass{
    position: fixed;
    top: 30px;
    right: 30px;
    z-index: 99;
  }
  .now{
    position: fixed;
    bottom: 80px;
    left: 50%;
    transform: translateX(-50%);
  }
  .button{
    color: #fff;
    border-radius: 20px;
    padding: 5px 10px;
    @include background-theme("normal");
    border: 0 !important;
    box-shadow: 0 10px 16px 0 rgba(0,0,0,0.2), 0 14px 50px 0 rgba(0,0,0,0.15);
  }
  .fade-enter-active{
    -webkit-animation: slide-in-right 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
	          animation: slide-in-right 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
  }
  @-webkit-keyframes slide-in-right {
    0% {
      -webkit-transform: translateX(2000px);
              transform: translateX(2000px);
      opacity: 0;
    }
    100% {
      -webkit-transform: translateX(0);
              transform: translateX(0);
      opacity: 1;
    }
  }
  @keyframes slide-in-right {
    0% {
      -webkit-transform: translateX(2000px);
              transform: translateX(2000px);
      opacity: 0;
    }
    100% {
      -webkit-transform: translateX(0);
              transform: translateX(0);
      opacity: 1;
    }
  }
  .fade-leave-active {
    -webkit-animation: slide-out-right 0.3s cubic-bezier(0.550, 0.085, 0.680, 0.530) both;
	        animation: slide-out-right 0.3s cubic-bezier(0.550, 0.085, 0.680, 0.530) both;
  }
  @-webkit-keyframes slide-out-right {
  0% {
    -webkit-transform: translateX(0);
            transform: translateX(0);
    opacity: 1;
  }
  100% {
    -webkit-transform: translateX(2000px);
            transform: translateX(2000px);
    opacity: 0;
  }
}
@keyframes slide-out-right {
  0% {
    -webkit-transform: translateX(0);
            transform: translateX(0);
    opacity: 1;
  }
  100% {
    -webkit-transform: translateX(2000px);
            transform: translateX(2000px);
    opacity: 0;
  }
}
</style>
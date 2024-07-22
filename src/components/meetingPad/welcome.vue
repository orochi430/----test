<template>
  <div class="welcome">
    <div class="image">
      <img src="static/images/meetingPad/wel_bg.png" alt="" />
    </div>
    <div class="box">
      <div class="btn" @click="toLogin">欢 迎 使 用</div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      title: "dreamWeb会务系统",
    };
  },
  mounted() {
    // setTimeout(this.toLogin,2000)
  },
  methods: {
    toLogin() {
      this.$router.replace("/meetingPad/login");
    },
  },
};
</script>
<style lang='scss' scoped>
.welcome {
  height: 100%;
  text-align: center;
  color: #3389e0;
  background-color: white;
  position: relative;
  display: flex;
  flex-direction: column;
  .image {
    display: flex;
    width: 100%;
    height: 27.58rem;
    justify-content: center;
    align-content: center;
    padding: 1.84rem 0;

    img {
      margin: 1.84rem auto 0;
      width: 44.4rem;
      height: 23.92rem;
    }
  }

  .box {
    height: 100%;
    display: flex;
    justify-content: center;
    align-content: center;
    flex-wrap: wrap;
    .btn {
      font-family: PingFangSC-Semibold,serif;
      font-size: 0.88rem;
      text-align: center;
      color: #ffffff;
      width: 16.2rem;
      line-height: 2.4rem;
      background-color: #3388df;
      border-radius: 1.2rem;
      height: 2.4rem;
      //margin: 1.84rem auto 0;
    }
  }

  .bg {
    img {
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100vw;
    }
  }
}
</style>

<template>
<div class="error-container">
  <img src="static/images/wanzhengtong/logo.png" alt="" class="logo">
  <img src="static/images/wanzhengtong/error_bg.png" alt="" class="bg">
  <div class="text">{{text}}</div>
  <div class="btn" @click="closePage">退出</div>
  <div class="tel">客服电话：{{tel}}</div>
</div>
</template>

<script>
export default {
  data() {
    return {
    }
  },
  computed: {
    text() {
      if (this.$route.query.CODE == 'G01') {
        return '该应用没有您的用户信息，请联系单位管理员!'
      } else if (this.$route.query.CODE == 'G02') {
        return '该应用您无权访问，请联系单位管理员!'
      } else {
        return ''
      }
    },
    tel() {
        return this.$route.query.TEL
    }
  },
  methods: {
    closePage() {
      if (window.dd) {
        dd.closePage()
      }
    }
  }
}
</script>
<style lang='scss' scoped>
.error-container {
  min-height: 100vh;
  background-color: #fff;
  text-align: center;
  overflow: hidden;
  color: #999;
  .logo {
    width: 155px;
    margin: 40px auto;
  }
  .bg {
    width: 274px;
    margin: 0 auto;
  }
  .text {
    font-size: var(--font_size_1);
  }
  .btn {
    margin: 100px 40px 30px;
    background-color: #3f8cff;
    color: #fff;
    padding: 10px;
    border-radius: 14px;
    font-size: 18px;
    box-shadow: 5px 5px 20px 0 #adceff;
  }
}
</style>

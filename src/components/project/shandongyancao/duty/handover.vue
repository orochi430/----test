<template>
<div>
  <img v-if="url" :src="url" alt="" class="qrcode">
  <div v-else class="message">{{message}}</div>
  <div class="box">
    <div>请提供给下一值班人</div>
    <div>{{dsf.date.format(new Date(), 'yyyy-mm-dd')}}</div>
  </div>
</div>
</template>

<script>
export default {
  data() {
    return {
      url: '',
      message: ''
    }
  },
  created() {
    this.showQRCode()
    
  },
  methods: {
    showQRCode() {
      dsf.http.post('fn/DutyForMobiles/showQRCode').then(res => {
        console.log(res)
        if (res.data.code == 200) {
          this.url = `data:image/jpeg;base64,${res.data.data}`
        } else {
          this.message = res.data.message
        }
      })
    }
  }
}
</script>
<style lang='scss' scoped>
@import 'src/assets/styles/themes.scss';
@import 'src/assets/styles/mixin.scss';
.qrcode {
  width: 70vw;
  margin: 0 auto;
}
.message {
  min-height: 100px;
  font-size: var(--font_size_2);
  margin-top: 50px;
  text-align: center;
}
.box {
  margin: 40px;
  @include background-theme('normal');
  color: #fff;
  padding: 16px 0;
  font-size: var(--font_size_2);
  text-align: center;
}
</style>
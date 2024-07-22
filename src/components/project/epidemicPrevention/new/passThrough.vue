<template>
<div>
  <div id="passThrough" style="margin: 0.6rem auto;width: 5rem;"></div>
  <div style="padding-top: 0.2rem;text-align: center;">请使用仪电哨兵设备扫码开启正常通行模式</div>
</div>
</template>

<script>
import QRCode from 'qrcodejs2'
export default {
  data() {
    return {

    }
  },
  mounted() {
    this.$nextTick(() => {
      let qrcodeWidth = document.getElementById('passThrough').clientWidth
      let qrcode = new QRCode(document.getElementById('passThrough'), {
        text: `action:{"command": "passThrough","data": {"operateUserId": "${dsf.util.loadSessionStore('user').user_id}"}}`,
        width: qrcodeWidth, //图像宽度
        height: qrcodeWidth, //图像高度
        colorDark : "#000000", //前景色
        colorLight : "#ffffff", //背景色
        correctLevel : QRCode.CorrectLevel.H //容错级别 容错级别有：（1）QRCode.CorrectLevel.L （2）QRCode.CorrectLevel.M （3）QRCode.CorrectLevel.Q （4）QRCode.CorrectLevel.H
      })
    })
  }
}
</script>
<style lang='scss' scoped>
</style>
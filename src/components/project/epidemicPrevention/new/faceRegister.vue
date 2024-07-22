<template>
<div>
  <div id="faceCode" style="margin: 0.6rem auto;width: 5rem;"></div>
  <div style="padding-top: 0.2rem;text-align: center;">请使用仪电哨兵设备扫码开启人脸采集模式</div>
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
      let qrcodeWidth = document.getElementById('faceCode').clientWidth
      let qrcode = new QRCode(document.getElementById('faceCode'), {
        text: `action:{"command": "faceRegister","data": {"operateUserId": "${dsf.util.loadSessionStore('user').user_id}"}}`,
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
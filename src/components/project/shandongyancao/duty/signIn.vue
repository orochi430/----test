<template>
<div>
  <div class="signIn" @click="scan">
    <span>签到</span>
    <span>{{currentDate}}</span>
  </div>
  <div class="message">{{message}}</div>
  <div class="box">
    <div>请点击签到</div>
    <div>扫描值班人员提供的二维码信息</div>
  </div>
</div>
</template>

<script>
export default {
  data() {
    return {
      message: '',
      currentDate: ''
    }
  },
  created() {
    setInterval(() => {this.currentDate = dsf.date.format(new Date(), 'hh:ii:ss')}, 1000)
  },
  methods: {
    scan() {
        if(dsf.util.getClientName()=='app') {
            xsfBarcode.scan(
                (res) => {
                    console.log(res)
                    dsf.layer.closeLoading(this.loading)
                    if(res.text) {
                        let obj = JSON.parse(res.text)
                        dsf.http.Axios.post(dsf.url.getWebPath('ctrl/DutyForMobiles/signIn'), obj, {
                          headers: {
                            'x-auth-token': dsf.util.loadSessionStore("loginToken"),
                            'Content-Type': 'application/json;charset=UTF-8'
                          }
                        }).then(response => {
                            this.message = response.data.message
                        })
                    } else {
                        dsf.layer.toast('该二维码无效')
                    }
                },
                (error) => {
                    dsf.layer.closeLoading(this.loading)
                    dsf.layer.toast('扫码失败')
                }
            );
        }else {
            dsf.layer.toast('需在app中进行扫码')
        }
    }
  }
}
</script>
<style lang='scss' scoped>
@import 'src/assets/styles/themes.scss';
@import 'src/assets/styles/mixin.scss';
.signIn {
  margin: 50px auto;
  @include background-theme('normal');
  color: #fff;
  font-size: var(--font_size_2);
  text-align: center;
  border-radius: 50%;
  width: 120px;
  height: 120px;
  display: flex;
  flex-direction: column;
  justify-content: center;
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
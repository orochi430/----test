<template>
  <van-overlay :show="showSign" @click="$emit('update:showSign', false)" :lock-scroll="true" z-index="999">
    <div class="wrapper" @click.stop>
      <van-icon name="cross" @click="$emit('update:showSign', false)" size="16"/>
      <div class="circle flex dc jc" :class="{'isSign': !isSign}" @click="signin">
        <div class="title">{{isSign ? '点击签到' : '已签到'}}</div>
        <div v-if="isSign">{{ currentDate }}</div>
      </div>
      <div v-if="currentSigninDetail.time">签到截至：{{currentSigninDetail.time.split(' - ')[1]}}</div>
      <div v-if="signtime">签到时间：{{ signtime }}</div>
    </div>
  </van-overlay>
</template>

<script>
export default {
  props: {
    showSign: {
      type: Boolean,
      default: false
    },
    isSign: { // 是否可点击签到
      type: Boolean,
      default: false
    },
    signtime: {
      type: String,
      default: ""
    },
    currentSigninDetail: {
      type: Object,
      default: () => {{}}
    }
  },
  data() {
    return {
      currentDate: '',
      timer: null,
    }
  },
  created() {
    console.log(11);
    // dsf.http.post('fn/conferenceSignIn/generateQRcodeSignIn', {
    //   meetingId: this.currentSigninDetail.meetingId
    // }).then(res => {

    // })
  },
  watch: {
    showSign(nVal) {
      if (nVal) {
        clearInterval(this.timer)
        this.currentDate = dsf.date.format(new Date(), 'hh:ii:ss')
        this.timer = setInterval(() => {
          this.currentDate = dsf.date.format(new Date(), 'hh:ii:ss')
        }, 1000);
      } else {
        clearInterval(this.timer)
      }
    }
  },
  methods: {
    signin() {
      if (this.isSign) {
        if (this.currentSigninDetail.signinType == 2) { // 扫码签到
          if(dsf.util.getClientName()=='app') {
            let self = this
            xsfBarcode.scan(
              (res) => {
                console.log(res)
                if(res.text && res.text.startsWith('meetingsign_')) {
                  let meetingId = res.text.split('_')[1]
                  this.doSign(meetingId)
                } else {
                  dsf.layer.toast('无法识别该二维码')
                }
              },
              (error) => {
                dsf.layer.toast('扫码失败')
              }
            );
          }else {
            dsf.layer.toast('需在app中进行扫码')
          }
        }
        else {
          dsf.layer.loading('签到中')
          this.doSign(this.currentSigninDetail.meetingId, this.currentSigninDetail.scheduleId )
        }
      }
    },
    doSign(meetingId, scheduleId) {
      dsf.http.post('fn/conferenceSignIn/doSign', { 
        meetingId: meetingId,
        scheduleId: scheduleId
      }).then(res => {
        if (res.data.code == 200) {
          this.$emit('signIn')
          dsf.layer.toast('签到成功')
        } else {
          dsf.layer.toast(res.data.message)
        }
      }).error(error => {
        dsf.layer.toast(error)
      })
    }
  }
}
</script>
<style lang='scss' scoped>
.wrapper {
  background-color: rgba(255,255,255,0.9);
  width: 70%;
  margin: 50% auto;
  border-radius: 16px;
  padding: 30px;
  position: relative;
  .van-icon {
      position: absolute;
      right: 15px;
      top: 15px;
    }
  .circle {
    width: 130px;
    height: 130px;
    border-radius: 50%;
    margin: 20px auto;
    text-align: center;
    background-image: linear-gradient(#35c4fd, rgb(0, 123, 227));
    color: #fff;
    box-shadow: 0px 0px 15px 4px rgba(0, 123, 227,0.5);
    .title {
      font-size: var(--font_size_2);
      font-weight: 600;
      padding-bottom: 10px;
    }
  }
  .isSign {
    background-image: linear-gradient(#43d6b6, rgb(42, 196, 253));
    box-shadow: 0px 0px 15px 4px rgba(42, 196, 253,0.5);

  }
}
</style>
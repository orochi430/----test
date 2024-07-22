<template>
  <div class="ds-user-dialog">
    <van-popup v-model="showPop" :style="{ height: isShowPd ? '6.15rem' : '5.46rem', width:'90%', 'border-radius':'5px'}" @close="close">
      <div class="__user_box">
        <div class="__user_box-header">
          <div class="__title">{{ title }}</div>
        </div>
        <div class="__user_box-body">
          <div class="box">
            <van-field v-model="number" label="会议室号：" label-align="right" type="number" placeholder="请输入会议室号" />
            <van-field v-model="pd" v-if="isShowPd" label="密　　码：" label-align="right" type="number"
              placeholder="请输入密码" />
          </div>
          <div style="margin-top:10px;">
            <div class="box">
              <div class="p">
                <span>开启麦克风</span>
                <van-switch v-model="checked" size="20px" />
              </div>
              <div class="p">
                <span class="justify">开启视频</span>
                <van-switch v-model="checked1" size="20px" />
              </div>
            </div>
          </div>
        </div>
        <div class="__user_box-footer">
          <van-button type="default" @click="close()">取消</van-button>
          <van-button type="primary" @click="confirm" :disabled="checkComfirm">确定</van-button>
        </div>
      </div>
    </van-popup>
  </div>

</template>

<script>
import { joinMeetBefore } from "@/components/project/xizangOffice/joinMeetBefore.js"
export default {
  name: 'xizangMeet',
  props: {
    formData: {
      type: Object,
      default: () => {
        return {};
      },
    },
  },
  data() {
    return {
      showPop: true,
      meetingData: {},
      number: "",
      pd: "",
      title: "",
      checked: false,
      checked1: false,
      title: "加入会议",
      confirmCallBack: () => { }
    }
  },
  created() {
    if (this.formData.main["220613110549pDrUr42ZRZKnbEjEiUv"].value.length) {
      this.show({ number: this.formData.main["220613110549pDrUr42ZRZKnbEjEiUv"].value, pd: this.formData.main["2206131108027l3bKEiL5QBDwg1xWnZ"].value, bt: this.formData.main["B0001"].value }).then((data) => {
        console.log(data)
        let param = {
          meetingNum: data.number,
          password: data.pd,
          micMute: data.checked,
          videoMute: data.checked1,
          title: data.bt
        }
        console.log(param)
        joinMeetBefore(param)
      });
    } else {
      dsf.layer.toast("当前会议暂时无法加入", false)
    }
  },
  computed: {
    isShowPd() {
      return this.meetingData.pd && this.meetingData.pd.length > 0
    },
    checkComfirm() {
      let isGo = true;
      if (this.number.length) {
        if (this.meetingData.pd.length > 0) {
          if (this.pd.length) {
            isGo = false
          } else {
            isGo = true
          }
        } else {
          isGo = false
        }
      }
      return isGo
    }
  },
  methods: {
    close() {
      this.show = false
      this.$emit("closeCallback", "")
    },
    confirm() {
      if (this.pd != this.meetingData.pd) {
        dsf.layer.toast("密码输入不正确，请重新输入！")
        return
      }
      this.confirmCallBack({
        number: this.number,
        pd: this.pd,
        checked: !this.checked,
        checked1: !this.checked1,
        bt: this.meetingData.bt
      });
      this.close()
    },
    show(meetingData) {
      this.meetingData = meetingData
      this.number = this.meetingData.number
      return new Promise((confirmCallBack) => {
        this.confirmCallBack = confirmCallBack;
      });
    },
  }
}
</script>
<style lang="scss" scoped>
@import "../../assets/styles/themes.scss";
@import "../../assets/styles/mixin.scss";

::v-deep .van-field__label {
  color: black !important;
}

::v-deep .van-switch {
  float: right;
}

::v-deep .van-field__control {
  text-align: right;
}

::v-deep .van-button {
  float: left;
  width: 50%;
  height: 100%;
}

.__user_box-footer {
  height: 1.2rem !important;
}

.ds-user-dialog {
  .van-cell {
    padding: 0px !important;
  }

  .__user_box {
    &-header {
      height: 46px;
      border-bottom: 1px solid #eee;
      background-color: #f4f5f6;

      .__title {
        line-height: 46px;
        padding: 0 20px;
        font-size: var(--font_size_2);
        font-weight: bold;
        color: #666;
        text-align: center;
      }

    }

    &-body {
      // padding: 0.24rem;

      .box {
        box-sizing: border-box;
        max-height: 150px;
        overflow: auto;
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        padding: 10px 20px;

        div {
          @include font_3;
          margin: 0.1rem;

          ::v-deep .van-field__label--right {
            text-align: left;
          }
        }

        .p {
          width: 100%;
          line-height: 30px;

          // padding: 10px 0px 10px 0px;
          .justify {
            display: inline-block;
            width: 84px;
            text-align-last: justify;
          }
        }
      }
    }

    &-footer {
      border-top: 1px solid #eee;
      background-color: #f4f5f6;
      height: 46px;
      font-size: 18px;
    }
  }
}
</style>

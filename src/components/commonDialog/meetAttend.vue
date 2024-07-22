<template>
  <div class="meet-attend" v-if="show0">
    <div class="wrapper" @click.stop>
      <van-icon name="cross" size="16" @click="closed" />
      <div class="circle flex dc jc isSign" @click="sign">
        <div class="title">点击签到</div>
        <div>{{ timer }}</div>
      </div>
      <div>签到时限：{{ formData.main["c-meetingtz-019"].value }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "meetAttend",
  props: {
    formData: {
      type: Object,
      default: () => {
        return {};
      }
    },
    metaData: {
      type: Object,
      default: {}
    },
    formParams: {
      type: Object,
      default: {}
    }
  },
  components: {},
  data() {
    return {
      show0: true,
      timer: "",
      countdown: ""
    };
  },
  computed: {},
  watch: {
    formParams(val) {
      console.log(val);
    }
  },
  methods: {
    getTimer() {
      var date = new Date();
      var year = date.getFullYear();
      var month = date.getMonth() + 1;
      var dates = date.getDate();
      var hh = date.getHours();
      var h = hh < 10 ? "0" + hh : hh;
      var mm = date.getMinutes();
      var m = mm < 10 ? "0" + mm : mm;
      var ss = date.getSeconds();
      var s = ss < 10 ? "0" + ss : ss;
      this.timer = "现在时间：" + h + ":" + m + ":" + s;
      let StartTime = new Date(this.formData.main["c-meetingtz-019"].value); //日期格式建议用斜杠
      this.countdown = parseInt((StartTime.getTime() - date.getTime()) / 1000);
    },
    closed() {
      this.show0 = true;
      console.log("关闭", this.show0);
      this.$emit("closeCallback", "");
    },
    sign() {
      let that = this;
      console.log(this.countdown);
      if (this.countdown > 7200 || this.countdown < 0) {
        dsf.layer.toast("请在会议开始前2小时内签到");
        return;
      }
      dsf.http
        .post("fn/meetingNotice/noticeSign", {
          pk: this.formParams.pk,
          tzId: this.formParams.pk
        })
        .then(res => {
          if (res.code == 200) {
            dsf.layer.toast(res.message);
            that.show0 = false;
            this.$emit("closeCallback", "");
          } else {
            dsf.layer.toast(res.message);
          }
        });
    },
    cancel() {
      this.show0 = false;
      this.$emit("closeCallback", "");
    }
  },
  created() {},
  mounted() {
    this.getTimer();
    this.$bus.$on("selectData", val => {
      console.log(val);
    });
  },
  destroyed() {}
};
</script>
<style scoped lang="scss">
.meet-attend {
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 1000;
  .wrapper {
    background-color: rgba(255, 255, 255, 0.9);
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
      box-shadow: 0px 0px 15px 4px rgba(0, 123, 227, 0.5);
      .title {
        font-size: var(--font_size_2);
        font-weight: 600;
        padding-bottom: 10px;
      }
    }
    .isSign {
      background-image: linear-gradient(#43d6b6, rgb(42, 196, 253));
      box-shadow: 0px 0px 15px 4px rgba(42, 196, 253, 0.5);
    }
  }
}
</style>

<template>
  <div
    class="container"
  >
    <div class="top" v-if="textData.timeOut">
      <div
        class="left red"
        style="
           {
            height: '30px';
          }
        "
      >
        <div class="posi">已超期</div>
      </div>
      <div class="right" :style="{
      background: textData.timeOut ? 'rgb(245 248 255)' : '',
    }">
        <!-- <div class="timeout">
          <span class="orange"> {{ textData.timeOutText }}</span>
        </div> -->
        <!-- <van-progress
          color="#f2826a"
          percentage="100"
          :show-pivot="false"
          stroke-width="8"  
        /> -->
      </div>
    </div>
    <!-- <div class="orange" v-else>
      {{ textData.timeOutText }}
    </div> -->
    <div class="footer">
      <div class="left">
        <div class="icon" :style="{
      background: textData.timeOut ? 'rgb(245 248 255)' : '',
    }">
          <i class="iconfont iconshijian"></i>
        </div>
        <div class="box">
          <div class="gray">办文时限</div>
          <div class="bold">
            {{ textData.deadline ? textData.deadline : "未填写" }}
          </div>
        </div>
      </div>
      <div class="right">
        <div class="icon">
          <i class="iconfont iconchuli"></i>
        </div>
        <div class="box">
          <div class="gray">我的耗时</div>
          <div class="bold">
            {{ textData.myTimeConsuming }}
          </div>
        </div>

        <!-- <div class="arrow">
          <van-icon name="arrow" />
        </div> -->
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "controlTextBox",
  model: {
    prop: "value",
    event: "input",
  },
  props: {
    subFormIndex: {
      type: Number,
      default: null,
    },
    formId: {
      // 子表id
      type: String,
      default: null,
    },
    formMeta: {
      type: Object,
      default: () => ({}),
    },
    formData: {
      type: Object,
      default: () => ({}),
    },
    metaData: {
      type: Object,
      default: () => ({}),
    },

    allFile: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      textData: {
        deadline: "",
        myTimeConsuming: "",
        timeOut: false,
        timeOutText: "",
      },
    };
  },
  computed: {
    percentage() {
      let sum =
        (Date.parse(this.formData.main["B0021"].value) - +new Date()) /
        (Date.parse(this.formData.main["B0021"].value) -
          Date.parse(this.formData.main["B0018"].value));
      // console.log("sum",sum);
      if (isNaN(Math.floor(sum * 100)) || Math.floor(sum * 100) < 0) {
        return 0;
      } else {
        return Math.floor(sum * 100);
      }
      // return isNaN(Math.floor(sum*100))?0:Math.floor(sum*100);
    },
  },
  watch: {},
  created() {
    this.initData();
  },
  methods: {
    initData() {
      dsf.http
        .post("/fn/toScreen/formTimeSpent", {
          pk: this.formMeta.parameters.pk,
          pnId: this.formMeta.parameters.pnId,
          nodes: this.metaData.extra.nodes,
        })
        .then((res) => {
          const type = res.data.type;
          if (type === "success") {
            const { deadline, myTimeConsuming, timeOut, timeOutText, show } =
              res.data.data;
            this.textData = {
              deadline,
              myTimeConsuming,
              timeOut,
              timeOutText,
            };
            // let power=dsf.util.loadSessionStore("user")?.depts.some(item => this.formData.main["C-LW-0002"].value.includes(item.id))
            if (!show) {
              this.metaData.show = 0;
            }
          } else {
            // dsf.layer.toast(res.data.message);
            console.log(res.data.message);
            this.metaData.show = 0;
          }
        })
        .error((err) => {
          dsf.layer.closeLoading(loading);
          console.log(err);
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.container {
  border-radius: 10px;
  position: relative;
  padding-right: 10px;
  overflow: hidden;
  // padding: 10px;
  .top {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .left {
      position: relative;
      // width: 60px;
      // height: 36px;
    }
    .right {
      flex: 1;
      height: 24px;
      display: flex;
      align-items: center;
      .timeout {
        padding: 6px 0;
        .orange {
          // color: #f2826a;
          font-weight: bold;
          font-size: 14px;
          margin-right: 10px;
        }
      }
      .van-progress {
        flex: 1;
        overflow: hidden;
        // background: #539850 !important;
        // ::v-deep .van-progress__portion{
        //   width: 100% !important;
        // }
      }
    }
    .blue {
      .posi {
        color: #fff;
        background: #1989f9;
        font-size: 12px;
        // position: absolute;
        padding: 2px 6px;
        border-radius: 8px 0 8px 0;
        // left: -1px;
        // top: -1px;
      }
    }
    .red {
      height: 24px;
      .posi {
        color: #fff;
        background: #399bff;
        font-size: 12px;
        // position: absolute;
        padding: 4px 8px;
        border-radius: 8px 0 8px 0;
        // left: -1px;
        // top: -2px;
      }
    }
  }
  .orange {
    // color: #399BFF;
    font-weight: bold;
    font-size: 14px;
    text-align: center;
  }
  .footer {
    display: flex;
    align-items: center;
    margin-bottom: 15px;
    .left {
      flex: 5;
      text-align: center;
      display: flex;
      align-items: center;
      .icon{
        // flex: 2;
        color: gray;
        border-radius: 50%;
        width: 30px;
        height: 30px;
        line-height: 30px;
        text-align: center;
        margin-right: 15px;
      }
      .box{
            text-align: left;
      }
    }
    .right {
      flex: 4;
      text-align: center;
      position: relative;
      display: flex;
      align-items: center;
      .icon{
        flex: 2;
        color: gray;
      }
      .box{
            text-align: left;
      }
      .arrow {
        position: absolute;
        right: 0;
        top: 50%;
        transform: translateY(-50%);
        color: gray;
        font-weight: bold;
      }
    }
  }
  .gray {
    color: gray;
    padding: 6px 0;
  }
  .bold {
    color: #000;
    font-weight: 600;
  }
}
</style>

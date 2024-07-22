<template>
  <div class="Subsection">
    <van-popup
      v-model="processingStatisticsData.openDialog"
      round
      @click-overlay="closePop"
    >
      <div class="xiaoJie">
        <div class="text">公文效能月度小结已更新,请查看</div>
        <div class="gray">{{new Date().getMonth() + 1}}月累计办件</div>
        <div class="num">
          <span>{{ processingStatisticsData.ljbjl }} </span> 件
        </div>
        <div class="timer">
          <span>同比增长: {{ processingStatisticsData.tbzz }}</span>
          <div class="red">
            +{{ processingStatisticsData.hbsq }} <span></span>
          </div>
        </div>
        <div class="rectangle">
          <div class="left">
            <div class="text">平均耗时</div>
            <div class="num">
              <span>{{ processingStatisticsData.pjhs }}</span> 小时
            </div>
          </div>
          <div class="center"></div>
          <div class="right">
            <div class="text">按时办结率</div>
            <div class="num">
              <span>{{ processingStatisticsData.asbjl }}</span>
            </div>
          </div>
        </div>
        <div class="btn" @click.stop="chaKanDetail">查看详细数据</div>
        <div class="close" @click.stop="closePop">关闭</div>
      </div>
    </van-popup>
  </div>
</template>

<script>
export default {
  name: "Subsection",

  props: [],

  components: {},

  data() {
    return {
      // openDialog: true,
      processingStatisticsData: {
        ljbjl: 0,
        hbsq: "0%",
        asbjl: "0%",
        openDialog: false,
      },
    };
  },

  created() {},

  mounted() {
    let loading = dsf.layer.loading();
    let self = this;
    dsf.http
      .post("fn/efficiencySelect/processingVolumeStatistics", {
        year: new Date().getFullYear(),
        month: new Date().getMonth() + 1,
        range: 1,
      })
      .then((res) => {
        dsf.layer.closeLoading(loading);

        if (res.data.type === "success") {
          const { ljbjl, hbsq, asbjl, pjhs, ybzz, openDialog } = res.data.data;
          self.processingStatisticsData.ljbjl = ljbjl;
          self.processingStatisticsData.hbsq = hbsq;
          self.processingStatisticsData.asbjl = asbjl;
          self.processingStatisticsData.pjhs = pjhs;
          self.processingStatisticsData.ybzz = ybzz;
          self.processingStatisticsData.openDialog = openDialog;
          if (!openDialog) {
            self.processingStatisticsData.openDialog = false;
            setTimeout(() => {
              self.$router.replace({ path: "/officialDocumentEfficiency" });
            }, 10);
          }
        } else {
          dsf.layer.toast(res.data.message);
        }
      })
      .catch((err) => {
        dsf.layer.closeLoading(loading);
        console.log(err);
      });
  },

  activated() {},

  computed: {},

  watch: {},

  methods: {
    // 点击查看详情
    chaKanDetail() {
      this.processingStatisticsData.openDialog = false;

      setTimeout(() => {
        this.$router.replace({ path: "/officialDocumentEfficiency" });
      }, 10);
    },
    //关闭弹窗
    closePop() {
      this.processingStatisticsData.openDialog = false;
      this.$router.go(-1);
    },
  },
};
</script>

<style scoped lang='scss'>
.xiaoJie {
  width: 90vw;
  background: url("../../../../static/images/project/chengduyitihua/BG.png")
    center center/100% 100% no-repeat;
  // height: 108vw;
  overflow: hidden;
  .text {
    font-size: 16px;
    margin: 15px 0;
    font-weight: bold;
    text-align: center;
  }
  .gray {
    margin: 15px 0;
    text-align: center;
    font-size: 16px;
    font-weight: bold;
    color: #666;
  }
  .num {
    font-weight: bold;
    text-align: center;
    span {
      font-size: 36px;
    }
  }
  .timer {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 15px 0;
    line-height: 24px;
    > span {
      color: #0091ff;
      font-size: 18px;
      font-weight: bold;
    }
    .red {
      color: red;
      font-size: 18px;
      margin-left: 10px;
      line-height: 24px;
      > span {
        border-left: 5px solid transparent;
        border-right: 5px solid transparent;
        border-bottom: 5px solid red;
        position: relative;
        top: -14px;
        left: 10px;
      }
    }
  }
  .rectangle {
    margin: 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: #fff;
    box-shadow: 0px 3px 14px 3px rgb(218, 239, 255);
    border-radius: 60px;
    padding: 15px;
    .left,
    .right {
      flex: 1;
      text-align: center;
      .text {
        font-weight: bold;
        padding-bottom: 10px;
        margin: 0;
      }
      .num {
        color: #0091ff;
        font-weight: bold;
        span {
          font-size: 24px;
        }
      }
    }
    .center {
      width: 1px;
      background: #ccc;
      height: 40px;
    }
  }
  .btn {
    margin: 20px;
    text-align: center;
    background: #0091ff;
    color: #fff;
    box-shadow: 0px 3px 14px 3px rgba(157, 213, 255, 1);
    padding: 15px 0;
    border-radius: 45px;
    font-size: 20px;
  }
  .close {
    text-align: center;
    margin: 15px 0;
    color: #666666;
    font-size: 18px;
  }
}
</style>
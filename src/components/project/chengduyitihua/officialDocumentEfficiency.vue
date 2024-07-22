<template>
  <div class="officialDocumentEfficiency">
    <van-tabs v-model="activeName">
      <van-tab title="全单位" name="1">
        <header class="header">{{ value }}</header>
        <div class="processingStatistics">
          <van-cell title="办件量统计" is-link value="详情分析" @click="jumpToProcessingStatistics" />
          <div class="content" v-if="showProcessingStatistics">
            <div class="left">
              <div class="gray">累计办件量</div>
              <div class="num">
                <span>{{ processingStatisticsData.ljbjl }}</span>件
              </div>
            </div>
            <div class="right" id="processingStatistics"></div>
          </div>
          <commonempty v-else description="暂无数据"></commonempty>
        </div>
        <div class="todoTime">
          <van-cell title="待办件耗时分析" is-link value="详情分析" @click="jumpToTodoTime" />
          <div class="tip">2023年1月1日 -今日</div>
          <div class="content" v-if="showTodoTime">
            <div id="todoTime"></div>
          </div>
          <commonempty v-else description="暂无数据"></commonempty>
        </div>
        <div class="accelerationRate">
          <van-cell title="提速率分析" is-link value="详情分析" @click="jumpAccelerationRate" />
          <div class="contanier" v-if="showAccelerationRate">
            <div class="averageShow">
              <div class="title">单位平均耗时</div>
              <div class="timer">
                <span>{{ accelerationRateData.accelerationTimer }}</span> 小时
                <div class="red">
                  {{ accelerationRateData.rate }} <span></span>
                </div>
              </div>
            </div>

            <div class="box">
              <div class="tabel">
                <div style="flex: 10">部门名称</div>
                <div style="flex: 9; text-align: center">平均耗时(小时)</div>
                <div style="flex: 10; text-align: right">环比提速率(%)</div>
              </div>
              <template v-for="item in accelerationRateList">
                <div class="item" :key="item.id" v-if="item.flag">
                  <div class="serialNumber" :style="{ background: item.id < 4 ? '#0086d9' : '' }">
                    {{ item.id }}
                  </div>
                  <div class="progress">
                    <div class="title">
                      <div style="flex: 10">{{ item.name }}</div>
                      <div style="flex: 9; text-align: center">
                        {{ item.accelerationTimer }}
                      </div>
                      <div style="flex: 10; text-align: right">
                        {{ item.rate }}
                      </div>
                    </div>
                    <van-progress :percentage="parseInt(item.rate) || 0" color="#0091FF" :show-pivot="false" stroke-width="6" />
                  </div>
                </div>
              </template>
              <div class="more" @click="mroe" v-if="accelerationRateList.length > 10 && flag">
                全部展示
              </div>
            </div>
          </div>
          <commonempty v-else description="暂无数据"></commonempty>
        </div>
        <div class="comprehensiveEfficiency">
          <van-cell title="综合效能指数评估" is-link value="详情分析" @click="jumpComprehensiveEfficiency" />
          <div class="contanier" v-if="showComprehensiveEfficiency">
            <div class="averageShow">
              <div class="title">单位效能</div>
              <div class="timer">
                <span>{{ comprehensiveEfficiencyData.fraction }}</span> 分
              </div>
            </div>

            <div class="box">
              <van-tabs v-model="active" type="card">
                <van-tab :title="item.name" v-for="(
                    item, index
                  ) in comprehensiveEfficiencyData.comprehensiveEfficiencyList" :key="index">
                  <div class="item" v-for="it in item.list" :key="it.id">
                    <div class="serialNumber" :style="{ background: it.id < 4 ? '#0086d9' : '' }">
                      {{ it.id }}
                    </div>
                    <div class="progress">
                      <div class="title">
                        <div style="flex: 4">{{ it.name }}</div>
                        <div style="flex: 2; text-align: right">
                          {{ it.fraction }}
                        </div>
                      </div>
                      <van-progress :percentage="it.fraction" color="#0091FF" :show-pivot="false" stroke-width="6" />
                    </div>
                  </div>
                </van-tab>
              </van-tabs>
            </div>
          </div>
          <commonempty v-else description="暂无数据"></commonempty>
        </div>
      </van-tab>
    </van-tabs>

    <!-- <van-popup v-model="show" position="bottom">
      <van-datetime-picker
        v-model="currentDate"
        type="year-month"
        title="选择年月"
        :min-date="minDate"
        :max-date="maxDate"
        :formatter="formatter"
        @confirm="confirm"
        @cancel="show = false"
      />
    </van-popup> -->
  </div>
</template>

<script>
import echarts from "echarts";
export default {
  name: "officialDocumentEfficiency",

  props: [],

  components: {},

  data() {
    return {
      processingStatisticsData: {
        ljbjl: 0,
      },
      showProcessingStatistics: true,
      showTodoTime: true,
      accelerationRateData: {
        accelerationTimer: 18.7,
        rate: "42.5",
      },
      accelerationRateList: [
        // {
        //   id: 1,
        //   name: "第一秘书处",
        //   accelerationTimer: 0.7,
        //   rate: "87.5%",
        // },
        // {
        //   id: 2,
        //   name: "第二秘书处",
        //   accelerationTimer: 0.7,
        //   rate: "87.5%",
        // },
        // {
        //   id: 3,
        //   name: "第三秘书处",
        //   accelerationTimer: 0.7,
        //   rate: "87.5%",
        // },
      ],
      showAccelerationRate: true,
      showComprehensiveEfficiency: true,
      comprehensiveEfficiencyData: {
        fraction: "0",
        comprehensiveEfficiencyList: [
          {
            name: "业务秘书处对比",
            list: [
              // {
              //   id: 1,
              //   name: "第一秘书处",
              //   fraction: "87",
              // },
              // {
              //   id: 2,
              //   name: "第二秘书处",
              //   fraction: "87",
              // },
              // {
              //   id: 3,
              //   name: "第三秘书处",
              //   fraction: "87",
              // },
            ],
          },
          {
            name: "其他处室对比",
            list: [
              // {
              //   id: 1,
              //   name: "第一秘书处",
              //   fraction: "87",
              // },
              // {
              //   id: 2,
              //   name: "第二秘书处",
              //   fraction: "87",
              // },
              // {
              //   id: 3,
              //   name: "第三秘书处",
              //   fraction: "87",
              // },
            ],
          },
          {
            name: "所有处室对比",
            list: [
              // {
              //   id: 1,
              //   name: "第一秘书处",
              //   fraction: "87",
              // },
              // {
              //   id: 2,
              //   name: "第二秘书处",
              //   fraction: "87",
              // },
              // {
              //   id: 3,
              //   name: "第三秘书处",
              //   fraction: "87",
              // },
            ],
          },
        ],
      },
      active: 1,
      flag: false,
      // show: false,
      // minDate: new Date(new Date().getFullYear() - 10, 0, 1),
      // maxDate: new Date(new Date().getFullYear() + 10, 11, 1),
      // currentDate: new Date(),
      value: moment().format("YYYY年MM月"),
      activeName: "1",
      efficiencySelectParams: {
        year: new Date().getFullYear(),
        month: new Date().getMonth() + 1,
        range: 1,
        fileType: "",
      },
    };
  },

  created() { },

  mounted() {
    this.$nextTick(() => {
      this.getProcessingStatisticsData();
      this.gettodoTimeData();
      this.getAccelerationRateData();
      this.getComprehensiveEfficiency();
    });
    // this.getProcessingStatisticsData();
    // this.gettodoTimeData();
  },

  activated() { },

  computed: {
    num() {
      if (this.active == 0) {
        return 1;
      } else if (this.active == 1) {
        return 2;
      } else {
        return 0;
      }
    },
  },

  watch: {
    active(n, o) {
      // console.log(n,o);
      this.getComprehensiveEfficiency();
    },
  },

  methods: {
    // 跳转办件量统计详情
    jumpToProcessingStatistics() {
      console.log("jumpTo");
      this.$router.push("/banjianDetail");
    },
    //画办件量统计echarts图
    processingStatisticsEcharts(percentage, data) {
      var chartDom = document.getElementById("processingStatistics");
      var myChart = echarts.init(chartDom);
      var option;

      option = {
        title: {
          text: "按时办结率",
          left: "48%",
          top: "36%",
          textAlign: "center",
          subtext: percentage,
          textStyle: {
            color: "#666",
            fontSize: 12,
          },
          subtextStyle: {
            color: "#0091FF",
            fontSize: 20,
            fontWeight: "bold",
          },
        },
        series: [
          {
            name: "Access From",
            type: "pie",
            radius: ["70%", "95%"],
            silent: true,
            avoidLabelOverlap: false,
            label: {
              show: false,
              position: "center",
              color: "#666666",
            },
            labelLine: {
              show: false,
            },
            data,
          },
        ],
      };
      option && myChart.setOption(option);
    },
    //获取办件量统计数据
    getProcessingStatisticsData() {
      let loading = dsf.layer.loading();
      let self = this;
      // self.processingStatisticsEcharts("75%", [
      //   {
      //     value: 75,
      //     itemStyle: { color: "#008CFF" },
      //   },
      //   { value: 25, itemStyle: { color: "#F0F4F7" } },
      // ]);

      dsf.http
        .post(
          "fn/efficiencySelect/processingVolumeStatistics",
          self.efficiencySelectParams
        )
        .then((res) => {
          dsf.layer.closeLoading(loading);

          if (res.data.type === "success") {
            const { ljbjl, hbsq, asbjl } = res.data.data;
            self.processingStatisticsData.ljbjl = ljbjl;
            self.processingStatisticsEcharts(asbjl, [
              {
                value: parseInt(asbjl),
                itemStyle: { color: "#008CFF" },
              },
              { value: 100 - parseInt(asbjl), itemStyle: { color: "#F0F4F7" } },
            ]);
          } else {
            dsf.layer.toast(res.data.message);
            self.showProcessingStatistics = false;
          }
        })
        .catch((err) => {
          dsf.layer.closeLoading(loading);
          self.showProcessingStatistics = false;
          console.log(err);
        });
    },
    // 跳转待办件耗时分析详情
    jumpToTodoTime() {
      console.log("jumpTo");
      this.$router.push("/daibanDetail");
    },
    //画待办件耗时分析echarts图
    todoTimeEcharts(percentage, data, total) {
      var chartDom = document.getElementById("todoTime");
      var myChart = echarts.init(chartDom);
      var option;

      option = {
        title: {
          text: "待办总数",
          left: "48%",
          top: "36%",
          textAlign: "center",
          subtext: percentage,
          textStyle: {
            color: "#666",
            fontSize: 12,
          },
          subtextStyle: {
            color: "#0091FF",
            fontSize: 20,
            fontWeight: "bold",
          },
        },
        series: [
          {
            name: "Access From",
            type: "pie",
            radius: ["45%", "66%"],
            silent: true,
            avoidLabelOverlap: false,
            label: {
              //展示文本设置
              normal: {
                show: true, //展示
                position: "outside", // outside表示文本显示位置为外部
                formatter: (event) => {
                  // console.log(222, event);
                  return (
                    event.name +
                    "\n\r" +
                    `占比${((event.value / total) * 100).toFixed(1)}%`
                  );
                },
              },
              emphasis: {
                //文本样式
                show: true, //展示
                textStyle: {
                  //文本样式
                  fontSize: "14",
                  fontWeight: "600",
                },
              },
            },
            labelLine: {
              //引导线设置
              show: true, //引导线显示
            },
            labelLine: {
              show: false,
            },
            data,
          },
        ],
      };
      option && myChart.setOption(option);
    },
    //获取待办件耗时分析数据
    gettodoTimeData() {
      let loading = dsf.layer.loading();
      let self = this;
      // self.todoTimeEcharts(
      //   "225",
      //   [
      //     {
      //       value: 1048,
      //       name: "超过72小时",
      //       itemStyle: { color: "#FF5454" },
      //     },
      //     { value: 735, name: "24小时内", itemStyle: { color: "#008CFF" } },
      //     { value: 735, name: "48--72小时", itemStyle: { color: "#FEAC00" } },
      //     { value: 735, name: "24-48小时", itemStyle: { color: "#FFE286" } },
      //   ],
      //   735 * 3 + 1048
      // );
      dsf.http
        .post("fn/efficiencySelect/timeConsumptionAnalysisOfPendingItems", {
          year: new Date().getFullYear(),
          month: new Date().getMonth() + 1,
          range: self.activeName,
        })
        .then((res) => {
          dsf.layer.closeLoading(loading);

          if (res.data.type === "success") {
            const { dbsl, hjddsc } = res.data.data;
            let temp = [
              {
                value: 0,
                name: "24小时内",
                itemStyle: { color: "#008CFF" },
              },

              {
                value: 0,
                name: "24-48小时",
                itemStyle: { color: "#FFE286" },
              },
              {
                value: 0,
                name: "48-72小时",
                itemStyle: { color: "#FEAC00" },
              },
              {
                value: 0,
                name: "超过72小时",
                itemStyle: { color: "#FF5454" },
              },
            ];
            let tempCur = []
            Object.keys(hjddsc).forEach((item, index) => {
              if (Number(hjddsc[item].replace("%", "")) !== 0) {
                temp[index].value = Number(hjddsc[item].replace("%", ""));
                tempCur.push(temp[index]);
              }
            });

            self.todoTimeEcharts(
              dbsl,
              tempCur,
              Number(hjddsc["72"].replace("%", "")) +
              Number(hjddsc["24-48"].replace("%", "")) +
              Number(hjddsc["48-72"].replace("%", "")) +
              Number(hjddsc["24"].replace("%", ""))
            );
          } else {
            dsf.layer.toast(res.data.message);
          }
        })
        .catch((err) => {
          dsf.layer.closeLoading(loading);
          self.showTodoTime = false;
          console.log(err);
        });
    },
    // 跳转提速率分析详情
    jumpAccelerationRate() {
      console.log("jumpTo");
      this.$router.push("/tisulvDetail");
    },
    //获取待办件耗时分析数据
    getAccelerationRateData() {
      let loading = dsf.layer.loading();
      let self = this;
      dsf.http
        .post("fn/efficiencySelect/accelerationRateAnalysis", {
          year: new Date().getFullYear(),
          month: new Date().getMonth() + 1,
        })
        .then((res) => {
          dsf.layer.closeLoading(loading);

          if (res.data.type === "success") {
            const { avgHbtsl, avgPjhs, hbtsl, deptList, pjhsList } =
              res.data.data;
            self.accelerationRateData.accelerationTimer = avgPjhs;
            self.accelerationRateData.rate = avgHbtsl;
            self.flag = deptList.length > 10 ? true : false;
            let bi = "";
            deptList.forEach((item, index) => {
              self.accelerationRateList.push({
                id: index + 1,
                name: item,
                flag: index <= 9 ? true : false,
              });
            });
            hbtsl.forEach((item, index) => {
              if (item.indexOf("%"))
                self.accelerationRateList[index].rate = item.slice(0, item.length - 1)
            });
            pjhsList.forEach((item, index) => {
              self.accelerationRateList[index].accelerationTimer = item;
            });
          } else {
            dsf.layer.toast(res.data.message);
          }
        })
        .catch((err) => {
          dsf.layer.closeLoading(loading);
          self.showAccelerationRate = false;
          console.log(err);
        });
    },
    //获取综合效能指数评估数据详情
    jumpComprehensiveEfficiency() {
      console.log("jumpTo");
      this.$router.push("/zongHeDetail");
    },
    //获取综合效能指数评估数据
    getComprehensiveEfficiency() {
      let loading = dsf.layer.loading();
      let self = this;
      dsf.http
        .post("fn/efficiencySelect/efficiencyIndexStatistic", {
          year: new Date().getFullYear(),
          month: new Date().getMonth() + 1,
          range: self.num,
        })
        .then((res) => {
          dsf.layer.closeLoading(loading);

          if (res.data.type === "success") {
            const { deptList, deptData } = res.data.data;
            self.comprehensiveEfficiencyData.comprehensiveEfficiencyList[
              self.active
            ].list = [];
            deptList.forEach((item, index) => {
              self.comprehensiveEfficiencyData.comprehensiveEfficiencyList[
                self.active
              ].list.push({
                id: index + 1,
                name: item,
                flag: index <= 9 ? true : false,
                fraction: "",
              });
            });
            self.comprehensiveEfficiencyData.comprehensiveEfficiencyList[
              self.active
            ].list.forEach((item, index) => {
              item.fraction = deptData[item.name].compositeScore;
            });
          } else {
            dsf.layer.toast(res.data.message);
          }
        })
        .catch((err) => {
          dsf.layer.closeLoading(loading);
          self.showTodoTime = false;
          console.log(err);
        });
      dsf.http
        .post("fn/efficiencySelect/efficiencyStatistic", {
          year: new Date().getFullYear(),
          month: new Date().getMonth() + 1,
          deptName: "",
        })
        .then((res) => {
          // dsf.layer.closeLoading(loading);

          if (res.data.type === "success") {
            const { unitComprehensiveEfficiency } = res.data.data;
            self.comprehensiveEfficiencyData.fraction =
              unitComprehensiveEfficiency.compositeScore;
          } else {
            dsf.layer.toast(res.data.message);
          }
        })
        .catch((err) => {
          // dsf.layer.closeLoading(loading);
          self.showTodoTime = false;
          console.log(err);
        });
    },
    //全部展示
    mroe() {
      this.flag = false;
      this.accelerationRateList.forEach((item) => {
        item.flag = true;
      });
    },
    // formatter(type, val) {
    //   if (type === "year") {
    //     return `${val}年`;
    //   } else if (type === "month") {
    //     return `${val}月`;
    //   }
    //   return val;
    // },
    // confirm(value) {
    //   this.value = moment(value).format("YYYY年MM月");
    //   this.show = false;
    //   this.efficiencySelectParams.year = new Date(value).getFullYear();
    //   this.efficiencySelectParams.month = new Date(value).getMonth() + 1;
    // },
  },
};
</script>

<style scoped lang='scss'>
@import "../../../assets/styles/themes.scss";
@import "../../../assets/styles/mixin.scss";
.header {
  width: 30vw;
  padding: 10px 0;
  margin: 10px auto;
  background: #fff;
  text-align: center;
  border-radius: 20px;
}
.gray {
  color: gray;
}
.processingStatistics,
.todoTime,
.accelerationRate,
.comprehensiveEfficiency {
  background: #fff;
  border: 1px solid rgba(230, 230, 230, 1);
  box-shadow: 0px 0px 12px 0px rgba(0, 0, 0, 0.08);
  border-radius: 6px;
  margin: 0 10px;
  .content {
    height: 150px;
    display: flex;
    align-items: center;
    padding: 0 10px 15px;
    .left {
      .num {
        font-size: 20px;
        font-weight: bold;
        color: #333;
      }
    }
    .right {
      padding: 0 15px;
      flex: 1;
      height: 100%;
    }
  }
}
.todoTime {
  margin-top: 15px;
  .tip {
    padding-left: 10px;
    color: gray;
  }

  .content {
    height: 200px;
    #todoTime {
      height: 100%;
      width: 100%;
    }
  }
}
.accelerationRate {
  margin-top: 15px;
  .contanier {
    .averageShow {
      margin: 0px 15px 15px;
      border: 1px solid #ccc;
      .title {
        padding: 10px 0 0;
        text-align: center;
      }
      .timer {
        text-align: center;
        position: relative;
        padding: 10px 0;
        span {
          font-size: 20px;
          font-weight: bold;
        }
        .red {
          color: red;
          font-size: 18px;
          position: absolute;
          top: 50%;
          left: 66%;
          transform: translateY(-50%);
          span {
            width: 0;
            height: 0;
            border-left: 5px solid transparent;
            border-right: 5px solid transparent;
            border-bottom: 5px solid red;
            position: relative;
            top: -10px;
            left: 10px;
          }
        }
      }
    }
    .box {
      padding: 0 10px;
      .tabel {
        display: flex;
        align-items: center;
        justify-content: space-between;
        color: gray;
        padding-left: 30px;
        margin-bottom: 10px;
      }
      .item {
        display: flex;
        align-items: center;
        margin-bottom: 15px;
        .serialNumber {
          width: 24px;
          height: 24px;
          line-height: 24px;
          border-radius: 50%;
          text-align: center;
          // background: #0086d9;
          background: #c2ced5;
          color: #fff;
          margin-right: 10px;
        }
        .progress {
          flex: 1;
          .title {
            display: flex;
            justify-content: space-between;
          }
        }
      }
    }
  }
}
.comprehensiveEfficiency {
  // margin-top: 0.3rem;
  margin: 15px 10px 15px;
  .contanier {
    .averageShow {
      margin: 0px 15px 15px;
      border: 1px solid #ccc;
      .title {
        padding: 10px 0 0;
        text-align: center;
      }
      .timer {
        text-align: center;
        position: relative;
        padding: 10px 0;
        span {
          font-size: 20px;
          font-weight: bold;
        }
      }
    }
    .box {
      padding: 0 10px;
      .tabel {
        display: flex;
        align-items: center;
        justify-content: space-between;
        color: gray;
        padding-left: 30px;
        margin-bottom: 10px;
      }
      .item {
        display: flex;
        align-items: center;
        margin-bottom: 15px;
        .serialNumber {
          width: 24px;
          height: 24px;
          line-height: 24px;
          border-radius: 50%;
          text-align: center;
          // background: #0086d9;
          background: #c2ced5;
          color: #fff;
          margin-right: 10px;
        }
        .progress {
          flex: 1;
          .title {
            display: flex;
            justify-content: space-between;
          }
        }
      }
    }
  }
  ::v-deep .van-tabs__wrap {
    height: 40px;
    .van-tabs__nav {
      box-sizing: border-box;
      height: 40px;
      border-radius: 30px;
      background: #f4f4f4;
      margin: 0;
      border: 0;
    }
    .van-tab--active {
      background: #008cff;
      .van-tab__text {
        color: #fff !important;
      }
    }
    .van-tab {
      line-height: 40px;
      border-radius: 30px;
      border: 0;
      .van-tab__text {
        color: #333;
        font-size: 14px;
      }
    }
  }
}
::v-deep .van-cell__title {
  position: relative;
  span {
    font-weight: bold;
  }
}
::v-deep .van-tabs__wrap {
  margin-bottom: 15px;
}
::v-deep .van-cell__title {
  font-size: 16px;
}
::v-deep .van-cell__title::before {
  content: "";
  width: 4px;
  height: 15px;
  background: #008cff;
  display: block;
  position: absolute;
  top: 50%;
  left: -8px;
  transform: translateY(-50%);
}
</style>
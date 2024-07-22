<template>
  <div class="zongHeDetail">
    <div class="bg">
      <header>
        <div class="calendar" @click="show = true">
          {{ value }} <span class="jiantou"></span>
        </div>
      </header>
      <div class="db_box" v-if="dwShow">
        <div class="text">单位效能指数</div>
        <div class="num">
          <span>{{ unitComprehensiveEfficiency.compositeScore }}</span>
        </div>
        <div class="huanBi">
          <div class="text">
            环比
            <span class="red"
              >{{ unitComprehensiveEfficiency.hb }} <span></span
            ></span>
          </div>
        </div>
        <div class="content1">
          <div class="left">
            <div class="title">累计办件量</div>
            <div class="num">
              {{ unitComprehensiveEfficiency.bjl }}
            </div>
          </div>
          <div class="center"></div>
          <div class="right">
            <div class="title">平均耗时</div>
            <div class="num">
              {{ unitComprehensiveEfficiency.pjhs }}
            </div>
          </div>
        </div>
        <div class="content2">
          <div class="left">
            <div class="title">按时办结率</div>
            <div class="num">{{ unitComprehensiveEfficiency.asbjl }}</div>
          </div>
          <div class="center">
            <div class="title">流程处理率</div>
            <div class="num">{{ unitComprehensiveEfficiency.lccll }}</div>
          </div>
          <div class="right">
            <div class="title">超长期待办率</div>
            <div class="num">{{ unitComprehensiveEfficiency.ccqdbl }}</div>
          </div>
        </div>
      </div>
      <commonempty
        v-else
        style="background: #fff; border-radius: 10px"
        description="数据获取失败"
      ></commonempty>
    </div>
    <div class="geChuShi">
      <div class="boxTitle">
        <div class="title">
          <div class="">
            <span class="blue"></span>
            <span class="yellow"></span>
            <span class="bold">各处室办件量分析</span>
          </div>
        </div>
        <div class="select" @click="selectDept">
          {{ select }}
        </div>
      </div>

      <div class="box" v-if="geChuShiData.list.length != 0">
        <template v-for="item in geChuShiData.list">
          <div class="item" :key="item.id" v-if="item.flag">
            <div class="one">
              <div class="left">
                {{ item.name }}
              </div>
              <div class="right">效能得分:{{ item.fen }}</div>
            </div>
            <div class="two">
              <div class="left"><span>办件量：</span>{{ item.num }}</div>
              <div class="right"><span> 平均耗时：</span>{{ item.time }}</div>
            </div>
            <div class="three">
              <div class="left"><span>按时办结率:</span>{{ item.anShiLv }}</div>
              <div class="center">
                <span>流程处理率:</span>{{ item.liuChengLv }}
              </div>
              <div class="right">
                <span>超长期待办率:</span>{{ item.chaoChangLv }}
              </div>
            </div>
          </div>
        </template>

        <div class="more" @click="mroe" v-if="geChuShiData.total > 10 && flag">
          全部展示
        </div>
      </div>
      <commonempty
        v-else
        style="background: #fff; border-radius: 10px"
        description="数据获取失败"
      ></commonempty>
    </div>
    <div class="zongHe">
      <div class="boxTitle">
        <div class="title">
          <div class="">
            <span class="blue"></span>
            <span class="yellow"></span>
            <span class="bold">各处室办件量分析</span>
          </div>
        </div>
        <div class="select" @click="seDept">
          {{ curParams.deptName}}
        </div>
      </div>
      <div class="text">
        说明：每项指标按满分100分计算，图形面积越大，综合得分越高。
      </div>
      <div class="zongHeEcharts" id="zongHeEcharts"></div>
    </div>
    <van-popup v-model="show" position="bottom">
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
    </van-popup>
    <van-popup v-model="showDept" position="bottom">
      <van-picker
        title="选择部门"
        show-toolbar
        :columns="columns"
        @confirm="onConfirm"
        @cancel="showDept = false"
      />
    </van-popup>
  </div>
</template>

<script>
export default {
  name: "zongHeDetail",

  props: [],

  components: {},

  data() {
    return {
      dwShow: true,
      geChuShiData: {
        total: 0,
        list: [
          // {
          //   name: "第二秘书处",
          //   id: 1,
          //   fen: 12,
          //   num: 14,
          //   time: 1.4,
          //   anShiLv: "8.7",
          //   liuChengLv: "8.7",
          //   chaoChangLv: "8.7",
          // },
          // {
          //   name: "第二秘书处",
          //   id: 2,
          //   fen: 12,
          //   num: 14,
          //   time: 1.4,
          //   anShiLv: "8.7",
          //   liuChengLv: "8.7",
          //   chaoChangLv: "8.7",
          // },
          // {
          //   name: "第二秘书处",
          //   id: 3,
          //   fen: 12,
          //   num: 14,
          //   time: 1.4,
          //   anShiLv: "8.7",
          //   liuChengLv: "8.7",
          //   chaoChangLv: "8.7",
          // },
        ],
      },
      unitComprehensiveEfficiency: {
        compositeScore: 0,
        hb: "0%",
        bjl: 0,
        pjhs: 0,
        asbjl: "0%",
        lccll: "0%",
        ccqdbl: "0%",
      },
      show: false,
      showDept: false,
      flag: false,
      minDate: new Date(new Date().getFullYear() - 5, 0, 1),
      maxDate: new Date(new Date().getFullYear(), 11, 1),
      currentDate: new Date(),
      value: moment().format("YYYY年MM月"),
      params: {
        year: new Date().getFullYear(),
        month: new Date().getMonth() + 1,
        range: 1,
      },
      curParams: {
        year: new Date().getFullYear(),
        month: new Date().getMonth() + 1,
        deptName: dsf.util.loadSessionStore("user")?.deptName || "",
      },
      columns: [],
      select: "业务秘书处对比",
      depts: [],
    };
  },

  created() {},

  mounted() {
    this.$nextTick(() => {
      this.params.range = 1;
      this.getGeChuShiData();
      this.getZongHeEchartsData();
      this.getDeptData();
    });
    // this.zongHeEcharts();
  },

  activated() {},

  computed: {},

  watch: {},

  methods: {
    mroe() {
      this.flag = false;
      this.geChuShiData.list.forEach((item) => {
        item.flag = true;
      });
    },
    //画综合效能维度分析echarts图
    zongHeEcharts(data, indicator, unitData, deptData) {
      var chartDom = document.getElementById("zongHeEcharts");
      var myChart = echarts.init(chartDom);
      var option;

      option = {
        // title: {
        //   text: "Basic Radar Chart",
        // },
        legend: {
          data,
          bottom: "2%",
          left: "center",
        },
        radar: {
          // shape: 'circle',
          indicator,
          name: {
            textStyle: {
              color: "#333",
              fontWeight: "bold",
            },
          },
          radius: "60%",
        },
        series: [
          {
            // name: "Budget vs spending",
            type: "radar",
            data: [
              {
                value: unitData,
                name: "全单位",
                itemStyle: { color: "#0091FF" },
                areaStyle: {
                  color: "#A9DAFF",
                },
                // itemStyle: {
                //   borderColor: "#A9DAFF",
                // },
              },
              {
                value: deptData,
                name: "第七秘书处",
                areaStyle: {
                  color: "rgba(224,32,32,0.22)",
                },
                // itemStyle: {
                //   borderColor: "rgba(255,114,114,1)",
                // },
              },
            ],
          },
        ],
      };
      option && myChart.setOption(option);
    },
    confirm(value) {
      this.value = moment(value).format("YYYY年MM月");
      this.show = false;
      this.params.year = new Date(value).getFullYear();
      this.params.month = new Date(value).getMonth() + 1;
      this.curParams.year = new Date(value).getFullYear();
      this.curParams.month = new Date(value).getMonth() + 1;
      this.getGeChuShiData();
      this.getZongHeEchartsData();
    },
    onConfirm(value, index) {
      if (["业务秘书处对比", "其他处室对比", "所有处室对比"].includes(value)) {
        this.select = value;
        if (index == 0) {
          this.params.range = 1;
        } else if (index == 1) {
          this.params.range = 2;
        } else {
          this.params.range = 0;
        }
        this.getGeChuShiData();
      }else{
        this.curParams.deptName=value;
        this.getZongHeEchartsData();
      }
      this.showDept = false;
    },
    formatter(type, val) {
      if (type === "year") {
        return `${val}年`;
      } else if (type === "month") {
        return `${val}月`;
      }
      return val;
    },
    getGeChuShiData() {
      let loading = dsf.layer.loading();
      let self = this;
      dsf.http
        .post("fn/efficiencySelect/efficiencyIndexStatistic", self.params)
        .then((res) => {
          dsf.layer.closeLoading(loading);

          if (res.data.type === "success") {
            const { deptList, deptData } = res.data.data;
            self.geChuShiData.list = [];
            self.geChuShiData.total = deptList.length;
            self.flag = deptList.length > 10 ? true : false;
            deptList.forEach((item, index) => {
              self.geChuShiData.list.push({
                id: index + 1,
                name: item,
                flag: index <= 9 ? true : false,
                fen: "",
                num: "",
                time: "",
                anShiLv: "",
                liuChengLv: "",
                chaoChangLv: "",
              });
            });
            self.geChuShiData.list.forEach((item, index) => {
              item.fen = deptData[item.name].compositeScore;
              item.num = deptData[item.name].bjl;
              item.time = deptData[item.name].pjhs;
              item.anShiLv = deptData[item.name].asbjl;
              item.liuChengLv = deptData[item.name].lccll;
              item.chaoChangLv = deptData[item.name].ccqdbl;
            });
          } else {
            dsf.layer.toast(res.data.message);
            self.geChuShiData.list=[];
          }
        })
        .catch((err) => {
          dsf.layer.closeLoading(loading);
          self.geChuShiData.list=[];
          console.log(err);
        });
    },
    selectDept() {
      this.columns = ["业务秘书处对比", "其他处室对比", "所有处室对比"];
      this.showDept = true;
    },
    getZongHeEchartsData() {
      let loading = dsf.layer.loading();
      let self = this;
      dsf.http
        .post("fn/efficiencySelect/efficiencyStatistic", self.curParams)
        .then((res) => {
          dsf.layer.closeLoading(loading);

          if (res.data.type === "success") {
            const { unitComprehensiveEfficiency, dimensionalAnalysis } =
              res.data.data;
            self.unitComprehensiveEfficiency = unitComprehensiveEfficiency;
            let max =
              dimensionalAnalysis.deptData.bjl >
              dimensionalAnalysis.unitData.bjl
                ? dimensionalAnalysis.deptData.bjl
                : dimensionalAnalysis.unitData.bjl;
            let Tmax =
              dimensionalAnalysis.deptData.pjhs >
              dimensionalAnalysis.unitData.pjhs
                ? dimensionalAnalysis.deptData.pjhs
                : dimensionalAnalysis.unitData.pjhs;
            let data = ["全单位"];
            let indicator = [
              { name: "办件量", max: Number((max * 2).toFixed()) },
              { name: "平均耗时", max: Number(Tmax * 2) },
              { name: "按时办结率", max: 100 },
              { name: "流程处理率", max: 100 },
              {
                name: "超长期待办率",
                max:
                  dimensionalAnalysis.deptData.ccqdbl == "0.0%" &&
                  dimensionalAnalysis.unitData.ccqdbl == "0.0%"
                    ? 0
                    : 100,
              },
            ];
            data[1] = self.curParams.deptName;
            let unitData = [];
            let deptData = [];
            dimensionalAnalysis.items.forEach((item, index) => {
              if (index == 0) {
                unitData[index] = dimensionalAnalysis.unitData.bjl;
                deptData[index] = dimensionalAnalysis.deptData.bjl;
              } else if (index == 1) {
                unitData[index] = dimensionalAnalysis.unitData.pjhs;
                deptData[index] = dimensionalAnalysis.deptData.pjhs;
              } else if (index == 2) {
                unitData[index] = parseInt(dimensionalAnalysis.unitData.asbjl);
                deptData[index] = parseInt(dimensionalAnalysis.deptData.asbjl);
              } else if (index == 3) {
                unitData[index] = parseInt(dimensionalAnalysis.unitData.lccll);
                deptData[index] = parseInt(dimensionalAnalysis.deptData.lccll);
              } else {
                unitData[index] = parseInt(dimensionalAnalysis.unitData.ccqdbl);
                deptData[index] = parseInt(dimensionalAnalysis.deptData.ccqdbl);
              }
            });
            this.zongHeEcharts(data, indicator, unitData, deptData);
          } else {
            dsf.layer.toast(res.data.message);
            self.dwShow = false;
          }
        })
        .catch((err) => {
          dsf.layer.closeLoading(loading);
          self.dwShow = false;
          console.log(err);
        });
    },
    getDeptData() {
      let loading = dsf.layer.loading();
      let self = this;
      dsf.http
        .post("fn/efficiencySelect/getAllDept")
        .then((res) => {
          dsf.layer.closeLoading(loading);

          if (res.data.type === "success") {
            const { data } = res.data;
            self.depts = [];
            data.forEach((item) => {
              self.depts.push(item.text);
            });
          } else {
            dsf.layer.toast(res.data.message);
            // self.geChuShiData.list=[];
          }
        })
        .catch((err) => {
          dsf.layer.closeLoading(loading);
          // self.dwShow=false;
          console.log(err);
        });
    },
    seDept() {
      this.columns = this.depts;
      this.showDept = true;
    },
  },
};
</script>

<style scoped lang='scss'>
.zongHeDetail {
  .bg {
    padding: 10px;
    background-image: linear-gradient(
      180deg,
      #008cff 0%,
      rgba(0, 140, 255, 0.59) 42%,
      rgba(255, 255, 255, 0) 100%
    );
    header {
      text-align: center;
      .calendar {
        background: rgba(255, 255, 255, 0.33);
        border-radius: 37px;
        padding: 10px 15px;
        color: #fff;
        margin: 0.1rem auto 0.3rem;
        /* width: 130px; */
        /* position: relative; */
        display: inline-block;
      }
      .jiantou {
        display: inline-block;
        border-left: 6px solid transparent;
        border-right: 6px solid transparent;
        border-top: 6px solid #fff;
      }
    }
    .db_box {
      background: #fff;
      border-radius: 10px;
      overflow: auto;
      .text {
        color: #333333;
        /* letter-spacing: 0; */
        text-align: center;
        font-size: 16px;
        margin: 10px 0;
      }
      .num {
        text-align: center;
        margin: 15px 0;
        font-weight: bold;
        span {
          font-size: 20px;
        }
      }
      .huanBi {
        text-align: center;
        .text {
          .red {
            color: red;
            font-size: 18px;
            span {
              border-left: 5px solid transparent;
              border-right: 5px solid transparent;
              border-bottom: 5px solid red;
              position: relative;
              top: -12px;
              left: 4px;
            }
          }
        }
      }
      .content1 {
        display: flex;
        justify-content: space-evenly;
        align-items: center;
        .left,
        .center,
        .right {
          flex: 1;
          text-align: center;
          position: relative;
          .num {
            font-size: 20px;
          }
        }
        .center {
          width: 1px;
          height: 50px;
          flex: none;
          background: #ccc;
        }
      }
      .content2 {
        display: flex;
        justify-content: space-evenly;
        .left,
        .center,
        .right {
          flex: 1;
          text-align: center;
          position: relative;
          .num {
            font-size: 20px;
          }
        }
        .center::before {
          display: block;
          content: "";
          width: 1px;
          height: 80%;
          background: #ccc;
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          right: 0;
        }
        .center::after {
          display: block;
          content: "";
          width: 1px;
          height: 80%;
          background: #ccc;
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          left: 0;
        }
      }
    }
  }
  .geChuShi {
    margin: 10px;
    background: #fff;
    border-radius: 10px;
    overflow: auto;
    padding: 0 10px;
    .boxTitle {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 15px 0;
      .title {
        // padding: 10px 15px;

        .blue {
          border-radius: 50%;
          width: 16px;
          height: 16px;
          background: rgba(115, 176, 223, 0.74);
          display: inline-block;
          opacity: 0.6;
        }

        .yellow {
          border-radius: 50%;
          width: 16px;
          height: 16px;
          background: rgba(247, 181, 0, 0.49);
          display: inline-block;
          opacity: 0.6;
          margin-left: -10px;
        }

        .bold {
          font-weight: bold;
        }
      }
      .select {
        background: #eeeeee;
        border-radius: 6px;
        padding: 6px 24px 6px 10px;
        color: #666;
        font-weight: bold;
        position: relative;
      }
      .select::before {
        display: block;
        content: "";
        border-left: 6px solid transparent;
        border-right: 6px solid transparent;
        border-top: 6px solid #666;
        position: absolute;
        top: 50%;
        right: 8px;
        transform: translateY(-50%);
      }
    }
    .box {
      .item {
        padding: 10px 0;
        border-bottom: 1px solid #ccc;
        .one,
        .two,
        .three {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .one {
          margin-bottom: 10px;
          .left {
            font-size: 16px;
            font-weight: bold;
          }
          .right {
            color: #0091ff;
            font-weight: bold;
            font-size: 14px;
            /* background: #0091ff; */
            background: rgba(0, 145, 255, 0.1);
            border-radius: 29px;
            padding: 8px 15px;
          }
        }
        .two,
        .three {
          margin: 10px 0;
          .left,
          .center,
          .right {
            span {
              color: #666;
              font-weight: bold;
            }
          }
        }
        .three {
          font-size: 13px;
        }
      }
      .more {
        text-align: center;
        margin: 15px 0;
        color: #0091ff;
      }
    }
  }
  .zongHe {
    margin: 10px;
    background: #fff;
    border-radius: 10px;
    overflow: auto;
    padding: 0 10px;
    .boxTitle {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 15px 0;
      .title {
        // padding: 10px 15px;

        .blue {
          border-radius: 50%;
          width: 16px;
          height: 16px;
          background: rgba(115, 176, 223, 0.74);
          display: inline-block;
          opacity: 0.6;
        }

        .yellow {
          border-radius: 50%;
          width: 16px;
          height: 16px;
          background: rgba(247, 181, 0, 0.49);
          display: inline-block;
          opacity: 0.6;
          margin-left: -10px;
        }

        .bold {
          font-weight: bold;
        }
      }
      .select {
        background: #eeeeee;
        border-radius: 6px;
        padding: 6px 24px 6px 10px;
        color: #666;
        font-weight: bold;
        position: relative;
      }
      .select::before {
        display: block;
        content: "";
        border-left: 6px solid transparent;
        border-right: 6px solid transparent;
        border-top: 6px solid #666;
        position: absolute;
        top: 50%;
        right: 8px;
        transform: translateY(-50%);
      }
    }
    .text {
      color: #cccccc;
      font-size: 12px;
    }
    .zongHeEcharts {
      height: 200px;
      width: 100%;
    }
  }
}
</style>
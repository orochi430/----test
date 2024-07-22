<template>
  <div class="daibanDetail">
    <div class="bg">
      <div class="btn" @click="viewTZ">查看台账</div>
      <div class="db_box" v-if="dbShow">
        <div class="text">待办件数量</div>
        <div class="num">
          <span>{{ dbjdpjhs.dbjsl }}</span> 件
        </div>
        <div class="content">
          <div class="left">
            <div class="title">特提(件)</div>
            <div class="num">
              {{ dbjjjsljs.tt }}
            </div>
          </div>
          <div class="center">
            <div class="title">特急(件)</div>
            <div class="num">
              {{ dbjjjsljs.tj }}
            </div>
          </div>
          <div class="right">
            <div class="title">加急(件)</div>
            <div class="num">
              {{ dbjjjsljs.jj }}
            </div>
          </div>
        </div>
      </div>
      <commonempty
        v-else
        style="background: #fff; border-radius: 10px"
        description="数据获取失败"
      ></commonempty>
    </div>
    <div class="hs_box">
      <div class="title">
        <div class="">
          <span class="blue"></span>
          <span class="yellow"></span>
          <span class="bold">待办件各耗时频段数量</span>
        </div>
      </div>
      <div class="text">平均等待时长</div>
      <div class="num">
        <span>{{ dbjdpjhs.pjddsc }}</span> 小时
      </div>
      <div class="content">
        <div
          class="item"
          v-for="(item, index) in contentList.list"
          :key="index"
        >
          <div class="gezhi" :style="{ background: item.color }"></div>
          <div class="gray">{{ item.text }}</div>
          <div class="num">{{ item.num }}</div>
        </div>
        <div class="yanse">
          <div
            v-for="(item, index) in contentList.list"
            :key="index"
            :style="{
              width: (item.num / contentList.total) * 100 + '%',
              background: item.color,
            }"
          ></div>
        </div>
      </div>
    </div>
    <div class="cs_box">
      <div class="title">
        <div class="">
          <span class="blue"></span>
          <span class="yellow"></span>
          <span class="bold">各处室待办情况分析</span>
        </div>
        <div class="text">说明：按平均等待时长排序</div>
      </div>
      <div class="box">
        <div class="tabel">
          <div style="flex: 3">处室名称</div>
          <div style="flex: 2; text-align: center">待办量</div>
          <div style="flex: 3; text-align: right">平均耗时(小时)</div>
        </div>
        <template v-for="item in csData.csList">
          <div class="item" :key="item.id" v-if="item.flag">
            <div class="radius">
              <div
                class="serialNumber"
                :style="{ background: item.id < 4 ? '#0086d9' : '' }"
              >
                {{ item.id }}
              </div>
            </div>

            <div class="progress">
              <div class="title">
                <div style="flex: 3">{{ item.name }}</div>
                <div style="text-align: center; flex: 2">
                  {{ item.accelerationTimer }}
                </div>
                <div style="flex: 3; text-align: right">
                  {{ item.rate }}
                </div>
              </div>
              <van-progress
                :percentage="parseInt(item.rate2)"
                color="#0091FF"
                :show-pivot="false"
                stroke-width="6"
              />
            </div></div
        ></template>

        <div class="more" @click="mroe" v-if="csData.total > 10 && flag">
          全部展示
        </div>
      </div>
    </div>
    <div class="yw_box">
      <div class="title">
        <div class="">
          <span class="blue"></span>
          <span class="yellow"></span>
          <span class="bold">待办业务类型占比</span>
        </div>
      </div>

      <div class="ywEcharts" id="ywEcharts"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "daibanDetail",

  props: [],

  components: {},

  data() {
    return {
      dbShow: true,
      showPop: false,
      flag: false,
      contentList: {
        total: 0,
        list: [
          {
            num: 0,
            color: "#0091FF",
            text: "24小时内",
          },
          {
            num: 0,
            color: "#FFBC05",
            text: "24-48小时",
          },
          {
            num: 0,
            color: " #FA6400",
            text: "48-72小时",
          },
          {
            num: 0,
            color: "#E02020",
            text: "超过72小时",
          },
        ],
      },
      csData: {
        total: 12,
        csList: [
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
      },
      dbjjjsljs: {
        tt: 0,
        jj: 0,
        tj: 0,
      },
      dbjdpjhs: {
        24: 0,
        72: 0,
        "48-72": 1,
        "24-48percentage": "0.0%",
        "72percentage": "0.0%",
        "24-48": 0,
        "24percentage": "0.0%",
        pjddsc: "",
        dbjsl: "",
        "48-72percentage": "100.0%",
      },
    };
  },

  created() {
    
  },

  mounted() {
    // this.ywEcharts();
    this.getDbData();
  },

  activated() {},

  computed: {},

  watch: {},

  methods: {
    //画待办业务类型占比echarts图
    ywEcharts(data) {
      var chartDom = document.getElementById("ywEcharts");
      var myChart = echarts.init(chartDom);
      var option;

      option = {
        tooltip: {
          trigger: "item",
        },
        legend: {
          top: "center",
          right: "12%",
          orient: "vertical",
          textStyle: {
            fontWeight: "bold",
          },
        },
        series: [
          {
            name: "Access From",
            type: "pie",
            radius: ["40%", "70%"],
            right: "36%",
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
    //获取待办件数量数据
    getDbData() {
      let loading = dsf.layer.loading();
      let self = this;
      dsf.http
        .post(
          "fn/efficiencySelect/timeConsumptionAnalysisOfPendingItemsDetails",
          {
            year: new Date().getFullYear(),
            month: new Date().getMonth() + 1,
          }
        )
        .then((res) => {
          dsf.layer.closeLoading(loading);

          if (res.data.type === "success") {
            const { dbjdpjhs, dbywlxzb, gcsdbqkfx, dbjjjsljs } = res.data.data;
            self.dbjjjsljs = dbjjjsljs;
            self.dbjdpjhs = dbjdpjhs;
            self.contentList.total =
              dbjdpjhs["24"] +
              dbjdpjhs["24-48"] +
              dbjdpjhs["48-72"] +
              dbjdpjhs["72"];
            self.contentList.list.forEach((item) => {
              if (item.text == "24小时内") {
                item.num = dbjdpjhs["24"];
              } else if (item.text == "24-48小时") {
                item.num = dbjdpjhs["24-48"];
              } else if (item.text == "48-72小时") {
                item.num = dbjdpjhs["48-72"];
              } else {
                item.num = dbjdpjhs["72"];
              }
            });
            self.csData.total = gcsdbqkfx.length;
            // if( self.csData.total==0){
            //   self.geChuShiShow=false;
            // }
            let bi = "",maxNum=0;
            gcsdbqkfx.forEach((item, index) => {
              maxNum=item.pjhs>maxNum?item.pjhs:maxNum;
            })
            bi = 100 / Number(maxNum);
            self.flag = gcsdbqkfx.length > 10 ? true : false;
            gcsdbqkfx.forEach((item, index) => {
              self.csData.csList.push({
                id: index + 1,
                name: item.csmc,
                accelerationTimer: item.dbl,
                rate2:  (Number(item.pjhs) * bi
              ).toFixed() + "%",
                rate:  Number(item.pjhs),
                flag: index <= 9 ? true : false,
              });
            });
            self.ywEcharts([
              {
                value: parseInt(dbywlxzb.fw),
                name: "发文   "+dbywlxzb.fw,
                itemStyle: { color: "#0091FF" },
              },
              {
                value: parseInt(dbywlxzb.lw),
                name: "收文   "+dbywlxzb.lw,
                itemStyle: { color: "#FFB006" },
              },
            ]);
            
          } else {
            dsf.layer.toast(res.data.message);
            self.dbShow = false;
          }
        })
        .catch((err) => {
          dsf.layer.closeLoading(loading);
          self.dbShow = false;
          console.log(err);
        });
    },
    // 点击查看台账
    viewTZ() {
      // this.showPop = true;
      this.$router.push({
        path:"/commonList?fileType=cktz&title=待办台账"
      })
    },

    //全部展示
    mroe() {
      this.flag = false;
      this.csData.csList.forEach((item) => {
        item.flag = true;
      });
    },
  },
};
</script>

<style scoped lang='scss'>
.daibanDetail {
  .bg {
    padding: 10px;
    background-image: linear-gradient(
      180deg,
      #008cff 0%,
      rgba(0, 140, 255, 0.59) 42%,
      rgba(255, 255, 255, 0) 100%
    );
    .btn {
      background: rgba(255, 255, 255, 0.33);
      border-radius: 37px;
      padding: 10px 0;
      width: 30vw;
      margin: 15px auto;
      text-align: center;
      color: #fff;
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
      .content {
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
  .hs_box {
    margin: 10px;
    background: #fff;
    border-radius: 10px;
    overflow: auto;
    .title {
      padding: 10px 15px;

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
    .content {
      display: flex;
      justify-content: center;
      flex-wrap: wrap;
      align-content: center;
      .item {
        width: 40vw;
        display: flex;
        align-items: center;
        justify-content: flex-start;
        margin-bottom: 10px;
        .gezhi {
          width: 10px;
          height: 10px;
          margin: 0 6px;
        }
        .gray {
          color: #999;
          flex: 3;
        }
        .num {
          text-align: left;
          margin: 0;
          flex: 2;
          //   width: 30px;
          font-size: 20px;
        }
      }
      .yanse {
        height: 16px;
        width: 100%;
        display: flex;
        align-items: center;
        margin-bottom: 15px;
        padding: 0 10px;
        div {
          height: 100%;
        }
      }
    }
  }
  .cs_box {
    margin: 10px;
    background: #fff;
    border-radius: 10px;
    overflow: auto;
    .title {
      padding: 10px 15px;

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
      .text {
        color: #cccccc;
        font-size: 12px;
      }
    }
    .box {
      //   padding: 0 10px;
      .tabel {
        display: flex;
        align-items: center;
        justify-content: space-between;
        color: gray;
        padding: 0 10px 0 50px;
        margin-bottom: 10px;
      }
      .item {
        display: flex;
        align-items: center;
        margin-bottom: 15px;
        .radius {
          padding: 0 5px 0 15px;
          width: 50px;
          box-sizing: border-box;
          .serialNumber {
            width: 24px;
            height: 24px;
            line-height: 24px;
            border-radius: 50%;
            text-align: center;
            //   background: #0086d9;
            background: #c2ced5;
            color: #fff;
            // margin: 0 5px 0 15px;
          }
        }

        .progress {
          flex: 1;
          padding-right: 10px;
          min-width: 0;
          .title {
            display: flex;
            justify-content: space-between;
            padding: 0;
          }
        }
      }
      .more {
        text-align: center;
        margin: 10px 0;
        color: #0091ff;
      }
    }
  }
  .yw_box {
    margin: 10px;
    background: #fff;
    border-radius: 10px;
    overflow: auto;
    .title {
      padding: 10px 15px;

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
    .ywEcharts {
      height: 200px;
      width: 100%;
    }
  }
}
</style>
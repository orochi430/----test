<template>
  <div class="personalAttendance">
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
      <div class="content">
        {{ new Date().getFullYear() }}年{{
          +new Date().getMonth() + 1
        }}月个人考勤记录
      </div>
      <div class="box" v-if="obj.datas.length != 0">
        <div class="charts_box">
          <div class="charts_title">出勤情况</div>
          <div class="charts-info">
            <div class="charts-info-container">
              <div class="num num1">{{ cdts }}</div>
              <div class="desc">迟到次数</div>
            </div>
            <div class="charts-info-container">
              <div class="num num2">{{ ztts }}</div>
              <div class="desc">早退次数</div>
            </div>
            <div class="charts-info-container">
              <div class="num num3">{{ ycqts }}</div>
              <div class="desc">应出勤天数</div>
            </div>
          </div>
        </div>
        <div class="charts_box" style="padding-bottom: 10px">
          <div class="charts_title">出勤统计</div>
          <div id="myChart"></div>
        </div>
        <div class="charts_box">
          <div class="charts_title">出勤详情</div>
          <div class="status">
            <ul>
              <li>
                <!-- <span>签到:</span><span class="iconfont iconcheck"></span> -->
                <span>签到:</span
                ><span class="iconfont late iconyitijiao"></span>
              </li>
              <li>
                <span>迟到:</span
                ><span class="iconfont orange iconminus-circle-outline"></span>
              </li>
              <li>
                <span>早退:</span
                ><span
                  class="iconfont orange rotate iconminus-circle-outline"
                ></span>
              </li>
              <li>
                <span>缺勤:</span
                ><span
                  class="iconfont signature iconclose-circle-outline"
                ></span>
              </li>
            </ul>
          </div>
          <div class="table">
            <ul class="th">
              <li>日期</li>
              <li>上班考勤</li>
              <li>下班考勤</li>
              <li>备注</li>
            </ul>
            <ul class="td" v-for="(item, index) in obj.datas" :key="index">
              <li>{{ item.date.slice(5) }}</li>
              <li>
                {{ item.Sbattendance }}
                <span :class="`iconfont ${item.Sbicon}`"></span>
              </li>
              <li :class="item.Xbattendance == '缺勤' ? 'red' : ''">
                {{ item.Xbattendance }}
                <span :class="`iconfont ${item.Xbicon}`"></span>
              </li>
              <li @click="handle(item.router)" class="click">
                {{ item.bz }}
              </li>
            </ul>
          </div>
          <div class="footer">{{ zs }}</div>
        </div>
      </div>
      <commonempty v-else description="暂无个人考勤记录"></commonempty>
    </van-pull-refresh>
  </div>
</template>

<script>
import echarts from "echarts";
export default {
  name: "personalAttendance",

  components: {},

  data() {
    return {
      obj: {
        datas: [
          // {
          //   date: "2023-01-06",
          //   Sbattendance: "08:41",
          //   Xbattendance: "15:30",
          //   Sbicon: "late iconyitijiao",
          //   Xbicon: "late iconyitijiao",
          //   bz: "大当家我i夫鸡尾酒覅就当家我i夫鸡尾酒覅就",
          //   router: {
          //     moduleId: "189656",
          //     pk: "24r514da6w2wf",
          //   },
          // },
          // {
          //   date: "2023-01-04",
          //   Sbattendance: "08:25",
          //   Xbattendance: "15:45",
          //   Sbicon: "orange iconminus-circle-outline",
          //   Xbicon: "orange iconminus-circle-outline",
          //   bz: "",
          //   router: {
          //     moduleId: "",
          //     pk: "",
          //   },
          // },
          // {
          //   date: "2023-01-03",
          //   Sbattendance: "08:24",
          //   Xbattendance: "缺勤",
          //   Sbicon: "late iconyitijiao",
          //   Xbicon: "signature iconclose-circle-outline",
          //   bz: "",
          //   router: {
          //     moduleId: "",
          //     pk: "",
          //   },
          // },
        ],
      },
      // 迟到
      cdts: 0,
      // 早退
      ztts: 0,
      // 应出勤天数
      ycqts: 0,
      // 已出勤天数
      cqts: 0,
      // 缺勤天数
        qqts: 0,
      zs: "",
      isLoading: false,
    };
  },
  mounted() {
    // let self = this;
    // this.$nextTick(() => {
    //   self.drawChart();
    // });
  },
  updated() {
    let self = this;
    this.$nextTick(() => {
      self.drawChart(self.cqts,self.qqts);
    });
  },
  created() {
    this.initDatas();
  },

  methods: {
    onRefresh() {
      this.initDatas();

      //   setTimeout(() => {
      //     Toast("刷新成功");
      //     this.isLoading = false;
      //   }, 1000);
    },
    initDatas() {
      this.obj.datas = [];
      dsf.http.post("/fn/mobileKqData").then((result) => {
        this.isLoading = false;
        if (result.data.code == 200) {
          if (!result.data.data) return;
          let { zs, ycqts, cqts, cdts, ztts, qqts } = result.data.data;
          this.zs = zs;
          this.cdts = cdts;
          this.ztts = ztts;
          this.ycqts = ycqts;
          this.cqts = cqts;
          this.qqts = qqts;
          // this.AttendanceStatistics = { zs, ycqts, cqts, cdts, ztts, qqts };
          result.data.data.datas.forEach((item) => {
            let obj={
              date: item.rq,
              Sbattendance: item.sbsj,
              Xbattendance: item.xbsj,
              bz: item.bz,
              router: {
                moduleId: item.moduleId,
                pk: item.pk,
              },
            };
            if(item.sbbz=="出勤"){
              obj.Sbicon="late iconyitijiao";
            }else if(item.sbbz=="迟到"){
              obj.Sbicon="orange iconminus-circle-outline";
            }else{
              obj.Sbicon="signature iconclose-circle-outline";
            }
            if(item.xbbz=="出勤"){
              obj.Xbicon="late iconyitijiao";
            }else if(item.xbbz=="早退"){
              obj.Xbicon="orange rotate iconminus-circle-outline";
            }else{
              obj.Xbicon="signature iconclose-circle-outline";
            }
            this.obj.datas.push(obj);
          });
        } else {
          dsf.layer.toast(result.data.message);
        }
      });
    },
    handle(router) {
      if(router.moduleId||router.pk){
        this.$router.push({
        path: `/commonForm/${router.moduleId}/${router.pk}`,
      });
      }

    },
    drawChart(cqts = 0, qqts = 0) {
      // let self = this;
      let myChart = echarts.init(document.getElementById("myChart"));
      let option = (option = {
        color: ["#67c23b", "#EB7E65"],
        tooltip: {
          trigger: "item",
          show: false,
        },
        legend: {
          orient: "vertical",
          icon: "circle",
          itemHeight: 10,
          itemWidth: 10,
          top: "center",
          x: "left",
          // x: "right",
          left: 10,
          data: [`出勤${cqts}天`, `缺勤${qqts}天`],
        },
        series: [
          {
            name: "Access From",
            type: "pie",
            center: ["50%", "50%"],
            radius: ["60%", "90%"],
            avoidLabelOverlap: false,
            label: {
              show: false,
              position: "center",
            },
            labelLine: {
              show: false,
            },
            data: [
              { value: (cqts / (cqts + qqts)) * 100, name: `出勤${cqts}天` },
              { value: (qqts / (cqts + qqts)) * 100, name: `缺勤${qqts}天` },
            ],
            emphasis: {
              disabled: false,
              scale: false,
              scaleSize: false,
            },
            silent: true,
          },
        ],
      });
      // 使用刚指定的配置项和数据显示图表
      myChart.setOption(option);
    },
  },
};
</script>

<style scoped lang='scss'>
.personalAttendance {
  min-height: calc(100vh - 0.93rem);
  background: rgb(248, 248, 247);
  .status {
    border-bottom: 1px solid #eee;
    box-shadow: -4px 13px 20px -7px #ccc;
    ul {
      display: flex;
      justify-content: space-evenly;
      padding: 10px 0;

      li {
        span:first-child {
          color: #2271b3;
        }
      }
    }
  }

  .charts_box {
    // display: flex;
    background: #fff;
    margin: 10px 0;
    overflow: hidden;
    .charts_title {
      padding: 10px 15px;
      font-size: var(--font_size_2);
      font-weight: 700;
      display: flex;

      justify-content: flex-start;

      align-items: center;
    }
    .charts_title::before {
      content: "";
      display: block;
      border-left: 6px solid #0089ff;

      width: 10px;
      height: 16px;
    }
    #myChart {
      width: 100%;
      height: 100px;
    }
    .charts-info {
      // margin-top: 12px;
      // border-top: 1px dashed #3296fa;
      display: flex;

      justify-content: space-around;
      text-align: center;
      &-container {
        flex: 1;
        border-right: 1px solid #eee;
        margin-bottom: 10px;
        .num {
          font-size: 0.6rem;
          // font-weight: bold;
          // margin: 0.2rem 0;

          margin-bottom: 0.1rem;
        }
        .num1 {
          color: #0089ff;
        }
        .num2 {
          color: #67c23b;
        }
        .num3 {
          color: #e6a23c;
        }
        .desc {
          font-size: 0.25rem;
          margin-bottom: 0.1rem;
          // font-weight: 600;
        }
      }
      &-container:last-child {
        border: none;
      }
    }
  }
  .charts_box:last-child {
    margin-top: 10px;
    margin-bottom: 0;
  }
  .charts_box:first-child {
    margin-top: 0;
  }
  .content {
    padding: 10px 0;
    text-align: center;
    color: #333;
    font-size: 18px;
    font-weight: 700;
  }
  .footer {
    margin: 10px;
  }
  .table {
    margin-top: 10px;
    ul {
      width: 96%;
      background: #fff;
      // border-radius: 6px;
      margin: 0 5px;
      margin: 6px auto;
      display: flex;
      justify-content: space-evenly;
      align-items: center;
      border-bottom: 1px solid #eee;
      li {
        padding: 8px 0;
        flex: 1;
        text-align: center;
      }
    }
    .th {
      li {
        color: #9c9c9c;
      }
    }
  }
  .red {
    color: #eb7e65;
  }
  .late {
    color: #73deb3;
  }
  .orange {
    color: orange;
  }
  .rotate {
    transform: rotate(90deg);
    display: inline-block;
  }
  .signature {
    color: #eb7e65;
  }
  .click {
    color: #2271b3;
    text-decoration: underline;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
}
</style>

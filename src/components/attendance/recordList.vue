<template>
  <div class="records-page">
    <div class="content">
      <commonempty v-if="list.length == 0" description="暂无数据" />
      <div v-else-if="calcType == 0">
        <van-steps direction="vertical" :active="active">
          <van-step v-for="(item, idx) in list" :key="idx">
            <div class="title">
              {{ item.type }}：
              <span v-if="item.time"> {{ item.time | dateFormat }} </span>
              <span v-if="item.state"> {{ item.state }} </span>
            </div>
            <div v-if="item.position" class="position">
              <van-icon name="location-o" />{{ item.position }}
            </div>
          </van-step>
        </van-steps>
      </div>
      <div v-else class="charts">
        <div id="myChart" @click="checkBox(0)"></div>
        <div class="charts-info">
          <div class="charts-info-container" @click="checkBox(1)">
            <div class="num">{{ due - signed }}</div>
            <div class="desc">未打卡</div>
          </div>
          <div class="charts-info-container" @click="checkBox(2)">
            <div class="num">{{ late }}</div>
            <div class="desc">迟到</div>
          </div>
          <div class="charts-info-container" @click="checkBox(3)">
            <div class="num">{{ leaveEarly }}</div>
            <div class="desc">早退</div>
          </div>
        </div>
      </div>
    </div>
    <!-- 详情弹层 -->
    <van-popup v-model="showPop" position="bottom" round style="height: 70%">
      <van-nav-bar :title="showPopTitle" left-text="返回" left-arrow @click-left="showPop = false" />
      <div v-if="tabOrcell">
        <commonempty v-if="detailList.data.length == 0" description="暂无数据" />
        <van-cell-group v-else v-for="(item, idx) in detailList.data" :key="idx">
          <van-cell :title="item.userName" />
        </van-cell-group>
      </div>
      <div v-else>
        <van-tabs v-model="tabs">
          <van-tab title="已打卡">
            <commonempty v-if="detailList.ydk.data.length == 0" description="暂无数据" />
            <van-cell-group v-else v-for="(item, idx) in detailList.ydk.data" :key="idx">
              <van-cell :title="item.userName" />
            </van-cell-group>
          </van-tab>
          <van-tab title="未打卡">
            <commonempty v-if="detailList.wdk.data.length == 0" description="暂无数据" />
            <van-cell-group v-else v-for="(item, idx) in detailList.wdk.data" :key="idx">
              <van-cell :title="item.userName" />
            </van-cell-group>
          </van-tab>
        </van-tabs>
      </div>
    </van-popup>
  </div>
</template>

<script>
import echarts from "echarts";
export default {
  props: ["calcType"],
  data() {
    return {
      showPop: false,
      showPopTitle: "",
      detailList: {data:[],ydk:{data:[]},wdk:{data:[]}},
      day: "",
      groupId: "",
      tabOrcell: false,
      active: -1,
      tabs: 1,
      list: [],
      container: null,
      chartOptions: null,
      signed: 0, // 已打卡
      due: 0, // 应到人数
      late: 0, // 迟到
      leaveEarly: 0 // 早退
    };
  },
  methods: {
    checkBox(inx) {
      let typeArr = ["打卡人数/应到人数", "未打卡", "迟到", "早退"]
      // inx 1:已打卡/未打卡  3:迟到  4:早退
      dsf.http.post("/ctrl/attendStatistics/attendGroup",{
        groupId: this.groupId,
        date: this.day,
        type: inx == 1 ? 1 : inx + 1
      }).then(({data}) => {
        if (inx == 0) {
          this.tabOrcell = false
        } else {
          this.tabOrcell = true
        }
        if(data.code == 200) {
          if(inx != 1) {
            this.detailList = data.data
          } else {
            this.detailList = data.data.wdk
          }
          this.showPop = true
          this.showPopTitle = typeArr[inx]
        } else {
          dsf.layer.toast(data.message)
        }
      })
    },
    init(day, groupId) {
      let self = this;
      this.day = day;
      this.groupId = groupId;
      self.list = [];
      if (self.$route.query.demo == "1") {
        self.list = [
          {
            type: "上班打卡",
            time: "2022-06-08 08:11:22",
            position: "上海市浦东新区水芸路55号靠近港城广场"
          },
          {
            type: "下班打卡",
            time: "",
            position: ""
          }
        ];
      } else {
        if (self.calcType == 0) {
          dsf.http.post(`fn/attnd/getMySignRecords`, { day }).done(res => {
              if (res.type == "success") {
                self.list = res.data;
                // 无下班打卡则补一条下班空记录
                // if (
                //   self.list.length > 0 &&
                //   !self.list.some(item => item.type == "下班打卡")
                // ) {
                //   self.list.push({
                //     type: "下班打卡",
                //     time: "",
                //     position: ""
                //   });
                // }
              }
            })
            .error(error => {
              console.log("getMySignRecords-error", error);
            })
        } else {
          dsf.http.post(`fn/attnd/getSummary`, {
              sdate: day,
              edate: day,
              type: self.calcType,
              groupId
            }).done(res => {
              if (res.type == "success" && res.data.length > 0) {
                self.list = res.data;
                self.signed = parseFloat(
                  res.data.find(item => item.key == "打卡人数").value
                );
                self.due = parseFloat(
                  res.data.find(item => item.key == "应到人数").value
                );
                self.late = parseFloat(
                  res.data.find(item => item.key == "迟到").value
                );
                self.leaveEarly = parseFloat(
                  res.data.find(item => item.key == "早退").value
                );
                self.$nextTick(() => {
                  self.drawChart();
                });
              }
            })
        }
      }
    },
    drawChart() {
      let self = this;
      let myChart = echarts.init(document.getElementById("myChart"));
      let val = (self.signed / self.due).toFixed(2);
      let colors = [
        [val, "#2E71B1"],
        [1, "#F4F4F4"]
      ];
      let option = {
        series: [
          {
            type: "gauge",
            startAngle: 180,
            endAngle: 0,
            min: 0,
            max: 1,
            splitNumber: 8,
            axisLine: {
              lineStyle: {
                width: 20,
                color: colors
              }
            },
            pointer: {
              show: false
            },
            axisTick: {
              show: false
            },
            splitLine: {
              show: false
            },
            axisLabel: {
              show: false
            },
            title: {
              offsetCenter: [0, "0%"],
              fontSize: 12
            },
            detail: {
              fontSize: 24,
              offsetCenter: [0, "-30%"],
              valueAnimation: true,
              formatter: function(value) {
                return self.signed + "/" + self.due;
              },
              color: "#333"
            },
            data: [
              {
                value: val,
                name: "打卡人数/应到人数"
              }
            ],
            center: ["50%", "95%"],
            radius: 90
          }
        ]
      };
      // 使用刚指定的配置项和数据显示图表
      myChart.setOption(option);
    }
  },
  filters: {
    //时间格式化
    dateFormat: function(val) {
      if (!val) return "";
      return dsf.date.format(val, "hh:ii");
    }
  }
};
</script>

<style lang="scss" scoped>
.records-page {
  .content {
    .van-steps {
      .van-step__title {
        .title {
          color: #666;
          font-weight: bold;
        }
        .position {
          i {
            vertical-align: text-top;
          }
        }
      }
    }
    .charts {
      #myChart {
        width: 100%;
        height: 100px;
      }
      .charts-info {
        margin-top: 12px;
        display: flex;
        justify-content: space-around;
        text-align: center;
        &-container {
          .num {
            font-size: var(--font_size_0);
            font-weight: bold;
            margin: 0.2rem 0;
          }
          .desc {
            font-size: 0.25rem;
            margin-bottom: 0.2rem;
          }
        }
      }
    }
  }
}
>>>.van-nav-bar__content {
    background-color: #008be7;
    .van-nav-bar__title,
    .van-nav-bar__left i,
    .van-nav-bar__left span {
      color: white !important
    }
  }
  >>>.van-empty {
    height: 50vh;
  }
  >>>.van-nav-bar {
    position: sticky;
    top: 0;
    z-index: 2;
    height: 10%;
  }
  >>>.van-tabs__wrap {
    position: sticky;
    top: 10%;
    z-index: 1;
    border-bottom: 1px #ccc solid;
  }
</style>

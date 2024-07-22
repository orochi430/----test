<template>
  <div class="mzb-components">
    <van-tabs v-model="active" animated type="card" @change="changeTab">
      <van-tab title="个人办公" name="个人办公">
        <TodoCenter :hideBottom="true" />
      </van-tab>
      <van-tab title="部门效能" name="部门效能">
        <div class="unit" v-if="efficientShow">
          <van-field v-model="orgSelect.name" is-link readonly label="单位" placeholder="请选择单位" @click="isShow = true" />
        </div>
        <div class="effTimeChoose">
          <span v-for="item in timeChoose" :key="item" :class="{ active: efficientCurrentTime == item }"
            @click="efficientCurrentTime = item; getEfficient(item)">{{ item }}</span>
        </div>
        <div class="card" v-for="item in efficient" :key="item.name">
          <div :class="['total-container', `${item.color}-container`]">
            <img :src="item.image" alt="">
            <div class="flex1">
              <div>
                <span :class="['num', item.color]">{{ item.count }}</span>
                <span>件</span>
              </div>
              <span>{{ item.name }}</span>
            </div>
          </div>
        </div>
      </van-tab>
      <van-tab title="部门情况" name="部门情况">
        <div class="unit" v-if="deptSituationShow">
          <van-field v-model="orgSelect.name" is-link readonly label="单位" placeholder="请选择单位" @click="isShow = true" />
        </div>
        <div class="card">
          <div class="title">部门人员</div>
          <div class="num-container">
            <div v-for="item in personnelSituation" :key="item.name">
              <span :class="['num', item.color]">{{ item.count }}</span><span>{{ item.name }}</span>
            </div>
          </div>
        </div>
        <!-- <div class="card">
        <div class="title">在岗情况</div>
        <div class="num-container">
          <div v-for="item in jobSituation" :key="item.name">
            <span :class="['num', item.color]">{{item.count}}</span><span>{{item.name}}</span>
          </div>
        </div>
      </div> -->
        <div class="content">
          <div class="card">
            <div class="sector">
              <div>防疫统计</div>
            </div>
            <div class="date">
              <div class="center" @click="show = true">
                <span class="dateSpan">{{ dateStart | dateFilter }}</span>
                <span class="triangle"></span>
              </div>
              <span>至</span>
              <div class="center" @click="show = true">
                <span class="dateSpan">{{ dateEnd | dateFilter }}</span>
                <span class="triangle"></span>
              </div>
            </div>
            <div class="numberBox">
              <div class="center" v-for="(item, index) in fytjItem" :key="index">
                <div class="number" :style="numberColor[index]">{{item.count}}</div>
                <div>{{item.name}}</div>
              </div>
            </div>
          </div>
        </div>
        <div class="card">
          <div class="title">办件情况</div>
          <div class="timeChoose">
            <span v-for="item in timeChoose" :key="item" :class="{ active: situationCurrentTime == item }"
              @click="situationCurrentTime = item; getSituation(item)">{{ item }}</span>
          </div>
          <div class="charts-container">
            <v-chart :options="chart" :style="{ width: '100%', height: '5rem' }" />
          </div>
        </div>
      </van-tab>
    </van-tabs>
    <van-calendar v-model="show" :min-date="minDate" :default-date="defaultDate" type="range" allow-same-day
      @confirm="onConfirm" />
    <van-popup v-model="isShow" :style="{ height: '50%' }" round position="bottom">
      <div class="unitPop">单位选择</div>
      <div :class="{ unitList: true, chosen: orgSelect.id == item.id }" v-for="item in orgAll" :key="item.id"
        @click="unitChosen(item)">
        {{ item.org_name }}
      </div>
    </van-popup>
  </div>
</template>

<script>
import VChart from "vue-echarts";
import TodoCenter from "@/components/documentCenter/TodoCenter";
import 'echarts/lib/chart/pie'
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/legend'
import 'echarts/lib/component/title'
export default {
  components: { TodoCenter, VChart },
  data() {
    return {
      numberColor: ["color:#0089FF", "color:#F89908", "color:#00AAB2", "color:#F73131"],
      active: 0,
      efficientCurrentTime: '',
      situationCurrentTime: '',
      timeChoose: ['今日', '本周', '本月', '本季度', '本年'],
      efficient: [{
        name: '办文总数',
        count: 0,
        color: 'blue',
        image: 'static/images/project/mzb/total.png'
      }, {
        name: '起草文件',
        count: 0,
        color: 'red',
        image: 'static/images/project/mzb/draft.png'
      }, {
        name: '正常在办',
        count: 0,
        color: 'yellow',
        image: 'static/images/project/mzb/doing.png'
      }, {
        name: '办结总数',
        count: 0,
        color: 'green',
        image: 'static/images/project/mzb/done.png'
      }],
      personnelSituation: [{
        name: '总数',
        count: 0,
        color: 'blue'
      }, {
        name: '在线',
        count: 0,
        color: 'green'
      }, {
        name: '离线',
        count: 0,
        color: 'red'
      }],
      // jobSituation: [{
      //   name: '今日在岗',
      //   count: 0,
      //   color: 'blue'
      // }, {
      //   name: '请假',
      //   count: 0,
      //   color: 'green'
      // }, {
      //   name: '出差',
      //   count: 0,
      //   color: 'red'
      // }],
      chart: {
        color: ['#73a0fa', '#73deb3', '#7585a2', '#f79a39'],
        tooltip: {
          trigger: 'item'
        },
        legend: {
          bottom: '3%',
          left: 'center'
        },
        title: {
          show: true,
          text: '0',
          subtext: '办文总数',
          x: 'center',
          y: 'center',
          top: '43%'
        },
        series: [
          {
            type: 'pie',
            radius: ['30%', '70%'],
            avoidLabelOverlap: false,
            label: {
              show: true,
              position: 'inner',
              formatter: '{d}%',
            },
            emphasis: {
              label: {
                show: true,
                fontSize: '40',
                fontWeight: 'bold'
              },
              scale: false,
              scaleSize: 0
            },
            labelLine: {
              show: false
            },
            data: [
              { value: 0, name: '发文' },
              { value: 0, name: '收文' },
              { value: 0, name: '呈报件' },
              { value: 0, name: '用印' }
            ]
          }
        ]
      },
      efficientShow: false,
      deptSituationShow: false,
      show: false,
      dateStart: "",
      dateEnd: "",
      defaultDate: [new Date(), new Date()],
      minDate: new Date(2010, 0, 1),
      show: false,
      orgSelect: {name: "", id: ""},
      isShow: false,
      unitId: "",
      orgAll: [],
      fytjItem: [{ "name": "总人数", count: 0 }, { "name": "填报次数", count: 0 }, { "name": "到岗人次", count: 0 }, { "name": "涉疫人次", count: 0 }]
    }
  },
  created() {
    this.getEfficient()
    this.getSituation()
    this.getController()
    this.init()
  },
  activated() {
    this.getEfficient()
    this.getSituation()
  },
  filters: {
    dateFilter(msg) {
      let arr = msg.split("-")
      return `${arr[0]}年${arr[1]}月${arr[2]}日`
    }
  },
  methods: {
    getEfficient(query_time) {
      let query = {
        query_time: query_time || '',
        org_id: this.orgSelect.id
      }
      dsf.http.get("ctrl/mzbMobileController/deptEfficiency", query).then(res => {
        if (res.data.type == 'success') {
          this.efficient[0].count = res.data.data.total.deal
          this.efficient[1].count = res.data.data.total.draft
          this.efficient[2].count = res.data.data.total.doing
          this.efficient[3].count = res.data.data.total.done
          this.efficientShow = res.data.data.allowOrganizeFilter
        }
      })
    },
    getSituation(query_time) {
      let query = {
        query_time: query_time || '',
        org_id: this.orgSelect.id,
        query_time_start: this.dateStart,
        query_time_end: this.dateEnd
      }
      dsf.http.get("ctrl/mzbMobileController/deptSituation", query).then(res => {
        if (res.data.type == 'success') {
          this.deptSituationShow = res.data.data.allowOrganizeFilter
          // 部门人员
          this.personnelSituation[0].count = res.data.data.deptUserItem.userTotal
          this.personnelSituation[1].count = res.data.data.deptUserItem.online
          this.personnelSituation[2].count = res.data.data.deptUserItem.offline
          // 在岗情况
          // this.jobSituation[0].count = res.data.data.onDutyItem.onDuty
          // this.jobSituation[1].count = res.data.data.onDutyItem.leave
          // this.jobSituation[2].count = res.data.data.onDutyItem.travel
          // 防疫统计
          this.fytjItem[0].count = res.data.data?.fytjItem?.zrs
          this.fytjItem[1].count = res.data.data?.fytjItem?.tbcs
          this.fytjItem[2].count = res.data.data?.fytjItem?.dgrc
          this.fytjItem[3].count = res.data.data?.fytjItem?.syrc
          // 总数
          this.chart.title.text = res.data.data.dealItem['办文总数']
          if (this.chart.title.text == 0) {
            this.chart.series[0].data[0].value = 0
            this.chart.series[0].data[1].value = 0
            this.chart.series[0].data[2].value = 0
            this.chart.series[0].data[3].value = 0
          } else {
            // 办件情况
            this.chart.series[0].data[0].value = res.data.data.dealItem.item['发文'].num || null
            this.chart.series[0].data[1].value = res.data.data.dealItem.item['收文'].num || null
            this.chart.series[0].data[2].value = res.data.data.dealItem.item['呈报件'].num || null
            this.chart.series[0].data[3].value = res.data.data.dealItem.item['用印'].num || null
          }
        }
      })
    },
    changeTab(name) {
      if (name == '部门情况') {
        this.getSituation()
        this.efficientCurrentTime = ''
      } else if (name == '部门效能') {
        this.getEfficient()
        this.situationCurrentTime = ''
      }
      this.init()
    },
    onConfirm(date) {
      const [start, end] = date;
      this.show = false;
      this.dateStart = this.getNowFormatDate(start)
      this.dateEnd = this.getNowFormatDate(end)
      this.getSituation()
    },
    getNowFormatDate(date) {
      let year = date.getFullYear(),
        month = date.getMonth() + 1,
        strDate = date.getDate()
      if (month >= 1 && month <= 9) month = '0' + month // 如果月份是个位数，在前面补0
      if (strDate >= 0 && strDate <= 9) strDate = '0' + strDate // 如果日是个位数，在前面补0
      return `${year}-${month}-${strDate}`
    },
    init() {
      this.dateStart = this.getNowFormatDate(new Date())
      this.dateEnd = this.getNowFormatDate(new Date())
      this.orgSelect.name = ""
      this.orgSelect.id = ""
    },
    unitChosen(item) {
      console.log(this.active);
      this.orgSelect.name = item.org_name
      this.orgSelect.id = item.id
      if (this.active == "部门效能") {
        this.getEfficient()
      } else if (this.active == "部门情况") {
        this.getSituation()
      }
      setTimeout(() => {
        this.isShow = false
      },500)
    },
    // goDetail() {
    //   this.$router.push({
    //     path: "/fangyiIndex",
    //     query: {
    //       dateStart: this.dateStart,
    //       dateEnd: this.dateEnd,
    //       id: this.orgSelect.id
    //     }
    //   })
    // },
    getController() {
      dsf.http.get("ctrl/mzbMobileController/getOrgLv1").then(({ data }) => {
        this.orgAll = data.data
      })
    }
  }
}
</script>
<style lang='scss' scoped>
@import '@/assets/styles/themes.scss';
@import '@/assets/styles/mixin.scss';

.mzb-components {
  min-height: 746px;

  ::v-deep .van-tabs--card {
    &>.van-tabs__wrap {
      background-color: #F0F7FF;
      padding: 16px 0;
      height: auto;
    }

    .van-tabs__nav--card {
      border: none;
      background-color: transparent;
      height: auto;

      .van-tab {
        border: none;
        color: #000 !important;
      }

      .van-tab--active {
        @include linear-background-theme('normal');
        padding: 10px 0;
        border-radius: 50px;
        color: #fff !important;
        position: relative;

        &::after {
          position: absolute;
          content: '';
          width: 16px;
          height: 10px;
          background: url('../../../../static/images/project/mzb/down.png') no-repeat;
          background-size: 100%;
          bottom: -14px;
        }
      }
    }
  }

  .card {
    background-color: #FFF;
    margin: 0.2rem;
    border-radius: 6px;
    padding: 0.32rem;
    border-bottom: 1px solid #f7f7f7;
    box-shadow: 0px 2px 16px 0px rgba(213, 213, 213, 50%);
    overflow: hidden;

    .title {
      font-size: var(--font_size_2);
      padding-bottom: 16px;
      border-bottom: 1px solid #E6E6E6;
    }

    .num-container {
      padding-top: 16px;
      display: flex;
      justify-content: space-around;

      &>div {
        flex: 1;
        display: flex;
        flex-direction: column;
        align-items: center;

        &:not(:last-child) {
          border-right: 1px solid #E6E6E6;
        }

        .num {
          font-size: 24px;
          font-weight: 600;
          padding-bottom: 10px;
        }
      }
    }

    .total-container {
      padding: 0 16px;
      display: flex;
      position: relative;

      img {
        width: 50px;
        height: 50px;
        margin-right: 10px;
      }

      .flex1 {
        flex: 1;
        display: flex;
        flex-direction: column;

        .num {
          font-size: 24px;
          font-weight: 600;
        }
      }

      &::before {
        position: absolute;
        content: ' ';
        width: 8px;
        height: 100%;
        border-radius: 10px;
        left: -20px;
      }
    }

    .green-container {
      &::before {
        background-color: #67c23b;
      }
    }

    .blue-container {
      &::before {
        background-color: #0089ff;
      }
    }

    .red-container {
      &::before {
        background-color: #f66c6c;
      }
    }

    .yellow-container {
      &::before {
        background-color: #e6a23c;
      }
    }
  }

  .selectDepartment {
    background-color: #fff;
    display: flex;
    align-items: center;
    padding: 15px;
    border-bottom: 1px solid #E6E6E6;

    span {
      font-size: var(--font_size_2);
    }
  }

  .unit {
    ::v-deep .van-cell {
      font-size: var(--font_size_2);
      border-bottom: 1px solid #eee;
      padding: 12px 18px;

      .van-field__label {
        margin: 0;
        width: auto;
      }

      .van-cell__value .van-field__body {
        input {
          padding-top: 0.03rem;
          text-align: center;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
      }

      i {
        padding-left: 5px
      }
    }
  }

  .effTimeChoose {
    display: flex;
    justify-content: space-around;
    background-color: #fff;
    font-size: var(--font_size_2);

    span {
      padding: 16px 0;
      color: #666;
    }

    .active {
      color: #000;
      position: relative;

      &::after {
        position: absolute;
        content: ' ';
        width: calc(100% - 15px);
        border: 1px solid;
        @include border-color-theme('normal');
        bottom: 2px;
        left: 50%;
        transform: translateX(-50%);
      }
    }
  }

  .timeChoose {
    display: flex;
    justify-content: space-around;
    margin-top: 10px;

    span {
      padding: 3px 10px;
      border: 1px solid #C4C4C4;
      border-radius: 20px;
      font-size: var(--font_size_4);
      color: #666;
    }

    .active {
      @include background-theme('normal');
      color: #fff;
    }
  }

  .triangle {
    width: 0;
    height: 0;
    border-left: 6px solid transparent;
    border-right: 6px solid transparent;
    border-top: 6px solid #666666;
    margin-left: 8px;
  }

  .content {
    .card {
      background-color: #FFF;
      margin: 0.2rem;
      border-radius: 6px;
      padding: 0.32rem;
      box-shadow: 0px 2px 16px 0px rgba(213, 213, 213, 50%);

      .sector {
        font-size: var(--font_size_2);
        padding-bottom: 0.32rem;
        border-bottom: 1px solid #E6E6E6;
      }

      .numberBox {
        background: #F5F8FC;
        border-radius: 12px;
        padding: 20px 15px;
        align-items: center;
        display: flex;
        justify-content: space-between;

        .number {
          font-size: var(--font_size_0);
        }

        .center {
          display: flex;
          align-items: center;
          flex-direction: column;
        }
      }
    }
  }

  .date {
    display: flex;
    align-items: center;
    justify-content: space-around;
    background: #fff;
    padding: 10px;

    .center {
      display: flex;
      align-items: center;
    }

    .dateSpan {
      font-size: 13px;
      color: #333333;
    }
  }

  .green {
    color: #67c23b;
  }

  .blue {
    color: #0089ff;
  }

  .red {
    color: #f66c6c;
  }

  .yellow {
    color: #e6a23c;
  }
}

.unitPop {
  height: 40px;
  border-bottom: 1px solid #eee;
  text-align: center;
  font-size: var(--font_size_2);
  line-height: 40px;
  position: sticky;
  top: 0;
  z-index: 1;
  background: #fff;
}

.unitList {
  padding-left: 15px;
  height: 40px;
  border-bottom: 1px solid #eee;
  font-size: var(--font_size_2);
  line-height: 40px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.chosen {
  @include linear-background-theme('normal');
}
</style>

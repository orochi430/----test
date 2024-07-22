<template>
<div>
  <van-tabs v-model="active" swipeable sticky :offset-top="$store.state.isShowAppHeader ? '0.92rem' : '0px'">
    <van-tab title="目标完成仪表图">
      <div class="allTab">
        <span class="choose" @click="showPicker = true">{{chooseTime}}<van-icon name="arrow-down" /></span>
        <span> <span class="tabIndex">{{active+1}}</span> / 3</span>
      </div>
      <div style="margin: 8px 16px" class="flex jb ac">
        <span>全年累计至{{date}}</span>
        <!-- <span class="choose" @click="showPicker = true">{{chooseTime}}<van-icon name="arrow-down" /></span> -->
      </div>
      <div class="title">目标完成仪表图</div>
      <div class="chart-container">
        <v-chart :options="targetGaugeChart" />
      </div>
      <div style="text-align: center">年度单箱结构目标值：{{target}}</div>
    </van-tab>
    <van-tab title="每月销售结构同比增幅图">
      <div class="allTab">
        <span class="choose" @click="showPicker = true">{{chooseTime}}<van-icon name="arrow-down" /></span>
        <span> <span class="tabIndex">{{active+1}}</span> / 3</span>
      </div>
      <div style="margin: 8px 16px" class="flex jb ac">
        <span>全年累计至{{date}}</span>
        <!-- <span class="choose" @click="showPicker = true">{{chooseTime}}<van-icon name="arrow-down" /></span> -->
      </div>
      <div class="title">每月销售结构同比增幅图</div>
      <div class="chart-container">
        <v-chart :options="monthSalesChart" />
      </div>
    </van-tab>
    <van-tab title="各地市销售结构同比增幅">
      <div class="allTab">
        <span class="choose" @click="showPicker = true">{{chooseTime}}<van-icon name="arrow-down" /></span>
        <span> <span class="tabIndex">{{active+1}}</span> / 3</span>
      </div>
      <div style="margin: 8px 16px" class="flex jb ac">
        <span>全年累计至{{date}}</span>
        <!-- <span class="choose" @click="showPicker = true">{{chooseTime}}<van-icon name="arrow-down" /></span> -->
      </div>
      <div class="title">各地市销售结构同比增幅</div>
      <div class="chart-container">
        <v-chart :options="citySalesChart" />
      </div>
      <DsfListTable :columns="columns" :data="data" :showSlider="true" :adjoinGrey="true" :tbHighLight="true"></DsfListTable>
    </van-tab>
  </van-tabs>
  <van-popup get-container="#app" v-model="showPicker" position="bottom" round>
      <van-picker
        title="选择年月"
        show-toolbar
        :columns="selectColumns"
        @confirm="changeFn"
        @cancel="showPicker = false"
      />
    </van-popup>
</div>
</template>

<script>
import VChart from "vue-echarts";
import 'echarts/lib/chart/line'
import 'echarts/lib/chart/gauge'
import 'echarts/lib/chart/bar'
import 'echarts/lib/component/title'
import 'echarts/lib/component/legend'
import 'echarts/lib/component/tooltip'
import DsfListTable from "@/components/documentCenter/DsfListTable";
export default {
  components: { VChart, DsfListTable },
  data() {
    return {
      date: '',
      chooseTime: '',
      showPicker: false,
      active: 0,
      target: '',
      columns: [],
      data: [],
      targetGaugeChart: {
        series: [
          {
            type: 'gauge',
            startAngle: 225,
            endAngle: -45,
            min: 0,
            max: 5,
            splitNumber: 10,
            progress: {
              show: true,
              roundCap: true,
              width: 18
            },
            pointer: {
              itemStyle: {
                color: 'auto'
              }
            },
            // },
            axisLine: {
              roundCap: true,
              lineStyle: {
                width: 20,
                color: [
                  [0.2, '#3ba272'],
                  [0.8, '#3ba272'],
                  [1, '#fc8452']
                ]
              }
            },
            axisTick: {
              splitNumber: 5,
              lineStyle: {
                width: 2,
                color: '#fff'
              }
            },
            splitLine: {
              length: 12,
              lineStyle: {
                width: 3,
                color: '#fff'
              }
            },
            axisLabel: {
              distance: 20,
              fontSize: 16
            },
            title: {
              show: false
            },
            detail: {
              offsetCenter: [0, '55%'],
              valueAnimation: true,
              formatter: function (value) {
                return '{value|' + value + '}{unit|万元/箱}';
              },
              rich: {
                value: {
                  fontSize: 18,
                  fontWeight: 'bolder',
                  color: '#777'
                },
                unit: {
                  fontSize: 14,
                  color: '#999',
                  padding: [0, 0, 0, 0]
                }
              }
            },
            data: [
              {
                value: 0
              }
            ]
          }
        ]
      },
      monthSalesChart: {
        // title: {
        //   text: 'Stacked Line'
        // },
        color: ['#73c0de', '#fc8452', '#3ba272', '#5470c6', '#91cc75', '#fac858', '#ee6666', '#9a60b4', '#ea7ccc'],
        tooltip: {
          // trigger: 'axis'
        },
        legend: {
          data: ['目标值', '增长率']
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        toolbox: {
          // feature: {
          //   saveAsImage: {}
          // }
        },
        xAxis: {
          type: 'category',
          // boundaryGap: false,
          data: [],
          splitLine: { show: true }
        },
        yAxis: {
          type: 'value',
          name: '(万箱)'
        },
        series: [
          {
            name: '目标值',
            type: 'line',
            // stack: 'Total',
            label: {
              show: true,
            },
            data: []
          },
          {
            name: '增长率',
            type: 'line',
            // stack: 'Total',
            label: {
              show: true,
              color: '#000'
            },
            data: []
          }
        ]
      },
      citySalesChart: {
        color: ['#73c0de', '#fc8452', '#3ba272', '#5470c6', '#91cc75', '#fac858', '#ee6666', '#9a60b4', '#ea7ccc'],
        xAxis: {
          type: 'category',
          data: [],
          axisLabel: {  
            interval: 0,  
            formatter:function(value)   {  
              return value.split("").join("\n");  
            }  
          }
        },
        yAxis: {
          type: 'value',
          name: '(增幅%)'
        },
        series: [
          {
            data: [],
            type: 'bar'
          }
        ]
      }
    }
  },
  computed: {
    selectColumns() { // 可选择前12个月
      let dataArr = [];
      let data = new Date();
      let year = data.getFullYear();
      data.setMonth(data.getMonth()+1, 1)//获取到当前月份,设置月份
      for (let i = 0; i < 12; i++) {
          data.setMonth(data.getMonth() - 1);//每次循环一次 月份值减1
          let m = data.getMonth() + 1;
          m = m < 10 ? "0" + m : m;
          dataArr.push(data.getFullYear() + "年" + (m) + "月")
      }
      return dataArr
    }
  },
  watch: {
    chooseTime(newVal, oldVal) {
      let lastDate = newVal == this.selectColumns[0] ? new Date(new Date()-24*60*60*1000) : new Date(newVal.slice(0,4), newVal.slice(5,7), 0)
      this.date = dsf.date.format(lastDate, 'mm月dd日') // 选择月份的最后一天，当前月则是当前日期的前一天
      this.init()
    }
  },
  created() {
    this.chooseTime = this.selectColumns[0]
  },
  methods: {
    changeFn(val){
      console.log(val)
      this.chooseTime = val
      this.showPicker = false
    },
    init() {
      this.getTargetGaugeChart()
      this.getMonthSalesChart()
      this.getCitySalesChart()
    },
    getTargetGaugeChart() {
      let loading = dsf.layer.loading()
      dsf.http.post('fn/news/specialChart', {
        type: 'qsjyjgfx0',
        from: `${this.chooseTime.slice(0, 4)}-01`,
        to: `${this.chooseTime.slice(0, 4)}-${this.chooseTime.slice(5, 7)}`,
      }).then(res => {
        if(res.data.code == 200) {
          this.targetGaugeChart.series[0].data[0].value = res.data.data.complete
          this.target = res.data.data.target
        }
      }).finally(()=> {
        dsf.layer.closeLoading(loading)
      })
    },
    getMonthSalesChart() {
      let loading = dsf.layer.loading()
      dsf.http.post('fn/news/specialChart', {
        type: 'qsjyjgfx1',
        from: `${this.chooseTime.slice(0, 4)}-01`,
        to: `${this.chooseTime.slice(0, 4)}-${this.chooseTime.slice(5, 7)}`,
      }).then(res => {
        if(res.data.code == 200) {
          this.monthSalesChart.xAxis.data = res.data.data.growth.map((item, index) => `${index + 1}月`)
          this.monthSalesChart.series[0].data = res.data.data.growth.map(item => res.data.data.target)
          this.monthSalesChart.series[1].data = res.data.data.growth
        }
      }).finally(()=> {
        dsf.layer.closeLoading(loading)
      })
    },
    getCitySalesChart() {
      let loading = dsf.layer.loading()
      dsf.http.post('ctrl/news/tableList',{
        type: 'qsjyjgfx2',
        from: `${this.chooseTime.slice(0, 4)}-01`,
        to: `${this.chooseTime.slice(0, 4)}-${this.chooseTime.slice(5, 7)}`,
      }).then(res => {
        this.columns = res.data.showColumn
        this.data = res.data.datas
        this.citySalesChart.xAxis.data = res.data.datas.map(item => item.dataValue.col1)
        this.citySalesChart.series[0].data = res.data.datas.map(item => item.dataValue.col4)
      }).finally(() => {
        dsf.layer.closeLoading(loading)
      })
    }
  }
}
</script>
<style lang='scss' scoped>
.title {
  text-align: center;
  margin: 8px 0;
  font-size: 18px;
  font-weight: 600;
}
::v-deep .van-tabs__wrap {
  display: none;
}
.allTab {
  // background-color: #fff;
  display: flex;
  justify-content: space-between;
  font-size: var(--font_size_2);
  padding: 10px 16px;
  align-items: center;
  .choose {
    // background-color: #fff;
    padding: 4px 10px;
    border-radius: 30px;
    flex: 1;
    text-align: center;
  }
  .tabIndex {
    display: inline-block;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    text-align: center;
    background-color: #ddd;
  }
}
.chart-container{
		width: 100%;
    height: 100vw;
		position: relative;

		.echarts {
			width: 100%;
			height: 100%;
		}
    }
</style>
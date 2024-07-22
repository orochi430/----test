<template>
<div>
  <van-tabs v-model="active" swipeable sticky :offset-top="$store.state.isShowAppHeader ? '0.92rem' : '0px'">
    <van-tab title="零售指导价格区间销售同期增幅图">
      <div class="allTab">
        <span class="choose" @click="showPicker = true">{{chooseTime}}<van-icon name="arrow-down" /></span>
        <span> <span class="tabIndex">{{active+1}}</span> / 2</span>
      </div>
      <div style="margin: 8px 16px" class="flex jb ac">
        <span>全年累计至{{date}}</span>
        <!-- <span class="choose" @click="showPicker = true">{{chooseTime}}<van-icon name="arrow-down" /></span> -->
      </div>
      <div class="title">零售指导价格区间销售同期增幅图</div>
      <div class="chart-container">
        <v-chart :options="amplitudeChart" />
      </div>
    </van-tab>
    <van-tab title="零售指导价格区间销售同期对比图">
      <div class="allTab">
        <span class="choose" @click="showPicker = true">{{chooseTime}}<van-icon name="arrow-down" /></span>
        <span> <span class="tabIndex">{{active+1}}</span> / 2</span>
      </div>
      <div style="margin: 8px 16px" class="flex jb ac">
        <span>全年累计至{{date}}</span>
        <!-- <span class="choose" @click="showPicker = true">{{chooseTime}}<van-icon name="arrow-down" /></span> -->
      </div>
      <div class="title">零售指导价格区间销售同期对比图</div>
      <div class="chart-container">
        <v-chart :options="contrastChart" />
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
      amplitudeChart: {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        grid: {
          left: '3%',
          right: '9%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [{
          type: 'value',
          name: '(%)'
        }],
        yAxis: [
          {
            type: 'category',
            axisTick: {
              show: false
            },
            data: []
          }
        ],
        series: [
          {
            name: '增幅',
            type: 'bar',
            stack: 'Total',
            label: {
              show: true,
              position: 'left'
            },
            emphasis: {
              focus: 'series'
            },
            data: []
          }
        ]
      },
      contrastChart: {
        color: ['#73c0de', '#fc8452', '#3ba272', '#5470c6', '#91cc75', '#fac858', '#ee6666', '#9a60b4', '#ea7ccc'],
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        legend: {
          data: ['年销售量（万箱）', '同期销售量（万箱）']
        },
        toolbox: {
          show: true,
          orient: 'vertical',
          left: 'right',
          top: 'center',
          feature: {
            mark: { show: true },
            dataView: { show: true, readOnly: false },
            magicType: { show: true, type: ['line', 'bar', 'stack'] },
            restore: { show: true },
            saveAsImage: { show: true }
          }
        },
        xAxis: [
          {
            type: 'category',
            axisTick: { show: false },
            data: [],
            axisLabel: {  
              interval: 0,  
              formatter:function(value)   {  
                return value.split("").join("\n");  
              }  
            }
          }
        ],
        yAxis: {
          type: 'value',
          name: '（万箱）'
        },
        series: [
          {
            name: '年销售量（万箱）',
            type: 'bar',
            barGap: 0,
            emphasis: {
              focus: 'series'
            },
            data: []
          },
          {
            name: '同期销售量（万箱）',
            type: 'bar',
            emphasis: {
              focus: 'series'
            },
            data: []
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
      let loading = dsf.layer.loading()
      dsf.http.post('ctrl/news/tableList',{
        type: 'qsfjwdxlfx0',
        from: `${this.chooseTime.slice(0, 4)}-01`,
        to: `${this.chooseTime.slice(0, 4)}-${this.chooseTime.slice(5, 7)}`,
      }).then(res => {
        this.columns = res.data.showColumn
        this.data = res.data.datas
        this.contrastChart.xAxis[0].data = res.data.datas.map(item => item.dataValue.col1)
        this.contrastChart.series[0].data = res.data.datas.map(item => item.dataValue.col2)
        this.contrastChart.series[1].data = res.data.datas.map(item => item.dataValue.col3)
        this.amplitudeChart.yAxis[0].data = res.data.datas.map(item => item.dataValue.col1)
        this.amplitudeChart.series[0].data = res.data.datas.map(item => {
          return {
            value: item.dataValue.col4,
            label: { position: item.dataValue.col4 > 0 ? 'left' : 'right' },
            itemStyle: {
              color: item.dataValue.col4 > 0 ? '#3ba272' : '#fc8452'
            }
          }
        })
      }).finally(() => {
        dsf.layer.closeLoading(loading)
      })
    }
  }
}
</script>
<style lang='scss' scoped>
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

.title {
  text-align: center;
  margin: 8px 0;
  font-size: 18px;
  font-weight: 600;
}
// .choose {
//   background-color: #fff;
//   padding: 4px 10px;
//   border-radius: 30px;
// }
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
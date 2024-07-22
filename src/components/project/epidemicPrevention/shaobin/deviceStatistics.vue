<template>
<div class="container" :style="{minHeight: `calc(100vh - ${$store.state.isShowAppHeader ? '0.92rem' : '0px'})`}">
  <van-cell title="日期选择" is-link :value="date" @click="show = true"/>
  <van-cell title="场所选择" is-link :value="placeName" @click="showUnit = true"/>
  <!-- <van-cell title="人员状态" is-link :value="stateText" @click="showState = true"/> -->
  <div class="total">
    <div>访问总次数</div>
    <div class="num">{{total}}</div>
  </div>
  <!-- <div>当天疫情查询量（人）</div> -->
  <div class="chart-container" v-show="showChart">
    <div id="myChart" :style="{width: '95vw', height: '100%'}"></div>
  </div>
  <van-calendar v-model="show" @confirm="onConfirm" :min-date="minDate" :max-date="maxDate" />
  <van-popup v-model="showUnit" round position="bottom">
    <van-picker
      show-toolbar
      :columns="columns"
      value-key="text"
      @cancel="showUnit = false"
      @confirm="confirmUnit"
    />
  </van-popup>
  <van-popup v-model="showState" round position="bottom">
    <van-picker
      show-toolbar
      :columns="stateColumns"
      value-key="text"
      @cancel="showState = false"
      @confirm="confirmState"
    />
  </van-popup>
</div>
</template>

<script>
// 引入基本模板
let echarts = require('echarts/lib/echarts')
// 引入柱状图组件
require('echarts/lib/chart/bar')
// 引入提示框和title组件
require('echarts/lib/component/tooltip')
require('echarts/lib/component/title')
export default {
  // components: { VChart },
  data() {
    return {
      show: false,
      date: dsf.date.format(new Date(), 'yyyy-mm-dd'),
      minDate: new Date(2022, 0, 1),
      maxDate: new Date(),
      total: 0,
      list: [],
      showChart: true,
      showUnit: false,
      placeId: '',
      placeName: '全部',
      option: {},
      columns: [{
        text: '全部',
        value: ''
      }],
      stateText: '',
      stateValue: '',
      showState: false,
      stateColumns: []
    }
  },
  deactivated () {
    if (this.$route.name != 'commonList') {
        this.$deleteCache(this);
    }
  },
  mounted() {
    this.getPlace()
    this.getData(dsf.date.format(new Date(), 'yyyy-mm-dd'))
    // if(this.isShowUnit) this.getUnit()
    // this.drawLine()
  },
  methods: {
    getPlace() {
      dsf.http.post('/ctrl/device/getPlaces').then(res => {
        if (res.data.code == '200') {
          this.columns = [...this.columns, ...res.data.data]
        }
      })
    },
    async getData() {
      let loadingIndx = dsf.layer.loading();
      await dsf.http.post('/ctrl/device/countAccessRecord', {
        date: this.date,
        place_name: this.placeId,
      }).then(res => {
        dsf.layer.closeLoading(loadingIndx)
        if(res.data.data) {
          this.total = res.data.data.total
          this.list = res.data.data.list
          console.log(this.list)
        } else {
          this.total = 0
          this.list = []
          dsf.layer.toast(res.data.messge)
        }
      }).error(e => {
        dsf.layer.closeLoading(loadingIndx)
      })
      if(this.list.length > 0){
        this.showChart = true
        this.drawLine(this.list)
      } else {
        this.showChart = false
      }
    },
    toList() {
      let secQuery = {
        // 'query_220518193025JvCaVwKItkxS0Tb3q7W': this.stateValue,
        'query_OA_ACCESS_RECORDS.C-ACCESS-RECORDS-0001': `${this.date} - ${this.date}`
      }
      this.$router.push({
        path: '/commonList/220322155159B6DOXReCG8DuIE9gwM5/220318112117wJNhpmh1Q3QEyNdHat5',
        query: {
          secQuery: JSON.stringify(secQuery)
        }
      })
    },
    drawLine(list){
      console.log(list)
      let self = this
      let clickIndex;
        // 基于准备好的dom，初始化echarts实例
        let myChart = echarts.init(document.getElementById('myChart'))
        // 绘制图表
        this.autoHeight = list.length * 30 + 60; // counst.length为柱状图的条数，即数据长度。35为我给每个柱状图的高度，50为柱状图x轴内容的高度(大概的)。
        myChart.resize({height:this.autoHeight}); 
        myChart.getZr().on('click', function(params) {
          //获得准确索引值，不会随着位置的变化而变化！
          console.log(clickIndex);
          console.log(list);
          let secQuery = {
            equipment: self.list[clickIndex].code,
            'query_OA_ACCESS_RECORDS.C-ACCESS-RECORDS-0001': `${self.date} - ${self.date}`
          }
          self.$router.push({
            path: '/commonList/2205171914462OXImpneGQBfq9Nn62c/220405162139n0I5f23XnQayBPWs21m',
            query: {
              secQuery: JSON.stringify(secQuery),
              notLink: 1
            }
          })
        })
        myChart.setOption({
            title: {
              show: false,
          // text: '当天疫情查询量（人）',
          textStyle: {
            fontWeight: 'normal',
            fontSize: '0'
          },
          left: 'center'
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        formatter: val => {
        //获取当前阴影部分点击的索引值并
            clickIndex = val[0].dataIndex
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          top: '3%',
          containLabel: true
        },
        xAxis: {
          type: 'value',
          boundaryGap: [0, 0.01],
          minInterval: 1
        },
        yAxis: {
          type: 'category',
          data: list.map(item => item.name)
        },
        series: [
          {
            name: '查询量',
            type: 'bar',
            barCategoryGap: '50%',
            itemStyle: {
              // normal: {
                barBorderRadius: [0, 10, 10, 0],
              // },
              color: new echarts.graphic.LinearGradient(0, 0, 1, 1, [
                { offset: 0, color: '#0091FF' },
                { offset: 0.7, color: '#32C5FF' },
                { offset: 1, color: '#32C5FF' }
              ]),
              
            },
            label: {
              show: true,
              position: 'right',
            },
            data: list.map(item => item.num)
          },
        ]
        });
    },
    onConfirm(date) {
      this.show = false
      this.date = dsf.date.format(date, 'yyyy-mm-dd')
      this.getData()
    },
    confirmUnit(val) {
      console.log(val)
      this.showUnit = false
      this.placeId = val.value
      this.placeName = val.text
      this.getData(this.date, this.placeId)
    },
    confirmState(val) {
      console.log(val)
      this.showState = false
      this.stateText = val.text
      this.stateValue = val.value
      this.getData()
    }
  }
}
</script>
<style lang='scss' scoped>
.container {
  background-color: #fff;
  .van-cell {
    font-size: var(--font_size_2);
    align-items: center;
  }
  .total {
    padding: 20px 0 0;
    text-align: center;
    .num {
      padding: 10px 0;
      font-size: 24px;
      color: #0091FF;
      font-weight: 900;
    }
  }
  .chart-container{
    width: 100%;
    // height: 100vw;
    position: relative;
    // margin: 0 10px;

    .echarts {
      width: 100%;
      height: 100%;
    }
  }
}

</style>
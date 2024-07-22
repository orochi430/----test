<template>
<div class="container" :style="{minHeight: `calc(100vh - ${$store.state.isShowAppHeader ? '0.92rem' : '0px'})`}">
  <van-cell title="日期选择" is-link :value="date" @click="show = true"/>
  <van-cell title="单位选择" is-link :value="unitName" @click="showUnit = true" v-if="isShowUnit"/>
  <div class="total">
    <div>今日查询总人数</div>
    <div class="num" @click="toList()">{{total}}</div>
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
      value-key="orgName"
      @cancel="showUnit = false"
      @confirm="confirmUnit"
    />
  </van-popup>
</div>
</template>

<script>
// import VChart from "vue-echarts";
// import 'echarts/lib/chart/line'
// import 'echarts/lib/chart/gauge'
// import 'echarts/lib/chart/bar'
// import 'echarts/lib/component/title'
// import 'echarts/lib/component/legend'
// import 'echarts/lib/component/tooltip'
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
      total: '',
      list: [],
      showChart: true,
      showUnit: false,
      unitId: '',
      unitName: dsf.util.loadSessionStore('user').unitName,
      option: {},
      columns: [],
      isShowUnit: dsf.util.checkUserRole('疫情查询管理')
    }
  },
  beforeRouteEnter (to, from, next) {
    next(v => {
      if (from.name !== 'commonList') {
        v.unitId = ''
        v.unitName = dsf.util.loadSessionStore('user').unitName
        v.date = dsf.date.format(new Date(), 'yyyy-mm-dd'),
        v.isShowUnit = dsf.util.checkUserRole('疫情查询管理')
        v.getData(v.date)
        v.getUnit()
      }
    })
  },
  mounted() {
    this.getData(dsf.date.format(new Date(), 'yyyy-mm-dd'))
    if(this.isShowUnit) this.getUnit()
    // this.drawLine()
  },
  methods: {
    getUnit() {
      dsf.http.post('/ctrl/statistical/qryUnitStatistical',{rootUnitId:''}).then(res => {
        if(res.data.code == 200) {
          this.columns = res.data.data
          // this.total = res.data.data.count
          // this.list = res.data.data.detail
          this.columns.unshift({orgName: "本单位"})
          console.log(res.data.data)
        } else {
          dsf.layer.toast(res.data.messge)
        }
      }).error(e => {

      })
    },
    async getData(date, unitId) {
      let loadingIndx = dsf.layer.loading();
      await dsf.http.post('/ctrl/statistical/qryStatistical',{qryDate: date, qryUnitId: unitId || ''}).then(res => {
        dsf.layer.closeLoading(loadingIndx)
        if(res.data.code == 200) {
          this.total = res.data.data.count
          this.list = res.data.data.detail
          console.log(this.list)

        } else {
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
        unitId: this.unitId ? this.unitId : dsf.util.loadSessionStore('user').unitId,
        'query_S-API-LOG-0001': `${this.date} - ${this.date}`
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
        this.autoHeight = list.length * 30 + 120; // counst.length为柱状图的条数，即数据长度。35为我给每个柱状图的高度，50为柱状图x轴内容的高度(大概的)。
        myChart.resize({height:this.autoHeight}); 
        myChart.getZr().on('click', function(params) {
          //获得准确索引值，不会随着位置的变化而变化！
          console.log(clickIndex);
          console.log(list);
          let secQuery = {
            operateId: self.list[clickIndex].createUserid,
            'query_S-API-LOG-0001': `${self.date} - ${self.date}`
          }
          self.$router.push({
            path: '/commonList/2203201536267aWr3w6S080rMhWfuZP/220318112117wJNhpmh1Q3QEyNdHat5',
            query: {
              secQuery: JSON.stringify(secQuery)
            }
          })
        })
        myChart.setOption({
            title: {
              // show: false,
          text: '当天疫情查询量（人）',
          textStyle: {
            fontWeight: 'normal',
            fontSize: '16'
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
        legend: {
          show: false,
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: {
          type: 'value',
          boundaryGap: [0, 0.01],
          minInterval: 1
        },
        yAxis: {
          type: 'category',
          data: list.map(item => item.createUname)
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
      this.getData(this.date, this.unitId)
    },
    confirmUnit(val) {
      console.log(val)
      this.showUnit = false
      this.unitId = val.orgId
      this.unitName = val.orgName
      this.getData(this.date, this.unitId)
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
    padding: 20px 0;
    text-align: center;
    .num {
      padding: 10px 0;
      font-size: 24px;
      color: #F66C6C;
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
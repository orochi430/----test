<template>
<div class="container" :style="{minHeight: `calc(100vh - ${$store.state.isShowAppHeader ? '0.92rem' : '0px'})`}">
  <van-cell title="单位选择" is-link :value="unitName" @click="showUnit = true" v-if="isShowUnit"/>
  <div class="flex">
    <div class="box">
      <div>累计查询总人次</div>
      <div class="num" style="color: #0073CA;" @click="toList(true)">{{total}}</div>
    </div>
    <div class="box">
      <div>{{isActive}}天内查询总人次</div>
      <div class="num" @click="toList()">{{sectionCount}}</div>
    </div>
  </div>
  <div style="text-align: center;font-size: var(--font_size_2)">疫情查询人次</div>
  <div class="chart-container">
    <div class="_btn  _controlBtn">
      <span @click="handClickBtn('7')" :class="isActive=='7' ? '_active' : ''">近7天</span>
      <span @click="handClickBtn('30')" :class="isActive=='30' ? '_active' : ''">近30天</span>
    </div>
    <div id="myChart" :style="{width: '100%', height: '100%'}"></div>
  </div>
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
// 引入基本模板
let echarts = require('echarts/lib/echarts')
require('echarts/lib/chart/line')
// 引入提示框和title组件
require('echarts/lib/component/tooltip')
require('echarts/lib/component/title')
export default {
  data() {
    return {
      total: '',
      sectionCount: '',
      isActive: '7',
      list: [],
      showUnit: false,
      unitId: '',
      unitName: dsf.util.loadSessionStore('user').unitName,
      option: {},
      columns: [],
      isShowUnit: dsf.util.checkUserRole('疫情查询管理')
    }
  },
  mounted() {
    this.getData(this.isActive)
    if(this.isShowUnit) this.getUnit()
    // this.drawLine()
  },
  methods: {
    getUnit() {
      dsf.http.post('/ctrl/statistical/qryUnitStatistical',{rootUnitId: ''}).then(res => {
        if(res.data.code == 200) {
          this.columns = res.data.data
          this.columns.unshift({orgName: "本单位"})
          // this.total = res.data.data.count
          // this.list = res.data.data.detail
          console.log(res.data.data)
        } else {
          dsf.layer.toast(res.data.messge)
        }
      }).error(e => {

      })
    },
    toList(isTotal) {
      let secQuery = {
        unitId: this.unitId ? this.unitId : dsf.util.loadSessionStore('user').unitId,
      }
      if (!isTotal) {
        secQuery['query_S-API-LOG-0001'] = `${this.list[0].x} - ${this.list[this.list.length - 1].x}`
      } 
      this.$router.push({
        path: '/commonList/220322155159B6DOXReCG8DuIE9gwM5/220318112117wJNhpmh1Q3QEyNdHat5',
        query: secQuery ? { secQuery: JSON.stringify(secQuery) } : {}
      })
    },
    async getData(isActive,unitId) {
      let loadingIndx = dsf.layer.loading();
      await dsf.http.post('/ctrl/statistical/qrySectionStatistical',{section: isActive,qryUnitId: unitId || ''}).then(res => {
        dsf.layer.closeLoading(loadingIndx)
        if(res.data.code == 200) {
          this.total = res.data.data.count
          this.sectionCount = res.data.data.sectionCount
          this.list = res.data.data.detailDate
        } else {
          dsf.layer.toast(res.data.messge)
        }
      }).error(e => {
        dsf.layer.closeLoading(loadingIndx)
      })
      this.drawLine(this.list)
    },
    handClickBtn(status) {
      this.isActive = status;
      this.getData(this.isActive, this.unitId)
    },
    drawLine(list){
      console.log(list)
        // 基于准备好的dom，初始化echarts实例
        let myChart = echarts.init(document.getElementById('myChart'))
        myChart.setOption({
            xAxis: {
              type: 'category',
              boundaryGap: false,
              data: list.map(item => item.x.slice(5))
            },
            yAxis: {
              type: 'value'
            },
            series: [
              {
                data: list.map(item => item.y),
                type: 'line',
                label : {
                  show: true,
                  formatter: function (e) {
                    return e.value || ''
                  }
                },
                itemStyle: {
                  color: '#0A9BFF',
                },
                areaStyle: {
                  color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                    {
                      offset: 0,
                      color: 'rgba(10,155,255,0.8)'
                    },
                    {
                      offset: 1,
                      color: 'rgba(10,155,255,0.3)'
                    }
                  ])
                },
              }
            ]
        });
    },
    confirmUnit(val) {
      console.log(val)
      this.showUnit = false
      this.unitId = val.orgId
      this.unitName = val.orgName
      this.getData(this.isActive, this.unitId)
    }
  },
  beforeRouteEnter (to, from, next) {
    next(v => {
      if (from.name !== 'commonList') {
        v.unitId = ''
        v.unitName = dsf.util.loadSessionStore('user').unitName
        v.isActive = '7',
        v.isShowUnit = dsf.util.checkUserRole('疫情查询管理')
        v.getData(v.isActive)
        v.getUnit()
      }
    })
  },
}
</script>
<style lang='scss' scoped>
.container {
  background-color: #fff;
  .box {
    flex: 1;
    padding: 30px 0;
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
    height: 100vw;
    position: relative;
    margin: 0 10px;
    .echarts {
      width: 100%;
      height: 100%;
    }
    ._btn {
      padding: 11px 14px 11px 0;
      display: flex;
      justify-content: flex-end;
      position: fixed;
      right: 0;
      // background: #fff;
      z-index: 9;
      width: 100%;

      span {
        border: 1px solid #e2e4e5;
        // @include font_6(true);
        padding: 3px 9px;
        &:first-child {
          border-radius: 30px 0 0 30px;
        }
        &:last-child {
          border-radius: 0 30px 30px 0;
        }
      }

      ._active {
        // @include background-theme("normal");
        // @include border-color-theme("normal");
        background-color: #235ABD ;
        border-color: #235ABD;
        color: #fff;
      }
    }
  }
  
}

</style>
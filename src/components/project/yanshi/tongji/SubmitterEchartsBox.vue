<template>
<div class="bigbox" style="width:100%;height:100%">
    <div class="submitter_box">
        <div class="in-chart">
            <div class="unit_box">
              <span @click="showUnit=true">
                <label for="">{{ selectedUnit.unitName || '请选择' }}</label>
                <van-icon name="play" />
              </span>
            </div>
            <div class="echarts_summarydata">
                <div class="echarts_head">
                    <span>本月数据概况</span>
                    <span @click="show=true">
                        <label for="">{{ showDate }}</label>
                        <van-icon name="play" /></span>
                </div>
                <div class="echarts_box">
                    <div class="echarts_smallbox" v-for="(v, i) in data" :key="i">
                        <p class="echarts_blacktext">{{ v.name }}</p>
                        <p class="echarts_redtext">{{ v.value }}</p>
                    </div>
                </div>

            </div>
            <div class="echarts_monthnumber">

                <p class="echarts_head">年度得分及排名情况</p>
                <div style="width:100%;margin-top:1.4%">
                    <div ref="charts2" class="charts"></div>
                </div>

            </div>
            <div class="echarts_monthscore">

                <p class="echarts_head">年度上报及采用情况</p>
                <div style="width: 100%; margin-top:1.4%">
                    <div ref="score" class="charts charts2"></div>
                </div>
            </div>

        </div>
    </div>
    <van-popup v-model="show" position="bottom">
        <van-datetime-picker v-model="currentDate" type="year-month" title="选择年月" :formatter="formatter" @confirm="confirm" @cancel="show=false" />
    </van-popup>
    <van-popup v-model="showUnit" round position="bottom" get-container="#app">
      <van-picker
        show-toolbar
        :columns="unitColumns"
        value-key="unitName"
        @cancel="showUnit = false"
        @confirm="confirmUnit"
      />
    </van-popup>
</div>
</template>

<script>
import * as echarts from 'echarts'
export default {
    data() {
        return {
            // 总况数据：
            data: [],
            // 柱状图数据：
            linedata: [],
            //  折线图数据：
            bardata: [],
            // 没有倒叙的数据
            barnewdata: [],
            linenewdata: [],
            // y轴最大值
            maxline: 0,
            maxbar: 0,
            currentDate: new Date(),
            show: false,
            showDate: moment(new Date()).format("YYYY年MM月"),
            selectedUnit: {},
            unitColumns: [],
            showUnit: false
        }
    },
    async mounted() {
        // 请求数据：

        // dsf.http.get('ctrl/reportEditorIndex/scoreRankingData').then((res) => {
        //     console.log(res)
        //     this.linedata = res.data.data.line.data
        //     this.bardata = res.data.data.bar.data
        //     for (let i = 0; i < res.data.data.line.data.length; i++) {
        //         this.linenewdata.push(res.data.data.line.data[i])
        //     }
        //     for (let i = 0; i < res.data.data.bar.data.length; i++) {
        //         this.barnewdata.push(res.data.data.bar.data[i])
        //     }

        //     // y轴最大值
        //     this.maxline = this.linedata.sort(function (a, b) {
        //         return b - a;
        //     })[0];
        //     this.maxbar = this.bardata.sort(function (a, b) {
        //         return b - a;
        //     })[0];
        // })

        // let data1 = {
        //     "orderList": ["1", "2", "3", "4", "5", "6"],
        //     "scoreList": ["9", "10", "23", "44", "25", "16"],
        //     "nameList": ["1月", "2月", "3月", "4月", "5月", "6月"]
        // }
        // this.echartsinit1(data1)

        // let data2 = {
        //     "reportList": ["9", "2", "3", "4", "5", "6"], //报送数
        //     "adoptList": ["9", "2", "3", "4", "5", "6"], //采用数
        //     "adoptionRateList": ["9", "2", "3", "4", "5", "6"], //采用率
        //     "nameList": ["1月", "2月", "3月", "4月", "5月", "6月"]
        // }
        // this.echartsinit2(data2)
        await this.getUnit()
        this.getTotalData()
        this.getEchart1()
        this.getEchart2()
    },
  methods: {
      getUnit() {
        return dsf.http.post('ctrl/editor/getReportUnitByReportUser').then(res => {
          if (res.data.code == 200) {
            this.unitColumns = res.data.data
            this.selectedUnit = this.unitColumns[0]
          }
        })
      },
      confirmUnit(val) {
        this.selectedUnit = val
        this.showUnit = false
        this.getTotalData()
        this.getEchart1()
        this.getEchart2()
      },
        getTotalData() {
            dsf.http.get('ctrl/reportEditorIndex/summaryData', {
                dateValue: moment(this.currentDate).format("YYYY-MM"),
                unitId: this.selectedUnit.unitId || ''
            }).then((res) => {
                this.data = res.data.data
            })
        },
        getEchart1() {
            dsf.http.get('ctrl/reportEditorIndex/scoreRankingData', {unitId: this.selectedUnit.unitId || ''}).then((res) => {
                if (res.data && res.data.data) {
                    this.echartsinit1(res.data.data)
                }
            })
        },
        getEchart2() {
            dsf.http.get('ctrl/reportEditorIndex/reportAdoptData', {unitId: this.selectedUnit.unitId || ''}).then((res) => {
                if (res.data && res.data.data) {
                    this.echartsinit2(res.data.data)
                }
            })
        },
        confirm(val) {
            console.log(val)
            this.currentDate = new Date(val)
            this.showDate = moment(this.currentDate).format("YYYY年MM月")
            this.show = false
            this.getTotalData()
        },
        formatter(type, val) {
            if (type === 'year') {
                return `${val}年`;
            } else if (type === 'month') {
                return `${val}月`;
            }
            return val;
        },
        echartsinit1(dataResource) {
            let mychart1 = echarts.init(this.$refs.charts2);
            let option1 = {
                color: ["#26b52e", "#0091ff"],
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'none'
                    },
                    lineStyle: {
                        opacity: 0,
                    },
                },
                grid: {
                    left: '5%',
                    right: '10%',
                    bottom: '18%',
                    top: '20%',
                    containLabel: true,
                    z: 22
                },
                legend: {
                    data: ['排名','得分'],
                    left: "center",
                    bottom: 10
                },
                xAxis: {
                    type: 'category',
                    data: dataResource.nameList,
                    axisTick: {
                        show: false
                    },
                    axisLabel: {
                        show: true,
                        interval: 0,
                        fontSize: 12
                    },
                    axisLine: {
                        lineStyle: {
                            color: "#999999",
                        }
                    }

                },
                yAxis: [{
                    min: 0,
                    // max: Math.round((this.maxbar * 1 + 5) / 10) * 10,
                    type: 'value',
                    axisTick: {
                        show: false
                    },
                    name: '排名',
                    splitLine: {
                        show: false,
                        lineStyle: {
                            color: "#999999",
                            width: 1,
                            type: "dashed"
                        }
                    },
                    axisLine: {
                        show: false,
                        lineStyle: {
                            color: "#999999",
                        }
                    }
                }, {
                    min: 0,
                    // max: Math.round((this.maxbar * 1 + 5) / 10) * 10,
                    type: 'value',
                    axisTick: {
                        show: false
                    },
                    name: '得分',
                    splitLine: {
                        show: true,
                        lineStyle: {
                            color: "#999999",
                            width: 1,
                            type: "dashed"
                        }
                    },
                    axisLine: {
                        show: false,
                        lineStyle: {
                            color: "#999999",
                        }
                    }
                }],
                series: [{
                    name: '排名',
                    type: 'bar',
                    barWidth: 20,
                    yAxisIndex: 0,
                    data: dataResource.orderList
                }, {
                    name: '得分',
                    type: 'line',
                    yAxisIndex: 1,
                    data: dataResource.scoreList
                }]
            };
            mychart1.setOption(option1);
        },
        echartsinit2(dataResource) {
            let mychart1 = echarts.init(this.$refs.score);
            let option1 = {
                color: ["#26b52e", "#0091ff", "#dbc600"],
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'none'
                    },
                    lineStyle: {
                        opacity: 0,
                    },
                },
                grid: {
                    left: '5%',
                    right: '10%',
                    bottom: '18%',
                    top: '20%',
                    containLabel: true,
                    z: 22
                },
                legend: {
                    data: ['报送数', '采用数', '采用率'],
                    left: "center",
                    bottom: 10
                },
                xAxis: {
                    type: 'category',
                    data: dataResource.nameList,
                    axisTick: {
                        show: false
                    },
                    axisLabel: {
                        show: true,
                        interval: 0,
                        fontSize: 12
                    },
                    axisLine: {
                        lineStyle: {
                            color: "#999999",
                        }
                    }

                },
                yAxis: [{
                    min: 0,
                    // max: Math.round((this.maxbar * 1 + 5) / 10) * 10,
                    type: 'value',
                    axisTick: {
                        show: false
                    },
                    name: '数量',
                    splitLine: {
                        show: false,
                        lineStyle: {
                            color: "#999999",
                            width: 1,
                            type: "dashed"
                        }
                    },
                    axisLine: {
                        show: false,
                        lineStyle: {
                            color: "#999999",
                        }
                    }
                }, {
                    min: 0,
                    max:100,
                    // max: Math.round((this.maxbar * 1 + 5) / 10) * 10,
                    type: 'value',
                    axisTick: {
                        show: false
                    },
                    name: '%',
                    splitLine: {
                        show: true,
                        lineStyle: {
                            color: "#999999",
                            width: 1,
                            type: "dashed"
                        }
                    },
                    axisLine: {
                        show: false,
                        lineStyle: {
                            color: "#999999",
                        }
                    }
                }],
                series: [{
                    name: '采用率',
                    type: 'line',
                    data: dataResource.adoptionRateList
                }, {
                    name: '报送数',
                    type: 'line',
                    data: dataResource.reportList
                }, {
                    name: '采用数',
                    type: 'line',
                    data: dataResource.adoptList
                }]
            };
            mychart1.setOption(option1);
        }
    }
}
</script>

<style lang="scss" scoped>
.submitter_box {
    width: 100% !important;
}

.echarts_blue {
    width: 100%;
    height: 10px;
    background-color: #f8f8f8;
}

.echarts_head {
    box-sizing: border-box;
    padding-left: 5px;
    border-left: 4px solid #0091FF;
    margin: 0 0 2% 15PX;
    font-family: PingFangSC-Medium;
    font-size: var(--font_size_3);
    color: #333333;
    line-height: 18px;
    font-weight: 700;
    border-radius: 2px;
    display: flex;
    align-items: center;
    justify-content: space-between;

    &>span:nth-child(1) {
        color: #333333;
        line-height: 18px;
        font-weight: 700;
    }

    &>span:nth-child(2) {
        color: rgb(0, 145, 255);
        display: flex;
        font-weight: normal;
        align-items: center;
        margin-right: 15px;

        .van-icon {
            transform: rotate(90deg);
        }

        label {
            color: rgb(0, 145, 255);
            font-weight: normal;
            align-items: center;
        }
    }
}
.unit_box{
  padding: 10px 15px;
  text-align: right;
  i {
    transform: rotate(90deg);
  }
}
.echarts_summarydata {
    width: 100%;
    background-color: white;
    overflow: hidden;
    // margin-top: 20px;
    padding-top: 12px;

    .echarts_box {
        padding: 5.5% 0;
        display: flex;
        justify-content: space-between;
        padding: 10PX 15PX;

        .echarts_smallbox {
            flex: 1;
            height: 80px;
            box-sizing: border-box;
            background: #F7F8FA;
            border: 1px solid rgba(236, 236, 236, 1);
            border-radius: 10px;
            text-align: center;
            padding-bottom: 13px;

            .echarts_blacktext {
                font-size: var(--font_size_4);
                color: #333333;
                text-align: center;
                font-weight: 700;
                margin-top: 10px;
                height: 32px !important;
                display: flex;
                align-items: center;
                justify-content: center;
            }

            .echarts_redtext {
                font-size: var(--font_size_0);
                color: #E93F3F;
                text-align: center;
                line-height: 20px;
                font-weight: 700;
                margin-top: 5px;
            }

            &:nth-child(even) {
                margin: 0 10px;
            }
        }
    }
}

.echarts_monthnumber {

    margin-top: 20px;
    padding-top: 12px;
    width: 100%;
    background-color: white;
}

.echarts_monthscore {
    margin-top: 20px;
    padding-top: 12px;
    width: 100%;
    background-color: white;
}

.charts {
    width: 100%;
    height: 250PX;
}

.charts2 {
    div {
        canvas {
            width: 100%;
            padding-left: 22PX;
        }
    }

}

.submitter_box {
    background-color: #f8f8f8;

    .in-chart {
        width: 100%;
        height: 100%;
        overflow: auto;
    }
}
</style>

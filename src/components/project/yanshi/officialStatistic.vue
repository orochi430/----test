<template>
<div class="officialStatistic" :style="{ height: `calc(100vh - ${$store.state.isShowAppHeader ? '0.92rem' : '0px'} - ${$store.state.isShowAppFooter ? '1.2rem' : '0px'})` }">
    <div class="common-card">
        <div class="card-title">
            <p>
                <img src="./yanshi/titlebg.png" alt="">
                <span>本月概况</span>
            </p>
        </div>
        <div class="common-content">
            <ul class="info-list">
                <li>
                    <p>接待次数</p>
                    <label>{{baseInfo.jd}}</label>
                </li>
                <li>
                    <p>用车次数</p>
                    <label>{{baseInfo.yc}}</label>
                </li>
                <li>
                    <p>入住次数</p>
                    <label>{{baseInfo.rz}}</label>
                </li>
                <li>
                    <p>用餐次数</p>
                    <label>{{baseInfo.ycan}}</label>
                </li>
            </ul>
        </div>
    </div>
    <div class="common-card">
        <div class="card-title">
            <p>
                <img src="./yanshi/titlebg.png" alt="">
                <span>接待次数</span>
            </p>
        </div>
        <div class="common-content">
            <div class="echart-box" ref="receptionBar" style="height:280px"></div>
        </div>
    </div>
    <div class="common-card">
        <div class="card-title">
            <p>
                <img src="./yanshi/titlebg.png" alt="">
                <span>车辆情况</span>
            </p>
        </div>
        <div class="common-content">
            <div class="echart-box" ref="carPie" style="height:200px"></div>
        </div>
    </div>
    <div class="common-card">
        <div class="card-title">
            <p>
                <img src="./yanshi/titlebg.png" alt="">
                <span>入住趋势</span>
            </p>
            <label>{{nowDate}}</label>
        </div>
        <div class="common-content">
            <div class="echart-box" ref="checkinLine" style="height:280px"></div>
        </div>
    </div>
    <div class="common-card">
        <div class="card-title">
            <p>
                <img src="./yanshi/titlebg.png" alt="">
                <span>用餐占比</span>
            </p>
        </div>
        <div class="common-content">
            <div class="meal-container">
                <div class="meal-list" v-for="(item,index) in mealData" :key="index">
                    <van-circle v-model="item.rate" :rate="item.rate" :speed="100" :stroke-width="120" :layer-color="`${mealColor[index]}0.2)`" :color="`${mealColor[index]}1)`" size="90px">
                        <template #default>
                            <div class="pie-text">
                                <p :style="`color:${mealColor[index]}1)`">
                                    <label :style="`color:${mealColor[index]}1)`">{{item.rate}}</label>%
                                </p>
                                <span :style="`color:${mealColor[index]}1)`">{{item.num}}次</span>
                            </div>
                        </template>
                    </van-circle>
                    <p>{{item.title}}</p>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import * as echarts from 'echarts'
export default {
    name: 'officialStatistic',
    components: {},
    props: {},
    data() {
        return {
            nowDate: moment().format('YYYY-MM'),
            baseInfo: {},
            mealColor: ['rgba(26,201,255,', 'rgb(15,199,121,', 'rgb(91,143,249,', 'rgb(244,93,65,'],
            receptionData: [], //接待次数
            carData: [], //用车情况
            checkinData: [], //入住情况
            mealData: [], //用餐占比
        }
    },
    computed: {},
    watch: {},
    created() {

    },
    mounted() {
        this.getData();
    },
    methods: {
        barEchart() {
            let mychart = echarts.init(this.$refs.receptionBar);
            let option = {
                color: ['#0091FF', '#E93F3F'],
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
                    right: '5%',
                    bottom: '10%',
                    top: '10%',
                    containLabel: true,
                    z: 22
                },
                xAxis: {
                    type: 'category',
                    data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
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
                yAxis: {
                    min: 0,
                    type: 'value',
                    axisTick: {
                        show: false
                    },
                    // name: '人',
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
                },
                series: [{
                    name: '接待次数',
                    type: 'bar',
                    data: this.receptionData
                }]
            };
            mychart.clear();
            mychart.setOption(option);
            window.onresize = () => {
                mychart.resize();
            }

        },
        pieEchart(el) {
            let mychart = echarts.init(this.$refs.carPie);
            let option = {
                color: ['#13C2C2', '#F04864', '#FACC14', '#2FC25B', '#8543E0', '#1890FF'],
                tooltip: {
                    trigger: 'item'
                },
                legend: {
                    orient: 'vertical',
                    top: 'middle',
                    right: 10,
                    textStyle: {
                        fontSize: 12,
                    },
                    formatter:function (name) {
                      let total=0;
                      for (let i=0;i<option.series[0].data.length;i++){
                        total+=option.series[0].data[i].value;
                      }
                      for (let i=0;i<option.series[0].data.length;i++){
                        var dpercent=(option.series[0].data[i].value/total*100).toFixed(2)+'%'
                        if (option.series[0].data[i].name===name){
                        //可以显示名称和值和百分比
                        // return name+’ ‘+option.series[0].data[i].value+’’+dpercent;
                        //只显示名称和百分比
                        return name+' '+dpercent;
                      }
                      }
                    }
                },
                series: [{
                    type: 'pie',
                    center: ['40%', '50%'],
                    radius: '60%',
                    labelLine: {
                        show: false
                    },
                    label: {
                        show: false
                    },
                    data: this.carData

                }]
            };
            mychart.clear();
            mychart.setOption(option);
            window.onresize = () => {
                mychart.resize();
            }
        },
        lineEchart() {
            let names = Array.from({
                length: this.checkinData.length || 31
            }, (v, k) => k + 1);
            let mychart = echarts.init(this.$refs.checkinLine);
            let option = {
                tooltip: {
                    trigger: 'axis',
                },
                grid: {
                    left: '5%',
                    right: '5%',
                    bottom: '10%',
                    top: '10%',
                    containLabel: true,
                    z: 22
                },
                xAxis: [{
                    type: 'category',
                    boundaryGap: false,
                    axisTick: {
                        show: false
                    },
                    axisLabel: {
                        show: true,
                        interval: 14,
                        fontSize: 12
                    },
                    axisLine: {
                        lineStyle: {
                            color: "#999999",
                        }
                    },
                    data: names
                }],
                yAxis: [{
                    name: '',
                    nameTextStyle: {
                        color: 'rgba(212, 232, 254, 1)',
                        fontSize: 12
                    },
                    // min: 0,
                    axisTick: {
                        show: false
                    },
                    // name: '人',
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
                    name: '入住人数',
                    type: 'line',
                    symbol: 'circle', // 默认是空心圆（中间是白色的），改成实心圆
                    showAllSymbol: true,
                    symbolSize: 0,
                    smooth: true,
                    lineStyle: {
                        normal: {
                            width: 2,
                            color: '#3296fa' // 线条颜色
                        },
                    },
                    itemStyle: {
                        color: '#333',
                        borderColor: '#646ace',
                        borderWidth: 0
                    },
                    tooltip: {
                        show: true
                    },
                    data: this.checkinData
                }]
            };
            mychart.clear();
            mychart.setOption(option);
            window.onresize = () => {
                mychart.resize();
            }
        },
        getData() {
            let that = this;
            let month = new Date().getMonth() + 1;
            dsf.http.post('ctrl/official/statistics/getCurrentData', {
                month: month
            }).then((res) => {
                if (res && res.data && res.data.code == 200 && res.data.data) {
                    let data = res.data.data;
                    that.baseInfo = data.baseInfo;
                    that.receptionData = data.receptionData;
                    that.carData = data.carData;
                    that.checkinData = data.checkinData;
                    that.mealData = data.mealData;
                    that.$nextTick(() => {
                        that.barEchart();
                        that.pieEchart();
                        that.lineEchart();
                    })
                }
            })
        }
    }
}
</script>

<style lang="scss" scoped>
.officialStatistic {
    width: 100%;
    padding: 10px;
    box-sizing: border-box;

    .common-card {
        width: 100%;
        height: auto;
        padding: 10px;
        box-sizing: border-box;
        background: #FFFFFF;
        box-shadow: 0px 1px 8px 0px rgba(194, 194, 194, 0.5);
        border-radius: 5px;
        margin-bottom: 10px;

        .card-title {
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin-bottom: 10px;

            p {
                display: flex;
                align-items: center;

                img {
                    width: 5px;
                    height: 18px;
                    margin-right: 5px;
                }

                span {
                    font-size: var(--font_size_1);
                    color: #333333;
                    font-weight: 600;
                }
            }

            label {
                color: #333333;
                font-size: var(--font_size_2);
            }
        }

        .common-content {
            width: 100%;
            height: auto;

            .info-list {
                width: 100%;
                height: 70px;
                display: flex;
                align-items: center;
                justify-content: space-between;

                li {
                    // width: 30%;
                    height: 100%;
                    box-sizing: border-box;
                    background: #F7F8FA;
                    border: 1px solid rgba(236, 236, 236, 1);
                    border-radius: 10px;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                    flex: 1;
                    margin: 0 5px;

                    p {
                        font-size: var(--font_size_3);
                        color: #333333;
                        font-weight: 700;
                        margin-bottom: 5px;
                    }

                    label {
                        font-size: var(--font_size_0);
                        color: #E93F3F;
                        line-height: 20px;
                        font-weight: 700;
                    }
                }
            }

            .echart-box {
                width: 100%;
                height: 300px;
            }

            .meal-container {
                display: flex;
                flex-wrap: wrap;

                .meal-list {
                    width: 50%;
                    padding: 10px 0;
                    box-sizing: border-box;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;

                    p {
                        color: #999;
                        font-size: var(--font_size_3);
                        margin-top: 10px;
                    }

                    .pie-text {
                        width: 100%;
                        height: 100%;
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                        justify-content: center;

                        p {
                            font-size: var(--font_size_2);
                            margin: 0;

                            label {
                                font-size: 22px;
                                font-weight: 600;
                            }
                        }

                        span {
                            font-size: var(--font_size_3);
                        }
                    }
                }
            }
        }

    }
}
</style>

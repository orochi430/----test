<template>
<div class="personStatistic" :style="{ height: `calc(100vh - ${$store.state.isShowAppHeader ? '0.92rem' : '0px'} - ${$store.state.isShowAppFooter ? '1.2rem' : '0px'})` }">
    <div class="common-card">
        <div class="card-title">
            <p>
                <img src="./yanshi/titlebg.png" alt="">
                <span>基本信息</span>
            </p>
        </div>
        <div class="common-content">
            <ul class="info-list">
                <li>
                    <p>总人数</p>
                    <label>{{baseInfo.count || 0}}</label>
                </li>
                <li>
                    <p>本月入职</p>
                    <label>{{baseInfo.rz || 0}}</label>
                </li>
                <li>
                    <p>本月离职</p>
                    <label>{{baseInfo.lz || 0}}</label>
                </li>
            </ul>
            <div class="echart-container">
                <div class="echart" ref="infoPie"></div>
                <div class="echart" ref="infoRadar"></div>
            </div>
        </div>
    </div>
    <div class="common-card">
        <div class="card-title">
            <p>
                <img src="./yanshi/titlebg.png" alt="">
                <span>入离职人数对比图</span>
            </p>
        </div>
        <div class="common-content">
            <div class="echart-box" ref="contrastBar"></div>
        </div>
    </div>
    <div class="common-card">
        <div class="card-title">
            <p>
                <img src="./yanshi/titlebg.png" alt="">
                <span>各部门请假人数统计</span>
            </p>
        </div>
        <div class="common-content">
            <div class="echart-box" ref="leaveBar"></div>
        </div>
    </div>
</div>
</template>

<script>
import * as echarts from 'echarts'
export default {
    name: 'personStatistic',
    components: {},
    props: {},
    data() {
        return {
            baseInfo: {}, //基本信息
            gender: {}, //性别分类
            degree: [{
                    text: '大专',
                    value: 0
                },
                {
                    text: '大学本科',
                    value: 0
                },
                {
                    text: '硕士',
                    value: 0
                },
                {
                    text: '博士',
                    value: 0
                },
                {
                    text: '未知',
                    value: 0
                }
            ], //学历分类
            rlzData: {
                names: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
                values: [{
                        name: '离职人数',
                        type: 'bar',
                        data: [18203, 23489, 29034, 104970, 131744, 630230, 18203, 23489, 29034, 104970, 131744, 630230]
                    },
                    {
                        name: '入职人数',
                        type: 'bar',
                        data: [19325, 23438, 31000, 121594, 134141, 681807, 19325, 23438, 31000, 121594, 134141, 681807]
                    }
                ]
            }, //入离职人数对比
            leaveData: {
                names: [],
                values: [{
                    name: '请假人数',
                    type: 'bar',
                    barMaxWidth: 25,
                    data: []
                }]
            }
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
        pieEchart() {
            let mychart = echarts.init(this.$refs.infoPie);
            let option = {
                series: [{
                    type: 'pie',
                    color: ['#3296fa', '#E93F3F', '#8543E0'],
                    radius: ['30%', '50%'],
                    avoidLabelOverlap: false,
                    label: {
                        position: 'outer',
                        formatter: '{b}\n{d}%',
                        distanceToLabelLine: -15,
                        fontSize: 12,
                        lineHeight: 15
                    },
                    labelLine: {
                        lineStyle: {
                            color: '#999'
                        },
                        length: 5,
                        length2: 20,
                    },
                    data: this.gender
                }]
            }
            mychart.clear();
            mychart.setOption(option);
            window.onresize = () => {
                mychart.resize();
            }
        },
        radarEchart() {
            let value = this.degree.map(item => item.value)
            let indicator = this.degree.map(item => {
                return {
                    name: item.text,
                    max: Math.max(...value)
                }
            })
            let mychart = echarts.init(this.$refs.infoRadar);
            let option = {
                tooltip: {},
                radar: [{
                    indicator: indicator,
                    radius: '45%',
                    // splitNumber: 4,
                    splitArea: {
                        show: false,
                    },
                    axisLine: {
                        show: false
                    },
                    name: {
                        textStyle: {
                            color: '#333',
                            fontSize: 12,
                        }
                    },
                    nameGap: 3
                }],
                series: [{
                    type: 'radar',
                    color: "#3296fa",
                    // radarIndex: 0,
                    symbol: 'none',
                    data: [{
                        value: value,
                    }]
                }]
            }
            mychart.clear();
            mychart.setOption(option);
            window.onresize = () => {
                mychart.resize();
            }
        },
        barEchart(el, dataSource) {
            let mychart = echarts.init(this.$refs[el]);
            let option = {
                color: ['#0091FF', '#E93F3F'],
                legend: {
                    bottom: '3%',
                    show: dataSource.values.length > 1 ? true : false
                },
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
                    bottom: '15%',
                    top: '10%',
                    containLabel: true,
                    z: 22
                },
                xAxis: {
                    type: 'category',
                    data: dataSource.names,
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
                series: dataSource.values
            };
            mychart.clear();
            mychart.setOption(option);
            window.onresize = () => {
                mychart.resize();
            }
        },
        getData() {
            let that = this;
            dsf.http.get('ctrl/hr/statistics/base').then((res) => {
                console.log(res.data.data)
                if (res && res.data && res.data.code == 200 && res.data.data) {
                    let data = res.data.data;
                    that.baseInfo = data.base;
                    that.gender = data.gender.map(item => {
                        return {
                            name: item.type,
                            value: item.count
                        }
                    });
                    that.degree.forEach((item, index) => {
                        data.degree.forEach((el) => {
                            if (item.text == el.type) {
                                that.degree[index].value = Number(el.count)
                            }
                        })
                    })
                    console.log(that.degree)
                    that.rlzData.values[0].data = data.lz;
                    that.rlzData.values[1].data = data.rz;
                    data.leave.forEach(item => {
                        that.leaveData.names.push(item.type)
                        that.leaveData.values[0].data.push(Number(item.count))
                    })
                    that.$nextTick(() => {
                        that.pieEchart();
                        that.radarEchart();
                        that.barEchart('contrastBar', that.rlzData)
                        that.barEchart('leaveBar', that.leaveData)
                    })
                }
            })
        }
    }
}
</script>

<style lang="scss" scoped>
.personStatistic {
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

            .echart-container {
                width: 100%;
                display: flex;
                align-items: center;
                justify-content: space-between;

                .echart {
                    width: 50%;
                    height: 150px;
                }
            }

            .echart-box {
                width: 100%;
                height: 300px;
            }
        }

    }
}
</style>

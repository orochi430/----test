<template>
<div class="organization">
    <div class="bwnx">
        <div class="commtitle">办文效能</div>
        <div class="xnbox">
            <div class="xnleft">
                <div>
                    <span>办文总数</span>
                    <span>98</span>
                </div>
                <div>
                    <span>办结文件</span>
                    <span>76</span>
                </div>
                <div>
                    <span>在办文件</span>
                    <span>22</span>
                </div>
                <div>
                    <span>超期文件</span>
                    <span>4</span>
                </div>
            </div>
            <div class="xnright">
                <div class="chat" ref="chat1"></div>
            </div>
        </div>
    </div>
    <div class="bwnx">
        <div class="commtitle">超期文件</div>
        <div class="wjtypes">
            <span>收文：1</span>
            <span>发文：2</span>
            <span>签报：1</span>
        </div>
        <div class="items">
            <div class="item">
                <span class="name">办公室</span>
                <p class="percent">
                    <span style="background: #F7B500; width: 62px;"></span>
                </p>
                <span class="num">1</span>
            </div>
            <div class="item">
                <span class="name">局领导</span>
                <p class="percent">
                    <span style="background: #0091FF;width: 124px;"></span>
                    <span style="background: #6DD400;width: 62px;"></span>
                </p>
                <span class="num">3</span>
            </div>
        </div>
    </div>
    <div class="bwnx">
        <div class="commtitle">运转平均耗时</div>
        <div class="chart2" ref="chat2">

        </div>
    </div>
    <div class="bwnx">
        <div class="commtitle">办会效能</div>
        <div class="banhui">
            <div>
                <div>
                    <p>
                        <span style="color: #0091FF;">73</span>
                        <span>个</span>
                    </p>
                    <span>会议总数</span>
                </div>
                <div>
                    <p>
                        <span style="color: #44D7B6;">621</span>
                        <span>人次</span>
                    </p>
                    <span>会议人次</span>
                </div>
                <div>
                    <p>
                        <span style="color: #F7B500;">139</span>
                        <span>小时</span>
                    </p>
                    <span>会议时长</span>
                </div>
            </div>
            <div>
                <div>
                    <p>
                        <span style="color: #0091FF;">73</span>
                        <span>个</span>
                    </p>
                    <span>会议室总数</span>
                </div>
                <div>
                    <p>
                        <span style="color: #44D7B6;">64</span>
                        <span>%</span>
                    </p>
                    <span>会议室使用率</span>
                </div>
            </div>
        </div>
    </div>
    <div class="bwnx">
        <div class="commtitle">会议类型</div>
        <div class="chart2" ref="chat3">

        </div>
    </div>
    <div class="bwnx">
        <div class="commtitle">会议室使用率</div>
        <div class="chart2" ref="chat4">

        </div>
    </div>
    <div class="bwnx">
        <div class="commtitle">督办效能</div>
        <div class="xnbox" style="height: auto;">
            <div class="xnleft xnleft1">
                <div>
                    <span>立项</span>
                    <span>20</span>
                </div>
                <div>
                    <span>办结</span>
                    <span>8</span>
                </div>
                <div>
                    <span>在办</span>
                    <span>12</span>
                </div>
                <div>
                    <span>反馈</span>
                    <span>43</span>
                </div>
            </div>
            <div class="xnright1">
                <div class="chat" ref="chat5"></div>
                <div class="chat" ref="chat6"></div>
            </div>
        </div>
    </div>
    <div class="bwnx">
        <div class="commtitle">办会效能</div>
        <div class="fenxian">
            <div>
                <span style="color: #F7B500;">5</span>
                <span>延期数</span>
            </div>
            <div>
                <span style="color: #0091FF;">5</span>
                <span>催办任务</span>
            </div>
            <div>
                <span style="color: #FA6400;">1</span>
                <span>超期数</span>
            </div>
        </div>
    </div>
    <div class="bwnx">
        <div class="commtitle">督办类型</div>
        <div class="chart2" ref="chat7">

        </div>
    </div>
</div>
</template>

<script>
import echarts from 'echarts'
export default {
    name: 'organization',
    components: {},
    data() {
        return {

        };
    },
    computed: {},
    watch: {},
    methods: {
        initChart1() {
            var myChart = echarts.init(this.$refs.chat1);
            var option = {
                series: [{
                    type: 'gauge',
                    "center": ["50%", "70%"],
                    "radius": "100%",
                    "startAngle": 200,
                    "endAngle": -20,
                    axisLine: {
                        lineStyle: {
                            width: 20,
                            color: [
                                [0.25, '#f5631f'],
                                [0.5, '#f3b529'],
                                [0.75, '#2a90fc'],
                                [1, '#53d7b6']
                            ]
                        }
                    },
                    pointer: {
                        length: '40%',
                        width: 5,
                        itemStyle: {
                            offsetCenter: [20, 0],
                            color: '#53d7b6'
                        }
                    },
                    axisTick: {
                        show: false,
                        distance: -30,
                        length: 8,
                        lineStyle: {
                            color: '#fff',
                            width: 2
                        }
                    },
                    splitLine: {
                        show: false,
                        distance: -30,
                        length: 30,
                        lineStyle: {
                            color: '#fff',
                            width: 4
                        }
                    },
                    axisLabel: {
                        show: false,
                        color: 'inherit',
                        distance: 40,
                        fontSize: 12
                    },
                    detail: {
                        valueAnimation: true,
                        "formatter": "{percent|{value}%}\n{word|办结率}",
                        "rich": {
                            "percent": {
                                "fontSize": 18,
                                "lineHeight": 28,
                                "color": "#53d7b6",
                                "fontWeight": '600',
                                "padding": [30, 0, 0, 7]
                            },
                            "word": {
                                "fontSize": 14,
                                "lineHeight": 28,
                                "color": "#000",
                                "fontFamily": 'pf',
                                "padding": [-30, 0, 0, 7]
                            }
                        },
                        "offsetCenter": [0, "-5%"],
                        "textStyle": {
                            "fontSize": 14,
                            "color": "#53d7b6"
                        },
                    },
                    data: [{
                        value: 70
                    }]
                }]
            };
            myChart.clear()
            myChart.setOption(option);

        },
        initChart2() {

            var myChart = echarts.init(this.$refs.chat2);
            var option = {
                color: ["#44D7B6", "#0091FF", "#FA6400"],
                xAxis: {
                    data: ['收文', '发文', '签报'],
                    axisLine: {
                        show: false,
                    },
                    axisTick: {
                        show: false
                    },
                    axisLabel: {
                        show: true,
                        fontSize: 14,
                        color: "#333"
                    },
                },
                yAxis: {
                    name: "小时",
                    nameTextStyle: {
                        fontSize: 14,
                        color: "#333",
                        padding: [0, 0, 0, -40]
                    },
                    min: 0,
                    type: 'value',
                    axisLine: {
                        show: false,
                    },
                    splitLine: {
                        show: true,
                        lineStyle: {
                            color: "#ebebeb"
                        },
                    },
                    axisTick: {
                        show: false
                    },
                    axisLabel: {
                        show: true,
                        fontSize: 14,
                        color: "#333"
                    },
                    boundaryGap: ['20%', '20%']
                },
                dataGroupId: '',
                animationDurationUpdate: 500,
                series: {
                    type: 'bar',
                    id: 'sales',
                    barWidth: 45,
                    data: [{
                            value: 88,
                            groupId: '收文',
                            itemStyle: {
                                color: "#44D7B6"
                            }
                        },
                        {
                            value: 16,
                            groupId: '发文',
                            itemStyle: {
                                color: "#0091FF"
                            }
                        },
                        {
                            value: 32,
                            groupId: '签报',
                            itemStyle: {
                                color: "#FA6400"
                            }
                        }
                    ],
                    universalTransition: {
                        enabled: true,
                        divideShape: 'clone'
                    }
                }
            };
            myChart.clear()
            myChart.setOption(option, true);

        },
        initChart3() {
            var myChart = echarts.init(this.$refs.chat3);
            var option = {
                color: ["#0091FF", "#44D7B6", "#F7B500 ", "#6236FF"],
                tooltip: {
                    trigger: 'item'
                },
                title: {
                    padding:[0,0,0,-25],
                    text: "会议量",
                    left: '30%',
                    top: '38%',
                    textStyle: {
                        fontSize: 18,
                        color: "#333333"

                    },
                    subtext: " 73",
                    subtextStyle: {
                        fontSize: 24,
                        color: "#333333",
                        fontWeight: "bold",
                        width: 60,
                        align: 'right',
                        lineHeight: 40
                    }
                },
                legend: {
                    top: 'center',
                    left: '70%',
                    orient: "vertical",
                    icon: "circle",
                    itemWidth: 10,
                    itemHeight: 10,
                    itemGap: 20,
                    textStyle: {
                        color: "#333",
                        fontSize: 14,
                    }
                },
                series: [{
                    type: 'pie',
                    radius: ['40%', '65%'],
                    center: ['30%', '50%'],
                    avoidLabelOverlap: false,
                    label: {
                        show: false,
                        position: 'center'
                    },
                    emphasis: {
                        label: {
                            show: false,
                            fontSize: 40,
                            fontWeight: 'bold'
                        }
                    },
                    labelLine: {
                        show: false
                    },
                    data: [{
                            value: 13,
                            name: '办公会'
                        },
                        {
                            value: 20,
                            name: '党委会'
                        },
                        {
                            value: 10,
                            name: '内部会'
                        },
                        {
                            value: 40,
                            name: '专题会'
                        }
                    ]
                }]
            };
            myChart.clear()
            myChart.setOption(option);

        },
        initChart4() {
            var myChart = echarts.init(this.$refs.chat4);
            var option = {
                xAxis: {
                    data: ['101', '201', '301', '401', '501', '601'],
                    axisLine: {
                        show: false,
                    },
                    axisTick: {
                        show: false
                    },
                    axisLabel: {
                        show: true,
                        fontSize: 14,
                        color: "#333"
                    },
                },
                yAxis: {
                    name: "%",
                    nameTextStyle: {
                        fontSize: 14,
                        color: "#333",
                        padding: [0, 0, 0, -40]
                    },
                    min: 0,
                    max:100,
                    type: 'value',
                    axisLine: {
                        show: false,
                    },
                    splitLine: {
                        show: true,
                        lineStyle: {
                            color: "#ebebeb"
                        },
                    },
                    axisTick: {
                        show: false
                    },
                    axisLabel: {
                        show: true,
                        fontSize: 14,
                        color: "#333"
                    },
                    boundaryGap: ['20%', '20%']
                },
                series: [{
                    data: [99, 50, 55, 28, 36, 45],
                    type: 'line',
                    lineStyle: {
                        color: "#F7B500 "
                    },
                    areaStyle: {
                        opacity: 0.8,
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                offset: 0,
                                color: 'rgba(247,181,0,0.76)'
                            },
                            {
                                offset: 1,
                                color: 'rgba(252,219,0,0.00)'
                            }
                        ])
                    },
                }]
            };

            myChart.setOption(option);

        },
        initChart5(el, name, percent) {
            var myChart = echarts.init(el);
            var option = {
                series: [{
                    type: 'gauge',
                    "center": ["50%", "70%"],
                    "radius": "130%",
                    "startAngle": 200,
                    "endAngle": -20,
                    axisLine: {
                        lineStyle: {
                            width: 10,
                            color: [
                                [0.25, '#f5631f'],
                                [0.5, '#f3b529'],
                                [0.75, '#2a90fc'],
                                [1, '#53d7b6']
                            ]
                        }
                    },
                    pointer: {
                        length: '40%',
                        width: 3,
                        itemStyle: {
                            offsetCenter: [20, 0],
                            color: '#53d7b6'
                        }
                    },
                    axisTick: {
                        show: false,
                        distance: -30,
                        length: 8,
                        lineStyle: {
                            color: '#fff',
                            width: 2
                        }
                    },
                    splitLine: {
                        show: false,
                        distance: -30,
                        length: 30,
                        lineStyle: {
                            color: '#fff',
                            width: 4
                        }
                    },
                    axisLabel: {
                        show: false,
                        color: 'inherit',
                        distance: 40,
                        fontSize: 12
                    },
                    detail: {
                        valueAnimation: true,
                        "formatter": "{percent|" + percent + "%}\n{word|" + name + "}",
                        "rich": {
                            "percent": {
                                "fontSize": 18,
                                "lineHeight": 28,
                                "color": "#53d7b6",
                                "fontWeight": '600',
                                "padding": [20, 0, 0, 7]
                            },
                            "word": {
                                "fontSize": 16,
                                "lineHeight": 28,
                                "color": "#000",
                                "fontFamily": 'pf',
                                "padding": [-10, 0, 0, 7]
                            }
                        },
                        "offsetCenter": [0, "-5%"],
                        "textStyle": {
                            "fontSize": 14,
                            "color": "#53d7b6"
                        },
                    },
                    data: [{
                        value: percent
                    }]
                }]
            };
            myChart.clear()
            myChart.setOption(option);

        },
        initChart6() {
            var myChart = echarts.init(this.$refs.chat7);
            var option = {
                color: ["#0091FF", "#44D7B6", "#F7B500 ", "#FA6400", "#32C5FF"],
                tooltip: {
                    trigger: 'item'
                },
                legend: {
                    top: 'center',
                    left: '60%',
                    orient: "vertical",
                    icon: "circle",
                    itemWidth: 10,
                    itemHeight: 10,
                    itemGap: 20,
                    textStyle: {
                        color: "#333",
                        fontSize: 14,
                    }
                },
                series: [{
                    type: 'pie',
                    center: ['30%', '50%'],
                    radius: ['0', '60%'],
                    avoidLabelOverlap: false,
                    label: {
                        show: false,
                        position: 'center'
                    },
                    emphasis: {
                        label: {
                            show: false,
                            fontSize: 40,
                            fontWeight: 'bold'
                        }
                    },
                    labelLine: {
                        show: false
                    },
                    data: [{
                            value: 13,
                            name: '会议决议'
                        },
                        {
                            value: 20,
                            name: '领导批示'
                        },
                        {
                            value: 10,
                            name: '上级来文'
                        },
                        {
                            value: 40,
                            name: '年度重点工作'
                        },
                        {
                            value: 10,
                            name: '重要事项'
                        }
                    ]
                }]
            };
            myChart.clear()
            myChart.setOption(option);

        },
    },
    created() {},
    mounted() {
        this.initChart1()
        this.initChart2()
        this.initChart3()
        this.initChart4()
        this.initChart5(this.$refs.chat5, "办结率", 70)
        this.initChart5(this.$refs.chat6, "反馈率", 80)
        this.initChart6()
    },
    destroyed() {},
}
</script>

<style lang="scss" src="./style/index.scss" scoped></style>

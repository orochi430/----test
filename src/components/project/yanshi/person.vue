<template>
<div class="organization">
    <div class="bwnx">
        <div class="commtitle">办文效能</div>
        <div class="grxn">
            <div class="jj">
                <div>
                    <img src="./yanshi/jj.png" alt="" srcset="">
                    <span class="name">紧急</span>
                    <span class="num" style="color: #F7B500;">1</span>
                </div>
                <div>
                    <img src="./yanshi/cq.png" alt="" srcset="">
                    <span class="name">超期</span>
                    <span class="num" style="color: #FA6400;">0</span>
                </div>
                <div>
                    <img src="./yanshi/zy.png" alt="" srcset="">
                    <span class="name">重要</span>
                    <span class="num" style="color: #E02020;">0</span>
                </div>
            </div>
            <div class="weiban">
                <div>
                    <span>24小时内未办</span>
                    <span style="color:#44D7B6">0</span>
                </div>
                <div>
                    <span>48小时内未办</span>
                    <span style="color:#0091FF">0</span>
                </div>
                <div>
                    <span>72小时内未办</span>
                    <span style="color:#F7B500">0</span>
                </div>
                <div>
                    <span>72小时以上未办</span>
                    <span style="color:#FA6400">0</span>
                </div>
            </div>
        </div>
    </div>
    <div class="bwnx">
        <div class="xnleft2">
            <div>
                <span>办文总数</span>
                <span>98</span>
            </div>
            <div>
                <span>拟稿文件</span>
                <span>4</span>
            </div>
            <div>
                <span>经办文件</span>
                <span>17</span>
            </div>
            <div>
                <span>在办文件</span>
                <span>22</span>
            </div>
            <div>
                <span>超期文件</span>
                <span>22</span>
            </div>
            <div>
                <span>办结文件</span>
                <span>4</span>
            </div>
        </div>
    </div>
    <div class="bwnx">
        <div class="commtitle">环节办理耗时</div>
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
                    <span>已参加会议</span>
                </div>
                <div>
                    <p>
                        <span style="color: #44D7B6;">73</span>
                        <span>个</span>
                    </p>
                    <span>待参加会议</span>
                </div>
                <div>
                    <p>
                        <span style="color: #F7B500;">621</span>
                        <span>小时</span>
                    </p>
                    <span>总时长</span>
                </div>
                <div>
                    <p>
                        <span style="color: #F7B500;">139</span>
                        <span>小时</span>
                    </p>
                    <span>平均时长</span>
                </div>
            </div>
            <div>
                <div>
                    <p>
                        <span style="color: #0091FF;">3</span>
                        <span>次</span>
                    </p>
                    <span>会议室预定次数</span>
                </div>
                <div>
                    <p>
                        <span style="color: #0091FF;">6</span>
                        <span>个</span>
                    </p>
                    <span>会议室预定时长</span>
                </div>
                <div>
                    <p>
                        <span style="color: #44D7B6;">25</span>
                        <span>人</span>
                    </p>
                    <span>参会人数</span>
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
        <div class="commtitle">督办效能</div>
        <div class="xnbox" style="height: auto;">
            <div class="xnleft xnleft3">
                <div>
                    <span>承办</span>
                    <span>12</span>
                </div>
                <div>
                    <span>反馈</span>
                    <span>43</span>
                </div>
            </div>
            <div class="xnright3">
                <div class="chat" ref="chat5"></div>
            </div>
        </div>
    </div>
    <div class="bwnx">
        <div class="commtitle">督办反馈</div>
        <div class="fenxian">
            <div>
                <span style="color: #FA6400;">5</span>
                <span>临期未反馈</span>
            </div>
            <div>
                <span style="color: #E02020;">5</span>
                <span>超期未反馈</span>
            </div>
            <div>
                <span style="color: #F7B500;">1</span>
                <span>待反馈</span>
            </div>
            <div>
                <span style="color: #44D7B6;">1</span>
                <span>已反馈</span>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import echarts from 'echarts'
export default {
    name: 'person',
    components: {},
    data() {
        return {

        };
    },
    computed: {},
    watch: {},
    methods: {

        initChart2() {

            var myChart = echarts.init(this.$refs.chat2);
            var option = {
                color: ["#44D7B6", "#0091FF", "#FA6400"],
                xAxis: {
                    data: ['收文-部门承办', '发文-签发', '签报-部门会签'],
                    axisLine: {
                        show: false,
                    },
                    axisTick: {
                        show: false
                    },
                    axisLabel: {
                        show: true,
                        fontSize: 14,
                        color: "#333",
                        rotate: -25,
                        padding: [10, 0, 0, -20]
                    },
                },
                yAxis: {
                    name: "小时",
                    nameTextStyle: {
                        fontSize: 14,
                        color: "#333",
                        padding: [10, 0, 0, -20]
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
                        color: "#333",

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
                    text: "会议量",
                    left: '21%',
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
                    radius: ['40%', '60%'],
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

        }
    },
    created() {},
    mounted() {
        this.initChart2()
        this.initChart3()
        this.initChart5(this.$refs.chat5, "办结率", 70)
    },
    destroyed() {},
}
</script>

<style lang="scss" src="./style/index.scss" scoped></style>

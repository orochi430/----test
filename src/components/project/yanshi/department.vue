<template>
<div class="organization">
    <div class="bwnx">
        <div class="commtitle">办文效能</div>
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
        <div class="commtitle">超期文件</div>
        <div class="cqlist">
            <div>
                <p>[签报] 关于xxx项目执行情况的说明报告</p>
                <p>
                    <span>
                        <van-icon name="contact" />
                        张晓林
                    </span>
                    <span>
                        <van-icon name="underway-o" />
                        超期一天
                    </span>
                </p>
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
                        <span style="color: #0091FF;">15</span>
                        <span>个</span>
                    </p>
                    <span>发起会议总数</span>
                </div>
                <div>
                    <p>
                        <span style="color: #44D7B6;">112</span>
                        <span>人次</span>
                    </p>
                    <span>发起人次</span>
                </div>
                <div>
                    <p>
                        <span style="color: #F7B500;">38</span>
                        <span>小时</span>
                    </p>
                    <span>总时长</span>
                </div>
                <div>
                    <p>
                        <span style="color: #F7B500;">2.5</span>
                        <span>小时</span>
                    </p>
                    <span>平均时长</span>
                </div>
            </div>
            <div>
                <div>
                    <p>
                        <span style="color: #0091FF;">33</span>
                        <span>个</span>
                    </p>
                    <span>参加会议总数</span>
                </div>
                <div>
                    <p>
                        <span style="color: #44D7B6;">70</span>
                        <span>人次</span>
                    </p>
                    <span>参加人次</span>
                </div>
                <div>
                    <p>
                        <span style="color: #F7B500;">62</span>
                        <span>小时</span>
                    </p>
                    <span>总时长</span>
                </div>
                <div>
                    <p>
                        <span style="color: #F7B500;">1.8</span>
                        <span>小时</span>
                    </p>
                    <span>平均时长</span>
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
            <div class="xnleft xnleft1">
                <div>
                    <span>立项</span>
                    <span>3</span>
                </div>
                <div>
                    <span>办结</span>
                    <span>0</span>
                </div>
                <div>
                    <span>在办</span>
                    <span>4</span>
                </div>
                <div>
                    <span>反馈</span>
                    <span>10</span>
                </div>
            </div>
            <div class="xnright1">
                <div class="chat" ref="chat5"></div>
                <div class="chat" ref="chat6"></div>
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
                <span style="color: #E02020;">4</span>
                <span>超期未反馈</span>
            </div>
            <div>
                <span style="color: #F7B500;">1</span>
                <span>延期</span>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import echarts from 'echarts'
export default {
    name: 'department',
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
                        fontSize: 12,
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
                        fontSize: 12,
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
                    padding: [0, 0, 0, -25],
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
                    "radius": "120%",
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
    },
    created() {},
    mounted() {
        this.initChart2()
        this.initChart3()
        this.initChart5(this.$refs.chat5, "办结率", 70)
        this.initChart5(this.$refs.chat6, "反馈率", 80)
    },
    destroyed() {},
}
</script>

<style lang="scss" src="./style/index.scss" scoped></style>

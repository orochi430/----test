<template>
<div class="organization" style="padding-top: 20px;">
    <!-- <div class="title">
        <div class="goback" @click="$router.go(-1)">
            <van-icon name="arrow-left" />
            <span>返回</span>
        </div>
        <span class="name">任务待办处理</span>
    </div> -->
    <div class="bwnx">
        <div class="commtitle">任务处理情况</div>
        <div class="fenxian">
            <div>
                <span style="color: #F7B500;">3233</span>
                <span>任务处理数</span>
            </div>
            <div>
                <span style="color: #44D7B6;">1334</span>
                <span>正常处理</span>
            </div>
            <div>
                <span style="color: #E02020;">16</span>
                <span>逾期处理</span>
            </div>
        </div>
        <div class="chart2" ref="chat1">

        </div>
    </div>
    <div class="bwnx">
        <div class="commtitle">任务类型</div>
        <div class="chart2" ref="chat5">

        </div>
    </div>
    <div class="bwnx">
        <div class="commtitle">本月任务整体进度</div>
        <div class="box">
            <div class="chart2" ref="chat6">

            </div>
            <div class="chart2" ref="chat7">

            </div>
            <div class="chart2" ref="chat8">

            </div>
            <div class="chart2" ref="chat9">

            </div>
        </div>
    </div>
</div>
</template>

<script>
import echarts from 'echarts'
export default {
    name: 'taskTotal',
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
                color: ["#44D7B6", "#0091FF"],
                tooltip: {
                    trigger: 'axis'
                },
                xAxis: {
                    data: ['1', '2', '3', '4', '5', '6', '7'],
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
                    // name: "万",
                    // nameTextStyle: {
                    //     fontSize: 14,
                    //     color: "#333",
                    //     padding: [0, 0, 0, -40]
                    // },
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
                series: [{
                        name: '正常反馈',
                        type: 'line',
                        data: [5, 7, 10, 3, 6, 15, 5],
                    },
                    {
                        name: '超期反馈',
                        type: 'line',
                        data: [7, 3, 14, 11, 8, 12, 8],
                    }
                ]
            };
            myChart.clear()
            myChart.setOption(option, true);

        },
        initChart5() {

            var myChart = echarts.init(this.$refs.chat5);
            var option = {
                color: ["#0091FF", "#44D7B6", "#FA6400"],
                xAxis: {
                    data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月'],
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
                legend: {
                    data: ["主办任务", "协办任务"],
                    bottom: 0,
                    left: 'center',
                    orient: "horizontal",
                    icon: "circle",
                    itemWidth: 10,
                    itemHeight: 10,
                    itemGap: 20,
                    textStyle: {
                        color: "#333",
                        fontSize: 14,
                    }
                },
                yAxis: {
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
                series: [{
                        name: "主办任务",
                        type: 'bar',
                        barWidth: 12,
                        data: [2, 3.5, 2.8, 4, 2.5, 4.2, 1.6]
                    },
                    {
                        name: "协办任务",
                        type: 'bar',
                        barWidth: 12,
                        data: [4.7, 2.8, 4.6, 4, 2.5, 4.2, 2.9]
                    }
                ]
            };
            myChart.clear()
            myChart.setOption(option, true);

        },

        initChart2(el, data) {
            var myChart = echarts.init(el);
            let option = {
                title: [{
                        text: "{a|" + data.percent + "%}",
                        show: true,
                        x: "center",
                        y: "35%",
                        textStyle: {
                            rich: {
                                a: {
                                    fontSize: 22,
                                    color: data.color[0],
                                    fontWeight: "bold",
                                },
                            },
                        },
                    },
                    {
                        text: data.name + '\n' + data.nums + '个',
                        x: "center",
                        y: "50%",
                        borderColor: "#fff",
                        textStyle: {
                            fontWeight: "normal",
                            fontSize: 16,
                            color: "#333",
                            lineHeight: 20
                        },
                    },
                ],
                polar: {
                    center: ["50%", "50%"],
                    radius: ["60%", "75%"],
                },
                angleAxis: {
                    max: 100,
                    show: false,
                },
                radiusAxis: {
                    type: "category",
                    show: true,
                    axisLabel: {
                        show: false,
                    },
                    axisLine: {
                        show: false,
                    },
                    axisTick: {
                        show: false,
                    },
                },
                series: [{
                    data: [data.percent],
                    name: "",
                    type: "bar",
                    roundCap: true,
                    showBackground: true,
                    backgroundStyle: {
                        color: "rgba(19, 84, 146, .1)",
                    },
                    coordinateSystem: "polar",
                    itemStyle: {
                        normal: {
                            color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [{
                                    offset: 0,
                                    color: data.color[1],
                                },
                                {
                                    offset: 1,
                                    color: data.color[0],
                                },
                            ]),
                        },
                    },
                }, ],
            }

            myChart.clear()
            myChart.setOption(option);

        }
    },
    created() {},
    mounted() {
        this.initChart1()
        this.initChart5()

        let data1 = {
            name: "非常紧急",
            percent: 10,
            nums: 10,
            color: ["#E02020", "#E020205e"]
        }
        let data2 = {
            name: "紧急任务",
            percent: 22,
            nums: 5,
            color: ["#ff8d00", "#ff8d005e"]
        }
        let data3 = {
            name: "普通任务",
            percent: 60,
            nums: 15,
            color: ["#83a168", "#83a1685e"]
        }
        let data4 = {
            name: "优先级低",
            percent: 0,
            nums: 0,
            color: ["#0091FF", "#0091FF5e"]
        }
        this.initChart2(this.$refs.chat6, data1)
        this.initChart2(this.$refs.chat7, data2)
        this.initChart2(this.$refs.chat8, data3)
        this.initChart2(this.$refs.chat9, data4)
    },
    destroyed() {},
}
</script>

<style lang="scss" src="./style/index.scss" scoped></style>

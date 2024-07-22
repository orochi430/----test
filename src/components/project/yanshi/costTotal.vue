<template>
<div class="organization" style="padding-top: 20px;">
    <!-- <div class="title">
        <div class="goback" @click="$router.go(-1)">
            <van-icon name="arrow-left" />
            <span>返回</span>
        </div>
        <span class="name">个人费用统计</span>
    </div> -->
    <div class="bwnx">
        <div class="commtitle">夜餐费</div>
        <div class="chart2" ref="chat1">

        </div>
    </div>
    <div class="bwnx">
        <div class="commtitle">劳务费</div>
        <div class="chart2" ref="chat2">

        </div>
    </div>
    <div class="bwnx">
        <div class="commtitle">出差报销</div>
        <div class="chart2" ref="chat3">

        </div>
        <div class="chart2" ref="chat4">

        </div>
    </div>
</div>
</template>

<script>
import echarts from 'echarts'
export default {
    name: 'costTotal',
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
                color: ["#0091FF"],
                grid:{
                    right:20
                },
                xAxis: {
                    data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
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
                        rotate: -45
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
                series: {
                    type: 'bar',
                    id: 'sales',
                    barWidth: 15,
                    data: [5, 7, 10, 14, 18, 22, 25, 30, 27, 24, 21, 11],
                    universalTransition: {
                        enabled: true,
                        divideShape: 'clone'
                    }
                }
            };
            myChart.clear()
            myChart.setOption(option, true);

        },
        initChart2(el, data) {
            var myChart = echarts.init(el);
            var option = {
                color: ["#0091FF", "#44D7B6", "#F7B500 ", "#FA6400", "#32C5FF"],
                tooltip: {
                    trigger: 'item'
                },
                legend: {
                    bottom: 10,
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
                series: [{
                    name: '报销',
                    type: 'pie',
                    radius: '40%',
                    data: data,
                    label: {
                        show: true,
                        position: 'outer',
                        alignTo: 'labelLine',
                        backgroundColor: 'auto',
                        height: 0,
                        width: 0,
                        lineHeight: 0,
                        distanceToLabelLine: 0,
                        borderRadius: 2.5,
                        padding: [-20, -2.5, 2.5, -2.5],
                        formatter: '{b|{b}:}\n{a|{d}%}',
                        rich: {
                            a: {
                                color: '#333',
                                fontSize: 14,
                                lineHeight:24,
                                fontWeight:"bold"
                            },
                            b: {
                                padding: [0, 5, 0, 5],
                                color: '#333',
                                fontSize: 14,
                                lineHeight:24,
                                
                            }
                        }
                    },
                    emphasis: {
                        itemStyle: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        }
                    }
                }]
            };
            myChart.clear()
            myChart.setOption(option);

        }
    },
    created() {},
    mounted() {
        this.initChart1()

        let data = [{
                value: 1048,
                name: '培训费'
            },
            {
                value: 735,
                name: '评审费'
            },
            {
                value: 580,
                name: '监考费'
            }
        ]
        this.initChart2(this.$refs.chat2, data)

        let data1 = [{
                value: 1048,
                name: '已报销'
            },
            {
                value: 735,
                name: '未报销'
            }
        ]
        this.initChart2(this.$refs.chat3, data1)

        let data2 = [{
                value: 1048,
                name: '讲课'
            },
            {
                value: 735,
                name: '带班'
            },
            {
                value: 120,
                name: '调研'
            },
            {
                value: 500,
                name: '培训'
            }
        ]
        this.initChart2(this.$refs.chat4, data2)
    },
    destroyed() {},
}
</script>

<style lang="scss" src="./style/index.scss" scoped></style>

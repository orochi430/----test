<template>
<div class="organization" style="padding-top: 20px;">
    <!-- <div class="title">
        <div class="goback" @click="$router.go(-1)">
            <van-icon name="arrow-left" />
            <span>返回</span>
        </div>
        <span class="name">用车分析</span>
    </div> -->
    <div class="bwnx">
        <div class="commtitle">数据概况</div>
        <div class="banhui">
            <div>
                <div>
                    <p>
                        <span style="color: #0091FF;">24</span>
                        <span></span>
                    </p>
                    <span>今日申请数</span>
                </div>
                <div>
                    <p>
                        <span style="color: #44D7B6;">124</span>
                        <span></span>
                    </p>
                    <span>本月申请数</span>
                </div>
                <div>
                    <p>
                        <span style="color: #6236FF;">13242</span>
                        <span></span>
                    </p>
                    <span>年度申请数</span>
                </div>
            </div>
        </div>
    </div>
    <div class="bwnx">
        <div class="commtitle">用车分类</div>
        <div class="chart2" ref="chat3">

        </div>
    </div>
    <div class="bwnx">
        <div class="commtitle">每月申请数量</div>
        <div class="chart2" ref="chat2">

        </div>
    </div>
</div>
</template>

<script>
import echarts from 'echarts'
export default {
    name: 'vehicle',
    components: {},
    data() {
        return {
            active: true
        };
    },
    computed: {},
    watch: {},
    methods: {

        initChart2() {
            var myChart = echarts.init(this.$refs.chat2);
            var option = {
                color: ["#0091FF", "#44D7B6", "#F7B500 ", "#6236FF"],
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        // Use axis to trigger tooltip
                        type: 'shadow' // 'shadow' as default; can also be 'line' or 'shadow'
                    }
                },
                legend: {
                    show: false
                },
                grid: {
                    left: '3%',
                    right: '0%',
                    bottom: '3%',
                    containLabel: true
                },
                xAxis: {
                    type: 'category',
                    data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月']
                },
                yAxis: {
                    type: 'value',
                    axisLabel: {
                        formatter: '{value}'
                    },
                    fontSize: 12,
                    color: "#333"
                },
                series: {
                    type: 'bar',
                    barWidth: 30,
                    label: {
                        show: false
                    },
                    emphasis: {
                        focus: 'series'
                    },
                    data: [850, 270, 320, 450, 420, 800, 670]
                }
            };
            myChart.clear()
            myChart.setOption(option);

        },
        initChart3() {
            var myChart = echarts.init(this.$refs.chat3);
            let data = [{
                    value: 44,
                    name: '业务工作保障'
                },
                {
                    value: 65,
                    name: '课题调研保障'
                },
                {
                    value: 19,
                    name: '其他活动保障'
                },
                {
                    value: 1,
                    name: '行政(一般租车)'
                }
            ]
            var option = {
                color: ["#0091FF", "#44D7B6", "#F7B500 ", "#6236FF"],
                tooltip: {
                    trigger: 'item'
                },
                legend: {
                    top: 'center',
                    left: '50%',
                    orient: "vertical",
                    icon: "circle",
                    itemWidth: 10,
                    itemHeight: 10,
                    itemGap: 20,
                    textStyle: {
                        color: "#333",
                        fontSize: 12,
                        rich: {
                            "name": {
                                "fontSize": 14,
                                "lineHeight": 28,
                                "color": "#333",
                                "fontFamily": 'dig',
                                "fontWeight": 'bold',
                                "width": 110
                            },
                            "percent0": {
                                "fontSize": 14,
                                "lineHeight": 28,
                                "color": "#0091FF",
                                "fontFamily": 'dig',
                                "fontWeight": 'bold',
                                "padding": [0, 0, 0, 0]
                            },
                            "percent1": {
                                "fontSize": 14,
                                "lineHeight": 28,
                                "color": "#44D7B6",
                                "fontFamily": 'dig',
                                "fontWeight": 'bold',
                                "padding": [0, 0, 0, 0]
                            },
                            "percent2": {
                                "fontSize": 14,
                                "lineHeight": 28,
                                "color": "#F7B500",
                                "fontFamily": 'dig',
                                "fontWeight": 'bold',
                                "padding": [0, 0, 0, 0]
                            },
                            "percent3": {
                                "fontSize": 14,
                                "lineHeight": 28,
                                "color": "#6236FF",
                                "fontFamily": 'dig',
                                "fontWeight": 'bold',
                                "padding": [0, 0, 0, 0]
                            },
                            "word": {
                                "fontSize": 14,
                                "lineHeight": 28,
                                "color": "#333",
                                "fontWeight": 'bold',
                                "fontFamily": 'pf'
                            }
                        }
                    },
                    formatter: function (name) {
                        let total = 0; // 统计总量
                        let tarValue = 0; // 目前的数值，由于data数据是string型，所以有这步
                        // 遍历去给上门两个变量赋值，并返回新的格式化数据
                        if (data) {
                            let index = 0
                            for (let i = 0, l = data.length; i < l; i++) {
                                total += parseInt(data[i].value);
                                if (data[i].name == name) {
                                    index = i
                                    tarValue = parseInt(data[i].value);
                                }
                            }
                            let p = ((tarValue / total) * 100).toFixed(0);
                            let bl = "percent" + index
                            return `{name|${name}}  {${bl}|${p}%}`;
                        } else {
                            return `{name|${name}}`
                        }
                    },
                },
                series: [{
                    type: 'pie',
                    radius: ['30%', '50%'],
                    center: ['25%', '50%'],
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
                    data: data
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
    },
    destroyed() {},
}
</script>

<style lang="scss" src="./style/index.scss" scoped></style>

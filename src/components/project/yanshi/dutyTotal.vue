<template>
<div class="organization" style="padding-top: 20px;">
    <!-- <div class="title">
        <div class="goback" @click="$router.go(-1)">
            <van-icon name="arrow-left" />
            <span>返回</span>
        </div>
        <span class="name">值班要情统计</span>
    </div> -->
    <div class="bwnx">
        <div class="commtitle">项目数量</div>
        <div class="banhui">
            <div>
                <div>
                    <p>
                        <span style="color: #0091FF;">215</span>
                        <span></span>
                    </p>
                    <span>首报要情</span>
                </div>
                <div>
                    <p>
                        <span style="color: #F7B500;">160</span>
                        <span></span>
                    </p>
                    <span>续报要情</span>
                </div>
                <div>
                    <p>
                        <span style="color: #44D7B6;">6</span>
                        <span></span>
                    </p>
                    <span>突发事件</span>
                </div>
                <div>
                    <p>
                        <span style="color: #6236FF;">62</span>
                        <span></span>
                    </p>
                    <span>一般要情</span>
                </div>
            </div>
        </div>
    </div>
    <div class="bwnx">
        <div class="commtitle">上报趋势</div>
        <div class="chart2" ref="chat1">

        </div>
    </div>
    <div class="bwnx">
        <div class="commtitle">突发事件类型</div>
        <div class="chart2" ref="chat2">

        </div>
    </div>
    <div class="bwnx">
        <div class="commtitle">突发事件等级</div>
        <div class="chart2" ref="chat3">

        </div>
    </div>
</div>
</template>

<script>
import echarts from 'echarts'
export default {
    name: 'dutyTotal',
    components: {},
    data() {
        return {
            active: true
        };
    },
    computed: {},
    watch: {},
    methods: {
        initChart1() {
            var myChart = echarts.init(this.$refs.chat1);
            var option = {
                color: ["#0091FF", "#44D7B6", "#F7B500 ", "#6236FF"],
                tooltip: {
                    trigger: 'axis'
                },
                legend: {
                    bottom: '10',
                    left: 'center',
                    icon: "circle",
                    itemWidth: 10,
                    itemHeight: 10,
                    itemGap: 20,
                    textStyle: {
                        color: "#333",
                        fontSize: 12,
                    },
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '20%',
                    containLabel: true
                },
                xAxis: {
                    type: 'category',
                    data: ['04-01', '04-02', '04-03', '04-04', '04-05', '04-06']
                },
                yAxis: {
                    type: 'value'
                },
                series: [{
                        name: '续报',
                        type: 'line',
                        data: [120, 132, 101, 134, 90, 230],
                    },
                    {
                        name: '首报',
                        type: 'line',
                        data: [220, 182, 191, 234, 290, 330]
                    }
                ]
            };
            myChart.clear()
            myChart.setOption(option);

        },

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
                    data: ['自然灾害', '事故灾难', '公共卫\n生事件', '社会安\n全事件', '其他突\n发事件']
                },
                yAxis: {
                    type: 'value',
                    axisLabel: {
                        formatter: '{value}k'
                    },
                    fontSize: 12,
                    color: "#333"
                },
                series: {
                    type: 'bar',
                    barWidth: 40,
                    label: {
                        show: false
                    },
                    emphasis: {
                        focus: 'series'
                    },
                    data: [22, 15, 32, 6, 18]
                }
            };
            myChart.clear()
            myChart.setOption(option);

        },
        initChart3() {
            var myChart = echarts.init(this.$refs.chat3);
            let data = [{
                    value: 44,
                    name: '一般'
                },
                {
                    value: 65,
                    name: '较大'
                },
                {
                    value: 19,
                    name: '重大'
                },
                {
                    value: 1,
                    name: '特别重大'
                }
            ]
            var option = {
                color: ["#0091FF", "#44D7B6", "#F7B500 ", "#6236FF"],
                tooltip: {
                    trigger: 'item'
                },
                title: {
                    padding: [0, 0, 0, -25],
                    text: "事件汇总",
                    left: '28%',
                    top: '38%',
                    textStyle: {
                        fontSize: 18,
                        color: "#333333"

                    },
                    subtext: " 129",
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
                    left: '60%',
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
                                "width": 70
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
                            return `{name|${name} ${tarValue}}  {${bl}|${p}%}`;
                        } else {
                            return `{name|${name}}`
                        }
                    },
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
                    data: data
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
    },
    destroyed() {},
}
</script>

<style lang="scss" src="./style/index.scss" scoped></style>

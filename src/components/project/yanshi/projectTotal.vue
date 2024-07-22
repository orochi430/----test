<template>
<div class="organization" style="padding-top: 20px;">
    <!-- <div class="title">
        <div class="goback" @click="$router.go(-1)">
            <van-icon name="arrow-left" />
            <span>返回</span>
        </div>
        <span class="name">项目情况统计</span>
    </div> -->
    <div class="bwnx">
        <div class="commtitle">项目数量</div>
        <div class="banhui">
            <div>
                <div>
                    <p>
                        <span style="color: #0091FF;">21</span>
                        <span></span>
                    </p>
                    <span>项目总数</span>
                </div>
                <div>
                    <p>
                        <span style="color: #F7B500;">18</span>
                        <span></span>
                    </p>
                    <span>进行中</span>
                </div>
                <div>
                    <p>
                        <span style="color: #44D7B6;">3</span>
                        <span></span>
                    </p>
                    <span>已验收</span>
                </div>
            </div>
        </div>
    </div>
    <div class="bwnx">
        <div class="commtitle">阶段情况</div>
        <div class="chart2" ref="chat1">

        </div>
    </div>
    <div class="bwnx">
        <div class="commtitle">部门项目</div>
        <div class="chart2" ref="chat2">

        </div>
    </div>
</div>
</template>

<script>
import echarts from 'echarts'
export default {
    name: 'projectTotal',
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
            let data = [{
                    value: 55,
                    name: '进行中'
                },
                {
                    value: 25,
                    name: '待验收'
                },
                {
                    value: 20,
                    name: '已验收'
                }
            ]
            var myChart = echarts.init(this.$refs.chat1);
            var option = {
                color: ["#0091FF", "#44D7B6", "#F7B500 ", "#6236FF"],
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
                            return `{name|${name}}  {${bl}|${p}%}`;
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
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                },
                xAxis: {
                    type: 'category',
                    data: ['财务部', '办公室', '人事处', '综合处']
                },
                yAxis: {
                    type: 'value'

                },
                series: [{
                        name: '类型1',
                        type: 'bar',
                        stack: 'total',
                        label: {
                            show: true
                        },
                        emphasis: {
                            focus: 'series'
                        },
                        data: [320, 302, 301, 334, 390, 330, 320]
                    },
                    {
                        name: '类型2',
                        type: 'bar',
                        stack: 'total',
                        label: {
                            show: true
                        },
                        emphasis: {
                            focus: 'series'
                        },
                        data: [120, 132, 101, 134, 90, 230, 210]
                    },
                    {
                        name: '类型3',
                        type: 'bar',
                        stack: 'total',
                        label: {
                            show: true
                        },
                        emphasis: {
                            focus: 'series'
                        },
                        data: [220, 182, 191, 234, 290, 330, 310]
                    }
                ]
            };
            myChart.clear()
            myChart.setOption(option);

        }
    },
    created() {},
    mounted() {
        this.initChart1()
        this.initChart2()
    },
    destroyed() {},
}
</script>

<style lang="scss" src="./style/index.scss" scoped></style>

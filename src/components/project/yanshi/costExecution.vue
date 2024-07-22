<template>
<div class="organization" style="padding-top: 20px;">
    <!-- <div class="title">
        <div class="goback" @click="$router.go(-1)">
            <van-icon name="arrow-left" />
            <span>返回</span>
        </div>
        <span class="name">费用执行统计</span>
    </div> -->
    <div class="bwnx">
        <div class="commtitle">项目付款</div>
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
                        <span style="color: #F7B500;">15</span>
                        <span></span>
                    </p>
                    <span>进行中</span>
                </div>
                <div>
                    <p>
                        <span style="color: #44D7B6;">6</span>
                        <span></span>
                    </p>
                    <span>已验收</span>
                </div>
            </div>
        </div>
    </div>
    <div class="bwnx">
        <div class="commtitle">付款部门</div>
        <div class="chart2" ref="chat1">

        </div>
    </div>
    <div class="bwnx">
        <div class="commtitle">付款情况</div>
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
                    data: ['财务部', '办公室', '人事处', '综合处']
                },
                yAxis: {
                    type: 'value'
                },
                series: [{
                        name: '实际付款',
                        type: 'line',
                        data: [120, 132, 101, 134, 90, 230, 210],
                    },
                    {
                        name: '计划付款',
                        type: 'line',
                        data: [220, 182, 191, 234, 290, 330, 310]
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
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                },
                xAxis: {
                    type: 'category',
                    data: ['1月', '2月', '3月', '4月']
                },
                yAxis: [{
                        type: 'value',
                        name: "(万元)",
                        nameTextStyle: {
                            fontSize: 14,
                            color: "#333",
                            padding: [0, 0, 0, -40]
                        },
                        min: 0,
                    },
                    {
                        type: 'value',
                        name: "(%)",
                        nameTextStyle: {
                            fontSize: 14,
                            color: "#333",
                            padding: [0, 0, 0, 40]
                        },
                        min: 0,
                        max: 100
                    }
                ],
                series: [{
                        yAxisIndex: 0,
                        name: '付款金额',
                        type: 'bar',
                        barWidth: 45,
                        label: {
                            show: false
                        },
                        emphasis: {
                            focus: 'series'
                        },
                        data: [120, 222, 301, 374]
                    },
                    {
                        yAxisIndex: 1,
                        name: '已付款比例',
                        type: 'line',
                        label: {
                            show: false
                        },
                        emphasis: {
                            focus: 'series'
                        },
                        data: [35, 42, 53, 65]
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

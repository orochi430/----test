<template>
<div class="organization" style="padding-top: 20px;">
    <!-- <div class="title">
            <div class="goback" @click="$router.go(-1)">
                <van-icon name="arrow-left" />
                <span>返回</span>
            </div>
            <span class="name">办公用品统计</span>
        </div> -->
    <div class="bwnx">
        <div class="commtitle">办会效能</div>
        <div class="banhui">
            <div>
                <div>
                    <p>
                        <span style="color: #0091FF;">{{ nums.allNum || 0 }}</span>
                        <span>个</span>
                    </p>
                    <span>会议总数</span>
                </div>
                <div>
                    <p>
                        <span style="color: #44D7B6;">{{ nums.userNum || 0 }}</span>
                        <span>人次</span>
                    </p>
                    <span>会议人次</span>
                </div>
                <div>
                    <p>
                        <span style="color: #F7B500;">{{ nums.hourNum || 0 }}</span>
                        <span>小时</span>
                    </p>
                    <span>会议时长</span>
                </div>
            </div>
            <div>
                <div>
                    <p>
                        <span style="color: #0091FF;">{{ nums.roomNum || 0 }}</span>
                        <span>个</span>
                    </p>
                    <span>会议室总数</span>
                </div>
                <div>
                    <p>
                        <span style="color: #44D7B6;">{{ nums.roomRate ? nums.roomRate.replace('%','') : 0 }}</span>
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
        <div class="commtitle">会议计划执行情况</div>
        <div class="banhui">
            <div>
                <div>
                    <p>
                        <span style="color: #0091FF;">{{ plans.AllNum || 0 }}</span>
                        <span>个</span>
                    </p>
                    <span>会议计划数</span>
                </div>
                <div>
                    <p>
                        <span style="color: #44D7B6;">{{ plans.conveneNum || 0 }}</span>
                        <span>个</span>
                    </p>
                    <span>会议召开数</span>
                </div>
                <div>
                    <p>
                        <span style="color: #F7B500;">{{ plans.rate ? plans.rate.replace('%','') : 0 }}</span>
                        <span>%</span>
                    </p>
                    <span>会议计划执行率</span>
                </div>
            </div>
        </div>
        <div class="chart2" ref="chat5">

        </div>
    </div>
    <div class="bwnx">
        <div class="commtitle">议题情况</div>
        <div class="banhui">
            <div>
                <div>
                    <p>
                        <span style="color: #0091FF;">{{ topics.allNum || 0 }}</span>
                        <span>个</span>
                    </p>
                    <span>议题总数</span>
                </div>
                <div>
                    <p>
                        <span style="color: #44D7B6;">{{ topics.attendNum || 0 }}</span>
                        <span>个</span>
                    </p>
                    <span>上会数</span>
                </div>
                <div>
                    <p>
                        <span style="color: #F7B500;">{{ topics.notNum || 0 }}</span>
                        <span>个</span>
                    </p>
                    <span>未上会数</span>
                </div>
                <div>
                    <p>
                        <span style="color: #0091FF;">{{ topics.attendRate ? topics.attendRate.replace('%','') : 0}}</span>
                        <span>%</span>
                    </p>
                    <span>上会率</span>
                </div>
            </div>
        </div>
        <div class="chart2" ref="chat6">

        </div>
    </div>
</div>
</template>

<script>
import echarts from 'echarts'
export default {
    name: 'suppliesTotal',
    components: {},
    data() {
        return {
            active: true,
            nums: {},
            plans: {},
            roomRate: {},
            topics: {},
            types: {}
        };
    },
    computed: {},
    watch: {},
    methods: {
        initChart3(dataSource,num) {
            var myChart = echarts.init(this.$refs.chat3);
            var option = {
                color: ["#0091FF", "#44D7B6", "#F7B500 ", "#6236FF"],
                tooltip: {
                    trigger: 'item'
                },
                title: {
                    padding: [0, 0, 0, -25],
                    text: "会议量",
                    left: '50%',
                    top: '30%',
                    textStyle: {
                        fontSize: 18,
                        color: "#333333"

                    },
                    subtext: " "+num,
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
                    top: 'bottom',
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
                    radius: ['30%', '50%'],
                    center: ['50%', '40%'],
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
                    data: dataSource
                }]
            };
            myChart.clear()
            myChart.setOption(option);

        },
        initChart4(dataSource) {
            var myChart = echarts.init(this.$refs.chat4);
            var option = {
                xAxis: {
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
                    data: dataSource,
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
        initChart5(dataSource) {
            var myChart = echarts.init(this.$refs.chat5);
            var option = {
                color: ["#0091FF", "#44D7B6", "#F7B500 ", "#6236FF"],
                tooltip: {
                    trigger: 'item'
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
                    data: dataSource
                }]
            };
            myChart.clear()
            myChart.setOption(option);

        },
        initChart6(dataSource) {
            var myChart = echarts.init(this.$refs.chat6);
            var option = {
                color: ["#0091FF", "#44D7B6", "#F7B500 ", "#6236FF"],
                tooltip: {
                    trigger: 'item'
                },
                legend: {
                    top: 'bottom',
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
                    radius: ['30%', '50%'],
                    center: ['50%', '40%'],
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
                    data: dataSource
                }]
            };
            myChart.clear()
            myChart.setOption(option);

        },
        getPageData() {
            dsf.http.post("ctrl/meetingStat/meetingStat", {}).then(({
                data
            }) => {
                console.log(data)
                if (data && data.data) {
                    if (data.data.nums) {
                        this.nums = data.data.nums
                    }
                    if (data.data.plans) {
                        this.plans = data.data.plans

                        data.data.plans.planList.forEach(item => {
                            item.name = item.text
                        });
                        this.initChart5(data.data.plans.planList)

                    }
                    if (data.data.topics) {
                        this.topics = data.data.topics

                        data.data.topics.topicList.forEach(item => {
                            item.name = item.text
                        });
                        this.initChart6(data.data.topics.topicList)

                    }
                    if (data.data.types) {
                        data.data.types.forEach(item => {
                            item.name = item.text
                        });
                        this.initChart3(data.data.types, data.data.nums.allNum || 0)
                    }

                    if (data.data.roomRate) {
                        data.data.roomRate.forEach(item => {
                            item.name = item.text
                        });
                        this.initChart4(data.data.roomRate)
                    }
                }
            })
        }
    },
    created() {},
    mounted() {
        this.getPageData()
    },
    destroyed() {},
}
</script>

<style lang="scss" src="./style/index.scss" scoped></style>

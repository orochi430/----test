<template>
<div class="organization" style="padding-top: 20px;">
    <!-- <div class="title">
        <div class="goback" @click="$router.go(-1)">
            <van-icon name="arrow-left" />
            <span>返回</span>
        </div>
        <span class="name">人员统计</span>
    </div> -->
    <div class="bwnx">
        <div class="commtitle">数据概况</div>
        <div class="banhui">
            <div>
                <div>
                    <p>
                        <span style="color: #0091FF;">1988</span>
                        <span></span>
                    </p>
                    <span>总人数</span>
                </div>
                <div>
                    <p>
                        <span style="color: #44D7B6;">1709</span>
                        <span></span>
                    </p>
                    <span>正式员工</span>
                </div>
                <div>
                    <p>
                        <span style="color: #F7B500;">279</span>
                        <span></span>
                    </p>
                    <span>试用期员工</span>
                </div>
            </div>
        </div>
    </div>
    <div class="bwnx">
        <div class="commtitle">性别</div>
        <div class="chart2" ref="chat1">

        </div>
    </div>
    <div class="bwnx">
        <div class="commtitle">学历</div>
        <div class="chart2" ref="chat2">

        </div>
    </div>
    <div class="bwnx">
        <div class="commtitle">部门人员</div>
        <div class="chart2" ref="chat3">

        </div>
    </div>

</div>
</template>

<script>
import echarts from 'echarts'
export default {
    name: 'personnelTotal',
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
                    value: 550,
                    name: '男'
                },
                {
                    value: 253,
                    name: '女'
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
                    left: '70%',
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
                                "width": 30
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
            var option = {
                color: ['#3D91F7', '#61BE67'],
                tooltip: {},
                legend: {
                    show: true,
                    icon: 'circle',
                    bottom: 30,
                    center: 0,
                    itemWidth: 14,
                    itemHeight: 14,
                    itemGap: 21,
                    orient: 'horizontal',
                    data: ['a', 'b'],
                    textStyle: {
                        fontSize: '70%',
                        color: '#8C8C8C',
                    },
                },

                radar: {
                    // shape: 'circle',
                    radius: ['20%', '50%'], //数组的第一项是内半径，第二项是外半径
                    triggerEvent: true,
                    name: {
                        textStyle: {
                            color: '#333',
                            fontSize: 14,
                            borderRadius: 3,
                            padding: [3, 5],
                        },
                    },
                    nameGap: '20', //指示器名称和指示器轴的距离
                    splitNumber: 4, //指示器轴的分割段数
                    indicator: [{
                            name: '硕士以上',
                            max: 100
                        },
                        {
                            name: '大学本科',
                            max: 100
                        },
                        {
                            name: '大学专科',
                            max: 100
                        },
                        {
                            name: '高职',
                            max: 100
                        },
                        {
                            name: '高中',
                            max: 100
                        },
                        {
                            name: '初中以下',
                            max: 100
                        },
                    ],
                    splitArea: {
                        areaStyle: {
                            color: [
                                'rgba(222,134,85, 0)', // 格子背景
                            ].reverse(),
                        },
                    },
                    axisLine: {
                        //指向外圈文本的分隔线样式
                        lineStyle: {
                            color: '#76838f45',
                            cap: 'butt', //指定线段末端的绘制方式,中间空心部分
                        },
                    },
                    splitLine: {
                        lineStyle: {
                            width: 2,
                            color: ['#76838f45'].reverse(),
                            // color: [
                            //     'rgba(224,134,82, 0.1)', 'rgba(224,134,82, 0.2)',
                            //     'rgba(224,134,82, 0.4)', 'rgba(224,134,82, 0.6)',
                            //     'rgba(224,134,82, 0.8)', 'rgba(224,134,82, 1)'
                            // ].reverse()
                        },
                    },
                },

                series: [{
                    name: '项目信息',
                    type: 'radar',
                    //areaStyle: {normal: {}},
                    areaStyle: {
                        normal: {
                            opacity: 0.9,
                            color: new echarts.graphic.RadialGradient(0.5, 0.5, 1, [{
                                    color: '#00000000',
                                    offset: 0,
                                },
                                {
                                    color: '#62a9eb17',
                                    offset: 0.2,
                                },
                                {
                                    color: '#21E9E9',
                                    offset: 0.9,
                                },
                            ]),
                        },
                    },
                    symbolSize: 0,
                    lineStyle: {
                        normal: {
                            color: '#4BFFFC',
                            width: 1,
                        },
                    },
                    data: [{
                        value: [42, 91, 80, 56, 79, 89],
                        name: '学历信息',
                    }, ],
                }, ],
            };
            var myChart = echarts.init(this.$refs.chat2);
            myChart.clear()
            myChart.setOption(option);
        },

        initChart3() {
            var myChart = echarts.init(this.$refs.chat3);
            var option = {
                color: ["#0091FF", "#44D7B6", "#F7B500 ", "#6236FF"],
                xAxis: {
                    data: ['办公室', '财务部', '人事部', '综合部'],
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
                            groupId: '办公室',
                            itemStyle: {
                                color: "#0091FF"
                            }
                        },
                        {
                            value: 8,
                            groupId: '财务部',
                            itemStyle: {
                                color: "#44D7B6"
                            }
                        },
                        {
                            value: 12,
                            groupId: '人事部',
                            itemStyle: {
                                color: "#F7B500"
                            }
                        },
                        {
                            value: 32,
                            groupId: '综合部',
                            itemStyle: {
                                color: "#6236FF"
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

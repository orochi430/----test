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
        <div class="commtitle">数据概况</div>
        <div class="banhui">
            <div>
                <div>
                    <p>
                        <span style="color: #0091FF;">84,235</span>
                        <span>元</span>
                    </p>
                    <span>入库总金额</span>
                </div>
                <div>
                    <p>
                        <span style="color: #44D7B6;">8,560</span>
                        <span>元</span>
                    </p>
                    <span>领用总金额</span>
                </div>
                <div>
                    <p>
                        <span style="color: #F7B500;">508</span>
                        <span>种</span>
                    </p>
                    <span>在库用品</span>
                </div>
            </div>
            <div>
                <div>
                    <p>
                        <span style="color: #0091FF;">20,340</span>
                        <span>元</span>
                    </p>
                    <span>库存金额</span>
                </div>
                <div>
                    <p>
                        <span style="color: #44D7B6;">4</span>
                        <span>种</span>
                    </p>
                    <span>库存不足</span>
                </div>
                <div>
                    <p>
                        <span style="color: #F7B500;">43</span>
                        <span>元</span>
                    </p>
                    <span>人均消耗</span>
                </div>
            </div>
        </div>
    </div>
    <div class="bwnx">
        <div class="commtitle">在库用品</div>
        <div class="chart2" ref="chat1">

        </div>
    </div>
    <div class="bwnx">
        <div class="commtitle">
            <span>TOP5消耗用品</span>
            <div class="tab">
                <span :class="{'active': active}" @click="active=true">领用金额</span>
                <span :class="{'active': !active}" @click="active=false">领用数量</span>
            </div>
        </div>
        <div class="xiaohao" v-show="active">
            <div>
                <div class="nunms">01</div>
                <div class="jindu">
                    <p>
                        <span>圆珠笔</span>
                        <span>1500</span>
                    </p>
                    <p><span style="width: 90%;"></span></p>
                </div>
            </div>
            <div>
                <div class="nunms">02</div>
                <div class="jindu">
                    <p>
                        <span>铅笔</span>
                        <span>1423</span>
                    </p>
                    <p><span style="width: 87%;"></span></p>
                </div>
            </div>
            <div>
                <div class="nunms">03</div>
                <div class="jindu">
                    <p>
                        <span>纸张</span>
                        <span>1412</span>
                    </p>
                    <p><span style="width: 85%;"></span></p>
                </div>
            </div>
            <div>
                <div class="nunms">04</div>
                <div class="jindu">
                    <p>
                        <span>书签</span>
                        <span>1278</span>
                    </p>
                    <p><span style="width: 76%;"></span></p>
                </div>
            </div>
            <div>
                <div class="nunms">05</div>
                <div class="jindu">
                    <p>
                        <span>装订机</span>
                        <span>900</span>
                    </p>
                    <p><span style="width: 67%;"></span></p>
                </div>
            </div>
        </div>


        <div class="xiaohao" v-show="!active">
            <div>
                <div class="nunms">01</div>
                <div class="jindu">
                    <p>
                        <span>圆珠笔</span>
                        <span>880</span>
                    </p>
                    <p><span style="width: 90%;"></span></p>
                </div>
            </div>
            <div>
                <div class="nunms">02</div>
                <div class="jindu">
                    <p>
                        <span>铅笔</span>
                        <span>750</span>
                    </p>
                    <p><span style="width: 77%;"></span></p>
                </div>
            </div>
            <div>
                <div class="nunms">03</div>
                <div class="jindu">
                    <p>
                        <span>纸张</span>
                        <span>670</span>
                    </p>
                    <p><span style="width: 65%;"></span></p>
                </div>
            </div>
            <div>
                <div class="nunms">04</div>
                <div class="jindu">
                    <p>
                        <span>书签</span>
                        <span>660</span>
                    </p>
                    <p><span style="width: 56%;"></span></p>
                </div>
            </div>
            <div>
                <div class="nunms">05</div>
                <div class="jindu">
                    <p>
                        <span>装订机</span>
                        <span>585</span>
                    </p>
                    <p><span style="width: 52%;"></span></p>
                </div>
            </div>
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
            active: true
        };
    },
    computed: {},
    watch: {},
    methods: {
        initChart1() {
            let data = [{
                    value: 55,
                    name: '常用办公'
                },
                {
                    value: 25,
                    name: '财务用品'
                },
                {
                    value: 20,
                    name: '打印用品'
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
    },
    created() {},
    mounted() {
        this.initChart1()
    },
    destroyed() {},
}
</script>

<style lang="scss" src="./style/index.scss" scoped></style>

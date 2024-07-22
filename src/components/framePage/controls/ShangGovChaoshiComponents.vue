<template>
<div class="card">
    <div class="title showIcon"><span>超时件情况</span></div>
    <div class="tabs">
        <span class="active">办件时效</span>
        <span>环节分布</span>
        <span>主办部门分布</span>
    </div>
    <div class="chat">
        <div class="chatbox" ref="chat"></div>
    </div>
</div>
</template>

<script>
import echarts from 'echarts'
export default {
    name: "ShangGovChaoshiComponents",
    components: {

    },
    data() {
        return {}
    },
    created() {
        console.log("ShangGovBanjianComponents");
    },
    mounted() {
        this.initChart1()
    },
    methods: {
        initChart1() {
            let data = [{
                    value: 50,
                    name: '超时1-7天',
                    subname: "1-7天"
                },
                {
                    value: 28,
                    name: '超时8-14天',
                    subname: "8-14天"
                },
                {
                    value: 20,
                    name: '超时15-28天',
                    subname: "15-28天"
                },
                {
                    value: 20,
                    name: '超时29天及以上',
                    subname: "29天及以上"
                }
            ]
            var myChart = echarts.init(this.$refs.chat);
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
                    itemGap: 10,
                    textStyle: {
                        color: "#333",
                        fontSize: 12,
                        rich: {
                            "name": {
                                "fontSize": 14,
                                "lineHeight": 28,
                                "color": "#333",
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
                                "lineHeight": 20,
                                "color": "#333"
                            }
                        }
                    },
                    formatter: function (name) {
                        let total = 0; // 统计总量
                        let tarValue = 0; // 目前的数值，由于data数据是string型，所以有这步
                        // 遍历去给上门两个变量赋值，并返回新的格式化数据
                        if (data) {
                            let index = 0
                            let value = 0
                            for (let i = 0, l = data.length; i < l; i++) {
                                total += parseInt(data[i].value);
                                if (data[i].name == name) {
                                    value = data[i].value
                                    index = i
                                    tarValue = parseInt(data[i].value);
                                }
                            }
                            let p = ((tarValue / total) * 100).toFixed(0);
                            let bl = "percent" + index
                            return `{name|${name}：${tarValue}件}`;
                        } else {
                            return `{name|${name}}`
                        }
                    },
                },
                series: [{
                    type: 'pie',
                    radius: ['20%', '40%'],
                    center: ['50%', '40%'],
                    data: data,
                    label: {
                        formatter: function(param){
                          return param.data.subname
                        },
                        fontSize:14
                    }
                }]
            };
            myChart.clear()
            myChart.setOption(option);

        },
    }
};
</script>

<style lang="scss" scoped>
@import "@/assets/styles/themes.scss";
@import "@/assets/styles/mixin.scss";

.card {
    background-color: #FFF;
    margin: 10px;
    border-radius: 6px;
    padding: 10px 0 0;
    border-bottom: 1px solid #f7f7f7;
    box-shadow: 0px 2px 16px 0px rgba(213, 213, 213, 0.5);

    .showIcon {
        span:first-child {
            padding-left: 5px;
            border-left: 5px solid #fff;
            position: relative;

            &::before {
                content: ' ';
                position: absolute;
                height: 100%;
                width: 5px;
                top: 0;
                left: -5px;
                border-radius: 3px;
                @include background-theme("normal");
            }
        }
    }

    .title {
        padding: 2px 15px;
        box-sizing: border-box;
        position: relative;
        @include font_2;
        margin-bottom: 10px;

        span:first-child {
            font-size: var(--font_size_1);
            font-weight: bold;
            color: #333;
            margin-left: -5px;
        }

        .maxRowsMenu {
            display: flex;
            font-size: var(--font_size_3);
            color: rgb(102, 102, 102);
            align-items: center;
            float: right;
        }

    }

    .tabs {
        width: 80%;
        height: 36px;
        border-radius: 18px;
        display: flex;
        align-items: center;
        background: #FFFFFF;
        border: 1px solid rgba(229, 229, 229, 1);
        margin: 0 10% 0 10%;
        overflow: hidden;

        &>span {
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: var(--font_size_3);
            color: #666666;
            height: 100%;
            width: 33.3%;
            flex-shrink: 0;

            &:nth-child(2) {
                box-sizing: border-box;
                border-right: 1px solid rgba(229, 229, 229, 1);
                border-left: 1px solid rgba(229, 229, 229, 1);
            }

            &.active {
                background: #0073CA;
                color: #FFF;
            }
        }
    }

    .chat {
        width: 100%;
        height: 320px;
        box-sizing: border-box;
        padding: 15px 5px;

        .chatbox {
            width: 100%;
            height: 100%;
        }
    }
}
</style>

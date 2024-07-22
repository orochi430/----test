<template>
<div class="big" style="width:100%;height:100%">
    <div class="editor_box">
        <div class="in-chart">
            <div class="echarts_summarydata">
                <div class="echarts_head">
                    <span>本月数据概况</span>
                    <span @click="show=true">
                        <label for="">{{ showDate }}</label>
                        <van-icon name="play" /></span>
                </div>
                <div class="echarts_box">
                    <div class="echarts_smallbox" v-for="(v, i) in data" :key="i">
                        <p class="echarts_blacktext">{{ v.title }}</p>
                        <p class="echarts_redtext">{{ v.number }}</p>
                    </div>
                </div>

            </div>
            <div class="echarts_monthreceive">
                <p class="echarts_head">每月接收投稿</p>
                <div style="width: 100%;margin-top:1.4%">
                    <div ref="echarts1" class="charts"></div>
                </div>
            </div>
            <div class="echarts_monthscore">
                <p class="echarts_head">得分汇总</p>
                <div class="echarts_table">
                    <table>
                        <tr class="table_title" height="50px">
                            <td class="table_name">
                                <div class="mscore_title">部门名称</div>
                                <div class="mscore_photo">

                                    <div class="table_sanjiao3" @click="up('company')"></div>
                                    <div class="table_sanjiao4" @click="down('company')"></div>
                                </div>
                            </td>
                            <td class="table_mscore">
                                <div class="mscore_title">本月得分</div>
                                <div class="mscore_photo">

                                    <div class="table_sanjiao1" @click="up('month')"></div>
                                    <div class="table_sanjiao2" @click="down('month')"></div>
                                </div>
                            </td>
                            <td class="table_yscore">
                                <div class="mscore_title">本年度总得分</div>
                                <div class="mscore_photo">

                                    <div class="table_sanjiao3" @click="up('year')"></div>
                                    <div class="table_sanjiao4" @click="down('year')"></div>
                                </div>
                            </td>
                        </tr>
                        <tr height="60px" v-for="(v, i) in table_companydata" :key="i">
                            <td style="width:22%:padding:0 10px">{{ v.name }}</td>
                            <td style="width:28%">{{ v.monthscore }}</td>
                            <td style="width:40%">{{ v.yearscore }}</td>
                        </tr>
                    </table>
                </div>
            </div>
        </div>
    </div>
    <van-popup v-model="show" position="bottom">
        <van-datetime-picker v-model="currentDate" type="year-month" title="选择年月" :formatter="formatter" @confirm="confirm" @cancel="show=false" />
    </van-popup>

</div>
</template>

<script>
import * as echarts from 'echarts'
export default {
    data() {
        return {
            data: [],
            // echarts总体数据
            arr: [],
            // echarts排序最大值的数组
            newarr: [],
            table_companydata: [],
            table_othercompany: [],
            newdata: [],
            max: 0,
            orderkey: '',
            order: '',
            number: 0,
            currentDate: new Date(),
            show: false,
            showDate: moment(new Date()).format("YYYY年MM月"),
        }
    },
    watch: {
        number: {
            handler(newvalue, oldvalue) {
                if (newvalue == 0) {
                    console.log('不传参', newvalue)
                    this.ajaxfun(this.orderkey, this.order)
                } else {
                    console.log('传参', newvalue)
                    this.ajaxfun(this.orderkey, this.order)
                }
            },
            immediate: true,

        }
    },
    mounted() {
        this.getTotalData()
        this.getScoreTotal()
    },
    methods: {
        getScoreTotal() {
            dsf.http.get('ctrl/editor/scoreSummaryData', {
                orderkey: this.orderkey,
                order: this.order
            }).then((res) => {
                this.arr = res.data.data.echarts.data
                this.table_companydata = res.data.data.table.company
                this.table_othercompany = res.data.data.table.othercompany
                for (let i = 0; i < this.arr.length; i++) {
                    this.newarr.push(Number(this.arr[i]))
                    this.newdata.push(Number(this.arr[i]))
                }

                this.max = this.newarr.sort(function (a, b) {
                    return b - a;
                })[0];
                this.echartsinit()
            })
        },
        getTotalData() {
            dsf.http.get('ctrl/editor/collectionStatisticsData', {
                dateValue: moment(this.currentDate).format("YYYY-MM")
            }).then((res) => {
                this.data = res.data.data
            })
        },
        confirm(val) {
            console.log(val)
            this.currentDate = new Date(val)
            this.showDate = moment(this.currentDate).format("YYYY年MM月")
            this.show = false
            this.getTotalData()
        },
        formatter(type, val) {
            if (type === 'year') {
                return `${val}年`;
            } else if (type === 'month') {
                return `${val}月`;
            }
            return val;
        },
        echartsinit() {
            let mychart1 = echarts.init(this.$refs.echarts1);
            let option1 = {
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'none'
                    },
                    lineStyle: {
                        opacity: 0,
                    },
                },
                grid: {
                    left: '5%',
                    right: '5%',
                    bottom: '5%',
                    top: '20%',
                    containLabel: true,
                    z: 22
                },
                xAxis: {
                    type: 'category',
                    data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
                    axisTick: {
                        show: false
                    },
                    axisLabel: {
                        show: true,
                        interval: 0,
                        fontSize: 12
                    },
                    axisLine: {
                        lineStyle: {
                            color: "#999999",
                        }
                    }
                },

                yAxis: {
                    min: 0,
                    max: Math.round((this.max * 1 + 5) / 10) * 10,
                    // max:this.max/10!=this.max+''[0]?Math.round((this.max*1+5)/10)*10:this.max,
                    type: 'value',
                    axisTick: {
                        show: false
                    },
                    name: '条',
                    splitLine: {
                        show: true,
                        lineStyle: {
                            color: "#999999",
                            width: 1,
                            type: "dashed"
                        }
                    },
                    axisLine: {
                        show: false,
                        lineStyle: {
                            color: "#999999",
                        }
                    }
                },

                series: [{
                    name: '条数',
                    type: 'bar',
                    data: this.newdata,
                    itemStyle: {
                        normal: {
                            color: function (params) {
                                var colorList = ['#0091FF', '#0091FF', '#0091FF', '#0091FF', '#0091FF', '#0091FF', '#0091FF', '#0091FF', '#0091FF', '#0091FF', '#0091FF', '#0091FF'];
                                return colorList[params.dataIndex]
                            }
                        }
                    },

                }]
            };
            mychart1.clear()
            mychart1.setOption(option1);
        },

        ajaxfun(key, ord) {
            dsf.http.post('ctrl/editor/echartsdata', {
                orderkey: this.number == 0 ? '' : key,
                order: this.number == 0 ? '' : ord
            }).then((res) => {
                console.log(res)

                if (ord == 'up') {
                    if (key == 'company') {
                        this.table_companydata = res.data.data.table.company
                        this.table_othercompany = res.data.data.table.othercompany
                    } else if (key == 'month') {
                        this.table_companydata = res.data.data.table.company
                        this.table_othercompany = res.data.data.table.othercompany
                    } else if (key == 'year') {
                        this.table_companydata = res.data.data.table.company
                        this.table_othercompany = res.data.data.table.othercompany
                    }
                } else if (ord == 'down') {
                    if (key == 'company') {
                        this.table_companydata = res.data.data.table.company
                        this.table_othercompany = res.data.data.table.othercompany
                    } else if (key == 'month') {
                        this.table_companydata = res.data.data.table.company
                        this.table_othercompany = res.data.data.table.othercompany
                    } else if (key == 'year') {
                        this.table_companydata = res.data.data.table.company
                        this.table_othercompany = res.data.data.table.othercompany
                    }
                }
            })
        },

        // 升序
        up(key) {
            this.order = 'up'
            this.orderkey = key
            console.log(key, this.order)
            this.number++
            this.ajaxfun(this.orderkey, this.order)
            this.$forceUpdate()
        },
        // 降序
        down(key) {
            this.order = 'down'
            this.orderkey = key
            console.log(key, this.order)
            // this.orderfun(key, this.order)
            this.number++
            this.ajaxfun(this.orderkey, this.order)
            this.$forceUpdate()
        }
    }
}
</script>

<style lang="scss" scoped>
.editor_box {
    width: 100%;
}

.charts {
    width: 100%;
    height: 250PX;
}

.echarts_blue {
    width: 100%;
    height: 10px;
    background-color: #ECECEC;
}

.echarts_head {
    box-sizing: border-box;
    padding-left: 5px;
    border-left: 4px solid #0091FF;
    margin: 0 0 2% 15PX;
    font-family: PingFangSC-Medium;
    font-size: var(--font_size_3);
    color: #333333;
    line-height: 18px;
    font-weight: 700;
    border-radius: 2px;
    display: flex;
    align-items: center;
    justify-content: space-between;

    &>span:nth-child(1) {
        color: #333333;
        line-height: 18px;
        font-weight: 700;
    }

    &>span:nth-child(2) {
        color: rgb(0, 145, 255);
        display: flex;
        font-weight: normal;
        align-items: center;
        margin-right: 15px;

        .van-icon {
            transform: rotate(90deg);
        }

        label {
            color: rgb(0, 145, 255);
            font-weight: normal;
            align-items: center;
        }
    }
}

.echarts_summarydata {

    margin-top: 20px;
    padding-top: 12px;
    width: 100%;
    background-color: white;
    overflow: hidden;

    .echarts_box {
        padding: 5.5% 0;
        display: flex;
        justify-content: space-between;
        padding: 10PX 15PX;

        .echarts_smallbox {
            flex: 1;
            height: 70px;
            box-sizing: border-box;
            background: #F7F8FA;
            border: 1px solid rgba(236, 236, 236, 1);
            border-radius: 10px;
            text-align: center;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            padding-bottom: 13px;

            .echarts_blacktext {
                font-size: var(--font_size_4);
                color: #333333;
                text-align: center;
                font-weight: 700;
                margin-top: 15px;
                flex: 1;
            }

            .echarts_redtext {
                font-size: var(--font_size_0);
                color: #E93F3F;
                text-align: center;
                line-height: 20px;
                font-weight: 700;
                margin-top: 5px;
            }

            &:nth-child(2) {
                // margin: 0 20px;
            }
        }

    }
}

.echarts_monthreceive {
    margin-top: 20px;
    padding-top: 12px;
    width: 100%;
    background-color: white;
}

.echarts_monthscore {
    margin-top: 20px;
    padding-top: 12px;
    width: 100%;
    background-color: white;

    .echarts_table {
        padding-bottom: 2%;

        ::v-deep .van-tab--active {
            color: white !important;
        }

        ::v-deep .van-tabs {
            font-size: var(--font_size_3);

            ::v-deep .van-tabs__wrap {
                margin-bottom: 2%;
            }

        }
    }

    table {
        border: 1px solid rgba(238, 238, 238, 1);
        width: 90%;
        margin: 0 auto;
        text-align: center;
        padding-bottom: 2%;
        margin-top: 2%;

        .table_title {
            background-color: #EEEEEE;

            .table_mscore {
                position: relative;

                .mscore_title {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    font-weight: bold;
                }

                .mscore_photo {
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                    position: absolute;
                    left: 85%;
                    top: 28%;

                    .table_sanjiao1 {
                        width: 0;
                        height: 0;
                        border: 5px solid transparent;
                        border-bottom: 5px solid rgb(71, 71, 71);
                    }

                    .table_sanjiao2 {
                        width: 0;
                        height: 0;
                        border: 5px solid transparent;
                        border-top: 5px solid rgb(71, 71, 71);
                        margin-top: 20%;
                    }
                }

            }

            .table_yscore {
                position: relative;

                .mscore_title{
                    font-weight: bold;
                }
                .mscore_photo {
                    position: absolute;
                    top: 28%;
                    left: 85%;

                    .table_sanjiao3 {
                        width: 0;
                        height: 0;
                        border: 5px solid transparent;
                        border-bottom: 5px solid rgb(71, 71, 71);

                    }

                    .table_sanjiao4 {
                        width: 0;
                        height: 0;
                        border: 5px solid transparent;
                        border-top: 5px solid rgb(71, 71, 71);
                        margin-top: 20%;
                    }
                }

            }

            .table_name {
                position: relative;

                .mscore_title{
                    font-weight: bold;
                }
                .mscore_photo {
                    position: absolute;
                    top: 28%;
                    left: 85%;

                    .table_sanjiao3 {
                        width: 0;
                        height: 0;
                        border: 5px solid transparent;
                        border-bottom: 5px solid rgb(71, 71, 71);

                    }

                    .table_sanjiao4 {
                        width: 0;
                        height: 0;
                        border: 5px solid transparent;
                        border-top: 5px solid rgb(71, 71, 71);
                        margin-top: 20%;
                    }
                }
            }
        }

        tr {
            border-bottom: 1px solid #EEEEEE;
        }

        tr:nth-child(odd) {
            background-color: #EEEEEE;
        }
    }
}

.editor_box {
    position: absolute;
    top: 50px;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #ECECEC;

    .in-chart {
        width: 100%;
        height: 100%;
        overflow: auto;
    }
}
</style>

<template>
<div class="commonStatistic" :style="{ height: `calc(100vh - ${dsf.util.getOffsetTop()})`}">
    <van-sticky :offset-top="dsf.util.getOffsetTop()">
        <div class="top-select">
            <div class="select-contain">
                开始日期：<p @click="changeDate('start')">{{startDate}}</p>
            </div>
            <div class="select-contain">
                结束日期：<p @click="changeDate('end')">{{endDate}}</p>
            </div>
            <div class="select-contain">
                文件类型：<p @click="showPopup = true">{{moduleName.text}}
                    <i class="iconfont iconsanjiaoyou"></i>
                </p>
            </div>
        </div>
    </van-sticky>
    <div class="echart-content">
        <div class="content-title">
            <i></i>
            <p>{{moduleName.text}}</p>
        </div>
        <div class="barEchart" ref="barEchart"></div>
    </div>
    <van-calendar v-model="showDate" :min-date="minDate" :max-date="maxDate" @confirm="onConfirm" />
    <control-dialog v-model="showPopup" :columns="columns" :checkedVal="moduleName.value" @selectItem="selectedModule" @pupopClose="showPopup = false"></control-dialog>
</div>
</template>

<script>
import echarts from 'echarts'
import controlDialog from "../commonForm/controls/controlDialog";
export default {
    name: 'commonStatistic',
    components: {
        controlDialog
    },
    props: {},
    data() {
        return {
            startDate: '2023-08-01',
            endDate: dsf.date.format(new Date(), 'yyyy-mm-dd'),
            moduleName: {
                text: '',
                value: ''
            },
            showDate: false,
            changeDateType: '',
            minDate: new Date(new Date().getFullYear() - 5, 0, 1), //可选择的最小日期
            maxDate: new Date(new Date().getFullYear() + 5, 11, 31), //可选择的最大日期
            showPopup: false,
            columns: {
                columns: []
            },
            departData: {
                names: [],
                values1: [], //已办结
                values2: [], //流转中
            }
        }
    },
    created() {},
    mounted() {
        this.getModuleIds()
    },
    methods: {
        initEchart() {
            var myChart = echarts.init(this.$refs.barEchart);
            let option = {
                // title: {
                //     text: '工作签报',
                //     textStyle: {
                //         fontSize: 20,
                //         color: '#59595D'
                //     },
                //     left: 'center',
                //     top: '1%'
                // },
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'shadow'
                    }
                },
                legend: {
                    top: '2%',
                    right: 'center'
                },
                color: ['#5470C6', '#FAC858'],
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '8%',
                    top: '8%',
                    containLabel: true
                },
                xAxis: {
                    type: 'value',
                    // boundaryGap: [0, 0.01],
                    minInterval: 1,
                    axisTick: {
                        show: false
                    },
                    axisLine: {
                        show: true,
                        lineStyle: {
                            color: '#ccc'
                        }
                    },
                    axisLabel: {
                        color: '#666',
                        fontSize: 14,
                    },
                    splitLine: {
                        show: false
                    },
                },
                yAxis: {
                    type: 'category',
                    axisLine: {
                        show: true,
                        lineStyle: {
                            color: '#ccc'
                        }
                    },
                    axisLabel: {
                        color: '#666',
                        fontSize: 14,
                        interval: 0,
                        formatter: function (params) {
                            var newParamsName = "";
                            var paramsNameNumber = params.length;
                            var provideNumber = 10; //一行显示几个字
                            var rowNumber = Math.ceil(paramsNameNumber / provideNumber);
                            if (paramsNameNumber > provideNumber) {
                                for (var p = 0; p < rowNumber; p++) {
                                    var tempStr = "";
                                    var start = p * provideNumber;
                                    var end = start + provideNumber;
                                    if (p == rowNumber - 1) {
                                        tempStr = params.substring(start, paramsNameNumber);
                                    } else {
                                        tempStr = params.substring(start, end) + "\n";
                                    }
                                    newParamsName += tempStr;
                                }
                            } else {
                                newParamsName = params;
                            }
                            return newParamsName
                        },
                    },
                    axisTick: {
                        show: false
                    },
                    data: this.departData.names
                },
                series: [{
                        name: '已办结',
                        type: 'bar',
                        stack: 'total',
                        label: {
                            show: true,
                            color: '#333',
                            position: 'inside',
                            fontSize: 12,
                            formatter: function (params) {
                                if (params.value > 0) {
                                    return params.value;
                                } else {
                                    return '';
                                }
                            },
                        },
                        barCategoryGap: '30%',
                        barMaxWidth: 40,
                        data: this.departData.values1
                    },
                    {
                        name: '流转中',
                        type: 'bar',
                        stack: 'total',
                        label: {
                            show: true,
                            color: '#333',
                            position: 'inside',
                            fontSize: 12,
                            formatter: function (params) {
                                if (params.value > 0) {
                                    return params.value;
                                } else {
                                    return '';
                                }
                            },
                        },
                        barCategoryGap: '30%',
                        barMaxWidth: 40,
                        data: this.departData.values2
                    }
                ]

            }
            myChart.setOption(option, true);
            window.onresize = function () {
                myChart.resize();
            }
        },
        changeDate(type) {
            this.showDate = true;
            this.changeDateType = type;
        },
        onConfirm(date) {
            this.showDate = false;
            let formatDate = moment(date).format("yyyy-MM-DD");
            if ((this.changeDateType == 'start' && new Date(formatDate).getTime() > new Date(this.endDate).getTime()) || this.changeDateType == 'end' && new Date(this.startDate).getTime() > new Date(formatDate).getTime()) {
                this.$toast.fail('结束时间必须大于开始时间');
                return
            } else {
                this.changeDateType == 'start' ? this.startDate = formatDate : this.endDate = formatDate;
                this.getModuleData();
            }
        },
        getModuleIds() {
            dsf.http.get('ctrl/statistical/modusage/queryModuleIds')
                .then(res => {
                    if (res && res.data && res.data.code == 200) {
                        this.columns.columns = res.data.data.map(item => {
                            return {
                                text: item.moName,
                                value: item.moId
                            }
                        });
                        this.moduleName = this.columns.columns[0];
                        this.getModuleData();
                    }
                })
        },
        selectedModule(val) {
            this.moduleName = val;
            this.getModuleData();
        },
        async getModuleData() {
            let that = this;
            this.departData = {
                names: [],
                values1: [],
                values2: []
            }
            await dsf.http.post('ctrl/statistical/business/appQueryModuleData', {
                    moduleId: this.moduleName.value,
                    startTime: this.startDate,
                    endTime: this.endDate
                })
                .then(res => {
                    if (res && res.data && res.data.code == 200) {
                        let arr = res.data.data.reverse();
                        arr.forEach(item => {
                            that.departData.names.push(item.orgName);
                            that.departData.values1.push(item.concludeNum);
                            that.departData.values2.push(item.turnoverNum);
                        })
                        that.$nextTick(() => {
                            that.initEchart();
                        })
                    }
                })
        }
    },
    computed: {},
    watch: {},
}
</script>

<style lang="scss" scoped>
.commonStatistic {
    width: 100%;
    // height: 100%;
    // overflow-y: auto;

    .top-select {
        width: 100%;
        // height: 60px;
        background: #ffffff;
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        padding: 10px;
        justify-content: space-between;

        .select-contain {
            // min-width: 50%;
            min-height: 40px;
            display: flex;
            align-items: center;
            color: #333333;
            font-size: var(--font_size_3);

            p {
                padding: 0 5px;
                border: 1px solid #ccc;
                border-radius: 5px;
                color: #333333;
                font-size: var(--font_size_3);
                height: 25px;
                display: flex;
                align-items: center;
                flex: 1;

                i {
                    font-size: var(--font_size_3);
                    transform: rotate(90deg);
                    margin-left: 5px;
                }
            }
        }
    }

    .echart-content {
        width: 100%;
        height: auto;
        padding: 10px;
        background: #ffffff;
        margin-top: 10px;

        .content-title {
            width: 100%;
            display: flex;
            align-items: center;

            i {
                width: 5px;
                height: 15px;
                margin-right: 8px;
                border-radius: 2px;
                background: #0091ff;
            }

            p {
                font-size: var(--font_size_2);
                font-weight: 600;
                color: #333333;
            }
        }

        .barEchart {
            margin-top: 10px;
            width: 100%;
            height: 500px;
        }
    }
}
</style>

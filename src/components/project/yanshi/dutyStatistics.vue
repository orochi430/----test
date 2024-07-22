<template>
<div class="dutyStatistics" :style="{ height: `calc(100vh - ${$store.state.isShowAppHeader ? '0.92rem' : '0px'} - ${$store.state.isShowAppFooter ? '1.2rem' : '0px'})` }">
    <div class="btn-list">
        <p :class="curTab == 1?'active':''" @click="changeTab(1)">一个月</p>
        <p :class="curTab == 2?'active':''" @click="changeTab(2)">三个月</p>
        <p :class="curTab == 3?'active':''" @click="changeTab(3)">一年</p>
    </div>
    <div class="common-card" style="margin-top:50px">
        <div class="card-title">
            <p>
                <img src="./yanshi/titlebg.png" alt="">
                <span>值班人数</span>
            </p>
        </div>
        <div class="common-content">
            <ul class="info-list">
                <li>
                    <p>总值班人数</p>
                    <label>{{baseInfo.total || 0}}</label>
                </li>
                <li>
                    <p>节假日值班人数</p>
                    <label>{{baseInfo.jjr || 0}}</label>
                </li>
                <li>
                    <p>工作日值班人数</p>
                    <label>{{baseInfo.rc || 0}}</label>
                </li>
            </ul>
        </div>
    </div>
    <div class="common-card">
        <div class="card-title">
            <p>
                <img src="./yanshi/titlebg.png" alt="">
                <span>各部门值班人数</span>
            </p>
        </div>
        <div class="common-content">
            <div class="echart-box" ref="personBar"></div>
        </div>
    </div>
    <div class="common-card">
        <div class="card-title">
            <p>
                <img src="./yanshi/titlebg.png" alt="">
                <span>值班次数排行</span>
            </p>
        </div>
        <div class="common-content">
            <div class="echart-box" ref="daysBar"></div>
        </div>
    </div>
</div>
</template>

<script>
export default {
    name: 'dutyStatistics',
    components: {},
    props: {},
    data() {
        return {
            curTab: 1,
            baseInfo: {},
            deptDutyData: {
                names: [],
                values: [{
                    name: '值班人数',
                    type: 'bar',
                    barMaxWidth: 25,
                    data: []
                }]
            },
            dutyNumData: {
                names: [],
                values: [{
                    name: '值班天数',
                    type: 'bar',
                    barMaxWidth: 25,
                    data: []
                }]
            },
        }
    },
    computed: {},
    watch: {},
    created() {

    },
    mounted() {
        this.getDutyInfo();
        this.getDeptDutyInfo();
        this.getDutyRank();
    },
    methods: {
        changeTab(index) {
            this.curTab = index;
            this.getDutyInfo();
            this.getDeptDutyInfo();
            this.getDutyRank();
        },
        barEchart(el, dataSource) {
            let mychart = echarts.init(this.$refs[el]);
            let option = {
                color: ['#0091FF', '#E93F3F'],
                legend: {
                    bottom: '3%',
                    show: dataSource.values.length > 1 ? true : false
                },
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
                    bottom: '10%',
                    top: '10%',
                    containLabel: true,
                    z: 22
                },
                xAxis: {
                    type: 'category',
                    data: dataSource.names,
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
                    type: 'value',
                    axisTick: {
                        show: false
                    },
                    // name: '人',
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
                series: dataSource.values
            };
            mychart.clear();
            mychart.setOption(option);
            window.onresize = () => {
                mychart.resize();
            }
        },
        getDutyInfo() {
            let that = this;
            dsf.http.post('ctrl/DutyForMobiles/getDutyInfo', {
                type: this.curTab
            }).then((res) => {
                if (res && res.data && res.data.code == 200 && res.data.data) {
                    that.baseInfo = res.data.data
                }
            })
        },
        getDeptDutyInfo() {
            let that = this;
            that.deptDutyData.names = [];
            that.deptDutyData.values[0].data = [];
            dsf.http.post('ctrl/DutyForMobiles/getDeptDutyInfo', {
                type: this.curTab
            }).then((res) => {
                if (res && res.data && res.data.code == 200 && res.data.data) {
                    res.data.data.forEach(el => {
                        that.deptDutyData.names.push(el.orgName);
                        that.deptDutyData.values[0].data.push(el.userNum);
                    });
                    that.$nextTick(() => {
                        that.barEchart('personBar', that.deptDutyData);
                    })
                }
            })
        },
        getDutyRank() {
            let that = this;
            that.dutyNumData.names = [];
            that.dutyNumData.values[0].data = [];
            dsf.http.post('ctrl/DutyForMobiles/getDutyRank', {
                type: this.curTab
            }).then((res) => {
                if (res && res.data && res.data.code == 200 && res.data.data) {
                    res.data.data.forEach(el => {
                        that.dutyNumData.names.push(el.zbrText);
                        that.dutyNumData.values[0].data.push(el.dayNum);
                    });
                    that.$nextTick(() => {
                        that.barEchart('daysBar', that.dutyNumData);
                    })
                }
            })
        },
    }
}
</script>

<style lang="scss" scoped>
.dutyStatistics {
    width: 100%;
    padding: 10px;
    box-sizing: border-box;
    position: relative;

    .btn-list {
        display: flex;
        align-items: center;
        margin-bottom: 10px;
        position: absolute;
        top: 0;
        left: 10px;
        right: 10px;
        background: #FFFFFF;
        padding: 10px;
        box-sizing: border-box;
        margin-bottom: 10px;

        p {
            width: 60px;
            height: 28px;
            display: flex;
            align-items: center;
            justify-content: center;
            border: 1px solid #ccc;
            border-radius: 15px;
            font-size: var(--font_size_3);
            color: #ccc;
            margin-right: 15px;

            &.active {
                background: #3296fa;
                color: #fff;
                border: none;
            }
        }
    }

    .common-card {
        width: 100%;
        height: auto;
        padding: 10px;
        box-sizing: border-box;
        background: #FFFFFF;
        box-shadow: 0px 1px 8px 0px rgba(194, 194, 194, 0.5);
        border-radius: 5px;
        margin-bottom: 10px;

        .card-title {
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin-bottom: 10px;

            p {
                display: flex;
                align-items: center;

                img {
                    width: 5px;
                    height: 18px;
                    margin-right: 5px;
                }

                span {
                    font-size: var(--font_size_1);
                    color: #333333;
                    font-weight: 600;
                }
            }
        }

        .common-content {
            width: 100%;
            height: auto;

            .info-list {
                width: 100%;
                height: 70px;
                display: flex;
                align-items: center;
                justify-content: space-between;

                li {
                    // width: 30%;
                    height: 100%;
                    box-sizing: border-box;
                    background: #F7F8FA;
                    border: 1px solid rgba(236, 236, 236, 1);
                    border-radius: 10px;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                    flex: 1;
                    margin: 0 5px;

                    p {
                        font-size: var(--font_size_3);
                        color: #333333;
                        font-weight: 700;
                        margin-bottom: 5px;
                    }

                    label {
                        font-size: var(--font_size_0);
                        color: #E93F3F;
                        line-height: 20px;
                        font-weight: 700;
                    }
                }
            }

            .echart-box {
                width: 100%;
                height: 300px;
            }
        }

    }
}
</style>

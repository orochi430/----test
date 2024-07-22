<template>
<div class="warpbox">
    <!-- <div class="selector">
        <div @click="haddleStreetClick">
            <span class="left">区县选择</span>
            <p class="right">
                <span v-if="streets.length>0">{{streets[streetsIndex].name}}</span>
                <van-icon name="arrow" />
            </p>
        </div>
    </div> -->
    <div class="totals">
        <div @click="toTotalList()">
            <span>总人数</span>
            <span style="color: #0073CA;">{{totalData.all_num || 0}}</span>
        </div>
        <div style="border-bottom: none;" @click="toList(totalData.all_red_num, {unitId: streets[streetsIndex].code_value,nuclein_Status: '-99', nuclein_Overdue: '-99', vaccin_Result: '-99', redCode: '10', yellowCode: '-99'})" >
            <span>健康码异常</span>
            <span style="color: #E02020;">{{totalData.all_red_num || 0}}</span>
        </div>
        <div @click="toList(totalData.all_nuclein_num,{unitId: streets[streetsIndex].code_value,nuclein_Status: '-1', nuclein_Overdue: '-99', vaccin_Result: '-99', redCode: '-99', yellowCode: '-99'})">
            <span>核酸阳性</span>
            <span style="color: #F66C6C;">{{totalData.all_nuclein_num || 0}}</span>
        </div>
        <div @click="toList(totalData.all_nuclein_late_num, {unitId: streets[streetsIndex].code_value,nuclein_Status: '-99', nuclein_Overdue: '1', vaccin_Result: '-99', redCode: '-99', yellowCode: '-99'})">
            <span>核酸超期</span>
            <span style="color: #FA6400;">{{totalData.all_nuclein_late_num || 0}}</span>
        </div>
        <div @click="toList(totalData.all_vaccin_num, {unitId: streets[streetsIndex].code_value,nuclein_Status: '-99', nuclein_Overdue: '-99', vaccin_Result: '-1', redCode: '-99', yellowCode: '-99'})">
            <span>抗原阳性</span>
            <span style="color: #F7B500;">{{totalData.all_vaccin_num || 0}}</span>
        </div>
        <div @click="toList(totalData.all_vaccin_num, {unitId: streets[streetsIndex].code_value,nuclein_Status: '-99', nuclein_Overdue: '-99', vaccin_Result: '-1', redCode: '-99', yellowCode: '-99'})">
            <span>抗原超期</span>
            <span style="color: #F7B500;">{{totalData.all_vaccin_late_num || 0}}</span>
        </div>
        <!-- <div style="border-bottom: none;" @click="toList(totalData.all_yellow_num, {unitId: streets[streetsIndex].code_value,nuclein_Status: '-99', nuclein_Overdue: '-99', vaccin_Result: '-99', redCode: '-99', yellowCode: '01'})">
            <span>健康码（黄码）</span>
            <span style="color: #FA6400;">{{totalData.all_yellow_num || 0}}</span>
        </div> -->
    </div>
    <div class="chartBox" v-show="showChart1">
        <div class="title">异常情况趋势</div>
        <div class="chart2" ref="chart1">

        </div>
    </div>
    <!-- <div class="chartBox" v-show="showChart2">
        <div class="title">异常情况分布</div>
        <div class="chart3" ref="chart2" style="width: 85vw;">

        </div>
    </div>
    <van-popup v-model="showStreet" round position="bottom">
        <van-picker title="区县选择" value-key="name" show-toolbar :default-index="streetsIndex" :columns="streets" @confirm="onStreetConfirm" @cancel="onCancel"></van-picker>
    </van-popup> -->
</div>
</template>

<script>
import echarts from 'echarts'
export default {
    name: 'dlist',
    components: {},
    data() {
        return {
            showStreet: false,
            streets: [],
            streetsIndex: 0,

            showArea: false,
            areas: [],
            areaIndex: 0,
            totalData: {
                all_nuclein_late_num: 1,
                all_nuclein_num: 0,
                all_num: 4,
                all_red_num: 0,
                all_vaccin_num: 0,
                all_vaccin_late_num: 3,
                all_yellow_num: 0
            },
            showChart1: true,
            showChart2: true
        }
    },
    methods: {
        toTotalList() {
            // if(this.totalData.all_num) {
            //     this.$router.push({
            //         path: `commonlist/220327045323im0ngjrnziQtOQgMKzn/220319194130l6pirMZJe74yeqvID8I`,
            //         query: {
            //             secQuery: JSON.stringify({unitId: this.streets[this.streetsIndex].code_value})
            //         }
            //     })
            // }
        },
        toList(num, obj) {
            // if(num) {
            //     this.$router.push({
            //         path: `commonlist/220327050407Q71XVhrYzoh0Q9qbE75/220319194130l6pirMZJe74yeqvID8I`,
            //         query: {
            //             secQuery: JSON.stringify(obj)
            //         }
            //     })
            // }
        },
        initChart1(dataSource) {
            if(dataSource.xAxis.length == 0) {
                this.showChart1 = false
            } else {
                this.showChart1 = true
            }
            var myChart = echarts.init(this.$refs.chart1);
            let option = {
                color: ["#FA6400", "#E02020", "#F7B500"],
                tooltip: {
                    trigger: 'axis',
                    position: function (point, params, dom, rect, size) {
                        // 固定在顶部
                        if (point[0] >= size.viewSize[0] / 2) {
                            return [point[0] - size.contentSize[0], '10%'];
                        } else {
                            return [point[0], '10%'];
                        }
                    },
                    axisPointer: {
                        type: 'shadow'
                    }
                },
                legend: {
                    icon: "roundRect",
                    itemWidth: 15,
                    data: dataSource.legend,
                    show: true,
                    right: 0,
                    textStyle: {
                        fontSize: '12px',
                        color: "#666"
                    }
                },
                xAxis: {
                    type: 'category',
                    boundaryGap: false,
                    data: dataSource.xAxis,
                    axisLine: {
                        show: true,
                        lineStyle: {
                            color: "#ccc"
                        }
                    }
                },
                grid: {
                    top: 85,
                    bottom: 30,
                    left: 50,
                    right: 15
                },
                yAxis: {
                    type: 'value',
                    name: '(单位:人)', // 给X轴加单位
                    minInterval: 1,
                    nameTextStyle: {
                        align: 'right',
                        color: "#666",
                        fontSize: '12px'
                    },
                    axisLine: {
                        show: true,
                        lineStyle: {
                            color: "#ccc"
                        }
                    },
                    splitLine: {
                        show: false,
                    }
                },
                series: [{
                    name: dataSource.legend[0],
                    data: dataSource.values1,
                    type: 'line',
                    symbolSize: 6
                }, {
                    name: dataSource.legend[1],
                    data: dataSource.values2,
                    type: 'line',
                    symbolSize: 6
                }, {
                    name: dataSource.legend[2],
                    data: dataSource.values3,
                    type: 'line',
                    symbolSize: 6
                }, {
                    name: dataSource.legend[3],
                    data: dataSource.values4,
                    type: 'line',
                    symbolSize: 6
                }]
            }
            // myChart.clean()
            myChart.setOption(option, true);
        },
        initChart2(dataSource) {
            if(dataSource.xAxis.length == 0) {
                this.showChart2 = false
            } else {
                this.showChart2 = true
            }
            let myChart = echarts.init(this.$refs.chart2);
            let clickIndex;
            let option = {
                color: ["#E02020", "#F7B500", "#FA6400", "#F66C6C"],
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'shadow'
                    },
                    triggerOn: 'click',
                    formatter: val => {
                        console.log(val)
                        //获取当前阴影部分点击的索引值并
                        clickIndex = val[0].dataIndex
                    },
                },
                legend: {
                    data: dataSource.legend,
                    icon: "roundRect",
                    itemWidth: 15,
                    show: true,
                    right: 0,
                    textStyle: {
                        fontSize: '12px',
                        color: "#666"
                    }
                },
                grid: {
                    top: 60,
                    bottom: 50,
                    left: 60,
                    right: 15
                },
                xAxis: {
                    name: '单位:人', // 给X轴加单位
                    minInterval: 1,
                    nameTextStyle: {
                        align: 'right',
                        color: "#666",
                        fontSize: '12px',
                        verticalAlign: "top",
                        lineHeight: 60
                    },
                    type: 'value',
                    boundaryGap: [0, '10%'],

                    axisLine: {
                        show: true,
                        lineStyle: {
                            color: "#ccc"
                        }
                    },
                    axisLabel: {
                        color: "#666"
                    }
                },
                yAxis: {
                    type: 'category',
                    data: dataSource.xAxis,
                    axisLine: {
                        show: true,
                        lineStyle: {
                            color: "#ccc"
                        }
                    },
                    splitLine: {
                        show: false,
                    },
                    axisLabel: {
                        color: "#666"
                    }
                },
                series: [{
                    name: dataSource.legend[0],
                    data: dataSource.values1,
                    type: 'bar',
                    barWidth: 15,
                    label: {
                        show: true,
                        color: "inherit",
                        position: 'right'
                    }
                }, {
                    name: dataSource.legend[1],
                    data: dataSource.values2,
                    type: 'bar',
                    barWidth: 15,
                    label: {
                        show: true,
                        color: "inherit",
                        position: 'right'
                    }
                }, {
                    name: dataSource.legend[2],
                    data: dataSource.values3,
                    type: 'bar',
                    barWidth: 15,
                    label: {
                        show: true,
                        color: "inherit",
                        position: 'right'
                    }
                }, {
                    name: dataSource.legend[3],
                    data: dataSource.values4,
                    type: 'bar',
                    barWidth: 15,
                    label: {
                        show: true,
                        color: "inherit",
                        position: 'right'
                    }
                }]
            }

            // myChart.clean()

            myChart.resize({
                height: dataSource.xAxis.length * 120 + 50
            });
            myChart.getZr().on('click', (params) => {
                //获得准确索引值，不会随着位置的变化而变化！
                console.log(clickIndex);
                if(clickIndex !== undefined) {
                    this.$router.push({
                        path: `commonlist/220327050407Q71XVhrYzoh0Q9qbE75/220319194130l6pirMZJe74yeqvID8I`,
                        query: {
                            secQuery: JSON.stringify({
                                unitId: dataSource.ids[clickIndex],
                                nuclein_Status: '-1',
                                nuclein_Overdue: '1',
                                vaccin_Result: '-1',
                                redCode: '10',
                                yellowCode: '01'
                            })
                        }
                    })
                    clickIndex = undefined
                }
            })
            myChart.setOption(option, true);
        },
        async onStreetConfirm(value, index) {
            this.streetsIndex = index
            this.showStreet = false
            let loading = dsf.layer.loading()
            echarts.init(this.$refs.chart1).clear()
            echarts.init(this.$refs.chart2).clear()
            Promise.all([this.loadTotalData(value.code_value, 2),this.getHistoryCharts(value.code_value, 2),this.getChartsByArea(value.code_value, 2)]).then((result) => {
                dsf.layer.closeLoading(loading)
            }).catch((error) => {
                dsf.layer.closeLoading(loading)
                dsf.layer.toast(error)
                console.log(error)
            })
            this.onCancel()
        },
        onAreaConfirm(value, index) {
            this.showArea = false
            vant.Toast(`当前值：${value}, 当前索引：${index}`);
        },
        onCancel() {
            this.showArea = false
            this.showStreet = false
        },
        haddleStreetClick() {
            this.onCancel()
            this.showStreet = true
        },
        haddleAreaClick() {
            this.onCancel()
            this.showArea = true
        },
        /**
         *  id  所属父节点的ID
         *  type  1 社区  2 区  3 街道
         */
        initStreetData() {
            let that = this
            let user_id = dsf.util.loadSessionStore("user").user_id || dsf.util.loadSessionStore("user").userId;
            let loading = dsf.layer.loading()
            dsf.http.post("/ctrl/sqa/getAreaByUserId?userid=" + user_id).then(async function (data) {
                if (data && data.data.code === "200") {
                    that.streets = data.data.data.area;
                    if(that.streets.length > 0) {
                        Promise.all([that.loadTotalData(that.streets[0].code_value, 2),
                            that.getHistoryCharts(that.streets[0].code_value, 2),
                            that.getChartsByArea(that.streets[0].code_value, 2)]
                        ).then((result) => {
                            dsf.layer.closeLoading(loading)
                        }).catch((error) => {
                            dsf.layer.toast(error)
                            console.log(error)
                        })
                    } else {
                        dsf.layer.toast('暂无数据')
                    }
                } else {
                    dsf.layer.toast(data.data.message)
                }
            }).error(function (e) {
                dsf.layer.toast('查询失败，请重试')
                console.log(e)
            });
        },

        loadTotalData(id, type) {
            let that = this
            return dsf.http.post("/ctrl/sqa/getRealTopData?id=" + id + "&type=" + type).then(function (data) {
                if (data && data.data.code === "200") {
                    that.totalData = data.data.data.data[0]
                }
            }).error(function (e) {

            });
        },
        getHistoryCharts(id, type) {
            let that = this
            // return dsf.http.post("/ctrl/sqa/getHistoryCharts?id=" + id + "&type=" + type).then(function (data) {
                // if (data && data.data.code === "200") {
                    let rows = [{
                      tj_date: '05-07',
                      nuclein_num: 0,
                      vaccin_num: 1,
                      nuclein_late_num: 0
                    },{
                      tj_date: '05-10',
                      nuclein_num: 2,
                      vaccin_num: 3,
                      nuclein_late_num: 0
                    }]
                    let dataSource = {
                        legend: ["核酸异常", "抗原异常", "健康码异常"],
                        xAxis: [],
                        values1: [],
                        values2: [],
                        values3: [],
                        // values4: []
                    }
                    rows.map((item, index) => {
                        dataSource.xAxis.push(item.tj_date)
                        dataSource.values1.push(parseInt(item.nuclein_num))
                        dataSource.values2.push(parseInt(item.vaccin_num))
                        dataSource.values3.push(parseInt(item.nuclein_late_num))
                        // dataSource.values4.push(parseInt(item.health_num))
                    })
                    that.initChart1(dataSource)
                // }
            // }).catch(function (e) {

            // });
        },
        getChartsByArea(id, type) {
            debugger
            let that = this
            return dsf.http.post("/ctrl/sqa/getChartsByArea?id=" + id + "&type=" + type).then(function (data) {
                console.log(data)
                debugger
                if (data && data.data.code === "200") {
                    let rows = data.data.data.data
                    let dataSource = {
                        legend: ["核酸阳性", "未按要求接种疫苗", "健康码异常", "未按时核酸检测"],
                        ids: [],
                        xAxis: [],
                        values1: [],
                        values2: [],
                        values3: [],
                        values4: []
                    }
                    rows.map((item, index) => {
                        if (!item.bt && item.name) {
                            item.bt = item.name
                        }
                        dataSource.xAxis.push(item.bt.substr(0, 4) + "\n" + item.bt.substr(4))
                        dataSource.ids.push(item.id)
                        dataSource.values1.push(parseInt(item.nuclein_num))
                        dataSource.values2.push(parseInt(item.vaccin_num))
                        dataSource.values3.push(parseInt(item.health_num))
                        dataSource.values4.push(parseInt(item.nuclein_late_num))
                    })
                    that.initChart2(dataSource)
                    console.log(dataSource)
                }
            }).catch(function (e) {

            });
        }
    },
    mounted() {
        this.getHistoryCharts() 
    },
    // beforeRouteEnter (to, from, next) {
    //     next(v => {
    //         if(from.name != 'commonList') {
    //             v.areaIndex = 0
    //             v.streetsIndex = 0
    //             v.totalData.all_nuclein_late_num = 0,
    //             v.totalData.all_nuclein_num = 0,
    //             v.totalData.all_num = 0,
    //             v.totalData.all_red_num = 0,
    //             v.totalData.all_vaccin_num = 0,
    //             v.totalData.all_yellow_num = 0
    //             echarts.init(v.$refs.chart1).clear()
    //             echarts.init(v.$refs.chart2).clear()
    //             v.initStreetData()
    //         }
    //     })
    // }
}
</script>

<style lang="scss" src="@/assets/styles/dlist.scss"></style>

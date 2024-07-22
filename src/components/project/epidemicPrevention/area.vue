<template>
<div class="warpbox">
    <div class="selector">
        <div @click="haddleAreaClick">
            <span class="left">社区选择</span>
            <p class="right">
                <span v-if="areas.length>0">{{areas[areaIndex].name}}</span>
                <van-icon name="arrow" />
            </p>
        </div>
    </div>
    <div class="totals">
        <div @click="toTotalList()">
            <span>总人数</span>
            <span style="color: #0073CA;">{{totalData.all_num || 0}}</span>
        </div>
        <div @click="toList(totalData.all_nuclein_num,{unitId: areas[areaIndex].id,nuclein_Status: '-1', nuclein_Overdue: '-99', vaccin_Result: '-99', redCode: '-99', yellowCode: '-99'})">
            <span>核酸阳性</span>
            <span style="color: #F66C6C;">{{totalData.all_nuclein_num || 0}}</span>
        </div>
        <div @click="toList(totalData.all_nuclein_late_num, {unitId: areas[areaIndex].id,nuclein_Status: '-99', nuclein_Overdue: '1', vaccin_Result: '-99', redCode: '-99', yellowCode: '-99'})">
            <span>核酸超期</span>
            <span style="color: #FA6400;">{{totalData.all_nuclein_late_num || 0}}</span>
        </div>
        <div @click="toList(totalData.all_vaccin_num, {unitId: areas[areaIndex].id,nuclein_Status: '-99', nuclein_Overdue: '-99', vaccin_Result: '-1', redCode: '-99', yellowCode: '-99'})">
            <span>未按要求接种疫苗</span>
            <span style="color: #F7B500;">{{totalData.all_vaccin_num || 0}}</span>
        </div>
        <div style="border-bottom: none;" @click="toList(totalData.all_red_num, {unitId: areas[areaIndex].id,nuclein_Status: '-99', nuclein_Overdue: '-99', vaccin_Result: '-99', redCode: '10', yellowCode: '-99'})" >
            <span>健康码（红码）</span>
            <span style="color: #E02020;">{{totalData.all_red_num || 0}}</span>
        </div>
        <div style="border-bottom: none;" @click="toList(totalData.all_yellow_num, {unitId: areas[areaIndex].id,nuclein_Status: '-99', nuclein_Overdue: '-99', vaccin_Result: '-99', redCode: '-99', yellowCode: '01'})">
            <span>健康码（黄码）</span>
            <span style="color: #FA6400;">{{totalData.all_yellow_num || 0}}</span>
        </div>
    </div>
    <div class="chartBox" v-show="showChart1">
        <div class="title">未按时核酸检测</div>
        <div class="chart1" ref="chart1">

        </div>
    </div>
    <div class="chartBox" v-show="showChart2">
        <div class="title">未按要求接种疫苗</div>
        <div class="chart1" ref="chart2">

        </div>
    </div>
    <van-popup v-model="showArea" round position="bottom">
        <van-picker title="社区选择" value-key="name" show-toolbar :default-index="areaIndex" :columns="areas" @confirm="onAreaConfirm" @cancel="onCancel"></van-picker>
    </van-popup>
</div>
</template>

<script>
import echarts from 'echarts'
export default {
    name: 'area',
    components: {},
    data() {
        return {
            dlist: "",
            showStreet: false,
            streets: [],
            streetsIndex: 0,
            showArea: false,
            areas: [],
            areaIndex: 0,
            totalData: {
                all_nuclein_late_num: 0,
                all_nuclein_num: 0,
                all_num: 0,
                all_red_num: 0,
                all_vaccin_num: 0,
                all_yellow_num: 0
            },
            showChart1: true,
            showChart2: true
        };
    },
    methods: {
        toTotalList() {
            if(this.totalData.all_num) {
                this.$router.push({
                    path: `commonlist/220325170030r0mPMER4RgnisIwjKYn/220319194130l6pirMZJe74yeqvID8I`,
                    query: {
                        secQuery: JSON.stringify({unitId: this.areas[this.areaIndex].id})
                    }
                })
            }
        },
        toList(num, obj) {
            if(num) {
                this.$router.push({
                    path: `commonlist/220325170513SJWWMUxWRahqQNyKht7/220319194130l6pirMZJe74yeqvID8I`,
                    query: {
                        secQuery: JSON.stringify(obj)
                    }
                })
            }
        },
        initChart1(dataSource) {
            if(dataSource.xAxis.length == 0) {
                this.showChart1 = false
            } else {
                this.showChart1 = true
            }
            let myChart = echarts.init(this.$refs.chart1);
            let option ={
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
                    icon: "circle",
                    itemWidth: 15,
                    data: ["未按时核酸检测人数"],
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
                        show: true
                    },
                    splitLine: {
                        show: false
                    }
                },
                grid: {
                    top: 40,
                    bottom: 30,
                    left: 50,
                    right: 15
                },
                yAxis: {
                    type: 'value',
                    name: '单位:人', // 给X轴加单位
                    minInterval: 1,
                    nameTextStyle: {
                        align: 'right',
                        color: "#666",
                        fontSize: '12px'
                    },
                    axisLine: {
                        show: true
                    },
                    splitLine: {
                        show: false
                    }
                },
                series: [{
                    name: '未按时核酸检测人数',
                    data: dataSource.data,
                    type: 'line',
                    symbolSize: 6,
                    lineStyle: {
                        color: "#FD9D00",
                        width: 3
                    },
                    itemStyle: {
                        normal: {
                            color: '#FA6400'
                        }
                    },
                    areaStyle: {
                        opacity: 0.8,
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                            offset: 0,
                            color: 'rgba(250,100,0,0.71)'
                        }, {
                            offset: 1,
                            color: 'rgba(253,157,0,0.30)'
                        }])
                    },
                }]
            }
            myChart.setOption(option, true);
        },
        initChart2(dataSource) {
            if(dataSource.xAxis.length == 0) {
                this.showChart2 = false
            } else {
                this.showChart2 = true
            }
            var myChart = echarts.init(this.$refs.chart2);
            myChart.setOption({
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
                    icon: "circle",
                    itemWidth: 15,
                    data: ["未按要求接种疫苗人数"],
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
                        show: true
                    },
                    splitLine: {
                        show: false
                    }
                },
                grid: {
                    top: 40,
                    bottom: 30,
                    left: 50,
                    right: 15
                },
                yAxis: {
                    type: 'value',
                    name: '单位:人', // 给X轴加单位
                    minInterval: 1,
                    nameTextStyle: {
                        align: 'right',
                        color: "#666",
                        fontSize: '12px'
                    },
                    axisLine: {
                        show: true
                    },
                    splitLine: {
                        show: false
                    }
                },
                series: [{
                    name: '未按要求接种疫苗人数',
                    data: dataSource.data,
                    type: 'line',
                    symbolSize: 6,
                    lineStyle: {
                        color: "#FD9D00",
                        width: 3
                    },
                    itemStyle: {
                        normal: {
                            color: '#FA6400'
                        }
                    },
                    areaStyle: {
                        opacity: 0.8,
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                            offset: 0,
                            color: 'rgba(247,181,0,0.43)'
                        }, {
                            offset: 1,
                            color: 'rgba(252,219,0,0.10)'
                        }])
                    },
                }]
            }, true);
        },
        onStreetConfirm(value, index) {
            console.log(value)
            this.showStreet = false
            this.streetsIndex = index
            vant.Toast(`当前值：${value.name}, 当前索引：${index}`);
        },
        async onAreaConfirm(value, index) {
            this.showArea = false
            this.areaIndex = index
            let loading = dsf.layer.loading()
            echarts.init(this.$refs.chart1).clear()
            echarts.init(this.$refs.chart2).clear()
            //先获取选择的社区下面的数据
            Promise.all([this.loadTotalData(value.id, 1),
                this.getNucleinChartsByAreaId(value.id),
                this.getVaccinChartsByAreaId(value.id)]
            ).then((result) => {
                dsf.layer.closeLoading(loading)
            }).catch((error) => {
                dsf.layer.toast(error)
                console.log(error)
            })
            this.onCancel()
        },
        onCancel() {
            this.showArea = false
            this.showStreet = false
        },
        haddleStreetClick() {
            this.showStreet = true
        },
        haddleAreaClick() {
            this.showArea = true
        },
        /**
         *  id  所属父节点的ID
         *  type  1 社区  2 区  3 街道
         */
        initStreetData(id, type) {
            let that = this
            let user_id = dsf.util.loadSessionStore("user").user_id || dsf.util.loadSessionStore("user").userId;
            let loading = dsf.layer.loading()
            dsf.http.post("/ctrl/sqa/getAreaByUserId?userid=" + user_id).then(async function (data) {
                if (data && data.data.code == "200") {
                    that.areas = data.data.data.community
                    console.log(that.areas)
                    if(that.areas.length > 0) {
                        Promise.all([that.loadTotalData(that.areas[0].id, 1),
                            that.getNucleinChartsByAreaId(that.areas[0].id),
                            that.getVaccinChartsByAreaId(that.areas[0].id)]
                        ).then((result) => {
                            dsf.layer.closeLoading(loading)
                        }).catch((error) => {
                            dsf.layer.toast(error)
                            console.log(error)
                        })
                    } else {
                        dsf.layer.toast('暂无数据')
                    }
                    console.log(data.data.data)
                } else {
                    dsf.layer.toast(data.data.message)
                }
            }).error(function (e) {
                dsf.layer.toast('查询失败，请重试')
            });
        },
        loadTotalData(id, type) {
            let that = this
            return dsf.http.post("/ctrl/sqa/getRealTopData?id=" + id + "&type=" + type).then(function (data) {
                if (data && data.data.code === "200") {
                    that.totalData = data.data.data.data[0]
                }
            }).catch(function (e) {

            });
        },
        onChange(picker, value, index) {

        },
        getNucleinChartsByAreaId(id) {
            let that = this
            return dsf.http.post("/ctrl/sqa/getNucleinChartsByAreaId?id=" + id).then(function (data) {
                if (data && data.data.code === "200") {
                    var dataSource = {
                        xAxis: [],
                        data: []
                    }
                    let rows = data.data.data.data
                    rows.map((item, index) => {
                        dataSource.xAxis.push(item.tj_date.substr(5).replace("-", '.'))
                        dataSource.data.push(parseInt(item.nuclein_late_num))
                    })
                    that.initChart1(dataSource)

                }
            }).error(function (e) {

            });
        },
        getVaccinChartsByAreaId(id) {
            let that = this
            return dsf.http.post("/ctrl/sqa/getVaccinChartsByAreaId?id=" + id).then(function (data) {
                console.log(data)
                if (data && data.data.code === "200") {
                    var dataSource = {
                        xAxis: [],
                        data: []
                    }
                    let rows = data.data.data.data
                    rows.map((item, index) => {
                        dataSource.xAxis.push(item.tj_date.substr(5).replace("-", '.'))
                        dataSource.data.push(parseInt(item.vaccin_num))
                    })
                    console.log(dataSource)
                    that.initChart2(dataSource)

                }
            }).catch(function (e) {

            });
        },

    },
    mounted() {
        this.initStreetData() //初始化街道信息
    },
    beforeRouteEnter (to, from, next) {
        next(v => {
            if(from.name != 'commonList') {
                v.areaIndex = 0
                v.streetsIndex = 0
                v.totalData.all_nuclein_late_num = 0,
                v.totalData.all_nuclein_num = 0,
                v.totalData.all_num = 0,
                v.totalData.all_red_num = 0,
                v.totalData.all_vaccin_num = 0,
                v.totalData.all_yellow_num = 0
                echarts.init(v.$refs.chart1).clear()
                echarts.init(v.$refs.chart2).clear()
                v.initStreetData()
            }
        })
    }
}
</script>

<style lang="scss" src="@/assets/styles/dlist.scss"></style>

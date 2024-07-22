<template>
<div class="container">
    <div class="screen">
        <div class="time">
            <span class="screen-item" :class="{'choose-item': item.value == currentTime}" v-for="(item, index) in time" :key="index" @click="chooseTime(item)">{{item.label}}</span>
        </div>
        <div class="dept" v-if="active == 1">
            <span class="screen-item" :class="{'choose-item': item.id == currentDept}" v-for="(item, index) in depts" :key="index" @click="chooseDept(item)">{{item.name}}</span>
        </div>
    </div>
    <div class="charts">
        <template v-if="active == 0">
            <div class="module">
                <div class="title">项目情况</div>
                <div class="blocks">
                    <template v-for="(item, index) in xmqk">
                        <div class="grey-block" v-if="!Array.isArray(item)" :key="index" style="width: 30%;padding: 10px">
                            <div>
                                <img :src="item.img" alt="" style="width: 0.5rem;height:0.5rem;display: inline-block;margin-bottom: 10px;">
                                <div>{{item.label}}</div>
                            </div>
                            <span class="num" :style="{color: item.color}">{{item.num}}</span>
                        </div>
                        <div v-else :key="index" style="width: 30%">
                            <div class="grey-block" v-for="(it, idx) in item" :key="idx" style="padding: 5px 8px">
                                <div>{{it.label}}</div>
                                <span :style="{color: it.color,fontSize: '25px'}">{{it.num}}</span>
                            </div>
                        </div>
                    </template>
                </div>
                <div class="feedback-block">
                    <div style="color: #3389E0; padding-bottom: 10px;">办结率</div>
                    <van-row>
                        <van-col span="6" v-for="(item, index) in completion" :key="index">
                            <van-circle
                                v-model="item.num"
                                size="60px"
                                :rate="item.num"
                                :stroke-width="130"
                                layer-color="#e5e5e5"
                                color="#FF8926"
                                :text="`${item.num}%`"
                                stroke-linecap="butt"
                            />
                            <div>{{item.label}}</div>
                        </van-col>
                    </van-row>
                </div>
            </div>
            <div class="module">
                <div class="title">在办任务</div>
                <div class="charts-container">
                    <div>
                        <v-chart :options="allPieChart" style="width: 2.4rem;height: 2.4rem"/>
                        <div v-for="(item, index) in zbrw" :key="index" :style="{color: item.color, paddingBottom: '10px'}">{{ item.label }}：{{ item.num }}</div>
                    </div>
                    <v-chart :options="deptBarChart" style="width: 4rem;height: 6rem;flex: 1;text-align: right" />
                </div>
                <div class="feedback-block">
                    <div style="color: #3389E0;">反馈情况</div>
                    <div class="flex">
                        <div v-for="(item, index) in fkqk" :key="index">
                            <div class="num" :style="{color: item.color}">{{item.num}}</div>
                            <div>{{item.label}}</div>
                        </div>
                    </div>
                </div>
            </div>
        </template>
        <template v-else>
            <div class="module">
                <div class="title">督办任务</div>
                <div class="blocks">
                    <div class="grey-block" v-for="(item, index) in dbrw" :key="index" style="width: 48%">
                        <div>
                            <img :src="item.img" alt="" style="width: 0.5rem;height:0.5rem;display: inline-block;margin-bottom: 10px;">
                            <div>{{item.label}}</div>
                        </div>
                        <span class="num" :style="{color: item.color}">{{item.num}}</span>
                    </div>
                </div>
            </div>
            <div class="feedback-block">
                <div style="color: #3389E0;">反馈情况</div>
                <div class="flex">
                    <div v-for="(item, index) in blfkqk" :key="index">
                        <div class="num" :style="{color: item.color}">{{item.num}}</div>
                        <div>{{item.label}}</div>
                    </div>
                </div>
            </div>
        </template>
        <div style="height: 60px"></div>
    </div>
	<van-tabbar v-model="active">
        <van-tabbar-item>
            督办立项
            <template #icon> 
                <img :src="active == 0 ? './static/images/duban/lixiang.png' : './static/images/duban/lixiang2.png'" alt="">
            </template>
        </van-tabbar-item>
        <van-tabbar-item>
            督办办理
            <template #icon>
                <img :src="active == 0 ? './static/images/duban/banli.png' : './static/images/duban/banli2.png'" alt="">
            </template>
        </van-tabbar-item>
    </van-tabbar>
</div>
</template>

<script>
import VChart from "vue-echarts";
import 'echarts/lib/chart/pie'
import 'echarts/lib/chart/bar'
export default {
    components: {VChart},
    data() {
        return {
            active: 0,
            currentTime: '1',
            currentDept: '0',
            time: [{ // 时间选择
                label: '一个月',
                value: '1',
            },{
                label: '三个月',
                value: '2',
            },{
                label: '一年',
                value: '3',
            }],
            depts: [{
                name: '全部',
                id: '0'
            }],
            zbrw: [{ // 在办任务
                label: '总任务数',
                color: '#000',
                num: '0'
            },{
                label: '  办理中',
                color: '#000',
                num: '0'
            },{
                label: '  待接收',
                color: '#3389E0',
                num: '0'
            }],
            dbrw: [{ // 督办任务
                label: '待接收',
                color: '#1688FA',
                icon: 'iconjiahao',
                img: './static/images/duban/daijieshou.png',
                num: '0'
            },{
                label: '办理中',
                color: '#FF8926',
                icon: 'iconjiahao',
                img: './static/images/duban/banlizhong.png',
                num: '0'
            },{
                label: '已办结',
                color: '#1ACAD4',
                icon: 'iconjiahao',
                img: './static/images/duban/banjie.png',
                num: '0'
            },{
                label: '已超期',
                color: '#DE1010',
                icon: 'iconjiahao',
                img: './static/images/duban/yichaoqi.png',
                num: '0'
            }],
            fkqk: [{ // 立项反馈情况
                label: '正常反馈',
                color: '#1ACAD4',
                num: '0'
            },{
                label: '超期反馈',
                color: '#FF8926',
                num: '0'
            },{
                label: '超期未反馈',
                color: '#DE1010',
                num: '0'
            }],
            blfkqk: [{ // 办理反馈情况
                label: '待反馈',
                color: '#1688FA',
                num: '11'
            },{ 
                label: '正常反馈',
                color: '#1ACAD4',
                num: '0'
            },{
                label: '超期反馈',
                color: '#FF8926',
                num: '0'
            },{
                label: '超期未反馈',
                color: '#DE1010',
                num: '0'
            }],
            completion: [{ // 办结率
                label: '领导批示',
                num: 50
            },{
                label: '重要文件',
                num: 60
            },{
                label: '重点工作',
                num: 75
            },{
                label: '紧急事项',
                num: 20
            }],
            xmqk: [{ // 项目情况
                label: '项目',
                color: '#1688FA',
                icon: 'iconjiahao',
                img: './static/images/duban/xiangmu.png',
                num: '0'
            },{
                label: '办结',
                color: '#1ACAD4',
                icon: 'iconjiahao',
                img: './static/images/duban/banjie.png',
                num: '0'
            },[{
                label: '在办',
                color: '#FF8926',
                num: '0'
            },{
                label: '超期',
                color: '#DE1010',
                num: '0'
            }]],
            allPieChart: {
                title: {
                    show: false
                },
                tooltip: {
                    trigger: 'item',
                    formatter: "{a} <br/>{b} : {c} ({d}%)",
                    position: [10, 10]
                },
                color: ['#3389E0', '#C3E3FF'],
                series: [{
                    name: '在办任务',
                    type: 'pie',
                    radius: '80%',
                    center: ['40%', '50%'],
                    data: [{
                            value: 25,
                            name: '待接收'
                        },
                        {
                            value: 75,
                            name: '办理中'
                        }
                    ],
                    itemStyle: {
                        normal: {
                            label: {
                                show: false
                            }
                        }
                    }
                }]
            },
            deptBarChart: {
                color: ['#3389E0', '#C3E3FF'],
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                    // Use axis to trigger tooltip
                    type: 'shadow' // 'shadow' as default; can also be 'line' or 'shadow'
                    }
                },
                legend: {

                },
                grid: {
                    right: '0',
                    bottom: '3%',
                    height: '90%',
                    width: '100%',
                    containLabel: true
                },
                dataZoom : [{
                    type: 'slider',//给x轴设置滚动条
                    show: true, //flase直接隐藏图形
                    xAxisIndex: [0],
                    bottom:0,
                    height:20,
                    showDetail: false,
                    startValue: 0,//滚动条的起始位置
                    endValue: 9 //滚动条的截止位置（按比例分割你的柱状图x轴长度）
                },
                {
                    type: 'inside',//设置鼠标滚轮缩放
                    show: true,
                    xAxisIndex: [0],
                    startValue: 0,
                    endValue: 9
                }],
                yAxis: {
                    type: 'value'
                },
                xAxis: {
                    type: 'category',
                    data: [],
                    axisLabel: {
                        show: true,
                        interval: 0,
                        formatter: function (value) {
                            //x轴的文字改为竖版显示
                            var str = value.split("");
                            return str.join("\n");
                        }
                    }
                },
                series: [
                    {
                        name: '待接收',
                        type: 'bar',
                        stack: 'total',
                        label: {
                            show: false
                        },
                        emphasis: {
                            focus: 'series'
                        },
                        data: [],
                    },
                    {
                        name: '办理中',
                        type: 'bar',
                        stack: 'total',
                        label: {
                            show: false
                        },
                        emphasis: {
                            focus: 'series'
                        },
                        data: [],
                    },
                    
                ],
                
            }
        }
    },
    created() {
        this.getDept()
        this.getProjectStatistics()
        this.getTaskStatistics()
    },
    methods: {
        getDept() {
            dsf.http.post('/ctrl/superviseV6/m/list/dept').then(res => {
                if (res.data.code == 200) {
                    this.depts = [...this.depts, ...res.data.data]
                }
            })
        },
        chooseTime(item) {
            this.currentTime = item.value
            this.getTaskStatistics()
            this.getProjectStatistics()
        },
        chooseDept(item) {
            this.currentDept = item.id
            this.getTaskStatistics()
        },
        getProjectStatistics() { // 立项统计
            let loadingIndx = dsf.layer.loading();
            dsf.http.post('/ctrl/superviseV6/m/statistics/project', { dateType: this.currentTime }).then(res => {
                if (res.data.code == 200) {
                    let {feedBack, pInfo, task} = res.data.data
                    this.fkqk[0].num = feedBack.normal
                    this.fkqk[1].num = feedBack.over
                    this.fkqk[2].num = feedBack.overNo

                    this.xmqk[0].num = pInfo.sum
                    this.xmqk[1].num = pInfo.close
                    this.xmqk[2][0].num = pInfo.process
                    this.xmqk[2][1].num = pInfo.over

                    this.completion[0].num = Number(pInfo.ldps.split('%')[0])
                    this.completion[1].num = Number(pInfo.zywj.split('%')[0])
                    this.completion[2].num = Number(pInfo.zysx.split('%')[0])
                    this.completion[3].num = Number(pInfo.jjsx.split('%')[0])

                    this.deptBarChart.xAxis.data = task.dept.map(item => item.deptName)
                    this.deptBarChart.series[0].data = task.dept.map(item => item.wait)
                    this.deptBarChart.series[1].data = task.dept.map(item => item.process)

                    this.allPieChart.series[0].data[0].value = task.wait
                    this.allPieChart.series[0].data[1].value = task.process

                    this.zbrw[0].num = task.sum
                    this.zbrw[1].num = task.process
                    this.zbrw[2].num = task.wait
                }
            }).always(() => {
                dsf.layer.closeLoading(loadingIndx)
            })
        },
        getTaskStatistics() { // 办理统计
            let loadingIndx = dsf.layer.loading();
            dsf.http.post('/ctrl/superviseV6/m/statistics/task', { dateType: this.currentTime, deptId: this.currentDept }).then(res => {
                dsf.layer.closeLoading(loadingIndx)
                if (res.data.code == 200) {
                    let {feedBack, task} = res.data.data
                    this.blfkqk[0].num = feedBack.normalNo
                    this.blfkqk[1].num = feedBack.normal
                    this.blfkqk[2].num = feedBack.over
                    this.blfkqk[3].num = feedBack.overNo

                    this.dbrw[0].num = task.wait
                    this.dbrw[1].num = task.process
                    this.dbrw[2].num = task.close
                    this.dbrw[3].num = task.over
                }
            })
        }
    }
}
</script>
<style lang='scss' scoped>
@import "src/assets/styles/themes.scss";
@import "src/assets/styles/mixin.scss";
.container {
    height: 100%;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    background-color: #fff;
    .charts {
        overflow: auto;
        flex: 1;
        padding: 16px;
    }
    .screen {
        border-bottom: 10px solid #f5f5f5;
        padding: 5px 10px;
        .screen-item {
            display: inline-block;
            min-width: 60px;
            color: #999;
            border: 1px solid #ddd;
            border-radius: 30px;
            font-size: 13px;
            text-align: center;
            padding: 0 5px;
            line-height: 25px;
            margin: 5px;
        }
        .choose-item {
            @include background-theme("normal");
            color: #fff;
            border: 0;
        }
        .dept {
            display: flex;
            overflow: auto;
            span {
                flex-shrink: 0;
            }
        }
    }
    .module {
        &:not(:first-of-type) {
            margin-top: 16px;
        }
        .title {
            font-size: var(--font_size_2);
            font-weight: 600;
            border-left: 5px solid;
            @include border-color-theme('normal');
            padding-left: 6px;
        }
    }
    .blocks {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        .grey-block {
            border-radius: 3px;
            padding: 20px;
            margin-top: 16px;
            background-color: #fafafa;
            display: flex;
            justify-content: space-between;
            align-items: center;
            text-align: center;
            i {
                display: inline-block;
                font-size: 25px;
                margin-bottom: 8px;
            }
        }
    }
    .num {
        font-size: 30px;
    }
    .feedback-block {
        background-color: #fafafa;
        text-align: center;
        padding: 12px;
        margin-top: 16px;
        .flex {
            padding-top: 10px;
            display: flex;
            justify-content: space-between;
            flex-wrap: wrap;
        }
    }
}
.charts-container {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
}
.van-tabbar{
    height: 60px;
    box-shadow: 0 -2px 8px 0 rgba(212,213,216,0.50);
    ::v-deep .van-tabbar-item__text {
        font-size: var(--font_size_4);
    }
}
</style>
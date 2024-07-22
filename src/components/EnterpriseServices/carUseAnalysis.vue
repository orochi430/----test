<template>
    <div id="caruse-analysis">
        <div class="content">
            <div class="card">
                <van-row class="textlocation">
                    <van-col span="8">
                        <label>共用车</label>
                        <label class="timesfont">{{totalTimes}}</label>
                        <label>次</label>
                    </van-col>
                    <van-col span="16">
                        <van-field
                        readonly
                        clickable
                        name="calendar"
                        :value="date"
                        placeholder=""
                        @click="showCalendar = true"
                        />
                        <van-calendar v-model="showCalendar" type="range" @confirm="onConfirm" :min-date="minDate"
                        :max-date="maxDate" first-day-of-week="1"/>
                    </van-col>
                </van-row>
                <div class="chart-container">
                    <v-chart :options="carUseTimesPieChart" />
                </div>
            </div>
            <div class="card">
                <van-tabs>
                    <van-tab  title="按用车部门" name="a">
                        <van-pull-refresh v-model="deptRefreshing" @refresh="onDeptRefresh">
                            <van-list
                                v-model="deptLoading"
                                :finished="deptFinished"
                                finished-text="没有更多了"
                                @load="onLoadDept"
                            >
                            <van-row  v-for="item in deptList" :key="item.name">
                                <van-col span="12" class="mycell mycell-left">{{item.deptname}}</van-col>
                                <van-col span="12" class="mycell mycell-right">{{item.times}}次</van-col>
                            </van-row>
                                <!-- <van-cell v-for="item in deptList" :key="item.deptname" :title="item.deptname" :value="item.times+'次'" /> -->
                            </van-list>
                        </van-pull-refresh>
                    </van-tab>

                    <van-tab  title="按用车人" name="b">
                        <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
                            <van-list
                                v-model="loading"
                                :finished="finished"
                                finished-text="没有更多了"
                                @load="onLoad"
                            >
                            <van-row  v-for="item in list" :key="item.name">
                                <van-col span="8" class="mycell">{{item.name}}</van-col>
                                <van-col span="8" class="mycell mycell-left">{{item.deptname}}</van-col>
                                <van-col span="8" class="mycell mycell-right">{{item.times}}次</van-col>
                            </van-row>
                                <!-- <van-cell v-for="item in list" :key="item.name" :title="item.name" :value="item.times" /> -->
                            </van-list>
                            </van-pull-refresh>
                    </van-tab>
                </van-tabs>
            </div>
        </div>
    </div>
</template>
<style lang="scss" scoped>
	@import "../../assets/styles/themes.scss";
	@import "../../assets/styles/mixin.scss";
    .mycell{
        position: relative;
        // display: -webkit-box;
        // display: -webkit-flex;
        // display: flex;
        box-sizing: border-box;
        // width: 100%;
        padding: 10px 16px;
        overflow: hidden;
        color: #323233;
        font-size: var(--font_size_3);
        line-height: 24px;
        background-color: #fff;
        -webkit-overflow-scrolling: touch;
    }
    .mycell-left{
        text-align:left;
    }
    .mycell-right{
        text-align:right;
    }
    .timesfont{
        font-size: 2em;
        color: #2E91F6;
        font-weight: bold;
    }
    .textlocation{
        text-align: center;
        background-color:#fff;
    }
    .chart-container{
        height: 230px;
		width: 100%;
		position: relative;

		.echarts {
			width: 100%;
			height: 100%;
		}
    }
    .content .card {
        margin: 12px;
        padding: 12px;
        background-color: #fff;
        border-radius: 12px;
        box-shadow: 0 8px 12px #ebedf0;
    }
</style>
<script>
	import VChart from "vue-echarts";
    //import 'echarts/lib/chart/line'
	import 'echarts/lib/chart/pie'
	//import 'echarts/lib/chart/bar'
	import 'echarts/lib/component/title'
	import 'echarts/lib/component/legend'
    import 'echarts/lib/component/tooltip'

    export default {
        name:"caruseAnalysis",
		components: {VChart},
        data(){
            return {
                deptList: [],
                deptLoading: false,
                deptFinished: false,
                deptRefreshing: false,

                list: [],
                loading: false,
                finished: false,
                refreshing: false,

                totalTimes:0,
                date:`${this.formatDate(new Date(new Date().getFullYear()+"-"+(new Date().getMonth()+1)+"-1"))} ~ ${this.formatDate(new Date())}`,
                showCalendar: false,
                minDate: new Date(new Date((new Date().getFullYear()-3)+"-"+(new Date().getMonth()+1)+"-1")),
                maxDate: new Date(),
                //图形对象
                carUseTimesPieChart:{
                    tooltip: {
                        trigger: 'item'
                    },
                    legend: {
                        bottom: '30%',
                        orient: 'vertical',
                        right: '5%'
                    },
                    series: [
                                {
                                    name             : '用车统计',
                                    type             : 'pie',
                                    left             :'-35%',
                                    radius           : ['30%', '60%'],
                                    avoidLabelOverlap: false,
                                    label            : {
                                    normal           : {
                                    formatter        : '{c}',
                                    position         : 'inside'
                                }
                            },
                            emphasis: {
                                label: {
                                    show: true,
                                    fontSize: '20',
                                    fontWeight: 'bold'
                                }
                            },
                            labelLine: {
                                show: false
                            },
                            data: [
                                    // {"value": 1048, "name": "开发一部"},
                                    // {"value": 735, "name": "开发二部"},
                                    // {"value": 580, "name": "开发三部"},
                                    // {"value": 484, "name": "办公室"},
                                    // {"value": 300, "name": "开发四部"}
                                ]
                        }
                    ]
                }
            }
        },
        created() {
			this.initPage();
		},
		mounted() {

        },
        methods: {
            initPage(){
                this.userInfo = dsf.util.loadSessionStore("user");
                this.getUseCarTotalTimes();
            },
            formatDate(date) {
                return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
            },
            onConfirm(date) {
                const [start, end] = date;
                this.showCalendar = false;
                this.date = `${this.formatDate(start)} ~ ${this.formatDate(end)}`;
                this.getUseCarTotalTimes();
                this.onLoadDept();
                this.onLoad();
            },
            onLoadDept(){
                setTimeout(() => {
                    let that=this;
                    if (that.deptRefreshing) {
                        that.deptList = [];
                        that.deptRefreshing = false;
                    }

                    this.getUseCarTimesDepartmentDetail(function(data){
                        let datatemp=data.data;
                        let totalRows=parseInt(data.count);
                        let length=datatemp.length;
                        for (let i = 0; i < length; i++) {
                            that.deptList.push(datatemp[i]);
                        }
                        that.deptLoading = false;
                        let allLength=that.deptList.length;
                        if (allLength==0||allLength>=totalRows) {
                            that.deptFinished = true;
                        }
                    });
                }, 1000);
            },
            onDeptRefresh(){
                // 清空列表数据
                this.deptFinished = false;
                // 重新加载数据
                // 将 loading 设置为 true，表示处于加载状态
                this.deptLoading = true;
                this.onLoadDept();
            },

            onLoad() {
                setTimeout(() => {
                    let that=this;
                    if (that.refreshing) {
                        that.list = [];
                        that.refreshing = false;
                    }

                    this.getUseCarTimesUserDetail(function(data){
                        let datatemp=data.data;
                        let totalRows=data.count;
                        let length=datatemp.length;
                        for (let i = 0; i < length; i++) {
                            that.list.push(datatemp[i]);
                        }
                        that.loading = false;

                        if (that.list.length==0||that.list.length >= totalRows) {
                            that.finished = true;
                        }
                    });

                }, 1000);
            },
            onRefresh() {
                // 清空列表数据
                this.finished = false;
                // 重新加载数据
                // 将 loading 设置为 true，表示处于加载状态
                this.loading = true;
                this.onLoad();
            },
            //获取用车部门总次数和数据分布
            getUseCarTotalTimes(){
                let that=this;
                let apiUrl="fn/ycsq/showRingData";
                let begindate=that.date.split('~')[0];
                let enddate=that.date.split('~')[1];
                let postData={
                    "begindate":begindate,
                    "enddate":enddate,
                    "unitid":that.userInfo.unitId
                };

                //dsf.http.get("static/usecartest.json").then((res)=>{
                dsf.http.post(apiUrl,postData).then((res)=>{
                    if (res.data.code == 200) {
                        let datatemp=res.data.data;
                        that.totalTimes=datatemp.count;
                        that.carUseTimesPieChart.series[0].data.total=that.totalTimes;
                        that.carUseTimesPieChart.series[0].data=datatemp.data;
                    }else {
						dsf.layer.toast('获取数据失败,请稍后再试')
					}
                })
            },
            //获取用车部门的详细数据
            getUseCarTimesDepartmentDetail(success){
                let that=this;
                let begindate=that.date.split('~')[0];
                let enddate=that.date.split('~')[1];
                let apiUrl="fn/ycsq/showRingData";
                let postData={
                    "begindate":begindate,
                    "enddate":enddate,
                    "unitid":that.userInfo.unitId,
                    "pageindex":1,
                    "pagesize":10
                };
                //dsf.http.get("static/usecardepttest.json").then((res)=>{
                dsf.http.post(apiUrl,postData).then((res)=>{
                    if (res.data.code == 200) {
                        success(res.data.data);
                    }else {
						dsf.layer.toast('获取数据失败,请稍后再试')
					}
                })
            },
            //获取用车人的详细数据
            getUseCarTimesUserDetail(success){
                let that=this;
                let begindate=that.date.split('~')[0];
                let enddate=that.date.split('~')[1];
                let apiUrl="fn/ycsq/byUser";
                let postData={
                    "begindate":begindate,
                    "enddate":enddate,
                    "unitid":that.userInfo.unitId,
                    "pageindex":1,
                    "pagesize":10
                };
                //dsf.http.get("static/usecarusertest.json").then((res)=>{
                dsf.http.post(apiUrl,postData).then((res)=>{
                    if (res.data.code == 200) {
                        success(res.data.data);
                    }else {
						dsf.layer.toast('获取数据失败,请稍后再试')
					}
                })
            }
        }
    }
</script>

<template>
	<div id="data-analysis">
		<van-nav-bar title="驾驶舱" left-arrow @click-left="$router.go(-1)" />
		<div class="content">
			<div class="bg-circle"></div>
			<van-tabs>
				<van-tab title="数据看板">
					<div class="header-container">
						<div v-for="(item,index) in baseData" :key="index">
							<p class="header-item-title">{{item.title}}</p>
							<p class="font_18">{{item.num}}</p>
						</div>
					</div>
					<!-- 专员企业统计 -->
					<div class="card">
						<div class="title">
							<span>专员企业统计</span>
						</div>
						<div class="chart-container-long">
							<v-chart :options="companiesStatisticsChart" />
						</div>
					</div>
					<!-- 专员登录统计row -->
					<div class="card">
						<div class="title">
							<span>专员登录统计</span>
						</div>
						<div class="chart-container-long">
							<v-chart :options="loginStatisticsChart_row" />
						</div>
					</div>
					<!-- 专员登录统计column -->
					<div class="card">
						<div class="flex jb ac">
							<div class="title">
								<span>专员登录统计</span>
							</div>
							<div class="flex ac mar-bottom_10 color_blue font_15" @click="openPlaceSelectPopup(0)">
								<span>{{chartPlaceList[0].text == '全部地区' ? '上海市':chartPlaceList[0].text}}</span>
								<van-icon name="arrow-down" class="mar-left_3" v-if="!(isShowPlaceSelectPopup&&currentChart==0)" />
								<van-icon name="arrow-up" class="mar-left_3" v-else />
							</div>
						</div>
						<div class="chart-container-normal">
							<v-chart :options="loginStatisticsChart_column" />
						</div>
					</div>
					<!-- 诉求统计 -->
					<div class="card">
						<div class="flex jb ac">
							<div class="title">
								<span>诉求统计</span>
							</div>
							<div class="flex">
								<div class="flex ac mar-bottom_10 color_blue font_15" @click="isShowTimeSelectPopup=true">
									<span>{{appealStaSelectTime.text}}</span>
									<van-icon name="arrow-down" class="mar-left_3" v-if="!isShowTimeSelectPopup" />
									<van-icon name="arrow-up" class="mar-left_3" v-else />
								</div>
								<div class="flex ac mar-bottom_10 color_blue font_15 mar-left_3" @click="openPlaceSelectPopup(1)">
									<span>{{chartPlaceList[1].text == '全部地区' ? '上海市':chartPlaceList[1].text}}</span>
									<van-icon name="arrow-down" class="mar-left_3" v-if="!(isShowPlaceSelectPopup&&currentChart==1)" />
									<van-icon name="arrow-up" class="mar-left_3" v-else />
								</div>
							</div>
						</div>
						<div class="chart-container-normal">
							<v-chart :options="appealStatisticsChart" />
						</div>
					</div>
					<!-- 走访统计 -->
					<div class="card">
						<div class="flex jb ac">
							<div class="title">
								<span>走访统计</span>
							</div>
							<div class="flex ac mar-bottom_10 color_blue font_15" @click="openPlaceSelectPopup(2)">
								<span>{{chartPlaceList[2].text == '全部地区' ? '上海市':chartPlaceList[2].text}}</span>
								<van-icon name="arrow-down" class="mar-left_3" v-if="!(isShowPlaceSelectPopup&&currentChart==2)" />
								<van-icon name="arrow-up" class="mar-left_3" v-else />
							</div>
						</div>
						<div class="chart-container-normal">
							<v-chart :options="interviewStatisticsChart" />
						</div>
					</div>
					<!-- 赋能点击量统计 -->
					<div class="card">
						<div class="flex jb ac">
							<div class="title">
								<span>赋能点击量统计</span>
							</div>
							<div class="flex ac mar-bottom_10 color_blue font_15" @click="openPlaceSelectPopup(3)">
								<span>{{chartPlaceList[3].text == '全部地区' ? '上海市':chartPlaceList[3].text}}</span>
								<van-icon name="arrow-down" class="mar-left_3" v-if="!(isShowPlaceSelectPopup&&currentChart==3)" />
								<van-icon name="arrow-up" class="mar-left_3" v-else />
							</div>
						</div>
						<div class="chart-container-normal">
							<v-chart :options="hitsStatisticsChart" />
						</div>
					</div>

				</van-tab>
				<van-tab title="政策看板">
					<iframe src="http://101.227.181.59/dingding/#/Kanban" frameborder="0" class="my-iframe"></iframe>
				</van-tab>
			</van-tabs>
		</div>
		<!-- 选择地区 -->
		<van-popup v-model="isShowPlaceSelectPopup" round position="bottom">
			<van-picker show-toolbar title="修改市区" :columns="placeColumns" @cancel="isShowPlaceSelectPopup = false" @confirm="placePickerConfirm" />
		</van-popup>

		<!-- 选择时间 -->
		<van-popup v-model="isShowTimeSelectPopup" round position="bottom">
			<van-picker show-toolbar title="修改时间" :columns="timeColumns" @cancel="isShowTimeSelectPopup = false" @confirm="timePickerConfirm" />
		</van-popup>
	</div>
</template>

<script>
	import VChart from "vue-echarts";
	import 'echarts/lib/chart/line'
	import 'echarts/lib/chart/pie'
	import 'echarts/lib/chart/bar'
	import 'echarts/lib/component/title'
	import 'echarts/lib/component/legend'
	import 'echarts/lib/component/tooltip'
	export default {
		name: 'dataAnalysis',
		components: {VChart},
		data() {
			return {
				currentChart: null,
				isShowPlaceSelectPopup: false, //选择地区弹层
				isShowTimeSelectPopup: false, //选择时间弹层
				chartPlaceList: [{
					text: '全部地区',
					id: ''
				}, {
					text: '全部地区',
					id: ''
				}, {
					text: '全部地区',
					id: ''
				}, {
					text: '全部地区',
					id: ''
				}],
				appealStaSelectTime: {
					text: '日',
					type: '1'
				},
				timeColumns: [{
					text: '日',
					type: '1'
				}, {
					text: '周',
					type: '2'
				}, {
					text: '月',
					type: '3'
				}],
				placeColumns: [{
					text: '上海市',
					children: [{
						text: '全部地区',
						id: ''
					}]
				}],
				baseData: [{
					title: '企业数',
					num: 0
				}, {
					title: '专员数',
					num: 0
				}, {
					title: '诉求新增数',
					num: 0
				}, {
					title: '走访数',
					num: 0
				}, {
					title: '赋能数',
					num: 0
				}],
				companiesStatisticsChart: {
					tooltip: {
						trigger: 'axis',
						axisPointer: { // Use axis to trigger tooltip
							type: 'shadow' // 'shadow' as default; can also be 'line' or 'shadow'
						}
					},
					legend: {
						data: ['专员数', '企业数'],
						bottom: 0,
						itemWidth: 10,
						itemHeight: 10
					},
					color: ['#FFCD00', '#2E91F6'],
					grid: {
						left: '1%',
						right: '8%',
						top: '1%',
						bottom: '8%',
						containLabel: true
					},
					xAxis: {
						type: 'value',
						axisLine: {
							lineStyle: { //不显示x轴坐标线
								width: 0
							}
						},
						axisTick: { //不显示刻度
							show: false
						}
					},
					yAxis: {
						type: 'category',
						data: [],
						axisTick: {
							show: false
						},
						axisLine: {
							lineStyle: {
								color: '#CCC'
							}
						},
						axisLabel: {
							interval: 0,
							color: '#333',
							formatter(value) {
								// let result = '';
								// if(value.length <= 4) {
								// 	console.log('value',value)
								// 	return value
								// };
								// for (let i = 0; i < value.length; i++) {
								// 	if (((i+1) % 4) == 0 && i != 0) {
								// 		result += value.slice(i-3, i+1) + '\n';
								// 		let surplusStr = value.slice(i);
								// 		if(surplusStr.length<=4){
								// 			result += surplusStr;
								// 			break;
								// 		}
								// 	}
								// }
								// console.log('result',result)
								if (value.length <= 5) {
									return value
								} else {
									return value.substr(0, 5) + '...';
								}
							}
						}
					},
					series: [{
							name: '专员数',
							type: 'bar',
							barWidth: '40%',
							stack: 'total', //堆叠
							data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
						},
						{
							name: '企业数',
							type: 'bar',
							barWidth: '40%',
							stack: 'total', //堆叠
							data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
								0
							],
						}
					]
				},

				loginStatisticsChart_row: {
					tooltip: {
						trigger: 'axis',
						axisPointer: { // Use axis to trigger tooltip
							type: 'shadow' // 'shadow' as default; can also be 'line' or 'shadow'
						}
					},
					legend: {
						data: ['日', '周', '月'],
						bottom: 0,
						itemWidth: 10,
						itemHeight: 10
					},
					color: ['#6EC8EB', '#56DCA5', '#2E91F6'],
					grid: {
						left: '1%',
						right: '8%',
						top: '1%',
						bottom: '8%',
						containLabel: true
					},
					xAxis: {
						type: 'value',
						axisLine: {
							lineStyle: { //不显示x轴坐标线
								width: 0
							}
						},
						axisTick: { //不显示刻度
							show: false
						}
					},
					yAxis: {
						type: 'category',
						data: [],
						axisTick: {
							show: false
						},
						axisLine: {
							lineStyle: {
								color: '#CCC'
							}
						},
						axisLabel: {
							interval: 0,
							color: '#333',
							formatter(value) {
								if (value.length <= 5) {
									return value
								} else {
									return value.substr(0, 5) + '...';
								}
							}
						}
					},
					series: [{
							name: '日',
							type: 'bar',
							barWidth: '25%',
							data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
						},
						{
							name: '周',
							type: 'bar',
							barWidth: '25%',
							data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
						},
						{
							name: '月',
							type: 'bar',
							barWidth: '25%',
							data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
						}
					]
				},

				loginStatisticsChart_column: {
					tooltip: {
						trigger: 'axis',
						axisPointer: {
							type: 'shadow'
						}
					},
					legend: {
						data: ['日', '周', '月'],
						bottom: 0,
						itemWidth: 10,
						itemHeight: 10
					},
					color: ['#2E91F6', '#FF8E01', '#F56B6B'],
					grid: {
						left: '3%',
						right: '8%',
						top: '8%',
						bottom: '11%',
						containLabel: true
					},
					xAxis: {
						type: 'category',
						data: ['联席办公室'],
						axisTick: {
							show: false
						},
						axisLine: {
							lineStyle: {
								color: '#CCC'
							}
						},
						axisLabel: {
							color: '#333'
						}
					},
					yAxis: {
						type: 'value',
						axisLine: {
							lineStyle: { //不显示y轴坐标线
								width: 0
							}
						},
						axisTick: { //不显示刻度
							show: false
						}
					},
					series: [{
							name: '日',
							type: 'bar',
							data: [0],
							label: {
								show: true,
								position: 'top',
								textStyle: { //数值样式
									color: '#333'
								}
							}
						},
						{
							name: '周',
							type: 'bar',
							data: [0],
							label: {
								show: true,
								position: 'top',
								textStyle: { //数值样式
									color: '#333'
								}
							}
						},
						{
							name: '月',
							type: 'bar',
							data: [0],
							label: {
								show: true,
								position: 'top',
								textStyle: { //数值样式
									color: '#333'
								}
							}
						}
					]
				},

				appealStatisticsChart: {
					title: {
						show: false
					},
					tooltip: {
						trigger: 'item',
						formatter: "{a} <br/>{b} : {c} ({d}%)"
					},
					color: ['#0D8CED', '#4DC981', '#FFCD01'],
					series: [{
						name: '诉求统计',
						type: 'pie',
						radius: '80%',
						center: ['50%', '45%'],
						data: [{
								value: 0,
								name: '新增诉求'
							},
							{
								value: 0,
								name: '完成诉求'
							},
							{
								value: 0,
								name: '回复诉求'
							}
						],
						itemStyle: {
							normal: {
								label: {
									show: true,
									position: 'inner',
									formatter(data) {
										return data.name + '\n' + data.percent.toFixed(0) + '%';
									},
									textStyle: {
										color: '#FFF',
										fontSize: 15,
									}
								}
							}
						}
					}]
				},

				interviewStatisticsChart: {
					title: {
						show: false
					},
					tooltip: {
						trigger: 'item',
						formatter: "{a} <br/>{b} : {c} ({d}%)"
					},
					legend: {
						data: ['日', '周', '月'],
						bottom: 0,
						itemWidth: 10,
						itemHeight: 10
					},
					color: ['#0D8CED', '#FF8E01', '#F56B6B'],
					series: [{
						name: '走访统计',
						type: 'pie',
						radius: '80%',
						center: ['50%', '45%'],
						data: [{
								value: 0,
								name: '日'
							},
							{
								value: 0,
								name: '周'
							},
							{
								value: 0,
								name: '月'
							}
						],
						itemStyle: {
							normal: {
								label: {
									show: true,
									position: 'inner',
									formatter: "{c}",
									textStyle: {
										color: '#FFF',
										fontSize: 15,
									}
								}
							}
						}
					}]
				},

				hitsStatisticsChart: {
					tooltip: {
						trigger: 'axis',
						axisPointer: {
							type: 'shadow'
						}
					},
					legend: {
						data: ['线上赋能', '营销力赋能', '融通对接'],
						bottom: 0,
						itemWidth: 10,
						itemHeight: 10
					},
					color: ['#5B90FA', '#5AD9A6', '#C33531'],
					grid: {
						left: '3%',
						right: '8%',
						top: '8%',
						bottom: '11%',
						containLabel: true
					},
					xAxis: {
						type: 'category',
						data: ['日', '周', '月'],
						axisTick: {
							show: false
						},
						axisLine: {
							lineStyle: {
								color: '#CCC'
							}
						},
						axisLabel: {
							color: '#333'
						}
					},
					yAxis: {
						type: 'value',
						axisLine: {
							lineStyle: { //不显示y轴坐标线
								width: 0
							}
						},
						axisTick: { //不显示刻度
							show: false
						}
					},
					series: [{
							name: '线上赋能',
							type: 'bar',
							data: [0, 0, 0],
							label: {
								show: true,
								position: 'top',
								textStyle: { //数值样式
									color: '#333'
								}
							}
						},
						{
							name: '营销力赋能',
							type: 'bar',
							data: [0, 0, 0],
							label: {
								show: true,
								position: 'top',
								textStyle: { //数值样式
									color: '#333'
								}
							}
						},
						{
							name: '融通对接',
							type: 'bar',
							data: [0, 0, 0],
							label: {
								show: true,
								position: 'top',
								textStyle: { //数值样式
									color: '#333'
								}
							}
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
			initPage() {
				this.getAllDept();
				this.getHeadData();
				this.getBusandCommData();
				this.getCommLoginCount();
				this.getCommLoginCountBydeptid('');
				this.getVisitCount('');
				this.getAppealCount('', this.appealStaSelectTime.type);
				this.getEmpowermentCount('');
			},
			getAllDept() { //获取上海市以及下属区域的层级结构
				dsf.http.post("fn//mobileDataAnalyze/getAllDept", {}).then((res) => {
					if (res.data.code == 200) {
						let data = res.data.data;
						data.forEach(item => {
							this.placeColumns[0].children.push({
								text: item.deptname,
								id: item.deptid
							})
						})
					} else {
						dsf.layer.toast('获取数据失败,请稍后再试')
					}
				}).catch(err => console.log(err));
			},
			getHeadData() { //获取头部数据
				dsf.http.post("fn/mobileDataAnalyze/headData", {}).then((res) => {
					if (res.data.code == 200) {
						let data = res.data.data;
						this.baseData = [{
							title: '企业数',
							num: data.businessCount
						}, {
							title: '专员数',
							num: data.commissionerCount
						}, {
							title: '诉求新增数',
							num: data.appealNewCount
						}, {
							title: '走访数',
							num: data.visitCount
						}, {
							title: '赋能数',
							num: data.empowermentCount
						}]
					} else {
						dsf.layer.toast('获取数据失败,请稍后再试')
					}
				}).catch(err => console.log(err));
			},
			getBusandCommData() { //专员企业统计
				dsf.http.post("fn/mobileDataAnalyze/busandcommData", {}).then((res) => {
					if (res.data.code == 200) {
						let data = res.data.data;
						let tempYAxis = [];
						let tempCommissionerCount = [];
						let tempBusinessCount = [];
						data.forEach((item) => {
							if (tempYAxis.includes(item.name)) return;
							tempYAxis.push(item.name);
							tempCommissionerCount.push(Number(item.commissionerCount))
							tempBusinessCount.push(Number(item.businessCount))
						})
						this.companiesStatisticsChart.yAxis.data = tempYAxis;
						this.companiesStatisticsChart.series[0].data = tempCommissionerCount;
						this.companiesStatisticsChart.series[1].data = tempBusinessCount;
					} else {
						dsf.layer.toast('获取数据失败,请稍后再试')
					}
				}).catch(err => console.log(err));
			},
			getCommLoginCount() { //专员登录统计
				dsf.http.post("fn/mobileDataAnalyze/commLoginCount", {}).then((res) => {
					if (res.data.code == 200) {
						let data = res.data.data;
						let tempYAxis = [];
						let tempDayCount = [];
						let tempWeekCount = [];
						let tempMonthCount = [];
						data.forEach((item) => {
							if (tempYAxis.includes(item.name)) return;
							tempYAxis.push(item.name);
							tempDayCount.push(Number(item.daycount));
							tempWeekCount.push(Number(item.weekcount));
							tempMonthCount.push(Number(item.monthcount))
						})
						this.loginStatisticsChart_row.yAxis.data = tempYAxis;
						this.loginStatisticsChart_row.series[0].data = tempDayCount;
						this.loginStatisticsChart_row.series[1].data = tempWeekCount;
						this.loginStatisticsChart_row.series[2].data = tempMonthCount;
					} else {
						dsf.layer.toast('获取数据失败,请稍后再试')
					}
				}).catch(err => console.log(err));
			},
			getCommLoginCountBydeptid(deptid) { //专员登录统计(根据部门信息进行统计)
				dsf.http.post("fn/mobileDataAnalyze/commLoginCountBydeptid", {
					deptid
				}).then((res) => {
					if (res.data.code == 200) {
						let data = res.data.data;
						this.loginStatisticsChart_column.series[0].data = [data.daycount];
						this.loginStatisticsChart_column.series[1].data = [data.weekcount];
						this.loginStatisticsChart_column.series[2].data = [data.monthcount];
					} else {
						dsf.layer.toast('获取数据失败,请稍后再试')
					}
				}).catch(err => console.log(err));
			},
			getAppealCount(deptid, type) { //诉求统计
				dsf.http.post("fn/mobileDataAnalyze/appealCount", {
					deptid,
					type
				}).then((res) => {
					if (res.data.code == 200) {
						let data = res.data.data;
						this.appealStatisticsChart.series[0].data[0].value = [Number(data.newcount)];
						this.appealStatisticsChart.series[0].data[1].value = [Number(data.finishcount)];
						this.appealStatisticsChart.series[0].data[2].value = [Number(data.replycount)];
					} else {
						dsf.layer.toast('获取数据失败,请稍后再试')
					}
				}).catch(err => console.log(err));
			},
			getVisitCount(deptid) { //走访统计
				dsf.http.post("fn/mobileDataAnalyze/visitCount", {
					deptid
				}).then((res) => {
					if (res.data.code == 200) {
						let data = res.data.data;
						this.interviewStatisticsChart.series[0].data[0].value = [Number(data.daycount)];
						this.interviewStatisticsChart.series[0].data[1].value = [Number(data.weekcount)];
						this.interviewStatisticsChart.series[0].data[2].value = [Number(data.monthcount)];
					} else {
						dsf.layer.toast('获取数据失败,请稍后再试')
					}
				}).catch(err => console.log(err));
			},
			getEmpowermentCount(deptid) { //赋能点击量统计
				dsf.http.post("fn/mobileDataAnalyze/empowermentCount", {
					deptid
				}).then((res) => {
					if (res.data.code == 200) {
						let data = res.data.data;
						let tempSeries_0 = [0, 0, 0];
						let tempSeries_1 = [0, 0, 0];
						let tempSeries_2 = [0, 0, 0];
						data.forEach(item => {
							tempSeries_0[Number(item.type) - 1] = item['上线赋能'];
							tempSeries_1[Number(item.type) - 1] = item['营销力赋能'];
							tempSeries_2[Number(item.type) - 1] = item['融通对接'];
						})
						this.hitsStatisticsChart.series[0].data = tempSeries_0;
						this.hitsStatisticsChart.series[1].data = tempSeries_1;
						this.hitsStatisticsChart.series[2].data = tempSeries_2;
					} else {
						dsf.layer.toast('获取数据失败,请稍后再试')
					}
				}).catch(err => console.log(err));
			},
			openPlaceSelectPopup(index) {
				this.currentChart = index;
				this.isShowPlaceSelectPopup = true;
			},
			placePickerConfirm(value, index) {
				this.chartPlaceList[this.currentChart] = this.placeColumns[0].children[index[1]];
				switch (this.currentChart) {
					case 0:
						this.getCommLoginCountBydeptid(this.chartPlaceList[this.currentChart].id);
						break;
					case 1:
						this.getAppealCount(this.chartPlaceList[this.currentChart].id, this.appealStaSelectTime.type);
						break;
					case 2:
						this.getVisitCount(this.chartPlaceList[this.currentChart].id);
						break;
					case 3:
						this.getEmpowermentCount(this.chartPlaceList[this.currentChart].id)
					default:
						break;
				}
				this.isShowPlaceSelectPopup = false;
				this.currentChart = null;
			},
			timePickerConfirm(value, index) {
				this.appealStaSelectTime = this.timeColumns[index];
				this.getAppealCount(this.chartPlaceList[1].id, this.appealStaSelectTime.type);
				this.isShowTimeSelectPopup = false;
			}
		},
	}
</script>

<style lang="scss" scoped>
	@import "../../assets/styles/themes.scss";
	@import "../../assets/styles/mixin.scss";

	#data-analysis {
		height: 100vh;
		width: 100vw;
		overflow: hidden;
		font-size: var(--font_size_2);
		display: flex;
		position: relative;
		flex-direction: column;

		.content {
			flex: 1;
			position: relative;
			overflow-y: scroll;
			overflow-x: hidden;
		}
	}

	::v-deep .van-nav-bar {
		background-color: #2E91F6;

		.van-icon {
			color: #FFF;
		}

		.van-nav-bar__title {
			color: #FFF;
		}


	}

	::v-deep .van-hairline--bottom::after {
		border-bottom-width: 0 !important;
	}

	::v-deep .van-tabs__wrap {
		margin: 0 10px;
		border-radius: 5px 5px 0 0;

		.van-tab--active {
			// color: #2E91F6 !important;
		}

		.van-tab__text {
			font-size: var(--font_size_3);
		}

		.van-tabs__line {
			width: 1.1rem;
		}
	}

	.header-container {
		background-color: #FFF;
		padding: 20px 0 25px;
		margin: 0 10px;
		border-radius: 0 0 5px 5px;
		display: grid;
		grid-template-columns: 1fr 1fr 1fr;
		grid-row-gap: 15px;
		text-align: center;

		:nth-child(3) {
			grid-column-start: 1;
		}

		.header-item-title {
			color: #999;
			font-size: 13px;
			margin-bottom: 6px;
		}
	}

	.my-iframe {
		width: 100vw;
		height: 535px;
		margin-top: 10px;
	}

	.title {
		padding: 8px 15px;
		box-sizing: border-box;
		position: relative;
		@include font_2;
		font-weight: bold;
		margin-bottom: 10px;

		span {
			margin-left: 5px;
			font-size: 19px;
			color: #333;
		}

		&::before {
			content: "";
			display: block;
			width: 5px;
			height: 20px;
			position: absolute;
			top: 50%;
			transform: translate(-5px, -50%);
			@include background-theme("normal");
		}
	}

	.card {
		background-color: #fff;
		margin: 10px 0;
		padding: 10px 5px 5px;
	}

	.chart-container-long {
		height: 360px;
		width: 100%;
		position: relative;

		.echarts {
			width: 100%;
			height: 100%;
		}
	}

	.chart-container-normal {
		height: 260px;
		width: 100%;
		position: relative;

		.echarts {
			width: 100%;
			height: 100%;
		}
	}

	::v-deep .van-picker-column__item--selected {
		color: #000;
	}

	.flex_1 {
		flex: 1;
	}

	.bg-circle {
		height: 100vw;
		width: 145vw;
		border-radius: 50%;
		position: absolute;
		top: -236px;
		left: 50%;
		transform: translateX(-50%);
		background-color: rgb(46, 145, 246);
	}

	.color_grey {
		color: #666;
	}

	.color_blue {
		color: #2E91F6;
	}

	.font_13 {
		font-size: 13px;
	}

	.font_15 {
		font-size: 15px;
	}

	.font_17 {
		font-size: var(--font_size_1);
	}

	.font_18 {
		font-size: 18px;
	}

	.mar-left_3 {
		margin-left: 3px;
	}

	.mar-bottom_10 {
		margin-bottom: 10px;
	}
</style>

<template>
	<div id="document-statistics">
		<van-nav-bar title="公文统计" />
		<div class="tab-bar-container">
			<span :style="{borderBottom: currentIndex?'3px solid #028BE6' : ''}" @click="tabBarClick(1)">签收情况</span>
			<i>|</i>
			<span :style="{borderBottom: currentIndex?'' : '3px solid #028BE6'}" @click="tabBarClick(0)">反馈情况</span>
		</div>
		<div class="year-select-container">
			<van-icon name="play" style="transform: rotateY(180deg)" @click="goLastYear" />
			<span>{{currentYear}}年</span>
			<van-icon name="play" @click="goNextYear" />
		</div>
		<div class="chart-container">
			<v-chart :options="chartOption"></v-chart>
		</div>
		<div class="table-title">
			<p>{{currentIndex ? '各单位签收情况':'各单位反馈情况'}}</p>
		</div>
		<div class="table-header-container">
			<table border="1">
				<tr>
					<td style="width: 30%;">办理单位</td>
					<td>{{currentIndex ? '未签收':'未反馈'}}</td>
					<td>{{currentIndex ? '已签收':'已反馈'}}</td>
					<td>总计</td>
					<td>{{currentIndex ? '签收率':'反馈率'}}</td>
				</tr>
			</table>
		</div>
		<div class="table-content-container">
			<table border="1">
				<tr v-for="(item,index) in statisticsList" :key="index" :style="{backgroundColor: (index+1) % 2 == 1?'':'#8FE9FF'}">
					<td class="dept-name">{{item.dept}}</td>
					<td>{{item.noSign | numFormat}}</td>
					<td>{{item.inTimeSign | numFormat}}</td>
					<td>{{item.total | numFormat}}</td>
					<td>{{Math.round(item.inTimeSign / item.total * 10000) / 100.00 + '%'}}</td>
				</tr>
			</table>
		</div>
	</div>
</template>

<script>
	import VChart from "vue-echarts";
	export default {
		name: 'DocumentStatistics',
		components: {VChart},
		data() {
			return {
				currentIndex: 1,
				currentYear: new Date().getFullYear(),
				statisticsList: [{
					dept: '县教体局',
					total: 1027,
					inTimeSign: 1024,
					noSign: 2
				}, {
					dept: '县公安局',
					total: 5,
					inTimeSign: 2,
					noSign: 2
				}, {
					dept: '县发改委',
					total: 5,
					inTimeSign: 2,
					noSign: 2
				}, {
					dept: '测试办理单位测试办理单位测试办理单位',
					total: 5,
					inTimeSign: 2,
					noSign: 2
				}, {
					dept: '测试办理单位',
					total: 5,
					inTimeSign: 2,
					noSign: 2
				}, {
					dept: '测试办理单位',
					total: 5,
					inTimeSign: 2,
					noSign: 2
				}, {
					dept: '测试办理单位',
					total: 5,
					inTimeSign: 2,
					noSign: 2
				}, {
					dept: '测试办理单位',
					total: 5,
					inTimeSign: 2,
					noSign: 2
				}, {
					dept: '测试办理单位',
					total: 5,
					inTimeSign: 2,
					noSign: 2
				}, {
					dept: '测试办理单位',
					total: 5,
					inTimeSign: 2,
					noSign: 2
				}, {
					dept: '测试办理单位',
					total: 5,
					inTimeSign: 2,
					noSign: 2
				}],
				chartOption: {
					tooltip: {
						trigger: 'item',
						formatter(data) {
							if (data.seriesType == 'line') {
								return `${data.seriesName}</br>${data.name}:${data.value}%`
							} else {
								return `${data.seriesName}</br>${data.name}:${data.value}`
							}
						}
					},
					legend: {
						selectedMode: true, //可点击
						data: ['总计', '已签收', '未签收', '签收率'],
						bottom: 0,
						left: 16
					},
					xAxis: [{
							type: 'category',
							data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
							splitLine: { //不显示分割线
								show: false
							}
						}

					],
					yAxis: [{
							type: 'value',
							name: '数量',
							splitLine: { //显示分割线
								show: true
							}
						},
						{
							type: 'value',
							name: '签收率',
							axisLabel: {
								show: true,
								interval: 'auto',
								formatter: '{value}%',
							},
							splitLine: {
								show: true
							}
						}
					],
					series: [{
							name: '总计',
							type: 'bar',
							barGap: 0,
							data: [2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3],
							itemStyle: {
								color: '#3AA1FF'
							}
						}, {
							name: '已签收',
							type: 'bar',
							data: [1.0, 3.9, 4.0, 21.2, 25.6, 7.7, 50.6, 100.2, 14.6, 15.0, 3.4, 1.3],
							itemStyle: {
								color: '#4ECB73'
							}
						},
						{
							name: '未签收',
							type: 'bar',
							data: [1.0, 1.9, 3.0, 2.2, 25.6, 70.7, 80.6, 62.2, 16.6, 5.0, 3.4, 2.3],
							itemStyle: {
								color: '#FBD437'
							}
						},
						{
							name: '签收率',
							type: 'line',
							yAxisIndex: 1, //索引从0开始
							data: [2.0, 2.2, 3.3, 4.5, 6.3, 10.2, 20.3, 23.4, 23.0, 16.5, 12.0, 6.2],
							itemStyle: {
								color: '#51ACFF'
							}
						}
					]
				}
			}
		},
		created() {

		},
		mounted() {

		},
		methods: {
			tabBarClick(index) {
				this.currentIndex = index;
			},
			goNextYear() {
				this.currentYear = this.currentYear + 1;
			},
			goLastYear() {
				this.currentYear = this.currentYear - 1;
			}
		},
		filters: {
			numFormat(value) {
				return value > 999 ? '999...' : value;
			}
		}
	}
</script>

<style lang="scss" scoped>
	#document-statistics {
		width: 100vw;
		height: 100vh;
		display: flex;
		flex-direction: column;
		background-color: #FFF;
	}

	.van-nav-bar {
		background-color: #02A7F0;

		::v-deep .van-nav-bar__title {
			color: #FFF;
			font-size: var(--font_size_1);
		}
	}

	.tab-bar-container {
		display: flex;
		justify-content: center;
		font-size: 15px;
		font-weight: 600;
		margin-top: 5px;
		position: relative;

		i {
			margin: 0 5px;
			position: relative;
			top: -1px;
		}

		span {
			padding-bottom: 3px;
		}
	}

	.year-select-container {
		display: flex;
		justify-content: center;
		align-items: center;
		margin-top: 8px;
		position: relative;

		span {
			margin: 0 4px;
		}
	}

	.chart-container {
		height: 40vh;
		width: 100%;

		.echarts {
			width: 100%;
			height: 100%;
		}
	}

	.table-title {
		padding: 5px 16px 0 16px;
	}

	.table-header-container {
		padding: 0 16px;

		table {
			border-right: 1px solid #999;
			border-bottom: none;
			table-layout: fixed;

			td {
				border-left: 1px solid #999;
				border-top: 1px solid #999;
				text-align: center;
				line-height: 40px;
				width: 17.5%;
			}
		}
	}

	.table-content-container {
		flex: 1;
		display: flex;
		flex-direction: column;
		padding: 0 16px;
		overflow: scroll;

		table {
			border-right: 1px solid #999;
			border-bottom: 1px solid #999;
			table-layout: fixed;

			td {
				border-left: 1px solid #999;
				border-top: 1px solid #999;
				text-align: center;
				line-height: 30px;
				width: 17.5%;
			}

			.dept-name {
				width: 30%;
				white-space: nowrap;
				overflow: hidden;
				text-overflow: ellipsis;
			}
		}
	}
</style>

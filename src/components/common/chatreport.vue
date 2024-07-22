<template>
	<div id="inspector-statistics">
		<van-nav-bar :title="username" left-text="返回" @click-left="onClickLeft" />
		<div class="select-container">
			<div class="selece-type" @click="isShowTypePicker=true">
				<span>{{ currentType }}</span>
				<van-icon name="arrow-down" />
			</div>
			<div>
				<span @click="isShowStartTimePicker=true">{{ startDate }}</span>
				<span>至</span>
				<span @click="isShowEndTimePicker=true">{{ endDate }}</span>
			</div>
		</div>
		<div class="chart-container">
			<v-chart :options="chatData" class="" />
		</div>
		<div class="table-title">
			<p>各单位督察件处理情况：</p>
		</div>
		<div class="table-header-container">
			<table border="1">
				<tr>
					<td style="width: 30%;">办理单位</td>
					<td>总文件数</td>
					<td>已反馈</td>
					<td>超期反馈</td>
					<td>未反馈</td>
				</tr>
			</table>
		</div>
		<div class="table-content-container">
			<table border="1">
				<tr v-for="(item,index) in statisticsList" :key="index" :style="{backgroundColor: (index+1) % 2 == 1?'':'#8FE9FF'}">
					<td class="dept-name">{{item.dept}}</td>
					<td>{{item.total | numFormat}}</td>
					<td>{{item.inTimeFeedback | numFormat}}</td>
					<td>{{item.lateFeedback | numFormat}}</td>
					<td>{{item.noFeedback | numFormat}}</td>
				</tr>
			</table>
		</div>
		<van-popup v-model="isShowTypePicker" position="bottom">
			<van-picker :columns="typeList" show-toolbar title="事项来源" @cancel="isShowTypePicker=false" @confirm="typeConfirm"
			 :default-index="currentTypeIndex" />
		</van-popup>
		<van-popup v-model="isShowStartTimePicker" position="bottom">
			<van-datetime-picker type="date" title="选择起始时间" :min-date="minDate" :max-date="maxDate" @cancel="isShowStartTimePicker=false"
			 @confirm="startDateConfirm" />
		</van-popup>
		<van-popup v-model="isShowEndTimePicker" position="bottom">
			<van-datetime-picker type="date" title="选择起始时间" :min-date="minDate" :max-date="maxDate" @cancel="isShowEndTimePicker=false"
			 @confirm="endDateConfirm" />
		</van-popup>
	</div>
</template>
<script>
	import VChart from "vue-echarts";
export default {
    name: 'inspectorStatistics',
		components: {VChart},
    filters: {
        numFormat(value) {
            return value > 999 ? '999...' : value;
        }
    },
    data() {
        return {
            chatConfig:"",
            username:"",
            isShowTypePicker: false,
            currentType: '全部',
            currentTypeIndex: 0,
            typeList: ['全部', '选项1', '选项2'],
            isShowStartTimePicker: false,
            isShowEndTimePicker: false,
            startDate: `${new Date().getFullYear()}-01-01`,
            endDate: this.dateFormat(new Date(), 'yyyy-MM-dd'),
            minDate: new Date(new Date().getFullYear() - 2, 0, 1),
            maxDate: new Date(),
            statisticsList: [{
                dept: '县教体局',
                total: 1027,
                inTimeFeedback: 1024,
                lateFeedback: 2,
                noFeedback: 1
            }, {
                dept: '县公安局',
                total: 5,
                inTimeFeedback: 2,
                lateFeedback: 2,
                noFeedback: 1
            }, {
                dept: '县发改委',
                total: 5,
                inTimeFeedback: 2,
                lateFeedback: 2,
                noFeedback: 1
            }, {
                dept: '测试办理单位测试办理单位测试办理单位',
                total: 5,
                inTimeFeedback: 2,
                lateFeedback: 2,
                noFeedback: 1
            }, {
                dept: '测试办理单位',
                total: 5,
                inTimeFeedback: 2,
                lateFeedback: 2,
                noFeedback: 1
            }, {
                dept: '测试办理单位',
                total: 5,
                inTimeFeedback: 2,
                lateFeedback: 2,
                noFeedback: 1
            }, {
                dept: '测试办理单位',
                total: 5,
                inTimeFeedback: 2,
                lateFeedback: 2,
                noFeedback: 1
            }, {
                dept: '测试办理单位',
                total: 5,
                inTimeFeedback: 2,
                lateFeedback: 2,
                noFeedback: 1
            }, {
                dept: '测试办理单位',
                total: 5,
                inTimeFeedback: 2,
                lateFeedback: 2,
                noFeedback: 1
            }, {
                dept: '测试办理单位',
                total: 5,
                inTimeFeedback: 2,
                lateFeedback: 2,
                noFeedback: 1
            }, {
                dept: '测试办理单位',
                total: 5,
                inTimeFeedback: 2,
                lateFeedback: 2,
                noFeedback: 1
            }],
            chatData: {}
        }
    },
    beforeMount() {

    },
    mounted() {
        this.username="123";

        let data = []

    for (let i = 0; i <= 360; i++) {
        let t = i / 180 * Math.PI
        let r = Math.sin(2 * t) * Math.cos(2 * t)
        data.push([r, i])
    }
this.chatData={
        title: {
          text: '极坐标双数值轴',
                    show: false
        },
        legend: {
          data: ['pie']
        },
        polar: {
          center: ['50%', '54%']
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross'
          }
        },
        angleAxis: {
          type: 'value',
          startAngle: 0
        },
        radiusAxis: {
          min: 0
        },
        series: [
          {
            coordinateSystem: 'polar',
            name: 'pie',
            type: 'pie',
            showSymbol: false,
            data: data
          }
        ],
        animationDuration: 2000
      }

// this.chatConfig.series.data=[{
//                           value: 43,
//                           name: '已反馈'
//                       },
//                       {
//                           value: 20,
//                           name: '超期反馈'
//                       },
//                       {
//                           value: 17,
//                           name: '未反馈'
//                       }];

        dsf.http.post("fn/mobileToDoAndRead/getToDoAndReadList2",
        {"start": 1,"page": 1,"limit": 15,"fileType": "ToRead","showTotal": true}).then((data)=>{

            console.log(data.data.datas)
          })


        dsf.http.get("static/chatConfig.json",).then(({data})=>{
        //this.menuList=data
        console.log(data[this.$route.query.category]);
        this.chatConfig=data[this.$route.query.category];
        })

    },
    methods: {
        onClickLeft() {
            alert('返回');
        },
        typeConfirm(value, index) {
				this.currentType = value;
				this.currentTypeIndex = index;
				this.isShowTypePicker = false;
			},
			startDateConfirm(value) {
				if (new Date(value).getTime() > new Date(this.endDate.replace(/-/g, '/')).getTime()) {
					dsf.layer.toast('开始日期不能大于结束日期');
					return;
				}
				this.startDate = this.dateFormat(value, 'yyyy-MM-dd')
				this.isShowStartTimePicker = false;
			},
			endDateConfirm(value) {
				if (new Date(value).getTime() < new Date(this.startDate.replace(/-/g, '/')).getTime()) {
					dsf.layer.toast('结束日期不能小于起始日期');
					return;
				}
				this.endDate = this.dateFormat(value, 'yyyy-MM-dd')
				this.isShowEndTimePicker = false;
			},
			dateFormat(date, fmt) {
				//日期格式化
				date = new Date(date);
				var o = {
					'M+': date.getMonth() + 1,
					'd+': date.getDate(),
					'H+': date.getHours(),
					'm+': date.getMinutes(),
					's+': date.getSeconds(),
					'q+': Math.floor((date.getMonth() + 3) / 3),
					S: date.getMilliseconds()
				};
				var year = date.getFullYear().toString();
				year = year.length >= 4 ? year : '0000'.substr(0, 4 - year.length) + year;

				if (/(y+)/.test(fmt))
					fmt = fmt.replace(RegExp.$1, (year + '').substr(4 - RegExp.$1.length));
				for (var k in o)
					if (new RegExp('(' + k + ')').test(fmt))
						fmt = fmt.replace(
							RegExp.$1,
							RegExp.$1.length === 1 ?
							o[k] :
							('00' + o[k]).substr(('' + o[k]).length)
						);
				return fmt;
			}
    }
}
</script>

<style lang="scss" scoped>
	#inspector-statistics {
		width: 100vw;
		height: 100vh;
		display: flex;
		flex-direction: column;
		background-color: #FFF;

		.van-nav-bar {
			background-color: #02A7F0;

			::v-deep .van-nav-bar__title {
				color: #FFF;
				font-size: var(--font_size_1);
			}

           ::v-deep .van-nav-bar__text {
                color: white !important;
            }
		}

		.select-container {
			display: flex;
			justify-content: space-between;
			padding: 10px 16px;

			.selece-type {
				display: flex;
				align-items: center;

				span {
					margin-right: 10px;
				}
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
	}
</style>

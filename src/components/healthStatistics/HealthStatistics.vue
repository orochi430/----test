<template>
	<div id="health-statistics">
		<div class="time-container">
			<span>统计时间:</span>
			<div class="color_grey mar-left_10">
				<span @click="openStartTimePicker">{{dateFormat(startDate, 'MM月dd日')}}</span>
				<span>-</span>
				<span @click="openEndTimePicker">{{dateFormat(endDate, 'MM月dd日')}}</span>
			</div>
		</div>
		<div class="mar-top_10">
			<van-tabs class="top-tabs" @change="getStatisticalInfo" v-model="tabIndex">
				<van-tab :title="item.title" v-for="(item,index) in tabs" :key="index" :name="item.value">
					<!-- 健康情况 -->
					<div class="info-container mar-top_10">
						<p class="title">健康情况</p>
						<div class="item-container mar-top_10">
							<div class="pad_10">
								<div class="item-info" @click='toList(1)'>
									<span style="color: #0089FF">{{healthData.clockInCount}}</span>
									<span>打卡人数</span>
									<div class="line"></div>
								</div>
								<div class="item-info" @click='toList(3)'>
									<span style="color: #F66C6C">{{healthData.unClockInCount}}</span>
									<span>未打卡人数</span>
								</div>
								<div class="line_bottom"></div>
							</div>
							<div class="mar-top_15" >
								<div class="item-info" @click='toList(1,{"query_C-EPIDEMIC-0001":"1"})'>
									<span style="color: #67C23B">{{healthData.healthCount}}</span>
									<span>健康人数</span>
									<div class="line"></div>
								</div>
								<div class="item-info" @click='toList(1,{"query_C-EPIDEMIC-0001":"2,3"})'>
									<span style="color: #F66C6C">{{healthData.unHealthCount}}</span>
									<span>非健康人数</span>
									<div class="line"></div>
								</div>
								<div class="item-info" @click='toList(1,{"query_C-EPIDEMIC-0003":"1"})'>
									<span style="color: #E6A23D">{{healthData.contactCount}}</span>
									<span>接触人数</span>
								</div>
							</div>
						</div>
					</div>
					<!-- 所在城市 -->
					<div class="info-container mar-top_10" v-if="healthData.cityStatisticalVos&&healthData.cityStatisticalVos.length">
						<p class="title">所在城市</p>
						<div class="progress-container" v-for="(itm, inx) in healthData.cityStatisticalVos" :key="inx">
							<div class="progress-info">
								<span :style="{ color: itm.color }">{{ itm.city }}</span>
								<span class="color_grey">{{ itm.count }}</span>
							</div>
							<van-progress :percentage="10" stroke-width="8" :show-pivot="false" :color="itm.color" />
						</div>
					</div>
					<div class="info-container mar-top_10">
						<p class="title">报备情况</p>
						<div class="baobeiContent" @click='toList(2)'>
							<p>{{healthData.reportCount}}</p>
							<p>报备人数</p>
						</div>
					</div>
				</van-tab>

			</van-tabs>
		</div>
		<van-popup v-model="isShowStartTimePicker" position="bottom" round>
			<van-datetime-picker v-model="tempStartDate" type="date" title="选择起始时间" :min-date="minDate" :max-date="maxDate"
			 @cancel="isShowStartTimePicker=false" @confirm="startDateConfirm" />
		</van-popup>
		<van-popup v-model="isShowEndTimePicker" position="bottom" round>
			<van-datetime-picker v-model="tempEndDate" type="date" title="选择结束时间" :min-date="minDate" :max-date="maxDate"
			 @cancel="isShowEndTimePicker=false" @confirm="endDateConfirm" />
		</van-popup>
	</div>
</template>

<script>
	export default {
		name: 'HealthStatistics',
		data() {
			return {
				isShowStartTimePicker: false,
				isShowEndTimePicker: false,
				tabIndex: "unit",
				startDate:new Date(new Date().toLocaleDateString()), //设置默认结束时间为当前天
				endDate: new Date(new Date().toLocaleDateString()), //设置默认结束时间为当前天
				tempStartDate: new Date(), //时间选择器临时数据保存
				tempEndDate: new Date(), //时间选择器临时数据保存
				minDate: new Date(new Date().getFullYear() - 2, 0, 1), //设置可选择最小日期为两年前1月1日
				maxDate: new Date(), //设置可选择最大日期为当前天
				tabs:[{title:"本单位情况",value:"unit"},{title:"本部门情况",value:"dept"}],
				healthData:{},
				color:[ "#0089FF","#67C23B","#F66C6C","#E6A23D"],
			}
		},
		created() {
			let userInfo=dsf.util.loadLocalStore("user")
			if(userInfo.privileges.findIndex(item=>{return item.name=="单位主要领导" || item.name=="单位领导"})>-1){
				this.tabIndex="unit"
				this.tabs=[{title:userInfo.unitName?userInfo.unitName:"本单位情况",value:"unit"}]
				this.getStatisticalInfo();
				return
			}
			if(userInfo.privileges.findIndex(item=>{return item.name=="部门领导"})>-1){
				this.tabIndex="dept"
				this.tabs=[{title:userInfo.deptName?userInfo.deptName:"本部门情况",value:"dept"}]
				this.getStatisticalInfo();
				return
			}
		},
		mounted() {

		},
		methods: {
			toList(list,secObj){
				if(list==3){
					let secQuery={
						// "query_A0014":`${dsf.date.format(this.startDate, 'yyyy-mm-dd')} - ${dsf.date.format(this.endDate, 'yyyy-mm-dd')}`,
						startTime:dsf.date.format(this.startDate, 'yyyy-mm-dd'),
						endTime:dsf.date.format(this.endDate, 'yyyy-mm-dd'),
						org:this.tabIndex
					}
					if(this.tabIndex=="dept"){
							this.$router.push({path:"/commonList?fileType=weidaka",query:{secQuery:JSON.stringify(secQuery)}})
					}else{
						this.$router.push({path:"/commonList?fileType=weidaka",query:{secQuery:JSON.stringify(secQuery)}})
					}
					return
				}
				if(list==1){
					let secQuery={
						"query_A0014":`${dsf.date.format(this.startDate, 'yyyy-mm-dd')} - ${dsf.date.format(this.endDate, 'yyyy-mm-dd')}`
					}
					if(secObj){
						secQuery=JSON.parse(
							JSON.stringify(Object.assign(secQuery, secObj))
						)
					}
					console.log(secQuery)
					if(this.tabIndex=="dept"){
							this.$router.push({path:"/commonList/2102042214385hLGTopijGsu7am1uwU/210202144200a6hFT4QWrGbmmP4dSy1",query:{secQuery:JSON.stringify(secQuery)}})
					}else{
						this.$router.push({path:"/commonList/210202144709rE5QO2dYn1nqs4R4TR6/210202144200a6hFT4QWrGbmmP4dSy1",query:{secQuery:JSON.stringify(secQuery)}})
					}

				}else{
					let secQuery={
						"query_A0014":`${dsf.date.format(this.startDate, 'yyyy-mm-dd')} - ${dsf.date.format(this.endDate, 'yyyy-mm-dd')}`
					}
					if(this.tabIndex=="dept"){
						this.$router.push({path:"/commonList/210202191342WVy9e4IRDVgexvuvUSp/210202190424cbnhcSkB8vZow0JzifQ",query:{secQuery:JSON.stringify(secQuery)}})
					}else{
						this.$router.push({path:"/commonList/210204221350w1IEf19kz4gi7x0KM41/210202190424cbnhcSkB8vZow0JzifQ",query:{secQuery:JSON.stringify(secQuery)}})
					}
				}

			},
			getStatisticalInfo() { //获取统计信息 本单位:0,本部门:1
				let loading = dsf.layer.loading();
				let params={
					startTime:dsf.date.format(this.startDate, 'yyyy-mm-dd'),
					endTime:dsf.date.format(this.endDate, 'yyyy-mm-dd'),
					org:this.tabIndex
				}
				dsf.http.get("fn//epidemic/statistical",params)
				.then(({data})=>{
					console.log(data)
					if(data.type=="success"){
						var count=0
						data.data.cityStatisticalVos.forEach((item,index)=>{
							if(count>3)count=0;
							item.color=this.color[count]
							count++
						})
						this.healthData=data.data
						dsf.layer.closeLoading(loading)
					}

				})
			},
			openStartTimePicker() {
				this.tempStartDate = this.startDate;
				this.isShowStartTimePicker = true;
			},
			openEndTimePicker() {
				this.tempEndDate = this.endDate;
				this.isShowEndTimePicker = true;
			},
			startDateConfirm(value) {
				if (new Date(value).getTime() > new Date(this.endDate).getTime()) {
					dsf.layer.toast('开始日期不能大于结束日期');
					return;
				}
				this.startDate = value;
				console.log(dsf.date.format(this.startDate, 'yyyy-mm-dd'),dsf.date.format(this.endDate, 'yyyy-mm-dd'))
				this.getStatisticalInfo()
				this.isShowStartTimePicker = false;
			},
			endDateConfirm(value) {
				if (new Date(value).getTime() < new Date(this.startDate).getTime()) {
					dsf.layer.toast('结束日期不能小于起始日期');
					return;
				}
				this.endDate = value;
				this.getStatisticalInfo()
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
		},
	}
</script>

<style lang="scss" scoped>
	#health-statistics {
		width: 100vw;
		height: 100vh;
		font-size: var(--font_size_2);
		display: flex;
		flex-direction: column;
		position: relative;
	}

	.time-container {
		padding: 18px 30px;
		background-color: #FFF;
		display: flex;
	}

	.top-tabs {
		::v-deep .van-tabs__wrap {
			height: 58px;
		}

		::v-deep .van-tabs__line {
			height: 2px;
			// width: 33.5px;
			// background-color: #0089FF!important;
		}

		::v-deep .van-tab__text {
			font-weight: bold;
			font-size: var(--font_size_1);
		}

		::v-deep .van-sticky--fixed {
			z-index: 99999999;
		}
	}

	.info-container {
		padding: 14.5px 5px 18px;
		background-color: #fff;

		.title {
			margin-left: 10px;
			border-left: 5px solid #0089ff;
			padding-left: 6px;
			font-size: 19px;
			color: #333333;
			font-weight: bold;
		}

		.item-container {
			&>div {
				display: flex;
				position: relative;

				.item-info {
					flex: 1;
					display: flex;
					position: relative;
					flex-direction: column;
					align-items: center;

					:nth-child(1) {
						font-size: 24px;
						font-weight: bold;
					}

					:nth-child(2) {
						font-size: var(--font_size_3);
						margin-top: 5px;
					}
				}

				.line {
					position: absolute;
					border-right: 1px solid #e6e6e6;
					height: 38px;
					right: -0.5px;
					top: 50%;
					transform: translateY(-50%);
				}

				.line_bottom {
					position: absolute;
					border-bottom: 1px solid #e6e6e6;
					bottom: 0;
					width: 95%;
					left: 50%;
					transform: translateX(-50%);
				}
			}
		}

		.progress-container {
			padding: 0 10px;
			margin-top: 18px;

			.progress-info {
				display: flex;
				justify-content: space-between;
				margin-bottom: 6px;
				font-size: var(--font_size_3);
			}
		}
	}
	.baobeiContent{
		text-align: center;
		:nth-child(1){
			font-weight: 600;
			font-size:28px;
			color:#1989fa;
			margin:10px 0 4px;
		}
		:nth-child(2){
			font-weight: 600;

		}
	}

	.mar-top_5 {
		margin-top: 5px;
	}

	.mar-top_10 {
		margin-top: 10px;
	}

	.mar-top_15 {
		margin-top: 15px;
	}

	.mar-left_5 {
		margin-left: 5px;
	}

	.mar-left_10 {
		margin-left: 10px;
	}

	.mar-left_15 {
		margin-left: 15px;
	}

	.pad_10 {
		padding: 10px 0;
	}

	.color_grey {
		color: #666;
	}
</style>

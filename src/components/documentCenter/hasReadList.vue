<template>
	<div id="has-read-list">
		<van-search v-model="searchValue" placeholder="请输入搜索关键词" @search="doRefresh" @clear="clearSearchValue" />
		<div class="content">
			<van-pull-refresh v-model="isLoading" success-text="刷新成功" @refresh="doRefresh">
				<van-list :finished="finished" :finished-text="!moreDataCanBeLoaded ? finishedTips : ''" v-model="loading" :offset="500"
				 :immediate-check="false" @load="infinite">
					<div v-for="(item,index) in items" @click="goForm(item)" class="card" :style="{'margin-bottom': index==items.length-1?'0':''}">
						<p class="title">{{item.itemsContent}}</p>
						<div class="info">
							<p>
								<van-icon name="contact" class="mar-right_5" />
								<span>{{item.name}}</span>
							</p>
							<p>
								<van-icon name="underway-o" class="mar-right_5" />
								<span>{{item.time}}</span>
							</p>
						</div>
					</div>
				</van-list>
			</van-pull-refresh>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'hasReadList',
		data() {
			return {
				loading: false,
				finished: false,
				isLoading: false,
				finishedTips: "没有更多了",
				searchValue: "",
				start: 0,
				pageSize: 10,
				items: [],
				moreDataCanBeLoaded: true
			};
		},
		watch: {
			searchValue(newValue, oldValue) {
				//调用搜索接口
				this.searchValue = newValue;
				this.doRefresh()
			}
		},
		created() {
			this.doRefresh()
		},
		mounted() {

		},
		methods: {
			back() {
				this.$router.go(-1);
			},
			doRefresh() {
				this.finished = false;
				this.loading = true;
				dsf.http.get("fn/mobileToRead/getReadQueryList?key=" + this.searchValue + "&start=0&limit=" + this.pageSize, {}).then(
					({
						data
					}) => {
						console.log('========已阅列表========')
						console.log(data)
						this.items = data.rows;
						if (this.items.length < this.pageSize) {
							// 加载结束
							this.finished = true;
							this.moreDataCanBeLoaded = false;
						} else {
							this.moreDataCanBeLoaded = true;
							this.start = this.pageSize;
						}
					}).catch(({
					message
				}) => {
					this.finished = true;
					this.dsf.layer.toast(message);
					this.finishedTips = message;
				}).finally(() => {
					this.loading = false;
					this.isLoading = false;
				});
			},
			infinite() {
				if (!this.moreDataCanBeLoaded) return;
				dsf.http.get("fn/mobileToRead/getReadQueryList?key=" + this.searchValue + "&start=" + this.start + "&limit=" +
					this.pageSize, {}).then(({data}) => {
					console.log("[已阅-loadMore] ");
					console.log(data)
					if (data && data.rows && data.rows.length > 0) {
						this.items = [...this.items,...data.rows];
						this.start = this.start + this.pageSize;
						if (data.rows.length < this.pageSize) {
							// 加载结束
							this.finished = true;
							this.moreDataCanBeLoaded = false;
						}
					} else {
						// 加载结束
						this.finished = true;
						this.moreDataCanBeLoaded = false;
					}
				}).catch(({
					message
				}) => {
					this.finished = true;
					this.dsf.layer.toast(message);
					this.finishedTips = message;
				}).finally(() => {
					this.loading = false;
					this.isLoading = false;
				});
			},
			// 清除输入框的值
			clearSearchValue() {
				this.searchValue = "";
			},
			// 跳转到表单页面
			goForm(item) {
				this.$router.push({
					name: "commonForm",
					params: {
						pk: item.agendaId || item.id || item.pk,
						moduleId: item.moduleId
					}
				})
			},
		}
	};
</script>

<style lang="scss" scoped>
	#has-read-list {
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;

		.content {
			flex: 1;
			overflow-y: scroll;
		}
	}

	.card {
		background-color: #FFF;
		border-radius: 10px;
		margin: 15px 10px;
		padding: 15px;
		box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 4px 0px;

		.title {
			font-size: 18px;
		}

		.info {
			display: flex;
			align-items: center;
			justify-content: space-between;
			font-size: 15px;
			color: #333;
			margin-top: 10px;

			p {
				display: flex;
				align-items: center;
			}
		}
	}
	
	.mar-right_5{
		margin-right: 5px;
	}
</style>

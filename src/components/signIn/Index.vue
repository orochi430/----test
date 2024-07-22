
<template>
	<div class="ds-signin">
		<van-tabs v-model="tabIndex" sticky @change="changeTab" :offset-top="dsf.util.getOffsetTop()">
			<van-tab v-for="(item, index) in tabs" :key="index" :title="item.name" :badge="item.badge | badgeCount">
			</van-tab>
		</van-tabs>
		<div class="ds-list">
			<van-pull-refresh v-model="refreshing" @refresh="onRefresh">
				<van-list v-model="loading" :finished="finished" :finished-text="finishedText" @load="onLoad">
					<div v-if="list.length > 0">
						<template v-if="activeNum == 1">
							<div v-for="(item, index) in list" :key="index" :title="item" class="ds-list-box">
								<span :class="activeNum == 1 ? 'ds-list-text-allLine' : 'ds-list-text1'">
									{{ `${item["dataValue"]["C-R-SEND-DETAIL-0002"]}` }}
								</span>
							</div>
						</template>
            <template v-else-if="activeNum == 2">
							<div v-for="(item, index) in list" :key="index" :title="item" class="ds-list-box ds-list-box2">
								<span class="ds-list-text">
									{{ item["dataValue"]["C-R-SEND-DETAIL-0002"] || "" }}
								</span>
								<div class="ds-list-text-div">
									<p class="ds-list-date ds-list-time">
										<span>时间:</span>
										{{ item["dataValue"]["C-R-SEND-DETAIL-0003"] }}
									</p>
									<p class="ds-list-date ds-list-date-reason float_n">
										接收人:
										<span>{{ item["dataValue"]["C-R-SEND-DETAIL-0010"] || "" }}</span>
									</p>
								</div>
              </div>
						</template>
						<template v-else>
							<div v-for="(item, index) in list" :key="index" :title="item" class="ds-list-box ds-list-box2">
								<span class="ds-list-text">
									{{ item["dataValue"]["C-R-SEND-DETAIL-0002"] || "" }}
								</span>
								<div class="ds-list-text-div">
									<p class="ds-list-date ds-list-time">
										<span>时间:</span>
										{{ item["dataValue"]["C-R-SEND-DETAIL-0040"] }}
									</p>
									<p class="ds-list-date ds-list-date-reason float_n" v-if="item.dataValue['C-R-SEND-DETAIL-0004.value'] == '-2'">
										原因:
										<span>{{ item["dataValue"]["C-R-SEND-DETAIL-0011"] || "" }}</span>
									</p>
                  <p class="ds-list-date ds-list-date-reason" style="color: var(--normal);" v-else @click="viewSendBackDoc(item.dataValue['C-R-SEND-DETAIL-0022'], item.dataValue['C-R-SEND-DETAIL-0004.value'])">查看退文单</p>
								</div>
							</div>
						</template>
					</div>
					<commonempty v-if="list.length === 0 && finished" />
				</van-list>
			</van-pull-refresh>
		</div>
	</div>
</template>

<script>
import {
	mapState
} from "vuex";
import DingBtn from "@/components/common/DingBtn";
import DsList from "@/components/documentCenter/DsList";
export default {
	name: "signIn",
	components: {
		DingBtn,
		DsList
	},
	data() {
		return {
			tabIndex: 0,
			activeNum: 1,
			activeText: "未签收",
			list: [
			],
			loading: false,
			finished: false,
			refreshing: false,
			finishedText: "",
			date: moment().format("MM" + "月" + "DD" + "日     " + "HH:mm"),
			params: {
			},
			fid: "",
			signStatus: "0",
			url: "fn/list/230627191434qbstw10c1QF94PXtxXi/mobile/q?moduleId=190316150842gGFeRKU0VtkcDlBltcJ&page=1&limit=100",
			tabs: [{
				name: "未签收",
				badge: 0
			}, {
				name: "已签收",
				badge: 0
			}, {
				name: "已退回",
				badge: 0
			}
			]
		};
	},
	filters: {
		badgeCount(val) {
			if (val > 100) {
				return "99+"
			}
			if (val < 1) {
				return ""
			}
			return val
		}
	},
	computed: {
		...mapState({
			isShowAppFooter: state => state.isShowAppFooter,
			isShowAppHeader: state => state.isShowAppHeader
		})
	},
	created() {
		this.fid = this.$route.query.fid;
		this.getTotal(0)
		this.getTotal(1)
		this.getTotal(2)
	},
	mounted() {

	},
	methods: {
		getTotal(val) {
			let self = this
			this.finished = false;
			this.list = [];
			let Status = ""
			if (val == 0) {
				//未签收
				Status = "0";
			} else if (val === 1) {
				//已签收
				Status = "1";
			} else {
				//已退回
				Status = "-2,-4,-5";
			}
			const obj = {
				fid: this.fid,
				SIGN_STATUS: Status
			};
			dsf.http.get(this.url, obj).done(res => {
				self.tabs[val].badge = res.total
			})
		},
		changeTab() {
			this.finishedText = ""
			this.activeNum = this.tabIndex + 1;
			this.finished = false;
			this.list = [];
			if (this.activeNum === 1) {
				//未签收
				this.activeText = "未签收";
				this.signStatus = "0";
			} else if (this.activeNum === 2) {
				//已签收
				this.activeText = "已签收";
				this.signStatus = "1";
			} else {
				//已退回
				this.activeText = "已退回";
				this.signStatus = "-2,-4,-5";
			}
		},
		gofankui(item) {
			const status = item["dataValue"]["C-R-SEND-DETAIL-0005.value"] ? item["dataValue"]["C-R-SEND-DETAIL-0005.value"] : ""
			if (status == '1') {
				dsf.http.post(`/fn/remoteExchangeData/getFeedbackForm?feedbackRcvId=${item.dataValue["C-R-SEND-DETAIL-0015"]}`)
					.then(modulData => {
						console.log(modulData)
						this.$router.push({
							name: "commonForm",
							params: {
								moduleId: modulData.data.data.moduleId,
								pk: modulData.data.data.pk
							},
							query: {
								qianshoufankui: "ExchangeRecvList",
								method: "view",
								validateByList: "1",
							}
						})
					})
			}
		},
		async onLoad() {
			await this.onhandleHttp(this.params);
			this.loading = false;
			if (this.list.length >= this.total) {
				this.finished = true;
			}
		},
		async onhandleHttp() {
			let self = this;
			/* 测试  fid
			未签收： 200517170603vZhLkYle6FdmCoDNRiO
			已签收: 200517171040OUTjmlojPPC7Fpi1ejV
			已退回: 200517172700XkuLH9hx04TMIBGgtLd
	   */
			const obj = {
				fid: this.fid,
				SIGN_STATUS: this.signStatus
			};
			await dsf.http.get(this.url, obj).done(res => {
				let { datas } = res;
				self.list = datas;
				self.total = res.total;
				self.refreshing = false
				if (self.list.length > 0) {
					// self.finishedText = "没有更多了"
				}
			}).error(error => {
				console.log("error", error);
				self.dsf.layer.toast("请求异常", false);
			});
		},
		onRefresh() {
			this.finishedText = ""
			this.finished = false;
			this.loading = true;
			this.onLoad();
    },
    viewSendBackDoc(pk, status) {
      let data = {
        pk: pk
      };
      dsf.layer.loading()
      dsf.http.post("ctrl/common/getFileInfo", data).then(result => {
        dsf.layer.clear()
        let moduleId = result.data.moduleId;
        if (status == -4) {
          this.$router.push({
            path: `/commonForm/${moduleId}/${pk}?reloadParentFormOnSave=true&listId=ExchangeRecvList&method=view&validateByList=1`,
          })
        } else if (status == -5) {
          dsf.http.post("ctrl/remoteExchangeData/getAttachInfo", { pk: pk }, function (res) {
            if (res.data && res.data.type === "success") {
              var fileName = res.data.data.fileName
              var fileId = res.data.data.id
              if (fileId) {
                this.$router.push({
                  path: `/filePreview/${fileId}/210104164115YE5FsFODVtUQG3cWkTt`,
                  query: {
                    title: fileName
                  }
                })
              } else {
                dsf.layer.toast("未找到正文")
              }
            } else if (res.data && res.data.type === "error") {
              dsf.layer.toast(res.data.message)
            } else {
              dsf.layer.toast("请求出错")
            }
          })
        } else {
          dsf.layer.toast("不支持查看")
        }
      });
    }
  },
  beforeRouteLeave(to, form, next) {
    if (to.name != 'commonForm') {
      this.$deleteCache(this);
    }
    next()
  }
};
</script>

<style lang="scss" scoped>
.ds-signin {
	font-size: var(--font_size_2);

	::v-deep .van-nav-bar {
		z-index: 200;
	}

	::v-deep .van-icon-arrow-left {
		color: #333;
		font-weight: 600;
		font-size: 1.5em;
	}

	.ds-list {
		height: auto;
		padding-top: 5px;

		.ds-list-box {
			background-color: #ffffff;
			border-bottom: 1px solid #eeeeee;
			min-height: 50px;
			line-height: 50px;
			align-items: center;
			display: flex;
			padding: 0px 15px;
		}

		.ds-list-box2 {
			min-height: 90px;
		}

		.ds-list-icon {
			margin: 0 15px;

			.iconfont {
				color: #3296fa;
				font-size: 22px;
			}
		}

		.ds-list-text {
			color: #000000;
			display: inline-block;
			white-space: nowrap;
			text-overflow: ellipsis;
			overflow: hidden;
			flex: 1;
			padding: 0px 5px;
		}

		.ds-list-text-div {
			flex: 1;
		}


		.ds-list-icon1 {
			position: relative;
			margin-left: 15px;
			margin-right: 15px;
			top: -16px;
		}

		.ds-list-text-allLine {
			color: #000000;
			display: inline-block;
			white-space: nowrap;
			text-overflow: ellipsis;
			overflow: hidden;
			width: calc(100vw);
		}

		.ds-list-text1 {
			color: #000000;
			display: inline-block;
			white-space: nowrap;
			text-overflow: ellipsis;
			overflow: hidden;
			flex: 1;
			padding: 0px 5px;
		}

		.ds_status {
			float: right;
			// width: 13%;
			padding: 5px;
			margin-right: 14px;
			font-size: 13px;
			background: #1989fa;
			color: #fff;
			// height: 16px;
			line-height: 16px;
			text-align: center;
			border-radius: 14px;
			margin-top: 14px;
		}

		.ds-list-btn {
			font-size: var(--font_size_3);
			border-radius: 8px;
			width: 60px;
			padding: 0;
			height: 23px;
			position: absolute;
			right: 15px;
			top: 13.5px;
			border: none;
			// margin-right: 15px;
		}

		.willread {
			color: #999999;
			background: #d8d8d8;
		}

		.ds-list-time {
			margin-top: 0px !important;
			float: left !important;
		}

		.ds-list-date {
			font-size: var(--font_size_3);
			color: #999999;
			line-height: 23px;
			flex-shrink: 0
		}

		.ds-list-date2 {
			font-size: var(--font_size_3);
			color: #999999;
			line-height: 23px;
			// height: 23px;
			// position: absolute;
			// right: 15px;
			padding-left: 15px;
			float: right;
			margin-right: 10px;
			margin-top: 18px;
			// margin-right: 15px;
		}

		.float_n {
			float: none;
			margin-top: 5px !important;
		}

		.ds-list-date-reason {
			margin: 0px;
			float: left;

			span {
				// padding-left: 15px;
			}

			width: 100%;
			// white-space: nowrap;
			// text-overflow: ellipsis;
			// overflow: hidden;
		}
	}

	.ds-bottom {
		position: fixed;
		bottom: 0;
		height: 84px;
		line-height: 84px;
		width: 100%;
		text-align: center;
		background: #ffffff;
		box-shadow: 0 -1px 4px 0 rgba(0, 0, 0, 0.12);

		.ds-bottom-btn {
			font-size: var(--font_size_1);
			width: 92%;
		}
	}
}
</style>

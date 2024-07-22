<template>
	<div class="indexList">
		<div v-if="isSeach" class="searchCalcHeight">
			<div class="seachPerson" v-show="userList.length > 0">
				<div class="disfr " v-for="(itm, inx) in userList" :key="inx">
					<div class="personInfo disfr ac" @click="toDetail(itm)">
						<img v-if="itm.photoSrc" class="userImg" :src="getPhotoSrc(itm.photoSrc)" />
						<div v-else class="userImg">{{ itm.userName | filterName }}</div>
						<div class="itemContent fc jsb flex ellipsis">
							<span class="personName ellipsis minWid">{{ itm.userName }}</span>
							<span class="personNum ellipsis"
								v-if="(itm.mobile || itm.tel) && !dsf.config.addressList.isFideMobile">{{
									itm.mobile | filterMobile(itm)
								}}</span>
						</div>
						<div class="org-name">{{ itm.orgName | filterOrg(itm, that) }}</div>
					</div>
					<div class="personInfoRight" v-if="checkPhoneLength(itm)">
						<van-icon name="phone" @click="phoneCall(itm)" />
					</div>
				</div>

			</div>
			<commonempty v-if="userList.length == 0"></commonempty>
		</div>
		<div v-else>
			<div class="secFab" v-show="secIndexShow">{{ secIndex }}</div>
			<!-- 面包屑 -->
			<div class="organizationBox  flex1 mb10" v-show="breadList.length > 1">
				<div class="organizationitem scrollBoxParent">
					<div ref="scrollRef" class="disfr  ac ofa">
						<div class="disfr  ac wsp" v-for="(item, index) in breadList"
							@click="(breadList.length - 1 > index) ? chooseBread(item) : ''" :key="index">
							<span :class="index == 0 || (index < breadList.length - 1) ? '' : 'normalColor'">{{ item.name
							}}</span>
							<van-icon name="arrow" v-show="index < breadList.length - 1" />
						</div>
					</div>
				</div>
			</div>
			<div :style="breadList.length > 1 ? 'paddingTop:2px' : ''"
				:class="breadList.length > 1 ? 'calcHeight' : 'searchCalcHeight'">
				<div class="organizationBox  flex1 organizationList" v-show="organization.length">
					<div class="organizationitem disfr jsb ac" v-for="(item, index) in organization" :key="index"
						@click="chooseBread(item)">
						<span>{{ item.name }}<span v-if="isShowCount">（{{ item.userCount }}）</span></span>
						<van-icon name="arrow" v-if="item.userCount > 0" />
					</div>
				</div>
				<van-index-bar ref="indexList" v-if="hasUser" :index-list="indexList" @change="selectBar"
					@select="selectBar">
					<div v-for="(item, key, index) in peopleList" :key="index">
						<van-index-anchor :index="key">{{ key }}</van-index-anchor>
						<div class="personInfoList">
							<div class="disfr " v-for="(itm, inx) in item" :key="inx">
								<div class="personInfo disfr ac" @click="toDetail(itm)">
									<img v-if="itm.photoSrc" class="userImg" :src="getPhotoSrc(itm.photoSrc)" />
									<div v-else class="userImg">{{ itm.userName | filterName }}</div>
									<div class="itemContent fc jsb flex ellipsis">
										<span class="personName ellipsis minWid">{{ itm.userName }}</span>
										<span class="personNum ellipsis"
											v-if="(itm.mobile || itm.tel) && !dsf.config.addressList.isFideMobile">{{
												itm.mobile | filterMobile(itm)
											}}</span>
									</div>
									<div class="org-name">{{ itm.orgName }}</div>
								</div>
								<div class="personInfoRight" v-if="checkPhoneLength(itm)">
									<van-icon name="phone" @click="phoneCall(itm)" />
								</div>
							</div>
						</div>
					</div>
				</van-index-bar>
				<commonempty v-else-if="organization.length == 0"></commonempty>
			</div>
		</div>
		<van-action-sheet v-model="showAction" :actions="actions" cancel-text="取消" close-on-click-action
			@select="onSelect" />
	</div>
</template>

<script>
import {
	mapState
} from 'vuex'
import dsf from '../../common';
import tableMixin from './tableMixin'
import Clipboard from 'clipboard'
const groupBy = require("lodash/groupBy.js"); //以后lodash函数按需引入,减少打包体积
export default {
	mixins: [tableMixin],
	props: {
		keyword: {
			type: String,
			default: ''
		},
		url: {
			type: String,
			default: ''
		},
		searchUrl: {
			type: String,
			default: ''
		},
		itemtab: {
			type: Object,
			default: () => {
				return {}
			}
		}
	},
	data() {
		return {
			that: this,
			isShowCount: true,
			peopleList: {},
			indexList: ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "W",
				"X", "Y", "Z"
			],
			secIndex: "",
			secIndexShow: false,
			timeout: null,
			stickyHeight: 0,
			barHeight: {
				height: '',
				overflow: 'auto'
			},
			preNode: null,
			organization: [],
			breadList: [],
			isSeach: false,
			userList: [],
			hasUser: false,
			hasgoDetial: false,
			showAction: false,
			actions: [],
			selectUser: {},
			btnCopy: null,
			phone_system: dsf.util.checkSystem(),
			clientName: dsf.util.getClientName()
		}
	},
	created() {
		this.actions.push({
			name: '呼叫'
		})
		this.actions.push({
			name: '复制号码',
			className: "actionStyle"
		})
		if (this.phone_system == "android" && this.clientName == "app") {
			this.actions.push({
				name: '添加到通讯录'
			})
		}
		this.init()
	},
	mounted() {
		let docFontsize = document.documentElement.style.fontSize.split('px')[0]
		let headerHeight = this.isShowAppHeader ? 46 / 50 * docFontsize : 0;
		let footHeight = this.isShowAppFooter ? 60 / 50 * docFontsize : 0;
		let searchHeight = 52 / 50 * docFontsize;
		let tabhHeight = 44 / 50 * docFontsize;
		this.stickyHeight = headerHeight + searchHeight + tabhHeight + 20;
		this.barHeight.height = window.innerHeight - footHeight - this.stickyHeight + 'px';
	},
	activated() {
		// console.log('g-' + (this.breadList.length - 1))
		// window.addEventListener("popstate", this.bindPageChange);
		// if (this.breadList.length >= 2) {
		//     this.hasgoDetial = true;
		//     history.pushState(null, null, document.URL);
		// }
		// if (this.secIndex != "") {
		//     this.$refs.indexList.scrollTo(this.secIndex);
		// }
	},
	// deactivated() {
	//     this.hasgoDetial = false;
	//     window.removeEventListener("popstate", this.bindPageChange);
	// },
	// destroyed() {
	//     this.hasgoDetial = false;
	//     window.removeEventListener("popstate", this.bindPageChange);
	// },
	watch: {
		keyword() {
			this.debounce(() => {
				if (this.keyword != "") {
					this.search()
				} else {
					this.isSeach = false
					this.init()
				}
			}, 800)
		},
		breadList: {
			handler: function (nv, ov) {
				window.isAddressRoot = nv.length == 0;
				this.hasgoDetial = nv.length > 0;

				this.$nextTick(() => {
					if (this.$refs.scrollRef && this.breadList.length) {
						let width = this.$refs.scrollRef.scrollWidth;
						this.$refs.scrollRef.scrollTo(width, 0)
					}
				})
			},
			immediate: true
		}
	},
	computed: {
		...mapState({
			isShowAppFooter: state => state.isShowAppFooter,
			isShowAppHeader: state => state.isShowAppHeader
		})
	},
	methods: {
		checkPhoneLength(item) {
			return item.mobile?.length || item.tel?.length
		},
		addPopstate() {
			console.log('indexList-addPopstate')
			window.addEventListener("popstate", this.bindPageChange);
			if (this.hasgoDetial) {
				history.pushState(null, null, document.URL);
			}
			window.isAddressRoot = this.breadList.length == (this.isShowAllOrg ? 2 : 0);
			if (this.secIndex != "") {
				this.$refs.indexList.scrollTo(this.secIndex);
			}
		},
		removePopstate(isDeactivated) {
			console.log('indexList-removePopstate');
			window.removeEventListener("popstate", this.bindPageChange);
			//当前不是根目录（已有1个层级），切换tab操作（不是路由切换失活）时，需要去掉1个层级，否则影响另1个tab的层级返回
			// if (!isDeactivated && this.hasgoDetial) history.replaceState(null, null, document.URL);
		},
		bindPageChange() {
			if (window.popTarget.length) return; // 如果有弹层存在，则不执行
			let self = this;
			if (self.breadList.length > 2) {
				history.pushState(null, null, document.URL);
				self.chooseBread(self.breadList[self.breadList.length - 2]);
			} else if (self.breadList.length == 2) {
				self.chooseBread(self.breadList[self.breadList.length - 2]);
			} else {
				history.back();
			}
		},
		getPhotoSrc(path) {
			return dsf.url.getWebPath(path) + `&time=${new Date().getTime()}`
		},
		chooseBread(item) {
			if (item.id == 0) {
				this.init()
			} else {
				this.toNext(item)
			}
		},
		toNext(data) {
			let self = this
			if (this.hasgoDetial == false) {
				history.pushState(null, null, document.URL);
			}

			if (data.hasChildren) {
				self.$toast.loading("加载中");
				dsf.http.post(self.url, {
					groupId: data.id
				}).then((res) => {
					self.$toast.clear()
					let resData = res.data.data
					self.organization = resData.depts
					self.breadList = resData.navs

					//处理人员
					let data = res.data.data.users
					if (data.length) {
						self.hasUser = true
					}
					self.showUser(data);
				})
			}
		},
		selectBar(val) {
			this.secIndex = val
			this.secIndexShow = true
			if (this.timeout) {
				clearTimeout(this.timeout)
			}
			this.timeout = setTimeout(() => {
				this.timeout = null;
				this.requireFn()
			}, 800)
		},
		requireFn() {
			this.secIndexShow = false
		},
		toDetail(data) {
			this.$router.push({
				name: "mailDetail",
				query: {
					userdata: JSON.stringify(data)
				}
			})
		},
		search() {
			let self = this
			self.$toast.loading("加载中");
			dsf.http.post(this.searchUrl, {
				keyword: this.keyword
			}).then((res) => {
				self.$toast.clear()
				self.isSeach = true
				self.userList = res.data.data
				if (!self.userList.length) {
					self.secIndex = ""
				}
			})
		},
		showUser(data) {
			var arr = groupBy(data, function (val) {
				return val.pinyinInitial.slice(0, 1).toUpperCase()
			})
			let personObj = {}
			this.indexList = Object.keys(arr).sort()
			this.indexList.forEach((item, index) => {
				//personObj[item] = arr[item]
				personObj[item] = arr[item].sort((a, b) => {
					return a.userName.localeCompare(b.userName, "zh");
				})
			})
			this.peopleList = personObj
		},
		init() {
			let self = this
			self.breadList = [];
			dsf.http.post(this.url, {}).then((res) => {
				let otherGroup = res.data.data.depts.find(item => item.name == "未分类");
				self.organization = res.data.data.depts.filter(item => item.name != "未分类");
				if (otherGroup) {
					return dsf.http.post(self.url, {
						groupId: otherGroup.id
					})
				} else {
					return {
						data: {
							data: {
								users: []
							}
						}
					}
				}
			}).then((userdata) => {
				//console.log(userdata.data.data.users);
				self.hasUser = false
				let data = userdata.data.data.users
				if (data.length) {
					self.hasUser = true
				}
				self.showUser(data);
			});
		},
		copyText(text) { // text: 要复制的内容， callback: 回调
			let self = this
			self.btnCopy.on('success', function (e) {
				dsf.layer.toast('复制成功');
				e.clearSelection();
				self.btnCopy.destroy()
			});

			self.btnCopy.on('error', function (e) {
				dsf.layer.toast('复制失败')
				self.btnCopy.destroy()
			});
		},
		onSelect(action, index) {
			console.log(action, index)
			if (index == 0) {
				this.phoneTo(this.selectUser.mobile||this.selectUser.tel)
			} else if (index == 1) {
				this.copyText(this.selectUser.mobile)
			} else if (index == 2) {
				if (this.clientName == "app") {
					/*
					phoneNumber:电话号码
					name：联系人姓名，可为空
					type：0 新建联系人，1 保存到已有联系人
 
					两种方案：
					1.和微信一样弹窗选项 新建联系人，保存到已有联系人
					2.和钉钉一样，直接保存到已有联系人（选人界面有新建选项）
					*/
					$iaction.savePhoneNumber({
						"phoneNumber": this.selectUser.mobile,
						"name": this.selectUser.userName,
						"type": 0
					}, function (s) { }, function (e) { });

				} else {
					//dsf.layer.toast("当前菜单仅支持在App中使用")
				}
			}
		},
		phoneTo(tel) {
			window.location.href = `tel:${tel}`
		},
		phoneCall(item) {
			this.selectUser = item
			this.showAction = true;

			this.$nextTick(() => {
				document.querySelectorAll(".actionStyle").forEach(element => {
					element.setAttribute("data-clipboard-text", this.selectUser.mobile||this.selectUser.tel)
				});
				this.btnCopy = new Clipboard(document.querySelectorAll(".actionStyle"));
			})
		}
	},
	filters: {
		userAvatar(name) {
			return name.slice(0, 1)
		},
		filterMobile(str, item) {
			return item.mobileDesensitizationSafeContent || str || item.tel;
		},
		filterOrg(str, item, that) {
			return that.itemtab.isShowAllDept ? item.unitName || str : str;
		},
		filterName(name) {
			return name.length > 4 ? name.slice(0, 4) + '...' : name;
		}
	}
}
</script>

<style lang="scss" scoped>
@import "../../assets/styles/themes.scss";
@import "../../assets/styles/mixin.scss";

.calcHeight {
	max-height: calc(100vh - 3.4rem - 1.2rem);
	overflow-y: auto;
}

.searchCalcHeight {
	max-height: calc(100vh - 2.3rem - 1.2rem);
	overflow-y: auto;
}

.seachPerson {
	background: white;
	box-shadow: 0px 0px 2px 0px rgba(211, 168, 168, 0.47);
	border-radius: 5px;
	margin: 0px 10px;
	padding: 0px 10px;
	box-sizing: border-box;
}

.normalColor {
	@include font-theme("normal", true);
}

.van-icon-arrow {
	// margin: 0px 5px;
	color: rgb(201, 201, 201) !important;
}

.scrollBoxParent {
	overflow: hidden;
}

.ofa {
	overflow-x: auto;
	padding-bottom: 30px;
	margin-bottom: -30px;
}

.wsp {
	white-space: pre;

	span {
		font-size: var(--font_size_2);
		color: #666666;
	}

	.van-icon {
		margin: 0 5px;
	}
}

.mb10 {
	margin-bottom: 10px;
}

.pt10 {
	padding-top: 10px;
}

.indexList {
	font-size: var(--font_size_2);

	.personInfoList {
		background: #FFFFFF;
		box-shadow: 0px 0px 1px 0px rgba(211, 168, 168, 0.47);
		border-radius: 5px;
		margin: 0 10px;
		overflow: hidden;
		padding: 10px;
		box-sizing: border-box;

		.disfr {
			display: flex;
			width: 100%;
			height: auto;
		}
	}

	.disfr {
		display: flex;
	}

	.fc {
		display: flex;
		flex-direction: column;
	}

	.jsb {
		justify-content: space-between;
	}

	.flex1 {
		flex: 1;
	}

	.minWid {
		min-width: 86px;
	}

	.secFab {
		width: 47px;
		height: 47px;
		background: #CCCCCC;
		text-align: center;
		line-height: 47px;
		font-size: 25px;
		color: white;
		border-radius: 47px;
		position: fixed;
		right: 35px;
		bottom: 330px;
	}

	.userImg {
		width: 40px;
		height: 40px;
		margin-right: 12px;
		border-radius: 5px;
		@include background-theme("normal");
		color: #FFFFFF;
		text-align: center;
		line-height: 35px;
		font-size: var(--font_size_3);
	}

	img.userImg {
		background: none;
	}

	.personInfo {
		// padding: 15px;
		// height: 61px;
		background: white;
		// border-bottom: 1px solid #cfcfcf;
		width: 100%;
		display: flex;
		align-items: center;
		padding: 10px 0;

		.personName {
			font-size: var(--font_size_2);
			color: #333333;
		}

		.personNum {
			margin-top: 4px;
			font-size: var(--font_size_4);
			color: #666666;
		}

		.org-name {
			flex: 1;
			font-size: var(--font_size_3);
			color: #666666;
			display: -webkit-box;
			-webkit-box-orient: vertical;
			-webkit-line-clamp: 2;
			overflow: hidden;
			text-overflow: ellipsis;
		}

		.search_org_name {
			flex: 1;
			font-size: var(--font_size_3);
			color: #666666;
			display: -webkit-box;
			-webkit-box-orient: vertical;
			-webkit-line-clamp: 2;
			overflow: hidden;
			text-overflow: ellipsis;
		}
	}

	.personInfoRight {
		// min-width: 50px;
		// background: white;
		// border-bottom: 1px solid #cfcfcf;
		margin: 0 23px 0 10px;
		display: flex;
		align-items: center;
		flex: 1;

		.van-icon-phone {
			font-size: 19px;
			@include font-theme("normal");
		}
	}

	.itemContent {
		// max-width: 150px;
		flex: 1;
	}


	.organizationBox {
		padding: 10px 15px;
		background: white;

		.organizationitem {
			font-size: var(--font_size_2);
			padding: 0;
			// border-bottom: 1px solid #cfcfcf;
		}

		// .organizationitem:last-child {
		//     border: none;
		// }
	}

	.organizationList {
		background: #FFFFFF;
		border-radius: 5px;
		margin: 0 10px;
		padding: 10px;
		box-sizing: border-box;

		.organizationitem {
			font-size: var(--font_size_2);
			color: #333333;
			padding: 10px 0;
			border: none;
		}
	}
}

.indexList {
	::v-deep .van-index-bar__sidebar {
		width: 0;
		left: calc(100% - 20px);
		height: 0;
		position: sticky;

		.van-index-bar__index {
			width: 16px;
			height: 16px;
			border-radius: 16px;
			line-height: 19px;
			text-align: center;
			padding: 0;
			// margin: 2px 0px;
			font-size: 11px;
			color: #999999
		}

		.van-index-bar__index--active {
			@include background-theme("normal");
			color: white
		}

	}

	.van-index-anchor {
		height: 22px;
		padding-left: 15px;
		line-height: 22px;
		font-size: var(--font_size_4);
		color: #333333;
	}

	::v-deep .van-index-anchor--sticky {
		@include font-theme("normal");
		top: -1px !important;
	}

}

</style>

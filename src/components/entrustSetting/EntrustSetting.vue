<template>
	<div id="entrust-setting">
		<div class="content">
			<van-list>
				<van-cell>
					<div class="flex ac jb">
						<span class="font_16">启动委托代办</span>
						<van-switch v-model="isOpenEntrust" @change="switchToggle" :disabled="!isAjaxComplete" size="24px" />
					</div>
				</van-cell>
				<van-cell>
					<div class="flex ac jb" @click="openSelectUserPage">
						<p class="flex1">
							<span class="font_16">设置委托人员</span>
							<span v-if="isOpenEntrust&&selectUserInfo" class="font_16"> {{selectUserInfo.name}}</span>
						</p>
						<van-icon size="0.4rem" color="#999" name="arrow" />
					</div>
				</van-cell>
			</van-list>
		</div>
		<van-popup v-model="show" position="bottom" :style="{ height: '100%' }">
			<control-user-list :pageTitle="'人员选择'" :selectType="1" :extra="metaData.extra" @close="close" @getSelectUser="getSelectUser"></control-user-list>
		</van-popup>
	</div>
</template>

<script>
	import controlUserList from "@/components/commonForm/controls/controlUserList";
	export default {
		name: 'EntrustSetting',
		components: {
			controlUserList
		},
		data() {
			return {
				isOpenEntrust: false,
				show: false,
				selectUserInfo: {},
				isAjaxComplete: false,
				metaData: {
					extra: {
						multiple: false,
						onlyChooseLeaf: false,
						tabs: []
					}
				}
			}
		},
		created() {
			this.init();
		},
		mounted() {

		},
		methods: {
			init() {
				dsf.http.post("fn/agency/getAgency", {}).then((res) => {
					this.isAjaxComplete = true;
					if (res.data.code == 200) {
						let data = res.data.data;
						console.log(data)
						if (data.agencyStatus > 0) {
							this.isOpenEntrust = true;
						}
						this.selectUserInfo.name = data.agencyUserName;
						this.selectUserInfo.userId = data.agencyUserId
						this.metaData.extra.tabs = data.extra.tabs.map(item => {
							item.action = 'fn/' + item.action;
							return item;
						})
					} else {
						dsf.layer.toast('获取数据失败,请稍后再试')
					}
				}).catch(err => console.log(err));
			},
			goBack() {
				this.$router.go(-1);
			},
			switchToggle(flag) {
				if (!flag) {
					this.selectUserInfo = {
						userId: '',
						name: ''
					}
				}
				this.confirm();
			},
			openSelectUserPage() {
				if (!this.isOpenEntrust) {
					this.$toast('未启动委托代办功能');
					return;
				}
				this.show = true;
			},
			close(isShow) {
				this.show = isShow;
			},
			getSelectUser(selectArr) {
				console.log(selectArr[0]);
				this.show = false;
				this.selectUserInfo = selectArr[0];
				this.selectUserInfo.userId = this.selectUserInfo.id.split('-')[1]
				this.confirm();
			},
			confirm() {
				let postData = {
					agencyUserId: this.selectUserInfo.userId,
					agencyUserName: this.selectUserInfo.name,
					agencyStatus: this.isOpenEntrust ? 1 : -1,
					agencyStatusText: this.isOpenEntrust ? '是' : '否',
					isAgencyPeriod: -1,
					isAgencyPeriodText: '否',
					agencyStart: '',
					agencyEnd: '',
					agencyType: 1,
					agencyMode: 1
				}
				dsf.http.post("fn/agency/save", {
					data: JSON.stringify(postData)
				}).then((res) => {
					console.log(res)
				})
			}
		},
	}
</script>

<style lang="scss" scoped>
	@import '../../assets/styles/themes.scss';
	@import '../../assets/styles/mixin.scss';

	#entrust-setting {
		height: 100vh;
		width: 100vw;
		overflow: hidden;
		font-size: var(--font_size_2);
		display: flex;
		flex-direction: column;

		.content {
			flex: 1;
			overflow-y: scroll;
			overflow-x: hidden;
			margin-top: 15px;
		}
	}
	.van-switch--on{
		@include background-theme('normal');
	}
	.m-left_10 {
		margin-left: 10px;
	}

	.m-left_15 {
		margin-left: 15px;
	}

	.font_16 {
		font-size: var(--font_size_2);
	}

	.font_17 {
		font-size: var(--font_size_1);
	}
	.flex1{
    flex:1;
		display: flex;
		justify-content: space-between;
  }
</style>

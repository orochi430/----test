<template>
	<div id="commissioner-info">
		<van-nav-bar title="专员信息" left-arrow @click-left="$router.go(-1)" />
		<van-tabs v-if="userInfo.length>1">
			<van-tab v-for="(item,index) in userInfo" :key="index" :title="item.username">
				<div class="header-container mar-top_10">
					<div class="user-avatar mar-left_30">
						<img :src="item.avatar" :onerror="default_avatar" />
					</div>
					<div class="user-name mar-left_10">
						<p class="font_15">{{item.username}}</p>
						<p class="font_14">
							<span>正在工作中</span>
							<i class="circle-green"></i>
						</p>
					</div>
					<img class="bg" src="static/images/EnterpriseServices/bg2.png" alt="">
				</div>
				<div class="item-container">
					<div class="left-tag">
						<img src="static/images/EnterpriseServices/icon-tag.png" alt="">
						<span class="font_15 mar-left_10">昵称</span>
					</div>
					<div>
						<span class="color_grey font_14">{{item.username}}</span>
					</div>
				</div>
				<div class="item-container">
					<div class="left-tag">
						<img src="static/images/EnterpriseServices/icon-phone.png" alt="">
						<span class="font_15 mar-left_10">电话</span>
					</div>
					<div>
						<span class="color_grey font_14">{{item.userphone}}</span>
					</div>
				</div>
				<div class="item-container">
					<div class="left-tag">
						<img src="static/images/EnterpriseServices/icon-place.png" alt="">
						<span class="font_15 mar-left_10">办公地址</span>
					</div>
					<div>
						<span class="color_grey font_14">{{item.place}}</span>
					</div>
				</div>
			</van-tab>
		</van-tabs>
		<div v-else-if="userInfo.length==1">
			<div class="header-container">
				<div class="user-avatar mar-left_30">
					<img :src="userInfo[0].avatar" :onerror="default_avatar" />
				</div>
				<div class="user-name mar-left_10">
					<p class="font_15">{{userInfo[0].username}}</p>
					<p class="font_14">
						<span>正在工作中</span>
						<i class="circle-green"></i>
					</p>
				</div>
				<img class="bg" src="static/images/EnterpriseServices/bg2.png" alt="">
			</div>
			<div class="item-container">
				<div class="left-tag">
					<img src="static/images/EnterpriseServices/icon-tag.png" alt="">
					<span class="font_15 mar-left_10">昵称</span>
				</div>
				<div>
					<span class="color_grey font_14">{{userInfo[0].username}}</span>
				</div>
			</div>
			<div class="item-container">
				<div class="left-tag">
					<img src="static/images/EnterpriseServices/icon-phone.png" alt="">
					<span class="font_15 mar-left_10">电话</span>
				</div>
				<div>
					<span class="color_grey font_14">{{userInfo[0].userphone}}</span>
				</div>
			</div>
			<div class="item-container">
				<div class="left-tag">
					<img src="static/images/EnterpriseServices/icon-place.png" alt="">
					<span class="font_15 mar-left_10">办公地址</span>
				</div>
				<div>
					<span class="color_grey font_14">{{userInfo[0].place}}</span>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'CommissionerInfo',
		data() {
			return {
				default_avatar: 'this.src="' + require('static/images/EnterpriseServices/default-avatar.png') + '"',
				deptId: '',
				userInfo: []
			}
		},
		created() {
			this.deptId = dsf.util.loadLocalStore('user').deptId
			this.getAllCommissioner();
		},
		mounted() {

		},
		methods: {
			getAllCommissioner(){  //获取我的专员接口
				dsf.http.post("fn/mobileDataAnalyze/getAllCommissioner", {deptid :this.deptId}).then((res) => {
					if (res.data.code == 200) {
						let data = res.data.data;
						data.forEach((item,index)=>{
							item.avatar="abc.png"
						})
						this.userInfo = data;
					} else {
						dsf.layer.toast('获取数据失败,请稍后再试')
					}
				}).catch(err => console.log(err));
			}
		},
	}
</script>

<style lang="scss" scoped>
	#commissioner-info {
		width: 100vw;
		height: 100vh;
		font-size: var(--font_size_2);
		display: flex;
		flex-direction: column;
	}

	::v-deep .van-nav-bar .van-icon {
		color: #000;
	}

	.header-container {
		display: flex;
		text-align: center;
		align-items: center;
		position: relative;
		padding: 40px 0;

		.user-avatar {
			height: 50px;
			width: 50px;
			border-radius: 50%;
			position: relative;
			z-index: 1;
			overflow: hidden;

			img {
				width: 100%;
				height: 100%;
			}
		}

		.user-name {
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			position: relative;
			z-index: 1;
			color: #FFF;
			margin: 0 10px;

			&> :nth-child(1) {
				margin-bottom: 10px;
			}

			&> :nth-child(2) {
				display: flex;
				align-items: center;
				justify-content: center;

				.circle-green {
					height: 5px;
					width: 5px;
					border-radius: 50%;
					display: inline-block;
					background-color: #79FE3A;
					margin-left: 3px;
				}
			}
		}

		.bg {
			position: absolute;
			z-index: 0;
			top: 0;
			width: 100%;
			height: 100%;
		}
	}

	.item-container {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-top: 10px;
		padding: 10px;
		background-color: #FFF;
		color: #333;

		.left-tag {
			display: flex;
			align-items: center;

			img {
				width: 18px;
				height: 18px;
			}
		}
	}

	.mar-left_3 {
		margin-left: 3px;
	}

	.mar-left_10 {
		margin-left: 10px;
	}

	.mar-left_30 {
		margin-left: 30px;
	}

	.mar-top_10 {
		margin-top: 10px;
	}

	.font_13 {
		font-size: 13px;
	}

	.font_14 {
		font-size: var(--font_size_3);
	}

	.font_15 {
		font-size: 15px;
	}

	.color_grey {
		color: #999;
	}
</style>

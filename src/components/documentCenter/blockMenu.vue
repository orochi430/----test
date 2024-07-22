<template>
	<div id="block-menu">
		<div class="menu-list-container">
			<div v-for="(item,index) in mainMenu" :key="index">
				<div class="menu-list">
					<div class="menu-title">
						<img :src="item.img">
						<div>
							<span>{{item.name}}</span>
							<div @click="openMenuList(item)">
								<span>更多</span>
								<van-icon name="arrow" />
							</div>
						</div>
					</div>
					<div class="menu-child">
						<div v-for="(itm,idx) in item.child.slice(0,4)" @click="goRoute(itm)">
							<img :src="itm.img" :onerror="default_img">
							<span>{{itm.name}}</span>
							<div class="badge" v-if="itm.badgeNum">{{itm.badgeNum | formatBadge}}</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<van-popup v-model="isShowPopup" class="child-list-container" round>
			<div ref="childListContainer">
				<div v-for="(item,index) in currentMenuList" :key="index" class="child-list" @click="goRoute(item)">
					<img :src="item.img" :onerror="default_img">
					<span>{{item.name.slice(0,5)}}</span>
					<span class="name-wrap">{{item.name.slice(5,10)}}</span>
				</div>
			</div>
		</van-popup>
	</div>
</template>

<script>
	export default {
		name: 'blockMenu',
		props: {
			mainMenu: {
				type: Array,
				default: () => []
			}
		},
		data() {
			return {
				default_img: 'this.src="' + require('static/squMenu/menu8.png') + '"',
				isShowPopup: false,
				currentMenuList: []
			}
		},
		created() {},
		mounted() {},
		methods: {
			openMenuList(data) {
				this.isShowPopup = true;
				this.currentMenuList = data.child;
				this.$nextTick(() => {
					this.$refs.childListContainer.scrollTo(0, 0);
				})
			},
			goRoute(item) {
				//app路径跳转
				console.log('菜单点击', item)
				if (item.type && item.type == 3) {
					//eval("this." + item.router + "()");
					this.openDDApp(item.router);
				} else if (item.type == 2) {
					//window.open(item.router);
					if(dsf.config.ddSetting.isDing) { // 钉钉跳转
						dd.biz.util.openLink({
							url: item.router, //要打开链接的地址
							onSuccess: function (result) {},
							onFail: function (err) {},
						});
					} else { // 非钉钉嵌入iframe
						this.$router.push({
							path: 'iframe',
							params: {
								url: item.router
							}
						})
					}
				} else {
					if (item.props) {
						if (item.props.props) {
							this.$router.push({
								path: item.router,
								query: JSON.parse(JSON.stringify(item.props)),
							});
						} else {
							this.$router.push({
								name: item.router,
								params: JSON.parse(JSON.stringify(item.props)),
							});
						}
					} else {
						this.$router.push({
							path: item.router
						});
					}
				}
			},
		},
		filters: {
			formatBadge(value) {
				return value < 99 ? value : '99+';
			}
		}
	}
</script>

<style lang="scss" scoped>
	#block-menu {
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
	}

	.menu-list-container {
		flex: 1;
		overflow: scroll;
		display: flex;
		flex-direction: column;
		padding: 20px 15px;
		background-color: #FFF;

		&>div {
			margin-bottom: 15px;
		}

		.menu-list {
			display: flex;

			.menu-title {
				position: relative;
				margin-right: 10px;

				img {
					width: auto;
					height: 110px;
				}

				&>div {
					position: absolute;
					top: 50%;
					left: 50%;
					transform: translate(-50%, -50%);
					color: #FFF;
					white-space: nowrap;
					text-align: center;
					display: flex;
					flex-direction: column;

					&>span {
						font-size: var(--font_size_1);
					}

					div {
						display: flex;
						justify-content: center;
						align-items: center;
						margin-top: 11px;
						font-size: var(--font_size_3);
						border: 1px solid #FFF;
						border-radius: 13px;
					}
				}
			}

			.menu-child {
				flex: 1;
				// display: flex;
				// flex-wrap: wrap;
				display: grid;
				grid-template-columns: 1fr 1fr;

				&>div {
					// width: 118px;
					height: 55px;
					overflow: hidden;
					box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.10);
					border-radius: 4px;
					display: flex;
					align-items: center;
					text-align: center;
					padding: 0 10px;
					position: relative;

					img {
						width: 19px;
						height: 20px;
						margin-right: 5px;
					}

					span {
						flex: 1;
						overflow: hidden;
						white-space: nowrap;
						text-overflow: ellipsis;
					}

					.badge {
						transform: scale(0.8);
						position: absolute;
						right: 0;
						top: 0;
						font-size: var(--font_size_4);
						background-color: #EE0A24;
						color: #FFF;
						padding: 0 7px;
						border-radius: 10px;
					}
				}
			}
		}
	}

	.child-list-container {
		overflow: hidden;
		height: 255px;
		width: 285px;
		padding: 15px;

		&>div {
			width: 100%;
			height: 100%;
			overflow: scroll;
		}

		.child-list {
			display: inline-flex;
			position: relative;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			text-align: center;
			height: 75px;

			img {
				width: 25px;
				height: 25px;
				margin-bottom: 7px;
			}

			span {
				width: 85px;
				white-space: normal;
			}

			.name-wrap {
				position: absolute;
				bottom: -6px;
			}
		}
	}
</style>

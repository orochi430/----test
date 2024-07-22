<template>
	<div id="app-manage-center">
		<blockMenu :mainMenu="mainMenu" v-if="isShowBlockMenu&&mainMenu.length&&!isTablet"></blockMenu>
		<blockMenuPad :mainMenu="mainMenu" v-if="isShowBlockMenu&&mainMenu.length&&isTablet"></blockMenuPad>
		<tiledMenu :mainMenu="mainMenu" v-if="!isShowBlockMenu&&mainMenu.length"></tiledMenu>
		<commonempty v-if="!mainMenu.length" />
	</div>
</template>

<script>
	import blockMenu from './blockMenu.vue'
	import blockMenuPad from './blockMenuPad.vue'
	import tiledMenu from './tiledMenu.vue'
	export default {
		name: 'appManageCenter',
		components: {
			blockMenu,
			blockMenuPad,
			tiledMenu
		},
		data() {
			return {
				mainMenu: [],
				myMenus: [],
				currentMainMenuId: this.$route.query.menuid,
				isShowBlockMenu: false,
				isTablet: false
			}
		},
		created() {
			let ua = navigator.userAgent,
				isAndroid = /(?:Android)/.test(ua),
				isFireFox = /(?:Firefox)/.test(ua);
			this.isTablet = /(?:iPad|PlayBook)/.test(ua) || (isAndroid && !/(?:Mobile)/.test(ua)) || (isFireFox && /(?:Tablet)/
				.test(ua));
			console.log(this.isTablet,navigator.userAgent)
		},
		mounted() {
			this.getMenu();
		},
		methods: {
			getMenu() { //获取应用
				let that = this;
				var mainMenuNow = [];
				if (dsf.util.loadLocalStore("mySetting")) {
					let mySettingMenu = dsf.util.loadLocalStore("mySetting")
					mySettingMenu.forEach(subItem => {
						subItem.isshow = true;
						subItem.badgeNum = 0;
						if (subItem.badge && subItem.badge != "") {
							dsf.http.post(subItem.badge, {})
								.then(result => {
									subItem.badgeNum = result.data.badge;
								})
						}
					});
					this.myMenus = mySettingMenu;
					console.log(this.myMenus)
				}
				//process.env.NODE_ENV
				if ("production" == "production") { //生产远程
					dsf.http.post("fn/newFile/shortcutDing", {})
						.then((res) => {
							let result = res.data
							result.data.forEach(item => {
								let level1Menu = {
									img: item.shortcutIcon,
									name: item.shortcutName,
									id: item.id,
									isOpen: false,
									child: []
								};
								item.children.forEach(child => {
									let agentId = child.agentid;
									try {
										if (agentId != "") {
											agentId = JSON.parse(agentId);
										}
									} catch (e) {
										agentId = {};
									}
									let level2Menu = {
										id: child.id,
										isOpen: false,
										name: child.shortcutName,
										badge: child.tip,
										router: child.actUrl,
										img: child.shortcutIcon,
										props: agentId,
										type: child.shortcutType,
										child: []
									};
									child.children.forEach(itm => {
										let level3Menu = {
											id: itm.id,
											isOpen: false,
											name: itm.shortcutName,
											badge: itm.tip,
											router: itm.actUrl,
											img: itm.shortcutIcon,
											props: agentId,
											type: itm.shortcutType,
											child: []
										};
										level2Menu.child.push(level3Menu);
									})
									level1Menu.child.push(level2Menu);
								});
								mainMenuNow.push(level1Menu);
							});
							mainMenuNow.forEach(main => {
								console.log(main.name)
								// main.img = this.getTitleImg(main.name)
								main.child.forEach(subItem => {
									subItem.badgeNum = 0;
									subItem.isshow = true;
									let hasMyMenu = that.myMenus.filter(mymenuItem => {
										return mymenuItem.name == subItem.name;
									});
									subItem.hasMyMenu = hasMyMenu.length;
									if (subItem.badge && subItem.badge != "") {
										dsf.http.post(subItem.badge, {})
											.then(result => {
												subItem.badgeNum = result.data.badge || result.data.data;
											})
									}
								});
							});
							that.mainMenu = mainMenuNow;
							console.log(that.mainMenu)
							if (this.currentMainMenuId) {
								that.getCurrentMenu();
							} else {
								this.isShowBlockMenu = true;
							}
							console.log(that.mainMenu)
						})
				} else { //本地配置
					// that.mainMenu = mainConfig.mainMenuConfig;
				}
			},
			getCurrentMenu() {
				let currentMenus = this.mainMenu.filter(item => item.id == this.currentMainMenuId);
				document.title = currentMenus[0].name
				if (currentMenus.length) {
					if (currentMenus[0].child.length > 1) {
						this.mainMenu = currentMenus[0].child;
					} else if (currentMenus[0].child.length == 1) {
						this.mainMenu = currentMenus[0].child[0].child;
					} else {
						this.mainMenu = [];
					}
				} else {
					this.mainMenu = [];
				}
				if (this.mainMenu.filter(item => item.child.length).length) {
					this.isShowBlockMenu = true;
				}
			},
			getTitleImg(data) {
				let type = ""
				switch (data) {
					case "公文管理":
						type = "gwgl";
						break;
					case "会议中心":
						type = "hyzx";
						break;
					case "督查督办":
						type = "dcdb";
						break;
					case "个人中心":
						type = "grzx";
						break;
					case "行政事务":
						type = "xzsw";
						break;
					case "政府值班":
						type = "zfzb";
						break;
					case "待办待阅":
						type = "dbdy";
						break;
					case "综合服务":
						type = "zhfu";
						break;
				}
				return type;
			}

		},
	}
</script>

<style lang="scss" scoped>
	#app-manage-center {
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		background-color: #FFF;
	}

	.van-nav-bar {
		background-color: #FFF;

		::v-deep .van-nav-bar__title {
			font-size: 18px;
		}

		::v-deep .van-icon {
			color: #000;
			font-size: 22px;
		}
	}

	.van-empty {
		::v-deep .van-empty__description {
			font-size: var(--font_size_0);
		}
	}
</style>

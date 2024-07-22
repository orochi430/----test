<template>
	<div id="tiled-menu">
		<div>
			<div v-for="(item,index) in mainMenu" :key="index" class="item-container" @click="goRoute(item)">
				<img :src="item.img" :onerror="default_img">
				<span>{{item.name}}</span>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'tiledMenu',
		props: {
			mainMenu: {
				type: Array,
				default: () => []
			},
		},
		data() {
			return {
				default_img: 'this.src="' + require('static/squMenu/menu8.png') + '"',
			}
		},
		watch: {
			mainMenu(newValue, oldValue) {
				console.log(newValue);
			}
		},
		created() {

		},
		mounted() {

		},
		methods: {
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
	}
</script>

<style lang="scss" scoped>
	#tiled-menu {
		width: 100vw;
		height: 100vh;
		display: flex;
		flex-direction: column;
		background-color: #FFF;

		&>div {
			display: grid;
			grid-template-columns: 1fr 1fr 1fr;
			grid-gap: 10px 10px;
			padding: 15px;
		}
	}

	.item-container {
		min-height: 55px;
		overflow: hidden;
		box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.10);
		border-radius: 4px;
		display: flex;
		align-items: center;
		text-align: left;
		padding: 0 10px;

		img {
			width: 19px;
			height: 20px;
			margin-right: 5px;
		}

		span {
			flex: 1;
			// overflow: hidden;
			// white-space: nowrap;
			// text-overflow: ellipsis;
		}
	}
</style>

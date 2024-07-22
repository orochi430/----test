<template>
	<div id="lock-page">
		<div class="message">
			<i class="iconfont lock">&#xe7db;</i>
			<span class="title">本设备已锁定</span>
			<span>为了保护设备安全,请联系管理员解锁</span>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'LockPage',
		data() {
			return {

			}
		},
		created() {

		},
		mounted() {

		},
		methods: {

		},
	}
</script>

<style lang="scss" scoped>
	#lock-page {
		height: 100%;
		width: 100%;
		display: flex;
		align-items: center;
		background-color: #000;
		color: #FFF;

		.message {
			width: 100%;
			display: flex;
			flex-direction: column;
			text-align: center;
			.lock {
				font-size: 55px;
			}
			.title{
				font-size: 26px;
				margin: 30px 0;
			}
		}
	}
</style>

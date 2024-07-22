<template>
	<div id="not-found">
		<div class="img-404"></div>
		<p class="notfound-p">无法打开页面</p>
		<div class="notfound-reason">
			<p>可能的原因：</p>
			<ul>
				<li>原来的页面不存在了</li>
				<li>输入的地址不正确</li>
			</ul>
		</div>
		<div class="notfound-btn-container">
			<span class="notfound-btn" @click="$router.go(-1)">返回</span>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'notFound',
		data() {
			return {

			}
		},
		created() {},
		mounted() {},
		methods: {},
	}
</script>

<style lang="scss" scoped>
	#not-found {
		width: 100vw;
		height: 100vh;
		font-size: var(--font_size_2);
		display: flex;
		flex-direction: column;
		position: relative;
		background-color: #FFF;
	}

	.img-404 {
		height: 155px;
		background: url(../../../static/squMenu/404.png) center center no-repeat;
		-webkit-background-size: 150px auto;
		margin-top: 40px;
		margin-bottom: 20px;
	}

	.notfound-p {
		line-height: 22px;
		font-size: var(--font_size_1);
		padding-bottom: 15px;
		border-bottom: 1px solid #f6f6f6;
		text-align: center;
		color: #262b31;
	}

	.notfound-reason {
		color: #9ca4ac;
		font-size: 13px;
		line-height: 13px;
		text-align: left;
		width: 210px;
		margin: 0 auto;

		p {
			margin-top: 13px;
		}

		li {
			margin-top: 10px;
			margin-left: 36px;
			list-style-type: disc;
		}
	}

	.notfound-btn-container {
		margin: 40px auto 0;
		text-align: center;

		.notfound-btn {
			display: inline-block;
			border: 1px solid #ebedef;
			background-color: #239bf0;
			color: #fff;
			font-size: 15px;
			border-radius: 5px;
			text-align: center;
			padding: 10px;
			line-height: 16px;
			white-space: nowrap;
		}
	}
</style>

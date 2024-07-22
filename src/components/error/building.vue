<template>
	<div id="not-found">
		<img :src="img" alt="">
    <div>正在建设中</div>
	</div>
</template>

<script>
	export default {
		name: 'building',
		data() {
			return {
        img: 'static/images/platform/jianshezhong.png'
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
    align-items: center;
		position: relative;
		background-color: #FFF;
    img {
      width: 240px;
      height: auto;
      margin: 100px 0 30px;
    }
	}
</style>

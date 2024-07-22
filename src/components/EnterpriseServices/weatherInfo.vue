<template>
	<div id="weather-info">
        <iframe
        width="350"
        scrolling="no"
        height="25"
        frameborder="0"
        class=" tianqi_a"
        src="https://i.tianqi.com?c=code&id=34&bgc=%23&icon=1&site=12"
      ></iframe>
        <!-- security="restricted"
        sandbox=""
        allow="fullscreen 'none'"
        allowtransparency="true" -->


		<!-- <span>{{ weatherdata.city }}</span>
		<span>图片</span>
		<span>{{ weatherdata.temperature }}</span>
		<span>|</span>
		<span>
			<span>空气质量：</span>
			<i class="air_quality">{{ weatherdata.air_quality }}</i>
		</span> -->
	</div>
</template>
<script>
	export default {
		data() {
			return {
				weatherdata: {
					city: "上海",
					date: "2014年03月21日",
					week: "星期五",
					temperature: "8℃~20℃" /*今日温度*/ ,
					weather: "晴转霾" /*今日天气*/ ,
					air_quality: "良" /*空气质量*/ ,
				},
			};
		},
		created() {
			// dsf.http.post("fn/newFile/shortcutDing", {}).then((res) => {
			//   console.log(res);
			// });
		},
	};
</script>
<style scoped>
	#weather-info{
		padding: 10px 15px;
		background-color: #FFF;
		border-bottom: 1px solid rgba(0, 0, 0, .1);
		font-size: 13px;
	}
	.air_quality {
		color: #FFF;
		padding: 3px 8px;
		background-color: #FFBB18;
		display: inline-block;
	}
    .tianqi_a{
        height: 25px;;
    }
</style>

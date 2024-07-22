<template>
<div class="controlRate">
	<van-cell >
		<van-rate 
			v-model="value.value" 
			@change="onChangeStar" 
			:count="count" 
			:size="starSize"
			:color="aColor"
			:allow-half='allowHalf'
			:readonly="readonly"
			void-icon="star"
			void-color="#eee"
		/>
	</van-cell>
</div>
	
</template>

<script>
import propMixin from "./mixin";
export default {
	mixins: [propMixin],
	name:'controlRate',
	data() {
		return {
			starNum:0,
			count:5,
			aColor:'#ffd21e',
			starSize:'20',
			allowHalf:this.metaData.extra.allowHalf,
			controlData:{

			}
		};
	},
	methods: {
		initRate(){
			// this.starNum=Number(this.value.value)
		},
		onChangeStar(value) {
			// var obj=this.value
			// obj.value=this.starNum
			// this.$emit('input',obj)
		}
	},
	created() {
		 this.value.value = Number(this.value.value)//此处不加会报错
		// this.initRate()
	},
	
}
</script>
<style lang='scss' scoped>

</style>
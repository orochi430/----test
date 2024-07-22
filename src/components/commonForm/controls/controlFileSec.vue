<template>
  <div class="box controlFileCodeBox" @click.stop='toClick("click",$event)'>
    <van-field
			class='controlFileCode'
			v-model="value.text"
			:disabled='controlData.disabled'
			:clickable='controlData.clickable'
			:placeholder="controlData.placeholder" 
			:readonly='true'
			:input-align='controlData.inputAlign'
			:left-icon="controlData.leftIcon"
			:right-icon="controlData.rightIcon"
			:border='false'
			:class='[controlData.error ? "errorInp" :""]'
			:rules="controlData.rules"
			:name="metaData&&metaData.metaId?metaData.metaId:''"
    >
			<template #label>
			</template>
			<template #button v-if='controlData.buttonSlot'>
			</template>
    </van-field>
		<control-dialog v-model='showPopup' :columns='controlData.columnsValue' @pupopClose='pupopClose' @selectItem='selectItem'></control-dialog>
  </div>
</template>

<script>
import propMixin from "./mixin";
import controlDialog from './controlDialog'
export default {
	name:'controlFileCode',
	mixins: [propMixin],
	model: {
    prop: 'value',
    event: 'input'
  },
	data(){
		return {
			showPopup:false,
			controlData:{
				inputAlign:'right',
				rules:[],
				leftIcon:'',//左icon
				rightIcon:'',//右icon
				disabled:false,
				closeable:true,
				round:true,
				placeholder:'',
				lockScroll:true,
				overlay:true,
				duration:'0.3',
				columnsValue:{//对象数组，配置每一组显示的数据
					title:'请选择',
					columns:[],
				},
			},
			readonly:false,
			currentColumns:[],
			ifFileCode:false,//是否是controlFileCode---该组件只读，不可选择
		}
	},
	components:{
		controlDialog
	},
	computed:{
		bindValue(){
			return this.value.text
		}
	},
	created(){
		this.ifFileCode=this.metaData.hasOwnProperty('readonlyValue')
		if(this.metaData.hasOwnProperty('readonlyValue')){
			this.value.text=this.metaData.readonlyValue
		}
		if(this.value.value.length<1&&JSON.stringify(this.metaData.defaultValue) != "{}"){
			var obj=this.value
			obj.value=this.metaData.defaultValue.value
			obj.text=this.metaData.defaultValue.text
			this.$emit('confirm',obj)
		}
		this.controlData.columnsValue.columns=this.metaData.enumData
		this.currentColumns=this.metaData.enumData
	},
	methods:{
		toClick(){
			if(this.readonly){
				return
			}
			if(!this.ifFileCode){//非controlFileCode组件
				this.showPopup=!this.showPopup
			}
		},
		onConfirm(value, index) {
			this.showPopup=false
			let obj={value,index}
			this.$emit('confirm',obj)
    },
    onCancel() {
			// this.showPopup=false
		},
		pupopClose(val){
			this.currentColumns=this.controlData.columnsValue.columns
		},
		selectItem(val){
			if(val.children){
				this.showPopup=true
				this.currentColumns=val.children
			}else{
				var obj=this.value
				this.currentColumns=this.controlData.columnsValue.columns
				obj.value=val.value
				obj.text=val.text
				this.$emit('input',obj)
			}
		}
	}
}
</script>
<style scoped>
.controlFileCodeBox{
	width:100%;
}
</style>
<style >
	.controlFileCodeBox .van-field__error-message{
		text-align: right;
	}
</style>
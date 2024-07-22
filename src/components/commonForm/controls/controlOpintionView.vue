<template>
    <div class="opintionView">
        <van-field
            v-model="optiontext"
            rows="2"
            autosize
            type="textarea"
            maxlength="200"
            :placeholder="optionMessage.placeholder"
            :disabled="optionMessage.privilege.editable"
            show-word-limit
            @blur="getOptions"
            @input="getOptions"
						:name="metaData&&metaData.metaId?metaData.metaId:''"
        />
    </div>
</template>
<script>
export default {
    name:'controlOpintionView',
    model:{
        prop:"options",
        event:"optionContent"
    },
    props:{
        metaData:{
            type:Object,
            default:{}
        },
        options:{
            type:Object,
            default:{}
        }
    },
    data (){
        return {
            optiontext:this.options.text,
            controlData:{
                
            }
        }
    },
    created (){
        this.optionMessage=this.metaData
    },
    computed:{
        text(){
            return this.options.text
        }
    },
    watch:{
        options(newVal,oldVal){
            this.optiontext=newVal
        }
    },
    methods:{
        getOptions (){
            let optionObj=this.options
            optionObj.text=this.optiontext,
            optionObj.value=""
            this.$emit("getOptions",optionObj)
        }
    }
}
</script>

<style lang="scss" scoped>
    .opintionView{
        width: 100%;
    }
</style>
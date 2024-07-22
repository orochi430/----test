<template>
    <div>
        <input type="textbox" v-model="bindValue"/>
    </div>    
</template>
<script>
export default {
    props:['value'],
    name:"textbox",
    data(){
        return{
            bindValue:this.value
        }
    }
}
</script>

<template>
  <div>
    <div class="box">
        <div class="ming">名称:</div>
        <div class="mingW">{{ listValue.bt }}</div>
    </div>
    <div class="box" v-if="listValue.active != 3">
        <div class="ming">所在街镇:</div>
        <div class="mingW">{{ listValue.jz }}</div>
    </div>
    <div class="box">
        <div class="ming">地址:</div>
        <div class="mingW">{{ listValue.ddm }}</div>
    </div>
    <!-- <div class="box">
        <div class="ming">电话:</div>
        <div class="mingW">{{ listValue.dh }}</div>
    </div> -->
    <div class="box" v-if="listValue.active == 3">
        <div class="ming">开放时间:</div>
        <div class="mingW">{{ listValue.kfsj}}</div>
    </div>
  </div>
</template>

<script>
export default {
    name:"partiCulars",
    data(){
        return{
            listValue:{}
        }
    },
    mounted(){
        console.log(this.$route.params);
        this.listValue = this.$route.params
    }
}
</script>

<style lang="scss" scoped>
.box{
    width: 100%;
    height: 65px;
    background: #FFFFFF;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid rgba(231,231,231,1);
    
    .ming{
        font-family: PingFangSC-Medium;
        font-size: 20px;
        color: #666666;
        letter-spacing: 0;
        line-height: 38px;
        font-weight: 500;
        margin-left: 10px;
    }
    .mingW{
        font-family: PingFangSC-Regular;
        font-size: 19px;
        color: #333333;
        letter-spacing: 0;
        text-align: right;
        line-height: 38px;
        font-weight: 400;
        margin-right: 8px;
    }
}
</style>
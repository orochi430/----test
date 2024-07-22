<template>
  <!-- 陕西批示记录  -->
  <div class="readed-list">
    <van-pull-refresh v-model="refreshing" @refresh="onRefresh" class="pushContainer">
        <div class="box" v-for="(item,index) in listValue" :key="index">
            <p class="box_text">{{item['LDPSZB.C-REPORT-LDPS-SUB-0003']}}批示：</p>
            <span class="box_text2">{{item['LDPSZB.C-REPORT-LDPS-SUB-0002']}}</span>
        </div>
    </van-pull-refresh>
  </div>
</template>

<script>
import dsf from '../../../common';
export default {
    name:"shanxiLnstructionList",
    props: ["formData", "formMeta","headTab"],
    data() {
        return {
            refreshing: false,
            listValue:[],
        }
    },
    watch:{
        headTab(newv,old){
            if(newv == "shanxiLnstructionList"){
                this.getVisit()
            }
        }
    },
    created() {
        this.initData()
        this.getVisit()
    },
    mounted(){
        this.$bus.emit("shanxiListValue", this.formMeta.parameters.pk) 
        this.$bus.on("refreshValue",(data)=>{
            this.initData()
        })
    },
    activated(){
        console.log(111);
    },
    methods:{
        onRefresh(){
            this.initData()
            setTimeout(() => {
                this.refreshing = false;
            }, 500);
        },
        //更新批示访问记录  moduleId=230607142130GwCL67ds9AIrvcVx17M&sourceId=待批示文件的主键id
        getVisit(){
            let params ={
                infoId:this.formMeta.parameters.pk,
                type:1
            }
            dsf.http.post("fn/informationDataController/updReadStatus",params).then((data)=>{
                console.log(data);
            })
        },
        initData(){
            let self = this
            self.listValue
            let params ={
                moduleId:"230607142130GwCL67ds9AIrvcVx17M",
                formId:"231128094740X4wsVlQr8Q6x4CRyxEj",
                sourceId:this.formMeta.parameters.pk,
                isPublic:'',
                limit:50,
            }
            dsf.http.post("fn/list/query?",params).then((data)=>{
                console.log(data);
                if(data.status == "200"){
                    console.log(data.data.data);
                    self.listValue = data.data.data
                }
            })
        }
    }
}
</script>

<style lang="scss" scoped>
.readed-list {
        padding: 0 0.32rem;
        background-color: #fff;
        height: 100%;
        display: flex;
        flex:1;
        flex-direction: column;
            .pushContainer{
                flex:1;
                height: 100%;
            }
        }
    .box{
        background: #ffffff;
        border-bottom: 1px solid #e6e6e6;
        box-shadow: 0px 0px 6px 0px rgba(0, 0, 0, 0.08);
        border-radius: 3px;
        margin-bottom: 15px;
        
        overflow: hidden;
        .box_text{
            color: #2271B3;
            font-size: 14px;
        }
        .box_text2{
            font-size: 17px;
        }
    }
</style>
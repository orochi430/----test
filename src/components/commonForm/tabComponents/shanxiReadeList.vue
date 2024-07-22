<template>
    <!-- 陕西一体化政务专报 访问记录 批示记录 -->
  <div class="readed-list">
    <van-tabs v-model="active" class="tabsContainer" @click="onClick(active)">
        <van-tab title="信息访问记录">
            <van-pull-refresh v-model="refreshing" @refresh="onRefresh" class="pushContainer">
                <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
                    <van-row v-if="listValue.length > 0" class="readed-data-header">
                        <van-col span="6" class="readed-header-col">访问人</van-col>
                        <van-col span="9" class="readed-header-col">首次访问</van-col>
                        <van-col span="9" class="readed-header-col">最新访问</van-col>
                    </van-row>
                    <van-row class="readed-data-item" v-for="(item,index) in listValue" :key="index">
                        <van-col span="6" class="readed-header-col" style="padding-left:5px;">{{item['C-OA-ZBYQ-REC-0002']}}</van-col>
                        <van-col span="9" class="readed-header-col">{{item['23110116452072yOD5Jd5wJRYBrELbe']}}</van-col>
                        <van-col span="9" class="readed-header-col">{{item['231101164624StuGKtMb14EDbL946vO']}}</van-col>
                    </van-row>    
                </van-list>
            </van-pull-refresh>
        </van-tab> 
        <van-tab title="批示访问记录">
            <van-pull-refresh v-model="refreshing_pi" @refresh="onRefresh_pi" class="pushContainer">
                <van-list v-model="loading_pi" :finished_pi="finished_pi" finished-text="没有更多了" @load="onLoad_pi">
                    <van-row v-if="listValue.length > 0" class="readed-data-header">
                        <van-col span="6" class="readed-header-col">访问人</van-col>
                        <van-col span="9" class="readed-header-col">首次访问</van-col>
                        <van-col span="9" class="readed-header-col">最新访问</van-col>
                    </van-row>
                    <van-row class="readed-data-item" v-for="(item,index) in listValue_pi" :key="index">
                        <van-col span="6" class="readed-header-col" style="padding-left:5px;">{{item['C-OA-ZBYQ-REC-0002']}}</van-col>
                        <van-col span="9" class="readed-header-col">{{item['231101164658l2lz2GoTaHOa0fYb3kO']}}</van-col>
                        <van-col span="9" class="readed-header-col">{{item['231101164727cXKGnmT3cKmv4bjNPvU']}}</van-col>
                    </van-row>    
                </van-list>
            </van-pull-refresh>
        </van-tab>    
    </van-tabs>    
  </div>
</template>

<script>
export default {
    name:"shanxiReadeList",
    props:["formData","formMeta","headTab"],
    data(){
        return {
            active:0,
            refreshing:false,
            finished:false,
            loading:false,
            listValue:[], //要情访问记录
            refreshing_pi:false,
            finished_pi:false,
            loading_pi:false,
            listValue_pi:[],
        }
    },
    watch:{
        headTab(newv,olw){
            if(newv == "shanxiReadeList"){
                this.onClick(this.active)
            }
        }
    },
    created(){
    },
    mounted(){
        this.onClick(0)
    },
    methods:{
        onClick(active){
            if(active == 0){
                this.listValue =[]
                let params ={
                    moduleId:'220317155454bLRlymvwV3f69UMhUCe',
                    formId:"231030151953UI7WVpttrb3tggJ2UJM",
                    FID:this.formMeta.parameters.pk,
                    limit:50,
                }
                dsf.http.post("fn/list/query?",params).then((data)=>{
                    if(data.status == '200'){
                        this.listValue = data.data.data
                    }
                })
            }else if(active == 1){
                this.listValue_pi =[]
                let params ={
                    moduleId:'220317155454bLRlymvwV3f69UMhUCe',
                    formId:"231030152256Es1kCfmFx0zzfYAtPYV",
                    FID:this.formMeta.parameters.pk,
                    limit:50,
                }
                dsf.http.post("fn/list/query?",params).then((data)=>{
                    if(data.status == '200'){
                        this.listValue_pi = data.data.data
                    }
                })
            }
            
        },
        //下拉刷新
        onRefresh(){
            this.onClick(this.active)
            this.refreshing = false
        },
        //列表异步加载数据
        onLoad(){
            this.loading = false;
        },
        onLoad_pi(){
            this.loading_pi = false;
        },
        onRefresh_pi(){
            this.onClick(this.active)
            this.refreshing_pi = false
        },
    },


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
        .tabsContainer{
         height: 100%;
            display: flex;
            flex:1;
            flex-direction: column;
            .pushContainer{
                flex:1;
                height: 100%;
            }
        }
        
        .readed-header{
            line-height: 1rem;
        }
        .readed-data-header{
            margin-top:5px ;
            background-color: #d4d4d4;
            border: 1px solid #d5d5d5;
            height: 35px;
            display: flex;
            align-items: center;
            >>>.readed-header-col{
                text-align: center;
                line-height: 35px;
            }
        }
        .readed-data-item{
            border-left: 1px solid #d5d5d5;
            border-right: 1px solid #d5d5d5;
            border-bottom: 1px solid #d5d5d5;
            height: 35px;
            display: flex;
            align-items: center;
            >>>.readed-col{
                text-align: center;
                line-height: 0.6rem;
                border-right: 1px solid #d5d5d5;
                font-size: 12px;
            }
        }
    }
</style>
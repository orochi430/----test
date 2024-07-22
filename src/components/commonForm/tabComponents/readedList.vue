<template>
    <div class="readed-list">
        <van-tabs v-model="active" class="tabsContainer" @click="onClick(active)">
            <van-tab title="要情访问记录">
                <van-pull-refresh v-model="yq_refreshing" @refresh="yq_onRefresh" class="pushContainer">
                <van-list
                v-model="yq_loading"
                :finished="yq_finished"
                finished-text="没有更多了"
                @load="yq_onLoad"
                :immediate-check="false">
                    <van-row v-if="yq_list.length>0" class="readed-data-header">
                        <van-col span="6" class="readed-header-col">访问人</van-col>
                        <van-col span="9" class="readed-header-col">首次访问</van-col>
                        <van-col span="9" class="readed-header-col">最新访问</van-col>
                    </van-row>
                    <van-row   class="readed-data-item" v-for="(item,idex) in yq_list" :key="idex" >
                        <van-col span="6" class="readed-col" style="padding-left:5px;">{{item.sourceName}}</van-col>
                        <van-col span="9" class="readed-col">{{item.createTime|dateFormat}}</van-col>
                        <van-col span="9" class="readed-col">{{item.actTime|dateFormat}}</van-col>
                    </van-row>
                    <commonempty v-if="yq_noRecord" description="暂无记录" />
                </van-list>
                </van-pull-refresh>
            </van-tab>
            <van-tab title="批示访问记录">
                <van-pull-refresh v-model="yqps_refreshing" @refresh="yqps_onRefresh" class="pushContainer">
                <van-list
                v-model="yqps_loading"
                :finished="yqps_finished"
                finished-text="没有更多了"
                @load="yqps_onLoad"
                :immediate-check="false"
                >
                    <van-row  v-if="yqps_list.length>0" class="readed-data-header">
                        <van-col span="6" class="readed-header-col">访问人</van-col>
                        <van-col span="9" class="readed-header-col">首次访问</van-col>
                        <van-col span="9" class="readed-header-col">最新访问</van-col>
                    </van-row>
                    <van-row   class="readed-data-item" v-for="(item,idex) in yqps_list" :key="idex" >
                        <van-col span="6" class="readed-col" style="padding-left:5px;">{{item.sourceName}}</van-col>
                        <van-col span="9" class="readed-col">{{item.createTime|dateFormat}}</van-col>
                        <van-col span="9" class="readed-col">{{item.actTime|dateFormat}}</van-col>
                    </van-row>
                    <commonempty v-if="yqps_noRecord" description="暂无记录" />
                </van-list>
                 </van-pull-refresh>
            </van-tab>
        </van-tabs>
    </div>
</template>
<script>
// --获取已读记录
// ctr/sx/schedule/getViewLog
// 参数：pk
export default {
    name:"readedList",
    props:["formData","formMeta"],
    data(){
        return {
            active:0,
            yq_refreshing:false,
            yq_noRecord:false,
            yq_loading:false,
            yq_finished:false,
            yq_list:[],
            yq_start:0,
            yq_startindex:0,
            yq_limit:20,

            yqps_refreshing:false,
            yqps_noRecord:false,
            yqps_loading:false,
            yqps_finished:false,
            yqps_list:[],
            yqps_start:0,
            yqps_startindex:0,
            yqps_limit:20,
            Interval:"",
        }
    },
    filters: {
        dateFormat(val) {
            return dsf.date.format(val, 'yyyy-mm-dd hh:ii');
        }
    },
    created() {
        this.$bus.on("emitYq", () => {
            this.yq_initData()
        })
        this.$bus.on("emitPs", () => {
            this.yqps_initData()
        })
        this.onClick()
    },
    methods:{
        onClick(active){
            clearInterval(this.Interval)
            let type = active ? "yqps" : "yq"
            this.getViewLog(type)
            this.Interval = setInterval(()=>{this.getViewLog(type)},10000)
        },
        getViewLog(type){
            dsf.http.post('fn/sx/schedule/getViewLog', {
                start: 0,
                limit: (this[`${type}_startindex`]+1)*this[`${type}_limit`],
                type: type,
                pk: this.formMeta.parameters.pk
            }).then((res) => {
                if (!res.data || res.data.data.length == 0) {
                    this[`${type}_finished`] = true;
                    clearInterval(this.Interval)
                }else{
                    this[`${type}_list`] = res.data.data
                }
            })
        },
        yq_onLoadHandle(){
            let self=this;
            let params = {
                start: self.yq_start,
                limit: self.yq_limit,
                type:"yq",
                pk: self.formMeta.parameters.pk
            }
            dsf.http.post('fn/sx/schedule/getViewLog',params).then(res => {
                
                if (!res) {
                    return;
                }

                if (self.yq_refreshing) {
                    self.yq_list = [];
                    self.yq_refreshing = false;
                }

                
                if(res.data.type=="success"){
                    if (self.yq_list.length > 0) {
                        self.yq_list = [...self.yq_list, ...res.data.data]
                    } else {
                        self.yq_list = res.data.data
                    }
                }
                else 
                {
                    self.dsf.layer.toast(res.message);
                }
                self.yq_loading = false;
                if (!res.data || res.data.data.length == 0) {
                    self.yq_finished = true;
                    return;
                }

                // if(res.data.type=="success"){
                //     self.yq_list=res.data.data;
                //     self.yq_finished=true;
                // }
            }).catch(res => {
                    self.dsf.layer.toast(res.message);
                })
                .finally(() => {});
        },
        yq_onLoad(){
            let self=this;
            this.yq_startindex++
            this.yq_start = this.yq_startindex * this.yq_limit;
            self.yq_onLoadHandle();
        },
        yq_initData() {
            this.yq_loading = true;
            this.yq_finished = false;
            this.yq_start = 0
            this.yq_startindex = -1
            this.yq_list = [];
            //this.yq_onLoadHandle()
            this.yq_onLoad()
        },
        yq_onRefresh() {
            // 清空列表数据
            // 重新加载数据
            // 将 loading 设置为 true，表示处于加载状态
            // this.yq_loading = true;
            //this.yq_onLoad();
            this.yq_initData();
        },
        //-/---------------------------
        yqps_onLoadHandle(){
            let self=this;
            let params = {
                start: self.yqps_start,
                limit: self.yqps_limit,
                type:"yqps",
                pk: self.formMeta.parameters.pk
            }
            dsf.http.post('fn/sx/schedule/getViewLog',params).then(res => {
                self.yqps_loading = false;
                if (!res) {
                    return;
                }

                if (self.yqps_refreshing) {
                    self.yqps_list = [];
                    self.yqps_refreshing = false;
                }

                //let arr = [];
                if (!res.data || res.data.data.length == 0) {
                    self.yqps_finished = true;
                    return;
                }
                if(res.data.type=="success"){
                    if (self.yqps_list.length > 0) {
                        self.yqps_list = [...self.yqps_list, ...res.data.data]
                    } else {
                        self.yqps_list = res.data.data
                    }
                }else 
                {
                    self.dsf.layer.toast(res.message);
                }

                // if(res.data.type=="success"){
                //     self.yqps_list=res.data.data;
                //     self.yqps_finished=true;
                // }
            }).catch(res => {
                    self.dsf.layer.toast(res.message);
                })
                .finally(() => {});
        },
        yqps_onLoad(){
            let self=this;
            this.yqps_startindex++
            this.yqps_start = this.yqps_startindex * this.yqps_limit;
            self.yqps_onLoadHandle();
        },
        yqps_initData() {
            this.yqps_loading = true;
            this.yqps_finished = false;
            this.yqps_start = 0
            this.yqps_startindex = -1
            this.yqps_list = [];
            //this.yqps_onLoadHandle()
            this.yqps_onLoad();
        },
        yqps_onRefresh() {
            this.yqps_initData();
        },
    },
    beforeDestroy(){
        clearInterval(this.Interval)
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
        .tabsContainer{
         height: 100%;
            display: flex;
            flex:1;
            flex-direction: column;
            .pushContainer{
                flex:1;
                // height: 100%;
            }
        }
        
        .readed-header{
            line-height: 1rem;
        }
        .readed-data-header{
            margin-top:5px ;
            background-color: #d4d4d4;
            border: 1px solid #d5d5d5;
            >>>.readed-header-col{
                text-align: center;
                line-height: 0.6rem;
            }
        }
        .readed-data-item{
            border-left: 1px solid #d5d5d5;
            border-right: 1px solid #d5d5d5;
            border-bottom: 1px solid #d5d5d5;
            >>>.readed-col{
                text-align: center;
                line-height: 0.6rem;
                border-right: 1px solid #d5d5d5;
                font-size: var(--font_size_4);
            }
        }
    }
</style>
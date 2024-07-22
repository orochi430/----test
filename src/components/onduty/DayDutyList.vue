<template>
  <div>
      <van-list
        v-model="loading"
        :error.sync="error"
        error-text="请求失败，点击重新加载"
        :offset="10"
        :finished="finished"
        :immediate-check="false"
        class="list_wrap"
        @load="onLoad"
        >
        <!-- <van-cell v-for="(item,idx) in list" :key="idx" :title="item.deptName" /> -->
        <van-row gutter="20"  v-for="(item,idx) in list" :key="idx">
            <van-col span="8">{{item.userName}}</van-col>
            <van-col span="16">{{item.deptName}}</van-col>
        </van-row>
        </van-list>
         <commonempty v-if="list.length == 0 && finished"></commonempty>
  </div>
</template>

<script>
export default {
    name:"DayDutyList",
    props:{},
    data(){
        return{
            list: [],
            error: false,
            loading: false,
            finished:false
        }
    },
    watch: {
    },
    created(){},
    methods:{
        onLoad(sdate,edate) {
            // this.list = [];
            // this.loading = true;
            // this.finished = false;
            // this.dsf.http.get(`fn/mobileholiday/ondutyData?date=${sdate}`,{}).then(res=>{
            //     if(res.data.code=="200"){
            //         let resData=res.data.data;
            //         for (let i = 0; i < resData.length; i++) {
            //             this.list.push(resData[i]);
            //         }
            //         this.finished=true;
            //         this.loading = false;
            //     }
            // });
        },
        initfn(sdate, edate) {
            console.log("initfn",sdate, edate);
            this.onLoad(sdate,edate);
        }
    }
}
</script>

<style>

</style>
<template>
    <div class="contaniner">
        <div v-if="errored" class="init-div">
            数据获取失败，请稍后重试！
        </div>
        <commonempty v-else-if="bOk" description="您近期无会议安排" />
    </div>
</template>

<script>
export default {
    data () {
        return {
            loading: null,
            meetings: [],
            bOk:false,
            errored:false
        };
    },
    created () {
        this.init();
    },
    methods: {
        init () {
            this.loading = dsf.layer.loading();
            dsf.http.post(`fn/conferenceMobile/meetingList`).done(res => {
                    this.meetings = res.datas;
                    if(res.datas.length>0){
                        this.bOk = false;
                        let meetingId = res.datas[0].dataValue.id;
                        this.$router.replace({path:'/conferenceIndex', query:{id:meetingId}})
                    }else{
                        this.bOk = true;
                    }
                })
                .error(error => {
                    this.bOk = true;
                    console.log("meetingInfo-error", error);
                })
                .always(() => {
                    dsf.layer.closeLoading(this.loading);
                });
        }

    }
};
</script>

<style lang="scss" scoped>
.init-div {
    position: absolute;
    width: 100%;
    height: 20px;
    line-height: 20px;
    margin-top: -20px;
    top: 50%;
    left: 0;
    font-size: var(--font_size_2);
    color: #7f7a7a;
    text-align: center;
}
</style>

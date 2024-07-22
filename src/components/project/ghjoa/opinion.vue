<template>
    <!-- 反馈 -->
    <div class="feedback_page">
        <!-- 内容区 -->
        <scroller class="contents_part" :on-refresh="refresh">
            <div class="content" v-for="(items,index) in feedback_list" :key="index">
                <p style="margin: 0">{{items.wtbt}}</p>
                <p style="margin-top: 3px">
                    <span class="text_color">建议：</span
                    >{{items.fknr}}
                </p>
                <p>
                    <span class="text_color2">反馈：</span
                    >{{items.hfnr}}
                </p>
            </div>
        </scroller>
    </div>
</template>

<script>
export default {
    name: "feedback_page",
    data() {
        return {
            feedback_list: [],  //反馈的列表数据
        };
    },
    created() {
        this.getFeedBackData();
    },
    methods: {
        refresh(done) {
            //刷新数据
            this.getFeedBackData(done);
        },
        infinite(done) {
            //加载数据
            this.getFeedBackData(done);
        },
        getFeedBackData(done) { //获取反馈数据
            dsf.http.post(`fn/flfgyd/conutfk?yhid=${dsf.util.loadSessionStore("user").user_id}`).then(
                (res)=>{
                    this.feedback_list=res.data.data;
                    if (done) {
                        done(true);
                    }
                }
            );
        }
    }
};
</script>


<style lang="scss" scoped>
.feedback_page {
    height: calc(100vh - 0.93rem);
    width: 100%;
    background-color: #f7f7f7;
    // position: static;
    .text_color {
        color: #2793ff;
    }
    .text_color2 {
        color: #ff3030;
    }
    .contents_part {
        padding: 0 5% 5%;
    }
    .content {
        background-color: #fff;
        padding: 15px;
        border-radius: 6px;
        margin-bottom: 15px;
        p:last-child {
            margin: 0;
            padding-top: 1em;
            border-top: 1px dashed #d2d2d2;
        }
    }
}
</style>
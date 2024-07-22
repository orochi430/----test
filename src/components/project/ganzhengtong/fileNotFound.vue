<template>
    <div class="fileNotFound-page">
        <!-- 通用错误 -->
        <commonempty image="error" description="该文件已被删除">
            <van-button type="primary" round class="bottom-button" @click="close">返回</van-button>
        </commonempty>
    </div>
</template>

<script>
export default {
    name: "fileNotFound",
    data() {
        return {
            desc: "该文件已被删除",
            user: dsf.util.loadSessionStore("user")
        };
    },
    created() {
        this.init();
    },
    methods: {
        close() {
            window.dd?.closePage();
            // dsf.dd?.closePage();
        },
        init() {
            let self = this;
            dsf.http.get(`fn/govUser/toBeDoneByUser`, { user_id: self.user?.user_id })
                .done(res => {
                    if (res.type == "success") {
                        console.log("getInbox-success");
                    }
                }).error(err => {
                    console.log("getInbox-err", err);
                })
        }
    }
};
</script>


<style lang="scss" scoped>
.fileNotFound-page {
    // height: 80vh;
    // display: flex;
    // align-items: center;
    // justify-content: center;
    // height: calc(100vh - 0.93rem);
    // width: 100%;

    // background-color: #f7f7f7;
    .bottom-button {
        width: 3.2rem;
        height: 0.8rem;
    }

    .content {
        // background-color: #fff;
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
<template>
<!-- //拒签 -->
<div class="df-rejected-sign">
    <!-- <div class="_header">
      <van-nav-bar fixed title="拒签理由" />
    </div> -->
    <div class="_content">
        <van-field v-model="reasonMessage" autosize type="textarea" placeholder="请输入拒签理由" class="_textarea" />
    </div>
    <div class="_footer">
        <van-button type="info" size="large" @click="handleRightClick">确认拒签</van-button>
    </div>
</div>
</template>

<script>
export default {
    name: "RejectedSign",
    data() {
        return {
            reasonMessage: '',
            paramsObj: null
        };
    },
    created() {},
    mounted() {
        this.paramsObj = this.$route.params.data.dataValue;
    },
    methods: {
        handleRightClick() {
            if (!this.reasonMessage.length) {
                dsf.layer.toast("请输入拒签理由")
                return
            }
            let self = this;
            dsf.http
                .post('fn/remoteExchange/reject', {
                    moduleId: this.paramsObj['A0004'], // "190313143112jfLuUxrc19Dchhv4BPU"
                    pk: this.paramsObj['A0001'], // "200515020738Q0hS4YqkVKVpdxp4Ypy"
                    reason: this.reasonMessage
                })
                .done(res => {
                    this.$eventBus.refresh(self, {
                        text: 123
                    });
                    this.$router.go(-1);
                })
                .error(error => {
                    self.dsf.layer.toast("请求失败", error);
                });
        }
    }
};
</script>

<style lang="scss" scoped>
@import "../../assets/styles/themes.scss";
@import "../../assets/styles/mixin.scss";

::v-deep.df-rejected-sign {
    display: flex;
    flex-direction: column;

    * {
        box-sizing: border-box;
    }

    ._header {
        height: 44px;
        @include font_4(true);
        color: #000;
    }

    ._content {
        margin: 15px 0;
        height: calc(100vh - 149px);
        overflow-y: auto;
        background: #fff;

        ._textarea {
            padding: 22px 14px;
            @include font_4(true);
            color: #999999;
        }
    }

    ._footer {
        position: fixed;
        bottom: 0;
        height: 75px;
        left: 0;
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        background: #fff;
        padding: 0 15px;

        .van-button {
            border-radius: 12px;
        }
    }
}
</style>

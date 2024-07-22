<template>
<div>
    <van-tabs v-if="isShowTab&&showFile" v-model="active">
        <van-tab title="会议信息">
            <common-form :_pk="meetingPk" :_module-id="meetingModuleId"></common-form>
        </van-tab>
        <van-tab title="相关议题">
            <!-- <common-form :_pk="topicPk" :_module-id="topicModuleId" :_form-id="topicFormId"></common-form> -->
            <!-- <topic :pk="meetingPk"></topic> -->
            <meettingTopic :formData="formData"></meettingTopic>
        </van-tab>
    </van-tabs>
    <common-form v-if="!showFile" :_pk="meetingPk" :_module-id="meetingModuleId"></common-form>
</div>
</template>

<script>
import commonForm from "@/components/commonForm/commonForm";
import meettingTopic from '@/components/commonForm/tabComponents/meettingTopic'
import topic from "./topic";
export default {
    components: {
        commonForm,
        topic,
        meettingTopic
    },
    data() {
        return {
            loading: null,
            meetingPk: this.$route.params.pk,
            meetingModuleId: this.$route.params.moduleId,
            topicPk: undefined,
            topicModuleId: undefined,
            topicFormId: this.$route.query.topicFormId,
            tabType: this.$route.query.tabType || "0", // 0会议通知，1会议申请
            active: this.$route.query.tabIdx || 0,
            isShowTab: false,
            formData: {
                main: {
                    "A0001": {
                        value: this.$route.params.pk
                    }
                }
            },
            showFile: false
        };
    },
    created() {
        let self = this;
        self.loading = dsf.layer.loading();
        self.getTabs();
        self.checkFiles();
    },
    methods: {
        // 判断有没有议题 有的话再显示议题
        checkFiles() {
            let self = this
            dsf.http.post('/fn/meetingNotice/getTopic', {
                pk: this.$route.params.pk
            }).then(res => {
                console.log(res)
                if (res.data.code == 200 && res.data.data.length > 0) {
                    self.showFile = true;
                }
            })
        },
        // 获取tab相关参数
        getTabs() {
            let self = this;
            if (self.tabType == "0") { // 会议通知
                dsf.http
                    .post(`fn/meetingApply/getSqData`, {
                        pk: self.meetingPk,
                        moduleId: self.meetingModuleId
                    })
                    .done(result => {
                        //console.log(result);
                        if (result.code == 200 && result.data) {
                            self.isShowTab = true;
                            console.log("getSqData", result.data);
                            self.topicPk = result.data.pk;
                            self.topicModuleId = result.data.moduleId;
                        } else if (result.code == 500) { // 接口返回500表示关联不到会议申请，不显示议题tab
                            self.$router.replace({
                                path: `/commonForm/${self.meetingModuleId}/${self.meetingPk}`,
                                query: this.$route.query
                            })
                        } else {
                            dsf.layer.toast("数据获取失败！");
                        }
                    })
                    .error(error => {
                        // self.errored = true;
                        console.log("error", error);
                        dsf.layer.toast("数据获取失败！");
                    })
                    .always(() => {
                        dsf.layer.closeLoading(self.loading);
                    });
            } else if (self.tabType == "1") { // 会议申请
                self.isShowTab = true;
                self.topicPk = self.meetingPk;
                self.topicModuleId = self.meetingModuleId;
                dsf.layer.closeLoading(self.loading);
            }
        }
    }
};
</script>

<style lang="scss" scoped>

</style>

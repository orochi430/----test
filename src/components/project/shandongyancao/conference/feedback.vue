<template>
<div class="feedback flex">
    <div class="notice">
        <!-- 会务系统使用意见反馈<br>
        为做好会务系统平台建设，请提出您的宝贵意见。谢谢！ -->
        请对会务有关工作提出您的意见建议。谢谢！
    </div>
    <!-- 新建反馈 -->
    <template v-if="!$route.params.id">
        <!-- <div class="feedback-box">
            <div class="title">反馈类型</div>
            <van-radio-group v-model="type">
                <van-radio v-for="item in radios" :key="item.id" :name="item.id">{{item.text}}</van-radio>
            </van-radio-group>
        </div> -->
        <div class="feedback-box">
            <div class="title">意见建议内容</div>
            <van-field v-model="content" placeholder="请输入内容" type="textarea" rows="8" />
        </div>
    </template>
    <!-- 反馈详情 -->
    <div v-else class="flex1 flex">
        <div class="feedback-box">
            <!-- <div class="title">反馈类型</div>
            <div class="text">{{type}}</div> -->
            <div class="title">反馈内容</div>
            <div class="text">{{ content }}</div>
            <div v-if="reply">
                <van-divider />
                <div class="title">回复内容</div>
                <div class="text" v-html="reply"></div>
            </div>
        </div>
    </div>
    <div v-if="!$route.params.id" class="btn-container">
        <van-button :disabled="btnDisabled" class="btn" type="info" @click="showSelGrp = true">提交建议意见</van-button>
    </div>
    <van-popup v-model="showSelGrp" :style="{ height: '50vh' }" position="bottom" round>
        <div style="width:100%;">
            <van-picker :columns="groupCols" title="发送给" show-toolbar value-key="name" @confirm="onGrpConfirm" @cancel="showSelGrp = false" />
        </div>
    </van-popup>
</div>
</template>

<script>
export default {
    data() {
        return {
            type: 1,
            radios: [{
                id: 1,
                text: '日常使用'
            }, {
                id: 2,
                text: '平台功能'
            }, {
                id: 3,
                text: '意见建议'
            }, {
                id: 4,
                text: '其他'
            }],
            content: '',
            reply: '',
            loading: null,
            showSelGrp: false,
            groupCols: [],
            orgId: '',
            orgName: '',
            btnDisabled: false
        }
    },
    created() {
        let self = this;
        self.loading = dsf.layer.loading();
        if (self.$route.params.id) {
            self.getSuggestionDetail();
        } else {
            self.getMeetingOrgs();
        }
    },
    mounted() {},
    // deactivated() {
    //     self.$eventBus.refreshNPC(self, {
    //         name: "peopleCongressFeedback"
    //     });
    // },
    methods: {
        // 提交意见
        submit() {
            let self = this;
            if (!self.content) {
                dsf.layer.toast("请填写意见建议内容！");
            } else {
                self.btnDisabled = true;
                dsf.http
                    .post(`fn/peopleCongress/suggestionSubmit`, {
                        type: self.type,
                        typeName: '',
                        orgId: self.orgId,
                        orgName: self.orgName,
                        content: self.content,
                        meetingId: self.$route.params.meetingId
                    })
                    .done(result => {
                        // result = result.data;
                        //console.log(result);
                        if (result.code == 200) {
                            dsf.layer.toast("您的意见已提交！", true, () => {
                                self.$router.go(-1);
                            });
                        }
                    })
                    .error(error => {
                        // console.log(error);
                        dsf.layer.toast("提交失败！");
                        self.btnDisabled = false;
                    })
                    .always(() => {
                        // dsf.layer.closeLoading(self.loading);
                    });
            }
        },
        // 获取意见详情
        getSuggestionDetail() {
            let self = this;
            // if (self.$route.params.id) {
            dsf.http
                .post(`fn/peopleCongress/suggestionDetail`, {
                    suggestionId: self.$route.params.id
                })
                .done(result => {
                    // result = result.data;
                    //console.log(result);
                    if (result.code == 200 && result.data) {
                        self.type = result.data.type;
                        self.content = result.data.content;
                        self.reply = result.data.reply;
                    }
                })
                .error(error => {
                    // console.log(error);
                    // dsf.layer.toast("数据获取失败！");
                })
                .always(() => {
                    dsf.layer.closeLoading(self.loading);
                });
            // }
        },
        // 获取会议机构
        getMeetingOrgs() {
            let self = this;
            // if (!self.$route.params.id) {
            dsf.http
                .post(`fn/peopleCongress/meetingOrgs`, {
                    meetingId: self.$route.params.meetingId
                })
                .done(result => {
                    // result = result.data;
                    //console.log(result);
                    if (result.code == 200 && result.data) {
                        let _arr = [];
                        result.data.map((item, index) => {
                            if (!item.children) {
                                item.children = [];
                            }
                            item.children.unshift({
                                id: "",
                                name: ""
                            });
                            _arr.push(item);
                        });
                        self.groupCols = _arr;
                    }
                })
                .error(error => {
                    // console.log(error);
                    // dsf.layer.toast("数据获取失败！");
                })
                .always(() => {
                    dsf.layer.closeLoading(self.loading);
                });
            // }
        },
        // 选择小组
        onGrpConfirm(val, idx) {
            let self = this;
            // dsf.layer.toast(`当前值：${val}, 当前索引：${idx}`);
            // console.log(`当前值：${val}, 当前索引：${idx}`);
            self.showSelGrp = false;
            // console.log(self.groupCols[idx[0]].id + ',' + self.groupCols[idx[0]].children[idx[1]].id);
            // let orgId;
            if (self.groupCols[idx[0]].children[idx[1]].id) {
                self.orgId = self.groupCols[idx[0]].children[idx[1]].id;
                self.orgName = self.groupCols[idx[0]].children[idx[1]].name;
            } else {
                self.orgId = self.groupCols[idx[0]].id;
                self.orgName = self.groupCols[idx[0]].name;
            }
            self.submit();
        }
    },
    // beforeRouteLeave(to, from, next) {
    //     let self = this;
    //     // 刷新意见列表
    //     self.$eventBus.refreshNPC(self, {
    //         name: "peopleCongressFeedback"
    //     });
    //     next();
    // }
}
</script>

<style lang="scss" scoped>
.feedback {
    height: 100%;
}

.flex {
    display: flex;
    flex-direction: column;
}

.flex1 {
    flex: 1;
}

.notice {
    padding: 0.24rem 0.32rem;
    background-color: #FFFDF8;
    color: #F9B552;
    font-size: var(--font_size_2);
}

.btn-container {
    background-color: #fff;
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    padding: 12px;

    .btn {
        width: 100%;
        background-color: #E91619;
        border: none;
    }
}

.feedback-box {
    background-color: #fff;
    margin-top: 0.24rem;
    padding: 0.4rem 0.32rem;
}

.title {
    font-size: var(--font_size_2);
    font-weight: bold;
}

.text {
    padding-top: 0.24rem;
    font-size: var(--font_size_2);
}

.van-field {
    font-size: var(--font_size_2);
}

.van-divider {
    padding: 0.24rem 0;
}

::v-deep .van-radio {
    padding-top: 0.4rem;
}

::v-deep .van-cell {
    padding: 0.2rem 0;
}
</style>

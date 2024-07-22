<template>
<div v-if="errored" class="init-div">{{ errorMsg }}</div>
<div v-else>
    <van-cell :value="docInfo.docCode" center title="文件编号" />
    <van-cell :value="docInfo.recDept" center title="接收部门" />
    <van-cell :value="docInfo.deliDate" center title="派发日期" />
    <!-- <van-dialog v-model="show" title="文件归还登记" confirm-button-text="确认归还" theme="round-button" @confirm="revert">
        <div class="info">
            <p>文件编号：{{ docInfo.docCode }}</p>
            <p>接收部门：{{ docInfo.recDept }}</p>
            <p>派发日期：{{ docInfo.deliDate }}</p>
        </div>
    </van-dialog> -->
    <div style="height: 1.2rem">
        <div v-if="isReceive" class="btn-container">
            <van-button type="info" @click="receive()">确认领取</van-button>
        </div>
        <div v-else class="btn-container">
            <van-button type="info" @click="revert()">确认归还</van-button>
        </div>
    </div>
</div>
</template>

<script>
// import store from "@/common/util";
export default {
    data() {
        return {
            errored: false,
            errorMsg: "获取数据失败！",
            loading: null,
            docId: this.$route.params.id,
            docInfo: null,
            isReceive: false
        };
    },
    created() {
        let self = this;
        self.loading = dsf.layer.loading();
        self.getDocInfo();
    },
    mounted() {},
    methods: {
        // 归还文件
        revert() {
            let self = this;
            self.$dialog.confirm({
                    title: '提示',
                    message: '确认回收该文件？',
                })
                .then(() => {
                    // on confirm
                    dsf.http
                        .get(`fn/fileCheckIn?fileId=${self.docId}`)
                        .done(result => {
                            // result = result.data;
                            if (result.code == 200) {
                                dsf.layer.toast(`操作成功！`, true, function () {
                                    self.$router.replace({
                                        name: "PeopleDailyDocStatus",
                                        params: {
                                            id: self.docId
                                        }
                                    });
                                });
                            } else {
                                self.errored = true;
                                self.errorMsg = result.message;
                            }
                        })
                        .error(error => {})
                        .always(() => {
                            // dsf.layer.closeLoading(self.loading);
                        });
                })
                .catch(() => {
                    // on cancel
                });
        },
        // 领取文件
        receive() {
            let self = this;
            self.$dialog.confirm({
                    title: '提示',
                    message: '确认领取该文件？',
                })
                .then(() => {
                    // on confirm
                    dsf.http
                        .get(`fn/fileCheckOut?fileId=${self.docId}`)
                        .done(result => {
                            // result = result.data;
                            if (result.code == 200) {
                                dsf.layer.toast(`操作成功！`, true, function () {
                                    self.$router.replace({
                                        name: "PeopleDailyMyDocStatus",
                                        params: {
                                            id: self.docId
                                        }
                                    });
                                });
                            } else {
                                self.errored = true;
                                self.errorMsg = result.message;
                            }
                        })
                        .error(error => {})
                        .always(() => {
                            // dsf.layer.closeLoading(self.loading);
                        });
                })
                .catch(() => {
                    // on cancel
                });
        },
        getDocInfo() {
            let self = this;
            dsf.http
                .get(`fn/getFileInfo?fileId=${self.docId}`)
                .done(result => {
                    // result = result.data;
                    if (result.code == 200 && result.data) {
                        self.docInfo = {
                            docCode: result.data.wh,
                            recDept: result.data.curDeptName,
                            deliDate: dsf.date.format(new Date(result.data.pfDate), "yyyy-mm-dd")
                        };
                        // fileStatus 待领取0，未归还-1，已归还1
                        // curRoles 下发专员0，下发管理员1
                        if (result.data.curRoles.length == 0) {
                            self.errored = true;
                            self.errorMsg = "您无数据访问权限。";
                        } else if (result.data.fileStatus == 0) {
                            if (result.data.curRoles.includes("0")) {
                                self.isReceive = true;
                            } else {
                                self.errored = true;
                                self.errorMsg = "该文件尚未领取。";
                            }
                        } else if (result.data.fileStatus == -1) {
                            if (!result.data.curRoles.includes("1")) {
                                self.errored = true;
                                self.errorMsg = "该文件已领取。";
                            }
                        } else if (result.data.fileStatus == 1) {
                            self.errored = true;
                            self.errorMsg = "该文件已归还。";
                        } else {
                            self.errored = true;
                            self.errorMsg = "数据异常。";
                        }
                    } else {
                        self.errored = true;
                        self.errorMsg = result.message;
                    }
                })
                .error(error => {})
                .always(() => {
                    dsf.layer.closeLoading(self.loading);
                });
        }
    },
};
</script>

<style lang="scss" scoped>
@import 'src/assets/styles/themes.scss';
@import 'src/assets/styles/mixin.scss';

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

.info {
    padding: 16px;
}

::v-deep .van-goods-action-button--danger {
    @include background-theme('normal', true);

    &.van-dialog__confirm {
        color: #fff;

    }
}

.van-cell {
    font-size: var(--font_size_2);

    ::v-deep span {
        line-height: 34px;
    }

    &:not(:first-of-type)::before {
        position: absolute;
        box-sizing: border-box;
        content: ' ';
        pointer-events: none;
        right: 16px;
        top: 0;
        left: 16px;
        border-bottom: 1px solid #cfcfcf;
        -webkit-transform: scaleY(.5);
        transform: scaleY(.5);
    }
}

.btn-container {
    background-color: #fff;
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    padding: 12px;

    .van-button {
        width: 100%;
    }
}
</style>

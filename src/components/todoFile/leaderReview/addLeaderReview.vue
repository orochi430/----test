<template>
<div class="addleaderreview">
    <van-nav-bar v-if="showAppTopMenu" title="领导选择" @click-left="back">
        <template #left>
            <van-icon name="arrow-left" /><span>返回</span>
        </template>
    </van-nav-bar>
    <div class="leader-list" :style="{height: `calc(100vh - ${dsf.util.getOffsetTop('0.92rem')} - 1.2rem)`}">
        <van-sticky :offset-top="dsf.util.getOffsetTop()">
            <div class="leader-title">
                <p>领导列表
                    <span v-show="processSettings && processSettings.sendMode == 1">（横传：依次流转；直传：同时流转）</span>
                    <span v-show="processSettings && processSettings.sendMode == 2 || sendMode == 1">（横传：依次流转）</span>
                    <span v-show="processSettings && processSettings.sendMode == 3 || sendMode == 0">（直传：同时流转）</span>
                </p>
            </div>
        </van-sticky>
        <div v-for="(cell, inx) in leaderList" :key="inx">
            <div :style="{ 'padding-left': '30px' }" class="person">
                <div class="flex-box person_child">
                    <van-checkbox icon-size="0.32rem" class="child_check" v-model="cell.Selected" style="flex: 1" shape="square" :disabled="checkDisabled(cell)" @click="userClick(cell, inx)">
                        <div class="user-logo">
                            <i class="icon iconfont iconyonghu"></i>
                        </div>
                        <div class="user-name">{{ cell.UserName || cell.name }}</div>
                    </van-checkbox>
                </div>
            </div>
        </div>
    </div>
    <van-tabbar placeholder>
        <van-tabbar-item class="_btns">
            <div class="tree_l">
                <span>已选择：{{ selectedList ? selectedList.length : 0 }}人</span>
                <!-- <van-icon v-show="selectedList.length > 0" class="tree_icon" size="0.32rem" name="arrow-up" /> -->
            </div>
            <div class="tree_r">
                <van-button class="tree_r_btn" type="info" size="middle" @click="showCheckUsers(1)" v-show="processSettings && processSettings.sendMode != 3 || sendMode == 1">横传</van-button>
                <van-button class="tree_r_btn" type="info" size="middle" @click="showCheckUsers(0)" v-show="processSettings && processSettings.sendMode != 2 || sendMode == 0">直传</van-button>
            </div>
        </van-tabbar-item>
    </van-tabbar>
    <van-popup v-model="showLeader" :style="{ height: '100%' }" position="bottom">
        <leader-checked :selected-list="newSelectedList" :un-drag-list="unDragList" :send-mode="sendMode" :selected-send-range="selectedSendRange" :flow-range-url="flowRangeUrl" @close="close" @changeData="changeLeaderData" @changeLeaderSitu="changeLeaderSitu"></leader-checked>
    </van-popup>
</div>
</template>

<script>
import leaderChecked from "@/components/todoFile/leaderReview/leaderChecked";
import specialJS from "../../commonForm/specialJS/index";
export default {
    name: 'addLeadeReview',
    components: {
        leaderChecked
    },
    props: {
        formData: {
            type: Object,
            default: () => {
                return {};
            }
        },
        formMeta: {
            type: Object,
            default: () => {
                return {};
            }
        },
        formParams: {
            type: Object,
            default: () => {
                return {};
            }
        },
        leaderOrder: { //选择人员时的排列顺序 1顺序 2倒序  默认为倒序（从大到小）
            type: String,
            default: ""
        },
        processSettings: { //流转设置的按钮参数
            type: Object,
            default: () => null
        },
        flowRangeUrl: {
            type: Object,
            default: () => null
        }
    },
    data() {
        return {
            showAppTopMenu: dsf.config.appTopMenu.value,
            showBack: true,
            default_img: 'this.src="' + require("../../../assets/imgs/defaultUser.png") + '"',
            selectArr: [], //选中人员下标
            showLeader: false,
            leaderList: [], //领导列表
            selectedList: [], //选中人员
            sendMode: -1, //发送模式：：0并行(直传)，1串行（横传）
            alreadySelecded: [], //已选领导
            alreadySelectIds: [],
            newSelectedList: [],
            unDragList: [],
            canDragList: [],
            selectedSendRange: {},
            user: dsf.util.loadSessionStore("user"),
            processSn: "", //批次号
        }
    },
    created() {
        
    },
    mounted() {
        this.getLeaderList();
    },
    methods: {
        //返回
        back() {
            this.$emit("close", false);
        },
        getFavicon(user) {
            if (user.Photo) {
                return dsf.url.getWebPath(`/fn/mobilePhoto/download?id=${user.id}&time=${new Date().getTime()}`);
            } else {
                return require("../../../assets/imgs/defaultUser.png")
            }
        },
        checkDisabled(cell) {
            const disable1 = cell.sendMode == 0 && cell.processStatus > 1; //直传且已流转
            const disable2 = (cell.sendMode == 0 && cell.processStatus == 1) && (cell.objId == this.user.user_id || cell.UserID == this.user.user_id); //直传且流转到当前用户
            const disable3 = cell.sendMode == 1 && cell.processStatus >= 1; //横传且流转中或已流转
            if (disable1 || disable2 || disable3) {
                return true;
            } else {
                return false;
            }
        },
        userClick(item, inx) {
            if (item.Selected) {
                this.selectedList.push(item)
            } else {
                this.selectedList = this.selectedList.filter(el=> el.UserID != item.UserID)
            }
            // this.selectedList = this.leaderList.filter((el, i) => el.Selected);

            let idx = this.alreadySelectIds.indexOf(item.UserID);
            if (!item.Selected && idx > -1) {
                this.alreadySelecded.splice(idx, 1);
                this.alreadySelectIds.splice(idx, 1);
                this.leaderList[inx].processStatus = 0; //将原文件选中过后来又取消的人员的流转状态置为未流转0
            }
        },
        //展示选中的人
        showCheckUsers(type) {
            this.showLeader = true;
            let selectIds = this.selectedList.map(item => {
                if (item.Selected)
                    return item.id
            })
            // 限定可以排序的行：1.直传+未流转0或流转中1   2.横传+未流转0
            // this.canDragList = this.alreadySelecded.filter((item, i) => {
            //     if (((item.sendMode == 0 && item.processStatus <= 1) || (item.sendMode == 1 && item.processStatus == 0)) && selectIds.includes(item.objId)) {
            //         return item
            //     }
            // }); //可拖拽

            this.unDragList = this.alreadySelecded.filter((item, i) => {
                if ((item.sendMode == 0 && item.processStatus > 1) || (item.sendMode == 1 && item.processStatus >= 1)) {
                    return item
                }
            }); //不可拖拽（1.直传+已流转2   2.横传+流转中1或已流转2）

            let selectedCanArr = this.selectedList.filter((el, i) => el.processStatus == 0); // 未流转的可拖拽选中人员
            selectedCanArr.forEach(el => {
                el['sendMode'] = type; //未流转人员的流转方式全部设置为点击按钮方式
            })
            let alreadyCan = this.alreadySelecded.filter((item, i) => {
                // 直传0+流转中1 +已选中的人员
                if ((item.sendMode == 0 && item.processStatus == 1) && selectIds.includes(item.objId)) {
                    return item
                }
            })
            //都可拖拽
            if (this.leaderOrder == '2') { // 倒序
                this.newSelectedList = alreadyCan.concat(selectedCanArr.sort((a, b) => {
                    return b.orderIndex - a.orderIndex;
                }));
            } else if (this.leaderOrder == '1') { //顺序
                this.newSelectedList = alreadyCan.concat(selectedCanArr.sort((a, b) => {
                    return a.orderIndex - b.orderIndex;
                }));
            } else {  //添加顺序
                this.newSelectedList = alreadyCan.concat(selectedCanArr)
            }
        },
        //关闭弹层
        close(val) {
            this.showLeader = false;
            if (!val) {
                this.back();
            }
        },
        // 修改领导选择范围
        changeLeaderData(val) {
            // console.log(val)
            // this.selectedList = val;
            // let arr = [];
            // this.leaderList.forEach((el, i) => {
            //     if (el.Selected)
            //         arr.push(i)
            // })
            // this.selectArr = arr;
            this.newSelectedList = val;
        },
        // 领导列表
        getLeaderList() {
            let that = this;
            this.$toast.loading({
                message: '加载中...',
                duration: 0,
                overlay: true
            });
            let url = this.processSettings ? 'fn/flow/getNextSendRange' : 'fn/flow/getMobileSendRange'; //流转设置 : 领导加签
            let params = this.processSettings ? {
                infoId: this.formMeta.parameters.pk || "",
                flowId: this.processSettings.flowId || "",
                nodeId: this.processSettings.nodeId || "",
                targetNodeId: this.processSettings.targetNodeId || "",
            } : {
                infoId: this.formMeta.parameters.pk || "",
                pnId: this.formMeta.parameters.pnId || "",
                order: this.leaderOrder || "1"
            }
            dsf.http.get(url, params).then((res) => {
                if (res && res.data && res.data.code == '200') {
                    if (res.data.data.SendRangeTree && res.data.data.SendRangeTree.Node) {
                        that.leaderList = res.data.data.SendRangeTree.Node.map((item, i) => {
                            item.Selected = false;
                            item.orderIndex = i;
                            item.processStatus = 0;
                            return item
                        });
                        if (that.processSettings) {
                            that.getProcessSn();
                        } else {
                            that.getSelectedLeader();
                        }

                    }
                }
            }).catch(() => {
                this.$toast.clear();
            });
        },
        // 获取批次号
        getProcessSn() {
            let that = this;
            let params = {
                infoId: this.formMeta.parameters.pk || "",
                flowId: this.processSettings.flowId || "",
                nodeId: this.processSettings.nodeId || "",
                targetNodeId: this.processSettings.targetNodeId || "",
                isLoad: this.processSettings.isLoad || "",
            }
            dsf.http.get('fn/flow/getProcessSn', params).then((res) => {
                if (res && res.data && res.data.data) {
                    that.processSn = res.data.data;
                    that.getSelectedLeaderSettings();
                }
            }).catch(() => {
                this.$toast.clear();
            });
        },
        // 已选领导-领导加签
        getSelectedLeader() {
            let that = this;
            let params = {
                pnId: this.formMeta.parameters.pnId || "",
            }
            dsf.http.get('fn/flow/getMobileSelectedSendRange', params).then((res) => {
                if (res && res.data && res.data.code == '200') {
                    // console.log(res.data.data)
                    that.selectedSendRange = res.data.data;
                    that.selectedSendRange['pnId'] = that.formMeta.parameters.pnId || "";
                    that.selectedSendRange['moduleId'] = that.formMeta.parameters.moduleId || "";
                    that.sendMode = that.selectedSendRange.sendMode; //发送模式：0并行(直传)，1串行（横传）

                    if (that.selectedSendRange.processList && that.selectedSendRange.processList.length > 0) {
                        that.alreadySelectIds = that.selectedSendRange.processList.map((item) => item.objId); //已选领导
                        that.alreadySelecded = that.selectedSendRange.processList;
                        that.leaderList.forEach((el, i) => {
                            // if (that.alreadySelectIds.includes(el.id)) {
                            //     el.Selected = true;
                            //     // el.processStatus =
                            //     that.selectedList.push(el);
                            //     that.selectArr.push(i);
                            // }
                            el.processStatus = 0; //默认为未流转0
                            that.alreadySelecded.forEach(item => {
                                if (item.objId == el.id) {
                                    el.Selected = true;
                                    el.sendMode = item.sendMode;
                                    el.processStatus = item.processStatus;
                                    that.selectedList.push(el);
                                    that.selectArr.push(i);
                                }
                            })
                        })
                        // that.showCheckUsers();
                        that.$toast.clear();
                    }
                }
            }).catch(() => {
                this.$toast.clear();
            });
        },
        // 已选领导-流转设置
        getSelectedLeaderSettings() {
            let that = this;
            let params = {
                processSn: this.processSn,
            }
            dsf.http.get('fn/flow/getProcessNodeSendRange', params).then((res) => {
                if (res && res.data && res.data.code == '200') {
                    that.selectedSendRange = {
                        processList: res.data.data,
                        moduleId: that.formMeta.parameters.moduleId || "",
                        infoId: that.formMeta.parameters.pk,
                        flowId: that.processSettings.flowId,
                        nodeId: that.processSettings.nodeId,
                        targetNodeId: that.processSettings.targetNodeId,
                        processSn: that.processSn,
                        processSettings: 1, //是否流转设置传入
                    }
                    // that.sendMode = that.selectedSendRange.sendMode; //发送模式：0并行(直传)，1串行（横传）
                    if (that.selectedSendRange.processList && that.selectedSendRange.processList.length > 0) {
                        that.alreadySelectIds = that.selectedSendRange.processList.map((item) => item.objId); //已选领导
                        that.alreadySelecded = that.selectedSendRange.processList;
                        that.leaderList.forEach((el, i) => {
                            el.processStatus = 0; //默认为未流转0
                            that.alreadySelecded.forEach(item => {
                                if (item.objId == el.id) {
                                    el.Selected = true;
                                    el.sendMode = item.sendMode;
                                    el.processStatus = item.processStatus;
                                    that.selectedList.push(el);
                                    that.selectArr.push(i);
                                }
                            })
                        })
                        // that.showCheckUsers();
                    }
                    that.$toast.clear();
                }
            }).catch(() => {
                this.$toast.clear();
            });
        },
        changeLeaderSitu(val) {
            this.$emit("changeLeaderSitu", val)
        }
    },
    computed: {

    },
    watch: {},
}
</script>

<style lang="scss" scoped>
@import "../../../assets/styles/themes.scss";
@import "../../../assets/styles/mixin.scss";

.addleaderreview {
    .leader-list {
        width: 100%;
        overflow: auto;

        .leader-title {
            width: 100%;
            align-items: center;
            background: #fff;
            display: flex;
            justify-content: flex-start;
            min-height: 1.04rem;
            padding: 0 0.3rem;
            position: relative;

            &::before {
                border-bottom: 1px solid #eee;
                bottom: 0;
                content: "";
                height: 1;
                left: 15px;
                position: absolute;
                right: 15px;
            }

            p {
                font-size: var(--font_size_2);
                color: #333;

                span {
                    font-size: var(--font_size_3);
                    color: #999;
                }
            }
        }

        .person {
            height: 38px;
            line-height: 24px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            background: #fff;

            .flex-box {
                display: flex;
                justify-content: flex-start;
                align-items: center;
                padding: 0 15px;
                min-height: 52px;
            }

            .person_child {
                width: 100%;
                height: 38px;

                .child_check {
                    margin-right: 10px;
                }

                .user-logo {
                    margin-top: 2px;
                    width: 22px;
                    height: 22px;
                    margin-right: 8px;

                    i {
                        @include font-theme("normal");
                        font-size: var(--font_size_0);
                    }
                }

                .user-name {
                    margin-top: 2px;
                    font-size: var(--font_size_2);
                }
            }
        }
    }

    ._btns {
        flex: 1;
        padding: 0 10px;

        .tree_l {
            display: flex;
            align-items: center;
            // width: 50%;
            width: 30%;

            //text-align: center;
            .tree_icon {
                vertical-align: text-top;
            }

            span {
                font-size: 14px;
            }
        }

        .tree_r {
            // width: 50%;
            width: 70%;
            display: flex;
            justify-content: flex-end;

            .tree_r_btn {
                width: 50%;
            }
        }

        button {
            margin-left: 10px;
            height: 0.8rem;
            padding: 0;
            // flex: 1;
        }

    }

}

::v-deep .van-tabbar--fixed {
    height: 1.2rem;
}

::v-deep .van-tabbar-item__text {
    width: 100%;
    display: flex;
    justify-content: space-around;
    align-items: center;
}

::v-deep .child_check .van-checkbox__label {
    display: flex;
}

::v-deep .van-checkbox__label {
    color: #333;
}

::v-deep .van-checkbox__icon--disabled i {
    background-color: #ebedf0;
    border-color: #c8c9cc;
}
</style>

<template>
<div class="checkusers">
    <van-nav-bar title="选中范围" placeholder @click-left="define">
        <template #left>
            <van-icon name="arrow-left" />
        </template>
    </van-nav-bar>
    <div class="content">
        <ul>
            <li>序号</li>
            <li>审核领导</li>
            <li>流转方式</li>
            <li>操作</li>
        </ul>
        <div class="list-group">
            <div class="list-group-item" v-for="(item, index) in unDragList" :key="index">
                <p>
                    {{index + 1}}
                    <img :src="require('../../../../static/images/icon-yiliuzhuan.png')" alt="" v-if="item.processStatus && item.processStatus == 2">
                    <img :src="require('../../../../static/images/icon-liuzhuanzh.png')" alt="" v-else-if="item.processStatus && item.processStatus == 1">
                    <img :src="require('../../../../static/images/icon-weiliuzhuan.png')" alt="" v-else>
                </p>
                <p>{{item.name || item.UserName || item.objName}}</p>
                <p>{{item.sendMode ? "横传" : "直传"}}</p>
                <p>
                    <!-- <van-icon name="sort" size="0.36rem" class="sort" /> -->
                    <!-- <van-icon name="cross" size="0.36rem" style="line-height: inherit; padding-left: 0.1rem" @click="del(item, index)" /> -->
                </p>
            </div>
            <draggable group="people" ghost-class="ghost" chosenClass="chosen" v-model="selectArr_" animation="200">
                <div class="list-group-item" v-for="(item, index) in selectArr_" :key="index">
                    <p>{{unDragList.length + index + 1}}
                        <img :src="require('../../../../static/images/icon-yiliuzhuan.png')" alt="" v-if="item.processStatus && item.processStatus == 2">
                        <img :src="require('../../../../static/images/icon-liuzhuanzh.png')" alt="" v-else-if="item.processStatus && item.processStatus == 1">
                        <img :src="require('../../../../static/images/icon-weiliuzhuan.png')" alt="" v-else>
                    </p>
                    <p>{{item.name || item.UserName || item.objName}}</p>
                    <p>{{item.sendMode ? "横传" : "直传"}}</p>
                    <p>
                        <van-icon name="sort" size="0.36rem" class="sort" />
                        <!-- <van-icon name="cross" size="0.36rem" style="line-height: inherit; padding-left: 0.1rem" @click="del(item, index)" /> -->
                    </p>
                </div>
            </draggable>
        </div>
        <div class="confirm">
            <van-button type="default" size="middle" @click="define">选择人员</van-button>
            <van-button type="info" size="middle" @click="confirmPerson">确 定</van-button>
        </div>
    </div>

</div>
</template>

<script>
// import draggable from "vuedraggable";
export default {
    name: '',
    components: {
        "draggable": () => import("vuedraggable"),
    },
    props: {
        selectedList: {
            type: Array,
            default: [],
        },
        unDragList: { //不可拖拽人员
            type: Array,
            default: [],
        },
        sendMode: { //流转方式
            type: Number
        },
        selectedSendRange: { //已选领导接口返回信息
            type: Object,
            default: () => {},
        },
        flowRangeUrl: {
            type: Object,
            default: () => {}
        }
    },
    data() {
        return {}
    },
    created() {},
    mounted() {},
    methods: {
        define() {
            this.$emit("close", true);
        },
        del(item, index) {
            console.log(item, index)
            this.$delete(item, "Selected");
            this.$set(item, "Selected", false);
            this.selectArr_.splice(index, 1);
            this.$emit("changeData", this.selectArr_);
        },
        confirmPerson() {
            let that = this;
            let selectPerson = this.unDragList.concat(this.selectArr_);
            let commonSendMode = selectPerson.length > 0 ? selectPerson[0].sendMode : 0;
            let personList = [];
            let noAllowSave = selectPerson.some(el => el.sendMode != commonSendMode);
            if (noAllowSave) {
                dsf.layer.toast("只能选择一种流转方式！");
                return;
            } else {
                this.$toast.loading({
                    message: '保存中...',
                    duration: 0,
                    overlay: true
                });
                let url = this.selectedSendRange.processSettings ? `fn/flow/saveProcessNodeSendRange?` : `fn/p2433Flow/afterMobileSelectSendRange?pnId=${this.selectedSendRange.pnId}&`; //流转设置保存：领导加签保存

                let urlParams = `${url}infoId=${this.selectedSendRange.infoId}&flowId=${this.selectedSendRange.flowId}&sendMode=${commonSendMode}&nodeId=${this.selectedSendRange.nodeId}&targetNodeId=${this.selectedSendRange.targetNodeId}&processSn=${this.selectedSendRange.processSn}&moduleId=${this.selectedSendRange.moduleId}`;

                selectPerson.forEach((el, index) => {
                    let obj = {
                        infoId: this.selectedSendRange.infoId,
                        flowId: this.selectedSendRange.flowId,
                        sendMode: el.sendMode,
                        nodeId: this.selectedSendRange.nodeId,
                        targetNodeId: this.selectedSendRange.targetNodeId,
                        processSn: this.selectedSendRange.processSn,
                        uType: "1", //接收对象类型: 固定传1
                        objId: el.objId || el.UserID,
                        objName: el.objName || el.name,
                        objDeptId: el.objDeptId || el.DeptID,
                        objDeptName: el.objDeptName || el.DeptName,
                        processStatus: (el.processStatus && el.processStatus > 0) ? el.processStatus : 0,
                        showOrder: index + 1,
                    }
                    personList.push(obj)
                });
                let sendPerson = personList.filter(item => item.processStatus != 2);
                // that.changeForm(personList);

                dsf.http.post(urlParams, sendPerson, {
                    headers: {
                        "Content-Type": "application/json"
                    }
                }).then(res => {
                    // console.log(res.data)
                    that.$toast.clear();
                    if (res.data.code == 200) {
                        dsf.layer.toast("保存成功！", "success", () => {
                            that.$emit("close");
                            that.changeForm(personList);
                        })
                    } else {
                        that.$toast.fail(res.data.message);
                    }
                }).catch(() => {
                    this.$toast.clear();
                });
            }
        },
        // 修改表单流转范围值
        async changeForm(list) {
            let that = this;
            let userIds = list.map(item => item.objId);
            let url = this.flowRangeUrl.generateFlowRangeUrl || 'ctrl/signReport/generateFlowRange';
            if (userIds.length > 0) {
                await dsf.http.post(url, {
                    userIds: userIds.join(',')
                }).then(async (res) => {
                    if (res && res.data && res.data.code == '200') {
                        that.updateFlowRange(res.data.data)
                    }
                })
            } else {
                // 签报和白头文件,人员为空需要传空格
                if (this.selectedSendRange.moduleId == '230504192223hNSFfFucFKid9ZUWQ37' || this.selectedSendRange.moduleId == '230909172023JgZnhtVNSAyz90RaqGC') {
                    this.updateFlowRange("　"); //全角空格
                } else {
                    this.updateFlowRange("");
                }
            }
            // 修改签报正文文件-（签报和白头文件）
            if ((this.selectedSendRange.moduleId == '230504192223hNSFfFucFKid9ZUWQ37' || this.selectedSendRange.moduleId == '230909172023JgZnhtVNSAyz90RaqGC') && this.selectedSendRange.nodeId != '-7' && this.selectedSendRange.nodeId != '-1') {
                await dsf.http.post('ctrl/signReport/refreshFileContentByBookmark', {
                    moduleId: this.selectedSendRange.moduleId,
                    infoId: this.selectedSendRange.infoId
                }).then((res) => {
                    console.log(res);
                    if (res && res.data && res.data.code == 200) {
                        that.$emit("changeLeaderSitu")
                    }
                });
            }
        },
        async updateFlowRange(data) {
            let url = this.flowRangeUrl.updateFlowRangeUrl || 'ctrl/signReport/updateFlowRange';
            let initControl = this.flowRangeUrl.initControl;
            await dsf.http.post(url, {
                flowRange: data,
                infoId: this.selectedSendRange.infoId
            }).then((res) => {
                console.log(res);
                if (res && res.data && res.data.code == 200) {
                    if (this.selectedSendRange.moduleId != '230504192223hNSFfFucFKid9ZUWQ37' && this.selectedSendRange.moduleId != '230909172023JgZnhtVNSAyz90RaqGC') {
                        this.$emit("changeLeaderSitu", {
                            initControl: initControl,
                            data: data
                        })
                    }
                }
            });
        }
    },
    computed: {
        selectArr_: {
            get() {
                return this.selectedList;
            },
            set(val) {
                console.log(val);
                this.$emit("changeData", val);
            },
        },
    },
    watch: {},
}
</script>

<style lang="scss" scoped>
@import "../../../assets/styles/themes.scss";
@import "../../../assets/styles/mixin.scss";

.checkusers {
    .content {
        width: 100%;
        background: #eeeeee;

        ul {
            widows: 100%;
            height: 40px;
            display: flex;
            align-items: center;
            position: absolute;
            top: 50px;
            left: 0;
            right: 0;
            background: #eeeeee;

            li {
                width: 25%;
                height: 100%;
                font-size: var(--font_size_2);
                color: #333333;
                display: flex;
                align-items: center;
                justify-content: center;

                // &:first-child {
                //     width: 16%
                // }
            }
        }

        .list-group {
            position: absolute;
            top: 90px;
            left: 0;
            right: 0;
            bottom: 1.3rem;
            width: 100%;
            overflow: auto;

            .list-group-item {
                position: relative;
                display: flex;
                align-items: center;
                width: 100%;
                border-bottom: 1px solid #f8f8f8;
                height: 50px;

                p {
                    width: 25%;
                    height: 100%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: var(--font_size_2);
                    color: #333333;

                    img {
                        width: 16px;
                        height: 16px;
                        margin-left: 5px;
                    }

                    // &:first-child {
                    //     width: 16%
                    // }

                    i {
                        @include font-theme("normal");

                        &.sort {
                            margin-right: 10px;
                        }
                    }
                }
            }
        }

        .confirm {
            position: absolute;
            left: 0;
            right: 0;
            bottom: 0;
            width: 100%;
            height: 1.2rem;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 0.16rem 0.2rem;
            border-top: 1px solid #f1f1f1;

            button {
                // width: 100%;
                // height: 50px;
                flex: 1;
            }

            button+button {
                margin-left: 10px;
            }
        }
    }

}
</style>

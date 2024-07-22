<template>
<div :class="['ds-hometodocenter', hasBottom ? 'has-bottom' : '']" ref="container">
    <div class="header" v-if="$store.state.homeTabs">
        <div class="title">
            <span>待办中心</span>
        </div>
    </div>
    <van-tabs v-if="tabs.length>1" v-model="tab" :ellipsis="false" :animated="animated" :swipe-threshold="6" sticky class="tabs" @change="tabChange">
        <van-tab v-for="item in tabs" :key="item.name" :name="item.name" :title="item.title" :badge="item.params && !item.params.showTotal ? '' : (item.count || '')" :disabled="loading">
            <van-pull-refresh v-if="tab === item.name" v-model="isLoading" success-text="刷新成功" @refresh="onRefresh">
                <van-list :finished="finished" :finished-text="data.length ? finishedTips : ''" v-model="loading" @load="onLoad">
                    <DsList ref="dslist" :tabObj="item" :type="tab" :data="data" :columns="columns" :keyColumn="keyColumn" @mainClick="handleActionClick" @commonClick="handleActionClick" formMethod="info">
                        <template v-slot:item-extend="slotProps" v-if="tab === 'db'">
                            <div class="progress-wrap">
                                <!-- <van-progress
                    :percentage="getPercent(slotProps)"
                    :color="getColor(slotProps)"
                    :show-pivot="false"
                    stroke-width="10"
                    class="_progress"
                  />
                  <span v-if="getPercent" class="process-text">{{ getPercent(slotProps) }} %</span> -->
                            </div>
                        </template>
                    </DsList>
                </van-list>
            </van-pull-refresh>
        </van-tab>
    </van-tabs>
    <van-pull-refresh v-else v-for="item in tabs" :key="item.name" v-model="isLoading" success-text="刷新成功" @refresh="onRefresh">
        <van-list :finished="finished" :finished-text="data.length ? finishedTips : ''" v-model="loading" @load="onLoad">
            <DsList ref="dslist" :tabObj="item" :type="tab" :data="data" :columns="columns" @mainClick="handleActionClick" @commonClick="handleActionClick" formMethod="info">
                <template v-slot:item-extend="slotProps" v-if="tab === 'db'">
                    <div class="progress-wrap">
                        <!-- <van-progress
                :percentage="getPercent(slotProps)"
                :color="getColor(slotProps)"
                :show-pivot="false"
                stroke-width="10"
                class="_progress"
              />
              <span v-if="getPercent" class="process-text">{{ getPercent(slotProps) }} %</span> -->
                    </div>
                </template>
            </DsList>
        </van-list>
    </van-pull-refresh>
    <div v-if="hasBottom && !hideBottom" class="footer">
        <DsfButtonToolbox :more="true" :isFormBtn="true" :buttons="listButtons" @mainClick="bottomBtnActionClick" @commonClick="bottomBtnActionClick" />
    </div>
    <van-popup :get-container="getContainer"  :style="{ height: '90vh' }" v-model="showPerson" :close-on-click-overlay="false" lock-scroll position="bottom" round>
        <selectPerson :extra="extra" :type="0" @getSelectUser="getSelectUser" @cancePerson="cancePerson"></selectPerson>
    </van-popup>
    <van-popup :get-container="getContainer" ref="sendPop" v-model="showFlowSend" :close-on-click-overlay="false" lock-scroll style="height:90vh" position="bottom" round>
        <sendFile v-show="showFlowSend" ref="sendFile" :form-data="selected" @change="handleFlowSendChange" @close="closeSendFile" />
    </van-popup>
    <van-popup :get-container="getContainer" v-model="showFlowBack" :close-on-click-overlay="false" lock-scroll style="height:90vh" position="bottom" round>
        <work-flow-dialog ref="wfDialog" :form-data="selected" @change="handleFlowBackChange" @close="showFlowBack = false" />
    </van-popup>

    <!--分阅弹窗-->
    <separate-read ref="readPop" />
    <!--报名弹窗-->
    <sign-file ref="signFile" />
    <!--报名弹窗-->
    <sign-file-person ref="signFilePerson" />
</div>
</template>

<script>
import DsList from "@/components/documentCenter/commonDsList";
import DsfButtonToolbox from "@/components/documentCenter/DsfButtonToolbox";
import ButtonActions from "@/components/todoCenter/TodoCenter.mixin";
import workFlowDialog from "@/components/dialog/WorkFlowDialog.vue";
import selectPerson from "@/components/selectPerson/DsfSelectPerson";
import sendFile from "@/components/sendFlow/sendFile";
import SeparateRead from "@/components/selectPerson/SeparateRead";
import signFile from "@/components/todoFile/signFile";
import signFilePerson from "@/components/todoFile/signFilePerson";
import store from '@/common/util';
export default {
    name: "TodoCenter",
    components: {
        DsList,
        DsfButtonToolbox,
        workFlowDialog,
        selectPerson,
        sendFile,
        SeparateRead,
        signFile,
        signFilePerson
    },
    mixins: [ButtonActions],
    props: {
        index: {
            type: String,
            default: "gw"
        },
        animated: {
            type: Boolean,
            default: true
        },
        hideBottom: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            finished: false,
            loading: false,
            isLoading: false,
            finishedTips: "没有更多了",
            start: 1,
            showPopup: false,
            showFlowBack: false,
            tab: "gw",
            tabs: [],
            componentId: "DsList",
            data: [],
            columns: [],
            listButtons: {},
            showPerson: false,
            selected: null,
            showFlowSend: false,
            extra: {},
            container: null,
            keyColumn: "",
            distribIds: ""
        };
    },
    computed: {
        fetchOptions() {
            if (this.tabs.length > 0) {
                const {
                    params,
                    url,
                    nosend
                } = this.tabs.find(it => it.name === this.tab);
                return {
                    url,
                    params: {
                        start: this.start,
                        page: this.start,
                        limit: 15,
                        ...params
                    },
                    nosend: nosend != undefined ? nosend : false
                };
            }
            return {}
        },
        hasBottom() {
            const c = this.listButtons.commonButton || [];
            const m = this.listButtons.mainButtons || [];
            return (c.length || m.length) && this.data.length;
        }
    },
    async created() {
        try {
            this.tab = this.index;
            await this.initTabs()
            await this.getBadge();
            // this.onRefresh();
        } catch (error) {
            // this.onRefresh();
        }
    },
    async activated() {
        //await this.initTabs()
        //await this.getBadge();
        //this.onRefresh();
    },
    mounted() {
        this.$eventBus.onRefresh(this, () => {
            this.getBadge();
            this.onRefresh();
        });

        this.container = this.$refs.container;
    },
    methods: {
        async initTabs() {
            let res = dsf.config.homePage.todoCenter
            this.tabs = res
            //console.log(this.tabs)
            if (res.length < 2 || res[0].isHideTop) {
                this.$store.commit("changeHomeTabs", false);
            }
        },
        handleFlowSendChange() {
            this.showFlowSend = false;
            this.onRefresh();
        },
        handleFlowBackChange() {
            this.showFlowBack = false;
            this.onRefresh();
        },
        getContainer() {
            return document.body;
        },
        getPercent({
            item
        }) {
            const target = item.dataValue || {};
            const str = target.process || "";
            return parseInt(str.replace("%", ""), 10) || 0;
        },
        getColor({
            item
        }) {
            const target = item.dataValue || {};
            const bjrq = new Date(target.bjrq).getTime();
            const cd = new Date().getTime();
            return bjrq > cd ? "#F66C6C" : "#67C23B";
        },
        tabChange(obj) {
            //console.log(obj);
            this.onRefresh();
        },
        bottomBtnActionClick(){
            const action = arguments[0];
            const fn = this[`${action}`] || function () {};
            fn(...Array.prototype.slice.call(arguments, 1));
        },
        handleActionClick() {
            const action = arguments[0];
            if (arguments.length>1&&arguments[1].dataValue.allowMobile && arguments[1].dataValue.allowMobile != 1) {
                dsf.layer.toast("该文件只能在电脑端处理")
                return
            }
            const fn = this[`action-${action}`] || function () {};
            fn(...Array.prototype.slice.call(arguments, 1));
        },
        getReplaceParams(url) {
            if (url && store.loadSessionStore("user"))
                return url.replace("[user_id]", store.loadSessionStore("user").user_id)
                    .replace("[userid]", store.loadSessionStore("user").user_id)
                    .replace("[name]", store.loadSessionStore("user").name)
                    .replace("[deptId]", store.loadSessionStore("user").deptId)
                    .replace("[deptName]", store.loadSessionStore("user").deptName)
                    .replace("[logName]", store.loadSessionStore("user").logName)
                    .replace("[mobile]", store.loadSessionStore("user").mobile)
                    .replace("[root_dept_id]", store.loadSessionStore("user").root_dept_id)
                    .replace("[unitId]", store.loadSessionStore("user").unitId);
            else
                return url;
        },
        fetchData() {
            this.loading = true;
            let {
                url,
                params
            } = this.fetchOptions;
            url = this.getReplaceParams(url);
            dsf.http.post(url, params).then(({
                    status,
                    data
                }) => {
                    const {
                        showColumn,
                        datas = [],
                        listButtons,
                        total
                    } = data;
                    if (status === 200) {
                        this.keyColumn = data.keyColumn;
                        this.start += 1;
                        this.data = [...this.data, ...datas];
                        this.columns = showColumn || [];
                        if (listButtons && listButtons.commonButton && listButtons.commonButton.length) {
                            listButtons.commonButton = listButtons.commonButton.filter(item => item.action != "custom1")
                        }
                        this.listButtons = listButtons || {};
                        this.tabs[this.tabs.findIndex(item => item.name == this.tab)].count = total;
                        if (
                            datas == null ||
                            this.data.length === total ||
                            datas.length === 0 ||
                            datas.length < 15
                        ) {
                            // 加载结束
                            this.finished = true;
                        }

                        this.data.forEach(itemdata => {

                            if (this.fetchOptions.nosend) {
                                itemdata.buttons.mainButtons = itemdata.buttons.mainButtons.filter(itembtn => itembtn.action != "faSong");
                            }
                            if (this.distribIds != "") {
                                this.distribIds += ","
                            }
                            this.distribIds += itemdata.dataValue.distribId
                        });
                        if (datas.length < this.start) {
                            if (datas == null || datas.length === 0) {
                                if (this.start === 0) {
                                    this.finishedTips = "暂无数据";
                                } else {
                                    this.finishedTips = "没有更多了";
                                }
                            } else {
                                this.finishedTips = "没有更多了";
                            }
                        }
                    } else {
                        this.dsf.layer.toast(message);
                        this.finished = true;
                        this.finishedTips = message;
                    }
                })
                .catch(({
                    message
                }) => {
                    this.finished = true;
                    this.dsf.layer.toast(message);
                    this.finishedTips = message;
                })
                .finally(() => {
                    this.loading = false;
                    this.isLoading = false;
                });
        },
        onLoad() {
            /**
             * 上拉加载
             */
            this.fetchData();
        },
        /**
         * 下拉刷新
         */
        onRefresh() {
            this.finished = false;
            this.loading = true;
            this.data = [];
            this.start = 1;
            this.fetchData();
        },
        async getBadge() {
            let data = this.tabs
            if (data.length < 2) {
                //如果tab页小于2个则不显示角标
                return
            }
            let arrPromise = []
            data.forEach((item) => {
                let url = this.getReplaceParams(item.url);
                arrPromise.push(dsf.http.post(url, item.countParams))
            })
            let arr = await Promise.all(arrPromise)
            arr.forEach((item, index) => {
                if (item) {
                    data[index].count = item.data.total
                }
            })
            this.tabs = data
        },
        cancePerson() {
            this.showPerson = false;
        },
        getSelectUser(data) {
            console.log("我的", data);
            // debugger
            if (data.length > 0) {
                //去掉父节点，保留选中的子节点
                data.forEach((item, index) => {
                    if (item.children && item.children.length > 0) {
                        data.splice(index, 1);
                    }
                });
                const ids = data.map(item => item.id);
                let toast = {};
                if (this.isTransfer) {
                    if (data.length > 1) {
                        dsf.layer.toast("请选择一个人", true);
                        return;
                    }
                    const type = this.getType();
                    const user = dsf.util.loadSessionStore("user");
                    const loading = dsf.layer.loading("取消中");
                    const {
                        dataValue
                    } = this.selected;
                    if (type === 1) {
                        dsf.changeUser.flowChangeUser({
                            param: {
                                pk: dataValue.info_id,
                                pId: dataValue.pid,
                                pnId: dataValue.pnid,
                                fromUserId: user.user_id,
                                userId: ids.join(","),
                                userName: data.map(it => it.name).join(","),
                                deptId: data.map(it => it.pid).join(","),
                                deptName: ""
                            },
                            thenFun: () => this.onRefresh && this.onRefresh(),
                            finallyFun: () => dsf.layer.closeLoading(loading)
                        });
                    } else if (type === 3) {
                        dsf.changeUser.superviseChangeUser({
                            param: {
                                pk: dataValue.info_id || dataValue.id,
                                userId: ids.join(",")
                            },
                            thenFun: () => this.onRefresh && this.onRefresh(),
                            finallyFun: () => dsf.layer.closeLoading(loading)
                        });
                    }
                } else if (this.isDing) {
                    dsf.dd.Ding({
                        users: ids, // 用户列表，工号
                        type: 2, // 附件类型 1：image  2：link
                        alertType: 2, // 钉发送方式 0:电话, 1:短信, 2:应用内
                        alertDate: {
                            format: "yyyy-MM-dd HH:mm",
                            value: "2020-05-13 20:00"
                        },
                        attachment: {
                            images: [""]
                        }, // 附件信息
                        text: this.selected.dataValue.bt ||
                            this.selected.item.dataValue["B0001"], // 正文
                        bizType: 0, // 业务类型 0：通知DING；1：任务；2：会议；
                        onSuccess: function () {
                            this.dsf.layer.toast("操作成功");
                        },
                        onFail: function () {
                            this.dsf.layer.toast("操作失败");
                        }
                    });
                } else {
                    dsf.http
                        .post("fn/newMobileMeeting/sendMeetingSq", {
                            pk: this.selected.dataValue.info_id,
                            userIds: ids,
                            bt: this.selected.dataValue.bt
                        })
                        .then(res => {
                            if (res.data.status) {
                                dsf.layer.toast("操作成功", true);
                            }
                        })
                        .catch(response => {
                            toast = {
                                msg: "操作异常",
                                type: false
                            };
                        })
                        .finally(res => {
                            if (toast.msg) {
                                dsf.layer.toast(toast.msg, toast.type);
                            }
                        });
                }
            }
        },
        closeSendFile() {
            this.showFlowSend = false;
        }
    }
};
</script>

<style lang="scss">
@import "../../assets/styles/themes.scss";
@import "../../assets/styles/mixin.scss";

.ds-hometodocenter {
    height: 100%;
    position: relative;
    box-sizing: border-box;
    -webkit-overflow-scrolling: touch;

    &.has-bottom {
        padding-bottom: 88px;
    }

    .van-nav-bar {
        z-index: 200;
    }

    .van-icon-arrow-left {
        color: #333;
        font-weight: 600;
        font-size: 1.5em;
    }

    .header {
        width: 100%;
        background: #fff;
    }

    .title {
        padding: 8px 15px;
        box-sizing: border-box;
        position: relative;
        @include font_2;

        span {
            margin-left: 5px;
        }

        &::before {
            content: "";
            display: block;
            width: 5px;
            height: 20px;
            position: absolute;
            top: 50%;
            transform: translate(-5px, -50%);
            @include background-theme("normal");
        }

        &::after {
            content: "";
            display: block;
            width: calc(100% - 20px);
            height: 1px;
            background: $separate_color;
            position: absolute;
            bottom: 0;
            left: 10px;
        }
    }

    .content {
        width: 100%;
    }

    .footer {
        width: 100%;
        height: 65px;
        box-shadow: 0 0 3px 0 rgba(0, 0, 0, 0.05);
        position: fixed;
        bottom: 0;
        left: 0;
        z-index: 200;
        background: white;

        .ds-button-toolbox {
            height: 65px;
        }

        padding: 0 15px;
        box-sizing: border-box;
    }

    .van-info {
        padding: 2px 5px;
        background-color: #f65959;
        display: inline-block;
        position: relative;
        transform: translate(2px, -2px);
    }

    .staticsis {
        background: #fff;
        margin: 15px 0;
        padding: 15px 15px 0 15px;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-wrap: wrap;

        .staticsis-item {
            flex-basis: 33.33%;
            display: flex;
            justify-content: space-between;
            flex-direction: column;
            align-items: center;
            position: relative;
            margin-bottom: 15px;

            &::before {
                content: "";
                display: block;
                width: 1px;
                height: 40px;
                position: absolute;
                top: 0;
                margin: auto;
                bottom: 0;
                left: 0;
                background: $separate_color;
            }

            &:nth-child(3n + 1)::before {
                display: none;
            }

            .si-t,
            .si-b,
            .si-c {
                text-align: center;
                padding: 3px 0;
            }

            .si-t {
                @include font_1;
            }

            .si-c {
                @include font_4;
            }

            .si-b {
                @include font_5;
                color: $fontColor_sub;
            }

            &:nth-child(6) .si-t {
                color: salmon;
            }

            &:nth-child(2) .si-t,
            &:nth-child(4) .si-t {
                color: #67c23b;
            }

            &:nth-child(3) .si-t {
                color: #e6a23c;
            }

            &:nth-child(6) .si-t {
                color: #999999;
            }
        }
    }

    .search-wrap {
        width: 100%;
        padding: 15px;
        box-sizing: border-box;

        .search {
            height: 28px;
            width: 100%;
            display: block;
            background: #ecedee;
            border-radius: 7px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 0 5px;
            box-sizing: border-box;
            color: $fontColor_sub;
            @include font_6;

            .i1,
            .i2 {
                flex-basis: 20px;
            }

            span {
                display: block;
                flex-basis: calc(100% - 60px);
            }
        }
    }

    ._progress {
        width: 70%;
        overflow: hidden;
    }

    .progress-wrap {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        @include font_5;

        ._progress {
            margin-right: 15px;
        }
    }

    .van-tabs__wrap {
        background: #fff;
        padding: 0px;
        box-sizing: border-box;

        .van-tabs__nav {
            padding-right: 15px;
        }
    }
}
</style>

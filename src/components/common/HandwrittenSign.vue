<template>
<div id="handwritten-sign">
    <van-nav-bar left-text="返回" :title="title" @click-left="goBack" left-arrow>
        <!-- <template #right>
              <van-popover v-model="isShowActionPopover" trigger="click" :actions="actions" placement="left-start" @select="onSelect">
              <template #reference>
              <van-icon name="ellipsis" />
              </template>
              </van-popover>
              </template>
        -->
    </van-nav-bar>
    <div class="content">
        <iframe v-if="currentFile" name="yozo" :src="currentFile.handWrittenUrl" frameborder="0" :key="currentFile.handWrittenUrl"></iframe>
        <commonempty v-else description="暂无签批文件" />
    </div>
    <van-popup :get-container="getContainer" :style="{ height: '90vh' }" v-model="showPerson" :close-on-click-overlay="false" lock-scroll position="bottom" round>
        <selectPerson :extra="extra" :type="0" @getSelectUser="getSelectUser" @cancePerson="cancePerson"></selectPerson>
    </van-popup>
    <van-popup :get-container="getContainer" v-model="showFlowSend" :close-on-click-overlay="false" lock-scroll style="height: 90vh" position="bottom" round>
        <sendFile v-if="showFlowSend" ref="sendFile" :form-data="selected" @close="closeSendPopup" />
    </van-popup>
    <van-action-sheet v-model="isShowFileList" :actions="allFile" @select="selectFile" />
</div>
</template>

<script>
import sendFile from "@/components/sendFlow/sendFile";
import selectPerson from "@/components/selectPerson/DsfSelectPerson";
import ButtonActions from "@/components/todoCenter/TodoCenter.mixin";
export default {
    name: "HandwrittenSign",
    components: {
        sendFile,
        selectPerson,
    },
    mixins: [ButtonActions],
    data() {
        return {
            url: "",
            showPerson: false,
            showFlowSend: false,
            selected: null,
            extra: {},
            isShowSendBtn: true,
            allFile: [],
            isShowActionPopover: false,
            isShowFileList: false,
            actions: [{
                    text: "发送",
                    icon: "envelop-o",
                    method: "send",
                },
                {
                    text: "进入表单",
                    icon: "description",
                    method: "goForm",
                },
            ],
            currentFile: null,
        };
    },
    computed: {
        title() {
            return this.currentFile ? this.currentFile.title : "";
        },
    },
    created() {
        this.init();
    },
    mounted() {},
    methods: {
        init() {
            let {
                moduleId,
                pk,
                todoId,
                isEnterTodo,
                fileId
            } = this.$route.query;
            console.log('fileId', fileId)
            let loginToken = dsf.util.loadSessionStore("loginToken");
            let form = {
                pk,
                moduleId,
                todoId,
                isEnterTodo,
            };
            //获取表单描述数据
            dsf.http.get("fn/xform/getInfo", form).then((data) => {
                let struct = data.data.struct;
                let sendBtn = struct.buttons.mainButtons.filter(
                        (it) => it.action == "send"
                    ).length ?
                    struct.buttons.mainButtons.filter((it) => it.action == "send")[0] :
                    null;
                let params = {};
                if (!sendBtn) {
                    this.isShowSendBtn = false;
                } else {
                    sendBtn.parameters.forEach((it) => {
                        params[it.key] = it.value;
                    });
                }
                let formdata = Object.assign(params, struct.parameters);
                this.selected = formdata;
                dsf.http
                    .post("fn/mobileAttachment/getFormAttachment", {
                        info_id: pk,
                        infoId: pk,
                        nodeId: formdata.nodeId,
                        flowId: formdata.flowId,
                        moduleId,
                        start: 1,
                        limit: 100,
                    })
                    .then((data) => {
                        let rows = data.data.rows;
                        let timestamp = new Date().getTime();
                        if (!rows.length) return;
                        rows.forEach((it) => {
                            let arr = [];
                            if (it.document) {
                                it.document.forEach(
                                    ({
                                        id,
                                        infoId,
                                        title,
                                        type,
                                        moduleId,
                                        showFileSize,
                                        isHandwrite,
                                        canEdit,
                                        url,
                                    }) => {
                                        let obj = {
                                            id,
                                            title,
                                            size: showFileSize || "",
                                            navtiveUrl: url,
                                            url: dsf.url.getServerUrl(
                                                `fn/office/openMobileOffice?fileId=${id}&moduleId=${moduleId}&nodeId=${formdata.nodeId}&flowId=${formdata.flowId}&x-auth-token=${loginToken}`
                                            ),
                                            handWrittenUrl: dsf.url.getServerUrl(
                                                `fn/mobileYozo/signature?fileId=${id}&moduleId=${moduleId}&nodeId=${formdata.nodeId}&flowId=${formdata.flowId}&x-auth-token=${loginToken}`
                                            ),
                                            editUrl: dsf.url.getServerUrl(
                                                `fn/mobileOffice/wordEdit?fileId=${id}&moduleId=${moduleId}&nodeId=${formdata.nodeId}&flowId=${formdata.flowId}&x-auth-token=${loginToken}`
                                            ),
                                            initUrl: `fn/file/download?infoId=${infoId}&fileId=${id}&fileName=${title}&nrType=${type}&moduleId=${moduleId}&x-auth-token=${loginToken}&fullfilename=${timestamp}${title}`,
                                            infoId,
                                            moduleId,
                                            isHandwrite,
                                            canEdit,
                                            name: title,
                                        };
                                        if (title.includes(".png") || title.includes(".jpg") || title.includes(".jpeg") ||title.includes(".bmp") || title.includes(".gif")) {
                                            obj.url = dsf.url.getServerUrl(
                                                `fn/mobileFileDownload/download?fileId=${id}&moduleId=${moduleId}&fileName=${title}`
                                            );
                                        }
                                        if (title.includes(".mp4")) {
                                            obj.url = dsf.url.getServerUrl(
                                                `fn/mobileFileDownload/download?fileId=${id}&moduleId=${moduleId}&fileName=${title}`
                                            );
                                        }
                                        if (obj.isHandwrite == "1" || (fileId && fileId.length)) {
                                            this.allFile.push(obj);
                                        }
                                        arr.push(obj);
                                    }
                                );
                                it.file = arr;
                            } else {
                                it.file = [];
                            }
                            if ((it.file && it.file.length) || it.allowMaintain > 0) {
                                it.show = true;
                            } else {
                                it.show = false;
                            }
                        });
                        if (this.allFile.length) {
                            if (fileId && fileId.length && this.allFile.find((item) => item.id == fileId)) {
                                this.currentFile = this.allFile.find(
                                    (item) => item.id == fileId
                                );
                            } else {
                                this.currentFile = this.allFile[0];
                            }
                        }
                        if (this.allFile.length > 1) {
                            this.actions.splice(1, 0, {
                                text: "文件列表",
                                icon: "exchange",
                                method: "changeFile",
                            });
                        }
                    });
            });
        },
        onSelect(action) {
            this[action.method]();
        },
        goBack() {
            console.log(this.$router);
            this.$router.go(-1);
        },
        closeSendPopup() {
            this.showFlowSend = false;
        },
        getContainer() {
            return document.body;
        },
        cancePerson() {
            this.showPerson = false;
        },
        send() {
            this.showFlowSend = true;
            this.$nextTick(() => {
                this.$refs.sendFile.show();
            });
        },
        goForm() {
            let params = `${this.$route.query.moduleId}/${this.$route.query.pk}/${
        this.$route.query.isEnterTodo ? 1 : -1
      }`;
            this.$router.push({
                path: "/commonForm/" + params,
            });
        },
        changeFile() {
            this.isShowFileList = true;
        },
        selectFile(action) {
            this.currentFile = action;
            this.isShowFileList = false;
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
                const ids = data.map((item) => item.id);
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
                                userName: data.map((it) => it.name).join(","),
                                deptId: data.map((it) => it.pid).join(","),
                                deptName: "",
                            },
                            thenFun: () => this.onRefresh && this.onRefresh(),
                            finallyFun: () => dsf.layer.closeLoading(loading),
                        });
                    } else if (type === 3) {
                        dsf.changeUser.superviseChangeUser({
                            param: {
                                pk: dataValue.info_id || dataValue.id,
                                userId: ids.join(","),
                            },
                            thenFun: () => this.onRefresh && this.onRefresh(),
                            finallyFun: () => dsf.layer.closeLoading(loading),
                        });
                    }
                } else if (this.isDing) {
                    dsf.dd.Ding({
                        users: ids, // 用户列表，工号
                        type: 2, // 附件类型 1：image  2：link
                        alertType: 2, // 钉发送方式 0:电话, 1:短信, 2:应用内
                        alertDate: {
                            format: "yyyy-MM-dd HH:mm",
                            value: "2020-05-13 20:00",
                        },
                        attachment: {
                            images: [""],
                        }, // 附件信息
                        text: this.selected.dataValue.bt ||
                            this.selected.item.dataValue["B0001"], // 正文
                        bizType: 0, // 业务类型 0：通知DING；1：任务；2：会议；
                        onSuccess: function () {
                            this.dsf.layer.toast("操作成功");
                        },
                        onFail: function () {
                            this.dsf.layer.toast("操作失败");
                        },
                    });
                } else {
                    dsf.http
                        .post("fn/newMobileMeeting/sendMeetingSq", {
                            pk: this.selected.dataValue.info_id,
                            userIds: ids,
                            bt: this.selected.dataValue.bt,
                        })
                        .then((res) => {
                            if (res.data.status) {
                                dsf.layer.toast("操作成功", true);
                            }
                        })
                        .catch((response) => {
                            toast = {
                                msg: "操作异常",
                                type: false,
                            };
                        })
                        .finally((res) => {
                            if (toast.msg) {
                                dsf.layer.toast(toast.msg, toast.type);
                            }
                        });
                }
            }
        },
    },
};
</script>

<style lang="scss" scoped>
#handwritten-sign {
    height: 100%;
    width: 100%;
    overflow-x: hidden;
    position: relative;
    display: flex;
    flex-direction: column;
}

.content {
    flex: 1;

    iframe {
        width: 100% !important;
        height: 100% !important;
    }
}

::v-deep .van-popover__wrapper {
    display: flex;
    align-items: center;
}

::v-deep .van-nav-bar__right {
    .van-icon {
        color: #000;
        font-size: var(--font_size_0);
    }
}
</style>

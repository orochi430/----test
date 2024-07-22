<template>
<div class="menus">
    <div v-for="(item, index) in menus" :key="index" @click="goUrl(item)">
        <span v-if="msgUnReadCount > 0 && item.id === 'hyxx'" class="sign">{{
            msgUnReadCount
          }}</span>
        <img :src="item.img" alt />
        <p>{{ item.name }}</p>
    </div>
    <van-popup v-model="showFile" :close-on-click-overlay="true" class="file-preview" lock-scroll position="bottom" style="height: 100vh">
        <van-nav-bar :title="filename" left-text="返回" left-arrow fixed placeholder @click-left="closeFile">
        </van-nav-bar>
        <div class="preview-outer">
            <enclosure-preview ref="enclosurePreview" :file="popFile" :is-preview="isPreview" :is-signature="true" @goPreview="goPreview" @goHandWrite="goHandWrite" :isShowCurPerson='true' :isSignature='false'></enclosure-preview>
        </div>
    </van-popup>
</div>
</template>

<script>
import EnclosurePreview from "@/components/enclosure/EnclosurePreview";
export default {
    components: {
        EnclosurePreview
    },
    data() {
        return {
            configMenus: dsf.config.meetingConfig.homePage.padMenu,
            menus: [],
            msgUnReadCount: 0,
            ishiddenTitle: false,
            popFile: {},
            showFile: false,
            filename: '',
            isPreview: true
        };
    },
    mounted() {
        this.$nextTick(() => {
            this.getData();
        })
    },
    methods: {
        getData() {
            dsf.http
                .post(`fn/conferenceMobile/meetingInfo`, {
                    meetingId: this.$route.query.meetingId
                })
                .done(result => {
                    if (result.code == 200 && result.data) {
                        this.meeting = result.data;
                        this.msgUnReadCount = result.data.msgUnReadCount;
                        const showModule = this.meeting.showModule.split(",");
                        this.menus = this.configMenus.filter(item => {
                            return showModule.includes(item.id);
                        });
                        if (this.meeting.isSendMessage && showModule.includes("hyxx")) {
                            this.menus.push({
                                id: "xxfb",
                                name: "消息发布",
                                img: "static/images/meetingPad/xxfb.png",
                                url: "/meetingPad/index/publish"
                            });
                        }
                    }
                })
                .error(error => {
                    dsf.layer.toast("数据获取失败！", false);
                })
                .always(() => {});
        },
        goPreview() {
            this.isPreview = true;
        },
        goHandWrite() {
            this.isPreview = false;
        },
        closeFile() {
            this.showFile = false;
            this.$refs.enclosurePreview.destroyInterval(); // 关闭自动重试定时器
        },
        goUrl(item) {
            // 会务手册
            if (item.id === "czzn") {
                const meetingInfo = this.meeting;
                if (meetingInfo.znFileId) {
                    meetingInfo.flowId = 0;
                    meetingInfo.nodeId = -1;
                    this.popFile = {
                        id: meetingInfo.znFileId,
                        name: meetingInfo.znFileName,
                        infoId: meetingInfo.znFileId,
                        moduleId: meetingInfo.moduleId,
                        isHandwrite: "1",
                        flowId: meetingInfo.flowId,
                        nodeId: meetingInfo.nodeId,

                    };

                    // wps
                    if (navigator.userAgent.includes("DreamSoft")) { // 公司app中
                        if (dsf.config.commonForm.nativeWps) { // 使用wpsApp打开
                            this.wpsOpen(this.popFile)
                            return
                        }
                    }

                    this.showFile = true;
                    this.filename = meetingInfo.znFileName;
                } else {
                    dsf.layer.toast(`请先上传${item.name}！`);
                }
                return
            }
            if (item.url) {
                this.$router.push(`${item.url}?meetingId=${this.$route.query.meetingId}`);
            } else {
                dsf.layer.toast("功能开发中！");
            }
        },
        wpsOpen(doc) {
            let rootPath = dsf.url.getRootPath()
            let loginToken = dsf.util.loadSessionStore("user").auth.token;
            var param = {
                keepCallback: true,
                downUrl: rootPath + `fn/file/download?infoId=${doc.infoId}&fileId=${doc.id}&fileName=${doc.name}&moduleId=${doc.moduleId}&x-auth-token=${loginToken}&fullfilename=${doc.name}`,
                saveUrl: '',
                fileName: doc.name,
                openWithWPS: true,
                uploadFile: true,
                openMode: "readOnly", //不是已办结文件、已办事项 并且后台参数可编辑，允许编辑，否则只读
                enterReviseMode: false,
                showReviewingPaneRightDefault: false,
                userName: dsf.util.loadSessionStore("user").name
            };
            console.log(param);
            $WPS.downAndOpen(param, function (data) {
                console.log(data);
            }, function (data) {
                console.log("错误回调", data);
            });
        },
    }
};
</script>

<style lang="scss" scoped>

.menus {
    display: flex;
    flex-wrap: wrap;
    padding: 100px 50px 30px;

    >div {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-bottom: 60px;
        padding: 35px 30px;
        width: 25%;

        img {
            display: inline-block;
            margin-bottom: 30px;
            width: 150px;
        }
    }

    .sign {
        text-align: center;
        background-color: red;
        color: #fff;
        top: 0;
        right: 24px;
        border-radius: 50%;
    }
}

.preview-outer {
    height: calc(100% - 2.8rem);
}
</style>

<template>
<div class="file-container">
    <div class="top">
        <van-cell :title="title" class="top-back" icon="arrow-left" center @click="$router.back()"></van-cell>
    </div>
    <div class="content">
        <fileList :files="files" @sendFileData="sendFileData"></fileList>
    </div>
    <van-popup v-model="showFile" :close-on-click-overlay="true" class="file-preview" lock-scroll position="bottom" style="height: 100vh">
        <van-cell :title="filename" class="top-back" icon="arrow-left" center @click="closeFile"></van-cell>
        <div class="preview-outer">
            <enclosure-preview ref="enclosurePreview" :file="popFile" :is-preview="isPreview" :is-signature="true" :is-show-cur-person="true" @goPreview="goPreview" @goHandWrite="goHandWrite" :meetingObj="meetingObj"></enclosure-preview>
        </div>
    </van-popup>
</div>
</template>

<script>
import fileList from "@/components/meetingPad/components/fileList";
import EnclosurePreview from "@/components/enclosure/EnclosurePreview";
export default {
    name: "files",
    components: {
        fileList,
        EnclosurePreview
    },
    data() {
        return {
            folderId: this.$route.query.folderId,
            folderModuleId: this.$route.query.folderModuleId,
            files: [],
            meeting: dsf.util.loadSessionStore("meeting"),
            popFile: {},
            showFile: false,
            filename: "",
            isPreview: true,
            showSame: false, //开启同屏
            meetingObj:{
                meetingId: '',
                topicId: '',
                fileId: '',
                mode: 0
            }
        };
    },
    computed: {
        title() {
            return this.$route.query.title || "会议资料";
        }
    },
    created() {
        if (!this.folderId || !this.folderModuleId) {
            this.folderId = this.meeting.id;
            this.folderModuleId = "";
        }
        this.getFolders();
    },
    mounted() {
      this.meetingObj.meetingId = this.meeting.id
    },
    methods: {
        showSameClick() { // 开启关闭同屏
            this.showSame = !this.showSame
        },
        getSameScreenData(file,topicId) { //获取同屏的数据
            this.meetingObj.topicId = topicId
            this.meetingObj.meetingId = dsf.util.loadSessionStore("meeting").id
            this.meetingObj.fileId = file.fileId
        },
        goPreview() {
            this.isPreview = true;
        },
        goHandWrite() {
            this.isPreview = false;
        },
        closeFile() {
            this.$refs.enclosurePreview.destroyInterval(); // 关闭自动重试定时器
            this.showFile = false;
        },
        sendFileData(file, id) {
            //wps
            if (navigator.userAgent.includes("DreamSoft")) { // 公司app中
                if (dsf.config.commonForm.nativeWps) { // 使用wpsApp打开
                    this.wpsOpen(file)
                    return
                }
            }

            this.isPreview = true;
            this.popFile = file;
            this.filename = file.filename;
            this.showFile = true;
            console.log(id);
            this.getSameScreenData(file, id);
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
        getFolders() {
            let self = this;
            dsf.http
                .post(`fn/conferenceMobile/files`, {
                    meetingId: self.meeting.id,
                    folderId: this.folderId,
                    folderModuleId: this.folderModuleId
                })
                .done(result => {
                    if (result.code == 200 && result.data) {
                        result.data.folders.forEach(item => {
                            self.files.push({
                                filesCount: item.filesCount,
                                folderId: item.folderId,
                                folderName: item.folderName,
                                folderModuleId: item.folderModuleId,
                                isNew: false,
                                type: "folder"
                            });
                        });
                        result.data.files.map(item => {
                            self.files.push({
                                fileId: item.fileId,
                                fileName: item.fileName,
                                flowId: item.flowId,
                                isNew: item.isNew,
                                updateTime: item.updateTime,
                                moduleId: item.moduleId,
                                nodeId: item.nodeId,
                                officeModuleId: item.officeModuleId,
                                viewCount: item.count || 0,
                                type: item.fileName
                                    .substr(item.fileName.lastIndexOf(".") + 1)
                                    .toLowerCase()
                            });
                        });
                    }
                })
                .error(error => {
                    console.log("error", error);
                    // dsf.layer.toast("数据获取失败！", false);
                })
                .always(() => {
                    // dsf.layer.closeLoading(self.loading);
                });
        }
    }
};
</script>

<style lang="scss" scoped>
.file-container {
    height: 100%;
    display: flex;
    flex-direction: column;

    .top {
        .van-cell__title {
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            font-weight: 600 !important;

            span {
                font-size: 0.88rem;
                padding-left: 0.4rem;
            }
        }

        .van-cell__left-icon {
            font-size: 0.8rem;
        }
    }

    >.content {
        flex: 1;
        overflow: auto;
        padding: 40px;
    }
}

.preview-outer {
    height: calc(100% - 2.8rem);
}

.label {
    display: inline-block;
    margin-left: 20px;
    width: 80px;
    height: 80px;
    background: url('../../../static/images/platform/conference/kqtp_fx.png') no-repeat;
    background-size: 100% 100%;
}
</style>

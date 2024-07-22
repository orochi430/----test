<template>
<div class="topic-container">
    <van-collapse v-model="activeNames">
        <van-collapse-item v-for="(item, index) in topics" :key="index" :name="index">
            <template slot="title">
                <span class="topic-container-title">{{ item.title }}</span>
                
            </template>
            <template v-if="item.files.length > 0">
                <div v-for="(file, f) in item.files" :key="f" class="file-item" @click="previewFile(file, item)">
                    <div :style="`background-image:url(${typeClass(file)})`" class="file-icon"></div>
                    <div class="file-desc">
                        <div class="file-desc-name">{{ file.fileName }}</div>
                    </div>
                </div>
            </template>
            <div v-if="item&&item.files&&item.files.length == 0" class="no-data">当前议题暂无资料</div>
        </van-collapse-item>
    </van-collapse>
    <!-- <van-image-preview
      v-model="imgPreview"
      :images="previewImg"
      closeable
    ></van-image-preview> -->
    <van-popup v-model="showFile" :close-on-click-overlay="true" class="file-preview" lock-scroll position="bottom" style="height: 100vh">
        <van-cell :title="filename" class="top-back" icon="arrow-left" center @click="closeFile"></van-cell>
        <div class="preview-outer">
            <enclosure-preview ref="enclosurePreview" :file="popFile" :is-show-cur-person="true" :is-preview="isPreview" :is-signature="true" @goPreview="goPreview" @samescreenClick="" @goHandWrite="goHandWrite" :meetingObj="meetingObj"></enclosure-preview>
        </div>
    </van-popup>
    
    
</div>
</template>

<script>
import EnclosurePreview from "@/components/enclosure/EnclosurePreview";
import Vue from "vue";
import {
    Dialog
} from 'vant';
import {
    Collapse,
    CollapseItem
} from "element-ui";
Vue.use(Collapse);
Vue.use(CollapseItem);
export default {
    components: {
        EnclosurePreview,
    },
    props: {
        meeting: {
            type: Object,
            default: () => undefined
        }
    },
    data() {
        return {
            activeNames: [],
            topics: [],
            hasFilePng: [
                "ai",
                "cloud",
                "html",
                "img",
                "jpg",
                "mp3",
                "mp4",
                "pdf",
                "png",
                "ppt",
                "psd",
                "rar",
                "txt",
                "word",
                "wps",
                "xls",
                "zip",
                "folder"
            ],
            fileType: {
                pdf: ["pdf"],
                img: [
                    "jpeg",
                    "bmp",
                    "webp",
                    "svgz",
                    "svg",
                    "gif",
                    "jpg",
                    "ico",
                    "png",
                    "tif"
                ],
                txt: [
                    "txt",
                    "sql",
                    "xml",
                    "html",
                    "css",
                    "js",
                    "java",
                    "php",
                    "bat",
                    "log"
                ],
                word: ["docx", "docm", "doc", "dotx", "dotm", "dot"],
                xls: [
                    "xlsx",
                    "xlsm",
                    "xlsb",
                    "xls",
                    "xltx",
                    "xltm",
                    "xlt",
                    "xlam",
                    "xla",
                    "ods"
                ],
                ppt: [
                    "pptx",
                    "pptm",
                    "ppt",
                    "potx",
                    "potm",
                    "pot",
                    "ppsx",
                    "ppsm",
                    "pps",
                    "ppam",
                    "ppa"
                ]
            },
            imgPreview: false,
            previewImg: [],
            popFile: {},
            showFile: false,
            filename: '',
            isPreview: true,
            showDiolag: false,
            showScreen: false,
            sameFile: {},
            meetingObj:{
                meetingId: '',
                topicId: '',
                fileId: '',
                mode: 0
            }
        };
    },
    created() {
        let self = this;
        self.getData();
    },
    methods: {
        goPreview() {
            this.isPreview = true;
        },
        goHandWrite() {
            this.isPreview = false;
        },
        goto(item) {
            let self = this;
            self.$router.push({
                path: `/meetingPad/index/topic/${item.id}`
            });
        },
        getData() {
            let self = this;
            dsf.http
                .post(`fn/conferenceMobile/meetingTopics`, {
                    meetingId: self.meeting.id
                })
                .done(result => {
                    if (result.code == 200 && result.data.length > 0) {
                        self.topics = result.data;
                        this.activeNames = [];
                        self.topics.forEach((item, index) => {
                            this.activeNames.push(index);
                        });
                    }
                })
                .error(error => {
                    dsf.layer.toast("数据获取失败！", false);
                })
                .always(() => {});
        },
        typeClass(file) {
            let type = file.fileName
                .substr(file.fileName.lastIndexOf(".") + 1)
                .toLowerCase();
            if (this.hasFilePng.includes(type)) `static/images/fileType/${type}.png`;
            for (let key in this.fileType) {
                let value = this.fileType[key];
                if (value.includes(type)) {
                    return `static/images/fileType/${key}.png`;
                }
            }
        },
        previewFile(file, topic) {
            console.log(topic);
            this.meetingObj.topicId = topic.id
            this.meetingObj.meetingId = this.$route.query.meetingId
            this.meetingObj.fileId = file.fileId
            this.setRead(file);
            this.popFile = {
                id: file.fileId,
                name: file.fileName,
                infoId: file.infoId,
                moduleId: file.moduleId,
                isHandwrite: "1",
                flowId: file.flowId,
                nodeId: file.nodeId,
            };

            // wps
            if (navigator.userAgent.includes("DreamSoft")) { // 公司app中
                if (dsf.config.commonForm.nativeWps) { // 使用wpsApp打开
                    this.wpsOpen(this.popFile)
                    return
                }
            }

            this.isPreview = true;
            this.filename = file.fileName;
            this.showFile = true;
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
        closeFile() {
            this.showFile = false;
            this.$refs.enclosurePreview.destroyInterval(); // 关闭自动重试定时器
        },
        // 增加点击次数
        setRead(file) {
            dsf.http
                .post(`fn/conferenceMobile/setRead`, {
                    pk: file.fileId,
                    moduleId: file.moduleId
                })
                .done(result => {
                    console.log("打开文件", result);
                })
                .error(error => {
                    console.log("error", error);
                })
                .always(() => {});
        }
    }
};
</script>

<style lang="scss" scoped>
@import "../../../assets/styles/themes.scss";
@import "../../../assets/styles/mixin.scss";
.topic-container {
    height: 100%;
    width: 100%;
    // padding-left: 0.88rem;

    ::v-deep .van-collapse {
        border-top: none;

        .van-collapse-item__header {
            position: relative;
            display: block;
            height: 2.4rem;
            line-height: 2.4rem;
            font-size: 0.88rem;
            color: #333333;
            font-weight: 700;

            .topic-container-title {
                max-width: calc(100% - 1.25rem);
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
                display: inline-block;
                padding-right: .4rem;
            }
        }

        .van-collapse-item__content {
            padding-bottom: 1rem;
        }

        .van-collapse-item__arrow {
            color: #737373;
            vertical-align: text-top;
            position: relative;
            margin-top: -.08rem;
        }
    }

    .file-item {
        display: flex;
        margin-bottom: 30px;
        align-items: center;

        &:last-child {
            margin-bottom: 0;
        }

        .file-icon {
            min-width: 84px;
            height: 98px;
            background-size: 100% 100%;
        }

        .file-desc {
            margin-left: 20px;

            .file-desc-name {
                font-size: 40px;
                color: #333333;
                margin-bottom: 10px;
            }

            .file-desc-see {
                font-size: 40px;
                color: #999999;
            }
        }
    }

    .no-data {
        width: 100%;
        text-align: center;
        font-size: 32px;
        color: #999999;
    }

    /deep/.van-cell__right-icon {
        padding-top: 20px;
        font-size: 40px !important;
    }

    /deep/.van-cell__title {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding-right: 80px;

        
        span{
            flex: 1;
        }
    }

}

.preview-outer {
    height: calc(100% - 2.8rem);
}
</style>

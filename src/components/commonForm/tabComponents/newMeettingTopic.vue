<template>
<div class="meettingTopic">
    <div class="lists" v-for="(item, index) in lists" :key="index">
        <div class="title" :class="{ active: item.show }" @click="toggle(index)">
            <span :class="{ active: item.show }">{{ item.title }}</span>
            <van-icon :class="{ active: item.show }" name="arrow" />
        </div>
        <div class="texts" style="display:none">
            <div class="inputs">
                <span>汇报人员：</span>
                <p>{{ item.reporter }}</p>
            </div>
            <div class="inputs">
                <span>汇报部门：</span>
                <p>{{ item.reporterDept }}</p>
            </div>
            <div class="inputs">
                <span>汇报时长：</span>
                <p>{{ item.reportTime ? item.reportTime + "(分钟)" : "" }}</p>
            </div>
            <!-- <div class="inputs">
                <span>参会部门：</span>
                <p>{{ item.attendDept }}</p>
            </div>
            <ol class="inputs2" :class="{ active: item.show }">
                <li v-for="(ele, i) in item.tag" :key="i">{{ ele }}</li>
            </ol> -->
            <!-- <div class="inputs">
          <span>议题标签：</span>
          <p>{{ item.tag }}</p>
        </div> -->
            <div class="inputs3" style="border: none" :class="{ active: item.show }">
                <span>议题材料：</span>
            </div>
            <div class="files" :class="{ active: item.show }" v-if="item.attach.length > 0">
                <div v-for="obj in item.attach" :key="obj.id" @click="openFile(obj)">
                    <span>
                        <van-image :src="'../../../../static/images/fileType/' + obj.ext + '.png'">
                            <template v-slot:error>
                                <img src="../../../../static/images/fileType/cloud.png" alt="" srcset="" />
                            </template>
                        </van-image>
                    </span>
                    <p>{{ obj.fileName }}</p>
                </div>
            </div>
        </div>
        <div class="field-box" v-show="item.show">
            <van-field v-model="item.reporter" label="汇报人" readonly />
            <van-field v-model="item.reporterDept" label="汇报部门" readonly />
            <van-field v-model="item.reportTime" label="汇报时长（分钟）" readonly />
            <div class="field-file">
                <div class="field-title">议题材料</div>
                <div class="files" v-if="item.attach.length > 0">
                    <div class="file" v-for="obj in item.attach" :key="obj.id" @click="openFile(obj)">
                        <div class="fileIcon">
                            <img :src="getIconClass(obj.fileName)" alt="" />
                        </div>
                        <div class="fileBody">
                            <div class="fileTitle">
                                {{ obj.fileName }}
                            </div>
                            <div class="fileSize">
                                <span>{{ obj.showFileSize || "" }}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <van-image-preview v-model="imgPreview" :images="previewImg" closeable></van-image-preview>
    <van-popup v-model="showFile" :close-on-click-overlay="true" class="file-preview" lock-scroll position="bottom" style="height: 100vh" get-container="#app">
        <!-- <van-nav-bar
        :title="filename"
        left-text="返回"
        left-arrow
        fixed
        placeholder
        @click-left="closeFile"
      >
      </van-nav-bar> -->
        <!-- <file :file-url="fileUrl" style="height: calc(100vh - 0.92rem)"></file> -->
        <van-nav-bar :title="filename" @click-left="closeFile()" @click-right="closeFile()">
            <template v-if="appTopMenu" #left>
                <van-icon name="arrow-left" /><span>返回</span>
            </template>
            <template v-else #right>
                <span>关闭文件</span>
            </template>
        </van-nav-bar>
        <enclosure-preview :file="popFile" v-if="dsf.config.commonForm.LocalDocPreview" :is-preview="true" :is-show-cur-person="true"></enclosure-preview>
        <iframe v-else id="filePreview" :src="fileUrl" :key="`${popFile.id}_${new Date()}`" frameborder="0" />
    </van-popup>
</div>
</template>

<script>
import file from "@/components/common/file";
// import EnclosurePreview from "@/components/enclosure/EnclosurePreview";
export default {
    props: {
        formData: {
            type: Object,
            default: {},
        },
    },
    name: "meettingTopic",
    components: {
        file,
        'EnclosurePreview': () => import('@/components/enclosure/EnclosurePreview'),
    },
    data() {
        return {
            lists: [],
            imgType: [
                "jpeg",
                "bmp",
                "webp",
                "svgz",
                "svg",
                "gif",
                "jpg",
                "ico",
                "png",
                "tif",
            ],
            imgPreview: false,
            previewImg: [],
            showFile: false,
            filename: "",
            fileUrl: "",
            fileType: "",
            popFile: {},
            appTopMenu: dsf.config.appTopMenu.value,
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
                    "tif",
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
                    "log",
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
                    "ods",
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
                    "ppa",
                ],
            },
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
                "ofd",
            ],
        };
    },
    computed: {},
    watch: {},
    methods: {
        toggle(index) {
            this.$set(this.lists[index], "show", !this.lists[index].show);
        },
        initTopicData() {
            dsf.http
                .post("/fn/meetingNotice/getTopic", {
                    pk: this.formData.main["A0001"].value,
                })
                .then((res) => {
                    console.log(res.data.data);
                    if (res.data.code == 200 && res.data.data.length > 0) {
                        res.data.data.forEach((item, index) => {
                            if (index == 0) {
                                item.show = true;
                            } else {
                                item.show = false;
                            }
                            if (item.attach && item.attach.length > 0) {
                                item.attach.forEach((obj) => {
                                    obj.ext = "";
                                    obj.ext = obj.fileName
                                        .substr(obj.fileName.lastIndexOf(".") + 1)
                                        .toLowerCase();
                                });
                            }
                            if (item.tag) {
                                item.tag = item.tag.split(",");
                                item.tag.push(item.reportTime + "min");
                            }
                            console.log(item.attach);
                        });
                        this.lists = res.data.data;
                    }
                });
        },
        //打开附件
        openFile(item) {
            console.log(item);
            this.filename = item.fileName;
            this.fileType = item.fileName.substr(item.fileName.lastIndexOf(".") + 1);
            const loginToken = dsf.util.loadSessionStore("loginToken");
            let url = "";
            if (this.imgType.indexOf(this.fileType) > -1) {
                // 图片格式的预览地址
                url = dsf.url.getServerUrl(
                    `fn/mobileFileDownload/download?fileId=${item.fileId}&moduleId=${this.moduleId}&fileName=${item.fileName}`
                );
                this.imgPreview = true;
                this.previewImg = [url];
            } else {
                url = dsf.url.getServerUrl(
                    `fn/office/openMobileOffice?fileId=${item.fileId}&moduleId=${this.moduleId}&x-auth-token=${loginToken}`
                );
                if (dsf.config.previewSetting.previewType == 4) {
                    dsf.http
                        .post(`fn/office/mobile/wpsPreview`, {
                            fileId: item.fileId,
                            readOnly: item.canEdit > 0 ? true : false,
                        })
                        .then(({
                            data
                        }) => {
                            this.showFile = true;
                            this.fileUrl = data.data;
                        });
                } else if (dsf.config.commonForm.webViewPreview) {
                    let tempurl =
                        dsf.config.serverUrl + dsf.config.webRoot + url.replace("../", "");
                    console.log(tempurl);
                    xsfWindow.openWebView({
                        title: item.fileName,
                        url: tempurl,
                        colorString: "#111111",
                    });
                } else {
                    this.showFile = true;
                    this.fileUrl = url;
                    this.popFile = {
                        id: item.fileId,
                        name: item.filename,
                        infoId: item.infoId,
                        moduleId: item.moduleId,
                        flowId: item.flowId,
                        nodeId: item.nodeId,
                    };
                }
            }
        },
        closeFile() {
            this.showFile = false;
        },
        getIconClass(title) {
            let startIndex = title.lastIndexOf(".");
            let str = startIndex > -1 ? title.substring(startIndex + 1, title.length).toLowerCase() : "";
            if (this.hasFilePng.indexOf(str) > -1)
                return require(`static/images/newFileType/${str}.png`);
            for (let key in this.fileType) {
                let value = this.fileType[key];
                if (value.indexOf(str) > -1) {
                    return require(`static/images/newFileType/${key}.png`);
                }
            }
            return require(`static/images/newFileType/word.png`);
        },
    },
    created() {},
    mounted() {
        this.initTopicData();
    },
    destroyed() {},
};
</script>

<style lang="scss" scoped>
@import "../../../assets/styles/themes.scss";
@import "../../../assets/styles/mixin.scss";

.meettingTopic {
    width: 100%;
    height: auto;
    box-sizing: border-box;
    padding: 10px;

    .lists {
        width: 100%;
        height: auto;
        // background: #fff;
        // box-sizing: border-box;
        // padding: 15px 15px 5px;
        // border-radius: 5px;
        // margin-bottom: 10px;

        .title {
            margin-bottom: 10px;
            width: 100%;
            display: flex;
            align-items: center;
            background: #FFFFFF;
            // border: 1px solid rgba(230, 230, 230, 1);
            border-radius: 3px;
            box-shadow: 0px 0px 6px 0px rgba(0, 0, 0, 0.08);
            padding: 15px 10px;
            box-sizing: border-box;
            //   &::before {
            //     width: 4px;
            //     height: 20px;
            //     @include background-theme("normal");
            //     content: "";
            //     margin-right: 10px;
            //   }

            &>span {
                flex: 1;
                font-size: var(--font_size_0);
                color: #333;
                font-weight: bold;
            }

            .van-icon {
                flex-shrink: 0;
                font-size: var(--font_size_0);
                color: #999;
                transition: all linear 0.2s;
                // transform: rotate(270deg);

                &.active {
                    transform: rotate(90deg);
                    transition: all linear 0.2s;
                }
            }
        }

        .texts {
            width: 100%;
            height: auto;
            box-sizing: border-box;
            //   padding-left: 14px;
            background: #FFFFFF;
            border: 1px solid rgba(230, 230, 230, 1);
            box-shadow: 0px 0px 6px 0px rgba(0, 0, 0, 0.08);
            border-radius: 3px;

            .inputs {
                margin: 5px 0;
                width: 100%;
                min-height: 21px;
                display: flex;
                align-items: flex-start;
                // border-bottom: 1px solid #ebebeb;

                span {
                    width: 80px;
                    font-size: var(--font_size_3);
                    color: #333;
                }

                p {
                    flex: 1;
                    font-size: var(--font_size_3);
                    color: #666;
                }

                &:last-child {
                    border: none;
                }
            }

            .inputs2 {
                display: flex;
                align-items: center;
                flex-wrap: wrap;
                margin-top: 10px;
                padding-bottom: 5px;

                &.active {
                    border-bottom: 1px solid #ebebeb;
                }

                li {
                    margin-bottom: 10px;
                    margin-right: 8px;
                    padding: 0 8px;
                    height: 24px;
                    line-height: 24px;
                    text-align: center;
                    @include font-theme("normal");
                    border: 1px solid;
                    @include border-color-theme("normal", true);
                    border-radius: 14px;
                }
            }

            .inputs3 {
                margin: 15px 0 10px;
                display: none;

                &.active {
                    display: block;
                    transition: all linear 0.8s;
                }

                span {
                    font-size: var(--font_size_2);
                    color: #333;
                    font-weight: bold;
                }
            }

            .files {
                width: 100%;
                height: auto;
                margin: 15px 0 20px;
                display: none;

                &.active {
                    display: block;
                    transition: all linear 0.8s;
                }

                &>div {
                    width: 100%;
                    min-height: 30px;
                    display: flex;
                    box-sizing: border-box;
                    padding-left: 10px;

                    &>span {
                        width: 14px;
                        height: auto;
                        flex-shrink: 0;
                        margin-right: 10px;
                        margin-top: 5px;

                        .van-image {
                            width: 14px;
                            height: 17px;
                        }
                    }

                    &>p {
                        margin-top: 2px;
                        font-size: var(--font_size_2);
                        @include font-theme("normal");
                    }
                }
            }
        }

        .field-box {
            width: 100%;

            ::v-deep .van-field {
                border-bottom: 5px solid rgba(248, 248, 248, 1);
                padding: 15px 10px;

                .van-cell__title {
                    font-size: var(--font_size_2);
                    color: #333333;
                    letter-spacing: 0;
                    line-height: 24px;
                    font-weight: 400;
                    width: 128px;
                }

                .van-field__control {
                    font-size: var(--font_size_2);
                    color: #333333;
                    letter-spacing: 0;
                    line-height: 24px;
                    font-weight: 400;
                }

                &:first-child .van-field__control {
                    color: #0086D9;
                }
            }

            .field-file {
                border-bottom: 5px solid rgba(248, 248, 248, 1);
                padding: 15px 10px;
                background: #FFFFFF;

                .field-title {
                    font-size: var(--font_size_2);
                    color: #333333;
                    letter-spacing: 0;
                    line-height: 24px;
                    font-weight: 400;
                    margin-bottom: 10px;
                }

                .files {

                    .file {
                        display: flex;
                        position: relative;
                        align-items: center;

                        .van-icon-passed {
                            margin: 14px 10px 0 0;
                            @include font-theme("normal");
                        }

                        .fileIcon {
                            margin-right: 10px;

                            img {
                                width: 30px;
                                height: 30px;
                            }

                            i {
                                margin-top: 10px;
                                font-size: 36px;
                                color: #999;
                            }
                        }

                        .fileBody {
                            flex: 1;
                            overflow: hidden;

                            .fileTitle {
                                font-size: 15px;
                                line-height: 24px;
                                width: 90%;

                                i {
                                    @include font-theme("normal");
                                    display: inline-block;
                                    transform: rotate(-45deg);
                                    font-size: 18px;
                                }
                            }

                            .fileSize {
                                display: flex;
                                color: #999;
                                font-size: var(--font_size_4);
                                // padding-top: 10px;
                            }

                            .fileDelButton {
                                display: inline-block;
                                text-align: center;
                                white-space: nowrap;
                                font-size: var(--font_size_0);
                                color: black;
                                position: absolute;
                                top: 0;
                                right: 0;
                            }
                        }

                        .sortIcon {
                            display: flex;
                            align-items: flex-end;

                            .sort {
                                @include font-theme("normal");
                            }
                        }
                    }

                }
            }
        }
    }
}

.van-nav-bar {
    @include font-theme("normal");

    .van-icon {
        @include font-theme("normal");
        @include font_5;
        margin-right: 3px;
    }

    .van-nav-bar__title {
        font-weight: bold;
    }
}
</style>

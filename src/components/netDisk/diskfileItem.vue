<template>
<div v-if="showData">
    <van-swipe-cell>
        <div class="file" @click="link">
            <div class="typeIcon">
                <img :src="typeClass" alt="" />
                <van-badge v-if="file.isNew" dot />
            </div>
            <div class="info">
                <div class="title elps">{{ file.fullName }}</div>
                <div class="sub flex jb">
                  <span v-if="file.createUName" class="elps">上传人：{{file.createUName}}</span>
                  <span v-if="file.createTime" style="flex-shrink: 0;">时间：{{file.createTime}}</span>
                </div>
                <div class="sub">{{file.directoryPath}}</div>
            </div>
        </div>
        <template #right>
            <van-button v-if="file.allowDelete" type="danger" text="删除" @click="deleteFile" />
            <van-button v-if="file.allowEdit" color="#07c160" type="primary" text="重命名" @click="doRename" />
        </template>
    </van-swipe-cell>

    <van-image-preview v-model="imgPreview" :images="previewImg" closeable></van-image-preview>
    <!-- 播放弹框 -->
    <van-popup :style="{ height: '100%' }" v-model="video.showVideo" :close-on-click-overlay="false" lock-scroll position="bottom" get-container="#app">
        <div v-if="video.showVideo">
            <VPlayer :video="video"></VPlayer>
        </div>
    </van-popup>
    <van-dialog v-model="showRename" cancel-button-color="#999999" title="重命名" show-cancel-button @confirm="handleRename" @cancel="cancelDialog">
        <div class="nameinput">
            <input type="text" v-model.trim="reName" placeholder="请输入文件名" maxlength="100">
        </div>
    </van-dialog>
    <van-popup v-model="showFile" :close-on-click-overlay="true" class="file-preview" lock-scroll position="bottom" style="height: 100vh">
        <van-nav-bar :title="file.name" left-text="返回" left-arrow fixed placeholder @click-left="closeFile">
        </van-nav-bar>
        <enclosure-preview v-if="dsf.config.commonForm.LocalDocPreview" :file="file" :form-info="fileData" ref="enclosurePreview" officeModuleId="skyDrive"></enclosure-preview>
    </van-popup>
</div>
</template>

<script>
import {
    Badge
} from "vant";
// import VPlayer from "@/components/common/VideoPlayer";
import EnclosurePreview from "@/components/enclosure/EnclosurePreview";
export default {
    components: {
        [Badge.name]: Badge,
        'VPlayer': () => import('@/components/common/VideoPlayer'),
        EnclosurePreview
    },
    props: {
        file: {
            type: Object,
            default: () => {},
        },
        isShowCount: {
            type: Boolean,
            default: true
        },
        queryType: {
            type: String,
            default: ''
        }
    },
    watch: {
        file: {
            handler(newValue, oldValue) {
                this.file.fullName = this.getName(newValue, newValue.type)
            },
            deep: true,
            immediate: true
        }
    },
    data() {
        return {
            showData: true,
            reExt: "", //用于存储文件后缀
            reName: "", //用于存储文件名
            showRename: false,
            video: {
                showVideo: false,
                videoTitle: "",
            },
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
                wps: ["wps"],
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
                video: ["mp4"],
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
                "folder",
            ],
            imgPreview: false,
            previewImg: [],
            fileData: {},
            showFile: false
        };
    },
    created() {
        // console.log(this.file);
    },
    computed: {
        typeClass() {
            let type = this.file.type.toLowerCase();
            if (this.hasFilePng.includes(type)) {
                if (type == "folder") {
                    //陕西的文件夹要求有特殊的图片
                    if (dsf.config.diskFileItem && dsf.config.diskFileItem.folderPng) {
                        return `static/images/${dsf.config.diskFileItem.folderPng}`;
                    }
                    return `static/images/fileType/${type}.png`;
                } else {
                    //陕西的文件夹要求有特殊的图片
                    if (dsf.config.diskFileItem && dsf.config.diskFileItem.filePng) {
                        return `static/images/${dsf.config.diskFileItem.filePng}`;
                    }
                    return `static/images/fileType/${type}.png`;
                }
            }
            for (let key in this.fileType) {
                let value = this.fileType[key];
                if (value.includes(type)) {
                    return `static/images/fileType/${key}.png`;
                }
            }
        }
    },
    methods: {
        getName(file, type) {
            if (type == "folder") {
                return file.driveName || file.name;
            } else {
                if (dsf.config.diskFileItem && dsf.config.diskFileItem.hideFileType) {
                    //return `static/images/${dsf.config.diskFileItem.folderPng}`;
                    let temp = file.fileName || file.name;
                    temp = temp.replace("." + file.type, "") //temp.substring(0, temp.indexOf("."));
                    return temp;
                } else {
                    return file.fileName || file.name;
                }
            }
        },
        checkType(type) {
            let temp = false;
            for (let key in this.fileType) {
                let value = this.fileType[key];
                if (value.includes(type)) {
                    temp = true;
                    break;
                }
            }
            return temp;
        },
        link() {
            let self = this;
            if (self.file.type == "folder") {
                console.log(self.file)
                self.$router.push({
                    name: "diskFile",
                    params: {
                        driveType: (self.file.driveType || self.queryType) || -1,
                        folderid: self.file.id || -1,
                        allowAdd: self.file.allowAdd
                    },
                });
            } else {
                let fileType = self.file.type;
                if (fileType && self.checkType(fileType.toLowerCase())) {
                    fileType = fileType.toLowerCase();
                    if (self.fileType.img.includes(fileType)) {
                        let url = dsf.url.getServerUrl(
                            `fn/skydrive/download?pk=${self.file.id}&fileName=${self.file.name}`
                        );
                        this.imgPreview = true;
                        this.previewImg = [url];
                    } else if (fileType.includes("mp4")) {
                        let url = dsf.url.getServerUrl(
                            `fn/skydrive/download?pk=${self.file.id}&fileName=${self.file.name}`
                        );
                        self.video.showVideo = true;
                        self.video.videoTitle = self.file.name;
                        self.video.src = url;
                    } else {
                        let previewUrl = dsf.url.getServerUrl(
                            `fn/office/openMobileOffice?moduleId=190427152140nmiGu76moaSpanLaHnY&fileId=${self.file.id}&officeModuleId=skyDrive&filename=${self.file.name}`
                        );
                        if (dsf.config.commonForm.LocalDocPreview) {
                            self.showFile = true;
                        } else if (dsf.config.commonForm.wdzt?.isEnable) {
                          let param = {
                            edit: false,
                            fileId: self.file.id,
                            fileName: self.file.name,
                            infoId: self.file.id,
                            moduleId: '190427152140nmiGu76moaSpanLaHnY',
                            officeModuleId: 'skyDrive',
                            pId: 0,
                            pnId: 0
                          }
                          self.$router.push({ path: '/wdztFileOpen', query: param })
                        } else {
                            self.$router.push({
                                name: "dsfIframe",
                                params: {
                                    url: previewUrl,
                                    title: self.file.name,
                                },
                                query: {
                                    url: previewUrl,
                                    title: self.file.name.split('.')[0],
                                }
                            });
                        }

                    }
                } else {
                    dsf.layer.toast("当前文件不支持查看");
                }
            }
        },
        doRename() {
            if (this.file.allowEdit) {
                if (this.file.type == 'folder') {
                    this.reExt = ""
                    this.reName = this.getName(this.file, "folder")
                } else {
                    let name = this.getName(this.file, "file")
                    this.reExt = name.substr(name.lastIndexOf("."))
                    this.reName = name.substr(0, name.lastIndexOf("."))
                    console.log(this.reExt)
                }
                this.showRename = true
            } else {
                dsf.layer.toast("此文件/文件夹您无权操作");
            }
        },
        handleRename() {
            console.log(this.file)
            let that = this
            if (!this.reName) {
                dsf.layer.toast("请输入文件名称！");
                return
            }
            //先判断是否重名
            dsf.http.post("fn/skydrive/checkName", {
                fid: this.file.fId,
                id: this.file.id,
                name: this.reName + this.reExt,
                queryType: this.queryType
            }).then(res => {
                console.log(res)
                if (res && res.data && res.data.type == 'success') {
                    dsf.http.post("fn/skydrive/reName", {
                        fid: that.file.fId,
                        id: that.file.id,
                        name: that.reName + that.reExt,
                        queryType: that.queryType
                    }).then(res => {
                        if (res && res.data && res.data.type == 'success') {
                            that.$set(that.file, "name", that.reName + that.reExt)
                            that.$set(that.file, "fileName", that.reName + that.reExt)
                        }
                    });
                } else {
                    dsf.layer.toast("已经存在相同名称文件或文件夹，请使用其他名称！");

                }
            });

        },
        cancelDialog() {
            this.showRename = false
            this.reExt = ""
            this.reName = ""
        },

        deleteFile() {
            console.log(this.file)
            let that = this
            if (this.file.allowDelete) {
                this.$dialog.confirm({
                        title: "提示",
                        message: "您确认要删除此文件或文件夹吗？",
                    })
                    .then(() => {
                        dsf.http.post("fn/skydrive/delete", {
                            id: this.file.id,
                            name: this.file.name,
                            fileSize: this.file.fileSize
                        }).then(res => {
                            console.log(res)
                            if (res && res.data && res.data.code == '200') {
                                that.showData = false
                            }
                        });
                    });
            } else {
                dsf.layer.toast("此文件/文件夹您无权操作");
            }
        },
        closeFile() {
            this.showFile = false;
            this.$refs.enclosurePreview.destroyInterval(); // 关闭自动重试定时器
        },
    },
};
</script>

<style lang="scss" scoped>
.file {
    padding: 0.32rem 0.4rem;
    background-color: #fff;
    display: flex;
    align-items: center;
    .typeIcon {
        width: 0.6rem;
        // height: 0.5rem;
        margin-right: 0.4rem;
        position: relative;
        flex-shrink: 0;
        ::v-deep .van-badge {
            position: absolute;
            top: 0;
            right: -4px;
        }
    }

    .info {
        flex: 1;
        overflow: hidden;
        // padding-top: 8px;
        .title {
          font-size: var(--font_size_2);
          line-height: 26px;
        }
        .sub {
          font-size: var(--font_size_4);
          color: #666;
          line-height: 20px;
        }
        .num {
            font-size: var(--font_size_4);
            color: #999;
            padding-top: 0.1rem;
        }
    }
}

::v-deep .van-swipe-cell__right {
    background: #FFF;
    display: flex;
    align-items: center;
}

.nameinput {
    width: 100%;
    padding: 20px 15px;

    input {
        outline: none;
        border: 1PX solid #ebebeb;
        box-sizing: border-box;
        padding: 0 10px;
        font-size: var(--font_size_3);
        color: #333;
        width: 100%;
        height: 40px;
    }
}
</style>

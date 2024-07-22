<template>
    <div v-if="fileData.canShow == 1" class="fileTypeList" :style="{ padding: fileTypeListPadding }">
        <div class="fileTypeName" v-if="isShowLable">
            <div :class="['name', `size-${dsf.config.commonForm.fontLevel ? dsf.config.commonForm.fontLevel : 3}`, {'required': fileData.allowVerify > 0 && isMobileForm}]"
                :style="{ fontWeight: isControl ? 'normal' : 'bold' }">
                {{ fileData.name || fileData.attachTypeText }}
            </div>

            <van-uploader result-type="file" :after-read="afterRead" class="upload-btn" v-if="
                fileData.allowUpload > 0 ||
                fileData.allowMaintain > 0 &&
                dsf.config.projectName != 'ribao'" :accept="accept">
                <!-- <van-icon size="0.48rem" name="add-o" /> -->
                <i class="iconfont iconKHCFDC_fujian"></i>
            </van-uploader>
            <van-icon v-if="dsf.config.ddSetting.isDing && dsf.config.projectName == 'ribao'" @click="DingUpload"
                size="0.48rem" name="add-o" />
        </div>
        <draggable :group="fileData.attachType" delay="100" class="list-group" ghost-class="ghost" v-model="fileData.file"
            :disabled="fileData.allowMaintain != 1" @sort="onSortEnd">
            <div :class="['fileList', {nopaddingTop: !isShowLable}]" v-for="(item, index) in fileData.file" :key="item.id">
                <div class="file">
                    <van-icon name="passed" size="0.40rem" v-if="showClickIcon && item.id == previewId" />
                    <div class="fileIcon" @click="openFile(item.url, item)" v-if="enclosureStyle == 'complex'">
                        <img :src="getIconClass(item.title)" alt="" />
                    </div>
                    <div class="fileBody" @click="openFile(item.url, item)">
                        <!-- <div class="fileDelButton" @click.stop="deleteFile(item)" v-if="fileData.canDelete > 0 && dsf.config.commonForm.canEditFile">
                        <van-icon name="clear" />
                    </div> -->
                        <div class="fileTitle" :class="{ ellipsis: enclosureStyle != 'noIcon', }"
                            :style="{ width: fileData.canDelete > 0 ? '90%' : '100%', }">
                            <img v-if="enclosureStyle == 'simple'" :src="getIconClass(item.title)"
                                alt="" style="width: 0.3rem; display: inline-block; vertical-align: sub" />
                            <!-- <i class="iconfont iconattachment" v-if="dsf.config.commonForm.enclosureStyle == 'simple'"></i> -->
                            <span v-if="item.mjText" style="color:#E50012">[{{ item.mjText }}]</span>
                            {{ fileData.showSuffix == -1 ? item.title.substring(0, item.title.lastIndexOf(".")) : item.title }}
                        </div>
                        <div class="fileSize" v-if="
                            enclosureStyle != 'simple'">
                            <span>{{ item.size != '0Byte' ? item.size : "" }}</span>
                        </div>
                    </div>
                    <div class="handleIcon">
                        <Icon size="0.4rem" class="iconfont icongengduo3" color="#999999" @click="showHandleIcon(item)" v-if="item.showMore" />
                        <Icon size="0.4rem" class="iconfont iconpaixu" color="#999999" v-if="fileData.allowMaintain == 1 && fileData.file.length > 1 " />
                    </div>
                    <!-- <div class="sortIcon" v-if="fileData.allowMaintain == 1">
                        <van-icon name="sort" size="18" class="sort" />
                    </div> -->
                </div>
                <div class="fileBtn" style="display:none">
                    <div class="fileButton" @click.stop="openFile(item.url, item, 'edit')"
                        v-if="item.canEdit > 0 && dsf.config.commonForm.canEditFile && ifFileEdit(item.title)">
                        编辑
                    </div>
                    <div class="fileButton" @click.stop="handWrite(item, index)" v-if="item.isHandwrite > 0">
                        签批
                    </div>
                    <div class="fileButton" @click.stop="downFile(item.url, item, 'downFile')" v-if="
                        dsf.util.getClientName() == 'app' && dsf.util.checkSystem() != 'ios' && !dsf.config.commonForm.NoDownload && (fileData.canDownLoad == '1')
                    ">
                        下载
                    </div>
                    <div class="fileButton" @click.stop="rename(item)" v-if="
                        fileData.allowMaintain == '1' && fileData.maintainFunc && fileData.maintainFunc.split(',').includes('1') &&
                        !dsf.config.commonForm.hideFileRename">
                        重命名
                    </div>
                    <div class="fileButton"
                        v-if="!dsf.config.commonFlow.hiddenSaveDing && dsf.config.ddSetting && dsf.config.ddSetting.dingdingType == 'dingding'"
                        @click.stop="SaveDing(item, index)">
                        存钉盘
                    </div>
                    <div class="fileButton" v-if="fileData.canDelete > 0"
                        @click.stop="deleteFile(item)">
                        删除
                    </div>
                </div>
            </div>
        </draggable>
        <div>
            <van-dialog v-model="show" title="重命名" get-container="#app" show-cancel-button @cancel="show = false"
                @confirm="confirmRename">
                <van-field v-model="reTitle" class="re-title" />
            </van-dialog>
        </div>
        <van-popup :get-container="getContainer" :lock-scroll="true" v-model="showMore" round close-icon-position="top-right" position="bottom">
            <div class="popup-title">
                <Icon slot="icon" size="0.4rem" class="iconfont iconxialajiantou" color="#000000" @click="showMore = false" />更多
            </div>
            <div class="popup-btn">
                <Grid :column-num="4" clickable :border="false">
                    <GridItem @click.stop="moreBtnClick(clickItem, 'reUpload')" v-if="fileData.allowMaintain == 1">
                        <Icon slot="icon" size="0.48rem" class="iconfont iconKHCFDC_fujian" color="#333333" />
                        <span slot="text" class="grid-text">重新上传</span>
                    </GridItem>
                    <GridItem @click.stop="moreBtnClick(clickItem, 'edit')" v-if="clickItem.canEdit > 0 && dsf.config.commonForm.canEditFile && ifFileEdit(clickItem.title)">
                        <Icon slot="icon" size="0.48rem" class="iconfont iconbianji1" color="#333333" />
                        <span slot="text" class="grid-text">编辑</span>
                    </GridItem>
                    <GridItem @click.stop="moreBtnClick(clickItem, 'sign')" v-if="clickItem.isHandwrite > 0">
                        <Icon slot="icon" size="0.48rem" class="iconfont iconqianpi" color="#333333" />
                        <span slot="text" class="grid-text">签批</span>
                    </GridItem>
                    <GridItem @click.stop="moreBtnClick(clickItem, 'download')" v-if="dsf.util.getClientName() == 'app' && dsf.util.checkSystem() != 'ios' && !dsf.config.commonForm.NoDownload && (fileData.canDownLoad == '1')">
                        <Icon slot="icon" size="0.48rem" class="iconfont iconxiazai" color="#333333" />
                        <span slot="text" class="grid-text">下载</span>
                    </GridItem>
                    <GridItem @click.stop="moreBtnClick(clickItem, 'rename')" v-if="fileData.allowMaintain == '1' && fileData.maintainFunc && fileData.maintainFunc.split(',').includes('1') && !dsf.config.commonForm.hideFileRename">
                        <Icon slot="icon" size="0.48rem" class="iconfont iconzhongmingming" color="#333333" />
                        <span slot="text" class="grid-text">重命名</span>
                    </GridItem>
                    <GridItem @click.stop="moreBtnClick(clickItem, 'saveDing')" v-if="!dsf.config.commonFlow.hiddenSaveDing && dsf.config.ddSetting && dsf.config.ddSetting.dingdingType == 'dingding'">
                        <Icon slot="icon" size="0.48rem" class="iconfont iconcundingpan" color="#333333" />
                        <span slot="text" class="grid-text">存钉盘</span>
                    </GridItem>
                    <GridItem @click.stop="moreBtnClick(clickItem, 'delete')" v-if="fileData.canDelete > 0">
                        <Icon slot="icon" size="0.48rem" class="iconfont iconshanchu" color="#333333" />
                        <span slot="text" class="grid-text">删除</span>
                    </GridItem>
                </Grid>
            </div>
        </van-popup>
        <van-uploader ref="uploader" result-type="file" :after-read="afterReUpload" class="upload-btn" :accept="accept" style="display: none">
          <van-icon size="0rem" name="add-o" />
        </van-uploader>
    </div>
</template>

<script>
import dsf from "../../common";
// import draggable from "vuedraggable";
import {
    Icon,
    Popup,
    Grid,
    GridItem
} from 'vant';
export default {
    name: "EnclosureItem",
    inject: {
        isMobileForm: {value: 'isMobileForm', default: true}
    },
    components: {
        "draggable": () => import("vuedraggable"),
        Icon,
        Popup,
        Grid,
        GridItem
    },
    props: {
        name: {
            type: String,
            require: true,
        },
        size: {
            type: String,
            default: "",
        },
        url: {
            type: String,
            require: true,
        },
        itemData: {
            type: Object,
            require: true,
        },
        index: {
            type: Number,
            default: 0,
        },
        fileData: {
            type: Object,
            require: true,
        },
        formInfo: {
            type: Object,
            require: true,
        },
        isControl: {
            type: Boolean,
            default: false,
        },
        showLable: {
            type: Boolean,
            default: true,
        },
        showClickIcon: {
            type: Boolean,
            default: false,
        },
        previewId: {
            type: String,
            require: true,
        },
        formMeta: {
            type: Object,
            default: () => { }
        },
        formData: {
            type: Object,
            default: () => { }
        },
        metaData: {
          type: Object
        }
    },
    data() {
        return {
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
            show: false,
            reTitle: "",
            reType: "",
            reItem: {},
            accept: (dsf.util.checkSystem() == 'ios' || dsf.util.getClientName().includes('ding')) ? "*" : "image/*, application/*",
            openFileId: '',
            showMore: false,
            clickItem: {}
        };
    },
    computed: {
        suffix() {
            let startIndex = this.name.lastIndexOf(".");
            if (startIndex !== -1)
                return this.name
                    .substring(startIndex + 1, this.name.length)
                    .toLowerCase();
            else return "";
        },
        type() {
            for (let key in this.fileType) {
                let value = this.fileType[key];
                if (value.indexOf(this.suffix) > -1) {
                    return key;
                }
            }
            return "OTHER";
        },
        isShowLable() {
            if (!this.isMobileForm && this.fileData?.allowMaintain <= 0) {
                return false
            }
            if (!this.showLable) {
                if (
                    this.fileData &&
                    this.fileData.allowMaintain > 0
                ) {
                    return true;
                } else {
                    return false;
                }
            }
            return true;
        },
        fileTypeListPadding() {
            if (
                !this.isShowLable &&
                this.fileData &&
                this.fileData.file.length <= 0
            ) {
                // 如果无文件又不显示文件类型标题
                return "0";
            } else if (this.isControl) {
                // 是控件的无左右边距,且上下边距根据dsf.config.commonForm.controlPadding，默认0.2rem
                return `${dsf.config.commonForm.controlPadding || "0.3rem"} 0`;
            } else {
                return "0.2rem";
            }
        },
        enclosureStyle() {
            const STYLES = ['complex', 'noIcon', 'simple']
            let eatraClass = this.metaData?.extra.eatraClass ? this.metaData.extra.eatraClass.split(',') : []
            let findstyle = eatraClass.find(item => STYLES.includes(item))
            if (findstyle) {
                return findstyle
            } else {
                return dsf.config.commonForm.enclosureStyle ? dsf.config.commonForm.enclosureStyle : 'complex'
            }
        }
    },
    created() {
        // this.openFileId = this.fileData.file.length ? this.fileData.file[0].id : '';
        console.log(this.fileData)
        this.fileHandleBtn()
    },
    methods: {
        ifFile(title) {
            return !(title.includes(".png") || title.includes(".jpg") || title.includes(".mp4") || title.includes(".jpeg") || title.includes(".bmp") || title.includes(".gif") || title.includes(".mp4"))
        },
        ifFileEdit(title) {
            const index = title.lastIndexOf(".");
            const suffix = title.substr(index + 1);
            let typeList = ['doc','docx','wps','xls','xlsx','et','ppt','pptx']
            return typeList.some(item => item == suffix.toLowerCase())
        },
        openFile(url, item, edit) {
            if (!edit && item.isHandwrite > 0) {
                this.handWrite(item)
            } else {
                this.$emit("open", url, item, edit);
            }
            // this.openFileId = item.id;
        },
        downFile(url, item, edit) {
            let downLoading = dsf.layer.loading("下载中...")
            var uri = encodeURI(dsf.url.getRootPath() + item.initUrl);
            let filename =
                item.title.substr(0, item.title.indexOf(".")) +
                moment(new Date()).format("YYYYMMDDHHss") +
                item.title.substr(item.title.indexOf("."));
            let fileURL = "/Download/item/" + filename;

            if (this.$route.query.isdjOpen) {

                window.openNativeResult = function (result) {
                    dsf.layer.closeLoading(downLoading)
                    result = JSON.parse(result)
                    console.log(result);
                    if (result.action != "FileTransfer.download") return
                    if ("source" in result) {
                        dsf.layer.toast("下载失败！", false)
                        console.log("download error source " + result.source);
                        console.log("download error target " + result.target);
                        console.log("upload error code" + result.code);
                    } else {
                        dsf.layer.alert({
                            message: "文件已下载到 " + fileURL,
                        });
                    }
                }
                let params = { array: [uri, fileURL, false, "id", { Authorization: "Basic dGVzdHVzZXJuYW1lOnRlc3RwYXNzd29yZA==" }] }
                window.androidMethod.openNative(JSON.stringify({ action: "FileTransfer.download", data: params }))

            } else {
                var fileTransfer = new FileTransfer();
                fileURL = cordova.file.externalRootDirectory + fileURL
                fileTransfer.download(
                    uri,
                    fileURL,
                    function (entry) {
                        dsf.layer.closeLoading(downLoading)
                        dsf.layer.alert({
                            message: "文件已下载到 " + "/Download/item/" + filename,
                        });
                    },
                    function (error) {
                        dsf.layer.closeLoading(downLoading)
                        console.log("download error source " + error.source);
                        console.log("download error target " + error.target);
                        console.log("upload error code" + error.code);
                    },
                    false, {
                    headers: {
                        Authorization: "Basic dGVzdHVzZXJuYW1lOnRlc3RwYXNzd29yZA==",
                    },
                }
                );
            }
        },
        SaveDing(item, index) {
            dsf.http
                .post("fn/DingDing/upload2DingDrive", {
                    fileId: item.id,
                })
                .then(({
                    data
                }) => {
                    console.log(data);
                    dsf.dd.saveFile({
                        corpId: data.data.corpId,
                        mediaId: data.data.mediaId, // 文件在第三方服务器地址， 也可为通过服务端接口上传文件得到的media_id，详见参数说明
                        name: item.title,
                    });
                });
        },
        handWrite(item, index) {
            let that = this;
            console.log(item, ":154");
            const urlindex = item.navtiveUrl.lastIndexOf(".");
            const suffix = item.navtiveUrl.substr(urlindex + 1);
            const toLowerSuffix = suffix.toLowerCase();
            if (dsf.config.commonForm?.dianJu?.isEnable && ["ofd","pdf"].includes(toLowerSuffix)) {
                this.openFile(item.initUrl, item, "dianJu");
            } else if (dsf.config.commonForm?.iSignature?.isEnable) {
                this.openFile(item.url, item, "iSignature");
            } else if (dsf.config.commonForm?.shuke?.isEnable) {
                this.openFile(item.url, item, "shuke");
            } else if (dsf.config.setting["SYS-MOBILE-ATTACH-0006"] == "1") {
                this.$emit("openHandWrite", item);
            } else if (dsf.util.getClientName() == "xunmeng") {
                let data = item;
                dsf.http
                    .get("fn/wdct/circle", {
                        infoId: data.infoId,
                        moduleId: data.moduleId,
                        fileId: data.id,
                    })
                    .then((res) => {
                        if (res.data.code == "200") {
                            let resData = res.data.data;
                            resData.downloadUrl = dsf.url.getRootPath() + resData.downloadUrl + `&x-auth-token=${dsf.util.loadSessionStore("loginToken")}`;
                            console.log(resData.downloadUrl, resData.saveUrl, "179");
                            let param = {
                                pageIndex: 1,
                                url: resData.downloadUrl,
                                type: 0,
                            };
                            dsf.commonForm
                                .nativeCommon("documentannotate", param)
                                .then((resPdf) => {
                                    console.log(resPdf, ":185");
                                    dsf.http
                                        .get(`${resData.saveUrl}`, {
                                            sourceUrl: `${resPdf.data}`,
                                        })
                                        .then((quanyue) => {
                                            console.log(quanyue);
                                            dsf.layer.toast("批示成功");
                                            that.$eventBus.quanyue(that);
                                        });
                                })
                                .catch((err) => {
                                    dsf.layer.toast("批示失败");
                                    console.log(err, ":193");
                                });
                        } else {
                            dsf.layer.toast(res.data.message);
                        }
                    });
            } else if (dsf.config.ddSetting.isDing) {
                let _loading = dsf.layer.loading();
                this.$emit("closePop");
                let data = item;
                dsf.http
                    .get("fn/handWrite/circle", {
                        infoId: data.infoId,
                        moduleId: data.moduleId,
                        fileId: data.id,
                    })
                    .then((res) => {
                        if (res.data.code == "200") {
                            let resData = res.data.data;
                            resData.downloadUrl = dsf.url.getRootPath() + resData.downloadUrl;
                            console.log(resData);
                            dsf.layer.closeLoading(_loading);
                            dsf.dd
                                .signature(resData, this)
                                .then((res) => {
                                    that.$eventBus.quanyue(that);
                                })
                                .catch((err) => {
                                    console.log(err);
                                });
                        } else {
                            dsf.layer.toast(res.data.message);
                        }
                    });
            } else if(dsf.config.commonForm?.aoxiong){
                this.$emit("open", item.initUrl, item, "");
            } else {
                dsf.layer.toast("当前暂无配置签批产品")
            }
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
        afterRead(file) {
            this.$toast.loading({
                message: "上传中...",
                forbidClick: true,
                duration: 0,
                overlay: true,
            });
            this.doFileRead(file, this.fileData.attachType);
        },
        async doFileRead(file, filetype, reUploadFileId) {
            let self = this;
            let url =
                "/fn/mobileAttachment/upload?fileId="+ reUploadFileId + "&moduleId=" +
                this.formInfo.moduleId +
                "&mid=" +
                this.formInfo.moduleId +
                `&pId=${this.formInfo.pId}&pnId=${this.formInfo.pnId}&nodeName=` +
                encodeURI("拟稿") +
                "&nrType=" +
                filetype +
                "&pk=" +
                this.formInfo.info_id +
                "&mainPk=" +
                this.formInfo.mainPk +
                "&newFileFlag=0";
            if (this.fileData?.isRevertName == 1 && this.formData.main[this.fileData.revertName]?.value) {
                let suffix = file.file.name.substr(file.file.name.lastIndexOf(".") + 1)
                url += `&revertName=${this.formData.main[this.fileData.revertName].value}.${suffix}`
            }
            dsf.http.upload(url, {}, file).then(async function (data) {
                console.log("uploaded", data.data);
                if (data.data.result) {
                    let loginToken = dsf.util.loadSessionStore("loginToken");
                    var timestamp = new Date().getTime();
                    let uploadFile = data.data.data;
                    let obj = {
                        id: uploadFile.fileId,
                        title: uploadFile.fileName,
                        size: uploadFile.showFileSize || "",
                        infoId: self.formInfo.info_id,
                        moduleId: self.formInfo.moduleId,
                        isHandwrite: self.fileData.isHandwrite || -1,
                        canDelete: self.fileData.canDelete,
                        canDownLoad: self.fileData.canDownLoad,
                        canEdit: self.fileData.canEdit,
                        type: self.fileData.attachType,
                        name: `${self.fileData.name}${self.fileData.file.length + 1}`
                    };
                    obj.navtiveUrl = uploadFile.filePath;
                    obj.url = dsf.url.getServerUrl(
                        `fn/office/openMobileOffice?fileId=${uploadFile.fileId}&moduleId=${self.formInfo.moduleId}&x-auth-token=${loginToken}`
                    );
                    obj.editUrl = dsf.url.getServerUrl(
                        `fn/mobileOffice/wordEdit?fileId=${uploadFile.fileId}&moduleId=${self.formInfo.moduleId}&nodeId=${self.formInfo.nodeId}&flowId=${self.formInfo.flowId}&x-auth-token=${loginToken}`
                    );
                    obj.initUrl = `fn/file/download?infoId=${self.formInfo.info_id}&fileId=${uploadFile.fileId}&fileName=${uploadFile.fileName}&nrType=${uploadFile.nrType}&moduleId=${self.formInfo.moduleId}&x-auth-token=${loginToken}&fullfilename=${timestamp}${uploadFile.fileName}`;
                    obj.handwritingUrl = dsf.url.getServerUrl(
                        `fn/office/openMobileOffice?fileId=${uploadFile.fileId}&moduleId=${self.formInfo.moduleId}&x-auth-token=${loginToken}&handwriting=1&screenWidth=${document.body.clientWidth}`
                    );
                    if (!self.ifFile(uploadFile.fileName)) {
                        obj.url = dsf.url.getServerUrl(
                            `fn/mobileFileDownload/download?fileId=${uploadFile.fileId}&moduleId=${self.formInfo.moduleId}&fileName=${uploadFile.fileName}`
                        );
                    }
                    if (reUploadFileId) {
                        let index = self.fileData.file.findIndex(item => item.id == reUploadFileId)
                        self.fileData.file.splice(index, 1, obj)
                    } else if (self.fileData.file) {
                        self.fileData.file.push(obj);
                        self.fileData.uploadObj ? self.fileData.uploadObj.push(uploadFile) : self.fileData.uploadObj = [uploadFile]
                    } else {
                        self.fileData.file = [obj];
                        self.fileData.uploadObj = [uploadFile];
                    }
                    self.$set(self.fileData, "file", self.fileData.file);
                    self.fileHandleBtn();
                    console.log("fileData", self.fileData);
                    self.$emit("addFile", obj);
                    // self.openFileId = obj.id;
                }
                self.dsf.layer.toast(data.data.message);
            });
        },
        deleteFile(data) {
            console.log(data);
            dsf.layer.confirm({
                message: '是否确认删除',
                confirmButtonText: '确认'
            }, () => {
                let params = {
                    pk: this.formInfo.info_id,
                    fileId: data.id,
                    nrType: this.fileData.attachType,
                    moduleId: this.formInfo.moduleId,
                    fileName: data.title,
                    nodeName: this.formInfo.nodeName,
                    pnId: this.formInfo.pnId,
                    pId: this.formInfo.pId
                }
                dsf.http.post(`/fn/mobileFileUpload/delete`, params)
                    .then((res) => {
                        console.log(res);
                        if (res.data.code=="200"||res.data.result || res.data.type == 'success') {
                            this.fileData.file.forEach((item, index) => {
                                if (item.id == data.id) {
                                    this.fileData.file.splice(index, 1);
                                }
                            });
                            this.$set(this.fileData, "file", this.fileData.file);
                            this.$emit("deleteFile", {
                                fileData: data,
                                filelist: this.fileData.file
                            });
                        } else {
                            dsf.layer.toast(res.data.message);
                        }
                    });
            })
        },
        rename(item) {
            let startIndex = item.title.lastIndexOf(".");
            let type =
                startIndex > -1 ?
                    item.title.substring(startIndex, item.title.length) :
                    "";
            let title = startIndex > -1 ? item.title.substring(0, startIndex) : "";
            this.show = true;
            this.reTitle = title;
            this.reType = type;
            this.reItem = item;
        },
        DingUpload() {
            dd.biz.util.uploadAttachment({
                space: {
                    corpId: dsf.config.ddSetting.ddCoprId,
                    spaceId: "12345",
                    isCopy: 1,
                    max: 9,
                },
                file: {
                    spaceId: "12345",
                    max: 9,
                },
                types: ["photo", "camera", "file", "space"], //PC端支持["photo","file","space"]
                onSuccess: function (result) { },
                onFail: function (err) { },
            });
        },
        confirmRename() {
            console.log(this.reItem);
            dsf.http
                .post("/fn/file/rname", {
                    pk: this.formInfo.info_id,
                    moduleId: this.formInfo.moduleId,
                    fileId: this.reItem.id,
                    fileName: this.reTitle + this.reType,
                    nrType: this.reItem.type,
                    nodeName: this.formInfo.nodeName || null,
                    pId: this.formInfo.pId || null,
                    pnId: this.formInfo.pnId || null,
                })
                .then((res) => {
                    this.show = false;
                    dsf.layer.toast(res.data.message);
                    if (res.data.code == "200") {
                        // this.$emit('rename',this.reTitle,this.reItem,this.)
                        this.reItem.title = this.reTitle + this.reType;
                    }
                })
                .catch((err) => {
                    dsf.layer.toast("接口异常");
                    console.log(err);
                });
        },
        onSortEnd() {
            console.log(this.fileData.file);
            let sortIds = this.fileData.file.map(item => item.id).join(',');
            console.log(sortIds);
            dsf.http
                .post("/fn/mobileAttachment/sort", {
                    fileIds: sortIds
                })
                .then((res) => {
                    dsf.layer.toast(res.data.message);
                })
                .catch((err) => {
                    dsf.layer.toast("接口异常");
                    console.log(err);
                });
        },
        getContainer() {
            return document.body;
        },
        showHandleIcon(item){
            console.log(item)
            this.showMore = true;
            this.clickItem = item;
        },
        moreBtnClick(clickItem, btn){
            this.showMore = false;
            setTimeout(() => {
                if (btn == 'edit') {
                    this.$emit("closePop");
                    this.openFile(clickItem.url, clickItem, 'edit');
                } else if (btn == 'sign') {
                    this.$emit("closePop");
                    this.handWrite(clickItem);
                } else if (btn == 'download') {
                    this.downFile(clickItem.url, clickItem, 'downFile');
                } else if (btn == 'rename') {
                    this.rename(clickItem);
                } else if (btn == 'saveDing') {
                    this.SaveDing(clickItem);
                } else if (btn == 'delete') {
                    this.deleteFile(clickItem);
                } else if (btn == 'reUpload') {
                    this.reUpload(clickItem);
                }
            },200)
        },
        fileHandleBtn() {
            this.fileData.file.map(item => {
                let edit = item.canEdit > 0 && dsf.config.commonForm.canEditFile && this.ifFileEdit(item.title);
                let sign = item.isHandwrite > 0;
                let download = dsf.util.getClientName() == 'app' && dsf.util.checkSystem() != 'ios' && !dsf.config.commonForm.NoDownload && (this.fileData.canDownLoad == '1');
                let rename = this.fileData.allowMaintain == '1' && this.fileData.maintainFunc?.split(',').includes('1') && !dsf.config.commonForm.hideFileRename;
                let saveDing = !dsf.config.commonFlow.hiddenSaveDing && dsf.config.ddSetting && dsf.config.ddSetting.dingdingType == 'dingding';
                let del = this.fileData.canDelete > 0;
                if( edit || sign || download || rename || saveDing || del) {
                    this.$set(item, "showMore", true);
                }
            })
            console.log(this.fileData.file);
        },
        reUpload(item) {
          this.reUploadFileId = item.id
          this.$refs.uploader.chooseFile()
        },
        afterReUpload(file) {
            this.$toast.loading({
                message: "上传中...",
                forbidClick: true,
                duration: 0,
                overlay: true,
            });
            this.doFileRead(file, this.fileData.attachType, this.reUploadFileId);
        },
    },
};
</script>

<style lang="scss" scoped>
.ds-enclosure-item {
    .__file_bt {
        width: 102px;
    }

    .__file_button {
        width: 48px;
        margin: 0 2px;
    }
}
</style>
<style lang="scss" scoped>
@import "../../assets/styles/themes.scss";
@import "../../assets/styles/mixin.scss";
.grid-text {
    margin-top: 5px;
    @include font_5;
}

.popup-title {
    text-align: center;
    font-size: var(--font_size_2);
    padding: 15px;
    border-bottom: 5px solid #F1F2F4;
    color: #000000;

    .iconfont{
        position: absolute;
        left: 15px;
    }
}

.popup-btn {
    padding-bottom: 16px;
}

.upload-btn {
    .iconfont{
        @include font-theme("normal");
        font-size: 21px;
    }
}

.re-title {
    border-radius: 3px;
    box-sizing: border-box;
    border: 1px solid #cfcfcf;
    margin: 10px auto;
    padding: 5px;
    width: 95%;

    ::v-deep .van-field__control {
        text-align: left !important;
    }
}

.fileTypeList {
    padding: 20px 10px;
    margin: 0 10px;
    // margin-bottom:10px;
    border-bottom: 1px solid #e5e5e5;

    &:last-child {
        border-bottom: 0;
    }

    .fileTypeName {
        display: flex;
        justify-content: space-between;
        align-items: center;

        // padding: 10px 0;
        >div {
            line-height: 24px;
        }

        button {
            color: white;
        }

        i {
            vertical-align: middle;
        }
        .required {
          padding-left: 5px;
          &::before {
            position: absolute;
            color: #ee0a24;
            left: 8px;
            content: '*';
          }
        }
    }

    .fileList {
        // +.fileList {
            padding-top: 10px;
        // }

        .file {
            display: flex;
            position: relative;
            align-items: center;

            .van-icon-passed {
                margin: 14px 10px 0 0;
                @include font-theme("normal");
            }

            // flex-direction: column;
            // overflow: hidden;
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

            .handleIcon{
                display: flex;
                // align-items: flex-end;
                .iconfont{
                    margin-left: 18px;
                }
            }
        }
    }
    .nopaddingTop:first-child {
      padding-top: 0;
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

    .fileBtn {
        // text-align: right;

        .fileButton {
            display: inline-block;
            // width:48px;
            margin-right: 2px;
            text-align: center;
            border-radius: 24px;
            border: 1px solid #e5e5e5;
            white-space: nowrap;
            padding: 0 10px;
            margin-top: 10px;
            font-size: var(--font_size_4);
            line-height: 21px;
        }
    }


    .size-1 {
        font-size: var(--font_size_3);
        // font-weight: 500;
    }

    .size-2 {
        font-size: 0.3rem;
        // font-weight: 600;
    }

    .size-3 {
        font-size: var(--font_size_2);
        // font-weight: 700;
    }

    .size-4 {
        font-size: var(--font_size_1);
        // font-weight: 700;
    }

    .size-5 {
        font-size: 0.36rem;
        // font-weight: 700;
    }
}
</style>
<style lang="scss">
.fileTypeList {
    .van-cell {
        padding: 0;

        ::after {
            border: none;
        }
    }

    .van-cell:not(:last-child)::after {
        border: none;
    }
}
</style>

<template>
<div class="file-item">
    <div class="fileIcon" @click="goFileList()">
        <!-- <img src="../../assets/imgs/cloudDisk/file-doc.svg" alt="" /> -->
        <fileTypeIcon :file-name="fileObj.name" :isDirectory="fileObj.isDirectory"></fileTypeIcon>
    </div>
    <div class="fileBody" @click="goFileList()">
        <div class="fileTitle">
            <img v-if="fileObj.isSecret == '1'" src="../../assets/imgs/cloudDisk/icon-jiami.png" alt="" class="lockfileIcon" />
            <span>{{ fileObj.name }}</span>
        </div>
        <div class="filePath">
            <label class="nowrap">{{ fileObj.fnamePath }}</label>
            <!-- <label>{{ fileObj.ownerName }}</label>
            <label>{{ fileObj.lastUpdateTime }} 更新</label> -->
        </div>
    </div>
    <div class="moreIcon" @click="showHandle">
        <img src="../../assets/imgs/cloudDisk/more-file.svg" alt="">
    </div>
    <van-popup v-model="showItem" position="bottom" round get-container="#app" :style="{ maxHeight: '80%' }">
        <div class="handle-contain">
            <div class="file-box">
                <div class="fileIcon">
                    <fileTypeIcon :file-name="fileObj.name" :isDirectory="fileObj.isDirectory"></fileTypeIcon>
                </div>
                <div class="fileBody">
                    <div class="fileTitle">
                        {{ fileObj.name }}</div>
                    <div class="filePath">
                        <span>{{ fileObj.fileSizeText }} · {{ fileObj.ownerName }} 更新于{{ fileObj.lastUpdateTime
                            }}</span>
                    </div>
                </div>
                <div class="closeIcon" @click="showItem = false">
                    <img src="../../assets/imgs/cloudDisk/icon-close.png" alt="">
                </div>
            </div>
            <div class="handle-list">
                <div class="handle-box">
                    <div @click.stop="goLink(obj)" v-for="(obj, index) in handleList" :key="index">
                        <img :src="getImgPath(obj.itemType)" alt="">
                        <p>
                            <span>{{ obj.itemName }}</span>
                            <img src="../../assets/imgs/cloudDisk/icon-detail.png" alt="">
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </van-popup>
    <van-image-preview get-container="body" v-model="imgPreview" :images="previewImg" closeable @close="closePopup"></van-image-preview>
    <!-- 播放弹框 -->
    <van-popup :style="{ height: '100%' }" v-model="video.showVideo" :close-on-click-overlay="false" lock-scroll position="bottom" get-container="body" @close="closePopup">
        <div v-if="video.showVideo">
            <VPlayer :video="video"></VPlayer>
        </div>
    </van-popup>
    <!-- <van-dialog v-model="showRename" cancel-button-color="#999999" title="重命名" show-cancel-button @confirm="handleRename" @cancel="cancelDialog">
        <div class="nameinput">
            <input type="text" v-model.trim="reName" placeholder="请输入文件名" maxlength="100">
        </div>
    </van-dialog> -->
    <van-popup v-model="showFile" get-container="body" :close-on-click-overlay="true" class="file-preview" lock-scroll position="bottom" style="height: 100vh" @close="closePopup">
        <div class="docbox">
            <van-nav-bar :title="fileObj.name" left-text="关闭" left-arrow fixed placeholder @click-left="closeFile">
            </van-nav-bar>
            <div class="dociframe">
                <iframe :src="docUrl" frameborder="0" width="100%" height="100%"></iframe>
            </div>
        </div>
    </van-popup>
    <van-popup v-model="addFolder" get-container="body" position="bottom" :style="{ height: '100%' }" @close="closePopup">
        <div class="addFolder">
            <div class="header">
                <van-icon @click="closeAddFolder" name="cross" />
                <p>重命名</p>
                <span @click="doAddFolder">完成</span>
            </div>
            <div class="inputs">
                <!-- <img src="../../assets/imgs/cloudDisk/folder.png" alt="" srcset=""> -->
                <input type="text" maxlength="20" placeholder="输入名称" v-model.trim="folderName">
            </div>
        </div>
    </van-popup>
    <van-popup v-model="moveFolder" get-container="body" position="bottom" :style="{ height: '100%' }" @close="closePopup">
        <div class="directory" v-if="!showRoot">
            <van-nav-bar title="云盘" left-text="返回" left-arrow @click-left="goBackUp"></van-nav-bar>
            <div class="direList">
                <div class="dire" @click="goDire(item)" v-for="(item, index) in direList" :key="index">
                    <div class="fileIcon">
                        <fileTypeIcon :file-name="item.name" :width="32" :height="38" :isDirectory="item.isDirectory">
                        </fileTypeIcon>
                    </div>
                    <div class="fileBody">
                        <div class="fileTitle">{{ item.name }}</div>
                        <div class="filePath">
                            <label>{{ item.fileSizeText }}</label>
                            <label>{{ item.ownerName }}</label>
                            <label>{{ item.lastUpdateTime }} 更新</label>
                        </div>
                    </div>
                    <div class="moreIcon">
                        <img src="../../assets/imgs/cloudDisk/icon-detail.png" alt="">
                    </div>
                </div>
            </div>
            <div class="direButton">
                <van-button type="info" @click="fadeinThis">{{ actionType == "move" ? '移动到这里' : '添加到这里' }}</van-button>
            </div>
        </div>
        <div class="directory" v-if="showRoot">
            <van-nav-bar title="云盘" left-text="返回" left-arrow @click-left="closeFolderPopup"></van-nav-bar>
            <div class="direList">
                <div class="dire" @click="goRootDire(item)" v-for="(item, index) in rootTree" :key="index">
                    <div class="fileIcon">
                        <fileTypeIcon :file-name="item.name" :width="32" :height="38" :isDirectory="1"></fileTypeIcon>
                    </div>
                    <div class="fileBody">
                        <div class="fileTitle">{{ item.name }}</div>
                    </div>
                    <div class="moreIcon">
                        <img src="../../assets/imgs/cloudDisk/icon-detail.png" alt="">
                    </div>
                </div>
            </div>
        </div>
    </van-popup>
    <van-dialog get-container="body" v-model="showSetPassword" title="设置密码" cancelButtonColor="#797979" show-cancel-button @confirm="setLockPwd" @cancel="showSetPassword = false">
        <div class="pwdBox">
            <input type="text" v-model.trim="pwd" placeholder="请输入密码" maxlength="10">
        </div>
    </van-dialog>
    <van-dialog get-container="body" v-model="verPwd" title="密码验证" cancelButtonColor="#797979" show-cancel-button @confirm="checkPwd" @cancel="verPwd = false">
        <div class="pwdBox">
            <input type="text" v-model.trim="verPwdText" placeholder="请输入密码" maxlength="10">
        </div>
    </van-dialog>
</div>
</template>

<script>
import fileTypeIcon from './fileTypeIcon.vue';
// import VPlayer from "@/components/common/VideoPlayer";
import EnclosurePreview from "@/components/enclosure/EnclosurePreview";
import {
    mapState
} from "vuex";
import dsf from '../../common';
export default {
    name: 'fileiItem',
    components: {
        fileTypeIcon,
        'VPlayer': () => import('@/components/common/VideoPlayer'),
        EnclosurePreview
    },
    props: {
        item: {
            type: Object,
            default: function () {
                return {};
            },
        }
    },
    data() {
        return {
            pwd: "",
            showSetPassword: false,
            verPwd: false,
            verPwdText: "",
            showItem: false,
            handleList: [],
            showData: true,
            reExt: "", //用于存储文件后缀
            reName: "", //用于存储文件名
            showRename: false,
            video: {
                showVideo: false,
                videoTitle: "",
            },
            imgPreview: false,
            previewImg: [],
            fileData: {},
            showFile: false,
            fileType: {
                ofd: ["ofd"],
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
            addFolder: false,
            folderName: "",
            direList: [],
            direFid: "", //记录链条， 用于返回上一层节点
            curFid: "",
            moveFolder: false,
            actionType: "",
            docUrl: "showFile",
            rootTree: [],
            rootFileType: "",
            showRoot: true,
            callback: () => {}
        }
    },
    computed: {
        fileObj() {
            return this.item
        },
        ...mapState({
            diskMenuType: (state) => {
                return state.diskMenuType
            }
        }),
    },
    watch: {},
    created() {

    },
    mounted() {

    },
    methods: {
        closePopup() {
            this.showItem = false
        },
        getImgPath(type) {
            return require('../../assets/imgs/cloudDisk/icon-' + type + '.png')
        },
        closeAddFolder() {
            this.showItem = false
            this.addFolder = false
            this.$emit("doRefresh")
        },
        showHandle() {
            if (this.fileObj.isSecret == '1') {
                this.verPwd = true
                this.callback = () => {
                    this.handleList = JSON.parse(JSON.stringify(this.fileObj.rightClickMenuItemVos))
                    if (this.fileObj.userId == dsf.util.loadSessionStore('user').user_id) { //是他自己的文件才有操作权限
                        if (this.fileObj.isSecret == '1') {
                            this.handleList = this.handleList.concat([{
                                    "itemType": "jiami",
                                    "itemName": "启用密码保护",
                                    "inherited": false
                                },
                                {
                                    "itemType": "jiemi",
                                    "itemName": "取消密码保护",
                                    "inherited": false
                                }
                            ])
                        } else {
                            this.handleList = this.handleList.concat([{
                                "itemType": "jiami",
                                "itemName": "启用密码保护",
                                "inherited": false
                            }])
                        }
                    }
                    this.showItem = true
                }
            } else {
                this.handleList = JSON.parse(JSON.stringify(this.fileObj.rightClickMenuItemVos))
                if (this.fileObj.userId == dsf.util.loadSessionStore('user').user_id) { //是他自己的文件才有操作权限
                    if (this.fileObj.isSecret == '1') {
                        this.handleList = this.handleList.concat([{
                                "itemType": "jiami",
                                "itemName": "启用密码保护",
                                "inherited": false
                            },
                            {
                                "itemType": "jiemi",
                                "itemName": "取消密码保护",
                                "inherited": false
                            }
                        ])
                    } else {
                        this.handleList = this.handleList.concat([{
                            "itemType": "jiami",
                            "itemName": "启用密码保护",
                            "inherited": false
                        }])
                    }
                }
                this.showItem = true
            }

            // this.showItem = true
            // let that = this
            // dsf.http
            //     .post("fn/cloud/privilege/rightClickMenu", {
            //         fileId: this.fileObj.id
            //     }, {
            //         headers: {
            //             "Content-Type": "application/json"
            //         }
            //     })
            //     .then(({
            //         status,
            //         data
            //     }) => {
            //         console.log(data, status)
            //         if (status === 200) {
            //             that.handleList = data.data
            //             if (data.data.length > 0) {
            //                 that.showItem = true
            //             }
            //         }
            //     }).catch(({
            //         message
            //     }) => {

            //     })
        },
        closeFile() {
            this.showFile = false;
            // this.$refs.enclosurePreview.destroyInterval(); // 关闭自动重试定时器
        },
        cancelDialog() {
            this.showRename = false
            this.reExt = ""
            this.reName = ""
        },
        doAddFolder() {
            let that = this
            if (!this.folderName) {
                dsf.layer.toast("请输入名称");
                return
            }
            dsf.http.post("/fn/cloud/file/rname", {
                    fileId: this.fileObj.id,
                    newName: this.folderName
                })
                .then((res) => {
                    if (res.data && res.data.code == "200") {
                        this.closeAddFolder()
                    }
                }).catch((e) => {

                }).finally(() => {

                })
        },
        deleteFile() {
            this.$toast.loading({
                forbidClick: true,
                message: "文件操作中..."
            })
            dsf.http.post("/fn/cloud/recyclebin/delete", {
                    fileIds: this.fileObj.id
                })
                .then((res) => {
                    if (res.data && res.data.code == "200") {
                        dsf.layer.toast("删除成功！")
                        this.closeAddFolder()
                    }
                }).catch((e) => {

                }).finally(() => {
                    this.$toast.clear()
                })
        },
        goLink(file) {
            console.log(file)
            this.showItem = false
            if (file.itemType == 'manage') {
                setTimeout(() => {
                    this.$router.push({
                        name: 'purviewManage',
                        params: {
                            fileId: this.fileObj.id
                        }
                    })
                }, 100);
            } else if (file.itemType == "rename") {
                this.addFolder = true
                this.folderName = this.fileObj.isDirectory == 1 ? this.fileObj.name : this.fileObj.name.substr(0, this.fileObj.name.lastIndexOf("."))
            } else if (file.itemType == "delete") {
                this.deleteFile()
            } else if (file.itemType == "check") {
                this.openFile()
            } else if (file.itemType == "clean") {
                this.$toast.loading({
                    forbidClick: true,
                    message: "文件操作中..."
                })
                dsf.http.post("/fn/cloud/file/deleteRecent", [this.fileObj.id], {
                        headers: {
                            "Content-Type": "application/json"
                        }
                    })
                    .then((res) => {
                        if (res.data && res.data.code == "200") {
                            dsf.layer.toast("操作成功!")
                            this.$emit("doRefresh")
                        }
                    }).catch((e) => {

                    }).finally(() => {
                        this.$toast.clear()
                    })
            } else if (file.itemType == "move") {
                this.actionType = "move"
                // this.getDireList()
                this.direFid = ""
                this.curFid = ""
                this.showRoot = true
                this.getRootTree()
                this.moveFolder = true
            } else if (file.itemType == "addTo") {
                this.actionType = "addTo"
                // this.getDireList()
                this.direFid = ""
                this.curFid = ""
                this.showRoot = true
                this.getRootTree()
                this.moveFolder = true
            } else if (file.itemType == "exitShare") {
                this.exitShare()
            } else if (file.itemType == "fav") {
                this.fav()
            } else if (file.itemType == "unfav") {
                this.unfav()
            } else if (file.itemType == "download") {
                let url = dsf.url.getServerUrl(
                    `fn/cloud/file/downloadOneFile?fileId=${this.fileObj.id}`
                );
                window.open(url, "_blank")
            } else if (file.itemType == "jiami") {
                this.pwd = ""
                setTimeout(() => {
                    this.showSetPassword = true
                }, 500)
            }
        },
        setLockPwd() {
            if (!this.pwd) {
                dsf.layer.toast("请输入密码");
                return
            }
            dsf.http.post("/ctrl/cloud/privilege/filePwAction", {
                    "id": this.fileObj.id,
                    "type": this.fileObj.isSecret == '1' ? "update" : "add",
                    "password": this.pwd
                }, {
                    headers: {
                        "Content-Type": "application/json"
                    }
                })
                .then((res) => {
                    if (res.data && res.data.code == "200") {
                        this.pwd = ""
                        this.showSetPassword = false
                        setTimeout(() => {
                            dsf.layer.toast("操作成功!")
                        }, 200);
                    } else {
                        this.pwd = ""
                        this.showSetPassword = false
                        setTimeout(() => {
                            dsf.layer.alert(res.data.message)
                        }, 200);

                    }
                }).catch((e) => {

                }).finally(() => {
                    this.$toast.clear()
                })

        },
        checkPwd() {
            if (!this.verPwdText) {
                dsf.layer.toast("请输入密码");
                return
            }
            dsf.http.post("/ctrl/cloud/privilege/filePwAction", {
                    "id": this.fileObj.id,
                    "type": "verify",
                    "password": this.verPwdText
                }, {
                    headers: {
                        "Content-Type": "application/json"
                    }
                })
                .then((res) => {
                    if (res.data && res.data.code == "200") {
                        this.verPwdText = ""
                        this.verPwd = false
                        this.callback()
                        setTimeout(() => {
                            dsf.layer.toast("操作成功!")
                        }, 200);
                    } else {
                        this.verPwdText = ""
                        this.verPwd = false
                        setTimeout(() => {
                            dsf.layer.toast(res.data.message)
                        }, 200);
                    }
                }).catch((e) => {

                }).finally(() => {
                    this.$toast.clear()
                })
        },
        openFile() {
            if (this.fileObj.isDirectory == 1) {
                this.$router.push({
                    name: "diskFileList",
                    params: {
                        fid: this.fileObj.id
                    },
                    query: {
                        listType: this.fileObj.fileType,
                        name: this.fileObj.name
                    }
                })
            } else {
                this.showItem = false
                setTimeout(() => {
                    this.link()
                }, 200);
            }
        },
        goFileList() {
            if (this.fileObj.isSecret == '1') {
                this.verPwd = true
                this.callback = () => {
                    if (this.fileObj.isDirectory == 1) {
                        this.$router.push({
                            name: "diskFileList",
                            params: {
                                fid: this.fileObj.id
                            },
                            query: {
                                listType: this.fileObj.fileType,
                                name: this.fileObj.name
                            }
                        })
                    } else {
                        this.showItem = false
                        setTimeout(() => {
                            this.link()
                        }, 200);
                    }
                }
            } else {
                this.openFile()
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
            let fileType = self.fileObj.fileSuffix;
            if (fileType && self.checkType(fileType.toLowerCase())) {
                fileType = fileType.toLowerCase();
                if (self.fileType.img.includes(fileType)) {
                    let url = dsf.url.getServerUrl(
                        `fn/cloud/file/downloadOneFile?fileId=${self.fileObj.id}`
                    );
                    this.imgPreview = true;
                    this.previewImg = [url];
                } else if (fileType.includes("mp4")) {
                    let url = dsf.url.getServerUrl(
                        `fn/cloud/file/downloadOneFile?fileId=${self.fileObj.id}`
                    );
                    self.video.showVideo = true;
                    self.video.videoTitle = self.fileObj.name;
                    self.video.src = url;
                } else {
                    this.$toast.loading({
                        forbidClick: true,
                        message: "文件加载中..."
                    })
                    dsf.http.post("/fn/fileToken/get", {})
                        .then((res) => {
                            if (res.data && res.data.code == "200") {
                                // self.docUrl = dsf.url.getServerUrl(
                                //     `fn/cloud/file/forwardPreview?fileId=${self.fileObj.id}&token=${res.data.data}&previewType=pdf&isTemp=0&officeModuleId=skyDrive&canDownload=1&moduleId=190427152140nmiGu76moaSpanLaHnY`
                                // );
                                let loginToken = dsf.util.loadSessionStore("loginToken");
                                self.docUrl = dsf.url.getServerUrl(
                                    `fn/office/openMobileOffice?fileId=${self.fileObj.id}&moduleId=190427152140nmiGu76moaSpanLaHnY&x-auth-token=${loginToken}&officeModuleId=skyDrive&fileName=${self.fileObj.name}`
                                );
                                self.showFile = true
                                // this.$router.push({
                                //     name: "dsfIframe",
                                //     query: {
                                //         url: item.router,
                                //         title: item.name
                                //     }
                                // })
                            }
                        }).catch((e) => {

                        }).finally(() => {
                            this.$toast.clear()
                        })

                }
            } else {
                dsf.layer.toast("当前文件不支持查看");
            }
        },
        exitShare() {
            this.$toast.loading({
                forbidClick: true,
                message: "文件操作中..."
            })
            dsf.http.post("/fn/cloud/privilege/leaveShare", {}, {
                    headers: {
                        "Content-Type": "application/json"
                    }
                })
                .then((res) => {
                    if (res.data && res.data.code == "200") {
                        dsf.layer.toast("操作成功!")
                        this.closeAddFolder()
                    }
                }).catch((e) => {

                }).finally(() => {
                    this.$toast.clear()
                })
        },
        unfav() {
            this.$toast.loading({
                forbidClick: true,
                message: "文件操作中..."
            })
            dsf.http.post("/fn/cloud/file/cancleFavorite", [this.fileObj.id], {
                    headers: {
                        "Content-Type": "application/json"
                    }
                })
                .then((res) => {
                    if (res.data && res.data.code == "200") {
                        dsf.layer.toast("操作成功!")
                        this.closeAddFolder()
                    }
                }).catch((e) => {

                }).finally(() => {
                    this.$toast.clear()
                })
        },
        fav() {
            this.$toast.loading({
                forbidClick: true,
                message: "文件操作中..."
            })
            dsf.http.post("/fn/cloud/file/favorite", {
                    fileId: this.fileObj.id
                })
                .then((res) => {
                    if (res.data && res.data.code == "200") {
                        dsf.layer.toast("操作成功!")
                        this.closeAddFolder()
                    }
                }).catch((e) => {

                }).finally(() => {
                    this.$toast.clear()
                })
        },
        getDireList() {
            dsf.http.post("/fn/cloud/file/getDirectoryTree", {
                    fid: this.curFid || 0,
                    listType: this.rootFileType,
                    excludeIds: this.curFid ? [this.curFid, this.fileObj.id] : [this.fileObj.id]
                }, {
                    headers: {
                        "Content-Type": "application/json"
                    }
                })
                .then((res) => {
                    if (res.data && res.data.code == "200") {
                        this.direList = res.data.data
                    }
                }).catch((e) => {

                }).finally(() => {

                })
        },
        closeFolderPopup() {
            this.moveFolder = false
            this.closePopup()
        },
        goBackUp() {
            if (this.curFid == "") {
                this.showRoot = true
                return
            }
            if (this.direFid == "") {
                this.curFid == ""
            } else {
                // [11,22]  22
                if (this.curFid == this.direFid) {
                    this.curFid = ""
                    this.direFid = ""

                } else {
                    let direArr = this.direFid.split(",")
                    this.curFid = direArr[direArr.length - 2]
                    this.direFid = direArr.slice(0, -1).join(",")
                }

            }
            this.getDireList()
        },
        goRootDire(item) {
            this.direFid = ""
            this.curFid = ""
            this.rootFileType = item.value
            this.showRoot = false
            this.getDireList()
        },
        goDire(item) {
            if (!this.direFid) {
                this.direFid = item.id
            } else {
                this.direFid += "," + item.id
            }
            this.curFid = item.id
            this.getDireList()
        },
        fadeinThis() {
            this.$toast.loading({
                forbidClick: true,
                message: "文件操作中..."
            })
            if (this.actionType == "move") {
                dsf.http.post("/fn/cloud/file/move", {
                        fileIds: [this.fileObj.id],
                        listType: this.rootFileType,
                        targetId: this.curFid || 0
                    }, {
                        headers: {
                            "Content-Type": "application/json"
                        }
                    })
                    .then((res) => {
                        if (res.data && res.data.code == "200") {
                            dsf.layer.toast("操作成功");
                            this.$emit("doRefresh")
                        }
                    }).catch((e) => {

                    }).finally(() => {
                        this.$toast.clear()
                    })
            } else if (this.actionType == "addTo") {
                dsf.http.post("/fn/cloud/file/copy", {
                        fileIds: [this.fileObj.id],
                        listType: this.rootFileType,
                        targetId: this.curFid || 0
                    }, {
                        headers: {
                            "Content-Type": "application/json"
                        }
                    })
                    .then((res) => {
                        if (res.data && res.data.code == "200") {
                            dsf.layer.toast("操作成功");
                            // this.$emit("doRefresh")
                            this.moveFolder = false
                        }
                    }).catch((e) => {

                    }).finally(() => {
                        this.$toast.clear()
                    })
            }
        },
        getRootTree() {
            dsf.http.post("/fn/cloud/privilege/getLeftCopyItem", {}, {
                    headers: {
                        "Content-Type": "application/json"
                    }
                })
                .then((res) => {
                    if (res.data && res.data.code == "200") {
                        console.log(res.data)
                        this.rootTree = res.data.data
                    }
                }).catch((e) => {

                }).finally(() => {

                })
        },
    }
}
</script>

<style lang="scss" scoped>
.file-item {
    flex: 1;
    display: flex;
    align-items: center;
    margin: 10px 0;

    .fileIcon {
        width: auto;
        height: 38px;
        margin-right: 11px;
        flex-shrink: 0;

        img {
            width: 100%;
            height: 100%;

        }
    }

    .fileBody {
        flex: 1;
        margin-right: 11px;
        overflow: hidden;

        .fileTitle {
            width: 100%;
            font-size: 13px;
            color: #171A1D;
            letter-spacing: 0;
            font-weight: 400;
            margin-bottom: 5px;
            overflow: hidden; //溢出内容隐藏
            text-overflow: ellipsis; //文本溢出部分用省略号表示
            display: -webkit-box; //特别显示模式
            -webkit-line-clamp: 2; //行数
            line-clamp: 2;
            -webkit-box-orient: vertical; //盒子中内容竖直排列
            display: flex;
            align-items: center;

            .lockfileIcon {
                width: 12px;
                height: 12px;
                flex-shrink: 0;
                margin-right: 5px;
            }

            span {
                flex: 1;
                width: 100%;
                overflow: hidden; //溢出内容隐藏
                text-overflow: ellipsis; //文本溢出部分用省略号表示
                display: -webkit-box; //特别显示模式
                -webkit-line-clamp: 2; //行数
                line-clamp: 2;
                -webkit-box-orient: vertical; //盒子中内容竖直排列
            }
        }

        .filePath {
            width: 100%;
            overflow: hidden;

            span {
                font-size: 11px;
                color: #A2A3A4;
                font-weight: 400;
            }

            label {
                font-size: 11px;
                color: #A2A3A4;
                font-weight: 400;

                &.nowrap {
                    width: 100%;
                    display: block;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                }
            }
        }
    }

    .moreIcon {
        width: 24px;
        height: 24px;
    }
}

.handle-contain {
    width: 100%;
    padding: 1px 14px 20px 14px;
    box-sizing: border-box;
    background: #F2F2F5;

    .file-box {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin: 28px 0;

        .fileIcon {
            width: 28px;
            height: 28px;
            margin-right: 15px;

            img {
                width: 100%;
                height: 100%;

            }
        }

        .fileBody {
            flex: 1;
            margin-right: 11px;

            .fileTitle {
                width: 100%;
                font-size: 13px;
                color: #171A1D;
                letter-spacing: 0;
                font-weight: 400;
                margin-bottom: 5px;
                overflow: hidden; //溢出内容隐藏
                text-overflow: ellipsis; //文本溢出部分用省略号表示
                display: -webkit-box; //特别显示模式
                -webkit-line-clamp: 2; //行数
                line-clamp: 2;
                -webkit-box-orient: vertical; //盒子中内容竖直排列
            }

            .filePath {
                width: 100%;

                span {
                    font-size: 11px;
                    color: #A2A3A4;
                    font-weight: 400;
                }

                label {
                    font-size: 11px;
                    color: #A2A3A4;
                    font-weight: 400;

                    &:last-child {
                        color: #317ED0;
                    }
                }
            }
        }

        .closeIcon {
            width: 19px;
            height: 19px;

            img {
                width: 100%;
                height: 100%;
            }
        }

    }

    .handle-list {
        width: 100%;

        .handle-box {
            width: 100%;
            height: auto;
            overflow: hidden;
            background: #FFFFFF;
            border-radius: 11px;
            padding: 0 10px 0 16px;
            box-sizing: border-box;
            margin-bottom: 12px;

            &>div {
                width: 100%;
                height: 46px;
                display: flex;
                align-items: center;
                justify-content: space-between;

                &>img {
                    width: 17px;
                    height: 17px;
                    margin-right: 15px;
                }

                p {
                    height: 100%;
                    flex: 1;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    border-bottom: 1px solid rgba(224, 226, 228, 1);

                    span {
                        font-size: 13px;
                        color: #171A1D;
                        letter-spacing: 1px;
                        font-weight: 400;
                    }

                    img {
                        width: 11px;
                        height: 11px;
                    }
                }
            }
        }
    }
}

.addFolder {
    width: 100%;
    height: auto;

    .header {
        width: 100%;
        height: 46px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        box-sizing: border-box;
        padding: 0 14px;

        .van-icon {
            font-size: var(--font_size_2);
            color: #000;
            flex-shrink: 0;
        }

        p {
            font-size: var(--font_size_2);
            color: #000;
            flex: 1;
            text-align: center;
            line-height: 46px;
        }

        span {
            font-size: var(--font_size_3);
            color: rgb(47, 127, 202);
        }
    }

    .inputs {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-top: 50px;

        img {
            width: 80px;
        }

        input {
            width: 80%;
            height: 40px;
            background: #f2f2f2;
            text-align: center;
            border-radius: 10px;
            margin-top: 20px;
            font-size: var(--font_size_3);
            color: #333;
        }
    }
}

.directory {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;

    .van-nav-bar {
        flex-shrink: 0;
    }

    .direList {
        flex: 1;
        width: 100%;
        overflow-y: auto;

        .dire {
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: space-between;
            box-sizing: border-box;
            padding: 14px;
            border-bottom: 1PX solid #ebebeb;

            .fileIcon {
                width: 28px;
                height: auto;
                margin-right: 15px;

                img {
                    width: 100%;
                    height: 100%;

                }
            }

            .fileBody {
                flex: 1;
                margin-right: 11px;

                .fileTitle {
                    width: 100%;
                    font-size: 13px;
                    color: #171A1D;
                    letter-spacing: 0;
                    font-weight: 400;
                    margin-bottom: 5px;
                    overflow: hidden; //溢出内容隐藏
                    text-overflow: ellipsis; //文本溢出部分用省略号表示
                    display: -webkit-box; //特别显示模式
                    -webkit-line-clamp: 2; //行数
                    line-clamp: 2;
                    -webkit-box-orient: vertical; //盒子中内容竖直排列
                }

                .filePath {
                    width: 100%;

                    span {
                        font-size: 11px;
                        color: #A2A3A4;
                        font-weight: 400;
                    }

                    label {
                        font-size: 11px;
                        color: #A2A3A4;
                        font-weight: 400;
                    }
                }
            }

            .closeIcon {
                width: 19px;
                height: 19px;

                img {
                    width: 100%;
                    height: 100%;
                }
            }

            .moreIcon {
                width: 10px;
                display: flex;
                align-items: center;
                justify-content: center;

                img {
                    width: 10px;
                }
            }
        }
    }

    .direButton {
        width: 100%;
        height: 60px;
        background: #FFF;
        border-top: 1PX solid #ebebeb;
        display: flex;
        align-items: center;
        flex-shrink: 0;
        box-sizing: border-box;
        padding: 0 14px;

        .van-button {
            width: 100%;
        }
    }

}

.docbox {
    width: 100%;
    height: 100%;
    overflow: hidden;
    display: flex;
    flex-direction: column;

    .van-nav-bar {
        flex-shrink: 0;
    }

    .dociframe {
        width: 100%;
        flex: 1;
        overflow: hidden;
    }
}

.pwdBox {
    width: 100%;
    height: auto;
    box-sizing: border-box;
    padding: 10px 20px;
    display: flex;
    flex-direction: column;
    align-items: center;

    span {
        font-size: 14px;
        color: #333;
    }

    input {
        width: 100%;
        height: 40px;
        box-sizing: border-box;
        border: 1px solid #ebebeb;
        box-sizing: border-box;
        padding: 0 10px;
        font-size: 14px;
        color: #333;
    }
}
</style>

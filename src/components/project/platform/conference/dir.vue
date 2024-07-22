<template>
    <div>
        <div v-if="errored">
            数据获取失败！
        </div>
        <div v-else-if="files.length > 0">
            <div v-for="(file,index) in files" :key="index">
                <file-item :file="file" :meeting-id="meetingId" @openFile="openFile"></file-item>
                <van-divider v-if="index < files.length-1" />
            </div>
        </div>
        <div v-else class="flex">
            <commonempty :image="require('static/images/peopleCongress/img_zwwj.png')" class="file-empty" description="暂无文件" />
        </div>
        <enclosurePopup ref="enclosurePopup"></enclosurePopup>
    </div>
</template>

<script>
import fileItem from './components/fileItem'
import enclosurePopup from "./components/enclosurePopup";
export default {
    components: {
        fileItem,
        enclosurePopup
    },
    data () {
        return {
            files: [],
            loading: null,
            meetingId: "",
            folderid: "",
            folderModuleId: '',
            errored: false,
            isFirstLoad: false, // 是否初次加载
            imgPreview: false,
            previewImg: [],
            popFile: {},
            showFile: false,
            filename: '',
            isPreview: true,
            currentFile: {},
        }
    },
    created () {
        let self = this;
        self.loading = dsf.layer.loading();
        self.isFirstLoad = true;
        self.meetingId = self.$route.params.meetingId;
        self.folderid = self.$route.params.folderid;
        self.folderModuleId = self.$route.params.folderModuleId == '1' ? '' : self.$route.params.folderModuleId;
        self.getFiles();
        // self.$eventBus.OnrefreshNPC(self, () => {
        //     self.getFiles();
        // });
    },
    activated () {
        let self = this;
        // 刷新文件列表
        if (!self.isFirstLoad) {
            self.loading = dsf.layer.loading();
            self.getFiles();
        }
        self.isFirstLoad = false;
    },
    mounted () { },
    methods: {
        getFiles () {
            let self = this;
            let url = `fn/conferenceMobile/files`;
            if (dsf.config.staticJson.enable && self.folderid) { // 静态json数据特殊处理url
                url += `/${self.folderid}`;
            }
            console.log(url)
            // 获取会议文件
            dsf.http
                .post(url, {
                    meetingId: self.meetingId,
                    folderId: self.folderid ? self.folderid : self.meetingId,
                    folderModuleId: self.folderModuleId ? self.folderModuleId : ''
                })
                .done(result => {
                    // result = result.data;
                    //console.log(result);
                    if (result.code == 200 && result.data) {
                        self.files = [];
                        dsf.url.setTitle(result.data.currFolderName); // 设置页面title
                        // 目录
                        if (result.data.folders && result.data.folders.length > 0) {
                            let arr = [];
                            result.data.folders.map(item => {
                                arr.push(
                                    Object.assign({}, item, {
                                        type: "folder"
                                    })
                                );
                            });
                            self.files.push(...arr);
                        }
                        // 文件
                        if (result.data.files && result.data.files.length > 0) {
                            let arr = [];
                            result.data.files.map(item => {
                                arr.push(
                                    Object.assign({}, item, {
                                        type: item.fileName.substr(item.fileName.lastIndexOf(".") + 1),
                                        isHandwrite: "1",
                                        id: item.fileId
                                    })
                                );
                            });
                            self.files.push(...arr);
                        }
                    } else {
                        self.errored = true;
                    }
                })
                .error(error => {
                    // console.log(error);
                    // dsf.layer.toast("数据获取失败！");
                    self.errored = true;
                })
                .always(() => {
                    dsf.layer.closeLoading(self.loading);
                });
        },
        openFile(file) {
            this.currentFile = file
            if (file.type == "folder") {
                this.$router.push({
                    name: "conferenceDir",
                    params: {
                        meetingId: this.meetingId,
                        folderid: file.folderId,
                        folderModuleId: file.folderModuleId
                    }
                });
            } else {
                dsf.http.post('fn/conferenceMobile/setRead', {
                    pk: file.fileId,
                    moduleId: file.moduleId
                }).done(result => {
                    this.$refs.enclosurePopup.open(file)
                }).error(error => {
                    dsf.layer.toast("操作失败！");
                })
            }
        },
        closeFile() {
            this.showFile = false;
            this.$refs.enclosurePreview.destroyInterval(); // 关闭自动重试定时器
        },
    }
}
</script>

<style lang="scss" scoped>
.file-empty {
    display: flex;
    flex-direction: row;
    padding: 0.2rem 0.5rem;

    ::v-deep .van-empty__image {
        flex: none;
    }

    ::v-deep .van-empty__description {
        padding: 0;
    }
}

.flex {
    justify-content: center;
    height: 100vh;
}

::v-deep.van-divider {
    margin: 0;
    padding: 0 16px;
    border-color: #ddd;
    background-color: #fff;
}
</style>

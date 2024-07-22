<template>
<div>
    <div v-if="errored">
        数据获取失败！
    </div>
    <div v-else-if="files.length > 0">
        <van-sticky :offset-top="dsf.util.getOffsetTop()" v-if="showSearchBox">
            <van-search v-model="key" @search="onSearch" placeholder="请输入搜索关键词" :clearable="false">
                <template #right-icon v-if="key">
                    <span @click="key = '';getFiles()">取消</span>
                </template>
            </van-search>
        </van-sticky>
        <div v-for="(file,index) in files" :key="index">
            <file-item :queryType="queryType" :file="file" @reflush="getFiles"></file-item>
            <van-divider v-if="index < files.length-1" />
        </div>
    </div>
    <div v-else class="flex">
        <commonempty description="暂无文件" />
    </div>
    <dsf-fab v-if="$route.params.folderid&&allowAdd" :fab-items="addBtn" @clickItem="btnAction"></dsf-fab>
    <van-dialog v-model="showAdd" cancel-button-color="#999999" title="新建文件夹" show-cancel-button @confirm="handleAddDirectory" @cancel="cancelDialog">
        <div class="nameinput">
            <span>名称：</span>
            <input type="text" v-model.trim="fileName" placeholder="请输入文件夹名称" maxlength="100">
        </div>
    </van-dialog>
    <button id="handleFileClick" style="display:none"></button>
    <van-uploader id="uploader_disk" accept='application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel, .zip' :after-read="afterRead">
        <van-icon size="0rem" name="add-o" />
    </van-uploader>
</div>
</template>

<script>
import fileItem from './diskfileItem'
import dsfFab from "@/components/dsfFab/dsfFab";
import $ from 'jquery'
export default {
    props: ["params","mainKeyWord"],
    components: {
        fileItem,
        dsfFab
    },
    computed: {
      showSearchBox() {
        return this.params?.params?.showSearchBox !== false
      }
    },
    watch: {
      mainKeyWord: {
        handler(newvalue, oldvalue) {
          this.key = newvalue;
          if (this.key) {
            this.onSearch();
          } else {
            this.getFiles()
          }
        },
        immediate: true
      },
    },
    data() {
        return {
            files: [],
            loading: null,
            folderid: "",
            errored: false,
            isFirstLoad: false, // 是否初次加载
            addBtn: [{
                icon: "iconjiahao",
                title: "添加文件",
                type: "event", // 'event'
                action: "addFile",
            }, {
                icon: "iconjiahao",
                title: "新建目录",
                type: "event", // 'event'
                action: "addDirectory",
            }],
            queryType: "",
            dataId: "",
            showAdd: false,
            fileName: "",
            allowAdd: true,
            key: ''
        }
    },
    created() {
        let self = this;
        dsf.url.setTitle(self.$route.query.title || "资源中心"); // 设置页面title
        self.isFirstLoad = true;
        self.folderid = self.$route.params.folderid;
        if (!this.mainKeyWord) {
          self.loading = dsf.layer.loading();
          self.getFiles();
        }

    },
    activated() {
        // let self = this;
        // // 刷新文件列表
        // if (!self.isFirstLoad) {
        //     self.loading = dsf.layer.loading();
        //     self.getFiles();
        // }
        // self.isFirstLoad = false;
    },
    mounted() {
        this.queryType = this.$route.params.driveType == -1 ? "" : this.$route.params.driveType
        this.dataId = this.$route.params.folderid == -1 ? 0 : this.$route.params.folderid
        this.allowAdd = (this.$route.params.allowAdd == 'false' || !this.$route.params.allowAdd) ? false : true
    },
    methods: {
        btnAction(val) {
            console.log(val);
            this[val.action](val);
        },
        afterRead(file) {
            console.log(file)
            this.$toast.loading({
                message: "上传中...",
                forbidClick: true,
                duration: 0,
                overlay: true,
            });
            dsf.http.upload(`fn/skydrive/upload`, file.file, {
                fId: this.dataId,
                queryType: this.queryType
            }).then(res => {
                console.log(res)
                this.$toast.clear();
                this.$toast('上传成功')
                this.getFiles()
            }).error(e => {
                this.$toast.clear();
                this.$toast('上传失败')
                console.log(e)
            })
        },
        addFile() {
            $("#uploader_disk").click()
        },
        cancelDialog() {
            this.fileName = ""
            this.showAdd = false
        },
        handleAddDirectory() {

            let that = this
            if (!this.fileName) {
                dsf.layer.toast("请输入文件名称！");
                return
            }
            //先判断是否重名
            dsf.http.post("fn/skydrive/checkName", {
                fid: this.dataId,
                fId: this.dataId,
                name: this.fileName,
                queryType: this.queryType,
                isDirectory: 1,
                rowState: 1
            }).then(res => {
                console.log(res)
                if (res && res.data && res.data.type == 'success') {
                    dsf.http.post("fn/skydrive/add", {
                        fid: that.dataId,
                        fId: that.dataId,
                        name: that.fileName,
                        queryType: that.queryType,
                        isDirectory: 1,
                        rowState: 1
                    }).then(res => {
                        if (res && res.data && res.data.type == 'success') {
                            that.getFiles()
                        }
                    });
                } else {
                    dsf.layer.toast("已经存在相同文件夹，请使用其他名称！");

                }
            });
        },
        addDirectory() {
            this.fileName = ""
            this.showAdd = true
        },
        getFiles() {
            let self = this;
            if (self.$route.params.folderid || self.$route.params.driveType) {
                let url = `fn/skydrive/list`;
                dsf.http.post(url, {
                        queryType: self.$route.params.driveType == -1 ? "" : self.$route.params.driveType,
                        dataId: self.$route.params.folderid == -1 ? 0 : self.$route.params.folderid,
                        key: ""
                    }).done(result => {
                        console.log(result);
                        if (result.code == "200") {
                            result = result.data.data
                            result.forEach(element => {
                                if (element.isDirectory == 1) {
                                    element.type = "folder"
                                } else {
                                    element.type = element.filePath.split('.')[1]
                                }
                            });
                            self.files = result.filter(item => item.type != undefined);
                        }
                    })
                    .error(error => {
                        self.errored = true;
                    })
                    .always(() => {
                        dsf.layer.closeLoading(self.loading);
                    });
            } else {
                let url = `fn/skydrive/mobileIndex`;
                dsf.http.post(url).done(result => {
                        console.log(result);
                        result.rows.forEach(element => {
                            element.type = "folder"
                        });
                        self.files = result.rows;
                    })
                    .error(error => {
                        self.errored = true;
                    })
                    .always(() => {
                        dsf.layer.closeLoading(self.loading);
                    });
            }

        },
        onSearch () {
            let load = dsf.layer.loading()
            dsf.http.post('fn/skydrive/list', {
                queryType: this.queryType,
                dataId: this.dataId,
                key: this.key
            }).done(result => {
                console.log(result);
                if (result.code == "200") {
                    result = result.data.data
                    result.forEach(element => {
                        if (element.isDirectory == 1) {
                            element.type = "folder"
                        } else {
                            element.type = element.filePath.split('.')[1]
                        }
                    });
                    this.files = result.filter(item => item.type != undefined);
                }
            })
            .error(error => {
                this.errored = true;
            })
            .always(() => {
                dsf.layer.closeLoading(load);
            });
        }
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
}

::v-deep.van-divider {
    margin: 0;
    padding: 0 16px;
    border-color: #ddd;
    background-color: #fff;
}

.nameinput {
    width: 100%;
    padding: 20px 15px;
    display: flex;
    align-items: center;

    input {
        outline: none;
        border: 1PX solid #ebebeb;
        box-sizing: border-box;
        padding: 0 10px;
        font-size: var(--font_size_3);
        color: #333;
        flex: 1;
        height: 40px;
        margin-top: 5px;
    }

    span {
        font-size: var(--font_size_3);
        flex-shrink: 0;
        color: #000;
    }
}
</style>

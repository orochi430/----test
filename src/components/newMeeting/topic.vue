<template>
    <div class="topic-page">
        <van-pull-refresh v-model="loading" @refresh="onRefresh">
            <div v-if="errored">
                <commonempty image="error" description="发生错误" />
            </div>
            <div v-else-if="showList.length > 0">
                <div class="topic-list">
                    <van-collapse v-model="activeNames" @change="setActivity" accordion>
                        <van-collapse-item v-for="(item, index) in showList" :key="index" :name="index" class="item"
                            :value="item.activity">
                            <template #title>
                                <div class="title">
                                    <i class="indexicon">{{ Number(index) + 1 }}</i>{{ item.title }}
                                </div>
                            </template>
                            <template #default>
                                <div class="item-msg">
                                    <div class="box user">
                                        <div class="bt">
                                            <img src="../../../static/images/meeting/user.svg" alt="" />汇报人员
                                        </div>
                                        <div class="text">
                                            {{ item.reporter }}&nbsp;&nbsp;&nbsp;&nbsp;{{
                                                    item.reporterDept
                                            }}
                                        </div>
                                    </div>
                                    <div v-if="!item.is_yd" class="box team">
                                        <div class="bt">
                                            <img src="../../../static/images/meeting/team.svg" alt="" />列席部门
                                        </div>
                                        <div class="text">{{ item.attendDept }}</div>
                                    </div>
                                    <div class="files" v-if="item.attach.length > 0">
                                        <div class="bt">
                                            <img src="../../../static/images/meeting/file-text.svg" alt="" />议题材料
                                        </div>
                                        <div class="files-list">
                                            <a v-for="(fileItem, fileIndex) in item.attach" :key="fileIndex"
                                                @click="openFile(fileItem)">{{ fileItem.fileName }}</a>
                                        </div>
                                    </div>
                                </div>
                            </template>
                        </van-collapse-item>
                    </van-collapse>
                </div>
            </div>
            <div v-else>
                <commonempty description="暂无数据" />
            </div>
        </van-pull-refresh>
        <van-popup v-model="fileShow" :get-container="'#app'" position="bottom" class="filePop">
            <van-nav-bar :title="popFile.fileName" @click-left="fileShow = false" @click-right="fileShow = false">
                <template v-if="appTopMenu" #left>
                    <van-icon name="arrow-left" /><span>返回</span>
                </template>
                <template v-else #right>
                    <!-- <van-icon name="cross" /> -->
                    <span>关闭</span>
                </template>
            </van-nav-bar>
            <enclosure-preview v-if="dsf.config.commonForm.LocalDocPreview" :file="popFile"></enclosure-preview>
            <iframe v-else id="filePreview" :src="fileUrl" :key="`${popFile.fileId}_${new Date()}`" frameborder="0" />
        </van-popup>
        <van-image-preview v-model="imgPreview" :images="previewImg" closeable></van-image-preview>
    </div>
</template>

<script>
import EnclosurePreview from "@/components/enclosure/EnclosurePreview";
export default {
    components: {
        EnclosurePreview
    },
    props: {
        pk: {
            type: String,
            default: () => undefined
        }
    },
    data() {
        return {
            fileUrl: "",
            imgPreview: false,
            previewImg: [],
            popFile: {},
            fileShow: false,
            appTopMenu: dsf.config.appTopMenu.value,
            loading: false,
            activeNames: 0,
            list: [],
            errored: false
        };
    },
    computed: {
        showList: function () {
            return this.list.filter(item => item.is_show);
        }
    },
    created() {
        let self = this;
        self.loadData();
    },
    methods: {
        setActivity(newValue) {
            let self = this;
            console.log("activeNames", newValue);
            self.showList.forEach((item, index, array) => {
                item.activity = "展开";
            });
            if (typeof newValue === 'number') {
                self.showList[newValue].activity = "收起";
            } else if (Array.isArray(newValue)) {
                newValue.forEach((item, index, array) => {
                    self.showList[item].activity = "收起";
                });
            }
        },
        //加载数据
        loadData() {
            let self = this;
            //接口处
            dsf.http
                .post(`fn/meetingNotice/getTopic`, {
                    pk: self.pk
                })
                .done(res => {
                    if (res.type == "success") {
                        self.list = res.data.map((item, idx) =>
                            Object.assign({}, item, {
                                title: `议题${dsf.util.numToHan(idx + 1)}：${item.title}`,
                                activity: idx == 0 ? "收起" : "展开"
                            })
                        );
                    }
                })
                .error(error => {
                    console.log("topics-error", error);
                    dsf.layer.toast("数据获取失败！", false);
                    self.errored = true;
                })
                .always(() => {
                    // dsf.layer.closeLoading(self.loading);
                });
            self.loading = false;
        },
        onRefresh() {
            this.loadData();
        },
        openFile(item, edit) {
            let self = this;
            let loginToken = dsf.util.loadSessionStore("loginToken");
            item.navtiveUrl = item.fileName;
            self.popFile = item;
            let url = dsf.url.getServerUrl(
                `fn/office/openMobileOffice?fileId=${item.fileId}&moduleId=${item.moduleId}&nodeId=${item.flowId}&x-auth-token=${loginToken}&screenWidth=${document.body.clientWidth}`
            );
            const index = item.navtiveUrl.lastIndexOf(".");
            const suffix = item.navtiveUrl.substr(index + 1);
            const toLowerSuffix = suffix.toLowerCase();
            //图片数组
            let imgArr = ["png", "jpg", "jpeg", "bmp", "gif"];
            if (toLowerSuffix == "mp4") {
                //视频直接播放
                // this.videoPreview = true;
                // this.previewVideo = url;
            } else if (
                item.navtiveUrl.indexOf("http") == 0 &&
                item.navtiveUrl.indexOf("response-content-type=image") > -1
            ) {
                //图片直接预览，两种模式，一个弹层，一个直接显示
                this.localImgPreview(item.navtiveUrl);
            } else if (imgArr.indexOf(toLowerSuffix) > -1) {
                //图片直接预览，两种模式，一个弹层，一个直接显示
                this.localImgPreview(url);
            } else if (edit == "iSignature") {
                //启用金格的手写签批
                // this.iSignature(item, item.initUrl, suffix);
            } else if (edit == "dianJu") {
                //启用点聚的手写签批
                // this.dianJuFileOpen(item, item.initUrl, suffix);
            } else if (dsf.config.commonForm.yzyWps) {
                //是否启用粤政易wps，只有在粤政易App中有效
                // if (dsf.config.commonForm.LocalPdfPreview && edit != 'edit') {
                //     this.localFilePreviewOrEdit(url, item, edit)
                // } else {
                //     this.yzyWpsOpenFile(item, url, toLowerSuffix);
                // }
            } else if (navigator.userAgent.includes("DreamSoft")) {
                //公司打包App中
                this.localFilePreviewOrEdit(url, item, edit);
            } else {
                this.localFilePreviewOrEdit(url, item, edit);
            }
        },
        localImgPreview(url) {
            //本地图片预览
            this.imgPreview = true;
            this.previewImg = [url];
        },
        localFilePreviewOrEdit(url, item, edit) {
            //本地文件预览、编辑
            if (edit == "edit") {
                this.fileUrl = item.editUrl;
            } else {
                this.fileUrl = url;
            }
            if (dsf.config.commonForm.webViewPreview) {
                let tempurl = dsf.url.getRootPath() + url.replace("../", "");
                xsfWindow.openWebView({
                    title: item.title,
                    url: tempurl,
                    colorString: "#111111"
                });
            } else {
                // 为表单控件则弹层预览
                this.fileShow = true;
                this.popFile = item;
            }
        }
    },
    watch: {}
};
</script>

<style lang="scss" scoped>
.topic-page {
    // height: 100vh;
    background: #f4f4f4;
    padding: 15px;
    box-sizing: border-box;

    * {
        box-sizing: border-box;
    }

    .van-pull-refresh {
        height: 100%;
    }

    .topic-list {
        .item {
            margin-bottom: 15px;
            border: 1px solid rgba(240, 243, 248, 1);
            box-shadow: 0px 2px 13px 0px rgba(190, 190, 190, 0.21);
            border-radius: 12px;
            background: #fff;

            ::v-deep .van-cell--clickable:active {
                background: #fff !important;
            }

            ::v-deep .van-cell {
                background: #fff !important;
                border-radius: 12px;
                padding-top: 30px;
                position: relative;

                .van-cell__title {
                    color: #333;
                    line-height: 48px;
                    font-weight: 500;
                    font-size: 18px;
                    font-weight: bold;
                    flex: inherit;
                    width: calc(100% - 40px);
                }

                .van-cell__value {
                    color: #2271b3;
                    font-weight: bold;
                    width: 40px;
                    overflow: initial;
                    white-space: nowrap;
                    padding-top: 1px;
                }

                .indexicon {
                    position: absolute;
                    left: 0;
                    top: 0;
                    width: 36px;
                    height: 22px;
                    background: #006fb6;
                    text-align: center;
                    line-height: 22px;
                    border-radius: 12px 0 12px 0;
                    color: #fff;
                    font-weight: normal;
                }
            }

            ::v-deep .van-icon-arrow {
                width: 22px;
                height: 22px;
                text-align: center;
                color: #2271b3;
                // border: 2px solid #B6B6B6;
                // border-radius: 50%;
                // margin-top: 5px;
            }

            ::v-deep .van-collapse-item__content {
                background: #fff !important;
                border-radius: 0 0 12px 12px;
                padding-top: 0;
            }

            .title {
                color: #af9060;
            }

            ::v-deep .item-msg {
                .box {
                    display: flex;
                    justify-content: flex-start;
                    align-items: center;
                    border-bottom: 1px solid #ddd;
                    padding: 15px 0;

                    .bt {
                        display: flex;
                        justify-content: flex-start;
                        width: 140px;
                        color: #666;
                        font-weight: 400;
                        font-size: var(--font_size_2);
                        white-space: nowrap;

                        img {
                            width: 20px;
                            height: 20px;
                            margin-right: 4px;
                        }
                    }

                    .text {
                        width: calc(100% - 140px);
                        color: #333;
                        font-weight: 400;
                        font-size: var(--font_size_2);
                    }
                }

                .files {
                    padding-top: 15px;

                    .bt {
                        display: flex;
                        justify-content: flex-start;
                        width: 40%;
                        color: #666;
                        font-weight: 400;
                        font-size: var(--font_size_2);
                        white-space: nowrap;

                        img {
                            width: 20px;
                            height: 20px;
                            margin-right: 4px;
                        }
                    }

                    &-list {
                        a {
                            display: block;
                            width: calc(100% - 27px);
                            margin-top: 10px;
                            color: #006fb6;
                            font-weight: 400;
                            font-size: var(--font_size_2);
                            cursor: pointer;
                            padding-left: 27px;
                            overflow: hidden;
                            // text-overflow: ellipsis;
                            // white-space: nowrap;
                            word-break: break-all;
                        }
                    }
                }
            }
        }
    }

    .van-empty {
        height: 80vh;
    }
}

.filePop {
    height: 100%;
    display: flex;
    flex-direction: column;

    iframe {
        flex: 1;
    }

    .van-nav-bar__right {
        span {
            color: #2271b3;
            font-weight: bold;
        }
    }

    .btn-container {
        background-color: #fff;
        width: 100%;
        padding: 12px;

        .btn {
            width: 100%;
        }
    }
}
</style>

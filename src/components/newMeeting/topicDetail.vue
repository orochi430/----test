<template>
<div class="meettingTopic">
    <div class="lists" v-for="(item,index) in lists" :key="index">
        <div class="texts active">
            <div class="inputs">
                <span>议题名称：</span>
                <p>{{item.title}}</p>
            </div>
            <div class="inputs">
                <span>汇报人员：</span>
                <p>{{item.reporter}}</p>
            </div>
            <div class="inputs">
                <span>汇报部门：</span>
                <p>{{item.reporterDept}}</p>
            </div>
            <div class="inputs">
                <span>汇报时长：</span>
                <p>{{item.reportTime?item.reportTime+'(分钟)':''}}</p>
            </div>
            <div class="inputs">
                <span>参会部门：</span>
                <p>{{item.attendDept}}</p>
            </div>
            <div class="inputs">
                <span>议题标签：</span>
                <p>{{item.tag}}</p>
            </div>
            <div class="inputs" style="border:none">
                <span>议题材料：</span>
            </div>
            <div class="files" v-if="item.attach.length>0">
                <div v-for="(obj) in item.attach" :key="obj.id" @click="openFile(obj)">
                    <span>
                        <van-image :src="'../../../../static/images/fileType/'+obj.ext+'.png'">
                            <template v-slot:error>
                                <img src="../../../static/images/fileType/cloud.png" alt="" srcset="">
                            </template>
                        </van-image>
                    </span>
                    <p>{{obj.fileName}}</p>
                </div>
            </div>
            <div class="inputs">
                <span>议题状态：</span>
                <p>未开始</p>
                <van-icon name="arrow" @click="showStatus=true" />
            </div>
            <div class="inputs">
                <span>审议结果：</span>
                <p>未开始</p>
                <van-icon name="arrow" @click="showResult=true" />
            </div>
            <div class="inputs">
                <span>审议明细：</span>
                <p>未开始</p>
                <van-icon name="arrow" @click="detailClick" />
            </div>
        </div>
    </div>
    <div class="biaojue">投票表决</div>
    <div class="showNext">查看下一个议题详情</div>
    <van-image-preview v-model="imgPreview" :images="previewImg" closeable></van-image-preview>
    <van-popup v-model="showFile" :close-on-click-overlay="true" class="file-preview" lock-scroll position="bottom" style="height: 100vh">
        <van-nav-bar :title="filename" left-text="返回" left-arrow fixed placeholder @click-left="closeFile">
        </van-nav-bar>
        <file :file-url="fileUrl" :style="{height: `calc(100vh - ${dsf.util.getOffsetTop('0.92rem')})`}"></file>
    </van-popup>
    <van-dialog v-model="showStatus" title="议题状态" show-cancel-button confirmButtonColor="#3478F7" cancelButtonColor="#999">
        <div class="warpBox">
            <van-radio-group v-model="statusRadio" checked-color="#3478F7">
                <van-radio name="1">未开始</van-radio>
                <van-radio name="2">进行中</van-radio>
                <van-radio name="3">已结束</van-radio>
            </van-radio-group>
        </div>
    </van-dialog>
    <van-dialog v-model="showResult" title="审议结果" show-cancel-button confirmButtonColor="#3478F7" cancelButtonColor="#999">
        <div class="warpBox">
            <van-radio-group v-model="resultRadio" checked-color="#3478F7">
                <van-radio name="1">未通过</van-radio>
                <van-radio name="2">已通过</van-radio>
                <van-radio name="3">待定</van-radio>
            </van-radio-group>
        </div>
    </van-dialog>
    <van-dialog v-model="showDetail" title="审议明细" show-cancel-button confirmButtonColor="#3478F7" cancelButtonColor="#999">
        <div class="warpBox warpBox1">
            <van-field v-model="detail" rows="5" autosize type="textarea" maxlength="500" placeholder="请输入审议明细" />
        </div>
    </van-dialog>
    <van-popup v-model="showVote" class="votePopup">
        <div class="vote">
            <van-icon name="cross" />
            <div class="title">
                议题表决
            </div>
            <div class="subtitle">
                关于议题1：*****************的意见
            </div>
            <div class="options">
                <span class="active">A 通过</span>
                <span>B 不通过</span>
                <span>C 弃权</span>
            </div>

            <van-button type="info" size="small" color="#3478F7">提交</van-button>
        </div>
    </van-popup>
    <van-popup v-model="showPercent" class="votePopup">
        <div class="vote">
            <van-icon name="cross" />
            <div class="title">
                表决结果
            </div>
            <div class="percent">
                <div>
                    <span class="item">A 通过</span>
                    <div class="perc">
                        <p><span style="width:60%"></span></p>
                        <span>30%</span>
                    </div>
                </div>
                <div>
                    <span class="item">B 不通过</span>
                    <div class="perc">
                        <p><span style="width:60%"></span></p>
                        <span>30%</span>
                    </div>
                </div>
                <div>
                    <span class="item">C 弃权</span>
                    <div class="perc">
                        <p><span style="width:60%"></span></p>
                        <span>30%</span>
                    </div>
                </div>
            </div>
        </div>
    </van-popup>
</div>
</template>

<script>
import file from "@/components/common/file"
export default {
    name: 'topicDetail',
    components: {
        file
    },
    data() {
        return {
            showPercent: false,
            showVote: false,
            showStatus: false,
            statusRadio: '1',
            showResult: false,
            resultRadio: '1',
            showDetail: false,
            detail: "",
            lists: [{
                "attendDept": "测试部门2",
                "reporter": "李斌",
                "reporterDept": "办公厅",
                "id": "2206241232282po1UvmledWDH4YZtxC",
                "attach": [{
                    "fileName": "正文.docx",
                    "moduleId": "210607181937YJxUC5fve4y7q3SH5hJ",
                    "nodeId": "1",
                    "flowId": "0",
                    "fileId": "220624123304J8715c6MjsSF0WwtMZB"
                }],
                "title": "议题1",
                "is_yd": false,
                "is_show": true,
                "tag": "民生类",
                "reportTime": "5"
            }],
            imgType: ['jpeg', 'bmp', 'webp', 'svgz', 'svg', 'gif', 'jpg', 'ico', 'png', 'tif'],
            imgPreview: false,
            previewImg: [],
            showFile: false,
            filename: "",
            fileUrl: "",
            fileType: ""
        };
    },
    computed: {},
    watch: {},
    methods: {
        toggle(index) {
            this.$set(this.lists[index], "show", !this.lists[index].show)
        },
        initTopicData() {
            dsf.http.post('/fn/meetingNotice/getTopic', {
                pk: this.formData.main["A0001"].value
            }).then(res => {
                console.log(res.data.data)
                if (res.data.code == 200 && res.data.data.length > 0) {
                    res.data.data.forEach((item, index) => {
                        if (index == 0) {
                            item.show = true
                        } else {
                            item.show = false
                        }
                        if (item.attach && item.attach.length > 0) {
                            item.attach.forEach(obj => {
                                obj.ext = ""
                                obj.ext = obj.fileName.substr(obj.fileName.lastIndexOf(".") + 1).toLowerCase()
                            })
                        }
                        console.log(item.attach)
                    });
                    this.lists = res.data.data
                }
            })
        },
        //打开附件
        openFile(item) {
            console.log(item)
            this.filename = item.fileName
            this.fileType = item.fileName.substr(item.fileName.lastIndexOf(".") + 1)
            const loginToken = dsf.util.loadSessionStore("loginToken");
            let url = ''
            if (this.imgType.indexOf(this.fileType) > -1) { // 图片格式的预览地址
                url = dsf.url.getServerUrl(
                    `fn/mobileFileDownload/download?fileId=${item.fileId}&moduleId=${this.moduleId}&fileName=${item.fileName}`
                );
                this.imgPreview = true;
                this.previewImg = [url];
            } else {
                url = dsf.url.getServerUrl(
                    `fn/office/openMobileOffice?fileId=${item.fileId}&moduleId=${this.moduleId}&x-auth-token=${loginToken}`
                )
                if (dsf.config.previewSetting.previewType == 4) {
                    dsf.http.post(`fn/office/mobile/wpsPreview`, {
                        fileId: item.fileId,
                        readOnly: item.canEdit > 0 ? true : false
                    }).then(({
                        data
                    }) => {
                        this.showFile = true
                        this.fileUrl = data.data
                    })
                } else if (dsf.config.commonForm.webViewPreview) {
                    let tempurl = dsf.config.serverUrl + dsf.config.webRoot + url.replace("../", "")
                    console.log(tempurl)
                    xsfWindow.openWebView({
                        "title": item.fileName,
                        "url": tempurl,
                        "colorString": "#111111"
                    });
                } else {
                    this.showFile = true
                    this.fileUrl = url
                }
            }
        },
        closeFile() {
            this.showFile = false
        },
        detailClick() {
            //这里需要判断
            /**
             * 表决时，审议明细查看投票明细，  自己维护时，打开文本框，自己输入
             */
            this.showDetail = true
        }
    },
    created() {},
    mounted() {
        // this.initTopicData()
    },
    destroyed() {},
}
</script>

<style lang="scss" scoped>
@import "../../assets/styles/themes.scss";
@import "../../assets/styles/mixin.scss";

.meettingTopic {
    width: 100%;
    height: auto;
    box-sizing: border-box;
    padding: 10px;

    .lists {
        width: 100%;
        height: auto;
        background: #FFF;
        box-sizing: border-box;
        padding: 10px;
        border-radius: 5px;
        margin-bottom: 10px;

        .title {
            width: 100%;
            height: 36px;
            display: flex;
            align-items: center;
            font-size: var(--font_size_2);
            color: #333;
            font-weight: bold;
            border: none;

            &.active {
                border-bottom: 1px solid #ebebeb;
            }

            &::before {
                width: 4px;
                height: 20px;
                @include background-theme('normal');
                content: '';
                margin-right: 10px;
            }

            &>span {
                flex: 1;
            }

            .van-icon {
                flex-shrink: 0;
                font-size: var(--font_size_0);
                color: #999;
                transition: all linear .2s;

                &.active {
                    transform: rotate(90deg);
                    transition: all linear .2s;
                }
            }
        }

        .texts {
            width: 100%;
            height: auto;
            box-sizing: border-box;
            padding-left: 14px;
            display: none;

            &.active {
                display: block;
            }

            .inputs {
                width: 100%;
                height: 42px;
                display: flex;
                align-items: center;
                border-bottom: 1px solid #ebebeb;
                justify-content: space-between;

                p {
                    font-size: var(--font_size_3);
                    color: #333;

                    flex: 1;
                }

                span {
                    font-size: var(--font_size_3);
                    color: #666;
                    flex-shrink: 0;
                }

                &:last-child {
                    border: none;
                }

                .van-icon {
                    font-size: var(--font_size_3);
                    color: #666;
                    flex-shrink: 0;
                }
            }

            .files {
                width: 100%;
                height: auto;

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
                        font-size: var(--font_size_3);
                        color: #666666;
                    }
                }
            }
        }
    }
    .biaojue{
        width: 50%;
        height: 40px;
        border-radius: 10px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: var(--font_size_3);
        margin-top: 30px;
        margin-left: 25%;
        background: #1989fa;
        color: #FFF;
    }
    .showNext {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: var(--font_size_3);
        color: #333;
        text-decoration: underline;
        margin-top: 30px;
    }

    .warpBox {
        width: 100%;
        height: auto;
        box-sizing: border-box;
        padding: 20px 20px 30px 50px;

        &.warpBox1 {
            padding: 20px;
        }

        .van-radio {
            margin-top: 20px;
        }

        .van-radio__label {
            font-size: var(--font_size_3);
        }
    }

}

>>>.votePopup {
    border-radius: 10px;
    overflow: hidden;
    width: 80%;
    box-sizing: border-box;

    .vote {
        width: 100%;
        position: relative;
        padding-bottom: 20px;

        .van-icon {
            font-size: 18px;
            color: #999;
            position: absolute;
            right: 10px;
            top: 10px;
        }

        .title {
            width: 100%;
            height: 50px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: var(--font_size_2);
            color: #000;
        }

        .subtitle {
            width: 100%;
            height: auto;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: var(--font_size_3);
            color: #333;
            box-sizing: border-box;
            padding: 0 20px;
            line-height: 30px;
        }

        .options {
            width: 100%;
            display: flex;
            flex-direction: column;
            box-sizing: border-box;
            padding: 20px;

            span {
                height: 40px;
                width: 100%;
                box-sizing: border-box;
                padding: 0 20px;
                display: flex;
                align-items: center;
                font-size: var(--font_size_3);
                color: #333;
                border-radius: 5px;
                margin-top: 10px;

                &.active {
                    background: #3478F7;
                    color: #FFF;
                }
            }
        }

        .van-button {
            width: 60%;
            margin-left: 20%;
            margin-top: 20px;
            border-radius: 5px;
        }

        .percent {
            width: 100%;
            height: auto;
            box-sizing: border-box;
            padding: 20px;
            display: flex;
            flex-direction: column;

            &>div {
                display: flex;
                flex-direction: column;
                margin-top: 15px;

                .item {
                    font-size: var(--font_size_3);
                    color: #333;
                    line-height: 30px;
                }

                .perc {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    margin-top: 5px;

                    &>p {
                        flex: 1;
                        width: 80%;
                        height: 12px;
                        border-radius: 10px;
                        overflow: hidden;
                        display: flex;
                        align-items: center;
                        background: #e5e5e5;

                        span {
                            height: 12px;
                            border-radius: 10px;
                            display: block;
                        }
                    }

                    &>span {
                        width: 20%;
                        flex-shrink: 0;
                        font-size: var(--font_size_3);
                        color: #666;
                        box-sizing: border-box;
                        padding-left: 5%;
                    }
                }

                &:nth-child(4n+1) {
                    .perc {
                        &>p {
                            span {
                                background: #40b505;
                            }
                        }
                    }

                }

                &:nth-child(4n+2) {
                    .perc {
                        &>p {
                            span {
                                background: #b52100;
                            }
                        }
                    }

                }

                &:nth-child(4n+3) {
                    .perc {
                        &>p {
                            span {
                                background: #e3c700;
                            }
                        }
                    }

                }

                &:nth-child(4n) {
                    .perc {
                        &>p {
                            span {
                                background: #0068c1;
                            }
                        }
                    }

                }
            }
        }
    }
}
</style>

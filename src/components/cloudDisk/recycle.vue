<template>
<div class="recycle">
    <!-- <van-nav-bar title="回收站" left-text="返回" left-arrow @click-left="onClickLeft">
        <template #right>
            <van-image width="24" height="24" :src="moreSvg" @click="show=true" />
        </template>
    </van-nav-bar> -->
    <div class="files">
        <commonempty v-if="list.length == 0 && !loading" description="暂无文件" />
        <van-pull-refresh v-model="refreshing" :disabled="finished" @refresh="doRefresh">
            <van-list v-model="loading" :finished="finished" @load="onLoad">
                <van-checkbox-group v-model="result" @change="resultChange">
                    <div class="dongtai">
                        <van-checkbox v-if="showBatch" :name="item.id" :disabled="item.isDirectory==1"></van-checkbox>
                        <div class="file" v-for="(item,index) in list" :key="index">
                            <fileTypeIcon class="icon" :width="30" :height="38" :file-name="item.fileName" :isDirectory="item.fileSuffix?-1:1"></fileTypeIcon>
                            <div class="content">
                                <p>
                                    <span>{{ item.fileName }}</span>
                                    <span>{{ item.createTime }} {{ item.userName }} <label>删除</label></span>
                                </p>
                                <van-image :src="moreFileSvg" @click="actionHanddle(item)"></van-image>
                            </div>
                        </div>
                    </div>
                </van-checkbox-group>
            </van-list>
        </van-pull-refresh>
    </div>
    <van-action-sheet v-model="showAction" :actions="actions" cancel-text="取消" close-on-click-action @cancel="onCancel" @select="select" />
    <!-- <van-popup v-model="show" closeable round close-icon="close" position="bottom">
        <div class="paixu">
            <span class="title">排序</span>
            <p class="buttons">
                <span class="active">时间排序</span>
                <span>名称排序</span>
            </p>
            <span class="title">操作</span>
            <p class="buttons">
                <span>多选</span>
                <span style="color: #e50012;">清空回收站</span>
            </p>
        </div>
    </van-popup>
    <div class="batchTop" v-if="showBatch">
        <span>已选{{ result.length }}项</span>
        <p>
            <span @click="selectAll">{{ isCheckAll ? '全选' : '取消全选'}}</span>
            <span @click="complete">完成</span>
        </p>
    </div>
    <div class="batchBottom" v-if="showBatch">
        <p @click="batchAdd">
            <img src="../../assets/imgs/cloudDisk/icon-move.png" alt="" />
            <span>添加到</span>
        </p>
        <p @click="batchMove">
            <img src="../../assets/imgs/cloudDisk/icon-move.png" alt="" />
            <span>移动到</span>
        </p>
        <p @click="batchDelete">
            <img src="../../assets/imgs/cloudDisk/delete.png" alt="" />
            <span>删除</span>
        </p>
    </div> -->
    <van-popup v-model="showDetail" position="bottom" :style="{ height: '100%' }">
        <div class="diskFileDetail" v-if="showDetail">
            <van-nav-bar title="回收站" left-text="返回" left-arrow @click-left="showDetail=false">
            </van-nav-bar>
            <div class="top">
                <fileTypeIcon class="icon" :width="30" :height="38" :file-name="curObj.fileName" :isDirectory="curObj.fileSuffix?-1:1"></fileTypeIcon>
                <span>{{ curObj.fileName }}</span>
            </div>
            <div class="filerow">
                <span class="tit">大小</span>
                <span class="text">{{ curObj.fileSize }}</span>
            </div>
            <div class="filerow">
                <span class="tit">删除时间</span>
                <span class="text">{{ curObj.removeTime }}</span>
            </div>
            <div class="filerow">
                <span class="tit">删除者</span>
                <span class="text">{{ curObj.userName }}</span>
            </div>
            <div class="filerow">
                <span class="tit">位置</span>
                <span class="text">{{ curObj.fileSize }}</span>
            </div>

            <div class="huanyuan" @click="batchHaddle(1)">还原</div>
        </div>
    </van-popup>
</div>
</template>

<script>
import CommonHead from './commonHead.vue'
import fileTypeIcon from './fileTypeIcon.vue';
export default {
    name: 'recycle',
    components: {
        CommonHead,
        fileTypeIcon
    },
    data() {
        return {
            moreSvg: require('../../assets/imgs/cloudDisk/more.svg'),
            moreFileSvg: require('../../assets/imgs/cloudDisk/more-file.svg'),
            keyword: '',
            showDialog: false,
            list: [],
            finished: false,
            loading: false,
            refreshing: false,
            start: 1,
            limit: 15,
            show: false,
            nodata: false,
            showBatch: false,
            result: [],
            isCheckAll: true,
            showAction: false,
            actions: [{
                name: '还原'
            }, {
                name: '彻底删除'
            }, {
                name: '详细信息'
            }],
            curObj: {},
            showDetail: false
        };
    },
    computed: {},
    watch: {},
    methods: {
        onClickLeft() {
            this.$router.go(-1)
        },
        onLoad() {
            let that = this
            that.nodata = false
            dsf.http
                .post("fn/cloud/recyclebin/list", {
                    page: this.start,
                    limit: this.limit
                }, {
                    headers: {
                        "Content-Type": "application/json"
                    }
                })
                .then(({
                    status,
                    data
                }) => {
                    this.loading = false;
                    console.log(data, status)
                    if (status === 200) {
                        if (data.data.length == 0 && that.start == 1) {
                            that.nodata = true
                        }

                        if (data && data.data && data.data.length > 0) {
                            data.data.forEach(item => {
                                item.removeTime = item.createTime ? moment(new Date(item.createTime)).format("YYYY/MM/DD HH:ss") : '';
                                item.createTime = item.createTime ? moment(new Date(item.createTime)).calendar() : '';
                            })
                            that.list = that.list.concat(data.data)
                        }
                        if (data.data.length < that.limit) {
                            this.finished = true;
                        } else {
                            that.start += 1
                        }

                    } else {
                        this.finished = true;
                        that.nodata = true
                    }
                }).catch(({
                    message
                }) => {
                    this.finished = true;
                    that.nodata = true
                }).finally(() => {
                    this.loading = false;
                    this.refreshing = false;
                });
        },
        // 下拉刷新处理函数
        doRefresh() {
            this.page = 1
            this.list = []
            // 清空列表数据
            this.finished = false;

            // 重新加载数据
            // 将 loading 设置为 true，表示处于加载状态
            this.loading = true;
            this.onLoad();
        },
        selectAll() {
            if (this.isCheckAll) {
                this.result = []
                this.list.forEach(item => {
                    if (item.isDirectory != 1) {
                        this.result.push(item.id)
                    }
                })
            } else {
                this.result = []
            }
            this.isCheckAll = !this.isCheckAll

        },
        resultChange() {
            if (this.result.length == this.list.map(item => {
                    return item.isDirectory != 1
                })) {
                this.isCheckAll = false
            } else {
                this.isCheckAll = true
            }
        },
        batchHaddle(type) {
            dsf.http.post("fn/cloud/recyclebin/fileOperate", {
                    "fileIds": this.curObj.id,
                    operateType: type
                })
                .then((res) => {
                    if (res.data && res.data.code == "200") {
                        this.showDetail = false
                        this.doRefresh()
                    }
                }).catch((e) => {

                }).finally(() => {

                })
        },
        actionHanddle(item) {
            this.curObj = item
            this.showAction = true
        },
        select(action, index) {
            this.showAction = false
            if (index == 2) {
                this.showDetail = true
            } else {
                this.batchHaddle(index + 1)
            }

        },
        onCancel() {
            this.showAction = false
        }
    },
    created() {},
    mounted() {},
    destroyed() {},
}
</script>

<style lang="scss" scoped>
.commonHead {
    width: 100%;
    height: auto;
    box-sizing: border-box;
    background: #fff;

    .capacity {
        font-size: 11px;
        color: #A2A3A4;
        display: flex;
        align-items: center;
        margin-top: 8px;

        img {
            width: 5px;
            height: 8px;
            margin-left: 2.5px;
        }
    }

    .van-search {
        height: 30px;
        padding: 0;
        border-radius: 3px;
        background: #E9EBEC;

        .van-search__content {
            background-color: transparent;
            height: 100%;
            padding: 0 0 0 10px;

            ::v-deep input {
                color: #fff;

                &::placeholder {
                    color: #CCCCCC;
                }
            }
        }
    }

    .tipText {
        width: 100%;
        height: 40px;
        background: #F2F2F5;
        font-size: var(--font_size_4);
        color: #A2A3A4;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .top {
        box-sizing: border-box;
        width: 100%;
        padding: 8px 14px 0 14px;
        height: 60px;
    }
}

::v-deep .van-dropdown-menu__bar {
    box-shadow: none;
    height: 20px;

    .van-dropdown-menu__item {
        justify-content: flex-start;
    }

    .van-dropdown-menu__title {
        font-size: var(--font_size_4);
        color: #747577;
        font-weight: 500;
        padding: 0 5px 0 0;

        &::after {
            border-color: transparent transparent #747577 #747577;
        }
    }
}

.dialog-box {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 20px 0;

    span {
        font-size: 13px;
        color: #171A1D;
        letter-spacing: 1px;
        text-align: center;
        font-weight: 600;
        margin: 0 0 11px 0;
    }

    p {
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: var(--font_size_4);
        color: #747577;
        letter-spacing: 1px;
        font-weight: 400;
        margin: 4px 0;

        label {
            font-size: var(--font_size_4);
            color: #171A1D;
            letter-spacing: 0;
            font-weight: 400;
            margin-left: 5px;
        }
    }
}

.recycle {
    width: 100vw;
    height: 100vh;

    .files {
        width: 100%;
        height: calc(100vh - 46px);
        overflow-y: auto;
        background: #FFF;

        .dongtai {
            width: 100%;
            height: auto;
            box-sizing: border-box;
            padding: 0 14px;

            .file {
                display: flex;
                align-items: center;
                justify-content: space-between;

                .icon {
                    width: 38px;
                    height: 38px;
                    flex-shrink: 0;
                    overflow: hidden;
                }

                .content {
                    display: flex;
                    align-items: center;
                    flex: 1;
                    justify-content: space-between;
                    margin-left: 14px;
                    border-bottom: 1PX solid rgba(224, 226, 228, 1);
                    box-sizing: border-box;
                    padding: 14px 0;

                    /deep/ .van-image {
                        width: 24px;
                        height: 24px;
                        flex-shrink: 0;
                    }

                    p {
                        display: flex;
                        flex-direction: column;
                        flex: 1;
                        margin-right: 20px;

                        &>span:first-child {
                            font-size: var(--font_size_3);
                            color: #171A1D;
                            line-height: 20px;
                        }

                        &>span:last-child {
                            font-size: var(--font_size_4);
                            color: #A2A3A4;
                            display: flex;
                            align-items: center;

                            label {
                                font-size: var(--font_size_4);
                                color: #A2A3A4;
                                margin-left: 10px;
                            }
                        }
                    }
                }
            }
        }
    }
}

.paixu {
    width: 100%;
    height: auto;
    box-sizing: border-box;
    padding: 20px 14px;
    display: flex;
    flex-direction: column;

    .title {
        font-size: var(--font_size_4);
        color: #747577;
        margin-top: 14px;
    }

    .buttons {
        width: 100%;
        background: #f5f5f5;
        border-radius: 5px;
        margin-top: 14px;

        span {
            width: 100%;
            height: 40px;
            display: flex;
            align-items: center;
            color: #747577;
            font-size: var(--font_size_3);
            box-sizing: border-box;
            padding: 0 14px;

            &.active {
                color: #333;
                font-weight: bold;
            }
        }
    }
}

.diskFileDetail {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;

    .top {
        margin: 0 14px;
        height: auto;
        box-sizing: border-box;
        padding: 14px 0;
        border-bottom: 1PX solid #ebebeb;
        display: flex;
        align-items: center;

        span {
            font-size: var(--font_size_2);
            color: #333;
            flex: 1;
            box-sizing: border-box;
            padding-left: 10px;
        }
    }

    .filerow {
        width: 100%;
        height: auto;
        box-sizing: border-box;
        padding: 20px 14px;
        display: flex;
        flex-direction: column;

        .tit {
            font-size: var(--font_size_4);
            color: #747577;
        }

        .text {
            font-size: var(--font_size_2);
            color: #333;
            margin-top: 5px;
        }
    }

    .huanyuan {
        position: absolute;
        left: 14px;
        right: 14px;
        height: 40px;
        background: #0089FF;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: var(--font_size_3);
        color: #FFF;
        bottom: 30px;
        border-radius: 5px;
    }
}
</style>

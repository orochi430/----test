<template>
<div class="teamFile" :class="{'batch':showBatch}">
    <div class="order">
        <p class="title">文件列表</p>
        <p class="icons">
            <!-- <img @click="showSelect=true" src="../../assets/imgs/cloudDisk/order.png" alt="" /> -->
        </p>
    </div>
    <commonempty v-if="list.length == 0 && !loading" description="暂无文件" />
    <!-- 列表 -->
    <div class="disk-file-list">
        <van-pull-refresh v-model="refreshing" :disabled="finished" @refresh="doRefresh">
            <van-list v-model="loading" :finished="finished" finished-text="" @load="onLoad">
                <van-checkbox-group v-model="result" @change="resultChange">
                    <div class="itembox" v-for="(item,index) in list" :key="index">
                        <van-checkbox v-if="showBatch" :name="item.id"></van-checkbox>
                        <file-item v-long-press="handleLongPress" @doRefresh="doRefresh" :item="item"></file-item>
                    </div>
                </van-checkbox-group>
            </van-list>
        </van-pull-refresh>
    </div>
    <add-file :listType="4" :show="addFile" @closeAddFile="closeAddFile"></add-file>
    <!-- 筛选 -->
    <van-popup v-model="showSelect" position="bottom" round get-container="#app">
        <div class="select-contain">
            <!-- <div class="checkbox">多选</div> -->
            <div class="select-box" v-for="(item,index) in selectList" :key="index">
                <span>{{item.name}}</span>
                <div>
                    <p :class="{'active': selected == el.value}" v-for="(el,i) in item.term" :key="i" @click="changeSelect(el)">{{el.name}}</p>
                </div>
            </div>
            <div class="btn">
                <div :class="{'reset':selected != 2}" @click="resetSelect">重置</div>
                <div class="finish" @click="closeSelect">完成</div>
            </div>
        </div>
    </van-popup>
    <div class="batchTop" v-if="showBatch">
        <span>已选{{ result.length }}项</span>
        <p>
            <span @click="selectAll">{{ isCheckAll ? '全选' : '取消全选'}}</span>
            <span @click="complete">完成</span>
        </p>
    </div>
    <div class="batchBottom" v-if="showBatch" @click="clearHis">
        <img src="../../assets/imgs/cloudDisk/icon-delete.png" alt="" />
        <span>删除记录</span>
    </div>
</div>
</template>

<script>
import FileItem from './fileItem.vue'
import FileGrid from './fileGrid.vue'
import AddFile from './addFile.vue'
import dsf from '../../common'
export default {
    name: 'recentlyFile',
    components: {
        FileItem,
        FileGrid,
        AddFile
    },
    props: {},
    data() {
        return {
            list: [],
            finished: false,
            loading: false,
            refreshing: false,
            start: 1,
            limit: 15,
            curTab: 0,
            showShare: false,
            shareName: '分享给我',
            actions: [{
                name: '分享给我'
            }, {
                name: '我分享的'
            }],
            addFile: false,
            showSelect: false,
            selected: 5,
            selectList: [{
                    name: '按名称',
                    term: [{
                            name: '从A到Z',
                            orderType: 1,
                            reversed: false,
                            value: 1
                        },
                        {
                            name: '从Z到A',
                            orderType: 1,
                            reversed: true,
                            value: 2
                        }
                    ]
                },
                {
                    name: '更新时间',
                    term: [{
                            name: '从近到远',
                            orderType: 3,
                            reversed: false,
                            value: 3
                        },
                        {
                            name: '从远到近',
                            orderType: 3,
                            reversed: true,
                            value: 4
                        }
                    ]
                },
                {
                    name: '创建时间',
                    term: [{
                            name: '从近到远',
                            orderType: 2,
                            reversed: false,
                            value: 5
                        },
                        {
                            name: '从远到近',
                            orderType: 2,
                            reversed: true,
                            value: 6
                        }
                    ]
                },
                {
                    name: '文件大小',
                    term: [{
                            name: '从小到大',
                            orderType: 4,
                            reversed: false,
                            value: 7
                        },
                        {
                            name: '从大到小',
                            orderType: 4,
                            reversed: true,
                            value: 8
                        }
                    ]
                }
            ],
            orderType: 2,
            reversed: false,
            nodata: false,
            showBatch: false,
            result: [],
            isCheckAll: true
        }
    },
    computed: {},
    watch: {},
    created() {

    },
    mounted() {

    },
    methods: {
        getIconClass(title) {

        },
        onLoad() {
            let that = this
            that.nodata = false
            dsf.http
                .post("ctrl/cloud/file/recentList", {
                    pageNo: this.start,
                    pageSize: this.limit
                }, {
                    headers: {
                        "Content-Type": "application/json"
                    }
                })
                .then(({
                    status,
                    data
                }) => {
                    console.log(data, status)
                    if (status === 200) {
                        if (data.data.length == 0 && that.start == 1) {
                            that.nodata = true
                        }

                        if (data && data.data && data.data.length > 0) {
                            data.data.forEach(item => {
                                item.lastUpdateTime = item.lastUpdateTime ? moment(new Date(item.lastUpdateTime)).calendar() : '';
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
        doRefresh(title) {
            this.start = 1
            this.list = []
            // 清空列表数据
            this.finished = false;

            // 重新加载数据
            // 将 loading 设置为 true，表示处于加载状态
            this.loading = true;
            this.onLoad();
        },
        changeTab(index) {
            this.curTab = index
        },
        onSelect(item) {
            this.shareName = item.name;
            this.showShare = false;
        },
        closeAddFile() {
            this.addFile = false;
        },
        closeSelect() {
            this.showSelect = false;
        },
        changeSelect(el) {
            this.selected = el.value;
            this.orderType = el.orderType
            this.reversed = el.reversed
            this.showSelect = false;
            this.doRefresh()
        },
        resetSelect() {
            this.selected = 0;
            this.orderType = 2
            this.reversed = false
            this.showSelect = false;
            this.doRefresh()
        },
        handleLongPress() {
            this.showBatch = true
        },
        clearHis() {
            if (this.result.length == 0) {
                dsf.layer.toast("请选择需要删除的记录！");
                return
            }
            dsf.http.post("/fn/cloud/file/deleteRecent", this.result, {
                    headers: {
                        "Content-Type": "application/json"
                    }
                })
                .then((res) => {
                    if (res.data && res.data.code == "200") {
                        dsf.layer.toast("操作成功!")
                        this.doRefresh()
                    }
                }).catch((e) => {

                }).finally(() => {

                })
        },
        complete() {
            this.showBatch = false
            this.result = []
        },
        selectAll() {
            if (this.isCheckAll) {
                this.result = []
                this.list.forEach(item => {
                    this.result.push(item.id)
                })
            } else {
                this.result = []
            }
            this.isCheckAll = !this.isCheckAll

        },
        resultChange() {
            if (this.result.length == this.list.length) {
                this.isCheckAll = false
            } else {
                this.isCheckAll = true
            }
        }

    }
}
</script>

<style lang="scss" scoped>
.teamFile {
    width: 100%;
    height: 100%;
    background: #fff;
    box-sizing: border-box;
    overflow: hidden;
    position: relative;
    padding-top: 40px;

    &.batch {
        padding: 40px 0 60px 0;
    }

    .order {
        width: 100%;
        height: 40px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        box-sizing: border-box;
        padding: 0 14px;
        position: absolute;
        top: 0;

        p.title {
            font-size: var(--font_size_3);
        }

        p.icons {
            display: flex;
            align-items: center;

            img {
                width: 20px;
                height: 20px;
            }
        }
    }

    .head {
        width: 100%;
        height: auto;
        box-sizing: border-box;
        padding: 0 14px;
    }

    .tab-content {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 10px 0;
        height: 40px;

        .tab {
            display: flex;
            align-items: center;

            p {
                font-size: var(--font_size_3);
                color: #747577;
                font-weight: 400;
                margin-right: 15px;
                position: relative;

                &.active {
                    color: #171A1D;
                    font-weight: 600;

                    &::after {
                        content: "";
                        width: 21px;
                        height: 2px;
                        border-radius: 1px;
                        position: absolute;
                        left: 50%;
                        margin-left: -10px;
                        bottom: -4px;
                        background: #0089FE;
                    }
                }
            }
        }

        img {
            width: 15px;
            height: 15px;
        }
    }

    .share-box {
        display: flex;
        align-items: center;
        margin-top: 25px;

        p {
            font-size: var(--font_size_4);
            color: #747577;
            letter-spacing: 0;
            font-weight: 400;
        }

        img {
            width: 6px;
            height: 4px;
            margin-left: 5px;
        }
    }

    .disk-file-list {
        width: 100%;
        height: 100%;
        overflow-y: auto;
        box-sizing: border-box;
        padding: 0 14px;

        .van-pull-refresh {
            width: 100%;
        }

        /deep/ .van-checkbox {
            margin-right: 10px;
        }

        .itembox {
            width: 100%;
            display: flex;
            align-items: center;

            .van-checkbox{
                flex-shrink: 0;
            }
        }
    }

    .file-grid {
        width: 100%;
        display: flex;
        flex-wrap: wrap;

        .grid-box {
            width: 33.3%;
            display: flex;
            justify-content: center;
        }
    }

    .addBtn {
        width: 42px;
        height: 42px;
        position: absolute;
        right: 14px;
        bottom: 32px;
    }

    .batchTop {
        position: absolute;
        left: 0;
        top: 0;
        right: 0;
        height: 40px;
        box-sizing: border-box;
        padding: 0 14px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        background: #FFF;

        &>span {
            font-size: var(--font_size_4);
            color: #333;
        }

        &>p {
            &>span:nth-child(1) {
                font-size: var(--font_size_4);
                color: #333;
            }

            &>span:nth-child(2) {
                font-size: var(--font_size_4);
                color: #0065D5;
                margin-left: 15px;
            }
        }
    }

    .batchBottom {
        position: absolute;
        left: 0;
        bottom: 0;
        right: 0;
        height: 60px;
        box-sizing: border-box;
        padding: 0 14px;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;

        img {
            width: 20px;
            height: 20px;
        }

        span {
            font-size: var(--font_size_4);
            color: #333;
            margin-top: 5px;
        }
    }
}

.select-contain {
    width: 100%;
    padding: 12px 16px 20px 16px;
    box-sizing: border-box;
    position: relative;

    .checkbox {
        position: absolute;
        right: 14px;
        top: 20px;
        font-size: 13px;
        color: #0089FF;
        letter-spacing: 1px;
        text-align: center;
        font-weight: 400;
    }

    .select-box {
        width: 100%;

        span {
            font-size: 13px;
            color: #171A1D;
            letter-spacing: 1px;
            text-align: center;
            line-height: 38px;
            font-weight: 600;
            margin: 11px 0;
        }

        div {
            display: flex;
            align-items: center;
            justify-content: space-between;

            p {
                width: calc(50% - 5px);
                height: 30px;
                background: #FFFFFF;
                border: 1px solid rgba(234, 235, 237, 1);
                border-radius: 7.5px;
                font-size: 13px;
                color: #171A1D;
                text-align: center;
                font-weight: 400;
                display: flex;
                align-items: center;
                justify-content: center;

                &.active {
                    background: #E0F0FE;
                    border: 1px solid rgba(0, 137, 255, 1);
                    color: #0065D5;
                }
            }
        }
    }

    .btn {
        width: 100%;
        border-top: 1px solid rgba(224, 226, 228, 1);
        padding: 10px 0;
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-top: 14px;

        div {
            width: calc(50% - 5px);
            height: 38px;
            border-radius: 7.5px;
            background: #FFFFFF;
            border: 1px solid rgba(234, 235, 237, 1);
            font-size: 13px;
            font-weight: 400;
            color: #C7C8C9;
            display: flex;
            align-items: center;
            justify-content: center;

            &.finish {
                background: #0089FF;
                border: 1px solid rgba(0, 137, 255, 1);
                color: #FFFFFF;
            }

            &.reset {
                color: #171A1D;
            }
        }
    }
}
</style>

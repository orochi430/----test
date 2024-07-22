<template>
<div class="teamFile">
    <div class="shareTab">
        <p class="tab">
            <span :class="{'active':curTab==1}" @click="changeTab(1)">分享给我</span>
            <span :class="{'active':curTab==2}" @click="changeTab(2)">我的分享</span>
        </p>
        <p class="icons">
            <img @click="showSelect=true" src="../../assets/imgs/cloudDisk/order.png" alt="" />
        </p>
    </div>
    <commonempty v-if="list.length == 0 && !loading" description="暂无文件" />
    <!-- 列表 -->
    <div class="disk-file-list">
        <van-pull-refresh v-model="refreshing" :disabled="finished" @refresh="doRefresh">
            <van-list v-model="loading" :finished="finished" finished-text="" @load="onLoad">
                <file-item :item="item" v-for="(item,index) in list" :key="index" @doRefresh="doRefresh"></file-item>
            </van-list>
        </van-pull-refresh>
    </div>
    <add-file :listType="1" :show="addFile" @closeAddFile="closeAddFile"></add-file>
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
</div>
</template>

<script>
import FileItem from './fileItem.vue'
import FileGrid from './fileGrid.vue'
import AddFile from './addFile.vue'
export default {
    name: 'myCollect',
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
            curTab: 1,
            showShare: false,
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
            tab: 1
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
            let url = this.curTab == 1 ? "fn/cloud/file/shareList" : "fn/cloud/file/myShare"
            dsf.http
                .post(url, {
                    pageNo: this.start,
                    pageSize: this.limit,
                    orderType: this.orderType,
                    reversed: this.reversed,
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
        doRefresh() {
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
            this.doRefresh()
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
            this.doRefresh()
            this.showSelect = false;
        },
        resetSelect() {
            this.selected = 0;
            this.orderType = 2
            this.reversed = false
            this.showSelect = false;
            this.doRefresh()
        },

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

    .shareTab {
        width: 100%;
        height: 40px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        box-sizing: border-box;
        padding: 0 14px;
        position: absolute;
        top: 0;

        p.tab {
            display: flex;
            align-items: center;
            justify-content: center;
            span{
                height: 30px;
                box-sizing: border-box;
                text-align: center;
                line-height: 24px;
                font-size: var(--font_size_3);
                margin-right: 15px;
                &.active{
                    font-weight: bold;
                    border-bottom: 2PX solid #0089FE;
                }
            }
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

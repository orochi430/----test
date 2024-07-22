<template>
<div class="searchList">
    <van-search v-model="keyword" placeholder="在当前企业中搜索" @search="doRefresh" @clear="clearText" />
    <div class="his" v-if="showHis">
        <div class="recentSearch" v-if="hisList.length>0">
            <div class="rs_title">
                <span>最近搜索</span>
                <van-icon name="delete-o" @click="removeStorage" />
            </div>
            <div class="rs_list" v-if="hisList.length>0">
                <span v-for="(item,index) in hisList" :key="index" @click="doRefresh(item)">{{ item }}</span>
            </div>
        </div>
        <div class="noData" v-if="hisList.length==0">
            <img src="../../assets/imgs/cloudDisk/img_nodata.png" />
            <span>输入关键词快速搜索</span>
        </div>
    </div>
    <div class="fileList" v-if="!showHis">
        <div class="listType">
            <div class="types">
                <div class="items">
                    <label>类型：</label>
                    <p>
                        <span v-for="(item,index) in typeList" :key="'file'+index" @click="selectItem(item,index)" :class="{'active': item.isSelect}">{{ item.name }}</span>
                    </p>
                </div>
            </div>
        </div>
    </div>
    <div class="lists" v-if="!showHis">
        <commonempty v-if="list.length == 0 && !loading" description="暂无文件" />
        <van-pull-refresh v-model="refreshing" :disabled="finished" @refresh="doRefresh">
            <van-list v-model="loading" :finished="finished" finished-text="" @load="onLoad">
                <file-item @doRefresh="doRefresh" :item="item" v-for="(item,index) in list" :key="index"></file-item>
            </van-list>
        </van-pull-refresh>
    </div>
</div>
</template>

<script>
import RecentItem from './recentItem.vue'
import FileItem from './fileItem.vue'
export default {
    name: 'searchList',
    components: {
        RecentItem,
        FileItem
    },
    data() {
        return {
            keyword: "",
            hisList: [],
            list: [],
            finished: false,
            loading: false,
            refreshing: false,
            start: 1,
            limit: 15,
            typeList: [],
            range: 0,
            showSelect: false,
            showHis: true,
            nodata: false,
            fileType: ""
        };
    },
    computed: {},
    watch: {},
    methods: {
        getFileTypeList() {
            dsf.http
                .get("fn/cloud/file/getFileSuffixSelect")
                .then(({
                    status,
                    data
                }) => {
                    console.log(data.data, status)
                    if (status === 200 && data.data) {
                        data.data.forEach(item => {
                            item.isSelect = false
                        })
                        this.typeList = data.data
                    }
                }).catch(({
                    message
                }) => {

                }).finally(() => {

                });
        },
        onClickLeft() {
            this.$bus.emit("closeSearchBox")
        },
        clearText() {
            debugger
            this.keyword = ""
        },
        onSearch() {
            if (!this.keyword) {
                return
            }
            //添加搜索历史记录信息
            let text = dsf.util.loadLocalStore("searchHis")
            if (text) {
                let textList = text.split(",")
                if (!textList.includes(this.keyword)) {
                    text = this.keyword + "," + text
                    dsf.util.saveToLocalStore("searchHis", text)
                }
            } else {
                dsf.util.saveToLocalStore("searchHis", this.keyword)
            }

            //执行搜索
            this.showHis = false
            this.doRefresh()
        },
        removeStorage() {
            window.localStorage.removeItem("searchHis")
            this.hisList = []
        },
        initSearchList() {
            let text = dsf.util.loadLocalStore("searchHis")
            if (text) {
                this.hisList = text.split(",")
            }
        },
        onLoad() {

            this.$toast.loading({
                message: '加载中...',
                forbidClick: true,
                duration: 0
            })
            let that = this
            that.nodata = false
            dsf.http
                .post("fn/cloud/file/fileSearch", {
                    fileName: this.keyword,
                    fileType: this.fileType,
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
                        if (!data.data) {
                            data.data = []
                        }
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
                            that.finished = true;
                        } else {
                            that.start += 1
                        }

                    } else {
                        that.finished = true;
                        that.nodata = true
                    }
                }).catch(({
                    message
                }) => {
                    that.finished = true;
                    that.nodata = true
                }).finally(() => {
                    that.loading = false;
                    that.refreshing = false;
                    that.$toast.clear()
                });
        },
        // 下拉刷新处理函数
        doRefresh(title) {
            if (title) {
                this.keyword = title
            }
            this.start = 1
            this.list = []
            // 清空列表数据
            this.finished = false;

            // 重新加载数据
            // 将 loading 设置为 true，表示处于加载状态
            this.loading = true;
            this.showHis = false
            this.onLoad();
        },
        selectItem(item) {
            if (this.timer) {
                dsf.layer.toast('请勿重复操作！')
                window.clearInterval(this.timer)
                this.timer = null
            }

            this.timer = setTimeout(() => {
                this.$set(item, "isSelect", !item.isSelect)
                let values = []
                this.typeList.map(item => {
                    if (item.isSelect) {
                        values.push(item.value)
                    }
                })
                this.fileType = values.length > 0 ? values.join(",") : ""
                this.doRefresh()
                window.clearInterval(this.timer)
                this.timer = null
            }, 1000);
        },
        setRange(num) {
            this.range = num
        }
    },
    created() {},
    mounted() {
        this.initSearchList()
        this.getFileTypeList()
    },
    destroyed() {},
}
</script>

<style lang="scss" scoped>
.searchList {
    width: 100vw;
    height: 100vh;
    overflow: hidden;

    .noData {
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-top: 150px;

        img {
            width: 150px;
        }

        span {
            font-size: var(--font_size_4);
            color: #747577;
        }
    }

    .recentSearch {
        width: 100%;
        height: auto;
        box-sizing: border-box;
        padding: 0 14px;

        .rs_title {
            width: 100%;
            height: 40px;
            box-sizing: border-box;
            // border-bottom: 1PX solid rgba(224, 226, 228, 1);
            display: flex;
            align-items: center;
            justify-content: space-between;

            &>span {
                font-size: var(--font_size_4);
                color: #747577;
            }

            &>i {
                font-size: var(--font_size_3);
                color: #747577;
            }
        }

        .rs_list {
            width: 100%;
            box-sizing: border-box;
            display: flex;
            flex-wrap: wrap;

            span {
                height: 30px;
                box-sizing: border-box;
                padding: 0 10px;
                border-radius: 15px;
                font-size: var(--font_size_4);
                color: #333;
                border: 1PX solid rgba(224, 226, 228, 1);
                display: flex;
                align-items: center;
                justify-content: center;
                margin-right: 10px;
                margin-bottom: 10px;
            }
        }
    }

    .lists {
        height: calc(100vh - 122px);
        width: 100%;
        overflow-y: auto;
        overflow-x: hidden;
        box-sizing: border-box;
        padding: 0 14px;

        .van-search {
            padding: 10px 14px;
        }

        .van-list {
            display: flex;
            flex-direction: column;
        }

    }

}

.fileList {
    width: 100%;
    box-sizing: border-box;
    padding: 0 14px;

    .listType {
        width: 100%;
        height: 70px;
        transition: all linear .2s;
        overflow: hidden;

        .rs_title {
            width: 100%;
            height: 40px;
            box-sizing: border-box;
            border-bottom: 1PX solid rgba(224, 226, 228, 1);
            display: flex;
            align-items: center;
            justify-content: space-between;

            // &>p:nth-child(1) {
            //     display: flex;
            //     align-items: center;
            //     justify-content: space-between;

            //     &>span {
            //         font-size: var(--font_size_4);
            //         color: #747577;
            //         height: 12px;
            //         display: flex;
            //         align-items: center;
            //         justify-content: center;

            //         &:first-child {
            //             border-right: 1PX solid rgba(224, 226, 228, 1);
            //             box-sizing: border-box;
            //             padding-right: 10px;
            //         }

            //         &:last-child {
            //             box-sizing: border-box;
            //             padding-left: 10px;
            //         }
            //     }
            // }

            &>p:last-child {
                display: flex;
                align-items: center;

                span {
                    font-size: var(--font_size_4);
                    color: #747577;
                }

                .van-icon {
                    font-size: var(--font_size_4);
                    color: #747577;
                    transform: rotate(90deg);
                    margin-left: 5px;
                    transition: all linear .2s;

                    &.active {
                        transform: rotate(-90deg);
                        transition: all linear .2s;
                    }
                }
            }
        }

        .types {
            width: 100%;
            transition: all linear .2s;
            height: auto;

            &.hide {
                height: 0;
                transition: all linear .2s;
            }

            .items {
                width: 100%;
                height: 70px;
                display: flex;
                align-items: center;
                border-bottom: 1PX solid rgba(224, 226, 228, 1);

                label {
                    font-size: var(--font_size_4);
                    color: #333;
                    flex-shrink: 0;
                }

                p {
                    display: flex;
                    align-items: center;
                    flex: 1;
                    flex-wrap: wrap;

                    span {
                        font-size: var(--font_size_4);
                        color: #333;
                        height: 24px;
                        box-sizing: border-box;
                        margin-right: 10px;
                        padding: 0 10px;
                        border: 1PX solid rgba(224, 226, 228, 1);
                        border-radius: 12px;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        flex-shrink: 0;
                        margin-top: 5px;

                        &.active {
                            border: 1PX solid #0089FE;
                            color: #0089FE;
                        }
                    }
                }

            }

            .fanwei {
                width: 100%;
                height: 40px;
                display: flex;
                align-items: center;
                border-bottom: 1PX solid rgba(224, 226, 228, 1);

                label {
                    font-size: var(--font_size_4);
                    color: #333;
                }

                p {
                    border: 1PX solid rgba(224, 226, 228, 1);
                    box-sizing: border-box;
                    height: 24px;
                    border-radius: 12px;
                    position: relative;
                    display: flex;
                    align-items: center;

                    span {
                        font-size: var(--font_size_4);
                        color: #333;
                        height: 24px;
                        box-sizing: border-box;
                        padding: 0 10px;
                        position: relative;
                        display: flex;
                        align-items: center;
                        justify-content: center;

                        &.active {
                            color: #0089FE;
                            border: 1PX solid #0089FE;
                            border-radius: 12px;
                        }
                    }
                }
            }
        }
    }
}

.van-popover__arrow {
    display: none;
}
</style>

<template>
<div class="teamFile">
    <div class="order">
        <p class="title">文件列表</p>
        <p class="icons">
            <img @click="showSelect=true" src="../../assets/imgs/cloudDisk/order.png" alt="" />
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
    <!-- 宫格 -->
    <div class="file-grid" style="display:none">
        <div v-for="(item,index) in 5" :key="index" class="grid-box">
            <file-grid></file-grid>
        </div>
    </div>

    <div v-if="canUpload" class="addBtn" @click="allowAddFile = true">
        <img src="../../assets/imgs/cloudDisk/add.svg" alt="">
    </div>
    <add-file :listType="diskMenuType" :show="allowAddFile" @closeAddFile="closeAddFile"></add-file>
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
    </div>

    <van-popup v-model="moveFolder" position="bottom" :style="{ height: '100%' }" @close="closePopup">
        <div class="directory">
            <van-nav-bar title="云盘" left-text="返回" left-arrow @click-left="goBackUp"></van-nav-bar>
            <div class="direList" v-if="curFid!=''">
                <div class="dire" @click="goDire(item)" v-for="(item,index) in direList" :key="index">
                    <div class="fileIcon">
                        <fileTypeIcon :file-name="item.name" :width="32" :height="38" :isDirectory="item.isDirectory"></fileTypeIcon>
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
            <div class="direList" v-if="curFid==''">
                <div class="dire" @click="goDireTop(item)" v-for="(item,index) in topDireList" :key="index">
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
            <div class="direButton" v-if="curFid!=''">
                <van-button type="info" @click="fadeinThis">{{ actionType == "move" ? '移动到这里' : '添加到这里' }}</van-button>
            </div>
        </div>
    </van-popup>
</div>
</template>

<script>
import FileItem from './fileItem.vue'
import FileGrid from './fileGrid.vue'
import AddFile from './addFile.vue'
import fileTypeIcon from './fileTypeIcon.vue';
import {
    mapState
} from "vuex";
export default {
    name: 'teamFile',
    components: {
        FileItem,
        FileGrid,
        AddFile,
        fileTypeIcon
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
            allowAddFile: false,
            nodata: false,
            showBatch: false,
            result: [],
            isCheckAll: true,
            addFolder: false,
            folderName: "",
            direList: [],
            direFid: "", //记录链条， 用于返回上一层节点
            curFid: "",
            moveFolder: false,
            actionType: "",
            canUpload: false,
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
                            reversed: true,
                            value: 3
                        },
                        {
                            name: '从远到近',
                            orderType: 3,
                            reversed: false,
                            value: 4
                        }
                    ]
                },
                {
                    name: '创建时间',
                    term: [{
                            name: '从近到远',
                            orderType: 2,
                            reversed: true,
                            value: 5
                        },
                        {
                            name: '从远到近',
                            orderType: 2,
                            reversed: false,
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
            reversed: true,
            orderType: 2,
            reversed: true,
            topDireList: [],
            listType: ""
        }
    },
    computed: {
        ...mapState({
            diskMenuType: (state) => {
                return state.diskMenuType
            }
        }),
    },
    watch: {
        diskMenuType() {
            this.doRefresh()
        },
    },
    created() {

    },
    mounted() {
        this.checkFolderUpload()
        this.getTopDireList()
    },
    methods: {
        getIconClass(title) {

        },
        onLoad() {
            let that = this
            that.nodata = false
            dsf.http
                .post("fn/cloud/file/list", {
                    fid: 0,
                    listType: this.diskMenuType,
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
        doRefresh(title) {
            this.keyword = title
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
            this.allowAddFile = false;
            this.doRefresh()
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
        checkFolderUpload() {
            dsf.http
                .post("ctrl/cloud/privilege/checkFolderUpload", {
                    fileId: "0",
                    listType: this.diskMenuType
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
                    if (status === 200 && data.data) {
                        this.canUpload = true
                    }
                }).catch(({
                    message
                }) => {

                }).finally(() => {

                });
        },
        handleLongPress() {
            this.showBatch = true
            this.result = []
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
        },
        doRealFadeIn() {
            this.$toast.loading({
                forbidClick: true,
                message: "正在检查相关权限..."
            })
            dsf.http.post("/fn/cloud/privilege/checkBatchMenuRight", {
                    "itemType": "move",
                    "fileIdList": this.result
                }, {
                    headers: {
                        "Content-Type": "application/json"
                    }
                })
                .then((res) => {
                    if (res.data && res.data.code == "200") {
                        if (res.data.data.forbidList && res.data.data.forbidList.length > 0) {
                            let names = ""
                            this.list.forEach(item => {
                                if (res.data.data.forbidList.includes(item.id)) {
                                    if (names) {
                                        names += `[${item.name}]、`
                                    } else {
                                        names = `[${item.name}]`
                                    }
                                }
                            })
                            dsf.layer.toast("所选文件：" + names + "无权或不支持");
                        } else {
                            this.moveFolder = true
                        }
                    }
                }).catch((e) => {

                }).finally(() => {
                    this.$toast.clear()
                })
        },
        batchAdd() {
            if (this.result.length == 0) {
                dsf.layer.toast("请选择需要操作的记录！");
                return
            }
            this.curFid = ""
            this.actionType = "addTo"
            this.doRealFadeIn()
        },
        batchMove() {
            if (this.result.length == 0) {
                dsf.layer.toast("请选择需要操作的记录！");
                return
            }
            this.curFid = ""
            this.actionType = "move"
            this.doRealFadeIn()
        },
        batchDelete() {
            if (this.result.length == 0) {
                dsf.layer.toast("请选择需要操作的记录！");
                return
            }
            this.$toast.loading({
                forbidClick: true,
                message: "文件操作中..."
            })
            dsf.http.post("/fn/cloud/recyclebin/delete", {
                    fileIds: this.result.join(",")
                })
                .then((res) => {
                    this.$toast.clear()
                    if (res.data && res.data.code == "200") {
                        dsf.layer.toast("操作成功");
                        this.showBatch = false
                        this.moveFolder = false
                        this.doRefresh()
                    }else{
                        dsf.layer.toast(res.data.message);
                    }
                }).catch((e) => {
                    this.$toast.clear()
                }).finally(() => {
                    
                })

        },
        closePopup() {
            this.showItem = false
        },
        goDireTop(item) {
            this.listType = item.value
            this.curFid = "0"
            this.getDireList()
        },
        getDireList() {
            dsf.http.post("/fn/cloud/file/getDirectoryTree", {
                    fid: this.curFid || 0,
                    listType: this.listType,
                    excludeIds: this.result
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
        goBackUp() {
            if (this.curFid == "") {
                this.moveFolder = false
                this.closePopup()
                return
            }
            if (this.curFid == "0") {
                this.curFid = ""
                return
            }
            if (this.direFid == "") {
                this.curFid = "0"
            } else {
                // [11,22]  22
                if (this.curFid == this.direFid) {
                    this.curFid = "0"
                    this.direFid = ""

                } else {
                    let direArr = this.direFid.split(",")
                    this.curFid = direArr[direArr.length - 2]
                    this.direFid = direArr.slice(0, -1).join(",")
                }

            }
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
                        fileIds: this.result,
                        listType: this.listType,
                        targetId: this.curFid || 0,
                    }, {
                        headers: {
                            "Content-Type": "application/json"
                        }
                    })
                    .then((res) => {
                        if (res.data && res.data.code == "200") {
                            dsf.layer.toast("操作成功");
                            this.showBatch = false
                            this.moveFolder = false
                            this.doRefresh()
                        }
                    }).catch((e) => {

                    }).finally(() => {
                        this.$toast.clear()
                    })
            } else if (this.actionType == "addTo") {
                dsf.http.post("/fn/cloud/file/copy", {
                        fileIds: this.result,
                        listType: this.listType,
                        targetId: this.curFid || 0,
                        excludeId: this.result
                    }, {
                        headers: {
                            "Content-Type": "application/json"
                        }
                    })
                    .then((res) => {
                        if (res.data && res.data.code == "200") {
                            dsf.layer.toast("操作成功");
                            this.showBatch = false
                            this.moveFolder = false
                            // this.doRefresh()
                        }
                    }).catch((e) => {

                    }).finally(() => {
                        this.$toast.clear()
                    })
            }
        },

        getTopDireList() {
            dsf.http.post("/fn/cloud/privilege/getLeftCopyItem", {})
                .then((res) => {
                    if (res.data && res.data.code == "200") {
                        this.topDireList = res.data.data
                    }
                }).catch((e) => {

                }).finally(() => {

                })
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
    padding-top: 40px;
    position: relative;

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

            .van-checkbox {
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
        bottom: 65px;
        z-index: 2;
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
        justify-content: space-around;
        border-top: 1PX solid #ebebeb;
        background: #FFF;
        z-index: 0;

        p {
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

            &:last-child {
                span {
                    color: #e50012;
                }
            }

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
</style>

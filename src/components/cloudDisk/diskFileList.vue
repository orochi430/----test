<template>
<div class="diskFileList">
    <van-nav-bar v-if="showBack" title="" left-text="返回" left-arrow @click-left="onClickLeft"></van-nav-bar>
    <div class="title">{{ folderName }}</div>
    <van-search v-model="keyword" placeholder="在当前文件夹中搜索" left-icon="" :clearable="false" @search="doRefresh">
        <template #left-icon>
            <i class="iconfont iconsousuo i1" style="color: #989A9F;"></i>
        </template>
    </van-search>
    <div class="wrapBox">
        <div class="order" v-if="!showBatch">
            <p class="titleText">文件列表</p>
            <p class="icons">
                <img @click="showSelect=true" src="../../assets/imgs/cloudDisk/order.png" alt="" />
            </p>
        </div>
        <div class="batchTop" v-if="showBatch">
            <span>已选{{ result.length }}项</span>
            <p>
                <span @click="selectAll">{{ isCheckAll ? '全选' : '取消全选'}}</span>
                <span @click="complete">完成</span>
            </p>
        </div>
        <div class="disk-file-list">
            <van-pull-refresh v-model="refreshing" :disabled="finished" @refresh="doRefresh">
                <van-list v-model="loading" :finished="finished" finished-text="" @load="onLoad">
                    <van-checkbox-group v-if="[1,2,11,4].includes(listType)" v-model="result" @change="resultChange">
                        <div class="itembox" v-for="(item,index) in list" :key="index">
                            <van-checkbox v-if="showBatch" :name="item.id"></van-checkbox>
                            <file-item v-long-press="handleLongPress" @doRefresh="doRefresh" :item="item"></file-item>
                        </div>
                    </van-checkbox-group>
                    <template v-else>
                        <div class="itembox" v-for="(item,index) in list" :key="index">
                            <file-item @doRefresh="doRefresh" :item="item" v-for="(item,index) in list" :key="index"></file-item>
                        </div>
                    </template>
                </van-list>
            </van-pull-refresh>
        </div>
        <div v-if="canUpload&&!showBatch" class="addBtn" @click="addFile = true">
            <img src="../../assets/imgs/cloudDisk/add.svg" alt="">
        </div>

    </div>
    <add-file :listType="listType" :fid="fid" :show="addFile" @closeAddFile="closeAddFile"></add-file>

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
export default {
    name: 'diskFileList',
    components: {
        FileItem,
        FileGrid,
        AddFile,
        fileTypeIcon
    },
    data() {
        return {
            list: [],
            finished: false,
            loading: false,
            refreshing: false,
            start: 1,
            limit: 15,
            fid: "",
            keyword: "",
            addFile: false,
            listType: 1,
            folderName: "",
            canUpload: false,
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
            reversed: true,
            topDireList: [],
            batchListType: "",
            timer: null,
            showBack: dsf.config.appTopMenu && dsf.config.appTopMenu.value
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
                .post("ctrl/cloud/file/listFileByFid", {
                    fid: this.fid,
                    orderType: this.orderType,
                    reversed: this.reversed,
                    pageNo: this.start,
                    pageSize: this.limit,
                    fileNameQuery: this.keyword
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
                                item.lastUpdateTime = moment(new Date(item.lastUpdateTime)).calendar();
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
        goFileList(item) {
            if (item.isDirectory == 1) {
                this.$router.push({
                    name: "diskFileList",
                    params: {
                        fid: item.id
                    },
                    query: {
                        listType: item.fileType,
                        name: item.name
                    }
                })
            }
        },
        closeAddFile() {
            this.addFile = false;
            this.doRefresh()
        },
        getFolderDeail() {
            dsf.http.post("/fn/cloud/file/getFileById", {
                    "id": this.fid
                })
                .then((res) => {
                    if (res.data && res.data.code == "200") {
                        this.checkFolderUpload(res.data.data.fileType)
                    }
                }).catch((e) => {

                }).finally(() => {

                })
        },
        checkFolderUpload(listType) {
            dsf.http
                .post("ctrl/cloud/privilege/checkFolderUpload", {
                    fileId: this.fid,
                    listType: listType
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
            this.direFid = ""
            this.curFid = ""
            this.actionType = "addTo"
            this.doRealFadeIn()
        },
        batchMove() {
            if (this.result.length == 0) {
                dsf.layer.toast("请选择需要操作的记录！");
                return
            }
            this.direFid = ""
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

        },
        closePopup() {
            this.showItem = false
        },
        goDireTop(item) {
            this.batchListType = item.value
            this.curFid = "0"
            this.getDireList()
        },
        getDireList() {
            dsf.http.post("/fn/cloud/file/getDirectoryTree", {
                    fid: this.curFid || 0,
                    listType: this.batchListType,
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
                        listType: this.batchListType,
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
                        listType: this.batchListType,
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
    },
    created() {
        this.fid = this.$route.params.fid || ""
        this.listType = parseInt(this.$route.query.listType) || 1
        this.folderName = this.$route.query.name || ''
    },
    mounted() {
        this.getFolderDeail()
        this.getTopDireList()
    },
    destroyed() {},
}
</script>

<style lang="scss" scoped>
.diskFileList {
    width: 100%;
    height: 100vh;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    .van-search{
        flex-shrink: 0;
    }
    .wrapBox {
        width: 100%;
        // height: calc(100vh - 140px);
        position: relative;
        flex: 1;
    }

    .batchTop {
        width: 100%;
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

    .order {
        width: 100%;
        height: 40px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        box-sizing: border-box;
        padding: 0 14px;
        background: #FFF;

        p.titleText {
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

    .addBtn {
        width: 42px;
        height: 42px;
        position: absolute;
        right: 14px;
        bottom: 65px;
        z-index: 2;
    }

    .title {
        height: 40px;
        font-size: 18px;
        color: #000;
        display: flex;
        align-items: center;
        background: #FFF;
        box-sizing: border-box;
        padding: 0 14px;
        flex-shrink: 0;
    }

    .disk-file-list {
        width: 100%;
        height: calc(100% - 40px);
        background: #FFF;
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

.docbox {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    .van-nav-bar {
        flex-shrink: 0;
    }

    .dociframe {
        width: 100%;
        flex: 1;
        box-sizing: border-box;
        padding: 14px;
    }
}
</style>

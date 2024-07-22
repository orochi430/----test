<template>
<div class="purviewManage">
    <div class="file-item">
        <div class="fileIcon">
            <fileTypeIcon :width="18" :height="18" :file-name="fileObj.name" :isDirectory="fileObj.isDirectory"></fileTypeIcon>
        </div>
        <div class="fileBody">
            <p>{{ fileObj.name }}</p>
            <span>{{ fileObj.ownerName }} 创建</span>
        </div>
    </div>
    <!-- <div class="purview-title">
        <p>哪些用户可访问</p>
    </div>
    <div class="purview-item">
        <img src="../../assets/imgs/cloudDisk/file-doc.svg" alt="">
        <label>指定人可访问</label>
    </div> -->
    <div class="purview-title">
        <p>指定人及权限
            <!-- <van-icon name="question-o" color="#0089FE" /> -->
        </p>
        <div @click="showPL">
            <img src="../../assets/imgs/cloudDisk/icon-batch.png" alt="">批量授权
        </div>
    </div>
    <div class="user-list">
        <van-sticky :offset-top="dsf.util.getOffsetTop('46px')">
            <ul class="user-tab">
                <li :class="{'active': tabIndex == 0}" @click="selectCode('',0)">全部</li>
                <li :class="{'active': tabIndex == 1}" @click="selectCode('manage',1)">可管理</li>
                <li :class="{'active': tabIndex == 2}" @click="selectCode('edit',2)">可编辑</li>
                <li :class="{'active': tabIndex == 3}" @click="selectCode('view_download',3)">可查看/下载</li>
                <li :class="{'active': tabIndex == 4}" @click="selectCode('view',4)">仅可查看</li>
            </ul>
        </van-sticky>
        <div class="list-content">
            <!-- <span class="usernum">组织内1人</span> -->
            <div class="list-box">
                <div class="user-item" v-show="tabIndex == 0">
                    <img src="../../assets/imgs/joinUser.png" alt="" class="userImg">
                    <div class="item-right">
                        <div class="info-left">
                            <p>{{ ownerObj.userObjName }}</p>
                        </div>
                        <div class="info-right">
                            <label>{{ ownerObj.itemText }}</label>
                        </div>
                    </div>
                </div>
                <div class="user-item" v-for="(item,index) in otherUser" :key="index" v-show="item.show">
                    <img src="../../assets/imgs/joinUser.png" alt="" class="userImg">
                    <div class="item-right">
                        <div class="info-left">
                            <p>{{ item.userObjName }}</p>
                            <!-- <label>由 张三 添加</label> -->
                        </div>
                        <div class="info-right" @click="changePurview(item,index)">
                            <p>
                                <span>{{ item.itemText }}</span>
                                <img src="../../assets/imgs/cloudDisk/icon-select.png" alt="">
                            </p>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    </div>
    <div class="add-btn">
        <div @click="showPerson=true">添加指定人</div>
        <span>仅所有者和可管理者能够添加</span>
    </div>

    <van-popup :style="{ height: '100%' }" v-model="showPerson" :close-on-click-overlay="true" lock-scroll position="bottom">
        <control-user-list v-if="showPerson" :default-select-array="defaultSelectArray" :extra="extra" :selectType="selectType" @close="cancePerson" @getSelectUser="getSelectUser"></control-user-list>
    </van-popup>

    <van-action-sheet v-model="showSheet" :actions="privilegeItems" cancel-text="取消" close-on-click-action @select="setPurview" />

    <van-action-sheet v-model="showSheet1" :actions="privilegeItems1" cancel-text="取消" close-on-click-action @select="setPurview1" />
    <van-popup :style="{ height: '100%' }" v-model="showChange" :close-on-click-overlay="true" lock-scroll position="bottom">
        <div class="piliang">
            <div class="topbox">
                <van-nav-bar title="批量授权" left-text="返回" left-arrow @click-left="goBackUp"></van-nav-bar>
                <van-search v-model.trim="username" placeholder="输入姓名检索" left-icon="" @search="search" :clearable="false">
                    <template #left-icon>
                        <i class="iconfont iconsousuo i1" style="color: #989A9F;"></i>
                    </template>
                </van-search>
                <ul class="user-tab">
                    <li :class="{'active': tabIndex == 0}" @click="selectCode('',0)">全部</li>
                    <li :class="{'active': tabIndex == 1}" @click="selectCode('manage',1)">可管理</li>
                    <li :class="{'active': tabIndex == 2}" @click="selectCode('edit',2)">可编辑</li>
                    <li :class="{'active': tabIndex == 3}" @click="selectCode('view_download',3)">可查看/下载</li>
                    <li :class="{'active': tabIndex == 4}" @click="selectCode('view',4)">仅可查看</li>
                </ul>
            </div>
            <div class="list-box">
                <van-checkbox-group v-model="result" @change="selectChange">
                    <div class="user-item" v-for="(item,index) in otherUser" :key="index" v-show="item.show">
                        <van-checkbox :name="item.userObjId" v-if="showChange"></van-checkbox>
                        <img src="../../assets/imgs/cloudDisk/upload-img.png" alt="" class="userImg">
                        <div class="item-right">
                            <div class="info-left">
                                <p>{{ item.userObjName }}</p>
                            </div>
                            <div class="info-right" @click="changePurview(item,index)">
                                <p>
                                    <span>{{ item.itemText }}</span>
                                    <img src="../../assets/imgs/cloudDisk/icon-select.png" alt="">
                                </p>
                            </div>
                        </div>
                    </div>
                </van-checkbox-group>
            </div>
            <div class="add-btn1">
                <van-checkbox v-model="checkAll" @click="checkChange">全选</van-checkbox>
                <van-button size="small" :disabled="result.length==0" round type="info" @click="showSheet1=true">修改权限</van-button>
            </div>
        </div>
    </van-popup>
</div>
</template>

<script>
import Vue from 'vue';
import controlUserList from "@/components/commonForm/controls/controlUserList";
import {
    Sticky
} from 'vant';
Vue.use(Sticky);
import fileTypeIcon from './fileTypeIcon.vue';
export default {
    name: 'purviewManage',
    components: {
        controlUserList,
        fileTypeIcon
    },
    props: {},
    data() {
        return {
            fileid: "",
            loading: false,
            finished: false,
            showPerson: false,
            selectType: 0, //选人控件传值
            extra: {
                multiple: true,
                tabs: [{
                        action: "fn/user/select/data?types=department,person&rootObject=5&action=self_org_suborg_exclusive&async=true&hideNotSelect=1",
                        name: "本机构",
                        subTabKey: "department"
                    },
                    {
                        action: "fn/user/select/data?types=department,person&rootObject=3&action=self_org&async=true&hideNotSelect=1",
                        name: "其他机构",
                        subTabKey: "department"
                    }
                ]
            },
            defaultSelectArray: [],
            privilegeItems: [],
            privilegeItems1: [{
                "itemCode": "manage",
                "itemText": "可管理",
                "name": "可管理",
                "selected": false,
            }, {
                "itemCode": "edit",
                "itemText": "可编辑",
                "name": "可编辑",
                "selected": false,
            }, {
                "itemCode": "view_download",
                "itemText": "可查看/下载",
                "name": "可查看/下载",
                "selected": false,
            }, {
                "itemCode": "view",
                "itemText": "仅可查看",
                "name": "仅可查看",
                "selected": true,
            }],
            ownerObj: {},
            otherUser: [],
            showSheet: false,
            actions: [],
            curUser: {},
            curIndex: 0,
            tabIndex: 0,
            fileObj: {},
            result: [],
            checkAll: false,
            showChange: false,
            username: "",
            showSheet1: false,
            selCode: ""
        }
    },
    computed: {},
    watch: {},
    created() {

    },
    mounted() {
        this.fileid = this.$route.params.fileId
        this.getShareList()
        this.getFileDetail()
        this.getCurrentDept()
    },
    methods: {
        getCurrentDept() {
            dsf.http.post("fn/user/select/data?types=department,person&rootObject=5&action=self_org_suborg_exclusive&async=true&hideNotSelect=1")
                .then((res) => {
                    console.log(res)
                    if (res && res.data.code == "200" && res.data.data.departmentList && res.data.data.departmentList.length > 0) {
                        let curdeptArr = res.data.data.departmentList[0].children
                        let ids = []
                        curdeptArr.forEach(obj => {
                            ids.push(obj.id.replace("department_", ""))
                        })
                        let excludeIds = ids.join(",")
                        let action = "fn/user/select/data?types=department,person&rootObject=3&action=self_org&async=true&hideNotSelect=1&excludeIds=" + excludeIds
                        this.$set(this.extra.tabs[1], "action", action)
                        console.log(action)
                    }
                }).catch((e) => {

                }).finally(() => {

                })
        },
        getFileDetail() {
            dsf.http.post("/fn/cloud/file/getFileById", {
                    "id": this.fileid
                })
                .then((res) => {
                    if (res.data && res.data.code == "200") {
                        this.fileObj = res.data.data
                    }
                }).catch((e) => {

                }).finally(() => {

                })
        },
        cancePerson() {
            this.showPerson = !this.showPerson;
        },
        getSelectUser(selectArr) {
            let that = this
            console.log(selectArr);
            let userArr = []
            let objList = []
            selectArr.forEach(item => {
                item.id = item.id.replace("department_","")
                let index = this.otherUser.findIndex(obj => {
                    return (obj.userObjId == item.id)
                })
                if (index < 0 && item.id != that.ownerObj.userObjId) {
                    userArr.push(item)
                    objList.push({
                        "userObjId": item.id.replace("department_",""),
                        "userObjType": item.type == 5 ? 2 : 1,
                        "privilegeCode": "view"
                    })
                }
            })

            this.defaultSelectArray = userArr
            this.showPerson = false
            // this.otherUser = userArr

            dsf.http.post("/fn/cloud/privilege/grant", {
                    "fileId": this.fileid,
                    "objList": objList
                }, {
                    headers: {
                        "Content-Type": "application/json"
                    }
                })
                .then((res) => {
                    if (res.data && res.data.code == "200") {
                        dsf.layer.toast("添加成功");
                        this.getShareList()
                    }
                }).catch((e) => {

                }).finally(() => {

                })
        },
        getShareList() {
            dsf.http.post("/fn/cloud/privilege/shareList", {
                    fileId: this.fileid
                }, {
                    headers: {
                        "Content-Type": "application/json"
                    }
                })
                .then((res) => {
                    console.log(res)
                    if (res.data && res.data.code == "200") {
                        let userObjList = res.data.data.userObjList
                        let owner = userObjList[0]
                        owner.privilegeItems.forEach(item => {
                            if (item.selected) {
                                owner.itemText = item.itemText
                                owner.itemCode = item.itemCode
                            }
                        })

                        this.ownerObj = owner
                        let otherUser = userObjList.splice(1)
                        otherUser.forEach(item => {
                            item.privilegeItems.forEach(obj => {
                                obj.name = obj.itemText
                                if (obj.selected) {
                                    item.itemText = obj.itemText
                                    item.itemCode = obj.itemCode
                                    item.show = true
                                }
                            })
                        })
                        this.otherUser = otherUser
                    }
                }).catch((e) => {

                }).finally(() => {

                })
        },
        changePurview(item, index) {
            item.privilegeItems.forEach(obj => {
                obj.name = obj.itemText
                obj.disabled = obj.prohibited
                if (obj.itemCode == "delete") {
                    obj.color = '#ee0a24'
                }
            })
            this.privilegeItems = item.privilegeItems
            this.curUser = item
            this.curIndex = index
            this.showSheet = true

        },
        setPurview(action, index) {
            if (action.itemCode == "delete") {
                this.otherUser.splice(this.curIndex, 1)
                dsf.http.post("/fn/cloud/privilege/withdraw", {
                        "fileId": this.fileid,
                        "userObjId": this.curUser.userObjId,
                        "userObjType": this.curUser.userObjType || 1
                    }, {
                        headers: {
                            "Content-Type": "application/json"
                        }
                    })
                    .then((res) => {
                        if (res.data && res.data.code == "200") {
                            dsf.layer.toast("删除成功");
                        }
                    }).catch((e) => {

                    }).finally(() => {

                    })

            } else {

                dsf.http.post("/fn/cloud/privilege/grant", {
                        "fileId": this.fileid,
                        "objList": [{
                            "userObjId": this.curUser.userObjId,
                            "userObjType": this.curUser.userObjType || 1,
                            "privilegeCode": action.itemCode
                        }]
                    }, {
                        headers: {
                            "Content-Type": "application/json"
                        }
                    })
                    .then((res) => {
                        if (res.data && res.data.code == "200") {
                            dsf.layer.toast("操作成功");
                        }
                    }).catch((e) => {

                    }).finally(() => {

                    })

                this.$set(this.otherUser[this.curIndex], "itemText", action.itemText)
                this.$set(this.otherUser[this.curIndex], "itemCode", action.itemCode)
                console.log(this.otherUser)
                this.$forceUpdate()
            }

        },
        selectCode(code, index) {
            this.result = []
            this.checkAll = false
            this.selCode = code
            this.username = ""
            this.tabIndex = index
            this.otherUser.forEach(item => {
                item.show = code ? false : true
                if (code && item.itemCode == code) {
                    item.show = true
                }
            })
            this.$forceUpdate()
        },

        search() {
            if (this.username) {
                this.otherUser.forEach(item => {
                    item.show = this.selCode ? false : true
                    if (this.selCode) {
                        if (item.itemCode == this.selCode && item.userObjName.indexOf(this.username) >= 0) {
                            item.show = true
                        }
                    } else {
                        if (item.userObjName.indexOf(this.username) >= 0) {
                            item.show = true
                        } else {
                            item.show = false
                        }
                    }
                })

            } else {
                this.selectCode(this.selCode, this.tabIndex)
            }
            this.$forceUpdate()

        },
        goBackUp() {
            this.showChange = false
        },
        setPurview1(action, index) {
            this.$toast.loading({
                forbidClick: true,
                message: "批量删除中"
            })
            if (action.itemCode == "delete") {
                let objList = []
                this.otherUser.forEach(item => {
                    if (this.result.includes(item.userObjId)) {
                        arr.push({
                            "userObjId": item.userObjId,
                            "userObjType": item.userObjType || 1
                        })
                    }
                })
                dsf.http.post("/fn/privilege/withdrawBatch", {
                        "fileId": this.fileid,
                        "objList": objList,
                    }, {
                        headers: {
                            "Content-Type": "application/json"
                        }
                    })
                    .then((res) => {
                        if (res.data && res.data.code == "200") {
                            dsf.layer.toast("删除成功");
                        }
                    }).catch((e) => {

                    }).finally(() => {
                        this.result = []
                        this.checkAll = false
                        this.showSheet1 = false
                        this.showChange = false
                        this.getShareList()
                        this.$forceUpdate()
                        this.$toast.clear()
                    })
            } else {
                this.$toast.loading({
                    forbidClick: true,
                    message: "批量授权中"
                })
                let arr = []
                this.otherUser.forEach(item => {
                    if (this.result.includes(item.userObjId)) {
                        arr.push({
                            "userObjId": item.userObjId,
                            "userObjType": item.userObjType || 1,
                            "privilegeCode": action.itemCode
                        })
                    }
                })
                dsf.http.post("/fn/cloud/privilege/grant", {
                        "fileId": this.fileid,
                        "objList": arr
                    }, {
                        headers: {
                            "Content-Type": "application/json"
                        }
                    })
                    .then((res) => {
                        if (res.data && res.data.code == "200") {
                            dsf.layer.toast("操作成功");
                        }
                    }).catch((e) => {

                    }).finally(() => {
                        this.result = []
                        this.checkAll = false
                        this.showSheet1 = false
                        this.showChange = false
                        this.getShareList()
                        this.$forceUpdate()
                        this.$toast.clear()
                    })

            }
        },
        showPL() {
            this.selectCode('', 0)
            this.showChange = true
        },
        selectChange() {
            if (this.result.length == 0) {
                this.checkAll = false
            }

            // let a = this.otherUser.reduce((total, item) => {
            //     if (item.show) {
            //         return total += 1
            //     }
            // }, 0)
            // if (this.result.length == a) {
            //     this.checkAll = true
            // } else {
            //     this.checkAll = false
            // }
        },
        checkChange() {
            this.result = []
            if (this.checkAll) {
                this.otherUser.forEach(item => {
                    if (item.show) {
                        this.result.push(item.userObjId)
                    }
                })
            }

            this.$forceUpdate()
        }
    }
}
</script>

<style lang="scss" scoped>
.purviewManage {
    width: 100%;
    height: calc(100vh - 46px);
    background: #FFFFFF;
    position: relative;
    overflow-y: auto;

    .file-item {
        width: 100%;
        height: 60px;
        background: #FFFFFF;
        display: flex;
        align-items: center;
        padding: 0 14px;
        box-sizing: border-box;

        .fileIcon {
            width: 18px;
            height: 18px;
            margin-right: 10px;

            img {
                width: 100%;
                height: 100%;
            }
        }

        .fileBody {
            p {
                font-size: 15px;
                color: #171A1D;
                font-weight: 600;
            }

            span {
                font-size: 10px;
                color: #A2A3A4;
                font-weight: 400;
            }
        }
    }

    .purview-title {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 15px 14px 10px 14px;
        background: #f2f2f2;

        p {
            font-size: 13px;
            color: #747577;
            letter-spacing: 1px;
            font-weight: 400;
        }

        div {
            font-size: 13px;
            color: #0089FE;
            letter-spacing: 1px;
            font-weight: 400;
            display: flex;
            align-items: center;

            img {
                width: 14px;
                height: 14px;
                margin-right: 3px;
            }
        }
    }

    .purview-item {
        width: 100%;
        height: 50px;
        background: #FFFFFF;
        display: flex;
        align-items: center;
        padding: 0 14px;
        box-sizing: border-box;

        img {
            width: 30px;
            height: 30px;
            margin-right: 10px;
            border-radius: 5px;
        }

        label {
            font-size: var(--font_size_2);
            color: #171A1D;
            text-align: center;
            font-weight: 600;
        }
    }

    .van-sticky--fixed {
        .user-tab {
            width: 100%;
            background: #FFF;
            box-sizing: border-box;
            padding: 0 14px;
        }
    }

    .user-list {
        width: 100%;
        background: #FFFFFF;
        padding: 14px 14px 100px 14px;
        box-sizing: border-box;
        height: auto;

        ul {
            width: 100%;
            display: flex;
            align-items: center;
            box-sizing: border-box;

            li {
                height: 24px;
                background: #F2F1F6;
                display: flex;
                align-items: center;
                justify-content: center;
                padding: 0 8px;
                font-size: 11px;
                color: #747577;
                font-weight: 400;
                margin-right: 10px;
                border-radius: 12px;

                &:last-child {
                    margin-right: none;
                }

                &.active {
                    background: #E2EFFF;
                    color: #0089FE;
                }
            }
        }

        .list-content {
            width: 100%;
            height: calc(100% - 24px);
            overflow-y: auto;

            span.usernum {
                font-size: var(--font_size_3);
                color: #747577;
                letter-spacing: 1px;
                font-weight: 400;
                margin: 15px 0;
                display: inline-block;
            }

            .list-box {

                .user-item {
                    width: 100%;
                    height: 60px;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;

                    .van-checkbox {
                        margin-right: 10px;
                    }

                    .userImg {
                        width: 30px;
                        height: 30px;
                        border-radius: 10px;
                        margin-right: 15px;
                    }

                    .item-right {
                        height: 100%;
                        flex: 1;
                        display: flex;
                        align-items: center;
                        justify-content: space-between;
                        border-bottom: 1px solid rgba(224, 226, 228, 1);

                        .info-left {
                            display: flex;
                            flex-direction: column;
                            // align-items: center;

                            p {
                                font-size: var(--font_size_2);
                                color: #171A1D;
                                text-align: center;
                                font-weight: 600;
                                display: flex;
                                align-items: center;

                                span {
                                    height: 16px;
                                    border: 1px solid #0089FE;
                                    border-radius: 10px;
                                    color: #0089FE;
                                    font-size: 10px;
                                    display: flex;
                                    align-items: center;
                                    justify-content: center;
                                    margin-left: 15px;
                                    padding: 2px 8px;
                                    font-weight: 400;
                                }
                            }

                            label {
                                font-size: var(--font_size_4);
                                color: #747577;
                                letter-spacing: 1px;
                                font-weight: 400;
                                margin-top: 5px;
                            }
                        }

                        .info-right {
                            label {
                                font-size: var(--font_size_3);
                                color: #747577;
                                letter-spacing: 1px;
                                font-weight: 500;
                            }

                            p {
                                font-size: var(--font_size_3);
                                color: #171A1D;
                                letter-spacing: 1px;
                                font-weight: 500;
                                display: flex;
                                align-items: center;

                                img {
                                    width: 8px;
                                    height: 6px;
                                    margin-left: 5px;
                                }
                            }
                        }
                    }
                }
            }
        }
    }

    .add-btn {
        width: 100%;
        background: #FFFFFF;
        position: fixed;
        bottom: 0;
        padding: 14px;
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;

        div {
            width: 100%;
            height: 45px;
            border-radius: 10px;
            background: #0089FE;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: var(--font_size_2);
            color: #FFFFFF;
            margin-bottom: 10px;
        }

        span {
            font-size: var(--font_size_4);
            color: #A2A3A4;
            font-weight: 400;
        }
    }
}

.van-action-sheet__item {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
}

.piliang {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    .topbox {
        width: 100%;
        height: auto;
        overflow: hidden;
        flex-shrink: 0;
    }

    .add-btn1 {
        width: 100%;
        height: 60px;
        box-sizing: border-box;
        padding: 0 14px;
        flex-shrink: 0;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    .user-tab {
        width: 100%;
        flex-shrink: 0;
        background: #FFF;
        box-sizing: border-box;
        height: 32px;
        display: flex;
        align-items: center;
        box-sizing: border-box;
        padding: 0 14px;

        li {
            height: 24px;
            background: #F2F1F6;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 0 8px;
            font-size: 11px;
            color: #747577;
            font-weight: 400;
            margin-right: 10px;
            border-radius: 12px;

            &:last-child {
                margin-right: none;
            }

            &.active {
                background: #E2EFFF;
                color: #0089FE;
            }
        }
    }

    .list-box {
        width: 100%;
        flex: 1;
        overflow-y: auto;
        box-sizing: border-box;
        padding: 0 14px;

        .user-item {
            width: 100%;
            height: 60px;
            display: flex;
            align-items: center;
            justify-content: space-between;

            .van-checkbox {
                margin-right: 10px;
            }

            .userImg {
                width: 30px;
                height: 30px;
                border-radius: 10px;
                margin-right: 15px;
            }

            .item-right {
                height: 100%;
                flex: 1;
                display: flex;
                align-items: center;
                justify-content: space-between;
                border-bottom: 1px solid rgba(224, 226, 228, 1);

                .info-left {
                    display: flex;
                    flex-direction: column;
                    // align-items: center;

                    p {
                        font-size: var(--font_size_2);
                        color: #171A1D;
                        text-align: center;
                        font-weight: 600;
                        display: flex;
                        align-items: center;

                        span {
                            height: 16px;
                            border: 1px solid #0089FE;
                            border-radius: 10px;
                            color: #0089FE;
                            font-size: 10px;
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            margin-left: 15px;
                            padding: 2px 8px;
                            font-weight: 400;
                        }
                    }

                    label {
                        font-size: var(--font_size_4);
                        color: #747577;
                        letter-spacing: 1px;
                        font-weight: 400;
                        margin-top: 5px;
                    }
                }

                .info-right {
                    label {
                        font-size: var(--font_size_3);
                        color: #747577;
                        letter-spacing: 1px;
                        font-weight: 500;
                    }

                    p {
                        font-size: var(--font_size_3);
                        color: #171A1D;
                        letter-spacing: 1px;
                        font-weight: 500;
                        display: flex;
                        align-items: center;

                        img {
                            width: 8px;
                            height: 6px;
                            margin-left: 5px;
                        }
                    }
                }
            }
        }
    }
}
</style>

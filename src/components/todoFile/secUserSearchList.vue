<template>
    <div id="searchUserList">
        <form action="/">
            <van-search ref="inputVal" v-model="searchValue" show-action autofocus shape="round" placeholder="搜索"
                @search="onSearch" @cancel="onCancel" />
        </form>
        <div style="width: 100%; height: 100%" class="dsf-tree" v-if="getUserBySearchValue.length > 0">
            <div v-for="(cell, inx) in getUserBySearchValue" :key="'index' + inx">
                <div :style="{ 'padding-left': '30px' }" class="person">
                    <div class="flex-box person_child">
                        <van-checkbox icon-size="16px" class="child_check" v-model="cell.checked" @click="userClick(cell)">
                            <div class="user-logo">
                                <i class="icon iconfont icontouxiang"></i>
                            </div>
                            <div class="user-name">{{ cell.showName || cell.name }}</div>
                            &nbsp;&nbsp;
                            <div class="user-dept">{{ cell.DeptName }}</div>
                        </van-checkbox>
                    </div>
                </div>
            </div>
        </div>
        <commonempty v-if="getUserBySearchValue.length == 0 && searchValue.length > 0" description="暂无人员" />
        <van-tabbar>
            <van-tabbar-item class="_btns">
                <van-button type="default" @click="onCancel">取消</van-button>
                <van-button type="info" @click="onBtnOk">确定</van-button>
            </van-tabbar-item>
        </van-tabbar>
    </div>
</template>

<script>
export default {
    name: "searchUserList",
    props: ["personSelectData", "selectper", "lineNodeData", "response", "checkData"],
    data() {
        return {
            searchValue: "",
            isHidden: false,
            selectIds: [],
            selectItems: [],
            getUserBySearchValue: [],
            userdata: [],
            timer: null
        };
    },
    created() {
        this.isHidden = undefined;
        this.userdata = JSON.parse(JSON.stringify(this.personSelectData))
    },
    mounted() {
        // console.log(window.GLOBAL.personAddList, this.checkData);
        this.$nextTick(() => {
            let input = this.$refs["inputVal"].querySelector("input");
            input.focus();
        });
        this.selectItems = this.selectper
    },
    methods: {
        getPerson(data, val) {
            let self = this;
            if (data.children && data.children.length > 0) {
                data.children.forEach(item => {
                    if (item.UserName && item.UserName.indexOf(val) > -1) {
                        self.getUserBySearchValue.push(item);
                    }
                    self.getPerson(item, val);
                });
            }
        },
        getUserAsync(val) {
            this.getUserBySearchValue = [];
            let obj = {
                sendRequestID: this.response.SendRequestID,
                queryName: val, //检索条件
                lineIDs: this.lineNodeData.LineID,
                RangeOtherUser: "0",
                ExpandLevel: -1,
                ruleList: JSON.stringify([{
                    "nodeId": this.lineNodeData.RangeRule?.RuleList?.Rule?.NodeID,
                    "level": this.lineNodeData.RangeRule?.RuleList?.Rule?.Level,
                    "deptId": "",
                    "isDeep": "",
                    "isSelected": "0",
                    "rangeType": this.lineNodeData.RangeRule?.RuleList?.Rule?.RangeType,
                    "isUser": "1"
                }]),
            };
            dsf.http
                .post("/fn/mobileFlow/getFlowNodeUserByNode", obj)
                .then(({
                    data
                }) => {
                    console.log(data)
                    if (data.data && data.data.length > 0) {
                        let SendRangeTree = data.data[0].SendRangeTree
                        let allUsers = []
                        if (Array.isArray(SendRangeTree.Node)) {
                            allUsers = SendRangeTree.Node
                        } else {
                            allUsers = [SendRangeTree.Node]
                        }
                        this.getUserBySearchValue = this.openDataFilterUser(allUsers)
                        this.getUserBySearchValue.forEach(item => {
                            item.sId = item.id
                            item.showName = item.name
                            item["attrs"] = {
                                idValue: dsf.util.loadSessionStore("user").user_id
                            }
                            item.checked = false
                            if (this.checkData.some(user => (user.id == item.id && user.DeptID == item.DeptID)) || window.GLOBAL.personAddList.some(user => (user.id == item.id && user.DeptID == item.DeptID))) {
                                this.selectItems.push(item);
                                item.checked = true
                            }
                        })
                    }
                });

        },
        openDataFilterUser(userArr) {
            let users = []
            userArr.forEach(item => {
                if (item.UserID) {
                    users.push(item)
                }
                if (item.Node) {
                    if (!Array.isArray(item.Node)) {
                        item.Node = [item.Node]
                    }
                    users = users.concat(this.openDataFilterUser(item.Node))
                }
            })
            return users
        },
        onSearch(val) {
            let self = this;
            if (dsf.config.commonForm.isSelectProcessAsync) { //添加异步选人方法  @zgh 20240125
                self.getUserAsync(val)
            } else {
                self.getUserBySearchValue = [];
                self.userdata.forEach(item => {
                    self.getPerson(item, val);
                });
            }
        },
        onBtnOk() {
            this.addPerson();
            this.$emit("searchClose");
        },
        onCancel() {
            this.getUserBySearchValue = [];
            this.$emit("searchClose");
        },
        userClick(user) {
            const self = this;
            if (window.GLOBAL.personMultiple) {
                if (user.checked) {
                    window.GLOBAL.personAddList.push(user);
                    self.selectItems.push(user);
                } else {
                    window.GLOBAL.personAddList.forEach((del, inx) => {
                        if (del.id == user.id && del.DeptID == user.DeptID) {
                            window.GLOBAL.personAddList.splice(inx, 1);
                        }
                    });
                    self.selectItems.forEach((toy, inx) => {
                        if (user.UserID == toy.UserID) {
                            self.selectItems.splice(inx, 1);
                        }
                    });
                }
            } else {
                self.selectItems = [];
                this.$emit("callgroup");
                if (user.checked) {
                    window.GLOBAL.personAddList.forEach((toy) => {
                        self.$set(toy, "checked", false);
                    });
                    window.GLOBAL.personAddList = [];
                    window.GLOBAL.personAddList.push(user);
                    self.selectItems.push(user);
                    self.getUserBySearchValue.forEach(toy => {
                        if (user.UserID != toy.UserID) {
                            self.$set(toy, "checked", false);
                        }
                    });
                } else {
                    window.GLOBAL.personAddList.forEach((toy, inx) => {
                        self.$set(toy, "checked", false);
                        if (toy.id == user.id && toy.DeptID == user.DeptID) {
                            window.GLOBAL.personAddList.splice(inx, 1);
                        }
                    });
                }
            }
            if (!user.checked) {
                this.cutData(user);
            }

            console.log(self.selectItems)
            this.$forceUpdate()
        },
        callgroup() {
            this.$emit("callgroup");
        },
        cutData(user) {
            this.$emit("cutData", user);
        },
        cutPutyData(user) {
            this.$emit("cutPutyData", user);
        },
        addPerson() {
            const self = this;
            //去重
            let dataArr = self.selectItems.filter(item => item.checked);
            let hash = {};
            const data2 = dataArr.reduce((preVal, curVal) => {
                hash[curVal.id] ? "" : (hash[curVal.id] = true && preVal.push(curVal));
                return preVal;
            }, []);
            data2.forEach(idx => {
                if (idx.id && idx.id.split("_").length > 1 && idx.id.split("_")[1]) {
                    idx.id = idx.id.split("_")[1]
                    idx.pid = idx.pid.split("_")[1]
                    if (idx.children && idx.children.length > 0) {
                        idx.children.forEach(inx => {
                            inx.id = inx.id.split("_").length > 1 ? inx.id.split("_")[1] : inx.id.split("_")[0]
                            inx.pid = inx.pid.split("_").length > 1 ? inx.pid.split("_")[1] : inx.pid.split("_")[1]
                        })
                    }
                }
            })
            window.GLOBAL.personAddList = data2;

            this.$emit('select', data2);
            this.$emit('addPerson');
            this.$forceUpdate()
        }
    },
    watch: {
        searchValue(newVal) { //控制搜索间隔，只等他输完了之后再查询 @zgh 20240126
            let that = this
            clearTimeout(this.timer);
            this.timer = setTimeout(function () {
                if (newVal) that.onSearch(newVal);
                else that.getUserBySearchValue = [];
            }, 500);

        }
    },
};
</script>

<style lang="scss" scoped>
@import "../../assets/styles/themes.scss";
@import "../../assets/styles/mixin.scss";

.dsf-tree {
    @include font_4(true);
}

.r_line {
    width: 1px;
    background: #dddddd;
    display: inline-block;
    float: right;
    height: 22px;
    margin-top: 2px;
}

.isShowChiled {
    flex: 1;
    text-align: right;
    overflow: hidden;
}

.isShowChiled .r_span {
    @include font-theme("normal");
    float: right;
    margin: 0px 6px 0px 15px;
}

.isShowChiled i {
    float: right;
    margin-top: 4px;
}

.child_check {
    margin-right: 10px;
}

::v-deep .child_check .van-checkbox__label {
    display: flex;
}

.tree_tit {
    margin-left: 5px;
    font-size: var(--font_size_2);
    color: #000;
    font-family: PingFangSC-Regular;
    flex: 3;
}

.tree_tit span {
    font-family: PingFangSC-Regular;
    font-size: var(--font_size_2);
    color: #a2a2a2;
    margin-left: 10px;
}

.tree_line {
    border-bottom: 1px solid #dddddd;
}

.flex-box {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    height: 44px;
}

.open-status {
    // background-image: url("../../assets/imgs/workflow/icon_institution_down.png");
    background-image: url("../../assets/imgs/chooseUser/wbj-close.png");
    background-size: cover;
}

.close-status {
    // background-image: url("../../assets/imgs/workflow/icon_institution_right.png");
    background-image: url("../../assets/imgs/chooseUser/wbj-open.png");
    background-size: cover;
}

.nocheck-status {
    background-image: url("../../assets/imgs/workflow/check_no.png");
    background-size: cover;
}

.checked-status {
    background-image: url("../../assets/imgs/workflow/check_yes.png");
    background-size: cover;
}

.icon-nocheck-status {
    background-image: url("../../assets/imgs/workflow/icon_nocheck_ah.png");
    background-size: cover;
}

.icon-checked-status {
    background-image: url("../../assets/imgs/workflow/icon_check_ah.png");
    background-size: cover;
}

.person {
    height: 40px;
    line-height: 24px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #ddd;
}

.person_child {
    height: 40px;
}

.user-logo {
    margin-top: 1px;
    width: 22px;
    height: 22px;
    margin-right: 8px;
}

.user-name {
    margin-top: 1px;
}

.user-logo i {
    @include font-theme("normal");
    font-size: var(--font_size_0);
}

.user-dept {
    margin-top: 1px;
    color: #a5a7aa;
    font-size: var(--font_size_4);
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    display: flex;
    align-items: center;
}

.dept-icon {
    width: 22px;
    height: 22px;
    background-image: url("../../assets/imgs/workflow/icon_institution_level_one.png");
    background-size: cover;
    margin-right: 5px;
}

._c {
    @include font-theme("normal");
    @include font_3();
}
</style>

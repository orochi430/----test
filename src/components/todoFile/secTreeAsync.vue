<template>
<!-- 自己封装出来一个配合postMessage的组件 2019-12-30 =。=   -->
<div style="width: 100%; height: 100%" class="dsf-tree">
    <div v-for="(item, index) in personSelectData" :key="'index1' + index" style="overflow-y: hidden">
        <div class="flex-box" :class="{ treeMargin: !deep,tree_line: item.isopen&&!deep}">
            <!-- 父级是否可选 -->
            <!--<div  @click="userClick(item)" :style="{'width':'16px','height':'16px','margin-right':'10px'}" :class="{'open-status':item.isopen,'close-status':!item.isopen}"></div>-->
            <van-checkbox icon-size="18px" v-if="!item.attrs.noselect" v-model="item.checked" ref="check" @click="userClick(item)" :shape="`${multiple?'square':'round'}`"></van-checkbox>
            <img class="van-image" v-if="
            !item.attrs.noselect &&
            dsf.config.commonForm &&
            dsf.config.commonForm.isshowPhoto
          " :src="getFavicon(item)" alt :onerror="default_img" />
            <div class="tree_tit" @click="checkAll(item, 'check')">
                <span>{{ item.showName }}</span>
            </div>
            <div class="isShowChiled" v-if="item.Type != '1'&&item.Type != '2'" @click.stop="checkAll(item)">
                <van-icon v-if="item.isopen" name="arrow-up" />
                <van-icon v-else name="arrow-down" />
                <span class="r_span">{{ item.isopen ? "收起" : "展开" }}</span>
            </div>
        </div>
        <div v-for="(cell, inx) in item.children" :key="'index2' + inx" class="child" :style="{ display: item.isopen ? 'block' : 'none' }">
            <div v-if="cell.type == 1" :style="{ 'padding-left': '30px' }" class="person" @click="userClick(cell)">
                <div class="flex-box person_child">
                    <van-checkbox icon-size="16px" class="child_check" v-model="cell.checked">
                        <div class="user-logo">
                            <i class="icon iconfont iconyonghu"></i>
                        </div>
                        <div class="username">{{ cell.showName }}</div>
                    </van-checkbox>
                </div>
            </div>
            <div v-else :style="getStyle(item.deep)">
                <add-tree :personSelectData="[cell]" :checkData="checkData" :multiple="multiple" :deep="true" @select="selectAll" @callgroup="callgroup" @cutData="cutData" @cutPutyData="cutPutyData"></add-tree>
            </div>
        </div>
    </div>
</div>
</template>

<script>
//import req from "@/api/api";
export default {
    name: "addTree",
    props: ["personSelectData", "type", "checkData", "multiple", "deep"],
    data: function () {
        return {
            default_img: 'this.src="' + require("../../assets/imgs/defaultUser.png") + '"',
        };
    },
    created() {
        this.$set(
            this.personSelectData[0],
            "isopen",
            !this.personSelectData[0].state
        );
        // if (this.personSelectData) {
        //   this.personSelectData[0].isopen=true;
        // }
        //当存在默认选中值时，先加载;
        window.GLOBAL.ParentNode = [];
        if (!window.GLOBAL.personAddList) window.GLOBAL.personAddList = [];
        if (
            this.personSelectData[0].checked == true &&
            (this.personSelectData[0].Type == 1 || this.personSelectData[0].Type == 2)
        ) {
            window.GLOBAL.personAddList instanceof Array ?
                window.GLOBAL.personAddList.push(this.personSelectData[0]) :
                (window.GLOBAL.personAddList = this.personSelectData);
        }
    },
    mounted() {
        // console.log(this.checkData);
    },
    watch: {
        checkData: {
            handler(val) {
                // console.log(val);
            },
            deep: true,
            immediate: true,
        },
    },
    methods: {
        async checkAll(item, ischeckAll) {
            console.log(item);
            let self = this;
            if (!ischeckAll) {
                let isopen = item.isopen;
                self.$delete(item, "isopen");
                self.$set(item, "isopen", !isopen);
                if (item.children.length == 0 && item.isopen) {
                    let firstRule = item.lineAllData.RangeRule.RuleList.Rule;
                    if (Array.isArray(firstRule)) {
                        firstRule = firstRule[0];
                    }
                    let obj = {
                        sendRequestID: item.lineAllData.SendRequestID,
                        lineIDs: item.lineAllData.LineID,
                        RangeOtherUser: item.lineAllData.RangeOtherUser,
                        ExpandLevel: -1,
                        ruleList: JSON.stringify([{
                            nodeId: item.lineAllData.NodeID,
                            level: 2,
                            deptId: item.DeptID,
                            roleId: firstRule.RoleID,
                            isDeep: "1",
                            isSelected: firstRule.IsSelected || "0",
                            rangeType: firstRule.RangeType,
                            isUser: item.lineAllData.RangeRule.IsUser || "0",
                        }, ]),
                    };
                    await dsf.http
                        .post("/fn/mobileFlow/getFlowNodeUserByNode", obj)
                        .then(function (result) {
                            if (result.status == "200") {
                                if (
                                    result.data.data[0].SendRangeTree &&
                                    result.data.data[0].SendRangeTree.Node &&
                                    result.data.data[0].SendRangeTree.Node.Node
                                ) {
                                    let NodeData = result.data.data[0].SendRangeTree.Node.Node;
                                    if (!Array.isArray(NodeData)) {
                                        NodeData = [NodeData];
                                    }
                                    NodeData.forEach((ele) => {
                                        ele.children = [];
                                        ele.checked = self.checkData.some((it) => {
                                            return it.UserID == ele.UserID;
                                        });
                                        ele.showName = ele.name;
                                        ele.attrs = ele.UserName ?
                                            {
                                                noselect: false
                                            } :
                                            {
                                                noselect: true
                                            };
                                        if (!ele.UserName) {
                                            //如果为部门数据
                                            ele.isopen = false;
                                            // 将节点数据line传到下级部门
                                            ele.lineAllData = {
                                                SendRequestID: item.lineAllData.SendRequestID,
                                                LineID: item.lineAllData.LineID,
                                                NodeID: item.lineAllData.NodeID,
                                                RangeOtherUser: item.lineAllData.RangeOtherUser,
                                                RangeRule: item.lineAllData.RangeRule,
                                            };
                                        }
                                    });
                                    self.$delete(item, "children");
                                    self.$set(item, "children", NodeData);
                                } else {
                                    dsf.layer.toast("该部门暂无人员！");
                                }
                            }
                        });
                }
            } else {
                // 点击文字时不收起展开，可多选时则全选下级
                if (window.GLOBAL.personMultiple) {
                    this.$set(item, "checked", !item.checked);
                    console.log("dianji");
                    this.userClick(item);
                    if (!item.checked) {
                        this.$emit("cutPutyData", item);
                    }
                }
            }

            return;
            if (!ischeckAll) {
                this.$set(item, "isopen", !item.isopen);
            } else {
                // 点击文字时不收起展开，可多选时则全选下级
                if (window.GLOBAL.personMultiple) {
                    this.$set(item, "checked", !item.checked);
                    this.userClick(item);
                }
            }
            if (item.isopen) {
                window.GLOBAL.ParentNode.push(item);
            } else {
                window.GLOBAL.ParentNode.forEach((del, inx) => {
                    if (del.showName == item.showName) {
                        window.GLOBAL.ParentNode.splice(inx, 1);
                    }
                });
            }
        },
        // checkAll(item, ischeckAll) {
        //   if (item.children && item.children.length > 0) {
        //     if (!ischeckAll) {
        //       this.$set(item, "isopen", !item.isopen);
        //     } else {
        //       // 点击文字时不收起展开，可多选时则全选下级
        //       if (window.GLOBAL.personMultiple) {
        //         this.$set(item, "checked", !item.checked);
        //         this.userClick(item);
        //       }
        //     }
        //     if (item.isopen) {
        //       window.GLOBAL.ParentNode.push(item);
        //     } else {
        //       window.GLOBAL.ParentNode.forEach((del, inx) => {
        //         if (del.showName == item.showName) {
        //           window.GLOBAL.ParentNode.splice(inx, 1);
        //         }
        //       });
        //     }
        //   } else {
        //     if (item.checked) {
        //       this.$delete(item, "checked");
        //       this.$set(item, "checked", false);
        //     } else {
        //       this.$delete(item, "checked");
        //       this.$set(item, "checked", true);
        //     }
        //     this.userClick(item);
        //   }
        // },
        //获取选择的人
        selectAll(data) {
            this.$emit("select", data);
        },
        getStyle(deep) {
            return {
                "padding-left": 30 + "px",
                "box-sizing": "border-box",
            };
        },
        mapTree(data, state) {
            data.children.forEach((item) => {
                item.checked = state;
                if (item.checked) {
                    window.GLOBAL.personAddList.push(item);
                } else {
                    window.GLOBAL.personAddList.forEach((del, inx) => {
                        if (del.showName == item.showName) {
                            window.GLOBAL.personAddList.splice(inx, 1);
                        }
                    });
                }
                if (item.children && item.children.length > 0) {
                    this.mapTree(item, state);
                }
            });
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
        userClick(user) {
            console.log("userClick", user);
            const self = this;
            if (window.GLOBAL.personMultiple) {
                if (user.checked) {
                    window.GLOBAL.personAddList.push(user);
                    if (user.children && user.children.length > 0) {
                        //选中父级
                        window.GLOBAL.ParentNode.push(user);
                        this.mapTree(user, user.checked);
                    }
                } else {
                    if (user.children && user.children.length > 0) {
                        //取消选中父级
                        window.GLOBAL.ParentNode.forEach((del, inx) => {
                            if (del.id == user.id && del.DeptID == user.DeptID) {
                                window.GLOBAL.ParentNode.splice(inx, 1);
                            }
                        });
                        this.mapTree(user, user.checked);
                    }
                    window.GLOBAL.personAddList.forEach((del, inx) => {
                        if (del.id == user.id && del.DeptID == user.DeptID) {
                            window.GLOBAL.personAddList.splice(inx, 1);
                        }
                    });
                }
            } else {
                this.$emit("callgroup");
                if (user.checked) {
                    //该段代码多余注释
                    window.GLOBAL.personAddList.forEach((toy) => {
                        self.$set(toy, "checked", false);
                    });
                    window.GLOBAL.personAddList = [];
                    window.GLOBAL.personAddList.push(user);
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
            //去重
            let dataArr = window.GLOBAL.personAddList;
            let hash = {};
            const data2 = dataArr.reduce((preVal, curVal) => {
                if (curVal.Type == "2") {
                    hash[curVal.id + curVal.DeptID + curVal.RoleID] ?
                        "" :
                        (hash[curVal.id + curVal.DeptID + curVal.RoleID] =
                            true && preVal.push(curVal));
                } else {
                    hash[curVal.id + curVal.DeptID] ?
                        "" :
                        (hash[curVal.id + curVal.DeptID] = true && preVal.push(curVal));
                }
                return preVal;
            }, []);
            data2.forEach((idx) => {
                if (idx.id && idx.id.split("_").length > 1 && idx.id.split("_")[1]) {
                    idx.id = idx.id.split("_")[1];
                    idx.pid = idx.pid.split("_")[1];
                    if (idx.children && idx.children.length > 0) {
                        idx.children.forEach((inx) => {
                            inx.id =
                                inx.id.split("_").length > 1 ?
                                inx.id.split("_")[1] :
                                inx.id.split("_")[0];
                            inx.pid =
                                inx.pid.split("_").length > 1 ?
                                inx.pid.split("_")[1] :
                                inx.pid.split("_")[1];
                        });
                    }
                }
            });
            window.GLOBAL.personAddList = data2;
            //如果父节点下的所有子元素都未选中，就取消父节点的选中状态
            window.GLOBAL.ParentNode.forEach((par) => {
                let isParentNodeCheckedFalse = par.children.find(
                    (child) => child.checked == true
                );
                let isParentNodeCheckedTrue = par.children.find(
                    (child) => child.checked == false
                );
                if (isParentNodeCheckedFalse == undefined) {
                    this.$delete(par, "checked");
                    this.$set(par, "checked", false);
                }
                if (isParentNodeCheckedTrue == undefined) {
                    this.$delete(par, "checked");
                    this.$set(par, "checked", true);
                }
            });
            this.$emit("select", data2);
            console.log("data2", data2);
            this.$forceUpdate();
        },
        singleChoice(data) {
            this.handle(this.personSelectData);
        },
        handle(data) {
            data.forEach((ele) => {
                ele.checked = false;
                if (ele.children) {
                    this.handle(ele.children);
                }
            });
        },
        getFavicon(user) {
            if (user.Photo) {
                return dsf.url.getWebPath(`/fn/mobilePhoto/download?id=${user.id}&time=${new Date().getTime()}`);
            } else {
                return require("../../assets/imgs/defaultUser.png")
            }
        },
    },
};
</script>

<style lang="scss" scoped>
@import "../../assets/styles/themes.scss";
@import "../../assets/styles/mixin.scss";

.dsf-tree {
    @include font_4(true);
}

.tree_line .van-icon,
.person .van-icon {
    line-height: unset !important;
}

.flex-box .van-icon {
    line-height: unset;
}

.isShowChiled {
    width: 70px;
    height: 100%;
    text-align: right;
    display: flex;
    flex-direction: row-reverse;
    justify-content: space-between;
    align-items: center;
    line-height: 43px;
}

.isShowChiled .r_span {
    @include font-theme("normal");
    line-height: 43px;
    margin: 0px 6px 0px 15px;
}

.isShowChiled i {
    @include font-theme("normal");
}

.child_check {
    margin-right: 10px;
}

::v-deep .child_check .van-checkbox__label {
    display: flex;
}

.van-checkbox {
    margin-right: 10px;
}

.van-image {
    width: 25px;
    height: 25px;
    border-radius: 50%;
}

.tree_tit {
    // margin-left: 5px;
    font-size: var(--font_size_2);
    color: #000;
    font-family: PingFangSC-Regular;
    flex: 1;
    min-width: 0;
}

.tree_tit :first-child {
    padding-right: 10px;
    width: 100%;
    height: 100%;
    display: inline-block;
    overflow: hidden;
    color: #000;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.tree_tit .tit_width {
    max-width: 244px;
}

.tree_tit span {
    font-family: PingFangSC-Regular;
    font-size: var(--font_size_2);
    color: #a2a2a2;
    margin-left: 5px;
}

.tree_line {
    position: relative;

}

.tree_line::before {
    content: '';
    position: absolute;
    bottom: 0;
    left: 15px;
    right: 15px;
    height: 1;
    border-bottom: 1px solid #eee;
}

.treeMargin {
    margin-top: 10px;

}

.flex-box {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding: 0 15px;
    min-height: 52px;
    background: #fff;
}

.child {
    background: #fff;
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
    height: 38px;
    line-height: 24px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #ddd;
}

.person_child {
    width: 100%;
    height: 38px;
}

.person_child .username {
    display: inline-block;
    overflow: hidden;
    text-overflow: ellipsis;
    width: 80%;
}

.user-logo {
    width: 22px;
    height: 22px;
    margin-right: 8px;
    line-height: 24px;
}

.user-logo i {
    @include font-theme("normal", true);
    font-size: var(--font_size_0);
}

// .user-logo {
//     width: 18px;
//     height: 18px;
//     background-image: url("../../assets/imgs/workflow/icon_institution_level_two.png");
//     background-size: cover;
//     margin-right: 8px;
// }

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

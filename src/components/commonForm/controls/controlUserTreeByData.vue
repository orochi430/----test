<template>
<div style="width: 100%; height: 100%" class="dsf-tree">
    <div v-for="(item, index) in personSelectData" :key="'index1' + index" style="overflow-y: hidden; overflow-x: auto">
        <div class="flex-box tree_line">
            <div v-if="item.type == 4" :style="getStyle(item.deep)" class="person">
                <div class="flex-box person_child">
                    <van-checkbox icon-size="0.32rem" class="child_check" v-model="item.checked" @click="userClick(item)">
                        <div class="user-logo">
                            <i class="icon iconfont iconyonghu"></i>
                        </div>
                        <div class="user-name">{{ item.showName }}</div>
                    </van-checkbox>
                </div>
            </div>
            <div v-else class="tree_tit" :style="getStyle(item.deep)">
                <!-- 父级是否可选 -->
                <van-checkbox icon-size="18px" :style="getStyle(item.deep)" v-model="item.checked" ref="check" @click="userClick(item)" style="flex: 1">
                    <div class="tree_tit w_normal">
                        {{ item.showName || item.name}}
                    </div>
                </van-checkbox>
            </div>

            <div class="isShowChiled" @click="getChild(item)" v-if="item.type == 3">
                <van-icon v-if="item.isopen" name="arrow-up" />
                <van-icon v-else name="arrow-down" />
                <span class="r_span">{{ item.isopen ? "收起" : "展开" }}</span>
                <span class="r_line"></span>
            </div>
        </div>
        <div v-for="(cell, inx) in item.children" :key="'index2' + inx" :style="{ display: item.isopen ? 'block' : 'none' }">
            <div v-if="cell.type == 1" :style="getStyle(item.deep + 1)" class="person">
                <div class="flex-box person_child">
                    <van-checkbox icon-size="0.32rem" class="child_check" v-model="cell.checked" @click="userClick(cell)">
                        <div class="user-logo">
                            <i class="icon iconfont iconyonghu"></i>
                        </div>
                        <div class="user-name">{{ cell.showName }}</div>
                    </van-checkbox>
                </div>
            </div>
            <div v-else>
                <add-tree :personSelectData="[cell]" @select="selectAll" :title="title" :params="params"></add-tree>
            </div>
        </div>
    </div>
</div>
</template>

<script>
export default {
    name: "addTree",
    props: ["personSelectData", "params", "title"],
    data: function () {
        return {
            isHidden: false,
            selectIds: [],
            selectArr: [],
            type: 0 //0是选人  1是选部门
        };
    },
    created() {
        this.isHidden = undefined;
        if (this.title == "部门选择") {
            this.type = 1;
        }
        console.log(this.personSelectData);
        let self = this;
        this.personSelectData.forEach(element => {
            self.setChecked(element);
        });
    },
    mounted() {
    },
    destroyed() {},
    methods: {
        setChecked(item) {
            let self = this;
            item.checked = false;
            if (item.children) {
                item.children.forEach(element => {
                    self.setChecked(element);
                });
            }
        },
        convertUser(orgUser, deep) {
            let children = [];
            orgUser.forEach((element, index) => {
                children.push({
                    id: element.userId,
                    itemIndex: index,
                    name: element.userName,
                    isopen: null,
                    pid: element.orgId,
                    showName: element.userName,
                    type: element.type,
                    deep: deep,
                    childrenCount: 0
                })
            });

            return children
        },
        convertDept(orgDept, deep) {
            let children = [];
            orgDept.forEach((element, index) => {
                let deptItem = {
                    id: element.orgId,
                    itemIndex: index,
                    name: element.orgName,
                    isopen: null,
                    pid: element.fid,
                    showName: element.orgName,
                    type: 3,
                    deep: deep,
                    children: element.orgUsers.length ? this.convertUser(element.orgUsers, deep++) : []
                };

                if (element.opinionTagTreeEntityUserEntities.length) {
                    deptItem.children = [...deptItem.children, ...this.convertDept(element.opinionTagTreeEntityUserEntities)]
                }
                deptItem.childrenCount = deptItem.children.length
                children.push(deptItem)
            });
            return children
        },
        convertDept2(orgDept, deep) {
            let children = [];
            orgDept.forEach((element, index) => {
                let deptItem = {
                    id: element.orgId,
                    itemIndex: index,
                    name: element.orgName,
                    isopen: null,
                    pid: element.fid,
                    showName: element.orgName,
                    type: 3,
                    deep: deep,
                    children: element.leafList.length ? this.convertDept2(element.leafList, deep++) : []
                };
                deptItem.childrenCount = deptItem.children.length
                children.push(deptItem)
            });
            return children
        },
        //加载子节点数据，参数是父节点
        getChild(item) {
            item.isopen = !item.isopen;
            if (item.childrenCount > 0) return
            if (this.title == "部门选择") {
                dsf.http.get(this.params.action.split("?")[0] + "?orgId=" + item.id).then(res => {
                    if (res.data.code == 200) {
                        let data = res.data.data;
                        let rootChildren = this.convertDept2(data.leafList, item.deep + 1);
                        item.children = rootChildren
                        item.childrenCount = rootChildren.length
                    }
                })
            } else if (this.title == "人员选择") {
                dsf.http.get(this.params.action.split("?")[0] + "?orgId=" + item.id).then(res => {
                    if (res.data.code == 200) {
                        let data = res.data.data;
                        let rootChildren = this.convertUser(data.orgUsers, item.deep + 1);
                        if (data.opinionTagTreeEntityUserEntities.length) {
                            rootChildren = [...rootChildren, ...this.convertDept(data.opinionTagTreeEntityUserEntities, item.deep + 1)]
                        }
                        item.children = rootChildren
                        item.childrenCount = rootChildren.length
                    }
                })
            }
        },
        //获取选择的人
        selectAll(data) {
            this.$emit("select", data);
        },
        getStyle(deep) {
            let styleObj = {
                "padding-left": deep * 15 + "px",
                "box-sizing": "border-box",
            };
            return styleObj;
        },
        userClick(user, islabel = false) {
            const self = this;
            self.setSelectUser(user, islabel);
        },
        setSelectUser(user, islabel) {
            const self = this;
            // if (user.checked) {
            //     this.selectArr.push(user);
            // } else {
            //     this.selectArr.forEach((toy, inx) => {
            //         self.$set(toy, "checked", false);
            //         if (toy.id == user.id) {
            //             this.selectArr.splice(inx, 1);
            //         }
            //     });
            // }
            //this.selectArr.push(user);
            this.$emit("select", user);
            this.$forceUpdate();
        }
    },
};
</script>

<style lang="scss" scoped>
@import "../../../assets/styles/themes.scss";
@import "../../../assets/styles/mixin.scss";

.dsf-tree {
    @include font_4(true);
}

.r_line {
    width: 1px;
    @include background-theme('normal');
    display: inline-block;
    height: 22px;
    margin-top: 2px;
}

.isShowChiled {
    // flex: 1;
    text-align: right;
    display: flex;
    flex-direction: row-reverse;
    justify-content: space-between;
    align-items: center;
	.van-icon {
		@include font-theme('normal');
	}
}

.isShowChiled .r_span {
    @include font-theme('normal');
    margin: 0px 6px 0px 15px;
}

.isShowChiled i {
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
    overflow: hidden;
    width: 100%;
    // overflow: scroll;
    // text-overflow: ellipsis;
    // overflow: hidden;
}

.tree_tit span {
    font-family: PingFangSC-Regular;
    font-size: var(--font_size_2);
    color: #a2a2a2;
    margin-left: 6px;
}

.tree_line {
    border-bottom: 1px solid #dddddd;
}

.flex-box {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    min-height: 44px;
}

.open-status {
    // background-image: url("../../assets/imgs/workflow/icon_institution_down.png");
    background-image: url("../../../assets/imgs/chooseUser/wbj-close.png");
    background-size: cover;
}

.close-status {
    // background-image: url("../../assets/imgs/workflow/icon_institution_right.png");
    background-image: url("../../../assets/imgs/chooseUser/wbj-open.png");
    background-size: cover;
}

.nocheck-status {
    background-image: url("../../../assets/imgs/workflow/check_no.png");
    background-size: cover;
}

.checked-status {
    background-image: url("../../../assets/imgs/workflow/check_yes.png");
    background-size: cover;
}

.icon-nocheck-status {
    background-image: url("../../../assets/imgs/workflow/icon_nocheck_ah.png");
    background-size: cover;
}

.icon-checked-status {
    background-image: url("../../../assets/imgs/workflow/icon_check_ah.png");
    background-size: cover;
}

.person {
    height: 38px;
    line-height: 24px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    // border-bottom: 1px solid #ddd;
}

.person_child {
    height: 38px;
    width: 100%;
}

.user-logo {
    margin-top: 2px;
    width: 22px;
    height: 22px;
    margin-right: 8px;
}

.user-name {
    margin-top: 2px;
}

.user-logo i {
    @include font-theme('normal');
    font-size: var(--font_size_0);
}

.dept-icon {
    width: 22px;
    height: 22px;
    background-image: url("../../../assets/imgs/workflow/icon_institution_level_one.png");
    background-size: cover;
    margin-right: 5px;
}

._c {
    @include font-theme("normal");
    @include font_3();
}

.w_normal{
	white-space: normal!important;
}
</style>

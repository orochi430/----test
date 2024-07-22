<template>
    <div id="searchUserList">
        <van-sticky>
            <van-search ref="inputVal" v-model="searchValue" show-action autofocus shape="round" placeholder="搜索"
                @search="onSearch" @input="goSearch" @cancel="onCancel" />
        </van-sticky>
        <div class="dsf-tree" v-if="getUserBySearchValue.length > 0">
            <div v-for="(cell, inx) in getUserBySearchValue" :key="'index' + inx">
                <div :style="{ 'padding-left': '30px' }" class="person">
                    <div class="flex-box person_child">
                        <van-checkbox icon-size="16px" class="child_check" v-model="cell.checked"
                            @click="userClick(cell)">
                            <div class="user-logo" v-if="cell.type == 1">
                                <i class="icon iconfont iconyonghu"></i>
                            </div>
                            <div class="user-name flex">
                                <span>{{ cell.showName || cell.name }}</span>&nbsp;&nbsp;
                                <span class="user-dept">{{ cell.attrs.orgNameLV1Text }}</span>
                            </div>
                        </van-checkbox>
                    </div>
                </div>
            </div>
        </div>
        <commonempty v-if="getUserBySearchValue.length == 0 && searchValue.length > 0" description="暂无数据" />
    </div>
</template>

<script>
export default {
    name: "searchUserList",
    props: ["personSelectData", "selectper", "currentTab", "multiple", "personAddList"],
    data() {
        return {
            searchValue: "",
            isHidden: false,
            selectIds: [],
            getUserBySearchValue: [],
            goSearch: () => { }
        };
    },
    created() {
        this.isHidden = undefined;
    },
    computed: {
        personAddList_: {
            get() {
                return this.personAddList;
            },
            set(val) {
                //grants_改变由父组件控制
                this.$emit("on-change-person", val);
            }
        }
    },
    mounted() {
        this.$nextTick(() => {
            let input = this.$refs["inputVal"].querySelector("input");
            input.focus();
        });
        this.goSearch = this.debounce(this.onSearch)
    },
    methods: {
        debounce(fn) {
            let timeout = null
            return function () {
                clearTimeout(timeout);
                timeout = setTimeout(() => {
                    fn.apply(this, arguments)
                }, 500);
            }
        },
        onSearch(val) {
            let self = this;
            this.getUserBySearchValue = [];
            if (val) {
                let loader = dsf.layer.loading("获取中");
                let getDepts = this.currentTab;
                let url = getDepts.action.replace("async=true", "async=false").replace("action=custom_history", "action=self_org").replace("action=self_unit", "action=self_org")
                if (url.indexOf("?") > -1) {
                    url += "&search=true"
                } else {
                    url += "?search=true"
                }
                let query = dsf.util.deepCopy(this.$route.query);
                query.pk = this.$route.params.pk || this.$route.query.pk;
                query.content = val;

                dsf.http.post(url, query).then(function (result) {
                    if (Array.isArray(result.data.data)) {
                        self.getUserBySearchValue = result.data.data;
                    } else {
                        if (result.data.data.codeList) {
                            // 代码选择接口检索返回整个树结构，递归处理只显示最里层可选叶子节点
                            self.getUserBySearchValue = []
                            result.data.data.codeList.forEach(item => {
                                self.filterCodeList(item)
                            })
                        }
                    }
                    if (self.selectper && self.selectper.length > 0) {
                        self.selectIds = self.selectper.map((item) => item.id);
                        self.initState(self.getUserBySearchValue);
                    }
                }).finally(() => {
                    self.$nextTick(() => {
                        dsf.layer.closeLoading(loader);
                    });
                });
            }
        },
        // 过滤叶子节点
        filterCodeList(node) {
            if (!(node.children?.length > 0) && !node.attrs.noselect) {
                this.getUserBySearchValue.push(node)
            } else {
                node.children.forEach(item => {
                    this.filterCodeList(item)
                })
            }
        },
        onCancel() {
            this.getUserBySearchValue = [];
            this.$emit("searchClose");
        },
        initState(data) {
            data.forEach((item) => {
                if (item.id.split("_").length > 0) {
                    var id =
                        item.id.split("_").length > 1 ?
                            item.id.split("_")[1] :
                            item.id.split("_")[0];
                    if (this.selectIds.indexOf(id) > -1) {
                        item.checked = true;
                        // this.userClick(item);
                    } else {
                        item.checked = false;
                    }
                }
            });
        },
        userClick(user) {
            // debugger
            const self = this;
            if (this.multiple) {
                if (user.checked) {
                    this.personAddList_.push(user);
                } else {
                    let delIndex = this.personAddList_.findIndex(toy => user.id.split("_")[user.id.split("_").length - 1] == toy.id)
                    if (delIndex > -1) this.personAddList_.splice(delIndex, 1)
                }
            } else {
                if (user.checked) {
                    this.personAddList_.forEach((toy) => {
                        self.$set(toy, "checked", false);
                    });
                    this.personAddList_.splice(0, this.personAddList_.length, user);
                } else {
                    this.personAddList_.forEach((toy, inx) => {
                        self.$set(toy, "checked", false);
                    });
                    this.personAddList_.splice(0, this.personAddList_.length)
                }
            }
            var childArr = [];
            //去重
            let dataArr = this.personAddList_;
            let hash = {};
            const data2 = dataArr.reduce((preVal, curVal) => {
                if (curVal.id.split("_").length > 1) {
                    var id = curVal.id.split("_")[1];
                    hash[id] ? "" : (hash[id] = true && preVal.push(curVal));
                } else {
                    hash[curVal.id] ?
                        "" :
                        (hash[curVal.id] = true && preVal.push(curVal));
                }

                return preVal;
            }, []);
            data2.forEach((idx) => {
                if (idx.id.split("_").length > 1 && idx.id.split("_")[1]) {
                    idx.id = idx.id.split("_")[1];
                    idx.pid =
                        idx.pid.split("_").length > 1 ?
                            idx.pid.split("_")[1] :
                            idx.pid.split("_")[0];
                    if (idx.children && idx.children.length > 0) {
                        idx.children.forEach((inx) => {
                            inx.id =
                                inx.id.split("_").length > 1 ?
                                    inx.id.split("_")[1] :
                                    inx.id.split("_")[0];
                            inx.pid =
                                inx.pid.split("_").length > 1 ?
                                    inx.pid.split("_")[1] :
                                    inx.pid.split("_")[0];
                        });
                    }
                }
            });
            this.personAddList_ = data2;
            this.$emit("select", data2);
            this.$forceUpdate();
        },
    }
};
</script>

<style lang="scss" scoped>
@import "../../../assets/styles/themes.scss";
@import "../../../assets/styles/mixin.scss";

.dsf-tree {
    @include font_4(true);
    padding: 0 16px;
}

.r_line {
    width: 1px;
    background: #dddddd;
    display: inline-block;
    position: absolute;
    left: 0;
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
    min-height: 44px;
    overflow: hidden;
}

.person {
    // height: 40px;
    line-height: 24px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #ddd;
}

.person_child {
    // height: 40px;
}

.user-logo {
    margin-top: 1px;
    width: 22px;
    height: 22px;
    margin-right: 8px;
}

.user-name {
    margin-top: 1px;
    // flex-shrink: 0;
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
</style>

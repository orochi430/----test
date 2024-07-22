<template>
<div class="dsf-select-person">
    <van-nav-bar :title="title" left-arrow @click-left="back" :class="{ navBarSticky: navBarSticky }">
        <template #left>
            <van-icon name="arrow-left" /><span>返回</span></template>
    </van-nav-bar>
    <div class="tabs">
        <van-tabs @click="onClick" v-model="tab" animated sticky :offset-top="dsf.util.getOffsetTop(tabsOffsetTop)">
            <van-tab v-for="(item, index) in tabs" :key="index" :title="item.name" :name="item.name">
                <div>
                    <control-user-tree v-if="item.children.length" :personSelectData="item.children" :title="title" :params="item" @select="getSelect" class="_add_tree" :ref="item.name"></control-user-tree>
                    <commonempty v-else description="暂无人员" />
                </div>
            </van-tab>
        </van-tabs>
    </div>
    <div class="bottom">
        <van-radio-group v-model="sendMode" direction="horizontal" v-if="pageTitle == '人员选择'">
            <van-radio v-for="item in controlData.nextNodeSendModeList" :name="item.id" :key="item.id">{{ item.name }}</van-radio>
        </van-radio-group>
        <van-button class="tree_r" type="info" @click="addPerson" size="middle">确 定</van-button>
    </div>
</div>
</template>

<script>
import controlUserTree from "@/components/commonForm/controls/controlUserTreeByData";
// import controlUserChecked from "@/components/commonForm/controls/controlUserChecked";
// import controlUserSearchList from "@/components/commonForm/controls/controlUserSearchList";
export default {
    name: "controlUserByData",
    props: {
        controlData: {
            type: Object,
            default: []
        },
        pageTitle: {
            type: String,
            default: null,
        }
    },
    components: {
        controlUserTree,
        // controlUserChecked,
        // controlUserSearchList,
    },
    data() {
        return {
            tab: 0,
            tabsLoad: [],
            multiple: false,
            allCount: 0,
            searchValue: "",
            tabs: [],
            show: false,
            type: 0,
            navBarSticky: false,
            selectArr: [],
            showSearch: false,
            tabsOffsetTop: 0,
            sendMode: ''
        };
    },
    created() {
        console.log(this.controlData);
        this.searchValue = "";
        this.tabs = this.controlData.tabs;
        this.sendMode = this.controlData.nextNodeSendModeList[0]?.id || ''
    },
    mounted() {
        this.$parent.$el.onscroll = this.handleScroll;
        let docFontsize = document.documentElement.style.fontSize.split('px')[0]
        let searchHeight = this.$refs.search ? this.$refs.search.offsetHeight : 0
        let headerHeight = 46 / 50 * docFontsize
        // this.tabsOffsetTop = searchHeight + headerHeight
        this.tabsOffsetTop = headerHeight
    },
    watch: {},
    computed: {
        title() {
            return this.pageTitle;
        },
        selectObj() {
            let tempStr = "";
            // if (this.selectType == 0) {
            //     let type1Count = 0,
            //         type5Count = 0,
            //         otherCount = 0;
            //     this.selectArr.forEach(element => {
            //         if (element.type == "5") {
            //             type5Count++;
            //         } else if (element.type == "1") {
            //             type1Count++;
            //         } else {
            //             otherCount++;
            //         }
            //     });
            //     if (type1Count > 0) {
            //         tempStr += type1Count + "人,";
            //     }
            //     if (type5Count > 0) {
            //         tempStr += type5Count + "组织,";
            //     }
            //     if (otherCount > 0) {
            //         tempStr += otherCount + "项,";
            //     }
            //     tempStr = tempStr.trim(",");
            //     tempStr = tempStr.substring(0, tempStr.lastIndexOf(','))
            // } else if (this.selectArr.length) {
            //     tempStr = this.selectArr.length + "项";
            // }
            return tempStr;
        },
        btnDisable() {
            return this.selectArr.length == 0;
        }
    },
    methods: {
        handleScroll() {
            // 获取屏幕滑动的高度
            if (this.$parent.$el.scrollTop > 0) {
                this.navBarSticky = true;
            } else {
                this.navBarSticky = false;
            }
        },
        //关闭弹层
        close(par) {
            this.show = par;
        },
        //展示选中的人
        showCheckUsers() {
            this.show = true;
        },
        //打开检索
        onSearch(val) {
            this.showSearch = true;
        },
        //关闭检索
        onSearchClose() {
            console.log("关闭人员检索层");
            this.showSearch = false;
        },
        //切换tab
        onClick(name, title) {
            // let param = this.multiple;
            // let url = name;
            // this.allCount = 0;
            // let checkTab = this.tabs.filter((item) => {
            //     return item.action == name;
            // });
            // this.getPersonList(param, url);
        },
        //返回
        back() {
            this.$emit("closeUser", false);
        },
        addPerson() {
            this.show = false;
            this.showSearch = false;
            console.log("最终选择=====>", this.selectArr);
            this.$emit("getSelectUser", this.selectArr, this.sendMode);
            this.$emit("closeUser", false);
        },
        getSelect(data) {
            let self = this;
            let ischeck = false;
            self.selectArr.forEach((inx, i) => {
                if (inx.id == data.id) {
                    ischeck = true;
                    if (!data.checked) {
                        self.selectArr.splice(i, 1);
                    }
                }
            });
            if (!ischeck) {
                self.selectArr.push(data);
            }
        }
    },
};
</script>

<style lang="scss" scoped>
@import "../../../assets/styles/themes.scss";
@import "../../../assets/styles/mixin.scss";

.van-nav-bar {
    @include font-theme('normal');

    .van-icon {
        @include font-theme('normal');
        @include font_5;
        margin-right: 3px;
    }
}

.van-button--info {
    @include background-theme('normal');
    @include border-color-theme('normal');
}

::v-deep.dsf-select-person {
    display: flex;
    flex-direction: column;
    height: 100vh;
    overflow: hidden;

    .tabs {
        flex: 1;
        overflow-y: auto;
    }

    @include font_4(true);

    .van-tabs {
        height: auto;
    }

    .van-tabbar-item__text {
        width: 100%;
        display: flex;
        justify-content: space-around;
        align-items: center;
    }

    ._add_tree {
        height: calc(100% - 61px) !important;
        color: #333;
        background: #fff;
        margin-top: 5px;
        // margin-bottom: 65px;
        padding-top: 0px;

        div {
            white-space: nowrap;
        }

        .checkbox {
            position: relative;
            top: -2px;
        }
    }

    .selec_b {
        position: relative;
        bottom: 50px;

        .select_box {
            display: flex;
            flex-direction: column;
            flex-wrap: wrap;
        }
    }
    .bottom {
        padding: 10px;
        background-color: #fff;
    }
    button {
        width: 100%;
        height: 0.8rem;
        margin-top: 10px;
    }

    ._btns {
        padding: 0 10px;

        .tree_l {
            width: 50%;

            //text-align: center;
            .tree_icon {
                vertical-align: text-top;
            }
        }

        .tree_r {
            width: 50%;
        }
    }

    .van-tabbar--fixed {
        height: 1.2rem;
    }

    .navBarSticky {
        width: 100%;
        position: fixed;
        top: 0;

        &::after {
            // border-bottom:none;
        }
    }
}
</style>

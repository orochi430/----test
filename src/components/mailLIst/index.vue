<template>
    <div class="mailList">
        <van-sticky>
            <van-search v-model="value" placeholder="搜索" sticky @search="searchUser" :clearable="false" :style="{paddingTop: dsf.util.getOffsetTop('0.2rem', true)}">
                <!-- <template #right-icon>
                <img class="voiceImg" src="../../assets/imgs/voice.png" alt="">
            </template> -->
                <template #left-icon @click="searchUser">
                    <!-- <van-icon name="search" color="#ffffff" size="0.36rem" @click="searchUser" /> -->
                    <i class="iconfont iconsousuo1" style="color: #fff"></i>
                </template>
                <template #right-icon v-if="value">
                    <span @click="value = ''; searchUser()">取消</span>
                </template>
            </van-search>
        </van-sticky>
        <van-tabs v-if="tabList.length > 1" v-model="activeName" sticky :offset-top="offsetTopTab" :before-change="clearPopstate"
            @change="resetPopstate">
            <van-tab v-for="(item, index) in tabList" :key="index" :title="item.tabName" :name="item.type">
                <indexList v-if="item.type == 'indexList'" ref="indexList" :ref="item.type" :keyword="value" :url="item.url"
                    :searchUrl="item.searchUrl" :itemtab="item"></indexList>
                <organization v-if="item.type == 'dept'" :itemtab="item" :ref="item.type" :keyword="value"
                    :initOrgId="item.params.orgId" :isShowCount="item.isShowCount" :searchUrl="item.searchUrl"
                    :url="item.url"></organization>
                <commonUse v-if="item.type == 'commonUse'" :itemtab="item" :ref="item.type" :keyword="value"
                    :initOrgId="item.params.orgId" :url="item.url"></commonUse>
            </van-tab>
        </van-tabs>
        <template v-else>
            <indexList v-if="tabList[0].type == 'indexList'" :ref="tabList[0].type" :keyword="value" :url="tabList[0].url"
                :searchUrl="tabList[0].searchUrl"></indexList>
            <organization v-if="tabList[0].type == 'dept'" :ref="tabList[0].type" :keyword="value"
                :initOrgId="tabList[0].params.orgId" :isShowCount="tabList[0].isShowCount" :searchUrl="tabList[0].searchUrl"
                :url="tabList[0].url"></organization>
        </template>

    </div>
</template>

<script>
import {
    mapState
} from 'vuex'
import indexList from "./indexList"
import organization from "./organization"
import commonUse from "./commonUse"

export default {
    data() {
        return {
            activeName: '',
            value: "",
            timer: "",
            currentRef: null,
            offsetTopTab: 0
        }
    },
    components: {
        indexList,
        organization,
        commonUse
    },
    computed: {
        tabList() {
            return dsf.config.addressList.tabs || [];
        },
        ...mapState({
            isShowAppFooter: state => state.isShowAppFooter,
            isShowAppHeader: state => state.isShowAppHeader
        })
    },
    activated() {
        this.$nextTick(() => {
            this.currentRef.addPopstate()
        })
    },
    created() {
        this.activeName = this.tabList[0].type
        this.$nextTick(() => {
            if (this.tabList.length > 1) {
                this.currentRef = this.$refs[this.activeName][0];
            } else {
                this.currentRef = this.$refs[this.activeName];
            }
            this.currentRef.addPopstate()
        })
    },
    mounted(){
      this.$nextTick(() => {
            let height = $(".van-search").outerHeight() + 5
            this.offsetTopTab = dsf.util.getOffsetTop(height);
        });
    },
    methods: {
        searchUser() {
            console.log(this.value, this.active)
            if (this.activeName != 'indexList') {
                // this.$refs.organ.search(this.value)
            } else {
                if (this.tabList.length > 1) {
                    this.$refs.indexList[0].search(this.value)
                } else {
                    this.$refs.indexList.search(this.value)
                }
            }
        },
        clearPopstate(name) {
            console.log(this.activeName, '->', name)
            this.currentRef.removePopstate()
            return new Promise((resolve) => {
                resolve(true);
            });
        },
        resetPopstate(name, title) {
            console.log("resetPopstate", name, title)
            this.$nextTick(() => {
                if (this.tabList.length > 1) {
                    this.$refs[name][0].addPopstate()
                    this.currentRef = this.$refs[name][0]
                } else {
                    this.$refs[name].addPopstate()
                    this.currentRef = this.$refs[name]
                }
            })
        }
    },
    deactivated() {
        this.currentRef.removePopstate(true); //失活时移除监听，但须传参告知不是tab切换
        // window.addressIndex = 0
        // this.value="";
    }
    // , 注释原因返回按钮未能逐层返回；
    // beforeRouteLeave(to, from, next) {
    //     if (from.name != "index") { //如果是去列表的话   则销毁，解决tab页固定的问题 2022年3月20日16:20:01  @ly
    //         this.$destroy();
    //     }
    //     next();
    // }
}
</script>
<style lang="scss" scoped>
@import "../../assets/styles/themes.scss";
@import "../../assets/styles/mixin.scss";

::v-deep input.van-field__control::-webkit-input-placeholder {
    // font-family: PingFangSC-Regular;
    // font-size: 0.26rem;
    color: #FFFFFF;
    font-weight: 400;
}

.mailList {
    font-size: var(--font_size_2);

    .disfr {
        display: flex;
    }

    .fc {
        display: flex;
        flex-direction: column;
    }

    .jsb {
        justify-content: space-between;
    }

    .flex1 {
        flex: 1;
    }

    .columnScroll {
        overflow-y: scroll;
        overflow-x: hidden;
    }

    .rowScroll {
        overflow-x: scroll;
        overflow-y: hidden;
    }

    .voiceImg {
        width: 16px;
        height: 16px;
    }
}

// .van-search .van-cell {
//     display: flex;
//     align-items: center;
// }

// ::v-deep .van-tab--active {
//   color: #3389E0 !important;
// }
// .red-theme  #app .mailList ::v-deep .van-tabs .van-sticky .van-tabs__wrap  .van-tabs__line{
//   background-color: #3389E0 !important;

// }

.mailList ::v-deep .van-tabs {
    .van-sticky {
        margin-top: -0.2rem;
    }

    .van-tabs__wrap {
        margin: 0 10px;
        box-shadow: 0 1px 3px 0 rgba(80, 126, 170, 0.10);
        border-radius: 6px;
    }
}

.mailList ::v-deep .van-search {
    background-color: var(--normal) !important;
    border-bottom: 1px solid #f5f5f5;
    background-color: transparent;
    padding: 0.2rem 0.2rem 0.32rem 0.2rem;


    .van-search__content {
        background: rgba(255, 255, 255, 0.2);
        border-radius: 4px;

        input,
        span {
            color: #ffffff;
        }
    }
}
</style>

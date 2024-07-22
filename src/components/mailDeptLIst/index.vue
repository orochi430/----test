<template>
<div class="mailList">
    <van-sticky :offset-top="dsf.util.getOffsetTop()" >
        <van-search v-model="value" placeholder="搜索词" sticky @search="searchUser" :clearable="false">
            <!-- <template #right-icon>
                <img class="voiceImg" src="../../assets/imgs/voice.png" alt="">
            </template> -->
            <template #left-icon @click="searchUser">
                <van-icon name="search" color="#999999" @click="searchUser" />
            </template>
            <template #right-icon v-if="value">
                <span @click="value = ''; searchUser()">取消</span>
            </template>
        </van-search>
    </van-sticky>

    <van-tabs v-model="activeName" sticky :offset-top="dsf.util.getOffsetTop(51)" :before-change="clearPopstate" @change="resetPopstate">
        <van-tab v-for="(item, index) in tabList" :key="index" :title="item.tabName" :name="item.type">
            <indexList v-if="item.type == 'indexList'" :ref="item.type" :keyword="value" :url="item.url" :searchUrl="item.searchUrl"></indexList>
            <organization v-if="item.type == 'dept'" :ref="item.type" :keyword="value" :initOrgId="item.params.orgId" :isShowCount="item.isShowCount" :searchUrl="item.searchUrl" :url="item.url"></organization>
        </van-tab>
    </van-tabs>
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
            tabList: [
                //     {
                //     "tabName": "本单位",
                //     "type": "dept",
                //     "url": "fn/reportContacts/deptandusers",
                //     "searchUrl": "/fn/reportContacts/users",
                //     "params": {
                //         "orgId": "deptId"
                //     },
                //     "isShowCount": true
                // },
                {
                    "tabName": "单位",
                    "type": "indexList",
                    "url": "fn/reportContacts/personalcontactusers",
                    "searchUrl": "/fn/reportContacts/personalcontactusers",
                    "params": {}
                }, {
                    "tabName": "组织",
                    "type": "dept",
                    "url": "fn/reportContacts/deptandusers",
                    "searchUrl": "fn/reportContacts/users",
                    "params": {
                        "orgId": "deptId"
                    },
                    "isShowCount": true
                }
            ]
        }
    },
    components: {
        indexList,
        organization,
        commonUse
    },
    computed: {
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
            console.log(this.activeName)
            this.currentRef.removePopstate()
            return new Promise((resolve) => {
                resolve(true);
            });
        },
        resetPopstate(name, title) {
            console.log(this.$refs[name])
            this.$nextTick(() => {
                if (this.tabList.length > 1) {
                    this.$refs[name][0].addPopstate()
                } else {
                    this.$refs[name].addPopstate()
                }
            })
            console.log(name, title)
        }
    },
    deactivated() {
        this.currentRef.removePopstate()
        window.addressIndex = 0
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

<style lang="scss">
@import "../../assets/styles/themes.scss";
@import "../../assets/styles/mixin.scss";
</style><style lang="scss" scoped>
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

.van-search .van-cell {
    display: flex;
    align-items: center;
}

// ::v-deep .van-tab--active {
//   color: #3389E0 !important;
// }
// .red-theme  #app .mailList ::v-deep .van-tabs .van-sticky .van-tabs__wrap  .van-tabs__line{
//   background-color: #3389E0 !important;

// }
</style>

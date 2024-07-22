<template>
    <div class="customTabBox">
        <van-tabs v-model="active" sticky @change="tabChange" :offset-top="dsf.util.getOffsetTop()">
            <van-tab :title="'tabs' + item.name" :badge="item.count | badgeCount" v-for="(item, index) in tabParams.tabslist"
                :key="index">
                <!-- tab前置插槽 -->
                <template #title>
                    <van-icon :name="item.icon" />
                    <span>{{ item.name }}<!-- <span v-if="item.isBadge">({{item.count}})</span> --></span>
                </template>
                <keep-alive >
                <default-list :params='item' :currentTabs="index" :tabsPage="tabsPage" :clickTabIndex="clickTabIndex" :routeKey="routeKey"
                    :oppsetTop="isShowAppHeader ? '1.8rem' : '0.88rem'"></default-list>
                </keep-alive>
            </van-tab>
        </van-tabs>
    </div>
</template>

<script>
import { mapState } from "vuex";
import defaultList from "../documentCenter/DefaultList"
import {
    tabsConfig
} from '../documentCenter/customTab.js'
import urlJs from "@/common/url";
export default {
    props: ['value', 'Note'],
    name: "customTabs",
    model: {
        prop: 'value',
        event: 'input'
    },
    components: {
        defaultList
    },
    computed: {
        ...mapState({
            isShowAppFooter: state => state.isShowAppFooter,
            isShowAppHeader: state => state.isShowAppHeader
        })
    },
    data() {
        return {
            active: 0,
            tabParams: {},
            tabsPage: false,
            clickTabIndex: 0,
            routeKey: "",
            docTitle: ""
        }
    },
    created() {
        this.docTitle = this.$route.query.title || "便笺";
        urlJs.setTitle(this.docTitle);
        this.routeKey = this.$route.params.Note || this.Note
        const filterData = tabsConfig.filter(item => item.key == this.routeKey)
        if (filterData.length > 0) {
            this.tabsPage = true
            this.tabParams = filterData[0]
            this.tabParams.tabslist.map(item => {
                if (item.isBadge) {
                    dsf.http.get(item.badgeUrl, {}).then((data) => {
                        this.$delete(item, "count")
                        let total = Number(data.data.total)
                        this.$set(item, "count", total)
                    })
                }
            })
        } else {
            this.tabsPage = false
        }
        this.$eventBus.onRefreshBadge(this, (tabindex) => {
            this.refreshBadge(tabindex);
        });
    },
    activated() {
      console.log(this.docTitle)
        urlJs.setTitle(this.docTitle);
    },
    filters: {
        badgeCount(val) {
            if (val > 100) {
                return "99+"
            }
            if (val < 1) {
                return ""
            }
            return val
        }
    },
    methods: {
        refreshBadge(tabindex) {
            this.tabParams.tabslist.forEach((item, index) => {
                if (item.isBadge && index == tabindex) {
                    dsf.http.get(item.badgeUrl, {}).then((data) => {
                        this.$delete(item, "count")
                        let total = Number(data.data.total)
                        this.$set(item, "count", total)
                    })
                }
            })
        },
        tabChange(index, title) {
            console.log(index + "---" + title)
            switch (index) {
                case 0:
                    this.clickTabIndex = 0
                    break
                case 1:
                    this.clickTabIndex = 1
                    break
                case 2:
                    this.clickTabIndex = 2
                    break
            }
        }
    }
}
</script>

<style lang="scss">
.customTabBox {
    height: 100%;

    .van-tabs {
        height: 100%;
        display: flex;
        flex-direction: column;

        .van-tabs__content {
            height: calc(100% - 44px);

            .van-tab__pane {
                height: 100%;
            }
        }
    }

    // .van-info {
    //     top: 10px;
    // }

    .van-sticky {
        background: white;
        /* padding:15px; */
    }
}
</style>

<template>
    <div class="worktodo">
        <div class="worktodo_title">
            <img src="../../../../../static/images/project/zhenhuaIndustry/workertodo.png" alt="">
            <!-- <van-icon name="arrow" color="#999" size="0.32rem" @click="toUrl" /> -->
        </div>
        <main>
            <van-tabs v-model="active" :ellipsis="false" class="tabs" @change="changeTab" swipeable>
                <van-tab v-for="(item, index) in tabParams.tabslist" :key="index" :name="index" :title="item.name"
                    :badge="item.badge | badgeCount">
                    <template #title>
                        <van-icon v-if="item.icon" :name="item.icon" />
                        <span>{{ item.name }}</span><span v-if="item.count">({{ item.count | badgeCount }})</span>
                        <!-- <span v-if="item.badgeUrl&&item.count" class="badge">{{item.count}}</span> -->
                    </template>
                    <DefaultList v-if="index == active" :key="refreshKey" :params="item" :filterData="filterData">
                    </DefaultList>
                </van-tab>
            </van-tabs>
            <div @click="toUrl" class="moreLink">
                <div class="moreLink_child">
                    <p>查看更多</p>
                    <van-icon name="arrow" color="var(--normal)" size="0.32rem" />
                </div>

            </div>
        </main>
    </div>
</template>

<script>
import DefaultList from "@/components/documentCenter/DefaultList"
export default {
    props: ['itemdata'],
    components: { DefaultList },
    data() {
        return {
            active: 0,
            refreshKey: Math.random(),
            filterData: {
                limit: 3
            },
            tabKey: '',
            tabsConfig: null,
            tabParams: {}
        }
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
    computed: {
        title() {
            return this.tabParams.remark || ""
        }
    },
    async created() {
        this.tabKey = this.itemdata.params.fileType
        if (this.itemdata?.params?.showRows) {
            this.filterData.limit = this.itemdata.params.showRows
        }
        let data = dsf.config.commonTabs;
        this.tabsConfig = data[this.tabKey];
        //console.log(this.tabsConfig)
        if (this.tabsConfig.url) {
            await dsf.http.post(this.tabsConfig.url).then(res => {
                if (res.data.code == 200) {
                    this.tabsConfig.tabslist = res.data.data
                }
            })
        }
        if (this.tabsConfig) {
            this.showDetailBadge = this.tabsConfig.showDetailBadge || false
            this.tabParams = JSON.parse(JSON.stringify(this.tabsConfig)); //深度赋值，不修改原始的对象
            this.tabParams.tabslist.forEach(item => {
                if (item.params) {
                    Object.keys(item.params).forEach(element => { //循环params的属性  替换值
                        item.params[element] = dsf.util.getReplaceUrl(item.params[element])
                    });
                    item.params.showSearchBox = false
                    item.params.justShowCard = true
                    // item.params.hideReadStatus = true
                    item.params.hideListButton = true
                }
                if (item.badgeUrl) {
                    item.badgeUrl = dsf.util.getReplaceUrl(item.badgeUrl)
                    dsf.http.get(item.badgeUrl).then((data) => {
                        this.$delete(item, "badge")
                        let badge = data.data.total || data.data.badge || data.data.data;
                        this.$set(item, "badge", badge)
                    })
                }
                if (item.countUrl) {
                    item.countUrl = dsf.util.getReplaceUrl(item.countUrl)
                    dsf.http.get(item.countUrl).then((data) => {
                        this.$delete(item, "count")
                        let count = data.data.total || data.data.badge || data.data.data;
                        this.$set(item, "count", count)
                    })
                }
            })
        }
    },
    activated() {
        this.refreshBadge(this.active)
        setTimeout(() => {
            this.isShow = true
            this.refreshKey = Math.random()
        }, 10)

    },
    methods: {
        refreshBadge(tabindex) {
            let tab = this.tabParams.tabslist[tabindex]
            if (tab.badgeUrl) {
                dsf.http.get(tab.badgeUrl).then((data) => {
                    let badge = data.data.total || data.data.badge || data.data.data;
                    this.$set(tab, "badge", badge)
                })
            }
            if (tab.countUrl) {
                dsf.http.get(tab.countUrl).then((data) => {
                    let count = data.data.total || data.data.badge || data.data.data;
                    this.$set(tab, "count", count)
                })
            }
        },
        toUrl() {
            this.$router.push({
                path: `/commonTabs/${this.tabKey}`,
                query: {
                    active: this.active
                }
            })
        },
        changeTab(index) {
            this.refreshBadge(index)
        }
    }
}
</script>

<style lang="scss" scoped>
@import "@/components/applicationCenter/application.scss";

.worktodo {
    margin: 1.5vh 12px;
    background-color: #fff;
    box-shadow: 0 1px 20px 0 rgba(166, 201, 235, 0.48);
    border-radius: 10px;
    overflow: hidden;
    // padding-left: 10px;
    margin-top: -60px;

    .worktodo_title {
        font-family: PingFangSC-Semibold;
        font-size: var(--font_size_1);
        color: #333333;
        font-weight: 600;
        position: relative;
        padding-left: 10px;
        // width: 120px;
        width: 100%;
        height: 27.36px;
        margin-top: 20px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding-right: 10px;

        img {
            width: 87.5px;
            height: 18px;
        }
    }

    main {
        .tabs {
            ::v-deep .van-info {
                top: 50%;
                transform: translate(100%, -50%);
                font-size: var(--font_size_4);
                background-color: #FF3300;
                line-height: 0.32rem;
                height: 0.32rem;
                border: 0;
                right: -4px;
            }

            ::v-deep .van-tabs__wrap {
                margin-top: 10px;
                height: 30px;
                padding: 0 5px;
                margin-bottom: 5px;
                padding-left: 20px;

                .van-tabs__nav--complete {
                    padding-left: 0;

                    // padding-right: 2px;.van-tab
                    .van-tab {
                        min-width: 90px;
                        margin-right: 10px;
                        border-radius: 27.5px;
                        border: 1px solid #82797d;
                        .van-tab__text-wrapper{
                            margin-left: -15px;
                        }
                    }

                    .van-tab--active {
                        min-width: 90px;
                        background: #E9F2FE;
                        border-radius: 27.5px;
                        border: 1px solid rgba(9, 106, 230, 1);
                        // padding-right: 10px;
                        margin-right: 10px;
                        font-weight: 700;
                        .van-tab__text-wrapper{
                            margin-left: -15px;
                        }

                    }

                    .van-tabs__line {
                        display: none;
                    }
                }
            }

        }

        ::v-deep .ds-list {
            padding: 0;
            background-color: #fff;
            padding: 0 15px;
            min-height: 185px;

            &~.van-uploader {
                height: 0;
                display: block;
            }

            .ds-item {
            min-height: 49px;
                &+.ds-item:last-child {
                    margin-top: 10px;
                    position: relative;

                    // &::after {
                    //     position: absolute;
                    //     box-sizing: border-box;
                    //     content: ' ';
                    //     pointer-events: none;
                    //     right: 16px;
                    //     top: 55px;
                    //     left: 16px;
                    //     border-bottom: 1px solid #cfcfcf;
                    //     -webkit-transform: scaleY(0.5);
                    //     transform: scaleY(0.5);
                    // }
                }

                .ds-card {
                    width: 100%;
                    border-radius: 0;
                    box-shadow: 0 0 0 0;

                    .tabspage {
                        width: 100%;

                        div {
                            display: flex;
                            justify-content: space-between;

                            .ds-card-header {
                                padding: 16px 10px 0;
                                font-size: var(--font_size_2);
                                .clamp {
                                    .col-title {
                                        width: 180px !important;
                                        white-space: nowrap !important; //不支持换行
                                        overflow: hidden !important; //隐藏多出部分文字
                                        text-overflow: ellipsis !important; //用省略号代替多出部分文字
                                    }
                                    span{
                                        width: 180px !important;
                                        white-space: nowrap !important; //不支持换行
                                        overflow: hidden !important; //隐藏多出部分文字
                                        text-overflow: ellipsis !important; //用省略号代替多出部分文字
                                    }
                                    .isStatus{
                                        width: 10px !important;
                                        margin-right: 5px;
                                        margin-top: 5px;
                                    }
                                }
                            }

                            .ds-card-content {
                                padding: 0 10px 10px;
                                padding-top: 15px;

                                .subTitle {
                                    font-size: var(--font_size_3);

                                    .iconfont {
                                        font-size: var(--font_size_3);
                                    }
                                }
                            }
                        }
                    }

                    // .ds-card-header {
                    //     padding: 16px 10px 0;
                    //     font-size: var(--font_size_2);
                    //     // width: 60px;
                    //     // white-space: nowrap; //不支持换行
                    //     // overflow: hidden; //隐藏多出部分文字
                    //     // text-overflow: ellipsis; //用省略号代替多出部分文字
                    // }

                    // .ds-card-content {
                    //     padding: 0 10px 10px;

                    //     .subTitle {
                    //         font-size: var(--font_size_4);

                    //         .iconfont {
                    //             font-size: var(--font_size_4);
                    //         }
                    //     }
                    // }

                    .ds-card-footer {
                        display: none;
                    }
                }
            }
            .van-empty{
                height: 147px;
                .van-empty__image{
                    width: 120px;
                    height: 120px;
                }
                .van-empty__description{
                    margin-top: 0;
                }
            }
        }

        .moreLink {
            height: 50px;
            background-color: #ffffff;
            width: 100%;
            position: relative;

            .moreLink_child {
                width: 92%;
                margin: 0 auto;
                height: 100%;
                display: flex;
                align-items: center;
                justify-content: center;
                // border-top: .5px solid #cfcfcf;
                // transform: scaleY(.5)

                p {
                    color: var(--normal);
                }
            }
            &::before {
                        position: absolute;
                        box-sizing: border-box;
                        content: ' ';
                        pointer-events: none;
                        right: 16px;
                        top: 0px;
                        left: 16px;
                        border-bottom: 1px solid #cfcfcf;
                        -webkit-transform: scaleY(0.5);
                        transform: scaleY(0.5);
                    }
        }

    }
}
</style>
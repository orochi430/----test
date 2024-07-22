<template>
<div class="fgwDB" :class="{ 'verticalx': vertical }">
    <fgwheader @reflush="doRefresh" :showBack="true"></fgwheader>
    <div class="fcontain">
        <div class="tabs">
            <p class="tab">
                <span @click="changeTab(item.type)" :class="{ active: item.type == tabIndex }" v-for="item in tabList" :key="item.type">{{ item.name }}</span>
            </p>
            <!-- <p class="more">
                <img src="static/images/project/fgwPad/more.png" alt="">
                <span>更多</span>
            </p> -->
        </div>
        <div class="listbox" ref="list" @scroll="alive">
            <commonempty v-if="list.length == 0 && !loading" />
            <van-list v-model="loading" :finished="finished" finished-text="" @load="onLoad">
                <div class="dblist" :class="{'unread':item.whetherRead=='0'}" v-for="(item,index) in list" :key="item.id" @click="link(item,index)">
                    <p class="title">{{ item.bt }}</p>
                    <div class="right">
                        <p v-if="tabIndex==1">
                            <img src="static/images/project/fgwPad/user.png" alt="">
                            <span>{{ item.userName }}</span>
                        </p>
                        <p>
                            <img src="static/images/project/fgwPad/date.png" alt="">
                            <span>{{ item.time }}</span>
                        </p>
                    </div>
                </div>
            </van-list>
        </div>
    </div>
</div>
</template>

<script>
import fgwheader from './header.vue';
let fromName = "";
export default {
    name: 'fgwZB',
    components: {
        fgwheader
    },
    data() {
        return {
            tabIndex: 1,
            tabList: [{
                    name: "已发送",
                    type: 1,
                },
                {
                    name: "已办结",
                    type: 2,
                }
            ],
            list: [],
            finished: false,
            loading: false,
            refreshing: false,
            page: 0,
            limit: 5,
            searchValue: "",
            timer: null,
            scrollPages: 0,
            vertical: false
        };
    },
    computed: {},
    watch: {},
    methods: {
        checkScreen() {
            const width = document.documentElement.clientWidth;
            const height = document.documentElement.clientHeight;
            if (width > height) {
                this.vertical = false
            } else {
                this.vertical = true
            }
        },
        alive(e) {
            // 获取页面滚动条的位置
            this.scrollPages = e.target.scrollTop;
        },
        changeTab(type) {
            this.tabIndex = type;
            this.searchValue = "";
            this.doRefresh();
        },
        doRefresh() {
            this.list = []
            this.page = 0;
            this.finished = false;
            this.refreshing = true;
            this.loading = true;
            this.onLoad();
        },
        onLoad() {
            // 异步更新数据
            clearTimeout(this.timer);
            this.timer = setTimeout(() => {
                if (this.refreshing) {
                    this.list = [];
                    this.page = 0;
                    this.refreshing = false;
                }
                dsf.http
                    .post(`/fn/developmentOffice/dutyData`, {
                        type: "zb",
                        kind: this.tabIndex,
                        bt: this.searchValue,
                        page: this.page
                    })
                    .then(({
                        data
                    }) => {
                        if (data.code == 200) {
                            if (data && data.data && data.data.length > 0) {
                                data.data.forEach((item) => {
                                    item.time = item.time ?
                                        moment(new Date(item.time)).format("YYYY-MM-DD") :
                                        "";
                                });
                                this.list = this.list.concat(data.data);
                            }
                            if (data.data.length < this.limit) {
                                this.finished = true;
                            } else {
                                this.page += 1;
                            }
                        } else {
                            this.finished = true;
                        }
                    })
                    .catch(({
                        message
                    }) => {
                        this.finished = true;
                        dsf.layer.toast(message);
                    })
                    .finally(() => {
                        this.loading = false;
                        this.refreshing = false;
                    });
            }, 1000);
        },
        onSearch(val) {
            this.doRefresh();
        },
        link(data, index) {
            this.$set(this.list[index], "whetherRead", "1")
            dsf.http.post(`fn//fgw/todo/setRead`, {
                    id: data.id
                })
                .done(res => {

                }).error(err => {

                }).finally(() => {
                    this.$router.push({
                        name: "dsfIframe",
                        query: {
                            url: data.url,
                            title: data.bt,
                        },
                    });
                })
        },
    },
    created() {},
    mounted() {
        this.checkScreen()
        window.addEventListener("resize", () => {
            this.checkScreen()
            // window.location.reload()
        })
    },
    destroyed() {},
    beforeRouteEnter(to, from, next) {
        fromName = from.name;
        next();
    },
    activated() {
        if (fromName != 'dsfIframe') {
            this.doRefresh();
        } else {
            // 缓存组件激活时调用
            this.$refs.list.scrollTop = this.scrollPages; // 获取 dom 的scrollTop = 缓存的滚动条位置
        }
    },
}
</script>

<style lang="scss" scoped>
.fgwDB {
    width: 100vw;
    height: 100vh;
    background: url(../../../../static/images/project/fgwPad/body-bg.png) no-repeat;
    background-size: 100% 100%;
    box-sizing: border-box;
    padding: 30px 30px 35px 30px;
    display: flex;
    flex-direction: column;
    overflow: hidden;

    &.verticalx {
        padding: 20px 15px 15px 15px;
    }

    .fcontain {
        width: 100%;
        margin-top: 12px;
        height: calc(100vh - 122px);
        background: rgba($color: #FFFFFF, $alpha: 0.3);
        border-radius: 10px;
        overflow: hidden;
        box-sizing: border-box;
        padding: 20px;
        display: flex;
        flex-direction: column;

        .tabs {
            width: 100%;
            height: 68px;
            position: relative;
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            flex-shrink: 0;

            &::after {
                content: '';
                position: absolute;
                width: 100%;
                height: 18px;
                bottom: 0;
                background: #0044B4;
                border-radius: 8px;
                z-index: 2;
            }

            .tab {
                display: flex;
                align-items: center;
                margin-left: 20px;
                height: 53px !important;
                overflow: hidden;

                span {
                    width: 170px;
                    height: 53px;
                    font-size: 20px;
                    font-weight: bold;
                    background: url(../../../../static/images/project/fgwPad/tab-wxz.png) no-repeat;
                    background-size: 100% 100%;
                    line-height: 50px;
                    box-sizing: border-box;
                    padding-left: 38px;
                    margin-left: -30px;
                    position: relative;
                    z-index: 1;

                    &:first-child {
                        margin-left: 0;
                    }

                    &.active {
                        width: 170px;
                        height: 53px;
                        background: url(../../../../static/images/project/fgwPad/tab-xz.png) no-repeat;
                        background-size: 100% 100%;
                        color: #FFF;
                        z-index: 3;
                    }
                }
            }

            .more {
                display: flex;
                align-items: center;
                margin-top: 6px;
                margin-right: 20px;

                img {
                    width: 20px;
                    height: 20px;
                    flex-shrink: 0;
                    margin-top: 3px;
                }

                span {
                    font-size: 20px;
                    color: #708EFF;
                    margin-left: 5px;
                }
            }
        }

        .listbox {
            width: 100%;
            height: calc(100% - 88px);
            overflow-y: auto;
            overflow-x: hidden;
            margin-top: 20px;

            .dblist {
                width: 100%;
                height: 50px;
                border-radius: 8px;
                background: #FFF;
                box-sizing: border-box;
                padding: 0 12px;
                display: flex;
                align-items: center;
                justify-content: space-between;
                margin-bottom: 12px;

                // &::before {
                //     width: 45px;
                //     height: 26px;
                //     content: '';
                //     flex-shrink: 0;
                // }

                .type {
                    font-weight: bold;
                    font-size: 18px;
                    color: #00BCFF;
                    margin-left: 10px;
                }

                .title {
                    flex: 1;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    font-size: 20px;
                    color: #333333;
                    width: 100%;
                    margin-left: 10px;
                }

                .right {
                    flex-shrink: 0;
                    display: flex;
                    align-items: center;
                    margin-left: 30px;

                    &>p {
                        margin-left: 20px;
                        display: flex;
                        align-items: center;

                        img {
                            width: 18px;
                            height: 16px;
                        }

                        span {
                            font-size: 18px;
                            color: #333333;
                            margin-left: 10px;
                        }
                    }
                }

                &.unread {
                    &::before {
                        width: 45px;
                        height: 22px;
                        background: #F21111;
                        font-size: 14px;
                        color: #FFF;
                        content: '未读';
                        border-radius: 5px;
                        overflow: hidden;
                        line-height: 22px;
                        text-align: center;
                    }

                    .title {
                        font-weight: bold;
                    }
                }
            }
        }
    }
}
</style>

<template>
<div class="staging">
    <padHeader class="head" @doSearch="doSearch"></padHeader>
    <commonNews kind="0" v-if="leaderType == 1"></commonNews>
    <commonNews kind="1" v-if="leaderType == 2"></commonNews>
    <leaderNews v-if="leaderType == 3"></leaderNews>
</div>
</template>

<script>
import padHeader from './padHeader.vue';
import commonNews from './commonNews.vue';
import leaderNews from './leaderNews.vue';
export default {
    name: 'deptNews',
    components: {
        padHeader,
        commonNews,
        leaderNews
    },
    data() {
        return {
            leaderType: "",
            listId: "",
            moduleId: ""
        };
    },
    computed: {},
    watch: {},
    methods: {
        changeTab(item, index) {
            this.tabIndex = index
        },
        initNews() {
            let self = this;
            dsf.http.get(`/fn/developmentOffice/insiderNews`, {
                    kind: parseInt(this.leaderType) - 1
                })
                .done(res => {
                    console.log(res)
                    if (res.code == "200") {
                        self.listId = res.data.listId
                        self.moduleId = res.data.moduleId
                    }
                }).error(err => {

                })
        },
        doSearch(keyword) {
            console.log(this.listId, this.moduleId)
            this.$router.push({
                name: `commonList`,
                params: {
                    listId: this.listId,
                    moduleId: this.moduleId
                },
                query: {
                    LMTYPE: "",
                    keyword: keyword
                }
            });
        }
    },
    created() {},
    mounted() {
        let that = this
        dsf.http.post(`/fn/developmentOffice/getUserInfo`, {}, {
                headers: {
                    "Content-Type": "application/json"
                }
            })
            .done(res => {
                let user = res.data
                if (user && user.roleIds) {
                    if (user.roleIds.indexOf("230627095759f5cY667vnP31Rv0eK8c") >= 0) {
                        that.leaderType = 3
                    } else if (user.roleIds.indexOf("230627095352FHXYAXqiebsqC4ARTHS") >= 0) {
                        that.leaderType = 2
                    } else {
                        that.leaderType = 1
                    }
                    that.initNews()
                }
            }).error(err => {
                alert("未获取到用户信息")
            })

        window.addEventListener("resize", () => {
            let doc = window.document
            let docEl = doc.documentElement
            let rem = docEl.clientWidth / 128 * 5
            docEl.style.fontSize = rem + 'px'
        })
    },
    destroyed() {},
}
</script>

<style lang="scss" scoped>
.staging {
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-direction: column;
    background: url('../../../../static/images/project/fgwPad/bg.png') no-repeat;
    background-size: 100% 100%;
    overflow: hidden;

    .head {
        flex-shrink: 0;
    }

    .rightContent {
        flex: 1;
        margin-left: 30px;
        height: 100%;
    }

    .leftTab {
        width: 115px;
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;

        .tabItem {
            width: 115px;
            height: 115px;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            margin: 20px 0;

            img {
                width: 50px;
                height: 50px;
            }

            span {
                font-size: 18px;
                color: #FFFFFF;
                opacity: 0.5;
            }

            &.active {
                span {
                    opacity: 1;
                }
            }
        }
    }

    .contain {
        width: 100%;
        height: calc(100vh - 75px);
        box-sizing: border-box;
        padding: 20px 25px;
        overflow: hidden;
        display: flex;
        justify-content: space-between;

        .newsLeft {
            width: 510px;
            height: 100%;
            overflow: hidden;
            display: flex;
            flex-direction: column;

            .swiperbox {
                width: 510px;
                height: 290px;
                border-radius: 10px;
                overflow: hidden;
                flex-shrink: 0;

                /deep/ .van-swipe__indicators {
                    right: 15px;
                    left: auto;
                    transform: translateX(0);
                    bottom: 15px;

                    .van-swipe__indicator {
                        width: 8px;
                        height: 8px;
                        opacity: 1 !important;

                        &.van-swipe__indicator--active {
                            width: 22px;
                            height: 8px;
                            border-radius: 4px;
                            background: #FC1212 !important;
                        }
                    }
                }

                .my-swipe .van-swipe-item {
                    width: 510px;
                    height: 290px;
                    position: relative;

                    img {
                        width: 100%;
                        height: 290px;
                    }

                    p {
                        position: absolute;
                        height: 38px;
                        background: rgba($color: #000000, $alpha: 0.5);
                        box-sizing: border-box;
                        padding: 0 135px 0 15px;
                        overflow: hidden;
                        bottom: 0;
                        z-index: 1;
                        left: 0;
                        right: 0;

                        span {
                            display: block;
                            line-height: 38px;
                            font-size: var(--font_size_2);
                            color: #FFFFFF;
                            width: 100%;
                            overflow: hidden;
                            text-overflow: ellipsis;
                            white-space: nowrap;
                        }
                    }
                }
            }

        }

        .newsRight {
            width: 700px;
            height: 100%;
            background: #FFFFFF;
            box-shadow: inset 0 0 50px 0 #92C9FF;
            border-radius: 10px;
            overflow: auto;
            display: flex;
            flex-direction: column;
        }

        .newslist {
            width: 100%;
            height: 100%;
            overflow: hidden;
            box-sizing: border-box;
            padding: 20px;
            display: flex;
            flex-direction: column;

            &.leftarc {
                background: #FFFFFF;
                box-shadow: inset 0 0 50px 0 #92C9FF;
                border-radius: 10px;
                margin-top: 20px;
            }

            .newsTab {
                width: 100%;
                height: 44px;
                display: flex;
                align-items: center;
                justify-content: space-between;
                flex-shrink: 0;

                .tab {
                    display: flex;
                    align-items: center;

                    span {
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        height: 44px;
                        padding: 0 10px;
                        font-size: var(--font_size_0);
                        margin-right: 10px;

                        &.active {
                            background: rgba(2, 84, 178, 0.09);
                            border-radius: 5px;
                            color: #0254B2;
                            font-weight: bold;
                        }
                    }
                }

                .more {
                    font-size: var(--font_size_0);
                    color: #666666;
                    cursor: pointer;
                }
            }

            .newsArt {
                width: 100%;
                margin-top: 20px;
                flex: 1;
                overflow-y: auto;

                .newsArtItem {
                    width: 100%;
                    display: flex;
                    flex-direction: column;
                    margin-bottom: 30px;
                    margin-top: 10px;
                    cursor: pointer;

                    .msg {
                        width: 100%;
                        display: flex;
                        align-items: center;
                        justify-content: space-between;
                        margin-top: 10px;

                        p {
                            display: flex;
                            align-items: center;

                            img {
                                width: 16px;
                                height: 16px;
                            }

                            span {
                                font-size: var(--font_size_3);
                                color: #666666;
                                margin-left: 10px;
                            }
                        }
                    }

                    .title {
                        width: 100%;
                        overflow: hidden;
                        display: flex;
                        align-items: center;

                        &>label {
                            font-size: 18px;
                            color: #0086D9;
                            flex-shrink: 0;
                            margin-right: 10px;
                        }

                        span {
                            flex: 1;
                            overflow: hidden;
                            text-overflow: ellipsis;
                            white-space: nowrap;
                            font-size: 18px;
                            color: #333333;
                            width: 100%;

                        }

                        &.new {
                            font-weight: bold;

                            &::before {
                                content: 'NEW';
                                background: rgba(227, 0, 0, 0.10);
                                border: 1PX solid #E30000;
                                border-radius: 2px;
                                width: 44px;
                                height: 22px;
                                display: flex;
                                align-items: center;
                                justify-content: center;
                                font-size: var(--font_size_2);
                                color: #E30000;
                                flex-shrink: 0;
                                margin-right: 10px;
                            }
                        }
                    }
                }
            }
        }
    }
}
</style>

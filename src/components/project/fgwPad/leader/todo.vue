<template>
    <div class="container">
        <div class="list-content">
            <van-list :finished="finished" :finished-text="finishedTips" v-model="loading" @load="onLoad">
                <debounce-click v-for="(item, index) in list" :key="index">
                    <div :class="['flex', 'ac', 'list-item']" @click="goForm(item)">
                        <van-checkbox v-model="item.checked" shape="square" icon-size="16px"
                            v-if="showCheckAll"></van-checkbox>
                        <!-- <img src="static/images/project/fgwPad/fw.png" alt="" /> -->
                        <span class="icon iconfont iconfawen"
                            style="font-size:38px; margin:0px 10px; color:#087FE3;"></span>
                        <div class="main">
                            <div class="ellipsis title" :class="{ bold: !item.isRead }" style="font-weight: 700">
                                <img v-if="showJinJi(item)" :src="showJinJi(item)" class="jinji" />
                                <!-- <span>[{{ item.moduleName }}]</span> -->
                                <span>{{ item.bt }}</span>
                            </div>
                            <div class="flex jb sub-title">
                                <span v-if="item.opinion" style="width: 10rem">
                                    <!-- <img src="static/images/project/fgwPad/read.png" alt="" /> -->
                                    <span style="overflow: hidden">{{ item.opinion }}</span>
                                </span>
                                <span v-if="item.name" style="flex: 1">
                                    <img src="static/images/project/fgwPad/person.png" alt="" />
                                    {{ item.name }}
                                </span>
                                <span v-if="item.time">
                                    <img src="static/images/project/fgwPad/timer.png" alt="" />
                                    {{ item.time }}
                                </span>
                            </div>
                        </div>
                    </div>
                </debounce-click>
            </van-list>
            <commonempty v-show="!list.length && !loading"></commonempty>
        </div>
    </div>
</template>

<script>
import store from "@/common/util";
import oaScoketJs from "@/common/oaScoket";
import DebounceClick from "@/components/common/debounceClick.jsx";
export default {
    components: {
        DebounceClick,
    },
    props: {},
    data() {
        return {
            isLoading: false,
            finished: false,
            finishedTips: "",
            loading: false,
            start: 1,
            list: [],
            showFlowSend: false,
            selected: {},
            movingInfoId: "",
            canOpen: false,
            showMoving: false,
            canOpen: false,
            checkall: false,
            showCheckAll: false,
            checkedArr: [],
            oaScoket: {}
        };
    },
    created() { },
    mounted() {
        let self = this
        oaScoketJs.close();
        this.oaScoket = oaScoketJs.getInstance(this);
        this.oaScoket.onReceivedTodo(
            store.loadSessionStore("user").user_id,
            (data) => {
                self.onRefresh();
            }
        );
    },
    methods: {
        activated() {
            this.onRefresh();
        },
        openSwipe(val) {
            val.canOpen = false;
        },
        showJinJi(item) {
            const jinjiPng = "static/squMenu/jinji.png";
            const tejiPng = "static/squMenu/teji.png";
            if (item.urgent == 2 || item.urgent == 3) {
                return jinjiPng;
            } else if (
                item.isUrgent == 1 ||
                item.isUrgent == 2 ||
                item.isUrgent == 10
            ) {
                return jinjiPng;
            } else if (item.isUrgent == 3 || item.isUrgent == 4) {
                return tejiPng;
            }
            return "";
        },

        onRefresh() {
            this.finishedTips = "";
            this.finished = false;
            this.loading = true;
            this.list = [];
            this.start = 1;
            this.getList();
        },
        onLoad() {
            this.getList();
        },
        getList() {
            let params = {
                limit: 15,
                page: this.start,
                fileType: "gw",
                showTotal: true,
            };
            dsf.http
                .get("fn/mobileToDoAndRead/getToDoAndReadList2", params)
                .then((res) => {
                    let total = res.data.total;
                    let datas = res.data.datas ?
                        res.data.datas.map((item) => {
                            item.dataValue.bt = item.dataValue.bt.replace("[公文运转]", "")
                            item.dataValue.canOpen = true;
                            return item.dataValue;
                        }) : [];
                    this.start += 1;
                    this.total = total || 0;
                    this.list = [...this.list, ...datas];
                    if (this.list.length === total) {
                        // 加载结束
                        this.finished = true;
                    }
                })
                .finally(() => {
                    this.loading = false;
                    this.isLoading = false;
                });
        },
        goForm(item) {
            this.$router.push({
                name: "commonForm",
                params: {
                    pk: item.info_id,
                    moduleId: item.moduleId,
                },
                query: {
                    type: "gw",
                    todoId: item.todoId,
                },
            });
        },
    },
};
</script>

<style lang="scss" scoped>
.container {
    padding: 0 4px 10px;
    height: 100%;
    position: relative;

    .handle-top {
        width: calc(100% + 8px);
        margin-left: -4px;
        height: 60px;
        background: #f5f5f5;
        display: flex;
        align-items: center;

        .checkall {
            background: #359edb;
            padding: 5px 10px;
            border-radius: 2px;
            color: #ffffff;
            font-size: 16px;
            margin-left: 50px;
        }

        .checkBox {
            display: flex;
            align-items: center;
            margin-left: 27px;

            .exitCheckall {
                background: #ffffff;
                padding: 5px 10px;
                margin: 0 5px;
                border-radius: 2px;
                color: #333333;
                font-size: 16px;
                border: 1px solid #bababa;
                margin-left: 22px;
            }
        }
    }

    .list-content {
        height: 100%;
        overflow-y: auto;

        &::-webkit-scrollbar {
            width: 5px;
            background-color: #efefef;
        }

        &::-webkit-scrollbar-track {
            background-color: #efefef;
        }

        &::-webkit-scrollbar-thumb {
            background: #cbcbcb;
        }

        /deep/.van-empty__description {
            font-size: 18px;
        }

        .van-pull-refresh {
            min-height: 100%;
        }

        /deep/.van-swipe-cell {
            width: calc(100% - 44px);
            margin: 0 auto;
        }

        .list-item {
            // margin: 0 22px;
            padding: 22px 0;
            position: relative;

            /deep/.van-checkbox {
                margin-right: 10px;
            }

            &::after {
                position: absolute;
                box-sizing: border-box;
                content: " ";
                pointer-events: none;
                right: 0;
                bottom: 0;
                left: 30px;
                border-bottom: 1px solid #cfcfcf;
                -webkit-transform: scaleY(0.5);
                transform: scaleY(0.5);
            }

            >img {
                width: 55px;
                height: 55px;
                margin-right: 10px;
            }

            .main {
                flex: 1;
                overflow: hidden;
                padding: 0 84px 0 0;
                box-sizing: border-box;
            }

            .bold {
                font-weight: 800;
            }

            .title {
                font-size: 22px;
                color: #333;
                padding-bottom: 10px;

                >img {
                    width: auto;
                    height: 21px;
                    display: inline-block;
                }
            }

            .sub-title {
                color: #666;
                font-size: 16px;
                line-height: 23px;
                padding: 0 20px 0 0;
                box-sizing: border-box;

                >span {
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;

                    img {
                        width: 18px;
                        height: 18px;
                        margin-right: 10px;
                        display: inline-block;
                        vertical-align: text-top;
                    }

                    .signStatus {
                        font-size: 16px;
                        color: #337dc6;
                        width: 69px;
                        height: 23px;
                        display: inline-block;
                        text-align: center;
                        line-height: 23px;
                        margin-left: 14px;
                        background: #e7f2fd;
                        border-radius: 2px;
                    }
                }
            }

            .status {
                width: 60px;
                // text-align: right;
                display: flex;
                align-items: center;
                justify-content: space-between;
                margin-left: 20px;

                img {
                    width: 32px;
                    height: auto;
                }

                span {
                    width: 16px;
                    height: 16px;
                    background-color: #e52e2e;
                    border-radius: 50%;
                    display: inline-block;
                }
            }
        }

        .canOpen {
            // border-right: 2px solid #0086D9;
            position: relative;

            &::before {
                position: absolute;
                box-sizing: border-box;
                content: " ";
                pointer-events: none;
                right: 0;
                bottom: 0;
                top: 7px;
                width: 3px;
                background: #0484d1;
            }
        }

        .ds-card-rightbtn {
            height: 100%;
            width: 100%;
            display: flex;
            flex: 1;
            align-items: flex-end;

            .dsf-button-item {
                width: 80px;
                height: calc(100% - 7px);
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;

                img {
                    width: 34px;
                    height: 34px;
                }

                span {
                    display: block;
                    text-align: center;
                    margin-top: 6px;
                    font-size: 17px;
                    color: #ffffff;
                    font-weight: 400;
                    // width: 40px;
                    table-layout: fixed;
                    word-wrap: break-all;
                    word-break: normal;
                    overflow: hidden;
                }

                &.btn-lzqk {
                    background: #0484d1;
                }

                &.btn-hms {
                    background: #0aa3ff;
                }

                &.btn-th {
                    background: #b6b6b6;
                }

                &.btn-sc {
                    background: #09c399;
                }
            }
        }
    }

    .foot-button {
        display: flex;
        position: absolute;
        bottom: 7px;
        left: 50%;
        transform: translateX(-50%);

        div {
            background: #3397d7;
            padding: 6px 12px;
            margin: 0 5px;
            border-radius: 3px;
            color: #ffffff;
            font-size: 16px;
            box-shadow: 0px 0px 6px 0px rgba(226, 226, 226, 0.5);
        }
    }
}

::v-deep .van-checkbox__icon--checked .van-icon {
    background-color: #0091ff;
    border-color: #0091ff;
}
</style>

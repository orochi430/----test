<template>
<div class="daiban">
    <div class="tabHeader">
        <div class="tabDiv">
            <div class="item" @click="changeTab(item.type)" :class="{ active: item.type == tabIndex }" v-for="item in tabList" :key="item.type">
                <span>{{ item.name }}</span>
                <label class="tipNum" v-if="item.total && item.total > 0">{{
            item.total
          }}</label>
            </div>
        </div>
        <!-- <div class="moreDiv">更多</div> -->
    </div>
    <div class="fileLists">
        <div class="disk-file-list">
            <commonempty v-if="list.length == 0 && !loading" />
            <van-list v-model="loading" :finished="finished" finished-text="" @load="onLoad">
                <padList :list="list" :isDaiBan="true"></padList>
            </van-list>
        </div>
    </div>
</div>
</template>

<script>
import padList from "./padList.vue";
export default {
    name: "daiban",
    components: {
        padList,
    },
    data() {
        return {
            tabIndex: 1,
            tabList: [{
                    name: "待办事项",
                    total: 0,
                    type: 1,
                },
                {
                    name: "暂不提醒",
                    total: 0,
                    type: 2,
                },
            ],
            list: [],
            finished: false,
            loading: false,
            refreshing: false,
            page: 0,
            limit: 5,
            timer: null
        };
    },
    computed: {},
    watch: {},
    methods: {
        changeTab(type) {
            this.tabIndex = type;
            this.doRefresh();
        },
        doRefresh() {
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
                    .post(`/fn/developmentOffice/todoData`, {
                        kind: this.tabIndex,
                        bt: '',
                        page: this.page
                    })
                    .then(({
                        data
                    }) => {
                        // console.log(data);
                        if (data.code == 200) {
                            if (data && data.data && data.data.length > 0) {
                                data.data.forEach((item) => {
                                    item.time = item.time ?
                                        moment(new Date(item.time)).format("YYYY-MM-DD") :
                                        "";
                                });

                                this.list = this.list.concat(data.data);
                                let filtArr = this.list.filter((item) => item.whetherRead == 0);
                                this.tabList[0].total = filtArr.length || 0;
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
    },
    created() {},
    mounted() {},
    destroyed() {},

};
</script>

<style lang="scss" scoped>
.daiban {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    .nodata {
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;

        img {
          width: 250px;
        }

        span {
            font-size: var(--font_size_2);
            color: #999999;
            margin-top: 15px;
        }
    }

    .tabHeader {
        width: 100%;
        height: 54px;
        background: url("../../../../static/images/project/fgwPad/wxz.png") no-repeat;
        background-size: 100% 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        box-sizing: border-box;
        padding-right: 15px;

        .moreDiv {
            font-size: var(--font_size_0);
            color: #ffffff;
            cursor: pointer;
        }

        .tabDiv {
            display: flex;
            position: relative;

            .item {
                display: flex;
                align-items: center;
                justify-content: center;
                width: 160px;
                height: 60px;
                position: relative;
                cursor: pointer;

                span {
                    font-size: 24px;
                    color: #ffffff;
                    line-height: 54px;
                    width: 107px;
                    text-align: center;
                }

                label {
                    width: 30px;
                    height: 20px;
                    background-image: linear-gradient(180deg, #f26a51 2%, #ff3b30 98%);
                    border-radius: 10px 10px 10px 0;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: var(--font_size_3);
                    color: #fff;
                    position: absolute;
                    right: 0;
                    top: 10px;
                }

                &.active {
                    width: 190px;
                    height: 60px;
                    background: url("../../../../static/images/project/fgwPad/xzz.png") no-repeat;
                    background-size: 100% 100%;
                    position: relative;
                    box-sizing: border-box;
                    padding-top: 4px;
                    top: -2px;
                    display: flex;
                    align-items: center;
                    justify-content: flex-start;

                    label {
                        right: 35px;
                        top: 10px;
                    }

                    span {
                        height: 54px;
                        box-sizing: border-box;
                        display: flex;
                        justify-content: center;
                        border-bottom: 4px solid #0b7eed;
                        font-size: 24px;
                        color: #333333;
                        line-height: 54px;
                        margin-left: 35px;
                    }
                }

                &:nth-child(1) {
                    &.active {
                        background: url("../../../../static/images/project/fgwPad/xz.png") no-repeat;
                        background-size: 100% 100%;
                    }
                }
            }
        }
    }

    .fileLists {
        width: 100%;
        height: calc(100% - 54px);
        background: #ffffff;
        box-shadow: inset 0 0 50px 0 #92c9ff;
        border-radius: 0 0 10px 10px;
        overflow: hidden;

        .disk-file-list {
            width: 100%;
            height: 100%;
            overflow-y: auto;
        }
    }
}
</style>

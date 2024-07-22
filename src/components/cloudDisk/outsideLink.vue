<template>
<div class="recycle">
    <van-nav-bar title="回收站" left-text="返回" left-arrow @click-left="onClickLeft">
        <template #right>
            <van-image width="24" height="24" :src="moreSvg" @click="show=true" />
        </template>
    </van-nav-bar>
    <div class="commonHead">
        <div class="title">外链管理</div>
        <div class="top">
            <van-dropdown-menu active-color="#3296fa">
                <van-dropdown-item v-model="company" :options="option" />
            </van-dropdown-menu>
        </div>
    </div>
    <div class="files">
        <van-pull-refresh v-model="refreshing" :disabled="finished" @refresh="doRefresh">
            <van-list v-model="loading" :finished="finished" finished-text="" @load="onLoad">
                <div class="dongtai">
                    <div class="file" v-for="(item,index) in list" :key="index">
                        <img class="icon" src="../../assets/imgs/logo_xizang.jpg" alt="" srcset="">
                        <div>
                            <p>
                                <span class="ydq">孟旭在“【战略】一体</span>
                                <span>2022/01/05到期 7.8MB</span>
                            </p>
                            <van-image :src="moreFileSvg"></van-image>
                        </div>
                    </div>
                </div>
            </van-list>
        </van-pull-refresh>
    </div>
    <van-popup v-model="show" closeable round close-icon="close" position="bottom">
        <div class="paixu">
            <span class="title">排序</span>
            <p class="buttons">
                <span class="active">时间排序</span>
                <span>名称排序</span>
            </p>
            <span class="title">操作</span>
            <p class="buttons">
                <span>多选</span>
                <span style="color: #e50012;">清空回收站</span>
            </p>
        </div>

    </van-popup>
</div>
</template>

<script>
import CommonHead from './commonHead.vue'
export default {
    name: 'outsideLink',
    components: {
        CommonHead,
    },
    data() {
        return {
            moreSvg: require('../../assets/imgs/cloudDisk/more.svg'),
            moreFileSvg: require('../../assets/imgs/cloudDisk/more-file.svg'),
            company: 0,
            option: [{
                    text: '梦创双杨',
                    value: 0
                },
                {
                    text: '新款商品',
                    value: 1
                },
                {
                    text: '活动商品',
                    value: 2
                },
            ],
            keyword: '',
            showDialog: false,
            list: [],
            finished: false,
            loading: false,
            refreshing: false,
            start: 1,
            limit: 15,
            show: false
        };
    },
    computed: {},
    watch: {},
    methods: {
        onClickLeft() {
            this.$router.go(-1)
        },
        onLoad() {
            setTimeout(() => {
                for (let i = 0; i < 10; i++) {
                    this.list.push(this.list.length + 1);
                }

                // 加载状态结束
                this.loading = false;

                // 数据全部加载完成
                if (this.list.length >= 40) {
                    this.finished = true;
                }
            }, 1000);
        },
        // 下拉刷新处理函数
        doRefresh(title) {
            this.keyword = title
            this.page = 1
            this.list = []
            // 清空列表数据
            this.finished = false;

            // 重新加载数据
            // 将 loading 设置为 true，表示处于加载状态
            this.loading = true;
            this.onLoad();
        },
    },
    created() {},
    mounted() {},
    destroyed() {},
}
</script>

<style lang="scss" scoped>
.commonHead {
    width: 100%;
    height: auto;
    box-sizing: border-box;
    background: #fff;

    .title {
        font-size: 18px;
        font-weight: bold;
        color: #000;
        box-sizing: border-box;
        padding: 14px 14px 0 14px;
    }

    .capacity {
        font-size: 11px;
        color: #A2A3A4;
        display: flex;
        align-items: center;
        margin-top: 8px;

        img {
            width: 5px;
            height: 8px;
            margin-left: 2.5px;
        }
    }

    .van-search {
        height: 30px;
        padding: 0;
        border-radius: 3px;
        background: #E9EBEC;

        .van-search__content {
            background-color: transparent;
            height: 100%;
            padding: 0 0 0 10px;

            ::v-deep input {
                color: #fff;

                &::placeholder {
                    color: #CCCCCC;
                }
            }
        }
    }

    .tipText {
        width: 100%;
        height: 40px;
        background: #F2F2F5;
        font-size: var(--font_size_4);
        color: #A2A3A4;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .top {
        box-sizing: border-box;
        width: 100%;
        padding: 8px 14px 0 14px;
        height: 30px;
    }
}

::v-deep .van-dropdown-menu__bar {
    box-shadow: none;
    height: 20px;

    .van-dropdown-menu__item {
        justify-content: flex-start;
    }

    .van-dropdown-menu__title {
        font-size: var(--font_size_4);
        color: #747577;
        font-weight: 500;
        padding: 0 5px 0 0;

        &::after {
            border-color: transparent transparent #747577 #747577;
        }
    }
}

.dialog-box {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 20px 0;

    span {
        font-size: 13px;
        color: #171A1D;
        letter-spacing: 1px;
        text-align: center;
        font-weight: 600;
        margin: 0 0 11px 0;
    }

    p {
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: var(--font_size_4);
        color: #747577;
        letter-spacing: 1px;
        font-weight: 400;
        margin: 4px 0;

        label {
            font-size: var(--font_size_4);
            color: #171A1D;
            letter-spacing: 0;
            font-weight: 400;
            margin-left: 5px;
        }
    }
}

.recycle {

    .files {
        width: 100%;
        height: calc(100vh - 114px);
        overflow-y: auto;
        background: #FFF;

        .dongtai {
            width: 100%;
            height: auto;
            box-sizing: border-box;
            padding: 0 14px;

            .file {
                display: flex;
                align-items: center;
                justify-content: space-between;

                .icon {
                    width: 38px;
                    height: 38px;
                    flex-shrink: 0;
                }

                &>div {
                    display: flex;
                    align-items: center;
                    flex: 1;
                    justify-content: space-between;
                    margin-left: 14px;
                    border-bottom: 1PX solid rgba(224, 226, 228, 1);
                    box-sizing: border-box;
                    padding: 14px 0;

                    /deep/ .van-image {
                        width: 24px;
                        height: 24px;
                        flex-shrink: 0;
                    }

                    p {
                        display: flex;
                        flex-direction: column;
                        flex: 1;
                        margin-right: 20px;

                        &>span:first-child {
                            font-size: var(--font_size_3);
                            color: #171A1D;
                            line-height: 20px;
                            display: flex;
                            align-items: center;

                            &::after {
                                content: '已到期';
                               padding: 5px 3px;
                                background: #C0C1C1;
                                border-radius: 3px;
                                text-align: center;
                                line-height: 16px;
                                font-size: 10px;
                                color: #FFFFFF;
                                flex-shrink: 0;
                            }
                        }

                        &>span:last-child {
                            font-size: var(--font_size_4);
                            color: #A2A3A4;
                            display: flex;
                            align-items: center;

                            label {
                                font-size: var(--font_size_4);
                                color: #A2A3A4;
                                margin-left: 10px;
                            }
                        }
                    }
                }
            }
        }
    }
}

.paixu {
    width: 100%;
    height: auto;
    box-sizing: border-box;
    padding: 20px 14px;
    display: flex;
    flex-direction: column;

    .title {
        font-size: var(--font_size_4);
        color: #747577;
        margin-top: 14px;
    }

    .buttons {
        width: 100%;
        background: #f5f5f5;
        border-radius: 5px;
        margin-top: 14px;

        span {
            width: 100%;
            height: 40px;
            display: flex;
            align-items: center;
            color: #747577;
            font-size: var(--font_size_3);
            box-sizing: border-box;
            padding: 0 14px;

            &.active {
                color: #333;
                font-weight: bold;
            }
        }
    }
}
</style>

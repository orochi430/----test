<template>
<div class="mailListUser" :class="{'noHeader': !$store.state.isShowAppHeader}">
    <div class="users" v-for="(item,index) in list" :key="index">
        <van-image :src="require('./dept.svg')"></van-image>
        <div class="right">
            <p>{{item.name}}</p>
            <p>
                <span v-if="item.bgdh">
                    <van-icon name="phone" />
                    <a :href="'tel:'+item.bgdh">{{item.bgdh}}</a>
                </span>
                <span v-if="item.nxdh">
                    内线：<a :href="'tel:'+item.nxdh">{{item.nxdh}}</a>
                </span>

            </p>
        </div>
    </div>

    <!-- <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
        <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
            <div class="users" v-for="item in list" :key="item" :title="item">
                <van-image :src="require('./dept.svg')"></van-image>
                <div class="right">
                    <p>张三丰</p>
                    <p>
                        <span>
                            <van-icon name="phone" />
                            <a href="tel:15221070792">15221070792</a>
                        </span>
                        <span>
                            内线：<a href="tel:15221070792">0785-05487541</a>
                        </span>

                    </p>
                </div>
            </div>
        </van-list>
    </van-pull-refresh> -->
</div>
</template>

<script>
export default {
    name: 'mailListUser',
    components: {},
    data() {
        return {
            list: [],
            loading: false,
            finished: false,
            refreshing: false,
            level: "",
            value: ""
        };
    },
    computed: {},
    watch: {},
    methods: {
        onLoad() {
            setTimeout(() => {
                if (this.refreshing) {
                    this.list = [];
                    this.refreshing = false;
                }

                for (let i = 0; i < 10; i++) {
                    this.list.push(this.list.length + 1);
                }
                this.loading = false;

                if (this.list.length >= 40) {
                    this.finished = true;
                }
            }, 1000);
        },
        onRefresh() {
            // 清空列表数据
            this.finished = false;

            // 重新加载数据
            // 将 loading 设置为 true，表示处于加载状态
            this.loading = true;
            this.onLoad();
        },
        loadMailUser() {
            let that = this
            dsf.http.post("/fn/mailList/queryMailList", {
                level: this.level,
                fValue: this.value
            }).then(res => {
                console.log(res)
                if (res && res.status == 200) {
                    that.list = res.data.rows
                }
            });
        },
        goDetail(item) {
            item.userId = item.id
            this.$router.push({
                path: "mailDetail",
                query: {
                    userdata: JSON.stringify(item)
                }
            });
        }

    },
    created() {},
    mounted() {
        this.value = this.$route.params.value
        this.level = this.$route.params.level
        this.loadMailUser()
    },
    destroyed() {},
}
</script>

<style lang="scss" scoped>
@import '../../assets/styles/themes.scss';
@import '../../assets/styles/mixin.scss';

.mailListUser {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    top: 46px;
    overflow-y: auto;

    &.noHeader {
        top: 0 !important;
    }

    .users {
        width: 100%;
        height: 80px;
        box-sizing: border-box;
        padding: 10px 15px;
        border-bottom: 1px solid #ebebeb;
        display: flex;
        align-items: center;
        justify-content: space-between;
        background: #FFF;

        .van-image {
            width: 40px;
            height: 40px;
            flex-shrink: 0;

            img {
                width: 100%;
                height: 100%;
            }
        }

        .right {
            flex: 1;
            height: auto;
            display: flex;
            flex-direction: column;
            margin-left: 10px;

            &>p:first-child {
                font-size: var(--font_size_2);
                color: #333;
                font-family: 'Alibaba-PuHuiTi-Medium';
            }

            &>p:last-child {
                display: flex;
                align-items: center;
                margin-top: 5px;

                span {
                    display: flex;
                    align-items: center;
                    margin-right: 10px;
                    font-size: var(--font_size_3);

                    .van-icon {
                        font-size: var(--font_size_3);
                        @include font-theme('normal');
                        margin-right: 5px;
                    }

                    a {
                        font-size: var(--font_size_3);
                        color: #333333;
                    }
                }
            }
        }
    }
}
</style>

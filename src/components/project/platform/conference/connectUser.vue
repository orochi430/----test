<template>
    <div class="signDetail" :style="{height: `calc(100vh - ${$store.state.isShowAppHeader ? '0.92rem' : '0px'})`}">
        <van-search v-model="value" placeholder="搜索一下" @search="loadData" @clear="loadData" />
        <div class="userLists" :class="{'noHeader': $store.state.isShowAppHeader}">
            <div class="users" v-for="(item,index) in data" :key="index">
                <div class="title" @click="openDrop(index)" v-if='item.groupType=="1"'>
                    <div class="name">{{item.orgName}}</div>
                    <van-icon :class="{'active': item.show}" name="arrow-down" />
                </div>
                <div class="lists" v-if="!item.show">
                    <div class="userlist" v-for="(user,i) in item.users" :key="'user'+i">
                        <div class="imgs">
                            <img :src="dsf.url.getWebPath(user.img)" :onerror="default_avatar">
                        </div>
                        <div class="msgs">
                            <p>
                                <span>{{user.name}}
                                    <b v-if='item.phoneType=="0"'>（{{user.telephone}}）</b>
                                </span>
                            </p>
                            <p class="sub">
                                {{user.zwText}}
                            </p>
                        </div>
                        <div class="right" v-if='item.phoneType=="0" && dsf.config.clientType !="iPad"' @click="phoneTo(user.telephone)">
                            <van-icon color="#44D7B6" name="phone" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'connectUser',
    components: {},
    data () {
        return {
            active: 0,
            value: "",
            data: [],
            id: "",
            default_avatar: 'this.src="' + require('static/images/EnterpriseServices/default-avatar.png') + '"',
        };
    },
    computed: {},
    watch: {},
    methods: {
        openDrop (index) {
            if (this.data[index].show) {
                this.$set(this.data[index], "show", false)
            } else {
                this.$set(this.data[index], "show", true)
            }
        },
        loadData () {
            let that = this
            this.data = []
            this.$toast.loading("加载中");
            dsf.http.post("/fn/conferenceMobile/contactDetails", {
                meetingId: this.id,
                type: 0,
                query_key: this.value
            }).then(res => {
                console.log(res)
                that.$toast.clear()
                if (res && res.data && res.data.code == 200) {
                    that.data = res.data.data
                }
            });
        },
        onSearch () {
            if (!this.value) {
                return
            }
            this.loadData()
        },
        changeTab (name, title) {
            this.active = name
            this.value = ""
            this.loadData()
        },
        phoneTo(tel) {
            window.location.href = `tel:${tel}`
        },
    },
    created () { },
    mounted () {
        this.id = this.$route.params.id
        this.loadData()
    },
    destroyed () { },
}
</script>
<style lang="scss" >
.signDetail {
    .van-tabs__nav {
        .van-tab--active {
            color: #999 !important;
        }
        .van-tabs__line {
            display: none;
        }
    }
}
</style>
<style lang="scss" scoped>
.signDetail {
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    .userLists {
        flex: 1;
        background-color: #fff;
        overflow-y: auto;
        margin: 10px;
        &.noHeader {
            top: 142px;
        }

        .users {
            width: 100%;
            height: auto;
            overflow: hidden;

            .title {
                width: 100%;
                height: 35px;
                background: #ecf7f4;
                box-sizing: border-box;
                padding: 0 15px;
                display: flex;
                align-items: center;
                justify-content: space-between;
                border-bottom: 1px solid #ebebeb;

                .name {
                    font-size: 15px;
                    color: #333333;
                    font-family: 'Alibaba-PuHuiTi-Regular';
                }

                .van-icon {
                    font-size: var(--font_size_2);
                    color: #999999;
                    transition: all linear 0.2s;

                    &.active {
                        transform: rotate(-90deg);
                    }
                }
            }

            .lists {
                width: 100%;
                height: auto;

                .userlist {
                    padding: 20px 0;
                    margin: 0 15px;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    border-bottom: 1px solid #e1e1e1;
                    .imgs {
                        width: 40px;
                        height: 40px;
                        border-radius: 50%;
                        overflow: hidden;

                        img {
                            width: 100%;
                            height: 100%;
                        }
                    }

                    .msgs {
                        flex: 1;
                        margin-left: 12px;
                        height: 100%;
                        display: flex;
                        flex-direction: column;
                        .sub {
                            font-size: 13px;
                            color: #666666;
                        }
                        & > p:nth-child(1) {
                            display: flex;
                            align-items: center;

                            span {
                                font-size: 15px;
                                color: #333333;
                                font-family: 'Alibaba-PuHuiTi-Medium';

                                a {
                                    font-size: 15px;
                                    color: #333333;
                                }
                                b {
                                    font-weight: normal;
                                }
                            }

                            .van-icon {
                                font-size: var(--font_size_3);
                                color: #999999;
                                margin-left: 10px;
                            }
                        }

                        & > p:nth-child(2) {
                            display: flex;
                            align-items: center;
                            height: 18px;
                            margin-top: 5px;

                            & > span:first-child {
                                color: #03b98b;
                                font-size: var(--font_size_3);
                                height: 18px;
                                display: flex;
                                align-items: center;
                            }

                            & > span:last-child {
                                color: #666666;
                                font-size: var(--font_size_4);
                                margin-left: 10px;
                                height: 18px;
                                display: flex;
                                align-items: center;
                            }
                        }
                    }

                    .right {
                        flex-shrink: 0;
                        font-size: 24px;
                        color: #ff6200;

                        &.yqd {
                            color: #03b98b;
                        }
                    }
                }
            }
        }
    }
}
</style>

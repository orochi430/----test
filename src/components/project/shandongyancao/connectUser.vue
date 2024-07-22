<template>
<div class="signDetail">
    <van-tabs v-model="active" @change="changeTab">
        <van-tab title="参会联系人"></van-tab>
        <van-tab title="会务联系人"></van-tab>
    </van-tabs>
    <van-search v-model="value" placeholder="搜索一下" @search="loadData" @clear="loadData" />
    <div class="userLists" :class="{'noHeader': $store.state.isShowAppHeader}">
        <div class="users" v-for="(item,index) in data" :key="index">
            <div class="title" @click="openDrop(index)">
                <div class="name">{{item.orgName}}</div>
                <van-icon :class="{'active': item.show}" name="arrow-down" />
            </div>
            <div class="lists" v-if="!item.show">
                <div class="userlist" v-for="(user,i) in item.users" :key="'user'+i">
                    <div class="imgs">
                        <img :src="user.img" :onerror="default_avatar">
                    </div>
                    <div class="msgs">
                        <p>
                            <span>{{user.name}}（<a :href="'tel:'+user.telephone">{{user.telephone}}</a>）</span>
                        </p>
                        <p>
                            {{user.zwText}}
                        </p>
                    </div>
                    <div class="right">
                        <van-icon color="#03B98B" name="phone" />
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
export default {
    name: 'SDYCConnectUser',
    components: {},
    data() {
        return {
            active: 0,
            value: "",
            data: [],
            id:"",
            default_avatar: 'this.src="' + require('static/images/EnterpriseServices/zj_avatar.png') + '"',
        };
    },
    computed: {},
    watch: {},
    methods: {
        openDrop(index) {
            if (this.data[index].show) {
                this.$set(this.data[index], "show", false)
            } else {
                this.$set(this.data[index], "show", true)
            }
        },
        loadData() {
            let that = this
            this.data = []
            this.$toast.loading("加载中");
            dsf.http.post("/fn/sdycMeeting/contactDetails", {
                meetingId: this.id,
                type: this.active,
                query_key: this.value
            }).then(res => {
                console.log(res)
                that.$toast.clear()
                if (res &&  res.data && res.data.code == 200) {
                    that.data = res.data.data
                }
            });
        },
        onSearch() {
            if (!this.value) {
                return
            }
            this.loadData()
        },
        changeTab(name, title) {
            this.active = name
            this.value = ""
            this.loadData()
        }
    },
    created() {},
    mounted() {
        this.id = this.$route.params.id
        this.loadData()
    },
    destroyed() {},
}
</script>

<style lang="scss" scoped>
.signDetail {
    height: 100%;
    width: 100%;

    .userLists {
        position: absolute;
        left: 0;
        right: 0;
        bottom: 0;
        top: 95px;
        background: #FFF;
        overflow-y: auto;

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
                background: #ECF7F4;
                box-sizing: border-box;
                padding: 0 15px;
                display: flex;
                align-items: center;
                justify-content: space-between;
                border-bottom: 1PX solid #ebebeb;

                .name {
                    font-size: 15px;
                    color: #333333;
                    font-family: 'Alibaba-PuHuiTi-Regular';
                }

                .van-icon {
                    font-size: var(--font_size_2);
                    color: #999999;
                    transition: all linear .2s;

                    &.active {
                        transform: rotate(-90deg);
                    }
                }
            }

            .lists {
                width: 100%;
                height: auto;

                .userlist {
                    width: 100%;
                    height: auto;
                    padding: 15px 15px;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;

                    .imgs {
                        width: 50px;
                        height: 50px;
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

                        &>p:nth-child(1) {
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
                            }

                            .van-icon {
                                font-size: var(--font_size_3);
                                color: #999999;
                                margin-left: 10px;
                            }
                        }

                        &>p:nth-child(2) {
                            display: flex;
                            align-items: center;
                            height: 18px;
                            margin-top: 5px;

                            &>span:first-child {
                                color: #03B98B;
                                font-size: var(--font_size_3);
                                height: 18px;
                                display: flex;
                                align-items: center;
                            }

                            &>span:last-child {
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
                        font-size: var(--font_size_3);
                        color: #FF6200;

                        &.yqd {
                            color: #03B98B;
                        }
                    }
                }
            }
        }
    }

}
</style>

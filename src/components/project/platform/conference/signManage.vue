<template>
    <div class="signManage">
        <van-tabs v-model="active" @click='tanClick'>
            <van-tab v-for='(item,index) in tabArr' :key='index' :name='item.type' :title="`${item.typeName}(${item.count})`">
                <van-collapse v-model="activeNames" accordion :class="{oneReminder:active=='-1'&&detailArr.length!=0}">
                    <van-collapse-item v-for='(item,index) in detailArr' :key='index' :title="item.unitName" :name="index">
                        <ul class="signManage_ul">
                            <li v-for='(userItem,userIndex) in item.users' :key='userIndex+"a"'>
                                <img :src="userItem.img" alt="" :onerror="default_avatar">
                                <div class="signManage_ul_div">
                                    <span class="signManage_ul_name">{{userItem.name}}</span>
                                    <span v-show='userItem.time'>{{userItem.time}}</span>
                                </div>
                                <van-button type="info" v-show='userItem.singValue==-1' @click="signReminder(userItem.id)">提醒</van-button>
                            </li>
                        </ul>
                    </van-collapse-item>
                </van-collapse>

            </van-tab>
        </van-tabs>
        <div class="oneReminderBtn" v-show="active=='-1'&&detailArr.length!=0">
            <van-button type="info" @click="signReminder('')">一键提醒</van-button>
        </div>
    </div>
</template>

<script>
import store from "@/common/util";
export default {
    data () {
        return {
            active: '-1',
            meetingInfo: store.loadSessionStore("meeting"),
            tabArr: [],
            detailArr: [],
            activeNames: 0,
            default_avatar: 'this.src="' + require('static/images/EnterpriseServices/default-avatar.png') + '"',
        }
    },
    created () {
        this.getSignInTabs();
    },
    methods: {
        //签到tab
        getSignInTabs () {
            dsf.http.post(`fn/conferenceSignIn/signInTabs`, { meetingId: this.meetingInfo.id, scheduleId: this.$route.query.id }).done(res => {
                if (res.type == "success" && res.data) {
                    this.tabArr = res.data;
                    this.getSignInDetails();
                }
            }).error(error => {
                console.log("getAgendas-error", error);
            });
        },
        //签到情况
        getSignInDetails () {
            dsf.http.post(`fn/conferenceSignIn/signInDetails`, { meetingId: this.meetingInfo.id, scheduleId: this.$route.query.id, type: this.active, query_key: '' }).done(res => {
                if (res.type == "success" && res.data) {
                    this.detailArr = res.data;
                }
            }).error(error => {
                console.log("getAgendas-error", error);
            });
        },
        //tab切换
        tanClick (name, title) {
            this.active = name;
            this.detailArr = [];
            this.getSignInDetails();
        },
        //签到提醒
        signReminder (id) {
            dsf.http.post(`fn/conferenceSignIn/signInMessageReminder`, { meetingId: this.meetingInfo.id, scheduleId: this.$route.query.id, signInIds: id }).done(res => {
                if (res.type == "success") {
                    this.$toast.success(res.message)
                }
            }).error(error => {
                console.log(error);
            });
        }
    }
}
</script>
<style lang='scss' scoped>
.van-tabs {
    height: 100%;
}
.signManage {
    &_ul {
        padding: 6px 10px;
        padding-top: 0;
        li {
            height: 70px;
            line-height: 70px;
            border-bottom: 1px solid #ddd;
            display: flex;
            flex-direction: row;
            align-items: center;
            &:last-child {
                border-bottom: none;
            }
            img {
                display: inline-block;
                width: 50px;
                height: 50px;
                border-radius: 50%;
            }
            .signManage_ul_div {
                display: inline-block;
                margin-left: 15px;
                font-size: var(--font_size_3);
                color: #999;
                .signManage_ul_name {
                    color: #000;
                    font-size: var(--font_size_2);
                }
                span {
                    &:nth-of-type(1) {
                        margin-right: 10px;
                    }
                }
            }
        }
    }
    .oneReminder {
        margin-bottom: 55px;
    }
}
.oneReminderBtn {
    position: fixed;
    width: 100%;
    bottom: 0;
    background: #fff;
    .van-button {
        width: 100%;
        margin-bottom: 5px;
    }
}
</style>
<style lang='scss'>
.signManage {
    .van-collapse-item {
        .van-cell__title {
            font-weight: bold;
            color: #000;
            font-size: var(--font_size_2);
        }
        .van-collapse-item__content {
            padding: 0 0.32rem;
            color: #666;
        }
    }
    .signManage_ul {
        .van-button {
            height: 30px;
            line-height: 1;
            margin-left: auto;
            margin-right: 3px;
            padding: 0 12px;
        }
    }
}
</style>
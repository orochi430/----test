<template>
    <div class="signManage" :style="{height: `calc(100vh - ${$store.state.isShowAppHeader ? '0.92rem' : '0px'})`}">
        <div v-if="scheduleInfo" class="flex dc" style="overflow: hidden; height: 100%;">
            <div class="schedule-box">
                <div class="flex jb title">
                    <div>
                        <span :class="['tag', `tag_${scheduleInfo.singValue}`]">{{scheduleInfo.singValueText}}</span>
                        <span>{{scheduleInfo.bt}}</span>
                    </div>
                    <img src="@/assets/imgs/conference/home-exchange.png" alt="" @click="showList = true">
                </div>
                <div class="sub">默认签到时限：{{scheduleInfo.signTimeRange}}</div>
                <div class="btn-box">
                    <van-button type="default" @click="update(scheduleInfo.id, 2)">关闭</van-button>
                    <van-button type="info" @click="update(scheduleInfo.id, 1)">开始</van-button>
                </div>
            </div>
            <van-tabs v-model="active" @click='tanClick' style="overflow: hidden; flex: 1">
                <van-tab v-for='(tab,index) in tabArr' :key='index' :name='tab.type' :title="`${tab.typeName}(${tab.count})`">
                    <van-collapse v-model="activeNames" :class="{oneReminder:active=='-1'&&tab.users}">
                        <van-collapse-item v-for='(item,index) in tab.users' :key='index' :title="item.unitName" :name="index">
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
            <div class="oneReminderBtn" v-show="active=='-1'&&scheduleInfo.singValue != 2">
                <van-button type="info" @click="signReminder('')">一键提醒</van-button>
            </div>
        </div>
		<commonempty v-else />
        <van-popup v-model="showList" :get-container="'#app'" position="bottom" class="listPop">
            <van-nav-bar title="签到管理" @click-left="showList = false" fixed placeholder >
                <template #left>
                    <van-icon name="arrow-left" /><span>返回</span>
                </template>
            </van-nav-bar>
            <div class="schedule-box" v-for="schedule in scheduleList" :key="schedule.id" @click="scheduleInfo = schedule;showList = false">
                <div class="title">
                    <span :class="['tag', `tag_${schedule.singValue}`]">{{schedule.singValueText}}</span>
                    <span>{{schedule.bt}}</span>
                </div>
                <div class="sub">签到时限：{{schedule.signTimeRange}}</div>
                <div class="sub">签到情况：{{schedule.qdqk}}</div>
                <div class="btn-box">
                    <van-button type="default" @click.stop="update(schedule.id, 2)">关闭</van-button>
                    <van-button type="info" @click.stop="update(schedule.id, 1)">开始</van-button>
                </div>
            </div>
        </van-popup>
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
            activeNames: [0],
            default_avatar: 'this.src="' + require('static/images/EnterpriseServices/default-avatar.png') + '"',
            scheduleInfo: null,
            scheduleList: [],
            showList: false
        }
    },
    created () {
        this.getStatistics();
    },
    watch: {
        scheduleInfo: {
            handler(newValue, oldValue) {
                this.getSignInTabs(newValue.id)
            }
        }
    },
    methods: {
        // 签到列表
        getStatistics(scheduleId) {
            dsf.http.post('fn/conferenceMobile/getStatistics', {
                meetingId: this.meetingInfo.id
            }).then(res => {
                this.scheduleList = res.data.datas.map(item => {
                    item.dataValue.singValueText = item.dataValue.singValue == -1 ? '未开始' : (item.dataValue.singValue == 1 ? '进行中' : '已结束')
                    return item.dataValue
                })
                if(scheduleId) {
                    this.scheduleInfo = this.scheduleList.find(item => item.id == scheduleId)
                } else {
                    this.scheduleInfo = this.scheduleList.find(item => item.singValue != 2)
                    if(!this.scheduleInfo) this.scheduleInfo = this.scheduleList[0]
                }
            })
        },
        //签到tab
        getSignInTabs (scheduleId) {
            let loading = dsf.layer.loading()
            this.tabArr = []
            dsf.http.post(`fn/conferenceSignIn/signInTabs`, { meetingId: this.meetingInfo.id, scheduleId: scheduleId }).done(res => {
                if (res.type == "success" && res.data) {
                    this.tabArr = res.data;
                    let signInDetails = []
                    this.tabArr.forEach(tab => {
                        signInDetails.push(this.getSignInDetails(scheduleId, tab))
                    })
                    Promise.all(signInDetails).then(() => {
                        dsf.layer.closeLoading(loading)
                    })
                }
            }).error(error => {
                dsf.layer.toast('加载数据失败', false)
                console.log("getAgendas-error", error);
            });
        },
        //签到情况
        getSignInDetails (scheduleId, tab) {
            return dsf.http.post(`fn/conferenceSignIn/signInDetails`, { meetingId: this.meetingInfo.id, scheduleId: scheduleId, type: tab.type, query_key: '' }).done(res => {
                if (res.type == "success" && res.data) {
                    // this.detailArr = res.data;
                    this.$set(tab, 'users', res.data)
                }
            }).error(error => {
                console.log("getAgendas-error", error);
            });
        },
        //tab切换
        tanClick (name, title) {
            this.active = name;
            // this.detailArr = [];
            // this.getSignInDetails(this.scheduleInfo.id);
        },
        //签到提醒
        signReminder (id) {
            dsf.http.post(`fn/conferenceSignIn/signInMessageReminder`, { meetingId: this.meetingInfo.id, scheduleId: this.scheduleInfo.id, signInIds: id }).done(res => {
                if (res.type == "success") {
                    this.$toast.success(res.message)
                }
            }).error(error => {
                console.log(error);
            });
        },
        update(scheduleId, type) {
            dsf.layer.confirm({
                message: type == 1 ? '是否确认开始本场次签到' : '是否确认结束本场次签到',
                confirmButtonText: '确认'
            }, () => {
                dsf.http.post('fn/conferenceSignIn/updateMeetingSignIn', {
                    meetingId: this.meetingInfo.id,
                    scheduleId: scheduleId,
                    type: type
                }).then(res => {
                    if(res.data.code == 200) {
                        dsf.layer.toast(res.data.message)
                        this.getStatistics(scheduleId)
                    }
                })
            })
            
        }
    }
}
</script>
<style lang='scss' scoped>
.signManage {
    &_ul {
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
    width: 100%;
    background: #fff;
    .van-button {
        width: calc(100% - 20px);
        margin: 10px;
    }
}
.schedule-box {
    margin: 10px;
    padding: 16px;
    background-color: #fff;
    border-radius: 6px;
    .title {
        font-size: var(--font_size_2);
        color: #0062AB;
        align-items: baseline;
        .tag {
            padding: 3px 5px;
            border-radius: 4px;
            font-size: var(--font_size_4);
            margin-right: 6px;
            display: inline-block;
        }
        .tag_-1 {
            background: rrgba(247,181,0,0.23);;
            color: #FA6400;
        }
        .tag_1 {
            background: rgba(0,145,255,0.23);
            color: #0075CD;
        }
        .tag_2 {
            background: #D3D3D3;
            color: #fff;
        }
        img {
            width: 16px;
            height: auto;
            margin-left: 6px;
        }
    }
    .sub {
        font-size: 13px;
        color: #666666;
        padding-top: 10px;
    }
    .btn-box {
        margin-top: 10px;
        padding-top: 10px;
        border-top: 1px solid #cfcfcf;
        text-align: right;
        .van-button {
            height: 34px;
        }
    }
}
.signManage {
    ::v-deep .van-tabs__content {
        overflow: auto;
        height: 100%;
    }
    .van-collapse-item {
        margin: 10px;
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
.listPop {
    height: 100vh;
    background-color: #f7f7f7;
}
</style>
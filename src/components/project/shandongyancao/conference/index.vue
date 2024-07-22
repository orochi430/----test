<template>
    <div>
        <div v-if="errored" class="init-div">
            {{ errorMsg }}
        </div>
        <div v-else>
            <div v-if="meetings.length == 0">
                <commonempty :image="require('static/images/peopleCongress/img_hyap.png')" class="meeting-empty"
                    description="您近期无会议安排" />
            </div>
            <div v-else-if="meetingInfo">
                <div class="top-info">
                    <div v-if="false" class="opinion"
                        @click="$router.push({ name: 'peopleCongressOpinion', params: { meetingId: meetingInfo.id } })">
                        <span>意见建议</span>
                    </div>
                    <div class="avatar">
                        <img :src="avatar" :onerror="default_avatar" />
                    </div>
                    <div class="info">
                        <div class="name">{{ meetingInfo.userName }}
                            <!-- （{{ meetingInfo.userType }}） -->
                        </div>
                        <div class="title" @click="showPicker = true">
                            <span class="elps">{{ meetingInfo.title }}</span>
                            <img src="static/images/shandongyancao/conference/index-icon-exchange.png" alt="">
                        </div>
                        <div class="time">
                            {{ meetingInfo.startDate | dateFormat }}
                            至
                            {{ meetingInfo.endDate | dateFormat }}
                            共{{ days }}天
                        </div>
                    </div>
                    <div class="bg">
                        <!-- <img src="static/images/shandongyancao/conference/bg.png" /> -->
                        <van-image width="100%" height="100%" src="static/images/shandongyancao/conference/bg.png" />
                    </div>
                    <!-- <div class="pin"><img src="static/images/peopleCongress/dh.png" /></div> -->
                </div>
                <div class="news">
                    <van-notice-bar scrollable v-if="notice" left-icon="volume" @click="noticeGo">
                        <template #default>
                            <div>
                                {{
                                        notice.title
                                }}
                            </div>
                        </template><template #right-icon>
                            <div class="right-icon"
                                @click.stop="$router.push({ name: 'commonList', params: { listId: '220715172353N6VAZlAeuUem5uUWP3j', moduleId: '2207121034282kZRRAqk78L55VZmD9F' }, query: { secQuery: JSON.stringify({ fid: meetingInfo.id }) } })">
                                更多</div>
                        </template>
                    </van-notice-bar>
                </div>
                <div v-if="isShowMenu" class="menus">
                    <div v-for="(item, index) in showMenus" :key="index" @click="goUrl(item)">
                        <van-badge :dot="item.badge > 0"><img :src="item.img" alt /></van-badge>
                        <p>{{ item.name }}</p>
                    </div>
                </div>
                <module-item v-if="meetingInfo.isInProgress && false" title="今日日程"
                    @rightClick="$router.push({ name: 'peopleCongressSch', params: { meetingId: meetingInfo.id } })">
                    <template slot="default">
                        <template v-if="schedules.length > 0">
                            <div v-for="schedule in schedules" :key="schedule.time">
                                <schedule-item :schedule="schedule" :is-fold="true"></schedule-item>
                            </div>
                        </template>
                        <commonempty v-else :image="require('static/images/peopleCongress/img_rcap.png')"
                            class="schedule-empty" description="今日暂无日程安排  点击“更多”查看全部日程" />
                    </template>
                </module-item>
                <module-item v-else title="日程安排" :show-more="false"
                    @rightClick="$router.push({ name: 'peopleCongressSch', params: { meetingId: meetingInfo.id } })">
                    <template slot="default">
                        <all-schedule v-if="allSchedules.length > 0" :all-schedules="allSchedules" :is-fold="true">
                        </all-schedule>
                        <commonempty v-else :image="require('static/images/peopleCongress/img_rcap.png')"
                            class="schedule-empty" description="暂无日程安排" />
                    </template>
                </module-item>
                <module-item v-if="false" title="文件查阅"
                    @rightClick="$router.push({ name: 'peopleCongressFile', params: { meetingId: meetingInfo.id } })">
                    <template slot="default">
                        <template v-if="files.length > 0">
                            <div v-for="(file, index) in files" :key="file.title">
                                <file-item :file="file" :meeting-id="meetingInfo.id"></file-item>
                                <van-divider v-if="index < files.length - 1" />
                            </div>
                        </template>
                        <commonempty v-else :image="require('static/images/peopleCongress/img_zwwj.png')"
                            class="file-empty" description="暂无文件" />
                    </template>
                </module-item>
            </div>
            <van-popup v-model="showPicker" round position="bottom">
                <van-picker :columns="allMeetings" :swipe-duration="300" title="选择会议" show-toolbar value-key="title"
                    @cancel="showPicker = false" @confirm="onSwitchMeeting" :default-index="pickerDefaultIndex" />
            </van-popup>
        </div>

    </div>
</template>

<script>
// import { meetings, news } from "./test";
import { Badge } from "vant";
import moduleItem from "./components/moduleItem";
import fileItem from "./components/fileItem";
import scheduleItem from "./components/scheduleItem";
import allSchedule from "./schedule";
import store from "@/common/util";
export default {
    components: {
        moduleItem,
        fileItem,
        scheduleItem,
        allSchedule,
        [Badge.name]: Badge,
    },
    filters: {
        //日期格式化
        dateFormat: function (val) {
            if (!val) return "";
            /*
                关云龙 2021-10-8
                会议时间描述修改，目前的是01-24至01-30共7天，描述不严谨；需调整为“会议时间：1月24日至1月30日上午”。14:00 开始表示下午，含14:00，默认00:00 表示全天。

                00:00 全天
                00:01-13:59 上午
                14:00-23:59 下午
            */
            let str = dsf.date.format(val, "m月d日");
            let temp = dsf.date.parse(val);
            let allDay = dsf.date.parse(dsf.date.format(val, "yyyy-mm-dd") + " 00:00");
            let pm = dsf.date.parse(dsf.date.format(val, "yyyy-mm-dd") + " 14:00");
            if (temp.getTime() == allDay.getTime()) {
                // str += "全天";
            } else if (temp < pm) {
                str += "上午";
            } else {
                str += "下午";
            }
            return str;
        }
    },
    data() {
        return {
            id: this.$route.params.id,
            default_avatar: 'this.src="' + require('static/images/EnterpriseServices/default-avatar.png') + '"',
            avatar:
                dsf.url.getWebPath(
                    `/fn/mobilePhoto/download?id=${store.loadSessionStore("user").user_id
                    }&time=${new Date().getTime()}`
                )
            ,
            userName: dsf.util.loadSessionStore("user").name,
            files: [],
            schedules: [],
            allSchedules: [],
            noticeText: "",
            notice: null,
            meetingInfo: null,
            meetings: [],
            loading: null,
            errored: false,
            errorMsg: '发生错误，请稍后重试或联系系统管理员！',
            isFirstLoad: false, // 是否初次加载
            menus: dsf.config.meetingConfig.homePage.menu,
            showMenus: [],
            showPicker: false,
            allMeetings: []
        };
    },
    computed: {
        // 会议持续天数
        days: function () {
            return parseInt(dsf.date.diffDays(
                dsf.date.parse(this.meetingInfo.startDate),
                dsf.date.parse(this.meetingInfo.endDate)
            ) + 1);
        },
        // 是否显示菜单（仅代表大会需要）
        isShowMenu: function () {
            return this.$route.params.key == "1" || true
        },
        pickerDefaultIndex: function () {
            if (this.meetingInfo) {
                return this.allMeetings.findIndex(item => item.id == this.meetingInfo.id)
            } else {
                return 0;
            }
        }
    },
    created() {
        let self = this;
        self.loadData();
        self.isFirstLoad = true;
    },
    mounted() { },
    activated() {
        let self = this;
        // 刷新首页
        if (!self.isFirstLoad) {
            self.loadData();
        }
        self.isFirstLoad = false;
    },
    methods: {
        loadData(meetingId) {
            let self = this;
            self.errored = false;
            self.loading = dsf.layer.loading();
            let url = `fn/sdycMeeting/meetingInfo`;
            if (dsf.config.staticJson.enbale && self.$route.params.key) { // 静态json数据特殊处理url
                url += `/${self.$route.params.key}`;
            }
            let paras = {};
            self.meetingInfo = store.loadSessionStore("meeting");
            if (meetingId) {
                paras.meetingId = meetingId;
            } else if (self.id) {
                paras.meetingId = self.id;
            } else if (self.meetingInfo && self.meetingInfo.id) {
                paras.meetingId = self.meetingInfo.id;
            } else {
                paras.meetingTypeId = self.$route.params.key;
            }
            // 获取会议信息
            dsf.http
                .post(url, paras)
                .done(result => {
                    if (result.type == "success") {
                        if (result.data.length > 0) {
                            self.meetings = result.data;
                            self.meetingInfo = self.meetings[0];
                            if (!self.meetingInfo.edpk) self.$router.replace("/SDYCConferenceED");
                            self.setMenu(self.meetingInfo);
                            store.saveToSessionStore("meeting", self.meetingInfo);
                        }
                    } else {
                        throw result.message;
                    }
                    return self.meetingInfo;
                })
                .done(meetingInfo => {
                    if (meetingInfo) {
                        self.getAgendas(meetingInfo.id);
                        self.getNotice(meetingInfo.id);
                        self.getSignRemind(meetingInfo.id);
                        self.getHistoryMeetings();
                    }
                })
                .error(error => {
                    self.errored = true;
                    self.errorMsg = error.message;
                    console.log("loadData-error", error);
                    // dsf.layer.toast("数据获取失败！");
                })
                .always(() => {
                    dsf.layer.closeLoading(self.loading);
                });
        },
        // 获取会议日程
        getAgendas(meetingId) {
            let self = this;
            dsf.http
                .post(`fn/sdycMeeting/myAgendas`, {
                    meetingId: meetingId
                })
                .done(result => {
                    if (result.type == "success" && result.data) {
                        self.allSchedules = result.data;
                    }
                }).error(error => {
                    console.log("getAgendas-error", error);
                });
        },
        // 获取通知公告
        getNotice(meetingId) {
            let self = this;
            dsf.http
                .post(`fn/sdycMeeting/notice`, {
                    meetingId: meetingId,
                    count: 1
                })
                .done(result => {
                    if (
                        result.type == "success" &&
                        result.data &&
                        result.data.length > 0 &&
                        result.data[0].title
                    ) {
                        // self.noticeText = news.map(item => item.title).join(",");
                        self.noticeText = result.data[0].title;
                        self.notice = result.data[0];
                    }
                }).error(error => {
                    console.log("getNotice-error", error);
                });
        },
        // 获取历史会议
        getHistoryMeetings() {
            let self = this;
            dsf.http
                .get(`fn/sdycMeeting/historyMeetings`)
                .done(result => {
                    if (result.type == "success" && result.data) {
                        self.allMeetings = result.data;
                    }
                }).error(error => {
                    console.log("getHistoryMeetings-error", error);
                });
        },
        // 获取会议签到提醒
        getSignRemind(meetingId) {
            let self = this;
            dsf.http
                .post(`fn/sdycMeeting/signRemind`, {
                    meetingId: meetingId
                })
                .done(res => {
                    if (res.type == "success"
                        && res.data
                        && res.data.length > 0) {
                        dsf.layer.toast("您有会议尚未签到", false, () => {
                            self.$router.push({
                                name: 'SDYCMeeting',
                                params: {
                                    id: meetingId
                                },
                                query: {
                                    showId: res.data[0].id
                                }
                            })
                        })
                    }
                }).error(error => {
                    console.log("getSignRemind-error", error);
                });
        },
        // 切换会议
        onSwitchMeeting(val) {
            let self = this;
            self.showPicker = false;
            self.isFirstLoad = true;
            // 重置“服务指南”
            // self.menus.find(item => item.id == 'hwsc').url = '';
            // self.loadData(val.id)
            self.$router.replace({
                name: 'SDYCConferenceIndex',
                params: {
                    id: val.id
                }
            })
        },
        goUrl(item) {
            let self = this;
            if (item.url) {
                if (item.id == "hwsc") { // 文件预览
                    if (item.url) {
                        self.$router.push({
                            name: 'dsfIframe',
                            params: {
                                url: item.url,
                                title: item.name
                            }
                        })
                    } else {
                        dsf.layer.toast(`请先上传${item.name}！`);
                    }
                } else {
                    self.$router.push(item.url);
                }
            } else {
                dsf.layer.toast(`功能开发中！`);
            }
        },
        setMenu(meetingInfo) {
            let self = this, file = meetingInfo.manual, url, menu, badge = 0;
            self.showMenus = [];
            meetingInfo.showModule.split(',').forEach((module, idx) => {
                menu = self.menus.find(menu => menu.id == module);
                if (menu) {
                    // 【我的消息】菜单角标
                    if (menu.id == "wdxx" && meetingInfo.msgUnReadCount > 0) {
                        badge = meetingInfo.msgUnReadCount;
                    } else {
                        badge = menu.badge;
                    }
                    if (menu.grant == 1) { // 授权
                        if (menu.id == "wdxx" && meetingInfo.isMeetingAdmin == "1") {
                            url = menu.urls.find(url => url.role == 1).url;
                        } else {
                            url = menu.urls.find(url => url.role == 0).url;
                        }
                    } else {
                        if (menu.id == "hwsc" && file.fileId) {
                            file.flowId = 0;
                            file.nodeId = -1;
                            url = dsf.url.getServerUrl(`fn/office/openMobileOffice?fileId=${file.fileId}&moduleId=${file.moduleId}&nodeId=${file.nodeId}&flowId=${file.flowId}&filename=${file.fileName}`);
                        } else {
                            url = menu.url;
                        }
                    }
                    self.showMenus.push({
                        id: menu.id,
                        img: menu.img,
                        name: meetingInfo.showModuleName.split(",")[idx],
                        url: self.getReplaceUrl(url, meetingInfo),
                        badge: badge
                    })
                }
            })
        },
        noticeGo() {
            let self = this;
            self.$router.push({
                path: `/commonForm/2207121034282kZRRAqk78L55VZmD9F/${self.notice.id}`,
                query: {
                    listId: `220715172353N6VAZlAeuUem5uUWP3j`,
                    fid: self.meetingInfo.id
                }
            });
        },
        getReplaceUrl(url, obj) {
            let userData = dsf.util.loadSessionStore("user");
            if (typeof url === "string") {
                let regex2 = /\[(.+?)\]/g; // [] 中括号
                if (url.match(regex2)) { // 有匹配才替换[]中的参数
                    url.match(regex2).forEach(element => {
                        let key = element.replace("[", "").replace("]", "")
                        if (window.vueObj.$route.params[key]) {
                            url = url.replace(element, window.vueObj.$route.params[key])
                        }
                        if (window.vueObj.$route.query[key]) {
                            url = url.replace(element, window.vueObj.$route.query[key])
                        }
                        if (obj[key]) {
                            url = url.replace(element, obj[key])
                        }
                    });
                }
                if (userData) {
                    url = url.replace("[user_id]", userData.user_id)
                        .replace("[userid]", userData.user_id)
                        .replace("[name]", userData.name)
                        .replace("[deptId]", userData.deptId)
                        .replace("[deptName]", userData.deptName)
                        .replace("[logName]", userData.logName)
                        .replace("[mobile]", userData.mobile)
                        .replace("[root_dept_id]", userData.root_dept_id)
                        .replace("[unitId]", userData.unitId)
                        .replace("[communityId]", userData.communityId);
                }
            }
            return url;
        }
    }
};
</script>

<style lang="scss" scoped>
.init-div {
    position: absolute;
    width: 100%;
    height: 20px;
    line-height: 20px;
    margin-top: -20px;
    top: 50%;
    left: 0;
    font-size: var(--font_size_2);
    color: #7f7a7a;
    text-align: center;
}

.top-info {
    height: 2.5rem;
    display: flex;
    padding: 0.5rem 0.3rem 0;
    position: relative;

    .opinion {
        position: absolute;
        top: 0.24rem;
        right: 0.3rem;
        background: rgba(255, 255, 255, 0.10);
        border: 1px solid #FFFFFF;
        border-radius: 24px;
        padding: 0.1rem 0.16rem;
        font-size: var(--font_size_4);
        color: #fff;
        z-index: 2;
    }

    .bg {
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        right: 0;
        z-index: 1;
        overflow: hidden;
    }

    .bg img {
        height: 100%;
    }

    .pin {
        position: absolute;
        right: 0.3rem;
        bottom: -0.3rem;
        z-index: 2;
        width: 1rem;
        height: 1rem;
    }

    .avatar {
        width: 1rem;
        height: 1rem;
        border: 1px solid #ffffff;
        border-radius: 50%;
        overflow: hidden;
        z-index: 2;
    }

    .info {
        color: #fff;
        padding-left: 0.3rem;
        z-index: 2;
        flex: 1;
        overflow: hidden;

        .name {
            // font-size: 0.3rem;
            // font-weight: bold;
            line-height: 0.5rem;
            padding: 3px 0;
        }

        .title {
            display: flex;
            font-size: var(--font_size_2);
            font-weight: bold;

            span {
                flex: 1;
            }

            img {
                display: inline-block;
                width: 20px;
                height: 20px;
            }

            .elps {
                display: -webkit-box;
                -webkit-line-clamp: 1;
                -webkit-box-orient: vertical;
                white-space: initial;
            }
        }

        .time {
            padding-top: 0.24rem;
            opacity: 0.8;
        }
    }
}

::v-deep.van-divider {
    margin: 0;
    padding: 0 16px;
    border-color: #ddd;
    background-color: #fff;
}

.meeting-empty {
    padding: 2rem 0;

    ::v-deep .van-empty__image {
        width: 4rem;
    }
}

.schedule-empty,
.file-empty {
    display: flex;
    flex-direction: row;
    padding: 0.2rem 0.5rem;

    ::v-deep .van-empty__image {
        flex: none;
    }

    ::v-deep .van-empty__description {
        padding: 0;
    }
}

.news {
    // position: absolute;
    width: 100%;
    // transform: translatey(-20px);
    z-index: 2;

    .van-notice-bar {
        border-radius: 5px;
        box-shadow: 0 10px 20px 0 rgba(0, 0, 0, 0.08);
        background-color: #fff;
        overflow: hidden;
        height: 0.8rem;
        padding: 0 0.32rem;
        font-size: var(--font_size_3);
        line-height: 0.48rem;
        // margin: 0 16px;

        .right-icon {
            color: #333;
        }

        ::v-deep .van-icon-volume {
            font-weight: bold;
            font-size: var(--font_size_0);
            color: #f00;
        }

        ::v-deep .van-notice-bar__content {
            font-weight: bold;
            color: #333;
        }
    }
}

.menus {
    background-color: #fff;
    display: flex;
    flex-wrap: wrap;
    padding-top: 0.4rem;

    >div {
        width: 25%;
        text-align: center;
        margin-bottom: 20px;

        img {
            display: inline-block;
            width: 54px;
        }
    }
}
</style>

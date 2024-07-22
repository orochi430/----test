<template>
<div class="attendance-page">
    <div class="attendance-content">
        <div class="signIn-box" v-if="active == 0">
            <div class="info">
                <div class="info-avatar">
                    <img :src="avatar" :onerror="default_avatar" />
                </div>
                <div class="info-msg">
                    <div class="name">{{ user.name }}</div>
                </div>
            </div>
            <div class="content">
                <div class="content-sign" :style="signStyleObject">
                    <div class="content-sign-container">
                        <div :class="['sign-btn', signInStatus ? 'update' : 'sign']" @click="signIn()">
                            <div class="title">{{ signInStatus ? '已打卡' : '上班打卡' }}</div>
                            <div class="time">{{ nowTime | dateFormat }}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="statistics-box" v-if="active == 1">
            <DefaultList ref="DefaultList" :params="listParams"></DefaultList>
        </div>
    </div>
    <div class="navi">
        <van-tabbar v-model="active">
            <van-tabbar-item>
                <span>签到打卡</span>
                <template #icon>
                    <i class="iconfont iconcalendar-check"></i>
                </template>
            </van-tabbar-item>
            <van-tabbar-item>
                <span>考勤统计</span>
                <template #icon>
                    <i class="iconfont iconchart-bar"></i>
                </template>
            </van-tabbar-item>
        </van-tabbar>
    </div>
</div>
</template>

<script>
import DefaultList from "@/components/documentCenter/DefaultList";
export default {
    name: 'jinganAttendance',
    components: {
        DefaultList
    },
    props: {},
    data() {
        return {
            isFirstLoad: false, // 是否初次加载
            active: 0,
            default_avatar: 'this.src="' +
                require("static/images/EnterpriseServices/avatar.png") +
                '"',
            avatar: dsf.url.getWebPath(
                `/fn/mobilePhoto/download?id=${dsf.util.loadSessionStore("user").user_id
        }&time=${new Date().getTime()}`
            ),
            user: dsf.util.loadSessionStore("user"),
            signStyleObject: {
                height: this.getSignHeight(),
            },
            btnDesc: "上班打卡",
            nowTime: new Date(),
            myTimer: null,
            signInStatus: false, //打卡状态 true已打卡 false未打卡
            listParams: {
                moduleId: "231030143312jAZimKcjnpJzxSm4bK8",
                listId: "231030144933P7tNP4KkJI7A8TbroI7",
                params: {
                    notLink: true,
                }
            },
            pk: ""
        }
    },
    filters: {
        //时间格式化
        dateFormat: function (val) {
            if (!val) return "";
            return dsf.date.format(val, "hh:ii:ss");
        },
    },
    created() {},
    mounted() {
        let self = this;
        self.isFirstLoad = true;
        self.init();
    },
    methods: {
        getSignHeight() {
            let totalHeight = `100vh`,
                diff = 4.3;
            if (this.$store.state.isShowAppHeader) diff += 0.92;
            return "calc(" + totalHeight + " - " + diff.toFixed(2) + "rem)";
        },
        setTime() {
            let self = this;
            self.myTimer = setInterval(() => {
                self.nowTime = new Date();
            }, 1000);
        },
        init() {
            let self = this;
            self.setTime();
            self.getMySignInfo();
        },
        getMySignInfo() {
            let self = this;
            dsf.http.get(`ctrl/attendanceManage/searchAttendance`, {
                userId: self.user.user_id,
                type: "1", //打卡类型：1:上班  2:下班
            }).then((res) => {
                if (res && res.data && res.data.code == 200 && res.data.data != null) {
                    self.signInStatus = true;
                    self.pk = res.data.data.id
                } else {
                    self.signInStatus = false;
                }
            });
        },
        signIn() {
            let self = this;
            self.user = dsf.util.loadSessionStore("user");
            if (self.signInStatus) {
                dsf.layer.confirm({
                        message: "是否更新打卡",
                        confirmButtonText: "确认",
                    },
                    () => {
                        self.clockIn();
                    }
                );
            } else {
                self.clockIn();
            }
        },
        clockIn() {
            let self = this;
            dsf.http.get(`ctrl/attendanceManage/addAttendance`, {
                pk: self.pk,
                type: "1", //打卡类型：1:上班  2:下班
            }).then((res) => {
                if (res && res.data) {
                    dsf.layer.toast(res.data.message, res.data.code == 200 ? true : false);
                    self.getMySignInfo();
                }
            });
        }
    },
    beforeRouteLeave(to, from, next) {
        // 清除定时器
        let self = this;
        if (self.myTimer) {
            clearInterval(self.myTimer);
        }
        next();
    },
    activated() {
        let self = this;
        console.log("signIn.vue-activated", "isFirstLoad ->", self.isFirstLoad);
        if (!self.isFirstLoad) self.init();
        self.isFirstLoad = false;
    },
    deactivated() {
        // 清除定时器
        let self = this;
        if (self.myTimer) {
            clearInterval(self.myTimer);
        }
    },
    computed: {},
    watch: {},
}
</script>

<style lang="scss" scoped>
.attendance-page {
    .attendance-content {
        .signIn-box {
            .van-icon {
                vertical-align: middle;
                margin-right: 3px;
            }

            .info {
                display: flex;
                justify-content: flex-start;

                &-avatar {
                    width: 1rem;
                    height: 1rem;

                    &>img {
                        border-radius: 50%;
                    }
                }

                &-msg {
                    width: calc(100vw - 3.8rem);
                    margin: 0px 8px;
                    display: flex;
                    align-items: center;

                    .name {
                        font-size: var(--font_size_0);
                        font-weight: bold;
                    }
                }
            }

            .info,
            .content {
                background-color: #fff;
                margin: 16px;
                padding: 16px;
                border-radius: 12px;
            }

            .content {
                &-sign {
                    min-height: 200px;
                    text-align: center;
                    display: flex;
                    justify-content: center;
                    align-items: center;

                    &-container {
                        .sign-btn {
                            display: flex;
                            flex-direction: column;
                            justify-content: center;
                            color: #fff;
                            width: 2.5rem;
                            height: 2.5rem;
                            border-radius: 50%;
                            margin: auto;

                            .title {
                                font-size: 0.35rem;
                            }

                            .time {
                                margin-top: 8px;
                            }
                        }

                        .sign {
                            background-image: linear-gradient(180deg, #5cbbfd 0%, #3389e0 100%);
                            box-shadow: 0px 4px 16px 0px rgba(130, 203, 255, 0.6);
                        }

                        .update {
                            background-image: linear-gradient(180deg, #32E9AF 0%, #16BD85 100%);
                            box-shadow: 0px 4px 16px 0px rgba(184, 235, 218, 0.6);
                        }
                    }
                }
            }
        }
    }

    .navi {
        height: 1rem;

        // .van-tabbar-item .iconfont {
        //   font-size: 0.5rem;
        // }
        .van-tabbar-item {
            .iconfont {
                font-size: 0.5rem !important;
            }

            ::v-deep .van-tabbar-item__icon {
                font-size: 0.5rem;
            }

            ::v-deep .van-tabbar-item__text {
                font-size: var(--font_size_4);
            }
        }
    }
}
</style>

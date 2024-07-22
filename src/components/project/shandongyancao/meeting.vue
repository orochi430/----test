<template>
<div class="meeting">
    <div class="content" v-if="data.length > 0">
        <div class="schedules">
            <div :class="{
            active: currentIndex == index,
            over: item.passDate
          }" v-for="(item, index) in data" :key="index" @click="changeItem(index)" :id="`tab-${index}`">
                <span>{{ formatDate(item.start_time, "mm/dd") }}</span>
                <p>{{ formatDate(item.start_time, "hh:ii") }}</p>
            </div>
        </div>
        <div class="meet" v-if="curItem.id">
            <div class="meet_title">{{ curItem.title }}</div>
            <div class="meet_time">
                {{ formatDate(curItem.start_time, "yyyy年mm月dd日 DD") }}
            </div>
            <div class="meet_info">
                <div class="meet_hour">
                    <div :class="['meet_start', { over: curItem.passDate }]">
                        <span>{{ formatDate(curItem.start_time, "hh:ii") }}</span>
                        <p>开始时间</p>
                    </div>
                    <div class="meet_yuji">
                        <p class="line"></p>
                        <span>预计{{
                  compareDate(curItem.start_time, curItem.end_time)
                }}</span>
                    </div>
                    <div :class="['meet_start', { over: curItem.passDate }]">
                        <span>{{ formatDate(curItem.end_time, "hh:ii") }}</span>
                        <p>结束时间</p>
                    </div>
                </div>
                <div class="meet_mgs">
                    <div class="inputs">
                        <span>会议地点</span>
                        <p>{{ curItem.address }}</p>
                    </div>
                    <div class="inputs">
                        <span>主持人</span>
                        <p>{{ curItem.compere }}</p>
                    </div>
                    <div :class="['inputs1', { over: curItem.passDate }]" v-if="curItem.seat_row">
                        <span class="left">位置</span>
                        <p>{{ curItem.seat_row }}排{{ curItem.seat_col }}座</p>
                        <span class="right" @click="showMySeat()">查看座次</span>
                    </div>
                    <div :class="['inputs2', { over: curItem.passDate }]" v-if="curItem.needSign == 1">
                        <span class="left">签到情况</span>
                        <!-- <p v-if="curItem.signTime">{{ (curItem.isSign && curItem.isSign == 1) ? "已签到" : "" }}</p> -->
                        <p v-if="curItem.isSign == 1">已签到</p>
                        <p v-if="curItem.isSign != 1">{{curItem.signTimeText}}</p>
                        <div class="sign" v-if="curItem.signTime&&curItem.isSign != 1">
                            <p v-if="curItem.signType.includes('2')" @click="scanQrcode">
                                <span>扫码签到</span>
                                <van-image :src="
                      require('../../../../static/images/meeting/saoma.svg')
                    ">
                                </van-image>
                            </p>
                            <span v-if="curItem.signType.includes('1')" class="right" @click="doSign(curItem.id)">签到</span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="wxts" v-if="curItem.remind">
                <img src="../../../../static/images/meeting/tips.png" alt="" srcset="" />
                <span>{{ curItem.remind }}</span>
            </div>
            <div class="yicheng">
                <span>会议议程</span>
            </div>
            <div class="jieshao" v-html="curItem.content"></div>
        </div>
    </div>
    <van-popup v-model="show">
        <div class="poups">
            <div class="success">签到成功</div>
            <div class="iknow" @click="closePopup">我知道了</div>
            <span class="tips">{{ second }}s后自动关闭弹窗</span>
        </div>
    </van-popup>
    <div class="nodata" v-if="data.length == 0">
        <img src="../../../assets/imgs/constructor/wait.png" alt="" srcset="" />
        <span>暂无数据</span>
    </div>
</div>
</template>

<script>
moment.locale("zh-cn");
export default {
    name: "SDYCMeeting",
    components: {},
    data() {
        return {
            id: this.$route.params.id,
            showId: this.$route.query.showId,
            show: false,
            data: [],
            currentIndex: 0,
            curItem: {},
            second: 5,
            timer: null,
            meeting: dsf.util.loadSessionStore("meeting")
        };
    },
    computed: {},
    watch: {},
    methods: {
        goBack() {
            this.$router.go(-1);
        },
        formatDate(date, str) {
            date = new Date(date.replace(/-/g, "/"));
            return dsf.date.format(date, str);
        },
        compareDate(start_date, end_date) {
            start_date = start_date.replace(/-/g, "/");
            end_date = end_date.replace(/-/g, "/");
            let start = moment(new Date(start_date));
            let end = moment(new Date(end_date));
            // return start.from(end, true).replace(" ", "");
            return end.diff(start, 'hour', true) + "小时";
        },
        showMySeat() {
            let self = this;
            let url = `../seatDesign/index.html#/mobileView/hw/${this.curItem.seatId}/${this.curItem.userid}`;
            this.$router.push({
                name: "dsfIframe",
                params: {
                    url: url,
                    title: "我的位置"
                }
            });
            // 记住查看座位后的tab索引
            self.meeting.myMeetingIdx = self.currentIndex;
            dsf.util.saveToSessionStore("meeting", self.meeting);
        },
        scanSuccess() {
            this.second = 5;
            this.show = true;
            this.timer = setInterval(() => {
                this.second--;
                if (this.second <= 0) {
                    clearInterval(this.timer);
                    this.show = false;
                }
            }, 1000);

            this.curItem.isSign = 1
            this.$set(this.data[this.currentIndex], "isSign", 1)
            this.$set(this.data[this.currentIndex], "signTimeText", "已签到")
        },
        doSign(id) {
            let that = this;
            dsf.http
                .post("/fn/sdycMeeting/doSign", {
                    scheduleId: id
                })
                .done(res => {
                    console.log(res);
                    if (res.type == "success") {
                        that.scanSuccess();
                    } else {
                        dsf.layer.toast(res.message);
                    }
                })
                .error(error => {
                    console.log("doSign-error", error);
                    dsf.layer.toast("签到失败！");
                });
        },
        isCanScan() {
            this.curItem.sign_start_time = this.curItem.sign_start_time.replace(
                /-/g,
                "/"
            );
            let start = new Date(this.curItem.sign_start_time).getTime();
            let curent = new Date().getTime();
            let end = new Date(this.curItem.sign_end_time).getTime();
            if (curent < start || curent > end) {
                return false;
            }
            return true;
        },
        scanQrcode() {
            let that = this;
            let start = new Date(this.curItem.sign_start_time).getTime();
            let curent = new Date().getTime();
            let end = new Date(this.curItem.sign_end_time).getTime();
            if (curent < start || curent > end) {
                dsf.layer.toast("未在签到时间段，无法签到");
                return;
            }
            if (dsf.util.getClientName() == "app") {
                let self = this;
                xsfBarcode.scan(
                    res => {
                        console.log(res);
                        if (res.text) {
                            that.doSign(res.text);
                        }
                    },
                    error => {
                        dsf.layer.toast("扫码失败");
                    }
                );
            } else {
                dsf.layer.toast("需在app中进行扫码");
            }
        },
        closePopup() {
            clearInterval(this.timer);
            this.show = false;
        },
        changeItem(index) {
            this.currentIndex = index;
            this.curItem = this.data[index];
            let start = new Date(this.curItem.sign_start_time).getTime();
            let curent = new Date().getTime();
            let end = new Date(this.curItem.sign_end_time).getTime();
            if (curent < start || curent > end) {
                this.curItem.signTime = false
                this.$set(this.data[this.currentIndex], "signTime", false)
            } else {
                this.curItem.signTime = true
                this.$set(this.data[this.currentIndex], "signTime", true)
            }

            this.curItem.signTimeText = ""
            if (curent < start) {
                this.curItem.signTimeText = "未开启签到"
                this.$set(this.data[this.currentIndex], "signTimeText", "未开启签到")
            }

            if (curent > end && this.curItem.isSign != 1) {
                this.curItem.signTimeText = "未签到"
                this.$set(this.data[this.currentIndex], "signTimeText", "未签到")
            }

            if (this.curItem.isSign == 1) {
                this.curItem.signTimeText = "已签到"
                this.$set(this.data[this.currentIndex], "signTimeText", "已签到")
            }

        },
        loadData() {
            let user = dsf.util.loadSessionStore("user");
            let that = this;
            this.data = [];
            this.$toast.loading("加载中");
            dsf.http
                .post("/fn/sdycMeeting/myMeeting", {
                    meetingId: this.id
                })
                .done(res => {

                    that.$toast.clear();
                    if (res.type == "success") {
                        res.data.forEach(item => {

                            item.sign_start_time = item.sign_start_time.replace(/-/g, '/')
                            item.sign_end_time = item.sign_end_time.replace(/-/g, '/')
                            item.start_time = item.start_time.replace(/-/g, '/')
                            item.end_time = item.end_time.replace(/-/g, '/')

                            let start = new Date(item.sign_start_time).getTime();
                            let curent = new Date().getTime();
                            let end = new Date(item.sign_end_time).getTime();
                            if (curent < start || curent > end) {
                                item.signTime = false
                            } else {
                                item.signTime = true
                            }
                            item.signTimeText = ""
                            if (curent < start) {
                                item.signTimeText = "未开启签到"
                            }
                            if (curent > end && item.isSign != 1) {
                                item.signTimeText = "未签到"
                            }
                            if (item.isSign == 1) {
                                item.signTimeText = "已签到"
                            }
                        });
                        that.data = res.data;
                        let idx;
                        if (that.showId) { // 首页签到提醒 跳转指定会议
                            idx = that.data.findIndex(item => item.id == that.showId);
                            if (idx < 0) idx = 0;
                        } else if (that.meeting.myMeetingIdx > -1) { // 查看座位返回当前会议
                            idx = that.meeting.myMeetingIdx;
                        } else { // 跳过历史会议
                            idx = that.data.findIndex(item => item.passDate == false);
                            if (idx < 0) idx = 0;
                        }
                        that.currentIndex = idx;
                        that.curItem = that.data[idx];
                        // tab滚动到可视区域
                        that.$nextTick(() => {
                            let ele = document.getElementById(`tab-${that.currentIndex}`);
                            if (ele) {
                                ele.scrollIntoView({
                                    behavior: "auto",
                                    block: "nearest",
                                    inline: "nearest"
                                });
                            }
                        });
                        // 复位查看座位后的tab索引
                        that.meeting.myMeetingIdx = -1;
                        dsf.util.saveToSessionStore("meeting", that.meeting);

                        console.log(res);
                    }
                });
        }
    },
    created() {
        this.loadData();
    },
    mounted() {},
    destroyed() {},
    activated() {
        console.log("meeting-activated");
        // this.loadData();
    }
};
</script>

<style lang="scss" scoped>
.meeting {
    .content {
        width: 100%;
        height: calc(100vh - 46px);
        overflow-y: auto;
        overflow-x: hidden;
        position: relative;

        &::before {
            width: 100%;
            height: 283px;
            background: url(../../../../static/images/meeting/hy-bg.png) no-repeat;
            background-size: 100% 100%;
            content: "";
            position: absolute;
            z-index: 0;
            top: -46px;
        }
    }

    .title {
        width: 100%;
        height: 46px;

        .nav {
            width: 100%;
            height: 46px;
            box-sizing: border-box;
            padding: 0 20px;
            display: flex;
            align-items: center;
            position: fixed;
            background: url(../../../../static/images/meeting/hy-bg.png) no-repeat;
            background-size: 100% 283px;
            top: 0;
            z-index: 1;

            .van-icon {
                font-size: 22px;
                color: #333;
                position: relative;
                z-index: 2;
            }

            span {
                position: absolute;
                left: 0;
                right: 0;
                bottom: 0;
                top: 0;
                display: flex;
                align-items: center;
                justify-content: center;
                color: #1a1a1a;
                font-size: 18px;
                font-family: "Alibaba-PuHuiTi-Medium";
                z-index: 1;
            }
        }
    }

    .schedules {
        width: 100%;
        height: auto;
        box-sizing: border-box;
        padding: 5px 15px 15px 15px;
        position: relative;
        z-index: 2;
        display: flex;
        overflow-x: auto;

        &>div {
            width: 108px;
            height: 56px;
            background: #fff;
            border-radius: 5px;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            margin-top: 10px;
            flex-shrink: 0;
            margin-right: 10px;

            span {
                font-size: var(--font_size_3);
                color: #333;
            }

            p {
                font-size: 22px;
                color: #03b98b;
                font-family: "Alibaba-PuHuiTi-Medium";
            }

            &.over {
                background: #e1e1e1;

                span {
                    font-size: var(--font_size_3);
                    color: #787878;
                }

                p {
                    font-size: 22px;
                    color: #787878;
                    font-family: "Alibaba-PuHuiTi-Medium";
                }
            }

            &.active {
                background: #03b98b;

                span {
                    font-size: var(--font_size_3);
                    color: #ffffff;
                }

                p {
                    font-size: 22px;
                    color: #ffffff;
                    font-family: "Alibaba-PuHuiTi-Medium";
                }

                &.over {
                    background: #999999;

                    span {
                        font-size: var(--font_size_3);
                        color: #ffffff;
                    }

                    p {
                        font-size: 22px;
                        color: #ffffff;
                        font-family: "Alibaba-PuHuiTi-Medium";
                    }
                }
            }
        }
    }

    .meet {
        width: 100%;
        height: auto;
        box-sizing: border-box;
        padding: 0 15px 15px 15px;
        position: relative;
        z-index: 2;

        .meet_title {
            width: 100%;
            height: auto;
            overflow: hidden;
            font-size: 22px;
            color: #333333;
            font-family: "Alibaba-PuHuiTi-Medium";
        }

        .meet_time {
            width: 100%;
            height: auto;
            font-size: var(--font_size_4);
            color: #333333;
            margin-top: 10px;
        }

        .meet_info {
            width: 100%;
            height: auto;
            background: #ffffff;
            box-shadow: 0 2px 10px 0 rgba(0, 0, 0, 0.1);
            border-radius: 5px;
            box-sizing: border-box;
            padding: 20px 15px 10px 15px;
            margin-top: 15px;

            .meet_hour {
                display: flex;
                align-items: center;
                justify-content: space-between;

                .meet_start {
                    display: flex;
                    flex-direction: column;
                    align-items: center;

                    span {
                        font-size: 22px;
                        color: #03b98b;
                    }

                    p {
                        font-size: var(--font_size_4);
                        color: #333333;
                    }

                    &.over {
                        span {
                            font-size: 22px;
                            color: #999999;
                        }
                    }
                }

                .meet_yuji {
                    width: 160px;
                    height: 32px;
                    box-sizing: border-box;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    position: relative;

                    &::before {
                        width: 9px;
                        height: 9px;
                        content: "";
                        border-radius: 50%;
                        background: #fff;
                        border: 1px solid #c2c2c2;
                        position: absolute;
                        left: 0;
                        top: 50%;
                        transform: translateY(-50%);
                        z-index: 2;
                    }

                    &::after {
                        width: 9px;
                        height: 9px;
                        content: "";
                        border-radius: 50%;
                        background: #fff;
                        border: 1px solid #c2c2c2;
                        position: absolute;
                        right: 0;
                        top: 50%;
                        transform: translateY(-50%);
                        z-index: 2;
                    }

                    span {
                        border: 1px solid #c2c2c2;
                        border-radius: 14px;
                        width: 110px;
                        height: 28px;
                        box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.1);
                        color: #000;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        font-size: var(--font_size_3);
                        font-family: "Alibaba-PuHuiTi-Regular";
                        background: #fff;
                        position: relative;
                        z-index: 2;
                    }

                    .line {
                        width: 100%;
                        height: 2px;
                        position: absolute;
                        background: #c2c2c2;
                        z-index: 1;
                    }
                }
            }

            .meet_mgs {
                width: 100%;
                height: auto;
                display: flex;
                flex-direction: column;
                margin-top: 15px;

                .inputs {
                    display: flex;
                    justify-content: space-between;
                    padding: 15px 0;
                    border-bottom: 1px solid #ebebeb;

                    span {
                        width: 70px;
                        line-height: 22px;
                        font-size: var(--font_size_3);
                        color: #666666;
                        margin-right: 30px;
                        flex-shrink: 0;
                    }

                    p {
                        flex: 1;
                        line-height: 22px;
                        font-size: var(--font_size_3);
                        color: #333333;
                    }
                }

                .inputs1 {
                    display: flex;
                    justify-content: space-between;
                    padding: 15px 0;
                    border-bottom: 1px solid #ebebeb;

                    span.left {
                        width: 70px;
                        line-height: 30px;
                        font-size: var(--font_size_3);
                        color: #666666;
                        flex-shrink: 0;
                        margin-right: 30px;
                    }

                    span.right {
                        background: #03b98b;
                        border-radius: 15px;
                        height: 30px;
                        font-size: var(--font_size_3);
                        color: #ffffff;
                        flex-shrink: 0;
                        width: 86px;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                    }

                    p {
                        flex: 1;
                        line-height: 30px;
                        font-size: var(--font_size_3);
                        color: #333333;
                    }

                    &.over {
                        span.right {
                            background: #cccccc;
                        }
                    }
                }

                .inputs2 {
                    display: flex;
                    justify-content: space-between;
                    padding: 15px 0;

                    span.left {
                        width: 70px;
                        line-height: 30px;
                        font-size: var(--font_size_3);
                        color: #666666;
                        flex-shrink: 0;
                        margin-right: 30px;
                    }

                    span.right {
                        background: #ffa326;
                        border-radius: 15px;
                        height: 30px;
                        font-size: var(--font_size_3);
                        color: #ffffff;
                        flex-shrink: 0;
                        width: 58px;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        margin-left: 20px;
                    }

                    &>p {
                        flex: 1;
                        line-height: 30px;
                        font-size: var(--font_size_3);
                        color: #333333;
                    }

                    .sign {
                        display: flex;
                        align-items: center;

                        .van-image {
                            width: 20px;
                            height: 20px;
                            margin-left: 10px;
                        }

                        p {
                            display: flex;
                            align-items: center;

                            span {
                                font-size: var(--font_size_3);
                                color: #333333;
                            }
                        }
                    }

                    &.over {
                        span.right {
                            background: #cccccc;
                        }
                    }
                }
            }
        }

        .wxts {
            background: #fcf2e5;
            box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.1);
            border-radius: 5px;
            width: 100%;
            height: 60px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            box-sizing: border-box;
            padding: 13px;
            margin-top: 20px;

            img {
                width: 30px;
                margin-right: 13px;
            }

            span {
                font-size: var(--font_size_4);
                color: #333333;
                font-family: "Alibaba-PuHuiTi-Regular";
                flex: 1;
                border-left: 1px solid #f9b292;
                box-sizing: border-box;
                padding-left: 13px;
            }
        }

        .yicheng {
            width: 100%;
            height: 16px;
            box-sizing: border-box;
            border-left: 4px solid #03b98b;
            padding-left: 8px;
            font-size: var(--font_size_2);
            color: #333333;
            font-family: "Alibaba-PuHuiTi-Medium";
            margin-top: 20px;
            display: flex;
            align-items: center;
        }

        .jieshao {
            background: #ffffff;
            box-shadow: 0 2px 10px 0 rgba(0, 0, 0, 0.1);
            border-radius: 5px;
            width: 100%;
            box-sizing: border-box;
            padding: 15px;
            display: flex;
            flex-direction: column;
            margin-top: 20px;

            span {
                font-size: var(--font_size_3);
                color: #333333;
                line-height: 32px;
            }

            ::v-deep * {
                font-size: var(--font_size_3);
                color: #333333;
                line-height: 32px;
            }
        }
    }

    .van-popup--center {
        background: none;
    }

    .poups {
        width: 345px;
        height: 375px;
        background: #fff url(../../../../static/images/meeting/cg-bg.png) no-repeat;
        background-size: 100% 195px;
        overflow: hidden;
        border-radius: 10px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: flex-end;

        .success {
            font-size: var(--font_size_0);
            color: #333333;
            font-family: "Alibaba-PuHuiTi-Medium";
            margin-bottom: 45px;
        }

        .iknow {
            width: 250px;
            height: 46px;
            background-image: linear-gradient(90deg, #07ddbf 0%, #03b98b 98%);
            border-radius: 23px;
            font-size: var(--font_size_2);
            color: #ffffff;
            font-family: "Alibaba-PuHuiTi-Medium";
            margin-bottom: 15px;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        .tips {
            font-size: var(--font_size_3);
            color: #b8b8b8;
            margin-bottom: 28px;
        }
    }

    .nodata {
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;

        img {
            width: 50%;
        }

        span {
            font-size: var(--font_size_2);
            color: #999999;
            margin-top: 15px;
        }
    }
}
</style>

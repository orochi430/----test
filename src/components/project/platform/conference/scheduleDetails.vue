<template>
    <div class="meeting">
        <div class="content" v-if="data.length > 0">
            <div class="meet" v-if="curItem.id">
                <div class="top_info">
                    <div class="meet_title">{{ curItem.title }}</div>
                    <div class="meet_time">
                        {{ curItem.showDateWeek}}
                    </div>
                </div>
                <div class="schedules" v-show="isShowSchedules">
                    <div :class="{active: currentIndex == index,over: item.passDate}" v-for="(item, index) in data" :key="index" @click="isShowSchedules = false;changeItem(index)" :id="`tab-${index}`">
                        <p>{{item.stime}}</p>
                        <span>{{item.showDate}}</span>
                    </div>
                </div>
                <div class="meet_info" v-show="!isShowSchedules">
                    <div class="meet_hour">
                        <div :class="['meet_start', { over: curItem.passDate }]">
                            <span>{{curItem.stime}}</span>
                            <p>开始时间</p>
                        </div>
                        <div class="meet_yuji">
                            <div class="change" @click="isShowSchedules = true">切换</div>
                            <p class="line"></p>
                            <span>预计{{compareDate(curItem)}}</span>
                        </div>
                        <div :class="['meet_start', { over: curItem.passDate }]">
                            <span>{{curItem.etime}}</span>
                            <p>结束时间</p>
                        </div>
                    </div>
                    <div class="meet_mgs">
                        <div class="inputs" v-show='curItem.address'>
                            <span>会议地点</span>
                            <p>{{ curItem.address }}</p>
                        </div>
                        <div class="inputs" v-show='curItem.moderator'>
                            <span>主持人</span>
                            <p>{{ curItem.moderator }}</p>
                        </div>
                        <div class="inputs" v-show='curItem.ryId||curItem.seatFileId'>
                            <span>位置</span>
                            <p>{{ curItem.seat }}</p>
                            <div class="underline" @click="showMySeat()">查看座次</div>
                        </div>
                        <div class="inputs" v-if="curItem.isSignIn == 1">
                            <span>签到情况</span>
                            <p></p>
                            <div v-if="curItem.signValue == 1 || curItem.signtime" class="btn" @click="showSign = true">{{ curItem.signtime ? '已签到' : '签到'}}</div>
                            <div v-else>{{curItem.signValue == -1 ? '未开始' : '已结束'}}</div>
                        </div>
                    </div>
                </div>
                <div class="wxts" v-if="curItem.remind">
                    <img src="../../../../../static/images/meeting/tips.png" alt="" srcset="" />
                    <span>{{ curItem.remind }}</span>
                </div>
                <div v-if='curItem.content'>
                    <div class="yicheng">
                        <img src="@/assets/imgs/conference/home-schedule.png" alt="">
                        <span>会议议程</span>
                    </div>
                    <div class="jieshao" v-html="curItem.content"></div>
                    <template v-if="allMeetingTopics && allMeetingTopics.length>0">
                        <div class="yicheng">
                        <img src="@/assets/imgs/conference/home-file.png" alt="">
                            <span>会议议题</span>
                        </div>
                        <meetingTopics :allMeetingTopics="allMeetingTopics" class="topics">
                        </meetingTopics>
                    </template>
                </div>

            </div>
        </div>
        <!-- <van-popup v-model="show">
            <div class="poups">
                <div class="success">签到成功</div>
                <div class="iknow" @click="closePopup">我知道了</div>
                <span class="tips">{{ second }}s后自动关闭弹窗</span>
            </div>
        </van-popup> -->
        <div class="nodata" v-if="data.length == 0">
            <img src="@/assets/imgs/constructor/wait.png" alt="" srcset="" />
            <span>暂无数据</span>
        </div>
        <signinPopup 
            :showSign.sync="showSign" 
            :isSign="curItem.signtime ? false : true" 
            :signtime="curItem.signtime" 
            :currentSigninDetail="{meetingId: meeting.id, scheduleId: curItem.id, signinType: curItem.signinType}" 
            @signIn="signin"
        />
    </div>
</template>

<script>
import meetingTopics from "./meetingTopics.vue";
import signinPopup from "./components/signinPopup";
moment.locale("zh-cn");
export default {
    name: "scheduleDetails",
    components: {
        meetingTopics,
        signinPopup
    },
    data () {
        return {
            id: this.$route.params.id,
            showId: this.$route.query.showId,
            show: false,
            data: [],
            currentIndex: 0,
            curItem: {},
            second: 5,
            timer: null,
            meeting: dsf.util.loadSessionStore("meeting"),
            allMeetingTopics: [],
            userId: dsf.util.loadSessionStore("user").user_id,
            isShowSchedules: false,
            showSign: false,
        };
    },
    computed: {},
    watch: {},
    methods: {
        signin(){
            this.showSign = false;
            this.curItem.signtime =  dsf.date.format(new Date(), 'yyyy-mm-dd hh:ii')
        },
        goBack () {
            this.$router.go(-1);
        },
        formatDate (date, str) {
            date = date.replace(/-/g, "/");
            return moment(new Date(date)).format(str);
        },
        compareDate (item) {
            let date = new Date();
            let year = date.getFullYear();
            let startTime = `${year}-${item.showDate} ${item.stime}`;
            let endTime = `${year}-${item.showDate} ${item.etime}`;
            let start_date = startTime.replace(/-/g, "/");
            let end_date = endTime.replace(/-/g, "/");
            let start = moment(new Date(start_date));
            let end = moment(new Date(end_date));
            let duration = start.from(end, true).replace(" ", "").replace(/^(an|a)/,'1');
            if(duration.includes('month')){
                duration = duration.replace(/(months|month)/,"月")
            }else if(duration.includes('day')){
                duration = duration.replace(/(days|day)/, "天")
            }else if(duration.includes('hour')){
                duration = duration.replace(/(hours|hour)/, "小时")
            }if(duration.includes('minute')){
                duration = duration.replace(/(minutes|minute)/, "分钟")
            }
            return duration;
        },
        showMySeat () {
            if(this.curItem.seatFileId){
                let url = dsf.url.getServerUrl(`fn/office/openMobileOffice?fileId=${this.curItem.seatFileId}&moduleId=${this.curItem.moduleId}&nodeId=${this.curItem.nodeId}&flowId=${this.curItem.flowId}&filename=${this.curItem.fileName}`);
                let images = [];
                images.push(url);
                ImagePreview({
                    images: images,
                    startPosition: 0
                });
            }else{
                let url = dsf.url.getServerUrl(`p1105/190105112112w29SDA3bDIEFCTSKWkd/seatDesign/index.html#/mobileView/hw/${this.curItem.id}/${this.curItem.ryId}`)
                this.$router.push({
                    name: "dsfIframe",
                    params: {
                        url: url,
                        title: "我的位置"
                    }
                });
            }
            // 记住查看座位后的tab索引
            self.meeting.myMeetingIdx = self.currentIndex;
            dsf.util.saveToSessionStore("meeting", self.meeting);
        },
        getMeetingTopics (item) {
            if(item){
                dsf.http.post(`fn/conferenceMobile/scheduleTopics`, { meetingId: this.meeting.id, scheduleId: item.id }).done(result => {
                    if (result.type == "success" && result.data) {
                        this.allMeetingTopics = result.data;
                    }
                }).error(error => {
                    console.log(error);
                });
            }
        },
        changeItem (index) {
            this.currentIndex = index;
            this.curItem = this.data[index];
            this.getMeetingTopics(this.data[index]);
            
        },
        loadData () {
            let user = dsf.util.loadSessionStore("user");
            let that = this;
            this.data = [];
            this.$toast.loading("加载中");
            dsf.http.post("/fn/conferenceMobile/mySchedule", { meetingId: this.id }).done(res => {
                that.$toast.clear();
                if (res.type == "success") {
                    that.data = res.data;
                    let idx;
                    if (that.showId) { // 首页签到提醒 跳转指定会议
                        idx = that.data.findIndex(item => item.id == that.showId);
                        if (idx < 0) idx = 0;
                    } else if (that.meeting.myMeetingIdx > -1) { // 查看座位返回当前会议
                        idx = that.meeting.myMeetingIdx;
                    } else { // 跳过历史会议
                        idx = that.data.findIndex(item => item.id == this.$route.query.id);
                        if (idx < 0) idx = 0;
                    }
                    that.currentIndex = idx;
                    that.curItem = that.data[idx];
                    this.getMeetingTopics(that.data[idx])
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
                }
            });
        }
    },
    created () {
        this.loadData();
        this.$nextTick(() => {
            if (this.$route.query.index) {
                this.currentIndex = this.$route.query.index
            }
        })
    },
    mounted () { },
    destroyed () { },
    activated () {
        console.log("meeting-activated");
        // this.loadData();
    }
};
</script>

<style lang="scss" scoped>
.meeting {
    .topics {
        margin: 0 -10px;
    }
    .content {
        width: 100%;
        height: calc(100vh - 46px);
        overflow-y: auto;
        overflow-x: hidden;
        position: relative;

    }

    .schedules {
        background-color: #fff;
        width: 100%;
        height: auto;
        box-sizing: border-box;
        padding: 5px 15px 15px 15px;
        position: relative;
        z-index: 2;
        display: flex;
        overflow-x: auto;
        margin-top: 15px;
        & > div {
            width: 108px;
            height: 66px;
            background: #fff;
            border-radius: 5px;
            border: 1px solid rgba(196,196,196,1);
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
                color: #3296fa;
                font-family: 'Alibaba-PuHuiTi-Medium';
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
                    font-family: 'Alibaba-PuHuiTi-Medium';
                }
            }

            &.active {
                background: #3296fa;

                span {
                    font-size: var(--font_size_3);
                    color: #ffffff;
                }

                p {
                    font-size: 22px;
                    color: #ffffff;
                    font-family: 'Alibaba-PuHuiTi-Medium';
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
                        font-family: 'Alibaba-PuHuiTi-Medium';
                    }
                }
            }
        }
    }

    .meet {
        width: 100%;
        height: auto;
        box-sizing: border-box;
        padding: 15px;
        position: relative;
        z-index: 2;

        .meet_title {
            font-size: var(--font_size_2);
            color: #0062AB;
        }

        .meet_time {
            font-size: var(--font_size_4);
            color: #666;
            margin-top: 10px;
        }
        .top_info {
            padding: 15px 15px 50px;
            box-shadow: 0px 0px 12px 0px rgba(220,220,220,0.5);
            border-radius: 5px;
            background: url('../../../../../static/images/platform/conference/top_bg.png') no-repeat right bottom;
            background-color: #fff;
            background-size: 80px;
        }
        .meet_info {
            width: 100%;
            height: auto;
            background: #ffffff;
            box-shadow: 0px 0px 12px 0px rgba(220,220,220,0.5);
            border-radius: 5px;
            box-sizing: border-box;
            padding: 30px 15px 10px 15px;
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
                        color: #3296fa;
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
                    .change {
                        position: absolute;
                        position: absolute;
                        top: -30px;
                        border-bottom: 1px solid #3296fa;
                        color: #3296fa;
                    }
                    &::before {
                        width: 9px;
                        height: 9px;
                        content: '';
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
                        content: '';
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
                        font-family: 'Alibaba-PuHuiTi-Regular';
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
                        color: #333;
                        margin-right: 30px;
                        flex-shrink: 0;
                    }

                    p {
                        flex: 1;
                        line-height: 22px;
                        color: #666;
                        text-align: right;
                    }
                    &:last-child {
                        border-bottom: none;
                    }
                    .underline {
                        color: #0062AB;
                        border-bottom: 1px solid #0062AB;
                        margin-left: 10px;
                    }
                    .btn {
                        background: #F7B500;
                        border-radius: 6px;
                        color: #fff;
                        margin-left: 10px;
                        padding: 6px 16px;
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
            margin-top: 16px;

            img {
                width: 30px;
                margin-right: 13px;
            }

            span {
                font-size: var(--font_size_4);
                color: #333333;
                font-family: 'Alibaba-PuHuiTi-Regular';
                flex: 1;
                border-left: 1px solid #f9b292;
                box-sizing: border-box;
                padding-left: 13px;
            }
        }

        .yicheng {
            font-size: var(--font_size_2);
            color: #333333;
            margin-top: 16px;
            display: flex;
            align-items: center;
            img {
                width: 20px;
                margin-right: 6px;
            }
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
            margin-top: 16px;

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

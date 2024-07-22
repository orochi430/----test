<template>
<div class="meeting-info">
    <ul class="tab">
        <li>
            <label for=""></label>
            <div>
                <span>会议名称</span>
                <i>{{ meeting.title }}</i>
            </div>
        </li>
        <li>
            <label for=""></label>
            <div>
                <span>会议地点</span>
                <i>{{ meeting.address }}</i>
            </div>
        </li>
        <li>
            <label for=""></label>
            <div>
                <span>主持人</span>
                <i>{{ meeting.moderator }}</i>
            </div>
        </li>
        <li>
            <label for=""></label>
            <div>
                <span>开始时间</span>
                <i>{{ dsf.date.format(meeting.startDateTime, "yyyy-mm-dd hh:ii") }}</i>
            </div>
        </li>
        <!-- <li>
            <label for=""></label>
            <div>
                <span>结束时间</span>
                <i>{{ dsf.date.format(meeting.endDateTime, "yyyy-mm-dd hh:ii") }}</i>
            </div>
        </li> -->
    </ul>
    <div class="tit">会议内容</div>
    <textarea name="" id="" cols="30" rows="10">{{ meeting.meetingContent }}</textarea>
</div>
</template>

    
<script>
import VuexStore from "@/store";
export default {
    data() {
        return {
            meeting: {}
        };
    },
    mounted() {
        this.$nextTick(() => {
            this.getData();
        })
    },
    methods: {
        getData() {
            dsf.http
                .post(`fn/conferenceMobile/meetingInfo`, {
                    meetingId: this.$route.query.meetingId
                })
                .done(result => {
                    if (result.code == 200 && result.data) {
                        this.meeting = result.data;
                        dsf.util.saveToSessionStore("meeting", result.data);
                        VuexStore.commit("setMeetingName", this.meeting.title);
                    }
                })
        },
    }
};
</script>

    
<style lang="scss" scoped>

.meeting-info {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    padding: 50px 80px;
    overflow: hidden;

    .tab {
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        width: 100%;

        li {
            display: flex;
            align-items: center;
            width: 40%;

            label {
                margin-right: 25px;
                width: 80px;
                height: 80px;

            }

            div {
                display: flex;
                flex-direction: column;

                span {
                    font-size: 40px;
                    color: #666666;
                }

                i {
                    margin-top: 20px;
                    min-height: 20px;
                    font-size: 34px;
                    color: #333333;
                }
            }

            &:nth-child(1) {
                label {
                    background: url('../../../../static/images/meetingPad/tab1.png') no-repeat;
                    background-size: 100% 100%;
                }
            }

            &:nth-child(2) {
                label {
                    background: url('../../../../static/images/meetingPad/tab2.png') no-repeat;
                    background-size: 100% 100%;
                }
            }

            &:nth-child(3) {
                label {
                    background: url('../../../../static/images/meetingPad/tab3.png') no-repeat;
                    background-size: 100% 100%;
                }
            }

            &:nth-child(n+4) {
                margin-top: 50px;

                label {
                    background: url('../../../../static/images/meetingPad/tab4.png') no-repeat;
                    background-size: 100% 100%;
                }
            }
        }
    }

    .tit {
        margin-top: 50px;
        font-size: 40px;
        color: #666666;
    }

    textarea {
        margin-top: 20px;
        width: 100%;
        flex: 1;
        font-size: 34px;
        color: #333333;
        overflow: auto;
    }
}
</style>

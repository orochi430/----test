<template>
    <div>
        <div class="signIn" :class="{notSignIn:signInData.signValue!='-1'}" @click="scan">
            <span>{{text}}</span>
            <span>{{currentDate}}</span>
        </div>
        <div class="signTime">
            <ul>
                <li v-show='signInData.time'>
                    <span>可签到时间:</span>
                    <b>{{signInData.time}}</b>
                </li>
                <li v-show='signInData.signtime'>
                    <span>已签到时间:</span>
                    <b>{{signInData.signtime}}</b>
                </li>
            </ul>
        </div>

    </div>
</template>

<script>
import store from "@/common/util";
export default {
    data () {
        return {
            currentDate: '',
            text: '点击签到',
            meetingInfo: store.loadSessionStore("meeting"),
            signInData: {},
            timer: null
        }
    },
    created () {
        clearInterval(this.timer)
        this.timer = setInterval(() => {
            this.currentDate = dsf.date.format(new Date(), 'hh:ii:ss')
        }, 1000);
        this.getSignInDetailsCurrentUser();
    },
    destroyed () {
        clearInterval(this.timer)
    },
    methods: {
        //获取签到情况
        getSignInDetailsCurrentUser () {
            dsf.http.post('fn/conferenceSignIn/getUserCurrentSignInDetail', { meetingId: this.meetingInfo.id }).done(res => {
                if (res.code == 200) {
                    let data = res.data;
                    if (JSON.stringify(data) == '{}') {
                        this.signInData.signValue = '';
                        this.text = '暂无签到';
                    } else {
                        this.signInData = data;
                        if (data.signValue != '-1') {
                            this.text = data.signText;
                        } else {
                            this.text = '点击签到';
                        }
                    }

                }
            })
        },
        //签到
        scan () {
            if (this.signInData.signValue != '-1') {
                return;
            }
            dsf.http.post('fn/conferenceSignIn/doSign', { meetingId: this.meetingInfo.id, scheduleId: this.signInData.scheduleId }).done(res => {
                this.$toast.success(res.message);
                this.getSignInDetailsCurrentUser();
            })

        }
    }
}
</script>
<style lang='scss' scoped>
@import '@/assets/styles/themes.scss';
@import '@/assets/styles/mixin.scss';
.signIn {
    margin: 150px auto 0;
    @include background-theme('normal');
    background: linear-gradient(#219fe4 0%, #1667ba 100%);
    color: #fff;
    font-size: var(--font_size_2);
    text-align: center;
    border-radius: 50%;
    width: 200px;
    height: 200px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    span {
        padding: 6px 0;
        font-size: 24px;
        &:last-child {
            color: #6fc7fc;
        }
    }
}
.message {
    min-height: 100px;
    font-size: var(--font_size_2);
    margin-top: 50px;
    text-align: center;
}

.notSignIn {
    background: #ccc !important;
}
.signTime {
    margin-top: 10px;
    font-size: var(--font_size_2);
    display: flex;
    flex-direction: row;
    justify-content: center;
    ul {
        text-align: left;
    }
    li {
        height: 30px;
        line-height: 30px;
        text-align: left;
        b {
            margin-left: 5px;
        }
    }
}
</style>
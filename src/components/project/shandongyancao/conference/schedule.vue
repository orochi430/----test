<template>
<div>
    <div v-if="schedules.length > 0">
        <template v-if="$route.name == 'peopleCongressSch'">
            <div v-for="day in schedules" :key="day.date" class="day-box">
                <div class="day">{{ day.date }}</div>
                <van-cell-group :border="false" inset>
                    <van-cell v-for="(schedule, index) in day.agendas" :key="index" :title="schedule.title" :to="{name: 'peopleCongressScheduleDetail', params: {agendaId: schedule.id}}" is-link />
                </van-cell-group>
            </div>
        </template>
        <template v-else>
            <div v-for="day in schedules" :key="day.date" class="day-box">
                <div class="day"><i class="iconfont iconricheng1"></i>{{ day.date }}</div>
                <div v-for="(schedule, index) in day.agendas" :key="index">
                    <schedule-item :schedule="schedule" :is-fold="isFold"></schedule-item>
                </div>
            </div>
        </template>
    </div>
    <div v-else class="flex">
        <commonempty :image="require('static/images/peopleCongress/img_rcap.png')" class="schedule-empty" description="暂无日程安排" />
    </div>
</div>
</template>

<script>
// import {
//     meetings
// } from './test'
import scheduleItem from './components/scheduleItem'
export default {
    components: {
        scheduleItem
    },
    props: {
        allSchedules: {
            type: Array
        },
        meetingId: {
            type: String
        },
        isFold: {
            type: Boolean
        }
    },
    data() {
        return {
            schedules: [],
            loading: null
        }
    },
    watch: {
        allSchedules: function (newValue, oldValue) {
            this.schedules = newValue;
        }
    },
    created() {
        let self = this;
        self.getMyAgendas();
    },
    mounted() {},
    methods: {
        getMyAgendas() {
            let self = this;
            if (self.allSchedules) { // 首页子组件传参
                self.schedules = self.allSchedules;
            } else { // 点击更多
                self.loading = dsf.layer.loading();
                dsf.http
                    .post(`fn/peopleCongress/myAgendas`, {
                        meetingId: self.$route.params.meetingId
                    })
                    .done(result => {
                        //console.log(result);
                        if (result.code == 200 && result.data) {
                            self.schedules = result.data;
                        }
                    })
                    .error(error => {
                        // console.log(error);
                        // dsf.layer.toast("数据获取失败！");
                    })
                    .always(() => {
                        dsf.layer.closeLoading(self.loading);
                    });
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.day-box {
    position: relative;
    background-color: #fff;
    overflow: hidden;

    .van-cell-group {
        margin: 0 16px 10px;
        background-color: #f5f6f7;

        .van-cell {
            padding: 10px;
            background-color: inherit;

            &::after {
                border-bottom: 1px solid #ddd;
            }
        }
    }

    &:not(:last-child)::after {
        position: absolute;
        box-sizing: border-box;
        content: ' ';
        pointer-events: none;
        right: 16px;
        bottom: 0;
        left: 16px;
        border-bottom: 1px solid #cfcfcf;
        -webkit-transform: scaleY(.5);
        transform: scaleY(.5);
    }
}

.day {
    background-color: #fff;
    padding: 0.4rem 0.32rem 0.24rem;

    i {
        color: #E91619;
        margin-right: 0.1rem;
    }
}

.schedule-empty {
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

.flex {
    justify-content: center;
    height: 100vh;
}
</style>

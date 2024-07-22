<template>
<div class="schedule-leader">
    <div class="schedule-container">
        <van-sticky :offset-top="dsf.util.getOffsetTop()">
            <div class="time-card">
                <time-picker ref="timePicker" :position-today="true" :hava-sch.sync="havaSch" :curyear.sync="curyear" :curmonth.sync="curmonth" @thisWeek="thisWeek" @thisMonth="thisMonth" @checkedDate="checkedDate"></time-picker>
            </div>
        </van-sticky>
        <div class="leader-card-list" v-if="leaderList.length > 0">
            <div class="leader-card" v-for="(item,index) in leaderList" :key="index">
                <p class="name" v-html="item.leaderText"></p>
                <div class="context">
                    <p class="morning">上午</p>
                    <van-field v-model="item.morningContent" autosize readonly rows="1" type="textarea" v-show="item.morningContent" />
                </div>
                <div class="context">
                    <p class="afternoon">下午</p>
                    <van-field v-model="item.afternoonContent" autosize readonly rows="1" type="textarea" v-show="item.afternoonContent" />
                </div>
            </div>
        </div>
        <commonempty v-if="leaderList.length == 0" />
    </div>
    <!-- <div class="bottom-btn">
        <van-button size="middle" class="flex1" type="primary" @click="goBack">关闭</van-button>
    </div> -->
</div>
</template>

<script>
import timePicker from "./timePicker.vue"
export default {
    name: '',
    components: {
        timePicker
    },
    props: {},
    data() {
        return {
            cancelChecked: false,
            curyear: null,
            curmonth: null,
            currentDate: moment().format("YYYY-MM-DD"), // 当前日期
            leaderList: [],
            havaSch: [], // 有日程的日期，用于日历组件显示日期下的点
        }
    },
    created() {},
    mounted() {
        this.getScheduleData();
        this.$refs.timePicker.defaultDateShow({
            date: this.currentDate
        });
    },
    methods: {
        // 切换周 获取数据用于设置是否有日程
        thisWeek(val) {
            // console.log(val);
            this.getSchedule(val[0].date, val[6].date).then(data => {
                this.havaSch = data;
            }).catch(err => {
                dsf.layer.toast(err)
            })
        },
        // 切换月 获取数据用于设置是否有日程
        thisMonth(val) {
            // console.log(val);
            this.getSchedule(val[0][0].date, val[val.length - 1][6].date).then(data => {
                this.havaSch = data;
            }).catch(err => {
                dsf.layer.toast(err)
            })
        },
        /*** 当手动点击日历某一天时触发
         * 如果吸顶日期即为该天 无任何操作
         * 如果已有数据中存在该天 滚动至该天
         * 否则重新获取数据，刷新组件
         ***/
        checkedDate(val) {
            console.log(val);
            this.currentDate = val;
            this.getScheduleData()
        },
        getScheduleData() {
            let that = this;
            this.$toast.loading({
                message: '加载中...',
                duration: 0,
                overlay: true
            });
            dsf.http.get("ctrl/p2433LeaderSchedule/get", {
                    date: that.currentDate,
                    isEdit: "0"
                })
                .then(res => {
                    if (res.data.code == 200) {
                        that.$toast.clear();
                        let data = res.data.data;
                        that.leaderList = data.subList;
                    }
                })
        },
        goBack() {
            this.$router.go(-1);
        },
        // 获取日程数据
        getSchedule(startDate, endDate) {
            return new Promise((resolve, reject) => {
                dsf.http
                    .get("ctrl/p2433LeaderSchedule/check", {
                        startTime: startDate,
                        endTime: endDate,
                    })
                    .then(res => {
                        if (res.data.code == 200) {
                            resolve(res.data.data)
                        } else {
                            reject('获取日程失败')
                        }
                    })
            })
        },
    },
    computed: {},
    watch: {},
}
</script>

<style lang="scss" scoped>
@import '../../assets/styles/themes.scss';
@import '../../assets/styles/mixin.scss';

.schedule-leader {
    width: 100%;

    .schedule-container {
        width: 100%;
        height: 100%;
        padding: 10px;
        box-sizing: border-box;
        // margin-bottom: 1.2rem;

        .time-card {
            width: 100%;
            height: auto;
            background: #ffffff;
            box-shadow: 0 1px 5px 0 rgba(199, 199, 199, 0.50);
            border-radius: 3px;

            ::v-deep .week-slider .slider-content .date-box .lang-box .day-of-week .day-date .day-dot {
                width: 7px !important;
                height: 7px !important;
                bottom: 3px !important;
            }

            ::v-deep .week-slider .slider-content .date-box .lang-box .day-of-week .day-date .day-dot.has-sch {
                background-color: #ff0000 !important;
            }
        }

        .leader-card-list {
            widows: 100%;
            height: auto;
            margin-top: 10px;

            .leader-card {
                width: 100%;
                height: auto;
                background: #ffffff;
                box-shadow: 0 1px 5px 0 rgba(199, 199, 199, 0.50);
                border-radius: 3px;
                margin-bottom: 10px;
                padding: 0 10px;
                box-sizing: border-box;

                .name {
                    border-bottom: 1px solid #EEEEEE;
                    width: 100%;
                    height: 40px;
                    line-height: 40px;
                    font-size: var(--font_size_2);
                    font-weight: 600;
                    color: #0086D9;
                }

                .context {
                    border-bottom: 1px solid #EEEEEE;
                    padding: 10px 0 15px 0;
                    box-sizing: border-box;
                    display: flex;
                    height: auto;

                    p {
                        font-size: var(--font_size_2);
                        // color: #333333;
                        margin: 0 10px 5px 0;

                        &.morning {
                            color: #F3784B;
                        }

                        &.afternoon {
                            color: #48CE87;
                        }
                    }

                    textarea {
                        font-size: var(--font_size_2);
                        color: #333333;
                        width: 100%;
                    }

                    .van-cell {
                        padding: 0 !important;
                        font-size: var(--font_size_2);
                        color: #333333;
                        flex: 1;
                    }

                    &:last-child {
                        border-bottom: none;
                    }
                }

                &:last-child {
                    margin-bottom: 0;
                }
            }
        }
    }

    .bottom-btn {
        width: 100%;
        height: 60px;
        background: #ffffff;
        box-shadow: 0 -1.5px 2px 0 rgba(214, 214, 214, 0.50);
        display: flex;
        align-items: center;
        padding: 0px 10px;
        box-sizing: border-box;
        position: fixed;
        bottom: 0;
        left: 0;
        right: 0;

        button {
            flex: 1;
            widows: 100%;

            &.van-button--primary {
                color: #ffffff;
            }
        }
    }

    .van-sticky--fixed {
        .time-card {
            background: #f8f8f8;
            padding: 10px;
            box-sizing: border-box;
            box-shadow: none;

            .week-slider {
                box-shadow: 0 1px 5px 0 rgba(199, 199, 199, 0.50);
            }
        }
    }

}
</style>

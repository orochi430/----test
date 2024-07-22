<template>
<div class="schedule-leader">
    <div class="schedule-container" :style="{ marginBottom: currentDate >= today ? '1.2rem': '0'}">
        <van-sticky :offset-top="dsf.util.getOffsetTop()">
            <!-- <div class="time-card">
            <i class="icon iconfont iconsanjiaoyou iconsanjiaozuo" :class="{ 'title-icon-active': true }" @click="prevClick()" v-if="today != currentDate"></i>
            <span style="font-weight: bold" @click="showCalendar = true">{{ currentDate }}</span>
            <i class="icon iconfont iconsanjiaoyou" :class="{ 'title-icon-active': true }" @click="nextClick()"></i>
            <i class="icon iconfont iconren" @click="showViewUser = true" v-if="scheduleData.visibleUserText"></i>
            <van-calendar v-model="showCalendar" @confirm="onConfirm" />
        </div> -->
            <div class="time-card">
                <time-picker ref="timePicker" :position-today="true" :hava-sch.sync="havaSch" :curyear.sync="curyear" :curmonth.sync="curmonth" @thisWeek="thisWeek" @thisMonth="thisMonth" @checkedDate="checkedDate"></time-picker>
            </div>
        </van-sticky>
        <div class="leader-card-list" v-if="scheduleData.subList && scheduleData.subList.length > 0">
            <div class="leader-card" v-for="(item,index) in scheduleData.subList" :key="index">
                <p class="name" v-html="item.leaderText"></p>
                <div class="context">
                    <p class="morning">上午</p>
                    <van-field v-model="item.morningContent" autosize :readonly="currentDate < today" rows="1" type="textarea" placeholder="请输入" />
                    <!-- <van-field v-model="item.morningContent" autosize rows="1" type="textarea" placeholder="请输入" /> -->
                </div>
                <div class="context">
                    <p class="afternoon">下午</p>
                    <van-field v-model="item.afternoonContent" autosize :readonly="currentDate < today" rows="1" type="textarea" placeholder="请输入" />
                    <!-- <van-field v-model="item.afternoonContent" autosize rows="1" type="textarea" placeholder="请输入" /> -->
                </div>
            </div>
        </div>
        <commonempty v-else />
    </div>
    <div class="bottom-btn" v-if="currentDate >= today">
        <van-button size="middle" class="flex1" type="default" @click="saveSchedule()">保存</van-button>
        <van-button size="middle" class="flex1" type="primary" @click="releaseSchedule(scheduleData.status)">{{scheduleData.status == 1?'取消发布':'发布'}}</van-button>
    </div>
    <van-popup :style="{ height: '100%' }" v-model="showPerson" :close-on-click-overlay="true" lock-scroll position="bottom" get-container="#app">
        <control-user-list v-if="showPerson" :default-select-array="defaultSelectArray" :extra="extra" :selectType="selectType" @close="cancePerson" @getSelectUser="getSelectUser"></control-user-list>
    </van-popup>
    <van-popup v-model="showViewUser" :style="{ height: '80%'}" position="bottom" lock-scroll round v-if="scheduleData.visibleUserText" get-container="#app">
        <div class="view-user-list">
            <van-nav-bar title="人员查看范围" placeholder>
                <template #right>
                    <van-icon name="cross" size="18" color="#999" @click="showViewUser = false" />
                </template>
            </van-nav-bar>
            <div class="list">
                <p v-for="(item,i) in scheduleData.visibleUserText.split(',')" :key="i">{{item}}</p>
            </div>
        </div>
    </van-popup>
</div>
</template>

<script>
import timePicker from "./timePicker.vue"
import controlUserList from "@/components/commonForm/controls/controlUserList";
export default {
    name: '',
    components: {
        timePicker,
        controlUserList
    },
    props: {},
    data() {
        return {
            offsetTop: '0px',
            cancelChecked: false,
            curyear: null,
            curmonth: null,
            currentDate: moment().format("YYYY-MM-DD"), // 当前日期
            today: moment().format("YYYY-MM-DD"), // 当前日期
            leaderList: [],
            showCalendar: false,
            releaseStatus: 0,
            scheduleData: {},
            showPerson: false,
            selectType: 0, //选人控件传值
            defaultSelectArray: [],
            extra: {
                multiple: true,
                tabs: [{
                        action: "fn/user/select/data?types=person&rootObject=1&action=canonical_group-public&async=true",
                        name: "领导活动组",
                        subTabKey: "department"
                    },
                    {
                        action: "fn/user/select/data?types=person&rootObject=2&action=self_org&async=true",
                        name: "本机构",
                        subTabKey: "department"
                    },
                    {
                        action: "fn/user/select/data?types=person&rootObject=3&action=self_dept&async=true",
                        name: "本部门",
                        subTabKey: "department"
                    },
                ]
            },
            showViewUser: false,
            havaSch: [], // 有日程的日期，用于日历组件显示日期下的点
        }
    },
    created() {},
    mounted() {
        this.offsetTop = this.$store.state.isShowAppHeader ? '0.92rem' : '0px';
        this.getScheduleData();
        this.$refs.timePicker.defaultDateShow({
            date: this.currentDate
        });
    },
    methods: {
        prevClick() {
            this.currentDate = moment(this.currentDate).subtract(1, 'day').format("YYYY-MM-DD");
            this.getScheduleData();
        },
        nextClick(val) {
            this.currentDate = moment(this.currentDate).add(1, 'day').format("YYYY-MM-DD");
            this.getScheduleData();
        },
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
            that.defaultSelectArray = [];
            dsf.http.get("ctrl/p2433LeaderSchedule/get", {
                    date: that.currentDate,
                    isEdit: "1"
                })
                .then(res => {
                    if (res.data.code == 200) {
                        that.$toast.clear();
                        that.scheduleData = res.data.data;
                        that.releaseStatus = res.data.data.status;

                        // let ids = that.scheduleData.visibleUser ? that.scheduleData.visibleUser.split(',') : [];
                        // let names = that.scheduleData.visibleUserText ? that.scheduleData.visibleUserText.split(',') : [];
                        // for (let i = 0; i < ids.length; i++) {
                        //     that.defaultSelectArray.push({
                        //         id: ids[i],
                        //         name: names[i],
                        //         checked: true
                        //     })
                        // }
                    }
                })
        },
        onConfirm(date) {
            this.showCalendar = false;
            this.currentDate = moment(date).format("YYYY-MM-DD");
            this.getScheduleData();
        },
        saveSchedule(obj, callback) {
            let that = this;
            let params = JSON.parse(JSON.stringify(that.scheduleData));
            params.date = that.currentDate;
            if (obj) {
                params.visibleUser = obj.visibleUser;
                params.visibleUserText = obj.visibleUserText;
                params.visibleUserSchema = obj.visibleUserSchema;
            }

            // if (that.scheduleData.status) {
            //     that.$toast.fail("该活动已经发布，请取消发布后编辑！");
            // } else {
            dsf.http.post("ctrl/p2433LeaderSchedule/save", params, {
                    headers: {
                        "Content-Type": "application/json"
                    }
                })
                .then(res => {
                    if (res.data.code == 200) {
                        that.$toast.success("保存成功!");
                        if (callback)
                            callback()
                    } else {
                        that.$toast.fail(res.data.message);
                    }
                })
            // }
        },
        releaseSchedule(status) {
            let that = this;
            if (status != 1) { //发布
                that.showPerson = true;
            } else { // 取消发布
                dsf.http.get("ctrl/p2433LeaderSchedule/unRelease", {
                        date: that.currentDate
                    })
                    .then(res => {
                        if (res.data.code == 200) {
                            that.$toast.success("取消发布成功!");
                            that.releaseStatus = 0;
                            dsf.layer.toast("取消发布成功!", "success", () => {
                                that.getScheduleData();
                            })
                        } else {
                            that.$toast.fail("取消发布失败!");
                        }
                    })
            }
        },
        cancePerson() {
            this.showPerson = !this.showPerson;
        },
        getSelectUser(selectArr) {
            let that = this
            // console.log(selectArr);
            if (selectArr.length > 0) {
                //去掉父节点，保留选中的子节点
                selectArr.forEach((item, index) => {
                    if (item.children && item.children.length > 0) {
                        selectArr.splice(index, 1);
                    }
                });
                let ids = selectArr.map((item) => item.id);
                let names = selectArr.map((item) => item.name);
                let schemas = [];
                ids.forEach((item, i) => {
                    schemas.push((i + 1) + "::" + item)
                });
                let obj = {
                    visibleUser: ids.join(','),
                    visibleUserText: names.join(','),
                    visibleUserSchema: schemas.join(','),
                }
                // console.log(obj);
                that.saveSchedule(obj, () => {
                    dsf.http.get("ctrl/p2433LeaderSchedule/release", {
                            date: that.currentDate
                        })
                        .then(res => {
                            if (res.data.code == 200) {
                                that.$toast.success("发布成功!");
                                that.releaseStatus = 1;
                                dsf.layer.toast("发布成功!", "success", () => {
                                    that.getScheduleData();
                                })
                            } else {
                                that.$toast.fail("发布失败!");
                            }
                        })
                })
            }
            // this.defaultSelectArray = userArr;
            this.showPerson = false;
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
        // height: calc(100% - 1.2rem);
        height: auto;
        padding: 10px;
        box-sizing: border-box;
        // margin-bottom: 1.2rem;

        .time-card {
            width: 100%;
            height: auto;
            background: #ffffff;
            box-shadow: 0 1px 5px 0 rgba(199, 199, 199, 0.50);
            border-radius: 3px;

            // min-height: 45px;
            // display: flex;
            // align-items: center;
            // justify-content: center;
            // position: relative;
            ::v-deep .week-slider .slider-content .date-box .lang-box .day-of-week .day-date .day-dot {
                width: 7px !important;
                height: 7px !important;
                bottom: 3px !important;
            }

            ::v-deep .week-slider .slider-content .date-box .lang-box .day-of-week .day-date .day-dot.has-sch {
                background-color: #ff0000 !important;
            }

            span {
                font-size: var(--font_size_2);
            }

            // .iconfont {
            //     @include font-theme('normal');
            // }

            .iconsanjiaozuo {
                display: inline-block;
                transform: rotate(180deg);
                -ms-transform: rotate(180deg);
                /* IE 9 */
                -moz-transform: rotate(180deg);
                /* Firefox */
                -webkit-transform: rotate(180deg);
                /* Safari 和 Chrome */
                -o-transform: rotate(180deg);
                /* Opera */
            }

            .iconren {
                font-size: 18px;
                position: absolute;
                right: 15px;
            }
        }

        .leader-card-list {
            width: 100%;
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

            &.van-button--default {
                @include font-theme('normal');
            }

            &+button {
                margin-left: 10px;
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

.view-user-list {
    width: 100%;
    height: 100%;
    background: #f8f8f8;
    position: relative;

    .poptitle {
        width: 100%;
        height: 50px;
        display: flex;
        align-items: center;
        justify-content: center;
        color: #333333;
        font-size: var(--font_size_2);
        border-bottom: 5px solid #f8f8f8;
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
    }

    .list {
        width: 100%;
        // height: calc(100% - 50px);
        overflow: auto;
        // margin-top: 50px;
        position: absolute;
        left: 0;
        right: 0;
        top: 1rem;
        bottom: 0;

        p {
            color: #333333;
            font-size: var(--font_size_2);
            width: 100%;
            height: 40px;
            padding: 0 10px;
            box-sizing: border-box;
            display: flex;
            align-items: center;
            justify-content: center;
            background: #ffffff;
            border-bottom: 1px solid #eeeeee;
            margin-bottom: 5px;
        }
    }

}
</style>

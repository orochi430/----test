<template>
<div class="leaderDuty">
    <van-icon name="static/assistant/filter.png" @click="showSearchAction" size="0.40rem" style="vertical-align: middle;" class='filter' />
    <div class="weeks">
        <div class="title">
            <i class="icon iconfont iconsanjiaoyou iconsanjiaozuo" :class="{'title-icon-active':true}" @click="weekPre()"></i>
            <div class="datename">
                {{ currentYear }}年{{ currentMonth<10? '0'+currentMonth:currentMonth }}月
            </div>
            <i class="icon iconfont iconsanjiaoyou" :class="{'title-icon-active':true}" @click="weekNext()"></i>
        </div>
        <div class="weekdata">
            <div class="weekittem">
                <span>一</span>
                <span>二</span>
                <span>三</span>
                <span>四</span>
                <span>五</span>
                <span>六</span>
                <span>日</span>
            </div>
            <div class="weekittem">
                <div v-for="(day, index) in weeks" :key="index" :class="{'active':day.isActive,'disabled':!day.isClick}" @click="getList(day,index)">
                    <p>{{day.date.getDate()}}</p>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import dsf from '../../common';
// import data from '../../static/airport'
export default {
    name: 'leaderDuty',
    components: {},
    data() {
        return {
            active: 0,
            currentYear: 1970, // 年份
            currentMonth: 1, // 月份
            currentDay: 1, // 日期
            currentWeek: 1, // 星期
            days: [],
            weeks: [],
            show: false,
            // actions: data.atmbs,
            atmbName: "",
            units: [],
            curDate: moment(new Date()).format('YYYY/MM/DD')
        };
    },
    computed: {},
    watch: {},
    methods: {
        formatDate(year, month, day) {
            const y = year
            let m = month
            if (m < 10) m = `0${m}`
            let d = day
            if (d < 10) d = `0${d}`
            return `${y}-${m}-${d}`
        },

        initData(cur) {
            this.weeks = []
            let date = ''
            if (cur) {
                date = new Date(cur)
            } else {
                date = new Date()
            }
            this.currentDay = date.getDate() // 今日日期 几号
            this.currentYear = date.getFullYear() // 当前年份
            this.currentMonth = date.getMonth() + 1 // 当前月份
            this.currentWeek = date.getDay() // 1...6,0  // 星期几
            if (this.currentWeek === 0) {
                this.currentWeek = 7
            }
            const str = this.formatDate(this.currentYear, this.currentMonth, this.currentDay) // 今日日期 年-月-日
            // console.log(str)
            this.days.length = 0
            // 今天是周日，放在第一行第7个位置，前面6个 这里默认显示一周，如果需要显示一个月，则第二个循环为 i<= 35- this.currentWeek
            /* eslint-disabled */
            for (let i = this.currentWeek - 1; i >= 0; i -= 1) {
                const d = new Date(str)
                d.setDate(d.getDate() - i)
                // console.log(y:" + d.getDate())
                this.days.push(d)
                let dFormat = dsf.date.parse(dsf.date.format(d, 'yyyy-mm-dd'))
                let now = dsf.date.parse(dsf.date.format(new Date(), 'yyyy-mm-dd'))
                this.weeks.push({
                    date: d,
                    isActive: false,
                    isClick: (dFormat < now) ? false : true
                })
                // console.log(moment(new Date()).format('YYYY-MM-DD'))
            }
            for (let i = 1; i <= 7 - this.currentWeek; i += 1) {
                const d = new Date(str)
                d.setDate(d.getDate() + i)
                this.days.push(d)
                let dFormat = dsf.date.parse(dsf.date.format(d, 'yyyy-mm-dd'))
                let now = dsf.date.parse(dsf.date.format(new Date(), 'yyyy-mm-dd'))
                this.weeks.push({
                    date: d,
                    isActive: false,
                    isClick: (dFormat < now) ? false : true
                })
            }

            if (!cur) {
                this.weeks.forEach(item => {
                    if (moment(new Date()).format('YYYYMMDD') == moment(item.date).format('YYYYMMDD')) {
                        item.isActive = true
                    }
                })
            }
        },

        // 上个星期
        weekPre() {
            const d = this.days[0] // 如果当期日期是7号或者小于7号
            d.setDate(d.getDate() - 7)
            this.initData(d)
        },

        // 下个星期
        weekNext() {
            const d = this.days[6] // 如果当期日期是7号或者小于7号
            d.setDate(d.getDate() + 7)
            this.initData(d)
        },

        // 上一個月  传入当前年份和月份
        pickPre(year, month) {
            const d = new Date(this.formatDate(year, month, 1))
            d.setDate(0)
            this.initData(this.formatDate(d.getFullYear(), d.getMonth() + 1, 1))
        },

        // 下一個月  传入当前年份和月份
        pickNext(year, month) {
            const d = new Date(this.formatDate(year, month, 1))
            d.setDate(35)
            this.initData(this.formatDate(d.getFullYear(), d.getMonth() + 1, 1))
        },

        // 当前选择日期
        pick(date) {
            alert(this.formatDate(date.getFullYear(), date.getMonth() + 1, date.getDate()))
        },
        getList(item, index) {
            if (item.isClick) {
                this.weeks.forEach((obj, i) => {
                    if (index == i) {
                        obj.isActive = true
                    } else {
                        obj.isActive = false
                    }
                })
                this.curDate = moment(new Date(item.date)).format("YYYY-MM-DD");
                this.$emit('onConfirm', this.curDate)
            }else{
                dsf.layer.toast('预定日期已过，请选择其他日期！');
            }
        },
        // 筛选
        showSearchAction() {
            this.$emit('showSearchAction')
        }
    },
    created() {
        this.initData(null)
    },
    mounted() {
        this.initData(null)
    },
    destroyed() {},
}
</script>

<style lang="scss">
@import '../../assets/styles/themes.scss';
@import '../../assets/styles/mixin.scss';

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

.leaderDuty {
    position: relative;

    .filter {
        position: absolute;
        top: 15px;
        right: 15px;
    }

    .weeks {
        width: 100%;
        height: 135px;
        background: #FFF;
        box-sizing: border-box;
        padding: 0 10px;
        display: flex;
        flex-direction: column;
        flex-shrink: 0;

        .title {
            width: 100%;
            height: 24px;
            display: flex;
            align-items: center;
            justify-content: center;
            margin-top: 15px;

            i {
                color: #666666;
                font-size: var(--font_size_3);
                display: inline-block;
            }

            div {
                width: 85px;
                padding-bottom: 2px;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 15px;
                color: #000;
                font-weight: bold;
            }
        }

        .weekdata {
            width: 100%;
            height: 88px;
            display: flex;
            align-items: center;
            flex-direction: column;

            .weekittem {
                flex: 1;
                height: 100%;
                display: flex;
                align-items: center;
                justify-content: space-between;
                width: 100%;

                span {
                    height: 36px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 15px;
                    color: #999999;
                    flex: 1;
                }

                div {
                    flex: 1;
                    height: 44px;
                    display: flex;
                    align-items: center;
                    justify-content: center;

                    p {
                        width: 44px;
                        height: 44px;
                        border-radius: 50%;
                        overflow: hidden;
                        text-align: center;
                        line-height: 42px;
                        /* display: flex;
                        align-items: center;
                        justify-content: center; */
                        color: #333;
                        font-size: var(--font_size_2);
                        position: relative;
                    }

                    .other-month {
                        color: #999;
                    }

                    &.active {
                        p {
                            // background: #3389E0 !important;
                            color: #FFF !important;
                            @include background-theme("normal");

                            &::after {
                                width: 4px;
                                height: 4px;
                                content: '';
                                background: #FFF;
                                position: absolute;
                                left: 50%;
                                transform: translateX(-50%);
                                bottom: 8px;
                                border-radius: 50%;
                            }
                        }
                    }

                    &.disabled {
                        p {
                            /* background: #e8e8e8 !important; */
                            /* color: #FFF !important; */
                        }
                    }
                }
            }
        }
    }
}
</style>

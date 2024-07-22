<template>
  <!-- 使用vant的swiper封装一个时间选择器 -->
  <div class="week-slider">
    <div class="slider-title" v-show="isShowMonth">
      <i
        class="icon iconfont iconsanjiaoyou iconsanjiaozuo"
        :class="{ 'title-icon-active': true }"
        @click="prevClick()"
      ></i>
      <span style="font-weight: bold">{{ getYearMonth }}</span>
      <i
        class="icon iconfont iconsanjiaoyou"
        :class="{ 'title-icon-active': true }"
        @click="nextClick()"
      ></i>
    </div>
    <div class="slider-content">
      <van-swipe
        v-show="defaultShowType == 'week'"
        ref="swiperCon"
        :touchable="touchable"
        :initial-swipe="currentIndex"
        :loop="false"
        :show-indicators="false"
        class="my-swiper"
        @change="onChange"
      >
        <van-swipe-item v-for="base in prev_now_next" :key="base[0].date">
          <div class="date-box">
            <div class="lang-box">
              <div v-for="(item, inx) in base" :key="inx" class="day-of-week">
                <div class="day-title" v-show="isShowMonth">
                  {{ item.week }}
                </div>
                <div
                  :class="{
                    active: judgeChecked(item.date),
                    toDay:
                      isToday(item.date) &&
                      !dsf.config.homePage.schedule.defaultToday,
                    holiday: isHoliday(item.date),
                  }"
                  class="day-date"
                  @click="dateClick(item)"
                >
                  <span>{{ item.date.split("-")[2].replace(/^0+/, "") }}</span>
                  <span
                    v-show="addSch(item.date)"
                    :style="{
                      background:
                        addSch(item.date) && judgeChecked(item.date)
                          ? todayDotcolor
                          : '',
                    }"
                    :class="{
                      'has-sch': addSch(item.date) && !judgeChecked(item.date),
                    }"
                    class="day-dot"
                  ></span>
                </div>
                <span
                  v-text="getLunarCalendar(item.date)"
                  class="lunar-calendar"
                  :class="[isHoliday(item.date) ? 'holiday' : '']"
                ></span>
              </div>
            </div>
          </div>
        </van-swipe-item>
      </van-swipe>
      <div v-show="defaultShowType == 'month'" class="date-box">
        <div
          class="lang-box"
          v-for="(item, index) in currentMonth"
          :key="index"
        >
          <div v-for="(itm, inx) in item" :key="inx" class="day-of-week">
            <div class="day-title" v-show="!index">{{ itm.week }}</div>
            <div :class="[itm.isCurrentMonth ? '' : 'not-current-month']">
              <div
                :class="{
                  active: judgeChecked(itm.date),
                  toDay: isToday(itm.date),
                  holiday: isHoliday(itm.date),
                }"
                class="day-date"
                @click="dateClick(itm)"
              >
                <span>{{ itm.date.split("-")[2].replace(/^0+/, "") }}</span>
                <span
                  v-show="addSch(itm.date)"
                  :style="{
                    background:
                      addSch(itm.date) && judgeChecked(itm.date)
                        ? todayDotcolor
                        : '',
                  }"
                  :class="{
                    'has-sch': addSch(itm.date) && !judgeChecked(itm.date),
                  }"
                  class="day-dot"
                ></span>
              </div>
              <span
                v-text="getLunarCalendar(itm.date)"
                class="lunar-calendar"
                :class="[isHoliday(itm.date) ? 'holiday' : '']"
              ></span>
            </div>
          </div>
        </div>
      </div>
      <div class="flex ac jc arrow-container">
        <van-icon
          v-if="defaultShowType == 'week'"
          name="arrow-down"
          @click="toggleShowType('month', true)"
        />
        <van-icon
          v-else
          name="arrow-up"
          @click="toggleShowType('week', true)"
        />
      </div>
    </div>
  </div>
</template>

<script>
import calendar from "@/common/calendar";
import dsf from "../../../common";
export default {
  name: "timePicker",
  props: {
    touchable: {
      type: Boolean,
      default: true,
      desc: "能否手动滑动切换",
    },
    clickMode: {
      type: String,
      default: "month",
      desc: "切换按钮的切换模式 可选month/week",
    },
    endSliderCallBack: {
      type: Function,
      default: function () {
        return false;
      },
      desc: "自定义滑动完成之后触发的回调函数",
    },
    defaultDate: {
      type: String,
      default: moment().format("YYYY-MM-DD"),
      desc: "传入的时间 格式为2020-01-01这样",
    },
    activeBgcolor: {
      type: String,
      default: "#35c",
      desc: "选中日期的背景颜色",
    },
    activeTextcolor: {
      type: String,
      default: "#FFF",
      desc: "选中日期的文字颜色",
    },
    todayDotcolor: {
      type: String,
      default: "#fff",
      desc: "当前日期下小点的颜色",
    },
    havaSch: {
      type: Array,
      default: () => {
        return [];
      },
    },
    startNumber: {
      type: Number,
      default: 1,
      desc: "日期从星期几开始,默认为1表示星期一开始到星期天,取值范围1-7",
    },
    language: {
      type: String,
      default: "ch",
      desc: "显示的文字是英语还是汉字,能结合startNumber来自动偏移",
    },
    cancelChecked: {
      type: Boolean,
      default: false,
    },
    curyear: {
      type: Number,
    },
    curmonth: {
      type: Number,
    },
    isShowMonth: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      prev_now_next: [], //上周-本周-下周的数组
      currentIndex: 1,
      weekLanguages: {},
      checkedDate: "", //选中的日期
      currentMonth: [], //当前月内所有日期
      defaultShowType: "week",
      reWriter: "",
      sdate: "",
      edate: "",
      holidayMonth: [],
      // curyear: '',
      // curmonth: ''
    };
  },
  computed: {
    getYearMonth() {
      let date = this.reWriter || this.prev_now_next[1][0].date;
      let hasToday = false;
      this.prev_now_next[1].forEach((element) => {
        if (element.isToday) {
          hasToday = true;
        }
      });
      if (hasToday && !this.reWriter) {
        date = this.defaultDate;
      }

      var str = "";
      str = date.split("-")[0] + "年" + date.split("-")[1] + "月";
      this.$emit("update:curyear", moment(date).year());
      this.$emit("update:curmonth", moment(date).month());
      return str;
    },
  },
  watch: {
    cancelChecked(val) {
      // if (val) {
      //   this.checkedDate = "";
      // }
      if(this.reWriter !='' && dsf.config.homePage.schedule.defaultToday){
        this.checkedDate = this.reWriter
      }else if(dsf.config.homePage.schedule.defaultToday){
        this.checkedDate = this.defaultDate
      }
    },
  },
  created() {
    this.initTimer(this.defaultDate);
  },
  mounted() {
    //在初始化initTimer中不能调用获取当天的日程 因为在切换日历中会触发日历的初始化 就会获取获取当天的日程 
    this.getDataday();
  },
  activated() {
    //this.initTimer(this.defaultDate);
  },
  deactivated() {
    //this.$destroy();
  },
  methods: {
    //初始化组件的方法
    initTimer(date) {
      var self = this;
      this.checkedDate = "";
      this.weekLanguages = {
        ch: ["一", "二", "三", "四", "五", "六", "日"],
        en: ["Mon", "Tue", "Wed", "Thur", "Fri", "Sat", "Sun"],
        pos: [1, 2, 3, 4, 5, 6, 7], //pos是作为标记用,当然也能当做language的类型用
      };
      for (var key in this.weekLanguages) {
        this.weekLanguages[key] = this.weekLanguages[key]
          .slice(self.startNumber - 1)
          .concat(this.weekLanguages[key].slice(0, self.startNumber - 1));
      }
      for (let i = 0, j = -7; i < 3; i++) {
        this.prev_now_next.push(
          self.getWeekInfo(
            moment(date)
              .add(j + i * 7, "d")
              .format("YYYY-MM-DD")
          )
        );
      }
      if (dsf.config.homePage.schedule.defaultToday) {
        this.dateClick({ date: dsf.date.format(new Date(), "yyyy-mm-dd") });
      }
      //抛出当前月的数据
      this.currentMonth = this.getFullMonth(date);
      this.$emit("thisMonth", this.currentMonth);
      //抛出当前一周的数据
      //'prev_now_next', this.prev_now_next)
      this.$emit("thisWeek", this.prev_now_next[1]);
    },
    //
    reGetprev_now_next(date) {
      this.prev_now_next = [];
      for (let i = 0, j = -7; i < 3; i++) {
        this.prev_now_next.push(
          this.getWeekInfo(
            moment(date)
              .add(j + i * 7, "d")
              .format("YYYY-MM-DD")
          )
        );
      }
      // console.log(this.prev_now_next)
    },
    //初始化某个日期所在七天的信息（未必是完整的1-7,可能为上周三到这周三的‘一周’）
    getWeekInfo(date) {
      var self = this;
      var dateOfWeek = Number(moment(date).format("E")); // 1-7
      var week = [];
      var today = moment();
      // eslint-disable-next-line no-unused-vars
      var defaultDay = moment(self.defaultDate);
      for (let i = 0; i < 7; i++) {
        //只需要知道数组中的位置就能计算出连续七天的信息
        var _formatDate = moment(date).subtract(
          self.weekLanguages.pos.indexOf(dateOfWeek) - i,
          "d"
        );
        week.push({
          date: _formatDate.format("YYYY-MM-DD"), //日期
          isToday:
            today.format("YYYY-MM-DD") === _formatDate.format("YYYY-MM-DD"), //是否是今天
          week: self.weekLanguages[self.language][i], //星期几
        });
      }
      return week;
    },
    addSch(date) {
      if (this.havaSch.indexOf(date) != -1) {
        return true;
      }
      return false;
    },
    dateClick(date) {
      if (date.date == this.checkedDate) {
        this.checkedDate = date.date;
      } else {
        this.checkedDate = date.date;
      }
      //抛出点击的日期
      this.$emit("checkedDate", this.checkedDate);
      this.reWriter = this.checkedDate;
    },
    defaultDateShow(date) {
      this.checkedDate = date.date;
    },
    judgeChecked(date) {
      if (date == this.checkedDate) {
        return true;
      }
      return false;
    },
    isToday(date) {
      if (date == moment(Date.now()).format("yyyy-MM-DD")) {
        return true;
      } else return false;
    },
    isHoliday(date) {
      let curr = this.holidayMonth.find((item) => date == item.date);
      if (
        curr &&
        curr.type != 1 &&
        !this.isToday(date) &&
        !this.judgeChecked(date)
      ) {
        return true;
      } else return false;
    },
    //点击获取上一周/月
    prevClick() {
      if (this.clickMode == "week") {
        this.$refs.swiperCon.prev();
      } else if (this.clickMode == "month") {
        this.reWriter = moment([this.curyear, this.curmonth, 1])
          .startOf("month")
          .subtract("month", 1)
          .format("YYYY-MM-DD");
        this.prev_now_next = [];
        this.initTimer(this.reWriter);
      }
    },
    //点击获取上一周/月
    nextClick() {
      if (this.clickMode == "week") {
        this.$refs.swiperCon.next();
      } else if (this.clickMode == "month") {
        this.reWriter = moment([this.curyear, this.curmonth, 1])
          .startOf("month")
          .subtract("month", -1)
          .format("YYYY-MM-DD");
        this.prev_now_next = [];
        this.initTimer(this.reWriter);
      }
    },
    //轮播完后触发的方法
    onChange(index) {
      this.reWriter = "";
      var self = this;
      this.checkedDate = "";
      if (index == 0) {
        //滑动到最左边的时候
        this.prev_now_next.unshift(
          self.getWeekInfo(
            moment(self.prev_now_next[index][0].date)
              .subtract(7, "d")
              .format("YYYY-MM-DD")
          )
        );
        this.prev_now_next.pop();
      } else if (index == 2) {
        //滑动到最右边的时候
        this.prev_now_next.push(
          self.getWeekInfo(
            moment(self.prev_now_next[index][0].date)
              .add(7, "d")
              .format("YYYY-MM-DD")
          )
        );
        this.prev_now_next.shift();
      }
      //抛出当前月的数据
      this.currentMonth = this.getFullMonth(self.prev_now_next[1][0].date);
      this.$emit("thisMonth", this.currentMonth);
      //抛出当前周
      this.$emit("thisWeek", this.prev_now_next[1]);
      if (this.endSliderCallBack && dsf.isFunction(this.endSliderCallBack)) {
        this.endSliderCallBack();
      } else {
        // console.log("传入的不是函数");
      }
    },
    // 获取当前月的天数
    mGetDate(date) {
      let now = new Date(date);
      let year = now.getFullYear();
      let month = now.getMonth() + 1;
      let d = new Date(year, month, 0);
      return d.getDate();
    },
    // 获取某天是星期几
    getWeekByDay(date) {
      //date="2021-01-01"
      let day = new Date(date);
      let ch = ["日", "一", "二", "三", "四", "五", "六"]; //创建星期数组
      let en = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"];
      let today = this.language == "ch" ? ch : en;
      return today[day.getDay()]; //返一个星期中的某一天，其中0为星期日
    },
    // 获取当前月的所有日期
    getMonthInfo(date, isCurrentMonth) {
      let now = new Date(date);
      let current_month_num = this.mGetDate(now);
      if(isCurrentMonth){
        this.getHoliday(now, current_month_num);
      }
      let current_month = [];
      for (let i = 1; i <= current_month_num; i++) {
        let day = now.setDate(i);
        let everyDay = moment(day).format("YYYY-MM-DD");
        current_month.push({
          date: everyDay,
          isToday: everyDay === moment().format("YYYY-MM-DD"),
          week: this.getWeekByDay(everyDay),
          isCurrentMonth: isCurrentMonth,
        });
      }
      return current_month;
    },
    //补全当前月
    getFullMonth(date) {
      let currentMonth = this.getMonthInfo(date, true);
      if (currentMonth[0].week != "一" && currentMonth[0].week != "Mon") {
        let lastMonth = this.getMonthInfo(
          moment(date).subtract(1, "months").format("YYYY-MM-DD"),
          false
        ).reverse();
        for (let m = 0; m <= lastMonth.length; m++) {
          currentMonth.unshift(lastMonth[m]);
          if (lastMonth[m].week == "一" || lastMonth[m].week == "Mon") break;
        }
      }
      if (
        currentMonth[currentMonth.length - 1].week != "日" &&
        currentMonth[currentMonth.length - 1].week != "Sun"
      ) {
        let nextMonth = this.getMonthInfo(
          moment(date).add(1, "months").format("YYYY-MM-DD"),
          false
        );
        for (let n = 0; n <= nextMonth.length; n++) {
          currentMonth.push(nextMonth[n]);
          if (nextMonth[n].week == "日" || nextMonth[n].week == "Sun") break;
        }
      }
      currentMonth = this.group(currentMonth, 7);
      return currentMonth;
    },
    //拆分数组
    group(array, subGroupLength) {
      let index = 0;
      let newArray = [];
      while (index < array.length) {
        newArray.push(array.slice(index, (index += subGroupLength)));
      }
      return newArray;
    },
    //周/月历显示切换
    toggleShowType(type, isSelfToggle = false) {
      //isSelfToggle是否为点击箭头主动切换
      this.defaultShowType = type;
      //抛出当前为周历还是月历
      this.$emit("toggleShowType", this.defaultShowType, isSelfToggle);
    },
    // 获取农历
    getLunarCalendar(date) {
      let lunar = calendar.solar2lunar(...date.split("-"));
      return (
        lunar.lunarFestival ||
        lunar.festival ||
        lunar.Term ||
        (lunar.IDayCn == "初一" ? lunar.IMonthCn : lunar.IDayCn)
      );
    },
    //获取节假日信息
    getHoliday(now, num) {
      let self = this;
      let sd = now.setDate(1);
      let ed = now.setDate(num);
      self.sdate = moment(sd).format("YYYY-MM-DD");
      self.edate = moment(ed).format("YYYY-MM-DD");
      if (sd && ed) {
        dsf.http
          .post("/ctrl/leave/maintenance/getLeaveByRange", {
            start: self.sdate,
            end: self.edate,
          })
          .then((res) => {
            if (res.data.code == 200) {
              self.holidayMonth.push(...res.data.data);
              const map = new Map();
              self.holidayMonth = self.holidayMonth.filter(
                (v) => !map.has(v.date) && map.set(v.date, 1)
              );
            } else {
              dsf.layer.toast("获取数据失败,请稍后再试");
            }
          })
          .catch((err) => console.log(err));
      }
    },
    getDataday(){
      //如果 配置成只获取当天的日程  首次进日程如果没有日程的话 日程上样式不会选中当前天
      if(dsf.config.homePage.schedule.defaultToday && this.checkedDate ==''){
        this.checkedDate = this.defaultDate
      }
      if (dsf.config.homePage.schedule.defaultToday) {
        setTimeout(() => {
          this.dateClick({ date: dsf.date.format(new Date(), "yyyy-mm-dd") });
        }, 100);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import "src/assets/styles/themes.scss";
@import "src/assets/styles/mixin.scss";
.iconsanjiaozuo {
  display: inline-block;
  transform: rotate(180deg);
  -ms-transform: rotate(180deg); /* IE 9 */
  -moz-transform: rotate(180deg); /* Firefox */
  -webkit-transform: rotate(180deg); /* Safari 和 Chrome */
  -o-transform: rotate(180deg); /* Opera */
}
.slider-content {
  height: fit-content;
}
.week-slider {
  height: fit-content;
}
.day-date {
  position: relative;
}
.day-dot {
  margin: 0 !important;
  bottom: 5px !important;
}
// .toDay{
//   @include lighter-background-theme('normal', true, 20%);
// }
.arrow-container {
  padding: 5px;
  font-size: var(--font_size_2);
  color: #999;
}
.p-bottom_5 {
  padding-bottom: 5px;
}
</style>

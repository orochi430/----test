<template>
<div>
<div>
  <time-picker
        ref="timePicker"
        :end-slider-call-back="endSliderCallBack"
        :active-bgcolor="activeBgcolor"
        :active-textcolor="activeTextcolor"
        :today-dotcolor="todayDotcolor"
        :start-number="startNumber"
        :defaultDate="dutyDefaultDate"
        :click-mode="clickMode"
        :hava-sch.sync="havaSch"
        :cancel-checked="cancelChecked"
        @thisWeek="thisWeek"
        @thisMonth="thisMonth"
        @checkedDate="checkedDate"
        @toggleShowType="toggleShowType(arguments)"
    ></time-picker>
        </div>
        <div>
        <day-duty-list
            ref="dutyList">
            </day-duty-list>
    </div>
</div>
</template>

<script>
import timePicker from "../schedule/common/timePicker.vue";
import dayDutyList from "../onduty/DayDutyList.vue"
export default {
    name:"DayDuty",
    components: {
        timePicker,
        dayDutyList
  },
  data() {
    return {
        dutyDefaultDate:moment(new Date()).format("YYYY-MM-DD"),
        endSliderCallBack: null,
        activeBgcolor: "#FF6A00",
        activeTextcolor: "#FFFFFF",
        todayDotcolor: "#FFFFFF",
        startNumber: 1,
        clickMode: "month",
        cancelChecked: false,
        havaSch: [], //存在数据的日期
        week: [],
        month: [],
    }
  },
   mounted() {},
   created() {
    this.checkedDate(this.dutyDefaultDate);
  },
  methods:{
    thisWeek(week, isSelfToggle = false) {
        this.week = week;
        // 月周切换时需要重新获取日历信息
        if(isSelfToggle) this.$refs.timePicker.reGetprev_now_next(week[0].date) 
        this.$nextTick(() => {
            let tempArr = week.filter((item) => item.date == this.$refs.timePicker.checkedDate);
            if (tempArr.length && this.defaultShowType == "week"
            ) {
            //this.$refs.timePicker.dateClick(tempArr[0], tempArr[0])
            this.$refs.timePicker.defaultDateShow(tempArr[0]);
            this.selectedDate = tempArr[0].date;
            } else {
            this.selectedDate = "";
            }
        });
    },
    thisMonth(month) {
      this.month = month;
      this.$nextTick(() => {
        let flag = false;
        let date = "";
        month.forEach((item) => {
          item.forEach((itm) => {
            if (itm.isToday) {
              flag = true;
              date = itm;
            }
          });
        });
        if (flag && this.defaultShowType == "month") {
          // this.$refs.timePicker.dateClick(date, date)
          this.$refs.timePicker.defaultDateShow(date);
          this.selectedDate = date.date;
        } else {
          this.selectedDate = "";
        }
      });
    },
    checkedDate(day) {
      console.log("checkedDate",day);

      this.cancelChecked = false;
      this.selectedDate = day;
      this.$nextTick(() => {
        if (day != "") {
          this.listGetData(day, day);
        } else {
          if (this.defaultShowType == "week") {
            this.listGetData(this.week[0].date, this.week[6].date);
          } else {
            this.listGetData(
              this.month[0][0].date,
              this.month[this.month.length - 1][6].date
            );
          }
        }
      });
    },
    toggleShowType(val) {
      let type = val[0]
      let isSelfToggle = val[1]
      this.defaultShowType = type;
      let hasSch = [];
      let checkedDate = this.$refs.timePicker.checkedDate
      let checkedWeek = checkedDate ? this.month.filter(week => week.find(day => day.date == checkedDate))[0] : this.week
      this.$refs.timePicker.checkedDate = "";
      if (type == "week") {
        // this.listGetData(this.week[0].date, this.week[6].date);
        this.thisWeek(checkedWeek, isSelfToggle);
      } else {
        // this.listGetData(
        //   this.month[0][0].date,
        //   this.month[this.month.length - 1][6].date
        // );
        this.thisMonth(this.month);
      }
    },
    listGetData(sdate, edate) {
      console.log(sdate, edate)
      this.$refs.dutyList.initfn(sdate, edate);
    },
  }
}
</script>

<style>
/* @import '../../assets/styles/themes.scss';
@import '../../assets/styles/mixin.scss'; */

</style>
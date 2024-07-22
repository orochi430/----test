<template>
  <div class="summary-page">
    <div v-if="calcType == 1" class="cascader">
      <van-field
        v-model="fieldValue"
        is-link
        readonly
        label="考勤组"
        placeholder="请选择考勤组"
        @click="show = true"
      />
      <van-popup v-model="show" round position="bottom">
        <van-cascader
          v-model="cascaderValue"
          active-color="#2271b3"
          :field-names="fieldNames"
          title="请选择考勤组"
          :options="options"
          @close="show = false"
          @finish="onFinish"
        />
      </van-popup>
    </div>

    <div class="summary">
      <van-cell
        :title="`${curmonth + 1}月汇总`"
        value="更多"
        is-link
        :to="`/attndSummaryMore/${calcType}/${btId}`"
      />
      <div v-if="calcType == 0" class="summary-info">
        <!-- <div class="summary-info-container">
          <div class="num">{{ mmh }}</div>
          <div class="desc">平均工时</div>
        </div> -->
        <div class="summary-info-container">
          <div class="num">{{ late }}</div>
          <div class="desc">迟到</div>
        </div>
        <div class="summary-info-container">
          <div class="num">{{ leaveEarly }}</div>
          <div class="desc">早退</div>
        </div>
      </div>
    </div>

    <div class="content">
      <div class="content-calendar">
        <van-cell :title="`每日记录(${curmonth + 1}月)`" />
        <time-picker
          ref="timePicker"
          v-show="currentTab.type == 'date'"
          :end-slider-call-back="endSliderCallBack"
          :active-bgcolor="activeBgcolor"
          :active-textcolor="activeTextcolor"
          :today-dotcolor="todayDotcolor"
          :start-number="startNumber"
          :click-mode="clickMode"
          :hava-sch.sync="havaSch"
          :cancel-checked="cancelChecked"
          :curyear.sync="curyear"
          :curmonth.sync="curmonth"
          :show-lunar="false"
          @thisWeek="thisWeek"
          @thisMonth="thisMonth"
          @checkedDate="checkedDate"
          @toggleShowType="toggleShowType(arguments)"
        ></time-picker>
      </div>
      <div class="content-list">
        <record-list ref="list" :calc-type="calcType"></record-list>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import { Cascader } from "vant";

Vue.use(Cascader);
import timePicker from "@/components/attendance/timePicker";
import recordList from "./recordList";
export default {
  components: {
    timePicker,
    recordList
  },
  props: {
    calcType: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      show: false,
      fieldValue: "",
      cascaderValue: "",
      fieldNames: {
        text: "bt",
        value: "id"
      },
      options: [],
      endSliderCallBack: null,
      currentTab: {
        getDataType: "day",
        type: "date",
        url: ""
      },
      defaultShowType: "week",
      curyear: null,
      curmonth: null,
      activeBgcolor: "#FF6A00",
      activeTextcolor: "#FFFFFF",
      todayDotcolor: "#FFFFFF",
      startNumber: 1,
      clickMode: "month",
      havaSch: {}, //存在数据的日期
      cancelChecked: false,
      selectedDate: null,
      now: new Date(),
      mmh: 0, // 平均工时
      late: 0, // 迟到
      leaveEarly: 0, // 早退
      btId: "" // 选中考勤组ID
    };
  },
  created() {
    let self = this;
    self.init();
  },
  methods: {
    init() {
      let self = this;
      if (self.calcType == 1) {
        dsf.http.post("/fn/attnd/getAdminAttendGroup").then(({ data }) => {
          console.log(data);
          self.options = data.data;
          self.fieldValue = self.options[0].bt;
          self.btId = self.cascaderValue = self.options[0].id;
        });
      }
      self.checkedDate(dsf.date.format(new Date(), "yyyy-mm-dd"));
    },
    //获取考勤状态
    getAppOnesColors() {
      let self = this;
      if (
        self.curyear >= self.now.getFullYear() &&
        self.curmonth > self.now.getMonth()
      )
        return;
      dsf.http
        .post(`fn/attnd/getAppOnesColors`, {
          startData: moment(`${self.curyear}-${self.curmonth + 1}`)
            .startOf("month")
            .format("YYYY-MM-DD"),
          endData: moment(`${self.curyear}-${self.curmonth + 1}`)
            .endOf("month")
            .format("YYYY-MM-DD")
        })
        .done(res => {
          if (res.type == "success") {
            self.havaSch = res.data;
          } else {
            console.log("getAppOnesColors-fail", res);
          }
        })
        .error(err => {
          console.log("getAppOnesColors-err", err);
        });
    },
    onFinish({ selectedOptions }) {
      this.show = false;
      this.fieldValue = selectedOptions.map(option => option.bt).join("/");
      this.btId = this.cascaderValue;
      this.checkedDate(this.selectedDate);
    },
    thisWeek(week, isSelfToggle = false) {
      this.week = week;
      // 月周切换时需要重新获取日历信息
      if (isSelfToggle) this.$refs.timePicker.reGetprev_now_next(week[0].date);
      this.$nextTick(() => {
        let tempArr = week.filter(
          item => item.date == this.$refs.timePicker.checkedDate
        );
        if (
          tempArr.length &&
          this.currentTab.getDataType == "day" &&
          this.defaultShowType == "week"
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
        month.forEach(item => {
          item.forEach(itm => {
            if (itm.isToday) {
              flag = true;
              date = itm;
            }
          });
        });
        if (
          flag &&
          this.currentTab.getDataType == "day" &&
          this.defaultShowType == "month"
        ) {
          // this.$refs.timePicker.dateClick(date, date)
          this.$refs.timePicker.defaultDateShow(date);
          this.selectedDate = date.date;
        } else {
          this.selectedDate = "";
        }
      });
    },
    checkedDate(day) {
      //console.log();
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
              moment(`${this.curyear}-${this.curmonth + 1}`)
                .startOf("month")
                .format("YYYY-MM-DD"),
              moment(`${this.curyear}-${this.curmonth + 1}`)
                .endOf("month")
                .format("YYYY-MM-DD")
            );
          }
        }
      });
    },
    toggleShowType(val) {
      let type = val[0];
      let isSelfToggle = val[1];
      this.defaultShowType = type;
      let hasSch = [];
      let checkedDate = this.$refs.timePicker.checkedDate;
      let checkedWeek = checkedDate
        ? this.month.filter(week =>
            week.find(day => day.date == checkedDate)
          )[0]
        : this.week;
      // this.$refs.timePicker.checkedDate = "";
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
      let self = this;
      self.$refs.list.init(sdate, this.btId);
      console.log("self.week", self.week);
      console.log("self.month", self.month);
      if (self.calcType == 0) {
        self.getSummary(
          moment(`${this.curyear}-${this.curmonth + 1}`)
            .startOf("month")
            .format("YYYY-MM-DD"),
          moment(`${this.curyear}-${this.curmonth + 1}`)
            .endOf("month")
            .format("YYYY-MM-DD"),
          self.calcType
        );
      }
    },
    getSummary(sdate, edate, calcType) {
      let self = this;
      if (self.$route.query.demo == "1") {
        self.mmh = 11.4;
        self.late = 0;
        self.leaveEarly = 0;
      } else {
        let params = { sdate, edate, type: calcType };
        // this.calcType == 1 && !this.cascaderValue ? self.$set(params, "groupId", this.options[0].id) : ""
        // this.calcType == 1 && this.cascaderValue ? self.$set(params, "groupId", this.cascaderValue) : ""
        dsf.http
          .post(`fn/attnd/getSummary`, params)
          .done(res => {
            if (res.type == "success" && res.data.length > 0) {
              self.mmh = parseFloat(
                res.data.find(item => item.key == "平均工时")?.value || 0
              );
              self.late = parseFloat(
                res.data.find(item => item.key == "迟到")?.value || 0
              );
              self.leaveEarly = parseFloat(
                res.data.find(item => item.key == "早退")?.value || 0
              );
            }
          })
          .error(error => {
            console.log("getMyRecords-error", error);
            // dsf.layer.toast("数据获取失败！", false);
            // self.errored = true;
          })
          .always(() => {
            // dsf.layer.closeLoading(self.loading);
          });
      }
    }
  },
  filters: {
    //时间格式化
    dateFormat: function(val) {
      if (!val) return "";
      return dsf.date.format(new Date(Number(val)), "hh:ii");
    }
  },
  watch: {
    curyear(nv, ov) {
      this.getAppOnesColors();
    },
    curmonth(nv, ov) {
      this.getAppOnesColors();
    }
  }
};
</script>

<style lang="scss" scoped>
.summary-page {
  .summary,
  .content,
  .cascader {
    background-color: #fff;
    margin: 2vh;
    padding: 1vh;
    border-radius: 12px;
  }

  .summary {
    .van-cell__title {
      font-weight: bold;
    }

    &-info {
      text-align: center;
      display: flex;
      justify-content: space-around;

      &-container {
        .num {
          font-size: var(--font_size_0);
          font-weight: bold;
          margin: 0.2rem 0;
        }

        .desc {
          font-size: 0.25rem;
          margin-bottom: 0.2rem;
        }
      }
    }
  }

  .content {
    &-calendar {
      .van-cell__title {
        font-weight: bold;
      }

      .week-slider {
        padding-top: 0px;
        margin-top: 0px;
      }
    }
  }

  .cascader {
    .van-cell {
      padding: 0 16px;

      ::v-deep .van-field__label {
        font-weight: bold;
        color: #323233;
      }

      ::v-deep .van-field__body {
        line-height: inherit;
      }
    }
  }
}
</style>

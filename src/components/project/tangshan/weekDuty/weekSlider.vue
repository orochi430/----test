<template>
  <div>
    <div class="year_str" v-if="showYear">{{ yearMonthStr }}</div>
    <div class="week-slider">
      <div class="sliders" ref="sliders" @touchstart="touchstartHandle" @touchmove="touchmoveHandle"
        @touchend="touchendHandle">
        <template v-for="(item, index) in dates">
          <div class="slider" :style="getTransform(index)" @webkit-transition-end="onTransitionEnd(index)"
            @transitionend="onTransitionEnd(index)">
            <div class="day" v-for="(day, index) in getDaies(item.date)" :key="index">
              <div style="font-size: 13px">{{ day.week }}</div>
              <div @click.stop="dayClickHandle(day.date)" :style="buildDateStyle(day.isToday, day.isDay)" class="solar">
                {{ day.date.split("-")[2] }}
              </div>
              <div class="lunar" :class="{ festival: dsf.date.isFestival(day,day.date) }">
                <span style="font-size: 11px; color: #999999">{{
                 dsf.date.solarToLunar(day,day.date)
                }}</span>
              </div>
            </div>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "weekSlider",
  props: {
    defaultDate: {
      type: String,
      default: moment().format("YYYY-MM-DD"),
    },
    showYear: {
      type: Boolean,
      default: false,
    },
    activeBgColor: {
      type: String,
      default: "#D10000",
    },
    todayBgColor: {
      type: String,
    },
    activeTxtColor: {
      type: String,
      default: "rgba(255, 255, 255, 1)",
    },
    todayTxtColor: {
      type: String,
    },
    lang: {
      type: String,
      default: "ch",
    },
  },
  data() {
    return {
      leaders: [],
      monthname: [],
      dates: [],
      direction: null,
      activeIndex: 1,
      isAnimation: false,
      yearMonthStr: "",
      start: {
        x: null,
        y: null,
      },
      end: {
        x: null,
        y: null,
      },
      distan: {
        x: 0,
        y: 0,
      },
      sliderWidth: 0,
      weekLanguages: {
        ch: ["日", "一", "二", "三", "四", "五", "六"],
        en: ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"],
      },
    };
  },
  watch: {
    dates: {
      handler: function (newVal, oldVal) {
        this.yearMonthStr = moment(newVal[1].date).format("YYYY-MM");
      },
      deep: true,
    },
  },
  computed: {
    todayStyle: function () {
      let vm = this;
      return {
        color: vm.todayTxtColor ? vm.todayTxtColor : "",
      };
    },
  },
  mounted() {
    this.sliderWidth = this.$refs.sliders.offsetWidth;

  },
  created() {
    let vm = this;

    this.dates.push(
      {
        date: moment(vm.defaultDate).subtract(7, "d").format("YYYY-MM-DD"),
      },
      {
        date: vm.defaultDate,
      },
      {
        date: moment(vm.defaultDate).add(7, "d").format("YYYY-MM-DD"),
      }
    );
  },
  methods: {
    /**
     *获取制定日期的当前周的日期数据
     */
    getDaies(date) {
      let vm = this,
        arr = [];
      let weekOfDate = Number(moment(date).format("E"));
      let weeks = vm.weekLanguages[vm.lang];
      let today = moment();
      let defaultDay = moment(vm.defaultDate);
      if (weekOfDate === 7) {
        weekOfDate = 0;
      }
      for (var i = 0; i < 7; i++) {
        let _theDate = moment(date).subtract(weekOfDate - i, "d");
        arr.push({
          date: _theDate.format("YYYY-MM-DD"),
          week: weeks[i],
          isToday: _theDate.format("YYYY-MM-DD") === today.format("YYYY-MM-DD"),
          isDay:
            _theDate.format("YYYY-MM-DD") === defaultDay.format("YYYY-MM-DD"),
        });
      }
      return arr;
    },

    /**
     *根据索引计算出样式
     */
    getTransform(index) {
      let vm = this;
      let style = {};
      if (index === vm.activeIndex) {
        style["transform"] = "translateX(" + vm.distan.x + "px)";
      }
      if (index < vm.activeIndex) {
        style["transform"] = "translateX(-100%)";
      }
      if (index > vm.activeIndex) {
        style["transform"] = "translateX(100%)";
      }
      style["transition"] = vm.isAnimation ? "transform 0.2s ease-out" : "none";
      return style;
    },

    /**
     * touchstart handle
     */
    touchstartHandle(event) {
      let vm = this,
        touch = event.touches[0];
      vm.start.x = touch.pageX;
      vm.start.y = touch.pageY;
    },

    /**
     * touchmove handle
     */
    touchmoveHandle(event) {
      let vm = this,
        touch = event.touches[0];
      vm.isAnimation = true;
      vm.end.x = touch.pageX;
      vm.end.y = touch.pageY;
      vm.distan.x = vm.end.x - vm.start.x;
      vm.distan.y = vm.end.y - vm.start.y;
      let dom =
        vm.distan.x < 0
          ? this.$refs.sliders.children[2]
          : this.$refs.sliders.children[0];
      if (vm.distan.x < 0) {
        dom.style["transform"] =
          "translateX(" + (vm.sliderWidth + vm.distan.x) + "px)";
      } else {
        dom.style["transform"] =
          "translateX(" + (-vm.sliderWidth + vm.distan.x) + "px)";
      }
    },

    /**
     * touchend handle
     */
    touchendHandle(event) {
      let vm = this,
        touch = event.changedTouches[0];
      vm.isAnimation = true;
      vm.end.x = touch.pageX;
      vm.end.y = touch.pageY;
      vm.distan.x = vm.end.x - vm.start.x;
      vm.distan.y = vm.end.y - vm.start.y;

      vm.getTouchDirection(vm.distan.x, vm.distan.y);
      if (vm.direction === "left") {
        vm.activeIndex = 2;
      } else if (vm.direction === "right") {
        vm.activeIndex = 0;
      } else {
        for (var i = 0; i < this.$refs.sliders.children.length; i++) {
          this.$refs.sliders.children[i].style["transform"] =
            "translateX(" + (i * 100 - 100) + "%)";
        }
      }
      vm.distan.x = 0;
      vm.distan.y = 0;
      vm.direction = null;
    },

    onTransitionEnd(index) {
      let vm = this;
      vm.isAnimation = false;
      if (index === 1 && this.activeIndex === 2) {
        vm.dates.push({
          date: moment(vm.dates[vm.activeIndex].date)
            .add(7, "d")
            .format("YYYY-MM-DD"),
        });
        vm.dates.shift();
        vm.activeIndex = 1;
      } else if (index === 1 && this.activeIndex === 0) {
        vm.dates.unshift({
          date: moment(vm.dates[vm.activeIndex].date)
            .subtract(7, "d")
            .format("YYYY-MM-DD"),
        });
        vm.dates.pop();
        vm.activeIndex = 1;
      }
    },

    /**
     * getAngle 计算角度
     */
    getAngle(x, y) {
      return (Math.atan2(y, x) * 180) / Math.PI;
    },

    /**
     * getTouchDirection 获取滑动方向
     */
    getTouchDirection(x, y) {
      let vm = this;
      if (Math.abs(x) > 20) {
        let angle = vm.getAngle(x, y);
        if (angle >= -45 && angle <= 45) {
          //向右
          vm.direction = "right";
        } else if (
          (angle >= 135 && angle <= 180) ||
          (angle >= -180 && angle < -135)
        ) {
          //向左
          vm.direction = "left";
        }
      }
    },

    dayClickHandle(date) {
      this.$emit("dateClick", date);
      this.$emit("update:defaultDate", date);
    },

    /**
     *生成日期样式
     */
    buildDateStyle(isToday, isActive) {
      let vm = this;
      let res = {};

      if (isToday) {
        res.color = vm.todayTxtColor || "";
        res.backgroundColor = vm.todayBgColor || "";
      }

      if (isActive) {
        res.color = vm.activeTxtColor || "";
        res.backgroundColor = vm.activeBgColor || "";
      }

      return res;
    },
  },
};
</script>
<style lang="scss" scoped>
.year_str {
  background-color: #fff;
  line-height: 20px;
  text-align: center;
  font-size: var(--font_size_2);
  padding-top: 5px;
}

.week-slider {
  height: 110px;
  width: 100%;
  overflow: hidden;
  padding: 5px;
  margin-top: 0px;

  .sliders {
    position: relative;

    .slider {
      width: 100%;
      height: 110px;
      display: flex;
      position: absolute;
      top: 0;
      left: 0;
      overflow: hidden;

      .day {
        flex: 1;

        div {
          height: 35px;
          width: 35px;
          margin: auto;
          text-align: center;
          line-height: 35px;
          font-size: var(--font_size_2);
          border-radius: 50%;
          position: relative;
          &.sameDay {
            background-color: #999;
            color: #fff;
          }
        }
      }
    }
  }
}
</style>

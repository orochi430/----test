<template>
  <!-- 使用vant的swiper封装一个时间选择器 -->
  <div class="week-slider">
    <div class="slider-title">
      <i class="icon iconfont iconln_jiantouzuo" :class="{'title-icon-active':true}" @click="prevClick()"></i>
      <span>{{ getYearMonth(prev_now_next[1][0].date) }}</span>
      <i class="icon iconfont iconln_jiantouyou" :class="{'title-icon-active':true}" @click="nextClick()"></i>
    </div>
    <div class="slider-content">
      <van-swipe ref="swiperCon" :touchable="touchable" :initial-swipe="currentIndex" :loop="false"
        :show-indicators="false" class="my-swiper" @change="onChange">
        <van-swipe-item v-for="base in prev_now_next" :key="base[0].date">
          <div class="date-box">
            <div class="lang-box">
              <div v-for="(item,inx) in base" :key="inx" class="day-of-week">
                <div class="day-title">{{ item.week }}</div>
                <div :class="{active: judgeChecked(item.date)}" class="day-date" @click="dateClick(item)">
                  <span>{{ item.date.split('-')[2] }}</span>
                  <!-- item.isToday && !judgeChecked(item.date)  判断是否是今天的情况 -->
                  <!-- addSch(item.date) && !judgeChecked(item.date)  判断是否有日程的情况 -->
                  <span v-show="addSch(item.date)"
                    :style="{'background': addSch(item.date) && judgeChecked(item.date) ? todayDotcolor : ''}"
                    :class="{'has-sch': addSch(item.date) && !judgeChecked(item.date)}" class="day-dot"></span>
                </div>
              </div>
            </div>
          </div>
        </van-swipe-item>
      </van-swipe>
    </div>
  </div>
</template>

<script>
  export default {
    name: "timePicker",
    props: {
      touchable: {
        type: Boolean,
        default: true,
        desc: "能否手动滑动切换"
      },
      clickMode: {
        type: String,
        default: "month",
        desc: "切换按钮的切换模式 可选month/week"
      },
      endSliderCallBack: {
        type: Function,
        default: function () {
          return false;
        },
        desc: "自定义滑动完成之后触发的回调函数"
      },
      defaultDate: {
        type: String,
        default: moment().format("YYYY-MM-DD"),
        desc: "传入的时间 格式为2020-01-01这样"
      },
      activeBgcolor: {
        type: String,
        default: "#35c",
        desc: "选中日期的背景颜色"
      },
      activeTextcolor: {
        type: String,
        default: "#FFF",
        desc: "选中日期的文字颜色"
      },
      todayDotcolor: {
        type: String,
        default: "#35c",
        desc: "当前日期下小点的颜色"
      },
      havaSch: {
        type: Array,
        default: () => { return [] }
      },
      startNumber: {
        type: Number,
        default: 1,
        desc: "日期从星期几开始,默认为1表示星期一开始到星期天,取值范围1-7"
      },
      language: {
        type: String,
        default: "ch",
        desc: "显示的文字是英语还是汉字,能结合startNumber来自动偏移"
      },
      cancelChecked: {
        type: Boolean,
        default: false
      },
    },
    data() {
      return {
        prev_now_next: [], //上周-本周-下周的数组
        currentIndex: 1,
        weekLanguages: {},
        checkedDate: "" //选中的日期
      };
    },
    computed: {},
    watch: {
      cancelChecked(val) {
        if (val) {
          this.checkedDate = "";
        }
      }
    },
    created: function () {
      this.initTimer(this.defaultDate);
    },
    mounted: function () { },
    methods: {
      //初始化组件的方法
      initTimer(date) {
        var self = this;
        this.checkedDate = "";
        this.weekLanguages = {
          ch: ["一", "二", "三", "四", "五", "六", "日"],
          en: ["Mon", "Tue", "Wed", "Thur", "Fri", "Sat", "Sun"],
          pos: [1, 2, 3, 4, 5, 6, 7] //pos是作为标记用,当然也能当做language的类型用
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
        //抛出当前一周的数据
        this.$emit("thisWeek", this.prev_now_next[1]);
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
            self.weekLanguages.pos.indexOf(dateOfWeek) - (i),
            "d"
          );
          week.push({
            date: _formatDate.format("YYYY-MM-DD"), //日期
            isToday:
              today.format("YYYY-MM-DD") === _formatDate.format("YYYY-MM-DD"), //是否是今天
            week: self.weekLanguages[self.language][i] //星期几
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
          this.checkedDate = "";
        } else {
          this.checkedDate = date.date;
        }
        //抛出点击的日期
        this.$emit("checkedDate", this.checkedDate);
      },
      judgeChecked(date) {
        if (date == this.checkedDate) {
          return true;
        }
        return false;
      },
      //点击获取上一周/月
      prevClick() {
        if (this.clickMode == "week") {
          this.$refs.swiperCon.prev();
        } else if (this.clickMode == "month") {
          var reWriter = moment(this.prev_now_next[1][0].date)
            .subtract(1, "months")
            .format("YYYY-MM-DD");
          this.prev_now_next = [];
          this.initTimer(reWriter);
        }
      },
      //点击获取上一周/月
      nextClick() {
        if (this.clickMode == "week") {
          this.$refs.swiperCon.next();
        } else if (this.clickMode == "month") {
          var reWriter = moment(this.prev_now_next[1][0].date)
            .add(1, "months")
            .format("YYYY-MM-DD");
          this.prev_now_next = [];
          this.initTimer(reWriter);
        }
      },
      //获取年月
      getYearMonth(date) {
        var str = "";
        str = date.split("-")[0] + "年" + date.split("-")[1] + "月";
        return str;
      },
      //轮播完后触发的方法
      onChange(index) {
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
        //抛出当前周
        this.$emit("thisWeek", this.prev_now_next[1]);
        if (this.endSliderCallBack && dsf.isFunction(this.endSliderCallBack)) {
          this.endSliderCallBack();
        } else {
          // console.log("传入的不是函数");
        }
      }
    }
  };
</script>

<style scoped>
</style>
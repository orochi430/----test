<template>
  <div class="controlMobileDateShow">
    <div class="box_start">
      <span>开始时间</span>
      <p class="hour-and-second">{{ start.hoursAndSecond }}</p>
      <p class="month-and-day">
        {{ start.monthAndDay }}
      </p>
    </div>
    <div class="box_center">{{ gap>1? gap + '小时' : gap*60 + '分钟' }}</div>
    <div class="box_end">
      <span>结束时间</span>
      <p class="hour-and-second">{{ end.hoursAndSecond }}</p>
      <p class="month-and-day">
        {{ end.monthAndDay }}
      </p>
    </div>
  </div>
</template>

<script>
import propMixin from "./mixin";
export default {
  name: "controlMobileDateShow",
  components: {},
  mixins: [propMixin],
  props: ["formData"],
  data() {
    return {
      controlData: {
        startTimeStamp: 0,
        endTimeStamp: 0,
      },
    };
  },
  computed: {
    start() {
      let startDate = "";
      if (this.metaData.extra.startMetaId) {
        let dataKey = this.metaData.extra.startMetaId;
        let x = this.formData.main[dataKey].value + ":00";
        this.controlData.startTimeStamp =x ;
        startDate = this.getDate(new Date(x.replace(/-/g, "/")));
      }
      return startDate;
    },
    end() {
      let endDate = "";
      if (this.metaData.extra.endMetaId) {
        let dataKey = this.metaData.extra.endMetaId;
        let x = this.formData.main[dataKey].value + ":00";
        this.controlData.endTimeStamp =x ;
        endDate = this.getDate(new Date(x.replace(/-/g, "/")));
      }
      return endDate;
    },
    gap() {
      //2023-6-9 10:25:00 日期格式
      let s1=this.controlData.startTimeStamp;
      let s2=this.controlData.endTimeStamp;
      var reDate = /\d{4}-\d{1,2}-\d{1,2} /;
      s1 = new Date(
        (reDate.test(s1) ? s1 : "2018-1-1 " + s1).replace(/-/g, "/")
      );
      s2 = new Date(
        (reDate.test(s2) ? s2 : "2018-1-1 " + s2).replace(/-/g, "/")
      );
      var ms = s2.getTime() - s1.getTime();
      if (ms < 0) return 0;
      let x = (ms / 1000 / 60 / 60).toFixed(1);
      return x ;
    },
  },
  watch: {},
  methods: {
    getDate(time) {
      let date = time;
      let monthAndDay = date.getMonth() + 1 + "月" + date.getDate() + "日";
      monthAndDay = date.getFullYear() + '年' + monthAndDay
      let h =
        (date.getHours() < 10 ? "0" + date.getHours() : date.getHours()) + ":";
      let m =
        date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
      let hoursAndSecond = h + m;
      const weekNum = date.getDay();
      let week = "";
      switch (weekNum) {
        case 0:
          week = "周日";
          break;
        case 1:
          week = "周一";
          break;
        case 2:
          week = "周二";
          break;
        case 3:
          week = "周三";
          break;
        case 4:
          week = "周四";
          break;
        case 5:
          week = "周五";
          break;
        case 6:
          week = "周六";
          break;
      }
      return { monthAndDay, hoursAndSecond, week };
    },
  },
  created() {},
  mounted() {},
  destroyed() {},
};
</script>
<style lang="scss">
.controlMobileDateShow {
  width: 100%;
  height: 100%;
  font-size: 15px;
  line-height: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #333333;
  span{
    margin-bottom: 3px;
    font-size: var(--font_size_3);
    color: #999;
  }
  .box_start,
  .box_end {
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: var(--font_size_2);
    .hour-and-second {
      font-size: 20px;
      font-weight: 600;
    }
  }
  .box_center {
    border-radius: 16px;
    font-size: var(--font_size_3);
    padding: 2px 22px;
    height: 25px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #e7e7e7;
    position: relative;
  }
  .box_center::before,
  .box_center::after {
    position: absolute;
    box-sizing: border-box;
    content: " ";
    height: 1px;
    width: 16px;
    pointer-events: none;
    border-bottom: 1px solid #ccc;
    -webkit-transform: scaleY(0.5);
    transform: scaleY(0.5);
  }
  .box_center::before {
    left: -16px;
  }
  .box_center::after {
    right: -16px;
  }
  .month-and-day{
    margin-top: 3px;
    font-size: var(--font_size_4);
    color: #999;
  }
}
</style>

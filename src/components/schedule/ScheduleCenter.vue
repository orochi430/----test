<template>
  <div class="ds-schedule">
    <div class="tab_box">
      <van-sticky class="sticky">
        <!-- <van-nav-bar title="日程中心" left-arrow @click-left="$router.back()" /> -->
        <van-tabs v-model="tab_box.activeIdx" class="" @click="onClick">
          <van-tab title="unevalNum">
            <div slot="title" class="tab_title">个人日程</div>
            <div slot="default" class="tab_content"></div>
          </van-tab>
          <!-- <van-tab title="evalNum">
            <div slot="title" class="tab_title">部门日程</div>
            <div slot="default" class="tab_content"></div>
          </van-tab> -->
          <van-tab title="evalNum">
            <div slot="title" class="tab_title">领导日程</div>
            <div slot="default" class="tab_content"></div>
          </van-tab>
        </van-tabs>
        <time-picker
          :end-slider-call-back="endSliderCallBack"
          :active-bgcolor="activeBgcolor"
          :active-textcolor="activeTextcolor"
          :today-dotcolor="todayDotcolor"
          :start-number="startNumber"
          :click-mode="clickMode"
          :hava-sch.sync="havaSch"
          :cancel-checked="cancelChecked"
          @thisWeek="thisWeek"
          @checkedDate="checkedDate"
        ></time-picker>
      </van-sticky>
      <schedule-list
        ref="list"
        :week="week"
        :has-sch.sync="havaSch"
        :selected-date="selectedDate"
        :tab-indx="tab_box.activeIdx"
      ></schedule-list>
      <!-- to="/scheduleAdd" tag="div" -->
      <div v-show="tab_box.activeIdx === 0" @click="toaddScheduleAdd"  class="add">
        <van-icon name="plus" />
      </div>
    </div>
  </div>
</template>

<script>
import timePicker from "../common/timePicker";
import ScheduleList from "./ScheduleList";
export default {
  name: "ScheduleCenter",
  components: {
    ScheduleList,
    timePicker
  },
  data() {
    return {
      tab_box: {
        activeIdx: 0,
        listNum_0: 0,
        listNum_1: 0
      },
      endSliderCallBack: null,
      activeBgcolor: "#FF6A00",
      activeTextcolor: "#FFFFFF",
      todayDotcolor: "#FFFFFF",
      startNumber: 1,
      clickMode: "month",
      cancelChecked: false,
      havaSch: [], //存在数据的日期
      listData: [], //接口返回的数据列表的数据
      notHavedata: false, //接口有没有数据
      selectedDate: null,
      week: []
    };
  },
  mounted() {
    // let title = this.$route.query.titleName
    // document.title = title || '教学资料';
  },
  created: function() {
    console.log(this.selectedDate);
    // dsf.video.startWithConf("200115133833ZZXjSFQBZMMs1AyspxC");
  },
  methods: {
    // eslint-disable-next-line no-unused-vars
    onClick(name, title) {
      this.tab_box.activeIdx = name;
      this.cancelChecked = true;
      this.selectedDate = "";
    },
    thisWeek(week) {
      this.week = week;
    },
    checkedDate(day) {
      this.cancelChecked = false;
      this.selectedDate = day;
    },
    toaddScheduleAdd(){
      if(dsf.config.scheduleCenter.isCommonList){
        this.$router.push({path:`/commonForm/${dsf.config.scheduleCenter.commonListModuleId}`})
        return
      }
      if(dsf.config.projectName=="xzd"){//县政钉
        this.$router.push({path:"/commonForm/180719094152MnF6C2hEPtqIvhjJIxo"})
      }else{
        this.$router.push({path:"/scheduleAdd"})
      }
    }
  }
};
</script>
<style lang="scss" scoped>
// @import "../../assets/font/font.css";
@import "../../assets/styles/themes.scss";
@import "../../assets/styles/mixin.scss";

.sticky ::v-deep .van-sticky {
  background-color: #f5f5f5;
}
.add {
  position: fixed;
  right: 12px;
  bottom: 85px;
  width: 50px;
  height: 50px;
  @include background-theme("normal");
  color: #fff;
  border-radius: 50%;
  text-align: center;
  line-height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  .van-icon {
    font-size: 22px;
    font-weight: bold;
  }
}
</style>

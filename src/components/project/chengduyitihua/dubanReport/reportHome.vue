<template>
  <div id="inspector-statistics">
    <div class="tabs">
      <div class="tablist">
        <div
          v-for="(item, index) in tabslist"
          :key="index"
          :name="index"
          class="tab"
          :class="index == currentTabIndex ? 'tabactive' : ''"
          @click="changeTab(index)"
        >
          {{ item.name }}
        </div>
      </div>
      <div class="select-container">
        <div
          :class="it.selected ? 'select active' : 'select'"
          @click="changeSelect(index)"
          v-for="(it, index) in searchList"
          :key="it.id"
        >
          {{ it.name }}
        </div>
      </div>
      <div class="tabcontent">
        <div class="panel" v-show="currentTabIndex == 0">
          <reportOne
            :currentTabIndex="currentTabIndex"
            :tabslist="tabslist"
            :searchList="searchList"
            :searchIndex="searchIndex"
            :dateStart="dateStart"
            :dateEnd="dateEnd"
            :dateStr="dateStr"
          ></reportOne>
        </div>
        <div class="panel" v-if="currentTabIndex == 1">
          <reportTwo
            :currentTabIndex="currentTabIndex"
            :tabslist="tabslist"
            :searchList="searchList"
            :searchIndex="searchIndex"
            :dateStart="dateStart"
            :dateEnd="dateEnd"
            :dateStr="dateStr"
          ></reportTwo>
        </div>
        <div class="panel" v-if="currentTabIndex == 2">
          <reportThree
            :currentTabIndex="currentTabIndex"
            :tabslist="tabslist"
            :searchList="searchList"
            :searchIndex="searchIndex"
            :dateStart="dateStart"
            :dateEnd="dateEnd"
            :dateStr="dateStr"
          ></reportThree>
        </div>
      </div>
    </div>

    <van-popup
      v-model="isShowTypePicker"
      round
      position="bottom"
      :style="{ height: '35%' }"
      get-container="#app"
    >
      <div class="datetitle">查询</div>
      <div class="datebody">
        <div class="datelabel">
          <span>办理期限</span>
        </div>
        <div class="dateselect">
          <van-field
            readonly
            clickable
            name="calendar"
            :value="dateStart"
            placeholder="选择日期"
            @click="start = true"
          /><i class="iflex">——</i>
          <van-field
            readonly
            clickable
            name="calendar"
            :value="dateEnd"
            placeholder="选择日期"
            @click="end = true"
          />
        </div>
      </div>
      <div class="datefooter">
        <van-button type="default" @click="btnReset()">重置</van-button>
        <van-button type="info" @click="btnSure()">确定</van-button>
      </div>
      <van-calendar
        get-container="#app"
        :min-date="minDate1"
        :max-date="maxDate1"
        v-model="start"
        @confirm="startConfirm"
      />
      <van-calendar
        get-container="#app"
        :min-date="minDate2"
        :max-date="maxDate2"
        v-model="end"
        @confirm="endConfirm"
      />
    </van-popup>
  </div>
</template>
<script>
import reportOne from "./reportOne";
import reportTwo from "./reportTwo";
import reportThree from "./reportThree";
export default {
  name: "reportIndex",
  components: {
    reportOne,
    reportTwo,
    reportThree,
  },
  data() {
    return {
      currentTabIndex: 0,
      tabslist: [
        { name: "督办汇总" },
        { name: "市领导批示" },
        { name: "主办领导及处室" },
      ],
      searchList: [
        { id: 1, name: "近三个月", selected: true },
        { id: 2, name: "近六个月", selected: false },
        { id: 3, name: "近一年", selected: false },
        { id: 4, name: "更多", selected: false },
      ],
      searchIndex: 0,
      isShowTypePicker: false,
      dateStart: "",
      dateEnd: "",
      dateStr: "",
      start: false,
      end: false,
      minDate1: new Date(1970, 0, 1),
      maxDate1: new Date(),
      minDate2: new Date(1970, 0, 1),
      maxDate2: new Date(),
    };
  },
  created() {},
  mounted() {},
  methods: {
    btnReset() {
      this.dateStart = "";
      this.dateEnd = "";
      this.minDate1 = new Date(1970, 0, 1);
      this.maxDate1 = new Date();
      this.minDate2 = new Date(1970, 0, 1);
      this.maxDate2 = new Date();
    },
    btnSure() {
      this.start = false;
      this.end = false;
      this.isShowTypePicker = false;
      this.minDate1 = new Date(1970, 0, 1);
      this.maxDate1 = new Date();
      this.minDate2 = new Date(1970, 0, 1);
      this.maxDate2 = new Date();
      this.dateStr = this.dateStart + "|" + this.dateEnd;
    },
    startConfirm(date) {
      this.start = false;
      this.minDate2 = date;
      this.dateStart = dsf.date.format(date, "yyyy-mm-dd");
    },
    endConfirm(date) {
      this.end = false;
      this.maxDate1 = date;
      this.dateEnd = dsf.date.format(date, "yyyy-mm-dd");
    },
    changeTab(tabindex) {
      this.currentTabIndex = tabindex;

      //时间检索恢复第一个
      this.searchList.forEach((element) => {
        element.selected = false;
      });
      this.searchList[0].selected = true;
      this.searchIndex = 0;

      this.dateStr = "";
    },
    changeSelect(index) {
      this.searchIndex = index;
      this.searchList.forEach((element, eindex) => {
        if (index == eindex) element.selected = true;
        else element.selected = false;
      });
      if (index == 3) {
        this.isShowTypePicker = true;
      }
      this.dateStr = "";
    },
    typeConfirm(value, index) {
      this.currentType = value;
      this.currentTypeIndex = index;
      this.isShowTypePicker = false;
    },
    startDateConfirm(value) {
      if (
        new Date(value).getTime() > new Date(this.endDate.replace(/-/g, "/")).getTime()
      ) {
        dsf.layer.toast("开始日期不能大于结束日期");
        return;
      }
      this.startDate = this.dateFormat(value, "yyyy-MM-dd");
      this.isShowStartTimePicker = false;
    },
    endDateConfirm(value) {
      if (
        new Date(value).getTime() < new Date(this.startDate.replace(/-/g, "/")).getTime()
      ) {
        dsf.layer.toast("结束日期不能小于起始日期");
        return;
      }
      this.endDate = this.dateFormat(value, "yyyy-MM-dd");
      this.isShowEndTimePicker = false;
    },
    dateFormat(date, fmt) {
      //日期格式化
      date = new Date(date);
      var o = {
        "M+": date.getMonth() + 1,
        "d+": date.getDate(),
        "H+": date.getHours(),
        "m+": date.getMinutes(),
        "s+": date.getSeconds(),
        "q+": Math.floor((date.getMonth() + 3) / 3),
        S: date.getMilliseconds(),
      };
      var year = date.getFullYear().toString();
      year = year.length >= 4 ? year : "0000".substr(0, 4 - year.length) + year;

      if (/(y+)/.test(fmt))
        fmt = fmt.replace(RegExp.$1, (year + "").substr(4 - RegExp.$1.length));
      for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt))
          fmt = fmt.replace(
            RegExp.$1,
            RegExp.$1.length === 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length)
          );
      return fmt;
    },
  },
};
</script>

<style lang="scss" scoped>
#inspector-statistics {
  .tabs {
    .tablist {
      display: flex;
      justify-content: space-between;
      padding: 0.15rem 0.3rem;
      margin-top: 5px;
      .tab {
        font-size: 0.3rem;
        color: #5a5a5a;
        box-sizing: border-box;
        border-radius: 4px;
        padding: 0.1rem 0.26rem;
        background-color: #e8f2fc;
        font-weight: 400;
      }
      .tabactive {
        color: white;
        background-color: var(--normal) !important;
      }
    }
    .tabcontent {
      .panel {
        box-sizing: border-box;
        width: 100%;
      }
    }
  }
  .van-nav-bar {
    background-color: #02a7f0;

    ::v-deep .van-nav-bar__title {
      color: #fff;
      font-size: var(--font_size_1);
    }

    ::v-deep .van-nav-bar__text {
      color: white !important;
    }
  }

  .select-container {
    display: flex;
    justify-content: space-between;
    padding: 0.15rem 0.3rem;
    .select {
      background-color: #fff6df;
      color: #5a5a5a;
      font-size: 0.3rem;
      border-radius: 4px;
      padding: 0.1rem 0.26rem;
      font-weight: 400;
    }
    .active {
      background-color: #f7b509 !important;
      color: white;
    }
    .selece-type {
      display: flex;
      align-items: center;
      font-size: 0.36rem;

      span {
        margin-right: 10px;
        &:first-child {
          padding-left: 0.1rem;
          border-left: 5px solid #fff;
          position: relative;
          &::before {
            content: " ";
            position: absolute;
            height: 18px;
            width: 5px;
            top: 50%;
            left: -5px;
            -webkit-transform: translate(0, -50%);
            transform: translate(0, -50%);
            border-radius: 3px;
            background-color: var(--normal);
          }
        }
      }
    }
  }
}

.datetitle {
  text-align: center;
  color: black;
  font-size: 16px;
  font-weight: bold;
  border-bottom: 1px solid #eeeeee;
  padding: 15px 0px;
}
::v-deep .van-field {
  flex: 1;
}
.datebody {
  padding: 35px 35px 0px 35px;

  .datelabel {
    color: black;
    font-size: 16px;
    font-weight: bold;
    // padding: 25px 35px 0px 35px;
    // span {
    //   padding: 0.2rem 0.32rem;
    // }
  }
  .dateselect {
    display: flex;
    align-items: center;
    justify-content: center;
    ::v-deep .van-field__control {
      text-align: center !important;
    }
    .iflex {
      display: flex;
      text-align: center;
    }
  }
}
.datefooter {
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  ::v-deep .van-button {
    height: 0.68rem;
    width: 145px;
  }
}
</style>

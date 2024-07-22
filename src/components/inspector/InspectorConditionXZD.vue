<template>
  <div class="inspector-condition">
    <!-- <van-nav-bar title="督办情况" /> -->
    <!-- <div class="_header_top">
      <a
        :class="isConditionActive == 'fkqs1' ? '_active2' : ''"
        href="javascript:void(0)"
        @click="clickCondition('fkqs1')"
        >上期</a
      >

      <a
        :class="isConditionActive == 'fkqs2' ? '_active2' : ''"
        href="javascript:void(0)"
        @click="clickCondition('fkqs2')"
        >本期</a
      >

      <a
        :class="isConditionActive == 'fkqs0' ? '_active2' : ''"
        href="javascript:void(0)"
        @click="clickCondition('fkqs0')"
        >下期</a
      >
    </div> -->
    <div class="_header">
      <div
        :class="isActive == 'left' ? '_active' : ''"
        class="_btn"
        @click="clickHeader('left')"
      >
        未反馈<span v-if="noFeedbackTotal">({{ noFeedbackTotal }})</span>
      </div>
      <div
        :class="isActive == 'right' ? '_active' : ''"
        class="_btn"
        @click="clickHeader('right')"
      >
        已反馈<span v-if="alreadyFeedbackTotal"
          >({{ alreadyFeedbackTotal }})</span
        >
      </div>
    </div>
    <!-- 未反馈 -->
    <div
      v-if="isActive == 'left'"
      :class="{
        _content: true,
        _weifankui: isConditionActive == 'fkqs2',
        _yifanhui: isConditionActive != 'fkqs2',
      }"
    >
      <ul>
        <li v-for="(item, index) in listData" :key="index" class="_cell">
          <span class="icon iconfont icontouxiang"></span>
          <span class="_cell__title">{{ item.fkbm }}</span>
          <span
            :class="item.status == 1 ? '_yi _cell__value' : '_wei _cell__value'"
            >{{ item.status == 1 ? "已读" : "未读" }}</span
          >
        </li>
      </ul>
      <div class="_footer">
        <!-- <Ding-btn v-if="isConditionActive == 'fkqs2'" :prarms="dingObj" :options="{ size: 'large', type: 'info' }" text="DING一下"></Ding-btn> -->
        <Ding-btn
          :prarms="dingObj"
          :options="{ size: 'large', type: 'info' }"
          text="DING一下"
        ></Ding-btn>
      </div>
    </div>
    <!-- 已反馈 -->
    <div v-if="isActive == 'right'" class="_content _yifanhui">
      <ul>
        <li
          v-for="(item, index) in listData"
          :key="index"
          class="_cell"
          :class="{ cell_li: isActive == 'right' }"
          @click="handleClick(item)"
        >
          <div class="cell_line">
            <div class="cell_name">
              <span class="icon iconfont icontouxiang"></span>
              <span class="_cell__title">{{ item.fkbm }}</span>
              <!--<span class="_cell__title">{{ item.fkr }}</span>-->
            </div>
            <div class="cell_time">
              <span class="_yi _cell__value">{{ item.time }}</span>
            </div>
          </div>

          <div class="cell_content">反馈情况:{{ item.fkqk }}</div>
        </li>
      </ul>
    </div>
    <!-- <commonempty v-if="!listData.length"  /> -->
  </div>
</template>

<script>
import store from "@/common/util";
import DingBtn from "@/components/common/DingBtn";
export default {
  name: "InspectorCondition",
  components: {
    DingBtn,
  },
  data() {
    return {
      alreadyFeedbackTotal: 0,
      noFeedbackTotal: 0,
      isActive: "left",
      isConditionActive: "fkqs2",
      // fkqs0 往期 fkzt01 未反馈 fkzt02已反馈
      // fkqs1 上期 fkzt11 未反馈 fkzt12已反馈
      // fkqs2 本期 fkzt21 未反馈 fkzt22已反馈
      listData: [],
      listDataMock: {},
      type: 1,
      dingObj: {
        // alertDateTime: "2015-05-09 08:00",
        // startTime: "2015-05-09 08:00",
        // endTime: "2015-05-09 08:00",
        // deadlineTime: "2015-05-09 08:00",
        // ccUsers: ["100", "101"],
        // users: ["100", "101"]
      },
      params: {
        pk: "", //200325150619vUI5yw9djjGT8FKZsMh
      },
    };
  },
  mounted() {
    if (!this.$route.params.data) {
      if (!store.loadSessionStore("formData")) {
        this.$toast.fail("参数错误");
        this.$router.go(-1);
        return;
      } else {
        this.$route.params.data = store.loadSessionStore("formData");
      }
    } else {
      store.saveToSessionStore("formData", this.$route.params.data);
    }
    // console.log('mounted==>', this.$route.params.data.dataValue)
    this.params.pk = this.$route.params.data.dataValue["A0001"]; // 获取上一级id
    this.initList();
  },
  methods: {
    initList() {
      let self = this;
      dsf.http
        .get("fn/supervise/approval/detail", self.params)
        .then(function (res) {
          let { data } = res;
          // console.log(data)
          if (res.status === 200) {
            self.listDataMock = data;
            self.clickCondition("fkqs2");
          } else {
            self.dsf.layer.toast(res.message || "获取数据异常");
          }
        });
    },
    // 为反馈 已反馈按钮
    clickHeader(status) {
      this.isActive = status;
      this.filtersData();
    },
    // 上一期下一期按钮
    clickCondition(status) {
      this.isConditionActive = status;
      this.filtersData();
    },
    // 数据过滤
    filtersData() {
      if (this.isConditionActive == "fkqs0") {
        //往期
        this.noFeedbackTotal = this.listDataMock.fkqs0.fkzt01.length;
        this.alreadyFeedbackTotal = this.listDataMock.fkqs0.fkzt02.length;
      } else if (this.isConditionActive == "fkqs1") {
        //上期
        this.noFeedbackTotal = this.listDataMock.fkqs1.fkzt11.length;
        this.alreadyFeedbackTotal = this.listDataMock.fkqs1.fkzt12.length;
      } else {
        //本期
        this.noFeedbackTotal = this.listDataMock.fkqs2.fkzt21.length;
        this.alreadyFeedbackTotal = this.listDataMock.fkqs2.fkzt22.length;
      }
      if (this.isConditionActive == "fkqs0" && this.isActive == "left") {
        // 往期 未反馈
        this.listData = this.listDataMock.fkqs0.fkzt01;
      }
      if (this.isConditionActive == "fkqs0" && this.isActive == "right") {
        // 往期 已反馈
        this.listData = this.listDataMock.fkqs0.fkzt02;
      }
      if (this.isConditionActive == "fkqs1" && this.isActive == "left") {
        // 上期 未反馈
        this.listData = this.listDataMock.fkqs1.fkzt11;
      }
      if (this.isConditionActive == "fkqs1" && this.isActive == "right") {
        // 上期 已反馈
        this.listData = this.listDataMock.fkqs1.fkzt12;
      }
      if (this.isConditionActive == "fkqs2" && this.isActive == "left") {
        // 本期 未反馈
        this.listData = this.listDataMock.fkqs2.fkzt21;
      }
      if (this.isConditionActive == "fkqs2" && this.isActive == "right") {
        // 本期 已反馈
        this.listData = this.listDataMock.fkqs2.fkzt22;
      }
      let users = [];
      const reg = /(\d{4})-(\d{2})-(\d{2})(\s)(\d{2}):(\d{2})/;
      this.listData.forEach((item) => {
        let times;
        item.time = "";
        if (item.sjfksj) {
          times = reg.exec(item.sjfksj);
          item.time =
            times[2] + "-" + times[3] + " " + times[5] + ":" + times[6];
        }
        if (users.indexOf(item.foreignId) < 0) {
          users.push(item.foreignId);
        }
      });
      console.log("users==>", users);
      this.$set(this.dingObj, "users", users);
      // this.$set(this.dingObj, "ccUsers", users);
    },
    handleClick(item) {
      this.$router.push({
        name: "feedbackReadonly",
        params: {
          pk: item.id,
          moduleId: item.moduleId,
        },
      });
    },
  },
};
</script>

<style scoped lang="scss">
@import "../../assets/styles/themes.scss";
@import "../../assets/styles/mixin.scss";
::v-deep .van-nav-bar {
  height: 44px;
  .van-nav-bar__title {
    @include font_4;
    color: #000;
  }

  .van-icon-arrow-left {
    color: #000;
    font-weight: 600;
    font-size: 1.5em;
  }
}
.inspector-condition {
  * {
    box-sizing: border-box;
  }
  display: flex;
  flex-direction: column;
  ._header_top {
    display: flex;
    @include font_4(true);
    justify-content: space-between;
    align-items: center;
    background: #fff;
    padding: 15px;
    padding-bottom: 0;
    ._btn {
      padding: 10px;
      @include border-theme(1px, solid, "normal");
      border-radius: 5px;
    }
    ._last {
    }
    ._next {
    }
  }
  ._active {
    @include background-theme(main);
    color: #ffffff;
  }
  ._active2 {
    @include font-theme(main);
  }
  ._header {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 58px;
    background: #fff;
    ._btn {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 173px;
      height: 34px;
      @include border-theme(1px, solid, normal);
      @include font_4(true);
    }
  }
  ._content {
    flex: 1;
    margin: 15px 0;
    padding: 0 15px;
    background: #fff;
    ul {
      height: calc(100vh - 215px);
      flex: 1;
      overflow-y: auto;
      ._cell {
        display: flex;
        align-items: center;
        padding: 15px 0 12px;

        .icontouxiang {
          color: #3296fa;
          font-size: 22px;
          margin-right: 10px;
        }
        ._cell__title {
          flex: 1;
          @include font_4(true);
          color: #000;
        }
        ._cell__value {
          @include font_6(true);
          color: $fontColor;
        }
      }
      .cell_li {
        display: block;
        .cell_content {
          font-size: var(--font_size_3) !important;
          color: #999;
          margin-top: 0px;
          line-height: 26px;
          word-break: break-all;
        }
        .cell_line {
          overflow: hidden;
          width: 100%;
          line-height: 30px;
          margin-bottom: 10px;
          .cell_name {
            float: left;
          }
          .cell_time {
            float: right;
          }
        }
      }
    }
    ._footer {
      width: 100%;
      height: 83px;
      background: #fff;
      position: fixed;
      left: 0;
      bottom: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      .van-button {
        width: 346px;
        height: 48px;
        border-radius: 12px;
        @include background-theme(main);
      }
    }
  }

  ._weifankui {
    ._cell {
      ._wei {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 23px;
        width: 60px;
        background: #c9e5fc;
        color: #3296fa !important;
        border-radius: 4px !important;
      }
      ._yi {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 23px;
        width: 60px;
        background: #d8d8d8;
        color: #999;
        border-radius: 4px !important;
      }
    }
  }
  ._yifanhui {
    ul {
      height: calc(100vh - 102px);
      overflow-y: auto;
    }
  }
}
</style>

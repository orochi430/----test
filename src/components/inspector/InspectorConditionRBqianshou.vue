<template>
  <div class="inspector-condition">
    <!-- <van-nav-bar title="督办情况" /> -->
    <!-- <div class="_header_top"> -->
    <!-- <div class="_btn _last" @click="clickLast('last')">上一期</div> -->
    <!-- <div class="_btn _next"
        @click="clickNext('next')"
      >下一期</div>-->
    <!-- <a
        :class="isConditionActive == 'fkqs1' ? '_active2':''"
        href="javascript:void(0)"
        @click="clickCondition('fkqs1')"
      >上期</a> -->
    <!-- // fkqs0 往期 ；fkqs1 上期 ； fkqs2 本期-->
    <!-- <a
        :class="isConditionActive == 'fkqs2' ? '_active2':''"
        href="javascript:void(0)"
        @click="clickCondition('fkqs2')"
      >本期</a> -->

    <!-- <a
        :class="isConditionActive == 'fkqs0' ? '_active2':''"
        href="javascript:void(0)"
        @click="clickCondition('fkqs0')"
      >下期</a> -->
    <!-- <van-button :class="isConditionActive == 'fkqs0' ? '_active' : ''" class="_btn" plain type="info" @click="clickCondition('fkqs0')">往期</van-button>
      <van-button :class="isConditionActive == 'fkqs1' ? '_active' : ''" class="_btn" plain type="info" @click="clickCondition('fkqs1')">上期</van-button>
      <van-button :class="isConditionActive == 'fkqs2' ? '_active' : ''" class="_btn" plain type="info" @click="clickCondition('fkqs2')">本期</van-button>-->
    <!-- </div> -->
    <div class="_header">
      <div
        :class="isActive == 'left' ? '_active' : ''"
        class="_btn"
        @click="clickHeader('left')"
      >
        未签收<span v-if="noFeedbackTotal">({{ noFeedbackTotal }})</span>
      </div>
      <div
        :class="isActive == 'right' ? '_active' : ''"
        class="_btn"
        @click="clickHeader('right')"
      >
        已签收<span v-if="alreadyFeedbackTotal"
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
        <li
          style="border-bottom: 2px solid #e5e5e5"
          v-for="(item, index) in wfkData"
          :key="index"
          class="_cell"
        >
          <span class="icon iconfont icontouxiang"></span>
          <span class="_cell__title">{{ item.cbrText }}</span>
          <span>{{ item.cbdate }}</span>
        </li>
      </ul>
      <div class="_footer">
        <Ding-btn
          v-if="isConditionActive == 'fkqs2'"
          :prarms="dingObj"
          :options="{ size: 'large', type: 'info' }"
          text="DING一下"
        ></Ding-btn>
        <!-- <div
          class="box" :style="{ ...defaultStyles}"
          v-if="dsf.config.ddSetting.isDing"
        >
          <van-button
            type="info"
            @click="cuiban"
            >催办</van-button>

        </div> -->
      </div>
    </div>
    <!-- 已反馈 -->
    <div v-if="isActive == 'right'" class="_content _yifanhui">
      <ul>
        <li
          style="border-bottom: 2px solid #e5e5e5"
          v-for="(item, index) in wfkData1"
          :key="index"
          class="_cell"
        >
          <span class="icon iconfont icontouxiang"></span>
          <span class="_cell__title">{{ item.cbrText }}</span>
          <span>{{ item.cbdate }}</span>
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
  name: "InspectorConditionRBqianshou",
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
      defaultStyles: {
        height: "48px",
        width: "96%",
        borderRadius: "6px",
      },
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
      activeNames: [],
      wfkData: [],
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
    this.params.pk = this.$route.params.data.dataValue["B0035"]; // 获取上一级id
    console.log(this.params.pk);
    this.initList();
  },
  methods: {
    initList() {
      let self = this;
      let id = this.$route.params.data.dataValue["B0035"];
      dsf.http
        .get(
          `fn/superviseV5/feedback/getFeedBackByFid?id=${id}&rank=2`,
          self.params
        )
        .then(function (res) {
          /* let {
                        data
                    } = res;
                    if (res.status === 200) {
                        self.listData = data.data;
                        console.log(self.listDataMock)
                        // console.log(self.listDataMock)
                        // self.clickCondition("fkqs2");
                    } else {
                        self.dsf.layer.toast(res.message || "获取数据异常");
                    } */
          self.listData = [
            {
              deptName: "部领导",
              data: [
                {
                  feedBackUserName: "李小兵",
                  strDate: "2021-10-13",
                  content: "已反馈",
                },
              ],
            },
            {
              deptName: "B司局",
              data: [
                {
                  feedBackUserName: "孙达",
                  strDate: "2021-10-13",
                  content: "已反馈",
                },
              ],
            },
            {
              deptName: "C司局",
              data: [
                {
                  feedBackUserName: "陆杨",
                  strDate: "2021-10-13",
                  content: "已反馈",
                },
              ],
            },
            {
              deptName: "D司局",
              data: [
                {
                  feedBackUserName: "段凯涛",
                  strDate: "2021-10-13",
                  content: "已反馈",
                },
              ],
            },
          ];
        });
      dsf.http
        .get(
          `fn/superviseV5/feedback/getNoFeedBackByFid?id=${id}&rank=2`,
          self.params
        )
        .then(function (res) {
          /* let { data } = res;
          console.log(data);
          if (res.status === 200) {
            self.wfkData = data.data;
            let users = [];
            console.log(self.wfkData);
            self.wfkData.forEach((item) => {
              if (users.indexOf(item.foreignId) < 0) {
                users.push(item.foreignId);
              }
            });
            let sessionUser = dsf.util.loadSessionStore("user");
            let canObj = {};
            let canUser = self.wfkData.reduce((cur, next) => {
              canObj[next.foreignId] || next.foreignId == sessionUser.foreignId
                ? ""
                : (canObj[next.foreignId] = true && cur.push(next));
              return cur;
            }, []);
            canUser.forEach((item) => {
              item.user_name = item.cbrText;
              item.foreign_id = item.foreignId;
              item.id = item.foreignId;
            });
            console.log("users==>", users);
            console.log("canUser", canUser);
            self.$set(self.dingObj, "users", users);
            self.$set(self.dingObj, "selectPerson", canUser);
          } else {
            self.dsf.layer.toast(res.message || "获取数据异常");
          }
        }); */
          self.wfkData = [
            {
              cbrText: "北京分社",
              cbbmText: "技术部",
              status: 1,
              foreignId: "04315916189527314",
            },
            {
              cbrText: "天津分社",
              cbbmText: "文艺部",
              foreignId: "01073527405729134428",
              status: 1,
            },
            {
              cbrText: "上海分社",
              cbbmText: "人事局",
              foreignId: "121068281424150312",
              status: 1,
            },
            {
              cbrText: "重庆分社",
              cbbmText: "人事局",
              foreignId: "121068281424150312",
              status: 1,
            },
          ];
          self.wfkData1 = [
            {
              cbrText: "河北分社",
              cbbmText: "新闻协调部",
              status: 1,
              cbdate: "2020-10-10",
              foreignId: "04315916189527314",
            },
            {
              cbrText: "山西分社",
              cbbmText: "新闻协调部",
              foreignId: "01073527405729134428",
              status: 1,
              cbdate: "2020-10-11",
            },
            {
              cbrText: "内蒙古分社",
              cbbmText: "技术部",
              foreignId: "121068281424150312",
              status: 1,
              cbdate: "2020-10-10",
            },
            {
              cbrText: "辽宁分社",
              cbbmText: "技术部",
              foreignId: "121068281424150312",
              cbdate: "2020-10-12",
              status: 1,
            },
            {
              cbrText: "吉林分社",
              cbbmText: "技术部",
              foreignId: "121068281424150312",
              cbdate: "2020-10-10",
              status: 1,
            },
            {
              cbrText: "黑龙江分社",
              cbbmText: "技术部",
              foreignId: "121068281424150312",
              cbdate: "2020-10-11",
              status: 1,
            },
            {
              cbrText: "江苏分社",
              cbbmText: "技术部",
              foreignId: "121068281424150312",
              cbdate: "2020-10-09",
              status: 1,
            },
          ];
          let users = [];
          let sessionUser = dsf.util.loadSessionStore("user");
          let canObj = {};
          let canUser = self.wfkData.reduce((cur, next) => {
            canObj[next.foreignId] || next.foreignId == sessionUser.foreignId
              ? ""
              : (canObj[next.foreignId] = true && cur.push(next));
            return cur;
          }, []);
          canUser.forEach((item) => {
            item.user_name = item.cbrText;
            item.foreign_id = item.foreignId;
            item.id = item.foreignId;
          });
          console.log("users==>", users);
          console.log("canUser", canUser);
          self.$set(self.dingObj, "users", users);
          self.$set(self.dingObj, "selectPerson", canUser);
        });
    },
    // 为反馈 已反馈按钮
    clickHeader(status) {
      this.isActive = status;
      // this.filtersData();
    },
    // 上一期下一期按钮
    clickCondition(status) {
      console.log(status);
      this.isConditionActive = status;
      this.filtersData();
    },
    shipin() {
      dd.biz.conference.videoConfCall({
        title: "视频会议",
        calleeCorpId: "dinga215a69365c38b4e24f2f5cc6abecb85",
        calleeStaffIds: [
          "68322808-685947715",
          "0428350360389383399",
          "10070005571930976529",
        ],
        onSuccess: function () {},
        onFail: function () {},
      });
    },
    cuiban() {
      let self = this;
      dsf.http.post(`fn/cuibanRB`).then(() => {
        self.dsf.layer.toast("催办成功");
      });
    },
    // 数据过滤
    filtersData() {
      if (this.isConditionActive == "fkqs0") {
        //往期
        this.noFeedbackTotal = this.listDataMock.fkqs0.fkzt01.length;
        this.alreadyFeedbackTotal = this.listDataMock.fkqs0.fkzt02.length;
      } else if (this.isConditionActive == "fkqs1") {
        //上期
        this.noFeedbackTotal =
          this.listDataMock.lenght > 1 ? this.listDataMock[1].fkzt1.length : 0;
        this.alreadyFeedbackTotal =
          this.listDataMock.lenght > 1 ? this.listDataMock[1].fkzt2.length : 0;
      } else {
        //本期
        this.noFeedbackTotal = this.listDataMock[0].fkzt1.length;
        this.alreadyFeedbackTotal = this.listDataMock[0].fkzt2.length;
      }
      if (this.isConditionActive == "fkqs0" && this.isActive == "left") {
        // 往期 未反馈
        this.listData = this.filterData(this.listDataMock.fkqs0.fkzt01);
        console.log(this.listData);
      }
      if (this.isConditionActive == "fkqs0" && this.isActive == "right") {
        // 往期 已反馈
        this.listData = this.listDataMock.fkqs0.fkzt02;
      }
      if (this.isConditionActive == "fkqs1" && this.isActive == "left") {
        // 上期 未反馈
        this.listData =
          this.listDataMock.lenght > 1
            ? this.filterData(this.listDataMock[1].fkzt1)
            : [];
      }
      if (this.isConditionActive == "fkqs1" && this.isActive == "right") {
        // 上期 已反馈
        this.listData =
          this.listDataMock.lenght > 1 ? this.listDataMock[1].fkzt2 : [];
      }
      if (this.isConditionActive == "fkqs2" && this.isActive == "left") {
        // 本期 未反馈
        this.listData = this.filterData(this.listDataMock[0].fkzt1);
      }
      if (this.isConditionActive == "fkqs2" && this.isActive == "right") {
        // 本期 已反馈
        this.listData = this.listDataMock[0].fkzt2;
      }
      let users = [];
      const reg = /(\d{4})-(\d{2})-(\d{2})(\s)(\d{2}):(\d{2})/;
      console.log(this.listData);
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
      let sessionUser = dsf.util.loadSessionStore("user");
      let canObj = {};
      let canUser = this.listData.reduce((cur, next) => {
        canObj[next.foreignId] || next.foreignId == sessionUser.foreignId
          ? ""
          : (canObj[next.foreignId] = true && cur.push(next));
        return cur;
      }, []);
      canUser.forEach((item) => {
        item.user_name = item.fkr;
        item.foreign_id = item.foreignId;
        item.id = item.foreignId;
      });
      console.log("users==>", users);
      console.log("canUser", canUser);
      this.$set(this.dingObj, "users", users);
      this.$set(this.dingObj, "selectPerson", canUser);
      // this.$set(this.dingObj, "ccUsers", users);
    },
    filterData(data) {
      let arr = [];
      data.forEach((item) => {
        if (item.data.length) {
          item.data.forEach((itm) => {
            arr.push(itm);
          });
        }
      });
      return arr;
    },
    handleClick(item) {
      this.$router.push(
        `/commonForm/210608105939mkuTUSzHdhowHPHxlY8/2109121906368wtdwi06olY4uTNhozf`
      );
      // this.$router.push({
      //   name: "commonForm/",
      //   params: {
      //     pk: item.id,
      //     moduleId: item.moduleId
      //   }
      // });
    },
  },
};
</script>

<style lang="scss" scoped>
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
.ds-ding-btn {
  height: 100px;
  width: 100px;
  border: 1px solid red;
}
::v-deep.vanCollapse .van-cell__title {
  flex: 3;
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
    padding: 0;
    background: #fff;

    ul {
      height: calc(100vh - 215px);
      flex: 1;
      overflow-y: auto;

      ._cell {
        display: flex;
        align-items: center;
        padding: 15px 12px;

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
        border-bottom: 1px solid #e5e5e5;

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
            width: 200px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
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

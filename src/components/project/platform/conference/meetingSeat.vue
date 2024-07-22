<template>
  <div class="meetingSeat">
    <div class="in-box">
      <ol class="type">
        <li>
          <label for=""></label>
          <span>我的座位</span>
        </li>
        <li>
          <label for=""></label>
          <span>同行嘉宾</span>
        </li>
        <li>
          <label for=""></label>
          <span>其他嘉宾</span>
        </li>
        <li>
          <label for=""></label>
          <span>无嘉宾</span>
        </li>
      </ol>
      <img class="img" src="@/assets/imgs/zuowei.png" alt="" />
      <ul class="list">
        <li
          v-for="(ele, index) in List"
          :key="index"
          :class="{
            active: ele.isCurrentUser,
            togetherUser: false,
            'margin-li': index > 39 && index < 48,
          }"
        >
          <div>{{ ele.userName }}</div>
        </li>
      </ul>
    </div>
    <div class="footer">
      <div class="foot-one">
        <p>
          <label for="">我的座位</label>
          <span v-if="PersonData.roomRow">{{
            PersonData.roomRow + "排" + PersonData.roomCol + "座"
          }}</span>
        </p>
        <label for="">VR会场</label>
      </div>
      <!-- <p>同行人员</p>
        <div class="foot-two">
            <div>
                <span>9排2座</span>
                <span>任茂</span>
            </div>
            <div>
                <span>9排2座</span>
                <span>任茂</span>
            </div>
            <div>
                <span>9排2座</span>
                <span>任茂</span>
            </div>
            <div>
                <span>9排2座</span>
                <span>任茂</span>
            </div>
        </div> -->
    </div>
  </div>
</template>

<script>
export default {
  name: "meetingSeat",

  components: {},
  data() {
    return {
      List: [],
      PersonData: "",
      displacement: {
        scale: 1,
      },
    };
  },
  computed: {},
  watch: {},
  methods: {
    getDistance(start, stop) {
      // Math.hypot()计算参数的平方根
      return Math.hypot(stop.x - start.x, stop.y - start.y);
    },
    getData() {
      dsf.http
        .post("fn/conferenceMobile/getMeetingSeat", {
          meetingId: this.$route.query.id,
        })
        .done((res) => {
          console.log(res);
          if (res.code == "200") {
            if (res.data) {
              res.data.forEach((ele) => {
                ele.isCurrentUser ? (this.PersonData = ele) : "";
                ele.rank = Number((ele.roomRow - 1) * 8) + Number(ele.roomCol);
              });
              console.log(res);
              this.List.forEach((item, index) => {
                res.data.forEach((ele) => {
                  if (ele.rank == item.rank) {
                    item.roomRow = ele.roomRow;
                    item.isCurrentUser = ele.isCurrentUser;
                    item.systemUserId = ele.systemUserId;
                    item.roomCol = ele.roomCol;
                    item.userName = ele.userName;
                    item.userId = ele.userId;
                  }
                });
              });
            }
          } else {
            dsf.layer.toast(res.message);
          }
        });
    },
  },
  created() {},
  mounted() {
    for (let index = 0; index < 80; index++) {
      let arr = {
        roomRow: "",
        isCurrentUser: false,
        systemUserId: "",
        roomCol: "",
        userName: "",
        userId: "",
        rank: index,
      };
      this.List.push(arr);
    }
    this.getData();
    let that = this;
    this.$nextTick(() => {
      // 获取放大或缩小的区域DOM
      let matrix_box = document.querySelector(".meetingSeat");

      let slide_box = document.querySelector(".meetingSeat .in-box"); //滑动区域
      matrix_box.addEventListener("touchstart", function (event) {
        var touches = event.touches;
        var events = touches[0];
        var events2 = touches[1];

        // event.preventDefault();

        // 第一个触摸点的坐标
        that.displacement.pageX = events.pageX;
        that.displacement.pageY = events.pageY;

        that.displacement.moveable = true;

        if (events2) {
          that.displacement.pageX2 = events2.pageX;
          that.displacement.pageY2 = events2.pageY;
        }

        that.displacement.originScale = that.displacement.scale || 1;
        // console.log(that.displacement);
      });
      document.addEventListener("touchmove", function (event) {
        if (!that.displacement.moveable) {
          return;
        }

        event.preventDefault();

        var touches = event.touches;
        var events = touches[0];
        var events2 = touches[1];
        // 双指移动
        if (events2) {
          // 第2个指头坐标在touchmove时候获取
          if (!that.displacement.pageX2) {
            that.displacement.pageX2 = events2.pageX;
          }
          if (!that.displacement.pageY2) {
            that.displacement.pageY2 = events2.pageY;
          }

          // 双指缩放比例计算
          var zoom =
            that.getDistance(
              {
                x: events.pageX,
                y: events.pageY,
              },
              {
                x: events2.pageX,
                y: events2.pageY,
              }
            ) /
            that.getDistance(
              {
                x: that.displacement.pageX,
                y: that.displacement.pageY,
              },
              {
                x: that.displacement.pageX2,
                y: that.displacement.pageY2,
              }
            );
          // 应用在元素上的缩放比例
          var newScale = that.displacement.originScale * zoom;
          // 最大缩放比例限制
          // if (newScale > 1) {
          //  newScale = 1;
          //  }

          // 最小缩放比例限制
          // if (newScale < 1) {
          //   newScale = 1;
          // }
          // 记住使用的缩放值
          that.displacement.scale = newScale;
          // 图像应用缩放效果
          // console.log(newScale);
          matrix_box.style.transform = "scale(" + newScale + ")";
          // 设置旋转元素的基点位置
          matrix_box.style.transformOrigin = "0px 0px 0px";

          // 设置左右滑动空间
          slide_box.style.width =
            matrix_box.getBoundingClientRect().width + "px";
          slide_box.style.height =
            matrix_box.getBoundingClientRect().height + "px";
        }
      });
    });
  },
  destroyed() {},
};
</script>

<style lang="scss" scoped>
@import "@/assets/styles/themes.scss";
@import "@/assets/styles/mixin.scss";

.meetingSeat {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 54px 10px 84px;
  overflow: auto;
  .in-box {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 15px 10px;
    width: 100%;
    padding-top: 10px;
    background: #fff;
    border-radius: 4px;

    .type {
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 100%;

      li {
        display: flex;
        align-items: center;
        justify-content: center;
        flex: 1;
        label {
          width: 14px;
          height: 14px;
          margin-right: 5px;
        }

        span {
          color: #333333;
          font-size: var(--font_size_3);
          text-align: center;
          font-weight: 400;
        }

        &:nth-child(1) {
          label {
            background: #0075cd;
          }
        }

        &:nth-child(2) {
          label {
            background: #32c5ff;
          }
        }

        &:nth-child(3) {
          label {
            background: #fff;
            border: 2.34px solid #cfcfcf;
          }
        }

        &:nth-child(4) {
          label {
            background: #ffffff;
            border: 2.34px solid rgba(207, 207, 207, 0.29);
          }
        }
      }
    }

    .img {
      margin-top: 30px;
      margin-bottom: 15px;
      width: 92%;
      background-size: 100% 100%;
    }

    .list {
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      margin-top: 18px;

      li {
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 7px 3.5px;
        padding: 0 3px;
        width: calc(12.5% - 8px);
        height: 22px;
        font-size: var(--font_size_2) !important;
        background: #ffffff;
        border: 2.34px solid rgba(207, 207, 207, 1);
        &:nth-child(8n + 4) {
          margin-right: 5px;
        }
        div {
          transform: scale(0.7);
          font-size: var(--font_size_4);
          color: #333333;
          text-align: center;
          font-weight: 600;
          white-space: nowrap;
        }

        &.margin-li {
          margin-top: 25px;
        }

        &.active {
          background: #0075cd;
          border: 2.34px solid rgba(0, 146, 255, 1);

          div {
            color: #fff;
          }
        }

        &.togetherUser {
          background: #32c5ff;
          border: 2.34px solid rgba(133, 220, 255, 1);

          div {
            color: #fff;
          }
        }
      }
    }
  }

  .footer {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 10px 15px;
    background: #fff;

    .foot-one {
      display: flex;
      align-items: center;
      justify-content: space-between;

      > p {
        display: flex;
        align-items: center;

        label {
          margin-right: 30px;
          font-size: 18px;
          color: #333333;
          text-align: center;
          font-weight: 400;
        }

        span {
          font-size: 18px;
          color: #333333;
          text-align: center;
          font-weight: 600;
        }
      }

      > label {
        padding: 8px 12px;
        background: #3389e0;
        border-radius: 20px;
        font-size: var(--font_size_2);
        color: #ffffff;
        font-weight: 600;
      }
    }

    > p {
      margin: 8px 0 5px 0;
      font-size: 18px;
      color: #333333;
      font-weight: 400;
    }

    .foot-two {
      display: flex;
      align-items: center;
      justify-content: space-between;

      > div {
        display: flex;
        flex-direction: column;
        align-items: center;
        flex: 1;
        height: 44px;
        margin-right: 15px;
        background: #32c5ff;
        border: 2.34px solid rgba(133, 220, 255, 1);

        &:nth-child(4) {
          margin-right: 0;
        }
        span {
          color: #ffffff;
          text-align: center;
          font-weight: 500;
        }
      }
    }
  }
}
</style>

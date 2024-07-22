<template>
  <div class="observe">
    <div class="richeng">
      <div
        :class="{ active: currentIndex == index, over: item.passDate }"
        v-for="(item, index) in data"
        :key="index"
        @click="changeItem(index)"
        :id="`tab-${index}`"
      >
        <span>{{ formatDate(item.date, "D") }}</span>
        <p>{{ formatDate(item.date, "yyyy-mm-dd") }}</p>
      </div>
    </div>
    <div class="guanmo" v-if="data.length > 0">
      <div class="inputs1">
        <span>观摩车辆</span>
        <p>{{ curItem.car_name }}</p>
      </div>
      <div class="inputs1">
        <span>车牌号</span>
        <p>{{ curItem.car_num }}</p>
      </div>
      <div class="inputs2">
        <div class="title">联络员</div>
        <div class="nerr">
          <div v-for="(obj, i) in curItem.connect_user" :key="'user' + i">
            <span>{{ obj.username }}</span>
            <p>
              <span
                ><a :href="'tel:' + obj.mobile">{{ obj.mobile }}</a></span
              >
              <van-icon name="arrow" />
            </p>
          </div>
        </div>
      </div>
    </div>
    <div class="sites" v-if="data.length > 0">
      <!-- <div class="linear"></div> -->
      <div class="siteList">
        <div
          class="normal"
          :class="{ over: isOverTime(item.start_time) }"
          v-for="(item, i) in curItem.sites"
          :key="'site' + i"
          v-show="showSchedule(item.start_time)"
        >
          <div class="contain">
            <span>{{ item.site_name }}</span>
            <div class="collapsebox" v-if="item.trip">
              <van-collapse v-model="activeNames">
                <van-collapse-item :name="1 + i">
                  <template #title>
                    <div class="contain-box">
                      <span class="contain-time"
                        >{{ formatDate(item.start_time, "hh:ii") }}
                        {{ item.end_time ? "-" : "" }}
                        {{ formatDate(item.end_time, "hh:ii") }}</span
                      >
                      <p class="contain-seat" v-if="item.row">
                        <span>{{ item.row }}</span
                        >排 <span>{{ item.col }}</span
                        >座
                      </p>
                    </div>
                  </template>
                  <div class="content">{{ item.trip }}</div>
                </van-collapse-item>
              </van-collapse>
            </div>
            <div v-else>
              <span
                >{{ formatDate(item.start_time, "hh:ii") }}
                {{ item.end_time ? "-" : "" }}
                {{ formatDate(item.end_time, "hh:ii") }}</span
              >
              <p v-if="item.row">
                <span>{{ item.row }}</span
                >排 <span>{{ item.col }}</span
                >座
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="nodata" v-if="data.length == 0">
      <img src="../../../assets/imgs/constructor/wait.png" alt="" srcset="" />
      <span>暂无数据</span>
    </div>
  </div>
</template>

<script>
moment.locale("zh-cn");
export default {
  name: "SDYCObserve",
  components: {},
  data() {
    return {
      activeNames: [],
      id: this.$route.params.id,
      data: [],
      currentIndex: 0,
      curItem: {}
    };
  },
  computed: {},
  watch: {},
  methods: {
    showSchedule(start_time) {
      start_time = start_time.replace(/-/g, "/");
      //   console.log(
      //     moment(start_time).format("YYYYMMDD"),
      //     moment(this.curItem.date).format("YYYYMMDD")
      //   );
      if (
        moment(start_time).format("YYYYMMDD") ==
        moment(this.curItem.date).format("YYYYMMDD")
      ) {
        return true;
      } else {
        return false;
      }
    },
    formatDate(date, str) {
      if (!date) {
        return "";
      }
      date = date.replace(/-/g, "/");
      if (str == "D") {
        if (
          moment(new Date(date)).format("YYYYMMDD") ==
          moment(new Date()).format("YYYYMMDD")
        ) {
          return "今天";
        }
      }
      return dsf.date.format(new Date(date), str);
    },
    isOverTime(date) {
      date = date.replace(/-/g, "/");
      if (new Date().getTime() >= new Date(date).getTime()) {
        return true;
      } else {
        return false;
      }
    },
    changeItem(index) {
      this.currentIndex = index;
      this.curItem = this.data[index];
    },
    loadData() {
      let that = this;
      this.data = [];
      this.$toast.loading("加载中");
      dsf.http
        .post("/fn/sdycMeeting/mySites", {
          meetingId: this.id
        })
        .done(res => {
          console.log(res);
          that.$toast.clear();
          if (res.type == "success") {
            that.data = res.data;
            let idx = that.data.findIndex(item => item.passDate == false);
            if (idx < 0) idx = 0;
            that.currentIndex = idx;
            that.curItem = that.data[idx];
            // tab滚动到可视区域
            that.$nextTick(() => {
              let ele = document.getElementById(`tab-${that.currentIndex}`);
              if (ele) {
                ele.scrollIntoView({
                  behavior: "auto",
                  block: "nearest",
                  inline: "nearest"
                });
              }
            });
          }
        });
    }
  },
  created() {
    this.loadData();
  },
  mounted() {},
  destroyed() {}
};
</script>

<style lang="scss">
.observe {
  width: 100%;
  height: auto;
  box-sizing: border-box;
  padding: 15px;

  .richeng {
    width: 100%;
    height: auto;
    display: flex;
    align-items: center;
    overflow-x: auto;

    div {
      width: 108px;
      height: 56px;
      box-sizing: border-box;
      border: 1px solid #03b98b;
      border-radius: 5px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      background: #fff;
      margin-right: 10px;
      flex-shrink: 0;

      span {
        font-size: 15px;
        color: #03b98b;
      }

      p {
        font-size: var(--font_size_3);
        color: #03b98b;
        margin-top: 5px;
      }
      &.over {
        border: 1px solid #e1e1e1;
        background: #e1e1e1;
        span {
          color: #787878;
        }
        p {
          color: #787878;
        }
      }
      &.active {
        background: #03b98b;

        span {
          font-size: 15px;
          color: #fff;
        }

        p {
          font-size: var(--font_size_3);
          color: #fff;
        }
        &.over {
          background: #999999;
        }
      }
    }
  }

  .guanmo {
    width: 100%;
    background: #ffffff;
    box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    margin-top: 15px;
    box-sizing: border-box;
    padding: 15px;
    overflow: hidden;

    .inputs1 {
      display: flex;
      justify-content: space-between;
      height: 50px;
      align-items: center;
      border-bottom: 1px solid #ebebeb;

      span {
        width: 70px;
        font-size: var(--font_size_3);
        color: #666;
        flex-shrink: 0;
      }

      p {
        flex: 1;
        font-size: var(--font_size_3);
        color: #333;
        margin-left: 30px;

        height: 100%;
        display: flex;
        align-items: center;
      }
    }

    .inputs2 {
      width: 100%;
      display: flex;
      flex-direction: column;

      .title {
        width: 60px;
        height: 40px;
        display: flex;
        align-items: center;
        font-size: var(--font_size_3);
        color: #666;
      }

      .nerr {
        width: 100%;
        display: flex;
        flex-direction: column;

        div {
          display: flex;
          align-items: center;

          & > span {
            width: 60px;
            height: 30px;
            display: flex;
            align-items: center;
            font-size: var(--font_size_3);
            color: #666;
            text-align: right;
          }

          & > p {
            display: flex;
            align-items: center;

            span {
              font-size: var(--font_size_3);
              color: #333;

              a {
                font-size: var(--font_size_3);
                color: #333;
              }
            }

            .van-icon {
              color: #999;
              margin-left: 10px;
            }
          }
        }
      }
    }
  }

  .sites {
    width: 100%;
    height: auto;
    margin-top: 15px;

    .siteList {
      & > div {
        position: relative;
        margin-bottom: 10px;
        display: flex;
        justify-content: space-between;
        overflow: visible;

        &:last-child {
          &::after {
            height: 80px !important;
          }
        }

        &::before {
          background: #ffffff;
          border: 1px solid #03b98b;
          width: 12px;
          height: 12px;
          border-radius: 50%;
          content: "";
          left: 0;
          top: 0;
          flex-shrink: 0;
          position: absolute;
          z-index: 2;
        }

        &::after {
          background: #03b98b;
          width: 2px;
          content: "";
          top: 0;
          left: 6px;
          height: 110%;
          flex-shrink: 0;
          position: absolute;
          z-index: 1;
        }

        &.over {
          &::before {
            border: 1px solid #999999;
          }

          &::after {
            background: #999999;
          }

          .contain {
            display: flex;
            flex-direction: column;
            box-sizing: border-box;

            & > span {
              font-size: var(--font_size_2);
              color: #999999;
            }

            & > div {
              & > span {
                color: #999999;
              }

              & > p {
                display: flex;
                align-items: center;
                font-size: var(--font_size_3);
                color: #333333;
                margin-left: 20px;
                border-left: 1px solid #ebebeb;
                height: 20px;

                & > span {
                  color: #999999;
                }
              }
            }
          }
        }

        .contain {
          display: flex;
          flex-direction: column;
          box-sizing: border-box;
          margin-left: 30px;
          background: #ffffff;
          flex: 1;
          box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.1);
          border-radius: 5px;
          // height: 80px;
          box-sizing: border-box;
          // padding: 15px;
          padding: 0.3rem 0.3rem 0.1rem 0.3rem;

          .content {
            padding: 0.2rem;
            background: #f5f6f7;
            border-radius: 0.1rem;
            color: #666;
            font-size: 0.3rem;
            white-space: pre-wrap;
          }
          .collapsebox {
            display: block;
            margin-top: 0;
          }
          .van-collapse {
            .contain-box {
              display: flex;
              align-items: center;
              margin-top: 12px;
            }
            .van-collapse-item {
              .van-cell {
                padding: 0;
                align-items: center;
                .van-cell__title {
                  // margin-bottom: 0.1rem;
                }
              }
              .van-collapse-item__content {
                padding: 0;
              }
            }
          }

          & > span {
            font-size: var(--font_size_2);
            color: #333333;
          }

          & > div {
            display: flex;
            align-items: center;
            margin-top: 12px;

            & > span,
            .contain-time {
              font-size: 22px;
              color: #03b98b;
            }

            & > p,
            .contain-seat {
              display: flex;
              align-items: center;
              font-size: var(--font_size_3);
              color: #333333;
              margin-left: 20px;
              border-left: 1px solid #ebebeb;
              height: 20px;

              & > span {
                font-size: 22px;
                color: #03b98b;
                margin: 0 10px;
              }
            }
          }
        }
      }
    }
  }

  .nodata {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;

    img {
      width: 50%;
    }

    span {
      font-size: var(--font_size_2);
      color: #999999;
      margin-top: 15px;
    }
  }
}
</style>

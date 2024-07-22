<template>
  <div class="container">
    <div class="container-header">
      <div class="top">
        <van-cell
          title="签到管理"
          icon="arrow-left"
          center
          @click="$router.back()"
        ></van-cell>
      </div>
      <div class="container-tabs">
        <van-tabs
          animated
          class="container-header-tabs"
          type="card"
        >
          <van-tab :title="'已签到' + '（' + hasSignNum + '）'">
            <van-list>
              <van-cell v-for="person in hasSignList" :key="person.id">
                <div class="person-card">
                  <img :src="dsf.url.getWebPath(person.img)" :onerror="default_avatar" alt="" />
                  <div class="person-card-name">{{ person.name }}</div>
                  <div class="person-card-phone">{{ person.phone }}</div>
                  <div class="person-card-department">
                    {{ person.department }}
                  </div>
                  <div class="person-card-singText">
                    签到时间: {{ person.time }}
                  </div>
                </div>
              </van-cell>
            </van-list>
          </van-tab>
          <van-tab :title="'未签到' + '（' + unSignNum + '）'">
            <van-cell v-for="person in unSignList" :key="person.id">
              <div class="person-card">
                <img :src="dsf.url.getWebPath(person.img)" :onerror="default_avatar" alt="" />
                <div class="person-card-name">{{ person.name }}</div>
                <div class="person-card-phone">{{ person.phone }}</div>
                <div class="person-card-department">
                  {{ person.department }}
                </div>
                <div class="person-card-singText">{{ person.singText }}</div>
              </div>
            </van-cell>
            <div class="btn-container">
              <van-button class="remindBtn" @click="remindAll"> 一键提醒 </van-button>
            </div>
          </van-tab>
        </van-tabs>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "signDetail",
  data() {
    return {
      default_avatar:
        'this.src="' + require("static/images/meetingPad/avatar.png") + '"',
      activePage: 0, //签到tab切换
      hasSignNum: 0, //已签到人数
      unSignNum: 0, //未签到人
      hasSignList: [], //已签到列表
      unSignList: [], //未签到列表
      user: dsf.util.loadSessionStore("user"),
      meeting: dsf.util.loadSessionStore("meeting"),
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    //初始化数据
    init() {
      this.getSignDetail();
      this.getHasSign();
      this.getUnSign();
    },
    //获取已签到和未签到人数
    getSignDetail() {
      dsf.http
        .post("fn/conferenceSignIn/signInTabs", {
          meetingId: this.meeting.id,
          // scheduleId: this.id,
        })
        .then((res) => {
          for (const item of res.data.data) {
            if (item.type === "1") {
              this.hasSignNum = item.count;
            } else {
              this.unSignNum = item.count;
            }
          }
        });
    },

    //获取已签到人员信息
    getHasSign() {
      dsf.http
        .post("fn/conferenceSignIn/signInDetails", {
          meetingId: this.meeting.id,
          // scheduleId: this.id,
          type: 1,
        })
        .then((res) => {
          this.hasSignList = [];
          for (const iterator of res.data.data) {
            for (const key of iterator.users) {
              key.department = iterator.unitName;
              this.hasSignList.push(key);
            }
          }
        });
    },

    //获取未签到人员信息
    getUnSign() {
      dsf.http
        .post("fn/conferenceSignIn/signInDetails", {
          meetingId: this.meeting.id,
          // scheduleId: this.id,
          type: -1,
        })
        .then((res) => {
          this.unSignList = [];
          for (const iterator of res.data.data) {
            for (const key of iterator.users) {
              key.department = iterator.unitName;
              this.unSignList.push(key);
            }
          }
        });
    },

    //一键提醒
    remindAll() {
      dsf.http
        .post("/fn/conferenceSignIn/signInMessageReminder", {
          meetingId: this.meeting.id,
        })
        .then((res) => {
          if(res.data.type==='success'){
            dsf.layer.toast("提醒成功");
          }else{
            dsf.layer.toast("提醒失败，请检查网络！");
          }
        });
    },
  },
};
</script>

<style scoped lang="scss">
.container {
  display: flex;
  flex-direction: column;
  position: relative;
  height: 100%;

  --van-tab-line-height: 1.92rem;
  --van-tab-text-color: "#3389E0";
  &-tabs {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    align-content: center;
    justify-content: center;
    align-items: center;
  }
  &-header {
    display: flex;
    justify-content: center;
    height: 99%;
    .top {
      font-size: 0.8rem;
      color: #333333;
      position: absolute;
      left: 0;
      z-index: 100;
      ::v-deep .van-cell__left-icon {
        height: 0.8rem;
        font-size: 0.8rem;
        line-height: 0.8rem;
        margin-right: 0.54rem;
      }

      ::v-deep .van-cell {
        font-size: 0.8rem;
        font-weight: 800;
        padding: 0.5rem 0;
        margin-top: 0.58rem;
      }
    }
    &-tabs {
      margin-top: 0.58rem;
      width: 100%;
      height: 100%;

      .person-card {
        background-color: #fff;
        display: flex;
        padding: 0.8rem 0;
        border-bottom: 0.04rem #e5e5e5 solid;
        font-size: 0.8rem;
        color: #333333;
        text-align: left;
        align-items: center;
        flex-wrap: nowrap;

        img {
          width: 1.96rem;
          height: 1.96rem;
          border-radius: 50%;
          margin-left: 0.88rem;
          margin-right: 0.86rem;
        }

        &-name {
          width: 4.8rem;
        }
        &-phone {
          width: 8.94rem;
        }
        &-department {
          width: 12.54rem;
        }
        &-singText {
          text-align: right;
          width: 13rem;
        }
      }

      .btn-container {
        bottom: 0.32rem;
        width: 44.96rem;
        height: 4.16rem;
        display: flex;
        align-items: center;
        justify-content: center;
        position: fixed;
        z-index: 100;
        .remindBtn {
          font-size: 0.8rem;
          color: #ffffff;
          letter-spacing: 0.1rem;
          text-align: center;
          width: 16.06rem;
          height: 2rem;
          background: #3b74db;
          border-radius: 0.16rem;
        }
      }
    }
    ::v-deep .van-tab__text {
      color: #999;
      line-height: 0.96rem;
      font-size: 0.8rem;
      text-align: center;
      font-weight: 400;
    }
    ::v-deep .van-tabs__content {
      margin-top: 0.6rem;
      height: 96%;
      .van-cell {
        margin: 0;
        padding: 0 !important;
      }
    }

    ::v-deep .van-tab__pane {
      overflow: scroll;
      height: 87%;
    }

    ::v-deep .van-tabs__wrap {
      display: flex;
      justify-content: center;
      width: 100%;
      height: 1.92rem;
      margin-top: 0.58rem;
    }
    ::v-deep .van-tabs__nav--card {
      width: 11.68rem;
      height: 1.92rem;
      border: none;
      background-color: #e9ecf2;
    }
    ::v-deep .van-tabs__track {
      height: 96%;
    }
    ::v-deep .van-tabs__nav--card .van-tab {
      border-style: none;
      margin: 0.24rem;
    }
    ::v-deep .van-tabs__nav--card .van-tab.van-tab--active {
      border: none;
      background-color: white;
      margin: 0.24rem;
      height: 1.44rem;
      color: #3389e0;
      span {
        color: #3389e0;
      }
    }
  }
}
</style>

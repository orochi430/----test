<template>
  <div class="ds-meeting-sign-up-status">
    <!--    <van-nav-bar fixed title="报名情况" left-arrow @click-left="$router.back()" />-->
    <van-tabs v-model="tabIndex" type="card" animated sticky>
      <van-tab>
        <div slot="title" class="tab_title">
          未报名
          <span v-if="nosigndatacount">({{ nosigndatacount }})</span>
        </div>
        <div class="not-sign common">
          <div class="not-sign-list common-list">
            <div v-for="(item, index) in nosigndata" :key="index" class="common-list-item">
              <i class="iconfont icontouxiang"></i>
              <span class="common-list-item-name">{{ item.user_name }}</span>
              <button v-if="item.read_status>0" class="common-list-item-button readed">已阅读</button>
              <button v-else class="common-list-item-button notRead">未阅读</button>
            </div>
            <commonempty v-if="nosigndatacount === 0" />
          </div>
          <div v-show="nosigndatacount" class="not-sign-footer">
            <!-- <van-button type="info">DING一下</van-button> -->
            <DsfButtonToolbox :more="true" :isFormBtn="true" size="small" :buttons="nosignButtons" @mainClick="handleActionClick" @commonClick="handleActionClick" />
          </div>
        </div>
      </van-tab>
      <van-tab>
        <div slot="title" class="tab_title">
          已报名
          <span v-if="signdatacount">({{ signdatacount }})</span>
        </div>
        <div class="signed-list common-list">
          <div v-for="item in signdata" :key="item.id" class="common-list-item comment_item">
            <div class="common_title">
              <span class="common-list-item-name common_title_span">{{ item.user_name }}</span>
              <span class="signed-list-item-time common_title_spanr">{{ item.time }}</span>
            </div>
            <div class="common_name" v-if="item.children">
              <!--<i class="iconfont iconfl-renyuan"></i>-->
              <span
                class="common-list-item-name"
              >{{ item.attendance==1 ? '参会人：'+ item.attendanceUserlist : '代会人：'+ item.attendanceUserlist }}</span>
            </div>
            <div class="common_content">
              <span class="common-list-item-name" v-if="item.attendance==-1">
                <!--<i class="iconfont iconyijian"></i>-->
                请假原因：{{ item.leaveReason }}
              </span>
            </div>
          </div>
        </div>
        <commonempty v-if="signdatacount === 0" />
        <!-- <div v-if="signdatacount>0" class="not-sign-footer">
          <dingBtn btntype="video" :prarms="dingObjbaoming" text="视频会议"></dingBtn>
        </div> -->
      </van-tab>

    </van-tabs>
  </div>
</template>

<script>
import DsfButtonToolbox from "@/components/documentCenter/DsfButtonToolbox";

export default {
  name: "MeetingSignUpStatus",
  components: {
    DsfButtonToolbox,
  },
  data() {
    return {
      id: this.$route.query.id || "",
      dingObj: {
        // alertDateTime: "2015-05-09 08:00",
        // startTime: "2015-05-09 08:00",
        // endTime: "2015-05-09 08:00",
        // deadlineTime: "2015-05-09 08:00",
        // ccUsers: ["100", "101"],
        users: ["100", "101"],
      },
      dingObjbaoming: {},
      tabIndex: 0,
      signdatacount: '',
      signdata: [],
      nosigndatacount: '',
      nosigndata: [],
      nosignButtons: {
        commonButtons: [],
        mainButtons: [
          {
            action: "revoke",
            icon: "",
            name: "撤回"
          },{
            action: "remind",
            icon: "",
            name: "提醒"
          },
        ]
      },
      signButtons: {
        commonButtons: [],
        mainButtons: [
          {
            action: "backNotice",
            icon: "",
            name: "重报"
          }
        ]
      }
    };
  },
  created() {
    console.log(this.id);
    this.getSignDetail();
  },
  methods: {
    getSignDetail() {
      dsf.http.post('fn/newMeeting/signDetail',{id: this.id}).then(res => {
        if(res.data.code == 200) {
          this.signdatacount = res.data.signdatacount
          this.signdata = res.data.signdata
          this.nosigndatacount = res.data.nosigndatacount
          this.nosigndata = res.data.nosigndata
        }
      })
    },
    handleActionClick(action) {
      this[action]()
    },
    revoke() {

    },
    remind() {

    },
    backNotice() {

    }
  },
};
</script>

<style lang="scss" scoped>
@import "../../assets/styles/themes.scss";
@import "../../assets/styles/mixin.scss";

.ds-meeting-sign-up-status {
  /*padding-top: 46px;*/
  height: 100%;
  box-sizing: border-box;
  @include font_4();
  * {
    box-sizing: border-box;
  }
  .van-nav-bar {
    box-shadow: 0 0 3px 0 rgba(0, 0, 0, 0.05);
    z-index: 200;
  }
  .van-icon-arrow-left {
    color: #333;
    font-weight: 600;
    font-size: 1.5em;
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
  .van-tabs {
    height: 100%;
    &__wrap {
      padding: 13px 0;
      background-color: #fff;
      margin-bottom: 15px;
    }
    &__nav--card {
      @include border-color-theme("normal", true);
      .van-tab {
        @include border-color-theme("normal", true);
        @include font-theme("normal", true);
        &.van-tab--active {
          @include background-theme("normal", true);
          color: #fff !important;
        }
      }
    }
    &__content {
      height: calc(100% - 72px);
      background-color: #fff;
    }
  }
  .van-tab {
    &__pane {
      height: 100%;
      overflow-y: auto;
    }
  }

  .common {
    height: calc(100% - 105px);
    overflow-y: auto;
    &-list {
      padding: 0 15px;
      position: relative;
      &-item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 49px;
        border-bottom: 1px solid #ddd;
        position: relative;
        .iconfont {
          flex: none;
          color: #3296fa;
          font-size: 1.3em;
          margin-right: 7px;
        }
        &-name {
          flex: auto;
          color: #000000;
        }
        &-button {
          flex: none;
          width: 60px;
          height: 22px;
          line-height: 22px;
          border-radius: 4px;
          font-size: var(--font_size_3);
          color: #fff;
          &.readed {
            background: #c9e5fc;
            color: #3296fa;
          }
          &.notRead {
            background: #d8d8d8;
          }
          &.leave {
            background: #67c23b;
          }
        }
      }
      .comment_item {
        display: block;
        height: auto;
        .iconfont {
          color: #666666;
        }
        .common_title {
          overflow: hidden;
          .common_title_span {
            float: left;
            line-height: 48px;
          }
          .common_title_spanr {
            float: right;
            line-height: 48px;
          }
        }
        .common_name {
          overflow: hidden;
          line-height: 16px;
          i,
          span {
            float: left;
          }
          span {
            font-size: var(--font_size_3);
            color: #666;
          }
        }
        .common_content {
          margin-top: 10px;
          overflow: hidden;
          i,
          span {
            float: left;
          }
          span {
            font-size: var(--font_size_3);
            color: #666;
          }
        }
      }
    }
  }
  // 已报名
  .signed-list {
    &-item-time {
      @include font_6();
      color: #999999;
    }
  }
  // 未报名
  .not-sign {
    &-footer {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
      height: 83px;
      background: #fff;
      box-shadow: 0 -1px 4px 0 rgba(0, 0, 0, 0.12);
      padding: 0 15px;
      position: absolute;
      bottom: 0;
      z-index: 10000;
      .van-button {
        width: 100%;
        height: 48px;
        border-radius: 6px;
        font-size: var(--font_size_1);
        @include background-theme("normal");
      }
    }
  }
  // 请假
}
</style>

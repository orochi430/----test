<template>
  <div class="ds-meeting-sign-up-status">
    <van-tabs v-model="tabIndex" animated sticky :offset-top="dsf.util.getOffsetTop()">
      <van-tab title="未阅读" :badge="tabData2.list.length | badgeCount"
        :style="isShowAppHeader ? { height: 'calc(100vh - 1.84rem)' } : { height: `calc(100vh - ${dsf.util.getOffsetTop('0.92rem')})` }">
        <div class="not-sign common">
          <van-list v-model="tabData2.loading" :finished="tabData2.finished" finished-text @load="onLoad2">
            <div class="not-sign-list common-list">
              <div v-for="(item, index) in tabData2.list" :key="index" class="common-list-item">
                <i class="iconfont icontouxiang"></i>
                <span class="common-list-item-name">{{ item.userName }}</span>
                <!-- <button v-if="item.isRead>0" class="common-list-item-button readed">已阅读</button> -->
                <!-- <button v-else class="common-list-item-button notRead">未阅读</button> -->
              </div>
              <commonempty v-if="tabData2.list.length === 0" />
            </div>
          </van-list>
          <div class="not-sign-footer"
            v-if="tabData2.list.length && dsf.config.ddSetting && dsf.config.ddSetting.dingdingType == 'dingding'">
            <dingBtn :pk="id" btntype="ding" :bt="bt" :prarms="dingObj" text="DING一下"></dingBtn>
          </div>
        </div>
      </van-tab>
      <van-tab title="已阅读" :badge="tabData1.list.length | badgeCount">
        <van-list v-model="tabData1.loading" :finished="tabData1.finished" finished-text @load="onLoad1">
          <div class="signed-list common-list">
            <div v-for="item in tabData1.list" :key="item.id" class="common-list-item comment_item">
              <div class="common_title">
                <span class="common-list-item-name common_title_span">{{ item.userName }}</span>
                <span class="signed-list-item-time common_title_spanr">{{ item.readTime }}</span>
              </div>
            </div>
          </div>
          <commonempty v-if="tabData1.list.length === 0" />
        </van-list>
        <!-- <div v-if="tabData1.list.length>0" class="not-sign-footer"> -->
        <!-- <van-button type="info">DING一下</van-button> -->
        <!-- <dingBtn btntype="video" :prarms="dingObjbaoming" text="视频会议"></dingBtn> -->
        <!-- </div> -->
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import dingBtn from "@/components/common/DingBtn";
import { mapState } from "vuex";
export default {
  name: "announcementStatus",
  components: {
    dingBtn,
  },
  data() {
    return {
      bt: this.$route.query.bt,
      id: this.$route.query.pk || "",
      noticeId: '',
      dingObj: {
        users: ["100", "101"],
      },
      dingObjbaoming: {},
      tabIndex: 0,
      tabData1: {
        count: 0,
        loading: false,
        finished: true,
        list: [
        ],
      },
      tabData2: {
        count: 0,
        loading: false,
        finished: true,
        list: [
        ],
      },
    };
  },
  filters: {
    badgeCount(val) {
      if (val > 100) {
        return "99+"
      }
      if (val < 1) {
        return ""
      }
      return val
    }
  },
  computed: {
    ...mapState({
      isShowAppFooter: state => state.isShowAppFooter,
      isShowAppHeader: state => state.isShowAppHeader
    })
  },
  created() {
    console.log(this.id);
    this.getMeetingTZTODO()
    this.getMeetingTZUNTODO()
  },
  methods: {
    onLoad1() { },
    onLoad2() { },
    onLoad3() { },
    getMeetingTZTODO() {
      var infoLoader = this.dsf.layer.loading();
      dsf.http
        .post("fn/notice/getReadUsers", { pk: this.id, type: 'read' })
        .done((res) => {
          console.log(res)
          this.tabData1.list = res
        })
        .error((res) => {
          this.dsf.layer.toast(res.message);
        })
        .always(() => {
          this.dsf.layer.closeLoading(infoLoader);
        });
    },
    getMeetingTZUNTODO() {
      dsf.http
        .post("fn/notice/getReadUsers", { pk: this.id, type: 'unread' })
        .done((res) => {
          console.log(res)
          this.tabData2.list = res
          res.forEach(item => {
            item.user_name = item.userName
          })
          let users = [];
          res.forEach((item) => {
            if (users.indexOf(item.foreignId) < 0) {
              if (item.foreignId.indexOf(",") >= 0) {
                let strArr = item.foreignId.split(",").filter((item) => {
                  if (item.length > 0) {
                    return item;
                  }
                });
                users = users.concat(strArr);
              } else {
                users.push(item.foreignId);
              }
            }
          });
          let sessionUser = dsf.util.loadSessionStore("user");
          users = Array.from(new Set(users)).filter((item) => {
            if (item.length && item != sessionUser.foreignId) {
              return item;
            }
          });
          let canObj = {}
          let canUser = res.reduce((cur, next) => {
            canObj[next.foreignId] || next.foreignId == sessionUser.foreignId ? "" : canObj[next.foreignId] = true && cur.push(next)
            return cur;
          }, [])
          canUser.forEach(item => {
            item.foreign_id = item.foreignId
          })
          console.log(canUser)
          this.$set(this.dingObj, "users", users);
          this.$set(this.dingObj, "selectPerson", canUser);
        })
        .error((res) => {
          this.dsf.layer.toast(res.message);
        })
        .always(() => { });
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../../assets/styles/themes.scss";
@import "../../assets/styles/mixin.scss";

.ds-meeting-sign-up-status {
  height: 100%;
  // box-sizing: border-box;
  background-color: #fff;

  .van-icon-arrow-left {
    color: #333;
    font-weight: 600;
    font-size: 1.5em;
  }
 .van-tab__pane-wrapper {
    overflow: auto;
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

    // &__wrap {
    //   padding: 13px 0;
    //   background-color: #fff;
    //   margin-bottom: 15px;
    // }
    ::v-deep .van-info {
      transform: translate(100%, -50%) !important;
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
    height: calc(100% - 100px);
    padding-bottom: 100px;
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
          @include font-theme("normal");
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
            @include font-theme("normal");
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
  ::v-deep .not-sign {
    &-footer {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
      height: 83px;
      background: #fff;
      box-shadow: 0 -1px 4px 0 rgba(0, 0, 0, 0.12);
      padding: 0 15px;
      position: fixed;
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

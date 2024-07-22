<template>
  <div class="index-container">
    <div class="left">
      <noticeScroll />
      <div class="info content-box">
        <div v-if="!ishiddenTitle" class="title">会议信息</div>
        <meetingInfo
          v-if="meeting"
          :meeting="meeting"
          class="content"
          @hiddenTitle="() => (ishiddenTitle = true)"
        ></meetingInfo>
      </div>
      <div class="menus">
        <div v-for="(item, index) in menus" :key="index" @click="goUrl(item)">
          <span v-if="msgUnReadCount > 0 && item.id === 'hyxx'" class="sign">{{
            msgUnReadCount
          }}</span>
          <img :src="item.img" alt />
          <p>{{ item.name }}</p>
        </div>
      </div>
    </div>
    <div class="right content-box">
      <div class="right-top">
        <div class="title">会议议题</div>
        <span class="more" @click="moreClick">更多</span>
      </div>
      <topicList v-if="meeting" :meeting="meeting" class="content"></topicList>
    </div>
    <van-popup
      v-model="showFile"
      :close-on-click-overlay="true"
      class="file-preview"
      lock-scroll
      position="bottom"
      style="height: 100vh"
    >
      <van-nav-bar
        :title="filename"
        left-text="返回"
        left-arrow
        fixed
        placeholder
        @click-left="closeFile"
      >
      </van-nav-bar>
      <div class="preview-outer">
        <enclosure-preview
          ref="enclosurePreview"
          :file="popFile"
          :is-preview="isPreview"
          :is-signature="true"
          @goPreview="goPreview"
          @goHandWrite="goHandWrite"
          :isShowCurPerson="true"
          :isSignature="false"
        ></enclosure-preview>
      </div>
    </van-popup>
    <screen-person
      v-if="showSame"
      ref="sameScreen"
      @showSameClick="showSameClick"
      :accept="true"
      :meetingObj="meetingObj"
    ></screen-person>
  </div>
</template>

<script>
import agendaList from "./components/agendaList";
import meetingInfo from "./components/meetingInfo";
import topicList from "./components/topicList";
import noticeScroll from "./components/noticeScroll";
import VuexStore from "@/store";
import EnclosurePreview from "@/components/enclosure/EnclosurePreview";
import store from "@/common/util";
import oaScoketJs from "@/common/oaScoket";
import screenPerson from "./components/screenPerson.vue";
export default {
  components: {
    agendaList,
    meetingInfo,
    topicList,
    noticeScroll,
    EnclosurePreview,
    screenPerson,
  },
  data() {
    return {
      configMenus: dsf.config.meetingConfig.homePage.padMenu,
      menus: [],
      meeting: null,
      noticeInfo: [],
      msgUnReadCount: 0,
      ishiddenTitle: false,
      popFile: {},
      showFile: false,
      filename: "",
      isPreview: true,
      promoter: dsf.util.loadSessionStore("user"),
      showSame: false,
      meetingObj: {
        meetingId: "",
        topicId: "",
        fileId: "",
        mode: "",
        sendUserId: "",
        sendUserName: "",
        personnelUserid: "",
        isLocked: "",
      },
    };
  },
  watch: {},
  created() {
    this.getData();
  },
  mounted() {
    this.acceptSameScreen();
    this.openMySocket();
  },
  methods: {
    showSameClick() {
      // 开启关闭同屏
      this.showSame = !this.showSame;
    },
    moreClick() {
      this.$router.push({
        name: "meetingPadTopic",
        query: {
          meetingId: this.meeting.id,
        },
      });
    },
    goPreview() {
      this.isPreview = true;
    },
    goHandWrite() {
      this.isPreview = false;
    },
    closeFile() {
      this.showFile = false;
      this.$refs.enclosurePreview.destroyInterval(); // 关闭自动重试定时器
    },
    goUrl(item) {
      // 会务手册
      if (item.id === "czzn") {
        const meetingInfo = this.meeting;
        if (meetingInfo.znFileId) {
          meetingInfo.flowId = 0;
          meetingInfo.nodeId = -1;
          this.popFile = {
            id: meetingInfo.znFileId,
            name: meetingInfo.znFileName,
            infoId: meetingInfo.znFileId,
            moduleId: meetingInfo.moduleId,
            isHandwrite: "1",
            flowId: meetingInfo.flowId,
            nodeId: meetingInfo.nodeId,
          };
          if (navigator.userAgent.includes("DreamSoft")) {
            // 公司app中
            if (dsf.config.commonForm.nativeWps) {
              // 使用wpsApp打开
              this.wpsOpen(this.popFile);
              return;
            }
          }
          this.showFile = true;
          this.filename = meetingInfo.znFileName;
        } else {
          dsf.layer.toast(`请先上传${item.name}！`);
        }
        return;
      }
      if (item.url) {
        this.$router.push(item.url);
      } else {
        dsf.layer.toast("功能开发中！");
      }
    },
    wpsOpen(doc) {
      let rootPath = dsf.url.getRootPath();
      let loginToken = dsf.util.loadSessionStore("user").auth.token;
      var param = {
        keepCallback: true,
        downUrl:
          rootPath +
          `fn/file/download?infoId=${doc.infoId}&fileId=${doc.id}&fileName=${doc.name}&moduleId=${doc.moduleId}&x-auth-token=${loginToken}&fullfilename=${doc.name}`,
        saveUrl: "",
        fileName: doc.name,
        openWithWPS: true,
        uploadFile: true,
        openMode: "readOnly", //不是已办结文件、已办事项 并且后台参数可编辑，允许编辑，否则只读
        enterReviseMode: false,
        showReviewingPaneRightDefault: false,
        userName: dsf.util.loadSessionStore("user").name,
      };
      console.log(param);
      $WPS.downAndOpen(
        param,
        function (data) {
          console.log(data);
        },
        function (data) {
          console.log("错误回调", data);
        }
      );
    },
    getData() {
      let self = this;
      dsf.http
        .post(`fn/conferenceMobile/meetingInfo`, {
          meetingId: this.$route.query.meetingId,
        })
        .done((result) => {
          if (result.code == 200 && result.data) {
            self.meeting = result.data;
            dsf.util.saveToSessionStore("meeting", result.data);
            VuexStore.commit("setMeetingName", self.meeting.title);

            this.msgUnReadCount = result.data.msgUnReadCount;

            const showModule = result.data.showModule.split(",");
            this.menus = this.configMenus.filter((item) => {
              return showModule.includes(item.id);
            });
            if (result.data.isSendMessage && showModule.includes("hyxx")) {
              this.menus.push({
                id: "xxfb",
                name: "消息发布",
                img: "static/images/meetingPad/xxfb.png",
                url: "/meetingPad/index/publish",
              });
            }
          }
        })
        .error((error) => {
          console.log("error", error);
          // dsf.layer.toast("数据获取失败！", false);
        })
        .always(() => {
          // dsf.layer.closeLoading(self.loading);
        });
    },
    acceptSameScreen() {
      // 接收同屏请求
      dsf.http
        .post(`fn/conferenceMobile/getSameScreen`, {
          meetingId: this.$route.query.meetingId,
        })
        .done((res) => {
          console.log(res);
          if (res.code == 200 && res.data.fileId) {
            this.meetingObj.meetingId = this.$route.query.meetingId;
            this.meetingObj.topicId = res.data.topicId;
            this.meetingObj.fileId = res.data.fileId;
            this.meetingObj.sendUserId = res.data.promoterUserid;
            this.meetingObj.sendUserName = res.data.promoterUsername;
            this.meetingObj.personnelUserid = res.data.personnelUserid;
            this.meetingObj.isLocked = res.data.isLocked;
            if (this.promoter.user_id == res.data.promoterUserid) {
              this.meetingObj.mode = 0;
            } else {
              this.meetingObj.mode = 1;
            }
            this.showSameClick();
          }
        });
    },
    // 打开websocket
    openMySocket() {
      let self = this;
      oaScoketJs.close();
      self.oaScoket = oaScoketJs.getInstance(self);
      self.oaScoket.onmeettingSameScreen(
        store.loadSessionStore("user").user_id,
        (result) => {
          console.log(result);
          if (result.data.code == 200) {
            if (
              result.data.message == "发起同屏" ||
              result.data.message == "发起同屏-新增人员"
            ) {
              this.meetingObj.fileId = result.data.fileId;
              this.meetingObj.sendUserName = result.data.promoterUsername;
              this.meetingObj.sendUserId = result.data.promoterUserid;
              this.meetingObj.isLocked = result.data.isLocked;
              this.meetingObj.mode = 0;
              this.showSameClick();
            } else {
              if (this.showSame) {
                dsf.layer.toast("分享已结束");
              }
              this.showSame = false;
            }
          }
        }
      );
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../../assets/styles/themes.scss";
@import "../../assets/styles/mixin.scss";

.index-container {
  display: flex;
  height: calc(100% - 40px);
  overflow: hidden;
  margin-top: 40px;
  box-sizing: border-box;

  .left {
    width: 900px;
    border: 1px solid #dcdcdc;
    display: flex;
    flex-direction: column;
    box-sizing: content-box;

    .info {
      flex: 1;
      overflow: hidden;
      padding: 32px;
    }

    .menus {
      padding: 32px;

      p {
        margin-top: 14px;
      }
    }
  }

  .right {
    padding: 32px 0 0 40px;
    width: calc(100% - 900px);

    .right-top {
      display: flex;
      justify-content: space-between;

      .more {
        font-size: 40px;
        color: #666666;
      }
    }
  }

  .menus {
    display: flex;
    flex-wrap: wrap;
    padding-top: 40px;

    > div {
      width: 33%;
      text-align: center;
      margin-bottom: 20px;
      position: relative;

      img {
        display: inline-block;
        width: 150px;
      }
    }

    .sign {
      position: absolute;
      width: 40px;
      height: 40px;
      line-height: 40px;
      text-align: center;
      background-color: red;
      color: #fff;
      top: 0;
      right: 24px;
      border-radius: 50%;
    }
  }

  .content-box {
    display: flex;
    flex-direction: column;

    .title {
      font-size: 0.88rem;
      font-weight: 600;
      color: #333;
    }

    .content {
      flex: 1;
      overflow: auto;
    }
  }
}

.preview-outer {
  height: calc(100% - 2.8rem);
}

iframe {
  width: calc(100% - 20px);
  height: calc(100% - 20px);
}

.mask {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  opacity: 1;
  transition: all 1s;
  z-index: 5000;

  &.active {
    opacity: 0;
    z-index: -1;
  }

  &.zindex {
  }

  .diolag {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    flex-direction: column;
    padding: 0 30px;
    width: 30%;
    height: 25%;
    overflow: hidden;
    font-size: 0.32rem;
    background-color: #fff;
    box-shadow: 0px 0px 8px 1px rgba(0, 0, 0, 0.27);
    border-radius: 16px;
    z-index: 1001;

    p {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 70%;
      font-size: 40px;
      color: #333;
      text-align: center;
      font-weight: bold;
      letter-spacing: 4px;
    }

    > div {
      display: flex;
      align-items: center;
      flex: 1;
      border-top: 1px solid #e7e7e7;
      position: relative;

      span {
        display: flex;
        align-items: center;
        justify-content: center;
        flex: 1;
        height: 100%;
        font-size: 40px;
        color: #999999;
        letter-spacing: 2px;

        &:last-child {
          @include font-theme("normal");
        }
      }

      &::after {
        content: "";
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 1px;
        height: 20px;
        background: #e7e7e7;
      }
    }
  }
}

.same-box {
  position: fixed;
  top: -180px;
  left: 50%;
  transform: translate(-50%, 0);
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: all 0.5s;
  z-index: 3000;

  &.open {
    top: 0;
  }

  &.openhalf {
    top: -100px;
  }

  &.close {
    top: -170px;
  }

  div {
    &:first-child {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 500px;
      height: 90px;
      background: rgba(0, 0, 0, 0.5);
      box-shadow: 0px 0px 8px 1px rgba(0, 0, 0, 0.27);
      border-radius: 0 0 10px 10px;

      .icon {
        margin: 0 40px;
        font-size: 50px;
        color: #fff;
      }

      .iconpower {
        font-size: 68px;
      }
    }

    &:last-child {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 420px;
      height: 70px;
      background: rgba(0, 0, 0, 0.5);
      box-shadow: 0px 0px 8px 1px rgba(0, 0, 0, 0.27);
      border-radius: 0 0 10px 10px;
      font-size: 28px;
      color: #fff;
    }
  }
}
</style>

<template>
  <div>
    <div v-if="errored" class="init-div">
      {{ errorMsg }}
    </div>
    <div v-else>
      <div v-if="meetings.length == 0">
        <commonempty
          :image="require('static/images/peopleCongress/img_hyap.png')"
          class="meeting-empty"
          description="您近期无会议安排"
        />
      </div>
      <div v-else-if="meetingInfo">
        <div class="top-info">
          <div
            v-if="false"
            class="opinion"
            @click="
              $router.push({
                name: 'peopleCongressOpinion',
                params: { meetingId: meetingInfo.id }
              })
            "
          >
            <span>意见建议</span>
          </div>
          <div class="theme" @click="$router.push(`/setTheme`)">
            <img
              src="static/images/peopleCongress/index-icon-theme.png"
              alt=""
            />
            <span>更换主题</span>
          </div>
          <div class="avatar">
            <img :src="avatar" :onerror="default_avatar" />
          </div>
          <div class="info">
            <div class="name">
              {{ meetingInfo.userName }}
              <!-- （{{ meetingInfo.userType }}） -->
            </div>
            <div class="title" @click="showPicker = true">
              <span class="elps">{{ meetingInfo.title }}</span>
              <img
                src="static/images/peopleCongress/index-icon-exchange.png"
                alt=""
              />
            </div>
            <div class="time" v-text="getDuration()">
              <!-- {{ meetingInfo.startDate | dateFormat }}
              至
              {{ meetingInfo.endDate | dateFormat }} -->
              <!-- 共{{ days }}天 -->
            </div>
          </div>
          <div class="bg">
            <!-- <img src="static/images/peopleCongress/bg.png" /> -->
            <van-image
              width="100%"
              height="100%"
              src="static/images/peopleCongress/bg.png"
            />
          </div>
          <!-- <div class="pin"><img src="static/images/peopleCongress/dh.png" /></div> -->
        </div>
        <div class="news">
          <van-notice-bar
            scrollable
            v-if="noticeText"
            left-icon="volume"
            @click="
              $router.push({
                name: 'peopleCongressNews',
                params: { meetingId: meetingInfo.id }
              })
            "
            >{{ noticeText }}</van-notice-bar
          >
        </div>
        <div v-if="isShowMenu" class="menus">
          <van-swipe>
            <van-swipe-item
              v-for="(menus, menusIdx) in menusList"
              :key="menusIdx"
            >
              <div
                class="menu-item"
                v-for="(menu, menuIdx) in menus"
                :key="menuIdx"
                @click="goUrl(menu)"
              >
                <img :src="menu.img" alt />
                <p>{{ menu.name }}</p>
              </div>
            </van-swipe-item>
          </van-swipe>
        </div>
        <module-item
          v-if="meetingInfo.isInProgress && false"
          title="今日日程"
          @rightClick="
            $router.push({
              name: 'peopleCongressSch',
              params: { meetingId: meetingInfo.id }
            })
          "
        >
          <template slot="default">
            <template v-if="schedules.length > 0">
              <div v-for="schedule in schedules" :key="schedule.time">
                <schedule-item
                  :schedule="schedule"
                  :is-fold="true"
                ></schedule-item>
              </div>
            </template>
            <commonempty
              v-else
              :image="require('static/images/peopleCongress/img_rcap.png')"
              class="schedule-empty"
              description="今日暂无日程安排  点击“更多”查看全部日程"
            />
          </template>
        </module-item>
        <module-item
          v-else
          title="会议日程"
          rightText=""
          @rightClick="
            $router.push({
              name: 'peopleCongressSch',
              params: { meetingId: meetingInfo.id }
            })
          "
        >
          <template slot="default">
            <all-schedule
              v-if="allSchedules.length > 0"
              :all-schedules="allSchedules"
              :is-fold="true"
            >
            </all-schedule>
            <commonempty
              v-else
              :image="require('static/images/peopleCongress/img_rcap.png')"
              class="schedule-empty"
              description="暂无日程安排"
            />
          </template>
        </module-item>
        <module-item
          title="文件查阅"
          @rightClick="
            $router.push({
              name: 'peopleCongressFile',
              params: { meetingId: meetingInfo.id },
              query: { isSearch: 1 }
            })
          "
          :showIcon="true"
        >
          <template slot="default">
            <template v-if="files.length > 0">
              <div v-for="(file, index) in files" :key="file.title">
                <file-item
                  :file="file"
                  :meeting-id="meetingInfo.id"
                ></file-item>
                <van-divider v-if="index < files.length - 1" />
              </div>
            </template>
            <commonempty
              v-else
              :image="require('static/images/peopleCongress/img_zwwj.png')"
              class="file-empty"
              description="暂无文件"
            />
          </template>
        </module-item>
      </div>
      <van-popup v-model="showPicker" round position="bottom">
        <!-- <van-picker :columns="allMeetings" :swipe-duration="300" title="选择会议" show-toolbar value-key="title" @cancel="showPicker = false" @confirm="onSwitchMeeting" /> -->
        <change-meeting
          :list="allMeetings"
          :levelOpts="meetingLevels"
          @close="closePicker"
          @go="onSwitchMeeting"
        />
      </van-popup>
    </div>
  </div>
</template>

<script>
// import { meetings, news } from "./test";
import moduleItem from "./components/moduleItem";
import fileItem from "./components/fileItem";
import scheduleItem from "./components/scheduleItem";
import allSchedule from "./schedule";
import changeMeeting from "./changeMeeting";
import store from "@/common/util";
export default {
  components: {
    moduleItem,
    fileItem,
    scheduleItem,
    allSchedule,
    changeMeeting
  },
  filters: {
    //日期格式化
    dateFormat: function(val) {
      if (!val) return "";
      /*  
          关云龙 2021-10-8
          会议时间描述修改，目前的是01-24至01-30共7天，描述不严谨；需调整为“会议时间：1月24日至1月30日上午”。14:00 开始表示下午，含14:00，默认00:00 表示全天。

          00:00 全天
          00:01-13:59 上午
          14:00-23:59 下午 
      */
      let str = dsf.date.format(val, "m月d日");
      let temp = dsf.date.parse(val);
      let allDay = dsf.date.parse(
        dsf.date.format(val, "yyyy-mm-dd") + " 00:00"
      );
      let pm = dsf.date.parse(dsf.date.format(val, "yyyy-mm-dd") + " 14:00");
      if (temp.getTime() == allDay.getTime()) {
        // str += "全天";
      } else if (temp < pm) {
        str += "上午";
      } else {
        str += "下午";
      }
      return str;
    }
  },
  data() {
    return {
      default_avatar:
        'this.src="' +
        require("static/images/peopleCongress/icon_head.png") +
        '"',
      avatar:
        // dsf.config.staticJson.enable
        // ?
        // dsf.util.loadSessionStore("user").photo
        require("static/images/peopleCongress/icon_head.png"),
      //     :
      //     dsf.url.getWebPath(
      //         `/fn/mobilePhoto/download?id=${
      //   dsf.util.loadSessionStore("user").user_id
      // }&time=${new Date().getTime()}`
      //     )
      userName: dsf.util.loadSessionStore("user")
        ? dsf.util.loadSessionStore("user").name
        : "",
      files: [],
      schedules: [],
      allSchedules: [],
      noticeText: "",
      meetingInfo: null,
      meetings: [],
      loading: null,
      errored: false,
      errorMsg: "发生错误，请稍后重试或联系系统管理员！",
      isFirstLoad: false, // 是否初次加载
      menus: [
        {
          // name: '健康码',
          // img: 'static/images/peopleCongress/index-icon-HealthCode.png',
          id: "hfhj",
          name: "会风会纪",
          img: "static/images/peopleCongress/index-icon-meeting.png",
          url: ""
        },
        {
          id: "fwzn",
          name: "服务指南",
          img: "static/images/peopleCongress/index-icon-ServiceGuide.png",
          url: ""
        },
        {
          id: "hczw",
          name: "会场座位",
          img: "static/images/peopleCongress/index-icon-seat.png",
          url: "/peopleCongressVenueSeats"
        },
        {
          id: "ccap",
          name: "乘车安排",
          img: "static/images/peopleCongress/index-icon-RideArrangements.png",
          url: "/peopleCongressBusinfo"
        },
        {
          id: "zsap",
          name: "住宿安排",
          img: "static/images/peopleCongress/index-icon-stay.png",
          url: "/peopleCongressHotelinfo"
        },
        {
          id: "cyap",
          name: "餐饮安排",
          img: "static/images/peopleCongress/index-icon-repast.png",
          url: "/peopleCongressDiningNotice"
        },
        {
          // name: '身份信息',
          // img: 'static/images/peopleCongress/index-icon-identity.png',
          id: "dzcq",
          name: "电子餐券",
          img: "static/images/peopleCongress/index-icon-MealTicket.png",
          url:
            "/peopleCongressQrCode?title=%25E7%2594%25B5%25E5%25AD%2590%25E9%25A4%2590%25E5%2588%25B8"
        },
        {
          id: "lxr",
          name: "联系人",
          img: "static/images/peopleCongress/index-icon-ContactPerson.png",
          url: "/peopleCongressContact"
        },
        {
          id: "sfxx",
          name: "身份信息",
          img: "static/images/peopleCongress/index-icon-identity.png",
          url:
            "/peopleCongressQrCode?title=%25E7%2594%25B5%25E5%25AD%2590%25E9%25A4%2590%25E5%2588%25B8"
        }
      ],
      menusList: [],
      showPicker: false,
      allMeetings: [],
      meetingLevels: [],
      finishStatus: {
        meeting: false,
        level: false,
        agenda: false,
        tips: false,
        files: false,
        history: false,
        guide: false
      }
    };
  },
  computed: {
    // 会议持续天数
    days: function() {
      return parseInt(
        dsf.date.diffDays(
          dsf.date.parse(this.meetingInfo.startDate),
          dsf.date.parse(this.meetingInfo.endDate)
        ) + 1
      );
    },
    // 是否显示菜单（仅代表大会需要）
    isShowMenu: function() {
      return this.$route.params.key == "1";
    }
  },
  created() {
    let self = this;
    self.init();
    self.isFirstLoad = true;
  },
  mounted() {},
  activated() {
    let self = this;
    // 刷新首页
    if (!self.isFirstLoad) {
      self.loading = dsf.layer.loading();
      self.init();
    }
    self.isFirstLoad = false;
  },
  methods: {
    formatDate(val) {
      if (!val) return "";
      /*  
          关云龙 2021-10-8
          会议时间描述修改，目前的是01-24至01-30共7天，描述不严谨；需调整为“会议时间：1月24日至1月30日上午”。14:00 开始表示下午，含14:00，默认00:00 表示全天。

          00:00 全天
          00:01-13:59 上午
          14:00-23:59 下午 
      */
      let str = dsf.date.format(val, "m月d日");
      let temp = dsf.date.parse(val);
      let allDay = dsf.date.parse(
        dsf.date.format(val, "yyyy-mm-dd") + " 00:00"
      );
      let pm = dsf.date.parse(dsf.date.format(val, "yyyy-mm-dd") + " 14:00");
      if (temp.getTime() == allDay.getTime()) {
        // str += "全天";
      } else if (temp < pm) {
        str += "上午";
      } else {
        str += "下午";
      }
      return str;
    },
    getDuration() {
      let self = this, duration = "", st, ed;
      if(self.meetingInfo) {
        st = self.formatDate(self.meetingInfo.startDate);
        ed = self.formatDate(self.meetingInfo.endDate);
        duration = `${st} 至 ${ed}`;
        if(st == ed) duration = `${st}`;
      }
      return duration;
    },
    init(meetingId) {
      let self = this;
      self.noticeText = "";
      self.meetings = [];
      self.allMeetings = [];
      // 重置“服务指南”
      self.menus.find(item => item.name == "服务指南").url = "";
      self.menus.find(item => item.name == "会风会纪").url = "";
      self.errored = false;
      self.loading = dsf.layer.loading();
      let url = `fn/peopleCongress/meetingInfo`;
      if (dsf.config.staticJson?.enbale && self.$route.params.key) {
        // 静态json数据特殊处理url
        url += `/${self.$route.params.key}`;
      }
      let paras = {};
      self.meetingInfo = store.loadSessionStore("meeting");
      if (meetingId) {
        paras.meetingId = meetingId;
      } else if (self.meetingInfo?.id) {
        paras.meetingId = self.meetingInfo.id;
      } else {
        paras.meetingTypeId = self.$route.params.key;
      }
      // 获取会议信息
      dsf.http
        .post(url, paras)
        .done(result => {
          if (result.type == "success") {
            self.meetings = result.data;
            if (self.meetings.length > 0) {
              self.meetingInfo = self.meetings[0];
              store.saveToSessionStore("meeting", self.meetingInfo);
              // 初始化菜单
              self.setMenu();
              // 获取会议级别
              self.getMeetingLevel();
              if (self.meetingInfo.isInProgress && false) {
                // 获取今日日程
                self.getAgendasToday();
              } else {
                // 获取全部日程
                self.getMyAgendas();
              }
              // 获取消息提醒
              self.getTips();
              // 获取会议文件
              self.getFiles();
              // 获取历史会议信息
              self.getHistoryMeetings();
              // 获取服务指南
              self.getServiceGuide();
            } else {
              dsf.layer.closeLoading(self.loading);
            }
          } else {
            self.errorMsg = result.message;
            self.errored = true;
          }
        })
        .error(error => {
          self.errored = true;
          console.log("init-error", error);
          // dsf.layer.toast("数据获取失败！");
        })
        .always(() => {
          self.finishStatus.meeting = true;
          self.closeLoading();
        });
    },
    // 获取会议文件
    getFiles() {
      let self = this;
      dsf.http
        .post(`fn/peopleCongress/files`, {
          meetingId: self.meetingInfo.id
        })
        .done(result => {
          if (result.type == "success") {
            self.files = [];
            // 目录
            if (result.data.folders && result.data.folders.length > 0) {
              let arr = [];
              result.data.folders.map(item => {
                arr.push(
                  Object.assign({}, item, {
                    type: "folder"
                  })
                );
              });
              self.files.push(...arr);
            }
            // 文件
            if (result.data.files && result.data.files.length > 0) {
              let arr = [];
              result.data.files.map(item => {
                arr.push(
                  Object.assign({}, item, {
                    type: item.fileName.substr(
                      item.fileName.lastIndexOf(".") + 1
                    )
                  })
                );
              });
              self.files.push(...arr);
            }
          }
        })
        .error(err => {
          console.log("getFiles-err", err);
        })
        .always(() => {
          self.finishStatus.files = true;
          self.closeLoading();
        });
    },
    // 获取会议信息
    getMeetingInfo() {
      let self = this;
      dsf.http
        .post(`fn/peopleCongress/meetingInfo`, {
          meetingTypeId: self.$route.params.key
        })
        .done(result => {
          if (result.type == "success" && result.data.length > 0) {
            self.meetingInfo = result.data[0];
          }
        })
        .error(err => {
          console.log("getMeetingInfo-err", err);
        })
        .always(() => {});
    },
    // 获取今日日程
    getAgendasToday() {
      let self = this;
      dsf.http
        .post(`fn/peopleCongress/agendasToday`, {
          meetingId: self.meetingInfo.id
        })
        .done(result => {
          if (result.type == "success") {
            self.schedules = result.data;
          }
        })
        .error(err => {
          console.log("getAgendasToday-err", err);
        })
        .always(() => {
          self.finishStatus.agenda = true;
          self.closeLoading();
        });
    },
    // 获取全部日程
    getMyAgendas() {
      let self = this;
      dsf.http
        .post(`fn/peopleCongress/myAgendas`, {
          meetingId: self.meetingInfo.id
        })
        .done(result => {
          if (result.type == "success") {
            self.allSchedules = result.data;
          }
        })
        .error(err => {
          console.log("getMyAgendas-err", err);
        })
        .always(() => {
          self.finishStatus.agenda = true;
          self.closeLoading();
        });
    },
    // 获取消息提醒
    getTips() {
      let self = this;
      dsf.http
        .post(`fn/peopleCongress/tips`, {
          meetingId: self.meetingInfo.id,
          count: 1
        })
        .done(result => {
          if (result.type == "success" && result.data.length > 0) {
            // self.noticeText = news.map(item => item.title).join(",");
            self.noticeText = result.data[0].title;
          }
        })
        .error(err => {
          console.log("getTips-err", err);
        })
        .always(() => {
          self.finishStatus.tips = true;
          self.closeLoading();
        });
    },
    // 获取历史会议信息
    getHistoryMeetings() {
      let self = this;
      dsf.http
        .post(`fn/peopleCongress/historyMeetings`, {
          meetingTypeId: self.$route.params.key
        })
        .done(result => {
          if (result.type == "success") {
            self.allMeetings = result.data;
          }
        })
        .error(err => {
          console.log("getHistoryMeetings-err", err);
        })
        .always(() => {
          self.finishStatus.history = true;
          self.closeLoading();
        });
    },
    // 获取服务指南
    getServiceGuide() {
      let self = this;
      dsf.http
        .post(`fn/peopleCongress/serviceGuide`, {
          meetingId: self.meetingInfo.id
        })
        .done(result => {
          if (result.type == "success") {
            self.setServiceGuide("服务指南", 11, result.data);
            self.setServiceGuide("会风会纪", 12, result.data);
          }
        })
        .error(err => {
          console.log("getServiceGuide-err", err);
        })
        .always(() => {
          self.finishStatus.guide = true;
          self.closeLoading();
        });
    },
    // 获取会议级别
    getMeetingLevel() {
      let self = this;
      dsf.http
        .get(`fn/peopleCongress/meetingLevel`)
        .done(res => {
          if (res.type == "success") {
            self.meetingLevels = res.data;
            self.meetingLevels.unshift({ text: "全部", value: "-1" });
          }
        })
        .error(err => {
          console.log("getMeetingLevel-err", err);
        })
        .always(() => {
          self.finishStatus.level = true;
          self.closeLoading();
        });
    },
    // 切换会议
    onSwitchMeeting(val) {
      let self = this;
      self.showPicker = false;
      self.isFirstLoad = true;
      if (self.meetingInfo.id != (val.id ?? val)) self.init(val.id ?? val);
    },
    setServiceGuide(menuName, fileType, files) {
      let self = this;
      if (files.length > 0) {
        let file = files.find(item => item.fileType == fileType);
        if (file) {
          let url = dsf.url.getServerUrl(
            `fn/office/openMobileOffice?fileId=${file.fileId}&moduleId=${file.moduleId}&nodeId=${file.nodeId}&flowId=${file.flowId}&filename=${file.fileName}`
          );
          self.menusList.forEach(menus => {
            menus.map(item => {
              if (item.name == menuName) item.url = url;
              return item;
            });
          });
        }
      }
    },
    goUrl(item) {
      let self = this;
      if (item.name == "会风会纪" || item.name == "服务指南") {
        // 文件预览
        if (item.url) {
          self.$router.push({
            name: "dsfIframe",
            params: {
              url: item.url,
              title: item.name
            }
          });
        } else {
          dsf.layer.toast(`请先上传${item.name}！`);
        }
      } else {
        self.$router.push({ 
          path: item.url, 
          query: { title: item.name } 
        });
      }
    },
    closePicker(isShow) {
      this.showPicker = isShow;
    },
    // 初始化菜单
    setMenu() {
      let self = this,
        showMenus = [],
        menu;
      if (self.meetingInfo && self.isShowMenu) {
        self.meetingInfo.showModule.split(",").forEach((module, idx) => {
          menu = self.menus.find(menu => menu.id == module);
          if (menu)
            showMenus.push({
              id: menu.id,
              name: self.meetingInfo.showModuleName.split(",")[idx],
              img: menu.img,
              url: menu.url
            });
        });
        self.menusList = self.chunk(showMenus, 8);
      }
    },
    chunk(arr, size) {
      let arrPack = [];
      for (let i = 0; i < arr.length; i = i + size) {
        arrPack.push(arr.slice(i, i + size));
      }
      return arrPack;
    },
    closeLoading() {
      let self = this;
      let flag = true;
      for (let key in self.finishStatus) {
        if (self.finishStatus[key] === false) flag = false;
      }
      if (flag) dsf.layer.closeLoading(self.loading);
    }
  }
};
</script>

<style lang="scss" scoped>
@import "src/assets/styles/themes.scss";
@import "src/assets/styles/mixin.scss";

.init-div {
  position: absolute;
  width: 100%;
  height: 20px;
  line-height: 20px;
  margin-top: -20px;
  top: 50%;
  left: 0;
  font-size: var(--font_size_2);
  color: #7f7a7a;
  text-align: center;
}

.top-info {
  min-height: 2.5rem;
  display: flex;
  padding: 0.5rem 0.3rem 0;
  position: relative;
  box-shadow: 0 10px 20px 0 rgba(0, 0, 0, 0.08);

  .opinion {
    position: absolute;
    top: 0.24rem;
    right: 0.3rem;
    background: rgba(255, 255, 255, 0.1);
    border: 1px solid #ffffff;
    border-radius: 24px;
    padding: 0.1rem 0.16rem;
    font-size: var(--font_size_4);
    color: #fff;
    z-index: 1;
  }

  .theme {
    position: absolute;
    top: 0.24rem;
    right: 0.3rem;
    z-index: 1;
    color: #fff;
  }

  .bg {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    right: 0;
    // z-index: 1;
    overflow: hidden;
    @include background-theme("normal");

    img {
      height: 100%;
    }
  }

  .pin {
    position: absolute;
    right: 0.3rem;
    bottom: -0.3rem;
    z-index: 1;
    width: 1rem;
    height: 1rem;
  }

  .avatar {
    width: 1rem;
    height: 1rem;
    border: 1px solid #ffffff;
    border-radius: 50%;
    overflow: hidden;
    z-index: 1;
  }

  .theme {
    display: flex;
    align-items: center;

    img {
      display: inline-block;
      width: 0.28rem;
      height: 0.28rem;
    }

    span {
      padding-left: 0.3em;
    }
  }

  .info {
    color: #fff;
    padding-left: 0.3rem;
    z-index: 1;
    flex: 1;
    overflow: hidden;

    .name {
      font-size: 0.38rem;
      font-weight: bold;
      line-height: 0.5rem;
      padding: 3px 0;
    }

    .title {
      display: flex;

      span {
        flex: 1;
      }

      img {
        display: inline-block;
        width: 20px;
        height: 20px;
      }

      .elps {
        display: -webkit-box;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
        white-space: initial;
      }
    }

    .time {
      padding: 0.24rem 0;
      opacity: 0.8;
    }
  }
}

::v-deep.van-divider {
  margin: 0;
  padding: 0 16px;
  border-color: #ddd;
  background-color: #fff;
}

.meeting-empty {
  padding: 2rem 0;

  ::v-deep .van-empty__image {
    width: 4rem;
  }
}

.schedule-empty,
.file-empty {
  display: flex;
  flex-direction: row;
  padding: 0.2rem 0.5rem;

  ::v-deep .van-empty__image {
    flex: none;
  }

  ::v-deep .van-empty__description {
    padding: 0;
  }
}

.news {
  // position: absolute;
  width: 100%;
  // transform: translatey(-20px);
  z-index: 1;

  .van-notice-bar {
    border-radius: 5px;
    box-shadow: 0 10px 20px 0 rgba(0, 0, 0, 0.08);
    background-color: #FEF7E4;
    overflow: hidden;
    height: 1.2rem;
    padding: 0 0.32rem;
    font-size: 0.48rem;
    line-height: 0.48rem;
    // margin: 0 16px;

    ::v-deep .van-icon-volume {
      // font-weight: bold;
      font-size: 0.6rem;
      margin-right: 0.3rem;
      @include font-theme("normal");
    }

    ::v-deep .van-notice-bar__content {
      font-weight: bold;
      color: #333;
    }
  }
}

.menus {
  background-color: #fff;

  .van-swipe {
    .van-swipe-item {
      display: flex;
      flex-wrap: wrap;
      padding-top: 10px;

      .menu-item {
        width: 25%;
        text-align: center;
        margin-bottom: 10px;

        img {
          display: inline-block;
          width: 54px;
        }
      }
    }

    ::v-deep .van-swipe__indicator {
      background-color: #999;
    }

    ::v-deep .van-swipe__indicator--active {
      @include background-theme("normal");
    }
  }
}
</style>

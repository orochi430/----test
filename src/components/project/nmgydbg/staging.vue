<template>
  <div class="box">
    <div class="staging" v-if="err">
      <div class="head">
        <img :src="imgcp" alt="" />
        <div class="weather">
          <!-- <div class="weather_top">
          <span>{{ dataObj.temps }}</span>
          <img :src="dataObj.weathericon" alt="" class="weathericon" />
          <span>{{ dataObj.weatherdescription }}</span>
        </div> -->
          <div class="weather_buttom">欢迎您，{{ name }}</div>
        </div>
      </div>
      <div class="main" :style="{ backgroundImage: `url(${bgcp})` }">
        <div
          class="main_item"
          v-for="(item, index) in menuList"
          :key="index"
          @click="goRoute(item)"
        >
          <!-- <template v-if="item.badge"> -->
          <img :src="item.img" alt="" />
          <div class="main_item_content" :style="{ color: item.textColor }">
            <div>{{ item.name }}</div>
            <div>{{ item.badge }}</div>
          </div>
          <!-- </template>s -->
        </div>
      </div>
    </div>
    <div v-else>
      <div class="errtip">
        <div class="center" @click="reload">
          <div class="errimg">
            <i class="reload icon iconfont iconrefresh"></i>
          </div>

          <div class="errtext">网络错误，请点击重试</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import oaScoketJs from "@/common/oaScoket";
import store from "@/common/util";
export default {
  name: "staging",

  components: {},

  data() {
    return {
      dataObj: {
        blue: {
          imgUrl: "",
          bgUrl: "",
        },
        red: {
          imgUrl: "",
          bgUrl: "",
        },
      },
      menuList: [],
      name: dsf.util.loadSessionStore("user").name,
      userColor: dsf.util.loadLocalStore("userColor"),
      tipdatas: [],
      count: 0,
      err: true,
      timer: "",
    };
  },

  created() {},
  computed: {
    imgcp() {
      if (this.userColor || this.userColor == null) {
        return dsf.url.getServerUrl(this.dataObj.red?.imgUrl || "");
      } else {
        return dsf.url.getServerUrl(this.dataObj.blue?.imgUrl || "");
      }
    },
    bgcp() {
      if (this.userColor || this.userColor == null) {
        return dsf.url.getServerUrl(this.dataObj.red?.bgUrl || "");
      } else {
        return dsf.url.getServerUrl(this.dataObj.blue?.bgUrl || "");
      }
    },
  },
  // activated() {
  //   this.userColor = dsf.util.loadLocalStore("userColor");
  // },
  mounted() {
    let self = this;
    this.getMenu();
    this.getImg();
    this.setTimer();

    // oaScoketJs.close();
    this.oaScoket = oaScoketJs.getInstance(this);
    this.oaScoket.onReceivedTodo(
      store.loadSessionStore("user").user_id,
      (data) => {
        if (window.xsfCommon) {
          self.setAppBadge();
        }
        self.tipdatas.forEach(async (item) => {
          if (item.tip) {
            let res = await self.getTip(item.tip);
            self.menuList.find((it) => {
              if (it.id == item.id) {
                it.badge =
                  item.tip.indexOf("forwardRequest") > -1
                    ? res.data.data.badge
                    : res.data.badge;
              }
            });
          }
        });
      }
    );
  },
  methods: {
    setTimer() {
      let self = this;
      function setBadge() {
        self.tipdatas.forEach(async (item) => {
          if (item.tip) {
            let res = await self.getTip(item.tip);
            self.menuList.find((it) => {
              if (it.id == item.id) {
                it.badge =
                  item.tip.indexOf("forwardRequest") > -1
                    ? res.data.data.badge
                    : res.data.badge;
              }
            });
          }
        });
      }
      setBadge();
      if (window.xsfCommon) {
        self.setAppBadge();
      }
      clearInterval(this.timer);
      this.timer = setInterval(() => {
        if (window.xsfCommon) {
          self.setAppBadge();
        }
        setBadge();
      }, 30000);
    },
    getTimeState() {
      // 获取当前时间
      let timeNow = new Date();
      // 获取当前小时
      let hours = timeNow.getHours();
      // 设置默认文字
      let text = ``;
      // 判断当前时间段
      if (hours >= 0 && hours <= 12) {
        text = `早上好，`;
      } else if (hours > 12 && hours <= 18) {
        text = `下午好，`;
      } else if (hours > 18 && hours <= 24) {
        text = `晚上好，`;
      }
      // 返回当前时间段对应的状态
      return text;
    },
    getImg() {
      let self = this;
      let loading = dsf.layer.loading();
      let id =
        this.$route.query.id ||
        dsf.util
          .loadSessionStore("footerMenu")
          .find((item) => item.showName == "工作台").id;
      dsf.http
        .post(`ctrl/shortcutBar/img/${id}`)
        .then((res) => {
          if (res.data.code == "200") {
            dsf.layer.closeLoading(loading);
            this.dataObj = res.data.data;
          } else {
            dsf.layer.toast(res.data.message);
          }
        })
        .error((err) => {
          // console.log(typeof err,typeof JSON.stringify(err));
          if (JSON.stringify(err).includes("Network Error")) {
            dsf.layer.closeLoading(loading);
            this.err = false;
          }
        });
    },

    getMenu() {
      let self = this;
      this.menuList = [];
      this.tipdatas = [];
      let loading = dsf.layer.loading();
      dsf.http
        .get("fn/shortcutBar/list")
        .then((res) => {
          if (res.data.code == "200") {
            res.data.data.forEach(async (item, index) => {
              let obj = {
                name: item.shortcutName,
                router: item.actUrl,
                img: dsf.url.getServerUrl(
                  self.userColor
                    ? JSON.parse(item.shortcutIcon).red
                    : JSON.parse(item.shortcutIcon).blue
                ),
                textColor: JSON.parse(item.agentid).textColor,
                id: item.id,
              };
              this.menuList.push(obj);
              self.tipdatas.push({ id: item.id, tip: item.tip });
              let res;
              if (item.tip) {
                res = await self.getTip(item.tip);
                self.$set(
                  self.menuList[index],
                  "badge",
                  item.tip.indexOf("forwardRequest") > -1
                    ? res.data.data.badge
                    : res.data.badge
                );
              }
            });
            dsf.layer.closeLoading(loading);
          } else {
            dsf.layer.toast(res.data.message);
          }
        })
        .error((err) => {
          // console.log(typeof err,typeof JSON.stringify(err));
          if (JSON.stringify(err).includes("Network Error")) {
            dsf.layer.closeLoading(loading);
            this.err = false;
          }
        });
    },

    goRoute(item) {
      if (
        item.router.indexOf("http:") > -1 ||
        item.router.indexOf("https:") > -1
      ) {
        let userid = dsf.util.loadSessionStore("user").user_id;
        let prefix = item.router.split("commonList")[0];
        let tmpUrl;
        if (item.router.indexOf("nmdwydbg") > -1) {
          tmpUrl = dsf.base64.encode(item.router.split("/nmdwydbg")[1]);
        } else if (item.router.indexOf("DreamWeb") > -1) {
          tmpUrl = dsf.base64.encode(item.router.split("/DreamWeb")[1]);
        }

        let url = `${prefix}fn/mobileSso/redirectAuth?code=${userid}&state=${tmpUrl}`;
        xsfWindow.openWebView({
          title: "",
          url: url,
          colorString: "#fff",
          show_title_bar: false,
        });
      } else {
        let url = item.router.split("?")[0];
        let flag=item.router.includes("fileType");
        //   console.log(secQuery);
        if (
          url ==
          "commonList/2206140944586bW055wjWnzurPnIaOC/200604181624TgyhRFd9z8kt5NCPcLQ" && !flag
        ) {
          let secQuery = {};
          if (item.router.split("?")[1]) {
            item.router
              .split("?")[1]
              .split("&")
              .forEach((ele) => {
                let key = ele.split("=")[0];
                let value = ele.split("=")[1];
                secQuery[key] = value;
              });
          }
          this.$router.push({
            path: "/commonList",
            query: {
              title: item.name,
              fileType: "nmg_db",
              secQuery: JSON.stringify(secQuery),
              openSocket: 1,
            },
          });
        } else if (item.router.indexOf("fileType") > -1) {
          this.$router.push({
            path: item.router,
            query: {
              title: item.name,
              openSocket: 1,
            },
          });
        } else {
          this.$router.push({
            path: item.router,
            query: {
              title: item.name,
              openSocket: 1,
            },
          });
        }
      }
    },
    getTip(url) {
      return new Promise((reslove, reject) => {
        dsf.http.get(url).then((res) => {
          reslove(res);
        });
      });
    },
    setAppBadge() {
      let url =
        dsf.config.login.setAppBadgeUrl ||
        "fn/list/2206140944586bW055wjWnzurPnIaOC/mobileBadge/q?isFirst=1&moduleId=200604181624TgyhRFd9z8kt5NCPcLQ";
      dsf.http.post(url).then((data) => {
        this.count = data.data.badge;
        xsfCommon.setAppBadge(
          {
            count: data.data.badge,
          },
          this.testSuccess,
          this.testFailed
        );
      });
    },
    testSuccess(msg) {
      // alert(msg);
    },
    testFailed(msg) {
      // alert('failed: ' + msg);
    },
    reload() {
      window.location.reload();
    },
  },
  activated() {
    // this.getImg();
    this.setTimer();
  },
  deactivated() {
    clearInterval(this.timer);
  },
};
</script>

<style scoped lang='scss'>
@import "../../../assets/styles/mixin.scss";
@import "../../../assets/styles/themes.scss";
.staging {
  display: flex;
  flex-direction: column;
  height: calc(100vh - 1.2rem);
  .head {
    width: 100%;
    min-height: 200px;
    position: relative;
    z-index: -1;
    img {
      width: 100%;
      vertical-align: middle;
    }
    .weather {
      position: absolute;
      top: 30%;
      left: 6%;
      color: #fff;
      //   .weather_top {
      //     display: flex;
      //     align-items: center;
      //     .weathericon {
      //       margin: 0 6px;
      //       width: 18px;
      //     }
      //   }
      .weather_buttom {
        @include font_2();
        font-weight: 600;
        padding: 10px 0;
        text-shadow: 0 1px px;
        font-family: PingFangSC-Semibold;
      }
    }
  }
  .main {
    width: 94%;
    box-shadow: 1px 1px 12px 0px #ddd;
    border-radius: 10px 10px 0 0;
    -webkit-box-flex: 1;
    -webkit-flex: 1;
    flex: 1;
    margin: -0.6rem auto 0;
    padding: 0.3rem;
    background: #fff no-repeat center bottom/ 100%;
    display: -webkit-box;
    display: -webkit-flex;
    display: grid;
    grid-gap: 0.3rem;
    grid-template-columns: auto auto;
    -webkit-justify-content: space-around;
    justify-content: space-around;
    -webkit-align-content: flex-start;
    align-content: flex-start;
    overflow: auto;
    .main_item {
      position: relative;
      width: 40vw;
      // min-height: 60px;
      .main_item_content {
        position: absolute;
        top: 20%;
        left: 10%;
        font-weight: bolder;
        color: #c13f42;
        div:last-child {
          padding: 5px 0;
          font-size: 18px;
        }
      }
    }
  }
}
.errtip {
  // padding: 10px;
  height: calc(100vh - 1.2rem);
  width: 100%;
  .center {
    width: 60%;
    height: 30%;
    margin: auto;
    position: absolute;
    top: -16%;
    left: 0;
    right: 0;
    bottom: 0;
    .errimg {
      text-align: center;

      .reload {
        font-size: 200px;
        color: #ccc;
      }
    }
    .errtext {
      font-weight: 700;
      text-align: center;
      color: #696969;
      font-size: 22px;
    }
  }
}
</style>
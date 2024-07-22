<template>
  <div class="ds-moduleIndex">
    <div class="appBox">
      <div class="page_title" :style="title_css">
        <p>{{ page_title[actionIndex] }}</p>
        <van-search
          :clearable="false"
          v-model="searchVal"
          :show-action="true"
          :offset="100"
          placeholder="搜索服务、事项等"
        >
          <template #left-icon>
            <van-icon name="search" color="#FFF" />
          </template>
          <template #action>
            <div class="flex ac">
              <van-icon
                name="wap-nav"
                @click="settingModel = true"
                color="#FFF"
                size="0.48rem"
              />
            </div>
          </template>
        </van-search>
      </div>
      <img
        v-if="actionIndex == 1"
        src="static/images/EnterpriseServices/banner.png"
        alt=""
      />
      <weather></weather>
      <!-- 应用 -->
      <div
        class="item-cell"
        :class="{ card: item.child.length }"
        :key="index"
        v-for="(item, index) in mainMenu"
        :style="{ 'margin-top': !index ? '0' : '' }"
      >
        <div class="title" v-if="item.child.length > 0">
          <span>{{ item.name }}</span>
        </div>
        <div class="dsf-list" v-if="item.child.length > 0">
          <div
            :key="subIndex"
            v-for="(subItem, subIndex) in item.child"
            v-show="subItem.isshow && subItem.hasMyMenu == 0"
            class="menu"
            @click="goRoute(subItem)"
          >
            <img :src="subItem.img" alt />
            <p>{{ subItem.name }}</p>
          </div>
        </div>
      </div>
      <div class="item-cell card" v-if="actionIndex == 1">
        <div class="title">
          <span>最新活动</span>
        </div>
        <div class="img-container mar-bottom_10">
          <img src="static/images/EnterpriseServices/footer_1.png" alt="" />
          <img src="static/images/EnterpriseServices/footer_2.png" alt="" />
          <img src="static/images/EnterpriseServices/footer_3.png" alt="" />
        </div>
      </div>
    </div>
    <div class="my-popup" v-if="isShowChildMenuPopup && currentChildMenu">
      <van-nav-bar
        :title="currentChildMenu.name"
        left-arrow
        @click-left="isShowChildMenuPopup = false"
      />
      <!-- <img class="popupBanner" src="static/images/EnterpriseServices/bg2.png" alt=""> -->
      <div class="child-menu-container mar-top_10">
        <div
          :key="index"
          v-for="(item, index) in currentChildMenu.child"
          class="child-menu"
          @click="goRoute(item)"
        >
          <img :src="item.img" alt />
          <p>{{ item.name }}</p>
        </div>
      </div>
    </div>
    <van-popup v-model="settingModel" round position="bottom">
      <van-picker
        show-toolbar
        :columns="actions"
        :default-index="actionIndex"
        @confirm="onSelect"
        @cancel="settingModel = false"
        value-key="name"
      />
    </van-popup>
  </div>
</template>
<script>
import weather from "./weatherInfo";
export default {
  name: "moduleIndex",
  data() {
    return {
      title_css: {},
      user: dsf.util.loadSessionStore("user") || {},
      settingModel: false,
      mainMenu: [],
      myMenus: [],
      searchVal: "",
      page_title: [
        "企业服务专员工作平台",
        "上海市企业服务云平台",
        "企业服务专员管理平台",
      ],
      actions: [],
      actionIndex: 0,
      isShowChildMenuPopup: false,
      currentChildMenu: null,
    };
  },
  created() {
    if (process.env.NODE_ENV == "development") {
      this.title_css = {
        backgroundImage: "url('/static/images/EnterpriseServices/bg2.png')",
      };
    } else {
      this.title_css = {
        backgroundImage: "url('./static/images/EnterpriseServices/bg2.png')",
      };
    }
    let findprivileges = this.user.privileges.filter(function (item) {
      return item.privilegeName == "专员";
    });
    if (findprivileges.length>0)
      this.actions.push({
        name: "专员",
        id: 0,
	  });
	  
    findprivileges = this.user.privileges.filter(function (item) {
      return item.privilegeName == "服务中心管理员";
    });
    if (findprivileges.length>0)
      this.actions.push({
        name: "服务中心管理员",
        id: 2,
      });

    findprivileges = this.user.privileges.filter(function (item) {
      return item.privilegeName == "企业管理员";
    });
    if (findprivileges.length>0)
      this.actions.push({
        name: "企业管理员",
        id: 1,
      });

    findprivileges = this.user.privileges.filter(function (item) {
      return item.privilegeName == "市区府办";
    });
    if (findprivileges.length>0)
      this.actions.push({
        name: "市区府办",
        id: 3,
      });
    this.actionIndex = this.actions.length>0? this.actions[0].id:0;
  },
  watch: {
    searchVal(value) {},
  },
  methods: {
    onSelect(item) {
      this.settingModel = false;
      if (this.actionIndex != item.id) {
        this.actionIndex = item.id;
        dsf.layer.toast("切换角色成功");
      }
    },
    getMenu() {
      //获取应用
      let that = this;
      var mainMenuNow = [];
      dsf.http.post("fn/newFile/shortcutDing", {}).then((res) => {
        let result = res.data;
        result.data.forEach((item) => {
          let level1Menu = {
            name: item.shortcutName,
            id: item.id,
            isOpen: false,
            child: [],
          };
          item.children.forEach((child) => {
            let agentId = child.agentid;
            try {
              if (agentId != "") {
                agentId = JSON.parse(agentId);
              }
            } catch (e) {
              agentId = {};
            }
            let level2Menu = {
              id: child.id,
              isOpen: false,
              name: child.shortcutName,
              badge: child.tip,
              router: child.actUrl,
              img: child.shortcutIcon,
              props: agentId,
              type: child.shortcutType,
              child: [],
            };
            child.children.forEach((itm) => {
              let level3Menu = {
                id: itm.id,
                isOpen: false,
                name: itm.shortcutName,
                badge: itm.tip,
                router: itm.actUrl,
                img: itm.shortcutIcon,
                props: agentId,
                type: itm.shortcutType,
                child: [],
              };
              level2Menu.child.push(level3Menu);
            });
            level1Menu.child.push(level2Menu);
          });
          mainMenuNow.push(level1Menu);
        });
        mainMenuNow.forEach((main) => {
          main.child.forEach((subItem) => {
            subItem.badgeNum = 0;
            subItem.isshow = true;
            let hasMyMenu = that.myMenus.filter((mymenuItem) => {
              return mymenuItem.name == subItem.name;
            });
            subItem.hasMyMenu = hasMyMenu.length;
            if (subItem.badge && subItem.badge != "") {
              dsf.http.post(subItem.badge, {}).then((result) => {
                subItem.badgeNum = result.data.badge;
              });
            }
          });
        });
        that.mainMenu = mainMenuNow;
        console.log(that.mainMenu, res);
      });
    },
    guid() {
      return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
        /[xy]/g,
        function (c) {
          var r = (Math.random() * 16) | 0,
            v = c == "x" ? r : (r & 0x3) | 0x8;
          return v.toString(16);
        }
      );
    },
    openDDApp(agentId) {
      dd.biz.microApp.openApp({
        agentId: agentId,
        onSuccess: function (result) {},
        onFail: function (err) {},
      });
    },
    addClick(menu) {
      dsf.http
        .post("fn/mobileDataAnalyze/addEmpowerment", {
          menuid: menu.id,
          userid: this.user.user_id,
        })
        .then((res) => {
          console.log(res);
        });
    },
    goRoute(item) {
      if (
        item.name == "营销力赋能" ||
        item.name == "上线赋能" ||
        item.name == "融通对接"
      ) {
        this.addClick(item); //记录点击数
      }

      if (item.child.length) {
        this.currentChildMenu = item;
        this.isShowChildMenuPopup = true;
        console.log(this.currentChildMenu);
        return;
      }
      if (item.type && item.type == 3) {
        //eval("this." + item.router + "()");
        this.openDDApp(item.router);
      } else if (item.type == 2) { // 外部链接
        //window.open(item.router);
        if(dsf.config.ddSetting.isDing) { // 钉钉跳转
          dd.biz.util.openLink({
            url: item.router, //要打开链接的地址
            onSuccess: function (result) {},
            onFail: function (err) {},
          });
        } else { // 非钉钉嵌入iframe
          this.$router.push({
            path: 'iframe',
            params: {
              url: item.router
            }
          })
        }
      } else {
        if (item.props) {
          if (item.props.props) {
            this.$router.push({
              path: item.router,
              query: JSON.parse(JSON.stringify(item.props)),
            });
          } else {
            this.$router.push({
              name: item.router,
              params: JSON.parse(JSON.stringify(item.props)),
            });
          }
        } else {
          this.$router.push({
            path: item.router,
          });
        }
      }
    },
  },
  components: {
    weather,
  },
  mounted() {
    this.getMenu();
  },
};
</script>
<style lang="scss" scoped>
@import "../../assets/styles/themes.scss";
@import "../../assets/styles/mixin.scss";

.van-search {
  background-color: transparent;
}

.page_title {
  padding: 15px 15px 0;
  color: white;
  width: 100%;
  background-size: 100% 100%;
  text-align: center;
  font-size: 18px;
}

.ds-moduleIndex {
  // background-color: #fff;
  width: 100%;
  height: 100%;
  overflow: scroll;

  .dsf-list {
    display: flex;
    flex-wrap: wrap;
    box-sizing: border-box;
    // padding: 0 0px 0.64rem;
    width: 100%;
    height: 100%;

    .menu {
      display: inline-block;
      width: 25%;
      text-align: center;
      margin-bottom: 15px;

      img {
        display: inline-block;
        width: 48px;
        height: 48px;
        vertical-align: middle;
        margin-bottom: 6px;
        border: none;
      }

      p {
        //font-size: var(--font_size_2);
        font-size: var(--font_size_3);
        color: #333333;
        letter-spacing: 1px;
      }
    }

    // .menu:nth-child(n + 4) {
    // 	margin-bottom: 0;
    // }
  }

  .noApp {
    font-size: 22px;
    font-weight: 700;
    padding-left: 20px;
    padding-bottom: 20px;

    span {
      display: inline-block;
      color: rgb(33, 150, 243);
      margin-left: 20px;
      transform: scale(1.5);
    }
  }
}

.title {
  padding: 8px 15px;
  box-sizing: border-box;
  position: relative;
  @include font_2;
  font-weight: bold;
  margin-bottom: 10px;

  span {
    margin-left: 5px;
    font-size: 19px;
    color: #333;
  }

  &::before {
    content: "";
    display: block;
    width: 5px;
    height: 20px;
    position: absolute;
    top: 50%;
    transform: translate(-5px, -50%);
    @include background-theme("normal");
  }
}

.dsf-list::before {
  content: "";
  display: block;
  height: 0;
  clear: both;
  visibility: hidden;
}

.card {
  background-color: #fff;
  margin: 10px 0;
  padding: 10px 5px 5px;
}

.img-container {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  padding: 0 10px;
  grid-column-gap: 5px;

  img {
    width: 100%;
    height: 65px;
  }
}

.my-popup {
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  z-index: 99;
  background-color: #fff;

  .popupBanner {
    height: 120px;
  }

  .child-menu-container {
    display: flex;
    flex-wrap: wrap;
    box-sizing: border-box;
    // padding: 0 0px 0.64rem;
    width: 100%;
    height: 100%;

    .child-menu {
      display: inline-block;
      width: 25%;
      text-align: center;
      margin-bottom: 15px;

      img {
        display: inline-block;
        width: 35px;
        height: 35px;
        vertical-align: middle;
        margin-bottom: 6px;
        border: none;
      }

      p {
        //font-size: var(--font_size_2);
        font-size: var(--font_size_3);
        color: #333333;
        letter-spacing: 1px;
      }
    }
  }

  ::v-deep .van-nav-bar .van-icon {
    color: #000;
  }
}

::v-deep .van-search__content {
  border-radius: 8px !important;
  background-color: rgba(255, 255, 255, 0.45) !important;
}

::v-deep ::-webkit-input-placeholder {
  /* WebKit browsers */
  color: rgba(255, 255, 255, 0.8);
  font-size: 15px;
  font-weight: normal;
}

::v-deep .van-field__control {
  color: #fff;
  font-size: 15px;
  font-weight: normal;
}

::v-deep .van-search__action:active {
  background-color: rgba(255, 255, 255, 0) !important;
}

.mar-top_10 {
  margin-top: 10px;
}

.mar-bottom_10 {
  margin-bottom: 10px;
}
</style>

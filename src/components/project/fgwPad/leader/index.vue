<template>
  <div class="shsm">
    <div class="commTitle">
      <div class="logoDiv">
        <img
          class="logo"
          src="static/images/project/fgwPad/logo.png"
          alt=""
          srcset=""
          @click="showBuildTime()"
        />
      </div>
      <div class="rights">
        <!-- <div class="search" @click="searchClick">
                <input type="text" placeholder="请输入关键字" />
                <img src="static/images/project/fgwPad/ss.png" alt="" srcset="" />
            </div> -->
        <div class="user">
          <van-image :src="userInfo.photo">
            <template v-slot:error>
              <img
                src="static/images/project/fgwPad/user-img.png"
                alt=""
                srcset=""
              />
            </template>
          </van-image>

          <span
            >{{ userInfo.name.slice(userInfo.name.length - 2)
            }}{{ userInfo.position }} 您好！</span
          >
        </div>
        <img
          @click="exit"
          class="close"
          src="static/images/project/fgwPad/tc.png"
          alt=""
          srcset=""
        />
      </div>
    </div>
    <div class="contain" v-if="!$route.meta.containView">
      <div class="contain_wrap">
        <div class="tabs">
          <div
            :class="{ active: active == index }"
            @click="goPage(index)"
            v-for="(item, index) in tabList"
            :key="index"
          >
            <span class="title">{{ item.title }}</span>
            <span class="nums" v-if="item.num > 0">{{ item.num }}</span>
          </div>
        </div>
        <div class="contain_body">
          <keep-alive>
            <router-view v-if="$route.meta.keepAlive"></router-view>
          </keep-alive>
          <router-view v-if="!$route.meta.keepAlive"></router-view>
        </div>
      </div>
    </div>
    <div class="contain whitebg" v-if="$route.meta.containView">
      <div class="contain_wrap">
        <keep-alive>
          <router-view v-if="$route.meta.keepAlive"></router-view>
        </keep-alive>
        <router-view v-if="!$route.meta.keepAlive"></router-view>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "shsm",
  components: {},
  data() {
    return {
      active: 0,
      userInfo: {},
      gwTotal: 0,
      dyTotal: 0,
      pages: [],
      tabList: [
        {
          title: "待办",
          num: 0,
          route: "fgwPadSMtodo",
        },
        {
          title: "已办",
          num: 0,
          route: "fgwPadSMdone",
        },
      ],
      tabPath: "",
    };
  },
  computed: {},
  watch: {},
  activated() {},

  methods: {
    goPage(index) {
      this.tabPath="1"
      // console.log('this.tabPath: ', this.tabPath);
      this.active = index;
      // let pages = ["dwp", "wyp", "meeting", "act", "mbgl", "mssj", "msysld", "msyps", "msytj"];
      this.$router.push({
        name: this.tabList[index].route,
      });
    },
    exit() {
      let self = this;
      dsf.layer.confirm(
        {
          message: "是否确认退出登录",
          confirmButtonText: "确认",
        },
        () => {
          dsf.util.logOut();
        }
      );
    },
    searchClick() {
      this.$router.push({
        name: `SMsearch`,
      });
    },
    getList() {
      // 刷新角标
    },
    showBuildTime() {
      this.clickTime = new Date().getTime();
      setTimeout(() => {
        if (new Date().getTime() - this.clickTime < 500) {
          //console.log(JSON.stringify(moment(new Date()).format('YYYY-MM-DD HH:mm')));
          // console.log(JSON.stringify(buildTime))
          document.getElementById("appVersion").innerHTML =
            "当前前端APP程序版本为：" + buildTime;
        }
      }, 500);
    },
  },
  deactivated() {
    if (this.tabPath=="1") {
      this.$deleteCache(this);
    }
  },
  created() {
    this.userInfo = dsf.util.loadSessionStore("user");
  },
  mounted() {
    this.active = this.tabList.findIndex((item) => {
      return item.route == this.$route.name;
    });
    this.getList();
  },
  activated() {},
  destroyed() {},
};
</script>

<style lang="scss" scoped>
.shsm {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  background: url(../../../../../static/images/project/fgwPad/bg.png) no-repeat
    center;
  background-size: 100% 100%;

  .commTitle {
    width: 100%;
    height: 75px;
    overflow: hidden;
    flex-shrink: 0;
    box-sizing: border-box;
    padding: 0 50px 0 55px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: rgba(0, 0, 0, 0.22);

    .logoDiv {
      display: flex;
      align-items: center;

      .logo {
        height: 55px;
        width: auto;
      }

      .logotext {
        width: auto;
        height: 30px;
      }
    }

    .rights {
      display: flex;
      align-items: center;

      .close {
        width: 32px;
        height: 32px;
        margin-left: 57px;
      }

      .user {
        display: flex;
        align-items: center;
        margin-left: 45px;

        .van-image {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          overflow: hidden;
        }

        /deep/.van-image__error,
        /deep/.van-image__loading {
          background: none !important;
        }

        img {
          width: 32px;
          height: 32px;
          border-radius: 50%;
        }

        span {
          font-size: 18px;
          color: #ffffff;
          margin-left: 10px;
        }
      }
    }

    .search {
      width: 265px;
      height: 46px;
      background: #fff;
      border-radius: 23px;
      box-sizing: border-box;
      padding: 0 15px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      overflow: hidden;

      img {
        width: 19px;
        height: 19px;
        flex-shrink: 0;
      }

      input {
        width: 100%;
        height: 46px;
        font-size: 18px;
        color: #0f77ab;

        &::placeholder {
          font-size: 18px;
          color: rgba(15, 119, 171, 0.5);
        }
      }
    }
  }

  .contain {
    width: 100%;
    height: calc(100vh - 75px);
    box-sizing: border-box;
    padding: 40px 50px;
    position: relative;
    display: flex;

    &.whitebg {
      .contain_wrap {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        background: #fff;
        border-radius: 10px;
      }
    }

    .contain_wrap {
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
    }

    .tabs {
      width: 100%;
      height: 54px;
      display: flex;
      align-items: center;
      flex-shrink: 0;
      background: url(../../../../../static/images/project/fgwPad/wxz.png)
        no-repeat;
      background-size: 100% 100%;
      border-top-left-radius: 10px;
      border-top-right-radius: 10px;

      & > div {
        width: 170px;
        height: 54px;
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;

        .nums {
          background-image: linear-gradient(180deg, #f26a51 2%, #ff3b30 98%);
          border-radius: 16.67px 166.67px 166.67px 0px;
          width: 30px;
          height: 20px;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 12px;
          color: #fff;
          position: absolute;
          right: 10px;
          top: 10px;
        }

        .title {
          font-size: 24px;
          color: #ffffff;
        }

        &.active {
          width: 190px;
          height: 60px;
          background: url(../../../../../static/images/project/fgwPad/xzz.png)
            no-repeat;
          background-size: 100% 100%;
          position: relative;
          bottom: 0;

          &:first-child {
            background: url(../../../../../static/images/project/fgwPad/tab-wxz.png)
              no-repeat;
            background-size: 100% 100%;
          }

          .title {
            font-size: 24px;
            color: #333333;
            font-weight: bold;

            &::after {
              width: 2rem;
              height: 3px;
              background: #0f77ab;
              content: "";
              position: absolute;
              bottom: 0;
              left: 50%;
              transform: translateX(-50%);
            }
          }

          .nums {
            right: 30px;
          }
        }
      }
    }

    .contain_body {
      width: 100%;
      height: calc(100% - 54px);
      background: #fff;
      border-bottom-left-radius: 10px;
      border-bottom-right-radius: 10px;
    }
  }
}
</style>

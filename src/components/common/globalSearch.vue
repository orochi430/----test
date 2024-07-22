<template>
  <div class="globalSearch" :style="{height:`calc(100vh - ${dsf.util.getOffsetTop()})`}">
    <van-nav-bar :safe-area-inset-top="true">
      <template #title>
        <van-search v-model.trim="TITLE" show-action placeholder="请输入搜索关键词" @search="onSearch" @cancel="onCancel">
          <template #left-icon>
            <van-icon color="#999" size="18" style="font-weight: bold;" name="search" />
          </template>
          <template #action>
            <span @click="onCancel1">筛选</span>
          </template>
        </van-search>
      </template>
    </van-nav-bar>
    <div class="lists" v-if="showHistory">
      <div class="hisHeader">
        <div class="histitle">
          <span>最近搜索</span>
          <p @click="open = !open">
            <span>展开</span>
            <van-icon :class="{ 'open': open }" name="arrow-down" />
          </p>
        </div>
        <span class="clear" @click="clearHis">清空</span>
      </div>
      <div class="hisList" v-show="open">
        <p v-for="item in searchList" @click="hisSearch(item)">
          <van-icon name="clock-o" />
          <span>{{ item }}</span>
        </p>
      </div>
    </div>
    <div class="lists1" v-if="!showHistory">
      <div class="listdiv">
        <commonempty v-if="list.length == 0 && !loading" />
        <van-list v-model="loading" :finished="finished" finished-text="" @load="onLoad">
          <div class="dblist" v-for="(item, index) in list" :key="index" @click="go(item)">
            <div class="sysicon" v-if="item.APP_ICON">
              <img :src="dsf.url.getWebPath(item.APP_ICON)" alt="">
              <span>{{ item.APP_NAME }}</span>
            </div>
            <div class="sysicon" v-else>
              <img :src="dsf.url.getWebPath('/static/images/shanxi/preSearch.png')" alt="">
              <span>{{ item.APP_NAME }}</span>
            </div>
            <div class="texts">
              <div class="tit" v-html="item.B0001"></div>
              <div class="con" v-html="item.FILECONTENT"></div>
              <div class="tim">
                <p>
                  <img src="static/images/platform/gs_icon2.png" alt="" srcset="">
                  <span>{{ item.A0005 }}</span>
                </p>
                <p>
                  <img v-if="item.WH" src="static/images/platform/gs_icon5.svg" alt="" srcset="">
                  <span v-if="item.WH">{{ item.WH }}</span>
                </p>
                <p>
                  <img v-if="item.A0014" src="static/images/platform/gs_icon3.png" alt="" srcset="">
                  <span v-if="item.A0014">{{ item.A0014 }}</span>
                </p>
              </div>
            </div>
          </div>
        </van-list>
      </div>
    </div>
    <van-popup v-model="showDialog" round :style="{ height: '80%' }" position="bottom" @close="close">
      <div class="wrapSearch">
        <div class="titles">
          <van-icon name="arrow-down" @click="showDialog=false" />
          <span>筛选</span>
        </div>
        <div class="searchVal">
          <div>
            <span>应用</span>
            <input type="text" readonly v-model.trim="APP_NAME" placeholder="请选择" @click="openMenus">
          </div>
          <div>
            <span>标题</span>
            <input type="text" v-model.trim="TITLE">
          </div>
          <div>
            <span>文号</span>
            <input type="text" v-model.trim="WH">
          </div>
          <div>
            <span>创建时间</span>
            <p>
              <span @click="showCalendar = true">
                <label>{{ startDate }}</label>
              </span>
              <label></label>
              <span @click="showCalendar = true">
                <label>{{ endDate }}</label>
              </span>
            </p>
          </div>
        </div>
        <div class="buttomBtn">
          <button class="refl" @click="reflushVal">重置</button>
          <button class="conf" @click="doSearch">确定</button>
        </div>
      </div>
    </van-popup>
    <van-popup v-model="showMenu" position="bottom" :style="{ height: '40%' }" round>
      <van-picker title="" show-toolbar :columns="menus" @confirm="menuConfirm" @cancel="menuCancel">
        <template #option="val">
          {{val.appName}}
        </template>
      </van-picker>
    </van-popup>
    <van-calendar v-model="showCalendar" :min-date="minDate" :max-date="maxDate" type="range" @confirm="onConfirm" />
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: 'globalSearch',
  components: {},
  data() {
    return {
      keyword: "",
      open: true,
      showHistory: true,
      list: [],
      finished: false,
      loading: false,
      refreshing: false,
      page: 1,
      limit: 10,
      scrollPages: 0,
      showDialog: false,
      APP_NAME: "",
      APP_CODE: "",
      TITLE: "",
      WH: "",
      startDate: "",
      endDate: "",
      showCalendar: false,
      RQ: "",
      searchList: [],
      menus: [],
      showMenu: false,
      minDate: new Date(dsf.config.commonList?.searchDateSel?.minDate ?? new Date().getFullYear() - 5, 0, 1),//可选择的最小日期
    };
  },
  computed: {
    ...mapState({
      isShowAppHeader: (state) => state.isShowAppHeader,
    }),
    maxDate() {
      let selectDate = dsf.config.commonList?.searchDateSel?.maxDate
      if (selectDate) {
        if (selectDate == "today")
          return new Date()
        return new Date(selectDate)
      }
      else
        return undefined
    }
  },
  watch: {},
  methods: {
    getAppMenu() {
      dsf.http.get("fn/application/portal/authorizedApp").then(res => {
        console.log("resss", res);
        this.menus = res.data.data
      })
    },
    setHis(val) {
      if (!val) {
        return
      }
      let searchHisList = window.localStorage.getItem("searchHisStr")
      if (!searchHisList) {
        window.localStorage.setItem("searchHisStr", val)
      } else {
        searchHisList = searchHisList.split(",")
        if (searchHisList.includes(val)) {
          // 查找匹配到的值的索引
          let matchIndex = searchHisList.indexOf(val);

          // 如果找到匹配值，则将其挪到第一个位置
          if (matchIndex !== -1) {
            searchHisList.splice(matchIndex, 1); // 删除匹配值
            searchHisList.unshift(val); // 将匹配值添加到数组的第一个位置
          }
        } else {
          searchHisList = [val].concat(searchHisList)
        }
        window.localStorage.setItem("searchHisStr", searchHisList.join(","))
      }

      console.log(searchHisList)
    },
    onSearch(val) {
      if (!val) {
        this.reflushVal()
      }
      this.showHistory = false
      this.doRefresh()
      this.setHis(val)
    },
    onCancel() {
      this.reflushVal()
      this.doRefresh()
    },
    onCancel1() {
      this.APP_CODE = ""
      this.APP_NAME = ""
      this.TITLE = ""
      this.showDialog = true
    },
    hisSearch(val) {
      this.TITLE = val
      this.doRefresh()
    },
    alive(e) {
      // 获取页面滚动条的位置
      this.scrollPages = e.target.scrollTop;
    },
    close() {
      this.showDialog = false
    },
    onConfirm(date) {
      const [start, end] = date;
      this.showCalendar = false;
      // this.date = `${this.formatDate(start)} - ${this.formatDate(end)}`;
      this.startDate = moment(new Date(start)).format("YYYY-MM-DD")
      this.endDate = moment(new Date(end)).format("YYYY-MM-DD")
      this.RQ = this.startDate + " - " + this.endDate
    },
    doSearch() {
      this.showHistory = false
      this.showDialog = false
      this.doRefresh()
    },
    doRefresh() {
      this.list = []
      this.page = 1;
      this.finished = false;
      this.refreshing = true;
      this.loading = true;
      this.onLoad();
    },
    onLoad() {
      if (this.refreshing) {
        this.list = [];
        this.page = 1;
        this.refreshing = false;
      }
      dsf.http
        .post(`fn/search/mobileQ`, {
          RQ: this.RQ || "",
          WH: this.WH || "",
          appCode: this.APP_CODE || "",
          _content: this.TITLE || '',
          limit: this.limit,
          page: this.page
        })
        .then(({
          data
        }) => {
          // console.log(data);
          if (data && data.datas && data.datas.length > 0) {
            this.list = this.list.concat(data.datas);
          } else {
            this.finished = true;
          }
          if (data.datas.length < this.limit) {
            this.finished = true;
          } else {
            this.page += 1;
          }
        })
        .catch(({
          message
        }) => {
          this.finished = true;
          dsf.layer.toast(message);
        })
        .finally(() => {
          this.loading = false;
          this.refreshing = false;
        });
    },
    go(item) {
      if (!dsf.config.login.enableAuthorize) {
        this.$router.push({
          path: `/commonForm/${item.A0004}/${item.id}?listId=searchFormView&method=view`,
        });
        return;
      }
      let that = this
      if (!item.mobileUrl) {
        dsf.layer.toast('请配置应用地址')
        return
      }
      setTimeout(() => {
        dsf.middleground.openUrl({
          url: item.mobileUrl,
          title: item.APP_NAME,
          getCodeParams: {
            "appCode": item.APP_CODE
          }
        })
      }, 100)
    },
    reflushVal() {
      this.APP_CODE = ""
      this.APP_NAME = ""
      this.TITLE = ""
      this.WH = ""
      this.startDate = ""
      this.endDate = ""
      this.RQ = ""
    },
    clearHis() {
      window.localStorage.getItem("searchHisStr", "")
      this.searchList = []
    },
    openMenus() {
      this.getAppMenu()
      this.showMenu = true
    },
    menuConfirm(val) {
      this.APP_NAME = val.appName
      this.APP_CODE = val.appCode
      this.showMenu = false
    },
    menuCancel() {
      this.showMenu = false
    },

  },
  created() { },
  mounted() {
    let searchHisList = window.localStorage.getItem("searchHisStr")
    if (searchHisList) {
      this.searchList = searchHisList.split(",").splice(0, 20)
    }

  },
  activated() {
    let keyword = this.$route.query.keyword
    if (keyword) {
      this.TITLE = keyword
      this.showHistory = false
    } else {
      //this.showHistory = true
    }
  },
  destroyed() { },
}
</script>

<style lang="scss" scoped>
.globalSearch {
  width: 100vw;
  // height:100vh;
  overflow: hidden;

  /deep/ .van-nav-bar__title {
    max-width: 100% !important;
    width: 100% !important;
  }

  display: flex;
  flex-direction: column;
  justify-content: space-between;

  .van-nav-bar {
    flex-shrink: 0;
  }

  .lists {
    flex: 1;
    overflow: hidden;
    box-sizing: border-box;
    padding: 10px;

    .hisHeader {
      width: 100%;
      box-sizing: border-box;
      justify-content: space-between;
      align-items: center;
      display: flex;
      height: 44px;
      border-bottom: 1px solid #ccc;

      .histitle {
        flex: 1;
        display: flex;
        justify-content: space-between;

        & > span {
          font-size: 12px;
          color: #999999;
        }

        & > p {
          display: flex;
          align-items: center;

          .van-icon {
            font-size: 12px;
            color: #999999;
            margin-left: 5px;
            transform: rotate(-90deg);
            transition: all 0.2s linear;

            &.open {
              transform: rotate(0deg);
              transition: all 0.2s linear;
            }
          }

          span {
            font-size: 12px;
            color: #999999;
          }
        }
      }

      .clear {
        margin-left: 20px;
        font-size: 12px;
        color: #999999;
        flex-shrink: 0;
      }
    }

    .hisList {
      width: 100%;
      display: grid;
      grid-template-columns: repeat(auto-fill, 50%);
      margin-top: 20px;

      & > p {
        display: flex;
        align-items: center;
        height: 30px;

        .van-icon {
          flex-shrink: 0;
          margin-right: 5px;
        }

        span {
          width: 100%;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      }
    }
  }

  .lists1 {
    flex: 1;
    overflow: hidden;
    box-sizing: border-box;
  }

  .listdiv {
    width: 100%;
    height: 100%;
    overflow-y: auto;
    box-sizing: border-box;
    padding: 10px;

    .dblist {
      width: 100%;
      background: #fff;
      border-radius: 5px;
      box-sizing: border-box;
      padding: 10px;
      display: flex;
      justify-content: space-between;
      margin-bottom: 10px;

      .sysicon {
        display: flex;
        flex-direction: column;
        align-items: center;
        flex-shrink: 0;
        width: 55px;
        justify-content: center;
        overflow: hidden;

        img {
          width: 34px;
          height: 34px;
          border-radius: 5px;
        }

        span {
          font-size: 12px;
          font-weight: bold;
          color: #333;
          margin-top: 5px;
        }
      }

      .texts {
        flex: 1;
        margin-left: 10px;
        display: flex;
        flex-direction: column;

        .tit {
          font-size: 16px;
          color: #333333;
          line-height: 22px;
          word-break: break-all;
          label {
            color: #e50012;
          }
        }
        .con {
          color: #999;
          word-break: break-all;
        }
        .tim {
          display: grid;
          align-items: center;
          width: 100%;
          margin-top: 5px;
          grid-template-columns: repeat(3, 1fr);

          p {
            display: flex;
            align-items: center;
            overflow: hidden;

            .van-icon {
              font-size: 12px;
              color: #999;
              margin-right: 5px;
              flex-shrink: 0;
            }

            img {
              height: 15px;
              width: auto;
              flex-shrink: 0;
            }

            span {
              font-size: 12px;
              color: #999;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
              width: 100%;
              flex: 1;
              margin-left: 5px;
            }
          }
        }
      }
    }
  }
}

.wrapSearch {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;

  .titles {
    width: 100%;
    height: 50px;
    box-sizing: border-box;
    position: relative;
    padding: 0 15px;
    display: flex;
    align-items: center;
    border-bottom: 5px solid #f1f2f4;
    flex-shrink: 0;

    span {
      font-size: 16px;
      color: #000;
      width: 100%;
      text-align: center;
    }

    .van-icon {
      position: absolute;
      left: 10px;
      font-size: 16px;
      color: #000;
      margin-top: 10px;
    }
  }

  .searchVal {
    width: 100%;
    height: calc(100% - 110px);
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    padding: 0 15px;

    & > div {
      display: flex;
      flex-direction: column;
      margin-top: 15px;

      & > span {
        font-size: 16px;
        color: #000;
        line-height: 25px;
        margin-bottom: 5px;
      }

      & > input {
        width: 100%;
        background: #ffffff;
        border: 1px solid rgba(204, 204, 204, 1);
        border-radius: 4px;
        height: 34px;
        box-sizing: border-box;
        padding: 0 10px;
        font-size: 14px;
        color: #000;
      }

      & > p {
        display: flex;
        align-items: center;
        justify-content: space-between;

        & > span {
          width: 40%;
          height: 34px;
          border: 1px solid rgba(204, 204, 204, 1);
          border-radius: 4px;
          flex-shrink: 0;
          display: flex;
          align-items: center;
          box-sizing: border-box;
          padding: 0 10px;
          justify-content: space-between;

          label {
            font-size: 14px;
            color: #000;
          }

          &::after {
            width: 22px;
            height: 22px;
            content: "";
            background: url(../../../static/images/platform/gs_icon4.png)
              no-repeat;
            background-size: 100% 100%;
            display: block;
          }
        }

        & > label {
          flex: 1;
          height: 34px;
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;

          &::before {
            content: "";
            width: 80%;
            height: 1px;
            background: rgba(204, 204, 204, 1);
          }
        }
      }
    }
  }

  .buttomBtn {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    box-sizing: border-box;
    padding: 0 10px;
    height: 60px;

    button {
      width: 48%;
      box-sizing: border-box;
      border: 1px solid #2486d6;
      border-radius: 4px;
      display: flex;
      align-items: center;
      justify-content: center;
      height: 46px;

      &.refl {
        font-size: 16px;
        color: #2486d6;
      }

      &.conf {
        background: #2486d6;
        color: #fff;
        font-size: 16px;
      }
    }
  }
}
</style>

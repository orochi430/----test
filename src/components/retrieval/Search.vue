/* eslint-disable no-console */
<!--
 * @Author: RONGWEI PENG
 * @Date: 2020-05-11 09:47:43
 * @LastEditTime: 2020-05-16 14:01:52
 * @LastEditors: Do not edit
 * @FilePath: /xzDing/src/components/retrieval/Search.vue
 * @Description:
 -->
<template>
  <div :style="{ backgroundColor: bgColor }" class="ds-search bgColor">
    <!-- <van-tabs v-model="activeName" class="ds-tabs">
      <van-tab title="全文搜索" name="search" class="ds-tab"> </van-tab>
      <van-tab title="筛选" name="filter" class="ds-tab"
        ><search-filter
      /></van-tab>
    </van-tabs> -->
    <div v-show="activeName === 'search'">
      <div v-if="!showCancel" class="ds-search-box">
        <form action="javascript:return true" @submit.prevent>
          <van-search v-model="pararms._content" :offset="100" :show-action="showCancel" shape="round" placeholder="搜索标题、文号、正文内容、标签" @search="onSearch" @cancel="onCancel" />
        </form>

        <div>
          <div class="ds-search-log">
            <p>
              最近查询
              <van-icon class="ds-search-log-icon" name="cross" @click="clearSearchLogs" />
            </p>
            <ul class="ds-log ds-searchLogs">
              <li v-for="(item, index) in searchLogs" :key="index" class="van-ellipsis" @click="logSearch(item)">
                {{ item }}
              </li>
            </ul>
          </div>
          <div class="ds-search-log">
            <p>常用标签</p>
            <div class="ds-log ">
              <van-tag v-for="(item, index) in tags" :key="item" class="ds-tags" closeable size="medium" type="primary" @close="clearTags(index)">
                {{ item }}
              </van-tag>
            </div>
          </div>
          <div class="ds-fix-bottom">
            <van-row gutter="10" type="flex" justify="center" class="ds-search-bottom">
              <van-col span="7">
                <p class="ds-search-line"></p>
              </van-col>
              <van-col span="10">在这里可以搜索到</van-col>
              <van-col span="7">
                <p class="ds-search-line"></p>
              </van-col>
            </van-row>
            <ul class="ds-searchTypeList">
              <li v-for="(item, index) in searchTypeList" :key="index">
                <p>
                  <span :class="item.icon" class="icon iconfont"></span>
                </p>
                {{ item.text }}
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div v-else class="ds-result">
        <div class="ds-result-bg"></div>
        <div class="ds-result-search">
          <form action="javascript:return true" @submit.prevent>
            <van-search v-model="pararms._content" shape="round" background="#ffffff" show-action placeholder="搜索标题、文号、正文内容、标签" @search="onSearch" @cancel="onCancel" />
          </form>
        </div>
        <List :list="list" :mapping="mapping" @onLoad="onLoad" @onBack="onBack" />
      </div>
    </div>
  </div>
</template>

<script>
import List from "./List";
import searchFilter from "@/components/search/searchFilter";
export default {
  name: "search",
  components: {
    List,
    searchFilter
  },
  data() {
    return {
      bgColor: "#ffffff", //  f8f8f7  ffffff
      showCancel: false,
      activeName: "search",
      searchLogs: [],
      tags: [
        /* "测试1", "测试2" */
      ],
      searchTypeList: [
        { text: "标题", icon: "iconbiaoti" },
        { text: "文号", icon: "iconyouxuliebiao" },
        { text: "正文内容", icon: "iconwj-zw" },
        { text: "审批意见", icon: "iconshenpi" },
        { text: "标签", icon: "iconbiaoqian" }
      ],
      mapping: {
        // text: "",
        // title: "",
        // date: ""
      },
      list: [],
      pararms: {
        page: 1,
        limit: 15,
        _content: ""
        // MTYPE: "",
        // STATUS: "",
        // ENDING: ""
      },
      len: 0,
      isMaxLength: false
      /*      loading: false,
      finished: false,
      refreshing: false */
    };
  },
  mounted() {
    const arr = Array.from(
      new Set(dsf.util.loadLocalStore("searchLogs"))
    );
    const pararms = dsf.util.loadLocalStore("pararms");
    this.searchLogs = arr ? arr : [];
    this.pararms = { ...this.pararms, ...pararms };
  },
  methods: {
    onBack() {
      this.showCancel = false;
      this.bgColor = "#ffffff";
    },
    onLoad() {
      this.$set(this.pararms, "limit", this.pararms.limit + 15);
      let pararms = { ...this.pararms };
      this.onhandleHttp(pararms);
    },

    clearSearchLogs() {
      this.searchLogs = [];
      localStorage.removeItem("searchLogs");
    },
    logSearch(val) {
      this.$set(this.pararms, "_content", val);
      this.onSearch(val);
    },
    onSearch(val) {
      let self = this;
      // if (!val) {
      //   return;
      // }
      this.showCancel = true;
      this.bgColor = "#f8f8f7";
      let searchLogs = this.searchLogs;
      if (searchLogs.indexOf(val) < 0 && val) {
        if (searchLogs.length < 10) {
          searchLogs.push(val);
        } else {
          searchLogs.shift();
          searchLogs.push(val);
        }
      }
      console.log("onSearch===", val);

      dsf.util.saveToLocalStore("searchLogs", searchLogs);
      const pararms = {
        ...this.pararms
      };
      this.onhandleHttp(pararms);
    },
    onhandleHttp(pararms) {
      if (this.isMaxLength) {
        return;
      }

      let obj = this.$route.params.searchObj
        ? this.$route.params.searchObj
        : {
          // MTYPE: "",
          // STATUS: "",
          // ENDING: ""
        };
      dsf.http
        .post("fn/search/mobileQ", { ...pararms, ...obj })
        .done(res => {
          // if (this.len == res.datas.length) {
          //   this.isMaxLength = true;
          //   return;
          // }
          this.len = res.datas.length;
          this.list = [...res.datas];
          this.mapping = {
            A0005: "title",
            B0001: "text",
            A0014: "date"
            // A0004: "",
            // icon: "icon"
          };
        })
        .error(error => {
          console.log("console", error);
          self.dsf.layer.toast("请求异常", false);
        });
    },
    clearTags(index) {
      console.log(index);
      this.tags.splice(index, 1);
    },
    onCancel() {
      this.showCancel = false;
      this.bgColor = "#ffffff";
    }
  }
};
</script>

<style lang="scss" scoped>
.ds-search {
  font-family: AlibabaPuHuiTi-Medium;
  color: #333333;
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  // background-color: #ffffff;
  // padding-left: 10px;
  .ds-tabs {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 99;
  }
  .van-search,
  .van-search__content {
    padding: 0;
  }

  ::v-deep .van-search {
    margin-top: 10px;
    height: 54px;
    padding-left: 15px;
    padding-right: 15px;
    input {
      line-height: 28px;
      height: 28px;
      font-size: var(--font_size_3);
    }
    .van-field__left-icon {
      margin-top: 4px;
      .van-icon {
        // font-size: 18px;
      }
    }
  }
  .ds-search-box {
    // top: 44px;
    margin: 0 15px;
    position: relative;
    height: calc(100vh - 104px);
    overflow: hidden;
    .ds-search-log {
      font-size: var(--font_size_1);
      color: #333333;
      margin-top: 20px;
      p {
        position: relative;
        height: 25px;
        line-height: 25px;
        .ds-search-log-icon {
          position: absolute;
          right: 10px;
          top: 1.5px;
          font-size: 22px;
          color: #d7d7d7;
        }
      }
      ::v-deep .ds-log {
        .van-tag--medium {
          font-size: var(--font_size_3);
        }
        box-sizing: border-box;
        width: 100%;
        min-height: 50px;
        max-height: 150px;
        overflow-y: auto;
        padding: 10px;
        li {
          float: left;
          margin: 8px;
          font-size: var(--font_size_3);
          color: #3296fa;
        }
      }
      .ds-tags {
        margin: 8px;
      }
    }
    .ds-fix-bottom {
      position: absolute;
      bottom: 30px;
      left: 0;
      right: 0;
    }
    .ds-search-bottom {
      padding-top: 20px;
      margin-top: 20px;
      text-align: center;
      color: #999999;
      font-size: var(--font_size_3);
      .ds-search-line {
        position: relative;
        top: 10px;
        border: 1px solid #d4d4d4;
      }
    }
    .ds-searchTypeList {
      padding: 20px 0;
      li {
        font-size: var(--font_size_3);
        box-sizing: border-box;
        color: #999999;
        margin: 0;
        width: 20%;
        text-align: center;
        border-right: 1px solid #e6e6e6;
        float: left;
      }
      span {
        font-size: 28px;
      }
    }
  }

  .ds-result-bg {
    background-color: #f8f8f7;
    width: 100%;
    height: 15px;
    position: fixed;
    left: 0;
    right: 0;
    top: 40px;
    z-index: 1;
  }
  .ds-result-search {
    position: fixed;
    left: 0;
    right: 0;
    // top: 40px;
    z-index: 99;
  }
  // .ds-result {
  //   position: relative;
  //   top: 44px;
  //   .ds-result-search {
  //     // padding: 0 10px;
  //   }
  //   .ds-result-list {
  //     background-color: #ffffff;
  //     position: relative;
  //     border-radius: 7px;
  //     margin: 10px 15px;
  //     padding: 10px;
  //     height: 100px;
  //     font-weight: bold;
  //     font-size: var(--font_size_2);
  //     color: #333333;
  //   }
  //   span {
  //     font-weight: 500;
  //     font-size: var(--font_size_3);
  //     color: #666666;
  //   }
  //   .ds-result-icon {
  //     margin: 10px;
  //     position: absolute;
  //     bottom: 10px;
  //   }
  //   .ds-result-icon-left {
  //     left: 10px;
  //   }
  //   .ds-result-icon-right {
  //     right: 10px;
  //   }
  // }
}
</style>

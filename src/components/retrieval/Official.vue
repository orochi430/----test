/* eslint-disable no-console */

<template>
  <div :style="{ backgroundColor: bgColor }" class="ds-search bgColor">
    <div v-show="activeName === 'search'">
      <div v-if="!showCancel" class="ds-search-box">
        <van-search
          v-model="pararms.content"
          :offset="100"
          :show-action="showCancel"
          shape="round"
          placeholder="搜索标题、文号、正文内容、标签"
          @search="onSearch"
          @blur="onSearch"
          @cancel="onCancel"
        />

        <div>
          <div class="ds-search-log">
            <p>
              最近查询
              <van-icon
                class="ds-search-log-icon"
                name="cross"
                @click="clearSearchLogs"
              />
            </p>
            <ul class="ds-log ds-searchLogs">
              <li
                v-for="(item, index) in officialLogs"
                :key="index"
                class="van-ellipsis"
                @click="logSearch(item)"
              >
                {{ item }}
              </li>
            </ul>
          </div>
          <div class="ds-search-log">
            <p>常用标签</p>
            <div class="ds-log ">
              <van-tag
                v-for="item in tags"
                :key="item"
                class="ds-tags"
                closeable
                size="medium"
                type="primary"
                @close="clearTags('primary')"
              >
                {{ item }}
              </van-tag>
            </div>
          </div>
          <div class="ds-fix-bottom">
            <van-row
              gutter="10"
              type="flex"
              justify="center"
              class="ds-search-bottom"
            >
              <van-col span="7"> <p class="ds-search-line"></p></van-col>
              <van-col span="10">在这里可以搜索到</van-col>
              <van-col span="7"> <p class="ds-search-line"></p></van-col>
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
          <van-search
            v-model="pararms.content"
            shape="round"
            background="#ffffff"
            show-action
            placeholder="搜索标题、文号、正文内容、标签"
            @blur="onSearch"
            @cancel="onCancel"
          />
        </div>
        <List :list="list" :mapping="mapping" @onLoad="onLoad" />
      </div>
    </div>
  </div>
</template>

<script>
import List from "./OfficialList";
export default {
  name: "official",
  components: {
    List
  },
  data() {
    return {
      bgColor: "#ffffff", //  f8f8f7  ffffff
      showCancel: false,
      activeName: "search",
      officialLogs: [],
      tags: ["测试1", "测试2"],
      searchTypeList: [
        { text: "标题", icon: "iconbiaoti" },
        { text: "文号", icon: "iconyouxuliebiao" },
        { text: "正文内容", icon: "iconwj-zw" },
        { text: "审批意见", icon: "iconshenpi" },
        { text: "标签", icon: "iconbiaoqian" }
      ],
      mapping: {},
      list: [],
      pararms: {
        page: 1,
        limit: 15,
        content: ""
        // MTYPE: "",
        // STATUS: "",
        // ENDING: ""
      },
      len: 0,
      isMaxLength: false
    };
  },
  mounted() {
    const arr = dsf.util.loadLocalStore("officialLogs");
    const pararms = dsf.util.loadLocalStore("pararms");
    this.officialLogs = arr ? arr : [];
    this.pararms = { ...this.pararms, ...pararms };
  },
  methods: {
    onLoad() {
      this.$set(this.pararms, "limit", this.pararms.limit + 15);
      let pararms = { ...this.pararms };
      this.onhandleHttp(pararms);
      // setTimeout(() => {
      //   // if (this.refreshing) {
      //   //   this.list = [];
      //   //   this.refreshing = false;
      //   // }
      //   for (let i = 0; i < 10; i++) {
      //     this.list.push({
      //       text:
      //         "关于印发《xx县人民政府及其各部门任命国家工作人员宪法宣誓实施办法》的通知"
      //     });
      //   }
      // }, 1000);
    },

    clearSearchLogs() {
      this.officialLogs = [];
    },
    logSearch(val) {
      this.$set(this.pararms, "content", val);
    },
    onSearch(e, type) {
      let self = this;
      let val = e.target.value;
      if (!val) {
        return;
      }
      this.showCancel = true;
      this.bgColor = "#f8f8f7";
      let officialLogs = this.officialLogs;
      if (officialLogs.length < 10) {
        officialLogs.push(val);
      } else {
        officialLogs.shift();
        officialLogs.push(val);
      }
      dsf.util.saveToLocalStore("officialLogs", officialLogs);
      const pararms = {
        ...this.pararms
      };
      this.onhandleHttp(pararms);
    },
    onhandleHttp(pararms) {
      if (this.isMaxLength) {
        self.dsf.layer.toast("已经到最后一页！");
        return;
      }
      dsf.http
        .post("fn/search/mobileQ", pararms)
        .done(res => {
          if (this.len == res.datas.length) {
            this.isMaxLength = true;
            return;
          }
          this.len = res.datas.length;
          this.list = res.datas;
          this.mapping = {
            A0005: "title",
            B0001: "text",
            A0014: "date"
            // A0004: "",
            // icon: "icon"
          };
          // self.dsf.layer.toast("请求成功", true);
        })
        .error(error => {
          console.log("console", error); // self.dsf.layer.toast("模拟Get请求失败", false);
        });
    },
    clearTags(type) {
      console.log(type);
      let self = this;
      this.dsf.http
        .post("fn/search/mobileQ", this.pararms)
        .done(res => {
          let { data } = res;
          // this.officialLogs = res.data
          self.dsf.layer.toast("请求成功", true);
        })
        .error(error => {
          console.log("console", error);
        })
        .always(res => {
          let { data } = res;
        });
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
    ::v-deep .van-pull-refresh {
    position: relative;
    top: 100px;
  }
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

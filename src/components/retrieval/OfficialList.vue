<!--
 * @Author: RONGWEI PENG
 * @Date: 2020-05-12 10:01:23
 * @LastEditTime: 2020-05-14 14:05:07
 * @LastEditors: Do not edit
 * @FilePath: \xzDing\src\components\retrieval\OfficialList.vue
 * @Description:
 -->

<template>
  <div id="ds-list-box">
    <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
      <van-list v-model="loading" :finished="finished" :immediate-check="false" :finished-text="finishedText" class="ds-list" @load="load">
        <div v-for="(item, index) in listMapping" :key="index" class="ds-result-list">
          <p>{{ item.text || "暂无信息..." }}</p>
          <div>
            <p class="ds-result-icon ds-result-icon-left">
              <span :class="item.icon || 'iconGroup-'" class="icon iconfont "></span>
              <span>{{ item.title ? item.title : "收文" }}</span>
            </p>
            <p class="ds-result-icon ds-result-icon-right">
              <span :class="item.icon || 'iconrili'" class="icon iconfont "></span>
              <span>{{ item.date ? item.date : date }}</span>
            </p>
          </div>
        </div>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
// import _ from "lodash";
const cloneDeep = require("lodash/cloneDeep.js");//以后lodash函数按需引入,减少打包体积
const debounce = require("lodash/debounce.js");
export default {
  name: "retrievalList",
  props: {
    finishedText: {
      type: String,
      default: "没有更多了"
    },
    list: {
      type: Array,
      default: () => []
    },
    mapping: {
      type: Object,
      default: () => null
    }
  },

  data() {
    return {
      loading: false,
      finished: false,
      refreshing: false,
      date: moment().format("YYYY-MM-DD")
    };
  },
  computed: {
    listMapping() {
      let newArr;
      if (this.mapping) {
        let map = Object.keys(this.mapping);
        var arr = cloneDeep(this.list);
        // console.log("console", map, arr);
        arr.map((item, index) => {
          map.forEach(v => {
            if (item.hasOwnProperty(v)) {
              item[this.mapping[v]] = item[v];
            }
          });
        });
        newArr = arr;
      } else {
        newArr = this.list;
      }

      return newArr;
    }
  },
  methods: {
    onRefresh() {
      this.finished = false;
      this.loading = true;
      debounce(this.load(), 2000);
    },
    load() {
      /*    if (this.refreshing) {
          this.list = [];
          this.refreshing = false;
        } */
      this.loading = false;
      this.$emit("onLoad");
    }
  }
};
</script>

<style lang="scss" scoped>
#ds-list-box {
  ::v-deep .van-pull-refresh {
    position: relative;
    top: 75px;
  }
  .ds-list {
    // position: relative;
    // top: 100px;
    // padding-bottom: 200px;
    min-height: 710px;
    // border: 1px red solid;
    .ds-result-search {
      padding: 0 10px;
    }
    .ds-result-list {
      background-color: #ffffff;
      position: relative;
      border-radius: 7px;
      margin: 10px 15px;
      padding: 10px;
      height: 100px;
      font-weight: bold;
      font-size: var(--font_size_2);
      color: #333333;
    }
    span {
      font-weight: 500;
      font-size: var(--font_size_3);
      color: #666666;
    }
    .iconfont {
      position: relative;
      top: 2px;
      font-size: 18px;
    }
    .ds-result-icon {
      margin: 10px;
      position: absolute;
      bottom: 10px;
    }
    .ds-result-icon-left {
      left: 10px;
    }
    .ds-result-icon-right {
      right: 10px;
    }
  }
}
</style>

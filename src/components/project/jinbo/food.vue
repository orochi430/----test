<!-- 品美食  2022年9月19日  -->
<template>
  <div class="page-food">
    <van-search
      v-model="keywords"
      placeholder="请输入搜索关键词"
      @search="onSearch"
    />
    <img src="../../../../static/images/jinbo/food.png" alt="" class="banner" />
    <div class="menu-container">
      <van-dropdown-menu>
        <van-dropdown-item
          v-model="venue"
          title="场馆"
          :options="venues"
          @change="filterChange"
        />
        <van-dropdown-item
          v-model="floor"
          title="楼层"
          :options="floors"
          @change="filterChange"
        />
        <van-dropdown-item
          v-model="fType"
          title="美食"
          :options="fTypes"
          @change="filterChange"
        />
        <van-dropdown-item
          v-model="rank"
          title="清闲排行"
          :options="ranks"
          @change="filterChange"
        />
      </van-dropdown-menu>
    </div>
    <div class="list-container">
      <van-list
        v-model="loading"
        :finished="finished"
        :finished-text="finishedTips"
        @load="onLoad"
      >
        <div class="flex item" v-for="(item, index) in list" :key="index">
          <img
            v-lazy="
              `https://www.ciie.org/appapi/api/merchant/upload/file/name/${item.image}`
            "
            alt=""
          />
          <div style="flex: 1;width: 0;">
            <div class="flex jb as title">
              <span class="elps">{{ item.businessName }}</span>
              <span class="tag" v-if="item.lineUpTime == 0">无需排队</span>
            </div>
            <div class="sub">营业时间：{{ item.openTime }}</div>
            <div class="sub">{{ item.address }}</div>
          </div>
        </div>
      </van-list>
    </div>
    <!-- <commonempty v-if="!list.length && !loading" /> -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      keywords: "",
      venue: "",
      venues: [
        { text: "全部", value: "" },
        { text: "A馆", value: "A" },
        { text: "B馆", value: "B" },
        { text: "C馆", value: "C" },
        { text: "D馆", value: "D" },
        { text: "R馆", value: "R" }
      ],
      list: [],
      floor: "",
      floors: [
        { text: "全部", value: "" },
        { text: "一楼", value: "1" },
        { text: "二楼", value: "2" },
        { text: "三楼及以上", value: "3" }
      ],
      fType: "3",
      fTypes: [],
      rank: "0",
      ranks: [
        { text: "降序", value: "0" },
        { text: "升序", value: "1" }
      ],
      loading: false,
      finished: false,
      finishedTips: "没有更多了",
      page: 1,
      pageSize: 10
    };
  },
  methods: {
    onLoad() {
      let self = this;
      if (self.fTypes.length == 0) {
        // 需要初始化过滤选项
        self.getDataByOpts();
      } else {
        // 已有过滤选项，直接取数据
        self.getData();
      }
    },
    getDataByOpts() {
      let self = this;
      dsf.http
        .get("list")
        .done(res => {
          if (res.code == 0) {
            self.fTypes = res.data
              .find(item => item.id == "3")
              ?.children.map(item => {
                return { text: item.name, value: item.id };
              });
            if (self.fTypes.length > 0)
              self.fTypes.unshift({ text: "全部", value: "3" });
            return dsf.http.get("api/business/pageList", {
              page: self.page,
              limit: self.pageSize,
              type: self.fType,
              building: self.venue,
              floor: self.floor,
              rank: self.rank,
              keyword: self.keywords
            });
          } else {
            throw res.msg;
          }
        })
        .done(res => {
          if (res.code == 0) {
            self.page++;
            self.list = self.list.concat(res.page.list);
            if (res.page.list.length < self.pageSize) {
              self.finished = true;
            }
          } else {
            throw res.msg;
          }
        })
        .error(err => {
          self.list = null;
          console.log("food-error", err);
          dsf.layer.toast(err.message);
        })
        .always(() => {
          // 加载状态结束
          self.loading = false;
        });
    },
    getData() {
      let self = this;
      dsf.http
        .get("api/business/pageList", {
          page: self.page,
          limit: self.pageSize,
          type: self.fType,
          building: self.venue,
          floor: self.floor,
          rank: self.rank,
          keyword: self.keywords
        })
        .done(res => {
          if (res.code == 0) {
            self.page++;
            self.list = self.list.concat(res.page.list);
            if (res.page.list.length < self.pageSize) {
              self.finished = true;
            }
          } else {
            throw res.msg;
          }
        })
        .error(err => {
          self.list = null;
          console.log("food-list-error", err);
          dsf.layer.toast(err.message);
        })
        .always(() => {
          // 加载状态结束
          self.loading = false;
        });
    },
    filterChange() {
      let self = this;
      self.page = 1;
      self.list = [];
      self.loading = true;
      self.finished = false;
      self.onLoad();
    },
    onSearch(val) {
      let self = this;
      self.page = 1;
      self.list = [];
      self.loading = true;
      self.finished = false;
      self.onLoad();
    }
  }
};
</script>

<style lang="scss" scoped>
.page-food {
  background: #ffffff;
  .banner {
    padding: 10px 10px 0;
    box-sizing: border-box;
    border-radius: 5px;
  }
  .menu-container {
    // background-color: #fff;
    // box-shadow: 0px 3px 3px 0px rgba(229, 229, 229, 0.5);
    // padding: 12px 0;
    .triangle {
      width: 0px;
      height: 0px;
      border-top: 4px solid #0063ac;
      border-left: 4px solid transparent;
      border-right: 4px solid transparent;
      margin-left: 6px;
    }
    .van-dropdown-menu {
      ::v-deep .van-dropdown-menu__bar {
        justify-content: space-evenly;
        .van-dropdown-menu__item {
          flex: initial;
        }
      }
    }
  }
  .list-container {
    margin: 10px;
    background: #ffffff;
    box-shadow: 0px 1px 8px 0px rgba(194, 194, 194, 0.5);
    border-radius: 10px;
    .item {
      padding: 16px;
      position: relative;
      img {
        width: 135px;
        height: 77px;
        object-fit: contain;
        border-radius: 6px;
        margin-right: 20px;
        flex-shrink: 0;
      }
      .title {
        .tag {
          background: rgba(68, 215, 182, 0.21);
          border-radius: 3px;
          font-size: var(--font_size_4);
          color: #00a37e;
          padding: 2px;
          flex-shrink: 0;
          margin-top: -6px;
        }
      }
      .sub {
        font-size: var(--font_size_4);
        color: #666666;
        padding: 6px 0;
      }
      &:not(:first-child)::after {
        position: absolute;
        box-sizing: border-box;
        content: " ";
        pointer-events: none;
        right: 16px;
        top: 0;
        left: 16px;
        border-bottom: 1px solid #ebedf0;
      }
    }
  }
}
</style>

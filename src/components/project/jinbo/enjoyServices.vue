<!-- 享服务  2022年9月19日  -->
<template>
  <div class="page-enjoyServices">
    <van-search
      v-model="keywords"
      placeholder="请输入搜索关键词"
      @search="onSearch"
    />
    <img
      src="../../../../static/images/jinbo/server.png"
      alt=""
      class="banner"
    />
    <div class="menu-container">
      <van-dropdown-menu>
        <van-dropdown-item
          v-model="sType"
          title="服务类型"
          :options="sTypes"
          @change="filterChange"
        />
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
              `https://www.ciie.org/appapi/api/merchant/upload/file/name/${item.logo}`
            "
            alt=""
          />
          <div style="flex: 1;overflow: hidden;">
            <div class="title elps">{{ item.name }}</div>
            <div class="sub" v-if="item.location">
              <img src="../../../../static/images/jinbo/address.svg" />{{
                item.location
              }}
            </div>
            <div class="sub">
              <img src="../../../../static/images/jinbo/time.svg" />营业时间：{{
                item.openTime
              }}-{{ item.closeTime }}
            </div>
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
      sType: "",
      sTypes: [],
      venue: "",
      venues: [
        { text: "全部", value: "" },
        { text: "A馆", value: "A" },
        { text: "B馆", value: "B" },
        { text: "C馆", value: "C" },
        { text: "D馆", value: "D" },
        { text: "R馆", value: "R" }
      ],
      floor: "",
      floors: [
        { text: "全部", value: "" },
        { text: "一楼", value: "1" },
        { text: "二楼", value: "2" },
        { text: "三楼及以上", value: "3" }
      ],
      list: [],
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
      if (self.sTypes.length == 0) {
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
            self.sTypes = res.data
              .find(item => item.id == "17")
              ?.children.map(item => {
                return { text: item.name, value: item.name };
              });
            if (self.sTypes.length > 0)
              self.sTypes.unshift({ text: "全部", value: "" });
            return dsf.http.get("api/merchant/list", {
              page: self.page,
              limit: self.pageSize,
              building: self.venue,
              floor: self.floor,
              type: self.sType,
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
          console.log("enjoyServices-error", err);
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
        .get("api/merchant/list", {
          page: self.page,
          limit: self.pageSize,
          building: self.venue,
          floor: self.floor,
          type: self.sType,
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
          console.log("enjoyServices-list-error", err);
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
.page-enjoyServices {
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
  }
  .list-container {
    margin: 10px;
    background: #ffffff;
    box-shadow: 0px 1px 8px 0px rgba(194, 194, 194, 0.5);
    border-radius: 10px;
    .item {
      padding: 16px;
      position: relative;
      > img {
        width: 77px;
        height: 77px;
        object-fit: contain;
        border-radius: 6px;
        margin-right: 20px;
        flex-shrink: 0;
        border: 1px solid #ddd;
      }
      .title {
        padding-bottom: 6px;
      }
      .sub {
        font-size: var(--font_size_4);
        color: #666666;
        padding-top: 8px;
        img {
          width: auto;
          height: 12px;
          object-fit: contain;
          display: inline-block;
          margin-right: 6px;
          vertical-align: text-top;
        }
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

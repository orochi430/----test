<!-- 追新闻  2022年9月19日  -->
<template>
  <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
    <van-search
      v-model="keywords"
      placeholder="请输入搜索关键词"
      @search="onSearch"
    />
    <div class="news-container">
      <van-list
        v-model="loading"
        :finished="finished"
        :finished-text="finishedTips"
        @load="onLoad"
      >
        <template v-if="list.length > 0">
          <div
            class="news-item"
            v-for="(item, index) in list"
            @click="go(item)"
          >
            <div class="flex jb as main">
              <div class="title clamp">{{ item.title }}</div>
              <img v-if="item.image" v-lazy="item.image" alt="" />
            </div>
            <div class="flex jb sub">
              <div>来源：{{ item.origin }}</div>
              <div>发布时间：{{ item.time | dateFormat }}</div>
            </div>
          </div>
        </template>
      </van-list>
    </div>
    <!-- <commonempty v-if="!list.length && !loading" /> -->
  </van-pull-refresh>
</template>

<script>
export default {
  filters: {
    //时间格式化
    dateFormat: function(val) {
      if (!val) return "";
      return dsf.date.format(val, "yyyy-mm-dd");
    }
  },
  data() {
    return {
      keywords: "",
      loading: false,
      finished: false,
      refreshing: false,
      finishedTips: "没有更多了",
      page: 1,
      pageSize: 10,
      list: []
    };
  },
  methods: {
    onLoad() {
      let self = this;
      if (self.refreshing) {
        self.list = [];
        self.page = 1;
        self.refreshing = false;
      }
      dsf.http
        .get("api/app/yidian_news", {
          page: self.page,
          limit: self.pageSize,
          keyword: self.keywords
        })
        .done(res => {
          if (res.code == 0) {
            self.page++;
            self.list = self.list.concat(res.data.news);
            if (res.data.news.length < self.pageSize) {
              self.finished = true;
            }
          } else {
            dsf.layer.toast(res.msg);
          }
        })
        .error(error => {
          self.list = null;
          console.log("yidian_news-error", error);
        })
        .always(() => {
          // dsf.layer.closeLoading(self.loading);
          // 加载状态结束
          self.loading = false;
        });
    },
    onRefresh() {
      let self = this;
      // 清空列表数据
      self.finished = false;
      // 重新加载数据
      // 将 loading 设置为 true，表示处于加载状态
      self.loading = true;
      self.keywords = "";
      self.onLoad();
    },
    go(item) {
      let self = this;
      self.$router.push(`/jinboNewsDetail/${item.id}`);
      // self.$router.push({
      //   name: "dsfIframe",
      //   params: {
      //     url: item.url
      //   }
      // });
    },
    onSearch(val) {
      let self = this;
      self.page = 1;
      self.list = [];
      self.loading = true;
      self.onLoad();
    }
  }
};
</script>

<style lang="scss" scoped>
.news-container {
  margin: 10px;
  background: #ffffff;
  box-shadow: 0px 2px 8px 0px rgba(194, 194, 194, 0.5);
  border-radius: 10px;
  .news-item {
    padding: 15px;
    position: relative;
    .main {
      padding-bottom: 10px;
      .title {
        font-size: 15px;
        color: #333333;
        line-height: 24px;
      }
      img {
        width: 130px;
        height: 73px;
        object-fit: contain;
        border-radius: 6px;
        margin-left: 20px;
        flex-shrink: 0;
      }
    }
    .sub {
      font-size: var(--font_size_4);
      color: #666;
      line-height: 18px;
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
</style>

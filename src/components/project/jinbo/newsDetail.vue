<!-- 新闻详情页  2022年9月19日  -->
<template>
  <div class="detail" v-if="news">
    <div class="title">{{ news.title }}</div>
    <div class="flex jb sub">
      <span>{{ news.origin }}</span>
      <span>{{ news.releaseDate }}</span>
    </div>
    <!-- <img v-if="news.image" :src="news.image" alt="" style="padding-bottom: 0.2rem"> -->
    <div class="content" v-html="news.content"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loading: null,
      id: this.$route.params.id,
      news: null
    };
  },
  methods: {
    init() {
      let self = this;
      self.loading = dsf.layer.loading();
      dsf.http
        .get("api/cms/content", {
          id: self.id
        })
        .done(res => {
          if (res.code == 0) {
            self.news = res.data;
          } else {
            dsf.layer.toast(res.msg);
          }
        })
        .error(error => {
          self.list = null;
          console.log("content-error", error);
        })
        .always(() => {
          dsf.layer.closeLoading(self.loading);
        });
    }
  },
  created() {
    let self = this;
    self.init();
  }
};
</script>

<style lang="scss" scoped>
.detail {
  margin: 10px;
  background: #ffffff;
  box-shadow: 0px 2px 8px 0px rgba(194, 194, 194, 0.5);
  border-radius: 10px;
  padding: 15px;
  .title {
    font-size: var(--font_size_1);
    font-weight: 500;
  }
  .sub {
    font-size: var(--font_size_4);
    padding: 10px 0 20px;
    color: #666;
  }
  .content {
    ::v-deep img {
      width: auto !important;
      display: block;
    }
    ::v-deep p {
      line-height: 200%;
    }
  }
}
</style>

<template>
  <div ref="newsdetail">
    <van-nav-bar title="新闻详情" v-if="$route.query.showHeader == 1" left-text="返回" left-arrow @click-left="$router.go(-1)"
      fixed placeholder></van-nav-bar>
    <div class="detail">
      <div class="title" v-html="news.title"></div>
      <div class="time">
        <span>作者：{{ news.publisher }}</span>
        <span>发布日期：{{ news.time }}</span>
        <span v-if="news.viewsCount">浏览：{{ news.viewsCount }}</span>
      </div>
      <div class="content" v-html="news.content" :style="{ fontSize: fontSize + 'rem' }"></div>
      <div class="fujian">相关附件({{ counts }})</div>
      <div class="file" v-for="file in news.files" :key="file.id">
        <img src="@/assets/imgs/attacIcon.png" alt="" />
        <span @click="goForm(file.moduleId,file.fileId,file.nodeId,file.fileName,file.flowId)">{{ file.fileName }}</span>
      </div>
      <div class="file" v-for="file in news.images" :key="file.id">
        <img src="@/assets/imgs/attacIcon.png" alt="" />
        <span @click="goForm(file.moduleId,file.fileId,file.nodeId,file.fileName,file.flowIdm)">{{ file.fileName }}</span>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  components: {},
  data() {
    return {
      fontSize: 0.32,
      loading: null,
      news: {
        title: null,
        time: null,
        viewsCount: null,
        image: null,
        content: null,
        publisher: null,
        files: null,
        images: null,
      },
      counts: 0,
      imgPreview: false,
      previewImg: []
    };
  },
  created() {
    this.getNewsDetail();
  },
  mounted() {
    let self = this;
    let store = {
      scale: 1,
    };
    let detailEl = this.$refs.newsdetail;
    detailEl.addEventListener("touchstart", function (event) {
      let touches = event.touches;
      let events = touches[0];
      let events2 = touches[1];

      // 第一个触摸点的坐标
      store.pageX = events.pageX;
      store.pageY = events.pageY;

      store.moveable = true;

      if (events2) {
        event.preventDefault();
        store.pageX2 = events2.pageX;
        store.pageY2 = events2.pageY;
      }

      store.originScale = store.scale || 1;
    });
    detailEl.addEventListener("touchmove", function (event) {
      if (!store.moveable) {
        return;
      }

      let touches = event.touches;
      let events = touches[0];
      let events2 = touches[1];
      // 双指移动
      if (events2) {
        event.preventDefault();
        // 第2个指头坐标在touchmove时候获取
        if (!store.pageX2) {
          store.pageX2 = events2.pageX;
        }
        if (!store.pageY2) {
          store.pageY2 = events2.pageY;
        }

        // 获取坐标之间的举例
        let getDistance = function (start, stop) {
          return Math.hypot(stop.x - start.x, stop.y - start.y);
        };
        // 双指缩放比例计算
        let zoom =
          getDistance(
            {
              x: events.pageX,
              y: events.pageY,
            },
            {
              x: events2.pageX,
              y: events2.pageY,
            }
          ) /
          getDistance(
            {
              x: store.pageX,
              y: store.pageY,
            },
            {
              x: store.pageX2,
              y: store.pageY2,
            }
          );
        // 应用在元素上的缩放比例
        let newScale = store.originScale * zoom;
        // 最大缩放比例限制
        if (newScale > 2) {
          newScale = 2;
        }
        // 记住使用的缩放值
        store.scale = newScale;
        // 字体缩放
        self.fontSize = 0.32 * newScale;
      }
    });

    detailEl.addEventListener("touchend", function () {
      store.moveable = false;

      delete store.pageX2;
      delete store.pageY2;
    });
    detailEl.addEventListener("touchcancel", function () {
      store.moveable = false;

      delete store.pageX2;
      delete store.pageY2;
    });
  },
  methods: {
    getNewsDetail() {
      let loading = dsf.layer.loading();
      dsf.http
        .post(`fn/mobileSwdc/newsDetail`, {
          infoId: this.$route.query.infoId,
          key: this.$route.query.key ? this.$route.query.key : ""
        })
        .then((res) => {
          console.log(res);
          if (res.data.code == 200) {
            this.news = res.data.data;
            let fileNumber = 0
            fileNumber = res.data.data?.images?.length ? res.data.data?.images?.length : 0
            fileNumber += res.data.data?.files?.length ? res.data.data?.files?.length : 0
            this.counts = fileNumber
          }
          dsf.layer.closeLoading(loading);
          this.$nextTick(() => {
            let detailEl = this.$el.querySelector(".content");
            let pEls = this.$el.querySelectorAll(".content p");
            for (let i = 0; i < pEls.length; i++) {
              if (pEls[i].style.textAlign == "center") {
                pEls[i].style.textIndent = 0;
              }
            }
          });
        })
        .error((error) => {
          dsf.layer.toast("数据获取失败！");
        });
    },
    goForm(moduleId, fileId, nodeId, fileName, flowId) {
      console.log(111);
      let url = dsf.url.getServerUrl(
        `fn/office/openMobileOffice?fileId=${fileId}&moduleId=${moduleId}&nodeId=${nodeId}&flowId=${flowId}&x-auth-token=${dsf.util.loadSessionStore("loginToken")}`
      );
      this.$router.push({
        name: "dsfIframe",
        params: {
          url,
          title: fileName
        },query: {
          url,
          title: fileName
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
@import "src/assets/styles/themes.scss";
@import "src/assets/styles/mixin.scss";

.detail {
  min-height: 100%;
  background-color: #fff;
  padding: 20px;

  .title {
    font-size: 18px;
    font-weight: bold;
    text-align: center;

    >>>img {
      display: inline-block;
      height: auto;
      width: auto;
    }
  }

  .time {
    display: flex;
    justify-content: space-between;
    padding: 10px 0;
    color: #999;
    flex-wrap: wrap;
    border-bottom: #ccc 1px dashed;
    margin-bottom: 0.4rem;

    span {
      display: block;
      flex-shrink: 0;
      width: 150px;
      font-size: var(--font_size_3);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }

  .content {
    ::v-deep img {
      width: auto !important;
      display: inline-block;
    }

    ::v-deep video {
      max-width: 100% !important;
      height: auto;
      display: inline-block;
    }
  }

  .fujian {
    font-weight: 600;
    border-top: #ccc 1px dashed;
    margin: 20px 0px 10px 0px;
    padding-top: 15px;
  }

  .file {
    height: 30px;

    img {
      float: left;
      width: 10px;
      height: 10px;
      margin-top: 10px;
    }

    span {
      display: block;
      width: 300px;
      float: left;
      background: transparent;
      text-decoration: none;
      line-height: 30px;
      color: #333;
      margin-left: 15px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
}
</style>

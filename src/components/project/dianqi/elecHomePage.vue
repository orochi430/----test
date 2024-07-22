<template>
  <div class="elecPage">
    <div class="elecContent">
      <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
        <van-list class="elecNews" v-model="loading" :finished="finished" :immediate-check="false" finished-text="没有更多了"
          @load="onLoad">
          <van-cell v-for="item in news" :key="item.id" value="" @click="goNewsDetail(item)">
            <div class="newsItem">
              <van-row type="flex">
                <van-col :span="item.leftWidth">
                  <div class="leftNews">
                    <div class="newsTitle">
                      <span class="newsTop" v-if="item.isTop == 1">置顶</span>
                      <span>
                        {{ item.title }}
                      </span>
                    </div>
                    <div class="releaseInfo">
                      <span>{{ item.newsType }}</span>
                      <span>{{ item.time }}</span>
                    </div>
                  </div>
                </van-col>
                <van-col span="8" v-if="item.image">
                  <van-image width="120" height="85" :src=item.image />
                </van-col>
              </van-row>
            </div>
            <van-divider :style="{ borderColor: 'rgb(193 196 198)', margin: 0 }">
            </van-divider>
          </van-cell>
        </van-list>
      </van-pull-refresh>
      <van-image-preview v-model="imgPreview" :images="previewImg" closeable></van-image-preview>
    </div>
  </div>
</template>

<script>

export default {
  name: "elecHomePage",
  data() {
    return {
      news: [],
      loading: false,
      finished: false,
      mainConfig: { data: dsf.config.commonTabs },
      refreshing: false,
      currentPage: 1,
      totalNum: 0,
      imgPreview: false,
      previewImg: [],
    };
  },
  created() {
    this.loadingNews();
  },
  props: {
    clickTabIndex: {
      type: Number,
      default: () => {
        return 0;
      },
    },
    tabParams: {
      type: Object,
      default: () => {
        return {};
      },
    },
    currentTabs: {
      type: Number,
      default: () => {
        return 0;
      },
    }
  },
  watch: {

  },
  computed: {},
  mounted() {
    // let tabsEle = document.querySelector("#common-tabs");
    // tabsEle.scrollIntoView({ behavior: "smooth", block: "start" });
  },
  methods: {
    loadingNews() {
      let url = this.tabParams.url.split('?')[0];
      let paramVal = {
        page: this.currentPage,
        newsType: this.tabParams.params.newsType,
        limit: this.tabParams.params.limit
      };
      dsf.http.post(url, paramVal).then((res) => {
        let data = res.data.data.data;
        this.totalNum = res.data.data.total;
        if (res.data.code == 200) {
          if (data.length == 0) {
            this.finished = true;
          }
          else {
            if (this.news.length < res.data.data.total) {
              for (let i = 0; i < data.length; i++) {
                //新闻没有图片时 文字占满一整格
                data[i].leftWidth = 16
                if (data[i].image == '') {
                  data[i].leftWidth = 24
                }
                this.news.push(data[i])
              }
            }
          }
        }
      })
    },
    goNewsDetail(val) {
      //若有第三方链接 则跳转
      if (val.useExternalURL == 1) {
        this.$router.push({
          name: "dsfIframe",
          query: {
            url: val.externalURL,
            title: val.title
          },
        });
      }
      else {
        //无正文内容 则直接打开第一个附件
        dsf.http
          .post('/fn/newscontent/detail', {
            id: val.id,
          })
          .then((res) => {
            if (res.data.code == 200) {
              if (res.data.data.content == "") {
                this.filePre(res.data.data.attachFile[0])
              }
              else {
                this.$router.push({
                  name: 'elecDetail',
                  query: { id: val.id },
                  params: {
                    data: res.data.data,
                  }
                })
              }
            }

          })
          .error((error) => {
            dsf.layer.toast("无相关附件！");
          });
      }

    },
    onLoad() {
      setTimeout(() => {
        //未完全加载完数据时执行
        if (this.totalNum > this.news.length) {
          this.currentPage++;
          this.loadingNews();
          // 加载状态结束
          this.loading = false;
          this.refreshing = false;
        }
        else
          this.finished = true;
      }, 1000)
    },
    onRefresh() {
      this.loading = true;
      this.finished = false
      this.currentPage = 0;
      this.refreshing = false;
      this.news = [];
      this.onLoad();
    },
    filePre(file) {
      let paramVal = {
        fileId: file.fileId,
        moduleId: '220803111621B521Wfaj0JHZLp0lbpU',
        fileName: file.fileName,
        flowId: 0,
        nodeId: -1,
        screenWidth: 375,
        "x-auth-token": dsf.util.loadSessionStore("loginToken"),
        addLoading: 1
      }

      const index = file.fileName.lastIndexOf(".");
      const suffix = file.fileName.substr(index + 1);
      const toLowerSuffix = suffix.toLowerCase();
      let imgArr = ["png", "jpg", "jpeg", "bmp", "gif"];
      if (imgArr.indexOf(toLowerSuffix) > -1) {
        this.imgPreview = true;
        let imgUrl = dsf.url.getWebPath(`ctrl/file/download?infoId=${file.infoId}&fileId=${file.fileId}&fileName=${file.fileName}`)
        this.previewImg = [imgUrl];
        console.log(imgUrl);
      }
      else {
        dsf.http.post('/fn/office/openMobileOffice', paramVal).then(res => {
          if (res.data.code == 200) {
            this.$router.push({
              name: "dsfIframe",
              query: {
                url: res.data.message,
                title: file.fileName
              },
            });

          }
        })
          .error((error) => {
            dsf.layer.toast("文件预览失败！");
          });
      }

    },
  },
};
</script>

<style lang="scss" scoped>
.newsItem {
  margin-bottom: 4px;

  .newsTitle {
    font-size: var(--font_size_2);
    margin-bottom: 10px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    line-height: 25px;

    .newsTop {
      display: inline;
      color: white;
      background-color: #b50009;
      padding: 0 2px;
      font-size: 15px;
    }
  }

  ::v-deep .van-image__img {
    border-radius: 10px;
    -moz-border-radius: 10px;
    -webkit-border-radius: 10px
  }

  .leftNews {
    padding-bottom: 19px;
    padding-right: 8px;
  }

  .releaseInfo {
    position: absolute;
    bottom: 6px;

    span {
      color: #999;
    }
  }
}

.elecPage {
  // min-height: calc(100vh - 2.16rem);
}
</style>

<template>
  <div class="DY-tabs">
    <div class="card">
      <div class="top">
        <div v-for="(item, index) in tabList" :key="index" class="tags">
          <van-badge v-if="true" :content="item.badge" max="99">
            <span :class="{ title: index == active }" @click="handelToogel(index)">{{ item.tagTitle }}</span>
          </van-badge>
          <span v-else :class="{ title: index == active }" @click="handelToogel(index)">{{ item.tagTitle }}</span>
        </div>
        <span class="more" @click="goRoute()">更多</span>
      </div>
      <div class="showList" v-for="(cells, index) in tabList" :key="index" v-show="active == index" :style="minHeight">
        <!-- <van-cell
          v-for="(item, index) in cells.data"
          :key="index"
          :title="item[cells.showItem.title]"
          :value="item[cells.showItem.date]"
          :style="item[cells.showItem.isRead] == 1 ? '' : 'font-weight: bold;'"
          @click="goForm(cells.link, item)"
        >
        </van-cell> -->
        <div v-for="(item, index) in cells.data" :key="index" class="content"
          :style="item[cells.showItem.isRead] == 1 ? '' : 'font-weight: bold;'">
          <div class="titleCon" @click="goForm(cells.link, item)">{{ item[cells.showItem.title] }}</div>
          <i v-if="cells.tagName=='zdgz' && item.videoId" @click="playVideo(item)" class="playVideo iconfont iconarrow-right-drop-circle-outline"></i>
          <div class="value">{{ item[cells.showItem.date] }}</div>
        </div>

      </div>
    </div>
    <van-popup :style="{ height: '100%' }" v-model="video.showVideo" :close-on-click-overlay="false" lock-scroll
            position="bottom" get-container="#app">
            <div v-if="video.showVideo">
                <VPlayer :video="video"></VPlayer>
            </div>
    </van-popup>
  </div>
</template>
<script>
// import VPlayer from "@/components/common/VideoPlayer";
export default {
  name: "DYTabsComponents",
  components: {
    'VPlayer': () => import('@/components/common/VideoPlayer'),
  },
  data() {
    return {
      active: 0,
      tabList: [],
      video: {
        showVideo: false,
        videoTitle: ""
      }
    };
  },
  created() {
    this.tabList = dsf.config.DYnews.tabList;
    this.tabList.forEach((item) => {
      dsf.http.post(item.tabUrl).then((res) => {
        if (item.tagName == "zdgz") {
          let dataArr = []
          res.data.datas.forEach(el => {
            dataArr.push({
              title: el.dataValue.bt,
              time: el.dataValue.createTime,
              moduleId: el.dataValue.moduleId,
              id: el.dataValue.id,
              isGoForm: true,
              videoId: el.dataValue.videoId,
              videoName: el.dataValue.videoName,
              fileId:el.dataValue.fileId,
              filename:el.dataValue.filename
            })
          })
          this.$set(item, "data", dataArr);
        } else {
          this.$set(item, "data", res.data.data);
        }
      });
    });
    this.tabList.forEach((item) => {
      dsf.http.get(item.badgeUrl, {}).then((res) => {
        let total = res.data.data.total || res.data.data.badge || res.data.data.data;
        this.$set(item, "badge", total);
      });
    });
    console.log(this.tabList,'***');
  },
  computed: {
    minHeight() {
      let h = (this.rows = dsf.config.DYnews.showRows * 32);
      return `min-height:${h}px`;
    },
  },
  methods: {
    handelToogel(index) {
      this.active = index;
    },
    goRoute() {
      let url = this.tabList[this.active].moreLink;
      let title = this.tabList[this.active].tagTitle;
      if (url.length) {
        if (url.indexOf("https") == 0 || url.indexOf("http") == 0) {
          this.$router.push({
            name: "dsfIframe",
            params: {
              url: url,
              title: title,
            },
            query: {
              url: url,
              title: title,
            },
          });
        } else {
          this.$router.push(url);
        }
      } else {
        dsf.layer.toast("当前暂无更多");
      }
    },
    goForm(link, item) {
      let url = dsf.url.getWebPath(`fn/office/openMobileOffice?fileId=${item.fileId}&moduleId=${item.moduleId}&fileName=${item.filename}&nodeId=-2&flowId=0&x-auth-token=${dsf.util.loadSessionStore("loginToken")}&screenWidth=375`)
      if (item.isGoForm) {
        this.$router.push({
       // path: `${link}${item.moduleId}/${item.id}`
          path: "/iframe",
          query: {url}
        })
      } else {
        this.$router.push(dsf.util.getReplaceUrl(link, item));
      }
    },
    playVideo(item) {
      let src = `/fn/mobileFileDownload/download?fileId=${item.videoId}&moduleId=221121215732cNadSQlJjcjm2TliXBR&fileName=${item.videoName}`
      this.video.src = dsf.url.getWebPath(src)
      this.video.showVideo = true
      this.video.videoTitle = item.videoName
    }
  },
};
</script>
<style lang="scss" scoped>
.DY-tabs {
  .card {
    padding: 15px;
    margin: 10px 10px 0;
    background: #fff;
    border: 1px solid rgba(223, 223, 223, 1);
    box-shadow: 0px 2px 16px 0px rgba(218, 218, 218, 0.5);
    border-radius: 5px;

    .top {
      height: 24px;
      box-sizing: border-box;
      position: relative;
      line-height: 24px;
      margin-bottom: 0.1rem;

      .tags {
        height: 19px;
        float: left;
        font-size: var(--font_size_1);
        color: #94959e;
        border-left: 2px solid #94959e;

        span {
          line-height: 19px;
          padding: 0 0.1rem 0 0.1rem;
        }

        .title {
          color: #333;
          font-weight: bold;
        }
      }

      .tags:first-child {
        border-left: 5px solid #b50009;
        padding-left: 0;
      }

      .more {
        display: block;
        float: right;
        font-size: var(--font_size_4);
        color: rgb(102, 102, 102);
      }
    }

    .showList {
      .content {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 6px 0px 6px 15px;
        font-size: 0.3rem;

        .titleCon {
          width: 180px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .playVideo {
          font-size: 19px;
        }
      }
    }
  }
}
</style>

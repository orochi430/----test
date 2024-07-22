<template>
<div class="news-container">
  <van-tabs v-model="activeName" sticky :offset-top="$store.state.isShowAppHeader ? '0.92rem' : '0px'" @rendered="load" swipeable :ellipsis="false" :swipe-threshold="6">
    <van-tab v-for="tab in tabs" :key="tab.type" :title="tab.title" :name="tab.type">
      <van-swipe v-if="tab.lbType && tab.images.length > 0" :autoplay="3000" class="my-swipe" indicator-color="white">
        <van-swipe-item v-for="(item,index) in tab.images" :key="index" @click="link(item)">
          <van-image :src="item.image" fit="cover" style="width: 100%;height: 100%;">
            <template v-slot:loading>
              <van-loading type="spinner" size="20" />
            </template>
          </van-image>
          <div class="imgTitle"><span class="clamp" v-html="item.title"></span></div>
        </van-swipe-item>
      </van-swipe>
      <module-item :title="tab.subTitle || tab.title" @rightClick="rclick(tab.type)">
        <template slot="default">
          <!-- <van-loading v-if="!tab.list.length" size="24px" vertical style="padding: 0.32rem">加载中...</van-loading> -->
          <news-Item v-for="item in tab.list" :key="item.id" :news="item"></news-Item>
        </template>
      </module-item>
    </van-tab>
  </van-tabs>
</div>
</template>

<script>
import moduleItem from './components/moduleItem'
import newsItem from './components/newsItem'

export default {
  components: {moduleItem, newsItem},
  data() {
    return {
      activeName: '',
      // sy_swipeImages: [],
      // hy_swipeImages: [],
      // ymbd_swipeImages: [],
      // zhxw_swipeImages: [],
      // sy_list: [],
      // hy_list: [],
      // ymbd_list: [],
      // zhxw_list: [],
      tabs: [],
    }
  },
  created() {
    this.getColumn()
  },
  methods: {
    getColumn() {
      dsf.http.get(`${dsf.config.cmsUrl}ctrl/mobileInternet/getColumn`).then(res => {
        if(res.data.code == 200) {
          this.tabs = res.data.data
          this.tabs.forEach(tab => {
            this.$set(tab, 'list', [])
            this.$set(tab, 'images', [])
          })
        } else {
          dsf.layer.toast(res.data.message)
        }
      })
    },
    async load(name) {
      let tab = this.tabs.find(t => t.type == name)
      let tabInfoIds = ''
      // 轮播图
      if (tab.lbType) {
        await dsf.http.post(`${dsf.config.cmsUrl}ctrl/mobileInternet/getCarousel`, {
          newsType: tab.lbType
        }).then(res => {
          if(res.data.code == 200) {
            tab.images = res.data.data
            tabInfoIds = res.data.data.map(item => item.id).join(',')
          }
        }).error(error => {
            // dsf.layer.toast("数据获取失败！");
        })
      }
      // 列表
      dsf.http.post(`${dsf.config.cmsUrl}ctrl/mobileInternet/list`, {
        type: tab.type,
        page: 1,
        limit: 12,
        isShowImage: tab.isShowImage,
        infoIds: tabInfoIds
      }).then(res => {
        if(res.data.code == 200) {
          tab.list = res.data.data
        }
      }).error(error => {
        // dsf.layer.toast("数据获取失败！");
      })
    },
    rclick(type){
      this.$router.push({
        path: '/SDYCNewsList',
        query: {
          type: type,
          showHeader: this.$route.query.showHeader
        }
      })
    },
    link(item) {
      this.$router.push({
        path: '/SDYCNewsDetail',
        query: {
          id: item.id,
          type: item.type,
          time: item.time,
          showHeader: this.$route.query.showHeader
        }
      })
    }
  }
}
</script>
<style lang='scss' scoped>
@import "@/assets/styles/themes.scss";
@import "@/assets/styles/mixin.scss";
.news-container {
  ::v-deep .van-tabs__content {
    min-height: calc(100vh - 114px)
  }
  ::v-deep .van-tabs__nav {
    @include background-theme('normal');
    .van-tab--active {
      color: #fff !important;
    }
    .van-tab {
      color: rgba(255,255,255,0.7);
    }
    .van-tabs__line {
      background-color: #fff !important;
    }
  }
}
.my-swipe {
  color: #fff;
  // width: 6.9rem;
  height: 4.6rem;
  font-size: var(--font_size_0);
  line-height: 150px;
  text-align: center;
  background-color: #fff;
  // border-radius: 5px;
  margin-top: 0.2rem;
  ::v-deep .van-swipe__indicators {
    bottom: 0.1rem;
  }
  .imgTitle {
    position: absolute;
    bottom: 0;
    background-color: rgba(0,0,0,0.4);
    padding: 10px;
    width: 100%;
    font-size: var(--font_size_3);
    text-align: left;
    >>> img {
        display: inline-block;
        height: auto;
        width: auto;
    }
  }
}
</style>

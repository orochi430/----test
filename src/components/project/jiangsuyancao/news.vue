<template>
<div>
  <van-tabs v-model="activeName" sticky :offset-top="$store.state.isShowAppHeader ? '0.92rem' : '0px'" @rendered="load" @change="getCurrentTab" swipeable>
    <van-tab v-for="tab in tabs" :key="tab.type" :title="tab.title" :name="tab.title">
      <van-swipe v-if="tab.lbType" :autoplay="3000" class="my-swipe" indicator-color="white">
        <van-swipe-item v-for="(item,index) in tab.images" :key="index" @click="link(item)">
          <img :src="item.image" style="objectFit: cover">
          <div class="imgTitle"><span class="clamp" v-html="item.title"></span></div>
        </van-swipe-item>
      </van-swipe>
      <module-item :title="tab.subTitles" @tabClick="getList" @rightClick="rclick">
        <template slot="default">
          <van-list
            v-model="loading"
            :finished="finished"
          >
            <template v-if="tab.list.length > 0">
              <news-Item v-for="item in tab.list" :key="item.id" :news="item"></news-Item>
            </template>
          </van-list>
        </template>
      </module-item>
    </van-tab>
    <!-- <van-tab title="苏烟要闻" name="sy">
      <van-swipe :autoplay="3000" class="my-swipe" indicator-color="white">
        <van-swipe-item v-for="(item,index) in sy_swipeImages" :key="index" @click="link(item)">
          <img :src="item.image" style="objectFit: cover">
          <div class="imgTitle"><span class="clamp">{{item.title}}</span></div>
        </van-swipe-item>
      </van-swipe>
      <module-item title="苏烟要闻" @rightClick="rclick('sy')">
        <template slot="default">
          <van-loading v-if="!sy_list.length" size="24px" vertical style="padding: 0.32rem">加载中...</van-loading>
          <news-Item v-for="item in sy_list" :key="item.id" :news="item"></news-Item>
        </template>
      </module-item>
    </van-tab>
    <van-tab title="行业资讯" name="hy">
      <van-swipe :autoplay="3000" class="my-swipe" indicator-color="white">
        <van-swipe-item v-for="(item,index) in hy_swipeImages" :key="index" @click="link(item)">
          <img :src="item.image" style="objectFit: cover">
          <div class="imgTitle"><span class="clamp">{{item.title}}</span></div>
        </van-swipe-item>
      </van-swipe>
      <module-item title="行业资讯" @rightClick="rclick('hy')">
        <template slot="default">
          <van-loading v-if="!hy_list.length" size="24px" vertical style="padding: 0.32rem">加载中...</van-loading>
          <news-Item v-for="item in hy_list" :key="item.id" :news="item"></news-Item>
        </template>
      </module-item>
    </van-tab>
    <van-tab title="综合新闻" name="zhxw">
      <module-item title="综合新闻" @rightClick="rclick('zhxw')">
        <template slot="default">
          <van-loading v-if="!zhxw_list.length" size="24px" vertical style="padding: 0.32rem">加载中...</van-loading>
          <news-Item v-for="item in zhxw_list" :key="item.id" :news="item"></news-Item>
        </template>
      </module-item>
    </van-tab> -->
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
      currentTab: {},
      loading: false,
      finished: false,
    }
  },
  created() {
    this.getColumn()
  },
  methods: {
    getColumn() {
      dsf.http.get('fn/news/getColumn').then(res => {
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
    load(name) {
      let tab = this.tabs.find(t => t.title == name)
      // 轮播图
      if (tab.lbType) {
        dsf.http.post('fn/news/getcarousel', {
          newsType: tab.lbType
        }).then(res => {
          if(res.data.code == 200) {
            tab.images = res.data.data
          }
        }).error(error => {
            // dsf.layer.toast("数据获取失败！");
        })
      }
      this.currentTab = tab
      // 列表
      this.getList()
    },
    getCurrentTab(name) {
      this.currentTab = this.tabs.find(t => t.title == name)
    },
    getList(type) {
      this.currentTab.list = []
      this.loading = false
      this.finished = false
      dsf.http.post('fn/news/list', {
        type: type || this.currentTab.subTitles[this.currentTab.subTitles.length - 1].type,
        page: 1,
        limit: 12
      }).then(res => {
        if(res.data.code == 200) {
          this.currentTab.list = res.data.data
        } else {
          this.currentTab.list = []
        }
        this.finished = true
      }).error(error => {
        // dsf.layer.toast("数据获取失败！");
      })
    },
    rclick(type){
      this.$router.push({
        path: '/jiangsuyancaoNewsList',
        query: {
          type: type,
          showHeader: this.$route.query.showHeader
        }
      })
    },
    link(item) {
      this.$router.push({
        path: '/jiangsuyancaoNewsDetail',
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
.my-swipe {
  color: #fff;
  width: 6.9rem;
  height: 4.6rem;
  font-size: var(--font_size_0);
  line-height: 150px;
  text-align: center;
  background-color: #fff;
  border-radius: 5px;
  margin: 0.32rem auto;
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
    box-sizing: border-box;
  }
}
</style>

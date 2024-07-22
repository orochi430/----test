<template>
  <div class="news">
    <div class="topTab">中国电气装备</div>
    <div class="search-wrap">
      <router-link to="/commonList/230313162526hUNhyRQmhkVwxfD4zNk/220803111621B521Wfaj0JHZLp0lbpU" class="search">
        <i class="iconfont iconsousuo i1"></i>
        <span>请输入关键词</span>
      </router-link>
    </div>
    <div :style="{height:height}">
      <app-swiper :swiper="appSwiper" ref="divSwiper"></app-swiper>
    </div>
    <!-- <div style="height: 200px" ref="divSwiper"></div> -->
    <div class="newsTab" >
      <CommonTabs value="elec" tabKey="elec" ref="commonTabs" :tabOppsetTop="tabOppsetTop" ></CommonTabs>
    </div>

  </div>
</template>
<script>
import CommonTabs from '../../common/commonTabs.vue';
import AppSwiper from '../../documentCenter/appSwiper.vue';
export default {
  components: {
    CommonTabs,
    AppSwiper
  },
  data() {
    return {
      "appSwiper": {
        "isShow": true,
        "autoplay": 3000,
        "isPercent": true,
        "height": 30,
        "percent": "390:200",
        "hasPadding": false,
        "imgUrls": [
          "https://n.sinaimg.cn/gongyi/transform/116/w550h366/20210607/4994-kracxer0817763.jpg",
          "./static/images/bg-mine.png",
          "./static/images/bg-mine.png"
        ],
        "url": "/fn/mobilecarousel/getcarousel?lbkz=V002",
      },
      tabOppsetTop: 0,
      height:""
    }
  },
  created() {
    if (this.appSwiper.percent) {
      this.height = document.documentElement.clientWidth / this.appSwiper.percent.split(":")[0] * this.appSwiper.percent.split(":")[1] + 'px'
    } else {
      this.height = this.appSwiper.height ? `${this.appSwiper.height}${this.appSwiper.isPercent ? 'vh' : 'px'}` : this.height
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.tabOppsetTop = document.getElementsByClassName("topTab")[0].clientHeight + document.getElementsByClassName("search-wrap")[0].clientHeight + Number(this.$refs.divSwiper.height.slice(0, -2));
    })
  },

}
</script>
<style scoped lang="scss">
.news {
  display: flex;
  flex-direction: column;
  height: calc(100vh - 1.2rem);
}

.topTab {
  font-size: 18px;
  padding: 10px 0 0 0;
  height: 40px;
  text-align: center;
  font-weight: bold;
}

.newsTab {
  flex: 1;
  height: 0;
  overflow: auto;
}

.search-wrap {
  width: 100%;
  padding: 15px;
  box-sizing: border-box;
  background-color: #fff;
  z-index: 500;

  .search {
    height: 28px;
    width: 100%;
    display: block;
    background: #ecedee;
    border-radius: 7px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding: 0 5px;
    box-sizing: border-box;
    color: #666;
    // @include font_6;

    .i1,
    .i2 {
      flex-basis: 20px;
    }

    span {
      display: block;
      flex-basis: calc(100% - 60px);
    }
  }
}
</style>
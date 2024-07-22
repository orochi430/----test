<template>
<div class="news" @click="link">
  <!-- <img :src="news.image" alt="新闻图片" v-if="news.image"> -->
  <div class="info">
    <div class="title">{{news.title}}</div>
    <div class="time" v-if="news.time">{{news.time}}</div>
  </div>
</div>
</template>

<script>
export default {
  props: {
    news: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {

    }
  },
  methods: {
    link() {
      if (this.news.type == 'ymbd') {
        if(window.wx) {
          wx.invoke('openUrl', {
            "type": 0, //0或不填表示使用内部浏览器新窗口打开，1表示用系统浏览器打开
            "url": this.news.blink //url地址
          }, function(res){
              if (res.err_msg != "openUrl:ok") {
                  //错误处理
              }
          });
        } else {
          this.$router.push({
            name: "dsfIframe",
            params: {
              url: this.news.blink,
              title: '新闻详情'
            }
          });
        }
      } else {
        this.$router.push({
          path: '/jiangsuyancaoNewsDetail',
          query: {
            id: this.news.id,
            type: this.news.type,
            time: this.news.time,
            showHeader: this.$route.query.showHeader
          }
        })
      }
    }
  }
}
</script>
<style lang='scss' scoped>
.news{
  display: flex;
  padding: 0.2rem 0.32rem;
  background-color: #fff;
  position: relative;
  img{
    width: 1.7rem;
    height: 1.12rem;
    margin-right: 0.2rem;
    border: 1px solid #ddd;
  }
  .info{
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    .title {
      text-overflow: -o-ellipsis-lastline;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      line-clamp: 2;
      -webkit-box-orient: vertical;
      font-size: var(--font_size_1);
    }
    .time {
      font-size: var(--font_size_3);
      color: #999;
      padding-top: 0.1rem;
    }
  }
  &:not(:last-of-type)::before{
    position: absolute;
    box-sizing: border-box;
    content: ' ';
    pointer-events: none;
    right: 16px;
    bottom: 0;
    left: 16px;
    border-bottom: 1px solid #ddd;
    -webkit-transform: scaleY(.5);
    transform: scaleY(.5);
  }
}
</style>

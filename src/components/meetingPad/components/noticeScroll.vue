<template>
  <div class="notice-scroll">
    <div class="left"><span></span>通知公告:</div>
    <template v-if="list.length > 0">
      <div class="center">
        <vue-seamless-scroll
          :data="list"
          :class-option="{
            direction: 2,
            limitMoveNum: 2
          }"
          class="seamless-warp"
        >
          <ul class="item">
            <li v-for="(item, i) in list" :key="i" @click="noticeClick(item)" v-text="item.title"></li>
          </ul>
        </vue-seamless-scroll>
      </div>
      <div class="right" @click="moreClick">更多</div>
    </template>
    <div v-else>暂无公告</div>
  </div>
</template>
<script>
import vueSeamlessScroll from "vue-seamless-scroll";
export default {
  name: "NoticeScroll",
  components: {
    vueSeamlessScroll
  },
  data() {
    return {
      list: []
    };
  },
  created() {
    this.getData();
  },
  methods: {
    noticeClick(item){
      this.$router.push({path:"/meetingPad/index/noticeDetail",query:{id:item.id}})
    },
    getData() {
      dsf.http
        .post(`/fn/conferenceMessage/notice`, {
          meetingId: this.$route.query.meetingId,
          count: 5
        })
        .done(result => {
          if (result.code == 200 && result.data) {
            this.list = result.data;
          }
        })
        .error(error => {
          console.log("error", error);
        })
        .always(() => {});
    },
    moreClick() {
      this.$router.push("/meetingPad/index/notice");
    }
  }
};
</script>
<style lang="scss" scoped>
.notice-scroll {
  background: #eef5fb;
  padding: 32px;
  color: #3389e0;
  font-size: 40px;

  & > div {
    float: left;
  }

  .left {
    display: flex;
    width: 30%;

    span {
      display: inline-block;
      width: 49px;
      height: 44px;
      background: url(../../../../static/images/meetingPad/notice.png) no-repeat;
      background-size: 100% 100%;
      margin-top: 2px;
      margin-right: 20px;
    }
  }

  .center {
    width: 58%;
    .seamless-warp {
      overflow: hidden;
      ul.item {
        display: flex;
        li {
          margin-right: 0.88rem;
          white-space: nowrap;
        }
      }
    }
  }

  .right {
    width: 12%;
    padding-left: 20px;
    color: #666666;
  }
}
</style>

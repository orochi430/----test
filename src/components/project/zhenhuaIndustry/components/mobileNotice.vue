<template>
  <div>
    <div class="notice" v-if="isShow">
      <div class="title">
        <!-- <img src="static/images/project/zhenhuaIndustry/notice.png" alt="" /> -->
        <span>公告</span>
      </div>
      <div class="content">
        <!-- <div class="content_box">
          <div class="cont" v-for="(item, index) in noticeContent" :key="index" v-show="noticeContent.length">
            {{ item.dataValue.itemsContent }}
          </div>
          <div class="cont" v-show="!noticeContent.length">
            暂无数据
          </div>
        </div> -->
        <div class="cont" v-show="!noticeContent.length">
          暂无数据
        </div>
        <van-swipe vertical :show-indicators="false" :loop="true" autoplay="3000" :touchable="false" :height="30"
          v-show="noticeContent.length">
          <van-swipe-item v-for="(item, index) in noticeContent" :key="index" class="ellipsis"
            @click="toDetailForm(item.dataValue)">
            <div class="cont" style="line-height: 0.44rem">{{ item.dataValue.itemsContent }}</div>
          </van-swipe-item>
        </van-swipe>

        <div class="more" @click="goForm">
          <img src="static/images/project/zhenhuaIndustry/more.png" alt="" />
        </div>
      </div>
      <!-- <div class="more" @click="goForm">
        <img src="static/images/project/zhenhuaIndustry/more.png" alt="" />
      </div> -->
    </div>
    <div class="oldnotice" v-else>
      <div class="title">
        <!-- <img src="static/images/project/zhenhuaIndustry/oldnotice.png" alt="" /> -->
        <span>公告</span>
      </div>
      <div class="content">
        <!-- <div class="cont" v-for="(item, index) in noticeContent" :key="index" v-show="noticeContent.length != 0">
          {{ item.dataValue.itemsContent }}
        </div> -->
        <van-swipe vertical :show-indicators="false" :loop="true" autoplay="3000" :touchable="false" :height="24"
          v-show="noticeContent.length">
          <van-swipe-item v-for="(item, index) in noticeContent" :key="index" class="ellipsis"
            @click="toDetailForm(item.dataValue)">
            <div style="line-height: 0.44rem">{{ item.dataValue.itemsContent }}</div>
          </van-swipe-item>
        </van-swipe>
        <div class="cont" v-show="noticeContent.length == 0">
          暂无数据
        </div>
      </div>
      <div class="more" @click="goForm" v-if="noticeContent.length > 2">
        查看更多<span class="icon iconfont" style="font-size: 12px">&#xe761;</span>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "mobileNotice",
  props: {},
  components: {},
  data() {
    return {
      isShow: true,
      noticeContent: [],
      mobile: dsf.util.loadSessionStore("user").mobile,
      multiply:dsf.util.loadLocalStore("multiple")||dsf.config.login.fontSizeMultiple
    };
  },
  computed: {},
  watch: {},
  methods: {
    judgeStyle() {
      this.multiple=dsf.util.loadLocalStore("multiple")||dsf.config.login.fontSizeMultiple;
      if (this.multiple <= 5) {
        this.isShow = true;
      } else {
        this.isShow = false;
      }
    },
    noticeList() {
      dsf.http.get("fn/proxyRequest/forwardResource?proxyPageId=230923105225VWEmb6JoFZcjmKK774t&proxyComponentInterfaceKey=mobileNotice&proxyComponentName=ZhzgMobileNoticeComponents", {
        "x-auth-token": dsf.util.loadSessionStore("loginToken")
      }).then((res) => {
        // this.noticeContent = res.data.datas.slice(0, 2);
        this.noticeContent = res.data.datas
      });
    },
    goForm() {
      let url = `${dsf.config.login.oaRootPath}/fn/mobileSso/redirectAuth?code=${this.mobile}&state=L2NvbW1vbkxpc3QvMTgwODA2MTYwODA1Mmd3ZzZ3V0dzTmRpWHIxeU9DeC8xODA4MDUxNzU2MjhSSzdpeEkxSXlyakR1RzRuakQ1P2lzUHJldmlldz0x&field=mobile`

      dsf.util.openWebviewToUrl({ url: url, title: "通知公告" })
    },
    toDetailForm(item) {
      // this.$router.push({
      //   path: `/commonForm/${item.moduleId}/${item.info_id}?method=${item.method}&listId=${item.listId}`
      // })
       let url = `/commonForm/${item.moduleId}/${item.info_id}?method=${item.method}&listId=${item.listId}`
      let newUrl = `${dsf.config.login.oaRootPath}/fn/mobileSso/redirectAuth?code=${this.mobile}&state=${dsf.base64.encode(url)}&field=mobile`
      dsf.util.openWebviewToUrl({ url: newUrl, title: item.moduleName })
    }
  },
  created() {
    this.noticeList();
  },
  activated() {
    this.judgeStyle();
    this.noticeList();
  },
  mounted() {
    this.judgeStyle();
  },
  beforeDestroy() { },
};
</script>
<style lang='scss' scoped>
@import "@/assets/styles/themes.scss";
@import "@/assets/styles/mixin.scss";

.notice {
  margin: 15px 10px;
  background: #ffffff;
  box-shadow: 0 1px 20px 0 rgba(166, 201, 235, 0.48);
  border-radius: 10px;
  padding: 17px 10px;
  .title {

    // img {
    //   width: 55px;
    // }
    span {
      font-size: var(--font_size_1);
      font-weight: bold;
      color: #333;
      // padding-left: 0.2rem;
    }
  }

  .content {
    width: 100%;
    margin-top: 10px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-right: 5px;
    padding: 0 10px;

    .content_box {
      width: 80%;

      .cont {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        margin-bottom: 5px;
      }

    }
    .van-swipe{
      width: 90%;
      font-size: 16px;
      height: 80px;
    }

    .more {
      img {
        width: 20px;
      }
    }
  }

}

.oldnotice {
  font-size: 14px;
  margin: 15px 10px;
  background: #ffffff;
  box-shadow: 0 1px 20px 0 rgba(166, 201, 235, 0.48);
  border-radius: 10px;
  padding: 17px 10px 1px 10px;

  .title {

    // img {
    //   width: 100px;
    // }
    span {
      font-size: var(--font_size_1);
      font-weight: bold;
      color: #333;
      // padding-left: 0.2rem;
    }
  }

  .content {
    margin: 14px 0;

    .cont {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      padding-bottom: 5px;
    }
    .van-swipe{
      width: 100%;
      height: 58px !important;
    }
  }

  .more {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 10px 0;
    border-top: 1px solid #eff1f5;
    text-align: center;
    color: var(--normal);
    font-weight: 400;
  }
}
</style>

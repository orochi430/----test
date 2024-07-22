<template>
  <div>
    <van-pull-refresh :disabled="dsf.config.homePage.isEnablePullRefresh" v-model="isLoading" @refresh="onRefresh" style="min-height: 90vh;">
      <van-skeleton v-for="index of 3" :key="index" title avatar :row="3" :loading="loading" />
      <!-- <van-loading v-if="loading" size="24px" vertical>加载中...</van-loading> -->
      <div class="message" v-for="(item, index) in messages" :key="index" @click="link(item)">
        <van-image width="0.8rem" height="0.8rem" fit="cover" :src="item.icon" />
        <div class="detail">
          <div class="top">
            <span class="title">{{ item.title }}</span>
            <span v-if="item.time" class="time">{{ item.time }}</span>
            <span v-else-if="!(item.detailPrefix || item.detail) && item.badge > 0" class="badge"
              v-text="item.badge > 99 ? '99+' : item.badge"></span>
          </div>
          <div class="btm" v-if="item.detailPrefix || item.detail">
            <span class="prefix" v-if="item.detailPrefix">[{{ item.detailPrefix }}]</span>
            <span class="new">{{ item.detail }}</span>
            <span class="badge" v-if="item.badge" v-text="item.badge > 99 ? '99+' : item.badge"></span>
          </div>
        </div>
      </div>
    </van-pull-refresh>
  </div>
</template>

<script>
export default {
  name: "listMessage",
  data() {
    return {
      isLoading: false,
      messages: [],
      loading: true
    };
  },
  created() {
    this.init();
  },
  activated() {
    this.init();
  },
  methods: {
    onRefresh() {
      this.messages = [];
      this.loading = true;
      this.init();
    },
    async init() {
      await this.getDetail();
      this.isLoading = false;
    },
    getDetail() {
      return dsf.http.post("fn/mobileOAMessage/h5detail").then(res => {
        this.messages = res.data.data;
        this.loading = false;
      });
    },
    link(item) {
      let props = item.agentid;
      try {
        if (props) {
          props = JSON.parse(props);
        }
      } catch (e) {
        props = {};
      }
      //存在聊天需要跳转第三方url;
      //需要替换[参数]
      let url = dsf.util.getReplaceUrl(item.actUrl);

      if (item.shortcutType == 2&&dsf.config.ddSetting.isDing) {
        // 钉钉跳转
        if (dd.biz) {
          //区分普通钉和政务钉
          dd.biz.util.openLink({
            url: url,
            onSuccess: function (result) { },
            onFail: function (err) { }
          });
        } else {
          dd.openLink({
            url: url
          })
            .then(res => {
              console.log(res);
            })
            .catch(err => { });
        }
      } else if (url.includes("http://") || url.includes("https://")) {
        if (props?.OpenWebView == "1") {
          xsfWindow.openWebView({
            title: item.shortcutName,
            url: url,
            colorString: "#111111"
          });
        } else if (props?.OpenLocationHref == "1") {
          location.href = url;
        } else {
          // 其他方式均嵌入iframe
          this.$router.push({
            name: "dsfIframe",
            params: {
              url: url,
              title: "消息提醒"
            },
            query: {
              url: url,
              title: "消息提醒"
            }
          });
        }
      } else {
        this.$router.push({ path: url });
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.message {
  display: flex;
  align-items: center;
  background-color: #fff;
  padding: 16px 20px;
  color: #999;
  border-bottom: 1px solid #f7f7f7;
  font-family: "PingFangSC-Regular", Sans-serif;

  .van-image {
    flex-shrink: 0;
  }

  .detail {
    padding-left: 10px;
    flex: 1;
    overflow: hidden;

    .top {
      display: flex;
      justify-content: space-between;
      align-items: center;

      .title {
        font-size: var(--font_size_2);
        color: #000;
      }
    }

    .btm {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-top: 8px;

      .prefix {
        color: #ff8f00;
        flex-shrink: 0;
        padding-right: 4px;
      }

      .new {
        flex: 1;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }

    .badge {
      color: #fff;
      background-color: #ff3b30;
      padding: 0 6px;
      border-radius: 30px;
      line-height: 20px;
      height: 20px;
      flex-shrink: 0;
    }
  }
}

.van-skeleton {
  padding: 20px !important;

  &__avatar,
  &__title,
  &__row {
    background-color: #e0e0e0;
  }
}

::v-deep .van-loading {
  display: inline-block;
}
</style>

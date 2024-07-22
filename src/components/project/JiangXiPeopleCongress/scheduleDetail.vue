<template>
  <div v-if="agendaInfo">
    <div>
      <van-cell :title="agendaInfo.title" />
      <van-cell>
        <template #default>
          <div class="content" v-html="agendaInfo.content"></div>
        </template>
      </van-cell>
    </div>
    <div style="margin-top: 0.2rem" class="meeting-box">
      <div v-for="(item, idx) in agendaInfo.meetings" :key="idx">
        <van-cell class="ac" :value="
          `${dsf.date.format(item.startTime, 'm-d')}　${dsf.date.format(
            item.startTime,
            'HH:ii'
          )}-${dsf.date.format(item.endTime, 'HH:ii')}`
        " title="会场时间" />
        <van-cell class="ac" :value="item.position" title="会场地址" />
        <van-cell class="ac" :value="item.seat" title="会场座位">
          <template #right-icon>
            <span class="tag" @click="toSeats(item)">座位图</span>
          </template>
        </van-cell>
      </div>
    </div>
    <van-image-preview v-model="showViewer" :images="imgList" closeable @close="imgList = []"></van-image-preview>
    <!-- <el-image-viewer v-if="showViewer" :on-close="showViewer = false" :url-list="imgList" /> -->
  </div>
</template>

<script>
// import Vue from 'vue';
// import ImageViewer from 'element-ui/packages/image/src/image-viewer';
// Vue.use(ImageViewer)
export default {
  components: {
    // 'el-image-viewer': () => import('element-ui/packages/image/src/image-viewer')
  },
  data() {
    return {
      showViewer: false,
      imgList: [],
      agendaInfo: null,
      agendaId: this.$route.params.agendaId,
      loading: null,
      meetingInfo: dsf.util.loadSessionStore("meeting")
    };
  },
  created() {
    let self = this;
    self.init();
  },
  methods: {
    init() {
      let self = this;
      self.loading = dsf.layer.loading();
      dsf.http
        .post(`fn/peopleCongress/agendaDetails`, {
          agendaId: self.agendaId
        })
        .done(res => {
          if (res.type == "success") {
            self.agendaInfo = res.data;
          }
        })
        .error(err => {
          console.log("agendaDetails-err", err);
        })
        .always(() => {
          dsf.layer.closeLoading(self.loading);
        });
    },
    toSeats(item) {
      let self = this;
      // 1不排座，2上传排座，3手动排座
      if (item.seatway == 3) {
        // http://localhost:8080/DreamWeb/seatDesign/index.html#/mobileView/hw/211221170520gH1KB8GHvrkwZfx8rZV/200715112344zkHLfPWCW5OCfrrVebb
        let url = dsf.url.getServerUrl(
          `seatDesign/index.html#/mobileView/hw/${item.id}/${item.meetingUserId}`
        );
        // this.$router.push({
        //     path: '/iframe',
        //     query: {
        //         url: url,
        //         title: '会场座位'
        //     }
        // })
        if (url) {
          location.href = url;
        } else {
          dsf.layer.toast("暂无数据！");
        }
      } else if (item.seatway == 2 && item.seatImgUrl) {
        self.imgList = [];
        self.showViewer = true;
        let url = item.seatImgUrl;
        url = dsf.url.getServerUrl(url.substring(url.indexOf('/') + 1, url.length));
        self.imgList.push(url);
      } else {
        dsf.layer.toast("暂无数据！");
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import "src/assets/styles/themes.scss";
@import "src/assets/styles/mixin.scss";

.van-cell {
  .van-cell__title {
    flex: inherit;
    font-weight: bold;
    font-size: 0.3rem;
  }

  .van-cell__value {
    text-align: left;

    .content {
      color: #969799;
    }
  }

  &::after {
    border-bottom: 1px solid #ddd;
  }
}

.tag {
  display: inline-block;
  background-color: rgba(50, 136, 255, 0.12);
  @include font-theme("normal");
  border-radius: 3px;
  line-height: 21px;
  padding: 0 10px;
  font-size: var(--font_size_4);
}

.meeting-box {
  .van-cell {
    .van-cell__title {
      width: 24%;
    }
  }
}
</style>

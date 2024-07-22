<template>
  <div class="friends" :class="{ noHeader: !$store.state.isShowAppHeader }">
    <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
      <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
        <div class="frilists">
          <!-- v-for="item in list" :key="item" :title="item" -->
          <div class="users" v-for="(item, index) in list" :key="index">
            <van-image fit="cover" round :src="
            dsf.url.getWebPath('/fn/file/downloadFileImage?fileName=' + item.photo)"
              error-icon="../../../../static/images/EnterpriseServices/default-avatar.png"></van-image>
            <div class="right">
              <p class="username">{{ item.userName }}</p>
              <p class="texts">{{ item.title }}</p>
              <div class="images" :class="getClass(item.files.length)" v-if="item.files.length > 0">
                <van-image lazy-load @click="reviewImages(item.files, i)" v-for="(obj, i) in item.files"
                  :key="'file' + i" fit="cover" :src="getFileImg(obj, true)"></van-image>
              </div>
            </div>
          </div>
        </div>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { ImagePreview } from "vant";
export default {
  name: "SDYCFriends",
  components: {},
  data() {
    return {
      id: this.$route.params.id,
      list: [],
      loading: false,
      finished: false,
      refreshing: false,
      page: 1,
      limit: 10,
      isFirst: true,
      timestamp: "",
    };
  },
  computed: {},
  watch: {},
  methods: {
    onLoad() {
      let that = this;
      if (that.isFirst) {
        that.page = 1;
        that.list = [];
      } else {
        that.page += 1;
      }
      if (that.isFirst) that.isFirst = false;
      that.$toast.loading("加载中");

      dsf.http
        .post("/fn/sdycMeeting/spotNews", {
          meetingId: that.id,
          //   page: that.page,
          limit: that.limit,
          timestamp: that.timestamp,
        })
        .done((res) => {
          if (that.refreshing) {
            that.list = [];
            that.refreshing = false;
          }
          that.$toast.clear();
          console.log(res.data);
          if (res.type == "success") {
            that.list = that.list.concat(res.data);
            that.timestamp = that.list[that.list.length - 1].timestamp;
            if (res.data.length < that.limit) {
              that.finished = true;
            }
          }
          that.loading = false;
        });
    },
    onRefresh() {
      this.timestamp = "";
      // 清空列表数据
      this.finished = false;
      // 重新加载数据
      // 将 loading 设置为 true，表示处于加载状态
      this.loading = true;
      this.onLoad(true);
    },
    getClass(num) {
      if (num == 1) {
        return "img1";
      } else if ([2, 3, 4].includes(num)) {
        return "img2";
      } else {
        return "img3";
      }
    },
    getFileImg(item, isThumb) {
      // fileId: "220720181029JKdOiBjIZ1hOFPle6GE"
      // fileName: "QRCode_258.png"
      // moduleId: "220718175134edWpHmHlMqQR3u1CVJn"
      //   return dsf.url.getServerUrl(
      //     `fn/mobileFileDownload/download?fileId=${item.fileId}&moduleId=${item.moduleId}&fileName=${item.fileName}&isTemp=true`
      //   );
      let photo = isThumb ? item.smallPhoto : item.photo;
      return dsf.url.getWebPath(`/fn/file/downloadFileImage?fileName=${photo}`);
    },
    reviewImages(files, index) {
      let images = [];
      files.forEach((item) => {
        images.push(this.getFileImg(item));
      });

      ImagePreview({
        images: images,
        startPosition: index,
      });
    },
  },
  created() { },
  mounted() { },
  destroyed() { },
};
</script>

<style lang="scss" scoped>
.friends {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  top: 56px;
  background: #fff;
  overflow-y: auto;

  &.noHeader {
    top: 0;
  }

  .frilists {
    width: 100%;
    height: auto;
    overflow: hidden;

    .users {
      width: 100%;
      height: auto;
      overflow: hidden;
      box-sizing: border-box;
      padding: 15px;
      border-bottom: 1px solid #ebebeb;
      display: flex;
      justify-content: space-between;

      &>.van-image {
        width: 50px;
        height: 50px;
        flex-shrink: 0;
        overflow: hidden;
        border-radius: 25px;
      }

      .right {
        flex: 1;
        margin-left: 12px;

        .username {
          font-size: var(--font_size_2);
          color: #03b98b;
          line-height: 24px;
        }

        .texts {
          font-size: var(--font_size_3);
          color: #333333;
          line-height: 22px;
        }

        .images {
          margin-top: 10px;
          display: flex;
          flex-wrap: wrap;

          &.img1 {
            .van-image {
              width: 186px;
              height: 120px;
            }
          }

          &.img2 {
            width: 192px;

            .van-image {
              width: 90px;
              height: 80px;
              flex-shrink: 0;
              margin-right: 6px;
              margin-bottom: 6px;
            }
          }

          &.img3 {
            width: 288px;

            .van-image {
              width: 90px;
              height: 80px;
              flex-shrink: 0;
              margin-right: 6px;
              margin-bottom: 6px;
            }
          }
        }
      }
    }
  }
}
</style>

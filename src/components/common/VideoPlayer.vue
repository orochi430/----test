<template>
  <div class="my-video">
    <van-sticky>
      <van-nav-bar
        :title="video.videoTitle"
        @click-right="video.showVideo = !video.showVideo"
      >
        <template #right>
          <span>关闭</span>
        </template>
      </van-nav-bar>
    </van-sticky>
    <video-player
      class="video-player vjs-custom-skin"
      ref="videoPlayer"
      :playsinline="playsinline"
      :options="playerOptions"
      @ready="playerReadied"
    ></video-player>
  </div>
</template>

<script>
import { videoPlayer } from "vue-video-player";
export default {
  components: {
    VideoPlayer: videoPlayer
  },
  props: {
    video: {
      type: Object,
      default: () => {
        return {
          showVideo: false,
          videoTitle: "",
          type: "video/mp4"
        };
      }
    }
  },
  data() {
    return {
      playerOptions: {
        //播放速度
        //playbackRates: [0.5, 1.0, 1.5, 2.0],
        //如果true,浏览器准备好时开始回放。
        autoplay: false,
        // 默认情况下将会消除任何音频。
        muted: false,
        // 导致视频一结束就重新开始。
        loop: false,
        // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
        preload: "auto",
        language: "zh-CN",
        // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
        aspectRatio: "16:9",
        // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
        fluid: true,
        sources: [
          {
            //类型
            type: this.video.type || "video/mp4",
            //url地址
            src: this.video.src //视频地址
          }
        ],
        //你的封面地址
        //poster: 'https://img-blog.csdnimg.cn/20200104163115984.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQwNzQ1MTQz,size_16,color_FFFFFF,t_70', //视频封面图
        //允许覆盖Video.js无法播放媒体源时显示的默认信息。
        notSupportedMessage: "此文件暂时无法播放，请稍后再试",
        controlBar: {
          timeDivider: true,
          durationDisplay: true,
          remainingTimeDisplay: false,
          //全屏按钮
          fullscreenToggle: false
        }
      }
    };
  },
  created() {
    require("video.js/dist/video-js.css");
    require("vue-video-player/src/custom-theme.css");
  },
  methods: {
    // 准备就绪(预加载前会调用)(初始化调用)将侦听器绑定到组件的就绪状态。与事件监听器的不同之处在于，如果ready事件已经发生，它将立即触发该函数
    playerReadied(player) {
      console.log("准备就绪", player);
      this.$emit("playerReadied", player);
    }
  },
  computed: {
    player() {
      return this.$refs.videoPlayer.player;
    },
    playsinline() {
      var ua = navigator.userAgent.toLocaleLowerCase();
      if (ua.match(/tencenttraveler/) != null || ua.match(/qqbrowse/) != null) {
        return false;
      } else {
        return true;
      }
    }
  },
  mounted() {
    this.$refs.videoPlayer.$el.querySelector(
      ".vjs-time-control>div>span"
    ).style = "line-height: 3em !important";
    this.$refs.videoPlayer.$el.querySelector(
      ".vjs-big-play-button>.vjs-icon-placeholder"
    ).style = "line-height: 1.5em !important";
  }
};
</script>

<style lang="scss" scoped>
div > span {
  line-height: 3em !important;
}

.my-video {
  .video-js .vjs-time-control {
    span {
      line-height: 3em !important;
    }
  }
}
</style>

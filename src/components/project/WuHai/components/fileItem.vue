<template>
  <div>
    <div class="file" @click="link">
      <div class="typeIcon">
        <img :src="typeClass" alt="" />
        <van-badge v-if="file.isNew" dot />
      </div>
      <div class="info">
        <div v-if="file.type == 'folder'">
          <div class="title">{{ file.name }}</div>
          <div v-if="isShowCount" class="num">{{ file.fileCount }}个文件</div>
        </div>
        <div v-else>
          <div class="title">{{ file.name }}</div>
          <div v-if="isShowCount" class="num">{{ file.readNum }}次查看</div>
        </div>
      </div>
    </div>
    <!-- 图片预览弹框 -->
    <van-image-preview
      v-model="imgPreview"
      :images="previewImg"
      closeable
    ></van-image-preview>
    <!-- 播放弹框 -->
    <van-popup
      :style="{ height: '100%' }"
      v-model="video.showVideo"
      :close-on-click-overlay="false"
      lock-scroll
      position="bottom"
      get-container="#app"
    >
      <div v-if="video.showVideo">
        <VPlayer :video="video"></VPlayer>
      </div>
    </van-popup>
  </div>
</template>

<script>
import { Badge } from "vant";
// import VPlayer from "@/components/common/VideoPlayer";
export default {
  components: {
    [Badge.name]: Badge,
    'VPlayer': () => import('@/components/common/VideoPlayer'),
  },
  props: {
    file: {
      type: Object,
      default: () => {}
    },
    meetingId: {
      type: String
    },
    isShowCount: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      fileType: {
        pdf: ["pdf"],
        img: [
          "jpeg",
          "bmp",
          "webp",
          "svgz",
          "svg",
          "gif",
          "jpg",
          "ico",
          "png",
          "tif"
        ],
        txt: [
          "txt",
          "sql",
          "xml",
          "html",
          "css",
          "js",
          "java",
          "php",
          "bat",
          "log"
        ],
        word: ["docx", "docm", "doc", "dotx", "dotm", "dot"],
        xls: [
          "xlsx",
          "xlsm",
          "xlsb",
          "xls",
          "xltx",
          "xltm",
          "xlt",
          "xlam",
          "xla",
          "ods"
        ],
        ppt: [
          "pptx",
          "pptm",
          "ppt",
          "potx",
          "potm",
          "pot",
          "ppsx",
          "ppsm",
          "pps",
          "ppam",
          "ppa"
        ]
      },
      hasFilePng: [
        "ai",
        "cloud",
        "html",
        "img",
        "jpg",
        "mp3",
        "mp4",
        "pdf",
        "png",
        "ppt",
        "psd",
        "rar",
        "txt",
        "word",
        "wps",
        "xls",
        "zip",
        "folder"
      ],
      imgPreview: false,
      previewImg: [],
      video: {
        showVideo: false,
        videoTitle: "",
        type: "video/mp4"
      }
    };
  },
  computed: {
    typeClass() {
      let type = this.file.type.toLowerCase();
      if (this.hasFilePng.includes(type))
        return require(`static/images/fileType/${type}.png`);
      for (let key in this.fileType) {
        let value = this.fileType[key];
        if (value.includes(type)) {
          return require(`static/images/fileType/${key}.png`);
        }
      }
    }
  },
  methods: {
    link() {
      let self = this;
      if (self.file.type == "folder") {
        self.$router.push({
          name: `commonList`,
          params: {
            listId: self.file.listId,
            moduleId: self.file.moduleId
          },
          query:  {secQuery: JSON.stringify(self.file.params) }
        });
      } else {
        let url = `fn/sdycMeeting/setRead`;
        dsf.http
          .post(url, {
            fileId: self.file.id
          })
          .done(res => {
            if (res.type == "success") {
              if (res.data.flag) self.file.readNum++;
              if (self.isImage(self.file.name)) {
                if (self.$route.name == "SDYCConferenceFile") {
                  // 文件查询
                  url = dsf.url.getWebPath(
                    `fn/conferenceFile/download?pk=${self.file.id}`
                  );
                } else {
                  // 消息通知
                  url = dsf.url.getWebPath(
                    `fn/mobileFileDownload/download?fileId=${self.file.id}&moduleId=${self.file.moduleId}&fileName=${self.file.name}`
                  );
                }
                this.imgPreview = true;
                this.previewImg = [url];
              } else if (self.isVideo(self.file.name)) {
                url = dsf.url.getWebPath(
                  `fn/conferenceFile/download?pk=${self.file.id}`
                );
                self.video.showVideo = true;
                self.video.videoTitle = self.file.name;
                self.video.src = url;
                self.video.type = `video/${self.file.type}`;
              } else if (self.isAudio(self.file.name)) {
                url = dsf.url.getWebPath(
                  `fn/conferenceFile/download?pk=${self.file.id}`
                );
                self.video.showVideo = true;
                self.video.videoTitle = self.file.name;
                self.video.src = url;
                self.video.type = `audio/${self.file.type}`;
              } else {
                self.file.flowId = 0;
                self.file.nodeId = -1;
                let previewUrl = `fn/office/openMobileOffice?fileId=${self.file.id}&moduleId=${self.file.moduleId}&nodeId=${self.file.nodeId}&flowId=${self.file.flowId}&filename=${self.file.name}`;
                if (self.file.officeModuleId) {
                  previewUrl += `&officeModuleId=${self.file.officeModuleId}`;
                }
                self.$router.push({
                  name: "dsfIframe",
                  params: {
                    url: dsf.url.getServerUrl(previewUrl)
                  }
                });
              }
            } else {
              dsf.layer.toast("操作失败！");
            }
          })
          .error(error => {
            console.log("setRead-error", error);
            dsf.layer.toast("操作失败！");
          })
          .always(() => {
            // dsf.layer.closeLoading(self.loading);
          });
      }
    },
    isImage(fileName) {
      return (
        fileName.toLowerCase().includes(".png") ||
        fileName.toLowerCase().includes(".jpg") ||
        fileName.toLowerCase().includes(".jpeg") ||
        fileName.toLowerCase().includes(".bmp") ||
        fileName.toLowerCase().includes(".gif")
      );
    },
    isVideo(fileName) {
      return (
        fileName.toLowerCase().includes(".mp4") ||
        fileName.toLowerCase().includes(".webm") ||
        fileName.toLowerCase().includes(".wmv") ||
        fileName.toLowerCase().includes(".3gp") ||
        fileName.toLowerCase().includes(".flv") ||
        fileName.toLowerCase().includes(".mkv") ||
        fileName.toLowerCase().includes(".avi")
      );
    },
    isAudio(fileName) {
      return (
        fileName.toLowerCase().includes(".mp3") ||
        fileName.toLowerCase().includes(".wma") ||
        fileName.toLowerCase().includes(".aac") ||
        fileName.toLowerCase().includes(".ogg") ||
        fileName.toLowerCase().includes(".m4a")
      );
    }
  }
};
</script>

<style lang="scss" scoped>
.file {
  padding: 0.32rem 0.4rem;
  background-color: #fff;
  display: flex;

  .typeIcon {
    width: 0.6rem;
    // height: 0.5rem;
    margin-right: 0.4rem;
    position: relative;

    ::v-deep .van-badge {
      position: absolute;
      top: 0;
      right: -4px;
    }
  }

  .info {
    // flex: 1;
    display: flex;
    align-items: center;
    font-size: var(--font_size_1);

    .num {
      font-size: var(--font_size_4);
      color: #999;
      padding-top: 0.1rem;
    }
  }
}
</style>

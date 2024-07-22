<template>
  <div>
    <div class="file" @click="link">
      <div class="typeIcon">
        <img :src="typeClass" alt="" />
        <van-badge v-if="file.isNew" dot />
      </div>
      <div class="info">
        <div v-if="file.type == 'folder'">
          <div class="title" v-html="file.folderName"></div>
          <div v-if="isShowCount" class="num">{{ file.filesCount }}个文件</div>
        </div>
        <div v-else>
          <div class="title" v-html="file.fileName"></div>
          <div v-if="isShowCount" class="num">
            <span>{{ file.viewCount }}次查看</span
            ><span>{{ file.releaseTime | dateFormat }}</span>
          </div>
        </div>
      </div>
    </div>
    <van-image-preview
      v-model="imgPreview"
      :images="previewImg"
      closeable
    ></van-image-preview>
  </div>
</template>

<script>
import { Badge } from "vant";
export default {
  components: {
    [Badge.name]: Badge
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
  filters: {
    //日期格式化
    dateFormat: function(val) {
      if (!val) return "";
      return dsf.date.format(val, "yyyy年mm月dd日 hh:ii");
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
      previewImg: []
    };
  },
  computed: {
    // type() {
    //   return this.children.length > 0 ? ""
    // },
    typeClass() {
      // let startIndex = this.title.lastIndexOf('.');
      // let str = startIndex > -1 ? this.title.substring(startIndex + 1, this.title.length).toLowerCase() : "";
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
          name: "peopleCongressFile",
          params: {
            meetingId: self.meetingId,
            folderid: self.file.folderId
          },
          query: {
            title: self.file.folderName
          }
        });
      } else {
        let url = `fn/peopleCongress/setRead`;
        dsf.http
          .post(url, {
            fileId: self.file.fileId
          })
          .done(result => {
            if (result.code == 200) {
              if (
                self.file.fileName.toLowerCase().includes(".png") ||
                self.file.fileName.toLowerCase().includes(".jpg") ||
                self.file.fileName.toLowerCase().includes(".jpeg") ||
                self.file.fileName.toLowerCase().includes(".bmp") ||
                self.file.fileName.toLowerCase().includes(".gif")
              ) {
                if (self.$route.name == "peopleCongressFile") {
                  // 文件查询
                  url = dsf.url.getWebPath(
                    `fn/conferenceFile/download?pk=${self.file.fileId}`
                  );
                } else {
                  // 消息通知
                  url = dsf.url.getWebPath(
                    `fn/mobileFileDownload/download?fileId=${self.file.fileId}&moduleId=${self.file.moduleId}&fileName=${self.file.fileName}`
                  );
                }
                this.imgPreview = true;
                this.previewImg = [url];
              } else {
                let previewUrl = `fn/office/openMobileOffice?fileId=${self.file.fileId}&moduleId=${self.file.moduleId}&nodeId=${self.file.nodeId}&flowId=${self.file.flowId}&filename=${self.file.fileName}`;
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
              // self.errored = true;
            }
          })
          .error(error => {
            // console.log(error);
            dsf.layer.toast("操作失败！");
            // self.errored = true;
          })
          .always(() => {
            // dsf.layer.closeLoading(self.loading);
          });
      }
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
    height: 0.5rem;
    margin-right: 0.4rem;
    position: relative;

    ::v-deep .van-badge {
      position: absolute;
      top: 0;
      right: -4px;
    }
  }

  .info {
    flex: 1;

    .num {
      font-size: var(--font_size_4);
      color: #999;
      padding-top: 0.4em;
      display: flex;
      justify-content: space-between;
    }
    .title {
      ::v-deep .keyword {
        background-color: #fdd7d8;
        padding: 0.2em 0;
      }
    }
  }
}
</style>

<template>
  <div>
    <div class="file" @click="link(0)">
      <div class="typeIcon">
        <img :src="typeClass" alt="" />
        <van-badge v-if="file.isNew" dot />
      </div>
      <div class="info">
        <div v-if="file.type == 'folder'">
          <div class="title">{{ file.folderName }}</div>
          <div v-if="isShowCount" class="num">{{ file.filesCount }}个文件</div>
        </div>
        <div v-else>
          <div class="title">{{ file.fileName }}</div>
          <div v-if="isShowCount" class="num flex jb ac">
            <!-- <span>{{ file.viewCount }}次查看</span> -->
            <span>{{ file.updateTime }} 更新</span>
            <!-- <van-button
              v-if="file.isHandwrite > 0 || true"
              type="primary"
              class="fileButton"
              @click.stop="link(1)"
              >签批</van-button
            > -->
          </div>
        </div>
      </div>
    </div>
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
    },
    topticId: {
      type: String,
      default: ''
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
      ]
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
  cteated() {
    let self = this;
  },
  methods: {
    link(isHandwriting) {
      let self = this;
      if (self.file.type == "folder") {
        self.$router.push({
          path: `/meetingPad/index/files`,
          query: {
            title: self.file.folderName,
            folderId: self.file.folderId,
            folderModuleId: self.file.folderModuleId
          }
        });
      } else {
        self.setRead();
        this.$emit("sendFileData",{
          id: self.file.fileId,
          name: self.file.fileName,
          infoId: self.file.infoId,
          moduleId: self.file.moduleId,
          isHandwrite:"1",
          flowId: self.file.flowId,
          nodeId: self.file.nodeId,
          filename:self.file.fileName
        }, this.$route.query.folderId)
        // this.isPreview = true;
        // this.popFile ={
        //   id: self.file.fileId,
        //   name: self.file.fileName,
        //   infoId: self.file.infoId,
        //   moduleId: self.file.moduleId,
        //   isHandwrite:"1",
        //   flowId: self.file.flowId,
        //   nodeId: self.file.nodeId,
        //   filename:self.file.fileName
        // } ;
        // this.filename = self.file.fileName;
        // this.showFile = true;
      }
    },
    // 增加点击次数
    setRead() {
      let self = this;
      dsf.http
        .post(`fn/conferenceMobile/setRead`, {
          pk: self.file.fileId,
          moduleId: self.file.moduleId
        })
        .done(result => {
          console.log("打开文件", result);
          // if (result.code == 200) {

          // }
        })
        .error(error => {
          console.log("error", error);
          // dsf.layer.toast("数据获取失败！", false);
        })
        .always(() => {
          // dsf.layer.closeLoading(self.loading);
        });
    }
  }
};
</script>

<style lang="scss" scoped>
.file {
  padding: 32px;
  background-color: #fff;
  display: flex;

  .typeIcon {
    width: 83px;
    margin-right: 44px;
    position: relative;

    img {
      width: 100%;
    }

    ::v-deep .van-badge {
      position: absolute;
      top: 0;
      right: -4px;

      &--dot {
        width: 10px;
        height: 10px;
      }
    }
  }

  .info {
    flex: 1;

    .num {
      font-size: 32px;
      color: #999;
      padding-top: 16px;
    }
  }
}
</style>

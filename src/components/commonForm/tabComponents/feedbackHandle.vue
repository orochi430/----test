<template>
  <div class="feedbackHandle">
    <template v-for="(item, index) in ExtraPageList">
      <div class="header"><span>{{ item.title }}</span></div>
      <div v-for="el in item.fileList" :key="el.id" class="center">
        <div class="r_l" @click="openFile(el.filePath, el, item)">
          <img :src="el.imgType" alt="">
          <!-- <i class="iconfont iconfile iconType" v-else></i>  v-if="!el.logotype" -->
          <div class="t_b">
            <div class="filename">{{ el.fileName }}</div>
            <div class="filesize" v-if="el.showFileSize">{{ el.showFileSize }}</div>
          </div>
        </div>
        <div class="fileBtn">
          <div class="fileButton" @click.stop="openFile(el.filePath, el)">
            预览
          </div>
          <div class="fileButton" @click.stop="downFile(el.filePath, el, 'downFile')"
            v-if="dsf.util.getClientName() == 'app' && dsf.util.checkSystem() != 'ios' && !dsf.config.commonForm.NoDownload">
            下载
          </div>
        </div>
      </div>
      <div v-for="ele in item.relationList" :key="ele.id" class="center ">
        <div class="r_l" @click="openRela(ele)">
          <i class="iconfont iconfile iconType"></i>
          <div class="relabt">{{ ele.relaBt }}</div>
        </div>
      </div>
    </template>

    <van-popup v-model="videoPreview" :style="{ height: '100%' }" position="bottom" get-container="#app">
      <van-nav-bar @click-left="videoPreview = false">
        <template #left>
          <van-icon name="arrow-left" /><span>返回</span>
        </template>
      </van-nav-bar>
      <div class="videoBox" style="" @click="videoPreview = false">
        <video v-if="videoPreview" autoplay name="media" style="width: 100%; height: 200px" controls>
          <source :src="previewVideo" type="video/mp4" />
        </video>
      </div>
    </van-popup>
    <van-image-preview v-model="imgPreview" :images="previewImg" closeable></van-image-preview>
    <van-popup v-model="isShow" :style="{ height: '100%' }" position="bottom" get-container="#app" closed="closed">
      <div v-if="dsf.config.commonForm.LocalDocPreview && fileUrl == ''">
        <enclosure-preview v-if="isShow" :file="popFile" :isPreview="true" :form-info="fileData" :formMeta="formMeta"
          @goPreview="" @goHandWrite="" @closePop="" :RouteLeave="isShow"></enclosure-preview>
      </div>
      <div style="height:100%; width:100%;" v-else>
        <van-nav-bar @click-left="isShow = false">
          <template #left>
            <van-icon name="arrow-left" /><span>返回</span>
          </template>
        </van-nav-bar>
        <iframe id="filePreview" :src="fileUrl" :key="fileUrl" frameborder="0"></iframe>
      </div>
    </van-popup>
  </div>
</template>
<script>
// import EnclosurePreview from "@/components/enclosure/EnclosurePreview";
export default {
  name: "feedbackHandle",
  components: {
    'EnclosurePreview': () => import('@/components/enclosure/EnclosurePreview'),
  },
  // props: ["formData", "formMeta", "allFile", "relationList", "isFromList", "formParams"],
  props: {
    formMeta: {
      default: () => ({}),
      type: Object
    },
    formParams: {
      default: () => ({}),
      type: Object
    }
  },
  data() {
    return {
      ExtraPageList: {},
      videoPreview: false,
      previewVideo: null,
      imgPreview: false,
      previewImg: [],
      fileUrl: "",
      isShow: false,
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
          "tif",
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
          "log",
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
          "ods",
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
          "ppa",
        ],
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
        "ofd",
      ],
      fileData: {},
      popFile: {},
      RouteLeave: true
    }
  },
  created() {
    this.fileData = {
      info_id: this.$route.params.pk || this.formMeta.parameters.pk || this.formData.main['A0001'].value || "",
      moduleId: this.$route.params.moduleId || this.formMeta.parameters.moduleId,
      nodeId: this.formMeta.parameters.nodeId || '',
      nodeName: this.formMeta.parameters.nodeName || '',
      flowId: this.formMeta.parameters.flowId || '',
      pId: this.formMeta.parameters.pId || '',
      pnId: this.formMeta.parameters.pnId || '',
      uploadAttach: this.formMeta.parameters.uploadAttach || ''
    }
    let self = this
    // let findControls = this.formMeta.controls.find(item => item.controlType == "extraPageView")
    // solicitMode: "",	// 是否意见征求(专用纸)模式，默认-1 否
    // viewMode: "", // 展现模式
    let params = {
      moduleId: this.formParams.moduleId,
      pk: this.formParams.pk,
    }
    if (this.formParams.solicitMode != undefined) {
      params.solicitMode = this.formParams.solicitMode
    }
    if (this.formParams.viewMode != undefined) {
      params.viewMode = this.formParams.viewMode
    }
    if (this.formParams.showFileTypes != undefined) {
      params.showFileTypes = this.formParams.showFileTypes
    }
    dsf.http.post("/fn/extraPage/getExtraPageList", params).then(({ data }) => {
      console.log(data);
      self.ExtraPageList = data.data
      // 最新的反馈办理栏中不显示签批单
      let index = self.ExtraPageList[0].fileList.findIndex(item => item.fileName.includes(".ofd"))
      self.ExtraPageList[0].fileList.splice(index, 1)

      self.ExtraPageList.forEach(item => {
        if (item.number == 0) {
          item.title = "初始办理"
          // item.fileList.push({ logotype: true, fileName: "收文批办单" })
        }
        // else if (item.number > 0) {
        // item.fileList.push({ logotype: true, fileName: `收文批办单（增页${item.number}）` })
        // }
        item.fileList.forEach(el => {
          let imgType = self.getIconClass(el.fileName)
          self.$set(el, "imgType", imgType)
        })
      })
    })
  },
  methods: {
    closed() {
      this.fileData = {
        info_id: this.$route.params.pk || this.formMeta.parameters.pk || this.formData.main['A0001'].value || "",
        moduleId: this.$route.params.moduleId || this.formMeta.parameters.moduleId,
        nodeId: this.formMeta.parameters.nodeId || '',
        nodeName: this.formMeta.parameters.nodeName || '',
        flowId: this.formMeta.parameters.flowId || '',
        pId: this.formMeta.parameters.pId || '',
        pnId: this.formMeta.parameters.pnId || '',
        uploadAttach: this.formMeta.parameters.uploadAttach || ''
      }
    },
    openFile(url, el, item) {
      console.log(el);
      // if (el.logotype) {
      //   let query = this.$router.history.current.query
      //   let path = this.$router.history.current.path
      //   let newQuery = JSON.parse(JSON.stringify(query))
      //   item.number >= 0 ? newQuery.extraPageNum = item.number : this.$delete(newQuery, "extraPageNum")
      //   this.$router.push({ path, query: newQuery })
      // }
      let fileType = url.split(".").pop()
      let timestamp = new Date().getTime();
      let initUrl = `fn/file/download?infoId=${el.infoId}&fileId=${el.id}&fileName=${el.fileName}&nrType=${fileType}&moduleId=${this.formParams.moduleId}&x-auth-token=${dsf.util.loadSessionStore("loginToken")}&fullfilename=${timestamp}${el.fileName}`
      let url1 = `?fileId=${el.id}&moduleId=${this.formParams.moduleId}&nodeId=${this.formMeta.parameters.nodeId}&flowId=${this.formMeta.parameters.flowId}&x-auth-token=${dsf.util.loadSessionStore("loginToken")}`
      let openUrl = dsf.url.getServerUrl("fn/office/openMobileOffice" + url1)
      //图片数组
      let imgArr = ["png", "jpg", "jpeg", "bmp", "gif"];
      let rarArr = ["rar", "zip", "7z", "mov"];
      if (rarArr.indexOf(fileType) > -1) {
        dsf.layer.toast('该文件无法在移动端预览')
      } else if (fileType == "mp4") { //视频直接播放
        this.videoPreview = true;
        this.previewVideo = openUrl;
      } else if (url.indexOf("http") == 0 && url.indexOf("response-content-type=image") > -1) { //图片直接预览，两种模式，一个弹层，一个直接显示
        this.localImgPreview(url);
      } else if (imgArr.indexOf(fileType) > -1) {
        this.localImgPreview(dsf.url.getServerUrl("fn/mobileFileDownload/download" + url1));
      } else if (navigator.userAgent.includes("DreamSoft")) { //公司打包App中
        if (dsf.config.commonForm.xsfWPSofd && fileType == "ofd") {
          this.XsfOpenFile(initUrl, el);
        } else if (dsf.config.commonForm.nativeWps) {
          if (dsf.config.commonForm.LocalPdfPreview || fileType == "ofd") {
            this.localFilePreviewOrEdit(openUrl, el)
          } else {
            this.wpsOpen(el, initUrl, fileType, openUrl);
          }
        } else if (dsf.config.commonForm.dianJu?.isEnable && fileType == "ofd") {
          if (dsf.config.commonForm.LocalPdfPreview) {
            this.localFilePreviewOrEdit(openUrl, el)
          } else {
            this.dianJuFileOpen(el, initUrl, fileType, openUrl);
          }
        } else {
          this.localFilePreviewOrEdit(openUrl, el)
        }
      } else {
        this.localFilePreviewOrEdit(openUrl, el)
      }

    },
    localImgPreview(url) { //本地图片预览  this.isControl ||
      this.imgPreview = true;
      this.previewImg = [url];
    },
    localFilePreviewOrEdit(url, item, edit) { //本地文件预览、编辑
      if (dsf.config.commonForm.webViewPreview) {
        let rootPath = dsf.url.getRootPath()
        let tempurl = rootPath + url.replace("../", "")
        xsfWindow.openWebView({
          "title": item.title,
          "url": tempurl,
          "colorString": "#111111"
        });
      }
      else {
        if (dsf.config.commonForm.LocalDocPreview) {
          let file = {
            moduleId: item.relaModuleId,
            flowId: this.formMeta.parameters.flowId || '',
            nodeId: this.formMeta.parameters.nodeId || '',
            isHandwrite: -1
          }
          file = Object.assign(item, file)
          this.popFile = file
          this.fileUrl = ""
          this.isShow = true
        }
        else {
          this.fileUrl = url;
          this.isShow = true
        }
      }

    },
    XsfOpenFile(ofdUrl, part) {
      xsfWPS.open(dsf.url.getRootPath() + ofdUrl,
        part.fileName,
        true,
        false,
        function (result) {
          //alert("open seccess"+JSON.stringify(result));
        },
        function (error) {
          //alert("open failed: " + JSON.stringify(error));
        }
      );
    },
    wpsOpen(part, fileUrl, fileType, openUrl) {
      console.log("wpssss");
      let self = this
      //console.log(fileUrl, part);
      let rootPath = dsf.url.getRootPath()
      var param = {
        keepCallback: true,
        downUrl: rootPath + fileUrl,
        saveUrl: rootPath + `fn/mobileOffice/upload?fileId=${part.id}&moduleId=${this.formParams.moduleId}&pnId=${this.formMeta.parameters.pnId || ''}&nodeName=${this.formMeta.parameters.nodeName || ''}&fileType=1&infoId=${part.infoId}&extension=${fileType}&x-auth-token=${dsf.util.loadSessionStore("loginToken")}`,
        fileName: part.fileName,
        openWithWPS: true,
        uploadFile: true,
        openMode: "readOnly", //不是已办结文件、已办事项 并且后台参数可编辑，允许编辑，否则只读
        enterReviseMode: false,
        showReviewingPaneRightDefault: true,
        userName: dsf.util.loadSessionStore("user").name
      };

      if (self.$route.query.isdjOpen) {//标识是否是从点聚插件再次打开我们的页面
        window.androidMethod.openNative(JSON.stringify({ action: "$WPS.downAndOpen", data: param }))
      } else {
        $WPS.downAndOpen(param, function (data) {
          console.log(data);
          if (data.result == "success" && data.action == "upload") { //上传成功刷新
            self.fileUrl = ""
            setTimeout(() => {
              self.fileUrl = openUrl + "&temp=" + new Date()
              console.log(self.fileUrl, "重置url成功");
            }, 500);
          }
        }, function (data) {
          console.log("错误回调", data);
        });
      }
    },
    dianJuFileOpen(part, fileUrl, fileType, openUrl) {
      let self = this;
      let can_edit = false;
      let rootPath = dsf.url.getRootPath()
      const save_url = rootPath + `fn/mobileOffice/upload?fileId=${part.id}&moduleId=${this.formParams.moduleId}&pnId=${this.formMeta.parameters.pnId || ''}&nodeName=${this.formMeta.parameters.nodeName || ''}&fileType=1&infoId=${part.infoId}&extension=${fileType}&x-auth-token=${dsf.util.loadSessionStore("loginToken")}`;
      const down_url = rootPath + fileUrl;

      let obj = {
        fileUrl: down_url,
        title: part.fileName,
        canEdit: can_edit,
        uploadUrl: save_url,
        keyId: part.id,
        userName: dsf.util.loadSessionStore("user").name
      };
      console.log("点聚参数", obj)
      xsfCommon.dianJuSdk(JSON.stringify(obj), function success(result) {
        result = JSON.parse(result)
        console.log("打开点聚的回调参数", result)
        // alert("open seccess"+JSON.stringify(result));
        /*
        {"message":"dianjuUploadSuccess","result":true}

        dianjuUploadSuccess :表示上传成功，给你回调这个，你就可以调用发送接口
        dianjuOpenSuccess ：表示点聚打开成功
        dianjuOpenError ：表示点聚打开出错，一般是文件下载失败
        */
        if (result.message == "dianjuUploadSuccess") {
          self.fileUrl = ""
          setTimeout(() => {
            self.fileUrl = openUrl + "&temp=" + new Date()
            console.log(self.fileUrl, "重置url成功");
          }, 500);
          self.$bus.emit("iSignatureSend", {
            act: "send"
          })
        } else if (result.message == "dianjuOpenSuccess") {

        } else if (result.message == "dianjuOpenError") {
          dsf.layer.alert({
            message: "文件打开失败:" + down_url,
          });
        }

      },
        function error(error) {
          // alert("open failed: " + JSON.stringify(error));
        }
      );
    },
    downFile(url, item, edit) {
      console.log(item);
      let fileType = url.split(".").pop()
      let timestamp = new Date().getTime();
      let downLoading = dsf.layer.loading("下载中...")
      let initUrl = `fn/file/download?infoId=${item.infoId}&fileId=${item.id}&fileName=${item.fileName}&nrType=${fileType}&moduleId=${this.formParams.moduleId}&x-auth-token=${dsf.util.loadSessionStore("loginToken")}&fullfilename=${timestamp}${item.fileName}`
      var uri = encodeURI(dsf.url.getRootPath() + initUrl);
      let filename =
        item.fileName.substr(0, item.fileName.indexOf(".")) +
        moment(new Date()).format("YYYYMMDDHHss") +
        item.fileName.substr(item.fileName.indexOf("."));
      let fileURL = "/Download/item/" + filename;

      if (this.$route.query.isdjOpen) {
        window.openNativeResult = function (result) {
          dsf.layer.closeLoading(downLoading)
          if (result.action != "FileTransfer.download") return
          result = JSON.parse(result)
          console.log(result);
          if ("source" in result) {
            dsf.layer.toast("下载失败！", false)
            console.log("download error source " + result.source);
            console.log("download error target " + result.target);
            console.log("upload error code" + result.code);
          } else {
            dsf.layer.alert({
              message: "文件已下载到 " + fileURL,
            });
          }
        }
        let params = { array: [uri, fileURL, false, "id", { Authorization: "Basic dGVzdHVzZXJuYW1lOnRlc3RwYXNzd29yZA==" }] }
        window.androidMethod.openNative(JSON.stringify({ action: "FileTransfer.download", data: params }))
      } else {
        var fileTransfer = new FileTransfer();
        fileURL = cordova.file.externalRootDirectory + "/Download/item/" + filename;
        fileTransfer.download(
          uri,
          fileURL,
          function (entry) {
            dsf.layer.alert({
              message: "文件已下载到 " + "/Download/item/" + filename,
            });
          },
          function (error) {
            console.log("download error source " + error.source);
            console.log("download error target " + error.target);
            console.log("upload error code" + error.code);
          },
          false, {
          headers: {
            Authorization: "Basic dGVzdHVzZXJuYW1lOnRlc3RwYXNzd29yZA==",
          },
        }
        );
      }
    },
    getIconClass(title) {
      let startIndex = title.lastIndexOf(".");
      let str = startIndex > -1 ? title.substring(startIndex + 1, title.length).toLowerCase() : "";
      if (this.hasFilePng.indexOf(str) > -1)
        return require(`static/images/fileType/${str}.png`);
      for (let key in this.fileType) {
        let value = this.fileType[key];
        if (value.indexOf(str) > -1) {
          return require(`static/images/fileType/${key}.png`);
        }
      }
      return require(`static/images/fileType/word.png`);
    },
    openRela(ele) {
      // this.$router.push({ path: `/commonForm/${ele.relaModuleId}/${ele.relaId}`, query: { relaId: ele.relaId } })
      let params = {
        moduleId: ele.relaModuleId,
        pk: ele.relaId,
        relaId: ele.relaId,
        isEnterTodo: -1
      }
      let getInfoUrl = dsf.config.clientType == "iPad" ? "fn/xform/getInfo?hd=1" : "fn/xform/getInfo"
      dsf.http.get(getInfoUrl, params).then(({ data }) => {
        let parameters = data.struct.parameters
        this.fileData = {
          info_id: parameters.pk,
          moduleId: parameters.moduleId,
          nodeId: parameters.nodeId || '',
          nodeName: parameters.nodeName || '',
          flowId: parameters.flowId || '',
          pId: parameters.pId || '',
          pnId: parameters.pnId || '',
          uploadAttach: parameters.uploadAttach || ''
        }
        dsf.http.post("ctrl/mobileAttachmentFile/getMobileFormAttachmentType3", {
          moduleId: ele.relaModuleId,
          infoId: ele.relaId
        }).then((res) => {
          console.log(res);
          let file = res.data
          let url1 = `?fileId=${file.id}&moduleId=${file.moduleId}&nodeId=${parameters.nodeId}&flowId=${parameters.flowId}&x-auth-token=${dsf.util.loadSessionStore("loginToken")}`
          let openUrl = dsf.url.getServerUrl("fn/office/openMobileOffice" + url1)
          this.fileUrl = openUrl
          this.isShow = true
        })
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.feedbackHandle {
  .header {
    padding: 10px;
    font-size: var(--font_size_2);
  }

  .center {
    background: #fff;
    padding: 8px 15px;
    border-bottom: 1px #eee solid;

    .r_l {
      display: flex;
      align-items: center;

      img {
        width: 0.76rem;
        height: 0.96rem;
        margin-right: 0.2rem;
        line-height: 0.96rem;
      }
    }

    .t_b {
      flex: 1;
      overflow: hidden;

      .filename {
        font-size: var(--font_size_2);
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      .filesize {
        color: #999;
        padding-top: 0.2rem;
      }
    }

    .fileBtn {
      .fileButton {
        display: inline-block;
        // width:48px;
        margin-right: 2px;
        text-align: center;
        border-radius: 24px;
        border: 1px solid #e5e5e5;
        white-space: nowrap;
        padding: 0 10px;
        margin-top: 10px;
        font-size: var(--font_size_4);
        line-height: 21px;
      }
    }

    .relabt {
      font-size: var(--font_size_2);
      white-space: normal;
      overflow: hidden;
      word-break: break-all;
    }
  }

  .videoBox {
    background-color: rgba(0, 0, 0, 0.8);
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
}

iframe {
  width: 100%;
  height: calc(100vh - 0.93rem);
}

.iconType {
  font-size: 55px !important;
  margin-left: -8px;
  color: #087fe3;
  margin-right: 0.2rem;
}
</style>

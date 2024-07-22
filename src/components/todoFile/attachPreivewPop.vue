<template>
<div class="enclosurePop">
  <van-image-preview v-model="imgPreview" :images="previewImg" closeable></van-image-preview>
  <!--v-if='!dsf.config.commonForm.LocalDocPreview'-->
  <van-popup v-model="showFile" :close-on-click-overlay="true" class="file-preview" lock-scroll position="bottom" style="height: 100vh">
      <van-nav-bar :title="filename" fixed placeholder @click-left="closeFile" @click-right="closeFile">
        <template v-if="appTopMenu" #left>
          <van-icon name="arrow-left" />返回
        </template>
        <template v-else #right>
          <span>关闭文件</span>
        </template>
      </van-nav-bar>
      <enclosure-preview v-if='dsf.config.commonForm.LocalDocPreview' ref="enclosurePreview" :file="popFile" :is-preview="isPreview" :is-signature="isSignature" @goPreview="goPreview" @goHandWrite="goHandWrite" :isShowCurPerson='true' :officeModuleId='popFile.officeModuleId||""'></enclosure-preview>
      <div v-else class="content">
        <iframe :src="fileUrl" :key="fileUrl" frameborder="0"></iframe>
    </div>
  </van-popup>
</div>
</template>

<script>
// import EnclosurePreview from "@/components/enclosure/EnclosurePreview";
export default {
  components: {
    'EnclosurePreview': () => import("@/components/enclosure/EnclosurePreview")
  },
  data() {
    return {
      imgPreview: false,
      previewImg: [],
      popFile: {},
      showFile: false,
      filename: '',
      isPreview: true,
      currentFile: {},
      fileUrl: '',
      isSignature: false,
      appTopMenu: dsf.config.appTopMenu.value,
    }
  },
  methods: {
    open(file) {
      if (dsf.util.isImage(file.fileName)) {
          let url = ''
          url = dsf.url.getWebPath(`fn/mobileFileDownload/download?fileId=${file.id}&moduleId=${file.moduleId}&fileName=${file.fileName}`);
          console.log(url)
          this.imgPreview = true;
          this.previewImg = [url];
      } else {
        if (navigator.userAgent.includes("DreamSoft")) { // 公司app中
          if (dsf.config.commonForm.nativeWps) { // 使用wpsApp打开
            this.wpsOpen(file)
            return
          }
        }
        if (!dsf.config.commonForm.LocalDocPreview) { // pdf.js打开
          let previewUrl =dsf.url.getServerUrl(`fn/office/openMobileOffice?fileId=${file.id}&moduleId=${file.moduleId}&nodeId=${file.nodeId}&flowId=${file.flowId}&filename=${file.fileName}&x-auth-token=${dsf.util.loadSessionStore("loginToken")}&handwriting=1&screenWidth=${document.body.clientWidth}`) ;
          if (file.officeModuleId) {
              previewUrl += `&officeModuleId=${file.officeModuleId}`;
          }
          this.fileUrl = previewUrl
          this.filename = file.fileName;
        } else { // 图片预览
          this.popFile = file
          this.filename = file.fileName;
        }
        this.showFile = true;
      }
    },
    goPreview() {
      this.isPreview = true;
    },
    goHandWrite() {
      this.isPreview = false;
    },
    closeFile() {
      this.showFile = false;
      if(dsf.config.commonForm.LocalDocPreview) this.$refs.enclosurePreview.destroyInterval(); // 关闭自动重试定时器
    },
    wpsOpen(doc) {
      let rootPath = dsf.url.getRootPath()
      let loginToken = dsf.util.loadSessionStore("loginToken");
      var param = {
        keepCallback: true,
        downUrl: rootPath + `fn/file/download?infoId=${doc.id}&fileId=${doc.fileId}&fileName=${doc.fileName}&moduleId=${doc.moduleId}&x-auth-token=${loginToken}&fullfilename=${doc.fileName}`,
        saveUrl: '',
        fileName: doc.fileName,
        openWithWPS: true,
        uploadFile: true,
        openMode: "readOnly", //不是已办结文件、已办事项 并且后台参数可编辑，允许编辑，否则只读
        enterReviseMode: false,
        showReviewingPaneRightDefault: false,
        userName: dsf.util.loadSessionStore("user").name
      };
      console.log(param);
      $WPS.downAndOpen(param, function (data) {
        console.log(data);
      }, function (data) {
        console.log("错误回调", data);
      });
    },
  }
}
</script>
<style lang='scss' scoped>
@import "src/assets/styles/themes.scss";
@import "src/assets/styles/mixin.scss";

.file-preview {
  display: flex;
  flex-direction: column;
  .content {
    flex: 1;
    iframe {
      width: 100%;
      height: 100%;
    }
  }
}
::v-deep.enclosurePop .van-nav-bar {
  @include font-theme("normal");

  .van-icon {
    @include font-theme("normal");
    @include font_5;
    margin-right: 3px;
  }
}

</style>

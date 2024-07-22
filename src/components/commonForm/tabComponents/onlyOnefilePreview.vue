<template>
  <div style="height: 100%;">
    <div
      v-if="fileList.length > 0 && ifFile(fileUrl)"
      :class="{ fullScreen: isFullScreen }"
      :style="{ position: isFullScreen ? '' : 'relative', width: '100%', height: dsf.config.commonForm.btnToggleShowFile ? 'calc(100% - 0.76rem)' : '100%', overflow: 'auto' }"
    >
      <enclosure-preview
        v-if="dsf.config.commonForm.LocalDocPreview"
        :file="popFile"
        :isPreview="isPreview"
        :form-info="fileData"
        ref="tabEnclosurePreview"
        :formMeta="formMeta"
        :isShowFullScreen="true"
        :isTabType="true"
        @fullScreen="fullScreen"
        @goPreview="goPreview"
        @closePop="closePop"
        @isShowEnclosureBtn="isShowEnclosureBtn"
      ></enclosure-preview>
      <iframe v-if="!dsf.config.commonForm.LocalDocPreview" :src="fileUrl" :key="fileUrl" frameborder="0" @load="changeFrameHeight()" style="width: 100%;height: 100%;"/>
    </div>
    <div v-else-if="!ifFile(fileUrl)">
      <img :src="fileUrl" alt="" />
    </div>
    <commonempty v-else description="暂无文件预览" />
  </div>
</template>

<script>
// import EnclosurePreview from "@/components/enclosure/EnclosurePreview"
export default {
  components: {
    'EnclosurePreview': () => import('@/components/enclosure/EnclosurePreview'),
  },
  props: {
    fileData: {
      type: Object,
      default: () => {}
    },
    allFile: {
      type: Array,
      default: () => []
    },
    formMeta: {
      type: Object,
      default: () => {}
    },
    headTab: {
      type: String,
      default: ""
    },
    tabName: {
      type: String,
      default: ""
    },
    formData: {
      type: Object,
      default: () => {}
    },
    metaData: {
      type: Object
    }
  },
  data() {
    return {
      fileObj: {},
            list: [],
            fileUrl: "",
            isdisabled: false,
            showUpload: false,
            urlIndex: "0",
            fileList: [],
            imgPreview: false,
            previewImg: [],
            videoPreview: false,
            previewVideo: null,
            inDreasSoft: navigator.userAgent.includes("DreamSoft"),
            currentFile: null,
            fileShow: false,
            popFile: {}, //弹窗文件
            canPopFileEdit: false,
            writeFile: {},
            writeShow: false,
            isFullScreen: false,
            isPreview: true, //true 预览  false 签批
            showPopover: false,
            personScreen: [],
            instructorsList: [], //批示人列表
            fileTimer: null,
            isShowFileBtn: true,//签批时不显示文件切换按钮
    }
  },
  created() {
        console.log("headTab" + this.headTab);
        this.list = this.allFile
        console.log("全部的呈批文件",this.allFile)
        this.list.forEach(row => {
            this.fileList = this.fileList.concat(row.file)
        })
        if (this.fileList.length > 0) {
            let firstFile = this.fileList[0];
            this.popFile = this.fileList[0];
            this.fileObj = this.fileList[0];

            if (this.fileObj.navtiveUrl.indexOf("http") == 0) {
                this.fileUrl = this.fileObj.navtiveUrl;
            } else {
                this.fileUrl = this.fileObj.url;
            }
            this.fileObj.actived = true;
            // }
        }

  },
  methods: {
    ifFile(fileurl) {
            return !(fileurl.includes(".png") || fileurl.includes(".jpg") || fileurl.includes(".mp4") || fileurl.includes(".jpeg") || fileurl.includes(".bmp") || fileurl.includes(".gif"))
        },
        closePop() {
            this.isShow = false;
        },
        goPreview() {
            // if(this.formMeta.parameters.viewAttachUseSignMode>0)
            //     return;
            this.isPreview = true;
            this.isFullScreen = false;
        },
        fullScreen() {
            this.isFullScreen = !this.isFullScreen;
            let topdistance = 0;
            if (dsf.config.appTopMenu ?.value) topdistance = 46;
            if (document.querySelector('.smt-tab')) {
                document.querySelector('.smt-tab').style.top = JSON.stringify(this.isFullScreen ? 0 : topdistance + 50) + 'px';
            }
        },
        closeFileShow() {
            this.fileShow = false;
            // this.isPreview = true;
            if (this.$refs.enclosurePreview)  this.$refs.enclosurePreview.destroyInterval(); // 关闭自动重试定时器
    },
        isShowEnclosureBtn(val){
            this.isShowFileBtn = val;
        },
  }
}
</script>
<style lang="scss" scoped></style>

<template>
<div class="form-title">
    <template v-if="!readonly">
      <van-field v-model="value.value" :rows="readonly?1:3" autosize type="textarea" :readonly="readonly" :placeholder="controlData.placeholder" :maxlength="controlData.maxlength" :class="{'textareaBox':!readonly}" :rules="controlData.rules" />
    </template>
    <div v-else @click="if(allFile.length>0 && allFile[0].file.length>0) {showEnclosure()}" style="font-size: var(--font_size_0);font-weight: 600;">
      <!-- <img v-if="allFile.length>0 && allFile[0].file.length>0" :src="getIconClass(allFile[0].file[0].title)" alt="" style="width: 0.34rem; display: inline-block; vertical-align: sub" /> -->
      <span>
        {{value.value}}
      </span>
    </div>
    <div class="status" v-if="!dsf.config.commonForm.hideBigTitleDetail">
      <span v-if="promoter">发起人：<span class="promoter">{{promoter}}</span></span>
      <span v-if="status" :style="{color: status.value == 2 ? '#13ba84' : '#E6A23C'}">{{status.text}}</span>
    </div>
    <div class="opinion" v-if="!dsf.config.commonForm.hideBigTitleDetail && opinionText">{{opinionText}}</div>
    <van-popup :style="{ height: '100%' }" v-model="isShowEnclosure" :close-on-click-overlay="false" lock-scroll position="bottom" get-container="#app" class="flex dc">
        <van-nav-bar title="相关文件" @click-left="isShowEnclosure = false">
            <template #left>
                <van-icon name="arrow-left" /><span>返回</span>
            </template>
        </van-nav-bar>
        <enclosure ref="enclosure" :fileData="{
          info_id:formMeta.parameters?formMeta.parameters.pk:'',
          moduleId:formMeta.parameters?formMeta.parameters.moduleId:'',
          nodeId:formMeta.parameters?formMeta.parameters.nodeId:'',
          nodeName:formMeta.parameters?formMeta.parameters.nodeName:'',
          flowId:formMeta.parameters?formMeta.parameters.flowId:'',
          pId:formMeta.parameters?formMeta.parameters.pId:'',
          pnId:formMeta.parameters?formMeta.parameters.pnId:'',
          uploadAttach:formMeta.parameters?formMeta.parameters.uploadAttach:'',
          }"
          :allFile = allFile
          style="flex: 1" :formMeta="formMeta"
        ></enclosure>
    </van-popup>
</div>
</template>

<script>
import propMixin from "./mixin";
import enclosure from "./enclosure"
export default {
  components: {enclosure},
  mixins: [propMixin],
  props: ["formData", "formMeta", "allFile"],
  data() {
    return {
      bindValue: '',
      controlData: {
        rules: [],
        maxlength: null,
        showWordLimit: true,
        placeholder: ''
      },
      readonly: false,
      opinion: this.formData.opinion,
      isShowEnclosure: false,
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
    }
  },
  computed: {
    opinionText() {
      let lastOpinion = null
      Object.values(this.opinion).forEach(nodeList => {
        nodeList.forEach(item => { // 取最后一次意见，根据时间判断
          if(!lastOpinion || dsf.date.parse(lastOpinion.opinionDate).getTime() < dsf.date.parse(item.opinionDate).getTime()) {
            lastOpinion = item
          }else if(dsf.date.parse(lastOpinion.opinionDate).getTime() == dsf.date.parse(item.opinionDate).getTime()) {
            lastOpinion = item.nodeName == this.formMeta.parameters.nodeName ? lastOpinion : item // 当前节点与上一节点时间一致时，取不是当前节点的
          }
        })
      })
      return lastOpinion ? lastOpinion.opinionContent : ''
    },
    promoter() {
      return this.formData.main['A0011'] ? this.formData.main['A0011'].value : ''
    },
    status() {
      return this.formData.main['A0009'] ? this.formData.main['A0009'] : ''
    }
  },
  created() {
    console.log()
  },
  methods: {
    inpfn() {
      this.$emit('input', this.value)
    },
    showEnclosure() {
      if(dsf.config.commonForm.canClickBigTitle && this.readonly) {
        this.isShowEnclosure = true
      }
    },
    getIconClass(title) {
      let startIndex = title.lastIndexOf(".");
      let str =
          startIndex > -1 ?
          title.substring(startIndex + 1, title.length).toLowerCase() :
          "";
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
  },
}
</script>
<style lang='scss' scoped>
@import "src/assets/styles/themes.scss";
@import "src/assets/styles/mixin.scss";
.form-title{
  // border-bottom: 1px solid #ebedf0;
  background-color: #fff;
  .textareaBox {
    padding: 0 !important;
    border: 0;
    border-radius: 2px;
  }
  > .van-field{
    font-size: var(--font_size_0) !important;
    ::v-deep .van-field__control{
      text-align: left;
    }
  }
  .van-cell::after{
    border-bottom: 0;
  }
  .status{
    padding-top: 5px;
    display: flex;
    justify-content: space-between;
    .promoter{
      @include font-theme('normal')
    }
  }
  .opinion{
    // padding: 0 16px;
    padding-top: 5px;
    color: #E6A23C;
  }
  ::v-deep .van-field__body .van-field__control:read-only{
    color: #333 !important;
  }
}

</style>

<template>
  <div>
    <div class="field-container">
      <van-field v-model="value" type="textarea" :rows="rows" :placeholder="placeholder" :error-message="errorMessage" @blur="trimTip()" />
      <img src="" alt="" />
      <div class="mould" v-if="isShowYuyin">
        <img src="static/images/platform/yuyin.png" alt="">
      </div>
    </div>
    <opinion-template v-if="isShowTemplate"></opinion-template>
    <opinion-attach></opinion-attach>
    <div>
      <i v-if="allowHandWrite" class="iconfont iconbianji1"></i>
      <i v-if="allowUpload" class="iconfont iconKHCFDC_fujian" @click="openWritePopup"></i>
    </div>
    <van-popup v-if="getHW_Type == 'self'" v-model="showWritePopup" get-container="#app" position="bottom" round>
      <hw :formData="formData" @closeWritePopup="closeWritePopup" isForm="1"></hw>
    </van-popup>
    <div v-show="getHW_Type == 'jg' && showWritePopup">
      <hwJG ref="HWJG" :hwtype="getHW_Type" :formData="formData" :formMeta="formMeta" @closeWritePopup="closeWritePopup"></hwJG>
    </div>
  </div>
</template>

<script>
import opinionAttach from "./opinionAttach"
import opinionTemplate from "./opinionTemplate"
import hw from "@/components/common/OpinionHandWrite"
import hwJG from "@/components/common/OpinionHandWriteJG"
export default {
  components: { opinionTemplate, opinionAttach, hw, hwJG },
  props: {
    placeholder: {
      type: String,
      default: "请输入审批意见"
    },
    isShowTemplate: {
      type: Boolean,
      default: true
    },
    allowHandWrite: {
      type: Boolean,
      default: false
    },
    allowUpload: {
      type: Boolean,
      default: false
    },
    errorMessage: {
      type: String
    },
    rows: {
      type: Number,
      default: 3
    },
    rules: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  data() {
    return {
      value: '',
      isShowYuyin: false,
      showWritePopup: false,
      getHW_Type: dsf.config.setting["SYS-MOBILE-FORM-0003"] || "self"
    }
  },
  methods: {
    closeWritePopup(imgdata) {
      //关闭手写弹框
      this.showWritePopup = false
      if (imgdata) {
        this.imgUrl = dsf.url.getServerUrl(`fn/file/downloadFile?fileName=${imgdata.handwritePic}`)
        this.$emit("operateHandWrite", this.imgUrl)
      }
    },
    openWritePopup() {
      //打开手写弹框
      this.showWritePopup = true
      if (this.getHW_Type == "jg") {
        this.$refs.HWJG.buttonHWClick()
      }
    },
    trimTip() {
      this.value = this.value.replace(/(^\s*)|(\s*$)/g, "") // 去除首尾空格
      this.$emit('blur', this.value)
    }
  }
}
</script>
<style lang="scss" scoped></style>

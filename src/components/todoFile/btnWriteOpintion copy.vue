<template>
  <div class="opintionView">
    <round-popup :show.sync="isShow" title="意见" style="max-height: 90vh">
      <template #right-icon>
        <span v-if="opinitonShowSign" @click="Sign">{{ isSign?'取消签字':'签字 }}</span>
      </template>
      <template #container>
        <opinion-edit
          ref="opinionEdit"
          :isShowTemplate="isShowTemplate"
          :allowHandWrite="needHandWrite"
          :allowUpload="allowUpload"
          :rows="10"
          @operateHandWrite="operateHandWrite"
          @blur="blurOpinion"
        ></opinion-edit>
      </template>
      <template #btn>
        <van-button type="default" @click="btnSaveOpintion()">{{ saveName }}</van-button>
        <van-button type="theme" @click="send()">{{ submitName }}</van-button>
      </template>
    </round-popup>
  </div>
</template>

<script>
import roundPopup from "@/components/commonComponents/roundPopup.vue"
import OpinionSign from "@/components/common/OpinionSign"
import opinionEdit from "@/components/opinionComponents/index.vue"
export default {
  name: "controlOpintionBtn",
  components: {
    OpinionSign,
    opinionEdit,
    roundPopup
  },
  props: {
    formData: {
      type: Object,
      default: () => {
        return {}
      }
    },
    metaData: {
      type: Object,
      default: {}
    },
    formParams: {
      type: Object,
      default: {}
    }
  },
  data() {
    return {
      isSign: 0,
      signName: "",
      signTime: "",
      user: dsf.util.loadSessionStore("user"),
      isShow: false,
      value: "",
      tags: [],
      allowEditOpinion: 1,
      opinionRequired: 1,
      errorMessage: "",
      _loading: "",
      saveName: dsf.config.commonFlow?.opinionBtnSetting?.cancelName || "保存",
      submitName: dsf.config.commonFlow?.opinionBtnSetting?.submitName || "提交",
      needHandWrite: dsf.config.commonFlow && dsf.config.commonFlow.needHandWrite, //是否需要手写签批
      havetoHandWrite: dsf.config.setting["SYS-MOBILE-FORM-0011"] || "-1", //手写签批必签
      imgUrl: "",
      showWrite: false,
      isShowTemplate: true,
      allowUpload: true,
      opinitonShowSign: dsf.config.commonForm.opinitonShowSign
    }
  },
  created() {
    let shoEditOpinion = 1
    this.metaData.controls.forEach(item => {
      if (item.controlType == "controlEditOpinion") {
        shoEditOpinion = 0
      }
    })

    this.allowEditOpinion = shoEditOpinion ? this.metaData.parameters.allowEditOpinion : shoEditOpinion
    this.opinionRequired = this.metaData.parameters.opinionRequired
    console.log(this.metaData.parameters, this.formData, this.formParams)
    if (dsf.config.commonFlow.isDefaultShowOpinition) {
      this.getDefaultOpinition()
    }
  },
  computed: {
    tempTags() {
      return this.showMore ? this.tags : this.tags.slice(0, 2)
    },
    getHW_Type() {
      return dsf.config.setting.hasOwnProperty("SYS-MOBILE-FORM-0003") ? dsf.config.setting["SYS-MOBILE-FORM-0003"] || "self" : "self"
    }
  },
  mounted() {},
  methods: {
    Sign() {
      if (this.isSign) {
        this.isSign = 0
      } else {
        this.$refs.opinionEdit.value = ""
        this.isSign = 1
        this.signName = this.user.name
        this.signTime = dsf.date.format(new Date(), "yyyy-mm-dd")
      }
    },
    getDefaultOpinition() {
      dsf.http
        .post("fn/mobileFormComment/getH5CurrentComment", {
          pk: this.metaData.parameters.pk,
          pid: this.metaData.parameters.pId,
          pnid: this.metaData.parameters.pnId,
          moduleId: this.metaData.parameters.moduleId
        })
        .then(({ data }) => {
          if (data.data.opinion) {
            this.$refs.opinionEdit.value = data.data.opinion
            this.$refs.opinionEdit.attachList.push(...data.data.attachList)
          }
        })
    },
    btnSaveOpintion() {
      if (this.$refs.opinionEdit.value.length < 1 && this.opinionRequired && this.allowEditOpinion > 0) {
        dsf.layer.toast("请填写意见", false)
        // this.errorMessage = "请填写审批意见"
        return
      }
      this.saveOpinion()
    },
    //保存意见
    saveOpinion(isSend) {
      this._loading = dsf.layer.loading("保存中...")
      var self = this
      var obj = {
        __DATA: JSON.stringify({
          info_id: self.formParams.pk,
          pid: new String(self.metaData.parameters.pId),
          pnid: new String(self.metaData.parameters.pnId),
          opinion: self.$refs.opinionEdit.value,
          type: "g_inbox",
          isSign: self.isSign
        })
      }
      let postUrl = `/fn/mobileSaveOpinion/saveOpinion?flowId=${self.metaData.parameters.flowId}&nodeId=${self.metaData.parameters.nodeId}&moduleId=${self.formParams.moduleId}`
      return new Promise((resolve, reject) => {
        dsf.http.post(postUrl, obj).then(function (result) {
          dsf.layer.closeLoading(self._loading)
          if (!result.data.result) {
            self.dsf.layer.toast(result.data.message, false)
            reject()
          } else {
            if (!isSend) {
              self.$emit("setOpintion", { content: self.$refs.opinionEdit.value, isSign: self.isSign }, "init") // 不发送则重新加载表单
              self.$emit("refreshPcForm")
            } else {
              self.$emit("setOpintion", { content: self.$refs.opinionEdit.value, isSign: self.isSign })
            }
            self.Show()
            resolve()
          }
        })
      })
    },
    Show() {
      this.isShow = !this.isShow
    },
    send() {
      if (this.$refs.opinionEdit.value.length < 1 && this.opinionRequired && this.allowEditOpinion > 0) {
        dsf.layer.toast("请填写意见", false)
        // this.errorMessage = "请填写审批意见"
        return
      }
      this.saveOpinion("send").then(res => {
        console.log("1111111111")
        this.$emit("send")
      })
    },
    openWritePopup() {
      //打开手写弹框
      this.showWrite = true
      if (this.getHW_Type == "jg") {
        this.$refs.HWJG.buttonHWClick()
      }
    },
    delHandWrite() {
      // 清除手写签批
      dsf.http.post(`fn/mobileHandWritingData/delete?pnid=${this.metaData.parameters.pnId}&pid=${this.metaData.parameters.pId}`).then(res => {
        if (res.data.result) {
          this.imgUrl = ""
          dsf.layer.toast("清除成功")
        }
      })
    },
    closeWritePopup(imgdata) {
      //关闭手写弹框
      this.showWrite = false
      if (imgdata) {
        this.imgUrl = imgdata
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../../assets/styles/themes.scss";
@import "../../assets/styles/mixin.scss";

.opintionView {
  width: 100%;
}

.opinionRequired {
  border: 1px solid #ef8e8e;
}

::v-deep .van-field__value {
  padding: 5px;
}
._file {
  box-shadow: rgba(149, 157, 165, 0.3) 0px 2px 9px !important;
  overflow: hidden;
}
._footer {
  bottom: 0;
  height: 1.2rem;
  width: 100%;
  position: fixed;
  @include background-theme("button_auxiliary_bgcolor");
  display: flex;
  align-items: center;
  padding: 0 12px;

  ._btn {
    flex: 1;
    border-radius: 3px;

    &:not(:first-child) {
      margin-left: 10px;
    }
  }
}
.handleWriteBox {
  // padding: 15px;
  // padding-right: 0;
  background: white;
  font-size: var(--font_size_3);

  .writeContent {
    text-align: center;

    img {
      display: inline-block;
      padding-top: 15px;
    }
  }

  .writeBtn {
    text-align: right;
    margin: 10px 16px;
  }
}
</style>

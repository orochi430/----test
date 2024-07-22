<template>
  <div class="opintionView">
    <van-popup
      v-model="isShow"
      position="bottom"
      round
      get-container="#app"
      class="opintionPopup"
    >
      <van-nav-bar title="意见" class="top">
        <template #left>
          <i
            size="0.4rem"
            class="iconfont iconxialajiantou"
            @click="Show()"
            style="color: #000"
          />
        </template>
      </van-nav-bar>
      <div class="container">
        <idealEdit
          ref="idealEdit"
          style="border-top: 5px solid #f1f2f4"
          :allowUploadOpinionAttach="allowUploadOpinionAttach"
          :fileCount="fileCount"
          :metaData="metaData"
          :isShowHandWrite="
            dsf.config.commonFlow && dsf.config.commonFlow.needHandWrite
          "
          @handWrite="openWritePopup"
        >
        <template #opinionImg>
          <div
            class="handleWriteBox"
            v-if="dsf.config.commonFlow && dsf.config.commonFlow.needHandWrite"
          >
            <div class="writeContent">
              <img
                v-if="imgUrl"
                :src="imgUrl"
                alt=""
                :style="{ width: dsf.config.commonFlow.opinionImgWidth || '50%' }"
              />
            </div>
          </div>
        </template>
      </idealEdit>
      </div>
      <van-popup
        v-if="getHW_Type == 'self'"
        v-model="showWrite"
        get-container="#app"
        position="bottom"
        round
      >
        <hw
          :formData="metaData.parameters"
          @closeWritePopup="closeWritePopup"
        ></hw>
      </van-popup>
      <div v-show="getHW_Type == 'jg' && showWrite">
        <hwJG
          ref="HWJG"
          :hwtype="getHW_Type"
          :formData="metaData.parameters"
          :formMeta="metaData"
          @closeWritePopup="closeWritePopup"
        ></hwJG>
      </div>
      <div style="height: 1.2rem">
        <div class="_footer">
          <debounce-click>
            <van-button
              type="default"
              class="_btn"
              @click="btnSaveOpintion()"
              >{{ saveName }}</van-button
            >
            <!-- <van-goods-action-button type="default" @click="btnSaveOpintion()" :text="saveName" /> -->
          </debounce-click>
          <debounce-click>
            <van-button type="theme" class="_btn" @click="send()">{{
              submitName
            }}</van-button>
            <!-- <van-goods-action-button type="theme" @click="send()" :text="submitName" /> -->
          </debounce-click>
          <debounce-click
            v-if="
              dsf.config.commonForm && dsf.config.commonForm.opinitonShowSign
            "
          >
            <van-goods-action-button
              type="theme"
              @click="Sign()"
              :text="isSign ? '取消签字' : '签字'"
            />
          </debounce-click>
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script>
import DebounceClick from "@/components/common/debounceClick.jsx";
import OpinionSign from "@/components/common/OpinionSign";
import hw from "@/components/common/OpinionHandWrite";
// import hwJG from "@/components/common/OpinionHandWriteJG";
import idealEdit from "@/components/todoFile/idealEdit";
export default {
  name: "controlOpintionBtn",
  components: {
    DebounceClick,
    OpinionSign,
    hw,
    'hwJG': () => import('@/components/common/OpinionHandWriteJG'),
    idealEdit,
  },
  props: {
    formData: {
      type: Object,
      default: () => {
        return {};
      },
    },
    metaData: {
      type: Object,
      default: {},
    },
    formParams: {
      type: Object,
      default: {},
    },
    currentOpintion: {
      type: String,
      default: "",
    },
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
      saveName: "保存",
      submitName: "提交",
      showMore: false,
      needHandWrite:
        dsf.config.commonFlow && dsf.config.commonFlow.needHandWrite, //是否需要手写签批
      havetoHandWrite: dsf.config.setting["SYS-MOBILE-FORM-0011"] || "-1", //手写签批必签
      imgUrl: "",
      showWrite: false,
      allowUploadOpinionAttach: false,
      fileCount: 0,
    };
  },
  created() {
    let shoEditOpinion = 1;
    this.metaData.controls.forEach((item) => {
      if (item.controlType == "controlEditOpinion") {
        shoEditOpinion = 0;
      }
    });

    this.allowEditOpinion = shoEditOpinion
      ? this.metaData.parameters.allowEditOpinion
      : shoEditOpinion;
    this.opinionRequired = this.metaData.parameters.opinionRequired;
    console.log(this.metaData.parameters, this.formData, this.formParams);

    if (dsf.config.commonFlow.opinionBtnSetting) {
      this.saveName =
        dsf.config.commonFlow.opinionBtnSetting.cancelName || "保存";
      this.submitName =
        dsf.config.commonFlow.opinionBtnSetting.submitName || "提交";
    }
  },
  watch: {
    isShow: {
      handler(nv, ov) {
        if (nv) {
          if (dsf.config.commonFlow.isDefaultShowOpinition) {
            this.getDefaultOpinition();
          }
          // 个人设置中设置默认意见手写签批功能
          if (this.metaData.parameters.handWriteOpinion == 1) {
            this.openWritePopup()
          }
        }
      },
    },
  },
  computed: {
    tempTags() {
      return this.showMore ? this.tags : this.tags.slice(0, 2);
    },
    getHW_Type() {
      return dsf.config.setting.hasOwnProperty("SYS-MOBILE-FORM-0003")
        ? dsf.config.setting["SYS-MOBILE-FORM-0003"] || "self"
        : "self";
    },
  },
  mounted() {},
  methods: {
    Sign() {
      if (this.isSign) {
        this.isSign = 0;
      } else {
        this.$refs.idealEdit.value = "";
        this.isSign = 1;
        this.signName = this.user.name;
        this.signTime = dsf.date.format(new Date(), "yyyy-mm-dd");
      }
    },
    async getDefaultOpinition() {
      await dsf.http
        .post("fn/mobileFormComment/getH5CurrentComment", {
          pk: this.metaData.parameters.pk,
          pid: this.metaData.parameters.pId,
          pnid: this.metaData.parameters.pnId,
          moduleId: this.metaData.parameters.moduleId,
        })
        .then(({ data }) => {
          console.log(this.$refs.idealEdit);
          if (data.data.opinion) {
            this.$refs.idealEdit.value = data.data.opinion;
          }
          this.$refs.idealEdit.attachList.push(...data.data.attachList);
          this.allowUploadOpinionAttach = data.data.isShowFile == "1";
          this.fileCount = data.data.fileCount;
        });
      if (this.currentOpintion) {
        this.$refs.idealEdit.value = this.currentOpintion;
      }
    },
    btnSaveOpintion() {
      if (
        this.$refs.idealEdit.value.length < 1 &&
        this.opinionRequired &&
        this.allowEditOpinion > 0
      ) {
        dsf.layer.toast("请填写意见", false);
        // this.errorMessage = "请填写审批意见"
        return;
      }
      this.saveOpinion();
    },
    //保存意见
    saveOpinion(isSend) {
      this._loading = dsf.layer.loading("保存中...");
      var self = this;
      var obj = {
        __DATA: JSON.stringify({
          info_id: self.formParams.pk,
          pid: new String(self.metaData.parameters.pId),
          pnid: new String(self.metaData.parameters.pnId),
          opinion: self.$refs.idealEdit.value,
          type: "g_inbox",
          isSign: self.isSign,
        }),
      };
      let postUrl = `/fn/mobileSaveOpinion/saveOpinion?flowId=${self.metaData.parameters.flowId}&nodeId=${self.metaData.parameters.nodeId}&moduleId=${self.formParams.moduleId}`;
      return new Promise((resolve, reject) => {
        dsf.http.post(postUrl, obj).then(function (result) {
          dsf.layer.closeLoading(self._loading);
          if (!result.data.result) {
            self.dsf.layer.toast(result.data.message, false);
            reject();
          } else {
            if (!isSend) {
              self.$emit(
                "setOpintion",
                { content: self.$refs.idealEdit.value, isSign: self.isSign },
                "init"
              ); // 不发送则重新加载表单
              self.$emit("refreshPcForm");
            } else {
              self.$emit("setOpintion", {
                content: self.$refs.idealEdit.value,
                isSign: self.isSign,
              });
            }
            self.Show();
            resolve();
          }
        });
      });
    },
    Show() {
      this.isShow = !this.isShow;
    },
    send() {
      if (
        this.$refs.idealEdit.value.length < 1 &&
        this.opinionRequired &&
        this.allowEditOpinion > 0
      ) {
        dsf.layer.toast("请填写意见", false);
        // this.errorMessage = "请填写审批意见"
        return;
      }
      this.saveOpinion("send").then((res) => {
        console.log("1111111111");
        this.$emit("send");
      });
    },
    openWritePopup() {
      //打开手写弹框
      this.showWrite = true;
      if (this.getHW_Type == "jg") {
        this.$refs.HWJG.buttonHWClick();
      }
    },
    delHandWrite() {
      // 清除手写签批
      dsf.http
        .post(
          `fn/mobileHandWritingData/delete?pnid=${this.metaData.parameters.pnId}&pid=${this.metaData.parameters.pId}`
        )
        .then((res) => {
          if (res.data.result) {
            this.imgUrl = "";
            dsf.layer.toast("清除成功");
          }
        });
    },
    closeWritePopup(imgdata) {
      if(!imgdata){
        this.imgUrl = ""
        this.delHandWrite()
        this.showWrite = false;
        return
      }
      //关闭手写弹框
      this.showWrite = false;
      if (imgdata) {
        this.imgUrl = imgdata;
      }
    },
  },
};
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
.opintionPopup {
  max-height: 90vh;
  display: flex;
  flex-direction: column;
  .container {
    flex: 1;
    overflow: auto;
  }
}
._footer {
  bottom: 0;
  height: 1.2rem;
  width: 100%;
  // position: fixed;
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
  font-size: var(--font_size_2);

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

<template>
  <div class="ideal-box">
    <div class="switchMode" v-if="canSwitchMode">
      <p @click="opinionMode = opinionMode == 'input' ? 'handWrite' : 'input'">
        <span><i class="iconfont icondaoxu"></i></span>
        {{ opinionMode == 'input' ? '手写签批' : '文字输入' }}
      </p>
    </div>
    <div class="_file_input" v-show="!canSwitchMode || opinionMode == 'input'">
      <div class="input-box">
        <van-cell class="_file">
          <van-field
            v-model="value"
            type="textarea"
            :rows="rows || 10"
            placeholder="请输入审批意见"
            :error-message="errorMessage"
            @blur="trimTip($event)"
          />
        </van-cell>
        <div class="mould" v-if="isShowMould">
          <!-- <div class="mould-button">语音意见</div>
          <div class="mould-button" @click="idealClick()">常用意见</div> -->
          <img
            v-if="!dsf.config.commonForm.hideOpinionVoice"
            src="static/images/platform/yuyin.png"
            alt=""
          />
        </div>
      </div>
      <div
        class="mould"
        v-if="isShowMould && !dsf.config.commonForm.hideSendOpinion"
      >

        <div class="_file_log">
          <div class="opinions" v-if="dsf.config.commonForm?.showComOpinName">常用意见:&nbsp</div>
          <van-tag
            v-for="(item, index) in tempTags"
            :key="index"
            class="_file_tags elps"
            size="medium"
            type="primary"
            @click="addContent(item)"
          >
            {{ item.context }}</van-tag
          >
        </div>
        <div class="setting" @click="idealClick()">
          {{ dsf.config.commonForm?.MoreOpinionName || "更多" }}
        </div>
      </div>
    </div>
    <slot name="opinionImg" v-if="!canSwitchMode || opinionMode == 'handWrite'"></slot>
    <div class="attachWrap">
      <div
        v-for="(item, index) in attachList"
        class="attach"
        @click="priview(item)"
      >
        <div class="title">{{ item.fileName || item.filename }}</div>
        <div class="icon elps">
          <img
            :src="dsf.util.getFileTypeIcon(item.fileName || item.filename)"
            alt=""
          /><span>{{
            item.showFileSize || dsf.util.filesizeTostr(item.filesize)
          }}</span>
        </div>
        <div class="del" @click.stop="delAttach(item, index)">
          <i class="iconfont iconquxiao1"></i>
        </div>
      </div>
    </div>
    <div :class="['iconWrap', {hasText: dsf.config.commonFlow.showOpinitonText}]">
      <p v-if="(canSwitchMode && opinionMode == 'handWrite') || (!canSwitchMode && isShowHandWrite)" @click="$emit('handWrite')">
        <i class="iconfont iconhandWrite"></i>
        <span v-if="dsf.config.commonFlow.showOpinitonText">手写签批</span>
      </p>
      <p v-if="allowUploadOpinionAttach">
        <van-uploader
          result-type="file"
          :after-read="afterRead"
          class="upload-btn"
          :accept="accept"
        >
          <i class="iconfont iconKHCFDC_fujian"></i>
        </van-uploader>
        <span v-if="dsf.config.commonFlow.showOpinitonText">上传</span>
      </p>
    </div>
    <van-popup
      v-model:show="showIdeal"
      position="bottom"
      round
      :style="{ height: '80%' }"
      get-container="#app"
    >
      <div class="ideal" style="width: 100%; height: 100%">
        <van-nav-bar
          title="意见维护"
          :right-text="`${disabled ? '拖拽排序' : '取消'}`"
          @click-right="onClickRight"
          :left-text="`共${this.tags.length}条`"
        >
        </van-nav-bar>
        <draggable
          group="people"
          class="list-group"
          ghost-class="ghost"
          chosenClass="chosen"
          v-model="tags"
          animation="200"
          @sort="onEnd"
          :disabled="disabled"
          filter=".forbid"
          :move="onMove"
        >
          <div
            class="list-group-item"
            v-for="(item, index) in tags"
            :key="index"
            @click.stop="tagClick(item.context)"
            :class="item.type == -1 ? 'item forbid' : 'item'"
          >
            <span>{{ item.context }}</span>
            <van-icon
              v-if="
                !dsf.config.commonForm.hideSendOpinionOrder &&
                item.type != -1 &&
                !disabled
              "
              name="sort"
              color="#666666"
              size="15"
              class="sort"
            />
            <van-icon
              v-if="item.type != -1 && disabled"
              name="close"
              size="20"
              @click.stop="clearTags(item)"
            />
          </div>
        </draggable>
        <div class="footer-btn">
          <input type="text" v-model="newValue" placeholder="请输入意见" />
          <van-button type="primary" @click="addTemplate">添加</van-button>
        </div>
      </div>
    </van-popup>
    <enclosurePopup ref="enclosurePopup"></enclosurePopup>
  </div>
</template>

<script>
// import draggable from "vuedraggable";
import dsf from "../../common";
import enclosurePopup from "@/components/todoFile/attachPreivewPop.vue";
export default {
  name: "ideal",
  props: [
    "metaData",
    "allowUploadOpinionAttach",
    "fileCount",
    "isShowHandWrite",
    "rows",
  ],
  components: {
    "draggable": () => import("vuedraggable"),
    enclosurePopup,
  },
  data: function () {
    return {
      attachList: [],
      value: "",
      newValue: "",
      tags: [],
      showMore: true,
      ids: "",
      errorMessage: "",
      showIdeal: false,
      isShowMould: true,
      accept:
        dsf.util.checkSystem() == "ios" ||
        dsf.util.getClientName().includes("ding")
          ? "*"
          : "image/*, application/*",
      disabled: true,
      nodeIndex: 0,
      canSwitchMode: dsf.config.commonFlow?.canSwitchOpinionMode,
      opinionMode: 'input'
    };
  },
  created() {
    if (!dsf.config.commonFlow.hasOwnProperty("showOpinitonText")) {
      dsf.config.commonFlow.showOpinitonText = false;
    }
  },
  mounted() {
    this.getAdvice();
  },
  computed: {
    tempTags() {
      return this.showMore ? this.tags : this.tags.slice(0, 2);
    },
  },
  watch: {
    value(nv) {
      if (nv.length > 0) {
        this.errorMessage = "";
      }
    },
    opinionMode(val){
      if(val=="handWrite"){
        this.$emit('handWrite')
      }
    }
  },
  methods: {
    onClickRight() {
      console.log("click right");
      this.disabled = !this.disabled;
    },
    onMove(e) {
      console.log(e.relatedContext.element);
      if (e.relatedContext.element.type == "-1") return false;
      return true;
    },
    priview(data) {
      console.log(data);
      let file = {
        fileName: data.filename,
        isNew: true,
        moduleId: this.metaData.parameters.moduleId,
        officeModuleId: "",
        nodeId: "-1",
        flowId: "0",
        fileId: data.infoId,
        id: data.id,
        isHandwrite: "0",
      };
      this.$refs.enclosurePopup.open(file);
    },
    cancel() {
      console.log(this.tags);
      dsf.http
        .post("/fn/mobileUsedOpinion/moveIndex", {
          templateIds: this.ids,
        })
        .then(() => {
          this.showIdeal = !this.showIdeal;
          this.getAdvice();
        });
    },
    onEnd() {
      console.log(this.tags);
      this.tags.forEach((ele) => {
        this.ids += ele.id + ",";
      });
    },
    idealClick() {
      this.showIdeal = !this.showIdeal;
      this.newValue = this.value;
    },
    tagClick(val) {
      if (!this.disabled) return;
      this.value += val;
      this.showIdeal = !this.showIdeal;
    },
    trimTip(event) {
      // 获取失去光标时的位置
      this.nodeIndex = event.target.selectionStart;
      setTimeout(() => {
        this.value = this.value.replace(/(^\s*)|(\s*$)/g, ""); // 去除首尾空格
      }, 50);
    },
    // 获取常见意见模板
    getAdvice() {
      dsf.http.get("fn/mobileUsedOpinion/find").then((res) => {
        this.tags = res.data.rows;
      });
    },
    clearTags(item) {
      this.$dialog
        .confirm({
          title: "提示",
          message: "确定要删除吗？",
        })
        .then(() => {
          dsf.http.get("fn/mobileUsedOpinion/delete?id=" + item.id).then(() => {
            this.getAdvice();
          });
        })
        .catch(() => {});
    },
    addContent(item) {
      this.value = insertText(this.value,this.nodeIndex,item.context);
      // 往光标失去的焦点的位置，添加意见
      function insertText(originalString, nodeIndex, newText) {
        let beforeNode = originalString.slice(0, nodeIndex);
        let afterNode = originalString.slice(nodeIndex);
        return beforeNode + newText + afterNode;
      }
    },
    addTemplate() {
      if (this.tags.find((item) => this.newValue == item.context)) {
        dsf.layer.toast("模板内容已重复");
        return;
      }
      if (this.newValue != "" && this.newValue.trim().length > 0) {
        dsf.http
          .post("fn/mobileUsedOpinion/add", {
            __DATA: JSON.stringify({
              opinion: this.newValue,
            }),
          })
          .then((data) => {
            this.getAdvice();
            this.newValue = "";
          });
      } else {
        dsf.layer.toast("请输入内容");
      }
    },
    afterRead(file) {
      if (
        this.fileCount &&
        this.fileCount > 0 &&
        this.attachList.length >= this.fileCount
      ) {
        dsf.layer.toast("已达到上传附件上限");
        return;
      }
      this.$toast.loading({
        message: "上传中...",
        forbidClick: true,
        duration: 0,
        overlay: true,
      });
      this.doFileRead(file);
    },
    async doFileRead(file) {
      let self = this;
      let url = "fn/mobileSaveOpinion/upload";
      dsf.http
        .upload(url, file.file, {
          moduleId: this.metaData.parameters.moduleId,
          mid: 0,
          pId: this.metaData.parameters.pId || 0,
          pnId: this.metaData.parameters.pnId || 0,
          nodeName: "拟稿",
          nrType: 9,
          pk: this.metaData.parameters.pk,
          newFileFlag: 0,
          validataRename: 0,
          fileId: "",
        })
        .then((res) => {
          if (res.data.code == 200) {
            let file = {
              filename: res.data.data.fileName,
              filesize: res.data.data.fileSize,
              id: res.data.data.fileId,
              infoId: this.metaData.parameters.pk,
            };
            this.attachList.push(file);
          }
          dsf.layer.toast(res.data.message);
        });
    },
    delAttach(file, index) {
      dsf.layer.confirm(
        {
          message: "是否确认删除",
          confirmButtonText: "确认",
        },
        () => {
          dsf.http
            .post("fn/file/delete", {
              moduleId: this.metaData.parameters.moduleId,
              pk: this.metaData.parameters.pk,
              nrType: 9,
              fileId: file.id,
              fileName: file.filename,
              pId: this.metaData.parameters.pId || 0,
              pnId: this.metaData.parameters.pnId || 0,
            })
            .then((res) => {
              if (res.data.code == 200) {
                dsf.layer.toast("删除成功");
                this.attachList.splice(index, 1);
              }
            });
        }
      );
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../../assets/styles/themes.scss";
@import "../../assets/styles/mixin.scss";
.ideal {
  position: relative;
  overflow: hidden;

  .van-nav-bar {
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    height: 50px;
    border-bottom: 2px solid #f1f2f4;
  }
  .chosen {
    @include background-theme("normal", true);
    span {
      color: #fff;
    }
  }
  .list-group {
    position: absolute;
    top: 50px;
    left: 0;
    right: 0;
    bottom: 50px;
    padding: 0 10px;
    width: 100%;
    overflow: auto;

    .list-group-item {
      position: relative;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 5px 8px;
      height: 45px;
      border-bottom: 2px solid #f1f2f4;
      > span {
        margin-right: 5px;
        flex: 1;
        font-size: var(--font_size_2);
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
      i {
        width: 20px;
      }
      .van-icon-close {
        margin-left: 15px;
      }
    }
  }

  .footer-btn {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 10px;
    height: 50px;

    input {
      padding: 0 5px;
      // width: calc(100% - 70px);
      flex: 1;
      margin-right: 10px;
      height: 40px !important;
      border: 2px solid #f1f2f4 !important;

      &::-webkit-input-placeholder {
        color: #cfd0d2;
      }
    }

    .van-button {
      padding: 0 12px;
      height: 38px;
    }
  }

  .flip-list-move {
    -webkit-transition: -webkit-transform 0.5s;
    transition: -webkit-transform 0.5s;
    transition: transform 0.5s;
    transition: transform 0.5s, -webkit-transform 0.5s;
  }

  .no-move {
    -webkit-transition: -webkit-transform 0s;
    transition: -webkit-transform 0s;
    transition: transform 0s;
    transition: transform 0s, -webkit-transform 0s;
  }

  .ghost {
    opacity: 0.5;
    background: #c8ebfb;
  }
}

._file_input {
  // height: 229px;
  @include background-theme("button_auxiliary_bgcolor");
  // margin: 15px 0;
  padding: 7px 15px;

  .van-cell {
    padding: 0rem;
  }
  ._file {
    margin-bottom: 8px;
    // padding: 5px;
    ::v-deep .van-field__control {
      font-size: var(--font_size_2);
    }
    // box-shadow: rgba(149, 157, 165, 0.3) 0px 2px 9px;
    // border: 1px solid #cfcfcf;
  }
  .input-box {
    padding-bottom: 3px;
    width: 100%;
    position: relative;
    &::after {
      position: absolute;
      box-sizing: border-box;
      content: " ";
      pointer-events: none;
      right: -15px;
      bottom: 0;
      left: -15px;
      border-bottom: 1px solid #cfcfcf;
      -webkit-transform: scaleY(0.5);
      transform: scaleY(0.5);
    }
  }

  .mould {
    display: flex;
    justify-content: flex-end;
    padding-top: 10px;
    align-items: flex-end;

    .show-more {
      @include font-theme("normal");
    }

    .ideal-span {
      margin-left: 5px;
      @include font-theme("normal");
    }

    .mould-button {
      margin-left: 10px;
      margin-right: 3px;
      font-size: var(--font_size_4);
      @include font-theme("normal");
      border: 1px solid;
      @include border-color-theme("normal", true);
      padding: 5px 6px;
      border-radius: 2px;
    }
    img {
      display: inline-block;
      width: 24px;
      height: 24px;
      margin-bottom: 10px;
    }
  }

  ::v-deep ._file_log {
    display: flex;
    flex-wrap: wrap;
    align-items: baseline;
    width: 100%;
    // min-height: 50px;
    max-height: 68px;
    overflow: hidden;
    padding-bottom: 0;

    .van-tag--medium {
      // font-size: var(--font_size_3);
      // @include font-theme("normal");
      // color: #fff;
      // @include font_6;
      // @include background-theme("normal");
    }
  }

  ._file_tags {
    display: inline-block;
    font-size: var(--font_size_3);
    margin-right: 8px;
    margin-bottom: 8px;
    padding: 5px 10px;
    border-radius: 3px;
    word-break: break-all;
    background-color: #eee;
    color: #333;
  }

  ._file_icon {
    display: flex;
    justify-content: flex-end;
    align-items: center;

    .iconfont {
      @include font-theme("normal");
      @include font_4;
      margin-right: 30px;

      &:last-child {
        margin-right: 0;
      }
    }
  }
  .opinions{
    @include font-theme("normal");
    font-size: var(--font_size_3);
  }
  .setting {
    @include font-theme("normal");
    font-size: var(--font_size_3);
    margin: 10px 0;
    flex-shrink: 0;
    img {
      display: inline-block;
      width: 17px;
      height: 17px;
      vertical-align: sub;
    }
  }
}
.attachWrap {
  display: flex;
  flex-wrap: wrap;
  margin: 0 10px;
  .attach {
    width: calc(100% / 4 - 12px);
    margin: 6px;
    word-break: break-all;
    padding: 6px;
    background: #eee;
    border-radius: 3px;
    position: relative;
    .title {
      line-height: 16px;
      height: 48px;
      font-size: var(--font_size_4);
      @include multi-ellipsis(3);
    }
    .icon {
      padding-top: 6px;
      font-size: 10px;
      img {
        height: 16px;
        width: auto;
        display: inline-block;
        margin-right: 4px;
        vertical-align: bottom;
      }
    }
    .del {
      position: absolute;
      color: #ccc;
      top: -6px;
      right: -6px;
      i {
        font-size: var(--font_size_4);
      }
    }
  }
}
.iconWrap {
  margin: 6px 15px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  &.hasText p {
    display: flex;
    align-items: center;
    margin-left: 10px;
    background: #f2f2f2;
    padding: 5px;
    border-radius: 3px;
    span {
      margin-left: 5px;
    }
  }
  img {
    display: inline-block;
    width: 21px;
    height: 21px;
    vertical-align: baseline;
  }
  i {
    font-size: 21px;
    color: var(--normal);
  }
}
.switchMode {
  padding: 6px 15px;
  text-align: right;
  p {
    display: inline-block;
    padding: 5px;
    background-color: #f2f2f2;
  }
  span {
    display: inline-block;
    transform: rotate(90deg);
    color: var(--normal);
    vertical-align: middle;
    margin-right: 5px;
  }
  i {
    font-size: 17px;
  }
}
</style>

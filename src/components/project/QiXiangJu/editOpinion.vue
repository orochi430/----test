<template>
  <div class="opintionView">
    <van-popup v-model="isShow" position="bottom" get-container="#app" round>
      <van-nav-bar
        title="填写意见"
        left-text="取消"
        @click-left="Show()"
        right-text="设为常用意见"
        @click-right="addTemplate"
      >
      </van-nav-bar>
      <van-cell-group class="_file" v-if="isSign == 0">
        <van-field
          ref="editOpinion"
          :error-message="errorMessage"
          v-model="value"
          type="textarea"
          rows="10"
          autofocus
          autosize
          placeholder="请输入意见"
        />
      </van-cell-group>
      <OpinionSign
        :signName="signName"
        :signTime="signTime"
        v-else
      ></OpinionSign>
      <div class="_file_log" v-if="tags.length">
        <van-tag
          v-for="(item, index) in tags"
          :key="index"
          class="_file_tags"
          size="medium"
          type="primary"
          :closeable="true"
          @close="clearTags(item)"
          @click="addContent(item)"
          >{{ item.context }}</van-tag
        >
      </div>
      <van-goods-action>
        <debounce-click>
          <van-goods-action-button
            type="default"
            @click="saveOpinion()"
            text="保存"
          />
        </debounce-click>
        <debounce-click>
          <van-goods-action-button
            type="theme"
            @click="subOpinion()"
            text="提交"
          />
        </debounce-click>
        <debounce-click>
          <van-goods-action-button
            type="theme"
            @click="Sign()"
            :text="isSign ? '取消签字' : '签字'"
          />
        </debounce-click>
      </van-goods-action>
    </van-popup>
  </div>
</template>

<script>
import DebounceClick from "@/components/common/debounceClick.jsx";
import OpinionSign from "@/components/common/OpinionSign";
export default {
  name: "controlOpintionBtn",
  components: { DebounceClick, OpinionSign },
  props: {
    formData: {
      type: Object,
      default: () => {
        return {};
      },
    },
    formMeta: {
      type: Object,
      default: () => {
        return {};
      },
    },
  },
  data() {
    return {
      isShow: false,
      value: "",
      tags: [],
      opinionRequired: 1,
      errorMessage: "",
      _loading: "",
      flowKey: "",
      customNode: "",
      customId: "",
      xpath: "",
      isSign: 0,
      signName: "",
      signTime: "",
      user: dsf.util.loadSessionStore("user"),
    };
  },
  mounted() {
    this.getAdvice();
  },
  computed: {},
  watch: {
    value(nv) {
      if (nv.length > 0) {
        this.errorMessage = "";
      }
    },
  },
  methods: {
    Sign() {
      if (this.isSign) {
        this.isSign = 0;
      } else {
        this.value = "";
        this.isSign = 1;
        this.signName = this.user.name;
        this.signTime = dsf.date.format(new Date(), "yyyy-mm-dd");
      }
    },
    addContent(item) {
      this.value = item.context;
      this.isSign = 0;
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
        });
    },
    // 获取常见意见模板
    getAdvice() {
      dsf.http.get("fn/mobileUsedOpinion/find").then((res) => {
        this.tags = res.data.rows;
      });
    },
    addTemplate() {
      if (this.value != "") {
        dsf.http
          .post("fn/mobileUsedOpinion/add", {
            __DATA: JSON.stringify({
              opinion: this.value,
            }),
          })
          .then((data) => {
            this.getAdvice();
          });
      } else {
        dsf.layer.toast("请输入内容");
      }
    },
    subOpinion() {
      this.saveOpinion("send");
    },
    //保存意见
    saveOpinion(isSend) {
      this.formData.flowinfo = {
        [this.flowKey]: {
          id: this.customId,
          fid: this.formMeta.parameters.pnId,
          infoId: this.formMeta.parameters.pk,
          pid: this.formMeta.parameters.pId,
          pnid: this.formMeta.parameters.pnId,
          nodeId: this.formMeta.parameters.nodeId,
          wfId: this.formMeta.parameters.flowId,
          opinionContent: this.value,
          handwritePic: "",
          handwriteThumb: "",
          nodeName: this.formMeta.parameters.nodeName,
          isSign: this.isSign,
          signName: this.signName,
          signTime: this.signTime,
          opinionUsers: "",
          opinionUsersText: "",
          duserId: this.user.user_id,
          duserName: this.user.name,
          userId: this.user.user_id,
          userName: this.user.name,
          opinionFiles: [],
          customNode: this.customNode,
          customId: this.customId,
          editOpinionUser: this.user.name,
          editOpinionUserId: this.user.user_id,
        },
      };
      console.log(this.formData.flowinfo);
      this.$emit("setOpinion", { content: this.value, isSign: this.isSign });
      this.Show();
      if (isSend) {
        this.$emit("send");
      }
    },
    Show() {
      this.isShow = !this.isShow;
    },
    setXpath(val) {
      this.xpath = val;
      this.flowKey = `flow-${this.formMeta.parameters.pk}-${
        this.formMeta.parameters.pId || 0
      }-${this.formData.pnId || this.formMeta.parameters.pk}-${
        this.xpath || "QlMfchQAgMraxzKv"
      }`;
      console.log(this.flowKey);
      // 获取意见指定节点
      dsf.http
        .get("fn/mobileTodo/getCustomNode", {
          pk: this.formMeta.parameters.pk,
          userId: this.user.user_id,
          xpath: this.xpath,
        })
        .then((res) => {
          this.customNode = res.data.customNode || "";
          this.customId = res.data.customId || "";
        });
    },
  },
};
</script>

<style lang="scss" scoped>
@import "src/assets/styles/themes.scss";
@import "src/assets/styles/mixin.scss";

.opintionView {
  width: 100%;
}

.opinionRequired {
  border: 1px solid #ef8e8e;
}

::v-deep .van-field__value {
  padding: 5px;
  box-shadow: rgba(149, 157, 165, 0.3) 0px 2px 9px !important;
}

::v-deep ._file_log {
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  min-height: 50px;
  max-height: 150px;
  overflow-y: auto;
  padding: 0.2rem;

  .van-tag--medium {
    @include font_6;
    @include font-theme("normal");
    @include lighter-background-theme("normal", true);
  }
}

._file_tags {
  margin-right: 8px;
  margin-bottom: 8px;
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

.van-goods-action {
  padding: 10px;
  position: relative;

  .van-button {
    border-radius: 0 !important;
    // margin: 0 !important;
    margin-left: 10px !important;
    border: 1px solid;
    @include border-color-theme("normal");
    //border-right: 0;
  }
}
</style>

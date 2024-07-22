<template>
  <!-- <div class="controlTextarea" :style="{paddingLeft:!readonly?'0.32rem':0}"> -->
  <div class="controlTextarea">
    <!-- <textarea name="" v-model='value.value' :readonly="readonly" class="textareaBox" @input='inpfn' id="" :placeholder="controlData.placeholder" rows="3" :maxlength='controlData.maxlength'></textarea> -->
    <div class="opinion-temp" v-if="!readonly && isOpinionTemplate">
      <div :class="[opinionShowmore ? '_file_log_open' : '_file_log']">
        <van-tag v-for="(item, index) in tags" :key="index" :class="['_file_tags', 'elps']" size="medium" type="primary" @click="inputContent(item)">{{ item.context }}</van-tag>
      </div>
      <div class="setting" @click="showMore">
        {{ opinionShowmore ? '收起' : '展开' }}
      </div>
    </div>
    <van-field
      v-if="!readonly"
      v-model="value.value"
      :rows="readonly ? 1 : metaData.extra.defaultRow || 3"
      autosize
      type="textarea"
      :readonly="readonly"
      @input="inpFn"
      @focus="toFocus"
      @blur="toBlur"
      :placeholder="controlData.placeholder"
      :maxlength="controlData.maxlength"
      :class="{ textareaBox: !readonly }"
      :style="metaData.autosizeStyle"
    />
    <div v-else class="van-cell van-field readonlyBox" ref="controlTextarea">
      <span :class="['van-field__control', {'isEllipsis': !isExpand}]" v-html="value.value">
      </span>
      <span v-if="expandAble" :class="['expand','van-field__control']" style="color: var(--normal) !important;" @click="isExpand = !isExpand">{{isExpand ? '收起' : '... 展开'}}</span>
    </div>
    <div v-show="showOneRow" class="van-cell van-field readonlyBox" ref="oneRow">
      单行
    </div>
    <van-field
      class="dreamInput"
      v-model="value.value"
      type="textarea"
      rows="1"
      autosize
      :rules="controlData.rules"
      :maxlength="controlData.maxlength"
      :show-word-limit="controlData.showWordLimit"
      :readonly="readonly"
      :placeholder="controlData.placeholder"
      :name="metaData && metaData.metaId ? metaData.metaId : ''"
    />
  </div>
</template>

<script>
import propMixin from "./mixin"

export default {
  name: "controlTextarea",
  mixins: [propMixin],
  // extends:controlTextBox,
  props: {
    subFormIndex: {
      type: Number,
      default: null
    },
    formId: {
      // 子表id
      type: String,
      default: null
    }
  },
  data() {
    return {
      bindValue: "",
      controlData: {
        rules: [],
        maxlength: null,
        showWordLimit: true,
        placeholder: ""
      },
      readonly: false,
      expandAble: false,
      isExpand: true,
      showOneRow: true,
      lineHeight: 0,
      isOpinionTemplate: false,
      tags: [],
      opinionShowmore: false,
    }
  },
  methods: {
    inpFn(val) {
      this.$bus.emit("textareaInpBus", {
        ...this.value,
        metaData: this.metaData,
        subFormIndex: this.subFormIndex,
        subFormId: this.formId
      })
    },
    toFocus(val) {
      this.$bus.emit("textareaFocusBus", {
        ...this.value,
        metaData: this.metaData,
        subFormIndex: this.subFormIndex,
        subFormId: this.formId
      })
    },
    toBlur() {
      this.$bus.emit("textareaBlurBus", {
        ...this.value,
        metaData: this.metaData,
        subFormIndex: this.subFormIndex,
        subFormId: this.formId
      })
    },
    // 获取常见意见模板
    getAdvice() {
      dsf.http.get("fn/mobileUsedOpinion/find").then((res) => {
        this.tags = res.data.rows;
      });
    },
    inputContent(item) {
      this.$bus.emit("textareaTemp", {
        template: item,
        metaData: this.metaData,
      })
    },
    showMore() {
      this.opinionShowmore = !this.opinionShowmore;
    }
  },
  watch: {
    'metaData.propertyShow': {
      immediate: true,
      handler(newValue, oldValue) {
        if (newValue) {
          this.$nextTick(() => {
            if (dsf.config.commonForm.enableControlTextareaExpand === false) return
            let readOnlyDom = this.$refs.controlTextarea
            if (readOnlyDom?.offsetHeight > (this.lineHeight * (this.metaData.extra.defaultRow || 3))) {
              this.isExpand = false
              this.expandAble = true
            }
          })
        }
      }
    },
    'metaData.showOpinionTem': {
      immediate: true,
      deep: true,
      handler(newValue, oldValue) {
        if (newValue) {
          this.isOpinionTemplate = true;
          this.getAdvice()
        }
      }
    },
  },
  created() {
    console.log(this.value.value)
    // this.controlData.placeholder=this.metaData.placeholder
    if (JSON.stringify(this.metaData.defaultValue) == "{}") {
    } else {
      if (!this.value.value) {
        this.value.value = this.metaData.defaultValue.value
      }
    }
  },
  mounted() {
    let oneRow = this.$refs.oneRow
    this.lineHeight = oneRow.offsetHeight
    this.showOneRow = false
  }
}
</script>

<style lang="scss" scoped>
@import "@/assets/styles/themes.scss";
@import "@/assets/styles/mixin.scss";
.controlTextarea {
  // width: 100%;
  padding-top: 5px;
  .van-cell {
    // padding: 0;
    &::after {
      border: 0;
    }
  }
  .textareaBox {
    // padding: 5px !important;
    // box-shadow: rgba(163, 172, 181, 0.3) 0px 1px 5px;
    // border: 1px solid #CFCFCF;
    // border-radius: 2px;
  }

  ::v-deep .van-field__control {
    text-align: left !important;
  }
  .readonlyBox {
    position: relative;
    line-height: 1.5;
    white-space: pre-wrap;
    .expand {
      position: absolute;
      bottom: 0;
      right: 0;
      background: #fff;
      width: auto !important;
    }
    .isEllipsis {
      @include multi-ellipsis(3)
    }
  }

  .opinion-temp {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;

    ._file_tags {
      display: inline-block;
      font-size: var(--font_size_3);
      margin-right: 6px;
      margin-bottom: 6px;
      padding: 5px 10px;
      border-radius: 3px;
      word-break: break-all;
      background-color: #f4f4f4;
      color: #333;
      max-width: 100%;
    }

    .setting {
      @include font-theme("normal");
      font-size: var(--font_size_3);
      margin: 10px 0 5px 5px;
      flex-shrink: 0;

      img {
        display: inline-block;
        width: 17px;
        height: 17px;
        vertical-align: sub;
      }
    }
  }
}
::v-deep ._file_log {
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  margin-top: 6px;
  width: 100%;
  max-height: 62px;
  overflow: hidden;
  padding-bottom: 0;
}
::v-deep ._file_log_open {
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  margin-top: 6px;
  width: 100%;
  overflow: hidden;
  padding-bottom: 0;
}
</style>
<style lang="scss">
.dreamInput {
  padding-top: 0;

  .van-field__body {
    display: none;
  }
}
</style>

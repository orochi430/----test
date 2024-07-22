<template>
  <div class="box controlCheckBoxWrap">
    <van-field v-model="bindValue" v-if="!readonly" :rules="controlData.rules">
      <template #input>
        <van-checkbox-group
          v-model="result"
          @change="changeGroup"
          direction="horizontal"
          :style="style"
        >
          <div
            class="diaItem flex ac"
            v-for="(item, index) in currentColumns"
            :key="index"
          >
            <van-checkbox
              :name="item.value"
              shape="square"
              icon-size="0.32rem"
              >{{ item.text }}</van-checkbox
            >
          </div>
        </van-checkbox-group>
      </template>
    </van-field>
    <div v-else class="van-cell van-field">
      <span class="van-field__control" v-text="bindValue"></span>
    </div>
  </div>
</template>

<script>
import propMixin from "./mixin";
import controlDialog from "./controlDialog";
export default {
  name: "controlCheckBox",
  mixins: [propMixin],
  model: {
    prop: "value",
    event: "input",
  },
  props: {
    subFormIndex: {
      type: Number,
      default: null,
    },
    formMeta: {
      type: Object,
      default: () => {},
    },
    topformMeta: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      showPopup: false,
      result: [],
      controlData: {
        inputAlign: "left",
        rules: [],
        leftIcon: "", //左icon
        rightIcon: "", //右icon
        disabled: false,
        closeable: true,
        round: true,
        lockScroll: true,
        overlay: true,
        duration: "0.3",
        columnsValue: {
          //对象数组，配置每一组显示的数据
          columns: [],
        },
      },
      currentColumns: [],
      readonly: false,
      ifCheck: false,
    };
  },
  components: {
    controlDialog,
  },
  watch: {
    "metaData.defaultValue": {
      handler(newVal, oldVal) {
        if (newVal.value) {
          this.result = newVal.value.split(",");
        }
      },
      deep: true,
      immediate: true,
    },
    "metaData.enumData": {
      handler(newVal, oldVal) {
        this.controlData.columnsValue.columns = newVal;
        this.currentColumns = newVal;
      },
      deep: true,
      immediate: true,
    },
    "value.value": {
      handler(newVal, oldVal) {
        this.result = newVal ? newVal.split(",") : []
      },
      immediate: true,
    }
  },
  computed: {
    style() {
      return dsf.config.clientType == "mobile" &&
        dsf.config.commonForm.layout == "row" &&
        dsf.config.commonForm.textlayout == "right"
        ? "justify-content: flex-end"
        : "";
    },
    bindValue() {
      if (this.readonly) {
        return this.value.text
      }
      if (this.value.value.length && this.currentColumns.length < 1) {
        return this.value.text;
      }
      if (this.value.value) {
        var str = this.value.value.split(",").map((item) => {
          if (
            this.currentColumns.filter((itm) => {
              return itm.value == item;
            })[0]
          ) {
            return this.currentColumns.filter((itm) => {
              return itm.value == item;
            })[0].text;
          }
        });
        return str.join(",");
      }

      return this.value.value;
    },
  },
  created() {
    this.controlData.columnsValue.columns = this.metaData.enumData;
    this.controlData.placeholder = this.metaData.extra.placeholder;
    this.currentColumns = this.metaData.enumData;
    if (this.metaData.extra && this.metaData.extra.multiple) {
      this.ifCheck = this.metaData.extra.multiple;
    }
    if (
      (this.value.value == '' && this.value.text == '') &&
      JSON.stringify(this.metaData.defaultValue) != "{}" &&
      //   this.metaData.parameters &&
      //   this.metaData.parameters.nodeId &&
      //   this.metaData.parameters.nodeId == "0"
      //metaData没有parameters属性
      this.topformMeta.parameters.nodeId == "0"
    ) {
      var obj = this.value;
      obj.value = this.metaData.defaultValue.value;
      obj.text = this.metaData.defaultValue.text;
      this.$emit("input", obj);
    }
    // this.result = this.value.value ? this.value.value.split(",") : [];
    if (!this.readonly) {
      this.controlData.rightIcon = " iconfont iconchevron-right";
    }
  },
  methods: {
    toClick() {
      if (this.readonly) return;
      this.showPopup = !this.showPopup;
      this.$bus.emit("showCheckBox", this);
    },
    changeGroup(result) {
      this.value.value = this.result.join(",");
      this.showPopup = !this.showPopup;
      var obj = this.value;
      this.currentColumns = this.controlData.columnsValue.columns;
      obj.value = this.result.join();
      obj.text = this.result
        .map((item) => {
          return this.currentColumns.filter((itm) => {
            return itm.value == item;
          })[0].text;
        })
        .join(",");
      this.$emit("input", obj);
      this.$bus.emit("checkVal", {
        ...obj,
        metaData: this.metaData,
        subFormIndex: this.subFormIndex,
      });
    },
  },
};
</script>
<style scoped lang="scss">
@import "../../../assets/styles/themes.scss";
@import "../../../assets/styles/mixin.scss";

.controlCheckBoxWrap {
  width: 100%;
}

.flex {
  display: flex;
}

.ac {
  align-items: center;
}

.je {
  justify-content: flex-end;
}

.jc {
  justify-content: center;
}

.diaBox {
  width: 100%;
  max-height: 400px;
  display: flex;
  flex-direction: column;

  .bottomButton {
    height: 50px;
    width: 100%;

    div {
      flex: 1;
      text-align: center;
      line-height: 50px;
    }

    .confirm {
      @include font-theme("normal");
    }
  }
}

::v-deep .van-checkbox-group {
  width: 100%;
}
::v-deep .van-checkbox--horizontal {
  margin: 0;
}
.diaItem {
  margin: 0.08rem 0.12rem 0.08rem 0;
  // padding-left: 30px;
}
</style>
<style lang="scss">
.controlCheckBoxWrap .van-field__error-message {
  text-align: right;
}

.controlCheckBoxWrap {
  .van-dialog {
    width: 280px;
    // min-height:400px;

    .van-checkbox {
      width: 100%;
    }
  }

  .van-dialog__header {
    padding-top: 15px;
  }
}
</style>

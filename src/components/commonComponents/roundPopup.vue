<template>
  <van-popup
    get-container="#app"
    v-model="isShow"
    position="bottom"
    :round="isRound"
    class="flex dc round-popup"
    :close-on-click-overlay="false"
    :style="{ height: popHeight }"
    @click-overlay="close"
  >
    <div class="popup-title">
      <i size="0.4rem" class="iconfont iconxialajiantou" @click="close" />
      <span>{{ title }}</span>
      <div class="right-icon">
        <slot name="right-icon"></slot>
      </div>
    </div>
    <div class="container" :style="containerStyle">
      <slot name="container"></slot>
    </div>
    <div class="btn" v-if="$slots.btn || isShowConfirmBtn">
      <slot name="btn">
        <van-button v-if="isShowConfirmBtn" type="primary" block @click="confirm">{{ confirmBtnText }}</van-button>
      </slot>
    </div>
  </van-popup>
</template>

<script>
export default {
  props: {
    title: {
      type: String
    },
    show: {
      type: Boolean,
      default: false
    },
    isShowConfirmBtn: {
      type: Boolean,
      default: false
    },
    confirmBtnText: {
      type: String,
      default: "确定"
    },
    popHeight: {
      type: String,
      default: "auto"
    },
    isRound: {
      type: Boolean,
      default: true
    },
    containerStyle: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
    }
  },
  computed: {
    isShow: {
      get() {
        return this.show
      },
      set(value) {
        this.$emit("update:show", value)
      }
    }
  },
  methods: {
    close() {
      this.isShow = false
    },
    confirm() {
      this.$emit("confirm")
    }
  }
}
</script>
<style lang="scss" scoped>
.round-popup {
  .popup-title {
    text-align: center;
    font-size: var(--font_size_2);
    padding: 15px;
    border-bottom: 5px solid #f1f2f4;
    color: #000000;
    position: relative;
    .iconfont {
      position: absolute;
      left: 15px;
      top: 50%;
      transform: translateY(-50%);
    }
    .right-icon {
      position: absolute;
      right: 15px;
      top: 15px;
      color: var(--normal);
    }
  }
  .container {
    flex: 1;
    overflow: auto;
    padding: 12px;
    position: relative;
  }
}
</style>
<style lang="scss">
.round-popup {
  .btn {
    padding: 0 12px;
    border-top: 1px solid #f1f2f4;
    display: flex;
    align-items: center;
    height: 60px;
    button {
      flex: 1;
      &:not(:last-child) {
        margin-right: 10px;
      }
    }
  }
}
</style>

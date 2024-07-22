<template>
  <div class="ds-common-dialog">
    <transition name="__msk">
      <div v-show="showCopy" class="__msk" @click="closeBox">
        <div class="__box" @click.stop="emptyEvent">
          <slot/>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
  export default {
    name: 'CommonDialog',
    props: {
      // 是否打开弹框
      show: {
        type: Boolean,
        default: false
      },
      // 是否可通过点击遮罩关闭弹框
      closeOnClickModal: {
        type: Boolean,
        default: true
      }
    },
    data() {
      return {
        overflow: '',
        showCopy: false
      }
    },
    watch: {
      show(to) {
        this.showCopy = to;
      },
      showCopy (to) {
        if (to) {
          this.overflow = document.body.style.overflow;
          document.body.style.overflow = "hidden";
          this.$emit('update:show', true);
        } else {
          document.body.style.overflow = this.overflow;
          this.$emit('update:show', false);
        }
      }
    },
    created() {
      this.showCopy = this.show;
    },
    destroyed() {
      document.body.style.overflow = this.overflow;
    },
    methods: {
      emptyEvent() {
        // 空事件
      },
      showBox() {
        this.showCopy = true;
      },
      closeBox() {
        if (this.closeOnClickModal) {
          this.showCopy = false;
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
// @import "../../assets/font/font.css";

@import "../../assets/styles/themes.scss";

@import "../../assets/styles/mixin.scss";

.ds-common-dialog{
  position: relative;
  z-index: 999;
  .__msk{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: rgba(0, 0, 0, 0.4);
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    touch-action: none;
    &-enter-active {
      transition: opacity 0.3s ease;
      .__box {
        transition: transform 0.3s ease;
        transform: translate3d(0, 0, 0);
      }
    }
    &-leave-active {
      transition: opacity 0.3s ease;
      .__box {
        transition: transform 0.3s ease;
        transform: translate3d(0, 0, 0);
      }
    }
    &-enter,
    &-leave-to {
      opacity: 0;
      .__box {
        transform: translate3d(0, 20px, 0);
      }
    }
  }
  .__box {
    width: 90%;
    max-width: 500px;
    background-color: #fff;
    border-radius: 5px;
    overflow: hidden;
    position: relative;
  }
}
</style>

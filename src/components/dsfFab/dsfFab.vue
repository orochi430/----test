<template>
<div class="fab-container" v-click-outside="clickOutside">
  <div class="main-btn" @click="clickMain" v-if="fabItems.length > 0">
    <transition name="change" mode="out-in" v-if="fabItems.length > 1">
      <div v-if="!showFab" key="close"><van-icon name="ellipsis" /></div>
      <div v-else key="open"><van-icon name="cross" /></div>
    </transition>
    <i v-else class="iconfont" :class="fabItems[0].icon || 'iconjiahao'" style="font-size: var(--font_size_0);font-weight: bold;"></i>
  </div>
  <transition name="fade" v-if="fabItems.length > 1">
    <div class="fab-btns" v-if="showFab" @click="showFab = !showFab">
      <div class="dsf-fab-item" v-for="(item,index) in fabItems" :key="index" @click="clickItem(item)">
        <i class="iconfont" v-if="item.icon" :class="item.icon"></i>
        <span>{{item[titleKey]}}</span>
      </div>
    </div>
  </transition>

</div>
</template>

<script>
export default {
  props: {
    fabItems: {
      type: Array,
      default: () => []
    },
    titleKey: {
      type: String,
      default: 'title'
    }
  },
  data() {
    return {
      showFab: false,
    }
  },
  directives: {
    clickOutside: {//自定义指令：clickOutside
      bind (el, binding, vnode) {//自定义指令生命周期：bind ；参数：el, bindings, vnode
        const listenClick = (obj, e) => {
          if (obj.el.contains(e.target) || e.target.dataset.outside) {
            return false
          }
          if (obj.binding) {
            if (obj.binding.value) {
              if (typeof obj.binding.value == 'function') {
                return obj.binding.value()
              }
            }
          }
        }
        el.__clickOutside__ = listenClick
        document.addEventListener('click', (e) => listenClick({el, binding},e))
        document.addEventListener('touchend', (e) => listenClick({el, binding},e))
      },
      unbind (el) {//自定义指令生命周期：unbind
        document.removeEventListener('click', el.__clickOutside__)
      }
    }
  },

  methods: {
    clickOutside() {
      this.showFab = false
    },
    clickMain() {
      if(this.fabItems.length == 1) {
        this.clickItem(this.fabItems[0])
      } else {
        this.showFab = !this.showFab
      }
    },
    clickItem(fabItem){
      if(fabItem.type == 'go') {
        fabItem.url ? this.$router.push({path: fabItem.url}) : dsf.layer.toast('未传入跳转地址')
      } else {
        this.$emit('clickItem', fabItem)
      }
    }
  }
}
</script>
<style lang='scss' scoped>
@import '../../assets/styles/themes.scss';
@import '../../assets/styles/mixin.scss';
.fab-container {
  font-size: var(--font_size_3);
  width: 40px;
  height: 40px;
  position: fixed;
  right: 55px;
  z-index: 1111;
  bottom: 20%;
  overflow: initial;
  box-sizing: border-box;
}
.main-btn {
  height: 100%;
  width: 100%;
  border-radius: 50%;
  @include background-theme('normal');
  font-size: var(--font_size_0);
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  left: 0;
  top: 0;
  z-index: 1111;
  border-radius: 50%;
  color: #fff;
  padding: 15px;
  box-shadow: 0 7px 13px 0 rgba(158,158,158,0.50);
  // transition: all 0.2s linear;
  .van-icon{
    font-weight: bold;
    display: block;
  }
  &:active {
    animation: pulsate-bck 0.2s ease-in-out;
  }
}
.fab-btns {
  width: 120px;
  box-sizing: border-box;
  position: absolute;
  left: -40px;
  bottom: 30px;
  background-color: #fff;
  padding: 30px 16px;
  // border: 3px solid #FFFFFF;
  box-shadow: 0 7px 13px 0 rgba(158,158,158,0.50);
  overflow: hidden;
  &::after {
    content: '';
    display: inline-block;
    width: 1rem;
    height: 1rem;
    background: #fff;
    border-radius: 50%;
    position: absolute;
    bottom: -0.7rem;
    left: 0.7rem;
    box-shadow: 0 7px 13px 0 rgba(158, 158, 158, 0.5) inset;
  }
  .dsf-fab-item {
    .iconfont {
      @include font-theme('normal');
      padding-right: 6px;
    }
    padding-bottom: 20px;
    &:last-child{
      padding-bottom: 0;
    }
  }
}
.fab-item {
    transition: all 0.2s linear;
    position: absolute;
    top: -50px;
    width: 80%;
    height: 80%;
    margin-left: 10%;
    border-radius: 50%;
    overflow: inherit;
    @include background-theme('normal');
}
.fade-enter-active {
  animation: scale-in-ver-bottom 0.2s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
}
.fade-leave-active {
  animation: scale-out-ver-bottom 0.2s cubic-bezier(0.550, 0.085, 0.680, 0.530) both;
}
@keyframes scale-in-ver-bottom {
  0% {
    -webkit-transform: scaleY(0);
            transform: scaleY(0);
    -webkit-transform-origin: 0% 100%;
            transform-origin: 0% 100%;
    opacity: 1;
  }
  100% {
    -webkit-transform: scaleY(1);
            transform: scaleY(1);
    -webkit-transform-origin: 0% 100%;
            transform-origin: 0% 100%;
    opacity: 1;
  }
}
@keyframes scale-out-ver-bottom {
  0% {
    -webkit-transform: scaleY(1);
            transform: scaleY(1);
    -webkit-transform-origin: 0% 100%;
            transform-origin: 0% 100%;
    opacity: 1;
  }
  100% {
    -webkit-transform: scaleY(0);
            transform: scaleY(0);
    -webkit-transform-origin: 0% 100%;
            transform-origin: 0% 100%;
    opacity: 1;
  }
}
.change-enter-active {
  animation: rotate-in-2-ccw .2s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
}
.change-leave-active {
  animation: rotate-out-2-ccw .2s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
}
@keyframes rotate-in-2-ccw {
  0% {
    -webkit-transform: rotate(45deg);
            transform: rotate(45deg);
    opacity: 0;
  }
  100% {
    -webkit-transform: rotate(0);
            transform: rotate(0);
    opacity: 1;
  }
}
@keyframes rotate-out-2-ccw {
  0% {
    -webkit-transform: rotate(0);
            transform: rotate(0);
    opacity: 1;
  }
  100% {
    -webkit-transform: rotate(-45deg);
            transform: rotate(-45deg);
    opacity: 0;
  }
}
@keyframes pulsate-bck {
  0% {
    -webkit-transform: scale(1);
            transform: scale(1);
  }
  50% {
    -webkit-transform: scale(1.1);
            transform: scale(1.1);
  }
  100% {
    -webkit-transform: scale(1);
            transform: scale(1);
  }
}
</style>

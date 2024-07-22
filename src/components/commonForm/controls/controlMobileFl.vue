<template>
  <div class="control_mobile_fl column" :style="{padding: getPadding, textAlign: getAlign}" v-if="isShow">
    <span class="left-icon"></span>
    <span class="title" :style="{fontSize: titleFontSize,fontWeight: titleFontWeight}" v-html="label"></span>
    <div class="switch" v-if="showSwitch" :class="{'isOpen': isOpen}">
      <van-switch size="16px" v-model="isOpen" @change="changeControlsShow(isOpen)" inactive-color="#ccc"/>
      <!-- <span>{{switchLabel}}</span> -->
      <!-- <i class="iconfont icongengduo"></i> -->
    </div>
  </div>
</template>

<script>
export default {
  props: ["metaData", "formMeta"],
  inject: ['isMobileForm'],
  data() {
    return {
      // label: this.metaData.label,
      controlId: this.metaData.controlId,
    }
  },
  computed: {
    label(){
      return this.metaData.label.replace(/(^\s*)|(\s*$)/g, "")
    },
    isShow() { // 拟稿且'M-SFZNGJDXS'=-1 不显示
      let hideCtrl = 0
      let AllCtrl = 0
      for(let i=this.index+1; i<this.formMeta.controls.length; i++) {
        if(this.formMeta.controls[i].controlType == "controlMobileFl" || this.formMeta.controls[i].controlType == "controlSubFormPrimary") break
        if (!this.formMeta.controls[i].show) {
          hideCtrl ++
        }
        AllCtrl ++
      }
      // this.metaData.show = AllCtrl == hideCtrl ? 0 : 1
      if (AllCtrl == hideCtrl) return false
      return true
    },

    showSwitch() {
      return this.metaData.extra['M-SFZCSS'] == 1
    },
    switchLabel() {
      return dsf.config.commonForm.controlMobileFlSwitchLabel || (this.isOpen ? '收起' : '展开')
    },
    titleFontSize() {
      let fontSize = 'var(--font_size_1)'
      if(this.metaData.extra['fontSize']) {
        fontSize = `${this.metaData.extra['fontSize'] / 50}rem`
      }
      return fontSize
    },
    titleFontWeight() {
      return this.metaData.extra['fontWeight'] ? this.metaData.extra['fontWeight'] : '600'
    },
    index () {
      return this.formMeta.controls.findIndex(item => item.controlId == this.controlId)
    },
    isOpen: {
      get(val) {
        return this.metaData.extra['M-MRSFSF'] == -1 || this.metaData.extra['M-MRSFSF'] == undefined
      },
      set(val) {
        if (val) {
          this.metaData.extra['M-MRSFSF'] = -1
        } else {
          this.metaData.extra['M-MRSFSF'] = 1
        }
      }
    },
    getAlign() {
      if (this.metaData.extra.eatraClass) {
        if (this.metaData.extra.eatraClass.indexOf("textCenter") > -1) {
          return "center";
        } else {
          return this.metaData.extra.eatraClass
        }
      }
      return "";
    },
    getPadding() {
      if (this.isMobileForm) {
        return '0 0.2rem'
      } else {
        return '0.2rem'
      }
    }
  },
  watch: {
    isOpen: {
      handler(newVal, oldVal) {
        for(let i=this.index+1; i<this.formMeta.controls.length; i++) {
          // if(this.formMeta.controls[i].controlType == "controlMobileFl" || this.formMeta.controls[i].controlType == "controlSubFormPrimary") break
          // 收缩控件能控制子表
          if(this.formMeta.controls[i].controlType == "controlMobileFl") break
          if(this.formMeta.controls[i].extra.openFold > 0) {
            this.formMeta.controls[i].propertyShow = this.formMeta.controls[i].privilege.visible ? newVal : false // 只有visible为true时才根据实现显示隐藏功能
          }
        }
      },
      immediate: true
    }
  },
  created(){
  },
  methods: {
    changeControlsShow(val, isFont=false) {
      if(isFont) this.isOpen = !val
    }
  }
}
</script>
<style lang='scss' scoped>
@import '../../../assets/styles/themes.scss';
@import '../../../assets/styles/mixin.scss';
.column {
  // border-bottom: 2px solid #fff;
  // background-color: #f5f5f5;
  position: relative;
  color: #333;
  .left-icon {
    display: inline-block;
    height: 14px;
    width: 4px;
    border-radius: 2px;
    margin: 0 5px;
    @include background-theme('normal');
  }
  .switch {
    display: flex;
    align-items: center;
    position: absolute;
    top: 50%;
    right: 16px;
    transform: translateY(-50%);
    span {
      padding-left: 10px;
    }
    .iconfont {
      transform: rotate(90deg);
      transition: transform 0.3s, -webkit-transform 0.3s;
    }
  }
  .isOpen {
    .iconfont {
      transform: rotate(-90deg);
    }
  }
}
</style>

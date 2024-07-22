<template>
  <div class="setFontSize">
    <van-nav-bar title="设置字体大小" left-text="返回" left-arrow @click-left="back">
      <template #right>
        <span class="color_green font_17" @click="confirm">使用</span>
      </template>
    </van-nav-bar>
    <formTab :formData="formData" :formMeta="formMeta"></formTab>
    <div class="slider" style="padding: 20px 20px 36px">
      <div class="fontA">
        <span v-for="className in fontSizeClassArr" :key="className.value" :style="{ fontSize: className.slider == 0 ? '0.28rem' : '0.32rem' }">
          {{ className.text }}
        </span>
      </div>
      <van-slider v-model="value" active-color="#ee0a24" :step="1" :min="0" :max="1">
      </van-slider>
    </div>
  </div>
</template>

<script>
import { Slider } from "vant"
import formTab from "@/components/commonForm/tabComponents/formTab"
export default {
  components: { [Slider.name]: Slider, formTab },
  data() {
    return {
      fontSizeClassArr: [
        {
          text: "中",
          value: "middle-font-size",
          slider: 0
        },
        {
          text: "大",
          value: "large-font-size",
          slider: 1
        }
      ],
      value: 1,
      oldClass: "",
      newClass: "",
      formData: {
        main: {
          A0001: { value: "预览字体大小" },
          A0002: { value: "拖动下面的滑块，可设置字体大小" },
          A0003: { value: "设置后，会改变整体应用的字体大小，如使用过程中存在问题，请反馈给开发团队" }
        }
      },
      formMeta: {
        controls: [
          {
            controlId: "BKEK9XriZnDZGCm9",
            controlType: "controlTextBox",
            defaultValue: {},
            enumData: [],
            extra: {},
            label: "字体大小",
            metaId: "A0001",
            placeholder: {},
            privilege: {
              editable: false,
              visible: true
            },
            restrict: {},
            show: 1,
            propertyShow: 1,
            showLabel: true,
            showLable: true,
            validator: {}
          },
          {
            controlId: "jMaHocndkoqROCCj",
            controlType: "controlTextBox",
            defaultValue: {},
            enumData: [],
            extra: {},
            label: "设置方式",
            metaId: "A0002",
            placeholder: {},
            privilege: {
              editable: false,
              visible: true
            },
            restrict: {},
            show: 1,
            propertyShow: 1,
            showLabel: true,
            showLable: true,
            validator: {}
          },
          {
            controlId: "BKEK9XriZnDZGCm0",
            controlType: "controlTextBox",
            defaultValue: {},
            enumData: [],
            extra: {},
            label: "示例",
            metaId: "A0003",
            placeholder: {},
            privilege: {
              editable: false,
              visible: true
            },
            restrict: {},
            show: 1,
            propertyShow: 1,
            showLabel: true,
            showLable: true,
            validator: {}
          }
        ],
        parameters: {}
      }
    }
  },
  computed: {},
  watch: {
    value(newValue, oldValue) {
      console.log(newValue)
      let fontSizeClass = this.fontSizeClassArr.find(item => item.slider == newValue).value
      let oldClass = $("body").attr("class").split(' ').find(item => item.indexOf('font-size') > -1) || ''
      this.newClass = fontSizeClass
      $('body').removeClass(oldClass)
      $('body').addClass(this.newClass)
    }
  },
  created() {
    this.oldClass = $("body").attr("class").split(' ').find(item => item.indexOf('font-size') > -1) || ''
    console.log(this.fontSizeClassArr.find(item => item.value == this.oldClass))
    this.value = this.fontSizeClassArr.find(item => item.value == this.oldClass)?.slider
    console.log(this.value)
  },
  methods: {
    confirm() {
      dsf.util.saveToLocalStore('fontSizeClass', this.newClass)
      this.$router.go(-1)
    },
    back() {
      console.log(this.newClass, this.oldClass)
      $("body").removeClass(this.newClass)
      $("body").addClass(this.oldClass)
      this.$router.go(-1)
    }
  }
}
</script>
<style lang="scss" scoped>
.setFontSize {
  width: 100%;
  .slider {
    position: fixed;
    bottom: 0;
    width: 100%;
    background-color: #fff;
  }
  ::v-deep .van-nav-bar {
    .van-nav-bar__title {
      font-weight: bold;
    }
  }
  .fontA {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    padding-bottom: 10px;
  }
  ::v-deep .van-slider__button {
    width: 18px;
    height: 18px;
  }
}
</style>
<style lang="scss">
.setFontSize{
  .formLayout{
    .van-field {
      font-size: var(--font_size_2);
    }
  }
}
</style>

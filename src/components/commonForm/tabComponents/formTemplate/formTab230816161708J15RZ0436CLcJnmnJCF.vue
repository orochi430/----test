<template>
  <van-form validate-trigger="onChange" class="commonForm" ref="commonForm" v-if="formData.main != undefined && formMeta.controls != undefined">
    <div
      class="formLayout formTab230816161708J15RZ0436CLcJnmnJCF"
      ref="form"
      :style="{ margin: isMobileForm ? dsf.config.commonForm.formPadding || '' : '0.32rem', borderTop: isMobileForm ? '' : '1px solid #333' }"
    >
      <van-row type="flex" class="box" v-for="(row, rowindex) in controlRows" :key="row.rowindex">
        <template v-for="(col, index) in row">
          <van-col
            :span="24 / row.length"
            :id="`row${rowindex + 1}_col${index + 1}`"
            :style="{ backgroundColor: !isMobileForm ? '#fff' : '' }"
            :class="{ padLeftRight: !isMobileForm }"
          >
            <div
              v-for="item in col"
              v-if="item"
              :key="item.controlId"
              style="padding: 0"
              :style="{ height: col.length == 1 ? '100%' : '' }"
              :class="classDivider(item, rowindex)"
              :id="`ctr_${item.controlId}`"
            >
              <transition name="fade">
                <form-layout
                  v-show="item.show && item.propertyShow"
                  :isMobileForm="isMobileForm"
                  :rowCteNum="row.length"
                  :allFile="allFile"
                  :ref="item.metaId"
                  @controlEditOpinion="controlEditOpinion"
                  @controlShareOpinion="controlShareOpinion"
                  :parameters="formMeta.parameters"
                  :controlData="getData(item)"
                  :metaData="item"
                  :formData="formData"
                  :formMeta="formMeta"
                  :topformData="formData"
                  :topformMeta="formMeta"
                  :relationList="relationList"
                  :form-params="formParams"
                  :labelSpan="labelSpan"
                ></form-layout>
              </transition>
            </div>
          </van-col>
        </template>
      </van-row>
      <transition name="hide">
        <dsf-fab v-show="isShowTop" :fab-items="btn" @clickItem="btnAction"></dsf-fab>
      </transition>
    </div>
  </van-form>
</template>

<script>
import formLayout from "../../formLayout"
import dsfFab from "@/components/dsfFab/dsfFab"
export default {
  name: "formTab",
  props: ["formData", "formMeta", "allFile", "relationList", "isFromList", "formParams"],
  components: {
    formLayout,
    dsfFab
  },
  provide() {
    return {
      isMobileForm: this.isMobileForm
    }
  },
  data() {
    return {
      blocks: [],
      controlRows: [],
      btn: [
        {
          icon: "iconchevron-double-up",
          title: "置顶",
          type: "event", // 'event'
          action: "goTop"
        }
      ],
      isShowTop: false,
      timeout: null,
      scrollTop: 0,
      scrollContainer: ""
    }
  },
  watch: {
    formMeta: {
      deep: true,
      immediate: true,
      handler(newValue, oldValue) {
        if (!newValue.rows) {
          if (oldValue == null) {
            //当前暂未发现为什么监控会进入两次，导致页面控件重复显示，先增加判断，后面再找原因
            this.controlRows = []
            newValue.controls.forEach(item => {
              this.controlRows.push([[item]])
            })
          }
        } else {
          // 找到rows中的对应的controls放进新数组
          newValue.rows.forEach(row => {
            this.controlRows[row.rowindex] = []
            if (row.controlsNew) {
              row.controlsNew.forEach((col, colIndex) => {
                this.controlRows[row.rowindex].push([])
                col.forEach(controlId => {
                  this.controlRows[row.rowindex][colIndex].push(newValue.controls.find(item => item.controlId == controlId))
                })
              })
            } else {
              row.controls.forEach(controlId => {
                this.controlRows[row.rowindex].push([newValue.controls.find(item => item.controlId == controlId)])
              })
            }
          })
        }
      }
    }
  },
  computed: {
    isMobileForm() {
      // 接口返回formType==3则表示配置的pad表单，如果无formType则依旧根据设备类型显示
      return false
    },
    classDivider() {
      return (item, index) => {
        if (!this.isMobileForm) {
          return "padDivider"
        } else {
          if (item.controlType != "controlMobileFl" && index < this.controlRows.length - 1) {
            let nextControl = this.getNextCtronl(index)
            if (nextControl) {
              return "divider"
            }
          }
        }
      }
    },
    labelSpan() {
      return this.$store.state.clientType == "mobile" ? 7 : 5
    }
  },
  created() {},
  mounted() {
    if (document.querySelector(".van-tabs__content")) {
      this.scrollContainer = document.querySelector(".van-tabs__content")
    } else if (document.querySelector(".formBox")) {
      this.scrollContainer = document.querySelector(".formBox")
    }
    if (this.scrollContainer) {
      this.scrollContainer.addEventListener("scroll", () => {
        clearTimeout(this.timeout)
        this.isShowTop = true
        this.timeout = setTimeout(() => (this.isShowTop = false), 2000)
      })
    }
    // 处理头部文字
    this.handleHeaderLabel()
    // 意见输入控件吸底
    // this.handleControlEditOpinion()
  },
  updated() {
    //console.log('formTab')
  },
  methods: {
    handleControlEditOpinion() {
      let ctr = this.formMeta.controls.find(ctr => ctr.controlType == "controlEditOpinion" && ctr.privilege.editable)
      if (ctr) {
        // if (this.formMeta.parameters.isopenHandwrite == 1) {
        //   ctr.show = 0
        // } else {
          $(`#ctr_${ctr.controlId}`).addClass("fixedOpinion")
          $(".formTab230816161708J15RZ0436CLcJnmnJCF").css("margin-bottom", '3.2rem')
        // }
      }
    },
    handleHeaderLabel() {
      if (this.controlRows[0] && this.controlRows[0][0] && this.controlRows[0][0][0]?.controlType == "LabelForTextControl") {
        $("#row1_col1").removeClass("padLeftRight").addClass("title")
        $(".formTab230816161708J15RZ0436CLcJnmnJCF").addClass("noborder")
      }
      if ($("#row2_col1").find(".controlFileCode").length && $("#row2_col1").children().length == 1) {
        $("#row1_col1").find('.padDivider').addClass("noAfter")
        $("#row2_col1").removeClass("padLeftRight").addClass('noDivider')
      }
    },
    getNextCtronl(index) {
      //寻找下一个控件，直到下一个控件是显示的为止，如果下面的控件都不显示也不需要下面的下划线 2023年4月17日23:05:05@luy
      if (index == this.controlRows.length - 1) return null
      let nextControl = this.controlRows[index + 1][0][0]
      if (nextControl?.controlType == "controlMobileFl" && nextControl.show) {
        return null
      } else if (nextControl?.propertyShow && nextControl?.show) {
        return nextControl
      } else {
        return this.getNextCtronl(index + 1)
      }
    },
    btnAction(val) {
      console.log(val)
      this[val.action]()
    },
    getData(item) {
      return this.formData.main[item.metaId]
    },
    controlEditOpinion(val) {
      //console.log(val)
      if(!this.formData.flowinfo) this.$set(this.formData, 'flowinfo', {})
      this.formData.flowinfo[val.key] = val.value;
      //console.log(this.formData)
    },
    controlShareOpinion(val) {
      //console.log(val)
      this.formData.distribinfo = val
      //console.log(this.formData)
    },
    goTop() {
      this.$nextTick(() => {
        this.scrollContainer.scrollTop = 0
        this.isShowTop = false
        clearTimeout(this.timeout)
      })
    }
  },
  beforeDestroy() {
    if (this.scrollContainer) {
      this.scrollContainer.removeEventListener("scroll", () => {
        clearTimeout(this.timeout)
        this.isShowTop = true
        this.timeout = setTimeout(() => (this.isShowTop = false), 2000)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import "@/assets/styles/themes.scss";
@import "@/assets/styles/mixin.scss";
.commonForm {
  overflow: auto;
}
.formLayout {
  // padding: 0 5px;
  .van-field__control {
    line-height: initial;
  }
  fieldset {
    width: 100%;
    border: 3px solid rgba(0, 0, 0, 0.2);

    legend {
      @include font-theme("normal");
      padding: 5px;
      font-weight: 600;
      font-size: 0.32rem;
      line-height: 0.4rem;
    }
  }
  & > .box {
    & > .van-col {
      min-height: 0;
    }

    .padLeftRight {
      position: relative;
      // pad表单单元格的左右边线用伪元素代替，解决border占宽导致一行多列时边框对不齐问题
      &::before {
        content: " ";
        position: absolute;
        box-sizing: border-box;
        z-index: 1;
        top: 0;
        bottom: 0;
        left: 0;
        border-left: 1px solid #333;
      }
      &:last-child {
        &::after {
          content: " ";
          display: block;
          position: absolute;
          box-sizing: border-box;
          top: 0;
          bottom: 0;
          right: 0;
          border-left: 1px solid #333;
        }
      }
    }
    .padDivider {
      position: relative;
      &::after {
        position: absolute;
        box-sizing: border-box;
        content: " ";
        pointer-events: none;
        right: 0;
        bottom: 0;
        left: 0;
        border-bottom: 1px solid #333;
      }
    }
    .divider > div {
      position: relative;
      &::after {
        position: absolute;
        box-sizing: border-box;
        content: " ";
        pointer-events: none;
        right: 16px;
        bottom: 0;
        left: 16px;
        border-bottom: 1px solid #cfcfcf;
        -webkit-transform: scaleY(0.5);
        transform: scaleY(0.5);
      }
    }
  }
}
</style>
<style lang="scss">
.formTab230816161708J15RZ0436CLcJnmnJCF {
  &.noborder {
    border-top: 0 !important;
  }
  // padding: 5px;
  background-color: #fff;
  margin: 10px !important;
}
.formTab230816161708J15RZ0436CLcJnmnJCF > .box {
  .noAfter::after {
    border: 0 !important;
  }
  .noDivider .pad_layout_box > .van-col:first-child:after {
    border: 0 !important;
  }
  #row1_col1.title .pad_layout_box {
    text-align: center;
    padding-bottom: 26px;
  }
  .pad_layout_box .control_label {
    font-weight: 800;
    // justify-content: center;
    padding: 0 9px;
  }
  .pad_layout_box > .van-col {
    .readonly-font .van-field__control:read-only {
      color: #333 !important;
    }
    .fileTitle {
      color: var(--normal);
      text-overflow: inherit;
      white-space: inherit;
    }
    &:first-child:after {
      border-right: 1px solid #333;
    }
    &:only-child:after {
      border: 0;
    }
  }
  .pad_layout_box .fileTypeList {
    padding: 0 !important;
    // display: flex;
    // align-items: start;
    // .list-group {
    //   flex: 1;
    //   overflow: hidden;
    //   margin-left: 10px;
    //   .fileList:first-child {
    //     padding: 0;
    //   }
    // }
  }
  .pad_layout_box .controlOpinionView .opinionBox .opinionText {
    font-size: var(--font_size_2);
    font-weight: normal;
    text-indent: 0;
    padding-bottom: 0.1rem;
  }
  .controlEditOpinion .input-box {
    border-color: #333;
  }
  .fixedOpinion .pad_layout_box {
    position: fixed;
    bottom: 60px;
    left: 0;
    right: 0;
    z-index: 100;
    height: auto;
    border-top: 1px solid #333;
    .noPadding {
      padding: 0 0.2rem;
    }
    .input-box {
      border-color: #333;
    }
    .controlTextBox {
      // background-color: #fff5da;
      padding: 6px !important;
    }
  }
}
</style>

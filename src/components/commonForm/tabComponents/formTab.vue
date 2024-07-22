<template>
  <component
    v-if="templateComponent"
    :is="templateComponent"
    :formData="formData"
    :formMeta="formMeta"
    :allFile="allFile"
    :relationList="relationList"
    :isFromList="isFromList"
    :formParams="formParams"
  ></component>
  <van-form validate-trigger="onChange" class="commonForm" ref="commonForm" v-else-if="formData.main != undefined && formMeta.controls != undefined">
    <!-- 特殊显示标题栏 -->
    <specialTitle v-if="dsf.config.commonForm.specialTitle && $route.params.pk && !isFromList" :formData="formData" :formMeta="formMeta"></specialTitle>
    <div class="formLayout" ref="form" :style="{ margin: isMobileForm ? dsf.config.commonForm.formPadding || '' : '0.32rem', borderTop: isMobileForm ? '' : '1px solid #f5f5f5' }">
      <van-row type="flex" :class="['box', { rowWrap: isMobileForm }, getRowClass(row, rowindex)]" v-for="(row, rowindex) in controlRows" :key="row.rowindex">
        <template v-for="(col, index) in row">
          <van-col
            :span="24 / row.length"
            :id="`row${rowindex + 1}_col${index + 1}`"
            :style="{ backgroundColor: !isMobileForm ? '#fff' : '' }"
            :class="{ padLeftRight: !isMobileForm }"
          >
            <div
              :class="['controlDiv', item.controlType, classDivider(item, col, ctrIndex)]"
              v-for="(item, ctrIndex) in col"
              v-if="item"
              :key="item.controlId"
              :style="{ height: col.length == 1 ? '100%' : '', padding: 0 }"
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
      <transition name="hide" v-if="!dsf.config.commonForm.noShowDsfFab">
        <dsf-fab v-show="isShowTop" :fab-items="btn" @clickItem="btnAction" style="right: 0.2rem"></dsf-fab>
      </transition>
    </div>
  </van-form>
</template>

<script>
import formLayout from "./../formLayout"
import dsfFab from "@/components/dsfFab/dsfFab"
import specialTitle from "../controls/specialTitle"
import allComps from "./formTemplate"
export default {
  name: "formTab",
  props: ["formData", "formMeta", "allFile", "relationList", "isFromList", "formParams"],
  provide() {
    return {
      isMobileForm: this.isMobileForm
    }
  },
  components: {
    formLayout,
    dsfFab,
    specialTitle,
    ...allComps
  },
  data() {
    return {
      blocks: [],
      controlRows: [],
      btn: [
        {
          icon: "iconhuidaodingbu",
          title: "置顶",
          type: "event", // 'event'
          action: "goTop"
        }
      ],
      isShowTop: false,
      timeout: null,
      scrollTop: 0,
      scrollContainer: "",
      templateComponent: "",
      labelSpan: dsf.config.commonForm.padLabelSpan || 4
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
    },
    controlRows: {
      deep: true,
      immediate: true,
      handler(newValue, oldValue) {
        this.$nextTick(() => {
          $(".formLayout > .rowWrap").each(function () {
            if ($(this).find(".controlMobileFl").length) {
              $(this).addClass("flRow")
              $(this).removeClass("rowWrap")
            }
            if ($(this).find(".controlSubFormPrimary").length) {
              $(this).addClass("SubFormRow")
              $(this).removeClass("rowWrap")
            }

            if (($(this).find(".hideDiv").length == $(this).find(".controlDiv").length || !$(this).find(".controlDiv").length) && !$(this).find(".card").length) {
              $(this).addClass("noWrap")
            } else {
              $(this).removeClass("noWrap")
            }
          })
          //先定义数组，用于存储芬兰所在的位置
          function checkOnLy(obj) {
            let num = 0
            $(".formLayout>div").each(function () {
              let index = $(".formLayout>div").index(this)
              if (!$(this).hasClass("noWrap") && !$(this).hasClass("flRow") && !$(this).hasClass("fab-container") && index >= obj.start && index <= obj.end) {
                num += 1
              }
            })

            if (num == 1) {
              $(".formLayout>div").each(function () {
                let index = $(".formLayout>div").index(this)
                if (!$(this).hasClass("noWrap") && !$(this).hasClass("flRow") && !$(this).hasClass("fab-container") && index >= obj.start && index <= obj.end) {
                  $(this).addClass("onlyOne")
                }
              })
            }
          }

          let flArr = []
          $(".formLayout>.flRow").each(function () {
            if (($(this).find(".hideDiv").length == $(this).find(".controlDiv").length || !$(this).find(".controlDiv").length) && !$(this).find(".card").length) {
              $(this).addClass("noWrap")
            } else {
              $(this).removeClass("noWrap")
            }
            flArr.push($(".formLayout>div").index(this))
          })
          $(".formLayout>div").each(function () {
            $(this).removeClass("onlyOne")
          })
          if (flArr.length > 0) {
            if (flArr[0] != 0) {
              flArr = [0].concat(flArr)
            }
            if (flArr[flArr.length - 1] != $(".formLayout>div.van-row ").length - 1) {
              flArr = flArr.concat([$(".formLayout>div.van-row ").length - 1])
            }
            //开始分割数组
            flArr.forEach((item, index) => {
              let obj = {}
              if (flArr[index + 1]) {
                obj.start = item
                obj.end = flArr[index + 1]
              }
              checkOnLy(obj)
            })
          }
        })
      }
    }
  },
  computed: {
    isMobileForm() {
      // 接口返回formType==3则表示配置的pad表单，如果无formType则依旧根据设备类型显示
      return dsf.config.clientType == "mobile" || (this.formMeta.parameters.hasOwnProperty("formType") && this.formMeta.parameters.formType == 2)
    },
    classDivider() {
      return (item, col, ctrindex) => {
        let classArr = []
        if (!this.isMobileForm) {
          classArr.push("padDivider")
        } else {
          // if (item.controlType != "controlMobileFl" && rowindex < this.controlRows.length - 1) {
          //   let nextControl = this.getNextCtronl(rowindex, ctrIndex)
          //   if (nextControl) {
          //     classArr.push("divider")
          //   }
          // }
          if (col.slice(ctrindex + 1).some(ctr => ctr?.show && ctr?.propertyShow)) {
            classArr.push("divider")
          }

          if (!(item.show && item.propertyShow)) {
            classArr.push("hideDiv")
          }
        }

        return classArr
      }
    },
    getRowClass() {
      return (row, rowindex) => {
        // console.log(rowindex)
      }
    }
  },
  created() {
    let allCompsName = Object.keys(allComps)
    if (this.formMeta.parameters?.formTemplate && allCompsName.includes(`formTab${this.formMeta.parameters.formTemplate}`)) {
      this.templateComponent = `formTab${this.formMeta.parameters.formTemplate}`
    }
  },
  mounted() {
    if (document.querySelector(".van-tabs__content")) {
      this.scrollContainer = document.querySelector(".van-tabs__content")
    } else if (document.querySelector(".formBox")) {
      this.scrollContainer = document.querySelector(".formBox")
    }
    if (this.scrollContainer) {
      console.log(this.scrollContainer)
      this.scrollContainer.addEventListener(
        "scroll",
        () => {
          clearTimeout(this.timeout)
          this.isShowTop = true
          this.timeout = setTimeout(() => (this.isShowTop = false), 2000)
        },
        false
      )
    }
  },
  updated() {
    //console.log('formTab')
  },
  methods: {
    getNextCtronl(index, ctrIndex) {
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
@import "../../../assets/styles/themes.scss";
@import "../../../assets/styles/mixin.scss";

.formLayout {
  overflow: hidden;
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
      font-size: var(--font_size_2);
      line-height: 0.4rem;
    }
  }
  & > .rowWrap {
    background: #ffffff;
    border: 1px solid rgba(230, 230, 230, 1);
    box-shadow: 0px 0px 6px 0px rgba(0, 0, 0, 0.08);
    border-radius: 3px;
    margin: 10px;
    overflow: hidden;
  }
  & > .noWrap {
    display: none;
  }
  & > .flRow {
    margin: 10px 0;
  }
  & > .SubFormRow {
    margin: 10px;
  }
  & > .box {
    .van-col {
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
        border-left: 1px solid #f5f5f5;
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
          border-left: 1px solid #f5f5f5;
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
        border-bottom: 1px solid #f5f5f5;
      }
      /deep/ .van-field{
        overflow: visible;
      }
    }
    .divider > div {
      position: relative;
      &::after {
        position: absolute;
        box-sizing: border-box;
        content: " ";
        pointer-events: none;
        right: 10px;
        bottom: 0;
        left: 10px;
        border-bottom: 1px solid #d5d5d5;
        -webkit-transform: scaleY(0.5);
        transform: scaleY(0.5);
      }
    }

    &.onlyOne {
      > div > .divider:not(.hideDiv) {
        border-bottom: 5px solid #f8f8f8;
        // margin-bottom: 5PX;
        & > div {
          &::after {
            display: none;
            // border-bottom: 5px solid #f8f8f8;
          }
        }
      }
    }
  }
}
</style>
<style lang="scss">
.formLayout > .box .van-col {
  min-height: 0;
}
</style>

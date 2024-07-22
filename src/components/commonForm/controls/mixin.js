import validators from "../validators"
import validatorsFun from "../validatorsFun"
export default {
  props: {
    metaData: {
      type: Object
    },
    value: {
      type: Object
    }
  },
  data() {
    return {
      readonly: false
    }
  },
  created() {},
  mounted() {
    this.initStyle()
  },
  methods: {
    ...validatorsFun,
    initRules() {
      if (this.metaData.privilege) {
        this.readonly = !this.metaData.privilege.editable //不可编辑
      }
      if (this.controlData.inputAlign) {
        this.controlData.inputAlign = "left"
      }
      if (this.readonly) {
        //不可编辑是不显示占位符
        this.controlData.placeholder = ""
        this.controlUserMessage ? (this.controlUserMessage.placeholder = "") : ""
      } else {
        let chooseCtr = ["controlUser", "controlCode", "controlComboBox", "controlFileCode", "controlDateTime"]
        let placeholder = chooseCtr.includes(this.metaData.controlType) ? "请选择" : "请输入"
        this.controlData.placeholder = this.metaData.placeholder || placeholder + this.metaData.label.replace(/&nbsp;/g, "")
      }
      if (this.controlData && this.controlData.hasOwnProperty("rules")) {
        let rulesArr = []
        let { keys, entries } = Object
        let nowValidator = this.metaData.validator //当前组件规则
        let rulevalidator = []
        for (let [item, itemObj] of entries(nowValidator)) {
          //筛选过滤出当前规则
          if (validators.hasOwnProperty(item)) {
            let newValidator = JSON.parse(JSON.stringify(validators[item]))
            for (let [key, value] of entries(nowValidator[item])) {
              let tagStr = "{" + key + "}"
              if (newValidator.regex) {
                newValidator.regex = newValidator.regex.replace(tagStr, value)
              }
              if (newValidator.function && newValidator.function == "endTimeCheck") {
                newValidator.begTime = nowValidator[item].begTime
                newValidator.endTime = nowValidator[item].endTime
              }
              newValidator.message = newValidator.message.replace(tagStr, value)
            }
            newValidator.name = item
            if (newValidator.message.indexOf("{title}") > -1) {
              newValidator.message = newValidator.message.replace("{title}", this.metaData.label).replace(/&nbsp;/g, "")
            }
            if (newValidator.message.indexOf("{message}") > -1) {
              newValidator.message = newValidator.message.replace("{message}", this.metaData.label)
            }
            if (itemObj.message) {
              newValidator.message = itemObj.message
            }
            rulevalidator.push(newValidator)
          }
        }
        var reqArr = []
        rulevalidator.forEach((item, index) => {
          if (item.name == "required") {
            reqArr.push(item)
            rulevalidator.splice(index, 1)
          }
        })
        if (reqArr.length) {
          rulevalidator = [...reqArr, ...rulevalidator]
        }
        rulevalidator.forEach((item, index) => {
          if (item.regex) {
            item.regex = new RegExp(item.regex, "m")
          }
          let obj = {
            validator: item.function ? this[item.function] : "",
            message: item.message,
            pattern: item.regex,
            ...item
          }
          for (let [key, value] of entries(obj)) {
            if (!obj[key]) {
              delete obj[key]
            }
          }
          rulesArr.push(obj)
        })
        this.controlData.rules = rulesArr
      }
      if (this.controlData && this.controlData.maxlength) {
        this.controlData.maxlength =
          this.metaData.validator && this.metaData.validator.length && this.metaData.validator.length.maxLength ? this.metaData.validator.length.maxLength : ""
      }
    },
    findForm(evt) {
      if (evt.$el.tagName != "FORM") {
        return this.findForm(evt.$parent)
      } else {
        return evt.$parent
      }
    },
    intoView(e) {
      // 输入框获取焦点时判断是否弹出键盘，将输入框滚动至可显示
      console.log(e.target)
      const originHeight = document.documentElement.clientHeight || document.body.clientHeight
      setTimeout(() => {
        const resizeHeight = document.documentElement.clientHeight || document.body.clientHeight
        if (resizeHeight < originHeight) {
          e.target.scrollIntoViewIfNeeded(false)
        }
      }, 300)
    },
    initStyle() {
      // 根据控件配置设置只读样式
      let css = `#ctr_${this.metaData.controlId} .van-field .van-field__control:read-only
      {${this.metaData.extra.fontSize ? "font-size: " + this.metaData.extra.fontSize + "px !important;" : ""}
      ${this.metaData.extra.fontWeight ? "font-weight: " + this.metaData.extra.fontWeight + " !important;" : ""}
      ${this.metaData.extra.fontStyle ? "font-style: " + this.metaData.extra.fontStyle + " !important;" : ""}
      ${this.metaData.extra.color ? "color: " + this.metaData.extra.color + " !important;" : ""}}`
      // 标题是否与内容一起变动
      if (dsf.config.commonForm.labelStyleWithContent) {
        css += `#ctr_${this.metaData.controlId} .control_label span
          {${this.metaData.extra.fontSize ? "font-size: " + this.metaData.extra.fontSize + "px !important;" : ""}
          ${this.metaData.extra.fontWeight ? "font-weight: " + this.metaData.extra.fontWeight + " !important;" : ""}
          ${this.metaData.extra.fontStyle ? "font-style: " + this.metaData.extra.fontStyle + " !important;" : ""}
          ${this.metaData.extra.color ? "color: " + this.metaData.extra.color + " !important;" : ""}}`
      }
      this.setCssRule(css)
    },
    setCssRule(cssRule) {
      if (this.$el.nodeType == 1) { // 有效的元素节点
        this.dividerStyle = document.createElement("style")
        this.dividerStyle.type = "text/css"
        this.$el.appendChild(this.dividerStyle)
        this.dividerStyle.innerHTML = cssRule
      }
    }
  },
  watch: {
    "metaData.privilege.editable": {
      handler: function (nv, ov) {
        this.initRules()
      },
      deep: true
    },
    "metaData.validator": {
      handler: function (nv, ov) {
        this.initRules()
      },
      deep: true
    },
    "metaData.show": {
      // 监听控件是否显示，决定前端控件校验规则
      immediate: true,
      handler(newValue, oldValue) {
        if (newValue == 1) {
          this.initRules()
        } else {
          // 找到rows中的对应的controls放进新数组
          this.controlData.rules = []
        }
        this.$bus.emit("changeControlShow", { show: newValue, metaId: this.metaData.metaId })
      }
    }
  }
}

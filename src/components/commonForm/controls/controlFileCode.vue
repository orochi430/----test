<template>
<div class="controlFileCode">
  <!-- 只读显示 -->
  <div v-if="!canEdit" class="van-cell van-field">
    <span class="van-field__control" >
      {{ value.value }}
    </span>
  </div>
  <!-- 编号 -->
  <div v-else class="code">
    <!-- 编号规则 -->
    <van-field
      v-if="showRuleTag"
      :readonly="true"
      v-model="selectedRule.codeName"
      placeholder="请选择"
      @click="isShowRulePicker = true"
      :style="{width: selectedRule.codeName ? `${selectedRule.codeName.length}em` : '3em'}"
    ></van-field>
    <!-- 流水号选择 -->
    <template v-if="allowFilecode">
      <div v-for="(item, index) in showData" v-show="item.show != 'display-none'" :key="index">
        <span v-if="item.type == 'constant'" style="padding: 0 2px;">{{item.data}}</span>
        <van-field
          v-else
          v-model="item.data"
          readonly
          @click="showCodePicker(item, index)"
          placeholder="请选择"
          :style="{width: item.data.length ? `${item.data.length}em` : '3em'}"
        ></van-field>
      </div>
    </template>

  </div>
  <van-popup v-model="isShowRulePicker" get-container="#app" position="bottom" round>
    <van-picker show-toolbar title="" :columns="selectRules" value-key="codeName" @confirm="confirmRule" @cancel="isShowRulePicker = false" />
  </van-popup>
  <van-popup v-model="isShowCodePicker" get-container="#app" position="bottom" round>
    <van-picker ref="codePiker" :default-index="defaultIndex" show-toolbar title="" :columns="selectColumns" value-key="showValue" @confirm="confirmCode" @cancel="isShowCodePicker = false" @change="changeCode">
      <template #columns-top v-if="currentSelectShowData.type == 'serialNumber'">
        <van-field
          label="编号："
          v-model="serialNumberTemp"
          @blur="blurFn"
          class="numberTemp"
        ></van-field>
      </template>
    </van-picker>
  </van-popup>
</div>
</template>

<script>
import propMixin from "./mixin";
export default {
  mixins: [propMixin],
  props:["formData", "parameters"],
	model: {
    prop: 'value',
    event: 'input'
  },
  data() {
    return {
      showData: [], // 显示的文号
      rules: [], // 可选规则
      selectedRule : {}, // 选中规则
      selectColumns: [], // 当前选择项列表
      canEdit: false, // 是否可编辑
      allowFilecode: true, // 是否允许编号
      allCodeColumns: [], // 所有流水号选择列表
      showRuleTag: true, // 是否显示规则项
      displaySelect: false, // 规则项是否默认显示请选择
      template: null,
      isShowRulePicker: false,
      isShowCodePicker: false,
      controlData:{
        readonly:false,
        placeholder:""
			},
      currentSelectShowData: {}, // 当前选中的显示项
      currentSelectPeriod: '', // 当前选中的显示项前的时间号
      isInit: true,
      initValue: JSON.parse(JSON.stringify(this.value)),
      serialNumberTemp: '', // 可编辑流水号
      defaultIndex: 0
    }
  },
  created() {
    this.init()
    this.onComboxChangeCode()
  },
  watch: {
    // 规则项改变，具体文号重新赋值
    selectedRule(newValue) {
      this.showData.splice(0)
      if (newValue?.id) {
        this.getFileCodeTemplate()
        this.value.ruleid = newValue.id;
        this.$bus.$emit("changeRuleCode",{
          value: newValue,
          metaData: this.metaData,
        });
      } else if (newValue?.codeName == '请选择') {
        this.value.ruleid = ''
        this.value.period = ''
        this.value.order = ''
        this.value.num = ''
        this.value.tnum = ''
        this.value.value = ''
        this.value.ruleorder = ''
      }
    },
    // 显示文号改变，元数据值对应改变
    showData: {
      deep: true,
      handler(newValue) {
        if (newValue?.length) {
          let period = ''
          let order = ''
          let num = ''
          let tnum = ''
          let value = ''
          console.log(newValue)
          if (this.allowFilecode) {
            newValue.forEach(item => {
              if (item.type == 'period') {
                period += item.realValue
              } else if (item.type == 'serialNumber') {
                if (item.childRule.indexOf("N") > -1) {
                  tnum = item.data
                  if (tnum != "") {
                    tnum = parseInt(tnum);
                  }
                } else {
                    num = item.data
                    if (num != "") {
                      num = parseInt(num);
                    }
                }
              }
              value += (!this.selectedRule.savePeriod && item.type == 'period') ? '' : item.data
            })
            if (num > 0) {
                order = period + (Array(5).join('0') + num).slice(-5)
            }
            if (tnum > 0) {
                order = period + (Array(5).join('0') + tnum).slice(-5)
            }
          } else { // 不是允许编号环节仅
            value = this.selectedRule.codeName
          }
          this.value.period = period
          this.value.order = order
          this.value.num = num
          this.value.tnum = tnum
          this.value.value = value
          this.value.ruleorder = this.selectedRule.showOrder
          this.$bus.$emit("changeFileCode",{
            ...this.value,
            metaData: this.metaData,
          });
        }
      }
    },
    rules:{
      deep: true,
      handler(newValue) {
        this.rules = newValue;
        console.log(this.rules);

      },
      immediate:true
    }

  },
  computed: {
    selectRules() {
      return this.displaySelect ? [{codeName: '请选择', id: ''}].concat(this.rules) : this.rules
    }
  },
  methods: {
    init(isdocType) {
      this.rules = this.metaData.extra.rules || []
      this.canEdit = this.initEditable()
      this.allowFilecode = this.initAllowFileCode()
      this.showRuleTag = this.rules.length > 1 || (this.rules.length == 1 && this.metaData.extra.showTagForSimple == 1) // 单个文种下是否显示标签
      this.displaySelect = this.metaData.extra.displaySelect == 1
      if(this.canEdit || this.allowFilecode) this.initFilecode(isdocType)
      this.onRefreshFilecode()
    },
    // 初始化文号情况：
    // 1、元数据已有文号，使用已有文号规则
    // 2、不配置显示请选择，自动选中第一个文号规则，否则不选中规则
    // 3、下拉框有关联文号，选中对应关联文号
    initFilecode(isdocType) {
      if (isdocType) { // 下拉框关联文号或重置文号
        this.selectedRule = this.rules[0] || {}
      } else {
        if (this.value.ruleid) {
          this.selectedRule = this.rules.find(rule => rule.id == this.value.ruleid)|| {}
        } else {
          if ((!this.displaySelect || !this.showRuleTag) && this.allowFilecode) {
            this.selectedRule = this.rules[0] || {}
          } else {
            this.selectedRule = {}
          }
        }
      }
    },
    initEditable() {
      if (this.metaData.extra.eatraClass == 'readonly') { // 移动端特定不可编辑（不与pc共用编辑权限）
        return false
      }
      return this.metaData.privilege.editable
    },
    // 是否允许编号，不允许编号环节只能选择规则，不能选择后续流水号
    initAllowFileCode() {
      if (this.metaData.extra.allowFilecode == false) {
        return false
      } else {
        return !this.metaData.extra.allowFilecodeNodeId || this.metaData.extra.allowFilecodeNodeId.split(",").indexOf(this.parameters.nodeId) > -1
      }
    },
    // 获取规则示例
    getFileCodeTemplate() {
      dsf.http.post("fn/filecode/template", { pk: this.parameters.pk,ruleId: this.selectedRule.id }).then(res => {
        if (res.data.code == 200) {
          // this.template = res.data.data
          this.selectedRule.allowRecycle = res.data.data.allowRecycle
          this.selectedRule.bindCode = res.data.data.bindCode
          this.selectedRule.savePeriod = res.data.data.savePeriod
          this.selectedRule.showOrder = res.data.data.showOrder
          this.$set(this, 'showData', res.data.data.selects)
          this.showData.forEach(item => {
            if(item.type != 'constant') {
              this.$set(item, 'data', '')
              this.$set(item, 'realValue', '')
            }
          })
          this.getFileCodeData()
        }
      })
    },
    // 获取规则项可选值
    getFileCodeData() {
      // 接口传入已选的period、wh、no，返回参数对应项中会带selected标识
      let params = {
        pk: this.parameters.pk,
        moduleId: this.parameters.moduleId,
        metaId: this.metaData.metaId,
        date: dsf.date.format(new Date(), "yyyy-mm-dd hh:ii:00"),
        allowRecycle: this.selectedRule.allowRecycle,
        bindCode: this.selectedRule.bindCode,
        ruleId: this.selectedRule.id,
        period: this.isInit ? this.initValue.period || '' : this.currentSelectPeriod,
        wh: this.isInit ? this.initValue.value || '' : this.value.value || '',
        no: this.isInit ? this.initValue.num || '' : this.value.num || '',
        totalNo: ''
      }
      dsf.http.post("fn/filecode/data", params).then(res => {
        if (res.data.code == 200) {
          this.isInit = false
          this.allCodeColumns = res.data.data
          this.setShowData()
        }
      })
    },
    // 设置显示文号，值返回selected则表示当前选中，否则选中第一项
    setShowData() {
      this.allCodeColumns.forEach(item => {
        let selected = item.data.find(data => data.selected == 'selected') || item.data[0]
        let showData = this.showData.find(select => select.childRule == item.itemAttr)
        if (showData) {
          showData.data = selected?.showValue || ''
          showData.realValue = selected?.realValue || ''
        }

      })
    },
    confirmRule(picker, index) {
      this.selectedRule = picker
      this.isShowRulePicker = false
      this.isInit = false
    },
    showCodePicker(item, index) {
      this.currentSelectShowData = item
      this.selectColumns = this.allCodeColumns.find(column => column.itemAttr === item.childRule)?.data
      this.currentSelectPeriod = ''
      // 当前项之前的period项，用于传入getFileCodeData接口
      for (let i = 0; i < index; i++) {
        if (this.showData[i].type == 'period') {
          this.currentSelectPeriod += this.showData[i].data
        }
      }
      // serialNumber项设置临时值，用于手动编辑
      if (item.type == 'serialNumber') this.serialNumberTemp = item.data
      this.defaultIndex = this.selectColumns.findIndex(item => item.showValue == this.currentSelectShowData.data)
      this.isShowCodePicker = true
    },
    confirmCode(picker, index) {
      if (this.currentSelectShowData.type == 'serialNumber') {
        this.currentSelectShowData.data = this.serialNumberTemp
        this.currentSelectShowData.realValue = this.serialNumberTemp
      } else {
        this.currentSelectShowData.data = picker.showValue
        this.currentSelectShowData.realValue = picker.realValue
        if(this.currentSelectShowData.type == 'period') {
          this.currentSelectPeriod += picker.showValue
          this.getFileCodeData()
        }
      }

      this.isShowCodePicker = false
    },
    changeCode(picker, data, index) {
      if (this.currentSelectShowData.type == 'serialNumber') this.serialNumberTemp = data.showValue
    },
    // 下拉框联动文号规则
    onComboxChangeCode() {
      this.$bus.on("comboxChangeCode", (busObj) => {
        if (this.metaData.privilege.editable) {
          dsf.http.post('fn/filecode/docType', { //获取文号规则
            element: this.metaData.controlId,
            moduleId: this.parameters.moduleId,
            formId: this.parameters.formId,
            pk: this.parameters.pk,
            xzdocType: this.formData.main['B0016'] ? this.formData.main['B0016'].value : '',
            ddocType: this.formData.main['B0017'] ? this.formData.main['B0017'].value : '',
            fwlx: this.formData.main['C-GW-FW-0202'] ? this.formData.main['C-GW-FW-0202'].value : '',
            wzMetaId: busObj.metaData.metaId,
            wzMetaValue: busObj.value
          }).then(res => {
            if(res.data.code == 200) {
              if (res.data.data?.rules && JSON.stringify(res.data.data.rules) != JSON.stringify(this.rules)) {
                this.$set(this.metaData, 'extra', Object.assign(this.metaData.extra, res.data.data))
                this.isInit = true
                this.init(true)
              }
            }
          })
        }
      })
    },
    // 重置文号
    onRefreshFilecode() {
      let self = this
      this.$eventBus.onRefreshFilecode(self, function(data) {
        self.initFilecode(true)
      })
    },
    // 手动编号补位操作
    blurFn(){
      this.serialNumberTemp = this.serialNumberTemp.padStart(this.currentSelectShowData.dataLength, '0') // 前补零
    },
  }
}
</script>
<style lang='scss' scoped>
.controlFileCode {
  font-size: var(--font_size_2);
  .code {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    ::v-deep .van-field {
      box-sizing: content-box;
      width: 80px;
      padding: 6px;
      border: 1px solid #e5e5e5;
      border-radius: 5px;
      .van-field__control {
        text-align: center;
      }
    }
  }
}
.numberTemp {
    width: calc(100% - 20px);
    margin: 0 10px;
    border: 1px solid #e5e5e5;
    border-radius: 5px;
    padding: 6px;
  }
</style>

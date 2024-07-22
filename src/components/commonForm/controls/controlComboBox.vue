<template>
<div class="box controlCheckBoxWrap">
    <van-field
        ref="comboInput"
        v-if="!readonly"
        class="controlCheckBox"
        v-model="bindValue"
        :disabled="controlData.disabled"
        :clickable="controlData.clickable"
        :placeholder="controlData.placeholder"
        :readonly="!controlData.allowEdit"
        :input-align="controlData.inputAlign"
        :left-icon="controlData.leftIcon"
        :right-icon="controlData.rightIcon"
        :border="false" :class="[controlData.error ? 'errorInp' : '']"
        :rules="controlData.rules" @click="toClick('click', $event)"
        :name="metaData && metaData.metaId ? metaData.metaId : ''"
    >
    <template #right-icon>
        <i class="iconfont iconyoujiantou1"></i>
      </template>
  </van-field>
    <div class="van-cell van-field" v-if="readonly">
        <span class="van-field__control" v-text="bindValue"></span>
    </div>
    <!-- <van-popup v-if="!isMultiple" get-container="#app" v-model="showPopup" position="bottom" round style="height:50%;" class="diaBox">
      <van-nav-bar :title="metaData.label" left-text="取消" right-text="确认" @click-left="cancel" @click-right="confirm" placeholder />
      <van-checkbox-group v-model="result" @change="changeGroup">
        <div class="diaItem flex ac" v-for="(item, index) in currentColumns" :key="index">
          <van-checkbox :name="item.value" shape="square" icon-size="0.32rem">{{ item.text }}</van-checkbox>
        </div>
      </van-checkbox-group>
    </van-popup> -->
    <van-popup v-if="isMultiple" get-container="#app" v-model="showPopup" position="bottom" round style="height: 60vh;" class="flex dc">
      <div class="popup-title">
          <i size="0.4rem" class="iconfont iconxialajiantou" @click="showPopup = false" />
          <span>选择</span>
      </div>
      <div class="choose-container">
        <div v-for="item in currentColumns" class="choose-col flex jb" @click="toggleChecked(item)">
          <span class="elps">{{ item.text }}</span>
          <i v-show="item.checked" class="iconfont iconcheck"></i>
        </div>
      </div>
      <div class="choose-btn">
        <van-button type="primary" block @click="confirm">确定</van-button>
      </div>
    </van-popup>
    <control-dialog v-if="!isMultiple" v-model="showPopup" :columns="controlData.columnsValue" :checkedVal="value.value" @pupopClose="pupopClose" @selectItem="selectItem" :metaData="metaData"></control-dialog>
</div>
</template>

<script>
import propMixin from "./mixin";
import controlDialog from "./controlDialog";
export default {
    name: "controlComboBox",
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
            // result: [],
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
                allowEdit: false
            },
            currentColumns: [],
            readonly: false,
            isMultiple: false,
        };
    },
    components: {
        controlDialog,
    },
    computed: {
        bindValue: {
            get() {
                if(this.value.value) return this.value.text;

                if (this.readonly) { // 由于enumData可能不包含，只读时直接显示
                    return this.value.text;
                }
                if (this.value.value.length && this.currentColumns.length < 1) {
                    return this.value.text;
                }
                if (this.value.value) {
                    let txtArr = this.value.value.split(",").map(val => {
                        if (this.currentColumns.filter(col => col.value == val)[0]) {
                            return this.currentColumns.filter(col => col.value == val)[0].text;
                        }
                    });
                    return txtArr.join(",");
                }
                return this.value.value;
            },
            set(val) {
                this.value.text = val
                this.value.value = val
            }
        },
        result: {
          get() {
              if (this.isMultiple) {
                return this.value.value == '' ? [] : this.value.value.split(",")
              } else {
                return []
              }
            },
            set(val) {
                this.value.value = val.join(",")
            }
        }
    },
    watch: {
        'metaData.enumData': {
            handler(newVal, oldVal) {
                if (newVal) {
                    this.controlData.columnsValue.columns = newVal
                    this.currentColumns = newVal
                }
            },
            deep: true,
            immediate: true
      },
        'value.value': {
            handler(newVal, oldVal) {
                if (newVal) {
                    this.$nextTick(()=>{
                        if (this.metaData.extra.isDocType == 1) {
                            this.$bus.emit("comboxChangeCode", {
                                ...this.value,
                                metaData: this.metaData,
                                subFormIndex: this.subFormIndex,
                            });
                        }
                    })
                }
            },
            deep: true,
            immediate: true
        },
      result: {
        immediate: true,
        handler(newVal, oldVal) {
          this.currentColumns.forEach(column => {
            if (newVal.indexOf(column.value) > -1) {
              this.$set(column, 'checked', true)
            } else {
              this.$set(column, 'checked', false)
            }
          })
        }
      }
    },
    created() {
        this.$set(this.value,'text',this.value.text) // 为text绑定响应式，供计算属性收集依赖
        // this.controlData.columnsValue.columns = this.metaData.enumData;
        // this.controlData.placeholder=this.metaData.extra.placeholder
        // this.currentColumns = this.metaData.enumData;
        if (this.metaData.extra && this.metaData.extra.multiple) {
            this.isMultiple = this.metaData.extra.multiple;
        }
        let metaTemp = this.formMeta || this.topformMeta;
        let obj = this.value;
        //只有在拟稿状态才会给初始化默认值

        if (this.value.value || this.value.text) { //如果data.main中有值就取这个值，不管是否拟稿节点都取实际值
            obj.text = this.value.text
            obj.value = this.value.value
        } else if (metaTemp.parameters && metaTemp.parameters.nodeId) {
            if (JSON.stringify(this.metaData.defaultValue) != "{}") {
                obj.value = this.metaData.defaultValue.value;
                obj.text = this.metaData.defaultValue.text;
            // } else {
            //     obj.value = "";
            //     obj.text = "";
            }
        }
        this.$emit("input", obj);
        if (!this.readonly) {
            this.controlData.rightIcon = " iconfont iconchevron-right";
        }
        // if (this.metaData.extra.isDocType == 1) {
        //     this.$bus.emit("comboxChangeCode", {
        //         ...this.value,
        //         metaData: this.metaData,
        //         subFormIndex: this.subFormIndex,
        //     });
        // }
        if (this.value.value) {
            // 不同类型触发文号规则
            this.$bus.emit("checkValToFilecode", {
                ...this.value,
                metaData: this.metaData,
                subFormIndex: this.subFormIndex,
            });
        }
    },
    methods: {
        toggleChecked(item) {
          this.$set(item, 'checked', !item.checked);
          let index = this.result.indexOf(item.value)
          if (index > -1) {
              this.result.splice(index, 1)
          } else {
              this.result.push(item.value)
          }
        },
        toClick() {
            if (this.readonly) return;
            this.showPopup = !this.showPopup;
            this.$bus.emit("showCheckBox", this);
        },
        cancel() {
            this.showPopup = !this.showPopup;
        },
        confirm() {
            this.showPopup = !this.showPopup;
            var obj = this.value;
            this.currentColumns = this.controlData.columnsValue.columns;
            obj.value = this.result.join();
            obj.text = this.result.map((item) => {
                return this.currentColumns.filter((itm) => {
                    return itm.value == item })[0].text;
                }).join(",");
            this.$emit("input", obj);
            this.$bus.emit("checkVal", {
                ...obj,
                metaData: this.metaData,
                subFormIndex: this.subFormIndex,
            });
            // 不同类型触发文号规则
            this.$bus.emit("checkValToFilecode", {
                ...this.value,
                metaData: this.metaData,
                subFormIndex: this.subFormIndex,
            });
        },
        changeGroup(result) {},
        pupopClose(val) {
            this.currentColumns = this.controlData.columnsValue.columns;
        },
        selectItem(val) {
            if (val.children) {
                this.showPopup = true;
                this.currentColumns = val.children;
            } else {
                var obj = this.value;
                this.currentColumns = this.controlData.columnsValue.columns;
                obj.value = val.value;
                obj.text = val.text;
                this.$emit("input", obj);
                this.$bus.emit("checkVal", {
                    ...obj,
                    metaData: this.metaData,
                    subFormIndex: this.subFormIndex,
                });
                // 不同类型触发文号规则
                this.$bus.emit("checkValToFilecode", {
                    ...this.value,
                    metaData: this.metaData,
                    subFormIndex: this.subFormIndex,
                });
                // 下拉框选择控件isDocType==1时，值改变触发文号联动
                // if (this.metaData.extra.isDocType == 1) {
                //     this.$bus.emit("comboxChangeCode", {
                //         ...obj,
                //         metaData: this.metaData,
                //         subFormIndex: this.subFormIndex,
                //     });
                // }
            }
        }
    },
};
</script>

<style lang="scss" scoped>
@import "../../../assets/styles/themes.scss";
@import "../../../assets/styles/mixin.scss";

.controlCheckBoxWrap {
    width: 100%;
}

.diaBox {
    width: 100%;
    display: flex;
    flex-direction: column;
    ::v-deep .van-checkbox-group {
        padding: 10px 16px;
        flex: 1;
        overflow: auto;
    }
      .diaItem {
        min-height: 38px;
        font-size: var(--font_size_2);
    }
}
.popup-title{
  text-align: center;
  font-size: var(--font_size_2);
  padding: 15px;
  border-bottom: 5px solid #F1F2F4;
  color: #000000;
  position: relative;
  .iconfont{
      position: absolute;
      left: 15px;
      top: 50%;
      transform: translateY(-50%);
  }
}
.choose-container {
  flex: 1;
  overflow: auto;
  font-size: var(--font_size_2);
  .choose-col{
    margin: 20px;
    i {
      font-size: var(--font_size_0);
    }
  }
}
.choose-btn {
  margin: 16px;
}
</style><style lang="scss">
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

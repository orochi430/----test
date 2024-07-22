<template>
<div class="box controlCheckBoxWrap" v-if="!readonly || (readonly && !!bindValue)">
    <div class="diaBox">
        <van-checkbox-group v-model="result" @change="changeGroup" style="flex: 1; overflow-y: auto">
            <div class="diaItem flex ac" v-for="(item, index) in currentColumns" :key="index">
                <van-checkbox shape="square" :name="item.value">{{ item.text }}</van-checkbox>
            </div>
        </van-checkbox-group>
    </div>
</div>
</template>

<script>
import propMixin from "./mixin";
import controlDialog from "./controlDialog";
export default {
    name: "controlCheckBox",
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
    },
    data() {
        return {
            showPopup: true,
            result: [],
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
            },
            currentColumns: [],
            readonly: false,
            ifCheck: false,
        };
    },
    components: {
        controlDialog,
    },
    computed: {
        bindValue() {
            if (this.value.value.length && this.currentColumns.length < 1) {
                return this.value.text;
            }
            if (this.value.value) {
                var str = this.value.value.split(",").map((item) => {
                    if (
                        this.currentColumns.filter((itm) => {
                            return itm.value == item;
                        })[0]
                    ) {
                        return this.currentColumns.filter((itm) => {
                            return itm.value == item;
                        })[0].text;
                    }
                });
                return str.join(",");
            }

            return this.value.value;
        },
    },
    created() {
        this.controlData.columnsValue.columns = this.metaData.enumData;
        // this.controlData.placeholder=this.metaData.placeholder
        this.currentColumns = this.metaData.enumData;
        if (this.metaData.extra && this.metaData.extra.multiple) {
            this.ifCheck = this.metaData.extra.multiple;
        }
        if (
            JSON.stringify(this.metaData.defaultValue) != "{}" &&
            this.metaData.parameters &&
            this.metaData.parameters.nodeId &&
            this.metaData.parameters.nodeId == "0"
        ) {
            var obj = this.value;
            obj.value = this.metaData.defaultValue.value;
            obj.text = this.metaData.defaultValue.text;
            this.$emit("input", obj);
        }
        this.result = this.value.value!=""?this.value.value.split(','):[];
        if (!this.readonly) {
            this.controlData.rightIcon = " iconfont iconchevron-right";
        }
    },
    methods: {
        toClick() {
            if (this.readonly) return;
            this.showPopup = !this.showPopup;
            this.$bus.emit('showCheckBox', this);
        },
        cancel() {
            this.showPopup = !this.showPopup;
        },
        confirm() {
            this.showPopup = !this.showPopup;
            var obj = this.value;
            this.currentColumns = this.controlData.columnsValue.columns;
            obj.value = this.result.join();
            obj.text = this.result
                .map((item) => {
                    return this.currentColumns.filter((itm) => {
                        return itm.value == item;
                    })[0].text;
                })
                .join(",");
            this.$emit("input", obj);
            this.$bus.emit("checkVal", {
                ...obj,
                metaData: this.metaData,
                subFormIndex: this.subFormIndex,
            });
        },
        changeGroup(result) {
            //console.log(this.result, result);
            this.confirm();
        },
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
            }
        },
    },
};
</script>

<style lang="scss" scoped>
@import "../../../assets/styles/themes.scss";
@import "../../../assets/styles/mixin.scss";

.controlCheckBoxWrap {
    width: 100%;
}

.flex {
    display: flex;
}

.ac {
    align-items: center;
}

.je {
    justify-content: flex-end;
}

.jc {
    justify-content: center;
}

.diaBox {
    width: 100%;
    max-height: 400px;
    display: flex;
    flex-direction: column;

    .bottomButton {
        height: 50px;
        width: 100%;

        div {
            flex: 1;
            text-align: center;
            line-height: 50px;
        }

        .confirm {
            @include font-theme("normal");
        }
    }
}

.diaItem {
    position: relative;
    // height: 38px;
    text-align: center;
    line-height: 38px;
    //padding-left: 30px;
}

.diaItem::after {
    width: 80%;
    position: absolute;
    box-sizing: border-box;
    content: " ";
    pointer-events: none;
    right: 0;
    bottom: 0;
    left: 10%;
    border-bottom: 1px solid #ebedf0;
    -webkit-transform: scaleY(0.5);
    transform: scaleY(0.5);
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

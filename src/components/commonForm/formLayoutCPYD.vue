<template>
<!-- wrap -->
<div style="width: 100%" class="formLayoutCPYD">
    <component :allFile="allFile" :meta-data="metaData" v-model="controlData" :is="metaData.controlType" :parameters="parameters" ref="control" @input="inpFn" @confirm="confirmFn" @selectuser="selectuser" @getOptions="getOptions" :subFormIndex="subFormIndex" :class="{ 'readonly-font': !metaData.privilege.editable }"></component>
</div>
</template>

<script>
import allComps from "./controls";
import demo from "./demo";
export default {
    name: "formLayout",
    props: ["metaData", "controlData", "isSubForm", "subFormIndex", "parameters", "allFile"],
    components: {
        ...allComps
    },
    data() {
        return {
            testValue: demo.controls[0],
            ifRowLayout: true,
            textLayout: "right",
            defaultVal: "",
            fileCode: true,
            configlayout: "col",
        };
    },
    created() {
        console.log('菜品')
        let arr = ["controlEditor", "controlTextarea"];
        this.ifRowLayout = arr.filter(
            (item) => item == this.metaData.controlType
        ).length;
        this.configlayout = dsf.config.commonForm.layout;
        this.textLayout = dsf.config.commonForm.textlayout || "right";
    },
    computed: {
        isTitleField() {
            let istemp = false;
            if (
                this.metaData.defaultValue.value &&
                (this.metaData.defaultValue.value.indexOf("$title$") > -1 ||
                    this.metaData.defaultValue.value.indexOf("$tend$") > -1)
            ) {
                istemp = true;
            }
            return istemp;
        },
        getClass() {
            //文本文字的左对齐和右对齐
            return this.textLayout == "right" ?
                "layout_box rowLayout" :
                "layout_box_left rowLayout_left";
        },
        rowSpanLable() {
            if (dsf.config.commonForm.WangStyle) {
                return 4
            }
            return 8
        },
        rowSpanText() {
            if (dsf.config.commonForm.WangStyle) {
                return 20
            }
            return 16
        },
        isShowLable() {
            return this.metaData.showLable == null || this.metaData.showLable == undefined || this.metaData.showLable == true
        }
    },
    methods: {
        confirmFn(data) {
            console.log(this.controlData);
        },
        inpFn(val) {
            this.controlData = val;
        },
        //选人---赋值
        selectuser(obj) {
            // console.log('选人赋值',this.controlData)
        },
        //意见---赋值
        getOptions(val) {
            console.log("意见赋值", this.controlData);
        },
        controlAction() {
            this.$refs.control.showPicker();
        },
        changeFileCode(val) {
            this.fileCode = val;
        },
        controlEditOpinion(val) {
            console.log(val);
            this.$emit("controlEditOpinion", val);
        },
    },
};
</script>

<style lang="scss" scoped>
.flex {
    display: flex;
}

.ac {
    align-items: center;
}

.layout_box {
    width: auto;
    margin: 0 5px;
    min-height: 55px;
    padding: 10px 0;
    background: white;
    box-sizing: border-box;
    border-bottom: 6px solid #f5f5f5;

    // padding-top:4px;
    .left {
        height: 100%;
    }
}

.layout_box_left {
    width: auto;
    //min-height:55px;
    //padding:10px 0;
    background: white;
    box-sizing: border-box;
    //border-bottom: 6px solid #f5f5f5;
    // padding-top:4px;
    // margin-bottom: 4px;
    margin: 0 5px 4px;

    .left {
        height: 100%;
    }

    .right {
        border-left: 4px solid #f5f5f5;
        margin-left: 15px;
    }
}

.layout_box_title {
    width: 100%;
    // min-height:50px;
    padding: 7px 0;
    background-color: #f5f5f5;
    color: #2271b3;
    box-sizing: border-box;
    border-bottom: 6px solid #f5f5f5;

    // padding-top:4px;
    .left {
        height: 100%;
    }
}

.issubForm {
    border-bottom: 1px solid #e5e5e5;
}

.je {
    justify-content: flex-end;
}

.right {
    padding-right: 16px;
}

.colLayout {
    padding: 0 10px;
}
</style><style lang="scss">
.formLayoutCPYD {
    .layout_box .right .van-cell {
        padding-right: 0px;
        padding-top: 0px;
        padding-bottom: 0px;
    }

    .layout_box input {
        font-size: var(--font_size_3);
    }

    .layout_box {
        font-family: PingFangSC-Regular;

        .van-field--error {
            input::-webkit-input-placeholder {
                color: #969799 !important;
            }

            textarea::-webkit-input-placeholder {
                color: #969799 !important;
            }
        }

        textarea::-webkit-input-placeholder {
            color: #969799 !important;
        }

        .van-field__error-message {
            text-align: right;
        }
    }

    .rowLayout {
        display: flex;
        align-items: center;

        .van-field__error-message {
            text-align: right;
        }

        .van-field__control {
            text-align: right;
        }

        a {
            text-align: right;
        }
    }

    .rowLayout_left {
        display: flex;
        align-items: center;

        .van-field__error-message {
            text-align: left;
        }

        .van-field__control {
            text-align: left;
        }

        a {
            text-align: left;
        }
    }

    .card {
        .issubForm {
            .controlTextarea>.textareaBox {
                padding: 6px;
                font-size: var(--font_size_3);
                // border:1px solid #e4e4e4;
                border-radius: 5px;
                outline: none;
                -webkit-appearance: none;
            }

            .controlTextarea {
                .van-field__body {
                    border: none;
                }
            }

            .van-field__body {
                padding: 6px !important;
                padding-left: 0 !important;
                // border:1px solid #e4e4e4;
                font-size: var(--font_size_3);
                // background:#ebeff5;
                border-radius: 5px;
            }
        }
    }

}

// .wenhao .van-field__control{
//   text-align:right;
// }
</style>

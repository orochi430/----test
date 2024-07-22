<template>
<div class='controlEditOpinion'>
    <van-field :class='{controlTextBox: !readonly}' v-model="metaData.extra.opinionContent" :rows="readonly?1:3" :border='controlData.border' :disabled='controlData.disabled' :clearable='controlData.clearable' :error-message='controlData.errorMessage' :placeholder='controlData.placeholder' :input-align='controlData.inputAlign' :left-icon="controlData.leftIcon" :right-icon="controlData.rightIcon" :rules="controlData.rules" :formatter='controlData.formatter' :readonly="readonly" @input='inpFn' type='textarea' @focus='toFocus("focus",$event)' @clear="toClear('clear',$event)" @click='toClick("click",$event)' @blur="toBlur('blur',$event)" :name="metaData&&metaData.metaId?metaData.metaId:''">
        <template #button>
            <slot name="button"></slot>
        </template>
    </van-field>
    <div class="mould" v-if="!readonly">
        <div class="_file_log">
            <van-tag v-for="(item,index) in tempTags" :key="index" class="_file_tags" size="medium" type="primary" :closeable="true" @close="clearTags(item)" @click="addContent(item)">{{item.context}}</van-tag>
            <span v-if="tags.length > 2" class="show-more" @click="showMore = !showMore">{{ showMore ? '收起': '更多'}}</span>
        </div>
        <div class="mould-button" @click="addTemplate()">设为模板</div>
        <!-- <van-button @click="addTemplate()" size="small" type="info">设为模板</van-button> -->
    </div>
    <!-- <div class="cutLine"></div> -->
</div>
</template>

<script>
import propMixin from "./mixin";
import validators from "../validators"
export default {
    name: 'controlTextBox',
    mixins: [propMixin],
    model: {
        prop: 'value',
        event: 'input'
    },
    props: {
        formMeta: {
            type: Object,
            default: () => {
                return {};
            },
        },
        subFormIndex: {
            type: Number,
            default: null
        }
    },
    data() {
        return {
            bindValue: this.value.value,
            controlData: {
                begin: 0,
                end: 10,
                defaultValue: "编号",
                inputType: null, //类型
                clearable: true, //删除按钮
                leftIcon: '', //左icon
                rightIcon: '', //右icon
                // formatter:this.formatternum,//验证函数
                inputAlign: 'right',
                errorMessage: '', //底部错误提示文案
                rules: [], //,{required: true, message: '超出最大长度',validator:this.validatorFn}
                placeholder: '',
                maxlength: "",
                readonly: false,
            },
            reg: [],
            ifSuccess: false,
            tags: [],
            showWrite: false,
            formData: null,
            lineWidth: 6,
            lineColor: "#000000",
            bgColor: "white",
            isCrop: false,
            imgUrl: "",
            flowinfo: {},
            flowKey: "",
            pk: this.$route.params.pk,
            shuiyin_div: null, //动态添加的水印dom
            showMore: false
        }
    },
    computed: {
        tempTags() {
            return this.showMore ? this.tags : this.tags.slice(0, 2)
        },
    },
    watch: {
        value(val) {
            this.bindValue = this.value.value
        },
    },
    created() {
        this.readonly = !this.metaData.privilege.editable
        this.getAdvice()
        let user = dsf.util.loadSessionStore("user")
        this.$nextTick(() => {
            this.formData = this.findForm(this).formMeta.parameters
            // let parentFormData = this.$parent.$parent.$parent.$parent.$parent.$parent.formData;
            //console.log(this.formData,this.$parent.$parent.$parent.$parent.$parent.$parent.formData)
            this.distribKey = `distrib-${this.pk}-${this.formData.distribId}`
            this.distribinfo = {
                [this.distribKey]: {
                    "id": this.formData.distribId,
                    "fid": this.formData.fdistribId,
                    "infoId": this.pk,
                    "status": 1,
                    "shareContent": this.metaData.extra.opinionContent,
                    "shareFiles": []
                }
            }
            if (this.metaData.extra.opinionContent) this.inpFn(this.metaData.extra.opinionContent)
            //console.log(this.flowinfo)
        })

    },
    methods: {
        inpFn(val) {
            // this.$bus.emit('inpBus', { ...this.value,metaData:this.metaData,subFormIndex:this.subFormIndex});
            this.distribinfo[this.distribKey].shareContent = val
            this.$emit("controlShareOpinion", this.distribinfo)
            // console.log(this.flowinfo[this.flowKey])
            this.controlData.errorMessage = ''
        },
        toFocus(val) {
            // this.$emit('focus',this.value)
        },
        toClear() {
            // this.$emit('clear',this.value)
        },
        toClick() {
            // this.$emit('clear',this.value)
        },
        // 获取常见意见模板
        getAdvice() {
            if (!this.readonly&&this.metaData.extra.tempList) {
                dsf.http.get('fn/mobileUsedOpinion/find')
                    .then(res => {
                        this.tags = res.data.rows;
                    });
            }
        },
        clearTags(item) {
            this.$dialog.confirm({
                title: '提示',
                message: '确定要删除吗？'
            }).then(() => {
                dsf.http.get('fn/mobileUsedOpinion/delete?id=' + item.id)
                    .then(() => {
                        this.getAdvice();
                    });
            })

        },
        addContent(item) {
            this.metaData.extra.opinionContent = item.context;
            this.distribinfo[this.distribKey].shareContent = item.context
            this.$emit("controlShareOpinion", this.distribinfo)
        },
        addTemplate() {
            if (this.tags.find(item => this.metaData.extra.opinionContent == item.context)) {
                dsf.layer.toast("模板内容已重复");
                return
            }
            if (this.metaData.extra.opinionContent != "") {
                dsf.http
                    .post("fn/mobileUsedOpinion/add", {
                        __DATA: JSON.stringify({
                            opinion: this.metaData.extra.opinionContent,
                        }),
                    })
                    .then((data) => {
                        this.getAdvice();
                    });
            } else {
                dsf.layer.toast('请输入内容');
            }
        },
        toBlur() {
            this.metaData.extra.opinionContent = this.metaData.extra.opinionContent.replace(/(^\s*)|(\s*$)/g, "") // 去除首尾空格
        },
        validatorFn(val) { //require验证方法
            // if(val.length<this.controlData.begin||val.length>this.controlData.end){
            // 	this.bindValue=''
            // 	this.controlData.errorMessage=this.controlData.rules[1].message
            // }
        },
        // formatternum(value){
        // 	return value.replace(/[^0-9-]+/, '');//输入是验证是否符合规则
        // }

    }
}
</script>

<style lang="scss" scoped>
@import "../../../assets/styles/themes.scss";
@import "../../../assets/styles/mixin.scss";

.controlTextBox {
    padding: 0.1rem !important;
    border: 1px solid #e5e5e5;
    border-radius: 2px;
}

.controlEditOpinion {
    ::v-deep .van-field__control {
        text-align: left;
    }

    ::v-deep .van-field__error-message {
        text-align: right;
        /* display:none; */
    }
}

.mould {
    display: flex;
    justify-content: space-between;
    padding-top: 10px;
    align-items: flex-start;

    .show-more {
        @include font-theme('normal');
    }

    .mould-button {
        font-size: var(--font_size_3);
        color: #fff;
        @include background-theme('normal');
        padding: 10px;
        border-radius: 3px;
    }
}

::v-deep ._file_log {
    // padding-left: 16px;
    display: flex;
    flex-wrap: wrap;
    align-items: baseline;
    width: 70%;
    min-height: 50px;
    max-height: 150px;
    overflow-y: auto;
    padding-bottom: 0;

    .van-tag--medium {
        // font-size: var(--font_size_3);
        // @include font-theme('normal', true);
        @include font_6;
        // @include lighter-background-theme('normal', true);
    }

}

._file_tags {
    margin-right: 8px;
    margin-bottom: 8px;
    padding: 10px;
    border-radius: 3px;
}

._file_tags {
    margin-right: 8px;
    margin-bottom: 8px;
}

._file_icon {
    display: flex;
    justify-content: flex-end;
    align-items: center;

    .iconfont {
        @include font-theme("normal");
        @include font_4;
        margin-right: 30px;

        &:last-child {
            margin-right: 0;
        }
    }
}

.cutLine {
    margin-left: 16px;
    height: 1px;
    background: #e5e5e5;
}

.handleWriteBox {
    padding: 15px;
    padding-right: 0;
    background: white;
    font-size: var(--font_size_2);

    .writeContent {
        text-align: center;

        >img {
            height: 200px;
        }
    }

    .writeBtn {
        text-align: right;
        margin-top: 10px;
    }
}

.esignBtnBox {
    display: flex;

    ::v-deep .van-button {
        flex: 1;
        margin: 10px;
    }
}

.esignBox {
    // padding: 10px 10px 0;

    .esignTitle {
        text-align: center;
    }

    .esignWrap {
        overflow: hidden;
        background: white;
        border: 1px solid rgba(0, 0, 0, .09);
    }
}
</style><style>
.overlayClass {
    opacity: 0.8;
}
</style>

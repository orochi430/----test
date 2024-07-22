<template>
<div class='controlHidden'>
</div>
</template>

<script>
import propMixin from "./mixin";
export default {
    name: 'controlHidden',
    mixins: [propMixin],
    model: {
        prop: 'value',
        event: 'input'
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
            ifSuccess: false
        }
    },
    computed: {

    },
    mounted() {

    },
    created() {

    },
    methods: {

    }
}
</script>

<style lang="scss" scoped>
.controlHidden {
    width: 100%;
    padding-left: 15px;
}
</style><style>
.overlayClass {
    opacity: 0.8;
}

.controlHidden .van-field__error-message {
    text-align: right;
    /* display:none; */
}
</style>

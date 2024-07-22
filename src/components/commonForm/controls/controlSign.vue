<template>
<div class='controlSign' v-if="!readonly ||  ( readonly && !!value.value)">
    <div class="van-field__control  van-field">
        <span v-if="value.value" class="sign" v-text="value.value + ' ' + value.time.split(' ')[0]"></span>
        <span v-if="!readonly">
            <van-button type="primary" size="small" @click="signClick(1)" v-if="value.value.indexOf(userinfo.name) == -1" :disabled="signing">签名</van-button>
            <van-button type="primary" size="small" @click='signClick(0)' v-else>取消签名</van-button>
        </span>
    </div>

</div>
</template>

<script>
import propMixin from "./mixin";
export default {
    name: 'controlSign',
    mixins: [propMixin],
    model: {
        prop: 'value',
        event: 'input'
    },
    props: {
        parameters: {
            type: Object,
            default: null,
        }
    },
    data() {
        return {
            userinfo: {},
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
            signing: false // 是否禁止签名（接口调用时避免重复签名）
        }
    },
    computed: {

    },
    created() {
        this.userinfo = dsf.util.loadSessionStore("user");
        this.value.value = this.value.value.split(' ')[0]
    },
    methods: {
        signClick(sign) {
            if (sign == 1) {
                this.signing = true
                dsf.http.post('fn/sign/sortUsers', {
                    userId: `${this.value.userid || ''}${this.value.userid ? ',' : ''}${this.userinfo.user_id}`,
                    infoId: this.parameters.pk
                }).then(res => {
                    if (res.data.code == 200) {
                        this.value.value = res.data.data.userName;
                        this.value.userid = res.data.data.userId;
                        this.value.time = dsf.date.format(new Date(), 'yyyy-mm-dd hh:ii:ss');
                        console.log(this.value)
                    } else {
                        dsf.layer.toast(res.data.message)
                    }
                }).error(() => { // 未升级无排序接口，直接将签名在最后面
                    let temp = this.value.userid.split(',').filter(item => item != '')
                    temp.push(this.userinfo.user_id);
                    this.value.userid = temp.join(',')
                    temp = this.value.value.split(',').filter(item => item != '')
                    temp.push(this.userinfo.name);
                    this.value.value = temp.join(',')
                    this.value.time = dsf.date.format(new Date(), 'yyyy-mm-dd hh:ii:ss');
                }).always(() => {
                    this.signing = false
                })
            } else {
                let val = this.value.value.split(',').filter(item => item != this.userinfo.name).join(',')
                let userId = this.value.userid.split(',').filter(item => item != this.userinfo.user_id).join(',')
                this.value.value = val;
                this.value.userid = userId;
                //console.log("取消签名")
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.controlSign {
    width: 100%;
}

.infoColor {
    color: #3296fa !important;
    flex: 1;
}

.van-field {
    img {
        width: 16px;
        height: 16px;
        margin: 3px 8px;
    }

    .sign {
        display: inline-block;
        vertical-align: -webkit-baseline-middle;
    }
}
</style><style>
.overlayClass {
    opacity: 0.8;
}

.controlSign .van-field__error-message {
    text-align: right;
    /* display:none; */
}
</style>

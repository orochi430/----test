<template>
    <div>
        <!-- <div class="title">绑定手机号</div> -->
        <van-form ref="setPwd" @submit="confirm">
            <van-field v-model="phone" :rules="phoneValidator" name="phone" type="tel" placeholder="请输入账号绑定的手机号码" center>
                <template #left-icon>
                    <i class="iconfont iconshouji"></i>
                </template>
            </van-field>
            <!-- <div class="sendCode">
                <van-field v-model="phonecode" :rules="smsValidator" center clearable name="短信验证码" placeholder="请输入验证码">
                    <template #left-icon>
                        <i class="iconfont iconyuechi"></i>
                    </template>
                </van-field>
                <van-button :text="smsBtnText" :disabled="smsBtnEnable" size="small" type="primary" native-type="button" @click="sendSmsCode()"></van-button>
            </div> -->
            <div class="btnbox" style="margin-top: 30px">
                <van-button style="width: 100%; font-size: 19px" round type="info" native-type="submit">确认</van-button>
            </div>
            <div class="changeType">
                <span @click="$emit('toLogin')"><van-icon name="arrow-left" />返回</span>
            </div>
        </van-form>
    </div>
</template>

<script>
export default {
    name:'setPhone',
    data() {
        return {
            phone: '',
            phonecode: '',
            smsBtnText: "发送验证码",
            smsBtnEnable: false,
            randomStr: '',
            phoneValidator: [{ required: true },
                            { pattern:/^1(?:3\d|4[4-9]|5[0-35-9]|6[67]|7[013-8]|8\d|9\d)\d{8}$/, message: '请输入正确手机号' }],
            smsValidator: [{ required: true }],
        }
    },
    methods:{
        confirm(){
            // dsf.http.post(`/fn/mobileSmsAuth/verifyForgetCode`,{
            //     mobile: this.phone,
            //     code: this.phonecode
            // }).then(res => {
            //     dsf.layer.toast(res.data.message);
            //     if(res.data.rcode == 1){ // 验证成功设置手机号进入首页
                    let obj = {
                        key: 'mobile',
                        value: this.phone
                    }
                    dsf.http.post('/fn/mobileUserData/update', {__DATA: JSON.stringify(obj)}).then(response => {
                        if (response.data.code == 200 || response.data.result) {
                            this.$emit('toIndex')
                        }
                    }).error(res => {
                        dsf.layer.toast("接口异常，请联系系统管理员！");
                    })
            //     }
            // }).error(res => {
            //     dsf.layer.toast("接口异常，请联系系统管理员！");
            // })
        },
        // sendSmsCode() {
        //     let self = this;
        //     let loadingIndx = 0;
        //     self.$refs.setPwd.validate("phone").then(() => {
        //         self.smsBtnEnable = true;
        //         loadingIndx = dsf.layer.loading("发送中...");
        //         return dsf.http.post(`/fn/mobileSmsAuth/sendForgetSms`, {mobile: self.phone})
        //     }).then((res) => {
        //         console.log(res);
        //         dsf.layer.closeLoading(loadingIndx);
        //         dsf.layer.toast(res.data.message);
        //         if(res.data.rcode == 1){
        //             let timeCount = res.data.data.time;
        //             let timeInterval = setInterval(() => {
        //                 timeCount--;
        //                 self.smsBtnText = "发送验证码(" + timeCount + ")";
        //                 if (timeCount == 0) {
        //                     clearInterval(timeInterval);
        //                     self.smsBtnEnable = false;
        //                     self.smsBtnText = "发送验证码";
        //                 }
        //             }, 1000);
        //         }else {
        //             self.smsBtnEnable = false;
        //         }

        //     }).error((res) => {
        //         dsf.layer.closeLoading(loadingIndx);
        //         self.smsBtnEnable = false;
        //         console.log(res);
        //         if (res.message.indexOf("404") > -1) {
        //             dsf.layer.toast("短信发送接口异常，请联系系统管理员！");
        //         }
        //     });
        // }
    }
}
</script>
<style lang='scss' scoped>
@import '../assets/styles/themes.scss';
@import '../assets/styles/mixin.scss';
.iconfont {
    font-size: var(--font_size_0);
    @include font-theme("normal");
    padding-right: 6px;
}
.btnbox {
    >button {
        @include linear-background-theme("normal");
        border: 0 !important;
    }
}
.formbox {
    margin: 0 15px;
    transform: translateY(-50px);
    border-radius: 8px;
    background: white;
    padding: 24px;

    .van-cell{
        border: 1px solid #EEEEEE;
        border-radius: 46px;
    }
    .van-cell + .van-cell{
        margin-top: 20px;
    }
    .sendCode {
        display: flex;
        margin-top: 20px;
        button {
            height: inherit;
            width: 130px;
            border-radius: 46px;
            margin-left: 10px;
        }
    }
    .iptLabelImg {
        width: 21px;
        height: 21px;
        margin-right: 15px;
    }
    .auto {
        color: #666;
        margin-top: 16px;
    }
    .btnbox {
        margin-top: 40px;
        >button {
            @include linear-background-theme("normal");
            border: 0 !important;
        }
    }

    .changeType {
        margin-top: 16px;
        display: flex;
        flex-direction: row-reverse;
        justify-content: space-between;
        @include font-theme("button_auxiliary_fontcolor");
    }
}
</style>

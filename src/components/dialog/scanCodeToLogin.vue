<template>
    <van-popup v-model="show" position="top" :style="{ height: '100%' }" safe-area-inset-top>
        <div class="sancode">
            <van-nav-bar title="扫码登录" class="commnav">
            </van-nav-bar>
            <div class="contains">
                <div class="img">
                    <img v-if="imgSrc" :src="imgSrc" alt="" srcset="">
                </div>
                <div class="text">
                    <p v-if="tips">{{ tips }}</p>
                    <template v-else>
                        <p>网页版{{ appName }}登录确认</p>
                        <p>请确认使用本人账号登录</p>
                    </template>
                </div>
                <div class="dologin" @click="doScanLogin">授权登录</div>
            </div>
            <div class="cancel" @click="onClickRight">
                取消登录
            </div>
        </div>
    </van-popup>
</template>

<script>
export default {
    name: 'scanCodeToLogin',
    props: ["scanText"],
    components: {},
    data() {
        return {
            show: true,
            imgSrc: "",
            appName: "",
            tips: dsf.config.login.scanCodeToLogin?.tips
        };
    },
    computed: {},
    watch: {},
    methods: {
        onClickRight() {
            this.$emit("closeDialog")
        },
        doScanLogin() {
            dsf.http.post("fn/mobile/authorize/scan/confirmLogin", {
                data: this.scanText
            }).then(res => {
                if (res.data && res.data.code == 200) {
                    dsf.layer.toast(res.data.message)
                    setTimeout(() => {
                        this.$emit("closeDialog")
                    }, 1500);
                } else {
                    dsf.layer.toast(res.data.message)
                }
            })
        },
        checkQrCode() {
            let self = this;
            dsf.http.post("fn/mobile/authorize/scan/check", {
                data: self.scanText
            }).done(res => {
                console.log(res)
                if (res.code == 200) {
                    self.appName = res.data.appName;
                    if (self.tips) self.tips = self.tips.replace("[appName]", self.appName);
                }
            }).error(err => {
                dsf.layer.alert({
                    message: `二维码错误`
                })
            })
        }
    },
    created() {
        if (dsf.config.login.applicationIcon) {
            this.imgSrc = "./static/images/loginIcons/" + dsf.config.login.applicationIcon
        }
    },
    mounted() {
        this.checkQrCode()
    },
    destroyed() { },
}
</script>

<style lang="scss" scoped>
@import "@/assets/styles/themes.scss";
@import "@/assets/styles/mixin.scss";

.closeColor {
    @include font-theme("normal");
    @include bold;
}

.commnav {
    width: 100%;
    flex-shrink: 0;
    background: #3296FA;

    /deep/ .van-nav-bar__title {
        color: #FFF;
    }
}

.sancode {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;

    .contains {
        width: 100%;
        flex: 1;
        box-sizing: border-box;
        padding: 30px;
        display: flex;
        flex-direction: column;
        align-items: center;

        .img {
            box-sizing: border-box;
            padding: 30px;

            img {
                width: 150px;
                max-height: 150px;
            }
        }

        .text {
            display: flex;
            flex-direction: column;
            align-items: center;

            p {
                font-size: 16px;
                color: #333333;
                margin-top: 12px;
            }
        }

        .dologin {
            width: 100%;
            height: 44px;
            background-image: linear-gradient(90deg, #3296FA 0%, #1A59AA 100%);
            box-shadow: 0px 8px 8px 0px rgba(41, 121, 255, 0.3);
            border-radius: 4px;
            font-size: 16px;
            color: #FFFFFF;
            display: flex;
            align-items: center;
            justify-content: center;
            margin-top: 45px;
        }

    }

    .cancel {
        font-size: 16px;
        color: #1D62B5;
        margin-bottom: 40px;
    }
}
</style>

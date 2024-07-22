<template>
    <div id="hljPad_login">
        <img ref="logImg" src="static/images/hljMedicine/login_logo.png" alt="" />
        <div :style="style_focus" class="login_body">
            <span class="welcome">欢迎登录</span>
            <p>登录</p>
            <van-field v-model="username" placeholder="请输入用户名" clearable />
            <van-field v-model="password" type="password" placeholder="请输入密码" clearable class="pass_box" />

            <van-checkbox v-model="remember_login" checked-color="#1989fa" class="check_login">
                自动登录
            </van-checkbox>
            <button class="login_button" @click="login">立即登录</button>
        </div>
    </div>
</template>

<script>
// import { Field, Checkbox } from 'vant'
import store from '@/common/util'
import B64 from '@/common/base64'
export default {
    name: 'hljPad_login',
    //   components: { Field, Checkbox },
    data() {
        return {
            username: '',
            password: '',
            remember_login: false,
            DeviceId: 'postman',
            DeviceName: 'postman',
            style_focus: '', //弹起时的top高度
        }
    },
    created() {
        this.remember_login = store.loadLocalStore('autoLogin')
        if (this.remember_login) {
            this.username = B64.decode(store.loadLocalStore('userName'))
            this.password = B64.decode(store.loadLocalStore('passWord'))
            this.login()
        }
    },
    mounted() {
        window.onresize = () => {
            console.log(
                '窗口变化了',
                document.body.clientHeight,
                document.documentElement.clientHeight,
                window.innerHeight,
                window.screen.height,
            )
            let current = window.innerHeight
            let all = window.screen.height
            if (all - current > 100) {
                this.style_focus = ` transform: translateY(0);top:${this.top_px + 5}px`
            } else {
                this.style_focus = ''
            }
        }
        this.$nextTick(() => {
            console.log(this.$refs.logImg.offsetHeight)
            this.top_px = this.$refs.logImg.offsetHeight
        })
    },
    methods: {
        login() {
            if (!this.username) {
                dsf.layer.toast('请输入用户名')
                return
            }
            if (!this.password) {
                dsf.layer.toast('请输入密码')
                return
            }
            let postData = {
                __DATA: JSON.stringify({
                    logname: this.username,
                    password: this.password,
                    device_id: this.DeviceId,
                    device_desc: this.DeviceName,
                }),
            }
            let loading = dsf.layer.loading('登录中...')
            let lastLoginType = 'user'
            let self = this
            dsf.http
                .post('/fn/mobileAuth/login', postData)
                .then(function (data) {
                    dsf.layer.closeLoading(loading)
                    store.saveToLocalStore('lastLoginType', lastLoginType)
                    if (data.data.rcode == 1) {
                        store.saveToLocalStore('uid', B64.encode(self.username))
                        store.saveToLocalStore('pid', B64.encode(self.password))
                        store.saveToLocalStore('autoLogin', self.remember_login)
                        store.saveToLocalStore('userName', B64.encode(self.username))
                        store.saveToLocalStore('passWord', B64.encode(self.password))
                        console.log(self.username, self.password)
                        let loginData = data.data
                        self.loginSuccessDeal(loginData)
                    } else if (data.data.rcode == 2) {
                        // 强制修改密码
                        dsf.util.saveToSessionStore('user', {
                            user_id: data.data.data,
                        })
                        dsf.util.saveToSessionStore('homePage', '/changePassWord')
                        self.$router.replace('/changePassWord')
                    } else {
                        self.autoLogin = false
                    }
                    dsf.layer.toast(data.data.message)
                })
                .error((data) => {
                    dsf.layer.closeLoading(self.loading)
                    if (data.message.indexOf('404') > -1) {
                        dsf.layer.toast('登录接口异常，请联系系统管理员！')
                    }
                })
                .always(() => {
                    // dsf.layer.closeLoading(self.loading);
                })
        },
        loginSuccessDeal(loginData) {
            let self = this
            let dateUserTemp = loginData.data
            store.saveToSessionStore('user', dateUserTemp)
            store.saveToSessionStore('loginToken', dateUserTemp.auth.token)
            store.saveToLocalStore('loginToken', dateUserTemp.auth.token)
            store.saveToLocalStore('user', dateUserTemp)
            store.saveToLocalStore('loginData', loginData)
            self.goUrl()
        },
        goUrl() {
            if (dsf.config.login.defaultUrl) {
                this.$router.replace(dsf.config.login.defaultUrl)
            } else {
                this.$router.replace('/hljPadIndex')
            }
        },
    },
}
</script>

<style lang="scss" scoped>
#hljPad_login {
    width: 100vw;
    height: 100vh;
    background: url('../../../../../static/images/hljMedicine/login_background.png') no-repeat;
    background-size: cover;
    background-position: center;
    position: relative;

    img {
        height: 40px;
        width: auto;
        padding: 20px 20px 0;
        box-sizing: content-box;
    }
}

.login_body {
    width: 22.7vw;
    position: absolute;
    right: 17.5%;
    top: 52.5%;
    transform: translateY(-50%);

    .van-field {
        border-radius: 8px;
    }

    >span {
        position: absolute;
        left: -170%;
        font-size: 24px;
        color: #ffffff;
        line-height: 18px;
    }

    >p {
        font-size: var(--font_size_0);
        margin-bottom: 25px;
        color: #ffffff;
        line-height: 18px;
    }

    .pass_box {
        margin: 22px 0 18px;
    }

    .check_login {
        ::v-deep .van-checkbox__label {
            color: #fff;
            font-size: 18px;
        }
    }

    .login_button {
        background-image: linear-gradient(-33deg, #317dfe 0%, #235ec3 100%);
        border-radius: 8px;
        font-size: 18px;
        color: #fff;
        width: 100%;
        height: 50px;
        margin-top: 32px;
    }

    input {
        height: 40px;
        box-sizing: border-box;
        padding: 4px 10px;
        border-radius: 10px;
        border: 1px solid #ccc;
        width: 100%;
    }
}
</style>

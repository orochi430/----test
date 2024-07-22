<template>
<div v-if="!isAutoLogin" class="box" :style="{overflowY: isFullscreenBg > 0 ? 'hidden' : 'scollor'}">
    <div :style="logImgStyle" class="banner" @click="showDeviceId">
        <img :class="{fullscreenBg: isFullscreenBg > 0}" :src="loginBackground" alt="" @load="loadImage" />
        <p class="title" v-html="title"></p>
    </div>
    <div v-show="loginType=='user'" class="formbox loginForm">
        <!-- <div class="login_title">用户登录</div> -->
        <van-form @submit="login">
            <van-field v-model="logname" :rules="[{ required: true }]" name="账号" placeholder="请输入用户名" center>
                <template #left-icon>
                    <i class="iconfont iconzhanghao" @click="showAppVersion()"></i>
                </template>
            </van-field>
            <!-- 淮安市政务外网OA整合项目新增手机号登陆 -->
            <van-field v-if="dsf.config.login.isShowMobile&&dsf.config.login.isSpecialLogin" :rules="phoneValidatorMobile" v-model="mobile" name="phone" type="tel" placeholder="请输入手机号码" center>
                <template #left-icon>
                    <i class="iconfont iconshouji"></i>
                </template>
            </van-field>
            <van-field v-model="txtpassword" :rules="[{ required: true }]" type="password" name="密码" placeholder="请输入密码" center>
                <template #left-icon>
                    <i class="iconfont iconmima1" @click="showBuildTime()"></i>
                </template>
            </van-field>
            <!-- 湖北增加动态临牌登录框 -->
            <van-field v-if="dsf.config.login.isTokenLogin&&dsf.config.login.isSpecialLogin" :rules="[{ required: true }]" v-model="tokenCode" name="phone" type="tel" placeholder="请输入动态令牌" center>
                <template #left-icon>
                    <i class="iconfont iconsecurity"></i>
                </template>
            </van-field>
            <van-row type="flex" justify="space-between" class="auto">
                <van-checkbox v-if="isShowAuto > 0" v-model="checked" icon-size="16" shape="square">
                    自动登录
                </van-checkbox>
                <span v-if="isShowForget > 0" @click="forgetPassword()">忘记密码</span>
            </van-row>
            <div class="btnbox" style="margin-top: 30px">
                <van-button v-if="autoLogin" :disabled="autoLogin" style="width: 100%; font-size: 19px" round type="info" native-type="submit">登录中...</van-button>
                <van-button v-else style="width: 100%; font-size: 19px" round type="info" native-type="submit">登录</van-button>
            </div>
            <div v-if="isShowChangeType" class="changeType">
                <span v-if="isShowSmsLogin > 0" @click="changeLoginType('sms')">短信验证码登录</span>
                <span v-if="dsf.util.loadLocalStore('gesture_pas')" @click="changeLoginType('gesture')">手势登录</span>
            </div>
        </van-form>
        <van-icon v-if="dsf.config.login.isShowIcon" name="static/images/icon-img.png" size="50" class="login_icon" />
    </div>

    <div v-if="loginType=='sms'" class="formbox loginForm">
        <!-- <div class="login_title">短信验证码登录</div> -->
        <van-form ref="smslogin" @submit="login">
            <van-field v-model="phone" :rules="phoneValidator" name="phone" type="tel" placeholder="请输入手机号码" center>
                <template #left-icon>
                    <i class="iconfont iconshouji"></i>
                    <!-- <van-image class="mobile" src="../assets/imgs/mobile.png" /> -->
                </template>
            </van-field>
            <div class="sendCode">
                <van-field v-model="phonecode" :rules="[{ required: true }]" center clearable name="短信验证码" placeholder="请输入验证码">
                    <template #left-icon>
                        <i class="iconfont iconyuechi"></i>
                        <!-- <van-image class="mobile" src="../assets/imgs/yzm.png" /> -->
                    </template>
                    <!-- <template #button>
                        <van-button :text="smsBtnText" :disabled="smsBtnEnable" size="small" type="primary" native-type="button" @click="sendSmsCode()"></van-button>
                    </template> -->
                </van-field>
                <van-button :text="smsBtnText" :disabled="smsBtnEnable" size="small" type="primary" native-type="button" @click="sendSmsCode()"></van-button>
            </div>

            <van-row type="flex" justify="space-between" class="auto">
                <van-checkbox v-if="isShowAuto > 0 && dsf.config.login.tokenAutologin" v-model="checked" icon-size="16" shape="square">
                    自动登录
                </van-checkbox>
                <van-checkbox v-model="checkedPhone" icon-size="16" shape="square">
                    记住手机号
                </van-checkbox>
            </van-row>
            <div class="btnbox" style="margin-top: 30px">
                <van-button style="width: 100%; font-size: 19px" round type="info" native-type="submit">登录</van-button>
            </div>
            <div v-if="isShowChangeType" class="changeType">
                <span @click="changeLoginType('user')">账号登录</span>
                <span v-if="dsf.util.loadLocalStore('gesture_pas')" @click="changeLoginType('gesture')">手势登录</span>
            </div>
        </van-form>
        <van-icon v-if="dsf.config.login.isShowIcon" name="static/images/icon-img.png" size="50" class="login_icon" />
    </div>
    <div v-if="loginType=='gesture'" class="formbox loginForm">
        <gesture gesture-type="check" @gestureError="forgetGesture"></gesture>
        <div v-if="isShowChangeType" class="changeType">
            <span @click="changeLoginType('user')">账号登录</span>
            <span v-if="isShowSmsLogin > 0" @click="changeLoginType('sms')">短信验证码登录</span>
        </div>
    </div>

    <div v-if="loginType=='forgetPassword'" class="formbox loginForm">
        <forget-password @toLogin="changeLoginType('user')"></forget-password>
    </div>

    <!-- 强制维护手机号 -->
    <div v-if="loginType=='setPhone'" class="formbox loginForm">
        <set-phone @toLogin="dsf.util.logOut(); changeLoginType('user')" @toIndex="toNext()"></set-phone>
    </div>
</div>
</template>

<script>
// import { post, get } from "@/common/http";
import store from "@/common/util";
import B64 from "@/common/base64";
import gesture from '@/components/common/gesture'
import forgetPassword from './forgetPassword'
import setPhone from './setPhone'

export default {
    components: {
        gesture,
        forgetPassword,
        setPhone
    },
    data() {
        return {
            isAutoLogin: dsf.util.loadLocalStore('autoLogin') && !dsf.util.loadLocalStore("gesture_pas"),
            logname: "",
            txtpassword: "",
            tokenCode: "",
            checked: false,
            checkedPhone: false,
            title: "",
            DeviceId: "postman",
            DeviceName: "postman",
            loginType: "",
            phone: "",
            mobile: '',
            phonecode: "",
            smsBtnText: "发送验证码",
            smsBtnEnable: false,
            errorMessage: "",
            hasGesture: false,
            logImgStyle: {
                height: "5rem"
            },
            loading: null,
            autoLogin: false,
            phoneValidator: [{
                    required: true
                },
                {
                    pattern: /^1(?:3\d|4[4-9]|5[0-35-9]|6[67]|7[013-8]|8\d|9\d)\d{8}$/,
                    message: '请输入正确手机号'
                }
            ],
            //  淮安市政务外网OA整合项目新增手机号登陆
            phoneValidatorMobile: [{
                required: true
            }],
            clickIndex: 0, // 点击次数
            // 是否可自动登录
            isShowAuto: dsf.config.setting.hasOwnProperty('SYS-MOBILE-STYLE-0004') ? (dsf.config.setting['SYS-MOBILE-STYLE-0004'] || -1) : -1,
            // 是否开启忘记密码
            isShowForget: dsf.config.setting.hasOwnProperty('SYS-MOBILE-STYLE-0006') ? (dsf.config.setting['SYS-MOBILE-STYLE-0006'] || -1) : -1,
            // 是否可短信验证码登录
            isShowSmsLogin: dsf.config.setting.hasOwnProperty('SYS-MOBILE-STYLE-0005') ? (dsf.config.setting['SYS-MOBILE-STYLE-0005'] || -1) : -1,
            // 是否全屏背景
            isFullscreenBg: dsf.config.setting.hasOwnProperty('SYS-MOBILE-STYLE-0007') ? (dsf.config.setting['SYS-MOBILE-STYLE-0007'] || -1) : -1,
            forgetPwdMsg: dsf.config.setting.hasOwnProperty('SYS-MOBILE-CAPTCHA-0004') ? (dsf.config.setting['SYS-MOBILE-CAPTCHA-0004'] || '请联系管理员') : '请联系管理员',
            isShowChangeType: dsf.config.login.isShowChangeType === undefined ? true : dsf.config.login.isShowChangeType,
            clickTime: 0,
            RSA_PUBLIC: dsf.config.setting['RSA_PUBLIC'] || "", //加密秘钥
            isIm: false,
            findPassword: 0
        };
    },
    computed: {
        // 背景图
        loginBackground() {
            let defaultImg = require('static/images/loginLogo.png')
            if (dsf.util.getClientType() == 'iPad' && dsf.config.setting['SYS-MOBILE-STYLE-0008']) {
                return dsf.url.getServerUrl(`fn/file/downloadImage?fileName=${dsf.config.setting['SYS-MOBILE-STYLE-0008']}`)
            } else {
                return dsf.config.setting['SYS-MOBILE-STYLE-0003'] ? dsf.url.getWebPath(dsf.config.setting['SYS-MOBILE-STYLE-0003']) : defaultImg
            }
        }
    },
    beforeMount() {
        this.title = dsf.config.login.title;
        //不能全部清空
        // store.clearSession();
        // store.clearLocalStore();
    },
    beforeRouteLeave(to, from, next) {
        //console.log(to, from, next);
        let tocken = dsf.util.loadSessionStore("loginToken");
        if (!tocken && from.name == "testLogin" && to.name.toLowerCase().indexOf("login") < 0 && to.name != "changePassWord") {
            dsf.layer.toast(
                "您进行了未授权的访问，请重新登录！",
                undefined,
                function () {
                    next("/testLogin");
                }
            );
        } else {
            next();
        }
    },
    mounted() {
        dsf.util.removeSessionStore("defaultcount");
        //1) 指纹登录优先级最高
        //2） 自动登录 且没有设置手势
        let self = this;
        // dsf.util.saveToLocalStore('autoLogin', false)
        // if(self.isShowAuto){
        //     dsf.util.saveToLocalStore('autoLogin', true)
        // }

        store.loadLocalStore("autoLogin")

        if (store.loadLocalStore("openFingerprint") && dsf.util.getClientName() == "app") {
            xsfCommon.getStatus("", function success(res) {
                    //dsf.layer.closeLoading(self.loading);
                    if (String(res) === "true") {
                        let loginDataString = dsf.util.loadLocalStore("loginData");
                        if (loginDataString) {
                            let loginDataObj = loginDataString;
                            self.loginSuccessDeal(loginDataObj)
                        }
                    }
                },
                function error(err) {
                    dsf.layer.toast("获取指纹解锁状态失败")
                    //dsf.layer.closeLoading(self.loading);
                }
            );
            this.loading = dsf.layer.loading("登录中...");
        } else if (store.loadLocalStore("autoLogin") && !store.loadLocalStore("gesture_pas")) {

            this.checked = store.loadLocalStore("autoLogin");
            this.logname = B64.decode(store.loadLocalStore("userName"));
            this.txtpassword = B64.decode(store.loadLocalStore("passWord"));
            // 淮安市政务外网OA登录增加手机号字段
            if (dsf.config.login.isShowMobile && dsf.config.login.isSpecialLogin) {
                this.mobile = B64.decode(store.loadLocalStore("mobile"));
                if (!this.mobile) return;
            }

            if (!this.logname || !this.txtpassword) return;
            if (this.checked) {
                this.autoLogin = true;
                this.loading = dsf.layer.loading("登录中...");
                if (store.getClientName() == "app") {
                    this.deviceready(this.login)
                } else {
                    this.login()
                }
            }
        }

        //记住手机号码
        if (store.loadLocalStore("phone")) {
            this.checkedPhone = true;
            this.phone = B64.decode(store.loadLocalStore("phone"));
        }
        //添加窗口监听事件
        // window.addEventListener("resize", this.renderResize, false)
    },
    created() {
        let self = this;
        this.hasGesture = store.loadLocalStore("gesture_pas") ? true : false
        self.loginType = this.hasGesture ? "gesture" : (dsf.config.login.defaultLoginType || "user");
        if (store.getClientName() == "app") {
            this.deviceready()
        }

        //VPN传入参数 自动登录
        if (this.$route.query.ud && this.$route.query.pd) {
            this.logname = this.$route.query.ud;
            this.txtpassword = this.$route.query.pd;
            if (dsf.config.autoLogin) {
                this.autoLogin = true;
                this.loading = dsf.layer.loading("登录中...");
                this.login();
            }
        }

        if (this.$route.query.isIm) {
            this.isIm = this.$route.query.isIm == 1
        }

        if (navigator.userAgent.indexOf("mobileIM") >= 0) {
            this.isIm = true
        }

        if (this.$route.query.findPassword && this.$route.query.findPassword == 1) {
            this.findPassword = 1
            this.loginType = 'forgetPassword'
        }
    },
    methods: {
        deviceready(callback) {
            let self = this;
            document.addEventListener("deviceready", function () {
                console.log("deviceready_testlogin");
                if (dsf.util.checkSystem() == 'ios') {
                    console.log(device);
                    self.DeviceId = device.uuid
                    store.saveToLocalStore("DeviceId", self.DeviceId);
                    self.DeviceName = device.model
                    store.saveToLocalStore("DeviceName", self.DeviceName);
                    if (callback) callback()
                } else {
                    console.log(xsfCommon);
                    xsfCommon.SystemTools(
                        ["DeviceId"],
                        function (result) {
                            console.log(result);
                            self.DeviceId = JSON.parse(result).DeviceId;
                            store.saveToLocalStore("DeviceId", self.DeviceId);
                            xsfCommon.SystemTools(["DeviceName"],
                                function (result) {
                                    console.log(result);
                                    self.DeviceName = JSON.parse(result).DeviceName;
                                    store.saveToLocalStore("DeviceName", self.DeviceName);
                                    if (callback) callback()
                                },
                                function (error) {
                                    alert("open failed: " + error);
                                }
                            );
                        },
                        function (error) {
                            alert("open failed: " + error);
                        }
                    );

                }
            });
        },
        showDeviceId() {
            let self = this
            self.clickIndex++;
            setTimeout(function () {
                self.clickIndex = 0;
            }, 300);
            console.log(self.clickIndex)
            if (self.clickIndex > 1) {
                if (self.DeviceId != 'postman') {
                    dsf.layer.alert({
                        title: '温馨提示',
                        message: `您的设备码为：${self.DeviceId}`
                    })
                }
                self.clickIndex = 0;
            }
        },
        loadImage() {
            this.logImgStyle = {};
        },
        forgetPassword() {
            if (this.isShowSmsLogin <= 0) {
                dsf.layer.alert({
                    title: '提示',
                    message: this.forgetPwdMsg
                }, () => {})
            } else {
                this.changeLoginType('forgetPassword')
            }
        },
        gestureError() {
            this.loginType = 'user'
            this.hasGesture = false
        },
        forgetGesture() { // 忘记手势 留账号，其余全部清空
            this.logname = store.loadLocalStore("userName") ? B64.decode(store.loadLocalStore("userName")) : ''
            store.logOut()
            this.changeLoginType("user")
        },
        goUrl() {
            if (dsf.config.login.defaultUrl) {
                this.$router.replace(dsf.config.login.defaultUrl);
            } else {
                this.$router.replace("/index");
            }
        },
        async login() {
            let self = this;
            let url = "";
            let postData = {};
            let lastLoginType = "";
            let autoToken = store.loadLocalStore("user") ? store.loadLocalStore("user").autoToken : ''
            if (autoToken && dsf.config.login.tokenAutologin && this.checked) { // 使用authtoken自动登录
                url = `/fn/mobileAuth/autoByToken?autoToken=${autoToken}&uuid=${self.DeviceId}&brand=${self.DeviceName}`
            } else if (self.loginType == "user") {
                //记录上次登录类型
                lastLoginType = "user"
                if (dsf.config.login.isSpecialLogin) { // 项目组特殊登录 配置specialLoginParams模板字符串取参后转入posyData对象
                    url = "/fn/mobileProjectAuth/auth"
                    // //此处代码当密码中有“,”逗号时，将会把密码逗号后面的分割掉了，所以修改成每个字符串单独返回而不是一次性返回  2022年5月17日02:55:28  @ly
                    // let str = 'return ' + dsf.config.login.specialLoginParams;
                    // let func = new Function('logname', 'password', 'deviceId', str);
                    // let paramArr = func(this.logname, this.txtpassword, this.DeviceId).split(",")
                    // paramArr.forEach(item => {
                    //     let key = item.split(':')[0]
                    //     let val = item.split(':')[1]
                    //     postData[key] = val
                    // })
                    if (dsf.config.login.isShowMobile) {
                        var tempData1 = ['logname', 'password', 'mobile'] //config.json配置的key
                        var tempData2 = ['logname', 'txtpassword', 'mobile'] //本地要取值的key
                        var paramArr = dsf.config.login.specialLoginParamsPhone.split(',')
                    } else {
                        var tempData1 = ['logname', 'password', 'deviceId', 'mobile', "tokenCode"] //config.json配置的key
                        var tempData2 = ['logname', 'txtpassword', 'DeviceId', 'mobile', "tokenCode"] //本地要取值的key
                        var paramArr = dsf.config.login.specialLoginParams.split(',')
                    }

                    paramArr.forEach((element, index) => {
                        let str = 'return `' + element.replace(/`/g, "") + "`";
                        let func = new Function(tempData1[index], str);
                        let item = func(self[tempData2[index]])
                        let key = item.split(':')[0]
                        let val = item.split(':')[1]
                        postData[key] = val
                    });
                } else {
                    url = dsf.config.login.specialLoginUrl ? dsf.config.login.specialLoginUrl : "/fn/mobileAuth/login";
                    let password = this.txtpassword;
                    let logname = this.logname;
                    if (this.RSA_PUBLIC) {
                        await dsf.http.post("fn/common/getConfig", {
                            type: 'browser'
                        }).then(res => { // 每次调登录接口前重新获取RSA_PUBLIC密钥，避免后台密钥被清除导致登录报错
                            this.RSA_PUBLIC = res.data.setting.RSA_PUBLIC
                        })
                        logname = this.encrypt(this.logname);
                        password = this.encrypt(this.txtpassword);
                        url = dsf.config.login.specialLoginUrl ? dsf.config.login.specialLoginUrl : "/fn/mobileAuth/login?decrypt=RSA";
                    }
                    postData = {
                        __DATA: JSON.stringify({
                            logname: logname,
                            password: password,
                            device_id: self.DeviceId,
                            device_desc: self.DeviceName,
                        }),
                    };
                }
            } else {
                lastLoginType = "sms"
                url = `/fn/mobileSmsAuth/login?mobile=${self.phone}&code=${self.phonecode}&uuid=${self.DeviceId}&brand=${self.DeviceName}`;
            }
            dsf.http.post(url, postData).then(function (data) {
                dsf.layer.closeLoading(self.loading);
                store.saveToLocalStore('lastLoginType', lastLoginType)
                if (data.data.rcode == 1) {
                    store.saveToLocalStore("uid", B64.encode(self.logname));
                    store.saveToLocalStore("pid", B64.encode(self.txtpassword));
                    store.saveToLocalStore("autoLogin", self.checked);
                    //记住账号密码
                    // if (self.checked) {
                    store.saveToLocalStore("userName", B64.encode(self.logname));
                    store.saveToLocalStore("passWord", B64.encode(self.txtpassword));
                    // 淮安市政务外网OA登录增加手机号字段
                    if (dsf.config.login.isShowMobile && dsf.config.login.isSpecialLogin) {
                        store.saveToLocalStore("mobile", B64.encode(self.mobile));
                    }
                    // } else {
                    //     store.removeToLocalStore("userName");
                    //     store.removeToLocalStore("passWord");
                    // }
                    //记住手机号码
                    if (self.checkedPhone) {
                        store.saveToLocalStore("phone", B64.encode(self.phone));
                    } else {
                        store.removeToLocalStore("phone");
                    }

                    let loginData = data.data;
                    self.loginSuccessDeal(loginData)
                } else if (data.data.rcode == 2) {
                    // 强制修改密码
                    dsf.util.saveToSessionStore('user', {
                        user_id: data.data.data
                    })
                    dsf.util.saveToSessionStore('homePage', '/changePassWord')
                    self.$router.replace('/changePassWord')
                } else {
                    if (dsf.config.login.tokenAutologin) {
                        dsf.util.removeSessionStore('user');
                        dsf.util.removeToLocalStore('user');
                    }
                    self.autoLogin = false;
                    self.isAutoLogin = false;
                }
                dsf.layer.toast(data.data.message, "html");
            }).error((data) => {
                self.isAutoLogin = false;
                dsf.layer.closeLoading(self.loading);
                if (data.message.includes("404")) {
                    dsf.layer.toast("登录接口异常，请联系系统管理员！");
                }
            }).always(() => {
                // dsf.layer.closeLoading(self.loading);
            });
        },
        loginSuccessDeal(loginData) {
            let dateUserTemp = loginData.data;
            store.saveToSessionStore("user", dateUserTemp);
            store.saveToSessionStore("loginToken", dateUserTemp.auth.token);
            store.saveToLocalStore("loginToken", dateUserTemp.auth.token);
            store.saveToLocalStore("user", dateUserTemp);
            store.saveToLocalStore("loginData", loginData);
            if (dsf.config.setting['SYS-MOBILE-0002'] == 1 && !dateUserTemp.mobile) { // 系统设置登录账号强制维护手机号且账号手机为空
                this.changeLoginType("setPhone")
                return
            }
            this.toNext()
        },
        toNext() {
            let self = this;
            let dateUserTemp = store.loadSessionStore("user")
            let loginData = store.loadLocalStore("loginData")
            store.logIn(function () {
                let userid = dateUserTemp.user_id;
                // 判断登录以后是否需要CA认证
                console.log('Client', store.getClientName())
                console.log('shkt', loginData.shkt, loginData.shkt == 1)
                if (store.getClientName() == "app" && loginData.shkt == 1) {
                    console.log('xsfCommon')
                    xsfCommon.bsCaLogin("", function (result) {
                            let res = JSON.parse(result).result
                            console.log('bsCaLogin', result, typeof (result))
                            if (res == true) self.goUrl();
                        },
                        function (error) {
                            console.log('bsCaLogin', error, typeof (error))
                            dsf.layer.toast(err);
                        })
                    return
                }
                //判断是否登录以后保存UUID和设备名称
                if (dsf.config.login.loginSaveUUID) {
                    let deviceUrl = "fn/sso/devicesave?DeviceId=" + self.DeviceId + "&DeviceName=" + self.DeviceName + "&userId=" + userid;
                    dsf.http.get(deviceUrl).then((data) => {
                        self.goUrl();
                    }).catch((err) => {
                        dsf.layer.toast(err.message);
                    });
                } else {
                    self.goUrl();
                }
            });
        },
        changeLoginType(type) {
            this.loginType = type
            return false
        },
        validator(val) {
            let self = this;
            let checkReg = /^1(?:3\d|4[4-9]|5[0-35-9]|6[67]|7[013-8]|8\d|9\d)\d{8}$/;
            if (!val.length) {
                self.errorMessage = "";
                return false
            } else if (!checkReg.test(self.phone)) {
                self.errorMessage = "请输入正确的手机号码";
                return false;
            }
            return true;
        },
        sendSmsCode() {
            let self = this;
            let loadingIndx = 0;
            self.$refs.smslogin.validate("phone").then(() => {
                self.smsBtnEnable = true;
                loadingIndx = dsf.layer.loading("发送中...");
                return dsf.http.get(`/fn/mobileSmsAuth/sendSms?mobile=${self.phone}&uuid=${self.DeviceId}&brand=${self.DeviceName}`, {})
            }).then((data) => {
                if (data.data.rcode == 1) {
                    console.log(data);
                    dsf.layer.closeLoading(loadingIndx);
                    dsf.layer.toast("发送成功！");
                    let timeCount = 60;
                    let timeInterval = setInterval(() => {
                        timeCount--;
                        self.smsBtnText = "发送验证码(" + timeCount + ")";
                        if (timeCount == 0) {
                            clearInterval(timeInterval);
                            self.smsBtnEnable = false;
                            self.smsBtnText = "发送验证码";
                        }
                    }, 1000);
                } else {
                    dsf.layer.toast(data.data.message);
                    self.smsBtnEnable = false;
                }
            }).error((data) => {
                dsf.layer.closeLoading(loadingIndx);
                self.smsBtnEnable = false;
                console.log(data);
                if (data.message.indexOf("404") > -1) {
                    dsf.layer.toast("短信发送接口异常，请联系系统管理员！");
                }
            });

        },
        showAppVersion() {
            this.clickTime = new Date().getTime();
            setTimeout(() => {
                if (new Date().getTime() - this.clickTime < 500) {
                    // console.log('双击事件');
                    cordova.getAppVersion.getVersionCode(function (args) {
                        dsf.layer.toast('当前APP的版本为：一体化' + args);
                    }, function (err) {
                        dsf.layer.toast(err);
                    });
                }
            }, 500)
        },
        showBuildTime() {
            this.clickTime = new Date().getTime();
            setTimeout(() => {
                if (new Date().getTime() - this.clickTime < 500) {
                    //console.log(JSON.stringify(moment(new Date()).format('YYYY-MM-DD HH:mm')));
                    // console.log(JSON.stringify(buildTime))
                    document.getElementById('appVersion').innerHTML = '当前前端APP程序版本为：一体化' + buildTime;
                }
            }, 500)
        },
        // 使用jsencrypt进行加密
        encrypt(value) {
            let that = this;
            if (typeof (that.RSA_PUBLIC) != "undefined" && that.RSA_PUBLIC) {
                var encrypt = new this.$jsEncrypt();
                encrypt.setPublicKey(that.RSA_PUBLIC);
                value = encrypt.encrypt(value);
            }
            return value;
        },
    },
};
</script>

<style lang="scss" scoped>
@import '../assets/styles/themes.scss';
@import '../assets/styles/mixin.scss';

.theme-font {
    @include font-theme("normal");
}

.iconfont {
    font-size: var(--font_size_0);
    @include font-theme("normal");
    padding-right: 6px;
}

.box {
    min-height: 100vh;
    overflow-x: hidden;
    overflow-y: scroll;

    .banner {
        width: 100%;
        min-height: 35vh;
        position: relative;

        >img {
            width: 100%;
        }

        .fullscreenBg {
            position: absolute;
            // height: 100vh;
            // object-fit: cover;
        }

        >p {
            width: 264px;
            text-align: center;
            font-size: 22px;
            line-height: 32px;
            color: white;
            position: absolute;
            top: 50px;
            transform: translateX(-50%);
            left: 50%;
        }
    }
}

@media screen and (max-width: 640px) {
    .formbox {
        margin: 0 15px;
        transform: translateY(-50px);
        border-radius: 8px;
        background: white;
        padding: 24px;

        .van-cell {
            border: 1PX solid rgba(228, 228, 228, 1);
            border-radius: 8px;
        }

        .van-cell+.van-cell {
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
                @include background-theme("normal");
                border: 0 !important;
                border-radius: 8px !important;
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
}

@media screen and (min-width: 640px) {
    .formbox {
        margin: 0 auto;
        border-radius: 8px;
        background: rgba(255, 255, 255, 0.8);
        padding: 24px;
        width: 8rem;
        position: relative;

        .van-cell {
            border: 1PX solid rgba(228, 228, 228, 1);
            border-radius: 8px;
        }

        .van-cell+.van-cell {
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
                @include background-theme("normal");
                border: 0 !important;
                border-radius: 8px !important;
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
}

.login_icon {
    right: -80%;
    top: 5px;
}

.login_title {
    font-weight: 600;
    margin: 5px 0px 10px 10px;
    @include font-theme('button_auxiliary_fontcolor', true);
    @include font_5;
}
</style>

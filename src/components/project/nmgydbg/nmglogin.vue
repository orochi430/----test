<template>
    <div :class="bfshow != 1 ? 'boxs' : 'box'" :style="{ overflowY: isFullscreenBg > 0 ? 'hidden' : 'scollor' }">
        <div :style="logImgStyle" class="banner" @click="showDeviceId">
            <img :class="{ fullscreenBg: isFullscreenBg > 0 }" :src="loginBackground" alt="" @load="loadImage" />
            <p class="title">欢迎登录</p>
            <span class="titlefs">{{ nmgLoginTitle }}&nbsp;<span class="boxJia">机密</span> </span>
            <div class="bej" v-if="bfshow == 1">
                <img src="static/images/project/nmgydbg/bg3.png" alt="">
            </div>
        </div>
        <div v-show="loginType == 'user'" :class="bfshow != 1 ? 'active' : 'loginStyle formbox'">
            <!-- <div class="login_title">用户登录</div> -->
            <van-form @submit="login">
                <span>用户名</span>
                <van-field v-model="logname" :rules="[{ required: true }]" name="账号" placeholder="请输入您的用户名">
                </van-field>
                <span>密码</span>
                <van-field v-model="txtpassword" :rules="[{ required: true }]" type="password" name="密码"
                    placeholder="请输入您的密码">
                </van-field>
                <van-row type="flex" justify="space-between" class="auto">
                    <van-checkbox v-if="isShowAuto > 0" v-model="checked" icon-size="16" shape="square">
                        自动登录
                    </van-checkbox>
                    <span v-if="isShowForget > 0" @click="forgetPassword()">忘记密码</span>
                </van-row>
                <div class="btnbox">
                    <van-button v-if="autoLogin" :disabled="autoLogin" style="width: 100%; font-size: 19px" round
                        type="info" native-type="submit">登录中...</van-button>
                    <van-button v-else style="width: 100%; font-size: 19px" round type="info"
                        native-type="submit">登录</van-button>
                    <van-button style="margin-top: 50px; width: 100%; font-size: 19px" round type="info"
                      native-type="button"   @click="certificateEntry">证书登录</van-button>
                </div>
                <div v-if="isShowChangeType" class="changeType">
                    <span v-if="isShowSmsLogin > 0" @click="changeLoginType('sms')">短信验证码登录</span>
                    <span v-if="dsf.util.loadLocalStore('gesture_pas')" @click="changeLoginType('gesture')">手势登录</span>
                </div>
            </van-form>
            <van-icon v-if="dsf.config.login.isShowIcon" name="static/images/icon-img.png" size="50" class="login_icon" />
        </div>

        <div v-if="loginType == 'sms'" :class="loginStyle">
            <!-- <div class="login_title">短信验证码登录</div> -->
            <van-form ref="smslogin" @submit="login">
                <van-field v-model="phone" :rules="phoneValidator" name="phone" type="tel" placeholder="请输入手机号码" center>
                    <template #left-icon>
                        <i class="iconfont iconshouji"></i>
                    </template>
                </van-field>
                <div class="sendCode">
                    <van-field v-model="phonecode" :rules="[{ required: true }]" center clearable name="短信验证码"
                        placeholder="请输入验证码">
                        <template #left-icon>
                            <i class="iconfont iconyuechi"></i>
                        </template>
                    </van-field>
                    <van-button :text="smsBtnText" :disabled="smsBtnEnable" size="small" type="primary" native-type="button"
                        @click="sendSmsCode()"></van-button>
                </div>

                <van-row type="flex" justify="space-between" class="auto">
                    <van-checkbox v-if="isShowAuto > 0 && dsf.config.login.tokenAutologin" v-model="checked" icon-size="16"
                        shape="square">
                        自动登录
                    </van-checkbox>
                    <van-checkbox v-model="checkedPhone" icon-size="16" shape="square">
                        记住手机号
                    </van-checkbox>
                </van-row>
                <div class="btnbox">
                    <!-- <van-button style="width: 100%; font-size: 19px" round type="info" native-type="submit">登录</van-button> -->
                    <van-button style="margin-top: 50px; width: 100%; font-size: 19px" round type="info"
                      native-type="button"  @click="certificateEntry">证书登录</van-button>
                </div>
                <div v-if="isShowChangeType" class="changeType">
                    <span @click="changeLoginType('user')">账号登录</span>
                    <span v-if="dsf.util.loadLocalStore('gesture_pas')" @click="changeLoginType('gesture')">手势登录</span>
                </div>
            </van-form>
            <van-icon v-if="dsf.config.login.isShowIcon" name="static/images/icon-img.png" size="50" class="login_icon" />
        </div>
        <div v-if="loginType == 'gesture'" :class="loginStyle">
            <gesture gesture-type="check" @gestureError="forgetGesture"></gesture>
            <div v-if="isShowChangeType" class="changeType">
                <span @click="changeLoginType('user')">账号登录</span>
                <span v-if="isShowSmsLogin > 0" @click="changeLoginType('sms')">短信验证码登录</span>
            </div>
        </div>

        <div v-if="loginType == 'forgetPassword'" :class="loginStyle">
            <forget-password @toLogin="changeLoginType('user')"></forget-password>
        </div>

        <!-- 强制维护手机号 -->
        <div v-if="loginType == 'setPhone'" :class="loginStyle">
            <set-phone @toLogin="dsf.util.logOut(); changeLoginType('user')" @toIndex="toNext()"></set-phone>
        </div>
        <div class="nmgimgbg2" v-if="bfshow == 1">
            <img src="static/images/project/nmgydbg/bg2.jpg" alt="">
        </div>
    </div>
</template>
    
<script>
import store from "@/common/util";
import B64 from "@/common/base64";
import gesture from '@/components/common/gesture'
import forgetPassword from '@/components/forgetPassword'
import setPhone from '@/components/setPhone'

export default {
    components: {
        gesture,
        forgetPassword,
        setPhone
    },
    data() {
        return {
            iscertificateEntry: false,
            certificateLoading: "",
            logname: "",
            txtpassword: "",
            tokenCode: "",
            checked: false,
            checkedPhone: false,
            bfshow: 1, //切换主题颜色
            title: "",
            DeviceId: "postman",
            DeviceName: "postman",
            loginType: "",
            nmgLoginTitle:dsf.config.login.nmgLoginTitle||"内蒙古移动办公平台",
            phone: "",
            mobile: '',
            phonecode: "",
            smsBtnText: "发送验证码",
            smsBtnEnable: false,
            errorMessage: "",
            hasGesture: false,
            logImgStyle: {
                height: "100%"
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
            }
            ],
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
            RSA_PUBLIC: dsf.config.setting['RSA_PUBLIC'] || "",//加密秘钥
            loginStyle: document.documentElement.clientWidth > document.documentElement.clientHeight ? "padformbox loginForm" : "formbox loginForm"//判断是否横屏
        };
    },
    computed: {
        // 背景图
        loginBackground() {
            let defaultImg = ''
            if (this.bfshow == 1) {
                defaultImg = require('static/images/project/nmgydbg/bg1.jpg')
            } else {
                defaultImg = require('static/images/project/nmgydbg/bg0.jpg')
            }

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
        if (!tocken && from.name == "NmgLogin" && to.name.toLowerCase().indexOf("login") < 0 && to.name != "changePassWord") {
            dsf.layer.toast(
                "您进行了未授权的访问，请重新登录！",
                undefined,
                function () {
                    next("/NmgLogin");
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
                        let loginDataObj = JSON.parse(loginDataString);
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
        this.logname = B64.decode(store.loadLocalStore("longUserName"));
        if (dsf.util.loadLocalStore('userColor') != null) {
            this.bfshow = dsf.util.loadLocalStore('userColor')
        } else {
            this.bfshow = 1
        }

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
        //现在注释免密登录
        // if(this.bfshow != 1){
        //     dsf.layer.loading("登录中...") 
        //     setTimeout(()=>{
        //        self.$router.replace({
        //         path: "/logNameAutologin",
        //         query:{
        //             state: dsf.base64.encode("/staging"),
        //             logName: "izhi"
        //         }
        //         });
        //     },700)
        // }
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
                }, () => { })
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
            dsf.layer.closeLoading(this.certificateLoading)
            if (dsf.config.login.defaultUrl) {
                this.$router.replace(dsf.config.login.defaultUrl);
            } else {
                this.$router.replace("/staging");
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
                        var tempData1 = ['logname', 'password', 'mobile']//config.json配置的key
                        var tempData2 = ['logname', 'txtpassword', 'mobile']//本地要取值的key
                        var paramArr = dsf.config.login.specialLoginParamsPhone.split(',')
                    }
                    else {
                        var tempData1 = ['logname', 'password', 'deviceId', 'mobile', "tokenCode"]//config.json配置的key
                        var tempData2 = ['logname', 'txtpassword', 'DeviceId', 'mobile', "tokenCode"]//本地要取值的key
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
                        await dsf.http.post("fn/common/getConfig", { type: 'browser' }).then(res => { // 每次调登录接口前重新获取RSA_PUBLIC密钥，避免后台密钥被清除导致登录报错
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
                    //长期记住上一次登录的账号
                    store.saveToLocalStore("longUserName", B64.encode(self.logname));
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
                    dsf.util.saveToSessionStore('user', { user_id: data.data.data })
                    dsf.util.saveToSessionStore('homePage', '/changePassWord')
                    self.$router.replace('/changePassWord')
                } else {
                    self.autoLogin = false;
                }
                dsf.layer.toast(data.data.message, "html");
            }).error((data) => {
                dsf.layer.closeLoading(self.loading);
                if (data.message.indexOf("404") > -1) {
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
            if (!this.iscertificateEntry && (dsf.config.setting['SYS-MOBILE-0002'] == 1 && !dateUserTemp.mobile)) { // 系统设置登录账号强制维护手机号且账号手机为空
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
                        dsf.layer.toast('当前APP的版本为：' + args);
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
                    document.getElementById('appVersion').innerHTML = '当前前端APP程序版本为：' + buildTime;
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
        // 判断横竖屏
        renderResize() {
            let self = this
            let width = document.documentElement.clientWidth
            let height = document.documentElement.clientHeight
            if (width > height) {
                self.loginStyle = "padformbox loginForm"
            } else {
                self.loginStyle = "formbox loginForm"
            }
        },
        certificateEntry() {
            this.certificateLoading = dsf.layer.loading("登录中...")
            this.iscertificateEntry = true
            dsf.http.post("fn/ldap/getRandom").then(({ data }) => {
                this.token(data.data)
                console.log("getRandom", data);
            }).error(err=>{
                dsf.layer.closeLoading(this.certificateLoading);
                console.log("err",err);
            })
        },
        token(random) {
            let self = this
            if (!self.isIE()) {
                //非IE浏览器，使用 websocket 从客户端获取票据
                try {
                    self.tokenWebSocket(random);
                } catch (e) {
                    self.tokenFail(e, "客户端可能不支持websocket方式获取票据." + e.message);
                }
            } else {
                //IE浏览器
                self.tokenFail(e, "客户端可能不支持websocket方式获取票据." + e.message);
            }
        },
        isIE() {
            var res = false;
            var agent = navigator.userAgent.toLowerCase();
            //var regStr_ie = /msie [\d.]+;/gi ;
            var isOpera = agent.indexOf("Opera") > -1;
            //IE
            if (agent.indexOf("compatible") > -1 && agent.indexOf("msie") > -1 && !isOpera) {
                res = true;
            }
            return res;
        },
        tokenWebSocket(challenge) {
            let self = this
            let appserverid = "23f59482-fcfd-4201-80ad-17c8ba3de3ba"
            let body = "<?xml version=\"1.0\" encoding=\"utf-8\"?><getsignandtokenreq version=\"2\"><challenge>" + challenge + "</challenge><appserverid>" + appserverid + "</appserverid></getsignandtokenreq>";
            let webSocket = new WebSocket("ws://127.0.0.1:30318");
            let ticketData = null;
            let webSocketStatus = true;
            let webSocketPhase = 0;
            webSocket.onopen = function (event) {
                webSocket.send(body);
                webSocketPhase = 1;
            }
            webSocket.onerror = function (event) {
                webSocketStatus = false;
                if (webSocketPhase == 1) {
                    self.tokenFail(event, 'WebSocket异常.' + event.type);
                } else {
                    self.tokenFail(event, 'WebSocket连接异常，请检查客户端安装或本地监听端口是否正常.' + event.type);
                }
            }
            webSocket.onclose = function (event) {
                if (webSocketStatus == false) {
                    return false;
                }
                if (ticketData == null || ticketData == '') {
                    self.tokenFail(event, "WebSocket连接关闭，但客户端未返回票据信息");
                    return false;
                }
            }
            webSocket.onmessage = function (event) {
                ticketData = event.data;
                if (ticketData == null || ticketData == '') {
                    self.tokenFail(event, "WebSocket连接成功，但客户端未返回票据信息");
                    return false;
                }

                let result = ticketData.split("</result>")[0].split("<result>")[1];
                if (result == 0) {
                    let token = ticketData.split("</tokeninfo>")[0].split("<tokeninfo>")[1];
                    console.log("token", token);
                    self.tokenSuccess(challenge, token);
                } else {
                    let error = ticketData.split("</errorinfo>")[0].split("<errorinfo>")[1];
                    self.tokenFail(3, error);
                    return false;
                }
            }
        },
        tokenFail(e, error, message) {
            dsf.layer.closeLoading(self.certificateLoading)
            dsf.layer.toast(error)
            this.iscertificateEntry = false
        },
        tokenSuccess(challenge, token) {
            let self = this
            dsf.http.post("fn/ldap/auth", { challenge: challenge, signAndToken: token }).then(({ data }) => {
                console.log("auth", data);
                store.saveToLocalStore("lastLoginType", "user");
                if (data.rcode == 1) {
                    let resultData = data;
                    self.loginSuccessDeal(resultData);
                } else {
                    self.tokenFail("", "未获取到身份信息")
                }
            })
        }
    },
};
</script>
    
<style lang="scss" scoped>
@import '@/assets/styles/themes.scss';
@import '@/assets/styles/mixin.scss';

::v-deep.van-field__body {
    margin-left: -12px !important;
}

.theme-font {
    @include font-theme("normal");
}

.boxshow {
    position: fixed;
    z-index: 9999;
    /* 需要设置高于其他内容的z-index值 */
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgb(255, 255, 255);

    /* 设置半透明黑色背景，这里的0.5表示透明度为50% */
    .wenzi {
        position: relative;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        font-size: 18px;
        width: 80px;
    }

}

.iconfont {
    font-size: 0.4rem;
    @include font-theme("normal");
    padding-right: 6px;
}

.active {
    width: 89%;
    height: 40%;
    margin: -21% auto 0;
    padding: 30px 24px;
    border-radius: 5%;
    background: #FFFFFF;
    box-shadow: 0px 0px 3px 0px #9f9292;
    position: relative;
    z-index: 8;

    .van-cell {
        border-bottom: 1px solid #D0D0D0;
        margin-bottom: 27px;
        padding-left: 0;
    }

}

.boxs {
    min-height: 100vh;
    overflow-x: hidden;
    overflow-y: scroll;
    background: white;

    .banner {
        width: 100%;
        min-height: 250px;
        position: relative;
        z-index: 1;

        >img {
            width: 100%;
        }

        .fullscreenBg {
            position: absolute;
        }

        >p {
            width: 380px;
            font-size: 0.48rem;
            line-height: 32px;
            color: white;
            position: absolute;
            top: 18%;
            left: 5%;
            font-family: SourceHanSerifCN-Bold;
            letter-spacing: 9px;
            font-weight: 700;
            text-align: left;
        }

        .titlefs {
            width: auto;
            text-align: left;
            font-size: 24px;
            color: white;
            position: absolute;
            top: 33%;
            left: 5%;
            font-family: SourceHanSerifCN-Bold;
            letter-spacing: 9px;
            font-weight: 700;

            .boxJia {
                margin-left: 4px;
                display: inline-block;
                transform: translateX(-50%);
                background: white;
                color: green;
                width: 50px;
                height: 25px;
                font-weight: 800;
                line-height: 25px;
                text-align: center;
                font-family: SourceHanSerifCN-Bold;
                font-size: 18px;
                border-radius: 25px;
                letter-spacing: 1px;
            }
        }
    }
}

.box {
    min-height: 100vh;
    overflow-x: hidden;
    overflow-y: scroll;
    background: white;

    .banner {
        width: 100%;
        min-height: 250px;
        position: relative;
        z-index: 1;

        >img {
            width: 100%;
        }

        .fullscreenBg {
            position: absolute;
        }

        >p {
            width: 264px;
            text-align: center;
            font-size: 0.48rem;
            line-height: 32px;
            color: white;
            position: absolute;
            top: 18%;
            transform: translateX(-50%);
            left: 50%;
            font-family: SourceHanSerifCN-Bold;
            letter-spacing: 9px;
            font-weight: 700;
        }

        .bej {
            width: 130px;
            height: 36px;
            position: absolute;
            top: 43%;
            transform: translateX(-50%);
            left: 50%;
        }

        .titlefs {
            width: 100%;
            text-align: center;
            font-size: 24px;
            color: white;
            position: absolute;
            top: 33%;
            transform: translateX(-50%);
            left: 54%;
            font-family: SourceHanSerifCN-Bold;
            letter-spacing: 0.18rem;
            font-weight: 700;

            .boxJia {
                margin-left: 4px;
                display: inline-block;
                transform: translateX(-50%);
                background: white;
                color: red;
                width: 50px;
                height: 25px;
                font-weight: 800;
                line-height: 25px;
                text-align: center;
                font-family: SourceHanSerifCN-Bold;
                font-size: 18px;
                border-radius: 25px;
                letter-spacing: 1px;
            }
        }


    }

    .nmgimgbg2 {
        width: 100%;
        // height: 100px;
        // background: white;
        position: absolute;
        bottom: 0;
    }
}

.formbox {
    z-index: 2;
    transform: translateY(-50px);
    background: white;
    padding: 53.48px;

    .van-cell {
        border-bottom: 1px solid #D0D0D0;
        margin-bottom: 20px;
        padding-left: 0;
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
        margin-top: 15px;

        >button {
            @include background-theme("normal");
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

.padformbox {
    margin: 0 auto;
    border-radius: 8px;
    background: rgba(255, 255, 255, 0.9);
    padding: 24px;
    width: 9rem;
    position: relative;

    .van-cell {
        border: 1px solid #EEEEEE;
        border-radius: 46px;
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
    
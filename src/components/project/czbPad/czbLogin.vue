<template>
    <div class="czbLogin" @click="goLogin">
    </div>
</template>

  
<script>
import store from "@/common/util";
export default {
    name: "czbLogin",
    data() {
        return {
            loading: ""
        };
    },
    created() {
        this.loading = dsf.layer.loading("登录中...")
        this.certificateEntry()
    },
    methods: {
        goLogin() {
            this.$router.push({
                name: "testLogin"
            })
        },
        certificateEntry() {
            // 获取随机数
            dsf.http.post("fn/GeneratorChallenge").then(({
                data
            }) => {
                this.token(data.challenge)
                console.log("getRandom");
            })
        },
        loginSuccessDeal(loginData) {
            let dateUserTemp = loginData.data;
            store.saveToSessionStore("user", dateUserTemp);
            store.saveToSessionStore("loginToken", dateUserTemp.auth.token);
            store.saveToLocalStore("loginToken", dateUserTemp.auth.token);
            store.saveToLocalStore("user", dateUserTemp);
            store.saveToLocalStore("loginData", loginData);
            this.toNext();
        },
        toNext() {
            let self = this;
            let dateUserTemp = store.loadSessionStore("user");
            let loginData = store.loadLocalStore("loginData");
            store.logIn(function () {
                let userid = dateUserTemp.user_id;
                // 判断登录以后是否需要CA认证
                console.log("Client", store.getClientName());
                console.log("shkt", loginData.shkt, loginData.shkt == 1);
                if (store.getClientName() == "app" && loginData.shkt == 1) {
                    console.log("xsfCommon");
                    xsfCommon.bsCaLogin(
                        "",
                        function (result) {
                            let res = JSON.parse(result).result;
                            console.log("bsCaLogin", result, typeof result);
                            if (res == true) self.goUrl();
                        },
                        function (error) {
                            console.log("bsCaLogin", error, typeof error);
                            self.tokenFail("", error);
                        }
                    );
                    return;
                }
                //判断是否登录以后保存UUID和设备名称
                if (dsf.config.login.loginSaveUUID) {
                    let deviceUrl =
                        "fn/sso/devicesave?DeviceId=" +
                        self.DeviceId +
                        "&DeviceName=" +
                        self.DeviceName +
                        "&userId=" +
                        userid;
                    dsf.http
                        .get(deviceUrl)
                        .then((data) => {
                            self.goUrl();
                        })
                        .catch((err) => {
                            self.tokenFail("", err.message);
                        });
                } else {
                    self.goUrl();
                }
            });
        },
        goUrl() {
            dsf.layer.closeLoading(this.loading)
            if (dsf.config.login.defaultUrl) {
                this.$router.replace(dsf.config.login.defaultUrl);
            } else {
                this.$router.replace("/index");
            }
        },
        token(random) {
            let self = this
            if (!self.isIE()) { // window.WebSocket
                //非IE浏览器，使用 websocket 从客户端获取票据
                try {
                    self.tokenWebSocket2(random);
                } catch (e) {
                    self.tokenFail(e, "客户端可能不支持websocket方式获取票据." + e.message);
                }
            } else {
                //IE浏览器，使用 activex 从客户端获取票据
                try {
                    self.tokenActiveX(random);
                } catch (e) {
                    self.tokenFail(e, "客户端可能不支持activex方式获取票据." + e.message);
                }
            }
        },
        tokenActiveX(challenge) {
            let self = this
            var control = document.getElementById(tokenActiveXId);
            if (control == null) {
                self.tokenFail(1, "请检查是否在页面上定义了activeX控件:" + tokenActiveX);
                return;
            }
            // 调用控件进行挑战数签名并获取身份票据
            var value = control.GetSignAndToken(challenge);
            var flag = false;
            if (control.lResult == 0) {
                flag = true
            }
            if (control.lResult != 0) {
                var notice = "activeX处理错误:" + control.bstrError;
                self.tokenFail(1, notice);
                return false;
            }
            // verify(random, control.bstrSignValAndToken);
            self.tokenSuccess(random, control.bstrSignValAndToken);
        },
        tokenWebSocket2(challenge) {
            console.log(challenge);
            let self = this
            var body = "<?xml version=\"1.0\" encoding=\"utf-8\"?><getsignandtokenreq version=\"1\"><challenge>" + challenge + "</challenge></getsignandtokenreq>";
            var webSocket = new WebSocket("ws://127.0.0.1:30318");
            var ticketData = null;
            var webSocketStatus = true;
            var webSocketPhase = 0;
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
                    self.tokenFail(event, "WebSocket连接关闭，但客户端未返回票据信息，请检查是否插KEY、是否配置设备以及设备是否工作正常等");
                    return false;
                }
            }
            webSocket.onmessage = function (event) {
                ticketData = event.data;
                if (ticketData == null || ticketData == '') {
                    self.tokenFail(event, "WebSocket连接成功，但客户端未返回票据信息，请检查是否插KEY、是否配置设备以及设备是否工作正常等");
                    return false;
                }

                var result = ticketData.split("</result>")[0].split("<result>")[1];
                if (result == 0) {
                    var token = ticketData.split("</tokeninfo>")[0].split("<tokeninfo>")[1];
                    console.log("token", token);
                    self.tokenSuccess(challenge, token);
                } else {
                    var error = ticketData.split("</errorinfo>")[0].split("<errorinfo>")[1];
                    self.tokenFail(3, error);
                    return false;
                }
            }
        },
        tokenSuccess(challenge, token) {
            let self = this
            dsf.http.post("fn/mobileProjectAuth/auth", {
                challenge: challenge,
                tokeninfo: token
            }, {
                headers: {
                    "Content-Type": "application/json"
                }
            }).then(({
                    data
                }) => {
                    console.log("auth", data);
                    store.saveToLocalStore("lastLoginType", "user");
                    if (data.rcode == 1) {
                        let resultData = data;
                        self.loginSuccessDeal(resultData);
                    } else {
                        self.tokenFail("", "未获取到身份信息")
                    }
                })
        },
        tokenFail(e, error, message) {
            dsf.layer.closeLoading(self.loading)
            dsf.layer.toast(error)
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
        }
    }
};
</script>
<style lang="scss" scoped>
.czbLogin {
    width: 100vw;
    height: 100vw;
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    z-index: 999;
    background: url('../../../../static/images/project/czbPad/authlogin.png') no-repeat;
    background-size: 100% 100%;
}
</style>
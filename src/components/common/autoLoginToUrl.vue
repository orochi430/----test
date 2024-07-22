<template>
    <div>
    </div>
</template>

<script>
import store from "@/common/util";
import B64 from "@/common/base64";
export default {
    created() {
        let self = this;
        self.loadInfo();
    },
    methods: {
        loadInfo() {
            let self = this;
            let ua = window.navigator.userAgent.toLowerCase();
            console.log("autoLoginToUrl", "ua", ua);
            if (ua.indexOf("lanxin") > -1) {//陕西蓝信系客户端
                const lanxinScript = document.createElement("script");
                lanxinScript.type = "text/javascript";
                lanxinScript.src = "static/js/lanxin/jssdk.js";
                document.head.appendChild(lanxinScript);
                lanxinScript.onload = () => {
                    self.login();
                }
            }
            else if (ua.indexOf("micromessenger") > -1) {//微信系客户端
                if (dsf.config.ddSetting?.wxAuth) {
                    if (window.location.href.indexOf("digitalgd") > -1 || window.location.href.indexOf("gdzwfw") > -1) {
                        //粤政易
                        const wxScript = document.createElement("script");
                        wxScript.type = "text/javascript";
                        wxScript.src = "./static/js/jweixin-1.6.0.js";
                        document.head.appendChild(wxScript);
                        wxScript.onload = () => {
                            console.log("device", "加载粤政易JS");
                            self.wxAuthentication(window.document.location.href.split("#")[0]);
                        };
                    } else if (dsf.config.projectName == 'shGovYth') {
                      const wxScript = document.createElement("script");
                        wxScript.type = "text/javascript";
                        wxScript.src = "./static/js/jweixin-1.6.0.js";
                        document.body.appendChild(wxScript);
                        wxScript.onload = () => {
                          window.wx = wx
                            self.wxAuthShGov();
                        }
                    } else if (ua.includes("shandong")) {
                        //山东通
                        const wxScript = document.createElement("script");
                        wxScript.type = "text/javascript";
                        wxScript.src = "./static/js/jweixin-1.6.0.js";
                        document.body.appendChild(wxScript);
                        wxScript.onload = () => {
                            self.wxAuthShanDong(window.document.location.href.split("#")[0]);
                        }
                    } else {
                        //微信
                        const wxScript = document.createElement("script");
                        wxScript.type = "text/javascript";
                        wxScript.src = "./static/js/jweixin-1.6.0.js";
                        document.body.appendChild(wxScript);
                        wxScript.onload = () => {
                            window.wx = wx
                            wx.ready(function () {
                                console.log("autoLoginToUrl", "wx", "ready");
                                // config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，config是一个客户端的异步操作，所以如果需要在页面加载时就调用相关接口，则须把相关接口放在ready函数中调用来确保正确执行。对于用户触发时才调用的接口，则可以直接调用，不需要放在ready函数中。
                                wx.checkJsApi({
                                    jsApiList: ["previewFile", "openUrl", "onMenuShareWechat", "onMenuShareAppMessage"], // 需要检测的JS接口列表，所有JS接口列表见附录2,
                                    success: function (res) {
                                        // 以键值对的形式返回，可用的api值true，不可用为false
                                        // 如：{"checkResult":{"chooseImage":true},"errMsg":"checkJsApi:ok"}
                                        console.log("autoLoginToUrl", "checkJsApi-res", res);
                                    }
                                });

                            });
                            wx.error(function (res) {
                                console.log("autoLoginToUrl", "wx", "error", res);
                                // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
                            });
                            wx.config({
                                beta: true,
                                debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                                appId: dsf.util.loadSessionStore('wxParams').corpId, // 必填，粤政易的cropID
                                timestamp: dsf.util.loadSessionStore('wxParams').timestamp, // 必填，生成签名的时间戳
                                nonceStr: dsf.util.loadSessionStore('wxParams').noncestr, // 必填，生成签名的随机串
                                signature: dsf.util.loadSessionStore('wxParams').signature, // 必填，签名，见附录1
                                jsApiList: ["previewFile", "openUrl", "onMenuShareWechat", "onMenuShareAppMessage"], // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
                            });
                            self.login();
                        }
                    }
                } else {
                    self.login();
                }

            } else {
                self.login();
            }
        },
        wxAuthentication(origin) {
            //粤政易鉴权
            let self = this;
            console.log("调用了粤政易鉴权", origin);
            dsf.http
                .post(`fn/digitalgd/config?url=${origin}`, {})
                .then((res) => {
                    console.log("进入了JS鉴权", res);
                    if (res.data) {
                        wx.config({
                            beta: true, // 调用wx.invoke形式的接口值时，该值必须为true。
                            debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                            appId: res.data.data.appId, // 必填，粤政易的cropID
                            timestamp: res.data.data.timestamp, // 必填，生成签名的时间戳
                            nonceStr: res.data.data.nonceStr, // 必填，生成签名的随机串
                            signature: res.data.data.signature, // 必填，签名，见附录1
                            jsApiList: ["previewFile", "request3rdApp"], // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
                        });
                        wx.error(function (res) {
                            console.log("鉴权失败", res);
                            // config信息验证失败会执行error函数，如签名过期导致验证失败，
                            //具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
                        });
                        self.login(); //鉴权完了进行登录
                    } else {
                        console.log("调用了粤政易鉴权失败", origin);
                    }
                })
                .catch((error) => {
                    console.log(error);
                });
        },
        wxAuthShanDong(origin) {
            //山东通鉴权
            let self = this;
            window.wx = wx;
            console.log("山东通鉴权", origin);
            dsf.http
                .post(`fn/sdtongSSO/wxConfig`, { url: origin })
                .done(res => {
                    console.log("sdtongSSO", "wxConfig", res);
                    if (res.type == "success") {
                        wx.config({
                            beta: true, // 调用wx.invoke形式的接口值时，该值必须为true。
                            debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                            appId: res.data.appId, // 必填，粤政易的cropID
                            timestamp: res.data.timestamp, // 必填，生成签名的时间戳
                            nonceStr: res.data.nonceStr, // 必填，生成签名的随机串
                            signature: res.data.signature, // 必填，签名，见附录1
                            jsApiList: ["previewFile", "request3rdApp", "openUrl", "onMenuShareWechat", "onMenuShareAppMessage",'openChatWithMsg'], // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
                        });
                        wx.ready(function () {
                            console.log("autoLoginToUrl", "wx", "ready");
                            // config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，config是一个客户端的异步操作，所以如果需要在页面加载时就调用相关接口，则须把相关接口放在ready函数中调用来确保正确执行。对于用户触发时才调用的接口，则可以直接调用，不需要放在ready函数中。
                            wx.checkJsApi({
                                jsApiList: ["previewFile", "request3rdApp", "openUrl", "onMenuShareWechat", "onMenuShareAppMessage",'openChatWithMsg'], // 需要检测的JS接口列表，所有JS接口列表见附录2,
                                success: function (res) {
                                    // 以键值对的形式返回，可用的api值true，不可用为false
                                    // 如：{"checkResult":{"chooseImage":true},"errMsg":"checkJsApi:ok"}
                                    console.log("autoLoginToUrl", "checkJsApi-res", res);
                                }
                            });
                            wx.invoke("agentConfig", {
                              agentid: res.data.agentid, // 必填，单位应用的agentid
                              corpid: res.data.appId,  // 必填，山东通的corpid
                              timestamp: res.data.timestamp, // 必填，生成签名的时间戳,int类型, 如 1539100800
                              nonceStr: res.data.nonceStr, // 必填，生成签名的随机串
                              signature: res.data.signature,// 必填，签名，见附录5
                          }, function(res) {
                              if(res.err_msg != "agentConfig:ok"){
                                  //错误处理
                                  return;
                              }
                              //这里可以调用用户数据接口
                          });
                        });
                        wx.error(function (res) {
                            console.log("autoLoginToUrl", "wx", "error", res);
                            // config信息验证失败会执行error函数，如签名过期导致验证失败，
                            //具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
                        });
                        self.login(); //鉴权完了进行登录
                    } else {
                        console.log("sdtongSSO", "wxConfig", "fail");
                    }
                })
                .catch((error) => {
                    console.log(error);
                });
        },
        wxAuthShGov() {
          //上海市政府一体化鉴权
          let self = this;
          wx.config({
            beta: true, // 调用wx.invoke形式的接口值时，该值必须为true。
            debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
            appId: dsf.util.loadSessionStore('wxParams').corpId, // 必填，粤政易的cropID
            timestamp: dsf.util.loadSessionStore('wxParams').timestamp, // 必填，生成签名的时间戳
            nonceStr: dsf.util.loadSessionStore('wxParams').noncestr, // 必填，生成签名的随机串
            signature: dsf.util.loadSessionStore('wxParams').signature, // 必填，签名，见附录1
            jsApiList: ["previewFile", "request3rdApp", "openUrl", "onMenuShareWechat", "onMenuShareAppMessage", "openChatWithMsg", "request3rdApp", "scanQRCode"] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
          })
          wx.ready(function () {
            console.log("autoLoginToUrl", "wx", "ready")
            // config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，config是一个客户端的异步操作，所以如果需要在页面加载时就调用相关接口，则须把相关接口放在ready函数中调用来确保正确执行。对于用户触发时才调用的接口，则可以直接调用，不需要放在ready函数中。
            wx.checkJsApi({
              jsApiList: ["previewFile", "request3rdApp", "openUrl", "onMenuShareWechat", "onMenuShareAppMessage", "openChatWithMsg", "request3rdApp", "scanQRCode"], // 需要检测的JS接口列表，所有JS接口列表见附录2,
              success: function (res) {
                // 以键值对的形式返回，可用的api值true，不可用为false
                // 如：{"checkResult":{"chooseImage":true},"errMsg":"checkJsApi:ok"}
                console.log("autoLoginToUrl", "checkJsApi-res", res)
              }
            })
          })
          wx.error(function (res) {
            console.log("autoLoginToUrl", "wx", "error", res)
            // config信息验证失败会执行error函数，如签名过期导致验证失败，
            //具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
          })
          wx.hideMenuItems({
            menuList: ["menuItem:share:appMessage","menuItem:favorite"]
          })
          self.login() //鉴权完了进行登录
        },
        hexToString(hex) {
            var tmp = '';
            if (hex.length % 2 == 0) {
                for (var i = 0; i < hex.length; i += 2) {
                    tmp += '%' + hex.charAt(i) + hex.charAt(i + 1);
                }
            }
            return decodeURIComponent(tmp);
        },
        login() {
            let self = this;
            let token = self.$route.params.token;
            let state = self.$route.params.state;
            let path = B64.decode(state.replace(new RegExp("@", "gm"), "/"));
            let sessionStore = store.loadSessionStore("loginToken");
            // if (sessionStore && sessionStore == token) {
            //     self.$router.replace(path);
            //     return;
            // }

            dsf.http
                .get(`fn/mobileAuth/getUserDataByToken?token=${token}`, {})
                .then((result) => {
                    console.log("getUserDataByToken-res", result);
                    result = result.data;
                    //alert(result.rcode)
                    if (result.rcode == 1) {
                        store.saveToSessionStore("user", result.data);
                        store.saveToSessionStore("loginToken", result.data.auth.token);
                        store.saveToLocalStore("loginToken", result.data.auth.token);
                        store.saveToLocalStore("user", JSON.stringify(result.data));
                        store.logIn(() => {
                          if (path.toLowerCase().includes('/commonform/')) {
                            self.$router.replace({
                              path: path,
                              query: {
                                closePage: 1
                              }
                            });
                          } else {
                            self.$router.replace(path)
                          }
                        },path);
                    } else if (result.rcode == 0) {
                        dsf.layer.toast(result.message);
                        self.$router.go(-1);
                    } else {
                        dsf.layer.toast("登录失败！");
                        self.$router.go(-1);
                    }
                })
                .catch((error) => {
                    dsf.layer.toast("登录失败！");
                    setTimeout(function () {
                        self.$router.go(-1);
                    }, 2000);
                    console.log(error);
                });
        },
    },
    mounted() {
    }
};
</script>

<style scoped>
.init-div {
    position: absolute;
    width: 100%;
    height: 20px;
    line-height: 20px;
    margin-top: -20px;
    top: 50%;
    left: 0;
    font-size: var(--font_size_2);
    color: #7f7a7a;
    text-align: center;
}
</style>

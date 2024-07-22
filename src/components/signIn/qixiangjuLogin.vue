<template>
<!-- 气象局页 -->
<div class="init-div"></div>
</template>

<script>
import store from "@/common/util";
export default {
    name: "emergency_login",
    data() {
        return {};
    },
    created() {
        let self = this;
        if (store.getClientName() == "app") {
            document.addEventListener("deviceready", function () {
                console.log("deviceready_emergency_login");
                let random = self.randomString(16);
                console.log(xsfCommon);
                //气象局部，拿取token登录
                xsfCommon.ssoAuthLogin("", function (res) {
                        console.log(res);
                        if (res) {
                            let obj = {
                                device_desc: "postman",
                                authCode: res,
                                device_id: random,
                                spw: 'sx'
                            };
                            dsf.http.post(`fn/mobileProjectAuth/auth`, obj).then((result) => {
                                result = result.data
                                console.log(result);
                                if (String(result.rcode) === "1") {
                                    store.saveToSessionStore("user", result.data);
                                    store.saveToSessionStore("loginToken", result.data.auth.token);
                                    store.saveToLocalStore("loginToken", result.data.auth.token);
                                    store.saveToLocalStore("user", JSON.stringify(result.data));
                                    store.logIn(() => {
                                        self.$router.replace("/index");
                                    });
                                } else {
                                    dsf.layer.toast("所在机构无用户信息，请重新登录");
                                    self.$router.replace("/testLogin");
                                }
                            });
                        }
                    },
                    function (error) {
                        alert("open failed: " + error);
                    }
                );

            });
        } else {
            dsf.layer.toast("当前设备不支持单点登录");
        }
    },
    methods: {
        //生成随机字符串
        randomString(len) {
            len = len || 32;
            var $chars =
                "ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678"; /****默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1****/
            var maxPos = $chars.length;
            var pwd = "";
            for (var i = 0; i < len; i++) {
                pwd += $chars.charAt(Math.floor(Math.random() * maxPos));
            }
            return pwd;
        },
    },
};
</script>

<template>
<div>
    <div v-if="errored" class="init-div">{{ errorMsg }}</div>
    <!-- <div v-else class="init-div">
        <div v-if="loading">正在登录...</div>
        <div v-else>
            登录成功！
        </div>
    </div> -->
</div>
</template>

<script>
import store from "@/common/util";
import B64 from "@/common/base64";
export default {
    data() {
        return {
            // loading: true,
            errored: false,
            errorMsg: "",
            paras: this.$route.query.paras,
            logname: "lfry",
            txtpassword: "111111",
            DeviceId: "postman",
            DeviceName: "postman"
        };
    },
    created() {
        let self = this;
        let paras = {
            deptId: '180505162656YILYYOzw1FnE5OzzNxm',
            deptName: encodeURI('人民日报演示组织'),
            userName: encodeURI('系统管理员'),
            userId: '2',
            tel: '010-58281237'
        };
        // self.paras = encodeURIComponent(B64.encode(`{"deptId":"180505162656YILYYOzw1FnE5OzzNxm","deptName":"%E4%BA%BA%E6%B0%91%E6%97%A5%E6%8A%A5%E6%BC%94%E7%A4%BA%E7%BB%84%E7%BB%87","tel":"010-58281237","userName":"%E7%B3%BB%E7%BB%9F%E7%AE%A1%E7%90%86%E5%91%98","userId":"2"}`));
        // self.paras = encodeURIComponent(B64.encode(JSON.stringify(paras)));
        self.getDeviceInfo();
        self.login();
    },
    mounted() {},
    methods: {
        // 登录
        login() {
            let self = this;
            let url = "";
            let postData = {};
            url = "/fn/mobileAuth/login";
            postData = {
                __DATA: JSON.stringify({
                    logname: self.logname,
                    password: self.txtpassword,
                    device_id: self.DeviceId,
                    device_desc: self.DeviceName
                }),
            };
            dsf.http.post(url, postData).then(function (data) {
                if (data.data.rcode == 1) {
                    store.saveToLocalStore("uid", B64.encode(self.logname));
                    store.saveToLocalStore("pid", B64.encode(self.txtpassword));
                    // store.saveToLocalStore("autoLogin", self.checked);
                    // //记住账号密码
                    // if (self.checked) {
                    //     store.saveToLocalStore("userName", B64.encode(self.logname));
                    //     store.saveToLocalStore("passWord", B64.encode(self.txtpassword));
                    // } else {
                    //     store.removeToLocalStore("userName");
                    //     store.removeToLocalStore("passWord");
                    // }
                    // //记住手机号码
                    // if (self.checkedPhone) {
                    //     store.saveToLocalStore("phone", B64.encode(self.phone));
                    // } else {
                    //     store.removeToLocalStore("phone");
                    // }

                    store.saveToSessionStore("user", data.data.data);
                    store.saveToSessionStore("loginToken", data.data.data.auth.token);
                    store.saveToLocalStore("loginToken", data.data.data.auth.token);
                    store.saveToLocalStore("user", data.data.data);
                    store.logIn(function () {
                        let userid = data.data.data.user_id;
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
                } else {
                    self.errored = true;
                    self.errorMsg = data.data.message;
                    // self.autoLogin = false;
                    dsf.layer.toast(data.data.message);
                }
            }).error((data) => {
                if (data.message.indexOf("404") > -1) {
                    dsf.layer.toast("登录接口异常，请联系系统管理员！");
                }
            }).always(() => {
                // dsf.layer.closeLoading(self.loading);
            });
        },
        getDeviceInfo() {
            let self = this;
            if (store.getClientName() == "app") {
                document.addEventListener("deviceready", function () {
                    console.log("deviceready_testlogin");
                    console.log(xsfCommon);
                    xsfCommon.SystemTools(
                        ["DeviceId"],
                        function (result) {
                            console.log(result);
                            self.DeviceId = JSON.parse(result).DeviceId;
                        },
                        function (error) {
                            alert("open failed: " + error);
                        }
                    );
                    xsfCommon.SystemTools(["DeviceName"],
                        function (result) {
                            console.log(result);
                            self.DeviceName = JSON.parse(result).DeviceName;
                        },
                        function (error) {
                            alert("open failed: " + error);
                        }
                    );
                });
            }
        },
        goUrl() {
            let self = this;
            // let path = `/commonForm/211026160337WA4njkw5gy5g2YRhfeE`;
            // let query = JSON.parse(B64.decode(decodeURIComponent(self.paras)));
            // self.$router.replace({
            //     path,
            //     query
            // });
            self.$router.replace(`/PeopleDaily/Pre?paras=${self.paras}`);
        }
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

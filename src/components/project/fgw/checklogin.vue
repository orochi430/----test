<template>
<div class="box">
    <div class="banner"></div>
    <div class="formbox loginForm" v-if="!isChangeUser">
        <div class="login_title">请输入验证密码</div>
        <van-form @submit="login">
            <van-field v-model="logname" type="password" :rules="[{ required: true }]" name="验证密码" placeholder="请输入验证密码" center>
            </van-field>
            <div class="btnbox" style="margin-top: 30px">
                <van-button v-if="autoLogin" :disabled="autoLogin" style="width: 100%; font-size: 19px" round type="info" native-type="submit">登录中...</van-button>
                <van-button v-else style="width: 100%; font-size: 19px" round type="info" native-type="submit">确定</van-button>
            </div>
        </van-form>
    </div>
    <!-- <van-popup v-model="selectPeople" position="bottom" style="height: 100%;background-color: #f5f5f5" :get-container="'#app'">

    </van-popup>
     -->
    <van-popup ref="popref" v-model="selectPeople" :close-on-click-overlay="true" lock-scroll position="bottom" :style="{ height: '100%' }">
        <!-- <control-user-list :extra="extra" @getSelectUser="getSelectUser" @close="cancePerson"></control-user-list> -->
        <selectPerson v-if="selectPeople" :type="0" @getSelectUser="getSelectUser" :extra="extra" @cancePerson="cancePerson"></selectPerson>
    </van-popup>
</div>
</template>

<script>
import store from "@/common/util";
import B64 from "@/common/base64";
import selectPerson from "@/components/selectPerson/DsfSelectPerson";
import controlUserList from "@/components/commonForm/controls/controlUserList";

export default {
    components: {
        controlUserList,
        selectPerson,
    },
    data() {
        return {
            logname: "",
            autoLogin: false,
            selectPeople: false,
            isSelect: false,
            extra: {
                multiple: false,
                rootObject: "1",
                typesString: "person",
                customRoot: "2203181435142nt6l5V7JhAuMyRBZKe",
                tabs: [{
                    name: "本机构",
                    action: "fn/user/select/data?types=person&rootObject=1&action=self_org&async=true&moduleId=220317175747dleuT8ffDHmcbcz0aHg",
                    subTabKey: "department"
                }],
            },
            isChangeUser: false
        };
    },
    computed: {},
    mounted() {},
    created() {
        this.isSelect = false
        if (this.$route.query.changUser) {
            this.isChangeUser = true
            this.selectPeople = true;
        } else if (store.loadLocalStore("check_passWord")) {
            if (store.loadLocalStore("autoLogin")) {
                this.login2();
            } else {
                this.selectPeople = true;
            }
        }
    },
    methods: {
        //结束选人
        cancePerson() {
            if (this.$route.query.changUser && !this.isSelect) {
                this.$router.back();
            } else {
                this.selectPeople = false;
            }
        },
        //获取选人
        getSelectUser(data) {
            this.isSelect = true
            store.saveToLocalStore("userName", B64.encode(data[0].attrs.logName));
            store.saveToLocalStore("passWord", B64.encode("111111"));
            store.saveToLocalStore("autoLogin", true);
            this.login2();
        },
        goUrl() {
            dsf.http.post("/fn/covidProtect/toadyForm").then(res => {
                if (res.data.code != 200) {
                    dsf.layer.toast(res.data.message);
                } else {
                    const {
                        data
                    } = res.data
                    let route = {
                        name: "commonForm",
                        params: {
                            moduleId: data.moduleId
                        }
                    }
                    if (data.pk) {
                        route.params.pk = data.pk
                    }
                    if (data.initDataSource) {
                        route.query = {
                            initDataSource: data.initDataSource,
                            listId: "191101180952ZBvw3u1nGer5IvYN5M0"
                        }
                    }
                    this.$router.push(route)
                }
            }).error(function (message) {
                dsf.layer.toast(message);
            })
        },
        login2() {
            let self = this;
            let userName = B64.decode(store.loadLocalStore("userName"));
            let passWord = B64.decode(store.loadLocalStore("passWord"));
            let url = "/fn/mobileAuth/login";
            let postData = {
                __DATA: JSON.stringify({
                    logname: userName,
                    password: passWord,
                    device_id: "device_id",
                    device_desc: "device_desc",
                }),
            };
            dsf.http.post(url, postData).then(function (data) {
                    if (data.data.rcode == 1) {
                        store.saveToSessionStore("user", data.data.data);
                        store.saveToSessionStore("loginToken", data.data.data.auth.token);
                        store.saveToLocalStore("loginToken", data.data.data.auth.token);
                        store.saveToLocalStore("user", data.data.data);
                        //store.logIn(function () {
                        self.goUrl();
                        // });
                    } else {
                        store.saveToLocalStore("autoLogin", false);
                    }
                    dsf.layer.toast(data.data.message);
                })
                .error((data) => {
                    if (data.message.indexOf("404") > -1) {
                        dsf.layer.toast("登录接口异常，请联系系统管理员！");
                    }
                })
                .always(() => {
                    dsf.layer.closeLoading(self.loading);
                });
        },
        login() {
            let self = this;
            if (self.logname == "fgw123456") {
                store.saveToLocalStore("check_passWord", B64.encode("fgw123456"));
                self.selectPeople = true;
            } else {
                dsf.layer.toast("验证码不正确");
                self.logname = "";
            }
        },
    },
};
</script>

<style lang="scss" scoped>
@import "../../../assets/styles/themes.scss";
@import "../../../assets/styles/mixin.scss";

.theme-font {
    @include font-theme("normal");
}

.iconfont {
    font-size: var(--font_size_0);
    @include font-theme("normal");
    padding-right: 6px;
}

.box {
    height: calc(100vh);
    overflow-x: hidden;
    overflow-y: scroll;

    .banner {
        width: 100%;
        min-height: 250px;
        position: relative;

        >img {
            width: 100%;
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

.formbox {
    margin: 0 15px;
    transform: translateY(-50px);
    border-radius: 8px;
    background: white;
    padding: 24px;

    .van-cell {
        border: 1px solid #eeeeee;
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
    @include font-theme("button_auxiliary_fontcolor", true);
    @include font_5;
}
</style>

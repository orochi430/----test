<template>
<div class="contanier">
    <div class="box">
        <div class="top">
            <div>
                <img src="static/images/meetingPad/com_logo.png" alt="" />{{ title }}
            </div>
            <div>用户登录</div>
        </div>
        <div class="form">
            <van-form @submit="login">
                <div class="left-label">用户名</div>
                <van-field v-model="logname" :rules="[{ required: true }]" name="用户名" center placeholder="请输入用户名"></van-field>
                <div class="left-label">密码</div>
                <van-field v-model="password" :rules="[{ required: true }]" type="password" name="密码" center placeholder="请输入密码"></van-field>
                <div class="btnbox">
                    <van-button class="btn" type="info" native-type="submit">登 录
                    </van-button>
                </div>
            </van-form>
        </div>
        <div class="shadow">
            <div class="oval"></div>
            <div class="btn">
                <img src="static/images/meetingPad/btn-shadow.png" alt="" />
            </div>
            <div class="org">上海梦创双杨数据科技股份有限公司</div>
        </div>
    </div>
</div>
</template>

<script>
export default {
    data() {
        return {
            title: dsf.config.login.applicationName || "dreamweb会务系统",
            logname: "",
            password: "",
            DeviceId: "postman",
            DeviceName: "postman",
        };
    },
    beforeCreate() {
        // dsf.util.clearSession();
    },
    created() {
        dsf.util.clearSession();
        let self = this;
        self.setDeviceInfo();
    },
    methods: {
        login() {
            let self = this;
            dsf.http
                .post("/fn/mobileAuth/login", {
                    __DATA: JSON.stringify({
                        logname: self.logname,
                        password: self.password,
                        device_id: self.DeviceId,
                        device_desc: self.DeviceName,
                    }),
                })
                .done((result) => {
                    console.log("login == ", result);
                    if (result.rcode == 1) {
                        dsf.util.saveToSessionStore("user", result.data);
                        // self.$router.replace("/meetingPad/front");
                        self.getData()
                    }
                    dsf.layer.toast(result.message);
                })
                .error((error) => {
                    console.log("error", error);
                    dsf.layer.toast("系统错误，请稍后重试！", false);
                });
        },
        getData() {
            dsf.http
                .post(`fn/conferenceMobile/meetingList`, {
                    query_meetingType: "",
                    query_meetingStatus: ""
                })
                .done(result => {
                    if (result && result.datas) {
                        const meetingLists = [];
                        result.datas.forEach(item => {
                            meetingLists.push(item.dataValue)
                        })
                        if (meetingLists.length > 0) {
                            if (!dsf.config.login.defaultUrl) {
                                this.$router.push({
                                    name: "meetingPadAppcenter",
                                    query: {
                                        meetingId: meetingLists[0].id
                                    }
                                })
                            } else {
                                this.$router.push({
                                    name: `${dsf.config.login.defaultUrl}`,
                                    query: {
                                        meetingId: meetingLists[0].id
                                    }
                                })
                            }

                        } else {
                            this.$router.push({
                                name: "meetingPadEmpty"
                            })
                        }
                    }
                })
                .error(error => {
                    dsf.layer.toast("数据获取失败！", false);
                })
                .always(() => {
                    // dsf.layer.closeLoading(self.loading);
                });
        },
        setDeviceInfo() {
            if (dsf.util.getClientName() == "app") {
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
                    xsfCommon.SystemTools(
                        ["DeviceName"],
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
    },
};
</script>

<style lang="scss" scoped>
// @import './style/common.scss';
// @import './style/padVant.scss';

.contanier {
    font-size: 0.8rem;
    height: 100vh;
    overflow: hidden;
    background-image: url("../../../static/images/meetingPad/login-bg1.png");
    background-position: top left;
    background-size: contain;
    background-repeat: no-repeat;

    .box {
        width: 30.76rem;
        height: 19.36rem;
        margin: 50vh auto 0;
        transform: translateY(-50%);
        background-image: url("../../../static/images/meetingPad/login-box.png");
        background-position: top left;
        background-size: 100% 100%;
        position: relative;

        .top {
            text-align: center;
            color: #fff;
            overflow: hidden;
            font-family: PingFangSC-Semibold, serif;
            font-size: 1.12rem;
            letter-spacing: 0.12rem;
            line-height: 1.58rem;

            div {
                &:first-child {
                    font-size: 1.12rem;
                    margin-top: 2rem;
                }

                &:last-child {
                    font-size: 1.2rem;
                    font-weight: 600;
                    margin-top: 1rem;
                    color: #ffffff;
                    letter-spacing: 0.3rem;
                    text-align: center;
                    line-height: 1.58rem;
                }
            }

            img {
                display: inline;
                width: 2.08rem;
                height: 2rem;
                margin-right: 0.46rem;
            }
        }

        .form {
            width: 40%;
            margin: 2rem auto 0;
            padding: 0.6rem 0;

            .van-cell {
                height: 2rem;
                font-family: PingFangSC-Semibold, serif;
                font-size: 0.8rem;
                width: 13.32rem;
                border: 0.04rem solid #e1e1e1;
                border-radius: 0.16rem;
                margin-bottom: 1rem;
            }

            // div {
            //   &:not(:last-child) {
            //     //margin-bottom: 1rem;
            //   }
            // }

            .left-label {
                height: 2rem;
                font-family: PingFangSC-Regular, serif;
                color: #333333;
                position: absolute;
                right: 72%;
                font-size: 0.88rem;
                line-height: 2rem;
                margin: 0 0 0 0;
            }

            .btnbox {
                width: 13.32rem;

                .btn {
                    width: 13.32rem;
                    padding: 0.96rem 0;
                    border-radius: 0.16rem;
                    background-color: #3b74db;
                    height: 2rem;
                    font-family: PingFangSC-Semibold, serif;
                    font-size: 0.8rem;
                    color: #ffffff;
                    letter-spacing: 0.1rem;
                    text-align: center;
                }
            }
        }

        .shadow {
            position: absolute;
            bottom: 0;
            left: 50%;
            width: 12.32rem;
            transform: translate(-50%, calc(100% - 0.4rem));

            .oval {
                width: 13.32rem;
                height: 0.4rem;
                border-radius: 50%;
                box-shadow: 0.2rem 0.2rem 0.2rem #b8c5d6;
            }

            .btn {
                width: 13.32rem;
                height: 2rem;
                margin: 1.2rem auto 0;

                img {
                    width: 100%;
                }
            }
        }
    }

    .org {
        width: 13.32rem;
        height: 0.4rem;
        position: absolute;
        bottom: -1rem;
        left: 53%;
        transform: translateX(-50%);
        font-family: PingFangSC-Regular, serif;
        font-size: 0.8rem;
        color: #8a8a8a;
        text-align: center;
    }

    .van-button--info {
        border: none;
    }
}
</style>

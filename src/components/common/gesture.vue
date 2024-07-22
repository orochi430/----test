<template>
<div class="gesture" ref="gestureBox">
    <canvas ref="myCanvas"></canvas>
</div>
</template>

<script>
import store from "@/common/util";
import B64 from "@/common/base64";
export default {
    name: "gesture",
    props: {
        gestureType: {
            type: String,
            default: ''
        },
        isSet: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            c: "",
            cPosition: {},
            cxt: "",
            CW: 600,
            CH: 320,
            Radius: 36,
            offsetX: 5,
            offsetY: 5,
            password: [], //设置的密码点组
            successColor: "#67c23a",
            errorColor: "red",
            innerColor: "",
            successInnerColor: "#ffffff",
            errorInnerColor: "#ffffff",
            selectColor: "#627eed",
            notSelectColor: "#CBCACE",
            Re: [],
            borderWidth: 1,
            pointLine: [],
            pointWidth: 12, //圆心的半径大小
            lineWidth: 3, //连线的大小
            count: 0, //记录设置手势密码次数
            pas_length: false, //密码长度是否小于3，密码是否设置正确
            tip_mes: "", //提示信息
            tip_color: "", //提示信息的颜色css
            type: this.gestureType, //check set clear
            title: '',
        };
    },
    created() {
        // this.type = this.$route.query.type ? this.$route.query.type : 'set';
        switch (this.type) {
            case 'set':
                this.title = '设置手势密码';
                break;
            case 'check':
                this.title = '手势解锁';
                break;
            case 'clear':
                this.title = '清除手势密码';
                break;
        }
        if (store.loadLocalStore("gesture_pas") == null && this.type != 'set') {
            dsf.layer.alert({
                title: '温馨提示',
                message: '还未设置手势密码'
            }, () => {
                this.$router.go(-1);
            })
        }
    },
    mounted() {
        this.innerColor = this.successInnerColor;
        this.$nextTick(() => {
            this.init();
            this.initEvent();
        });
    },
    methods: {
        goBack() {
            this.$router.go(-1);
        },
        init() {
            this.initCas();
            this.getPointLocationArr();
            this.draw();
        },
        initCas() {
            //初始化画布
            console.log(this.$refs.gestureBox.offsetWidth)
            this.c = this.$refs.myCanvas;
            this.CW = this.$refs.gestureBox.offsetWidth;
            this.CH = this.CW / 1.06;

            this.c.width = this.CW;
            this.c.height = this.CH;
            if (parseInt(this.CW) > 600 && parseInt(this.CW) < 1000) {
                this.c.width = 600;
                this.c.height = 600;
                this.CH = 600;
                this.CW = 600;
                this.offsetX = 20;
                this.Radius = 35;
                this.c.style.margin = "0 calc(50% - 300px)";
                // this.offsetY=60;
            }
            if (parseInt(this.CW) > 1000) {
                this.c.width = 800;
                this.c.height = 800;
                this.CH = 800;
                this.CW = 800;
                this.offsetX = 20;
                this.Radius = 45;
                this.c.style.margin = "0 calc(50% - 400px)";
            }
            console.log(this.c.height, this.offsetY);
            this.cPosition = this.c.getBoundingClientRect();
            this.cxt = this.c.getContext("2d");
        },
        getPointLocationArr() {
            //获取九宫格圆心位置信息
            //获取圆点之间的间距
            let diffX = (this.CW - this.offsetX * 2 - this.Radius * 2 * 3) / 2;
            let diffY = (this.CH - this.offsetY * 2 - this.Radius * 2 * 3) / 2;
            for (let row = 0; row < 3; row++) {
                for (let col = 0; col < 3; col++) {
                    let point = {
                        x: this.offsetX +
                            col * diffX +
                            (col * 2 + 1) * this.Radius,
                        y: this.offsetY +
                            row * diffY +
                            (row * 2 + 1) * this.Radius,
                        coordinate: String(row) + String(col),
                    };
                    this.Re.push(point);
                }
            }
            console.log(this.Re);
        },
        drawPoint(touches, touchPoint) {
            //选中的圆画圆心并连接起来
            let pointLine = this.pointLine;
            this.cxt.beginPath();
            for (let i = 0; i < pointLine.length; i++) {
                let point = this.Re[pointLine[i]]; //根据存储的圆点的下标找到圆点的圆心位置
                //连接选中的点begin
                this.cxt.lineTo(point.x, point.y);
            }
            this.cxt.strokeStyle = this.selectColor;
            this.cxt.lineWidth = this.lineWidth;
            this.cxt.stroke();
            this.cxt.closePath();
            if (touchPoint) {
                let lastPoint = this.Re[
                    this.pointLine[this.pointLine.length - 1]
                ];
                this.cxt.beginPath();
                this.cxt.moveTo(lastPoint.x, lastPoint.y);
                this.cxt.lineTo(
                    touches.pageX - this.cPosition.left,
                    touches.pageY - this.cPosition.top
                );
                this.cxt.strokeStyle = this.selectColor;
                this.cxt.lineWidth = this.lineWidth;
                this.cxt.stroke();
                this.cxt.closePath();
            }
        },
        isPointSelect(touchs) {
            //圆点是否被选中
            let Re = this.Re;
            for (let i = 0; i < Re.length; i++) {
                let currentPonit = Re[i];
                let xdiff = Math.abs(
                    touchs.pageX - currentPonit.x - this.cPosition.left
                );
                let ydiff = Math.abs(
                    touchs.pageY - currentPonit.y - this.cPosition.top
                );
                let dir = Math.pow(xdiff * xdiff + ydiff * ydiff, 0.5); //当前鼠标的位置与圆心之间的距离两边和的开方
                if (dir <= this.Radius) {
                    // if (this.pointLine.indexOf(i) == -1) {
                    //     this.pointLine.push(i);
                    // }
                    // break;

                    if (
                        !this.pointLine.length &&
                        this.pointLine.indexOf(i) === -1
                    ) {
                        this.pointLine.push(i);
                    } else if (this.pointLine.indexOf(i) === -1) {
                        this.handleError(i); //采用另一种方式，解决可能存在的bug
                    }
                }
            }
        },
        initEvent() {
            let _this = this;
            this.c.addEventListener("touchstart", function (e) {
                _this.isPointSelect(e.touches[0]);
            });
            this.c.addEventListener("touchmove", function (e) {
                _this.isPointSelect(e.touches[0]);
                //清空画布
                _this.cxt.clearRect(0, 0, _this.CW, _this.CH);
                _this.draw(e.touches[0], true);
            });
            this.c.addEventListener("touchend", function (e) {
                _this.pas_length = false; //重置设置成立

                // _this.handleEror();

                if (_this.pointLine.length < 4 && _this.type == 'set') {
                    _this.errorSet("密码长度不能小于4")
                    _this.pas_length = true; //密码长度小于4，该次设置不成立、次数不加1
                }
                _this.checkIsRight();
                //清空画布
                _this.cxt.clearRect(0, 0, _this.CW, _this.CH);
                _this.draw(e.touches[0], false);
                _this.resetCxt(e.touches[0]);
            });
        },
        handleError(i) {
            //解决可能漏点的错误
            // for (let i = 0; i < this.Re.length; i++) {
            // if (this.pointLine.indexOf(i) === -1) {
            //     }
            //     }
            let value = this.pointLine[this.pointLine.length - 1]; // 根据此值(下标)找出对应的this.left和this.top
            // value是上一个点的值，i是当前连接点的值
            // 1-9 9-1、3-7 7-3、2-8 8-2、4-6 6-4
            if (
                (i === 0 && value === 8) ||
                (i === 8 && value === 0) ||
                (i === 2 && value === 6) ||
                (i === 6 && value === 2) ||
                (i === 1 && value === 7) ||
                (i === 7 && value === 1) ||
                (i === 3 && value === 5) ||
                (i === 5 && value === 3)
            ) {
                // this.password中存的是下标
                if (this.pointLine.indexOf(4) === -1) {
                    this.pointLine.push(4);
                }
            } else if ((i === 2 && value === 0) || (i === 0 && value === 2)) {
                // 1-3  3-1
                if (this.pointLine.indexOf(1) === -1) {
                    this.pointLine.push(1);
                }
            } else if ((i === 6 && value === 8) || (i === 8 && value === 6)) {
                // 7-9  9-7
                if (this.pointLine.indexOf(7) === -1) {
                    this.pointLine.push(7);
                }
            } else if ((i === 0 && value === 6) || (i === 6 && value === 0)) {
                // 1-7  7-1
                if (this.pointLine.indexOf(3) === -1) {
                    this.pointLine.push(3);
                }
            } else if ((i === 2 && value === 8) || (i === 8 && value === 2)) {
                // 3-9  9-3
                if (this.pointLine.indexOf(5) === -1) {
                    this.pointLine.push(5);
                }
            }
            // 存密码
            this.pointLine.push(i);
        },
        resetCxt(touches) {
            //重置设置密码，清空画布
            let _this = this;

            setTimeout(() => {
                this.pointLine = [];
                this.selectColor = "#627eed"; //重置画线颜色
                this.innerColor = this.successInnerColor;
                this.cxt.clearRect(0, 0, _this.CW, _this.CH);
                this.draw(touches, false);
            }, 1000);
        },
        checkIsRight() {
            //检验密码是否正确
            if (this.pas_length) return; //画线不成功，后续不进行
            console.log("画线密码为：", this.pointLine, this.password, this.count);
            if (!this.pas_length) {
                this.count++; //一次画线成功，次数加一
            }
            if (this.type == 'set') {
                //如果不是检验密码，是修改或新设置密码，进行如下验证
                if (this.count === 1) {
                    this.password = this.pointLine; //初次输入正确，保存所设置密码
                    this.successSet("初次设置密码成功，请再次输入")
                } else {
                    if (this.password.toString() != this.pointLine.toString()) {
                        // 密码不正确，配上错误颜色及提示信息
                        this.errorSet("两次密码不一致，请重新输入");
                    } else {
                        // 密码正确，配上正确颜色及提示信息
                        this.successSet("二次输入正确，密码设置成功！");
                        console.log(this.password)
                        store.saveToLocalStore("gesture_pas", this.password);
                        store.saveToLocalStore("loginMode_set", true); //设置过登录方式,不再提醒
                        setTimeout(() => {
                            this.$router.go(-1); //一秒后退回原页
                        }, 500);
                    }
                }
            } else if (this.type == 'check') {
                //如果是检验密码
                if (this.count === 3 && String(this.pointLine) !== String(store.loadLocalStore("gesture_pas"))) {
                    //3次输入错误，跳到账号密码登录
                    this.errorSet("手势密码错误，请重新输入");
                    let _this = this;
                    dsf.layer.alert({
                        title: '温馨提示',
                        message: '超过三次输入失败，进入帐号密码登录'
                    }, () => {
                        store.removeToLocalStore("gesture_pas");
                        store.removeToLocalStore("passWord");
                        // this.$router.push('/testLogin');
                        this.$emit('gestureError')
                    })
                }
                if (String(this.pointLine) !== String(store.loadLocalStore("gesture_pas"))) {
                    this.errorSet("手势密码错误，请重新输入");
                } else {
                    //this.successSet("登录成功");
                    this.commonLogin();
                }
            } else if (this.type == 'clear') {
                if (String(this.pointLine) !== String(store.loadLocalStore("gesture_pas"))) {
                    this.errorSet("手势密码错误，请重新输入");
                } else {
                    // this.successSet("手势密码正确，清除手势密码中！");
                    this.clearPsw();
                }
            }
        },
        goUrl() {
            if (dsf.config.login.defaultUrl) {
                this.$router.replace(dsf.config.login.defaultUrl);
            } else {
                this.$router.replace("/index");
            }
        },
        commonLogin() {
            //通用登录方法
            let self = this
            let userinfo = dsf.util.loadSessionStore("user");
            if (userinfo) {
                //dsf.util.removeSessionStore("defaultcount");
                self.goUrl();
            } else {
                const loading = dsf.layer.loading("登录中...");
                dsf.http
                    .post("/fn/mobileAuth/login", {
                        __DATA: JSON.stringify({
                            logname: B64.decode(store.loadLocalStore('uid')),
                            password: B64.decode(store.loadLocalStore('pid')),
                            device_id: "postman",
                            device_desc: "postman",
                        }),
                    })
                    .then(data => {
                        dsf.layer.closeLoading(loading);
                        if (data.data.rcode == 1) {
                            dsf.layer.toast(data.data.message);
                            store.saveToSessionStore("user", data.data.data);
                            store.saveToSessionStore("loginToken", data.data.data.auth.token);
                            store.saveToLocalStore("loginToken", data.data.data.auth.token);
                            store.saveToLocalStore("user", JSON.stringify(data.data.data));
                            store.logIn(() => {
                                self.goUrl();
                            });
                        } else {
                            store.removeToLocalStore('uid');
                            store.removeToLocalStore('pid');
                            dsf.layer.toast('登录失效,请重新登录');
                            self.$router.replace('/testLogin');
                            return;
                        }
                    }).catch(err => dsf.layer.closeLoading(loading));
            }
        },
        clearPsw() {
            store.removeToLocalStore("gesture_pas");
            store.removeToLocalStore("loginMode_set");
            this.successSet('手势密码清除成功')
            dsf.layer.alert({
                title: '温馨提示',
                message: '手势密码清除成功'
            }, () => {
                if (this.$route.params.type) {
                    this.$router.go(-2);
                } else {
                    this.$router.go(-1);
                }
            })
        },
        successSet(mes) {
            //正确设置，设置提示信息及显示颜色
            this.tip_mes = mes;
            this.tip_color = "success_word";
            this.selectColor = this.successColor;
            this.innerColor = this.successInnerColor;
            this.isSet ? this.$emit('remind', 'success', this.tip_mes) : dsf.layer.toast(this.tip_mes)
        },
        errorSet(mes) {
            //错误设置，设置提示信息及显示颜色
            this.tip_mes = mes;
            this.tip_color = "error_word";
            this.selectColor = this.errorColor;
            this.innerColor = this.errorInnerColor;
            this.isSet ? this.$emit('remind', 'warn', this.tip_mes) : dsf.layer.toast(this.tip_mes)
        },
        draw(touches, touchPonit) {
            //画九宫格
            if (this.pointLine.length > 0) this.drawPoint(touches, touchPonit);
            let Re = this.Re;
            for (let i = 0; i < Re.length; i++) {
                let point = Re[i];

                //画内部白色的圆
                this.cxt.fillStyle = this.innerColor;
                this.cxt.beginPath();
                this.cxt.arc(
                    point.x,
                    point.y,
                    this.Radius - this.borderWidth,
                    0,
                    2 * Math.PI,
                    true
                );
                this.cxt.fill();
                this.cxt.closePath();
                // 画圆点的圆心
                this.cxt.fillStyle = this.notSelectColor;
                this.cxt.beginPath();
                this.cxt.arc(
                    point.x,
                    point.y,
                    this.pointWidth,
                    0,
                    2 * Math.PI,
                    true
                );
                this.cxt.fill();
                this.cxt.closePath();
                //画选中圆点的圆心
                if (this.pointLine.indexOf(i) != -1) {
                    //画外层蓝色的圆
                    this.cxt.fillStyle = this.selectColor;
                    this.cxt.beginPath();
                    this.cxt.arc(
                        point.x,
                        point.y,
                        this.Radius,
                        0,
                        2 * Math.PI,
                        true
                    ); //圆心x坐标，y坐标，圆的半径，从0 画到360，逆时针画图
                    this.cxt.fill();
                    this.cxt.closePath();
                    //画内部白色的圆
                    this.cxt.fillStyle = this.innerColor;
                    this.cxt.beginPath();
                    this.cxt.arc(
                        point.x,
                        point.y,
                        this.Radius - this.borderWidth,
                        0,
                        2 * Math.PI,
                        true
                    );
                    this.cxt.fill();
                    this.cxt.closePath();
                    //画选中的点begin
                    this.cxt.fillStyle = this.selectColor;
                    this.cxt.beginPath();
                    this.cxt.arc(
                        point.x,
                        point.y,
                        this.pointWidth,
                        0,
                        2 * Math.PI,
                        true
                    );
                    this.cxt.fill();
                    this.cxt.closePath();
                    //画选中的点end
                }
            }
        },
        randomString(len) {
            //生成随机字符串
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

<style lang="scss" scoped>
@import '../../assets/styles/themes.scss';
@import '../../assets/styles/mixin.scss';

.van-nav-bar {
    @include font-theme('normal');

    .van-icon {
        @include font-theme('normal');
        @include font_5;
        margin-right: 3px;
    }
}

.logo_img {
    width: 100%;
}

.error_word {
    color: red;
}

.success_word {
    color: #67c23a;
}

.img_tip {
    display: flex;
    position: relative;
    padding-bottom: 25px;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin: calc(var(--f7-navbar-height) + 50px) auto 0px;

    span {
        position: absolute;
        bottom: 0;
    }
}
</style>


/**
 * 2022年11月23日11:20:41
 * @luy
 */
import VuexStore from '@/store';
import router from '@/router/index'

const chatJS = {
    //IM初始化，拿到access_token为了后期做单点登录，如果没有IM直接什么都不做
    async initIM(isLogin, callback) {
        //https://im.shpdhd.cn/login
        //http://localhost/mobile/index.html#/login
        // dsf.util.loadSessionStore("imAccessToken")

        if (isLogin || this.getIMId().length) {
            let loginUrl = `${dsf.config.IMSetting.IMserverUrl}/login`
            let logname = dsf.base64.decode(dsf.util.loadLocalStore("userName"));
            let txtpassword = dsf.base64.decode(dsf.util.loadLocalStore("passWord"));
            await dsf.http.post(loginUrl, {
                username: logname, password: txtpassword
                //username: "18483628931", password: "18483628931wxx"
            }).then((res) => {
                console.log("执行IM登录获取到返回值：", res);
                if (res.data?.data?.accessToken) {
                    dsf.util.saveToSessionStore("imAccessToken", res.data.data.accessToken);
                }
                callback?.(res);
            })
        }
    },
    IMId: "",
    getIMId() {//获取IM的iframe的ID
        if (this.IMId.length) {
            return this.IMId
        }
        let imId = ""
        let array = dsf.util.loadSessionStore("footerMenu")
        for (let index = 0; index < array.length; index++) {
            const element = array[index];
            let arrayCom = element.components
            for (let i = 0; i < arrayCom.length; i++) {
                const elementCom = arrayCom[i];
                if (elementCom.name == "ExternalLinksComponents" && elementCom.params.iframeType == "IM") {
                    imId = element.id;
                    break;
                }
            }
            if (imId.length) {
                break;
            }
        }
        this.IMId = imId
        return imId
    },
    toPrivateChat: function (toId) {//根据ID打开私聊
        this.toGroupChat(toId, "user")
    },
    toGroupChat: function (groupId, type) {//根据群ID打开群聊
        VuexStore.commit("setHistory", { url: router.app._route.fullPath, historyCount: history.length })
        let postdata = {
            type: "IM",
            action: "toChat",
            params: {
                toId: groupId,
                // toName:聊天对象名称
                conversationType: type == "user" ? "PRIVATE" : "GROUP"
                // messageId?:消息定位
            }
        }

        let iframe = document.getElementById(this.getIMId());
        iframe.contentWindow.postMessage(postdata, "*");

        this.changeIMState(true)
        window.onmessage = (event) => {
            console.log("OA收到消息", event);
            if (event.data.action == "backList") {
                this.changeIMState(false)
            }
        }

    },
    //创建群，需要三个参数1、群成员2、群名称3、创建成功的回调函数
    //users格式：[{ id: "", name: "", avatar: "", type: "user" }]
    createGroup: function (users, groupName, callback) {
        VuexStore.commit("setHistory", { url: router.app._route.fullPath, historyCount: history.length })
        let iframe = document.getElementById(this.getIMId());
        let postdata = {
            type: "IM",
            action: "createGroup",
            params: {
                groupUsers: users
            }
        }
        if (groupName) {
            postdata.params.groupName = groupName
        }

        iframe.contentWindow.postMessage(postdata, "*");
        this.changeIMState(true)

        window.onmessage = (event) => {
            if (event.data.action == "backList") {
                console.log("OA收到消息", event);
                this.changeIMState(false)
            }

            if (event.data.action == "createGroupSuccess") {
                console.log("OA收到消息", event);
                callback ? callback(event.data.params.groupId) : ""
            }
        }

    },
    changeIMState(state) {//切换IM模式
        if (state) {
            $("#divIframe").removeClass("hasFoot").addClass("noFoot");
            $("#divIframe").fadeIn(500)
            $("#appTop").hide()
            $("#appContent").hide()
            $("#" + this.getIMId()).parent().fadeIn(500)
        } else {
            $("#divIframe").hide()
            $("#appTop").fadeIn(500)
            $("#appContent").fadeIn(500)
            $("#divIframe").removeClass("noFoot").addClass("hasFoot");
            $("#" + this.getIMId()).parent().hide()
        }
    },
    registerMessage() {
        let self = this
        let ImInterval = setInterval(() => {
            if (router.app._route.name == "index") {
                imRegisterPostMessage()
            }
        }, 1000);

        function imRegisterPostMessage() {
            //方法执行立即清楚定时器
            clearInterval(ImInterval)
            ImInterval = null

            let scrollIntoViewTimer = null
            let changeHeightTimer = null
            let viewport = window.visualViewport;
            let viewHeight = 0
            let clientHeight = document.documentElement.clientHeight
            let sourceViewHeight = $("#divIframe").height()
            let checkIM = self.getIMId();
            if (checkIM.length) {
                console.log("sourceViewHeight1:", sourceViewHeight);
                function resizeHandler(e) {
                    console.log({
                        width: viewport.width,
                        height: viewport.height,
                        viewHeight: viewHeight
                    });
                    if (viewport.height < clientHeight - 10 && viewHeight <= 0 && router.app._route.name == "index" && !$("#" + checkIM).is(":hidden")) { //保险起见多减去10px
                        // scrollIntoViewTimer = setInterval(() => {
                        // }, 100);

                        setTimeout(() => {
                            $("#" + checkIM).parent()[0].scrollIntoView()

                            viewHeight = viewport.height
                            console.log({
                                viewHeight: viewHeight
                            });
                            $("#" + checkIM).parent().height(viewHeight)
                        }, 100);
                        // changeHeightTimer = setInterval(() => {
                        // }, 100);
                    }
                }
                window.visualViewport.addEventListener('resize', resizeHandler);//监听视图变化，也就是键盘弹起和收缩事件

                console.log("注册接收IM消息监听");
                //app.vue中调用,因为window.onmessage只能注册一次，所以这里只能用window.addEventListener
                window.addEventListener('message', function (event) {
                    // console.log("OA收到消息App.vue", event.data);
                    if (event.data.action == "controlBottom") {//控制底部菜单栏
                        if (event.data.params.flag == 1) {
                            $("#divIframe").removeClass("noFoot").addClass("hasFoot");
                            $("#" + checkIM).parent().height(sourceViewHeight)
                            $("#appTop").show()
                            $("#appContent").show()
                            $("#appFoot").show()
                        } else if (event.data.params.flag == 0) {
                            $("#divIframe").removeClass("hasFoot").addClass("noFoot");
                            $("#" + checkIM).parent().height(clientHeight)
                            $("#appTop").hide()
                            $("#appContent").hide()
                            $("#appFoot").hide()
                        }
                    }
                    else if (event.data.action == "showIOSKeyBoard") {//弹起键盘
                        if (viewHeight > 0) {
                            // setTimeout(() => {
                            // }, 100);
                            scrollIntoViewTimer = setInterval(() => {
                                $("#" + checkIM).parent()[0].scrollIntoView()
                            }, 100);

                            changeHeightTimer = setInterval(() => {
                                $("#" + checkIM).parent().height(viewHeight)
                            }, 100);
                        }
                        $iaction.encrypt({ "action": "webviewnotcanscrollow" }, function (s) { }, function (e) { });
                    }
                    else if (event.data.action == "hideIOSKeyBoard") {//收缩键盘
                        if (($('#appFoot').length > 0 && $("#appFoot").is(":hidden")) || $('#appFoot').length == 0) {
                            $("#" + checkIM).parent().height(clientHeight)
                        }
                        else {
                            $("#" + checkIM).parent().height(sourceViewHeight)
                        }

                        clearInterval(scrollIntoViewTimer)
                        scrollIntoViewTimer = null
                        clearInterval(changeHeightTimer)
                        changeHeightTimer = null

                        $iaction.encrypt({ "action": "webviewcanscrollow" }, function (s) { }, function (e) { });
                    }
                })
            } else {//非底部内嵌方式
                window.addEventListener('message', function (event) {
                    // console.log("OA收到消息App.vue", event.data);
                    if (event.data.action == "controlTop") {//控制头部菜单栏
                        if (event.data.params.flag == 1) {
                            $("#appTop").show()
                        } else if (event.data.params.flag == 0) {
                            $("#appTop").hide()
                        }
                    } else if (event.data.action == "shdcVR") {
                        // let uuID = event.data.userID
                        dsf.loadJs('static/js/socketIO/socket.io-2.0.1.js').then(() => {
                            dsf.loadJs('static/js/socketIO/socketIO.js').then(() => {
                                let userId = dsf.util.loadLocalStore("user")["user_id"]
                                let query = {
                                    user_id: userId
                                }
                                event.data.vrlink.split("?")[1].split("&").map(item => item.split("=")).forEach(item => {
                                    query[item[0]] = item[1]
                                });
                                window.socketIO.link("wss://vrhouse.4dkankan.com", { path: `/vr-node`, query })
                            })
                        })
                    }
                    else if (event.data.action == "controlBottom") {//控制底部菜单栏
                        if (event.data.params.flag == 1) {
                            $("#divIframe").removeClass("noFoot").addClass("hasFoot");
                            $("#appTop").show()
                            $("#appContent").show()
                            $("#appFoot").show()
                        } else if (event.data.params.flag == 0) {
                            $("#divIframe").removeClass("hasFoot").addClass("noFoot");
                            $("#appTop").hide()
                            $("#appContent").hide()
                            $("#appFoot").hide()
                        }
                    }
                })
            }
        }


    },
    closeIMPage() {//关闭im的层
        let iframe = document.getElementById(this.getIMId());
        let postdata = {
            type: "IM",
            action: "closeWindow"
        }
        iframe.contentWindow.postMessage(postdata, "*");
    }
}

export default chatJS
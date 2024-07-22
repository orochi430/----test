Native = function () {
    let isNative = false
    let callbackSet = {}

    //获取当前运行环境
    this.isNative = () => {
        return isNative
    }

    //webview加载完毕时，原生端主动调用此方法
    this.onReady = () => {
        isNative = true
    }

    //关闭当前webview界面
    this.back = (v) => {
        exec({
            id: "back",
            args: [v]
        })
    }

    //登录
    this.logIn = (v) => {
        exec({
            id: "logIn",
            args: [v]
        })
    }

    //回到首页
    this.goHome = () => {
        exec({
            id: "goHome",
            args: []
        })
    }

    //退出登录
    this.logOut = () => {
        exec({
            id: "logOut"
        })
    }

    //唤起扫码
    this.qrScan = (callback) => {
        exec({
            id: "qrScan"
        }, callback)
    }

    //获取版本号
    this.getAppVersion = (callback) => {
        exec({
            id: "getAppVersion"
        }, callback)
    }

    //关闭当前webview界面
    this.close = () => {
        exec({
            id: "close"
        })
    }

    //控制原生端输入框显示隐藏
    this.controlInputBar = (v) => {
        exec({
            id: "controlInputBar",
            args: [v]
        })
    }

    /*初始化获取本地缓存信息
     **/
    this.getHistoryMessages = (v, callback) => {
        exec({
            id: "getHistoryMessages",
            args: [v]
        }, callback)
    }

    //设置安卓调试弹窗
    this.setUrlToastState = (v) => {
        exec({
            id: "setUrlToastState",
            args: [v]
        })
    }

    /*获取当前登录的用户信息
     * callback:(v)=>{}
     * */
    this.getUserInfo = (callback) => {
        exec({
            id: "getUserInfo"
        }, callback)
    }

    /*获取当前的配置信息
     * callback:(v)=>{}
     * */
    this.getConfig = (callback) => {
        exec({
            id: "getConfig"
        }, callback)
    }

    /*获取正在发送的消息
     * toId:string
     * callback:(v)=>{}
     * */
    this.getSendingMessages = (toId, callback) => {
        exec({
            id: "getSendingMessages",
            args: [toId]
        }, callback)
    }

    /*文件预览
     * url:string
     * name:string
     * */
    this.preview = (v) => {
        exec({
            id: "preview",
            args: [v]
        })
    }

    /*打开webview
     * 参数
     * hideHead:boolean
     * url:string
     * */
    this.openWebView = (v) => {
        exec({
            id: "openWebView",
            args: [v]
        })
    }


    /*设置当前发送消息的密级
     * 参数
     * secretLevel:number
     * */
    this.changeSendMessageSecretLevel = (v) => {
        exec({
            id: "changeSendMessageSecretLevel",
            args: [v]
        })
    }

    /*跳转人员聊天界面
     * 参数:
     * conversationType:GROUP | PRIVATE | SERVICE
     * toId:string
     * toName:string
     * messageId?:string
     **/
    this.chatTo = (v) => {
        exec({
            id: "toChat",
            args: [v]
        })
    }

    /*跳转人员详情页面
     * 参数:
     * id:string
     **/
    this.toUserInfo = (v) => {
        exec({
            id: "toUserInfo",
            args: [v]
        })
    }

    /*重新编辑撤回的消息
     * 参数:
     * text:string
     * */
    this.reEditMessage = (v) => {
        exec({
            id: "reEditMessage",
            args: [v]
        })
    }

    /*进入会话列表发送消息已读回执
     * 参数
     * toId:string
     * conversationType:GROUP | PRIVATE | SERVICE
     * */
    this.readReceipt = (v) => {
        exec({
            id: "readReceipt",
            args: [v]
        })
    }

    /*发送websocket消息
     * messageString指一个发送的消息体对象转化的字符串
     **/
    this.sendMessage = (messageString) => {
        exec({
            id: "sendMessage",
            args: [messageString]
        })
    }

    /*消息回复
     * chatMessage指一个完整的消息体对象
     * */
    this.replyMessage = (chatMessage) => {
        exec({
            id: "replyMessage",
            args: [chatMessage]
        })
    }

    /*
    退出消息回复
    **/
    this.exitReplyMessage = () => {
        exec({
            id: "exitReplyMessage"
        })
    }

    /*
    注册成功后的回调
    **/
    this.registerSuccessHandler = (v) => {
        exec({
            id: "registerSuccessHandler",
            args: [v]
        })
    }

    /* 催办消息回复
     * toId:string
     * toName:string
     * conversationType: GROUP | PRIVATE
     * content: {
     *   fromId:该催办消息的创建者id,
     *   remindId:string,
     *   text:string,
     *   replyMessage:回复的整个消息体对象
     * }
     * */
    this.replyRemindMessage = (v) => {
        exec({
            id: "replyRemindMessage",
            args: [v]
        })
    }

    //退出催办消息回复
    this.exitReplyRemindMessage = () => {
        exec({
            id: "exitReplyRemindMessage"
        })
    }

    /*at人员
     * users:[{
     *   userId:string
     *   userName:string
     *   userAvatar:string
     * }]
     * */
    this.atUsers = (v) => {
        exec({
            id: "atUsers",
            args: [v]
        })
    }

    //预览图片
    this.previewImage = (v) => {
        exec({
            id: "previewImage",
            args: [v]
        })
    }

    //预览图片
    this.previewMessageImage = (v) => {
        exec({
            id: "previewMessageImage",
            args: [v]
        })
    }

    /*打开文件*/
    this.openFile = (v) => {
        exec({
            id: "openFile",
            args: [v]
        })
    }

    /*打开位置*/
    this.toLocationPage = (v) => {
        exec({
            id: "toLocationPage",
            args: [v]
        })
    }

    //添加催办
    this.createRemind = (v, callback) => {
        let params = window.btoa(encodeURIComponent(JSON.stringify(v)))
        exec({
            id: "createRemind",
            args: [params]
        }, callback)
    }

    /*获取当前定位*/
    this.getLocation = (v, callback) => {
        exec({
            id: "getLocation" + Date.now(),
            method: "getLocation",
            args: [v]
        }, callback)
    }
    //显示选人
    this.showSelectUsers = (v, callback) => {
        let params = window.btoa(encodeURIComponent(JSON.stringify(v)))
        exec({
            id: "showSelectUsers",
            args: [params]
        }, callback)
    }

    this.onUserSelectDone = (v) => {
        exec({
            id: "onUserSelectDone",
            args: [v]
        })
    }

    //显示选人同时发送消息
    this.showSelectContactsAndSendMessage = (v, callback) => {
        let params = window.btoa(encodeURIComponent(JSON.stringify(v)))
        exec({
            id: "showSelectContactsAndSendMessage",
            args: [params]
        }, callback)
    }

    //显示选人同时发送消息
    this.showSelectUsersAndSendMessage = (v, callback) => {
        let params = window.btoa(encodeURIComponent(JSON.stringify(v)))
        exec({
            id: "showSelectUsersAndSendMessage",
            args: [params]
        }, callback)
    }

    //主动触发回调
    this.setResult = (v) => {
        exec({
            id: "setResult",
            args: [v]
        })
    }

    //内部事件通信
    this.notice = (v) => {
        exec({
            id: "notice",
            args: v
        })
    }

    //打电话
    this.startTel = (v) => {
        exec({
            id: "startTel",
            args: [v]
        })
    }

    //im内部视频会议
    this.startCall = (v) => {
        exec({
            id: "startCall",
            args: [v]
        })
    }

    //加入会议
    this.joinConference = () => {
        exec({
            id: "joinConference",
            args: []
        })
    }

    //唤醒全局搜索
    this.startSearch = () => {
        exec({
            id: "startSearch",
            args: []
        })
    }

    //获取IM中鑫盾用户token（中央党校使用） 2023年9月9日17:40:21@ly
    this.getDxToken = () => {
        return new Promise(function (resolve, reject) {
            try {
                exec({ id: "getDxToken" }, function (data) {
                    resolve({token:data})
                })
            } catch (error) {
                reject({token:""})
            }
        })
    }

    //接收事件通信
    this.onNotice = (v) => {
        if (window.native.onNoticeCallback && isFunction(window.native.onNoticeCallback)) {
            window.native.onNoticeCallback(v)
        }
    }

    //设备解绑
    this.unbindTrusfort = () => {
        exec({
            id: "unbindTrusfort"
        }, function () {
            $iaction.unbindTrusfort(function (s) {
                console.log(s);
            }, function (e) {
                console.log(e);
            });
        })
    }

    //调用封装相关
    function isFunction(f) {
        return typeof (f) == "function"
    }

    function exec(params, callback) {
        try {
            if (params.id && callback) {
                callbackSet[params.id] = callback
            }
            if (!params.method) {
                params.method = params.id;
            }
            if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.platform)) {
                window.webkit.messageHandlers._native.postMessage(JSON.stringify(params))
            } else {
                this._native.exec(JSON.stringify(params))
            }
        } catch (e) {
            console.log(e)
        }
    }

    this.onCallback = function (id, result) {
        if (id && isFunction(callbackSet[id])) {
            try {
                if (result.code === 200) {
                    console.log("方法调用成功", id, result.data)
                    callbackSet[id](result.data)
                }
            } catch (e) {
                alert("调用方法失败" + e.toString() + "方法名:" + id)
            }
            delete callbackSet[id]
        }
    }
}
window.native = new Native()

// h5提供的方法
// 原生端发消息时调用该方法将消息体传递给h5，h5页面上会出现一条加载的假消息，然后原生端调用自己真正的websocket发送消息，
// 监听消息发送回执后通过webSocketOnMessage通知h5，完成消息发送
// window.native.chatSendMessage(v)
//
// 原生端接受到ws消息后调用该方法将消息传递给webview页面
// window.native.webSocketOnMessage(v)
//
// 将h5消息列表滚到底部
// window.native.chatScrollBottom()
//
// 文件上传进度
// window.native.uploadFileProgress(cid:消息cid,progress:上传进度)
//
// 文件上传成功
// window.native.uploadFileSuccess(cid:消息cid,data:调用文件上传接口成功后的返回值)
//
// 回复消息成功后调用该方法关闭消息回复框
// window.native.replyMessageSuccess()

//调用实例
//引入native.js脚本后
//window.native.xxxx(v1:传递的参数,v2:回调函数)
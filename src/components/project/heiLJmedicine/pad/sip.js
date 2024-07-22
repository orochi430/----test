
function showLog(Text) {
    console.info(Text);
}
function onOnDebug(Text) {
    showLog(Text + "\r\n");
    console.info(Text);
}

function OnSipEventOnRing(url) {
    G_oSipPhone.DisplayStatus("来电【" + url + "】");
    G_oSipPhone.SetSipCallStatus(SipCallSence.SIPCALL_RING, url);
    showLog("【OnRing】： url:【" + url + "】\r\n");
    showLog(" *******************************************************************\r\n");
}
function OnSipEventOnOrigated(url) {
    G_oSipPhone.DisplayStatus("外呼中,对方振铃.....");
    G_oSipPhone.SetSipCallStatus(SipCallSence.SIPCALL_ORIGATE, url);
    showLog("【OnOrigated】： url:【" + url + "】\r\n");
    showLog(" *******************************************************************\r\n");
}
function OnSipEventOnDisconnected() {
    G_oSipPhone.DisplayStatus("呼叫结束");
    G_oSipPhone.SetSipCallStatus(SipCallSence.SIPCALL_IDLE);
    showLog("【OnDisconnected】： \r\n");
    showLog(" *******************************************************************\r\n");
}
function OnSipEventOnConnected(sType) {
    G_oSipPhone.SetSipCallStatus(SipCallSence.SIPCALL_CONNECTED);
    G_oSipPhone.DisplayStatus("呼叫接通");
    showLog("【OnConnected】： sType:【" + sType + "】\r\n");
    showLog(" *******************************************************************\r\n");
}
function OnSipEventOnError(errorCode, errorDes) {
    G_oSipPhone.DisplayStatus("Error:(" + errorCode + ")" + errorDes);
    showLog("【OnError】： errorCode:【" + errorCode + "】 errorDes:【" + errorDes + "】\r\n");
    showLog(" *******************************************************************\r\n");
}

function OnSipEventOnLoginSuccess() {
    G_oSipPhone.SetSipRegisterStatus(1);
    G_oSipPhone.DisplayStatus("注册成功!");
    showLog("【OnLoginSuccess】： \r\n");
    showLog(" *******************************************************************\r\n");
}
function OnSipEventOnLoginFailure(code, des) {
    G_oSipPhone.SetSipRegisterStatus(0);
    G_oSipPhone.DisplayStatus("注册失败【code:" + code + " des:" + des + "】");
    showLog("【OnLoginFailure】：【code:" + code + " des:" + des + "】 \r\n");
    showLog(" *******************************************************************\r\n");
}
function OnSipEventOnLogoutSuccess() {
    G_oSipPhone.SetSipRegisterStatus(-1);
    G_oSipPhone.DisplayStatus("注销成功!");
    showLog("【OnLogoutSuccess】： \r\n");
    showLog(" *******************************************************************\r\n");
}
function OnSipEventOnConnectStatus(flag) {
    if (flag == false)
        G_oSipPhone.SetSipRegisterStatus(-1);
    G_oSipPhone.DisplayStatus(flag ? "初始化成功" : "网络断开");
    showLog("【OnConnectStatus】： flag:【" + flag + "】\r\n");
    showLog(" ***************************\r\n");
}
function OnSipEventOnMediaChanged(msg) {
    showLog("【OnMediaChanged】： msg:【" + JSON.stringify(msg) + "】\r\n");
    showLog(" ***************************\r\n");
}
function OnSipEventDebug(msg) {
    showLog("【OnSipDebug】： msg:【" + msg + "】\r\n");
    showLog(" ***************************\r\n");
}
function OnSipEventOnReportScense(callInfo) {
    showLog("【OnSipEventOnReportScense】： ScenseName:【" + callInfo.ScenseName + "】\r\n");
    showLog("  callInfo:【" + callInfo.CallSegments.join("#") + "】\r\n");
    G_oSipPhone.SetCallScenseInfo(callInfo);
}
function OnSipEventOnUpdateVideoWindow(param) {
    console.info(param);
    if (param.key_word == "GetVideoViews") {
        G_oSipPhone.DisplayDiv('divVedioDlg', true);
        param.param.SetVideoViews("local_stream", "remote_stream", "share_stream");
        console.info(document.getElementById('remote_stream'));
    }
    else if (param.key_word == "OnGetLocalView") {
        G_oSipPhone.DisplayDiv(param.param, true);
        showLog(JSON.stringify(param) + "\r\n");
    }
    else if (param.key_word == "OnGetShareView") {
        G_oSipPhone.DisplayDiv(param.param, true);
    }
    else if (param.key_word == "OnGetRemoteView") {
        G_oSipPhone.DisplayDiv(param.param, true);
        showLog(JSON.stringify(param) + "\r\n");
    }
    else if (param.key == "OnLeaveSuccess") {
        G_oSipPhone.DisplayDiv('divVedioDlg', false);
    }
}


function sipCallBackEvent() {

    application.oJSipCtrl.OnRing = OnSipEventOnRing;
    application.oJSipCtrl.OnOrigated = OnSipEventOnOrigated;
    application.oJSipCtrl.OnDisconnected = G_oSipPhone.OnSipEventOnDisconnected;
    application.oJSipCtrl.OnConnected = G_oSipPhone.OnSipEventOnConnected;
    application.oJSipCtrl.OnError = OnSipEventOnError;
    application.oJSipCtrl.OnLoginSuccess = OnSipEventOnLoginSuccess;
    application.oJSipCtrl.OnLoginFailure = OnSipEventOnLoginFailure;
    application.oJSipCtrl.OnLogoutSuccess = OnSipEventOnLogoutSuccess;
    application.oJSipCtrl.OnDebug = OnSipEventDebug;
    application.oJSipCtrl.OnConnectStatus = OnSipEventOnConnectStatus;
    application.oJSipCtrl.OnMediaChanged = OnSipEventOnMediaChanged;
    application.oJSipCtrl.OnReportScense = OnSipEventOnReportScense;
    application.oJSipCtrl.OnUpdateVideoWindow = OnSipEventOnUpdateVideoWindow;
    application.OnDebug = onOnDebug;

    application.DislayProtocol(0);
    showLog("---- 当前版本：【" + application.oJSipCtrl.GetVersion() + "】----\r\n");
    showLog("---- 当前SipType：【sipAdapterTypeJSip(" + application.GetSipType() + ")】----\r\n");
    showLog("------------0:sipAdapterTypeJSip   1:sipAdapterTypeRemoteSip  2:sipAdapterTypeRemoteHttpSip----\r\n");
    showLog("*******************************************************************\r\n\r\n");

    G_oSipPhone.realSipType = application.GetSipType();
    G_oSipPhone.funDoSetting();
    if (application.oJSipCtrl.Initial(!G_oSipPhone.autoRegister) == 0) {
        G_oSipPhone.DisplayStatus("初始化...");
        var options = {
            width: G_oSipPhone.resolutionWidth,
            height: G_oSipPhone.resolutionHeight
        };
        if (G_oSipPhone.oCameraDevices.length > 0) {
            options.videosource = G_oSipPhone.oCameraDevices[0].value;
        }

        console.info(options);
        application.oJSipCtrl.Configurate(options);
        if (G_oSipPhone.autoRegister == 1) {
            application.oJSipCtrl.RegisterPA();
            G_oSipPhone.DisplayStatus("正在注册...");
        }
        else {
            G_oSipPhone.UpdateBtnByID("btnDoCall", 1);
        }
    }
    else
        G_oSipPhone.DisplayStatus("初始化失败");
}

let G_oSipPhone = {
    resolutionWidth: 480,
    resolutionHeight: 640,
    oCameraDevices:[],
    OnSipEventOnConnected:()=>{},
    OnSipEventOnDisconnected:()=>{},
    sipRegisterStatus: -1,
    sipCallStatus: 0,
    sipCallStatusDes: "未登录",
    error: -1,
    errorDes: "",
    realSipType: -1,

    setting: 0,
    logShow: 0,
    vedio: 0,
    audio: 1,
    autoRegister: 1,//默认自动注册

    mute: 0,
    hold: 0,

    SIP_BtnID: {
        btnConnect: 0,
        btnDisconnect: 1,
        btnDoCall: 2,
        btnRegister: 3,
        btnSetting: 4,
        btnMute: 5,
        btnHold: 6,
        btnSingleTransfterDlg: 7,
        btnConsultDlg: 8,
        btnTransfter: 9,
        btnAlertnate: 10,
        btnConference: 11
    },
    UIs: ["btnConnect",
        "btnDisconnect",
        "btnDoCall",
        "btnRegister",
        "btnSetting",
        "btnMute",
        "btnHold",
        "btnSingleTransfterDlg",
        "btnConsultDlg",
        "btnTransfter",
        "btnAlertnate",
        "btnConference"],

    SipCallScenes: [],
    SipCallInfo: [],

    sipConfig: {
        serverIP: "",
        serverPort: 5066,
        dn: "19900000003",
        password: "",
        xPath: ""
    },

    ReSetStatus: function () {
        this.sipRegisterStatus = 0;
        this.sipCallStatus = 0;
        this.sipCallStatusDes = "未登录";
        this.error = -1;
        this.errorDes = "";
        this.realSipType = -1;
        this.setting = 0;
        this.logShow = 0;
        this.mute = 0;
        this.hold = 0;
    },
    ClearCallStatus: function () {
        this.mute = 0;
        this.hold = 0;
        this.SetBtnText("btnMute", "静音");
        this.SetBtnText("btnHold", "保持");
    },

    Init: function () {
        //SIPCALL_NULL
        this.SipCallScenes.push([this.SIP_BtnID.btnRegister, this.SIP_BtnID.btnSetting]);
        //SIPCALL_IDLE
        this.SipCallScenes.push([this.SIP_BtnID.btnDoCall, this.SIP_BtnID.btnRegister, this.SIP_BtnID.btnSetting]);
        //SIPCALL_CALLING
        this.SipCallScenes.push([this.SIP_BtnID.btnDisconnect, this.SIP_BtnID.btnDoChart]);
        //SIPCALL_RING
        this.SipCallScenes.push([this.SIP_BtnID.btnConnect, this.SIP_BtnID.btnDisconnect, this.SIP_BtnID.btnSetting]);
        //SIPCALL_ORIGATE
        this.SipCallScenes.push([this.SIP_BtnID.btnDisconnect, this.SIP_BtnID.btnSetting]);
        //SIPCALL_CONNECTED
        this.SipCallScenes.push([this.SIP_BtnID.btnDisconnect, this.SIP_BtnID.btnMute, this.SIP_BtnID.btnHold,
        this.SIP_BtnID.btnSingleTransfterDlg, this.SIP_BtnID.btnConsultDlg, this.SIP_BtnID.btnSetting]);
        //SIPCALL_MUTE
        this.SipCallScenes.push([this.SIP_BtnID.btnDisconnect, this.SIP_BtnID.btnMute, this.SIP_BtnID.btnHold,
        this.SIP_BtnID.btnSingleTransfterDlg, this.SIP_BtnID.btnConsultDlg, this.SIP_BtnID.btnSetting]);
        //SIPCALL_HOLD
        this.SipCallScenes.push([this.SIP_BtnID.btnDisconnect, this.SIP_BtnID.btnMute, this.SIP_BtnID.btnHold,
        this.SIP_BtnID.btnSingleTransfterDlg, this.SIP_BtnID.btnConsultDlg, this.SIP_BtnID.btnSetting]);
        //SIPCALL_CONSULTRING
        this.SipCallScenes.push([this.SIP_BtnID.btnDisconnect, this.SIP_BtnID.btnSetting]);
        //SIPCALL_CONSULT
        this.SipCallScenes.push([this.SIP_BtnID.btnDisconnect, this.SIP_BtnID.btnTransfter,
        this.SIP_BtnID.btnAlertnate, this.SIP_BtnID.btnConference, this.SIP_BtnID.btnSetting]);
        //SIPCALL_CONFERENCE
        this.SipCallScenes.push([this.SIP_BtnID.btnDisconnect, this.SIP_BtnID.btnSetting]);

        this.sipCallStatus = SipCallSence.SIPCALL_NULL;
    },
    UpdateBtnByID: function (id, flag) {
        // var oBtn = document.getElementById(id);
        // if (oBtn == null)
        //     return;
        // if (flag == 0)
        //     oBtn.disabled = true;
        // else
        //     oBtn.disabled = false;
    },
    UpdateUI: function () {
        // if (this.sipCallStatus < SipCallSence.SIPCALL_NULL || this.sipCallStatus >= SipCallSence.SIPCALL_END)
        //     return;
        // for (var i = 0; i < this.UIs.length; i++) {
        //     this.UpdateBtnByID(this.UIs[i], 0);
        // }
        // var oScene = this.SipCallScenes[this.sipCallStatus];
        // for (var i = 0; i < oScene.length; i++) {
        //     this.UpdateBtnByID(this.UIs[oScene[i]], 1);
        // }
        // switch (this.sipCallStatus) {
        //     case SipCallSence.SIPCALL_NULL:
        //         this.ClearCallStatus();
        //         break;
        //     case SipCallSence.SIPCALL_IDLE:
        //         this.ClearCallStatus();
        //         break;
        //     case SipCallSence.SIPCALL_RING:
        //         break;
        //     case SipCallSence.SIPCALL_ORIGATE:
        //         break;
        //     case SipCallSence.SIPCALL_CONNECTED:
        //         this.ClearCallStatus();
        //         break;
        //     case SipCallSence.SIPCALL_MUTE:
        //         this.mute = 1;
        //         this.SetBtnText("btnMute", "恢复");
        //         break;
        //     case SipCallSence.SIPCALL_HOLD:
        //         this.hold = 1;
        //         this.SetBtnText("btnHold", "接回");
        //         break;
        //     case SipCallSence.SIPCALL_CONSULTRING:
        //         break;
        //     case SipCallSence.SIPCALL_CONSULT:
        //         break;
        //     case SipCallSence.SIPCALL_CONFERENCE:
        //         break;

        // }
        this.DisplayStatus(this.sipCallStatusDes);
    },
    SetPhoneTitle: function (sText) {
        console.log(sText)
    },
    SetPhoneStatus: function (sText) {
        console.log(sText)
    },
    SetCallSceneStatus: function (sText) {
        console.log(sText)
    },
    DisplayStatus: function (sText) {
        console.log(sText)
    },
    SetBtnText: function (id, sText) {
        console.log(sText)
    },
    GetBtnText: function (id) {
        // var oBtn = document.getElementById(id);
        // if (oBtn != null)
        //     return oBtn.value;
        // return "";
    },
    SetCallScenseInfo: function (callInfo) {
        this.sipCallStatus = callInfo.ScenseID;
        this.sipCallStatusDes = callInfo.ScenseName;
        this.SipCallInfo.splice(0, this.SipCallInfo.length);
        for (var i = 0; i < callInfo.CallSegments.length; i++)
            this.SipCallInfo.push(callInfo.CallSegments[i]);
        this.UpdateUI();
    },
    RefreshCallInfo: function () {
        var oTableCallInfo = document.getElementById("idTableCallInfo");
        if (oTableCallInfo != null) {
            var strHTML = "", strTemp = "";
            var bDisconnect = (this.SipCallInfo.length > 2);
            for (var i = 0; i < this.SipCallInfo.length; i++) {
                if (bDisconnect)
                    strTemp = stringFormatSip("<TR><td width='200px' height='20px'>呼叫方:{0}</td><td>{1}</td><td><label style='cursor: pointer;text-decoration:underline' >挂断</label></td></TR>",
                        this.SipCallInfo[i][0], this.SipCallInfo[i][1]);
                else
                    strTemp = stringFormatSip("<TR><td width='200px' height='20px'>呼叫方:{0}</td><td>{1}</td><td></td></TR>", this.SipCallInfo[i][0], this.SipCallInfo[i][1]);
                strHTML = strHTML + strTemp;
            }
            strHTML = "<tbody>" + strHTML + "</tbody>";
            oTableCallInfo.innerHTML = strHTML;
            console.info(strHTML);
        }
        this.SetCallSceneStatus(this.sipCallStatusDes);
    },

    SetSipRegisterStatus: function (status) {
        this.sipRegisterStatus = status;
        if (this.sipRegisterStatus == 1) {
            // this.SetBtnText("btnRegister", "注销");
            this.SetPhoneTitle("本机号码:" + this.sipConfig.dn);
            this.SetPhoneStatus("当前状态:注册成功");
        }
        else if (this.sipRegisterStatus == 0) {
            // this.SetBtnText("btnRegister", "注册");
            // this.SetPhoneTitle("网络电话");
            this.SetPhoneStatus("当前状态:注册失败");
        }
        else if (this.sipRegisterStatus == -1) {
            // this.SetBtnText("btnRegister", "注册");
            // this.SetPhoneTitle("网络电话");
            this.SetPhoneStatus("当前状态:注销成功");
        }
        this.UpdateUI();
    },
    SetSipCallStatus: function () {
        switch (this.SipCallInfo.ScenseID) {
            case SipCallSence.SIPCALL_IDLE: {
                // this.SetBtnText("btnDisconnect", "挂断");
                this.ClearCallStatus();
                if (this.realSipType == sipAdapterTypeJSip)
                    this.DisplayDiv("divCallDlg", 0);
                break;
            }
            case SipCallSence.SIPCALL_RING: {
                // this.SetBtnText("btnDisconnect", "拒接");
                break;
            }
            case SipCallSence.SIPCALL_ORIGATE: {
                // this.SetBtnText("btnDisconnect", "取消");
                break;
            }
            case SipCallSence.SIPCALL_CONNECTED: {
                // this.SetBtnText("btnDisconnect", "挂断");
                if (this.realSipType == sipAdapterTypeJSip) {
                    this.RefreshCallInfo();
                    this.DisplayDiv("divCallDlg", 1);
                }
                break;
            }
            default:
                return;
        }
        this.UpdateUI();
    },
    SetSipCallStatus: function (status, infos) {
        this.sipCallStatus = status;
        switch (this.sipCallStatus) {
            case SipCallSence.SIPCALL_IDLE: {
                // this.SetBtnText("btnDisconnect", "挂断");
                if (this.realSipType == sipAdapterTypeJSip)
                    this.DisplayDiv("divCallDlg", 0);
                break;
            }
            case SipCallSence.SIPCALL_RING: {
                // this.SetBtnText("btnDisconnect", "拒接");
                break;
            }
            case SipCallSence.SIPCALL_ORIGATE: {
               //  this.SetBtnText("btnDisconnect", "取消");
                break;
            }
            case SipCallSence.SIPCALL_CONNECTED: {
                // this.SetBtnText("btnDisconnect", "挂断");
                if (this.realSipType == sipAdapterTypeJSip) {
                    this.RefreshCallInfo();
                    this.DisplayDiv("divCallDlg", 1);
                }
                break;
            }
            default:
                return;
        }
        this.UpdateUI();
    },
    DisplayDiv: function (id, flag) {
        var oDiv = document.getElementById(id);
        if (oDiv == null)
            return;
        if (flag == 0)
            oDiv.style.display = "none";
        else
            oDiv.style.display = "";
    },
    InitUI: function () {
        this.Init();
        this.DisplayDiv("divSetting", this.setting);
        this.DisplayDiv("divlog", this.logShow);
        this.DisplayDiv("divCallDlg", 0);
        this.loadConfigFromDefault();
        this.UpdateUI();
    },

    saveConfigToDefault: function () {
        setCookie("ServerIP", this.sipConfig.serverIP, 365);
        setCookie("ServerPort", this.sipConfig.serverPort, 365);
        setCookie("DN", this.sipConfig.dn, 365);
        setCookie("PassWord", this.sipConfig.password, 365);
        setCookie("XPath", this.sipConfig.xPath, 365);
    },
    loadConfigFromDefault: function () {
        if (!IsCookiesUsed()) return;
        this.sipConfig.serverIP = this.getCookieStrValue("ServerIP", sipServer.value);
        this.sipConfig.serverPort = this.getCookieIntValue("ServerPort", string2Int(sipPort.value));
        this.sipConfig.dn = this.getCookieStrValue("DN", sipDn.value);
        this.sipConfig.password = this.getCookieStrValue("PassWord", sipPassword.value);
        this.sipConfig.xPath = this.getCookieStrValue("XPath", XPath.value);

        document.getElementById("sipServer").value = this.sipConfig.serverIP;
        document.getElementById("sipDn").value = this.sipConfig.dn;
        document.getElementById("sipPort").value = this.sipConfig.serverPort;
        document.getElementById("sipPassword").value = this.sipConfig.password;
        document.getElementById("XPath").value = this.sipConfig.xPath;
    },
    getCookieIntValue: function (strName, defaultValue) {
        var strValue = getCookie(strName);
        if (strValue == "")
            return defaultValue;
        return parseInt(strValue);
    },
    getCookieStrValue: function (strName, defaultValue) {
        var strValue = getCookie(strName);
        if (strValue == "")
            return defaultValue;
        return strValue;
    },

    funSetting: function (flag) {
        this.setting = flag;
        this.DisplayDiv('divSetting', this.setting);
    },
    funlog: function (flag) {
        this.logShow = flag;
        this.DisplayDiv('divlog', this.logShow);
    },
    SetVedioWindow: function () {
        if (application) {
            application.oJSipCtrl.SetAttribute("Vedio", this.vedio);
        }
    },
    funVedio: function (flag) {
        this.vedio = flag;
        if (application != null)
            application.oJSipCtrl.SetAttribute("Vedio", this.vedio);
    },
    funAudio: function (flag) {
        this.audio = flag;
        if (application != null)
            application.oJSipCtrl.SetAttribute("Audio", this.audio);
    },
    funAutoRegister: function (flag) {
        this.autoRegister = flag;
    },
    funDlg: function (skey) {
        var oDivInput = window.document.getElementById("divCallInput");
        if (skey == "Cancel") {
            oDivInput.style.display = "none";
        }

        if (skey == "SingleTransfter") {
            oDivInput.style.display = "block";
            this.SetBtnText("btnCall", "忙转");
        }
        //UpdateMedia
        if (skey == "UpdateMedia") {
            oDivInput.style.display = "block";
            this.SetBtnText("btnCall", "音视频切换");
        }
    },
    funDoRegister: function (funConnect,funDisConnect) {
        if (funConnect) {
            this.OnSipEventOnConnected=funConnect
        }
        if (funDisConnect) {
            this.OnSipEventOnDisconnected=funDisConnect
        }
        if (this.sipRegisterStatus == 1) {
            application.oJSipCtrl.UnInitial();
            this.DisplayStatus("正在注销...");
        }
        else {
            if (this.realSipType != -1) {
                applicationSipUnLoad();
                this.ReSetStatus();
            }
            GetMediaDevices(function (devices) {
                for (var i = 0; i !== devices.length; ++i) {
                    const deviceInfo = devices[i];
                    let option = {}
                    option.value = deviceInfo.deviceId;
                    option.text = deviceInfo.label
                    this.oCameraDevices.push(option);
                }

                applicationSipLoad("", sipCallBackEvent, 0);
            })
            this.DisplayStatus("正在初始化...");
        }
    },
    funDoSetting: function () {
        if (application == null) {
            return;
        }
        var serverIP = this.sipConfig.serverIP
        var dn = this.sipConfig.dn
        var port = this.sipConfig.serverPort
        var password = this.sipConfig.password
        var xPath = this.sipConfig.xPath
        let oConsoleType = 0
        let MediaType = 0//WEBRTC
        let oProtocolType = "wss"
        application.oJSipCtrl.SetAttribute("SipServerIP", serverIP);
        application.oJSipCtrl.SetAttribute("SipServerPort", parseInt(port));
        application.oJSipCtrl.SetAttribute("Dn", dn);
        application.oJSipCtrl.SetAttribute("Domain", serverIP);
        application.oJSipCtrl.SetAttribute("PassWord", password);
        application.oJSipCtrl.SetAttribute("XPath", xPath);
        application.oJSipCtrl.SetAttribute('SipProtocol', oProtocolType);
        application.DislayProtocol(oConsoleType);
        application.oJSipCtrl.SetAttribute('MediaType', MediaType);
        application.oJSipCtrl.SetAttribute("Vedio", this.vedio);
        application.oJSipCtrl.SetAttribute("Audio", this.audio);
        application.oJSipCtrl.SetAttribute('MediaType', MediaType);

        // this.SetVedioWindow();
        // this.saveConfigToDefault();
    },
    funDocall: function (sNum) {
        sNum = trimStr(sNum);
        if (sNum == "") {
            dsf.layer.toast("目标号码不能为空!");
            return;
        }
        var CallData = "AAAAA: BBBBB|||CCC: DDDD|||KKK: TTT";//多个参数
        CallData = "TestParam: BBBBB";//单个参数
        
        if (application.oJSipCtrl.DoCall(sNum, CallData) == 0)
            showLog("呼出成功\r\n");
        else
            showLog("呼出失败\r\n");
    },
    funDial: function (nkey) {
        if (this.sipCallStatus == SipCallSence.SIPCALL_CONNECTED) {
            if (application.oJSipCtrl.SendDTMF(nkey) == 0)
                showLog("SendDTMF成功\r\n");
            else
                showLog("SendDTMF失败\r\n");
        }
        else {
            var oNum = document.getElementById("destNum");
            if (nkey == 10) nkey = "*";
            if (nkey == 11) nkey = "0";
            if (nkey == 12) nkey = "#";
            oNum.value = oNum.value + nkey;
        }
    },
    funDisconnect: function () {
        if (application.oJSipCtrl.Disconnect() == 0)
            showLog("Disconnect成功\r\n");
        else
            showLog("Disconnect失败\r\n");
    },
    funPickUp: function () {
        if (application.oJSipCtrl.Pickup() == 0)
            showLog("Pickup\r\n");
        else
            showLog("Pickup失败\r\n");
    },
    funCall: function (sDestNum) {
        let sText = "咨询"
        sDestNum = trimStr(sDestNum);
        if (sDestNum == "") {
            alert("目标号码不能为空!");
            return;
        }

        if (sText == "咨询") {
            if (application.oJSipCtrl.Consult(sDestNum) == 0)
                showLog("Transfer\r\n");
            else
                showLog("Transfer失败\r\n");
        }
        else if (sText == "忙转") {
            if (application.oJSipCtrl.Transfer(sDestNum) == 0)
                showLog("Transfer\r\n");
            else
                showLog("Transfer失败\r\n");
        }
        else if (sText == "切换") {
            if (application.oJSipCtrl.Transfer(sDestNum) == 0)
                showLog("Transfer\r\n");
            else
                showLog("Transfer失败\r\n");
        }
        else if (sText == "音视频切换") {
            if (application.oJSipCtrl.UpdateMedia(sDestNum) == 0)
                showLog("UpdateMedia\r\n");
            else
                showLog("UpdateMedia失败\r\n");
        }
    },

    funMute: function () {
        this.mute = (this.mute) ? 0 : 1;
        if (application.oJSipCtrl.Mute(this.mute) == 0)
            showLog("Mute\r\n");
        else
            showLog("Mute失败\r\n");
    },
    funHold: function () {
        if (this.hold == 0) {
            if (application.oJSipCtrl.Hold() == 0)
                showLog("Hold\r\n");
            else
                showLog("Mute失败\r\n");
        }
        else {
            if (application.oJSipCtrl.RetriveHold() == 0)
                showLog("RetriveHold\r\n");
            else
                showLog("RetriveHold失败\r\n");
        }
        this.hold = (this.hold) ? 0 : 1;
    },
    funTransfer: function () {
        if (application.oJSipCtrl.Transfer("") == 0)
            showLog("Transfer\r\n");
        else
            showLog("Transfer失败\r\n");
    },
    funAlertnate: function () {
        if (application.oJSipCtrl.Alertnate("") == 0)
            showLog("Alertnate\r\n");
        else
            showLog("Alertnate失败\r\n");
    },
    funConference: function () {
        if (application.oJSipCtrl.Conference() == 0)
            showLog("Conference\r\n");
        else
            showLog("Conference失败\r\n");
    },
    emptyLog: function () {
        var oTextareaInfo = document.getElementById("TextareaInfo");
        if (oTextareaInfo != null)
            oTextareaInfo.value = "";
    },
}
export default G_oSipPhone
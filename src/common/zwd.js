function e(t, n) {
    "object" == typeof exports && "object" == typeof module ? module.exports = n() : "function" == typeof define && define.amd ? define([], n) : "object" == typeof exports ? exports.index = n() : t.index = n()
} (window, (function() {
    return function(e) {
        var t = {};
        function n(i) {
            if (t[i]) return t[i].exports;
            var o = t[i] = {
                i: i,
                l: !1,
                exports: {}
            };
            return e[i].call(o.exports, o, o.exports, n),
            o.l = !0,
            o.exports
        }
        return n.m = e,
        n.c = t,
        n.d = function(e, t, i) {
            n.o(e, t) || Object.defineProperty(e, t, {
                enumerable: !0,
                get: i
            })
        },
        n.r = function(e) {
            "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, {
                value: "Module"
            }),
            Object.defineProperty(e, "__esModule", {
                value: !0
            })
        },
        n.t = function(e, t) {
            if (1 & t && (e = n(e)), 8 & t) return e;
            if (4 & t && "object" == typeof e && e && e.__esModule) return e;
            var i = Object.create(null);
            if (n.r(i), Object.defineProperty(i, "default", {
                enumerable: !0,
                value: e
            }), 2 & t && "string" != typeof e) for (var o in e) n.d(i, o,
            function(t) {
                return e[t]
            }.bind(null, o));
            return i
        },
        n.n = function(e) {
            var t = e && e.__esModule ?
            function t() {
                return e.
            default
            }:
            function t() {
                return e
            };
            return n.d(t, "a", t),
            t
        },
        n.o = function(e, t) {
            return Object.prototype.hasOwnProperty.call(e, t)
        },
        n.p = "./dist/",
        n(n.s = 1)
    } ([function(e, t, n) {
        "use strict";
        function i(e) {
            return (i = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ?
            function e(t) {
                return typeof t
            }: function e(t) {
                return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol": typeof t
            })(e)
        }
        var o = this && this.__awaiter ||
        function(e, t, n, i) {
            function o(e) {
                return e instanceof n ? e: new n((function(t) {
                    t(e)
                }))
            }
            return new(n || (n = Promise))((function(n, r) {
                function u(e) {
                    try {
                        l(i.next(e))
                    } catch(e) {
                        r(e)
                    }
                }
                function a(e) {
                    try {
                        l(i.
                        throw (e))
                    } catch(e) {
                        r(e)
                    }
                }
                function l(e) {
                    e.done ? n(e.value) : o(e.value).then(u, a)
                }
                l((i = i.apply(e, t || [])).next())
            }))
        },
        r = this && this.__generator ||
        function(e, t) {
            var n = {
                label: 0,
                sent: function e() {
                    if (1 & r[0]) throw r[1];
                    return r[1]
                },
                trys: [],
                ops: []
            },
            i,
            o,
            r,
            u;
            return u = {
                next: a(0),
                throw: a(1),
                return: a(2)
            },
            "function" == typeof Symbol && (u[Symbol.iterator] = function() {
                return this
            }),
            u;
            function a(e) {
                return function(t) {
                    return l([e, t])
                }
            }
            function l(u) {
                if (i) throw new TypeError("Generator is already executing.");
                for (; n;) try {
                    if (i = 1, o && (r = 2 & u[0] ? o.
                    return: u[0] ? o.
                    throw || ((r = o.
                    return) && r.call(o), 0) : o.next) && !(r = r.call(o, u[1])).done) return r;
                    switch (o = 0, r && (u = [2 & u[0], r.value]), u[0]) {
                    case 0:
                    case 1:
                        r = u;
                        break;
                    case 4:
                        return n.label++,
                        {
                            value: u[1],
                            done: !1
                        };
                    case 5:
                        n.label++,
                        o = u[1],
                        u = [0];
                        continue;
                    case 7:
                        u = n.ops.pop(),
                        n.trys.pop();
                        continue;
                    default:
                        if (! (r = n.trys, (r = r.length > 0 && r[r.length - 1]) || 6 !== u[0] && 2 !== u[0])) {
                            n = 0;
                            continue
                        }
                        if (3 === u[0] && (!r || u[1] > r[0] && u[1] < r[3])) {
                            n.label = u[1];
                            break
                        }
                        if (6 === u[0] && n.label < r[1]) {
                            n.label = r[1],
                            r = u;
                            break
                        }
                        if (r && n.label < r[2]) {
                            n.label = r[2],
                            n.ops.push(u);
                            break
                        }
                        r[2] && n.ops.pop(),
                        n.trys.pop();
                        continue
                    }
                    u = t.call(e, n)
                } catch(e) {
                    u = [6, e],
                    o = 0
                } finally {
                    i = r = 0
                }
                if (5 & u[0]) throw u[1];
                return {
                    value: u[0] ? u[1] : void 0,
                    done: !0
                }
            }
        },
        u,
        a,
        l;
        Object.defineProperty(t, "__esModule", {
            value: !0
        }),
        t.CONTINUOUS_EVENT_LIST = t.BRIDGE_ERROR_CODE = void 0,
        function(e) {
            e.CANCEL = "-1",
            e.SUCCESS = "0",
            e.API_UNDEFINED = "1",
            e.INVALID_PARAMS = "2",
            e.UNKNOWN_ERROR = "3",
            e.UNAUTHORIZED_CALL = "4",
            e.WRONG_CORP_ID = "5",
            e.CREATE_CHAT_FAILED = "6",
            e.UNAUTHORIZED_API = "7",
            e.INVALID_CORP_ID = "8",
            e.SERVER_RESPONSE_ERROR = "9",
            e.WRONG_DEVICE_INFO = "10",
            e.UPLOAD_FAIL = "11",
            e.PROCESS_FAIL = "12",
            e.DUPLICATED_CALL = "13",
            e.TOO_LARGE_PIC = "14",
            e.REQUEST_REJECT_OR_INSECURE_REQUEST = "15",
            e.PC_NOT_ALLOWED_TO_OPEN_SIDE_PANE_OR_MODAL = "21",
            e.PC_CLOSE_SIDE_PANE_OR_MODAL = "22",
            e.UNAUTHORIZED_PARAMS = "23",
            e.GESTURE_PASSWORD_DOES_NOT_EXIST = "24",
            e.NETWORK_ERROR = "25"
        } (u = t.BRIDGE_ERROR_CODE || (t.BRIDGE_ERROR_CODE = {})),
        function(e) {
            e.MOBILE = "mobile",
            e.PC = "pc",
            e.MINI_APP = "mini",
            e.UNKNOWN = "unknown"
        } (a || (a = {})),
        function(e) {
            e.UPDATE_NETWORK_STATUS = "DINGGOV_ON_NETWORK_TYPE_CHANGED",
            e.UPDATE_LOCATION = "DINGGOV_GEO_LOCATION_UPDATE",
            e.UPDATE_TRACE = "DINGGOV_TRACE_UPDATE"
        } (l = t.CONTINUOUS_EVENT_LIST || (t.CONTINUOUS_EVENT_LIST = {}));
        var f = function() {
            function e() {
                this.readyFnStack = [],
                this.callbackStack = {},
                this.generalEventCallbackStack = {},
                this.apiList = {},
                this.continuousCallbackStack = {},
                this.isH5Mobile = null,
                this.appType = null,
                this.aliBridge = window && window.navigator && window.AlipayJSBridge,
                this.isReady = !1,
                this.init()
            }
            return e.prototype.init = function() {
                var e = this,
                t = this.getAppType();
                t === a.PC && window.dingtalk && window.dingtalk.event.register((function(t, n) {
                    var i = "" + n.msgId;
                    "openapi.event.emit" === t ? (console.log("dingtalk receive event:", n, "identifer is", i), e.callbackStack[i] && (e.callbackStack[i](n), delete e.callbackStack[i])) : "im.fileTask.addNewTask" === t || "im.fileTask.updateTask" === t ? e.continuousCallbackStack[n.msgId || n.taskId](t, n) : e.generalEventCallbackStack[t] && e.generalEventCallbackStack[t].forEach((function(t) {
                        t.call(e, n)
                    }))
                })),
                t === a.MOBILE ? window.AlipayJSBridge ? this.execReadyFn() : document.addEventListener("AlipayJSBridgeReady", (function() {
                    e.execReadyFn.call(e)
                }), !1) : setTimeout((function() {
                    e.execReadyFn()
                }))
            },
            e.prototype.execReadyFn = function() {
                this.isReady = !0;
                for (var e = this.readyFnStack.shift(); e;) e && e(this),
                e = this.readyFnStack.shift()
            },
            e.prototype.onReady = function(e) {
                this.isReady ? e && e(this) : this.readyFnStack.push(e)
            },
            e.prototype.setCurrentInvoker = function(e) {
                this.currentInvoker = e
            },
            e.prototype.getCurrentInvoker = function() {
                return this.currentInvoker
            },
            e.prototype.getBridge = function() {
                return this.aliBridge
            },
            e.prototype.getAppType = function() {
                return this.appType || (this.isMobile() ? this.appType = a.MOBILE: window && window.navigator && window.navigator.userAgent && window.navigator.userAgent.indexOf("dingtalk-win") >= 0 ? this.appType = a.PC: !window && my && my.call ? this.appType = a.MINI_APP: (console.warn("\u68c0\u6d4b\u5230\u9875\u9762\u5728\u975e\u653f\u52a1\u9489\u9489\u5ba2\u6237\u7aef\u4e2d\u6253\u5f00\uff0cJSAPI \u8c03\u7528\u53ef\u80fd\u4e0d\u4f1a\u751f\u6548\uff01"), this.appType = a.UNKNOWN)),
                this.appType
            },
            e.prototype.isMobile = function() {
                if (null !== this.isH5Mobile) return this.isH5Mobile;
                var e = window && window.navigator && window.navigator.userAgent || "";
                return e && e.indexOf("dingtalk-win") >= 0 ? (this.isH5Mobile = !1, !1) : !!(e && e.indexOf("mPaaSClient") >= 0) && (this.isH5Mobile = !0, !0)
            },
            e.prototype.registerEvent = function(e, t) {
                var n = this;
                if ("function" == typeof t) return this.getAppType() === a.PC ? (this.generalEventCallbackStack[e] || (this.generalEventCallbackStack[e] = []), this.generalEventCallbackStack[e].push(t),
                function() {
                    var i = n.generalEventCallbackStack[e].findIndex((function(e) {
                        return e === t
                    }));
                    n.generalEventCallbackStack[e].splice(i, 1)
                }) : this.getAppType() === a.MOBILE ? (document.addEventListener(e, t, !1),
                function() {
                    document.removeEventListener(e, t)
                }) : void 0;
                console.error("callback \u53c2\u6570\u5e94\u8be5\u4e3a\u51fd\u6570")
            },
            e.prototype.registerClientAPI = function(e, t) {
                this.apiList[e] = t
            },
            e.prototype.registerAPI = function(e, t) {
                var n = this.isMobile();
                if ("object" === i(t)) {
                    var o = t,
                    r = this.getAppType();
                    this.registerClientAPI(e, o[r])
                } else this.registerClientAPI(e, t)
            },
            e.prototype.invokeMiniApp = function(e, t) {
                return void 0 === t && (t = {}),
                o(this, void 0, Promise, (function() {
                    var n = this;
                    return r(this, (function(i) {
                        return [2, new Promise((function(i, o) {
                            var r = n.apiList[e];
                            if (!r) return console.warn("API: " + e + "\uff0c\u672a\u6ce8\u518c"),
                            o("API: " + e + "\uff0c\u672a\u6ce8\u518c");
                            "function" != typeof r ? my.call(e, t, (function(e) {
                                n.handleBridgeResponse(e, i, o)
                            })) : r.call(null, t, {
                                context: my,
                                resolve: i,
                                reject: o,
                                methodName: e
                            })
                        }))]
                    }))
                }))
            },
            e.prototype.invokeMobile = function(e, t) {
                return void 0 === t && (t = {}),
                o(this, void 0, Promise, (function() {
                    var n = this;
                    return r(this, (function(i) {
                        return [2, new Promise((function(i, o) {
                            var r = n.apiList[e];
                            if (!r) return console.warn("API: " + e + "\uff0c\u672a\u6ce8\u518c"),
                            o("API: " + e + "\uff0c\u672a\u6ce8\u518c");
                            "function" != typeof r ? AlipayJSBridge.call(e, t, (function(e) {
                                n.handleBridgeResponse(e, i, o)
                            })) : r.call(null, t, {
                                context: AlipayJSBridge,
                                resolve: i,
                                reject: o,
                                methodName: e
                            })
                        }))]
                    }))
                }))
            },
            e.prototype.findFitMsgId = function(e) {
                return this.callbackStack[e] ? this.findFitMsgId(e + 1) : e
            },
            e.prototype.invokePC = function(e, t, n) {
                return void 0 === t && (t = {}),
                void 0 === n && (n = {
                    msgId: 1
                }),
                o(this, void 0, Promise, (function() {
                    var i = this;
                    return r(this, (function(o) {
                        return [2, new Promise((function(o, r) {
                            try {
                                var u = i.findFitMsgId(Date.now()),
                                a = n.pcClientAPIName || e,
                                l = function e(t) {
                                    var n = t;
                                    return n.body ? o(n.body) : o(n)
                                };
                                if (n.msgId = u, !window.dingtalk) return Promise.reject(new Error("\u8bf7\u5728\u9489\u9489\u5bb9\u5668\u5185\u4f7f\u7528 JSAPI"));
                                i.apiList[e] ? i.apiList[e].call(null, t, n) : (console.info("invoke bridge api:", a, u, t), window.dingtalk.platform.invokeAPI(u, a, t)),
                                i.callbackStack["" + u] = l
                            } catch(e) {
                                r(e)
                            }
                        }))]
                    }))
                }))
            },
            e.prototype.handleBridgeResponse = function(e, t, n) {
                e && e.errorCode ? e.errorCode === u.SUCCESS ? t(e.result) : (console.warn("API \u8c03\u7528\u5931\u8d25", e), n(e)) : e && "false" === e.success ? n(e) : t(e)
            },
            e.prototype.invoke = function(e, t, n) {
                return void 0 === t && (t = {}),
                o(this, void 0, Promise, (function() {
                    var i;
                    return r(this, (function(o) {
                        return i = this.getAppType(),
                        this.isReady ? i === a.MOBILE ? [2, this.invokeMobile(e, t)] : i === a.PC ? [2, this.invokePC(e, t, n)] : i === a.MINI_APP ? [2, this.invokeMiniApp(e, t)] : [2, Promise.reject("\u9519\u8bef\uff1a\u672a\u5728\u9489\u9489\u8fd0\u884c\u73af\u5883\u4e0b\u8c03\u7528\u8be5 API\uff0c\u65e0\u6548\uff0c\u8bf7\u68c0\u67e5\u8fd0\u884c\u73af\u5883")] : [2, Promise.reject("\u9519\u8bef\uff1a\u8bf7\u5728 dd.ready() \u56de\u8c03\u4e2d\u4f7f\u7528 JSAPI\uff0c\u5f53\u524d\u8c03\u7528\u51fd\u6570\uff1a" + e)]
                    }))
                }))
            },
            e.prototype.existEventListener = function(e) {
                return !! this.continuousCallbackStack[e]
            },
            e.prototype.registerContinuesEvent = function(e, t) {
                this.continuousCallbackStack[e] = t
            },
            e.prototype.removeContinuesEvent = function(e) {
                this.existEventListener(e) && (this.continuousCallbackStack[e](), delete this.continuousCallbackStack[e])
            },
            e
        } ();
        t.
    default = new f
    },
    function(e, t, n) {
        e.exports = n(2)
    },
    function(e, t, n) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        }),
        n(0);
        var i = n(3),
        o = n(4),
        r = n(5),
        u = n(6),
        a = n(8),
        l = n(10),
        f = n(11),
        d = n(12),
        s = n(13),
        c = n(14),
        v = n(15),
        p = n(16),
        g = n(17),
        m = n(18),
        b = n(19),
        P = n(20),
        h = n(21),
        _ = n(22),
        y = n(23),
        k = n(24),
        I = n(25),
        A = n(26),
        O = n(27),
        w = n(28),
        S = n(29),
        M = n(30),
        C = n(31),
        E = n(32),
        j = n(33),
        T = n(34),
        R = n(35),
        x = n(36),
        D = n(37),
        N = n(38),
        L = n(39),
        B = n(40),
        U = n(41),
        F = n(42),
        W = n(43),
        G = n(45),
        V = n(46),
        z = n(47),
        H = n(49),
        J = n(51),
        K = n(52),
        q = n(53),
        Z = n(54),
        Q = n(55),
        X = n(56),
        Y = n(57),
        $ = n(58),
        ee = n(59),
        te = n(60),
        ne = n(61),
        ie = n(62),
        oe = n(63),
        re = n(64),
        ue = n(65),
        ae = n(66),
        le = n(67),
        fe = n(68),
        de = n(69),
        se = n(70),
        ce = n(71),
        ve = n(72),
        pe = n(73),
        ge = n(74),
        me = n(75),
        be = n(76),
        Pe = n(77),
        he = n(78),
        _e = n(79),
        ye = n(80),
        ke = n(81),
        Ie = n(82),
        Ae = n(83),
        Oe = n(84),
        we = n(88),
        Se = n(89),
        Me = n(90),
        Ce = n(91),
        Ee = n(92),
        je = n(93),
        Te = n(94),
        Re = n(95),
        xe = n(96),
        De = n(97),
        Ne = n(98),
        Le = n(99),
        Be = n(100),
        Ue = n(101),
        Fe = n(102),
        We = n(103),
        Ge = n(104),
        Ve = n(105),
        ze = n(106),
        He = n(107),
        Je = n(108),
        Ke = n(109),
        qe = n(110),
        Ze = n(111),
        Qe = n(112),
        Xe = n(113),
        Ye = n(114),
        $e = n(115),
        et = n(116),
        tt = {
            version: o.
        default,
            getAuthCode: l.
        default,
            getLoginUser: f.
        default,
            authConfig: d.
        default,
            callPhone: s.
        default,
            enableVpn: c.
        default,
            getGeolocation: v.
        default,
            rotateView: g.
        default,
            resetView: m.
        default,
            disableWebviewBounce: b.
        default,
            enableWebviewBounce: P.
        default,
            getNetworkType: h.
        default,
            disablePullToRefresh: _.
        default,
            enablePullToRefresh: y.
        default,
            stopPullToRefresh: k.
        default,
            locateOnMap: p.
        default,
            vibrate: I.
        default,
            unlockWithSecurityVerification: M.
        default,
            startListenNetworkStatus: C.
        default,
            stopListenNetworkStatus: E.
        default,
            scan: x.
        default,
            startTraceReport: j.
        default,
            stopTraceReport: T.
        default,
            getTraceStatus: R.
        default,
            getPhoneInfo: Se.
        default,
            getUUID: D.
        default,
            getWifiStatus: N.
        default,
            getHotspotInfo: L.
        default,
            openPage: K.
        default,
            closePage: q.
        default,
            openLink: Z.
        default,
            setNavLeftText: Q.
        default,
            setNavIcon: ee.
        default,
            setTitle: X.
        default,
            showHomeBottomTab: Y.
        default,
            goBack: $.
        default,
            dealWithBackAction: te.
        default,
            openBrowser: ne.
        default,
            openApp: ie.
        default,
            replacePage: oe.
        default,
            openSchemeUrl: re.
        default,
            setOptionMenu: ue.
        default,
            showOptionMenu: ae.
        default,
            showSocialShare: ge.
        default,
            hideOptionMenu: le.
        default,
            alert: fe.
        default,
            showDatePicker: de.
        default,
            showPlainInputUponKeyboard: ce.
        default,
            showTimePicker: se.
        default,
            showLoading: ve.
        default,
            hideLoading: pe.
        default,
            confirm: me.
        default,
            prompt: be.
        default,
            showActionSheet: Pe.
        default,
            toast: he.
        default,
            showSelect: _e.
        default,
            showModal: ke.
        default,
            showExtendModal: ye.
        default,
            openSlidePanel: Ie.
        default,
            copyToClipboard: Ae.
        default,
            takePhoto: Ee.
        default,
            shootVideo: je.
        default,
            isDownloadFileExist: Me.
        default,
            openDownloadFile: Ce.
        default,
            downloadFile: we.
        default,
            createDing: He.
        default,
            postDing: Je.
        default,
            getWaterMark: Oe.
        default,
            previewDoc: B.
        default,
            previewImage: U.
        default,
            uploadFileByType: F.
        default,
            uploadFile: W.
        default,
            previewFile: G.
        default,
            saveFile: V.
        default,
            chooseFile: z.
        default,
            chooseImage: H.
        default,
            showSignature: J.
        default,
            setStorageItem: Te.
        default,
            getStorageItem: Re.
        default,
            removeStorageItem: xe.
        default,
            chooseContact: De.
        default,
            chooseContactWithComplexPicker: Ne.
        default,
            chooseDepartments: Le.
        default,
            chooseMobileContacts: Be.
        default,
            openChat: Ue.
        default,
            pickChat: Fe.
        default,
            pickChatByCorpId: We.
        default,
            createChatGroup: Ge.
        default,
            createVideoMeeting: Ve.
        default,
            shareToMessage: ze.
        default,
            downloadAudio: Ke.
        default,
            playAudio: Qe.
        default,
            stopRecordAudio: et.
        default,
            resumeAudio: Xe.
        default,
            onRecordAudioEnd: qe.
        default,
            stopAudio: $e.
        default,
            startRecordAudio: Ye.
        default,
            pauseAudio: Ze.
        default,
            searchOnMap: A.
        default,
            showOnMap: O.
        default,
            startGeolocation: w.
        default,
            stopGeolocation: S.
        default,
            ready: i.
        default,
            on: r.
        default,
            startRequest: a.
        default,
            getConfig: u.
        default
        };
        try {
            Object.defineProperty(window, "dd", {
                value: tt
            }),
            Object.defineProperty(window, "gdt", {
                value: tt
            })
        } catch(e) {
            console.warn(e)
        }
        t.
    default = tt
    },
    function(e, t, n) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var i = n(0);
        function o(e) {
            "function" == typeof e ? i.
        default.onReady(e):
            console.error("dd.ready's param must be function! ")
        }
        t.
    default = o
    },
    function(e, t, n) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var i = n(0);
        function o() {
            return i.
        default.invoke("version")
        }
        i.
    default.registerAPI("version", {
            mini: !0,
            mobile: !0
        }),
        t.
    default = o
    },
    function(e, t, n) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var i = n(0);
        function o(e, t) {
            return i.
        default.registerEvent(e, t)
        }
        t.
    default = o
    },
    function(e, t, n) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var i = n(7);
        t.
    default = i.
    default
    },
    function(e, t, n) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var i = n(0);
        function o() {
            return i.
        default.invoke("getConfig", {})
        }
        i.
    default.registerAPI("getConfig", {
            mobile: !0,
            pc: function e(t, n) {
                window.dingtalk.platform.invokeAPI(n.msgId, "getConfig", t)
            }
        }),
        t.
    default = o
    },
    function(e, t, n) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var i = n(9);
        t.
    default = i.
    default
    },
    function(e, t, n) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var i = n(0);
        function o(e) {
            return i.
        default.invoke("startRequest", e)
        }
        i.
    default.registerAPI("startRequest", {
            mini: !0,
            mobile: !0,
            pc: function e(t, n) {
                window.dingtalk.platform.invokeAPI(n.msgId, "zdnet.startRequest", t)
            }
        }),
        t.
    default = o
    },
    function(e, t, n) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var i = n(0);
        function o(e) {
            return i.
        default.invoke("getAuthCode", e)
        }
        i.
    default.registerAPI("getAuthCode", {
            pc: function e(t, n) {
                window.dingtalk.platform.invokeAPI(n.msgId, "runtime.permission.requestAuthCode", t)
            },
            mobile: !0,
            mini: !0
        }),
        t.
    default = o
    },
    function(e, t, n) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var i = n(0);
        function o() {
            return i.
        default.invoke("getLoginUser")
        }
        i.
    default.registerAPI("getLoginUser", {
            mobile: !0,
            mini: !0
        }),
        t.
    default = o
    },
    function(e, t, n) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var i = n(0);
        function o(e) {
            return i.
        default.invoke("authConfig", e)
        }
        i.
    default.registerAPI("authConfig", {
            mini: !0,
            mobile: !0
        }),
        t.
    default = o
    },
    function(e, t, n) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var i = n(0);
        function o(e) {
            return i.
        default.invoke("callPhone", e)
        }
        i.
    default.registerAPI("callPhone", {
            mini: !0,
            mobile: !0
        }),
        t.
    default = o
    },
    function(e, t, n) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var i = n(0);
        function o() {
            return i.
        default.invoke("enableVpn")
        }
        i.
    default.registerAPI("enableVpn", {
            mini: !0,
            mobile: !0
        }),
        t.
    default = o
    },
    function(e, t, n) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var i = n(0);
        function o(e) {
            return i.
        default.invoke("getGeolocation", e)
        }
        i.
    default.registerAPI("getGeolocation", {
            mini: !0,
            mobile: !0
        }),
        t.
    default = o
    },
    function(e, t, n) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var i = n(0);
        function o(e) {
            return i.
        default.invoke("locateOnMap", e)
        }
        i.
    default.registerAPI("locateOnMap", {
            mobile: !0
        }),
        t.
    default = o
    },
    function(e, t, n) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var i = n(0);
        function o(e) {
            return i.
        default.invoke("rotateView", e)
        }
        i.
    default.registerAPI("rotateView", {
            mini: !0,
            mobile: !0
        }),
        t.
    default = o
    },
    function(e, t, n) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var i = n(0);
        function o() {
            return i.
        default.invoke("resetView")
        }
        i.
    default.registerAPI("resetView", {
            mini: !0,
            mobile: !0
        }),
        t.
    default = o
    },
    function(e, t, n) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var i = n(0);
        function o() {
            return i.
        default.invoke("disableWebviewBounce")
        }
        i.
    default.registerAPI("disableWebviewBounce", {
            mobile: function e(t, n) {
                var i = n.resolve,
                o = n.context;
                o && o.call("bounce", {
                    enable: !1
                },
                (function(e) {
                    i(e)
                }))
            }
        }),
        t.
    default = o
    },
    function(e, t, n) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var i = n(0);
        function o() {
            return i.
        default.invoke("enableWebviewBounce")
        }
        i.
    default.registerAPI("enableWebviewBounce", {
            mobile: function e(t, n) {
                var i = n.resolve,
                o = n.context;
                o && o.call("bounce", {
                    enable: !0
                },
                (function(e) {
                    i(e)
                }))
            }
        }),
        t.
    default = o
    },
    function(e, t, n) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var i = n(0);
        function o() {
            return i.
        default.invoke("getNetworkType")
        }
        i.
    default.registerAPI("getNetworkType", {
            mobile: !0,
            mini: !0
        }),
        t.
    default = o
    },
    function(e, t, n) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var i = n(0);
        function o() {
            return i.
        default.invoke("disablePullToRefresh")
        }
        i.
    default.registerAPI("disablePullToRefresh", {
            mobile: function e(t, n) {
                var i = n.resolve,
                o = n.context;
                o && o.call("pullRefresh", {
                    pullRefresh: !1
                },
                (function() {
                    i()
                }))
            }
        }),
        t.
    default = o
    },
    function(e, t, n) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var i = n(0);
        function o() {
            return i.
        default.invoke("enablePullToRefresh")
        }
        i.
    default.registerAPI("enablePullToRefresh", {
            mobile: function e(t, n) {
                var i = n.resolve,
                o = n.context;
                o && o.call("pullRefresh", {
                    pullRefresh: !0
                },
                (function() {
                    i()
                }))
            }
        }),
        t.
    default = o
    },
    function(e, t, n) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var i = n(0);
        function o() {
            return i.
        default.invoke("stopPullToRefresh")
        }
        i.
    default.registerAPI("stopPullToRefresh", {
            mobile: function e(t, n) {
                var i = n.resolve,
                o = n.context;
                o && o.call("restorePullToRefresh", t, (function() {
                    i()
                }))
            }
        }),
        t.
    default = o
    },
    function(e, t, n) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var i = n(0);
        function o(e) {
            return i.
        default.invoke("vibrate", e)
        }
        i.
    default.registerAPI("vibrate", {
            mini: !0,
            mobile: !0
        }),
        t.
    default = o
    },
    function(e, t, n) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var i = n(0);
        function o(e) {
            return i.
        default.invoke("searchOnMap", e)
        }
        i.
    default.registerAPI("searchOnMap", {
            mini: !0,
            mobile: !0
        }),
        t.
    default = o
    },
    function(e, t, n) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var i = n(0);
        function o(e) {
            return i.
        default.invoke("showOnMap", e)
        }
        i.
    default.registerAPI("showOnMap", {
            mini: !0,
            mobile: !0
        }),
        t.
    default = o
    },
    function(e, t, n) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var i = n(0);
        function o(e, t) {
            var n = t.resolve,
            o = t.reject,
            r = t.context,
            u = i.
        default.registerEvent(i.CONTINUOUS_EVENT_LIST.UPDATE_LOCATION, (function(t) {
                var n = t.data;
                n.errorCode !== i.BRIDGE_ERROR_CODE.SUCCESS ? e.onFail && e.onFail(n) : e.onSuccess && e.onSuccess(n.result)
            }));
            r && r.call("startGeolocation", e, (function(t) {
                i.
            default.registerContinuesEvent(e.sceneId, u),
                i.
            default.handleBridgeResponse(t, n, o)
            }))
        }
        function r(e) {
            return i.
        default.invoke("startGeolocation", e)
        }
        i.
    default.registerAPI("startGeolocation", {
            mobile: o
        }),
        t.
    default = r
    },
    function(e, t, n) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var i = n(0);
        function o(e, t) {
            var n = t.resolve,
            o = t.reject,
            r = t.context;
            r && r.call("stopGeolocation", e, (function(t) {
                i.
            default.removeContinuesEvent(e.sceneId),
                i.
            default.handleBridgeResponse(t, n, o)
            }))
        }
        function r(e) {
            return i.
        default.invoke("stopGeolocation", e)
        }
        i.
    default.registerAPI("stopGeolocation", {
            mobile: o
        }),
        t.
    default = r
    },
    function(e, t, n) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var i = n(0);
        function o() {
            return i.
        default.invoke("unlockWithSecurityVerification")
        }
        i.
    default.registerAPI("unlockWithSecurityVerification", {
            mini: !0,
            mobile: !0
        }),
        t.
    default = o
    },
    function(e, t, n) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var i = n(0);
        function o(e, t) {
            var n = t.resolve,
            o = t.reject,
            r = t.context,
            u = i.
        default.registerEvent(i.CONTINUOUS_EVENT_LIST.UPDATE_NETWORK_STATUS, (function(t) {
                var n = t.data;
                n.errorCode !== i.BRIDGE_ERROR_CODE.SUCCESS ? e.onFail && e.onFail(n) : e.onSuccess && e.onSuccess(n.result)
            }));
            r && r.call("startListenNetworkStatus", e, (function(e) {
                i.
            default.registerContinuesEvent(e.result.requestId, u),
                i.
            default.handleBridgeResponse(e, n, o)
            }))
        }
        function r(e) {
            return i.
        default.invoke("startListenNetworkStatus", e)
        }
        i.
    default.registerAPI("startListenNetworkStatus", {
            mobile: o,
            mini: o
        }),
        t.
    default = r
    },
    function(e, t, n) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var i = n(0);
        function o(e, t) {
            var n = t.resolve,
            o = t.reject,
            r = t.context;
            r && r.call("stopListenNetworkStatus", e, (function(t) {
                i.
            default.removeContinuesEvent(e.requestId),
                i.
            default.handleBridgeResponse(t, n, o)
            }))
        }
        function r(e) {
            return i.
        default.invoke("stopListenNetworkStatus", e)
        }
        i.
    default.registerAPI("stopListenNetworkStatus", {
            mini: o,
            mobile: o
        }),
        t.
    default = r
    },
    function(e, t, n) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var i = n(0);
        function o(e, t) {
            var n = t.resolve,
            o = t.reject,
            r = t.context,
            u = i.
        default.registerEvent(i.CONTINUOUS_EVENT_LIST.UPDATE_TRACE, (function(t) {
                var n = t.data;
                n.errorCode !== i.BRIDGE_ERROR_CODE.SUCCESS ? e.onFail && e.onFail(n) : e.onSuccess && e.onSuccess(n.result)
            }));
            r && r.call("startTraceReport", e, (function(t) {
                i.
            default.registerContinuesEvent(e.traceId, u),
                i.
            default.handleBridgeResponse(t, n, o)
            }))
        }
        function r(e) {
            return i.
        default.invoke("startTraceReport", e)
        }
        i.
    default.registerAPI("startTraceReport", {
            mobile: o
        }),
        t.
    default = r
    },
    function(e, t, n) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var i = n(0);
        function o(e, t) {
            var n = t.resolve,
            o = t.reject,
            r = t.context;
            r && r.call("stopTraceReport", e, (function(t) {
                i.
            default.removeContinuesEvent(e.traceId),
                i.
            default.handleBridgeResponse(t, n, o)
            }))
        }
        function r(e) {
            return i.
        default.invoke("stopTraceReport", e)
        }
        i.
    default.registerAPI("stopTraceReport", {
            mobile: o
        }),
        t.
    default = r
    },
    function(e, t, n) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var i = n(0);
        function o(e) {
            return i.
        default.invoke("getTraceStatus", e)
        }
        i.
    default.registerAPI("getTraceStatus", {
            mobile: !0
        }),
        t.
    default = o
    },
    function(e, t, n) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var i = n(0);
        function o(e) {
            return i.
        default.invoke("scan", e)
        }
        i.
    default.registerAPI("scan", {
            mini: !0,
            mobile: !0
        }),
        t.
    default = o
    },
    function(e, t, n) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var i = n(0);
        function o() {
            return i.
        default.invoke("getUUID")
        }
        i.
    default.registerAPI("getUUID", {
            mobile: !0,
            mini: !0
        }),
        t.
    default = o
    },
    function(e, t, n) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var i = n(0);
        function o() {
            return i.
        default.invoke("getWifiStatus")
        }
        i.
    default.registerAPI("getWifiStatus", {
            mobile: !0,
            mini: !0
        }),
        t.
    default = o
    },
    function(e, t, n) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var i = n(0);
        function o() {
            return i.
        default.invoke("getHotspotInfo")
        }
        i.
    default.registerAPI("getHotspotInfo", {
            mobile: !0,
            mini: !0
        }),
        t.
    default = o
    },
    function(e, t, n) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var i = n(0);
        function o(e) {
            return i.
        default.invoke("previewDoc", e)
        }
        i.
    default.registerAPI("previewDoc", {
            mini: !0,
            mobile: !0
        }),
        t.
    default = o
    },
    function(e, t, n) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var i = n(0);
        function o(e) {
            return i.
        default.invoke("previewImage", e)
        }
        i.
    default.registerAPI("previewImage", {
            mini: !0,
            mobile: !0,
            pc: function e(t, n) {
                window.dingtalk.platform.invokeAPI(n.msgId, "biz.util.previewImage", t)
            }
        }),
        t.
    default = o
    },
    function(e, t, n) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var i = n(0);
        function o(e) {
            return i.
        default.invoke("uploadFileByType", e)
        }
        i.
    default.registerAPI("uploadFileByType", {
            mini: !0,
            mobile: !0
        }),
        t.
    default = o
    },
    function(e, t, n) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var i = n(44);
        t.
    default = i.
    default
    },
    function(e, t, n) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var i = n(0);
        function o(e) {
            return i.
        default.invoke("dgUploadFile", e)
        }
        i.
    default.registerAPI("dgUploadFile", {
            mini: !0,
            mobile: !0,
            pc: function e(t, n) {
                window.dingtalk.platform.invokeAPI(n.msgId, "biz.util.dgUploadFile", t)
            }
        }),
        t.
    default = o
    },
    function(e, t, n) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var i = n(0);
        function o(e) {
            return i.
        default.invoke("previewFile", e)
        }
        i.
    default.registerAPI("previewFile", {
            mini: !0,
            mobile: !0
        }),
        t.
    default = o
    },
    function(e, t, n) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var i = n(0);
        function o(e) {
            return i.
        default.invoke("saveFile", e)
        }
        i.
    default.registerAPI("saveFile", {
            mini: !0,
            mobile: !0
        }),
        t.
    default = o
    },
    function(e, t, n) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var i = n(48);
        t.
    default = i.
    default
    },
    function(e, t, n) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var i = n(0);
        function o(e) {
            return i.
        default.invoke("chooseFile", e)
        }
        i.
    default.registerAPI("chooseFile", {
            mini: !0,
            mobile: !0,
            pc: function e(t, n) {
                window.dingtalk.platform.invokeAPI(n.msgId, "biz.util.chooseFile", t)
            }
        }),
        t.
    default = o
    },
    function(e, t, n) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var i = n(50);
        t.
    default = i.
    default
    },
    function(e, t, n) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var i = n(0),
        o;
        function r(e) {
            return i.
        default.invoke("dgChooseImage", e)
        } !
        function(e) {
            e[e.image = 0] = "image",
            e[e.video = 1] = "video"
        } (o || (o = {})),
        i.
    default.registerAPI("dgChooseImage", {
            mini: !0,
            mobile: !0,
            pc: function e(t, n) {
                window.dingtalk.platform.invokeAPI(n.msgId, "biz.util.dgChooseImage", t)
            }
        }),
        t.
    default = r
    },
    function(e, t, n) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var i = n(0);
        function o(e) {
            return i.
        default.invoke("showSignature", e)
        }
        i.
    default.registerAPI("showSignature", {
            mobile: !0
        }),
        t.
    default = o
    },
    function(e, t, n) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var i = n(0),
        o;
        function r(e) {
            return i.
        default.invoke("openPage", e)
        } !
        function(e) {
            e.PROFILE = "profile",
            e.CHAT = "chat",
            e.SETTING = "setting",
            e.ABOUT = "about",
            e.CONTACT_ADD = "contactAdd",
            e.FRIEND_ADD = "friendAdd"
        } (o || (o = {})),
        i.
    default.registerAPI("openPage", {
            mini: !0,
            mobile: !0
        }),
        t.
    default = r
    },
    function(e, t, n) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var i = n(0);
        function o(e, t) {
            var n = t.resolve,
            o = t.reject,
            r = t.context;
            r && r.call("popWindow", e, (function(e) {
                i.
            default.handleBridgeResponse(e, n, o)
            }))
        }
        function r(e) {
            return i.
        default.invoke("closePage", e)
        }
        i.
    default.registerAPI("closePage", {
            mini: o,
            mobile: o,
            pc: function e(t, n) {
                window.dingtalk.platform.invokeAPI(n.msgId, "biz.navigation.quit", t)
            }
        }),
        t.
    default = r
    },
    function(e, t, n) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var i = n(0);
        function o(e, t) {
            var n = t.resolve,
            o = t.reject,
            r = t.context;
            r && r.call("pushWindow", e, (function(e) {
                i.
            default.handleBridgeResponse(e, n, o)
            }))
        }
        function r(e) {
            return i.
        default.invoke("openLink", e)
        }
        i.
    default.registerAPI("openLink", {
            mini: o,
            mobile: o,
            pc: function e(t, n) {
                window.dingtalk.platform.invokeAPI(n.msgId, "biz.util.openLink", t)
            }
        }),
        t.
    default = r
    },
    function(e, t, n) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var i = n(0);
        function o(e) {
            return i.
        default.invoke("setNavLeftText", e)
        }
        i.
    default.registerAPI("setNavLeftText", {
            mini: !0,
            mobile: !0,
            pc: function e(t, n) {
                window.dingtalk.platform.invokeAPI(n.msgId, "biz.navigation.setLeft", t)
            }
        }),
        t.
    default = o
    },
    function(e, t, n) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var i = n(0);
        function o(e) {
            return i.
        default.invoke("setTitle", e)
        }
        i.
    default.registerAPI("setTitle", {
            mini: !0,
            mobile: !0,
            pc: function e(t, n) {
                window.dingtalk.platform.invokeAPI(n.msgId, "biz.navigation.setTitle", t)
            }
        }),
        t.
    default = o
    },
    function(e, t, n) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var i = n(0);
        function o(e) {
            return i.
        default.invoke("showHomeBottomTab", e)
        }
        i.
    default.registerAPI("showHomeBottomTab", {
            mobile: !0
        }),
        t.
    default = o
    },
    function(e, t, n) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var i = n(0);
        function o() {
            return i.
        default.invoke("h5PageBack")
        }
        i.
    default.registerAPI("h5PageBack", {
            mobile: !0
        }),
        t.
    default = o
    },
    function(e, t, n) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var i = n(0);
        function o(e) {
            return i.
        default.invoke("setNavIcon", e)
        }
        i.
    default.registerAPI("setNavIcon", {
            mobile: !0
        }),
        t.
    default = o
    },
    function(e, t, n) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var i = n(0);
        function o(e) {
            return i.
        default.invoke("dealWithBackAction", e)
        }
        i.
    default.registerAPI("dealWithBackAction", {
            mobile: !0
        }),
        t.
    default = o
    },
    function(e, t, n) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var i = n(0);
        function o(e) {
            return i.
        default.invoke("openBrowser", e)
        }
        i.
    default.registerAPI("openBrowser", {
            mini: !0,
            mobile: !0
        }),
        t.
    default = o
    },
    function(e, t, n) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var i = n(0);
        function o(e) {
            return i.
        default.invoke("openApp", e)
        }
        i.
    default.registerAPI("openApp", {
            mini: !0,
            mobile: !0
        }),
        t.
    default = o
    },
    function(e, t, n) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var i = n(0);
        function o(e) {
            return i.
        default.invoke("replacePage", e)
        }
        i.
    default.registerAPI("replacePage", {
            mini: !0,
            mobile: !0
        }),
        t.
    default = o
    },
    function(e, t, n) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var i = n(0);
        function o(e) {
            return i.
        default.invoke("dgOpenApp", e)
        }
        i.
    default.registerAPI("dgOpenApp", {
            mobile: !0,
            mini: !0
        }),
        t.
    default = o
    },
    function(e, t, n) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var i = n(0);
        function o(e) {
            return i.
        default.invoke("setOptionMenu", e)
        }
        i.
    default.registerAPI("setOptionMenu", {
            mobile: !0
        }),
        t.
    default = o
    },
    function(e, t, n) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var i = n(0);
        function o() {
            return i.
        default.invoke("showOptionMenu")
        }
        i.
    default.registerAPI("showOptionMenu", {
            mobile: !0
        }),
        t.
    default = o
    },
    function(e, t, n) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var i = n(0);
        function o() {
            return i.
        default.invoke("hideOptionMenu")
        }
        i.
    default.registerAPI("hideOptionMenu", {
            mobile: !0
        }),
        t.
    default = o
    },
    function(e, t, n) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var i = n(0);
        function o(e) {
            return i.
        default.invoke("alert", e)
        }
        i.
    default.registerAPI("alert", {
            mini: !0,
            mobile: !0
        }),
        t.
    default = o
    },
    function(e, t, n) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var i = n(0);
        function o(e) {
            return i.
        default.invoke("showDatePicker", e)
        }
        i.
    default.registerAPI("showDatePicker", {
            mobile: !0,
            mini: !0
        }),
        t.
    default = o
    },
    function(e, t, n) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var i = n(0);
        function o(e) {
            return i.
        default.invoke("showTimePicker", e)
        }
        i.
    default.registerAPI("showTimePicker", {
            mobile: !0,
            mini: !0
        }),
        t.
    default = o
    },
    function(e, t, n) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var i = n(0);
        function o(e) {
            return i.
        default.invoke("showPlainInputUponKeyboard", e)
        }
        i.
    default.registerAPI("showPlainInputUponKeyboard", {
            mobile: !0,
            mini: !0
        }),
        t.
    default = o
    },
    function(e, t, n) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var i = n(0);
        function o(e) {
            return i.
        default.invoke("showLoading", e)
        }
        i.
    default.registerAPI("showLoading", {
            mini: !0,
            mobile: !0
        }),
        t.
    default = o
    },
    function(e, t, n) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var i = n(0);
        function o(e) {
            return i.
        default.invoke("hideLoading", e)
        }
        i.
    default.registerAPI("hideLoading", {
            mini: !0,
            mobile: !0
        }),
        t.
    default = o
    },
    function(e, t, n) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var i = n(0);
        function o(e) {
            return i.
        default.invoke("showSocialShare", e)
        }
        i.
    default.registerAPI("showSocialShare", {
            mini: !0,
            mobile: !0
        }),
        t.
    default = o
    },
    function(e, t, n) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var i = n(0);
        function o(e) {
            return i.
        default.invoke("confirm", e)
        }
        i.
    default.registerAPI("confirm", {
            mini: function e(t, n) {
                var o = n.resolve,
                r = n.reject,
                u = n.context,
                a = {
                    content: t.message,
                    title: t.title,
                    confirmButtonText: t.buttonLabels[0],
                    cancelButtonText: t.buttonLabels[1]
                };
                u && u.call("confirm", a, (function(e) {
                    var t = {
                        errorCode: i.BRIDGE_ERROR_CODE.SUCCESS,
                        result: {
                            buttonIndex: e.confirm ? 0 : 1
                        }
                    };
                    i.
                default.handleBridgeResponse(t, o, r)
                }))
            },
            mobile: function e(t, n) {
                var o = n.resolve,
                r = n.reject,
                u = n.context,
                a = {
                    message: t.message,
                    title: t.title,
                    okButton: t.buttonLabels[0],
                    cancelButton: t.buttonLabels[1]
                };
                u && u.call("confirm", a, (function(e) {
                    var t = {
                        errorCode: i.BRIDGE_ERROR_CODE.SUCCESS,
                        result: {
                            buttonIndex: e.ok ? 0 : 1
                        }
                    };
                    i.
                default.handleBridgeResponse(t, o, r)
                }))
            },
            pc: function e(t, n) {
                window.dingtalk.platform.invokeAPI(n.msgId, "device.notification.confirm", t)
            }
        }),
        t.
    default = o
    },
    function(e, t, n) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var i = n(0);
        function o(e, t) {
            var n = t.resolve,
            o = t.reject,
            r = t.context,
            u = {
                message: e.message,
                title: e.title,
                okButton: e.buttonLabels[0],
                cancelButton: e.buttonLabels[1]
            };
            r && r.call("prompt", u, (function(e) {
                var t = {
                    errorCode: i.BRIDGE_ERROR_CODE.SUCCESS,
                    result: {
                        buttonIndex: e.ok ? 0 : 1,
                        value: e.inputValue
                    }
                };
                i.
            default.handleBridgeResponse(t, n, o)
            }))
        }
        function r(e) {
            return i.
        default.invoke("prompt", e)
        }
        i.
    default.registerAPI("prompt", {
            mini: o,
            mobile: o,
            pc: function e(t, n) {
                window.dingtalk.platform.invokeAPI(n.msgId, "device.notification.prompt", t)
            }
        }),
        t.
    default = r
    },
    function(e, t, n) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var i = n(0);
        function o(e) {
            return i.
        default.invoke("showActionSheet", e)
        }
        i.
    default.registerAPI("showActionSheet", {
            mini: !0,
            mobile: !0,
            pc: function e(t, n) {
                window.dingtalk.platform.invokeAPI(n.msgId, "device.notification.actionSheet", t)
            }
        }),
        t.
    default = o
    },
    function(e, t, n) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var i = n(0);
        function o(e, t) {
            var n = t.resolve,
            o = t.reject,
            r = t.context,
            u = {
                type: "error" === e.icon ? "fail": "success" === e.icon ? "success": "none",
                content: e.text,
                duration: 1e3 * e.duration
            };
            r && r.call("toast", u, (function() {
                i.
            default.handleBridgeResponse({
                    errorCode:
                    i.BRIDGE_ERROR_CODE.SUCCESS,
                    result: {}
                },
                n, o)
            }))
        }
        function r(e) {
            return i.
        default.invoke("toast", e)
        }
        i.
    default.registerAPI("toast", {
            mini: o,
            mobile: o,
            pc: function e(t, n) {
                var i = t.icon,
                o = t.text,
                r = t.duration,
                u = t.delay;
                window.dingtalk.platform.invokeAPI(n.msgId, "device.notification.toast", {
                    type: i,
                    text: o,
                    duration: r,
                    delay: u
                })
            }
        }),
        t.
    default = r
    },
    function(e, t, n) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var i = n(0);
        function o(e) {
            return i.
        default.invoke("showSelect", e)
        }
        i.
    default.registerAPI("showSelect", {
            mini: !0,
            mobile: !0
        }),
        t.
    default = o
    },
    function(e, t, n) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var i = n(0);
        function o(e) {
            return i.
        default.invoke("showExtendModal", e)
        }
        i.
    default.registerAPI("showExtendModal", {
            mini: !0,
            mobile: !0
        }),
        t.
    default = o
    },
    function(e, t, n) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var i = n(0);
        function o(e) {
            return i.
        default.invoke("showModal", e)
        }
        i.
    default.registerAPI("showModal", {
            mini: !0,
            mobile: !0,
            pc: function e(t, n) {
                window.dingtalk.platform.invokeAPI(n.msgId, "biz.util.openModal", t)
            }
        }),
        t.
    default = o
    },
    function(e, t, n) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var i = n(0);
        function o(e) {
            return i.
        default.invoke("openSlidePanel", e)
        }
        i.
    default.registerAPI("openSlidePanel", {
            pc: function e(t, n) {
                window.dingtalk.platform.invokeAPI(n.msgId, "biz.util.openSlidePanel", t)
            }
        }),
        t.
    default = o
    },
    function(e, t, n) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var i = n(0);
        function o(e) {
            return i.
        default.invoke("copyToClipboard", e)
        }
        i.
    default.registerAPI("copyToClipboard", {
            mini: !0,
            mobile: !0
        }),
        t.
    default = o
    },
    function(e, t, n) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var i = n(85);
        t.
    default = i.
    default
    },
    function(e, t, n) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var i = n(86),
        o = n(87);
        function r(e, t) {
            return void 0 === e && (e = ""),
            new Promise((function(n, r) {
                i.
            default({
                    pageInfo:
                    e
                }).then((function(e) {
                    try {
                        var i = o.generateWatermark(e, t);
                        n(i)
                    } catch(e) {
                        r(e)
                    }
                }))
            }))
        }
        t.
    default = r
    },
    function(e, t, n) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var i = n(0),
        o,
        r,
        u;
        function a(e) {
            return i.
        default.invoke("getWaterMarkConfig", e)
        } !
        function(e) {
            e.off = "0",
            e.on = "1"
        } (o || (o = {})),
        function(e) {
            e[e.off = 0] = "off",
            e[e.on = 1] = "on"
        } (r || (r = {})),
        function(e) {
            e[e.name = 1] = "name",
            e[e.id = 2] = "id",
            e[e.custom = 3] = "custom"
        } (u || (u = {})),
        i.
    default.registerAPI("getWaterMarkConfig", {
            pc: function e(t, n) {
                window.dingtalk.platform.invokeAPI(n.msgId, "getWaterMarkConfig", t)
            },
            mini: !0,
            mobile: !0
        }),
        t.
    default = a
    },
    function(e, t, n) {
        "use strict";
        function i(e, t) {
            var n = Object.keys(e);
            if (Object.getOwnPropertySymbols) {
                var i = Object.getOwnPropertySymbols(e);
                t && (i = i.filter((function(t) {
                    return Object.getOwnPropertyDescriptor(e, t).enumerable
                }))),
                n.push.apply(n, i)
            }
            return n
        }
        function o(e) {
            for (var t = 1; t < arguments.length; t++) {
                var n = null != arguments[t] ? arguments[t] : {};
                t % 2 ? i(Object(n), !0).forEach((function(t) {
                    r(e, t, n[t])
                })) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : i(Object(n)).forEach((function(t) {
                    Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t))
                }))
            }
            return e
        }
        function r(e, t, n) {
            return t in e ? Object.defineProperty(e, t, {
                value: n,
                enumerable: !0,
                configurable: !0,
                writable: !0
            }) : e[t] = n,
            e
        }
        function u(e, t) {
            if (! (e instanceof t)) throw new TypeError("Cannot call a class as a function")
        }
        function a(e, t) {
            for (var n = 0; n < t.length; n++) {
                var i = t[n];
                i.enumerable = i.enumerable || !1,
                i.configurable = !0,
                "value" in i && (i.writable = !0),
                Object.defineProperty(e, i.key, i)
            }
        }
        function l(e, t, n) {
            return t && a(e.prototype, t),
            n && a(e, n),
            e
        }
        n.r(t),
        n.d(t, "generateWatermark", (function() {
            return h
        }));
        var f = "h5Page",
        d, s = [f, "meetingDetail"],
        c = !window && my && my.call,
        v = null,
        p = null,
        g = null,
        m;
        c && (m = my.getSystemInfoSync()),
        v = c ? m.platform: navigator.userAgent,
        p = c ? m.screenWidth: window.screen.width;
        var b = function() {
            function e() {
                var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                u(this, e),
                this.options = o({
                    texts: [""],
                    width: 50,
                    height: 50,
                    textRotate: -10,
                    textColor: "#000000",
                    textFont: "PingFangSC-Regular,system-ui,sans-serif",
                    fontStyle: "normal",
                    opacity: 90,
                    canvas: [],
                    fontSize: 14
                },
                t)
            }
            return l(e, [{
                key: "init",
                value: function e() {
                    var t = this,
                    n = null,
                    i = null;
                    c ? i = my.createCanvasContext("canvasBg") : (n = this.createCanvas(), i = n.getContext("2d"));
                    var o = this.options;
                    o.deg = o.textRotate * Math.PI / 180,
                    this.calcTextSize();
                    var r = Math.ceil(p / o.txts.length / o.width);
                    o.canvasWidth *= r;
                    for (var u = []; r;) r -= 1,
                    u = u.concat(o.txts);
                    o.txts = u;
                    var a = o.maxWidth * Math.abs(Math.sin(o.deg)) + Math.cos(o.deg) * o.textHeight;
                    a > o.height && (o.height = a);
                    var l = function e() {
                        t.setCanvasStyle(n, i, o.canvasWidth, 2 * o.height),
                        t.drawText(i, o.txts),
                        i.translate(0, o.height),
                        t.drawText(i, o.txts.reverse(), !0)
                    };
                    if (c) return new Promise((function(e) {
                        g.setState({
                            width: o.canvasWidth,
                            height: 2 * o.height
                        },
                        (function() {
                            setTimeout((function() {
                                l(),
                                i.draw(),
                                e(i.toDataURL("image/png"))
                            }), 0)
                        }))
                    }));
                    l();
                    var f = n.toDataURL("image/png");
                    return this.destroy(),
                    f
                }
            },
            {
                key: "createCanvas",
                value: function e() {
                    var t = document.createElement("canvas");
                    return this.options.canvas.push(t),
                    t
                }
            },
            {
                key: "calcTextSize",
                value: function e() {
                    var t = this,
                    n = [],
                    i = 0,
                    o = 0,
                    r = this.options;
                    r.texts.forEach((function(e) {
                        var u, a;
                        if (c) {
                            for (var l = 0,
                            f = 0; f < e.length; f += 1) l += /[\uff00-\uffff]/.test(e[f]) ? 1 : .5;
                            u = 1.1 * r.fontSize * l,
                            a = 1.2 * r.fontSize
                        } else {
                            var d = t.createElementFromHTML('<span style="font:'.concat(r.fontSize, "px ").concat(r.textFont, ';visibility: hidden;">').concat(e, "</span>"));
                            document.body.appendChild(d),
                            u = d.offsetWidth,
                            a = d.offsetHeight,
                            document.body.removeChild(d)
                        }
                        n.push({
                            txt: e,
                            width: u,
                            height: a
                        }),
                        i = Math.max(i, u),
                        r.textHeight = a;
                        var s = Math.cos(r.deg) * u;
                        o += (r.width < s ? s: r.width) - a * Math.sin(r.deg)
                    })),
                    r.txts = n,
                    r.maxWidth = i,
                    r.canvasWidth = o
                }
            },
            {
                key: "createElementFromHTML",
                value: function e(t) {
                    var n = document.createElement("div");
                    return n.innerHTML = t.trim(),
                    n.firstChild
                }
            },
            {
                key: "setCanvasStyle",
                value: function e(t, n, i, o) {
                    c || (t.width = i, t.height = o, t.style.display = "none");
                    var r = this.options.deg,
                    u = Math.abs(Math.sin(r));
                    n.rotate(r);
                    var a = u * this.options.height - this.options.textHeight * u,
                    l = -a * Math.cos(r),
                    f = -a * u;
                    n.translate(l, f),
                    n.font = "".concat(this.options.fontStyle, " ").concat(this.options.fontSize, "px ").concat(this.options.textFont),
                    n.fillStyle = this.options.textColor,
                    n.textAlign = "left",
                    n.textBaseline = "Middle",
                    n.globalAlpha = this.options.opacity
                }
            },
            {
                key: "drawText",
                value: function e(t, n) {
                    var i = arguments.length > 2 && void 0 !== arguments[2] && arguments[2],
                    o = this.options;
                    n.forEach((function(e, n) {
                        var r = (o.maxWidth - e.width) / 2,
                        u = o.width * Math.cos(o.deg) * n,
                        a = -u * Math.tan(o.deg) + o.height;
                        t.fillText(e.txt, u + r + (i ? o.maxWidth / 2 : 0), a)
                    }))
                }
            },
            {
                key: "destroy",
                value: function e() {
                    this.options.canvas.forEach((function(e) {
                        e.remove(),
                        e = null
                    }))
                }
            }]),
            e
        } ();
        function P(e, t) {
            var n = JSON.parse(e),
            i = n.watermark || n;
            function o() {
                return c ? m && m.pixelRatio: window && window.devicePixelRatio
            }
            function r(e) {
                return t ? e.name === t && "1" === String(e.value) : e.name === f && "1" === String(e.value)
            }
            if (!i || "0" === String(i.watermarkStatus)) return "";
            if (!Array.isArray(i.targetPages) || !i.targetPages.find((function(e) {
                return r(e)
            }))) return "";
            var u = [],
            a,
            l;
            if (Array.isArray(i.contentType)) {
                var d = "";
                i.contentType.includes(1) && (d += "".concat(i.userName, " ")),
                i.contentType.includes(2) && (d += (i.account || "").slice( - 4)),
                d && u.push(d),
                i.contentType.includes(0) && i.contentCustom && u.push(i.contentCustom)
            }
            if (!u.length) return "";
            var s = v.indexOf("Android") > -1 || v.indexOf("Linux") > -1,
            p;
            if ( !! v.match(/iPhone|iOS|(\(i[^;]+;( U;)? CPU.+Mac OS X)/))"0" === String(i.watermarkShowDensity) ? (a = 114, l = 66) : (a = 86, l = 45);
            else if (s) {
                var g = o() || 2;
                "0" === String(i.watermarkShowDensity) ? (a = 47 * g, l = 40 * g) : (a = 25 * g, l = 25 * g)
            } else "0" === String(i.watermarkShowDensity) ? (a = 300, l = 126) : (a = 194, l = 106);
            var P = new b({
                texts: u,
                width: a,
                height: l,
                textRotate: -10,
                textColor: "1" === String(i.fontColor) ? "#000000": "2" === String(i.fontColor) ? "#0000FF": "#FF0000",
                textFont: "PingFangSC-Regular,system-ui,sans-serif",
                fontStyle: "0" === String(i.fontStyle) ? "normal": "bold",
                opacity: (120 - parseInt(i.fontDiaphaneity, 10)) / 100,
                fontSize: "0" === String(i.fontSize) ? 12 : "1" === String(i.fontSize) ? 16 : 28
            });
            return P.options.width = P.options.width * P.options.fontSize / 12,
            P.options.height = P.options.height * P.options.fontSize / 12,
            P.init()
        }
        function h() {
            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
            t = arguments.length > 1 ? arguments[1] : void 0;
            c && (g = this),
            t && !s.includes(t) && (console.error("\u53ef\u9009\u53c2\u6570onlyThePage\uff0c\u4ec5\u80fd\u4e3a\u201ch5Page\u201d\u6216\u201cmeetingDetail\u201d"), t = f);
            try {
                var n = P(JSON.stringify(e), t);
                return n
            } catch(e) {
                console.error(e)
            }
        }
    },
    function(e, t, n) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var i = n(0),
        o = 1;
        function r(e) {
            return i.
        default.invoke("downloadFile", e)
        }
        i.
    default.registerAPI("downloadFile", {
            pc: function e(t, n) {
                window.dingtalk.platform.invokeAPI(n.msgId, "biz.util.downloadFile", t),
                i.
            default.registerContinuesEvent(n.msgId, (function(e, o) {
                    "im.fileTask.addNewTask" === e && (i.
                default.removeContinuesEvent(n.msgId), i.
                default.registerContinuesEvent(o.taskId, (function(e, n) {
                        if ("im.fileTask.updateTask" === e) {
                            var o = n.doneSize,
                            r = n.fileName,
                            u = n.filePath,
                            a = n.fileSize,
                            l = n.speed;
                            t.onProgress({
                                doneSize: o,
                                fileName: r,
                                filePath: u,
                                fileSize: a,
                                speed: l
                            }),
                            1 === n.status && i.
                        default.removeContinuesEvent(n.taskId)
                        }
                    })))
                }))
            }
        }),
        t.
    default = r
    },
    function(e, t, n) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var i = n(0);
        function o() {
            return i.
        default.invoke("getPhoneInfo")
        }
        i.
    default.registerAPI("getPhoneInfo", {
            mini: !0,
            mobile: !0
        }),
        t.
    default = o
    },
    function(e, t, n) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var i = n(0);
        function o(e) {
            return i.
        default.invoke("isDownloadFileExist", e)
        }
        i.
    default.registerAPI("isDownloadFileExist", {
            pc: function e(t, n) {
                window.dingtalk.platform.invokeAPI(n.msgId, "biz.util.isLocalFileExist", t)
            }
        }),
        t.
    default = o
    },
    function(e, t, n) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var i = n(0);
        function o(e) {
            return i.
        default.invoke("openDownloadFile", e)
        }
        i.
    default.registerAPI("openDownloadFile", {
            pc: function e(t, n) {
                window.dingtalk.platform.invokeAPI(n.msgId, "biz.util.openLocalFile", t)
            }
        }),
        t.
    default = o
    },
    function(e, t, n) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var i = n(0);
        function o() {
            return i.
        default.invoke("takePhoto")
        }
        i.
    default.registerAPI("takePhoto", {
            mini: !0,
            mobile: !0
        }),
        t.
    default = o
    },
    function(e, t, n) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var i = n(0);
        function o() {
            return i.
        default.invoke("shootVideo")
        }
        i.
    default.registerAPI("shootVideo", {
            mini: !0,
            mobile: !0
        }),
        t.
    default = o
    },
    function(e, t, n) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var i = n(0);
        function o(e) {
            return i.
        default.invoke("setStorageItem", e)
        }
        i.
    default.registerAPI("setStorageItem", {
            mobile: !0,
            mini: !0
        }),
        t.
    default = o
    },
    function(e, t, n) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var i = n(0);
        function o(e) {
            return i.
        default.invoke("getStorageItem", e)
        }
        i.
    default.registerAPI("getStorageItem", {
            mobile: !0,
            mini: !0
        }),
        t.
    default = o
    },
    function(e, t, n) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var i = n(0);
        function o(e) {
            return i.
        default.invoke("removeStorageItem", e)
        }
        i.
    default.registerAPI("removeStorageItem", {
            mobile: !0,
            mini: !0
        }),
        t.
    default = o
    },
    function(e, t, n) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var i = n(0);
        function o(e) {
            return i.
        default.invoke("chooseContact", e)
        }
        i.
    default.registerAPI("chooseContact", {
            mini: !0,
            mobile: !0,
            pc: function e(t, n) {
                window.dingtalk.platform.invokeAPI(n.msgId, "biz.contact.choose", t)
            }
        }),
        t.
    default = o
    },
    function(e, t, n) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var i = n(0);
        function o(e) {
            return i.
        default.invoke("complexPicker", e)
        }
        i.
    default.registerAPI("complexPicker", {
            mini: !0,
            mobile: !0
        }),
        t.
    default = o
    },
    function(e, t, n) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var i = n(0);
        function o(e) {
            return i.
        default.invoke("chooseDepartments", e)
        }
        i.
    default.registerAPI("chooseDepartments", {
            mini: !0,
            mobile: !0
        }),
        t.
    default = o
    },
    function(e, t, n) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var i = n(0);
        function o(e) {
            return i.
        default.invoke("chooseMobileContacts", e)
        }
        i.
    default.registerAPI("chooseMobileContacts", {
            mini: !0,
            mobile: !0
        }),
        t.
    default = o
    },
    function(e, t, n) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var i = n(0);
        function o(e) {
            return i.
        default.invoke("openChat", e)
        }
        i.
    default.registerAPI("openChat", {
            mini: !0,
            mobile: !0,
            pc: function e(t, n) {
                window.dingtalk.platform.invokeAPI(n.msgId, "internal.chat.toConversation", {
                    cid: t.chatId
                })
            }
        }),
        t.
    default = o
    },
    function(e, t, n) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var i = n(0);
        function o(e) {
            return i.
        default.invoke("pickChat", e)
        }
        i.
    default.registerAPI("pickChat", {
            mini: !0,
            mobile: !0
        }),
        t.
    default = o
    },
    function(e, t, n) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var i = n(0);
        function o(e) {
            return i.
        default.invoke("pickChatByCorpId", e)
        }
        i.
    default.registerAPI("pickChatByCorpId", {
            mini: !0,
            mobile: !0
        }),
        t.
    default = o
    },
    function(e, t, n) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var i = n(0);
        function o(e) {
            return i.
        default.invoke("createChatGroup", e)
        }
        i.
    default.registerAPI("createChatGroup", {
            mini: !0,
            mobile: !0
        }),
        t.
    default = o
    },
    function(e, t, n) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var i = n(0);
        function o(e) {
            return i.
        default.invoke("createVideoMeeting", e)
        }
        i.
    default.registerAPI("createVideoMeeting", {
            mini: !0,
            mobile: !0
        }),
        t.
    default = o
    },
    function(e, t, n) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var i = n(0);
        function o(e) {
            return i.
        default.invoke("shareToMessage", e)
        }
        i.
    default.registerAPI("shareToMessage", {
            mini: !0,
            mobile: !0,
            pc: function e(t, n) {
                window.dingtalk.platform.invokeAPI(n.msgId, "biz.util.share", t)
            }
        }),
        t.
    default = o
    },
    function(e, t, n) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        }),
        t.RemindType = t.AttachmentType = void 0;
        var i = n(0),
        o,
        r,
        u,
        a;
        function l(e) {
            return i.
        default.invoke("createDing", e)
        } !
        function(e) {
            e[e.image = 1] = "image",
            e[e.link = 2] = "link"
        } (o = t.AttachmentType || (t.AttachmentType = {})),
        function(e) {
            e[e.phone = 0] = "phone",
            e[e.sms = 1] = "sms",
            e[e.app = 2] = "app"
        } (r = t.RemindType || (t.RemindType = {})),
        function(e) {
            e[e.ding = 0] = "ding",
            e[e.task = 1] = "task",
            e[e.meeting = 2] = "meeting"
        } (u || (u = {})),
        function(e) {
            e[e.appointmentMeeting = 0] = "appointmentMeeting",
            e[e.appointmentPhoneMeeting = 1] = "appointmentPhoneMeeting",
            e[e.appointmentVideoMeeting = 2] = "appointmentVideoMeeting"
        } (a || (a = {})),
        i.
    default.registerAPI("createDing", {
            mini: !0,
            mobile: !0
        }),
        t.
    default = l
    },
    function(e, t, n) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var i = n(0);
        function o(e) {
            return i.
        default.invoke("postDing", e)
        }
        i.
    default.registerAPI("postDing", {
            pc: function e(t, n) {
                window.dingtalk.platform.invokeAPI(n.msgId, "biz.ding.post", t)
            }
        }),
        t.
    default = o
    },
    function(e, t, n) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var i = n(0);
        function o(e) {
            return i.
        default.invoke("downloadAudio", e)
        }
        i.
    default.registerAPI("downloadAudio", {
            mini: !0,
            mobile: !0
        }),
        t.
    default = o
    },
    function(e, t, n) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var i = n(0);
        function o(e) {
            return i.
        default.invoke("onRecordAudioEnd", e)
        }
        i.
    default.registerAPI("onRecordAudioEnd", {
            mini: !0,
            mobile: !0
        }),
        t.
    default = o
    },
    function(e, t, n) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var i = n(0);
        function o(e) {
            return i.
        default.invoke("pauseAudio", e)
        }
        i.
    default.registerAPI("pauseAudio", {
            mini: !0,
            mobile: !0
        }),
        t.
    default = o
    },
    function(e, t, n) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var i = n(0);
        function o(e) {
            return i.
        default.invoke("playAudio", e)
        }
        i.
    default.registerAPI("playAudio", {
            mini: !0,
            mobile: !0
        }),
        t.
    default = o
    },
    function(e, t, n) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var i = n(0);
        function o(e) {
            return i.
        default.invoke("resumeAudio", e)
        }
        i.
    default.registerAPI("resumeAudio", {
            mini: !0,
            mobile: !0
        }),
        t.
    default = o
    },
    function(e, t, n) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var i = n(0);
        function o(e) {
            return i.
        default.invoke("startRecordAudio", e)
        }
        i.
    default.registerAPI("startRecordAudio", {
            mini: !0,
            mobile: !0
        }),
        t.
    default = o
    },
    function(e, t, n) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var i = n(0);
        function o(e) {
            return i.
        default.invoke("stopAudio", e)
        }
        i.
    default.registerAPI("stopAudio", {
            mini: !0,
            mobile: !0
        }),
        t.
    default = o
    },
    function(e, t, n) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var i = n(0);
        function o(e) {
            return i.
        default.invoke("stopRecordAudio", e)
        }
        i.
    default.registerAPI("stopRecordAudio", {
            mini: !0,
            mobile: !0
        }),
        t.
    default = o
    }])
}));
var CreatorJsBridge = function () {
	//获取参数的类型，方便客户端解析参数
	function _getType(args) {
		var type = 0;
		if (typeof args === 'string') {
			type = 1
		} else if (typeof args === 'number') {
			type = 2
		} else if (typeof args === 'boolean') {
			type = 3
		} else if (typeof args === 'function') {
			type = 4
		} else if (args instanceof Array) {
			type = 6
		} else if (typeof args === 'object') {
			type = 5
		}
		return type
	};

	function _parseFunction(obj, name, callback) {
		if (typeof obj === 'function') {
			callback[name] = obj;
			obj = '[Function]::' + name;
			return
		}
		if (typeof obj !== 'object') {
			return
		}
		for (var p in obj) {
			switch (typeof obj[p]) {
				case 'object':
					var ret = name ? name + '_' + p : p;
					_parseFunction(obj[p], ret, callback);
					break;
				case 'function':
					var ret = name ? name + '_' + p : p;
					callback[ret] = (obj[p]);
					obj[p] = '[Function]::' + ret;
					break;
				default:
					break;
			}
		}
	};

	//初始化事件，引人js文件会直接调用此方法
	this.OnJsBridgeReady = function () {
		try {
			var ready = window.onc2Ready;
			if (ready && typeof (ready) === 'function') {
				ready()
			} else {
				var readyEvent = document.createEvent('Events');
				readyEvent.initEvent('onc2Ready');
				document.dispatchEvent(readyEvent);
			}
		} catch (e) {
			console.error(e);
		};
	};

	var devConfig = { debug: false };;
	var readyCallback;
	/*
	  通过config接口注入权限验证配置
	  @param debug 开启调试模式，直接返回模拟数据
	  @param appId 应用唯一标识
	  @param timestamp 生成签名的时间戳
	  @param nonceStr 生成签名的随机串
	  @param signature 签名
	  @param jsApiList 需要使用的JS接口列表
	 */
	this.config = function (config) {
		devConfig = config;
		//todo 后续参数处理
		//处理完成后调用ready回调 后续会返回验证后相对应的数据
		readyCallback();
	};

	/**
	 * config调用后再调用，还会有后续的逻辑，
	 * */
	this.ready = function (callback) {
		readyCallback = callback;
	}

	/*
	 * 调用Java方法，android是通过WebChromeClient onJsPrompt()方法接受回调参数的
	 * */
	function _callJava(id, module, method, args) {
		var req = {
			id: id,
			module: module,
			method: method,
			parameters: args
		};
		return JSON.parse(window.AndroidFunction.callAndroidFun(JSON.stringify(req)));
	};

	/*
	 * 调用OC方法，android是通过WebChromeClient onJsPrompt()方法接受回调参数的
	 * */
	function _callOC(id, module, method, args) {
		var req = {
			id: id,
			module: module,
			method: method,
			parameters: args
		};
		return JSON.parse(prompt(JSON.stringify(req)));
	};

	var C2SendQueue = [];
	var C2ReceiveQueue = [];


	/*
	 * iOS调用JS方法
	 * */
	function _callFunc(func, message) {
		for (var e in C2ReceiveQueue) {
			var event = C2ReceiveQueue[e];
			if (event[func]) {
				var f = event[func];
				if (typeof f === 'function') {
					return f(message);
				}
			}
		}
		return;
	};

	/*
	 *  h5调用JS方法
	 * */
	function _callH5(callback, module, method, args) {
		var obj = args[0].value;
		if (module == "navigation") {
			if (method == "openPage") {
				if (obj.url) {
					var url = obj.url;
					window.location.href = url;
				} else {
                    var url = window.location.origin+ window.location.pathname+'#'+ obj.path;        
                    window.location.href = url;
				}
			} else if (method == "goBack") {
				window.history.back();
			} else if (method == "close") {
				window.history.go(-obj.count);
			}
		}

		return;
	};

	function d(s) {
		console.error(s);
	};

	/*
	  @param callback 业务方法的回调   格式类似于：c2.navigation.setTitleCallback
	  @param methodArg 参数
	  @param ret 默认值0
	  @param moduleName 模块名，对应Java类名
	  @param methodName 原生方法名
	*/
	function _method(callback, methodArg, ret, moduleName, methodName) {
		try {
			var id = Math.random().toString(32).slice(2),
				args = [];
			for (var i in methodArg) {
				var name = id + '_a' + i,
					item = methodArg[i],
					l = {};
				_parseFunction(item, name, l);
				for (var k in l) {
					callback[k] = l[k];
					C2ReceiveQueue.push(callback);
				}
				args.push({
					type: _getType(item),
					name: name,
					value: item
				})
			}
			if (navigator.userAgent.match(/C2Mobile/i)) {
				if (navigator.userAgent.match(/iPhone|iPad|iPod/i)) {
					var res = _callOC(id, moduleName, methodName, args);
					if (moduleName == "iOS") {
						var returnValue = base64Decode(res.returnValue);
						if (res.funcName.indexOf('onPageResult') != -1) {
							_callFunc(res.funcName, returnValue);
						} else {
							try {
								var json = JSON.parse(returnValue);
								_callFunc(res.funcName, json);
							}
							catch (e) {
								_callFunc(res.funcName, returnValue);
							}
						}
					}
					return;
				} else if (navigator.userAgent.match(/Android/i)) {
					var r = _callJava(id, moduleName, methodName, args);
					if (r && r.success) {
						if (ret) return r.msg;
					} else {
						d(r.msg);
						console.error("方法调用失败" + r.msg);
					}
				}
			} else {
				_callH5(callback, moduleName, methodName, args);
			}
		} catch (e) {
			d(e);
		}
	};

	/**
	 * 检测运行环境
	 * */
	CreatorJsBridge.prototype.checkPlatform = {
		App: function () {
			return navigator.userAgent.match(/C2Mobile/i) ? true : false;
		},
		Wechat: function () {
			return navigator.userAgent.match(/MicroMessenger/i) ? true : false;
		},
		Android: function () {
			return navigator.userAgent.match(/Android/i) ? true : false;
		},
		iOS: function () {
			return navigator.userAgent.match(/iPhone|iPad|iPod/i) ? true : false;
		},
		Windows: function () {
			return navigator.userAgent.match(/IEMobile/i) ? true : false;
		}
	};

	/**
	* 获取状态栏高度
	 * */
	CreatorJsBridge.prototype.getViewHeight = {
		StatusBarHeight: function () {
			if (navigator.userAgent.indexOf("statusBarHeight") != -1) {
				var statusBarContent = navigator.userAgent.substring(navigator.userAgent.indexOf("statusBarHeight"));
				if (statusBarContent.indexOf(":") != -1) {
					return statusBarContent.substring(statusBarContent.indexOf(":") + 1);
				}
			}
			return -1;
		},
		NavBarHeight: function () {
			if (navigator.userAgent.indexOf("navBarHeight") != -1) {
				var navBarContent = navigator.userAgent.substring(navigator.userAgent.indexOf("navBarHeight"));
				if (navBarContent.indexOf(":") != -1) {
					return navBarContent.substring(navBarContent.indexOf(":") + 1);
				}
			}
			return -1;
		},
	};

	/**
 * android原生端调用JS方法，request方法增加base64解码
 * todo 参数传递。。
 * */
	CreatorJsBridge.sendDataWarpToWeb = function (realCallback, callback, data) {
		if (callback && realCallback) {
			if (typeof realCallback === 'function') {
				if ((callback === 'c2.system.requestCallback' || callback === 'c2.file.uploadFileCallback')
				     && data.code===200) {
					var originBody = base64Decode(data.body);
					data.body = originBody;
				} else if(callback === 'c2.domainStorage.getItemCallback') {
					var originBody = base64Decode(data.value);
					data.value = originBody;
				}
				realCallback(data)
			} else {
				console.error(callback + ' is not a function')
			}
		}
	}

	/**
	 * 以下为具体的业务方法，每个函数的原型对象对应Java的一个类，方便客户端进行方法的管理
	 * 防止一个类中出现很多方法。对应Excel的文档表，后续新增方法需要更新此文件和原生方法
	 * */
	CreatorJsBridge.prototype.navigation = {
		setRight: function () {
			if (!c2.navigation.setRightCallback) c2.navigation.setRightCallback = {};
			return _method(c2.navigation.setRightCallback, arguments, 0, 'navigation', 'setRight')
		},
		setTitle: function () {
			if (!c2.navigation.setTitleCallback) c2.navigation.setTitleCallback = {};
			return _method(c2.navigation.setTitleCallback, arguments, 0, 'navigation', 'setTitle')
		},
		goBack: function () {
			if (!c2.navigation.goBackCallback) c2.navigation.goBackCallback = {};
			return _method(c2.navigation.goBackCallback, arguments, 0, 'navigation', 'goBack')
		},
		setMenu: function () {
			if (!c2.navigation.setMenuCallback) c2.navigation.setMenuCallback = {};
			return _method(c2.navigation.setMenuCallback, arguments, 0, 'navigation', 'setMenu')
		},
		openPage: function () {
			if (!c2.navigation.openPageCallback) c2.navigation.openPageCallback = {};
			return _method(c2.navigation.openPageCallback, arguments, 0, 'navigation', 'openPage')
		},
		close: function () {
			if (!c2.navigation.closeCallback) c2.navigation.closeCallback = {};
			return _method(c2.navigation.closeCallback, arguments, 0, 'navigation', 'close')
		},
		quit: function () {
			if (!c2.navigation.quitCallback) c2.navigation.quitCallback = {};
			return _method(c2.navigation.quitCallback, arguments, 0, 'navigation', 'quit')
		}
	};
	CreatorJsBridge.prototype.util = {
		openLink: function () {
			if (!c2.util.openLinkCallback) c2.util.openLinkCallback = {};
			return _method(c2.util.openLinkCallback, arguments, 0, 'util', 'openLink')
		},
		open: function () {
			if (!c2.util.openCallback) c2.util.openCallback = {};
			return _method(c2.util.openCallback, arguments, 0, 'util', 'open')
		},
		openApp: function () {
			if (!c2.util.openAppCallback) c2.util.openAppCallback = {};
			return _method(c2.util.openAppCallback, arguments, 0, 'util', 'openApp')
		},
		clipboardData: function () {
			if (!c2.util.clipboardDataCallback) c2.util.clipboardDataCallback = {};
			return _method(c2.util.clipboardDataCallback, arguments, 0, 'util', 'clipboardData')
		},
		share: function () {
			if (!c2.util.shareCallback) c2.util.shareCallback = {};
			return _method(c2.util.shareCallback, arguments, 0, 'util', 'share')
		},
		getCacheSize: function () {
			if (!c2.util.getCacheSizeCallback) c2.util.getCacheSizeCallback = {};
			return _method(c2.util.getCacheSizeCallback, arguments, 0, 'util', 'getCacheSize')
		},
		clearCache: function () {
			if (!c2.util.clearCacheCallback) c2.util.clearCacheCallback = {};
			return _method(c2.util.clearCacheCallback, arguments, 0, 'util', 'clearCache')
		},
		getMessageNotification: function () {
			if (!c2.util.getMessageNotificationCallback) c2.util.getMessageNotificationCallback = {};
			return _method(c2.util.getMessageNotificationCallback, arguments, 0, 'util', 'getMessageNotification')
		},
		setMessageNotification: function () {
			if (!c2.util.setMessageNotificationCallback) c2.util.setMessageNotificationCallback = {};
			return _method(c2.util.setMessageNotificationCallback, arguments, 0, 'util', 'setMessageNotification')
		},
		getLocation: function () {
			if (!c2.util.getLocationCallback) c2.util.getLocationCallback = {};
			return _method(c2.util.getLocationCallback, arguments, 0, 'util', 'getLocation')
		},
		updateCheck: function () {
			if (!c2.util.updateCheckCallback) c2.util.updateCheckCallback = {};
			return _method(c2.util.updateCheckCallback, arguments, 0, 'util', 'updateCheck')
		},
		getMicroAppParams: function () {
			if (!c2.util.getMicroAppParamsCallback) c2.util.getMicroAppParamsCallback = {};
			return _method(c2.util.getMicroAppParamsCallback, arguments, 0, 'util', 'getMicroAppParams')
		},
		getLaunchOptions: function () {
			if (!c2.util.getLaunchOptionsCallback) c2.util.getLaunchOptionsCallback = {};
			return _method(c2.util.getLaunchOptionsCallback, arguments, 0, 'util', 'getLaunchOptions')
		}
	};
	CreatorJsBridge.prototype.auth = {
		checkLogin: function () {
			if (!c2.auth.checkLoginCallback) c2.auth.checkLoginCallback = {};
			return _method(c2.auth.checkLoginCallback, arguments, 0, 'auth', 'checkLogin')
		},
		logout: function () {
			if (!c2.auth.logoutCallback) c2.auth.logoutCallback = {};
			return _method(c2.auth.logoutCallback, arguments, 0, 'auth', 'logout')
		},
		getUserInfo: function () {
			debugger
			if (devConfig.debug) {
				for (var i in arguments) {
					item = arguments[i];
					if (typeof item === 'function') {
						var userInfo = {
							userId: 'F7B6F5AC7FEA4FB5A69247811B70D34C',
							openId: 'F7B6F5AC7FEA4FB5A69247811B70D34C',
							unionId: 'F7B6F5AC7FEA4FB5A69247811B70D34C',
							avatar: '',
							nickname: "小明（开发用户）",
							phone: '18888888888'
						};
						item(userInfo);
						return;
					}
				}
			} else {
				if (!c2.auth.getUserInfoCallback) c2.auth.getUserInfoCallback = {};
				return _method(c2.auth.getUserInfoCallback, arguments, 0, 'auth', 'getUserInfo')
			}
		},
		updateUserInfo: function () {
			if (!c2.auth.updateUserInfoCallback) c2.auth.updateUserInfoCallback = {};
			return _method(c2.auth.updateUserInfoCallback, arguments, 0, 'auth', 'updateUserInfo')
		},
		requestAuthCode: function () {
			if (!c2.auth.requestAuthCodeCallback) c2.auth.requestAuthCodeCallback = {};
			return _method(c2.auth.requestAuthCodeCallback, arguments, 0, 'auth', 'requestAuthCode')
		},
		loginSuccess: function () {
			if (!c2.auth.loginSuccessCallback) c2.auth.loginSuccessCallback = {};
			return _method(c2.auth.loginSuccessCallback, arguments, 0, 'auth', 'loginSuccess')
		},
		login: function () {
			if (!c2.auth.loginCallback) c2.auth.loginCallback = {};
			return _method(c2.auth.loginCallback, arguments, 0, 'auth', 'login')
		},
		modifyPassword: function () {
			if (!c2.auth.modifyPasswordCallback) c2.auth.modifyPasswordCallback = {};
			return _method(c2.auth.modifyPasswordCallback, arguments, 0, 'auth', 'modifyPassword')
		},
		register: function () {
			if (!c2.auth.registerCallback) c2.auth.registerCallback = {};
			return _method(c2.auth.registerCallback, arguments, 0, 'auth', 'register')
		},
		sendVerificationCode: function () {
			if (!c2.auth.sendVerificationCodeCallback) c2.auth.sendVerificationCodeCallback = {};
			return _method(c2.auth.sendVerificationCodeCallback, arguments, 0, 'auth', 'sendVerificationCode')
		}
	};
	CreatorJsBridge.prototype.listener = {
		resume: function () {
			if (!c2.listener.resumeCallback) c2.listener.resumeCallback = {};
			return _method(c2.listener.resumeCallback, arguments, 0, 'listener', 'resume')
		},
		pause: function () {
			if (!c2.listener.pauseCallback) c2.listener.pauseCallback = {};
			return _method(c2.listener.pauseCallback, arguments, 0, 'listener', 'pause')
		},
		refresh: function () {
			if (!c2.listener.refreshCallback) c2.listener.refreshCallback = {};
			return _method(c2.listener.refreshCallback, arguments, 0, 'listener', 'refresh')
		},
		fallBack: function () {
			if (!c2.listener.fallBackCallback) c2.listener.fallBackCallback = {};
			return _method(c2.listener.fallBackCallback, arguments, 0, 'listener', 'fallBack')
		},
	};
	CreatorJsBridge.prototype.image = {
		chooseImage: function () {
			if (!c2.image.chooseImageCallback) c2.image.chooseImageCallback = {};
			return _method(c2.image.chooseImageCallback, arguments, 0, 'image', 'chooseImage')
		},
		uploadImage: function () {
			if (!c2.image.uploadImageCallback) c2.image.uploadImageCallback = {};
			return _method(c2.image.uploadImageCallback, arguments, 0, 'image', 'uploadImage')
		},
		previewImage: function () {
			if (!c2.image.previewImageCallback) c2.image.previewImageCallback = {};
			return _method(c2.image.previewImageCallback, arguments, 0, 'image', 'previewImage')
		},
	};
	CreatorJsBridge.prototype.file = {
		downloadFile: function () {
			if (!c2.file.downloadFileCallback) c2.file.downloadFileCallback = {};
			return _method(c2.file.downloadFileCallback, arguments, 0, 'file', 'downloadFile')
		},
		uploadFile: function () {
			if (!c2.file.uploadFileCallback) c2.file.uploadFileCallback = {};
			return _method(c2.file.uploadFileCallback, arguments, 0, 'file', 'uploadFile')
		},
		previewFile: function () {
			if (!c2.file.previewFileCallback) c2.file.previewFileCallback = {};
			return _method(c2.file.previewFileCallback, arguments, 0, 'file', 'previewFile')
		},
		openLocalFile: function () {
			if (!c2.file.openLocalFileCallback) c2.file.openLocalFileCallback = {};
			return _method(c2.file.openLocalFileCallback, arguments, 0, 'file', 'openLocalFile')
		},
		chooseLocalFile: function () {
			if (!c2.file.chooseLocalFileCallback) c2.file.chooseLocalFileCallback = {};
			return _method(c2.file.chooseLocalFileCallback, arguments, 0, 'file', 'chooseLocalFile')
		},
		openFileWithThirdParty: function () {
			if (!c2.file.openFileWithThirdPartyCallback) c2.file.openFileWithThirdPartyCallback = {};
			return _method(c2.file.openFileWithThirdPartyCallback, arguments, 0, 'file', 'openFileWithThirdParty')
		},
	};
	CreatorJsBridge.prototype.contact = {
		selectContact: function () {
			if (!c2.contact.selectContactCallback) c2.contact.selectContactCallback = {};
			return _method(c2.contact.selectContactCallback, arguments, 0, 'contact', 'selectContact')
		},
		selectedContact: function () {
			if (!c2.contact.selectedContactCallback) c2.contact.selectedContactCallback = {};
			return _method(c2.contact.selectedContactCallback, arguments, 0, 'contact', 'selectedContact')
		}
	};
	CreatorJsBridge.prototype.im = {
		toConversation: function () {
			if (!c2.im.toConversationCallback) c2.im.toConversationCallback = {};
			return _method(c2.im.toConversationCallback, arguments, 0, 'im', 'toConversation')
		},
		openSingleChat: function () {
			if (!c2.im.openSingleChatCallback) c2.im.openSingleChatCallback = {};
			return _method(c2.im.openSingleChatCallback, arguments, 0, 'im', 'openSingleChat')
		},
		createGroup: function () {
			if (!c2.im.createGroupCallback) c2.im.createGroupCallback = {};
			return _method(c2.im.createGroupCallback, arguments, 0, 'im', 'createGroup')
		},
		inviteUser: function () {
			if (!c2.im.inviteUserCallback) c2.im.inviteUserCallback = {};
			return _method(c2.im.inviteUserCallback, arguments, 0, 'im', 'inviteUser')
		},
        getSessionList: function () {
            if (!c2.im.getSessionListCallback) c2.im.getSessionListCallback = {}
            return _method(c2.im.getSessionListCallback, arguments, 0, 'im', 'getSessionList')
        }
	};
	CreatorJsBridge.prototype.ui = {
		setProgressBarColor: function () {
			if (!c2.ui.setProgressBarColorCallback) c2.ui.setProgressBarColorCallback = {};
			return _method(c2.ui.setProgressBarColorCallback, arguments, 0, 'ui', 'setProgressBarColor')
		},
		pullToRefreshEnable: function () {
			if (!c2.ui.pullToRefreshEnableCallback) c2.ui.pullToRefreshEnableCallback = {};
			return _method(c2.ui.pullToRefreshEnableCallback, arguments, 0, 'ui', 'pullToRefreshEnable')
		},
		pullToRefreshDisable: function () {
			if (!c2.ui.pullToRefreshDisableCallback) c2.ui.pullToRefreshDisableCallback = {};
			return _method(c2.ui.pullToRefreshDisableCallback, arguments, 0, 'ui', 'pullToRefreshDisable')
		},
		pullToRefreshStop: function () {
			if (!c2.ui.pullToRefreshStopCallback) c2.ui.pullToRefreshStopCallback = {};
			return _method(c2.ui.pullToRefreshStopCallback, arguments, 0, 'ui', 'pullToRefreshStop')
		},
		webViewBounceDisable: function () {
			if (!c2.ui.webViewBounceDisableCallback) c2.ui.webViewBounceDisableCallback = {};
			return _method(c2.ui.webViewBounceDisableCallback, arguments, 0, 'ui', 'webViewBounceDisable')
		},
		webViewBounceEnable: function () {
			if (!c2.ui.webViewBounceEnableCallback) c2.ui.webViewBounceEnableCallback = {};
			return _method(c2.ui.webViewBounceEnableCallback, arguments, 0, 'ui', 'webViewBounceEnable')
		},
		showLoading: function () {
			if (!c2.ui.showLoadingCallback) c2.ui.showLoadingCallback = {};
			return _method(c2.ui.showLoadingCallback, arguments, 0, 'ui', 'showLoading')
		},
		dismissLoading: function () {
			if (!c2.ui.dismissLoadingCallback) c2.ui.dismissLoadingCallback = {};
			return _method(c2.ui.dismissLoadingCallback, arguments, 0, 'ui', 'dismissLoading')
		},
		setBadgeNumber: function () {
			if (!c2.ui.setBadgeNumberCallback) c2.ui.setBadgeNumberCallback = {};
			return _method(c2.ui.setBadgeNumberCallback, arguments, 0, 'ui', 'setBadgeNumber')
		},
		setTabBarBadge: function () {
			if (!c2.ui.setTabBarBadgeCallback) c2.ui.setTabBarBadgeCallback = {};
			return _method(c2.ui.setTabBarBadgeCallback, arguments, 0, 'ui', 'setTabBarBadge')
		},
		removeTabBarBadge: function () {
			if (!c2.ui.removeTabBarBadgeCallback) c2.ui.removeTabBarBadgeCallback = {};
			return _method(c2.ui.removeTabBarBadgeCallback, arguments, 0, 'ui', 'removeTabBarBadge')
		},
		showADAlert: function () {
			if (!c2.ui.showADAlertCallback) c2.ui.showADAlertCallback = {};
			return _method(c2.ui.showADAlertCallback, arguments, 0, 'ui', 'showADAlert')
		}
	};
	CreatorJsBridge.prototype.scan = {
		code: function () {
			if (!c2.scan.codeCallback) c2.scan.codeCallback = {};
			return _method(c2.scan.codeCallback, arguments, 0, 'scan', 'code')
		},
		card: function () {
			if (!c2.scan.cardCallback) c2.scan.cardCallback = {};
			return _method(c2.scan.cardCallback, arguments, 0, 'scan', 'card')
		}
	};
	CreatorJsBridge.prototype.domainStorage = {
		setItem: function () {
			if (!c2.domainStorage.setItemCallback) c2.domainStorage.setItemCallback = {};
			return _method(c2.domainStorage.setItemCallback, arguments, 0, 'domainStorage', 'setItem')
		},
		getItem: function () {
			if (!c2.domainStorage.getItemCallback) c2.domainStorage.getItemCallback = {};
			return _method(c2.domainStorage.getItemCallback, arguments, 0, 'domainStorage', 'getItem')
		},
		removeItem: function () {
			if (!c2.domainStorage.removeItemCallback) c2.domainStorage.removeItemCallback = {};
			return _method(c2.domainStorage.removeItemCallback, arguments, 0, 'domainStorage', 'removeItem')
		}
	};
	CreatorJsBridge.prototype.telephone = {
		call: function () {
			if (!c2.telephone.telephoneCallback) c2.telephone.telephoneCallback = {};
			return _method(c2.telephone.telephoneCallback, arguments, 0, 'telephone', 'call')
		},
		sendSMS: function () {
			if (!c2.telephone.sendSMSCallback) c2.telephone.sendSMSCallback = {};
			return _method(c2.telephone.sendSMSCallback, arguments, 0, 'telephone', 'sendSMS')
		},
		addContact: function () {
			if (!c2.telephone.addContactCallback) c2.telephone.addContactCallback = {};
			return _method(c2.telephone.addContactCallback, arguments, 0, 'telephone', 'addContact')
		}
	};
	CreatorJsBridge.prototype.system = {
		customToolBar: function () {
			if (!c2.system.customToolBarCallback) c2.system.customToolBarCallback = {};
			return _method(c2.system.customToolBarCallback, arguments, 0, 'system', 'customToolBar')
		},
		request: function () {
			if (!c2.system.requestCallback) c2.system.requestCallback = {};
			return _method(c2.system.requestCallback, arguments, 0, 'system', 'request')
		},
		getAppInfo: function () {
			if (!c2.system.getAppInfoCallback) c2.system.getAppInfoCallback = {};
			return _method(c2.system.getAppInfoCallback, arguments, 0, 'system', 'getAppInfo')
		},
		setSystemFontSize: function () {
			if (!c2.system.setSystemFontSizeCallback) c2.system.setSystemFontSizeCallback = {};
			return _method(c2.system.setSystemFontSizeCallback, arguments, 0, 'system', 'setSystemFontSize')
		},
		getSystemFontSize: function () {
			if (navigator.userAgent.indexOf("systemFontSize") != -1) {
				var statusBarContent = navigator.userAgent.substring(navigator.userAgent.indexOf("systemFontSize"));
				if (statusBarContent.indexOf(":") != -1) {
					return statusBarContent.substring(statusBarContent.indexOf(":") + 1);
				}
			}
			return -1;
			// if (!c2.system.getSystemFontSizeCallback) c2.system.getSystemFontSizeCallback = {};
			// return _method(c2.system.getSystemFontSizeCallback, arguments, 0, 'system', 'getSystemFontSize')
		},
		reportLogConfig: function () {
			if (!c2.system.reportLogConfigCallback) c2.system.reportLogConfigCallback = {};
			return _method(c2.system.reportLogConfigCallback, arguments, 0, 'system', 'reportLogConfig')
		},
		getMicroAppsInfo: function () {
			if (!c2.system.getMicroAppsInfoCallback) c2.system.getMicroAppsInfoCallback = {};
			return _method(c2.system.getMicroAppsInfoCallback, arguments, 0, 'system', 'getMicroAppsInfo')
		}
	};
	CreatorJsBridge.prototype.device = {
		rotateView: function () {
			if (!c2.device.rotateViewCallback) c2.device.rotateViewCallback = {};
			return _method(c2.device.rotateViewCallback, arguments, 0, 'device', 'rotateView')
		},
	};
	//自定义js方法
	CreatorJsBridge.prototype.custom = {
		call: function () {
			if (!c2.custom.callCallback) c2.custom.callCallback = {};
			return _method(c2.custom.callCallback, arguments, 0, 'custom', 'call')
		},
	};
	CreatorJsBridge.prototype.iOS = {
		callJS: function () {
			if (!c2.iOS.callJSCallback) c2.iOS.callJSCallback = {};
			return _method(c2.iOS.callJSCallback, arguments, 0, 'iOS', 'callJS')
		},
	};
};
window.c2 = new CreatorJsBridge();
c2.OnJsBridgeReady();

// public method for decoding
var base64Decode = function (input) {
	let keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
	var output = "";
	var chr1, chr2, chr3;
	var enc1, enc2, enc3, enc4;
	var i = 0;
	input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");
	while (i < input.length) {
		enc1 = keyStr.indexOf(input.charAt(i++));
		enc2 = keyStr.indexOf(input.charAt(i++));
		enc3 = keyStr.indexOf(input.charAt(i++));
		enc4 = keyStr.indexOf(input.charAt(i++));
		chr1 = (enc1 << 2) | (enc2 >> 4);
		chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
		chr3 = ((enc3 & 3) << 6) | enc4;
		output = output + String.fromCharCode(chr1);
		if (enc3 != 64) {
			output = output + String.fromCharCode(chr2);
		}
		if (enc4 != 64) {
			output = output + String.fromCharCode(chr3);
		}
	}
	output = _utf8_decode(output);
	return output;
}

// private method for UTF-8 decoding
var _utf8_decode = function (utftext) {
	var string = "";
	var i = 0;
	var c = 0;
	var c3 = 0;
	var c2 = 0;
	while (i < utftext.length) {
		c = utftext.charCodeAt(i);
		if (c < 128) {
			string += String.fromCharCode(c);
			i++;
		} else if ((c > 191) && (c < 224)) {
			c2 = utftext.charCodeAt(i + 1);
			string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
			i += 2;
		} else {
			c2 = utftext.charCodeAt(i + 1);
			c3 = utftext.charCodeAt(i + 2);
			string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
			i += 3;
		}
	}
	return string;
}

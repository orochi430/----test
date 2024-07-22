(function (w) {
    //初始化
    function _$$(options) {
        this.uaType = options && options.uaType || this.getUa()
        this.url = null

        if (this.uaType == 'wzt_mpaas') {

        } else if (this.uaType == 'iflytek_mmp') {
            // this.url = 'https://www.ahzwfw.gov.cn/wst-ds/wst-js/croods-1.3.3.js'
        }
        // 初始化加载
        // this.loadScript()
    }

    //定义ua
    _$$.prototype.getUa = function () {
        var ua = navigator.userAgent
        if (ua.indexOf('wzt_mpaas') !== -1) {
            return 'wzt_mpaas'
        } else if (ua.indexOf('AlipayClient') !== -1) {
            return 'AlipayClient'
        } else if (ua.indexOf('iflytek_mmp') !== -1) {
            return 'iflytek_mmp'
        } else {
            return ''
        }
    }

    //加载script标签
    _$$.prototype.loadScript = function () {
        console.log('WELCOME START TPTool JS FRAMEWORK 0.5.0')
        var that = this
        var script = document.createElement('script')
        script.type = 'text/javascript'
        script.src = this.url
        script.onload = function () {
        }
        if (this.url) {
            document.getElementsByTagName('head')[0].appendChild(script)
        }
    }

    _$$.prototype.closePage = function () {
        window.AlipayJSBridge && AlipayJSBridge.call('UserPlugin.closePage', {'exit': 'true'});
    }

    //包装方法   BaiduMapPlugin.getLocation
    _$$.prototype.customPlugin = function (options) {
        options = options || {}
        options.action = options.action
        options.params = options.params
        options.success = options.success
        options.fail = options.fail

        switch (this.uaType) {
            case 'wzt_mpaas':
                window.AlipayJSBridge && AlipayJSBridge.call(options.action, options.params, function (data) {
                    if (data.error && data.error > 0) {
                        options.fail && options.fail(data)
                    } else {
                        options.success && options.success(data)
                    }
                });
            case 'iflytek_mmp':
                croods.customPlugin({
                    action: options.action,
                    params: options.params,
                    success: function (res) {
                        options.success && options.success(res)
                    },
                    fail: function (msg) {
                        options.fail && options.fail(msg)
                    }
                })
                break
        }
    }

    _$$.prototype.load = function (callback){
        if (window.AlipayJSBridge) {
            callback && callback();
        } else {
            document.addEventListener('AlipayJSBridgeReady', callback, false);
        }
    }

    //命名
    var croods = _$$.prototype
    //创建
    var $$ = new _$$()
    //挂载window
    w.croods = w.$$ = $$

})(window)

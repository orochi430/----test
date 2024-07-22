/*========================================*/
var isNestedForm = window._Q_ && window._Q_["nestedForm"] === "true";

function getTopFormLayer(){
    return window.layer;
}
/*========================================*/
/**
 * DSF - Global Extention
 */
(function($){

    /**
     * sample:
     * var s = "{0} text".format(["sample"]);
     */
    String.prototype.format = function (args) {
        var result = this;
        var reg;
        if (arguments.length > 0) {
            if (arguments.length == 1 && typeof (args) == "object") {
                if($.isArray(args)){
                    for(var index=0; index < args.length; index++){
                        var arg = args[index];
                        if (arg != undefined) {
                            reg = new RegExp("({)" + index + "(})", "g");
                            result = result.replace(reg, arg);
                        }
                    }
                }else{
                    for (var key in args) {
                        if (args[key] != undefined) {
                            reg = new RegExp("({" + key + "})", "g");
                            result = result.replace(reg, args[key]);
                        }
                    }
                }
            } else {
                for (var i = 0; i < arguments.length; i++) {
                    if (arguments[i] != undefined) {
                        reg = new RegExp("({)" + i + "(})", "g");
                        result = result.replace(reg, arguments[i]);
                    }
                }
            }
        }
        return result;
    }

    String.prototype.startsWith=function(str){
        var reg=new RegExp("^"+str);
        return reg.test(this);
    }

    String.prototype.endsWith=function(str){
        var reg=new RegExp(str+"$");
        return reg.test(this);
    }
})($);

/**
 * DSF - Utils
 */
(function (window, $) {
    "use strict";
    window.DSF = window.DSF || {};

    var Utils = {};

    Utils.serializeObject = function (form) {
        var o = {};

        /**
        var map = {};
        $(form).find("[name^='query_']").each(function(){
            var that = $(this);
            map[that.attr("name")] = that.attr("controlType") || "" ;
        });
         */

        $.each(form.serializeArray(), function(index) {
            var key = this['name'] ;

            /**
            var controlType = map[key];
            if(!_.isEmpty(controlType)){
                key =  key + "." + controlType ;
            }*/

            if (o[key]) {
                o[key] = o[key] + "," + this['value'];
            } else {
                o[key] = this['value'];
            }
        });



        return o;
    }

    /**
     * 解析JSON。
     * 在JSON.parse()基础上加上try catch。
     */
    Utils.parseJSON = function (jsonString) {
        var resultObj = null;
        if(jsonString){
            try {
                resultObj = JSON.parse(jsonString);
            } catch (e) {
                Utils.error("Error parsing JSON:" , e , ",jsonString=", jsonString);
            }
        }
        return resultObj;
    };

    /**
     * 解析JSON。
     * 在JSON.parse()基础上加上try catch。
     */
    Utils.stringify = function (json) {
        var resultString = null;
        if(json){
            try {
                resultString = JSON.stringify(json);
            } catch (e) {
                Utils.error("Error parsing JSON: jsonString=" + json +",error="+ e);
            }
        }
        return resultString;
    };

    Utils.getQueryString = function(){
        var queryStr = "" ;
        //TODO 未加密注销
        if(window._Q_){
            var queryArray = [] ;
            for(var key in window._Q_){
                queryArray.push(key + "=" + window._Q_[key]) ;
            }

            if(queryArray.length > 0){
                queryStr = queryArray.join("&") ;
            }
        }

        if(!queryStr){
            queryStr = window.location.search || "";
            if (queryStr.length) {//去掉问号
                queryStr = queryStr.substring(1, queryStr.length);
            }
        }
        return queryStr;
    }

    /**
     * 将查询字符串转换为Object
     * @param queryString "a1=v1&a2=&a3=a3";// test only
     */
    Utils.getQueryObject = function (queryString) {
        var result = {};
        if (queryString) {
            var pairs = queryString.split("&");
            for (var i = 0; pairs && i < pairs.length; i++) {
                var pair = pairs[i];
                var pos = pair.indexOf('=');
                if (pos == -1) continue;
                var key = pair.substring(0, pos);
                var value = pair.substring(pos + 1);
                value = decodeURIComponent(value); // 若需要，则解码
                result[key] = value;
            }
        }
        return result;
    };

    Utils.getJSONString = function(json){
        var array = [] ;
        for(var key in json){
            array.push(key + "=" + json[key]);
        }
        return array.join("&") ;
    };

    Utils.pushArray = function(array , other_array) {
        /* you should include a test to check whether other_array really is an array */
        other_array.forEach(function(v) {
            array.push(v)
        }, this);
    }

    Utils.log = function () {
        if (__DSF_DEBUG__) {
            window.console && window.console.log.apply(window.console, arguments);
        }
    }
    Utils.error = function () {
        if (__DSF_DEBUG__) {
            window.console && window.console.error.apply(window.console, arguments);
        }
    }


    /**
     * ajax, post异步情况
     * @param url
     * @param param
     * @param success
     */
    Utils.ajaxRequest = function(url,param, success, error){
        // success(dataAll);return;
        $.ajax({
            type: "post",
            url: DSF.getURLRoot(`ajax`) + url,
            data: param,
            dataType: 'json',
            headers: {
                "x-auth-token": DSF.getURLParam("x-auth-token")
            },
            success: function(json){
                if(typeof success == "function"){
                    success(json);
                }else{
                    if(json && json.type == "success"){
                        //layuiOk(json.message);
                    }else{
                        //layuiError(json.message);
                    }
                    f7Alert(json.message);
                }
            },error : function(jqXHR, textStatus, errorThrown){
                console.log("url:" + url);
                // 状态:0-未初始化，1-正在载入，2-已经载入，3-数据进行交互，4-完成。
                console.log(jqXHR.readyState);
                // 状态码:返回的HTTP状态码，比如常见的404,500等错误代码
                console.log(jqXHR.status);
                //对应状态码的错误信息，比如404错误信息是not found,500是Internal Server Error
                console.log(jqXHR.statusText);
                //服务器响应返回的文本信息
                console.log(jqXHR.responseText);
                // 返回状态
                console.log(textStatus);
                // 服务器错误
                console.log(errorThrown);

                if(typeof error == "function"){
                    error(jqXHR, textStatus, errorThrown);
                }else{
                    if(jqXHR.readyState == 0){
                        layer.msg("请求失败: 网络错误", {icon: 2});
                        // DSF.toast("请求失败: 网络错误");
                    }else{
                        layer.msg("请求失败", {icon: 2});
                        // DSF.toast("请求失败");
                        return false;
                    }
                }

            }
        });
    };


    Utils.showConfigItemDialog = function(target,module,opts){
        var dialogOpts = {
            codeType: "action",
            title: opts.title,
            multiple: opts.multiple,
            type: "codeselect",
            codeValue: opts.url,
            callback: function (text, ids,dataList) {
                if(opts.okCallback){
                    opts.okCallback(text,ids,dataList);
                }
            }
        };

        if(opts.initData){
            dialogOpts.initData = opts.initData ;
        }

        top.openCodeWindow = window;
        top.openCodeOpts = dialogOpts ;
        top.openCodeIndex = top.layer.open({
            type: 2,
            area: ['890px', '646px'],
            fixed: false,
            title: '',
            content: DSF.getURLRoot() + 'ctrl/code/select/view'

        });
    }


    /**
     * ajax, post同步情况
     * @param url
     * @param param
     * @param success
     */
    Utils.ajaxRequestAndAsync = function(url,param,async,success,error){
        $.ajax({
            type: "post",
            async: async,
            url: DSF.getURLRoot() + url,
            data: param,
            dataType: 'json',
            headers: {
                "x-auth-token": DSF.getURLParam("x-auth-token")
            },
            success: function(json){
                if(typeof success == "function"){
                    success(json);
                }else{
                    if(json && json.type == "success"){
                        //layuiOk(json.message);
                    }else{
                        //layuiError(json.message);
                    }
                    f7Alert(json.message);
                }
            },error : function(jqXHR, textStatus, errorThrown){
                // 状态:0-未初始化，1-正在载入，2-已经载入，3-数据进行交互，4-完成。
                console.log(jqXHR.readyState);
                // 状态码:返回的HTTP状态码，比如常见的404,500等错误代码
                console.log(jqXHR.status);
                //对应状态码的错误信息，比如404错误信息是not found,500是Internal Server Error
                console.log(jqXHR.statusText);
                //服务器响应返回的文本信息
                console.log(jqXHR.responseText);
                // 返回状态
                console.log(textStatus);
                // 服务器错误
                console.log(errorThrown);

                if(typeof error == "function"){
                    error(jqXHR, textStatus, errorThrown);
                }else{
                    if(jqXHR.readyState == 0){
                        //layer.msg("请求失败: 网络错误", {icon: 2});
                        DSF.toast("请求失败: 网络错误");
                    }else{
                        //layer.msg("请求失败", {icon: 2});
                        DSF.toast("请求失败");
                        return false;
                    }
                }

            }
        });
    };

    /**
     * ajax, post同步情况
     * @param url
     * @param param
     * @param success
     */
    Utils.ajaxSyncRequest = function(url,param,success){
        var result = {};

        $.ajax({
            type: "post",
            async: false,
            url: DSF.getURLRoot() + url,
            data: param,
            dataType: 'json',
            headers: {
                "x-auth-token": DSF.getURLParam("x-auth-token")
            },
            success: function(json){
                if(json && json.type == "success"){
                    if(typeof success == "function"){
                        success(json);
                    }else{

                    }
                    //layer.msg(json.message, {icon: 1});
                }else{
                    //layer.msg(json.message, {icon: 2});
                    DSF.toast(json.message);
                }

                result = json;
            },error : function(jqXHR, textStatus, errorThrown){
                if(jqXHR.readyState == 0){
                    //layer.msg("请求失败: 网络错误", {icon: 2});
                    DSF.toast("请求失败: 网络错误");
                }else{
                    //layer.msg("请求失败", {icon: 2});
                    DSF.toast("请求失败");
                }

                result = {
                    type : "error",
                    data : ''
                }
            }
        });

        return result;
    };

    /**
     * 用于设置表单变量和url中解密后的参数
     * @param key
     * @param value
     */
    DSF.setQParam = function(key, value){
        if(!window._Q_){
            window._Q_ = {};
        }

        window._Q_[key] = value;
    };

    /**
     * 获取URL参数
     * 加密的url其参数会存放在表单的Q标量中
     * 先从Q对象中取值，再从url中取
     * 示例:
     * 		DSF.getURLParam("infoId");
     */
    DSF.getURLParam = function (key) {
        if(window._Q_ && window._Q_[key]){
            return window._Q_[key];
        }

        var queryStr = Utils.getQueryString();
        var queryObject = Utils.getQueryObject(queryStr);
        if (queryObject[key] === undefined) {
            return "";
        } else {
            return queryObject[key];
        }
    };

    /**
     * 删除指定参数，并返回删除后的url
     * @param key
     * @returns {string}
     */
    DSF.delURLParam = function(url, key){
        var urlParam = url.substr(url.indexOf("?")+1);
        var beforeUrl = url.substr(0,url.indexOf("?"));
        var nextUrl = "";

        var arr = new Array();
        if(urlParam!=""){
            var urlParamArr = urlParam.split("&");
            for(var i=0;i<urlParamArr.length;i++){
                var paramArr = urlParamArr[i].split("=");
                if(paramArr[0]!=key){
                    arr.push(urlParamArr[i]);
                }
            }
        }

        if(arr.length>0){
            nextUrl = "?"+arr.join("&");
        }
        return beforeUrl+nextUrl;
    }

    DSF.getURLRoot = function (mode) {
        var theWetRootPath = "";
        try {
            var pathName = window.location.pathname.substring(1);
            var webName = pathName == '' ? '' : pathName.substring(0, pathName.indexOf('/'));
            if(mode=='ajax') webName = 'DreamWeb';
            if(pathName.indexOf("/form/") > 0 && pathName.indexOf(".xform") > -1){
                webName = pathName.substring(0, pathName.indexOf("/form/"));
            }
            var slash = "/";
            if(webName == "fn" || webName == "ctrl" || webName == "form" || !webName || webName=="p1000" || webName == "dsfa"){ //如果上下文/的情况下，取的不对
                webName = "";
                slash = "";
            }
            theWetRootPath = window.location.protocol + '//' + window.location.host + '/' + webName + slash;
        } catch (e) {
            console.error(e);
        }
        return theWetRootPath;
    }

    DSF.getJSONLength = function(json){
        var size = 0 ;
        for(var key in json){
            size++ ;
        }
        return size ;
    };



    window.layuiOk = function (content, end) {
        var options = {icon: 1, time: 1000};
        layer.msg(content, options, function () {
            if (typeof (end) == "function") {
                end();
            }
        });
    };

    window.layuiError = function (content, end) {
        var options = {icon: 2, time: 1000};
        layer.msg(content, options, function () {
            if (typeof (end) == "function") {
                end();
            }
        });
    };

    window.layuiConfirm = function(content,end){
        layer.confirm(content, {
            btn: ['确定','取消'] //按钮
        }, function(index, layero){
            if (typeof (end) == "function") {
                end(index);
            }
        }, function(){

        });
    };

    /**
     * options.duration
     */
    window.DSF.toast = function(msg , options){
        msg = msg || "";
        if(myApp) {
            myApp.toast(msg || "" , "" , options).show();
        }else{
            console.log(msg);
        }
    }

    window.DSF.isIos = function(){
        var url = location.href;
        if (url) {
            url = url.toUpperCase();
            var index = url.indexOf("PLATFORM=IOS");
            if (index > 0) {
                return true;
            }
        }
        var platform = DSF.getURLParam("platform");
        return platform == "ios";
    }

    window.logicDeleteXForm = function(){
        //layuiConfirm("请确认是否删除？",function(index){
            getTopFormLayer().load();
            var pk=DSF.getURLParam("pk");
            var moduleId = DSF.getURLParam("moduleId");
            var array = new Array();
            var param = {
                "pk": pk, "moduleId": moduleId
            };
            array.push(param);
            var data = {"data": JSON.stringify(array),"moduleId":moduleId};
            //var obj=$(".x-form-buttons button[op='logicDeleteXForm']");
            //obj.attr('disabled',true);
            Utils.ajaxRequest("fn/recycle/logic", data, function (result) {
                getTopFormLayer().closeAll('loading');
                if ("success" == result.type) {
                    var data=result.data;

                    var params={
                        type : "logicDeleteXForm",
                        result : true,
                        resultMsg : "操作成功"
                    };
                    if(typeof (afterLogicDeleteXForm) == "function"){
                        afterLogicDeleteXForm(function(){
                            console.log(params);
                            window.parent.postMessage(JSON.stringify(params),"*");
                        });
                    }else{
                        console.log(params);
                        window.parent.postMessage(JSON.stringify(params),"*");
                    }
                    //obj.removeAttr('disabled');
                }else{
                    var params={
                        type : "logicDeleteXForm",
                        result : false,
                        resultMsg : "操作失败"
                    };
                    console.log(params);
                    window.parent.postMessage(JSON.stringify(params),"*");
                }
                //getTopFormLayer().close(index);
            },function(){
                getTopFormLayer().closeAll('loading');
                //getTopFormLayer().close(index);
                //obj.removeAttr('disabled');
                //layuiError("请求失败请重试");
                var params={
                    type : "logicDeleteXForm",
                    result : false,
                    resultMsg : "请求失败请重试"
                };
                console.log(params);
                window.parent.postMessage(JSON.stringify(params),"*");
            });
        //});
    };

    $(function(){
        /**
         * For JSCZT SAG Android Version Only
         * zhangx 2018-12-14
         */
        $.ajaxSetup({
            beforeSend: function(xhr , context) {
                //console.log(xhr);
                //console.log(context);
                console.log("beforeSend:" + context.url);
                if (window.sagJsHelper && window.sagJsHelper.interceptRequest && typeof window.sagJsHelper.interceptRequest === 'function') {
                    if ("POST" == context.type) {
                        var date = new Date();
                        var timestamp = date.getTime();

                        // 添加sagreqid标识
                        var url = context.url;
                        if (url.indexOf('?') > 0) {
                            context.url = context.url + "&sagreqid=" + timestamp;
                        } else {
                            context.url = context.url + "?sagreqid=" + timestamp;
                        }

                        console.log("POST:" + context.url  + ", contentType: " + context.contentType);

                        // 调用接口缓存POST请求的数据
                        window.sagJsHelper.interceptRequest('' + timestamp, context.type, context.data, context.contentType);
                    }
                }
            }
        });
    });

    // exports:
    window.DSF = window.DSF || {};
    window.DSF.Utils = window.DSF.Utils || Utils;


})(window, $);
"use strict";(self.webpackChunkxianzhengding=self.webpackChunkxianzhengding||[]).push([[81605],{22622:function(e,o,s){s.r(o);var t=s(8450),n=s.n(t),a=s(25108),t={switchAccount:function(e,o){var s=dsf.layer.loading("切换中..."),e={__DATA:n()({logname:e.dataValue.logName,password:"",device_id:"",device_desc:""})};dsf.http.post("fn/api/para/switchAccount",e).then(function(e){a.log(e),dsf.util.removeSessionStore("user"),dsf.util.removeSessionStore("loginToken"),dsf.util.removeToLocalStore("user"),dsf.util.removeToLocalStore("loginToken");e=e.data.data;dsf.util.saveToSessionStore("user",e),dsf.util.saveToSessionStore("loginToken",e.auth.token),dsf.util.saveToLocalStore("loginToken",e.auth.token),dsf.util.saveToLocalStore("user",e),o.$router.push({path:"/index"})}).always(function(){dsf.layer.closeLoading(s)})}};o.default=t}}]);
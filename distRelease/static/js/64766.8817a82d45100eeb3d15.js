"use strict";(self.webpackChunkxianzhengding=self.webpackChunkxianzhengding||[]).push([[64766],{64766:function(e,t,n){n.r(t),n.d(t,{default:function(){return a}});var i=n(88561),s=n(62596),o=n(25108),t={data:function(){return{tipsText:""}},created:function(){var n=this,a=(new Date).getTime(),e=(i.Z.clearSession(),document.createElement("script"));e.type="text/javascript",e.src="static/js/lanxin/jssdk.js",document.body.appendChild(e),e.onload=function(){var e=dsf.config.setting["SYS-MOBILE-LX-0001"];(window.lx=lx).biz.getAuthCode({appId:e,success:function(e){var e=e.authCode,t=(new Date).getTime();o.log("加载lanxinJsSdk获取authCode总耗时:",t-a),dsf.http.post("/fn/lxLogin/mloginGetInfo?code=".concat(e),{}).then(function(e){e=e.data;t=(new Date).getTime(),o.log("接口调用总耗时:",t-a),"500"==e.code?n.tipsText=e.data.message:1==e.data.rcode?(i.Z.saveToSessionStore("user",e.data.data),i.Z.saveToSessionStore("loginToken",e.data.data.auth.token),i.Z.logIn(function(){var e=n.$route.query.redirectUrl;e?(e=s.Z.decode(e.replace(new RegExp("@","gm"),"/")),n.$router.replace(e)):n.$router.replace("/index")})):n.tipsText="当前系统登录异常，请联系管理员！"})},fail:function(e){o.log(e)}})}}},a=(0,n(51900).Z)(t,function(){var e=this,t=e._self._c;return t("div",{staticClass:"imgdiv"},[e.tipsText?t("span",[e._v(e._s(e.tipsText))]):t("img",{attrs:{src:"static/images/project/sxXTBG/loading.gif",alt:""}})])},[],!1,null,"3d038212",null).exports}}]);
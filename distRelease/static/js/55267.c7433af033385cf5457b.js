"use strict";(self.webpackChunkxianzhengding=self.webpackChunkxianzhengding||[]).push([[55267],{55267:function(t,e,n){n.r(e),n.d(e,{default:function(){return a}});var s=n(88561),o=n(25108),e={data:function(){return{tipsText:""}},mounted:function(){dsf.util.clearSession();var e=this;window.getCode=function(t){dsf.http.post("/fn/mobileProjectAuth/auth?code=".concat(t)).then(function(t){o.log("/fn/mobileProjectAuth/auth",t),"500"==t.code?e.tipsText=t.data.message:1==t.data.rcode?(s.Z.saveToSessionStore("user",t.data.data),s.Z.saveToSessionStore("loginToken",t.data.data.auth.token),s.Z.logIn(function(){e.$router.replace("/shouye")})):e.tipsText="当前系统登录异常，请联系管理员！"})},Code.postMessage("")}},a=(0,n(51900).Z)(e,function(){var t=this,e=t._self._c;return e("div",[e("div",{staticClass:"init-div"}),t._v(" "),e("div",{staticClass:"tips"},[t._v(t._s(t.tipsText))])])},[],!1,null,"31f66606",null).exports}}]);